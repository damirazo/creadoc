# coding: utf-8
import os
import uuid
from django.db import transaction
from django.conf import settings
from django.http import HttpResponse
from django.template import loader, Context
from m3.actions import (
    ActionPack, Action, PreJsonResult,
    OperationResult, ApplicationLogicException)
from m3.actions.context import ActionContext
from m3_ext.ui.misc import ExtDataStore
from m3_ext.ui.results import ExtUIScriptResult
from creadoc.creator.forms import (
    DesignerIframeWindow, DesignerReportsListWindow,
    DesignerDataSourcesWindow)
from creadoc.creator.helpers import redirect_to_action
from creadoc.creator.mutex import CreadocMutex
from creadoc.models import CreadocReport, CreadocReportDataSource
from creadoc.source.registry import DSR
from creadoc.source.variable import VariableType

__author__ = 'damirazo <me@damirazo.ru>'


class CreadocDesignerActionPack(ActionPack):
    u"""
    Базовый пак дизайнера отчетов
    """
    url = '/designer'
    title = title_plural = u'Дизайнер отчетов'

    def __init__(self):
        super(CreadocDesignerActionPack, self).__init__()

        # Список экшенов
        # ---------------------------------------------------------------------

        self.action_show = CreadocDesignerShowAction()
        self.action_iframe = CreadocDesignerIframeAction()
        self.action_report_list_window = CreadocDesignerReportListAction()
        self.action_report_rows = CreadocDesignerReportRowsAction()
        self.action_report_new = CreadocDesignerReportNewAction()
        self.action_report_edit = CreadocDesignerReportEditAction()
        self.action_report_save = CreadocDesignerReportSaveAction()
        self.action_report_delete = CreadocDesignerReportDeleteAction()
        self.action_report_release = CreadocDesignerReportRelease()

        self.actions.extend([
            self.action_show,
            self.action_iframe,
            self.action_report_list_window,
            self.action_report_rows,
            self.action_report_new,
            self.action_report_edit,
            self.action_report_save,
            self.action_report_delete,
            self.action_report_release,
        ])

        # Список сабпаков
        # ---------------------------------------------------------------------

        self.pack_data_source = CreadocDesignerDataSourceActionPack()

        self.subpacks.extend([
            self.pack_data_source,
        ])

    def get_list_url(self):
        return self.action_report_list_window.get_absolute_url()


class CreadocDesignerShowAction(Action):
    u"""
    Формирование окна, содержащего фрейм с дизайнером
    """
    url = '/show'

    def context_declaration(self):
        return {
            'report_id': {'type': 'int', 'required': True, 'default': 0},
        }

    def run(self, request, context):
        # При редактировании шаблона сначала проверяем
        # не редактируется ли он другим пользователем
        if context.report_id:
            mutex = CreadocMutex(context.report_id)

            if mutex.is_free():
                mutex.capture()
            else:
                raise ApplicationLogicException(
                    u'Данный шаблон редактируется '
                    u'другим пользователем')

        url = u'{}?report_id={}'.format(
            self.parent.action_iframe.get_absolute_url(),
            context.report_id
        )
        win = DesignerIframeWindow(
            frame_url=url,
            report_id=context.report_id,
        )
        win.save_report_url = self.parent.action_report_save.get_absolute_url()
        win.release_report_url = (
            self.parent.action_report_release.get_absolute_url())
        win.sources_window_url = (
            self.parent.pack_data_source.action_list.get_absolute_url())

        return ExtUIScriptResult(win, context)


class CreadocDesignerReportRelease(Action):
    u"""
    Освобождение блокировки шаблона после закрытия окна редактирования
    """
    url = '/release'

    def context_declaration(self):
        return {
            'report_id': {'type': 'int', 'required': True, 'default': None},
        }

    def run(self, request, context):
        if context.report_id:
            mutex = CreadocMutex(context.report_id)

            if not mutex.is_free():
                mutex.release()

        return OperationResult()


class CreadocDesignerIframeAction(Action):
    u"""
    Формирование фрейма, содержащего страницу с дизайнером
    Заполнение дизайнера зарегистрированными источниками данных
    """
    url = '/iframe'

    def context_declaration(self):
        return {
            'report_id': {'type': 'int', 'required': True, 'default': None},
        }

    def run(self, request, context):
        # Если передан идентификатор шаблона,
        # то это редактирование и мы грузим готовый шаблон.
        # В противном случае загружаем пустой шаблон.
        if not context.report_id:
            template_url = '{}reports/EmptyReport.mrt'.format(
                settings.STATIC_URL)
        else:
            try:
                report = CreadocReport.objects.get(pk=context.report_id)
            except CreadocReport.DoesNotExist:
                raise ApplicationLogicException((
                    u'Шаблон отчетной формы с id={} отсутствует, '
                    u'возможно он был удален.'
                ).format(context.report_id))

            template_url = report.url

        t = loader.get_template('creadoc_designer.html')

        ctx = Context()
        ctx['reports_url'] = settings.CREADOC_REPORTS_URL
        ctx['report_save_url'] = (
            self.parent.action_report_save.get_absolute_url())
        ctx['template_url'] = template_url
        ctx['variables'] = DSR.variables()
        ctx['sources'] = DSR.connected_sources(context.report_id)

        return HttpResponse(t.render(ctx))


class CreadocDesignerReportListAction(Action):
    u"""
    Формирование окна со списком доступных печатных форм
    """
    url = '/list-window'

    def run(self, request, context):
        win = DesignerReportsListWindow()
        win.grid.action_data = self.parent.action_report_rows
        win.grid.action_new = self.parent.action_report_new
        win.grid.action_edit = self.parent.action_report_edit
        win.grid.action_delete = self.parent.action_report_delete

        return ExtUIScriptResult(win, context)


class CreadocDesignerReportRowsAction(Action):
    u"""
    Список существующий отчетных форм
    """
    url = '/rows'

    def run(self, request, context):
        rows = CreadocReport.objects.all()

        return PreJsonResult({'rows': list(rows), 'count': rows.count()})


class CreadocDesignerReportNewAction(Action):
    u"""
    Создание новой отчетной формы
    """
    url = '/new'

    def run(self, request, context):
        return redirect_to_action(request, self.parent.action_show)


class CreadocDesignerReportEditAction(Action):
    u"""
    Редактирование существующей отчетной формы
    """
    url = '/edit'

    def context_declaration(self):
        return {
            'row_id': {'type': 'int', 'required': True},
        }

    def run(self, request, context):
        return redirect_to_action(
            request,
            self.parent.action_show,
            {'report_id': context.row_id},
        )


class CreadocDesignerReportSaveAction(Action):
    u"""
    Сохранение отчетной формы
    """
    url = '/save'

    def context_declaration(self):
        return {
            'report': {
                'type': 'unicode',
                'required': True,
            },
            'id': {'type': 'int', 'required': True, 'default': None},
            'name': {'type': 'unicode', 'required': True, 'default': None},
        }

    @transaction.atomic
    def run(self, request, context):
        report_data = context.report

        if context.id:
            try:
                report = CreadocReport.objects.get(pk=context.id)
            except CreadocReport.DoesNotExist:
                raise ApplicationLogicException((
                    u'Шаблон с id={} отсутствует!'
                ).format(context.id))
        else:
            report_guid = str(uuid.uuid4())

            report = CreadocReport()
            report.name = context.name
            report.guid = report_guid
            report.save()

        with open(report.path, 'w+') as f:
            f.write(report_data.encode('utf-8'))

        return PreJsonResult({
            'success': True,
            'report_id': report.id,
        })


class CreadocDesignerReportDeleteAction(Action):
    u"""
    Удаление отчетной формы
    """
    url = '/delete'

    def context_declaration(self):
        row_id_type = lambda x: map(lambda y: y.strip(), x.split(','))

        return {
            'row_id': {'type': row_id_type, 'required': True},
        }

    @transaction.atomic
    def run(self, request, context):
        deleted = 0
        protected = 0

        for row_id in context.row_id:
            mutex = CreadocMutex(row_id)

            if not mutex.is_free():
                protected += 1
                continue

            try:
                report = CreadocReport.objects.get(pk=row_id)
            except CreadocReport.DoesNotExist:
                raise ApplicationLogicException((
                    u'Шаблон с id={} отсутствует!'
                ).format(row_id))

            # Пробуем удалить шаблон. Если отсутствует, то пропускаем.
            try:
                os.remove(report.path)
            except OSError:
                pass

            report.delete()

            deleted += 1

        if protected:
            result = OperationResult(message=(
                u'Удалено записей: {}<br>'
                u'Используется другими пользователями: {}'
            ).format(deleted, protected))
        else:
            result = OperationResult()

        return result


class CreadocDesignerDataSourceActionPack(ActionPack):
    u"""
    Работа с источниками данных шаблона
    """
    url = '/data-source'

    def __init__(self):
        super(CreadocDesignerDataSourceActionPack, self).__init__()

        self.action_list = CreadocDesignerDataSourceListAction()
        self.action_save = CreadocDesignerDataSourceSaveAction()

        self.actions.extend([
            self.action_list,
            self.action_save,
        ])


class CreadocDesignerDataSourceListAction(Action):
    u"""
    Окно со списком доступных и подключенных источников данных
    """
    url = '/list'

    def context_declaration(self):
        return {
            'report_id': {'type': 'int', 'required': True},
        }

    def run(self, request, context):
        win = DesignerDataSourcesWindow()

        sources = DSR.sources()
        plugged_sources = CreadocReportDataSource.objects.filter(
            report__id=context.report_id
        ).values_list('source_uid', flat=True)

        plugged = []
        unplugged = []
        for row in sources:
            record = (row.guid, row.group, row.url)

            if row.guid in plugged_sources:
                plugged.append(record)
            else:
                unplugged.append(record)

        win.source_grid.set_store(ExtDataStore(unplugged))
        win.destination_grid.set_store(ExtDataStore(plugged))

        win.save_url = self.parent.action_save.get_absolute_url()

        if not getattr(win, 'action_context', None):
            win.action_context = ActionContext()

        win.action_context.report_id = context.report_id

        return ExtUIScriptResult(win, context)


class CreadocDesignerDataSourceSaveAction(Action):
    u"""
    Сохранение списка подключенных источников данных
    """
    url = '/save'

    def context_declaration(self):
        return {
            'rows': {'type': 'json', 'required': True},
            'report_id': {'type': 'int', 'required': True},
        }

    def run(self, request, context):
        CreadocReportDataSource.objects.filter(
            report__id=context.report_id
        ).delete()

        for row in context.rows:
            record = CreadocReportDataSource()
            record.report_id = context.report_id
            record.source_uid = row
            record.save()

        return OperationResult()

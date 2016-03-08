# coding: utf-8
from django.http import HttpResponse
from django.template import loader, Context
from m3.actions import ActionPack, Action, OperationResult
from creadoc.creator.forms import DesignerIframeWindow
from creadoc.source.registry import DSR

__author__ = 'damirazo <me@damirazo.ru>'


class CreadocDesignerActionPack(ActionPack):
    u"""
    Базовый пак дизайнера отчетов
    """
    url = '/designer'
    title = title_plural = u'Дизайнер отчетов'

    def __init__(self):
        super(CreadocDesignerActionPack, self).__init__()

        self.action_show = CreadocDesignerShowAction()
        self.action_iframe = CreadocDesignerIframeAction()

        self.actions.extend([
            self.action_show,
            self.action_iframe,
        ])

    def get_list_url(self):
        return self.action_show.get_absolute_url()


class CreadocDesignerShowAction(Action):
    u"""
    Формирование окна, содержащего фрейм с дизайнером
    """
    url = '/show'

    def run(self, request, context):
        win = DesignerIframeWindow(
            url=self.parent.action_iframe.get_absolute_url()
        )

        return OperationResult(code=win.get_script())


class CreadocDesignerIframeAction(Action):
    u"""
    Формирование фрейма, содержащего страницу с дизайнером
    Заполнение дизайнера зарегистрированными источниками данных
    """
    url = '/iframe'

    def run(self, request, context):
        t = loader.get_template('creadoc_designer.html')
        ctx = Context()
        ctx['element_data_sources'] = DSR.all()

        return HttpResponse(t.render(ctx))

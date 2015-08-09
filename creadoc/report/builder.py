# coding: utf-8
from creadoc.report.document import CreaDoc

__author__ = 'damirazo <me@damirazo.ru>'


class CreaDocBuilder(object):
    u"""
    Сборщик печатной формы
    """

    def __init__(self, report, mapper):
        self.report = report
        self.path = self.report.template.path
        self.document = CreaDoc(self.path)
        self.mapper = mapper

    def build(self):
        u"""
        Сборка печатной формы
        """
        # Нормализация документа
        self.document.wrapper.normalize()

        # Обработка обычных тегов
        self.prepare_tags()
        # Обработка списочных тегов
        self.prepare_cycles()

        return self.document

    def prepare_tags(self):
        u"""
        Обработка обычных тегов
        """
        to_replace = {}
        values = self.mapper.fill(self.document.wrapper.sources())

        for tag_data in self.document.wrapper.tags():
            tag_name = tag_data[0]
            segments = tag_name.split('.')
            value = self.get_by_key(values, segments)
            to_replace[tag_name] = value or ''

        self.document.wrapper.replace_tags(to_replace)

    def prepare_cycles(self):
        u"""
        Обработка списочных тегов
        """
        for cycle in self.document.wrapper.cycles():
            pass

    def get_by_key(self, data, path):
        u"""
        Возвращает значение с указанным ключем
        """
        result = reduce(
            lambda dct, k: dct and dct.get(k) or None,
            path, data)

        return result

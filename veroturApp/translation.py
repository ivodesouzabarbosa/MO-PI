from modeltranslation.translator import translator, TranslationOptions
from .models import Categorias, PontosTuristicos

class CategoriasTranslationOptions(TranslationOptions):
    fields = ('nome',)

class PontosTuristicosTranslationOptions(TranslationOptions):
    fields = ('nome', 'descricao', 'endereco', 'horarios_funcionamento', 'lugares_pagos', 'monitoria')

translator.register(Categorias, CategoriasTranslationOptions)
translator.register(PontosTuristicos, PontosTuristicosTranslationOptions)
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

class Categorias(models.Model):
    nome = models.CharField(max_length=255, verbose_name=_("Nome"))
    slug = models.SlugField('slug', editable=False)

    def save(self, *args, **kwargs):
        nome = self.nome
        self.slug = slugify(nome, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome
    
class PontosTuristicos(models.Model):
    nome = models.CharField(max_length=100, verbose_name=_("Nome"))
    imagem = models.ImageField(upload_to ='media/pontos_turisticos/pontos_turisticos/')
    descricao = models.TextField(max_length=2500, verbose_name=_("Descrição"))
    endereco = models.CharField(max_length=75, verbose_name=_("Endereço"))
    horarios_funcionamento = models.CharField(max_length=45, verbose_name=_("Horários de Funcionamento"))
    lugares_pagos = models.CharField(max_length=45, verbose_name=_("Lugares Pagos"))
    monitoria = models.CharField(max_length=45, verbose_name=_("Monitoria"))
    latitude = models.FloatField(verbose_name=_("Latitude"))
    longitude = models.FloatField(verbose_name=_("Longitude"))
    categorias_id_categorias = models.ForeignKey(Categorias, models.DO_NOTHING, db_column='categorias_ID_categorias', verbose_name=_("Categoria"))

    def __str__(self):
        return self.nome
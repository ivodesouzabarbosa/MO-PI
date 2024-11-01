from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
import os
from verotur import settings

class Categorias(models.Model):
    nome = models.CharField(max_length=255, verbose_name=_("Nome"))
    slug = models.SlugField('slug', editable=False)

    def save(self, *args, **kwargs):
        nome = self.nome
        self.slug = slugify(nome, allow_unicode=True)
        super().save(*args, **kwargs)
        
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
              
    def __str__(self):
        return self.nome

class PontosTuristicos(models.Model):
    nome = models.CharField(max_length=100, verbose_name=_("Nome"))
    imagem = models.ImageField(upload_to ='')
    descricao = models.TextField(max_length=2500, verbose_name=_("Descrição"))
    endereco = models.CharField(max_length=75, verbose_name=_("Endereço"))
    horarios_funcionamento = models.CharField(max_length=100, verbose_name=_("Horários de Funcionamento"))
    lugares_pagos = models.CharField(max_length=100, verbose_name=_("Lugares Pagos"))
    monitoria = models.CharField(max_length=45, verbose_name=_("Monitoria"))
    latitude = models.FloatField(verbose_name=_("Latitude"))
    longitude = models.FloatField(verbose_name=_("Longitude"))
    categorias_id_categorias = models.ForeignKey(Categorias, models.DO_NOTHING, db_column='categorias_ID_categorias', verbose_name=_("Categoria"))

    class Meta:
        verbose_name = 'Ponto Turístico'
        verbose_name_plural = 'Pontos Turísticos'

    def __str__(self):
        return self.nome

    def save(self, *args, **kwargs):
        # Verifica se o objeto já existe e se tem uma imagem salva
        if self.pk:
            old_image = PontosTuristicos.objects.get(pk=self.pk).imagem
            if old_image and old_image != self.imagem:
                # Deleta a imagem antiga do sistema de arquivos
                old_image_path = os.path.join(settings.MEDIA_ROOT, old_image.name)
                if os.path.isfile(old_image_path):
                    os.remove(old_image_path)
        
        # Salva o novo objeto com a nova imagem
        super().save(*args, **kwargs)

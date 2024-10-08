from django.db import models

class Categorias(models.Model):
    id_categorias = models.AutoField(db_column='ID_categorias', primary_key=True)  # Field name made lowercase.
    nome = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'categorias'

class PontosTuristicos(models.Model):
    id_pontos_turisticos = models.AutoField(db_column='ID_pontos_turisticos', primary_key=True)  # Field name made lowercase.
    nome = models.CharField(max_length=45)
    imagem = models.CharField(max_length=45)
    descricao = models.TextField()
    endereco = models.CharField(max_length=45)
    horarios_funcionamento = models.CharField(max_length=45)
    lugares_pagos = models.CharField(max_length=45)
    monitoria = models.CharField(max_length=45)
    latitude = models.CharField(max_length=45)
    longitude = models.CharField(max_length=45)
    categorias_id_categorias = models.ForeignKey(Categorias, models.DO_NOTHING, db_column='categorias_ID_categorias')  # Field name made lowercase.
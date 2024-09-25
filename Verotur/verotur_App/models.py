from django.db import models


class TbCategorias(models.Model):
    idtb_categorias = models.AutoField(db_column='idtb_Categorias', primary_key=True)  # Field name made lowercase.
    nome = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'tb_categorias'
        
    def __str__(self):
        return self.nome

class TbPontosTuristicos(models.Model):
    idtable1 = models.AutoField(primary_key=True)
    imagem = models.ImageField(upload_to='image/' ,blank=True, null=True)
    nome = models.CharField(max_length=45)
    endereco = models.CharField(max_length=45)
    horarios_fechamento = models.CharField(max_length=45)
    lugares_pagos = models.CharField(max_length=45)
    monitoria = models.CharField(max_length=45)
    table1col = models.CharField(max_length=45)
    latitude = models.CharField(max_length=45)
    longitude = models.CharField(max_length=45)
    id_categorias = models.ForeignKey(TbCategorias, models.DO_NOTHING, db_column='ID_categorias')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tb_pontos_turisticos'
        
    def __str__(self):
        return self.nome
    

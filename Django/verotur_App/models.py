from django.db import models

# Create your models here.
class Categorias(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
class PontoTuristico(models.Model):
    nome = models.CharField(max_length=150)
    descricao = models.TextField(blank=True, null=True)
    endereco = models.CharField(max_length=255)
    categoria = models.OneToOneField(Categorias, on_delete=models.CASCADE)
    horarios_funcionamento = models.CharField(max_length=50) 
    lugares_pagos = models.CharField(max_length=50)  
    monitoria = models.BooleanField(default=False)  
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return self.nome
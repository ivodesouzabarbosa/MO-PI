# Generated by Django 5.1.1 on 2024-09-17 17:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categorias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='PontoTuristico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagem', models.ImageField(upload_to='imagem')),
                ('nome', models.CharField(max_length=150)),
                ('descricao', models.TextField(blank=True, null=True)),
                ('endereco', models.CharField(max_length=255)),
                ('horarios_funcionamento', models.CharField(max_length=50)),
                ('lugares_pagos', models.CharField(max_length=50)),
                ('monitoria', models.BooleanField(default=False)),
                ('latitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='verotur_App.categorias')),
            ],
        ),
    ]

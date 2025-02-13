# Generated by Django 5.1.2 on 2024-10-31 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veroturApp', '0013_alter_pontosturisticos_lugares_pagos_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pontosturisticos',
            name='horarios_funcionamento',
            field=models.CharField(max_length=100, verbose_name='Horários de Funcionamento'),
        ),
        migrations.AlterField(
            model_name='pontosturisticos',
            name='horarios_funcionamento_en',
            field=models.CharField(max_length=100, null=True, verbose_name='Horários de Funcionamento'),
        ),
        migrations.AlterField(
            model_name='pontosturisticos',
            name='horarios_funcionamento_es',
            field=models.CharField(max_length=100, null=True, verbose_name='Horários de Funcionamento'),
        ),
        migrations.AlterField(
            model_name='pontosturisticos',
            name='horarios_funcionamento_pt_br',
            field=models.CharField(max_length=100, null=True, verbose_name='Horários de Funcionamento'),
        ),
    ]

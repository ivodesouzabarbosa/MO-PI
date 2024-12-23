# Generated by Django 5.1.2 on 2024-10-21 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veroturApp', '0005_alter_pontosturisticos_imagem'),
    ]

    operations = [
        migrations.AddField(
            model_name='categorias',
            name='slug',
            field=models.SlugField(default=1, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='categorias',
            name='nome',
            field=models.CharField(max_length=45),
        ),
        migrations.AlterField(
            model_name='categorias',
            name='nome_en',
            field=models.CharField(max_length=45, null=True),
        ),
        migrations.AlterField(
            model_name='categorias',
            name='nome_es',
            field=models.CharField(max_length=45, null=True),
        ),
        migrations.AlterField(
            model_name='categorias',
            name='nome_pt_br',
            field=models.CharField(max_length=45, null=True),
        ),
    ]

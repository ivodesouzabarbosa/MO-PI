# Generated by Django 5.1.1 on 2024-09-13 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('verotur_App', '0009_alter_pontoturistico_categoria'),
    ]

    operations = [
        migrations.AddField(
            model_name='pontoturistico',
            name='imagem',
            field=models.ImageField(default=2, upload_to='imagem'),
            preserve_default=False,
        ),
    ]
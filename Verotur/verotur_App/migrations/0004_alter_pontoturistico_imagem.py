# Generated by Django 5.1.1 on 2024-09-19 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('verotur_App', '0003_alter_pontoturistico_monitoria'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pontoturistico',
            name='imagem',
            field=models.ImageField(upload_to='media'),
        ),
    ]

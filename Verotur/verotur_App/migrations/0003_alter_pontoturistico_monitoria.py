# Generated by Django 5.1.1 on 2024-09-19 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('verotur_App', '0002_remove_pontoturistico_place_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pontoturistico',
            name='monitoria',
            field=models.CharField(max_length=50),
        ),
    ]
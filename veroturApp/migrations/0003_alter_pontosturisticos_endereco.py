# Generated by Django 5.1.2 on 2024-10-16 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veroturApp', '0002_alter_pontosturisticos_descricao_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pontosturisticos',
            name='endereco',
            field=models.CharField(max_length=75),
        ),
    ]

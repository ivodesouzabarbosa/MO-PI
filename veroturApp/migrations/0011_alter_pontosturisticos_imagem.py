# Generated by Django 5.1.2 on 2024-10-29 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veroturApp', '0010_alter_pontosturisticos_imagem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pontosturisticos',
            name='imagem',
            field=models.ImageField(upload_to='media/'),
        ),
    ]

# Generated by Django 4.2.11 on 2024-07-24 14:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventario_app', '0003_alter_dispositivo_id_alter_reparo_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reparo',
            name='device_id',
        ),
    ]

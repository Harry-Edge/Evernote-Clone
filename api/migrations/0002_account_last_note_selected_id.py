# Generated by Django 3.1.2 on 2021-03-05 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='last_note_selected_id',
            field=models.IntegerField(null=True),
        ),
    ]

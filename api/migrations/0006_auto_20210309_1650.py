# Generated by Django 3.1.2 on 2021-03-09 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210305_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='first_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='last_note_selected_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
# Generated by Django 3.0 on 2021-04-01 03:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pullrequest',
            name='user',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
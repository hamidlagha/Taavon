# Generated by Django 3.2.16 on 2022-10-26 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_votes_zone'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='candidas',
            options={'ordering': ['-vote_total', 'name', 'family']},
        ),
        migrations.AddField(
            model_name='candidas',
            name='vote_total',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
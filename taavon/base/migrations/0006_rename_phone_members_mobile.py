# Generated by Django 4.0.8 on 2022-10-28 12:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_votes_created'),
    ]

    operations = [
        migrations.RenameField(
            model_name='members',
            old_name='phone',
            new_name='mobile',
        ),
    ]

# Generated by Django 3.2.16 on 2022-10-30 19:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_sms'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='sms',
            options={'ordering': ['-created']},
        ),
        migrations.AlterUniqueTogether(
            name='votes',
            unique_together={('candida', 'member')},
        ),
    ]

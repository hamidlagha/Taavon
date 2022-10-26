from statistics import mode
from tkinter import CASCADE
from django.db import models

class Members(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    family = models.CharField(max_length=200, null=False, blank=False)
    code = models.CharField(max_length=10, null=False, blank=False)
    prs = models.IntegerField(null=False, blank=False)
    zone = models.IntegerField(blank=False, null=False)
    phone = models.CharField(max_length=20, null=True, blank=True)
    id = models.IntegerField(primary_key=True, blank=False, null=False, editable=False, unique=True)

    def __str__(self):
        return str(self.code)

class Candidas(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    family = models.CharField(max_length=200, null=False, blank=False)
    code = models.CharField(max_length=10, null=False, blank=False)
    prs = models.IntegerField(null=False, blank=False)
    zone = models.IntegerField(blank=False, null=False)
    phone = models.CharField(max_length=20, null=True, blank=True)
    desc = models.TextField(blank=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to="candidas/")
    id = models.AutoField(primary_key=True, blank=False, null=False, editable=False, unique=True)

    def __str__(self):
        return str(self.name)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

class Votes(models.Model):
    member = models.ForeignKey(Members,on_delete=models.CASCADE, null=False, blank=False)
    candida = models.ForeignKey(Candidas, on_delete=models.CASCADE, null= False, blank=False)
    created = models.DateField(auto_now_add=True)
    ip = models.CharField(max_length=100, blank=True, null=False)
    id = models.AutoField(primary_key=True, blank=False, null=False, editable=False, unique=True)

    def __str__(self):
        return str(self.id)




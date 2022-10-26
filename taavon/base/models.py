from statistics import mode
from tkinter import CASCADE
from tokenize import blank_re
from django.db import models

class Members(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    family = models.CharField(max_length=200, null=False, blank=False)
    code = models.CharField(max_length=10, null=False, blank=False)
    prs = models.IntegerField(null=False, blank=False)
    zone = models.IntegerField(blank=False, null=False)
    phone = models.CharField(max_length=20, null=True, blank=True)
    voted = models.BooleanField(default=False, null=True)
    id = models.IntegerField(primary_key=True, blank=False, null=False, editable=False, unique=True)

    def __str__(self):
        return str(self.id)

class Candidas(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    family = models.CharField(max_length=200, null=False, blank=False)
    code = models.CharField(max_length=10, null=False, blank=False)
    prs = models.IntegerField(null=False, blank=False)
    zone = models.IntegerField(blank=False, null=False)
    phone = models.CharField(max_length=20, null=True, blank=True)
    desc = models.TextField(blank=True, null=True)
    vote_total = models.IntegerField(default = 0, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to="candidas/")
    id = models.AutoField(primary_key=True, blank=False, null=False, editable=False, unique=True)

    def __str__(self):
        return str(self.id)

    @property
    def getVoteCount(self):
        self.vote_total = self.votes_set.all().count()
        self.save()

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url
    class Meta:
        ordering = ['-vote_total', 'name', 'family']
        
class Votes(models.Model):
    member = models.ForeignKey(Members,on_delete=models.CASCADE, null=False, blank=False)
    candida = models.ForeignKey(Candidas, on_delete=models.CASCADE, null= False, blank=False)
    zone = models.IntegerField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    ip = models.CharField(max_length=100, blank=True, null=False)
    id = models.AutoField(primary_key=True, blank=False, null=False, editable=False, unique=True)

    def __str__(self):
        return str(self.id)
    
    @property
    def prs(self):
        return self.member.prs

from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Members, Candidas, Votes
from rest_framework_simplejwt.tokens import RefreshToken

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = '__all__'

class CandidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidas
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votes
        fields = '__all__'
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
    prs = serializers.ReadOnlyField()

    class Meta:
        model = Votes
        fields = ['prs', 'zone', 'created', 'ip']
    
class CandidaVotesSerializer(serializers.ModelSerializer):
    votes = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Candidas
        fields = ['id', 'name', 'family', 'code', 'prs',
            'zone', 'votes']    

    def get_votes(self, obj):
        try:
            items = VoteSerializer(
                obj.votes_set.all(), many=True).data
        except:
            items = False
        return items    
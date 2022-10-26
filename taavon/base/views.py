from django.shortcuts import render
from .models import Members, Candidas, Votes
from .serializers import MemberSerializer, CandidaSerializer, VoteSerializer
from .validations import validateCode, validatePrs, validateMobile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


@api_view(['POST'])
def loginMember(request):
    data = request.data
    
    if not 'code' in data or not 'prs' in data:
        return Response({'success': False })

    code = data['code']
    validateCodeResult = validateCode(code)
    if not validateCodeResult['success']:
        return Response(validateCodeResult, status=status.HTTP_400_BAD_REQUEST)
    
    prs = data['prs']
    validatePrsResult = validatePrs(prs)
    if not validatePrsResult['success']:
        return Response(validatePrsResult, status=status.HTTP_400_BAD_REQUEST)
        
    memeber= Members.objects.get(prs=prs, code=code)
    if memeber:
        serializer= MemberSerializer(memeber, many=False)
        return Response({'success': True, 'member': serializer.data })
    else:
        return Response({'success': False })



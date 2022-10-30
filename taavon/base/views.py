from random import random
from .models import Members, Candidas, Votes, SMS
from .serializers import MemberSerializer, CandidaSerializer, VoteSerializer, CandidaVotesSerializer
from .validations import validateCode, validatePrs, validateMobile, selectionValidate, validateMobile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

zones = [1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1611,1612,1613,1614,1615,1616]

@api_view(['POST'])
def loginMember(request):
    data = request.data

    if not 'code' in data or not 'prs' in data or not 'mobile' in data:
        return Response({'success': False , 'msg': 'شماره ملی یا شماره پرسنلی ایراد دارد'})
    
    prs = data['prs']
    validatePrsResult = validatePrs(prs)
    if not validatePrsResult['success']:
        return Response(validatePrsResult, status=status.HTTP_400_BAD_REQUEST)
    
    code = data['code']
    validateCodeResult = validateCode(code)
    if not validateCodeResult['success']:
        return Response(validateCodeResult, status=status.HTTP_400_BAD_REQUEST)

    mobile = data['mobile']
    validateMobileResult = validateMobile(mobile)
    if not validateMobileResult['success']:
        return Response(validateMobileResult, status=status.HTTP_400_BAD_REQUEST)

    try:
        member= Members.objects.get(prs=prs, code=code)
    except:
        member = False
    if not member:
        return Response({'success': False, 'msg': 'کاربر موجود نیست'}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        preVoted = member.votes_set.all().count()
    except:
        preVoted= False
    if member.voted or preVoted:
        return Response({'success': False, 'msg': 'کاربر قبلا رای داده است'}, status=status.HTTP_400_BAD_REQUEST)
        
    smsSent = sendSMS(mobile)
    if smsSent:
        return Response({'success': True, 'msg': 'ارسال پیامک انجام شد', 'id': member.id, 'mobile': member.mobile, 'name': member.name, 'family': member.family}, status=status.HTTP_200_OK)
    else:
        return Response({'success': False, 'msg': 'ارسال پیامک با خطا مواجه شد'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def voteMember(request):
    data = request.data

    if not 'id' in data or not 'selection[]' in data:
        return Response({'success': False, 'msg': 'ایراد در ساختار داده ها'})

    id = data['id']
    ip = get_client_ip(request)
        
    try:
        member = Members.objects.get(id=id)
    except:
        return Response({'success': False, 'msg': 'کاربر وجود ندارد'}, status=status.HTTP_400_BAD_REQUEST)

    if member.voted:
        return Response({'success': False, 'msg': 'کاربر قبلا رای داده است'}, status=status.HTTP_200_OK)

    selectionList = request.POST.getlist('selection[]')
    
    selectionCount = len(selectionList)
    if selectionCount == 0 or selectionCount > 4:
        return Response({'success': False, 'msg': 'تعداد آرا ایراد دارد'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not selectionValidate(selectionList, member.zone):
        return Response({'success': False, 'msg': 'کاندیدا وجود ندارد'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        for selection in selectionList:
                candida=Candidas.objects.get(id=selection)
                Votes.objects.create(member=member, candida=candida, ip=ip, zone= member.zone)
                # candida.getVoteCount
        member.voted = True
        member.save()
        
    except:
        items = Votes.objects.filter(member=member)
        items.delete()
        
        member.voted = False
        member.save()
        return Response({'success': False, 'msg': 'مشکل در ذخیره سازی لطفا دوباره تلاش کنید'}, status=status.HTTP_400_BAD_REQUEST)
        
    return Response({'success': True})

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def calculateZoneVote(zone):
        zoneDic = {}
        zoneCandids = Candidas.objects.filter(zone=zone)
        zoneDic.update({'zoneID': zone})
        zoneDic.update({'candidaCount': zoneCandids.count()})
        zoneDic.update({'memberCount': Votes.objects.filter(zone=zone).values('member').distinct().count()})
        zoneDic.update({'voteCount': Votes.objects.filter(zone=zone).count()})
        candidaVote = {}
        for candid in zoneCandids:
            votesCount = Votes.objects.filter(candida=candid).count()
            candidaVote.update({candid.id: votesCount})
        zoneDic.update({'votes': candidaVote})
        return zoneDic

@api_view(['GET'])
def reportVotesAllZones(request):
    context = {}
    for zone in zones:
        zoneDic = calculateZoneVote(zone)
        context.update({zone: zoneDic})
    return Response(context)

@api_view(['GET'])
def reportVotesZone(request, zone):
    return Response(calculateZoneVote(zone))


def calculateCandidaVotes(candida):
    try:
        candida = Candidas.objects.get(prs=candida)
    except:
        return Response({'success': False, 'msg': 'چنین کاندیدایی یافت نشد'})
    
    serializer = CandidaVotesSerializer(candida, many=False)
    return(serializer.data)


@api_view(['GET'])
def reportVotesCandida(request, candida):
    return Response(calculateCandidaVotes(candida))

def sendSMS(mobile):
    try:
        password = round(random() * 1000000)
        print(password)
        SMS.objects.create(mobile=mobile, password=password)
        return True
    except:
        return False
    
@api_view(['POST'])
def confirmSMS(request):
    data = request.data
    print(data)
    if  'mobile' not in data or 'password' not in data or 'id' not in data:
        return Response({'success': False, 'msg': 'فرمت داده ها ایراد دارد'}, status=status.HTTP_404_NOT_FOUND)
    
    mobile = data['mobile']
    password = data['password']
    id = data['id']

    try:
        exists = SMS.objects.filter(password=password, mobile=mobile).count()
        member = Members.objects.get(id=id)
        if exists and member:
            # serializerMember= MemberSerializer(member, many=False)
            serializerCandid= CandidaSerializer(Candidas.objects.filter(zone=member.zone), many=True)
            return Response({'success': True, 'candidas': serializerCandid.data, 'msg': 'ورود تایید شد' }, status=status.HTTP_200_OK)
        else:
            return Response({'success': False, 'msg': 'کد وارد شده اشتباه است'}, status=status.HTTP_404_NOT_FOUND)            
    except:
        return Response({'success': False, 'msg': 'کد وارد شده اشتباه است'}, status=status.HTTP_404_NOT_FOUND)

from .models import Members, Candidas

def validateCode(code):
    if len(code) != 10:
        return {'success': False, 'msg': 'شماره ملی اشتباه است'}

    try:
        exists = Members.objects.get(code=code)
    except:
        exists = False
        
    if not exists:
        return {'success': False, 'msg': 'شماره ملی مجاز نیست'}
    return {'success': True, 'msg': 'شماره ملی مجاز است'}

def validatePrs(prs):
    if len(prs) != 8:
        return {'success': False, 'msg': 'شماره پرسنلی اشتباه است'}
    
    try:
        exists = Members.objects.get(prs=prs)
    except:
        exists = False
    
    if not exists:
        return {'success': False, 'msg': 'شماره پرسنلی مجاز نیست'}
    return {'success': True, 'msg': 'شماره پرسنلی مجاز است'}

def validateMobile(mobile):
    return True


def selectionValidate(selectionList, zone):
    for selection in selectionList:
        try:
            Candidas.objects.get(id=selection, zone=zone)
        except:
            return False
    return True  
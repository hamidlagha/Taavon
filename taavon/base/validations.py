from .models import Members, Candidas

def validateCode(code):
    if len(code) != 10:
        return {'success': False, 'msg': 'شماره ملی اشتباه است'}
    if not Members.objects.get(code=code):
        return {'success': False, 'msg': 'شماره ملی مجاز نیست'}
    return {'success': True, 'msg': 'شماره ملی مجاز است'}

def validatePrs(prs):
    if len(prs) != 8:
        return {'success': False, 'msg': 'شماره پرسنلی اشتباه است'}
    if not Members.objects.get(prs=prs):
        return {'success': False, 'msg': 'شماره پرسنلی مجاز نیست'}
    return {'success': True, 'msg': 'شماره پرسنلی مجاز است'}

def validateMobile(mobile):
    return True
from django.contrib import admin
from .models import Candidas, Members, Votes


admin.site.register(Members)
admin.site.register(Candidas)
admin.site.register(Votes)
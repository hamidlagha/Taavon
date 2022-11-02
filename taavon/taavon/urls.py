from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from base.views import loginMember, voteMember, reportVotesAllZones, reportVotesZone, reportVotesCandida,confirmSMS

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^images/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
    # re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),     
    path('api/v1/login/', loginMember, name='login-member'),
    path('api/v1/confirm/', confirmSMS, name='confirm-sms'),
    path('api/v1/vote/', voteMember, name='vote-member'),
    
    path('api/v1/report/allzones/', reportVotesAllZones, name='report-all-zones'),
    path('api/v1/report/zones/<str:zone>/', reportVotesZone, name='report-votes-zone'),
    
    path('api/v1/report/candidas/<str:candida>/votes/', reportVotesCandida, name='report-votes-candida'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))
]
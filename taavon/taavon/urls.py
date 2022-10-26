"""taavon URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django import views
from django.contrib import admin
from django.urls import path
from base.views import loginMember, voteMember, reportVotesAllZones, reportVotesZone, reportVotesCandida
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', loginMember, name='login-member'),
    path('vote/', voteMember, name='vote-member'),
    
    path('report/allzones/', reportVotesAllZones, name='report-all-zones'),
    path('report/zones/<str:zone>/', reportVotesZone, name='report-votes-zone'),
    
    path('report/candidas/<str:candida>/votes/', reportVotesCandida, name='report-votes-candida'),
]

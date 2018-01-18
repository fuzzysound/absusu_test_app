from django.conf.urls import url
from app import views

urlpatterns = [
    url(r'^$', views.mainpage),
    url(r'^through_banner/$', views.through_banner),
    url(r'^bannerpage/$', views.bannerpage),
    url(r'^through_button/$', views.through_button),
    url(r'^purchase/$', views.purchase),
]

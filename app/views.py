from django.shortcuts import render, redirect
from django.http import Http404
import requests

ABSUSU_ADDRESS = "http://ec2-52-79-219-15.ap-northeast-2.compute.amazonaws.com:8001/useractions/"

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def get_user_groups(ip, action):
    r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': action})
    return r.json()['groups']

def mainpage(request):
    ip = get_client_ip(request)
    groups = get_user_groups(ip, 'exp_banner_view')
    original = 'A'
    exp_banner_group = groups.get('exp_banner', original)
    if exp_banner_group in ['A', 'B', 'C']:
        return render(request, 'app/banner_{0}.html'.format(exp_banner_group.lower()))
    else:
        raise Http404("Unavailable experiment.")

def through_banner(request):
    ip = get_client_ip(request)
    r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': 'banner_click'})
    return redirect('/bannerpage/')

def bannerpage(request):
    ip = get_client_ip(request)
    groups = get_user_groups(ip, 'exp_button_view')
    original = 'A'
    exp_button_group = groups.get('exp_button', original)
    if exp_button_group in ['A', 'B']:
        return render(request, 'app/button_{0}.html'.format(exp_button_group.lower()))
    else:
        raise Http404("Unavailable experiment.")

def through_button(request):
    ip = get_client_ip(request)
    r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': 'button_click'})
    return redirect('/purchase/')

def purchase(request):
    return render(request, 'app/purchase.html')


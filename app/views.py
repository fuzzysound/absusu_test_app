from django.shortcuts import render, redirect
from django.http import Http404
import requests

ABSUSU_ADDRESS = "http://absusu.ts/useractions/"

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def get_user_groups(ip):
    # r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': 'exp_banner_view'})
    # return r.json()[0]['groups']
    return {'exp_banner': 'C', 'exp_button': 'B'}

def mainpage(request):
    ip = get_client_ip(request)
    groups = get_user_groups(ip)
    exp_banner_group = groups['exp_banner']
    if exp_banner_group in ['A', 'B', 'C']:
        return render(request, 'app/banner_{0}.html'.format(exp_banner_group.lower()))
    else:
        raise Http404("Unavailable experiment.")

def through_banner(request):
    ip = get_client_ip(request)
    # r = request.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': 'banner_click'})
    return redirect('/bannerpage/')

def bannerpage(request):
    ip = get_client_ip(request)
    groups = get_user_groups(ip)
    exp_button_group = groups['exp_button']
    if exp_button_group in ['A', 'B']:
        return render(request, 'app/button_{0}.html'.format(exp_button_group.lower()))
    else:
        raise Http404("Unavailable experiment.")
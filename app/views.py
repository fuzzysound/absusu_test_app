from django.shortcuts import render, redirect
from django.http import Http404, HttpResponse
import requests

# 외부에서 접근할 수 있는 A/B test server 주소
ABSUSU_ADDRESS = "http://localhost:8001/useractions/"
headers = {'Accept': 'application/json'}

# 클라이언트의 ip 주소를 반환하는 함수
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

# A/B test server에 post request를 보내 받은 response에서 group 할당 정보를 반환하는 함수
def get_user_groups(ip, action):
    """
    :param ip: 클라이언트의 ip 주소
    :param action: 클라이언트의 행동(click, view 등)
    :return: group 할당 정보, dict
    """
    r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': action}, headers=headers)
    return r.json()['groups']

# 메인 화면
def mainpage(request):
    ip = get_client_ip(request) # IP 주소 받기
    groups = get_user_groups(ip, 'exp_banner_view') # group 할당 정보 받기,
    original = 'banner_original' # 원래의 html 파일 이름 / 여기서는 통제집단 이름과 동일
    exp_banner_group = groups.get('exp_banner', original) # exp_banner 실험에서 유저가 할당된 집단, 실험이 없을 경우 원래의 것으로
    if exp_banner_group in ['banner_original', 'banner_top', 'banner_bottom']: # 할당된 집단이 올바를 경우
        return render(request, 'app/{0}.html'.format(exp_banner_group.lower()))
    else: # 할당된 집단이 올바르지 않을 경우
        raise Http404("Invalid experiment.")

# 배너를 클릭해서 접속할 때 거치는 리디렉션 경로
def through_banner(request):
    ip = get_client_ip(request)
    r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': 'banner_click'}, headers=headers) # A/B test server에 유저가 배너를 클릭했다고 알려줌
    return redirect('/bannerpage/') # 배너 페이지로 리디렉트

# 배너 페이지. mainpage()와 동일한 형식.
def bannerpage(request):
    ip = get_client_ip(request)
    groups = get_user_groups(ip, 'exp_button_view')
    original = 'button_original'
    exp_button_group = groups.get('exp_button', original)
    if exp_button_group in ['button_original', 'button_larger']:
        return render(request, 'app/{0}.html'.format(exp_button_group.lower()))
    else:
        raise Http404("Invalid experiment.")

# 버튼을 클릭해서 접속할 때 거치는 리디렉션 경로. through_banner()와 동일한 형식.
def through_button(request):
    ip = get_client_ip(request)
    r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': 'button_click'}, headers=headers)
    return redirect('/purchase/')

# 구매 페이지
def purchase(request):
    return render(request, 'app/purchase.html')

# user가 페이지를 떠나는 행동
def page_leave(request):
    ip = get_client_ip(request)
    r = requests.post(ABSUSU_ADDRESS, data={'ip': ip, 'action': 'page_leave'})  # A/B test server에 유저가 페이지를 떠난다고 알려줌
    return HttpResponse(status=200)

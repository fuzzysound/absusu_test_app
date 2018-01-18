/**
 * Created by cassmee on 2017-06-05.
 */

var OksusuVideoAsset = (

    function () {

      var keyword = {};

      var PLAYER = '';

      var TOOLTIP = '';

      var POSTER = '';
      var IGS = '';

      var LIVE_MUSIC_BG = '';

      var TITLE = '';

      var PREV_BUTTON = '';
      var NEXT_BUTTON = '';

      var RIGHT_CONTAINER = '';
      var REPLAY_BUTTON = '';
      var MOSAIC_BUTTON = '';

      var VOLUME_BAR_EVENTAREA = '';

      var VOLUME_CONTROLLER = '';

      var PLAYTIME_CONTROLLER = '';

      var SETTING_POPUP = '';

      var NEXT_PREVIEW_POPUP = '';

      var SHARE_POPUP = '';

      var KEYBOARD_HELP_POPUP = '';

      var MOSAIC_POPUP = '';
      var MOSAIC_LIST_LIVE = '';
      var MOSAIC_LIST_CLIP = '';
      var MOSAIC_LIST_EXCEPTION_GAMEOUT = '';
      var MOSAIC_LIST_EXCEPTION_BLACKOUT = '';
      var MOSAIC_LIST_EXCEPTION_DRM = '';
      var MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION = '';
      var MOSAIC_LIST_EXCEPTION_LOGIN = '';
      var MOSAIC_LIST_EXCEPTION_BUY = '';

      var EXCEPTION_POPUP = '';
      var EXCEPTION_LOGIN = '';
      var EXCEPTION_GAMEOUT = '';
      var EXCEPTION_BLACKOUT = '';
      var EXCEPTION_DRM = '';
      var EXCEPTION_ADULT_CERTIFICATION = '';
      var EXCEPTION_ADULT_BUY = '';
      var EXCEPTION_BUY = '';
      var EXCEPTION_AGE_12 = '';
      var EXCEPTION_AGE_15 = '';
      var EXCEPTION_AGE_19 = '';
      var EXCEPTION_NOT_SUPPORTED_BROWSER = '';
      var EXCEPTION_NOT_SUPPORTED_BROWSER_MAC = '';
      var EXCEPTION_FOREIGN_IP_ONLINE = '';

      var EXCEPTION_LOGIN_MINI = '';
      var EXCEPTION_GAMEOUT_MINI = '';
      var EXCEPTION_BLACKOUT_MINI = '';
      var EXCEPTION_DRM_MINI = '';
      var EXCEPTION_ADULT_CERTIFICATION_MINI = '';
      var EXCEPTION_AGE_12_MINI = '';
      var EXCEPTION_AGE_15_MINI = '';
      var EXCEPTION_AGE_19_MINI = '';

      var ALERT_NEXT_PLAY = '';
      var ALERT_NEXT_BUY = '';
      var ALERT_RELAY_PLAY = '';
      var ALERT_SAMETIME_CONNECT = '';
      var ALERT_ADULT_CERTIFICATION_SUCCESS = '';
      var ALERT_ADULT_CERTIFICATION_FAILURE = '';
      var ALERT_ADULT_CERTIFICATION_ERROR = '';
      var ALERT_STREAM_ERROR = '';

      var TOAST_POPUP = '';

      var TAG = {};

      var IMAGE_URL = '/public/assets/img/';

      // 플레이어
      PLAYER += '<video class="video-js vjs-default-skin">';
      PLAYER += '</video>';

      // 툴팁
      TOOLTIP += '<span class="tooltip-text"><i class="ico-arrow"></i></span>';

      // 포스터
      POSTER += '<div class="movie-thumb03">';
      POSTER += '<span class="posterBgBox" style="background-image: url(' + "'" + IMAGE_URL + 'img_vmovie_bg.png' + "'" + ')">영화 포스터</span>';
      POSTER += '<span class="posterBox" style="background-image: url(' + "'" + IMAGE_URL + 'img_vmovie_bg.png' + "'" + ')">영화 포스터</span>';
      POSTER += '<button type="button" class="btnPlayBefore"><em>재생</em></button>';
      POSTER += '</div>';

      // IGS
      IGS += '<div class="movie-thumb02" style="background-image: url(' + "'" + IMAGE_URL + 'bg_play-before.png' + "'" + ')">';
      IGS += 'IGS';
      IGS += '<button type="button" class="btnPlayBefore"><em>재생</em></button>';
      IGS += '</div>';

      // 음악채널 배경
      LIVE_MUSIC_BG += '<div class="vjs-music-wrap">';
      LIVE_MUSIC_BG += '<div>';
      LIVE_MUSIC_BG += '<h3>음오아예 : 마마무</h3>';
      LIVE_MUSIC_BG += '<h4>가요명곡 퍼레이드</h4>';
      LIVE_MUSIC_BG += '</div>';
      LIVE_MUSIC_BG += '</div>';

      // 타이틀
      TITLE += '<span class="vjs-title-text"></span>';

      // 이전 버튼
      PREV_BUTTON += '<button class="vjs-play-control vjs-prev-control" title="이전">';
      PREV_BUTTON += '<span class="tooltip-text"><i class="ico-arrow"></i></span>';
      PREV_BUTTON += '</button>';

      // 다음 버튼
      NEXT_BUTTON += '<button class="vjs-play-control vjs-next-control" title="다음">';
      NEXT_BUTTON += '<span class="tooltip-text"><i class="ico-arrow"></i></span>';
      NEXT_BUTTON += '</button>';

      // 연속재생, 모자이크, 채팅 버튼을 위한 컨테이너
      RIGHT_CONTAINER += '<div class="vjs-rightBox-control">';
      RIGHT_CONTAINER += '</div>';

      // 연속재생 버튼
      REPLAY_BUTTON += '<button class="vjs-replay-control" title="연속재생">';
      REPLAY_BUTTON += '<span class="tooltip-text"><i class="ico-arrow"></i></span>';
      REPLAY_BUTTON += '</button>';

      // 모자이크 버튼
      MOSAIC_BUTTON += '<button class="vjs-mosaic-control" title="추천영상">';
      MOSAIC_BUTTON += '<span class="tooltip-text"><i class="ico-arrow"></i></span>';
      MOSAIC_BUTTON += '</button>';

      // 볼륨 슬라이더 show, hide 이벤트 처리를 위한 히트영역
      VOLUME_BAR_EVENTAREA += '<div class="volume-bar-eventarea">';
      VOLUME_BAR_EVENTAREA += '</div>';

      // 음소거, 음량조절 영역
      VOLUME_CONTROLLER += '<div class="volume-big-control">';
      VOLUME_CONTROLLER += '<div class="volume-upbox">';
      VOLUME_CONTROLLER += '<strong class="visibility_hidden">음량조절단계</strong>';
      VOLUME_CONTROLLER += '<div class="volume-control"></div>';
      VOLUME_CONTROLLER += '<div class="volume-content"><div style="width:50%"></div></div>';
      VOLUME_CONTROLLER += '</div>';
      VOLUME_CONTROLLER += '<div class="volume-mute">음소거</div>';
      VOLUME_CONTROLLER += '</div>';

      // 재생시간 영역
      PLAYTIME_CONTROLLER += '<div class="play-time-control">';
      PLAYTIME_CONTROLLER += '<div class="time-control"><i class="ico-time"></i>00:00:05</div>';
      PLAYTIME_CONTROLLER += '<div class="total-time">00:01:24</div>';
      PLAYTIME_CONTROLLER += '</div>';

      // 설정 팝업
      SETTING_POPUP += '<div class="vjs-setting-wrap">';
      SETTING_POPUP += '<div class="vjs-setting-box">';
      SETTING_POPUP += '<ul class="vjs-setting-menu">';
      SETTING_POPUP += '<li>';
      SETTING_POPUP += '<span class="setting-title">화질설정</span>';
      SETTING_POPUP += '<span class="setting-content">Auto</span>';
      SETTING_POPUP += '</li>';
      SETTING_POPUP += '<li>';
      SETTING_POPUP += '<span class="setting-title">화면비율</span>';
      SETTING_POPUP += '<span class="setting-content">원본비율</span>';
      SETTING_POPUP += '</li>';
      SETTING_POPUP += '<li>';
      SETTING_POPUP += '<span class="setting-title">도움말</span>';
      SETTING_POPUP += '<span class="setting-content"></span>';
      SETTING_POPUP += '</li>';
      SETTING_POPUP += '</ul>';
      SETTING_POPUP += '<div class="setting-quality">';
      SETTING_POPUP += '<div class="setting-sub-menu">화질설정</div>';
      SETTING_POPUP += '<ul class="setting-item">';
      SETTING_POPUP += '<li class="on">Auto</li>';
      SETTING_POPUP += '<li>SD</li>';
      SETTING_POPUP += '<li>HD</li>';
      SETTING_POPUP += '<li>Full HD</li>';
      SETTING_POPUP += '</ul>';
      SETTING_POPUP += '</div>';
      SETTING_POPUP += '<div class="setting-ratio">';
      SETTING_POPUP += '<div class="setting-sub-menu">화면비율</div>';
      SETTING_POPUP += '<ul class="setting-item">';
      SETTING_POPUP += '<li class="on">원본비율</li>';
      SETTING_POPUP += '<li>꽉찬화면</li>';
      SETTING_POPUP += '</ul>';
      SETTING_POPUP += '</div>';
      SETTING_POPUP += '<i class="ico-arrow"></i>';
      SETTING_POPUP += '</div>';
      SETTING_POPUP += '</div>';

      // 다음 미리보기 팝업
      NEXT_PREVIEW_POPUP += '<div class="preview-wrap normal">';
      NEXT_PREVIEW_POPUP += '<div class="preview-title">NEXT <span class="one">1회차로 돌아갑니다.</span></div>';
      NEXT_PREVIEW_POPUP += '<div class="preview-bg" style="background-image:url(' + "'" + IMAGE_URL + 'img_vpreview_bg.png' + "'" + ');"></div>';
      NEXT_PREVIEW_POPUP += '<div class="preview-info-box">';
      NEXT_PREVIEW_POPUP += '<div class="preview-inner-info">';
      NEXT_PREVIEW_POPUP += '<span class="preview-text">비투비, 팬사인회 통해 팬들과 만난다.</span>';
      NEXT_PREVIEW_POPUP += '<span class="preview-sub-text">스타뉴스 2017.03.11</span>';
      NEXT_PREVIEW_POPUP += '</div>';
      NEXT_PREVIEW_POPUP += '</div>';
      NEXT_PREVIEW_POPUP += '<a href="#" class="preview-close" title="다음재생 정보 닫기">닫기</a>';
      NEXT_PREVIEW_POPUP += '</div>';

      // 공유하기 팝업
      SHARE_POPUP += '<div class="vjs-sharebox">';
      SHARE_POPUP += '<div class="vjs-share-inner">';
      SHARE_POPUP += '<h3>공유하기</h3>';
      SHARE_POPUP += '<ul>';
      SHARE_POPUP += '<li><a href="#" title="페이스북"><img src="' + IMAGE_URL + 'ico_vshare_facebook.png" alt="facebook"><div>페이스북</div></a></li>';
      SHARE_POPUP += '<li><a href="#" title="카카오"><img src="' + IMAGE_URL + 'ico_vshare_kakao.png" alt="kakao"><div>카카오</div></a></li>';
      SHARE_POPUP += '<li><a href="#" title="밴드"><img src="' + IMAGE_URL + 'ico_vshare_band.png" alt="band"><div>밴드</div></a></li>';
      SHARE_POPUP += '</ul>';
      SHARE_POPUP += '<div class="vjs-share-copy">';
      SHARE_POPUP += '<div class="share-text">';
      SHARE_POPUP += 'http://oksusu.com/v/vb55bVISteSTffRLElelR6SEqsgRT325';
      SHARE_POPUP += '</div>';
      SHARE_POPUP += '<a href="#" class="btn-share" title="링크복사하기">복사</a>';
      SHARE_POPUP += '</div>';
      SHARE_POPUP += '</div>';
      SHARE_POPUP += '<a href="#" class="vjs-share-close" title="공유하기 팝업닫기">닫기</a>';
      SHARE_POPUP += '</div>';

      // 키보드 조작 안내 팝업
      KEYBOARD_HELP_POPUP += '<div class="vjs-setting-help">';
      KEYBOARD_HELP_POPUP += '<div class="help-box">';
      KEYBOARD_HELP_POPUP += '<div class="help-title"><span>키보드</span> 조작 안내</div>';
      KEYBOARD_HELP_POPUP += '<img src="' + IMAGE_URL + 'img_vhelp_keyboard.png" alt="키보드 조작안내">';
      KEYBOARD_HELP_POPUP += '</div>';
      KEYBOARD_HELP_POPUP += '<a href="#" class="help-close" title="키보드 조작안내 팝업 닫기">닫기</a>';
      KEYBOARD_HELP_POPUP += '</div>';

      // 모자이크 보기 팝업
      MOSAIC_POPUP += '<div class="vjs-mosaic-wrap">';
      MOSAIC_POPUP += '<div class="vjs-mosaic-box">';
      MOSAIC_POPUP += '<ul class="mosaic-tab">';
      MOSAIC_POPUP += '<li class="on"><a href="#" title="전체채널">전체채널</a></li>';
      MOSAIC_POPUP += '<li><a href="#" title="인기채널">인기채널</a></li>';
      MOSAIC_POPUP += '</ul>';
      MOSAIC_POPUP += '<div class="mosaic-list-wrap">';
      MOSAIC_POPUP += '<div class="list-wrap">';
      MOSAIC_POPUP += '</div>';
      MOSAIC_POPUP += '</div>';
      MOSAIC_POPUP += '<div class="vjs-slider-btn">';
      MOSAIC_POPUP += '<a href="#" class="arrow btn-prev" title="이전">이전</a>';
      MOSAIC_POPUP += '<a href="#" class="arrow btn-next" title="다음">다음</a>';
      MOSAIC_POPUP += '</div>';
      MOSAIC_POPUP += '<div class="vjs-slider-indicate">';
      MOSAIC_POPUP += '<a href="#" class="btn-indi on">1';
      MOSAIC_POPUP += '</a>';
      MOSAIC_POPUP += '<a href="#" class="btn-indi">2';
      MOSAIC_POPUP += '</a>';
      MOSAIC_POPUP += '<a href="#" class="btn-indi">3';
      MOSAIC_POPUP += '</a>';
      MOSAIC_POPUP += '<a href="#" class="btn-indi">4';
      MOSAIC_POPUP += '</a>';
      MOSAIC_POPUP += '<a href="#" class="btn-indi">5';
      MOSAIC_POPUP += '</a>';
      MOSAIC_POPUP += '</div>';
      MOSAIC_POPUP += '</div>';
      MOSAIC_POPUP += '<a href="#" class="mosaic-close" title="추천영상 팝업닫기">닫기</a>';
      MOSAIC_POPUP += '</div>';

      // 모자이크 보기 LIVE
      MOSAIC_LIST_LIVE += '<a href="#">';
      MOSAIC_LIST_LIVE += '<div class="list-box">';
      MOSAIC_LIST_LIVE += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vmosaic_bg02.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_LIVE += '<div class="list-title"><span>3MC들의 출근길 파파라치 패션</span></div>';
      MOSAIC_LIST_LIVE += '</div>';
      MOSAIC_LIST_LIVE += '<div class="list-info live">';
      MOSAIC_LIST_LIVE += '<div class="list-info-box">';
      MOSAIC_LIST_LIVE += '<div class="list-subtitle">JTBC3 SPORTS</div>';
      MOSAIC_LIST_LIVE += '<div class="list-title">2017월드베이스볼 클래식<br><대한민국VS대만></div>';
      MOSAIC_LIST_LIVE += '<div class="list-stat">오후02:08~오후03:40</div>';
      MOSAIC_LIST_LIVE += '</div>';
      MOSAIC_LIST_LIVE += '<div class="ico_box">';
      MOSAIC_LIST_LIVE += '<span class="ico_free">FREE</span>';
      MOSAIC_LIST_LIVE += '<span class="ico_chatting">채팅중</span>';
      MOSAIC_LIST_LIVE += '</div>';
      MOSAIC_LIST_LIVE += '<div class="info-play-linear"><span style="width:30%"></span></div>';
      MOSAIC_LIST_LIVE += '</div>';
      MOSAIC_LIST_LIVE += '</a>';

      // 모자이크 보기 CLIP
      MOSAIC_LIST_CLIP += '<a href="#">';
      MOSAIC_LIST_CLIP += '<div class="list-box">';
      MOSAIC_LIST_CLIP += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vmosaic_bg.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_CLIP += '<div class="list-title"><span>3MC들의 출근길 파파라치 패션</span></div>';
      MOSAIC_LIST_CLIP += '</div>';
      MOSAIC_LIST_CLIP += '<div class="list-info">';
      MOSAIC_LIST_CLIP += '<div class="list-info-box">';
      MOSAIC_LIST_CLIP += '<div class="list-title">비투비, 팬사인회 통해 팬들과 만난다.</div>';
      MOSAIC_LIST_CLIP += '<div class="list-subtitle">스타뉴스(217.03.11)</div>';
      MOSAIC_LIST_CLIP += '<div class="list-stat"><span class="ico ico_time">35:52</span><span class="ico ico_view">12,300</span></div>';
      MOSAIC_LIST_CLIP += '</div>';
      MOSAIC_LIST_CLIP += '</div>';
      MOSAIC_LIST_CLIP += '</a>';

      // 모자이크 보기 예외 케이스 :: LIVE 채널 : 경기시간이 아닐 때
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '<a href="#">';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '<div class="list-box ex">';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vexception_bg.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '<div class="list-title">';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '<div class="popup_top">';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '<strong>JTBC3 SPORTS</strong>';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '<div class="popup_content">';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '지금 경기시간이 아닙니다.';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_GAMEOUT += '</a>';

      // 모자이크 보기 예외 케이스 :: 블랙아웃 : 시간 경과
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '<a href="#">';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '<div class="list-box ex">';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vexception_bg.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '<div class="list-title">';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '<div class="popup_top">';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '<strong>JTBC3 SPORTS</strong>';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '<div class="popup_content">';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '방송정보가 없습니다.';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '</div>';
      MOSAIC_LIST_EXCEPTION_BLACKOUT += '</a>';

      // 모자이크 보기 예외 케이스 :: DRM 안내
      MOSAIC_LIST_EXCEPTION_DRM += '<a href="#">';
      MOSAIC_LIST_EXCEPTION_DRM += '<div class="list-box ex">';
      MOSAIC_LIST_EXCEPTION_DRM += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vexception_bg.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_EXCEPTION_DRM += '<div class="list-title">';
      MOSAIC_LIST_EXCEPTION_DRM += '<div class="popup_top">';
      MOSAIC_LIST_EXCEPTION_DRM += '<strong>JTBC3 SPORTS</strong>';
      MOSAIC_LIST_EXCEPTION_DRM += '</div>';
      MOSAIC_LIST_EXCEPTION_DRM += '<div class="popup_content">';
      MOSAIC_LIST_EXCEPTION_DRM += '방송 프로그램의 저작권 문제로<br>제공되지 않습니다.';
      MOSAIC_LIST_EXCEPTION_DRM += '</div>';
      MOSAIC_LIST_EXCEPTION_DRM += '</div>';
      MOSAIC_LIST_EXCEPTION_DRM += '</div>';
      MOSAIC_LIST_EXCEPTION_DRM += '</a>';

      // 모자이크 보기 예외 케이스 :: LIVE 성인채널 : 비로그인
      // 모자이크 보기 예외 케이스 :: LIVE 성인채널 : 로그인 > 인증 받지 않은 회원 & 미성인 회원
      // 모자이크 보기 예외 케이스 :: LIVE 성인채널 : 성인 > 상품 미보유시
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '<a href="#">';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '<div class="list-box ex">';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vexception_bg.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '<div class="list-title">';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '<div class="popup_top">';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '<strong>JTBC3 SPORTS</strong>';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '</div>';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '<div class="popup_content">';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '[19세 이상 관람가]<br>시청이 제한된 프로그램입니다.';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '</div>';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '</div>';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '</div>';
      MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION += '</a>';

      // 모자이크 보기 예외 케이스 :: 로그인이 필요한 채널인 경우
      MOSAIC_LIST_EXCEPTION_LOGIN += '<a href="#">';
      MOSAIC_LIST_EXCEPTION_LOGIN += '<div class="list-box ex">';
      MOSAIC_LIST_EXCEPTION_LOGIN += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vexception_bg.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_EXCEPTION_LOGIN += '<div class="list-title">';
      MOSAIC_LIST_EXCEPTION_LOGIN += '<div class="popup_top">';
      MOSAIC_LIST_EXCEPTION_LOGIN += '<strong>JTBC3 SPORTS</strong>';
      MOSAIC_LIST_EXCEPTION_LOGIN += '</div>';
      MOSAIC_LIST_EXCEPTION_LOGIN += '<div class="popup_content">';
      MOSAIC_LIST_EXCEPTION_LOGIN += '로그인이 필요한 콘텐츠입니다.';
      MOSAIC_LIST_EXCEPTION_LOGIN += '</div>';
      MOSAIC_LIST_EXCEPTION_LOGIN += '</div>';
      MOSAIC_LIST_EXCEPTION_LOGIN += '</div>';
      MOSAIC_LIST_EXCEPTION_LOGIN += '</a>';

      // 모자이크 보기 예외 케이스 :: 미구매 채널인 경우
      MOSAIC_LIST_EXCEPTION_BUY += '<a href="#">';
      MOSAIC_LIST_EXCEPTION_BUY += '<div class="list-box ex">';
      MOSAIC_LIST_EXCEPTION_BUY += '<div class="list-img"><img src="' + IMAGE_URL + 'img_vexception_bg.png" alt="방송 썸네일"></div>';
      MOSAIC_LIST_EXCEPTION_BUY += '<div class="list-title">';
      MOSAIC_LIST_EXCEPTION_BUY += '<div class="popup_top">';
      MOSAIC_LIST_EXCEPTION_BUY += '<strong>JTBC3 SPORTS</strong>';
      MOSAIC_LIST_EXCEPTION_BUY += '</div>';
      MOSAIC_LIST_EXCEPTION_BUY += '<div class="popup_content">';
      MOSAIC_LIST_EXCEPTION_BUY += '상품 구매 후<br>시청이 가능한 프로그램입니다.';
      MOSAIC_LIST_EXCEPTION_BUY += '</div>';
      MOSAIC_LIST_EXCEPTION_BUY += '</div>';
      MOSAIC_LIST_EXCEPTION_BUY += '</div>';
      MOSAIC_LIST_EXCEPTION_BUY += '</a>';

      // 예외 케이스 팝업
      EXCEPTION_POPUP += '<div class="video_exception_popup">';
      EXCEPTION_POPUP += '<div class="video_popup_inner">';
      EXCEPTION_POPUP += '</div>';
      EXCEPTION_POPUP += '</div>';

      // 예외 케이스 :: 비 로그인 시
      EXCEPTION_LOGIN += '<div class="popup_content">';
      EXCEPTION_LOGIN += '로그인 후 사용 가능합니다.<br>로그인 페이지로 이동하시겠습니까?';
      EXCEPTION_LOGIN += '</div>';
      EXCEPTION_LOGIN += '<div class="popup_btn_box">';
      EXCEPTION_LOGIN += '<button class="btn btn_default" title="확인">확인</button>';
      EXCEPTION_LOGIN += '</div>';

      // 예외 케이스 MINI :: LIVE : 비 로그인 시
      EXCEPTION_LOGIN_MINI += '<div class="popup_content">';
      EXCEPTION_LOGIN_MINI += '로그인이 필요한 콘텐츠입니다.<br>로그인 후 시청해주세요.';
      EXCEPTION_LOGIN_MINI += '</div>';

      // 예외 케이스 :: LIVE 채널 : 경기시간이 아닐 때
      EXCEPTION_GAMEOUT += '<div class="video_exception_popup">';
      EXCEPTION_GAMEOUT += '<div class="popup_top">';
      EXCEPTION_GAMEOUT += '<strong>SPO TV4</strong> 지금은 경기시간이 아닙니다.';
      EXCEPTION_GAMEOUT += '</div>';
      EXCEPTION_GAMEOUT += '<div class="video_popup_inner">';
      EXCEPTION_GAMEOUT += '<div class="popup_content">';
      EXCEPTION_GAMEOUT += '지금 경기시간이 아닙니다.<br>경기가 시작되면 시청해주세요.';
      EXCEPTION_GAMEOUT += '</div>';
      EXCEPTION_GAMEOUT += '</div>';
      EXCEPTION_GAMEOUT += '</div>';

      // 예외 케이스 MINI :: LIVE 채널 : 경기시간이 아닐 때
      EXCEPTION_GAMEOUT_MINI += '<div class="video_exception_popup">';
      EXCEPTION_GAMEOUT_MINI += '<div class="popup_top">';
      EXCEPTION_GAMEOUT_MINI += '<strong>SPO TV4</strong> 지금은 경기시간이 아닙니다.';
      EXCEPTION_GAMEOUT_MINI += '</div>';
      EXCEPTION_GAMEOUT_MINI += '<div class="video_popup_inner">';
      EXCEPTION_GAMEOUT_MINI += '<div class="popup_content">';
      EXCEPTION_GAMEOUT_MINI += '지금 경기시간이 아닙니다.<br>경기가 시작되면 시청해주세요.';
      EXCEPTION_GAMEOUT_MINI += '</div>';
      EXCEPTION_GAMEOUT_MINI += '</div>';
      EXCEPTION_GAMEOUT_MINI += '</div>';

      // 예외 케이스 :: 블랙아웃 : 시간 경과
      EXCEPTION_BLACKOUT += '<div class="popup_content">';
      EXCEPTION_BLACKOUT += '방송사의 사정으로 제공할 수 없습니다.<br>';
      EXCEPTION_BLACKOUT += '다른 채널을 시청해주세요.';
      EXCEPTION_BLACKOUT += '</div>';

      // 예외 케이스 MINI :: 블랙아웃 : 시간 경과
      EXCEPTION_BLACKOUT_MINI += '<div class="popup_content">';
      EXCEPTION_BLACKOUT_MINI += '방송사의 사정으로 제공할 수 없습니다.<br>';
      EXCEPTION_BLACKOUT_MINI += '다른 채널을 시청해주세요.';
      EXCEPTION_BLACKOUT_MINI += '</div>';

      // 예외 케이스 :: DRM 안내
      EXCEPTION_DRM += '<div class="popup_content">';
      EXCEPTION_DRM += '방송 프로그램의 저작권 문제로<br>제공되지 않습니다.<br>다른 채널을 시청해주세요.';
      EXCEPTION_DRM += '</div>';

      // 예외 케이스 MINI :: DRM 안내
      EXCEPTION_DRM_MINI += '<div class="popup_content">';
      EXCEPTION_DRM_MINI += '방송 프로그램의 저작권 문제로<br>제공되지 않습니다.<br>다른 채널을 시청해주세요.';
      EXCEPTION_DRM_MINI += '</div>';

      // 예외 케이스 :: LIVE 성인채널 : 로그인 > 인증 받지 않은 회원 & 미성인 회원
      EXCEPTION_ADULT_CERTIFICATION += '<div class="popup_content">';
      EXCEPTION_ADULT_CERTIFICATION += '<div class="content_img"><img src="' + IMAGE_URL + 'ico_vexception_lock.png" alt="성인채널 잠금 아이콘"></div>';
      EXCEPTION_ADULT_CERTIFICATION += '[성인전용채널]<br>시청이 제한된 프로그램입니다.<br>인증 후, 시청이 가능합니다.';
      EXCEPTION_ADULT_CERTIFICATION += '</div>';
      EXCEPTION_ADULT_CERTIFICATION += '<div class="popup_btn_box">';
      EXCEPTION_ADULT_CERTIFICATION += '<button class="btn btn_default">인증하기</button>';
      EXCEPTION_ADULT_CERTIFICATION += '</div>';

      // 예외 케이스 MINI :: LIVE 성인채널 : 로그인 > 인증 받지 않은 회원 & 미성인 회원
      EXCEPTION_ADULT_CERTIFICATION_MINI += '<div class="popup_content">';
      EXCEPTION_ADULT_CERTIFICATION_MINI += '<div class="content_img"><img src="' + IMAGE_URL + 'ico_vexception_lock.png" alt="성인채널 잠금 아이콘"></div>';
      EXCEPTION_ADULT_CERTIFICATION_MINI += '[성인전용채널]<br>성인 인증이 필요한 프로그램입니다. <br>인증 후 시청해 주세요.';
      EXCEPTION_ADULT_CERTIFICATION_MINI += '</div>';

      // 예외 케이스 :: LIVE 성인채널 : 성인 > 상품 미보유시
      EXCEPTION_ADULT_BUY += '<div class="video_exception_popup type03">';
      EXCEPTION_ADULT_BUY += '<div class="video_popup_inner">';
      EXCEPTION_ADULT_BUY += '<div class="popup_content">';
      EXCEPTION_ADULT_BUY += '<div class="adultExceptWrap">';
      EXCEPTION_ADULT_BUY += '<span class="adultExceptInner">';
      EXCEPTION_ADULT_BUY += '<span class="icoAdult">성인채널 잠금 아이콘</span>';
      EXCEPTION_ADULT_BUY += '<strong class="adultTit">성인전용채널</strong>[이용권]에서 상품구매 후,<br>시청이 가능합니다.';
      EXCEPTION_ADULT_BUY += '</span>';
      EXCEPTION_ADULT_BUY += '</div>';
      EXCEPTION_ADULT_BUY += '</div>';
      EXCEPTION_ADULT_BUY += '</div>';
      EXCEPTION_ADULT_BUY += '</div>';

      // 예외 케이스 :: 영화, 방송VOD  : 비 로그인 시
      // 예외 케이스 :: 영화, 방송VOD  : 로그인 & 상품 미구매
      EXCEPTION_BUY += '<div class="popup_content">';
      EXCEPTION_BUY += '구매가 필요한 콘텐츠입니다.';
      EXCEPTION_BUY += '</div>';
      EXCEPTION_BUY += '<div class="popup_btn_box">';
      EXCEPTION_BUY += '<button class="btn btn_default" title="구매하기">구매하기</button>';
      EXCEPTION_BUY += '</div>';

      // 예외 케이스 :: LIVE : 12세 미만 이용 제한
      EXCEPTION_AGE_12 += '<div class="popup_content">';
      EXCEPTION_AGE_12 += '[12세 이상 관람가]<br>시청이 제한된 프로그램입니다.<br>인증 후, 시청이 가능합니다.';
      EXCEPTION_AGE_12 += '</div>';
      EXCEPTION_AGE_12 += '<div class="popup_btn_box">';
      EXCEPTION_AGE_12 += '<button class="btn btn_default" title="확인">인증하기</button>';
      EXCEPTION_AGE_12 += '</div>';

      // 예외 케이스 MINI :: LIVE : 12세 미만 이용 제한
      EXCEPTION_AGE_12_MINI += '<div class="popup_content">';
      EXCEPTION_AGE_12_MINI += '[12세 이상 관람가]<br>시청이 제한된 프로그램입니다.<br>인증 후, 시청이 가능합니다.';
      EXCEPTION_AGE_12_MINI += '</div>';

      // 예외 케이스 :: LIVE : 15세 미만 이용 제한
      EXCEPTION_AGE_15 += '<div class="popup_content">';
      EXCEPTION_AGE_15 += '[15세 이상 관람가]<br>시청이 제한된 프로그램입니다.<br>인증 후, 시청이 가능합니다.';
      EXCEPTION_AGE_15 += '</div>';
      EXCEPTION_AGE_15 += '<div class="popup_btn_box">';
      EXCEPTION_AGE_15 += '<button class="btn btn_default" title="확인">인증하기</button>';
      EXCEPTION_AGE_15 += '</div>';

      // 예외 케이스 MINI :: LIVE : 15세 미만 이용 제한
      EXCEPTION_AGE_15_MINI += '<div class="popup_content">';
      EXCEPTION_AGE_15_MINI += '[15세 이상 관람가]<br>시청이 제한된 프로그램입니다.<br>인증 후, 시청이 가능합니다.';
      EXCEPTION_AGE_15_MINI += '</div>';

      // 예외 케이스 :: LIVE : 19세 미만 이용 제한
      EXCEPTION_AGE_19 += '<div class="popup_content">';
      EXCEPTION_AGE_19 += '[19세 이상 관람가]<br>시청이 제한된 프로그램입니다.<br>인증 후, 시청이 가능합니다.';
      EXCEPTION_AGE_19 += '</div>';
      EXCEPTION_AGE_19 += '<div class="popup_btn_box">';
      EXCEPTION_AGE_19 += '<button class="btn btn_default" title="확인">인증하기</button>';
      EXCEPTION_AGE_19 += '</div>';

      // 예외 케이스 MINI :: LIVE : 19세 미만 이용 제한
      EXCEPTION_AGE_19_MINI += '<div class="popup_content">';
      EXCEPTION_AGE_19_MINI += '[19세 이상 관람가]<br>시청이 제한된 프로그램입니다.<br>인증 후, 시청이 가능합니다.';
      EXCEPTION_AGE_19_MINI += '</div>';

      // 예외 케이스 :: 브라우저 미지원
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<div class="video_exception_popup type02">';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<div class="video_popup_inner">';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<div class="popup_content">';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '지원하지 않는 브라우저 입니다.<br>Chrome 혹은 IE11이상을 다운로드 받으세요.';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '</div>';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<div class="popup_btn_box">';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<a title="Internet Explorer 11 다운로드" class="btn_browser"><span>Internet Explorer 11 <br>다운로드<i class="ico_down"></i></span></a>';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<a title="Chrome 다운로드" class="btn_browser"><span>Chrome<br>다운로드<i class="ico_down"></i></span></a>';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '</div>';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<div class="popup_btn_box">';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '<a title="지원 브라우저 보기" class="btn_browser_detail">지원 브라우저 보기</a>';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '</div>';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '</div>';
      EXCEPTION_NOT_SUPPORTED_BROWSER += '</div>';

      // 예외 케이스 :: 브라우저 미지원 : MAC
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '<div class="video_exception_popup type02">';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '<div class="video_popup_inner">';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '<div class="popup_content">';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '지원하지 않는 브라우저 입니다. <br> Chrome, Safari, Firefox 를 이용해 주세요.';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '</div>';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '<div class="popup_btn_box">';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '<a title="지원 브라우저 보기" class="btn_browser_detail">지원 브라우저 보기</a>';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '</div>';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '</div>';
      EXCEPTION_NOT_SUPPORTED_BROWSER_MAC += '</div>';

      // 예외 케이스 :: 해외 IP ONLINE
      EXCEPTION_FOREIGN_IP_ONLINE += '<div class="popup_content">';
      EXCEPTION_FOREIGN_IP_ONLINE += '저작권자의 요청에 의해 해외에서는<br>구매 및 시청이 제한됩니다.';
      EXCEPTION_FOREIGN_IP_ONLINE += '</div>';

      // 얼럿 :: 다음회차 시청
      ALERT_NEXT_PLAY += '<div class="video_popup_wrap nextnotice play">';
      ALERT_NEXT_PLAY += '<div class="video_popup_inner">';
      ALERT_NEXT_PLAY += '<div class="popup_content">';
      ALERT_NEXT_PLAY += '다음 회차를<br>시청하시겠습니까?';
      ALERT_NEXT_PLAY += '</div>';
      ALERT_NEXT_PLAY += '<div class="popup_btn_box">';
      ALERT_NEXT_PLAY += '<button class="btn btn_confirm" title="시청하기">시청하기</button>';
      ALERT_NEXT_PLAY += '<button class="btn btn_cancel" title="취소">취소</button>';
      ALERT_NEXT_PLAY += '</div>';
      ALERT_NEXT_PLAY += '<a href="#" class="popup_close" title="다음회차 시청여부 팝업닫기">닫기</a>';
      ALERT_NEXT_PLAY += '</div>';
      ALERT_NEXT_PLAY += '</div>';

      // 얼럿 :: 다음회차 구매
      ALERT_NEXT_BUY += '<div class="video_popup_wrap nextnotice buy">';
      ALERT_NEXT_BUY += '<div class="video_popup_inner">';
      ALERT_NEXT_BUY += '<div class="popup_content">';
      ALERT_NEXT_BUY += '다음 회차를<br>시청하시겠습니까?';
      ALERT_NEXT_BUY += '</div>';
      ALERT_NEXT_BUY += '<div class="popup_btn_box">';
      ALERT_NEXT_BUY += '<button class="btn btn_confirm" title="시청하기">구매하기</button>';
      ALERT_NEXT_BUY += '<button class="btn btn_cancel" title="취소">취소</button>';
      ALERT_NEXT_BUY += '</div>';
      ALERT_NEXT_BUY += '<a href="#" class="popup_close" title="다음회차 시청여부 팝업닫기">닫기</a>';
      ALERT_NEXT_BUY += '</div>';
      ALERT_NEXT_BUY += '</div>';

      // 얼럿 :: 이어보기
      ALERT_RELAY_PLAY += '<div class="video_popup_wrap next">';
      ALERT_RELAY_PLAY += '<div class="video_popup_inner">';
      ALERT_RELAY_PLAY += '<div class="popup_content">';
      ALERT_RELAY_PLAY += '시청내역이 있습니다<br>이전 장면부터 이어보시겠습니까?';
      ALERT_RELAY_PLAY += '</div>';
      ALERT_RELAY_PLAY += '<div class="popup_btn_box">';
      ALERT_RELAY_PLAY += '<button class="btn btn_confirm" title="처음부터">처음부터</button>';
      ALERT_RELAY_PLAY += '<button class="btn btn_confirm text_blue" title="이어보기">이어보기</button>';
      ALERT_RELAY_PLAY += '</div>';
      ALERT_RELAY_PLAY += '<a href="#" class="popup_close" title="이어보기 안내 팝업닫기">닫기</a>';
      ALERT_RELAY_PLAY += '</div>';
      ALERT_RELAY_PLAY += '</div>';

      // 얼럿 :: 중복 접속
      ALERT_SAMETIME_CONNECT += '<div class="video_popup_wrap notice">';
      ALERT_SAMETIME_CONNECT += '<div class="video_popup_inner">';
      ALERT_SAMETIME_CONNECT += '<div class="popup_content">';
      ALERT_SAMETIME_CONNECT += '동일한 ID로 다른 기기에서<br>시청 중입니다. 연결을 끊고<br>시청하시겠습니까?';
      ALERT_SAMETIME_CONNECT += '</div>';
      ALERT_SAMETIME_CONNECT += '<div class="popup_btn_box">';
      ALERT_SAMETIME_CONNECT += '<button class="btn btn_confirm" title="이어보기">확인</button>';
      ALERT_SAMETIME_CONNECT += '<button class="btn btn_cancel" title="처음부터">취소</button>';
      ALERT_SAMETIME_CONNECT += '</div>';
      ALERT_SAMETIME_CONNECT += '<a href="#" class="popup_close" title="이어보기 안내 팝업닫기">닫기</a>';
      ALERT_SAMETIME_CONNECT += '</div>';
      ALERT_SAMETIME_CONNECT += '</div>';

      // 얼럿 :: 성인인증 성공
      ALERT_ADULT_CERTIFICATION_SUCCESS += '<div class="popup_wrap">';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '<div class="pop_wrap_inner nohead">';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '<a href="#" class="popup_btn_close" title="본인인증 팝업 닫기">닫기</a>';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '<div class="popup_content">';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '<p class="one_txt">성인 인증이 완료되었습니다.</p>';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '</div>';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '<div class="popup_footer">';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '<button type="button" class="btn_default find">확인</button>';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '</div>';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '</div>';
      ALERT_ADULT_CERTIFICATION_SUCCESS += '</div>';

      // 얼럿 :: 성인인증 실패
      ALERT_ADULT_CERTIFICATION_FAILURE += '<div class="popup_wrap">';
      ALERT_ADULT_CERTIFICATION_FAILURE += '<div class="pop_wrap_inner nohead">';
      ALERT_ADULT_CERTIFICATION_FAILURE += '<a href="#" class="popup_btn_close" title="본인인증 팝업 닫기">닫기</a>';
      ALERT_ADULT_CERTIFICATION_FAILURE += '<div class="popup_content">';
      ALERT_ADULT_CERTIFICATION_FAILURE += '<p class="one_txt">미성인 계정으로<br>성인인증에 실패하였습니다.</p>';
      ALERT_ADULT_CERTIFICATION_FAILURE += '</div>';
      ALERT_ADULT_CERTIFICATION_FAILURE += '<div class="popup_footer">';
      ALERT_ADULT_CERTIFICATION_FAILURE += '<button type="button" class="btn_default find">확인</button>';
      ALERT_ADULT_CERTIFICATION_FAILURE += '</div>';
      ALERT_ADULT_CERTIFICATION_FAILURE += '</div>';
      ALERT_ADULT_CERTIFICATION_FAILURE += '</div>';

      // 얼럿 :: 성인인증 오류
      ALERT_ADULT_CERTIFICATION_ERROR += '<div class="popup_wrap">';
      ALERT_ADULT_CERTIFICATION_ERROR += '<div class="pop_wrap_inner nohead">';
      ALERT_ADULT_CERTIFICATION_ERROR += '<a href="#" class="popup_btn_close" title="본인인증 팝업 닫기">닫기</a>';
      ALERT_ADULT_CERTIFICATION_ERROR += '<div class="popup_content">';
      ALERT_ADULT_CERTIFICATION_ERROR += '<p class="one_txt">성인 인증에 실패하였습니다.<br>잠시 후 다시 시도해주세요.</p>';
      ALERT_ADULT_CERTIFICATION_ERROR += '</div>';
      ALERT_ADULT_CERTIFICATION_ERROR += '<div class="popup_footer">';
      ALERT_ADULT_CERTIFICATION_ERROR += '<button type="button" class="btn_default find">확인</button>';
      ALERT_ADULT_CERTIFICATION_ERROR += '</div>';
      ALERT_ADULT_CERTIFICATION_ERROR += '</div>';
      ALERT_ADULT_CERTIFICATION_ERROR += '</div>';

      // 얼럿 :: 라이브스트리밍 서버 오류
      ALERT_STREAM_ERROR += '<div class="video_popup_wrap error">';
      ALERT_STREAM_ERROR += '<div class="video_popup_inner nohead">';
      ALERT_STREAM_ERROR += '<a href="#" class="popup_btn_close" title="라이브스트리밍 서버 오류 팝업 닫기">닫기</a>';
      ALERT_STREAM_ERROR += '<div class="popup_content">';
      ALERT_STREAM_ERROR += '<p class="one_txt">재생 중 오류가 발생하였습니다.<br>재생 버튼을 다시 눌러주세요.</p>';
      ALERT_STREAM_ERROR += '</div>';
      ALERT_STREAM_ERROR += '<div class="popup_btn_box">';
      ALERT_STREAM_ERROR += '<button class="btn btn_confirm" title="확인">확인</button>';
      ALERT_STREAM_ERROR += '</div>';
      ALERT_STREAM_ERROR += '</div>';
      ALERT_STREAM_ERROR += '</div>';

      // 토스트 :: 평점등록 완료
      TOAST_POPUP += '<div class="toast_popup_wrap">';
      TOAST_POPUP += '<div class="toast_wrap_inner">';
      TOAST_POPUP += '<p>';
      TOAST_POPUP += '평점이 등록되었습니다.';
      TOAST_POPUP += '</p>';
      TOAST_POPUP += '</div>';
      TOAST_POPUP += '</div>';

      TAG.UL = '<ul></ul>';
      TAG.LI = '<li></li>';
      TAG.EM = '<em></em>';

      keyword.PLAYER = PLAYER;
      keyword.TOOLTIP = TOOLTIP;
      keyword.POSTER = POSTER;
      keyword.IGS = IGS;
      keyword.LIVE_MUSIC_BG = LIVE_MUSIC_BG;
      keyword.TITLE = TITLE;
      keyword.PREV_BUTTON = PREV_BUTTON;
      keyword.NEXT_BUTTON = NEXT_BUTTON;
      keyword.RIGHT_CONTAINER = RIGHT_CONTAINER;
      keyword.REPLAY_BUTTON = REPLAY_BUTTON;
      keyword.MOSAIC_BUTTON = MOSAIC_BUTTON;
      keyword.VOLUME_BAR_EVENTAREA = VOLUME_BAR_EVENTAREA;
      keyword.VOLUME_CONTROLLER = VOLUME_CONTROLLER;
      keyword.PLAYTIME_CONTROLLER = PLAYTIME_CONTROLLER;
      keyword.SETTING_POPUP = SETTING_POPUP;
      keyword.NEXT_PREVIEW_POPUP = NEXT_PREVIEW_POPUP;
      keyword.SHARE_POPUP = SHARE_POPUP;
      keyword.KEYBOARD_HELP_POPUP = KEYBOARD_HELP_POPUP;
      keyword.MOSAIC_POPUP = MOSAIC_POPUP;
      keyword.MOSAIC_LIST_LIVE = MOSAIC_LIST_LIVE;
      keyword.MOSAIC_LIST_CLIP = MOSAIC_LIST_CLIP;
      keyword.MOSAIC_LIST_EXCEPTION_GAMEOUT = MOSAIC_LIST_EXCEPTION_GAMEOUT;
      keyword.MOSAIC_LIST_EXCEPTION_BLACKOUT = MOSAIC_LIST_EXCEPTION_BLACKOUT;
      keyword.MOSAIC_LIST_EXCEPTION_DRM = MOSAIC_LIST_EXCEPTION_DRM;
      keyword.MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION = MOSAIC_LIST_EXCEPTION_ADULT_CERTIFICATION;
      keyword.MOSAIC_LIST_EXCEPTION_LOGIN = MOSAIC_LIST_EXCEPTION_LOGIN;
      keyword.MOSAIC_LIST_EXCEPTION_BUY = MOSAIC_LIST_EXCEPTION_BUY;
      keyword.EXCEPTION_POPUP = EXCEPTION_POPUP;
      keyword.EXCEPTION_LOGIN = EXCEPTION_LOGIN;
      keyword.EXCEPTION_GAMEOUT = EXCEPTION_GAMEOUT;
      keyword.EXCEPTION_BLACKOUT = EXCEPTION_BLACKOUT;
      keyword.EXCEPTION_DRM = EXCEPTION_DRM;
      keyword.EXCEPTION_ADULT_CERTIFICATION = EXCEPTION_ADULT_CERTIFICATION;
      keyword.EXCEPTION_ADULT_BUY = EXCEPTION_ADULT_BUY;
      keyword.EXCEPTION_BUY = EXCEPTION_BUY;
      keyword.EXCEPTION_AGE_12 = EXCEPTION_AGE_12;
      keyword.EXCEPTION_AGE_15 = EXCEPTION_AGE_15;
      keyword.EXCEPTION_AGE_19 = EXCEPTION_AGE_19;
      keyword.EXCEPTION_NOT_SUPPORTED_BROWSER = EXCEPTION_NOT_SUPPORTED_BROWSER;
      keyword.EXCEPTION_NOT_SUPPORTED_BROWSER_MAC = EXCEPTION_NOT_SUPPORTED_BROWSER_MAC;
      keyword.EXCEPTION_FOREIGN_IP_ONLINE = EXCEPTION_FOREIGN_IP_ONLINE;
      keyword.EXCEPTION_LOGIN_MINI = EXCEPTION_LOGIN_MINI;
      keyword.EXCEPTION_GAMEOUT_MINI = EXCEPTION_GAMEOUT_MINI;
      keyword.EXCEPTION_BLACKOUT_MINI = EXCEPTION_BLACKOUT_MINI;
      keyword.EXCEPTION_DRM_MINI = EXCEPTION_DRM_MINI;
      keyword.EXCEPTION_ADULT_CERTIFICATION_MINI = EXCEPTION_ADULT_CERTIFICATION_MINI;
      keyword.EXCEPTION_AGE_12_MINI = EXCEPTION_AGE_12_MINI;
      keyword.EXCEPTION_AGE_15_MINI = EXCEPTION_AGE_15_MINI;
      keyword.EXCEPTION_AGE_19_MINI = EXCEPTION_AGE_19_MINI;
      keyword.ALERT_NEXT_PLAY = ALERT_NEXT_PLAY;
      keyword.ALERT_NEXT_BUY = ALERT_NEXT_BUY;
      keyword.ALERT_RELAY_PLAY = ALERT_RELAY_PLAY;
      keyword.ALERT_SAMETIME_CONNECT = ALERT_SAMETIME_CONNECT;
      keyword.ALERT_ADULT_CERTIFICATION_SUCCESS = ALERT_ADULT_CERTIFICATION_SUCCESS;
      keyword.ALERT_ADULT_CERTIFICATION_FAILURE = ALERT_ADULT_CERTIFICATION_FAILURE;
      keyword.ALERT_ADULT_CERTIFICATION_ERROR = ALERT_ADULT_CERTIFICATION_ERROR;
      keyword.ALERT_STREAM_ERROR = ALERT_STREAM_ERROR;
      keyword.TOAST_POPUP = TOAST_POPUP;
      keyword.TAG = TAG;

      return keyword;

    }

)();
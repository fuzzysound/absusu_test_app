/**
 * 메인 빅배너
 */
var displayBigBanner = function () {

  $.ajax({
    url: '/api/banner/main'
  }).done(function (res) {
     renderMainBanner(res);
     bindEvent();
  });
};

function renderMainBanner(mainBannerList)
{
  var html = '';
  $(mainBannerList).each(function (i, item) {
    html += '<li style="background:url(\'' + item.imgUrl + '\') no-repeat">';
    html += '   <a href="' + item.linkUrl + '" target="' + item.linkTarget + '">';
    html += '   <div class="banner_txt_wrap">';
    html += '     <p class="banner_txt01">' + (item.bannerDsc1||"") + '</p>';
    html += '     <p class="banner_txt02">' + (item.bannerDsc2||"") + '</p>';
    html += '   </div>';
    html += '   </a>';
    html += ' </li>';
  });
  $(".main_banner_in").html(html);
}
function bindEvent(){
  var _mainBannerGallery = $(".main_banner_in").bxSlider({
    mode: 'fade'
    , responsive: 'false'
    , auto: 'false'
    , autoControls: 'true'
    , ariaLive : false
    , startText : '자동슬라이드 재생'
    , stopText : '자동슬라이드 정지'
  });
  $('.bx-wrapper .bx-pager').css('bottom', '3px');

  /* s :메인 배너 슬라이드 접근성 - focus */
  // var _shiftKey = false;
  // var _backTab = false;
  //
  // $(document).keydown(function(e) {
  //   var _keycode = e.originalEvent.keyCode;
  //   if(_keycode == 16) {
  //     _shiftKey = true;
  //   }else if(_keycode == 9) {
  //     if(_shiftKey) {
  //       _backTab = true;
  //     }
  //   }
  // }).keyup(function(e) {
  //   var _keycode = e.originalEvent.keyCode;
  //
  //   if(_keycode == 16) {
  //     _shiftKey = false;
  //   }
  //   _backTab = false;
  // });

  $('.main_banner li a').focusin(function() {
    _mainBannerGallery.stopAuto();
  });
  $('#contStart, .main_category_wrap a:eq(0)').focusin(function() {
    _mainBannerGallery.startAuto();
  });

  // $('.main_banner li a').focusin(function() {
  //   var _this = $(this);
  //
  //   _mainBannerGallery.stopAuto();
  // }).focusout(function() {
  //   if(!_backTab) {
  //     $('.main_category_wrap .vmenu_inner').eq(0).find('a').focus();
  //   }
  //
  //   _mainBannerGallery.startAuto();
  // });
  //
  // $('.main_category_wrap .vmenu_inner:eq(0) a').focusout(function() {
  //   if(_backTab) {
  //     $('.main_banner li').eq(_mainBannerGallery.getCurrentSlide()).find('a').focus();
  //   }
  // });
  /* e : 메인 배너 슬라이드 접근성 - focus */
}
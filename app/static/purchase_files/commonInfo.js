var CommonInfo = {
  init : function() {
    CommonInfo.Notice.init();
    CommonInfo.BillInfo.init();
  },
  Notice : {
    data : {
      CACHE_TIME : 'NOTICE_CACHE_TIME',
      NO : 'NOTICE_NO',
      TITLE : 'NOTICE_TITLE',
      DATE : 'NOTICE_DATE',
      cacheTime : 300000  // 5min.
    },
    init : function() {
      // CommonInfo.Notice.getNoticeList();

      var noticeLink = '/support/notice/open';
      var noticeTitle = '인기영화, 드라마, 오리지널 콘텐츠를 oksusu에서 Full HD(1080P)로 즐겨보세요.';
      var noticeDate = '2017.10.26';

      $('#header-notice').find('a.info_view_cnt').attr('href', noticeLink);
      $('#header-notice').find('.info_view_summary').text(noticeTitle);
      $('#header-notice').find('.info_view_date').text(noticeDate);
      $('#footer-notice').find('a.info_view_cnt').attr('href', noticeLink);
      $('#footer-notice').find('.info_view_summary').text(noticeTitle);
      $('#footer-notice').find('.info_view_date').text(noticeDate);

      $('#footer').find('.btn_detail').off().click(function(e) {
        location.href = noticeLink;
      });
    },
    getNoticeList : function() {
      var noticeCacheTime = localStorage.getItem(CommonInfo.Notice.data.CACHE_TIME);

      if (noticeCacheTime && Date.now() - noticeCacheTime < CommonInfo.Notice.data.cacheTime) {
        CommonInfo.Notice.renderNotice();
      } else {
        $.ajax({
          url: '/api/support/notice/list',
          type: 'get',
          cache: false,
          success: function (response) {
            if (response && response.result === 'OK') {
              localStorage.setItem(CommonInfo.Notice.data.CACHE_TIME, Date.now());

              $(response.notices).each(function(index, data) {
                if (index === 0) {
                  localStorage.setItem(CommonInfo.Notice.data.NO, data.notice_no);
                  localStorage.setItem(CommonInfo.Notice.data.TITLE, data.notice_title);
                  localStorage.setItem(CommonInfo.Notice.data.DATE, moment(data.notice_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY.MM.DD'));

                  CommonInfo.Notice.renderNotice();
                }
              })
            }
          },
          error: function (response) {
          }
        });
      }
    },
    renderNotice : function() {
      $('#header-notice').find('a').attr('href', '/support/notice/' + localStorage.getItem(CommonInfo.Notice.data.NO));
      $('#header-notice').find('.info_view_summary').text(localStorage.getItem(CommonInfo.Notice.data.TITLE));
      $('#header-notice').find('.info_view_date').text(localStorage.getItem(CommonInfo.Notice.data.DATE));
      $('#footer-notice').find('a').attr('href', '/support/notice/' + localStorage.getItem(CommonInfo.Notice.data.NO));
      $('#footer-notice').find('.info_view_summary').text(localStorage.getItem(CommonInfo.Notice.data.TITLE));
      $('#footer-notice').find('.info_view_date').text(localStorage.getItem(CommonInfo.Notice.data.DATE));
      $('#footer').find('.btn_detail').off().click(function(e) {
        location.href = '/support/notice/' + localStorage.getItem(CommonInfo.Notice.data.NO);
      });
    }
  },
  BillInfo : {
    data : {
      CACHE_TIME : 'BILL_INFO_CACHE_TIME',
      TICKET : 'BILL_INFO_TICKET',
      POINT : 'BILL_INFO_POINT',
      COUPON : 'BILL_INFO_COUPON',
      cacheTime : 300000  // 5min.
    },
    init : function() {
      CommonInfo.BillInfo.getBillInfo();
    },
    getBillInfo : function() {
      if (!User.isLogin) {
        localStorage.removeItem(CommonInfo.BillInfo.data.CACHE_TIME);
        localStorage.removeItem(CommonInfo.BillInfo.data.TICKET);
        localStorage.removeItem(CommonInfo.BillInfo.data.POINT);
        localStorage.removeItem(CommonInfo.BillInfo.data.COUPON);
      } else {
        var billInfoCacheTime = localStorage.getItem(CommonInfo.BillInfo.data.CACHE_TIME);

        if (billInfoCacheTime && Date.now() - billInfoCacheTime < CommonInfo.BillInfo.data.cacheTime) {
          CommonInfo.BillInfo.renderBillInfo();
        } else {
          $.ajax({
            url: '/api/bill/product/info',
            type: 'post',
            cache: false,
            success: function (response) {
              if (response && response.result === 'OK') {
                localStorage.setItem(CommonInfo.BillInfo.data.CACHE_TIME, Date.now());
                localStorage.setItem(CommonInfo.BillInfo.data.TICKET, response.prod_list.length);
                localStorage.setItem(CommonInfo.BillInfo.data.POINT, response.bpoint_amt + ' P');
                localStorage.setItem(CommonInfo.BillInfo.data.COUPON, response.coupon_cnt);

                CommonInfo.BillInfo.renderBillInfo();
              }
            },
            error: function (response) {
            }
          });
        }
      }
    },
    renderBillInfo : function() {
      $('#user-ticket-info').text(localStorage.getItem(CommonInfo.BillInfo.data.TICKET));
      $('#user-point-info').text(localStorage.getItem(CommonInfo.BillInfo.data.POINT));
      $('#user-coupon-info').text(localStorage.getItem(CommonInfo.BillInfo.data.COUPON));
    }
  }
};

// 브라우저 지원 여부 팝업(윈도우)
var SupportBrowser = {
  isNotSupported: function() {
    return (ua_result.os.name === 'windows'
    && ua_result.browser.name === 'msie'
    && (parseInt(ua_result.browser.version.major)) <= 11
    && parseFloat(ua_result.os.version.info) < parseFloat('6.3'));
  },
  check: function() {
    if ( this.isNotSupported() ) {
      $(".check_browser").show();
    }
  },
  close: function() {
    $(".check_browser").hide();
  }
};

var move = function(url) {
  location.href = url;
};

/**
 * 성인인증 체크
 * @returns {boolean}
 */
var checkAdultAuth = function(data) {
  if (User.isWatchAvailable === 'N') {
    if (User.isMemberAuth) {
      if (User.isAdult === true) {
        Popup.show('popupRestrictView', data);
        return false;
      } else {
        Popup.show('popupCheckAdult', data);
        return false;
      }
    } else {
      Popup.show('popupCheckAdult', data);
      return false;
    }
  }
  return true;
};
var checkViewPage = function(data) {
  if (data && data.playerInfo) {
    if (data.playerInfo.allowIPYn === 'N') {
      CommonPopupWithHeader.open('오류안내', '저작권자의 요청에 의해 해외에서는 구매 및 시청이 제한됩니다.', '/');
    } else if (data.playerInfo.streamUrl.permission === 'N') {
      // 구매여부
    } else {
      var eros;
      if(data.playerInfo.mediaType == 'LIVE'){
        eros = data.playerInfo.channel.eros_yn;
      } else {
        eros = data.playerInfo.content.eros_yn;
      }
      checkAdultAuth({type:'view',eros:eros});
    }
  }
};
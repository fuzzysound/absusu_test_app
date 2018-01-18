/**
 * 즐겨찾기
 */
var OksusuBookmark = {
  property: {
    userId: null,
    userNo: null,
    cacheExpireTime: 5 * 60 * 1000  // 5minutes
  },
  key: {
    LIVE: 'BOOKMARK_LIVE',
    VOD: 'BOOKMARK_VOD',
    LIVE_CACHE_TIME : 'BOOKMARK_LIVE_CACHE_TIME',
    VOD_CACHE_TIME : 'BOOKMARK_VOD_CACHE_TIME'
  },
  init: function(userId, userNo) {
    if (!User.isLogin) {
      localStorage.removeItem(this.key.LIVE);
      localStorage.removeItem(this.key.VOD);
      return false;
    }
    this.property.userId = userId;
    this.property.userNo = userNo;

    if (!localStorage.getItem(this.key.LIVE)) {
      this.getLive();
      return false;
    }
    if (!localStorage.getItem(this.key.VOD)) {
      this.getVod();
      return false;
    }
    // this.checkExpire();
  },
  checkExpireLive: function() {
    var cacheTime = localStorage.getItem(this.key.LIVE_CACHE_TIME);

    if (cacheTime && Date.now() - cacheTime < this.property.cacheExpireTime) {
      this.renewLive();
    }
  },
  checkExpireVod: function() {
    var cacheTime = localStorage.getItem(this.key.VOD_CACHE_TIME);

    if (cacheTime && Date.now() - cacheTime < this.property.cacheExpireTime) {
      this.renewLive();
    }
  },
  haveLive: function(serviceId) {
    if (!localStorage.getItem(this.key.LIVE)) {
      return false;
    }
    return ($.inArray(serviceId, localStorage.getItem(this.key.LIVE).split(','))>-1);
  },
  haveVod: function(contentsId) {
    if (!localStorage.getItem(this.key.VOD)) {
      return false;
    }
    return ($.inArray(contentsId, localStorage.getItem(this.key.VOD).split(','))>-1);
  },
  renewLive: function() {
    localStorage.removeItem(this.key.LIVE);
    this.getLive();
  },
  renewVod: function() {
    localStorage.removeItem(this.key.VOD);
    this.getVod();
  },
  remove: function() {
    localStorage.removeItem(this.key.LIVE);
    localStorage.removeItem(this.key.VOD);
    localStorage.removeItem(this.key.LIVE_CACHE_TIME);
    localStorage.removeItem(this.key.VOD_CACHE_TIME);
  },
  getLive: function() {
    var url = '/api/my/bookmark/list';
    var params = {
      userId: OksusuBookmark.property.userId,
      muserNum: OksusuBookmark.property.userNo,
      group: Oksusu.ContentProp.Group.IPTV,
      curPage: 1,
      pageSize: 500
    };
    $.ajax({
      url: url,
      data: params,
      success: function (response) {
        localStorage.setItem(OksusuBookmark.key.LIVE_CACHE_TIME, Date.now());
        if (response && response.result === 'OK') {
          if (response.bookmark && response.bookmark.length > 0) {
            var aBookmark = [];
            $(response.bookmark).each(function(i, item){
              aBookmark.push(item.svc_id);
            });
            localStorage.setItem(OksusuBookmark.key.LIVE, aBookmark.join(','));
          } else {
            localStorage.setItem(OksusuBookmark.key.LIVE, "0");
          }
        } else {
          localStorage.setItem(OksusuBookmark.key.LIVE, "0");
        }
      }
    });
  },
  getVod: function() {
    var url = '/api/my/bookmark/list';
    var params = {
      userId: OksusuBookmark.property.userId,
      muserNum: OksusuBookmark.property.userNo,
      group: Oksusu.ContentProp.Group.VOD,
      curPage: 1,
      pageSize: 500
    };
    $.ajax({
      url: url,
      data: params,
      success: function (response) {
        localStorage.setItem(OksusuBookmark.key.VOD_CACHE_TIME, Date.now());
        if (response && response.result === 'OK') {
          if (response.bookmark && response.bookmark.length > 0) {
            var aBookmark = [];
            $(response.bookmark).each(function(i, item){
              aBookmark.push(item.con_id);
            });
            localStorage.setItem(OksusuBookmark.key.VOD, aBookmark.join(','));
          } else {
            localStorage.setItem(OksusuBookmark.key.VOD, "0");
          }
        } else {
          localStorage.setItem(OksusuBookmark.key.VOD, "0");
        }
      }
    });
  }
};
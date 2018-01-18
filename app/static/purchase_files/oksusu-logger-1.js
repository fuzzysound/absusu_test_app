var OksusuLogger = {
  config: {
    server: (location.hostname.indexOf('dev') > -1 || location.hostname.indexOf('local') > -1 || location.hostname.indexOf('qa') > -1) ? 'http://nxlogqa.oksusu.com:8080' : 'http://nxlog.oksusu.com:8080',
    interfaceVersion: '4.11',
    usageLog: {
      url: '/statBtvMobile.jsp',
      interfaceId: 'IF-NXLOG-001',
      componentCodePrefix: 'BM_',
      componentCode: '',
      pageMeta: '',
      previousPageMeta: ''
    },
    playerLog: {
      url: '/statBtvMobile.jsp',
      interfaceId: 'IF-NXLOG-002',
      position: -1,
      uuid: null,
      lastSentDate: null
    },
    referrer: decodeURIComponent(document.referrer) || '',
    prevPageCode: ''
  },
  appInfo: {},
  userInfo: {},
  mediaInfo: {},
  contentsType: {},
  init: function (settings) {
    this.setConfiguration(settings);
    this.setComponentCode();
    this.sendUsage();
  },
  setConfiguration: function (settings) {
    var newAppInfo = {
      deviceId: settings.appInfo.deviceId,
      xOsInfo: settings.appInfo.xOsInfo,
      xServiceInfo: settings.appInfo.xServiceInfo,
      xDeviceInfo: settings.appInfo.xDeviceInfo
    };
    var newUserInfo = {
      bmUserId: settings.userInfo.bmUserId,
      mobileUserNum: settings.userInfo.mobileUserNum,
      userPack: settings.userInfo.userPack
    };
    this.appInfo = newAppInfo;
    this.userInfo = newUserInfo;
    this.contentsType = settings.contentsType;
    if (settings.contentsInfo) {
      this.setMediaInfo(JSON.parse(settings.contentsInfo));
    }
    this.config.playerLog.uuid = getUUID();
    this.config.prevPageCode = settings.prevPageCode || '';
  },
  setComponentCode: function () {
    if (location.pathname.indexOf('/bill/ticket') === 0) {
      this.config.usageLog.componentCode = 'WebBillTicket';
    } else if (location.pathname.indexOf('/guide/free') === 0) {
      this.config.usageLog.componentCode = 'WebSKTFree';
    } else if (location.pathname.indexOf('/guide/intro') === 0) {
      this.config.usageLog.componentCode = 'WebGuide';
    } else if (location.pathname.indexOf('/event/list') === 0) {
      this.config.usageLog.componentCode = 'WebEventList';
    } else if (location.pathname.indexOf('/my/withdraw') === 0) {
      this.config.usageLog.componentCode = 'WebUserLeave';
    } else if (location.pathname.indexOf('/my') === 0) {
      this.config.usageLog.componentCode = 'WebMy';
    } else if (location.pathname.indexOf('/bill/purchase/point') === 0) {
      this.config.usageLog.componentCode = 'WebBillPurchasePoint';
    } else if (location.pathname.indexOf('/support/notice') === 0) {
      this.config.usageLog.componentCode = 'WebSupportNotice';
    } else if (location.pathname.indexOf('/support/faq') === 0) {
      this.config.usageLog.componentCode = 'WebSupportFaq';
    } else if (location.pathname.indexOf('/user/leave') === 0) {
      this.config.usageLog.componentCode = 'WebUserLeave';
    } else if (location.pathname.indexOf('/user/login') === 0) {
      this.config.usageLog.componentCode = 'WebUserLogin';
    } else if (location.pathname.indexOf('/user/find/id') === 0) {
      this.config.usageLog.componentCode = 'WebUserFindId';
    } else if (location.pathname.indexOf('/user/switch/id') === 0) {
      this.config.usageLog.componentCode = 'WebUserSwitchId';
    } else if (location.pathname.indexOf('/bill/purchase/package') === 0) {
      this.config.usageLog.componentCode = 'WebBillPurchasePackage';
      this.config.usageLog.pageMeta = getUrlParam('id_product');
    } else if (location.pathname.indexOf('/my/cancel/ticket') === 0) {
      this.config.usageLog.componentCode = 'WebBillCancel';
      this.config.usageLog.pageMeta = location.pathname.split('/').pop();
    } else if (location.pathname.indexOf('/guide/terms') === 0) {
      this.config.usageLog.componentCode = 'WebInfoTerms';
    } else if (location.pathname.indexOf('/v/') === 0) {
      this.config.usageLog.componentCode = 'WebView';
      this.config.usageLog.pageMeta = this.getContentsId();
      if (this.contentsType === 'CLIP') {
        this.config.usageLog.pageMeta += '|WG004';
      } else if (this.contentsType === 'LIVE') {
        this.config.usageLog.pageMeta += '|WG001';
      } else if (this.contentsType === 'MOVIE') {
        this.config.usageLog.pageMeta += '|WG002';
      } else {
        this.config.usageLog.pageMeta += '|WG003';
      }
    } else if (location.pathname.indexOf('/live/schedule/') === 0) {
      this.config.usageLog.componentCode = 'WebViewSchedule';
      this.config.usageLog.pageMeta = location.pathname.split('/').pop();
    } else {
      this.config.usageLog.componentCode = 'WebMain';
    }
  },
  setMediaInfo: function (mediaInfo) {
    this.mediaInfo = (mediaInfo) ? mediaInfo : (typeof AppPage !== 'undefined' && AppPage.data.mediaInfo) ? AppPage.data.mediaInfo : '';
  },
  setPlayerLogPosition: function (position) {
    this.config.playerLog.position = position;
    this.config.playerLog.uuid = getUUID();
  },
  addPlayerLogPosition: function () {
    return ++this.config.playerLog.position;
  },
  getPlayerLogPosition: function () {
    var position = getPlaytimeByMinute(this.config.playerLog.position);

    return position;
  },
  getPlayerDuration: function() {
    if (this.contentsType === 'LIVE') {
      var programInfo = this.getCurrentProgram();
      return programInfo.startTimeYMDHIS + '|' + programInfo.endTimeYMDHIS;
    } else {
      return moment().startOf('day').seconds(OksusuVideo.time.duration()).format('HH:mm');
    }
  },
  getPlayerLogUUID: function () {
    return this.config.playerLog.uuid;
  },
  getPlayerCurrentTime: function () {
    var current;
    if(this.config.playerLog.position<=0){
      current = 0;
    }else{
      current = OksusuVideo.time.current();
      current = current === 0 ? current : (current + 1);
      current = current / 60;
    }

    return getPlaytimeByMinute(current);
  },
  updateLastWebPlayingSentLog: function () {
    this.config.playerLog.lastSentDate = moment().format('DDHHmmssSSS');
  },
  availableSendWebPlayingLog: function () {
    return (moment().format('DDHHmmssSSS') - this.config.playerLog.lastSentDate > 1000) ? true : false;
  },
  getCurrentProgram: function() {
    var currentProgram;
    $(this.mediaInfo.channel.programs).each(function(i,item) {
      if (moment().isBetween(
              moment(Number(item.startTime)),
              moment(Number(item.endTime)))) {
        currentProgram = item;
      }
    });
    return currentProgram;
  },
  send: function (url, interfaceId, data) {
    var me = OksusuLogger;
    var parameter = {};
    if (location.protocol === 'https:') {
      return false;
    }

    if (interfaceId === 'IF-NXLOG-001') {
      parameter = {
        'if-id': interfaceId,
        'device_id': me.appInfo.deviceId,
        'x-os-info': me.appInfo.xOsInfo,
        'x-service-info': me.appInfo.xServiceInfo,
        'x-device-info': me.appInfo.xDeviceInfo,
        'x-link': '',
        'bm-user-id': me.userInfo.bmUserId,
        'al-user-id': '',
        'time': moment().format('YYYYMMDDHHmmss.SSS'),
        'mdn': '',
        'prev-pg': (me.config.prevPageCode) ? me.config.prevPageCode : '',
        'curr-pg': (data.componentCode) ? me.config.usageLog.componentCodePrefix + data.componentCode : '',
        'if-ver': me.config.interfaceVersion,
        'muser-num': me.userInfo.mobileUserNum,
        'pg_meta': data.pageMeta,
        'entry_path': '',
        'pg_mode': ($(window).width() - $(window).height() > 0) ? '1' : '2',
        'pre_pg_meta': '',
        'user_pack': me.userInfo.userPack.isLogin + '|' + me.userInfo.userPack.loginChannel + '|' + me.userInfo.userPack.telecommType,
        'user_cast': '',
        'tgroup': '',
        'tvalue': '',
        'imei': ''
      };
    } else if (interfaceId === 'IF-NXLOG-002') {
      var ch;
      if (me.mediaInfo.channel) {
        // LIVE
        ch = me.mediaInfo.channel.channelName;
      } else if (me.mediaInfo.content) {
        if (me.mediaInfo.content.clip_id) {
          // CLIP
          ch = me.mediaInfo.content.clip_id;
        } else if (me.mediaInfo.content.con_id) {
          // VOD/MOVIE
          ch = me.mediaInfo.content.con_id;
        } else {
          ch = '';
        }
      } else {
        ch = '';
      }

      parameter = {
        'if-id': interfaceId,
        'device_id': me.appInfo.deviceId,
        'x-os-info': me.appInfo.xOsInfo,
        'x-service-info': me.appInfo.xServiceInfo,
        'x-device-info': me.appInfo.xDeviceInfo,
        'x-link': '',
        'bm-user-id': me.userInfo.bmUserId,
        'al-user-id': '',
        'time': moment().format('YYYYMMDDHHmmss.SSS'),
        'mdn': '',
        'bitrate': '',
        'ch': ch,
        'if-ver': me.config.interfaceVersion,
        'muser-num': me.userInfo.mobileUserNum,
        'stream_type': data.streamType || '',
        'stream_id': data.streamId || '',
        'play_type': data.playType || '',
        'cnts_free': data.cntsFree || '',
        'pg_mode': ($(window).width() - $(window).height() > 0) ? '1' : '2',
        'user_pack': me.userInfo.userPack.isLogin + '|' + me.userInfo.userPack.loginChannel + '|' + me.userInfo.userPack.telecommType,
        'user_cast': '',
        'position': data.position || '',
        'runtime': data.runtime || '',
        'cnts_cast': data.cntsCast || '',
        'tgroup': '',
        'tvalue': '',
        'ch_desc': data.channelDescription || '',
        'imei': '',
        'qos_type': data.qosType || '',
        'qos_bitrate': data.qosBitrate || '',
        'bufferRate': data.bufferRate || '',
        'qosMeta': data.qosMeta || '',
        'rsrp': data.rsrp || ''
      };
    } else {
      return false;
    }
    $.ajax({
      url: url,
      data: parameter,
      dataType: 'jsonp',
      success: function (response) {
      },
      error: function (e) {
      }
    });
  },
  getContentsId: function () {
    if (this.contentsType === MediaType.LIVE.name) {
      return (this.mediaInfo.channel) ? this.mediaInfo.channel.serviceId : getUrlParam('contentsId');
    } else if (this.contentsType === MediaType.MOVIE.name) {
      return (this.mediaInfo.content) ? this.mediaInfo.content.con_id : getUrlParam('contentsId');
    } else if (this.contentsType === MediaType.VOD.name) {
      return (this.mediaInfo.content) ? this.mediaInfo.content.con_id : getUrlParam('contentsId');
    } else {
      return (this.mediaInfo.content) ? this.mediaInfo.content.clip_id : getUrlParam('contentsId');
    }
  },
  getContentsTitle: function () {
    if (this.contentsType === MediaType.LIVE.name) {
      return (this.mediaInfo.channel) ? this.mediaInfo.channel.channelName : "N/A";
    } else if (this.contentsType === MediaType.MOVIE.name) {
      return (this.mediaInfo.content) ? this.mediaInfo.content.title : "N/A";
    } else if (this.contentsType === MediaType.VOD.name) {
      return (this.mediaInfo.content) ? this.mediaInfo.content.title + '(' + this.mediaInfo.content.seq_no + ')회' : "N/A";
    } else {
      return (this.mediaInfo.content) ? this.mediaInfo.content.clip_title : "N/A";
    }
  },
  sendUsage: function () {
    var url = this.config.server + this.config.usageLog.url;
    var data = {
      componentCode: this.config.usageLog.componentCode || '',
      pageMeta: this.config.usageLog.pageMeta || ''
    };
    this.send(url, this.config.usageLog.interfaceId, data);
  },
  sendMoveApp: function (mediaType) {
    var url = this.config.server + this.config.usageLog.url;
    var target = (document.referrer.indexOf('facebook.com') > -1) ? 'Fb' : 'Etc';
    var contentsType = '';
    var additionalMeta = '';
    if (mediaType === MediaType.LIVE) {
      contentsType = 'WG001';
      if (AppPage.data.mediaInfo && AppPage.data.mediaInfo.channel && AppPage.data.mediaInfo.channel.programs) {
        additionalMeta = '|' + AppPage.data.mediaInfo.channel.programs[0].masterId + '|' + AppPage.data.mediaInfo.channel.programs[0].programName;
      }
    } else if (mediaType === MediaType.MOVIE) {
      contentsType = 'WG002';
    } else if (mediaType === MediaType.VOD) {
      contentsType = 'WG003';
    } else if (mediaType === MediaType.CLIP) {
      contentsType = 'WG004';
    }
    var pageMeta = target + '|' + contentsType + '|' + this.getContentsId() + additionalMeta;
    var data = {
      componentCode: 'WebSocialCall',
      pageMeta: pageMeta
    };
    this.send(url, this.config.usageLog.interfaceId, data);
  },
  sendShare: function (target, mediaType) {
    var url = this.config.server + this.config.usageLog.url;
    var contentsType = '';
    var additionalMeta = '';
    if (mediaType === MediaType.LIVE) {
      contentsType = 'WG001';
      if (AppPage.data.mediaInfo && AppPage.data.mediaInfo.channel && AppPage.data.mediaInfo.channel.programs) {
        additionalMeta = '|' + AppPage.data.mediaInfo.channel.programs[0].masterId + '|' + AppPage.data.mediaInfo.channel.programs[0].programName;
      }
    } else if (mediaType === MediaType.MOVIE) {
      contentsType = 'WG002';
    } else if (mediaType === MediaType.VOD) {
      contentsType = 'WG003';
    } else if (mediaType === MediaType.CLIP) {
      contentsType = 'WG004';
    }
    var pageMeta = target + '|' + contentsType + '|' + this.getContentsId() + additionalMeta;
    var data = {
      componentCode: 'Share',
      pageMeta: pageMeta || ''
    };
    return false;
    this.send(url, this.config.usageLog.interfaceId, data);
  },
  sendJoinStart: function () {
    var url = this.config.server + this.config.usageLog.url;
    var pageMeta = '';

    switch(OksusuLogger.userInfo.userPack.loginChannel){
      case '5':
        pageMeta = 'Fb|';
        break;
      case '4':
        pageMeta = 'Kakao|';
        break;
      case '2':
        pageMeta = 'Mdn|';
        break;
      default:
        pageMeta = 'Id|';
        break;
    }

    var data = {
      componentCode: 'MemberJoinStart',
      pageMeta: pageMeta || ''
    };
    this.send(url, this.config.usageLog.interfaceId, data);
  },
  sendJoinDone: function () {
    var url = this.config.server + this.config.usageLog.url;
    var pageMeta = '';

    switch(OksusuLogger.userInfo.userPack.loginChannel){
      case '5':
        pageMeta = 'Fb|';
        break;
      case '4':
        pageMeta = 'Kakao|';
        break;
      case '2':
        pageMeta = 'Mdn|';
        break;
      default:
        pageMeta = 'Id|';
        break;
    }

    var data = {
      componentCode: 'MemberJoinEnd',
      pageMeta: pageMeta || ''
    };
    this.send(url, this.config.usageLog.interfaceId, data);
  },
  sendWebPlay: function () {
    var url = this.config.server + this.config.usageLog.url;
    var contentsType = '';
    var pageMeta = '';
    if (this.contentsType === MediaType.LIVE.name) {
      contentsType = 'WG001';
    } else if (this.contentsType === MediaType.MOVIE.name) {
      contentsType = 'WG002';
    } else if (this.contentsType === MediaType.VOD.name) {
      contentsType = 'WG003';
    } else if (this.contentsType === MediaType.CLIP.name) {
      contentsType = 'WG004';
    }

    if (this.contentsType === MediaType.LIVE.name) {
      pageMeta = contentsType + '|'
          + this.getContentsId() + '|';
      if (this.mediaInfo.channel && this.mediaInfo.channel.programs.length > 0) {
        pageMeta += this.mediaInfo.channel.programs[0].programId + '|' + this.mediaInfo.channel.programs[0].programName + '|';
      }
      pageMeta += getBrowserInfo().name + '/' + getBrowserInfo().version + '|' + this.config.referrer || '';
    } else {
      pageMeta = contentsType + '|'
          + this.getContentsId() + '|'
          + getBrowserInfo().name + '/' + getBrowserInfo().version
          + '|' + this.config.referrer || '';
    }

    var data = {
      componentCode: 'WebPlay',
      pageMeta: pageMeta || ''
    };
    this.send(url, this.config.usageLog.interfaceId, data);
  },
  sendWebPlaying: function () {
    if (!this.availableSendWebPlayingLog()) {
      return false;
    }
    var url = this.config.server + this.config.playerLog.url;
    var playType = '';
    var channelDescription = '';
    var playTime = '';
    this.addPlayerLogPosition();
    if (this.contentsType === MediaType.LIVE.name) {
      playType = 'WG201';
      channelDescription += this.mediaInfo.channel.channelNo + '|';
      channelDescription += this.mediaInfo.channel.serviceId + '|';
      channelDescription += this.mediaInfo.channel.age_rating + '|';
      channelDescription += this.mediaInfo.channel.another_programs[0].ratingCd + '|';
      channelDescription += this.mediaInfo.channel.another_programs[0].programId + '|';
      channelDescription += this.mediaInfo.channel.another_programs[0].programName + '|';
      playTime = this.getPlayerLogPosition();
    } else if (this.contentsType === MediaType.MOVIE.name) {
      playType = 'WG202';
      channelDescription = this.mediaInfo.content.series_id + '|';
      channelDescription += this.mediaInfo.content.level + '|';
      channelDescription += this.mediaInfo.content.par_menu_id + '|';
      channelDescription += this.mediaInfo.content.menu_id + '|';
      playTime = this.getPlayerCurrentTime();
    } else if (this.contentsType === MediaType.VOD.name) {
      playType = 'WG203';
      channelDescription = this.mediaInfo.content.series_id + '|';
      channelDescription += this.mediaInfo.content.level + '|';
      channelDescription += this.mediaInfo.content.par_menu_id + '|';
      channelDescription += this.mediaInfo.content.menu_id + '|';
      playTime = this.getPlayerCurrentTime();
    } else if (this.contentsType === MediaType.CLIP.name) {
      // 시리즈아이디|프로그램시청등급|메뉴아이디(Parent)|메뉴아이디(Child)|360VR콘텐츠여부|외부제공사콘텐츠식별정보
      playType = 'WG204';
      // clip은 channel_id 가 시리즈아이디
      channelDescription = (this.mediaInfo.content.channel_id) ? this.mediaInfo.content.channel_id + '|' : '|';
      channelDescription += (this.mediaInfo.content.age_cd) ? this.mediaInfo.content.age_cd + '|' : '|';
      channelDescription += '|';  // menu_id(parent)
      channelDescription += '|';  // menu_id(child)
      channelDescription += (this.mediaInfo.content.vr_cd) ? '360|' : '|';
      channelDescription += (this.mediaInfo.content.extr_typ_cd) ? this.mediaInfo.content.extr_typ_cd + '|' : '|';
      playTime = this.getPlayerCurrentTime();
    }

    var data = {
      componentCode: '',
      pageMeta: '',
      ch: this.getContentsId() || '',
      streamType: (this.mediaInfo.tlsYn === 'Y') ? 'TLS' : 'HLS',
      streamId: this.getPlayerLogUUID(),
      playType: playType,
      cntsFree: this.mediaInfo.freeYn === 'Y' ? '2' : '1',
      cntsCast: '',
      position: playTime,
      runtime: this.getPlayerDuration(),
      channelDescription: channelDescription,
      qosType: '',
      qosBitrate: '',
      bufferRate: '',
      qosMeta: '',
      rsrp: ''
    };
    this.updateLastWebPlayingSentLog();
    this.send(url, this.config.playerLog.interfaceId, data);
  },
  sendWebPlayingAuto : {
    start : function () {
      var send = function () {
        OksusuLogger.sendWebPlaying();
      };
      OksusuLogger.sendWebPlay();
      OksusuLogger.sendWebPlayingAuto.end();
      OksusuLogger.sendWebPlayingAuto.timer = setInterval( send, 1000 * 60 );
      send();
    },
    end : function () {
      OksusuLogger.setPlayerLogPosition( -1 );
      clearInterval( OksusuLogger.sendWebPlayingAuto.timer );
    }
  },
  registerEventTrackingLogo: function () {
    $('#goHome').click(function(){
      ga('send', {
        hitType: 'event',
        eventCategory: 'topnavigation',
        eventAction: 'oksusu_logo'
      });

      fbq('trackCustom', 'oksusu_logo');
    });
  },
  registerEventTrackingPlay: function () {
    $('.vjs-play-control.vjs-control').click(function(){
      var titleStr = $(this).attr('title');
      var cId = OksusuLogger.getContentsId();
      var cName = OksusuLogger.getContentsTitle();

      if( titleStr !== 'Pause'){
        ga('send', {
          hitType: 'event',
          eventCategory: 'content_detail',
          eventAction: 'play',
          eventLabel: cId
        });

        fbq('trackCustom', 'play', {
          content_ids: cId,
          content_name: cName
        });
      }
    });
  },
  registerEventTrackingShare: function () {
    var cId;
    var cName;

    // 공유하기
    $('.ico_share').click(function () {
      cId = OksusuLogger.getContentsId();
      cName = OksusuLogger.getContentsTitle();

      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'share_button',
        eventLabel: cId
      });

      fbq('trackCustom', 'share_button', {
        content_ids: cId,
        content_name: cName
      });
    });

    // 페이스북 공유하기
    $('.share_info_wrap .btn_facebook').click(function () {
      cId = OksusuLogger.getContentsId();
      cName = OksusuLogger.getContentsTitle();

      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'share_fb',
        eventLabel: cId
      });

      fbq('trackCustom', 'share_fb', {
        content_ids: cId,
        content_name: cName
      });
    });

    // 카카오톡 공유하기
    $('.share_info_wrap .btn_kakao').click(function () {
      cId = OksusuLogger.getContentsId();
      cName = OksusuLogger.getContentsTitle();

      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'share_kakao',
        eventLabel: cId
      });

      fbq('trackCustom', 'share_kakao', {
        content_ids: cId,
        content_name: cName
      });
    });

    // 밴드 공유하기
    $('.share_info_wrap .btn_band').click(function () {
      cId = OksusuLogger.getContentsId();
      cName = OksusuLogger.getContentsTitle();

      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'share_band',
        eventLabel: cId
      });

      fbq('trackCustom', 'share_band', {
        content_ids: cId,
        content_name: cName
      });
    });

    // 링크복사 공유하기
    $('.share_info_wrap .btn_url').click(function () {
      cId = OksusuLogger.getContentsId();
      cName = OksusuLogger.getContentsTitle();

      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'share_etc',
        eventLabel: cId
      });

      fbq('trackCustom', 'share_etc', {
        content_ids: cId,
        content_name: cName
      });
    });

  },
  registerEventTrackingReply: function () {
    var cId = OksusuLogger.getContentsId();
    var cName = OksusuLogger.getContentsTitle();

    $('.comment_wrap .btn_register').click(function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'comment_write',
        eventLabel: cId
      });

      fbq('trackCustom', 'comment_write', {
        content_ids: cId,
        content_name: cName
      });
    });

  },
  registerEventTrackingRelated: function () {
    var cId = OksusuLogger.getContentsId();

    $('.video_channel_list .list_box a').click(function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'relatedcontent',
        eventLabel: cId
      });
    });
  },
  registerEventTrackingFeaturePresentation: function () {
    var cId = OksusuLogger.getContentsId();
    $('#btn_feature_presentation').click(function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'content_detail',
        eventAction: 'parent',
        eventLabel: cId
      });
    });
  }
};
var MediaType = {
  LIVE: {name: 'LIVE', code: '4'},
  VOD: {name: 'VOD', code: '7'},
  MOVIE: {name: 'MOVIE', code: '6'},
  CLIP: {name: 'CLIP', code: '2'}
};

var MediaUtil = {
  getMediaTypeByInfo: function (mediaInfo) {
    if (mediaInfo.channel) {
      return MediaType.LIVE;
    } else if (mediaInfo.content) {
      return MediaUtil.getMediaTypeByCode(mediaInfo.content.typ_cd);
    }
  },
  getMediaTypeByCode: function (mediaTypeCode) {
    for (var item in MediaType) {
      if (MediaType[item].code === mediaTypeCode) {
        return MediaType[item];
      }
    }
  },
  getMediaTypeByName: function (mediaTypeName) {
    for (var item in MediaType) {
      if (MediaType[item].name === mediaTypeName) {
        return MediaType[item];
      }
    }
  },
  getMediaIdByInfo: function (mediaInfo) {
    var mediaType = MediaUtil.getMediaTypeByInfo(mediaInfo);

    if (MediaType.LIVE === mediaType) {
      return mediaInfo.channel.serviceId;
    } else if (MediaType.VOD === mediaType || MediaType.MOVIE === mediaType) {
      return mediaInfo.content.con_id;
    } else if (MediaType.CLIP === mediaType) {
      return mediaInfo.content.clip_id;
    }
  },
  isServedVod: function (content) {
    return content && content.matl_sts_cd && content.matl_sts_cd === "65";
  }
};
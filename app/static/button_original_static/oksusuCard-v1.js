var OksusuCard = {
  getCode: function(data) {
    if (!data || !data.card_typ_cd) {
      return '';
    }
    return this.property.codeByName[data.card_typ_cd.substring(0,10)];
  },
  getType: function(data) {
    if (!data || !data.card_typ_cd) {
      return null;
    }
    return this.property.typeByCode[data.card_typ_cd.substring(0, 10)];
  },
  calcGridLength: function(length, rowCnt) {
    var rest = length % rowCnt;
    var quotient = Math.floor(length / rowCnt);
    if(rest>0 && quotient!==0){
      length = quotient * rowCnt;
    }

    return length;
  },
  getGridLength: function (type, length) {

    switch (type) {
      case '1':
        length = length > 9 ? 9 : length;
        length = OksusuCard.calcGridLength(length, 3);
        break;
      case '1_1':
        length = length > 15 ? 15 : length;
        break;
      case '2':
        length = length > 9 ? 9 : length;
        length = OksusuCard.calcGridLength(length, 3);
        break;
      case '3':
        length = length > 15 ? 15 : length;
        length = OksusuCard.calcGridLength(length, 5);
        break;
      case '5':
        length = length > 9 ? 9 : length;
        length = OksusuCard.calcGridLength(length, 3);
        break;
      case '5_1':
        length = length > 15 ? 15 : length;
        break;
      case '6':
        length = length > 15 ? 15 : length;
        break;
      case '7':
        length = length > 15 ? 15 : length;
        length = OksusuCard.calcGridLength(length, 5);
        break;
      case '7_2':
        length = length > 15 ? 15 : length;
        length = OksusuCard.calcGridLength(length, 5);
        break;
      case '12':
        length = length > 9 ? 9 : length;
        length = OksusuCard.calcGridLength(length, 3);
        break;
      case '12_1':
        length = length > 15 ? 15 : length;
        break;
      case '13':
        length = length > 9 ? 9 : length;
        length = OksusuCard.calcGridLength(length, 3);
        break;
      case '14':
        length = length > 15 ? 15 : length;
        length = OksusuCard.calcGridLength(length, 5);
        break;
      case '14_3':
        length = length > 15 ? 15 : length;
        length = OksusuCard.calcGridLength(length, 5);
        break;
      case '19':
        length = length > 15 ? 15 : length;
        length = OksusuCard.calcGridLength(length, 5);
        break;
      case '20':
        length = length > 9 ? 9 : length;
        length = OksusuCard.calcGridLength(length, 3);
        break;
      case '20_1':
        length = length > 15 ? 15 : length;
        break;
      case '21':
        length = length > 9 ? 9 : length;
        length = OksusuCard.calcGridLength(length, 3);
        break;
      case '22':
        length = length > 15 ? 15 : length;
        length = OksusuCard.calcGridLength(length, 5);
        break;
      case '23':
        length = length > 20 ? 20 : length;
        break;
      case '41':
        length = length > 20 ? 20 : length;
        break;
      default:
        length = length > 25 ? 25 : length;
    }

    return length;
  },
  isValid: function() {
    return true;
  },
  isExceptCardInHome: function() {
    return false;
  },
  isLiveBannerAvailable: function(i) {
    if (i === 10 && location.pathname === '/live') {
      return true;
    }
    return false;
  },
  isVodBannerAvailable: function(i, data) {
    if (location.pathname !== '/vod') {
      return false;
    }
    if (i === 10 && data.pageNo == 1) {
      return true;
    }
    return false;
  },
  isMovieBannerAvailable: function(i, data) {
    if (location.pathname !== '/movie') {
      return false;
    }
    if (i === 10 && data.pageNo == 1) {
      return true;
    }
    return false;
  },
  isClipBannerAvailable: function(i, data) {
    if (location.pathname !== '/clip') {
      return false;
    }
    if (i === 10 && data.pageNo == 1) {
      return true;
    }
    return false;
  },
  getLiveSubMainBannerHTML: function(key) {
    var html = '</ul>';
    html += ' <div class="list_banner_slider" data-key="'+key+'">';
    html += ' </div>';
    html += ' <ul class="section_vlist sort line3">';
    return html;
  },
  getVodSubMainBannerHTML: function(key) {
    var html = '';
    html += '</ul>';
    html += ' <div class="list_banner_slider" data-key="' + key + '">';
    html += ' </div>';
    html += ' <ul class="poster_vlist live sort">';
    return html;
  },
  getMovieSubMainBannerHTML: function(key) {
    var html = '';
    html += '</ul>';
    html += ' <div class="list_banner_slider" data-key="' + key + '">';
    html += ' </div>';
    html += ' <ul class="poster_vlist movie sort">';
    return html;
  },
  getClipSubMainBannerHTML: function(key) {
    var html = '';
    html += '</ul>';
    html += ' <div class="list_banner_slider" data-key="' + key + '">';
    html += ' </div>';
    html += ' <ul class="section_vlist sort line4">';
    return html;
  },
  getLives: function(id, data) {
    var url = '/api/live/organization/list';
    $.ajax({
      url: url,
      data: data,
      success: function (response) {
        if (response.result === 'OK') {
          var html = '';
          var data = response.channels;
          if (data && data.length > 0) {
            html += '<ul class="section_vlist sort line3">';
            $(data).each(function (i, item) {
              if (OksusuCard.isLiveBannerAvailable(i)) {
                html += OksusuCard.getLiveSubMainBannerHTML('LIVE_CENTER');
              }
              html += OksusuCard.getLiveTemplate(item);
            });
            html += '</ul>';
          }
          $('#'+id).append(html);
          $('.general_section_list .text_title').dotdotdot({
            wrap: 'letter'
            , height: 36
          });
          try{
            Oksusu.Banner.load({ codes : [Oksusu.Banner.TYPE.LIVE_CENTER] });
          }catch(e){}
        }
      }
    });
  },
  getFreeLives: function(id, data, moreData) {
    var html = '';
    $('#'+id).addClass('general_section_list');
    if (data && data.grids.length > 0) {
      html += '<ul class="section_vlist sort line3">';
      $(data.grids).each(function (i, item) {
        html += OksusuCard.getLiveTemplate(item);
      });
      html += '</ul>';
    }
    $('#'+id).append(html);
  },
  getVods: function(id, data, moreData) {
    var html = '';
    html += '<div class="general_poster_list">';
    if (data && data.grids.length > 0) {
      html += '<ul class="poster_vlist live sort">';
      $(data.grids).each(function (i, item) {
        if (OksusuCard.isVodBannerAvailable(i, moreData)) {
          html += OksusuCard.getVodSubMainBannerHTML('VOD_CENTER', 'list');
        }
        html += OksusuCard.getVodTemplate(i, moreData, item, data.orga_prop_cd);
      });
      html += '</ul>';
    }
    html += '</div>';
    $('#'+id).append(html);
    try{
      Oksusu.Banner.load({ codes : [Oksusu.Banner.TYPE.VOD_CENTER] });
    }catch(e){}
  },
  getMovies: function(id, data, moreData) {
    var html = '';
    html += '<div class="general_poster_list">';
    if (data && data.grids.length > 0) {
      html += '<ul class="poster_vlist movie sort">';
      $(data.grids).each(function (i, item) {
        if (OksusuCard.isMovieBannerAvailable(i, moreData)) {
          html += OksusuCard.getMovieSubMainBannerHTML('MOVIE_CENTER', 'list');
        }
        html += OksusuCard.getMovieTemplate(i, moreData, item, data.orga_prop_cd);
      });
      html += '</ul>';
    }
    html += '</div>';
    $('#'+id).append(html);
    try{
      Oksusu.Banner.load({ codes : [Oksusu.Banner.TYPE.VOD_CENTER] });
    }catch(e){}
  },
  getClips: function(id, data, moreData) {
    var html = '';
    $('#'+id).addClass('general_section_list');
    if (data && data.grids.length > 0) {
      html += '<ul class="section_vlist sort line4">';
      $(data.grids).each(function (i, item) {
        if (OksusuCard.isClipBannerAvailable(i, moreData)) {
          html += OksusuCard.getClipSubMainBannerHTML('CLIP_CENTER');
        }
        html += OksusuCard.getClipTemplate(i, moreData, item, data.orga_prop_cd);
      });
      html += '</ul>';
    }
    $('#'+id).append(html);
    try{
      Oksusu.Banner.load({ codes : [Oksusu.Banner.TYPE.CLIP_CENTER] });
    }catch(e){}
  },
  getMyLives: function(id, data, myChannelList) {
    var url = '/api/live/organization/list';
    $.ajax({
      url: url,
      data: data,
      success: function (response) {
        if (response.result === 'OK') {
          var html = '';
          var data = response.channels;
          if (data && data.length > 0) {
            html += '<ul class="section_vlist sort line3">';
            $(myChannelList).each(function (index, item){
              var i;
              for (i=0; i<data.length; i++){
                if(item===data[i].serviceId){
                  html += OksusuCard.getLiveTemplate(data[i]);
                  break;
                }
              }
            });
            html += '</ul>';
          }
          $('#'+id).append(html);
        }
      }
    });
  },
  getAllViewHtml: function(data) {
    if (!data || !data.call_object || (data.call_type != '7' && data.call_type != '4' && data.call_type != '5')) {
      return '';
    }

    if (data.call_type == '4' || data.call_type == '5') {
      var linkUrl = '/v/' + data.call_object;

      var html = ' <div class="vlist_allview">';
      html += '    <a href="' + linkUrl + '" title="전체보기" class="ico_arrow">전체보기</a>';
      html += '  </div>';
      return html;
    }

    var callObjectArray = data.call_object.split('|');
    var linkUrl = '';

    $.each(Category, function(index, item) {
      if (item.name != 'news') {
        if (callObjectArray && callObjectArray.length > 0) {
          if (callObjectArray.length == 2) {
            if (item.code == callObjectArray[0]) {
              linkUrl = item.link + '?mid=' + callObjectArray[1];
              return false;
            } else {
              linkUrl = '/browse?sid=' + callObjectArray[1];
            }
          } else if (callObjectArray.length == 3) {
            if (item.code == callObjectArray[0]) {
              linkUrl = item.link + '?mid=' + callObjectArray[1] + '&sid=' + callObjectArray[2];
              return false;
            } else {
              linkUrl = '/browse?sid=' + callObjectArray[2];
            }
          } else {
            linkUrl = '/browse?sid=' + callObjectArray[0];
          }
        }
      }
    });

    var html = ' <div class="vlist_allview">';
    html += '    <a href="' + linkUrl + '" title="전체보기" class="ico_arrow">전체보기</a>';
    html += '  </div>';
    return html;
  },
  getHeadline: function(data, defaultValue) {
    if (!data || !data.card_headline) {
      return defaultValue || '';
    }
    return data.card_headline;
  },
  getSpecialClass: function(data) {
    if (!data || !data.spec_yn) {
      return '';
    }
    return (data.spec_yn === 'Y') ? 'text_blue': '';
  },
  getVodTitle: function(data) {
    if (!data || !data.title) {
      return '';
    }
    // 비로그인/성인인증 미완료/등급제한 설정
    if (this.isVodEros(data)) {
      if (!User.isLogin
          || (User.isLogin && !User.isAdult)
          || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19) ) {
        return this.property.text.adultOnly;
      }
    }
    return data.title;
  },
  getPrice: function(cardType, data) {
    var price;
    if (cardType == 10 || cardType == 17) {
      price = '<div class="text_tail"><span class="text_sum"><strong>' + OksusuCard.getSalePrc(data) + '</strong>원</span>';
      if (OksusuCard.getPreSalePrc(data) !== '') {
        price += '<span class="text_sum_sale">' + OksusuCard.getPreSalePrc(data) + '원</span>';
      }
    } else {
      price = '';
    }

    return price;
  },
  getPreSalePrc: function(data) {
    if(!data || !data.pre_sale_prc) {
      return '';
    }
    return commaNum(data.pre_sale_prc);
  },
  getSalePrc: function(data) {
    if(!data || !data.sale_prc) {
      return '';
    }
    return commaNum(data.sale_prc);
  },
  getBroadDate: function (data, cardInfo) {
    var broadDate = OksusuCard.getOpenDate(data, cardInfo);
    if (broadDate !== '') {
      return '<div class="meta_text_box"><div class="text_date">방영일<em>:</em>' + broadDate + '</div></div>';
    } else {
      return '';
    }
  },
  getClipTitle: function(data) {
    if (!data || !data.clip_title) {
      return '';
    }
    if (this.isClipEros(data)) {
      if (!User.isLogin
          || (User.isLogin && !User.isAdult)
          || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19) ) {
        return this.property.text.adultOnly;
      }
    }
    return data.clip_title;
  },
  getCardTitle: function(data, defaultValue) {
    if (!data || !data.card_title) {
      return defaultValue || '';
    }
    return data.card_title || defaultValue || '';
  },
  getDescription: function(data, defaultValue) {
    if (!data || !data.c_desc) {
      return defaultValue || '';
    }
    if (this.isVodEros(data)) {
      if (!User.isLogin
          || (User.isLogin && !User.isAdult)
          || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19)) {
        return '';
      }
    }
    return htmlEntities(data.c_desc) || defaultValue || '';
  },
  getLiveProgressRate: function(data) {
    if (!data || !data.programs || data.programs.length <= 0) {
      return 100;
    }
    var currentTime = moment().format('x');
    var startTime = parseInt(data.programs[0].startTime);
    var endTime = parseInt(data.programs[0].endTime);
    var runningTime = endTime - startTime;
    var elapseTime = currentTime - startTime;
    return Math.floor((elapseTime / runningTime) * 100);
  },
  getDurationTime1: function(data) {
    if (!data || !data.p_time) {
      return '00:00';
    }
    date = new Date();
    date.setSeconds(data.p_time);
    if (data.p_time >= 3600 ) {
      return date.toISOString().substr(11, 8);
    } else if ( data.p_time >= 60 ) {
      return date.toISOString().substr(14, 5);
    } else {
      return '00:'+date.toISOString().substr(17, 2)
    }
  },
  getDurationTime: function(data) {
    if (!data || !data.p_time) {
      return '00:00';
    }
    var sec_num = parseInt(data.p_time, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours <= 0) {
      return minutes+':'+seconds;
    } else {
      if (hours < 10) {
        hours   = "0"+hours;
      }
      return hours+':'+minutes+':'+seconds;
    }
  },
  getDurationText: function(data) {
    var st, et;
    if (!data || data.programs.length <= 0) {
      return '';
    } else {
      for (var i = 0; i < data.programs.length; i++) {
        if (moment().isBetween(
                moment(Number(data.programs[i].startTime)),
                moment(Number(data.programs[i].endTime)))) {
          st = data.programs[i].startTime ;
          et = data.programs[i].endTime;
          break;
        }
      }
      return this.convertTime(st, et);
    }
  },
  getViewCount: function(data) {
    return commaNum(data.view_count);
  },
  getOpenDate: function(data, parentData) {
    if (!data.dd_broad && !data.dd_televise) {
      return '';
    }
    if (parentData && parentData.dateview_yn === 'N') {
      return '';
    }
    var baseline = (data.dd_broad) ? data.dd_broad : data.dd_televise;
    return baseline.substring(0, 4) + '.' + baseline.substring(4, 6) + '.' + baseline.substring(6, 8) + '<em>('+this.getDayOfWeek(baseline.substring(0,8))+')</em>';
  },
  getDayOfWeek: function(yyyymmdd) {
    if (yyyymmdd.length != 8) {
      return '';
    }
    var weeknumber = moment(yyyymmdd, "YYYYMMDD").day();
    var aWeekString = {'0':'일','1':'월','2':'화','3':'수','4':'목','5':'금','6':'토'};
    return aWeekString[weeknumber];
  },
  getLiveAdult: function(data) {
    var ratingCd;

    if (data && data.programs && data.programs.length > 0) {
      for(var i=0;i<data.programs.length;i++){
        if(data.programs[i].is_live ==="Y" || data.programs[i].currentProgramYn ==="Y") {
          ratingCd = data.programs[i].ratingCd;
          break;
        }
      }
      if(!ratingCd) { ratingCd = data.programs[0].ratingCd; }
    } else if ( data && data.level ) {
      ratingCd = data.level;
    }
    return ratingCd || 0;
  },
  getVodAdult: function(data) {
    if (!data || !data.level) {
      return false;
    }
    return data.level;
  },
  getVodWatchedAdult: function(data) {
    if (!data || !data.rating) {
      return false;
    }
    return data.rating;
  },
  getVodBookmarkAdult: function(data) {
    if (!data || !data.rating) {
      return false;
    }
    return data.rating;
  },
  getCommentAdult: function(data) {
    if (!data || !data.adult_level) {
      return false;
    }
    return data.adult_level;
  },
  getClipAdult: function(data) {
    if ( data && data.level ) {
      return data.level;
    } else if (!data || !data.age_cd) {
      return false;
    }
    return (data.age_cd);
  },
  isLiveAdult: function(data) {
    if (!data) {
      return false;
    }
    if(data.programs){
      return (data.programs && data.programs.length >= 1 && data.programs[0].ratingCd === "19")
      || (data.programs && data.programs.length >= 1 && data.programs[0].genreCd === "260") ? true : false;
    }else{
      return ( data.adlt_cd ==='Y' || data.categoryNm === OksusuCard.property.live.categoryNmEros) ? true: false;
    }
  },
  isLiveEros: function(data) {
    if (!data) {
      return false;
    }
    return (data.genreCd === OksusuCard.property.live.erosGenre || data.adlt_cd === 'Y'
      || data.categoryNm === OksusuCard.property.live.categoryNmEros) ? true : false;
  },
  isVodAdult: function(data) {
    if (!data || !data.level) {
      return false;
    }
    return (this.getVodAdult(data) === '19') ? true : false;
  },
  isWatchedAdult: function(data) {
    if (!data || !data.rating) {
      return false;
    }
    return (this.getVodWatchedAdult(data) === '19') ? true : false;
  },
  isBookmarkAdult: function(data) {
    if (!data || !data.adult_level) {
      return false;
    }
    return (this.getVodBookmarkAdult(data) === '19') ? true : false;
  },
  isCommentAdult: function(data) {
    if (!data || !data.adult_level) {
      return false;
    }
    return (this.getCommentAdult(data) === '19') ? true : false;
  },
  isVodEros: function(data) {
    if (!data || (!data.yn_adult && !data.adlt_cd && !data.categoryNm)) {
      return false;
    }

    if (data.yn_adult) {
      return (data.yn_adult === 'Y') ? true : false;
    } else if (data.adlt_cd) {
      return (data.adlt_cd === 'Y') ? true : false;
    } else if (data.categoryNm) {
      return (data.categoryNm === '에로스') ? true : false;
    } else {
      return false;
    }

  },
  isClipAdult: function(data) {
    if (!data || !data.age_cd) {
      return false;
    }
    return (this.getClipAdult(data) === '19') ? true : false;
  },
  isClipEros: function(data) {
    if (!data || !data.adlt_cd) {
      return false;
    }
    return (data.adlt_cd === OksusuCard.property.clip.erosCode) ? true : false;
  },
  haveCopyright: function(data, section) {
    if (section === 'search') {
      return (!data) ? false : true;
    } else {
      return (!data || !data.programs || data.programs.length < 1) ? false : true;
    }
  },
  getChannelThumbnail: function (data, size, section) {
    if(section==='search'){
      if (!data || !this.haveCopyright(data, section) || OksusuCard.isLiveAdult(data)) {
        return this.getChannelLogoBGWhite(data, size);
      }else{
        return 'http://igs.oksusu.com:8080/thumbnails/nsigs/224_126/thumb_' + data.channelId + '.jpg';
      }

    }else{
      if (!data || !data.thumbTypImageName ||
        !this.haveCopyright(data, section) || this.isLiveAdult(data)) {
        return this.getChannelLogoBGWhite(data, size);
      }

      if (data.genreCd === OksusuCard.property.live.erosGenre || data.genreCd === OksusuCard.property.live.musicGenre) {
        return this.getChannelLogoBGWhite(data, size);
      }
      if (!data.programs || data.programs.length <= 0) {
        return this.getChannelLogoBGWhite(data, size);
      }
      // 19등급 채널이고 나이제한이 15세 일때에도 썸네일이 미노출
      if (User.isLogin && User.watchLevel !== 'N') {
        if (this.getLiveAdult(data) >= User.watchLevel) {
          return this.getChannelLogoBGWhite(data);
        }
      }
      var isBlackout = true;
      var chJTBCThumb;
      $.each(data.programs, function (index, item) {
        if (moment().isBetween(
            moment(Number(item.startTime)),
            moment(Number(item.endTime)))) {
          if (data.channel_extr_cd === '1') {
            chJTBCThumb = item.extr_custom_posterUrl.replace(':type', size);
          }
          isBlackout = false;
          return false;
        }
      });
      if (isBlackout) {
        return this.getChannelLogoBGWhite(data);
      }
      if (chJTBCThumb) {
        return chJTBCThumb.replace('igsqa', 'igs');
      }

      var size = (size) ? size : '224_126';
      return data.thumbTypImageName.replace(':type', size).replace('igsqa', 'igs');
    }


  },
  getChannelLogoBGWhite: function(data, size) {
    if (!data || !data.serviceId) {
      return '';
    }
    var size = (size) ? size : '224_126';
    return this.property.channelLogoBGWhitePrefixUrl.replace('0_0', size) + data.serviceId + '.png';
  },
  getClipThumbnail: function(data, size) {
    if (!data || (Boolean(!data.thum_info_type) && Boolean(!data.poster)) ) {
      return '';
    }
    if (this.isClipEros(data)) {
      if (!User.isLogin
          || (User.isLogin && !User.isAdult)
          || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19)) {
        return this.property.image.adultOnlyThumbnail_224_126;
      }
    }

    if(data.clip_img_typ_cd==='2'){
      return data.thum_info_half[0][1] || '';
    }

    var replaceSize = (size) ? size : '224_126';
    if (Boolean(data.thum_info_type)) {
      return data.thum_info_type[0][1].replace(':type', replaceSize) || '';
    } else if (Boolean(data.poster)) {
      return Oksusu.ImageUrlProp.STIMAGE.production + data.poster;
    } else {
      return '';
    }

  },
  haveHorizontalImage: function(data) {
    if ( !data || !data.thum_path ) {
      return false;
    } else {
      return true;
    }
  },
  getVodPoster: function(data) {
    if (!data || !data.poster) {
      return '';
    }
    return this.property.image.settopImagePrefixUrl + data.poster;
  },
  getVodBookmarkPoster: function(data) {
    if (!data || !data.poster) {
      return '';
    }
    var insertAt = data.poster.indexOf('.jpg');
    return this.property.image.settopImagePrefixUrl + [data.poster.slice(0, insertAt), '_190x272', data.poster.slice(insertAt)].join('');
  },
  getVodThumbImage: function(data, size) {
    if (!data || !data.thum_path) {
      return '';
    }
    var replaceSize = (size) ? size : '224_126';
    return data.thum_path.replace(':type', replaceSize);
  },
  getMoviePoster: function(data, size) {
    if (!data || (!data.pstr_path && !data.poster && !data.img)) {
      return '';
    }
    if (this.isVodEros(data)) {
      if (!User.isLogin
          || (User.isLogin && !User.isAdult)
          || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19)) {
        return this.property.image.adultOnlyThumbnail_224_320;
      }
    }
    if(data.pstr_path){
      var replaceSize = (size) ? size : '224_177';
      return data.pstr_path.replace(':type', replaceSize);
    } else if (data.poster) {
      return data.poster;
    } else if (data.img) {
      return 'http://image.oksusu.com:8080/thumbnails/image/224_320' + data.img;
    } else {
      return '';
    }

  },
  getVodPosterImage: function(data, size) {
    if (!data || !data.pstr_path) {
      return '';
    }
    var replaceSize = (size) ? size : '224_177';
    return data.pstr_path.replace(':type', replaceSize);
  },
  getVodThumbnail: function(data, size) {
    if (!data || (!data.thum_path && !data.pstr_path)) {
      return '';
    }
    var hv = 'H'; // vertical/horizontal
    if (size) {
      var aSize = size.split('_');
      if (aSize[0] < aSize[1]) {
        hv = 'V';
      }
    }
    if (hv === 'V' && data.pstr_path) {
      var replaceSize = (size) ? size : '224_177';
      return data.pstr_path.replace(':type', replaceSize);
    }
    if (hv === 'H' && data.thum_path) {
      var replaceSize = (size) ? size : '224_126';
      return data.thum_path.replace(':type', replaceSize);
    }
    return '';
  },
  getProgramName: function (data) {
    if (!data.title && !this.haveCopyright(data) && data.genreCd !== '800') { // TODO 음악/스포츠 확인필요
      return data.orgaBlackoutComment;
    }

    var programName = '';

    if(!data.programs){
      try{
        programName = data.title;
      }catch(e){}
    }else{
      for (var i=0; i<data.programs.length; i++) {
        if (moment().isBetween(
            moment(Number(data.programs[i].startTime)),
            moment(Number(data.programs[i].endTime)))) {
          programName = data.programs[i].programName;
          break;
        }
      }
    }

    if (!programName) {
      programName = this.property.text.noProgram;
    }

    // 비로그인/성인인증 미완료/등급제한 설정
    if (this.isLiveEros(data)) {
      // 정파방송
      if (data.level === '15') {
        if (User.isLogin === false || User.isAdult === false || User.serviceProvider !== "" || User.watchLevel !== 'N') {
          programName = this.property.text.adultOnly;
        }else{
          programName = data.title;
        }
      } else if (!data.level && data.programs[0].ratingCd === '15') {
        if (User.isLogin === false || User.isAdult === false || User.serviceProvider !== "" || User.watchLevel !== 'N') {
          programName = this.property.text.adultOnly;
        }else{
          programName = data.programs[0].programName;
        }
      }else{
        if (!User.isLogin
          || (User.isLogin && !User.isAdult)
          || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19) ) {
          programName = this.property.text.adultOnly;
        }
      }
    }

    return htmlEntities(programName);
  },
  getChannelName : function(data) {
    if (!data) {
      return '';
    }
    if (data.serviceId) {       // LIVE
      return data.channelName;
    } else if (data.clip_id) {  // CLIP
      return data.clip_chnl_nm;
    } else {                    // VOD
      return data.genre_nm;
    }
  },
  getRating: function(data) {
    if (!data || !data.rating) {
      return '평점을 남겨주세요.';
    }
    return data.rating;
  },
  isWatchAvailable: function(data) {
    if (!data) {
      return true;
    }
    if (User.watchLevel === 'N' &&
        (this.getLiveAdult(data) != '0'
          || this.getVodAdult(data) != '0'
          || this.getClipAdult(data) != '0'
          || this.getVodWatchedAdult(data) != '0'
          || this.getVodBookmarkAdult(data) != '0'
          || this.getCommentAdult(data) != '0')) {
      return true;
    }
    if (data.serviceId) {       // LIVE
      return (this.getLiveAdult(data)*1 < User.watchLevel*1);
    } else if (data.clip_id) {  // CLIP
      return (this.getClipAdult(data)*1 < User.watchLevel*1);
    } else if (data.end_time) { // VOD Watched
      return (this.getVodWatchedAdult(data)*1 < User.watchLevel*1);
    } else if (data.section) {  // VOD Bookmark
      return (this.getVodBookmarkAdult(data)*1 < User.watchLevel*1);
    } else if (data.comment_no) { // Comment
      return  (this.getCommentAdult(data)*1 < User.watchLevel*1);
    } else if (data.con_id) {   // VOD
      return (this.getVodAdult(data)*1 < User.watchLevel*1);
    } else {
      return (this.getVodBookmarkAdult(data)*1 < User.watchLevel*1);
    }

    return true;
  },
  getLinkClickHandler: function(data) {
    var linkUrl = '';
    var viewLinkUrl = '';
    if (data.serviceId) {       // LIVE
      linkUrl = 'move("/v/' + data.serviceId+'")';
      viewLinkUrl = '/v/'+data.serviceId;
    } else if (data.clip_id) {  // CLIP
      linkUrl = 'move("/v/' + data.clip_id+'")';
      viewLinkUrl = '/v/'+data.clip_id;
    } else {                    // VOD
      linkUrl = 'move("/v/' + data.con_id+'")';
      viewLinkUrl = '/v/'+data.con_id;
    }
    if (User.isMemberAuth && User.isAdult && User.watchLevel === 'N') {
      return linkUrl;
    }
    // 로그아웃 || 본인인증X
    if (!User.isMemberAuth){
      if (data.serviceId) {      // LIVE
        if (this.isLiveAdult(data) && !User.isLogin) {
          return 'move("/user/login?rw=' + location.pathname + location.search+'")';
        } else if (this.isLiveAdult(data) && !User.isMemberAuth) {
          return 'Popup.show(\'popupCheckAdult\',\'list\',\''+viewLinkUrl+'\')';
        }
      } else if (data.clip_id) {  // CLIP
        if (this.isClipAdult(data) && !User.isLogin) {
          return 'move("/user/login?rw=' + location.pathname + location.search+'")';
        } else if (this.isClipAdult(data) && !User.isMemberAuth) {
          return 'Popup.show(\'popupCheckAdult\',\'list\',\''+viewLinkUrl+'\')';
        }
      } else {                    // VOD
        if (this.isVodAdult(data) && !User.isLogin) {
          return 'move("/user/login?rw=' + location.pathname + location.search+'")';
        } else if (this.isVodAdult(data) && !User.isMemberAuth) {
          return 'Popup.show(\'popupCheckAdult\',\'list\',\''+viewLinkUrl+'\')';
        }
      }
    } else if (User.isAdult) {
      if (!this.isWatchAvailable(data)) {
        return 'Popup.show(\'popupRestrictView\',\'list\',\''+viewLinkUrl+'\')';
      }
    } else if (!User.isAdult) {
      if (this.isLiveAdult(data) || this.isClipAdult(data) || this.isVodAdult(data)
          || this.isWatchedAdult(data) || this.isCommentAdult(data) || this.isBookmarkAdult(data)) {
        // TODO 자동인증 팝업 구현
        return 'Popup.show(\'popupCheckAdult\',\'list\',\''+viewLinkUrl+'\')';
      } else {
        // 성인 설정을 위해서는 성인인증이 필수이므로 case 없음
      }
    }
    return linkUrl;
  },
  getLink: function(data) {
    var linkUrl = '';
    var param = {
      url: null,
      type: 'list'
    };
    if (data.serviceId) {       // LIVE
      linkUrl = '/v/' + data.serviceId;
    } else if (data.clip_id) {  // CLIP
      linkUrl = '/v/' + data.clip_id;
    } else {                    // VOD
      linkUrl = '/v/' + data.con_id;
    }
    if (User.isMemberAuth && User.isAdult && User.watchLevel === 'N') {
      return linkUrl;
    }
    // 로그아웃 || 본인인증X
    if (!User.isMemberAuth) {
      if (data.serviceId) {      // LIVE
        if (this.isLiveAdult(data) && !User.isLogin) {
          return  '/user/login?rw=' + location.pathname + location.search;
        } else if (this.isLiveAdult(data) && !User.isMemberAuth) {
          return 'javascript:" onclick="Popup.show(\'popupCheckAdult\',\'list\',\''+linkUrl+'\')';
        }
      } else if (data.clip_id) {  // CLIP
        if (this.isClipAdult(data) && !User.isLogin) {
          return '/user/login?rw=' + location.pathname + location.search;
        } else if (this.isClipAdult(data) && !User.isMemberAuth) {
          return 'javascript:" onclick="Popup.show(\'popupCheckAdult\',\'list\',\''+linkUrl+'\')';
        }
      } else {                    // VOD
        if (this.isVodAdult(data) && !User.isLogin) {
          return '/user/login?rw=' + location.pathname + location.search;
        } else if (this.isVodAdult(data) && !User.isMemberAuth) {
          return 'javascript:" onclick="Popup.show(\'popupCheckAdult\',\'list\',\''+linkUrl+'\')';
        }
      }
    } else if (User.isAdult) {
      if (!this.isWatchAvailable(data)) {
        param.url = linkUrl;
        return 'javascript:" onclick="Popup.show(\'popupRestrictView\',\'list\',\''+linkUrl+'\')';
      }
    } else if (!User.isAdult) {
      if (this.isLiveAdult(data) || this.isClipAdult(data) || this.isVodAdult(data)) {
        return 'javascript:" onclick="Popup.show(\'popupCheckAdult\',\'list\',\''+linkUrl+'\')';
      } else {
        // 성인 설정을 위해서는 성인인증이 필수이므로 case 없음
      }
    }
    return linkUrl;
  },
  getRandomId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  getVodAdultHtml: function(data) {
    if (!data) {
      return '';
    }
    if (this.isVodAdult(data)) {
      return '<i class="rating_19">19</i>';
    } else {
      return '';
    }
  },
  getHashTagHTML: function(data) {
    return '';
    var html = '';
    html += '<div class="hash_tag_wrap">';
    html += ' <ul>';
    html += '   <li class="on">';
    html += '     <a href="javascript:" title="함께본방송">';
    html += '                            # 추리';
    html += '     </a>';
    html += '   </li>';
    html += ' </ul>';
    html += '</div>';
    return html;
  },
  getCardInfo: function(id, cardCode) {
    var cardInfo = {};
    var defaultCardInfo = {
      id: id,
      type: cardCode,
      ulId: OksusuCard.getRandomId(),
      getUlId: function() {
        return '#'+this.ulId
      }
    };
    if (cardCode === '1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: false,
        mediaType: 'LIVE',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'grid03',
        ulClassName: 'sort line3',
        enableSlide: false
      } );
    } else if (cardCode === '1_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'LIVE',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'grid03',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '2') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'LIVE',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'grid03',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '3') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'LIVE',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: '',
        ulClassName: 'sort line3',
        enableSlide: false
      } );
    } else if (cardCode === '3_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'LIVE',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: '',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '4') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'LIVE',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: '',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '5') {
      cardInfo = $.extend( defaultCardInfo, {
        display: false,
        mediaType: 'MOVIE',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'general_section_list grid03',
        ulClassName: 'sort',
        enableSlide: false
      } );
    } else if (cardCode === '5_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'general_section_list grid03',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '6') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'general_section_list grid03',
        ulClassName: 'sort',
        enableSlide: true
      } );
    } else if (cardCode === '7') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: 'sort',
        enableSlide: false
      } );
    } else if (cardCode === '7_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '7_2') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '8') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '10') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '11') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'MOVIE',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '12') {
      cardInfo = $.extend(defaultCardInfo, {
        display: false,
        mediaType: 'VOD',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'general_section_list grid03',
        ulClassName: 'sort',
        enableSlide: false
      });
    } else if (cardCode === '12_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'general_section_list grid03',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '13') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'general_section_list grid03',
        ulClassName: 'sort',
        enableSlide: true
      } );
    } else if (cardCode === '14') {
      cardInfo = $.extend(defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: 'sort',
        enableSlide: false
      });
    } else if (cardCode === '14_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: '',
        enableSlide: true
      });
    } else if (cardCode === '14_2') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: 'general_section_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '14_3') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: 'sort',
        enableSlide: true
      } );
    } else if (cardCode === '15') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: 'general_section_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '17') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: 'general_section_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '18') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: 'general_section_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '19') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_320',
        rowCount: 5,
        divClassName: 'general_poster_list',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '20') {
      cardInfo = $.extend( defaultCardInfo, {
        display: false,
        mediaType: 'CLIP',
        imageWH: '387_217',
        rowCount: 5,
        divClassName: 'grid03',
        ulClassName: 'sort line3',
        enableSlide: false
      } );
    } else if (cardCode === '20_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'CLIP',
        imageWH: '387_217',
        rowCount: 3,
        divClassName: 'grid03',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '21') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'CLIP',
        imageWH: '387_217',
        rowCount: 5,
        divClassName: 'grid03',
        ulClassName: 'sort line3',
        enableSlide: false
      } );
    } else if (cardCode === '22') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'CLIP',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: '',
        ulClassName: 'sort line4',
        enableSlide: false
      } );
    } else if (cardCode === '22_1') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'CLIP',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: '',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '23') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'CLIP_FIXED_1_3',
        imageWH: '224_126',
        rowCount: 4,
        divClassName: 'grid01',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '24') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'CLIP',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: '',
        ulClassName: '',
        enableSlide: true
      } );
    } else if (cardCode === '27') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'BUTTON',
        enableSlide: false
      } );
    } else if (cardCode === '29') {
      cardInfo = $.extend( defaultCardInfo, {
        display: true,
        mediaType: 'VOD',
        imageWH: '224_126',
        rowCount: 5,
        divClassName: 'general_section_list',
        ulClassName: '',
        enableSlide: true
      } );
    }
    return cardInfo;
  },
  getCardTemplateWrapper: function(cardInfo, data) {
    if (!cardInfo.display) {
      return false;
    }

    data.grids.length = this.getGridLength(cardInfo.type, data.grids.length);

    if (cardInfo.mediaType === 'LIVE') {
      this.getLiveCardTemplate(cardInfo, data);
    } else if (cardInfo.mediaType === 'VOD') {
      this.getVodCardTemplate(cardInfo, data);
    } else if (cardInfo.mediaType === 'MOVIE') {
      this.getMovieCardTemplate(cardInfo, data);
    } else if (cardInfo.mediaType === 'CLIP') {
      this.getClipCardTemplate(cardInfo, data);
    } else if (cardInfo.mediaType === 'CLIP_FIXED_1_3') {
      this.getClipFixed1_3_CardTemplate(cardInfo, data);
    } else if (cardInfo.mediaType === 'BUTTON') {
      this.getButtonCardTemplate(cardInfo, data);
    }
    if (cardInfo.enableSlide) {
      OksusuCard.sliderSetFn(cardInfo.getUlId(), cardInfo.rowCount);
    } else if (cardInfo.type === '27') {
      OksusuCard.setButtonCardMargin(cardInfo.getUlId());
    }
  },
  getLiveCardTemplate: function(cardInfo, data) {
    var html = '';
    var allViewHtml = OksusuCard.getAllViewHtml(data);
    var specialClass = OksusuCard.getSpecialClass(data);

    html += '<div class="general_section_list '+cardInfo.divClassName+'" data-type="'+cardInfo.type+'">';
    html += ' <div class="section_title_box">';
    html += '   <span class="ico_name '+specialClass+'">'+ this.getHeadline(data, cardInfo.mediaType)+'</span>';
    html += '   <span class="section_title normal">'+this.getCardTitle(data)+'</span>';
    html += ' </div>';
    html += allViewHtml;
    html += ' <ul class="section_vlist '+cardInfo.ulClassName+'" id="'+cardInfo.ulId+'">';
    if (data.grids && data.grids.length > 0) {
      $(data.grids).each(function (i, item) {
        if (cardInfo.mainYn === 'Y' && item.genreCd === Oksusu.ContentProp.genreCd.eros) {
          return true;
        }
        var image = OksusuCard.getChannelThumbnail(item, cardInfo.imageWH) || ReplaceImage.img_default_224x126;
        var channelName = item.channelName;
        var linkUrl = OksusuCard.getLink(item);
        var progressPercent = OksusuCard.getLiveProgressRate(item);
        var onAirHtml = '';
        var freeHtml = '';
        var chatHtml = '';
        var adultHtml = '';
        var programName = OksusuCard.getProgramName(item);

        if ( item.programs && item.programs.length >= 1 && item.programs[0].is_live === 'Y') {
          onAirHtml += '<span class="ico_onair">ON-AIR</span>';
        }
        if (item.channelProd === OksusuCard.property.live.free || item.channelProd === OksusuCard.property.live.loginFree) {
          freeHtml += '<span class="ico_free">FREE</span>';
        }
        if (item.chatYn === 'Y') {
          chatHtml += '<span class="ico_chatting">채팅중</span>';
        }
        if (OksusuCard.isLiveAdult(item)) {
          adultHtml += '<i class="rating_19">19세이상</i>';
        }

        html += '   <li>';
        html += '     <a href="' + linkUrl + '" title="' + programName + '">';
        html += '     <div class="section_info">';
        html += '       <div class="vlist_img">';
        html += '         <img src="' + image + '" alt="' + channelName + '" class="img_default" onerror="this.src=\'' + ReplaceImage.img_default_224x126 + '\'">';
        html += '         <div class="info-play-linear">';
        html += '           <span style="width:' + progressPercent + '%">재생진행률</span>';
        html += '         </div>';
        html += onAirHtml;
        html += '         <div class="ico_right_box">';
        html += freeHtml;
        html += chatHtml;
        html += '         </div>';
        html += '       </div>';
        html += '       <div class="vlist_text_box">';
        html += '         <div class="text_title line2">';
        html += adultHtml;
        html += programName;
        html += '         </div>';
        html += '       <div class="txt_log">' + channelName + '</div>';
        html += '       </div>';
        html += '     </div>';
        html += '     </a>';
        html += '   </li>';
      });
    }
    html += ' </ul>';
    html += '</div>';

    $('#'+cardInfo.id).append(html);
  },
  getMovieCardTemplate: function(cardInfo, data) {
    var html = '', image = '';
    var specialClass = OksusuCard.getSpecialClass(data);
    var allViewHtml = OksusuCard.getAllViewHtml(data);
    html += '<div class="'+cardInfo.divClassName+'" data-type="'+cardInfo.type+'">';

    if (cardInfo.divClassName.indexOf('section') > -1) {
      html += ' <div class="section_title_box">';
      html += '   <span class="ico_name ' + specialClass + '">' + this.getHeadline(data, cardInfo.mediaType) + '</span>';
      html += '   <span class="section_title normal">' + this.getCardTitle(data) + '</span>';
      html += ' </div>';
      html += allViewHtml;
      html += ' <ul class="section_vlist movie ' + cardInfo.ulClassName + '" id="' + cardInfo.ulId + '">';
      if (data.grids && data.grids.length > 0) {
        $(data.grids).each(function (i, item) {
          if (cardInfo.mainYn === 'Y' && item.yn_adult === 'Y') {
            return true;
          }
          if (item.con_id) {
            var onClickEvent = OksusuCard.getLinkClickHandler(item);
            var title = OksusuCard.getVodTitle(item);
            var description = OksusuCard.getDescription(item);
            var adultHtml = OksusuCard.getVodAdultHtml(item);
            var getRating = OksusuCard.getRating(item);
            var image = '';
            if (OksusuCard.haveHorizontalImage(item)) {
              if (cardInfo.divClassName.indexOf('grid03') > -1) {
                image = OksusuCard.getVodThumbImage(item, '387_217');
              } else {
                image = OksusuCard.getVodThumbImage(item, '224_126');
              }
            } else {
              if (cardInfo.divClassName.indexOf('grid03') > -1) {
                image = OksusuCard.getMoviePoster(item, '140_199');
              } else {
                image = OksusuCard.getMoviePoster(item, '80_114');
              }
            }

            if (OksusuCard.haveHorizontalImage(item)) {
              html += '   <li class="type_b">';
              html += '     <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
              html += '     <div class="section_info">';
              html += '       <div class="vlist_img">';
              html += '         <img src="' + image + '" alt="" class="img_default">';
              html += '         <div class="summary_info">';
              html += '           <span class="ico_grade">' + getRating + '</span>';
              html += '           <div class="text_title">' + title + '</div>';
              html += '           <div class="text_summary">' + description + '</div>';
              html += '         </div>';
              html += '       </div>';
              html += '       <div class="vlist_text_box">';
              html += '         <div class="text_title">';
              html += '           ' + adultHtml + title;
              html += '         </div>';
              html += '       </div>';
              html += '     </div>';
              html += '     </a>';
              html += '   </li>';
            } else {
              html += '   <li class="type">';
              html += '     <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
              html += '     <div class="section_info">';
              html += '       <div class="vlist_img">';
              html += '         <div class="vlist_bg type_v" style="background-image:url(' + image + ');"></div>';
              html += '         <img src="' + image + '" alt="" class="img_default type_v">';
              html += '         <div class="summary_info">';
              html += '           <span class="ico_grade">' + getRating + '</span>';
              html += '           <div class="text_title">' + title + '</div>';
              html += '           <div class="text_summary">' + description + '</div>';
              html += '         </div>';
              html += '       </div>';
              html += '       <div class="vlist_text_box">';
              html += '         <div class="text_title">';
              html += '           ' + adultHtml + title;
              html += '         </div>';
              html += '       </div>';
              html += '     </div>';
              html += '     </a>';
              html += '   </li>';
            }
          }
        });
      }
    } else if (cardInfo.divClassName.indexOf('poster') > -1) {
      html += ' <div class="poster_title_box">';
      html += '   <span class="ico_name ' + specialClass + '">' + this.getHeadline(data, cardInfo.mediaType) + '</span>';
      html += '   <span class="poster_title">' + this.getCardTitle(data) + '</span>';
      html += ' </div>';
      html += this.getHashTagHTML(data);
      html += allViewHtml;
      html += ' <ul class="poster_vlist movie ' + cardInfo.ulClassName + '" id="' + cardInfo.ulId + '">';
      if (data.grids && data.grids.length > 0) {
        $(data.grids).each(function (i, item) {
          if (cardInfo.mainYn === 'Y' && item.yn_adult === 'Y') {
            return true;
          }
          if (item.con_id) {
            var onClickEvent = OksusuCard.getLinkClickHandler(item);
            var title = OksusuCard.getVodTitle(item);
            var description = OksusuCard.getDescription(item);
            var adultHtml = OksusuCard.getVodAdultHtml(item);
            var getRating = OksusuCard.getRating(item);
            var image = OksusuCard.getMoviePoster(item, '224_320');
            var salesComment = (cardInfo.type == 11 && item.csl_cnts) ? '<div class="text_subtitle line2">' + item.csl_cnts + '</div>' : '';
            var price = OksusuCard.getPrice(cardInfo.type, item);

            html += '   <li>';
            html += '     <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
            html += '     <div class="poster_info">';
            html += '       <div class="vlist_img">';
            html += '         <img src="' + image + '" alt="" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">';
            if (image.indexOf('img_restricted') == -1) {
              html += '         <div class="summary_info">';
              html += '           <span class="ico_grade">' + getRating + '</span>';
              html += '           <div class="text_title">' + title + '</div>';
              html += '           <div class="text_summary">' + description + '</div>';
              html += '         </div>';
            }
            html += '       </div>';
            html += '       <div class="vlist_text_box">';
            html += '         <div class="text_title">';
            html += '           ' + adultHtml + title;
            html += '         </div>';
            html += price;
            html += salesComment;
            html += '       </div>';
            html += '     </div>';
            html += '     </a>';
            html += '   </li>';
          }
        });
      }
    }
    html += ' </ul>';
    html += '</div>';

    $('#'+cardInfo.id).append(html);
  },
  getVodCardTemplate: function(cardInfo, data) {
    var html = '', image = '';
    var specialClass = OksusuCard.getSpecialClass(data);
    var allViewHtml = OksusuCard.getAllViewHtml(data);
    html += '<div class="'+cardInfo.divClassName+'" data-type="'+cardInfo.type+'">';

    if (cardInfo.divClassName.indexOf('section') > -1) {
      html += ' <div class="section_title_box">';
      html += '   <span class="ico_name ' + specialClass + '">' + this.getHeadline(data, cardInfo.mediaType) + '</span>';
      html += '   <span class="section_title normal">' + this.getCardTitle(data) + '</span>';
      html += ' </div>';
      html += allViewHtml;
      html += ' <ul class="section_vlist ' + cardInfo.ulClassName + '" id="' + cardInfo.ulId + '">';
      if (data.grids && data.grids.length > 0) {
        $(data.grids).each(function (i, item) {
          if (item.con_id) {
            var onClickEvent = OksusuCard.getLinkClickHandler(item);
            var title = OksusuCard.getVodTitle(item);
            var adultHtml = OksusuCard.getVodAdultHtml(item);
            var broadDate = (cardInfo.type == 18) ? OksusuCard.getBroadDate(item, cardInfo) : '';
            var price = OksusuCard.getPrice(cardInfo.type, item);
            var seqNo = (item.seq_no && item.seq_no != '0' && cardInfo.type != '14' && cardInfo.type != '14_1' && cardInfo.type != '14_3' && cardInfo.type != '19') ? '(' + item.seq_no + '회)' : '';

            if (OksusuCard.haveHorizontalImage(item)) {
              if (cardInfo.divClassName.indexOf('grid03') > -1) {
                image = OksusuCard.getVodThumbImage(item, '387_217');
              } else {
                image = OksusuCard.getVodThumbImage(item, '224_126');
              }
            } else {
              if (cardInfo.divClassName.indexOf('grid03') > -1) {
                image = OksusuCard.getVodPosterImage(item, '140_199');
              } else {
                image = OksusuCard.getVodPosterImage(item, '80_114');
              }
            }

            if (OksusuCard.haveHorizontalImage(item)) {
              html += '   <li class="type_b">';
              html += '     <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
              html += '     <div class="section_info">';
              html += '       <div class="vlist_img">';
              html += '         <img src="' + image + '" class="img_default" onerror="this.src=\'' + ReplaceImage.img_default_224x126 + '\'">';
              html += '       </div>';
              html += '       <div class="vlist_text_box">';
              html += '         <div class="text_title">';
              html += '           ' + adultHtml + seqNo + title;
              html += '         </div>';
              html += price;
              html += broadDate;
              html += '       </div>';
              html += '     </div>';
              html += '     </a>';
              html += '   </li>';
            } else {
              html += '   <li class="type">';
              html += '     <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
              html += '     <div class="section_info">';
              html += '       <div class="vlist_img">';
              html += '         <div class="vlist_bg type_v" style="background-image:url(' + image + ');"></div>';
              html += '         <img src="' + image + '" alt="" class="img_default type_v">';
              html += '       </div>';
              html += '       <div class="vlist_text_box">';
              html += '         <div class="text_title">';
              html += '           ' + adultHtml + seqNo + title;
              html += '         </div>';
              html += broadDate
              html += '       </div>';
              html += '     </div>';
              html += '     </a>';
              html += '   </li>';
            }
          }
        });
      }
    } else if (cardInfo.divClassName.indexOf('poster') > -1) {
      html += ' <div class="poster_title_box">';
      html += '   <span class="ico_name ' + specialClass + '">' + this.getHeadline(data, cardInfo.mediaType) + '</span>';
      html += '   <span class="poster_title">' + this.getCardTitle(data) + '</span>';
      html += ' </div>';
      html += allViewHtml;
      html += ' <ul class="poster_vlist ' + cardInfo.ulClassName + '" id="' + cardInfo.ulId + '">';
      if (data.grids && data.grids.length > 0) {
        $(data.grids).each(function (i, item) {
          if (item.con_id) {
            var onClickEvent = OksusuCard.getLinkClickHandler(item);
            var title = OksusuCard.getVodTitle(item);
            var adultHtml = OksusuCard.getVodAdultHtml(item);
            var image = OksusuCard.getVodPosterImage(item, '224_320');
            var salesComment = (cardInfo.type == 19 && item.csl_cnts) ? '<div class="text_subtitle line2">' + item.csl_cnts + '</div>' : '';
            var seqNo = (item.seq_no && item.seq_no != '0' && cardInfo.type != '14' && cardInfo.type != '14_1' && cardInfo.type != '14_3' && cardInfo.type != '19') ? '(' + item.seq_no + '회)' : '';

            html += '   <li>';
            html += '     <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
            html += '     <div class="poster_info">';
            html += '       <div class="vlist_img">';
            html += '         <img src="' + image + '" alt="" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">';
            html += '       </div>';
            html += '       <div class="vlist_text_box">';
            html += '         <div class="text_title">';
            html += '           ' + adultHtml + seqNo + title;
            html += '         </div>';
            html += salesComment
            html += '       </div>';
            html += '     </div>';
            html += '     </a>';
            html += '   </li>';
          }
        });
      }
    }
    html += ' </ul>';
    html += '</div>';

    $('#'+cardInfo.id).append(html);
  },
  getClipCardTemplate: function(cardInfo, data) {
    var html = '';
    var allViewHtml = OksusuCard.getAllViewHtml(data);
    var specialClass = OksusuCard.getSpecialClass(data);

    html += '<div class="general_section_list '+cardInfo.divClassName+'" data-type="'+cardInfo.type+'">';
    html += ' <div class="section_title_box">';
    html += '   <span class="ico_name '+specialClass+'">'+ this.getHeadline(data, cardInfo.mediaType)+'</span>';
    html += '   <span class="section_title normal">'+this.getCardTitle(data)+'</span>';
    html += ' </div>';
    html += allViewHtml;
    html += ' <ul class="section_vlist '+cardInfo.ulClassName+'" id="'+cardInfo.ulId+'">';
    if (data.grids && data.grids.length > 0) {
      $(data.grids).each(function (i, item) {
        var image = OksusuCard.getClipThumbnail(item, cardInfo.imageWH) || ReplaceImage.img_default_224x126;
        var linkUrl = OksusuCard.getLink(item);
        var title = OksusuCard.getClipTitle(item);
        var adultHtml = '';
        var viewCount = OksusuCard.getViewCount(item);
        var openDate = OksusuCard.getOpenDate(item, data);
        var durationTime = OksusuCard.getDurationTime(item);
        var channelName = OksusuCard.getChannelName(item);

        if (OksusuCard.isClipAdult(item)) {
          adultHtml += '<i class="rating_19">19</i>';
        }

        html += '<li>';
        html += ' <a href="' + linkUrl + '" title="' + title + '">';
        html += ' <div class="section_info">';
        html += '   <div class="vlist_img">';
        html += '     <img src="' + image + '" alt="' + title + '">';
        html += '     <i class="bg_line">이미지 그라데이션</i>';
        html += '     <span class="vlist_time">' + durationTime + '</span>';
        html += '   </div>';
        html += '   <div class="vlist_text_box">';
        html += '     <div class="text_title">';
        html += adultHtml + title;
        html += '     </div>';
        html += '     <div class="text_subtitle text_blue">';
        html += channelName;
        html += '     </div>';
        html += '     <div class="text_play_count">';
        html += '       <span class="ico_count">' + viewCount + '</span>';
        html += '       <span class="text_date">' + openDate + '</span>';
        html += '     </div>';
        html += '   </div>';
        html += ' </div>';
        html += ' </a>';
        html += '</li>';
      });
    }
    html += ' </ul>';
    html += '</div>';

    $('#'+cardInfo.id).append(html);
  },
  getClipFixed1_3_CardTemplate: function(cardInfo, data) {
    var html = '';
    var allViewHtml = OksusuCard.getAllViewHtml(data);
    var specialClass = OksusuCard.getSpecialClass(data);
    var leftBigImage = (data.admin_thum_high) ? data.admin_thum_high : ReplaceImage.img_default;

    html += '<div class="general_section_list '+cardInfo.divClassName+'" data-type="'+cardInfo.type+'">';
    html += ' <div class="section_title_box">';
    html += '   <span class="ico_name '+specialClass+'">'+ this.getHeadline(data, cardInfo.mediaType)+'</span>';
    html += '   <span class="section_title normal">'+this.getCardTitle(data)+'</span>';
    html += ' </div>';
    html += allViewHtml;
    html += ' <div class="section_logo_list">';
    html += '   <img src="'+leftBigImage+'" alt="">';
    html += ' </div>';
    html += ' <ul class="section_vlist '+cardInfo.ulClassName+'" id="'+cardInfo.ulId+'">';
    if (data.grids && data.grids.length > 0) {
      $(data.grids).each(function (i, item) {
        var image = OksusuCard.getClipThumbnail(item, cardInfo.imageWH) || ReplaceImage.img_default_224x126;
        var linkUrl = OksusuCard.getLink(item);
        var title = OksusuCard.getClipTitle(item);
        var adultHtml = '';
        var viewCount = OksusuCard.getViewCount(item);
        var openDate = OksusuCard.getOpenDate(item, data);
        var durationTime = OksusuCard.getDurationTime(item);
        var channelName = OksusuCard.getChannelName(item);

        if (OksusuCard.isClipAdult(item)) {
          adultHtml += '<i class="rating_19">19</i>';
        }

        html += '<li>';
        html += ' <a href="' + linkUrl + '" title="' + title + '">';
        html += ' <div class="section_info">';
        html += '   <div class="vlist_img">';
        html += '     <img src="' + image + '" alt="' + title + '">';
        html += '     <i class="bg_line">이미지 그라데이션</i>';
        html += '     <span class="vlist_time">' + durationTime + '</span>';
        html += '   </div>';
        html += '   <div class="vlist_text_box">';
        html += '     <div class="text_title">';
        html += adultHtml + title;
        html += '     </div>';
        html += '     <div class="text_subtitle text_blue">';
        html += channelName;
        html += '     </div>';
        html += '     <div class="text_play_count">';
        html += '       <span class="ico_count">' + viewCount + '</span>';
        html += '       <span class="text_date">' + openDate + '</span>';
        html += '     </div>';
        html += '   </div>';
        html += ' </div>';
        html += ' </a>';
        html += '</li>';
      });
    }
    html += ' </ul>';
    html += '</div>';

    $('#'+cardInfo.id).append(html);
  },
  getButtonCardTemplate: function(cardInfo, data) {
    var html = '';
    var callObject;
    var link;

    html += '<div id="' + cardInfo.ulId + '" class="menuListBox ">';
    html += '<div class="menuList">';

    html += '<ul>';
    if (data.grids && data.grids.length > 0) {
      $(data.grids).each(function (i, item) {

        callObject = item.call_object.split('|');
        link = '/' + Oksusu.MenuProp.MenuId[callObject[0]] + '?mid=' + callObject[1] + '&sid=' + callObject[2];
        if (link.indexOf('adaptable')>-1) {
          link = link.replace('adaptable', 'browse');
        }

        html += '  <li><a href="' + link + '" title="'+ item.btn_name +'"><span>' + item.btn_name + '</span></a></li>';
      });
    }

    html += '</ul>';
    html += '</div>';
    html += '<button class="btnPrev"><span>이전</span></button>';
    html += '<button class="btnNext"><span>다음</span></button>';
    html += '</div>';
    $('#'+cardInfo.id).append(html);
  },
  getLiveTemplate: function(data) {
    var html = '';
    var image = OksusuCard.getChannelThumbnail(data, '224_126') || ReplaceImage.img_default_224x126;
    var channelName = data.channelName;
    var linkUrl = this.getLink(data);
    var progressPercent = OksusuCard.getLiveProgressRate(data);
    var onAirHtml = '';
    var freeHtml = '';
    var chatHtml = '';
    var adultHtml = '';
    var programName = OksusuCard.getProgramName(data);

    if ( data.programs && data.programs.length >= 1 && data.programs[0].is_live === 'Y') {
      onAirHtml += '<span class="ico_onair">ON-AIR</span>';
    }
    if (data.channelProd === OksusuCard.property.live.free || data.channelProd === OksusuCard.property.live.loginFree) {
      freeHtml += '<span class="ico_free">FREE</span>';
    }
    if (data.chatYn === 'Y') {
      chatHtml += '<span class="ico_chatting">채팅중</span>';
    }
    if (OksusuCard.isLiveAdult(data)) {
       adultHtml += '<i class="rating_19">19세이상</i>';
    }

    html += '<li class="basic_live">';
    html += ' <a href="'+linkUrl+'" title="'+programName+'">';
    html += ' <div class="section_info">';
    html += '   <div class="vlist_img">';
    html += '     <img src="'+image+'" alt="'+channelName+'" class="img_default" onerror="this.src=\''
      + Oksusu.ImageUrlProp.Logo.white387 + data.channelImageName + '\'">';
    html += '     <div class="info-play-linear">';
    html += '       <span style="width:'+progressPercent+'%">재생진행률</span>';
    html += '     </div>';
    html += onAirHtml;
    html += '     <div class="ico_right_box">';
    html += freeHtml;
    html += chatHtml;
    html += '     </div>';
    html += '     </div>';
    html += '     <div class="vlist_text_box">';
    html += '       <div class="text_title">';
    html += adultHtml;
    html += programName;
    html += '       </div>';
    html += '       <div class="txt_log">' + (data.programs.length !== 0 && programName !== this.property.text.noProgram  ? channelName :'') + '</div>';
    html += '   </div>';
    html += ' </div>';
    html += ' </a>';
    html += '</li>';

    return html;
  },
  getVodTemplate: function(i, moreData, data, orgaPropCd) {
    var html = '';
    var onClickEvent = OksusuCard.getLinkClickHandler(data);
    var title = OksusuCard.getVodTitle(data);
    var adultHtml = OksusuCard.getVodAdultHtml(data);
    var image = OksusuCard.getMoviePoster(data, '224_320');
    var rank = (i + 1) + ((moreData.pageNo - 1) * moreData.pageSize);
    var rankHtml = (orgaPropCd == 'RANK') ? '<div class="ranking_number">' + rank + '</div>' : '';

    html += '<li>';
    html += ' <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
    html += ' <div class="poster_info">';
    html += '   <div class="vlist_img">';
    html += '     <img src="' + image + '" alt="영화 포스터" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">';
    html += rankHtml
    html += '   </div>';
    html += '   <div class="vlist_text_box">';
    html += '     <div class="text_title">';
    html += '     ' + adultHtml + title;
    html += '     </div>';
    html += '   </div>';
    html += ' </div>';
    html += ' </a>';
    html += '</li>';

    return html;
  },
  getMovieTemplate: function(i, moreData, data, orgaPropCd) {
    var html = '';
    var onClickEvent = OksusuCard.getLinkClickHandler(data);
    var title = OksusuCard.getVodTitle(data);
    var description = OksusuCard.getDescription(data);
    var adultHtml = OksusuCard.getVodAdultHtml(data);
    var getRating = OksusuCard.getRating(data);
    var image = OksusuCard.getMoviePoster(data, '224_320');
    var rank = (i + 1) + ((moreData.pageNo - 1) * moreData.pageSize);
    var rankHtml = (orgaPropCd == 'RANK') ? '<div class="ranking_number">' + rank + '</div>' : '';

    html += '<li>';
    html += ' <a href="javascript:;" onclick=' + onClickEvent + ' title="' + title + '">';
    html += ' <div class="poster_info">';
    html += '   <div class="vlist_img">';
    html += '     <img src="' + image + '" alt="영화 포스터" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">';

    if (image.indexOf('img_restricted') == -1) {
      html += '     <div class="summary_info">';
      html += '       <span class="ico_grade"><em>' + getRating + '</em></span>';
      html += '       <div class="text_title">' + title + '</div>';
      html += '       <div class="text_summary">' + description + '</div>';
      html += '     </div>';
    }
    html += rankHtml
    html += '   </div>';
    html += '   <div class="vlist_text_box">';
    html += '     <div class="text_title">';
    html += '     ' + adultHtml + title;
    html += '     </div>';
    html += '   </div>';
    html += ' </div>';
    html += ' </a>';
    html += '</li>';

    return html;
  },
  getClipTemplate: function(i, moreData, data, orgaPropCd) {
    var html = '';
    var image = OksusuCard.getClipThumbnail(data, '224_126') || ReplaceImage.img_default_224x126;
    var title = OksusuCard.getClipTitle(data);
    var linkUrl = this.getLink(data);
    var adultHtml = '';
    var viewCount = OksusuCard.getViewCount(data);
    var openDate = OksusuCard.getOpenDate(data);
    var durationTime = OksusuCard.getDurationTime(data);
    var channelName = OksusuCard.getChannelName(data);
    var rank = (i + 1) + ((moreData.pageNo - 1) * moreData.pageSize);
    var rankHtml = (orgaPropCd == 'RANK') ? '<div class="ranking_number">' + rank + '</div>' : '';

    if (OksusuCard.isClipAdult(data)) {
      adultHtml += '<i class="rating_19">19</i>';
    }

    html += '<li class="type">';
    html += ' <a href="'+linkUrl+'" title="'+title+'">';
    html += ' <div class="section_info">';

    if(data.clip_img_typ_cd === '1'){
      html += '   <div class="vlist_img bg_white">';
      html += '     <img src="'+image+'" alt="'+title+'">';
    }else{
      html += '   <div class="vlist_img bg_black">';
      html += '   <div class="vlist_bg type_v"></div>';
      html += '     <img src="'+image+'" alt="'+title+'" class="img_default type_v">';
    }

    html += '     <i class="bg_line"></i>';
    html += rankHtml
    html += '     <span class="vlist_time">'+durationTime+'</span>';
    html += '   </div>';
    html += '   <div class="vlist_text_box">';
    html += '     <div class="text_title">';
    html += adultHtml + title;
    html += '     </div>';
    html += '     <div class="text_subtitle text_blue">';
    html += channelName;
    html += '     </div>';
    html += '     <div class="text_play_count">';
    html += '       <span class="ico_count">'+viewCount+'</span>';
    html += '       <span class="text_date">' + openDate + '</span>';
    html += '     </div>';
    html += '   </div>';
    html += ' </div>';
    html += ' </a>';
    html += '</li>';

    return html;
  },
  convertTime: function(st, et) {
    var text_time = "", shh, ehh;
    if(st != undefined && et != undefined){
      var stHHmm = new Date(parseInt(st));
      var etHHmm = new Date(parseInt(et));

      var shour = stHHmm.getHours();
      var smin = stHHmm.getMinutes();

      var ehour = etHHmm.getHours();
      var emin = etHHmm.getMinutes();

      if(shour > 12) {
        shh = shour-12;
        if(shh < 10) shh = "0" + shh;
      } else {
        shh = shour;
        if(shh < 10) shh = "0" + shh;
      }

      if(ehour > 12) {
        ehh = ehour-12;
        if(ehh < 10) ehh = "0" + ehh;
      } else {
        ehh = ehour;
        if(ehh < 10) ehh = "0" + ehh;
      }

      var stTime = shh + ":" + (smin < 10 ? "0" + smin : smin);
      var endTime = ehh + ":" + (emin < 10 ? "0" + emin : emin);

      if(shour < 12) text_time += "오전 ";
      else text_time += "오후 ";
      text_time += stTime+ " ~ ";

      if(ehour < 12) text_time += "오전 ";
      else text_time += "오후 ";
      text_time += endTime;
    }
    return text_time;
  },
  property: {
    exceptHomeCard: [
      {}
    ],
    live: {
      free: '0',        // 무료
      loginFree: '5',   // 로그인 무료
      basicFree: '20',  // 기본월정액 무료
      paid: '99',       // 전체유료
      erosGenre: '260',
      categoryNmEros: '에로스', // EROS 장르
      musicGenre: '800',  // 음악 장르
    },
    clip: {
      erosCode: '02'  // EROS 코드
    },
    image: {
      settopImagePrefixUrl: 'http://stimage.oksusu.com:8080',
      adultOnlyThumbnail_224_126: '/public/assets/img/img_restricted01.png',
      adultOnlyThumbnail_387_217: '/public/assets/img/img_restricted02.png',
      adultOnlyThumbnail_224_320: '/public/assets/img/img_restricted03.png'
    },
    text: {
      noProgram: '방송 정보가 없습니다.',
      adultOnly: '성인 전용'
    },
    channelLogoSmallPrefixUrl: 'http://image.oksusu.com:8080/thumbnails/image/0_0_F20/live/logo/63/nsepg_',
    channelLogoBGWhitePrefixUrl: 'http://image.oksusu.com:8080/thumbnails/image/0_0_F20/live/logo/387/nsepg_',
    menuId:{
      9000000232: '',
      9000001345: 'free',
      9000000270: 'vod',
      9000000269: 'movie',
      9000000239: 'sports',
      9000000271: 'clip',
      9000000400: 'adaptable',
      9000000396: 'special/sktmember',
      9000002081: 'news', //뉴스
      9000002489: 'special/bandplay',
      9000000238: 'live'
    },
    liveTabMenuId:{
      'TOP 30':    '9000000273',
      '전체':      '9000000399',
      '종편/뉴스': '9000000884',
      'CJ':        '9000000883',
      'ch.JTBC':   '9000001884',
      '연예/오락': '9000000885',
      '스포츠':    '9000000886',
      '라이프':    '9000000887',
      '키즈/애니': '9000000888',
      '홈쇼핑':    '9000000889',
      '성인':      '9000000890',
      '음악':      '9000000891',
    },
    clipTabMenuId:{
      '테마': '9000000291'
    },
    typeByCode: {
      R000000001: '1',
      R000000002: '2',
      R000000003: '3',
      R000000004: '4',
      R000000005: '1_1',
      R000000006: '3_1',
      R000000007: '1_1',
      M000000001: '5',
      M000000002: '6',
      M000000003: '7',
      M000000004: '8',
      M000000005: '9',
      M000000006: '10',
      M000000007: '11',
      M000000008: '5_1',
      M000000009: '7_1',
      M000000010: '7_2',
      M000000011: '7_3',
      B000000001: '12',
      B000000002: '13',
      B000000003: '14',
      B000000004: '15',
      B000000005: '16',
      B000000006: '17',
      B000000007: '18',
      B000000008: '19',
      B000000009: '12_1',
      B000000010: '14_1',
      B000000012: '14_2',
      B000000013: '14_3',
      // B000000014: ''; //
      C000000001: '20',
      C000000002: '21',
      C000000003: '22',
      C000000004: '23',
      C000000005: '24',
      C000000006: '20_1',
      C000000007: '22_1',
      C000000009: '',
      O000000001: '25',
      O000000002: '26',
      O000000003: '27',
      O000000004: '28',
      B000000011: '29',
      I000000001: '30',
      L000000001: '31',
      L000000002: '32',
      L000000003: '33',
      L000000004: '34',
      L000000005: '35',
      L000000006: '36'
    },
    codeByName: {
      1   : 'R000000001',
      2   : 'R000000002',
      3   : 'R000000003',
      4   : 'R000000004',
      '1_1' : 'R000000005',
      '3_1' : 'R000000006',
      5   : 'M000000001',
      6   : 'M000000002',
      7   : 'M000000003',
      8   : 'M000000004',
      9   : 'M000000005',
      10  : 'M000000006',
      11  : 'M000000007',
      '5_1' : 'M000000008',
      '7_1' : 'M000000009',
      '7_2' : 'M000000010',
      '7_3' : 'M000000011',
      12  : 'B000000001',
      13  : 'B000000002',
      14  : 'B000000003',
      15  : 'B000000004',
      16  : 'B000000005',
      17  : 'B000000006',
      18  : 'B000000007',
      19  : 'B000000008',
      '12_1': 'B000000009',
      '14_1': 'B000000010',
      '14_2': 'B000000012',
      '14_3': 'B000000013',
      20  : 'C000000001',
      21  : 'C000000002',
      22  : 'C000000003',
      23  : 'C000000004',
      24  : 'C000000005',
      '20_1': 'C000000006',
      '22_1': 'C000000007',
      25  : 'O000000001',
      26  : 'O000000002',
      27  : 'O000000003',
      28  : 'O000000004',
      29  : 'B000000011',
      30  : 'I000000001',
      31  : 'L000000001',
      32  : 'L000000002',
      33  : 'L000000003',
      34  : 'L000000004',
      35  : 'L000000005',
      36  : 'L000000006'
    }
  },
  sliderSetFn: function(target, slideCount) {
    var sliderId = target.replace('#', '');
    var sliderPrevId = '#slider-prev' + sliderId;
    var sliderNextId = '#slider-next' + sliderId;
    var hasControl = ($(target).find('li').length > slideCount) ? true : false;
    var slideWidth = (slideCount == 3) ? 387 : 224;
    var lastIndex = Math.ceil($(target).find('li').length / slideCount) - 1;


    if (hasControl) {
      $(target).before('<span id="slider-prev' + sliderId + '"></span>');
      $(target).after('<span id="slider-next' + sliderId + '"></span>');

      $(target).bxSlider({
        slideWidth: slideWidth,
        minSlides: slideCount,
        maxSlides: slideCount,
        moveSlides: slideCount,
        slideMargin: 20,
        prevSelector: sliderPrevId,
        nextSelector: sliderNextId,
        nextText: '',
        prevText: '',
        pager: hasControl,
        controls: hasControl,
        infiniteLoop: false,
        touchEnabled: false,
        onSliderLoad: function () {
          $(sliderPrevId).find('.bx-prev').addClass('btn_slider').addClass('prev disabled');
          $(sliderNextId).find('.bx-next').addClass('btn_slider').addClass('next');

          if (!$('#slider-prev' + sliderId).prev().hasClass('vlist_allview')) {
            $('#slider-prev' + sliderId).next('.bx-wrapper').find('.bx-pager').css('right', '0px');
          }
        },
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
          $(sliderNextId).find('.bx-next').removeClass('disabled');
          $(sliderPrevId).find('.bx-prev').removeClass('disabled');

          if (lastIndex == newIndex) {
            $(sliderNextId).find('.bx-next').addClass('disabled');
          } else if (newIndex == 0) {
            $(sliderPrevId).find('.bx-prev').addClass('disabled');
          }
        }
      });
    }
  },
  setButtonCardMargin: function (target) {
    var $target = $(target);
    var $slideFn= new customSlideFn(target, {
      plusW: 0
      , innerWrap: $('.menuList', $target)
      , setMaxW: true
    });
    if (!$slideFn.isSlideState) {
      var _itemNum = $('li', $target).length;
      var _currentW = 1198 / _itemNum;
      $target.addClass('noSlide').find('ul').css({'width': 'auto'}).find('li').css({'width': _currentW});
    }

    function customSlideFn(wrapper, options) {
      options = options || {};
      var loop = options.loop == false ? false : true;
      var categoryWrap = $(wrapper);
      var categoryInner = options.innerWrap || $('.slideInnerWrap', categoryWrap);
      var slideWrap = $('> ul', categoryInner);
      var menuEle = $('li', slideWrap);
      var btnPrev = $('.btnPrev', categoryWrap);
      var btnNext = $('.btnNext', categoryWrap);
      var speed = options.speed || 700;
      var eleW = [] // 각요소의 넓이를 저장한다.
        , totalW = 0 // 전체넓이를 구하기위해 0으로 값셋팅
        , setMaxW = options.setMaxW == true ? true : false // 요소의 가장 큰 넓이로 셋팅한다.
        , eleMaxW = 0
        , viewW = categoryInner.outerWidth();//슬라이드 뷰영역 넓이
      var lastIdx = options.lastIdx || menuEle.length - 1// 리스트 요소 마지막 인덱스 값
        , firstIdx = options.firstIdx || 0// first index설정
        , oldIdx = firstIdx // 이전 인덱스
        , newIdx = firstIdx; // 현재 인덱스
      var posC = categoryInner.outerWidth() / 2; //wrapper의 넓이 반값을 구한다.
      var maxP // 다음이동시 최대로 움직일수 있는값
        , slideWrapPosL //움지기는 요소의 left값;
      var plusW = options.plusW || 0;// 볼드시 폰트사이즈 변경으로 텍스트 떨어지는 현상 막기위해 각요소의 넓이값에 더함
      var areaMove = options.areaMove == false ? false : true;
      var disabledClass = options.disabledClass//좌우 버튼 disabled 클래스string
        , btnDisabled = options.btnDisabled || false;
      var isSlideState = true;
      var eleAlign = options.eleAlign || 'center';//요소이동시 left/center/right 위치 지정 기본 center

      if (!loop) {
        if (oldIdx == firstIdx) {
          btnPrev.addClass('disabled');
        } else if (oldIdx == lastIdx) {
          btnNext.addClass('disabled');
        }
      }

      $('> ul li', categoryInner).each(function (i) {
        var _this = $(this);
        var _thisW = Math.ceil(_this.outerWidth()) + plusW;

        eleW[i] = _thisW;
        _this.css('width', _thisW).data('distL', totalW);
        totalW += _thisW;

        if (setMaxW) {//요소중 가장 큰 넓이값으로 셋팅
          eleMaxW = Math.max(eleW[i], eleMaxW);
          if (lastIdx == i) {
            menuEle.css('width', eleMaxW).data('distL', eleMaxW);
            totalW = eleMaxW * (i + 1);
          }
        }
      });

      $('> ul', categoryInner).css('width', totalW);
      maxP = totalW - viewW;

      if (maxP <= 0) {
        btnPrev.hide();
        btnNext.hide();
        return {isSlideState: false};
      } else {
        btnPrev.show();
        btnNext.show();
      }

      var slideTo = function (idx, mSpeed) {
        newIdx = idx;
        oldIdx = idx;
        moveEleFn(idx, mSpeed);
      }

      var transitionFn = function (mPos, mSpeed) {
        var duration = mSpeed || speed;
        slideWrap.css({
          'left': -mPos,
          'transition-delay': options.delay || 0,
          'transition-property': 'left',
          'transition-duration': duration + 'ms'
        });
        setTimeout(function () {
          options.slideAfter && options.slideAfter(newIdx, firstIdx, lastIdx, mPos, maxP);
        }, mSpeed || speed);
      }

      slideWrap.on('transitionend', function () {
        if (!options.slideAfter) options.transitionEnd && options.transitionEnd(newIdx, firstIdx, lastIdx, slideWrapPosL, maxP);
      });

      var moveEleFn = function (nIdx, mSpeed) {
        var posL = menuEle.eq(nIdx).data('distL');//각요소에 저장된 position값 left
        var thisW = eleW[nIdx];
        var nowEleC = posC - (thisW / 2);
        var mDist;// 움직일 거리

        if (eleAlign == 'center') {//선택된 요소가 중앙정렬일떄
          mDist = posL - nowEleC;
          if (nowEleC < posL && maxP > mDist) {
            transitionFn(mDist, mSpeed);
          } else if (maxP < mDist && parseInt(slideWrap.css('left')) != maxP) {
            mDist = maxP;
            transitionFn(mDist, mSpeed);
          } else if (parseInt(slideWrap.css('left')) != 0 || nIdx == lastIdx) {
            maxP = 0;
            transitionFn(mDist, mSpeed);
          }
        } else if (eleAlign == 'left') {//선택된 요소가 좌측정렬일때
          mDist = posL;
          if (mDist > maxP) {
            mDist = maxP;
            transitionFn(mDist, mSpeed);
          } else {
            transitionFn(mDist, mSpeed);
          }
        } else if (eleAlign == 'right') {//선택된 요소가 우측정렬일때
          mDist = posL;
          if (mDist + eleW[nIdx] < viewW) {
            mDist = 0;
            transitionFn(mDist, mSpeed);
          } else {
            mDist = (posL + eleW[nIdx]) - viewW;
            transitionFn(mDist, mSpeed);
          }
        }

        options.slideBefore && options.slideBefore(newIdx, firstIdx, lastIdx, mDist, maxP);
      }

      var areaMoveFn = function (dir, mSpeed) {
        slideWrapPosL = Math.abs(parseInt(slideWrap.css('left')));
        var remainPos = (totalW - slideWrapPosL) - categoryInner.outerWidth();
        var movingP;

        if (dir == 'next') {
          if (remainPos > posC && remainPos > 0) {
            movingP = slideWrapPosL + posC;
          } else if (remainPos <= posC && remainPos > 0) {
            movingP = slideWrapPosL + remainPos;
          } else {
            movingP = 0;
          }
        } else if (dir == 'prev') {
          if (slideWrapPosL > posC && slideWrapPosL > 0) {
            movingP = slideWrapPosL - posC;
          } else if (slideWrapPosL <= posC && slideWrapPosL > 0) {
            movingP = 0;
          } else {
            movingP = maxP;
          }
        }
        options.slideBefore && options.slideBefore(newIdx, firstIdx, lastIdx, movingP, maxP);
        transitionFn(movingP, mSpeed);
      }

      if (!btnDisabled) {//옵션에서 내부 버튼 클릭 요소 컨트롤
        btnPrev.click(function () {
          if ($(this).hasClass(disabledClass)) return;

          if (areaMove) {
            areaMoveFn('prev');
          } else {
            newIdx = oldIdx - 1 < firstIdx ? lastIdx : oldIdx - 1;
            if (oldIdx == firstIdx && !loop) {
              newIdx = oldIdx;
              return;
            }

            oldIdx = newIdx;
            moveEleFn(newIdx);
          }
        });

        btnNext.click(function () {
          if ($(this).hasClass(disabledClass)) return;

          if (areaMove) {
            areaMoveFn('next');
          } else {
            newIdx = oldIdx + 1 > lastIdx ? firstIdx : oldIdx + 1;
            if (oldIdx == lastIdx && !loop) {
              newIdx = oldIdx;
              return;
            }
            oldIdx = newIdx;
            moveEleFn(newIdx);
          }
        });
      }

      return {
        slideTo: function (idx, mSpeed) {
          slideTo(idx, mSpeed);
        }
        , getIndex: function () {
          return oldIdx;
        }
        , getLastIndex: function () {
          return lastIdx;
        }
        , isSlideState: isSlideState
      }
    }
  }
};
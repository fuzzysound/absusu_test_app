/* 형태가 같은 카드는 같은 라인에 정리
* 3_1, 4
* 7, 14
* 
* */

var Oksusu = Oksusu || {};
Oksusu.Card = Oksusu.Card || {};

// 전체보기 버튼 동작
Oksusu.Card.viewAll = function(target, callObject, card_typ_cd, callType){

  if (callType != '7' && callType != '4' && callType != '5') {
    $(target + ' .vlist_allview').css('display', 'none');
    $(target + ' .bx-pager').css('right', '0px');
    return;
  }

  if (callType == '4' || callType == '5') {
    url = '/v/' + callObject;
    $(target + ' .vlist_allview a').attr('href', url);

    return;
  }

  if ( !callObject ) {
    $(target + ' .vlist_allview').css('display', 'none');
    $(target + ' .bx-pager').css('right', '0px');
    return;
  }

  var menuId = callObject.split('|');
  var url;

  if (Oksusu.MenuProp.MenuId[menuId[0]] === 'news') {
    $(target + ' .vlist_allview').css('display', 'none');
    $(target + ' .bx-pager').css('right', '0px');

  } else if (Oksusu.MenuProp.MenuId[menuId[0]] === 'adaptable') {
    var cardTypCd = card_typ_cd.substring(0, 10);
    var cardNum = Oksusu.CardProp.CardType[cardTypCd];
    var contentType;
    var sid = menuId[2] || '';

    switch(cardNum){
      case '5':
      case '5_1':
      case '6':
      case '7':
      case '7_1':
      case '7_2':
      case '8':
      case '10':
      case '11':
      case '12':
      case '12_1':
      case '13':
      case '14':
      case '14_1':
      case '14_2':
      case '14_3':
      case '15':
      case '17':
      case '18':
      case '19':
        contentType = 'vod';
        break;
      // 영화, vod를 제외한 카드
      default:
        contentType = 'clip';
    }
    url = '/browse?sid=' + sid;
    $(target + ' .vlist_allview a').attr('href', url);
  } else {
    var sid = menuId[2] || '';
    url = '/' + Oksusu.MenuProp.MenuId[menuId[0]] + '?mid=' + menuId[1] + '&sid=' + sid;
    $(target + ' .vlist_allview a').attr('href', url);
  }

};
Oksusu.Card.putCardTypeClipList = function(target, cardInfo) {
  var i;
  var totSlideNum = 30 < cardInfo.grids.length ? 30 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var cardFrameDom
      = '  <ul class="section_vlist sort line4"></ul>';

  var slideDom=[];
  for(i=0; i<totSlideNum; i++) {
    var html = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <i class="bg_line">이미지 그라데이션</i>'
        + '        <span class="vlist_time"></span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;"></i>'
        + '          <span></span>'
        + '        </div>'
        + '          <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
    slideDom.push(html);
  }

  $(target).addClass('cardTypeClipList');
  $(target).addClass('cardFilled');
  $(target).addClass('general_section_list');
  $(target).append(cardFrameDom);


  for (i=0; i<totSlideNum; i++){
    if(!cardInfo.grids[i]){
      break;
    }

    $(target + ' .section_vlist').append(slideDom[i]);

    var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '320_180');

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));
    // 재생시간
    $(target + ' .contentNum' + i + ' .vlist_time').text(OksusuCard.getDurationTime(cardInfo.grids[i]));

    // 조회수
    $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : '0' );

    // 방영일
    if( cardInfo.grids[i].dd_broad) {
      $(target + ' .contentNum' + i + ' .text_date').html(OksusuCard.getOpenDate(cardInfo.grids[i], cardInfo));
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
      }

      // 일반
    } else {

      // 19금
      if (cardInfo.grids[i].age_cd === '19') {
        $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
      }

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
    }

  }

};

Oksusu.Card.putCardTypeVodList = function(target, cardInfo) {
  var i;
  var slideDom = [];
  var cardFrameDom
      = '  <ul class="poster_vlist sort movie"></ul>';

  // 그리드 정보의 갯수가 30보다 작으면 그만큼만 출력한다.
  for (i=0; i<cardInfo.grids.length; i++){
    if (cardInfo.grids[i]===undefined){
      break;
    }
  }
  var totSlideNum = i < 30  ? i : 30;    // 전체 슬라이드 갯수

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt=""/>'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('cardTypeViewAll');
  $(target).addClass('cardFilled');
  $(target).addClass('general_poster_list');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));
    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr(
              'src', cardInfo.grids[i].poster_high);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{
      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      if (cardInfo.grids[i].poster_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr(
            'src', cardInfo.grids[i].poster_high);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }
};

// [14] 방송 VOD 3XN 그리드형
// TODO:sports
Oksusu.Card.putCardType14_sports = function(target, cardInfo) {
    var i;
    var totSlideNum = cardInfo.grids.length >= 10 ? 10:cardInfo.grids.length;
    var slideDom = [];
    var cardFrameDom
        = '  <div class="poster_title_box">'
        + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
        + '    <span class="poster_title">' + cardInfo.card_title + '</span>'
        + '  </div>'
        + '  <ul class="poster_vlist sort movie"></ul>';

    for(i=0; i<totSlideNum; i++) {
        slideDom[i]
            = '<li class="contentNum' + i + '">'
            + '  <a href="javascript:" title="">'
            + '    <div class="poster_info">'
            + '      <div class="vlist_img">'
            + '        <img alt=""/>'
            + '        <div class="summary_info">'
            + '          <span class="ico_grade">평점을 남겨주세요.</span>'
            + '          <div class="text_title"></div>'
            + '          <div class="text_summary"></div>'
            + '        </div>'
            + '      </div>'
            + '      <div class="vlist_text_box">'
            + '        <div class="text_title"></div>'
            + '      </div>'
            + '    </div>'
            + '  </a>'
            + '</li>';
    }

    $(target).addClass('cardType14_sport');
    $(target).addClass('cardFilled');
    $(target).addClass('general_poster_list');
    $(target).append(cardFrameDom);

    for (i = 0; i < totSlideNum; i++) {
        $(target + ' .poster_vlist').append(slideDom[i]);

        // 링크
      $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

        // 에로스
        if ( cardInfo.grids[i].yn_adult === 'Y' ) {
            // 19금 아이콘
            $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

            // 성인유저
            if (User.isAdult === true) {
                // 포스터
                if (cardInfo.grids[i].poster_high !== null) {
                    $(target + ' .contentNum' + i + ' .vlist_img img').attr(
                        'src', cardInfo.grids[i].poster_high);
                } else {
                    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
                }

                // 타이틀
                $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
                $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
                $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);



                // 줄거리
                $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

                // 미성년 유저
            }else{
                // 포스터
                $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
                    '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
                $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

                // 타이틀
                $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
                $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
                $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

                // 줄거리
                $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
            }

            // 일반
        }else{

            // 19금
            if ( cardInfo.grids[i].level === '19' ){
                $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
            }

            // 포스터
            if (cardInfo.grids[i].poster_high !== null) {
                $(target + ' .contentNum' + i + ' .vlist_img img').attr(
                    'src', cardInfo.grids[i].poster_high);
            } else {
                $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
            }

            // 타이틀
            $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
            $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
            $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

            // 줄거리
            $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        }

        // 평점
        if ( cardInfo.grids[i].rating !== null ){
            $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
        }
    }
};

Oksusu.Card.putCardType14_2_live = function(target, title, vodList){
  var i;
  var totSlideNum = vodList.length > 25 ? 25 : vodList.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardHeadDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">방송VOD</span>'
      + '    <span class="section_title">연예 스페셜</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<div id="allVodSlide' + i + '" class="slide">'
        // + '  <a href="" title="' + title + ' ' + vodList[i].seq_no + '">'
        + '  <a href="" title="' + title + ' ' + '회">'
        + '    <div class="vlist_img bg_black">'
            //TODO 썸네일 이미지 경로 입력
        + '      <img src="/public/assets/img/img_live_bg.png" alt="방송 이미지">'
        + '    </div>'
        + '    <div class="vlist_text_box">'
        + '      <div class="text_title line1">' + title
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</div>';
  }

  // empty slide content
  // var emptySlideDom = '<div class="slide"><div>&nbsp;</div></div>';

  // DOM 기본 구조 생성
  $(target).addClass('cardType14_2_live');
  $(target).addClass('cardFilled');
  $(target).addClass('general_section_list');
  $(target).append('<div class="cardHead"></div>');
  $(target + ' .cardHead').append(cardHeadDom);
  $(target).append('<div class="cardBody"></div>');


  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .cardBody').append(slideDom[i]);
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

Oksusu.Card.putCardType20_1_live = function(target, clipList){

  var i;
  var totSlideNum = clipList.length > 25 ? 25 : clipList.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var date;
  var clipDuration;
  var ddBroad;

  // card header
  var cardHeadDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">클립</span>'
      + '    <span class="section_title"></span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<div class="contentNum' + i + ' slide">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img bg_black">'
        + '        <img alt="">'
        + '        <span class="vlist_time"></span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '        <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</div>';
  }

  // DOM 기본 구조 생성
  $(target).addClass('cardType20_1_live');
  $(target).addClass('cardFilled');
  $(target).addClass('general_section_list');
  $(target).append('<div class="cardHead"></div>');
  $(target + ' .cardHead').append(cardHeadDom);
  $(target).append('<div class="cardBody"></div>');

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .cardBody').append(slideDom[i]);
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);

  // 카드 타이틀
  $(target + ' .section_title').text(clipList[i].clip_chnl_nm + ' 인기클립');

  for(i=0; i<clipList.length; i++){

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(clipList[i]));

    // 썸네일 이미지
    if( clipList[i].adlt_cd !== Oksusu.ContentProp.adlt_cd.eros ) {
      // 일반채널
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
          clipList[i].thum_info_high[0][1]);
    }else{
      // 에로스채널

      // 성인
      if (User.isAdult === true) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            clipList[i].thum_info_high[0][1]);
      // 미성년자
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');
      }
    }

    // 재생시간
    date = new Date(null);
    date.setSeconds(clipList[i].p_time);

    if( clipList[i].p_time >= 3600 ){
      clipDuration = date.toISOString().substr(11, 8);
    } else {
      clipDuration = date.toISOString().substr(14, 5);
    }

    $(target + ' .contentNum' + i + ' .vlist_time').text(clipDuration);

    // 19금 아이콘
    if( clipList[i].ageCd === '19') {
      $(target + ' .contentNum' + i + ' .text_title').addClass('rating_19');
    }

    //클립정보
    if( clipList[i].adult_cd !== Oksusu.ContentProp.genreCd.eros) {
      // 일반클립
      $(target + ' .contentNum' + i + ' .text_title').append(clipList[i].clip_title);
      $(target + ' .contentNum' + i + ' .text_subtitle').append(clipList[i].clip_chnl_nm);
    }else{
      // 에로스채널
      if( User.isAdult === true ){
        // 성인유저
        $(target + ' .contentNum' + i + ' .text_title').append(clipList[i].clip_title);
        $(target + ' .contentNum' + i + ' .text_subtitle').append(clipList[i].clip_chnl_nm);
      }else{
        $(target + ' .contentNum' + i + ' .text_title').append('성인전용');
        $(target + ' .contentNum' + i + ' .text_subtitle').append('성인전용');
      }
    }

    // 조회수
    $(target + ' .contentNum' + i + ' .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : "" );

    // 방영일
      if( clipList[i].dd_broad !== null ){
        ddBroad = clipList[i].dd_broad.substring(0, 4) + '.'
            + clipList[i].dd_broad.substring(4, 6) + '.' + clipList[i].dd_broad.substring(6, 8);
        $(target + ' .contentNum' + i + ' .text_date').text(ddBroad);
    }

  }

};


Oksusu.Card.putCardType3_1_live = function(target, sameGenreList) {
  var i;
  var totSlideNum = sameGenreList.length > 25 ? 25 : sameGenreList.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var startTime;     // 시작시간
  var endTime;       // 종료시간
  var currentTime = moment().format('x'); // 현재시간
  var runningTime;   // 러닝타임
  var elapseTime;    // 플레이된 시간
  var progressRate;  // 플레이된 시간(백분율)

  // card header
  var cardHeadDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">LIVE</span>'
      + '    <span class="section_title">같은 장르 채널 보기</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<div class="contentNum' + i + ' slide">'
        + '  <a href="javascript:" title="">'
        + '    <div class="highlight_info">'
        + '      <div class="vlist_img none">'
        + '        <img alt="">'
        + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
        + '        <span class="ico_onair" style="display:none">ON-AIR</span>'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none">FREE</span>'
        + '          <span class="ico_chatting" style="display:none">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '         <div class="text_title"></div>'
        + '         <div class="txt_log">채널명</div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</div>';
  }

  // DOM 기본 구조 생성
  $(target).addClass('cardType3_1_live');
  $(target).addClass('cardFilled');
  $(target).addClass('general_section_list');
  $(target).append('<div class="cardHead"></div>');
  $(target + ' .cardHead').append(cardHeadDom);
  $(target).append('<div class="cardBody"></div>');

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .cardBody').append(slideDom[i]);
  }

  for(i=0; i<sameGenreList.length; i++) {

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(sameGenreList[i]));

    // 썸네일 이미지
    if (sameGenreList[i].genreCd !== Oksusu.ContentProp.genreCd.eros) {
      // 일반채널

      if (cardInfo.grids[i].thumbExtImageName !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', sameGenreList[i].thumbExtImageName);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x126);
      }

    } else {
      // 에로스채널
      if (User.isAdult === true) {
        // 성인유저

        if (cardInfo.grids[i].thumbExtImageName !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', sameGenreList[i].thumbExtImageName);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x126);
        }

      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

      }
    }

    // 유/무료 여부
    if (sameGenreList[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (sameGenreList[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (sameGenreList[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if( sameGenreList[i].chatYn === Oksusu.ContentProp.chatYn) {
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    if( sameGenreList[i].programList.length >= 1 ){

      // 채널아이콘, 19금, 프로그램명 영역 초기화
      $(target + ' .contentNum' + i + ' .text_section').html('');

      // TODO 재생중 아이콘
//          if(sameGenreList[i].serviceId === '현재 서비스 아이디'){
//            $(target + ' .contentNum' + i).addClass(on);
//          }

      // ON AIR
      if (sameGenreList[i].programList[0].is_live === Oksusu.ContentProp.is_live) {
        $(target + ' .contentNum' + i + ' .ico_onair').show();
      }

      // 19금 아이콘
      if( sameGenreList[i].programList[0].ratingCd === '19') {
        $(target + ' .contentNum' + i + ' .text_title').addClass('rating_19');
      }

      // 프로그램명
      if( sameGenreList[i].genreCd !== Oksusu.ContentProp.genreCd.eros) {
        // 일반채널
        $(target + ' .contentNum' + i + ' .text_title').append(sameGenreList[i].programList[0].programName);
      }else{
        // 에로스채널
        if( User.isAdult === true ){
          // 성인유저
          $(target + ' .contentNum' + i + ' .text_title').append(sameGenreList[i].programList[0].programName);
        }else{
          $(target + ' .contentNum' + i + ' .text_title').append('성인 전용');
        }
      }
      // 채널명
      $(target + ' .contentNum' + i + ' .txt_log').text(sameGenreList[i].channelName);

      startTime = parseInt(sameGenreList[i].programList[0].startTime);
      endTime = parseInt(sameGenreList[i].programList[0].endTime);
      runningTime = endTime - startTime;
      elapseTime = currentTime - startTime;
      progressRate = Math.floor((elapseTime / runningTime) * 100);
      // 프로그래스바
      $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressRate + '%');
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

// MY >> 마이채널
Oksusu.Card.putCardTypeMyChannel = function(target, cardInfo, watchLevel) {

  $(target).addClass('cardTypeMyChannel');
  $(target).addClass('cardFilled');

  if (cardInfo.length === 0) {
    $(target).append(
      '<p class="tit">마이채널</p>' +
      '  <div class="cnt_box">즐겨찾기한 채널이 없습니다.</div>');
    return;
  }

  var i;
  // 전체 슬라이드 갯수(firefox array length 대응)
  for (i=0; i<cardInfo.length; i++){
    if (cardInfo[i]===undefined){
      break;
    }
  }
  var totSlideNum = i > 25 ? 25 : i;
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var removedItemNum  = 0;
  var slideNumDrwan = 0;

  // card header
  var cardFrameDom
      = '  <p class="tit">마이채널</p>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default" onerror="this.src=\'' + ReplaceImage.img_default_224x126 + '\'">'
        + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none;">FREE</span>'
        + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;">19세이상</i>'
        + '          <span></span>'
        + '        </div>'
        + '        <div class="txt_log">채널명</div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++) {
    // 성인등급제한 설정
    if (watchLevel !== 'N') {
      if (cardInfo[i].adult_yn === 'Y') {
        $(target + ' .contentNum' + i).remove();
        removedItemNum++;
        continue;
      }
    }
    slideNumDrwan++;

    // pc사용가능 여부
    $(target + ' .contentNum' + i).attr('pc_yn', cardInfo[i].pc_yn);

    // 링크
    var onClickEvent = OksusuCard.getLinkClickHandler(cardInfo[i]);
    $(target + ' .contentNum' + i + ' a').attr('on_click', onClickEvent);

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo[i].channelName);

    // 프로그래스바
    var progressPercent = OksusuCard.getLiveProgressRate(cardInfo[i]);
    $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressPercent + '%');

    // 유/무료 여부
    if (cardInfo[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if (cardInfo[i].chatYn === 'Y') {
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 이미지
    var image = OksusuCard.getChannelThumbnail(cardInfo[i], '224_126') || ReplaceImage.img_default_224x126;
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
    // 19금 아이콘
    if (OksusuCard.isLiveAdult(cardInfo[i])) {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').css('display', 'inline-block');
    }

    // 프로그램명
    var programName = OksusuCard.getProgramName(cardInfo[i]);
    $(target + ' .contentNum' + i + ' a').attr('title', programName);
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(programName);
  }

  // 성인정책때문에 표시할 슬라이드가 없을 때
  if (slideNumDrwan === 0) {
    $(target).empty();
    $(target).append(
      '<p class="tit">마이채널</p>' +
      '  <div class="cnt_box">즐겨찾기한 채널이 없습니다.</div>');
    return;
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기
  $(target + ' .vlist_allview a').attr('href', '/my/channel');

  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

// MY >> 영화 즐겨찾기
Oksusu.Card.putCardTypeMyMovie = function(target, cardInfo, watchLevel) {

  $(target).addClass('cardTypeMyMovie');
  $(target).addClass('cardFilled');

  if(!Boolean(cardInfo)){
    $(target).append(
        '<p class="tit">영화 / 방송VOD 즐겨찾기</p>' +
        '  <div class="cnt_box">즐겨찾기한 항목이 없습니다.</div>');
    return;
  }

  var i;
  // 전체 슬라이드 갯수(firefox array length 대응)
  for (i=0; i<cardInfo.length; i++){
    if (cardInfo[i]===undefined){
      break;
    }
  }
  var totSlideNum = i > 25 ? 25 : i;
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var removedItemNum  = 0;
  var slideNumDrwan = 0;
  var title;

  // card header
  var cardFrameDom
      = '  <p class="tit">영화 / 방송VOD 즐겨찾기</p>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="poster_vlist movie"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {
    // 성인등급제한 설정
    if (watchLevel !== 'N') {
      if (cardInfo[i].adult === 'Y') {
        $(target + ' .contentNum' + i).remove();
        removedItemNum++;
        continue;
      }
    }
    slideNumDrwan++;

    var highDefImg = OksusuCard.getVodBookmarkPoster(cardInfo[i]);
    var normanDefImg = OksusuCard.getVodPoster(cardInfo[i]);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr(
      'src', highDefImg);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + normanDefImg + '\'');

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('contentId', cardInfo[i].con_id);
    var onClickEvent = OksusuCard.getLinkClickHandler(cardInfo[i]);
    $(target + ' .contentNum' + i + ' a').attr('on_click', onClickEvent);

    // 19금 아이콘
    if(cardInfo[i].rating==='19'){
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
    }

    // 타이틀
    if (cardInfo[i].series_num !== '0' && cardInfo[i].section === 'WG003') {
      title = '[' + cardInfo[i].series_num + '회] ' + cardInfo[i].title;
    } else {
      title = cardInfo[i].title;
    }
    $(target + ' .contentNum' + i + ' a').attr('title', title);
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').css('display', 'block').text(title);
//    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(title);
  }
  // 성인정책때문에 표시할 슬라이드가 없을 때
  if (slideNumDrwan === 0) {
    $(target).empty();
    $(target).append(
      '<p class="tit">영화 / 방송VOD 즐겨찾기</p>' +
      '  <div class="cnt_box">즐겨찾기한 항목이 없습니다.</div>');
    return;
  }

  // 슬라이드 클릭
  $(target + ' .poster_vlist a').click(function(e){
    e.preventDefault();
    Oksusu.Card.vodCliick($(this).attr('contentId'), $(this).attr('on_click'));
  });

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기
  $(target + ' .vlist_allview a').attr('href', '/my/movie');

  setArrowsAndViewAll(target, totSlideNum - removedItemNum, slideNumOnPage);
};

// MY >> 영화 즐겨찾기 전체보기
Oksusu.Card.putCardTypeMyMovieEdit = function(target, cardInfo, curPage) {

  $(target).addClass('cardTypeMyMovieEdit');
  $(target).addClass('cardFilled');

  if (cardInfo.length === 0) {
    $(target).append(
      '<div class="general_poster_list edit">'
      +'  <div class="nolistbox">'
      +'    <strong class="ico03">즐겨찾기 내역이 없습니다.</strong>'
      +'    <p>VOD를 즐겨찾기 하시면 즐겨찾기한 내역을 볼 수 있습니다.</p>'
      +'    </div>'
      +'</div>');
    $('#noEdit').hide();
    $('#yesEdit').hide();
    return;
  }

  if (curPage >= 1) {
    $(target).css('margin-top', 0);
  }
  var i;
  // 그리드 정보의 갯수가 10보다 작으면 그만큼만 출력한다.
  for (i=0; i<cardInfo.length; i++){
    if (cardInfo[i]===undefined){
      break;
    }
  }
  var totSlideNum = i < 10  ? i : 10;    // 전체 슬라이드 갯수
  var title;

  // card header
  var cardFrameDom
    = '  <ul class="poster_vlist sort"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
      = '<li content_id="' + cardInfo[i].con_id + '" class="contentNum' + i + ' editLi">'
      + '  <a href="javascript:" title="">'
      + '    <div class="poster_info">'
      + '      <div class="checkbox_wrap" style="display:none">'
      + '        <input type="checkbox" class="cm_chkbox" id="chk' + cardInfo[i].con_id +'">'
      + '        <label for="chk' + cardInfo[i].con_id + '"><i class="ico_checkbox wh"></i></label>'
      + '      </div>'
      + '      <div class="vlist_img">'
      + '        <img alt="">'
      + '        <div class="summary_info">'
      + '          <span class="ico_grade">평점을 남겨주세요.</span>'
      + '          <div class="text_title"></div>'
      + '          <div class="text_summary"></div>'
      + '        </div>'
      + '      </div>'
      + '      <div class="vlist_text_box">'
      + '        <div class="text_title"></div>'
      + '      </div>'
      + '    </div>'
      + '  </a>'
      + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).append(cardFrameDom);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < totSlideNum  ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {

    var highDefImg = OksusuCard.getVodBookmarkPoster(cardInfo[i]);
    var normanDefImg = OksusuCard.getVodPoster(cardInfo[i]);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr(
      'src', highDefImg);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + normanDefImg + '\'');

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('contentId', cardInfo[i].con_id);
    var onClickEvent = OksusuCard.getLinkClickHandler(cardInfo[i]);
    $(target + ' .contentNum' + i + ' a').attr('on_click', onClickEvent);

    // 19금 아이콘
    if(cardInfo[i].rating==='19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
    }

    // 타이틀
    if (cardInfo[i].series_num !== '0' && cardInfo[i].section === 'WG003') {
      title = '[' + cardInfo[i].series_num + '회] ' + cardInfo[i].title;
    } else {
      title = cardInfo[i].title;
    }
    $(target + ' .contentNum' + i + ' a').attr('title', title);
    $(target + ' .contentNum' + i + ' .summary_info .text_title').text(title);
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(title);
  }

  // 슬라이드 클릭
  $(target + ' .poster_vlist a').click(function(e){
    if($(this).parents('.general_poster_list').hasClass('edit')){
      return;
    }
    e.preventDefault();
    Oksusu.Card.vodCliick($(this).attr('contentId'), $(this).attr('on_click'));
  });
};

//[1] LIVE 1X1 그리드형
Oksusu.Card.putCardType1 = function(target, cardInfo) {
  return false;
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;
  var startTime;     // 시작시간
  var endTime;       // 종료시간
  var currentTime = moment().format('x'); // 현재시간
  var runningTime;   // 러닝타임
  var elapseTime;    // 플레이된 시간
  var progressRate;  // 플레이된 시간(백분율)

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">' + OksusuCard.getHeadline(cardInfo, '실시간') + '</span>'
      + '    <span class="section_title normal">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '        <div class="info-play-linear"><span style="width:80%">재생진행률</span></div>'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none;">FREE</span>'
        + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line2">'
        + '          <i class="rating_19" style="display:none;">19세이상</i>'
        + '          <span></span>'
        + '        </div>'
        + '        <div class="txt_log">채널명</div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));
    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].channelName);

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    startTime = parseInt(cardInfo.grids[i].programs[0].startTime);
    endTime = parseInt(cardInfo.grids[i].programs[0].endTime);
    runningTime = endTime - startTime;
    elapseTime = currentTime - startTime;
    progressRate = Math.floor((elapseTime / runningTime) * 100);

    // 프로그래스바
    $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressRate + '%');

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 에로스
    if ( cardInfo.grids[i].genreCd === Oksusu.ContentProp.genreCd.eros ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].thumbHighImageName !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',cardInfo.grids[i].thumbHighImageName);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
        }

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].programs[0].programName);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 포스터
      if (cardInfo.grids[i].thumbHighImageName !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',cardInfo.grids[i].thumbHighImageName);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
      }
      // 프로그램명
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].programs[0].programName);
    }

  }
};

// [1-1] LIVE NX1 플리킹형
Oksusu.Card.putCardType1_1 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">' + OksusuCard.getHeadline(cardInfo, '실시간') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none;">FREE</span>'
        + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '        <div class="txt_log">채널명</div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType1_1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var progressPercent = OksusuCard.getLiveProgressRate(cardInfo.grids[i]);
    var image = OksusuCard.getChannelThumbnail(cardInfo.grids[i], '224_126') || ReplaceImage.img_default_224x126;
    var programName = OksusuCard.getProgramName(cardInfo.grids[i]);


    // 이미지
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');
    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].channelName);
    // 프로그래스바
    $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressPercent + '%');
    // 프로그램명
    $(target + ' .contentNum' + i + ' a').attr('title', programName);
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(programName);

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 에로스
    if (OksusuCard.isLiveAdult(cardInfo.grids[i])) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
      // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', programName);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);
      }
      // 일반
    } else {
      // 19금
      if (cardInfo.grids[i].level === '19') {
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


//[2] LIVE 1XN 그리드형
Oksusu.Card.putCardType2 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;
  var startTime;     // 시작시간
  var endTime;       // 종료시간
  var currentTime = moment().format('x'); // 현재시간
  var runningTime;   // 러닝타임
  var elapseTime;    // 플레이된 시간
  var progressRate;  // 플레이된 시간(백분율)

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '실시간') + '</span>'
      + '    <span class="section_title normal">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="힘쎈여자 도봉순(7회)">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '        <div class="info-play-linear"><span style="width:80%">재생진행률</span></div>'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none;">FREE</span>'
        + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line2">'
        + '          <i class="rating_19" style="display:none;">19세이상</i>'
        + '          <span></span>'
        + '        </div>'
        + '        <div class="txt_log">채널명</div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType2');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].channelName);

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    startTime = parseInt(cardInfo.grids[i].programs[0].startTime);
    endTime = parseInt(cardInfo.grids[i].programs[0].endTime);
    runningTime = endTime - startTime;
    elapseTime = currentTime - startTime;
    progressRate = Math.floor((elapseTime / runningTime) * 100);

    // 프로그래스바
    $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressRate + '%');

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 에로스
    if ( cardInfo.grids[i].genreCd === Oksusu.ContentProp.genreCd.eros ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].thumbHighImageName !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',cardInfo.grids[i].thumbHighImageName);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
        }

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].programs[0].programName);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 포스터
      if (cardInfo.grids[i].thumbHighImageName !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',cardInfo.grids[i].thumbHighImageName);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
      }

      // 프로그램명
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].programs[0].programName);
    }

  }
};


//[3] LIVE 2XN 그리드형
Oksusu.Card.putCardType3 = function(target, cardInfo) {
  var i;
  var totSlideNum = 15 < cardInfo.grids.length ? 15 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var startTime;     // 시작시간
  var endTime;       // 종료시간
  var currentTime = moment().format('x'); // 현재시간
  var runningTime;   // 러닝타임
  var elapseTime;    // 플레이된 시간
  var progressRate;  // 플레이된 시간(백분율)

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">LIVE</span>'
      + '    <span class="section_title">' + cardInfo.card_title +'</span>'
      + '  </div>'
      + '  <ul class="section_vlist sort line3"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
    = '<li class="slide contentNum' + i + '">'
    + '  <a href="javascript:" title="">'
    + '    <div class="section_info">'
    + '      <div class="vlist_img">'
    + '        <img alt="" class="img_default">'
    + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
    + '        <div class="ico_right_box">'
    + '          <span class="ico_free" style="display:none;">FREE</span>'
    + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
    + '        </div>'
    + '      </div>'
    + '      <div class="vlist_text_box">'
    + '        <div class="text_title"></div>'
    + '        <div class="txt_log"></div>'
    + '      </div>'
    + '    </div>'
    + '  </a>'
    + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType3');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i=0; i<totSlideNum; i++){
    $(target + ' .section_vlist').append(slideDom[i]);

    var image = OksusuCard.getChannelThumbnail(cardInfo.grids[i], '224_126') || ReplaceImage.img_default_224x126;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].channelName);

    startTime = parseInt(cardInfo.grids[i].programs[0].startTime);
    endTime = parseInt(cardInfo.grids[i].programs[0].endTime);
    runningTime = endTime - startTime;
    elapseTime = currentTime - startTime;
    progressRate = Math.floor((elapseTime / runningTime) * 100);

    // 프로그래스바
    $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressRate + '%');

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
    }

    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

    // 에로스
    if (cardInfo.grids[i].genreCd === Oksusu.ContentProp.genreCd.eros) {

      // 성인유저
      if (User.isAdult === true) {
        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].programs[0].programName);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {

      // 프로그램명
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].programs[0].programName);
    }
  }

};


//[3-1] LIVE NX1 플리킹형
Oksusu.Card.putCardType3_1 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var startTime;     // 시작시간
  var endTime;       // 종료시간
  var currentTime = moment().format('x'); // 현재시간
  var runningTime;   // 러닝타임
  var elapseTime;    // 플레이된 시간
  var progressRate;  // 플레이된 시간

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '실시간') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default" onerror="this.src=\'' + ReplaceImage.img_default_224x126 + '\'">'
        + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none;">FREE</span>'
        + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;"></i>'
        + '          <span></span>'
        + '        </div>'
        + '        <div class="txt_log"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType3_1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].channelName);

    startTime = parseInt(cardInfo.grids[i].programs[0].startTime);
    endTime = parseInt(cardInfo.grids[i].programs[0].endTime);
    runningTime = endTime - startTime;
    elapseTime = currentTime - startTime;
    progressRate = Math.floor((elapseTime / runningTime) * 100);

    // 프로그래스바
    $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressRate + '%');

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 이미지
    var image = OksusuCard.getChannelThumbnail(cardInfo.grids[i], '224_126') || ReplaceImage.img_default_224x126;
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
    // 19금
    if (OksusuCard.isLiveAdult(cardInfo.grids[i])){
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].genreCd === Oksusu.ContentProp.genreCd.eros) {

      // 정파방송
      if (cardInfo.grids[i].programs[0].ratingCd === '15') {
        if (User.isLogin === false || User.isAdult === false || User.serviceProvider !== "") {
          $(target + ' .contentNum' + i + ' a').attr('title', '성인전용');
          $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append('성인전용');
        } else {
          $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
          $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(cardInfo.grids[i].programs[0].programName);
        }
      } else {
        if (User.watchLevel !== 'N' || User.isLogin === false || User.isAdult === false || User.serviceProvider !== "") {
          $(target + ' .contentNum' + i + ' a').attr('title', '성인전용');
          $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append('성인전용');
        } else {
          $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
          $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(cardInfo.grids[i].programs[0].programName);
        }
      }
      // 일반
    } else {
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].programs[0].programName);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


//[4] LIVE 1XN 리스트형
Oksusu.Card.putCardType4 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var startTime;     // 시작시간
  var endTime;       // 종료시간
  var currentTime = moment().format('x'); // 현재시간
  var runningTime;   // 러닝타임
  var elapseTime;    // 플레이된 시간
  var progressRate;  // 플레이된 시간(백분율)

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '실시간') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none;">FREE</span>'
        + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '        <div class="txt_log">채널명</div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }


  $(target).addClass('general_section_list');
  $(target).addClass('cardType4');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var image = OksusuCard.getChannelThumbnail(cardInfo.grids[i], '224_126');

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].channelName);

    startTime = parseInt(cardInfo.grids[i].programs[0].startTime);
    endTime = parseInt(cardInfo.grids[i].programs[0].endTime);
    runningTime = endTime - startTime;
    elapseTime = currentTime - startTime;
    progressRate = Math.floor((elapseTime / runningTime) * 100);

    // 프로그래스바
    $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressRate + '%');

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }


    // 에로스
    if (cardInfo.grids[i].genreCd === Oksusu.ContentProp.genreCd.eros) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].programs[0].programName);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {

      // 19금
      if (cardInfo.grids[i].level === '19') {
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }
      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 프로그램명
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].programs[0].programName);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

// [5] 영화 1X1 그리드형
Oksusu.Card.putCardType5 = function(target, cardInfo) {
  return false;
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;

  var title = cardInfo.card_title;
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">' + OksusuCard.getHeadline(cardInfo, '영화') + '</span>'
      + '    <span class="section_title normal">' + title +'</span>'
      + '  </div>'
      + '  <ul class="section_vlist movie"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
    = '<li class="contentNum' + i + '">'
    + '<a href="javascript:" title="영화명">'
    + '  <div class="section_info">'
    + '    <div class="vlist_img">'
    + '      <img src="../assets/img/img_cmovie_bg.png" alt="경기 이미지" class="img_default">'
    + '      <div class="summary_info">'
    + '        <span class="ico_grade">평점을 남겨주세요.</span>'
    + '        <div class="text_title"></div>'
    + '          <div class="text_summary"></div>'
    + '        </div>'
    + '      </div>'
    + '      <div class="vlist_text_box">'
    + '        <div class="text_title">'
    + '          <i class="rating_19" style="display:none;">19세이상</i><span></span>'
    + '        </div>'
    + '      </div>'
    + '    </div>'
    + '  </a>'
    + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType5');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);

    // var posterImage = cardInfo.grids[0].poster_type.replace(':type','387x217');
    var posterImage = cardInfo.grids[i].poster_high;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (posterImage) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', posterImage);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        if (posterImage) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', posterImage);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
        }
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      posterImage;
      if (posterImage) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', posterImage);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

};


// [5-1] 영화 NX1 플리킹형
Oksusu.Card.putCardType5_1 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 15 ? 15 : cardInfo.grids.length;
  var slideNumOnPage = 3; // 한 페이지에 보여지는 슬라이드 갯수

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">' + OksusuCard.getHeadline(cardInfo,'영화') + '</span>'
      + '    <span class="section_title normal">' + OksusuCard.getCardTitle(cardInfo,'영화') + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist movie"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      slideDom[i] = '<li class="contentNum' + i + '">';
      slideDom[i] += '<a href="javascript:" title="영화명">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <img alt="" class="img_default">';
      slideDom[i] += '      <div class="summary_info">';
      slideDom[i] += '        <span class="ico_grade">평점을 남겨주세요.</span>';
      slideDom[i] += '        <div class="text_title"></div>';
      slideDom[i] += '          <div class="text_summary"></div>';
      slideDom[i] += '        </div>';
      slideDom[i] += '      </div>';
      slideDom[i] += '      <div class="vlist_text_box">';
      slideDom[i] += '        <div class="text_title">';
      slideDom[i] += '          <i class="rating_19" style="display:none;">19세이상</i><span></span>';
      slideDom[i] += '        </div>';
      slideDom[i] += '      </div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </a>';
      slideDom[i] += '</li>';
    } else {
      slideDom[i] = '<li class="contentNum' + i + ' type">';
      slideDom[i] += '<a href="javascript:" title="영화명">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <div class="vlist_bg type_v"></div>';
      slideDom[i] += '      <img alt="경기 이미지" class="img_default type_v">';
      slideDom[i] += '      <div class="vlist_tit type_v">(회차)프로그램명</div>';
      slideDom[i] += '      <div class="summary_info">';
      slideDom[i] += '        <span class="ico_grade">평점을 남겨주세요.</span>';
      slideDom[i] += '        <div class="text_title"></div>';
      slideDom[i] += '          <div class="text_summary"></div>';
      slideDom[i] += '        </div>';
      slideDom[i] += '      </div>';
      slideDom[i] += '      <div class="vlist_text_box">';
      slideDom[i] += '        <div class="text_title">';
      slideDom[i] += '          <i class="rating_19" style="display:none;">19세이상</i><span></span>';
      slideDom[i] += '        </div>';
      slideDom[i] += '      </div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </a>';
      slideDom[i] += '</li>';
    }
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType5_1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {

    var image = '';
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      image = OksusuCard.getVodThumbImage(cardInfo.grids[i], '387_217');
    } else {
      image = OksusuCard.getVodPosterImage(cardInfo.grids[i], '138_197');
    }

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 19금 아이콘
    if (cardInfo.grids[i].yn_adult === 'Y') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        } else {
          $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
          $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
        }
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').append(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').append(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{
      // 포스터
      if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      } else {
        $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
      }
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.three, 3);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [6] 영화 1XN 그리드형
Oksusu.Card.putCardType6 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">영화</span>'
      + '    <span class="section_title normal">' + cardInfo.card_title +'</span>'
      + '  </div>'
      + '  <ul class="section_vlist sort movie"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      slideDom[i] = '<li class="contentNum' + i + '">';
      slideDom[i] += ' <a href="javascript:" title="">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <img alt="" class="img_default">';
      slideDom[i] += '      <div class="summary_info">';
      slideDom[i] += '        <span class="ico_grade">평점을 남겨주세요.</span>';
      slideDom[i] += '        <div class="text_title"></div>';
      slideDom[i] += '        <div class="text_summary"></div>';
      slideDom[i] += '      </div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '    <div class="vlist_text_box">';
      slideDom[i] += '      <div class="text_title">';
      slideDom[i] += '        <i class="rating_19" style="display:none;">19세이상</i><span></span>';
      slideDom[i] += '      </div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </div>';
      slideDom[i] += ' </a>';
      slideDom[i] += '</li>';
    } else {
      slideDom[i] = '<li class="contentNum' + i + ' type">';
      slideDom[i] += ' <a href="javascript:" title="">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <div class="vlist_bg type_v"></div>';
      slideDom[i] += '      <img alt="" class="img_default type_v">';
      slideDom[i] += '      <div class="vlist_tit type_v">(회차)프로그램명</div>';
      slideDom[i] += '      <div class="summary_info">';
      slideDom[i] += '        <span class="ico_grade">평점을 남겨주세요.</span>';
      slideDom[i] += '        <div class="text_title"></div>';
      slideDom[i] += '        <div class="text_summary"></div>';
      slideDom[i] += '      </div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '    <div class="vlist_text_box">';
      slideDom[i] += '      <div class="text_title">';
      slideDom[i] += '        <i class="rating_19" style="display:none;">19세이상</i><span></span>';
      slideDom[i] += '      </div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </div>';
      slideDom[i] += ' </a>';
      slideDom[i] += '</li>';
    }
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType6');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);

    var image = '';
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      image = OksusuCard.getVodThumbImage(cardInfo.grids[i], '387_217');
    } else {
      image = OksusuCard.getVodPosterImage(cardInfo.grids[i], '138_197');
    }

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 19금 아이콘
    if (OksusuCard.isVodAdult(cardInfo.grids[i])) {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        } else {
          $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
          $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
        }
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').append(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').append(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 포스터
      if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      } else {
        $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
      }
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').append(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

};


// [7] 영화 3XN 그리드형
Oksusu.Card.putCardType7 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 10 ? cardInfo.grids.length : 10 ;
  var slideDom = [];
  // var cardFrameDom = makeCardHeader(cardInfo, )
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '영화') + '</span>'
      + '    <span class="poster_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="poster_vlist sort movie"></ul>';

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
    = '<li class="contentNum' + i + '">'
    + '  <a href="javascript:" title="">'
    + '    <div class="poster_info">'
    + '      <div class="vlist_img">'
    + '        <img alt=""/>'
    + '        <div class="summary_info">'
    + '          <span class="ico_grade">평점을 남겨주세요.</span>'
    + '          <div class="text_title"></div>'
    + '          <div class="text_summary"></div>'
    + '        </div>'
    + '      </div>'
    + '      <div class="vlist_text_box">'
    + '        <div class="text_title"></div>'
    + '      </div>'
    + '    </div>'
    + '  </a>'
    + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType7');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);

    var image = OksusuCard.getVodThumbnail(cardInfo.grids[i], '224_320') || ReplaceImage.img_default_224x320;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));
    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/' + cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {
      // 19금
      if (cardInfo.grids[i].level === '19') {
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if (cardInfo.grids[i].rating !== null) {
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }
};


// [7-1] 영화 NX1 플리킹형
Oksusu.Card.putCardType7_1 = function(target, cardInfo){
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var headlineHtml = '';
  if (OksusuCard.getHeadline(cardInfo)) {
    headlineHtml += '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '영화') + '</span>';
  }

  // card header
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + headlineHtml
      + '    <span class="poster_title">'+ OksusuCard.getCardTitle(cardInfo) +'</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="poster_vlist movie"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType7_1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {

    var image = OksusuCard.getVodPosterImage(cardInfo.grids[i], '224_320');

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 링크
        $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      } else {
        $(target + ' .contentNum' + i).addClass('rating');
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 링크
      $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [7-2] 영화 추천 NX1 플리킹형
Oksusu.Card.putCardType7_2 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 5 ? cardInfo.grids.length : 5 ;
  var slideDom = [];
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + '    <span class="poster_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="hash_tag_wrap"><ul></ul></div>'
      + '  <ul class="poster_vlist sort movie"></ul>';

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt=""/>'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType7_2');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  // TODO 실제 해쉬태그 값이 오면 그에 맞게 수정해야함, 현재는 상상코딩
  if( cardInfo.card_hash_no > 0 ) {
    for (i=0; i<1; i++) {
      $(target + ' .hash_tag_wrap ul').append('<li class="on"><a href="javascript:" title=""></a></li>');
      $(target + ' .hash_tag_wrap li:last a').text(cardInfo.card_title_var);
    }
  }

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 링크
      $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr(
              'src', cardInfo.grids[i].poster_high);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      if (cardInfo.grids[i].poster_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr(
            'src', cardInfo.grids[i].poster_high);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }
};


// [8] 영화 1XN 리스트형
Oksusu.Card.putCardType8 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '영화') + '</span>'
      + '    <span class="poster_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="poster_vlist movie"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
    = '<li class="contentNum' + i + '">'
    + '  <a href="javascript:" title="">'
    + '    <div class="poster_info">'
    + '      <div class="vlist_img">'
    + '        <img alt="">'
    + '        <div class="summary_info">'
    + '          <span class="ico_grade">평점을 남겨주세요.</span>'
    + '          <div class="text_title"></div>'
    + '          <div class="text_summary"></div>'
    + '        </div>'
    + '      </div>'
    + '      <div class="vlist_text_box">'
    + '        <div class="text_title"></div>'
    + '      </div>'
    + '    </div>'
    + '  </a>'
    + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType8');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr(
              'src', cardInfo.grids[i].poster_high);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      if (cardInfo.grids[i].poster_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr(
            'src', cardInfo.grids[i].poster_high);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [10] 영화 1XN 리스트형
Oksusu.Card.putCardType10 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '영화') + '</span>'
      + '    <span class="poster_title">'+ cardInfo.card_title +'</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="poster_vlist movie"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '        <div class="text_tail">'
        + '          <span class="text_sum"><strong></strong>원</span>'
        + '          <span class="text_sum_sale"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType10');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 가격
    $(target + ' .contentNum' + i + ' .text_sum strong').text(comma(cardInfo.grids[i].sale_prc));
    // 세일 전 가격
    if (cardInfo.grids[i].pre_sale_prc) {
      $(target + ' .contentNum' + i + ' .text_sum_sale').text(comma(cardInfo.grids[i].pre_sale_prc)+'원');
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr(
              'src', cardInfo.grids[i].poster_high);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      if (cardInfo.grids[i].poster_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr(
            'src', cardInfo.grids[i].poster_high);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [11] 영화 1XN 리스트형
Oksusu.Card.putCardType11 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '영화') + '</span>'
      + '    <span class="poster_title">'+ cardInfo.card_title +'</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="poster_vlist movie"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '        <div class="text_subtitle"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType11');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {

    // 세일즈 코멘트
    if (cardInfo.grids[i].csl_cnts) {
      $(target + ' .contentNum' + i + ' .text_subtitle').text(cardInfo.grids[i].csl_cnts);
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 링크
      $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr(
              'src', cardInfo.grids[i].poster_high);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      if (cardInfo.grids[i].poster_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr(
            'src', cardInfo.grids[i].poster_high);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);


  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

// [12] 방송 VOD 1X1 그리드형
Oksusu.Card.putCardType12 = function(target, cardInfo) {
  return false;
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + cardInfo.card_headline + '</span>'
      + '    <span class="section_title normal">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '        <div class="ico_right_box">'
        + '          <span class="ico_free" style="display:none;">FREE</span>'
        + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line2">'
        + '          <i class="rating_19" style="display:none;">19세이상</i>'
        + '          <span></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType12');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
              cardInfo.grids[i].hr_poster_high);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
        }

        // 프로그램명
        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(title);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 포스터
      if (cardInfo.grids[i].poster_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            cardInfo.grids[i].hr_poster_high);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
      }

      // 프로그램명
      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(title);
    }

  }
};

var makeMovieCardHeader= function(data, outerClassName, titleClassName, viewAllFlas) {
  var html = '<div class="general_poster_list">'
      + '  <div class="poster_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(data, '영화') + '</span>'
      + '    <span class="poster_title">' + data.card_title + '</span>'
      + '  </div>'
      + '  <ul class="poster_vlist sort movie"></ul>'
      + '</div>';
  return html;
};

var makeCardHeader = function(data, outerClassName, titleClassName, viewAllFlas) {
  var specialClass = '';
  if (data.spec_yn && data.spec_yn === 'Y') {
    specialClass += 'text_blue';
  }
  var html = '<div class="'+outerClassName+'">'
      + '  <div class="section_title_box">'
      + '    <span class="ico_name '+specialClass+'">' + data.card_headline + '</span>'
      + '    <span class="'+titleClassName+'">' + data.card_title + '</span>'
      + '  </div>';
  if (viewAllFlas) {
      html += '  <div class="vlist_allview">'
        + ' <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
        + ' </div>'
  }
      html += '  <ul class="section_vlist type"></ul>'
      + '</div>';
  return html;
};

// [12-1] 방송 VOD NX1 플리킹형
Oksusu.Card.putCardType12_1 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist sort line2"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      slideDom[i] = '<li class="slide contentNum' + i + '">';
      slideDom[i] += '  <a href="javascript:" title="">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <img alt="" class="img_default">';
      slideDom[i] += '    </div>';
      slideDom[i] += '    <div class="vlist_text_box">';
      slideDom[i] += '      <div class="text_title line1"><i class="rating_19" style="display:none">19세이상</i></div>';
      slideDom[i] += '    </div>';
      slideDom[i]  += ' </div>';
      slideDom[i] += '  </a>';
      slideDom[i] += '</li>';
    } else {
      slideDom[i] = '<li class="slide contentNum' + i + ' type">';
      slideDom[i] += '  <a href="javascript:" title="">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <div class="vlist_bg type_v"></div>';  // background-image
      slideDom[i] += '      <img alt="회차별썸네일" class="img_default type_v" />';
      slideDom[i] += '      <div class="vlist_tit type_v">(회차)프로그램명</div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '    <div class="vlist_text_box">';
      slideDom[i] += '      <div class="text_title line1"><i class="rating_19" style="display:none">19세이상</i></div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </div>';
      slideDom[i] += '  </a>';
      slideDom[i] += '</li>';
    }
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType12_1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var image = '';
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      image = OksusuCard.getVodThumbImage(cardInfo.grids[i], '224_126');
    } else {
      image = OksusuCard.getVodPosterImage(cardInfo.grids[i], '80_114');
    }
    // var image = OksusuCard.getVodPosterImage(cardInfo.grids[i], '224_216');

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        } else {
          $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
          $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
        }
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 타이틀
        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {

      // 포스터
      if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      } else {
        $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
      }
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 타이틀
      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

    }

  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [13] 방송 VOD 1XN 그리드형
Oksusu.Card.putCardType13 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '    <span class="section_title normal">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      slideDom[i] = '<li class="contentNum' + i + '">';
      slideDom[i] += '<a href="javascript:" title="">';
      slideDom[i] += '<div class="section_info">';
      slideDom[i] += '  <div class="vlist_img">';
      slideDom[i] += '    <img alt="" class="img_default">';
      slideDom[i] += '  </div>';
      slideDom[i] += '  <div class="vlist_text_box">';
      slideDom[i] += '    <div class="text_title">';
      slideDom[i] += '      <i class="rating_19" style="display:none;">19세이상</i>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </div>';
      slideDom[i] += '</div>';
      slideDom[i] += '</a>';
      slideDom[i] += '</li>';
    } else {
      slideDom[i] = '<li class="contentNum' + i + ' type">';
      slideDom[i] += '<a href="javascript:" title="">';
      slideDom[i] += '<div class="section_info">';
      slideDom[i] += '  <div class="vlist_img">';
      slideDom[i] += '    <div class="vlist_bg type_v"></div>';
      slideDom[i] += '    <img alt="" class="img_default type_v">';
      slideDom[i] += '    <div class="vlist_tit type_v">(회차)프로그램명</div>';
      slideDom[i] += '  </div>';
      slideDom[i] += '  <div class="vlist_text_box">';
      slideDom[i] += '    <div class="text_title">';
      slideDom[i] += '      <i class="rating_19" style="display:none;">19세이상</i>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </div>';
      slideDom[i] += '</div>';
      slideDom[i] += '</a>';
      slideDom[i] += '</li>';
    }
  }


  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType13');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {

    var image = '';
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      image = OksusuCard.getVodThumbImage(cardInfo.grids[i], '387_217');
    } else {
      image = OksusuCard.getVodPosterImage(cardInfo.grids[i], '140_199');
    }

    $(target + ' .section_vlist').append(slideDom[i]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        } else {
          $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
          $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
        }
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 프로그램명
        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(title);

      // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{
      // 포스터
      if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      } else {
        $(target + ' .contentNum' + i + ' .img_default').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');
      }
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 프로그램명
      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);
    }

  }
};


// [14] 방송 VOD 3XN 그리드형
Oksusu.Card.putCardType14 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length >= 10 ? 10:cardInfo.grids.length;
  var slideDom = [];

  // card header
  var cardFrameDom
      = '  <div>'
      + '    <div class="poster_title_box">'
      + '     <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '     <span class="poster_title">'+ cardInfo.card_title +'</span>'
      + '    </div>'
      + '  </div>';

  cardFrameDom   += '<ul class="poster_vlist live sort"></ul>';

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt=""/>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType14');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);

    var image = OksusuCard.getVodThumbnail(cardInfo.grids[i], '224_320') || ReplaceImage.img_default_224x320;
    var title = cardInfo.grids[i].title;
    var summary = OksusuCard.getDescription(cardInfo.grids[i]);
    var link = OksusuCard.getLink(cardInfo.grids[i]);

    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));
    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {
      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(title);

        // 미성년 유저
      }else{
        $(target + ' .contentNum' + i).addClass('rating');
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

      }

      // 일반
    }else{
      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(title);
    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }
};


// [14-1] 방송 VOD NX1 플리킹형
Oksusu.Card.putCardType14_1 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div>'
      + '    <div class="poster_title_box">'
      + '     <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '     <span class="poster_title">'+ cardInfo.card_title +'</span>'
      + '    </div>'
      + '  </div>'
      + '    <div class="vlist_allview">'
      + '     <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '    </div>'
      + '  <ul class="poster_vlist live"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('cardType14_1');
  $(target).addClass('cardFilled');
  $(target).addClass('general_poster_list');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  for (i = 0; i < totSlideNum; i++) {

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 세일즈 코멘트
    $(target + ' .contentNum' + i + ' .text_subtitle').text(cardInfo.grids[i].sales_comment);

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          var image = OksusuCard.getVodThumbnail(cardInfo.grids[i], '224_320') || ReplaceImage.img_default_224x320;

          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      var image = OksusuCard.getVodThumbnail(cardInfo.grids[i], '224_320') || ReplaceImage.img_default_224x320;

      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [14-2] 방송 VOD NX1 플리킹형
Oksusu.Card.putCardType14_2 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line1"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType14_2');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){
    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    var image = '';
    if (cardInfo.grids[i].thum_path) {
      image = cardInfo.grids[i].thum_path.replace(':type', '224_126');
    } else{
      image = ReplaceImage.img_default_224x126;
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr( 'src', image);
        // 타이틀
        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(title);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {

      // 19금
      if (cardInfo.grids[i].level === '19') {
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }
      $(target + ' .contentNum' + i + ' .vlist_img img').attr( 'src', image);

      // 타이틀
      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(title);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [14-3] 방송 VOD NX1 플리킹형
Oksusu.Card.putCardType14_3 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 10 ? cardInfo.grids.length : 10 ;
  var slideDom = [];
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + '    <span class="poster_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="hash_tag_wrap"><ul></ul></div>'
      + '  <ul class="poster_vlist sort movie"></ul>';

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt=""/>'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType14_3');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  // TODO 실제 해쉬태그 값이 오면 그에 맞게 수정해야함, 현재는 상상코딩
  if( cardInfo.card_hash_no > 0 ) {
    for (i=0; i<1; i++) {
      $(target + ' .hash_tag_wrap ul').append('<li class="on"><a href="javascript:" title=""></a></li>');
      $(target + ' .hash_tag_wrap li:last a').text(cardInfo.card_title_var);
    }
  }

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].poster_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr(
              'src', cardInfo.grids[i].poster_high);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      if (cardInfo.grids[i].poster_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr(
            'src', cardInfo.grids[i].poster_high);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x320);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }
};

//[15] 방송 VOD 1XN 리스트형
Oksusu.Card.putCardType15 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line1">'
        + '           <i class="rating_19" style="display:none;">19세이상</i></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType15');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var image = OksusuCard.getVodThumbnail(cardInfo.grids[i], '224_126') || ReplaceImage.img_default_224x126;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .text_title .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {


      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 타이틀
      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [17] 방송 VOD 1XN 리스트형
Oksusu.Card.putCardType17 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line1"><i class="rating_19" style="display:none;">19세이상</i></div>'
        + '        <div class="text_tail">'
        + '          <span class="text_sum"><strong></strong>원</span>'
        + '          <span class="text_sum_sale"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType17');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var image = OksusuCard.getVodThumbnail(cardInfo.grids[i]) || ReplaceImage.img_default_224x126;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 가격
    $(target + ' .contentNum' + i + ' .text_sum strong').text(comma(cardInfo.grids[i].sale_prc));
    // 세일 전 가격
    var preSalePrice = comma(cardInfo.grids[i].pre_sale_prc);
    if (preSalePrice) {
      $(target + ' .contentNum' + i + ' .text_sum_sale').text(preSalePrice + '원');
    }

    // 19금 아이콘
    if (cardInfo.grids[i].level === "19") {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('error', ReplaceImage.img_default_224x126);

        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {
      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

    }

  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [18] 방송 VOD 1XN 리스트형
Oksusu.Card.putCardType18 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var openDate;

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:;" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line1"><i class="rating_19" style="display:none;">19세이상</i></div>'
        + '        <div class="meta_text_box">'
        + '          <div class="text_date">방영일<em>:</em></div>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType18');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var image = OksusuCard.getVodThumbnail(cardInfo.grids[i]) || ReplaceImage.img_default_224x126;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 방영일
    openDate = OksusuCard.getOpenDate(cardInfo.grids[i], cardInfo);
    if (openDate===''){
      $(target + ' .contentNum' + i + ' .text_date').hide();
    }else{
      $(target + ' .contentNum' + i + ' .text_date').append(openDate);
    }

    // 19금 아이콘
    if (cardInfo.grids[i].level === "19") {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 타이틀
        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

        // 미성년 유저
      } else {
        $(target + ' .contentNum' + i).addClass('rating');
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {

      // 19금
      if (cardInfo.grids[i].level === '19') {
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 타이틀
      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

    }

  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [19] 방송 VOD 1XN 리스트형
Oksusu.Card.putCardType19 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 5 ? cardInfo.grids.length : 5 ;
  var slideDom = [];
  var cardFrameDom
      = '  <div class="poster_title_box">'
      + '    <span class="poster_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="hash_tag_wrap"><ul></ul></div>'
      + '  <ul class="poster_vlist sort movie"></ul>';

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="poster_info">'
        + '      <div class="vlist_img">'
        + '        <img alt=""/>'
        + '        <div class="summary_info">'
        + '          <span class="ico_grade">평점을 남겨주세요.</span>'
        + '          <div class="text_title"></div>'
        + '          <div class="text_summary"></div>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title"></div>'
        + '        <div class="text_subtitle line2"></div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).addClass('cardType19');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);

    var image = OksusuCard.getVodThumbnail(cardInfo.grids[i], '224_320') || ReplaceImage.img_default_224x320;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 세일즈 코멘트
    if ( cardInfo.grids[i].csl_cnts ) {
      $(target + ' .contentNum' + i + ' .text_subtitle').text(cardInfo.grids[i].csl_cnts);
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 19금 아이콘
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .summary_info .text_title').text(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);

        // 줄거리
        $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 19금
      if ( cardInfo.grids[i].level === '19' ){
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
      }

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x320 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .summary_info .text_title').text(cardInfo.grids[i].title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].title);

      // 줄거리
      $(target + ' .contentNum' + i + ' .summary_info .text_summary').text(cardInfo.grids[i].c_desc);

    }

    // 평점
    if ( cardInfo.grids[i].rating !== null ){
      $(target + ' .contentNum' + i + ' .summary_info .ico_grade').text(cardInfo.grids[i].rating);
    }
  }
};


// [20] 클립 1X1 그리드형
Oksusu.Card.putCardType20 = function(target, cardInfo) {
  return false;
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">' + OksusuCard.getHeadline(cardInfo, '클립') + '</span>'
      + '    <span class="section_title normal">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="힘쎈여자 도봉순(7회)">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '        <div class="ico_right_box">'
        + '          <span class="vlist_time">MM:SS</span>'
        + '        </div>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line2">'
        + '          <i class="rating_19" style="display:none;">19세이상</i>'
        + '          <span></span>'
        + '        </div>'
        + '       <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType20');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);

    // 재생시간
    $(target + ' .contentNum' + i + ' .vlist_time').text(OksusuCard.getDurationTime(cardInfo.grids[i]));

    // 조회수
    $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : "" );

    // 클립 배포일자
    if (cardInfo.grids[i].dt_disp_approve !== null) {
      var dt_disp_approve = cardInfo.grids[i].dt_disp_approve.substring(0, 2) + '.'
          + cardInfo.grids[i].dt_disp_approve.substring(2, 4) + '.' + cardInfo.grids[i].dt_disp_approve.substring(4, 6);

      $(target + ' .contentNum' + i + ' .vlist_text_box .text_date').text(dt_disp_approve);
    }

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }


    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        if (cardInfo.grids[i].thum_info_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
              cardInfo.grids[i].thum_info_high[0][1]);
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
        }

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].clip_title);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 포스터
      if (cardInfo.grids[i].thum_info_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            cardInfo.grids[i].thum_info_high[0][1]);
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_387x217);
      }

      // 프로그램명
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(cardInfo.grids[i].clip_title);
    }

  }
};

// [20-1] 클립 NX1 플리킹형
Oksusu.Card.putCardType20_1 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var ddBroad;

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name text_blue">' + OksusuCard.getHeadline(cardInfo, '클립') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <i class="bg_line">이미지 그라데이션</i>'
        + '        <span class="vlist_time"></span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;"></i>'
        + '          <span></span>'
        + '        </div>'
        + '          <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType20_1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 재생시간
    $(target + ' .contentNum' + i + ' .vlist_time').text(OksusuCard.getDurationTime(cardInfo.grids[i]));

    // 조회수
       $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : '0' );

    // 방영일
    if( cardInfo.grids[i].dd_broad !== null ) {
      ddBroad = cardInfo.grids[i].dd_broad.substring(0, 4) + '.'
          + cardInfo.grids[i].dd_broad.substring(4, 6) + '.' + cardInfo.grids[i].dd_broad.substring(6, 8);
      $(target + ' .contentNum' + i + ' .text_date').text(ddBroad);
    }

    // 19금
    if (cardInfo.grids[i].age_cd === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터

        if (cardInfo.grids[i].thum_info_high !== null) {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr(
              'src', cardInfo.grids[i].thum_info_high[0][1] );
        } else {
          $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x126);
        }

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
      }

      // 일반
    } else {

      // 포스터
      if (cardInfo.grids[i].thum_info_high !== null) {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr(
            'src', cardInfo.grids[i].thum_info_high[0][1] );
      } else {
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x126);
      }

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
    }

  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [21] 클립 1XN 그리드형
Oksusu.Card.putCardType21 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length < 3 ? cardInfo.grids.length : 3 ;
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '클립') + '</span>'
      + '    <span class="section_title normal">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="section_vlist sort line3"></ul>';

  var slideDom = [];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="" class="img_default">'
        + '        <img src="../assets/img/img_clist_bg.png" alt="">'
        + '        <i class="bg_line">이미지 그라데이션</i>'
        + '        <span class="vlist_time">MM:SS</span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title line2">'
        + '          <i class="rating_19" style="display:none;">19세이상</i>'
        + '          <span></span>'
        + '        </div>'
        + '       <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid03');
  $(target).addClass('cardType21');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);

    var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '387_217');

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);

    // 조회수
    $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : '0' );

    // 방송일자
    if (cardInfo.grids[i].dd_broad !== null) {
      var ddBroad = cardInfo.grids[i].dd_broad.substring(0, 4) + '.'
          + cardInfo.grids[i].dd_broad.substring(4, 6) + '.' + cardInfo.grids[i].dd_broad.substring(6, 8);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_date').text(ddBroad);
    }

    // 19금
    if (cardInfo.grids[i].age_cd === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    $(target + ' .contentNum' + i + ' .vlist_time').text(OksusuCard.getDurationTime(cardInfo.grids[i]));

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 에로스
    if ( cardInfo.grids[i].yn_adult === 'Y' ) {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);

        // 미성년 유저
      }else{
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(Oksusu.StringProp.adultOnly);
      }

      // 일반
    }else{

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

      // 프로그램명
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
    }

  }
};

// [22] 클립 2XN 그리드형
Oksusu.Card.putCardType22 = function(target, cardInfo) {
  var i;
  var totSlideNum = 10 < cardInfo.grids.length ? 10 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var date;
  var clipDuration; // 재생시간
  var ddBroad;

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '클립') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <ul class="section_vlist sort line4"></ul>';


  var slideDom=[];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <i class="bg_line">이미지 그라데이션</i>'
        + '        <span class="vlist_time"></span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;"></i>'
        + '          <span></span>'
        + '        </div>'
        + '          <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType22');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);


  for (i=0; i<totSlideNum; i++){
    $(target + ' .section_vlist').append(slideDom[i]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    $(target + ' .contentNum' + i + ' .vlist_time').text(OksusuCard.getDurationTime(cardInfo.grids[i]));

    // 조회수
       $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : '0' );

    // 방영일
    if( cardInfo.grids[i].dd_broad !== null ) {
      ddBroad = cardInfo.grids[i].dd_broad.substring(0, 4) + '.'
          + cardInfo.grids[i].dd_broad.substring(4, 6) + '.' + cardInfo.grids[i].dd_broad.substring(6, 8);
      $(target + ' .contentNum' + i + ' .text_date').text(ddBroad);
    }

    // 19금 아이콘
    if (cardInfo.grids[i].age_cd === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '224_126') || ReplaceImage.img_default_224x126;
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
      }

      // 일반
    } else {
      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
    }

  }

};


// [22-1] 클립 NX1 플리킹형
Oksusu.Card.putCardType22_1 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var date;
  var clipDuration; // 재생시간

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '클립') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <i class="bg_line">이미지 그라데이션</i>'
        + '        <span class="vlist_time"></span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;"></i>'
        + '          <span></span>'
        + '        </div>'
        + '          <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType22_1');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    $(target + ' .contentNum' + i + ' .vlist_time').text(OksusuCard.getDurationTime(cardInfo.grids[i]));

    // 조회수
       $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : '0' );

    // 방영일
    if( cardInfo.grids[i].dd_broad !== null ) {
      var ddBroad = cardInfo.grids[i].dd_broad.substring(0, 4) + '.'
          + cardInfo.grids[i].dd_broad.substring(4, 6) + '.' + cardInfo.grids[i].dd_broad.substring(6, 8);
      $(target + ' .contentNum' + i + ' .text_date').text(ddBroad);
    }

    // 19금 아이콘
    if (cardInfo.grids[i].age_cd === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '224_126') || ReplaceImage.img_default_224x126;

        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
      }

      // 일반
    } else {
      var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '224_126') || ReplaceImage.img_default_224x126;

      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
    }

  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [23] 클립 3개 고정 타일형
Oksusu.Card.putCardType23 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 20 ? 20 : cardInfo.grids.length;;    // 전체 슬라이드 갯수
  var slideNumOnPage = 4; // 한 페이지에 보여지는 슬라이드 갯수
  var date;
  var clipDuration; // 재생시간
  var ddBroad;
  var adminImg = (cardInfo.admin_thum_high) ? cardInfo.adminImg : '';

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '클립') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="section_logo_list">'
      + '    <img id="type23RepresentImage" src="'+adminImg+'" alt="" style="width:100%; height:100%"'
      + '      onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];
  for(i=0; i<totSlideNum; i++) {
      slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <i class="bg_line">이미지 그라데이션</i>'
        + '        <span class="vlist_time"></span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;"></i>'
        + '          <span></span>'
        + '        </div>'
        + '          <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('grid01');
  $(target).addClass('cardType23');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  // 카드 좌측 이미지
  if (cardInfo.admin_thum_high !== null){
    $(target + ' .section_logo_list img').attr('src',
        cardInfo.admin_thum_high);
  }

  for (i=0; i<totSlideNum; i++){


    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 재생시간
    date = new Date(null);
    date.setSeconds(cardInfo.grids[i].p_time);

    if( cardInfo.grids[i].p_time >= 3600 ){
      clipDuration = date.toISOString().substr(11, 8);
    } else {
      clipDuration = date.toISOString().substr(14, 5);
    }

    $(target + ' .contentNum' + i + ' .vlist_time').text(clipDuration);

    // 조회수
       $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(
        Boolean(cardInfo.grids[i].view_count) ? commaNum(cardInfo.grids[i].view_count) : '0' );

    // 방영일
    if( cardInfo.grids[i].dd_broad !== null ) {
      ddBroad = cardInfo.grids[i].dd_broad.substring(0, 4) + '.'
          + cardInfo.grids[i].dd_broad.substring(4, 6) + '.' + cardInfo.grids[i].dd_broad.substring(6, 8);
      $(target + ' .contentNum' + i + ' .text_date').text(ddBroad);
    }

    // 19금 아이콘
    // if (cardInfo.grids[i].level === '19') {
    if (OksusuCard.isClipAdult(cardInfo.grids[i])) {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '387_217') || ReplaceImage.img_default_387x217;

        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
      }

      // 일반
    } else {

      var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '387_217') || ReplaceImage.img_default_387x217;

      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_387x217 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').append(cardInfo.grids[i].clip_title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(cardInfo.grids[i].clip_chnl_nm);
    }

  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 4);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};


// [24] 클립 1XN 리스트형
Oksusu.Card.putCardType24 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 20 ? 20 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 4; // 한 페이지에 보여지는 슬라이드 갯수
  var date;
  var clipDuration; // 재생시간
  var ddBroad;

  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '클립') + '</span>'
      + '    <span class="section_title">' + OksusuCard.getCardTitle(cardInfo) + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist sort line4"></ul>';

  var slideDom=[];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
        = '<li class="slide contentNum' + i + '">'
        + '  <a href="javascript:" title="">'
        + '    <div class="section_info">'
        + '      <div class="vlist_img">'
        + '        <img alt="">'
        + '        <i class="bg_line">이미지 그라데이션</i>'
        + '        <span class="vlist_time"></span>'
        + '      </div>'
        + '      <div class="vlist_text_box">'
        + '        <div class="text_title">'
        + '          <i class="rating_19" style="display:none;"></i>'
        + '        </div>'
        + '          <div class="text_subtitle text_blue"></div>'
        + '        <div class="text_play_count">'
        + '          <span class="ico_count"></span>'
        + '          <span class="text_date"></span>'
        + '        </div>'
        + '      </div>'
        + '    </div>'
        + '  </a>'
        + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType24');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var image = OksusuCard.getClipThumbnail(cardInfo.grids[i], '224_126');
    var durationTime = OksusuCard.getDurationTime(cardInfo.grids[i]);
    var viewCount = OksusuCard.getViewCount(cardInfo.grids[i]);
    var openDate = OksusuCard.getOpenDate(cardInfo.grids[i], cardInfo);
    var title = OksusuCard.getClipTitle(cardInfo.grids[i]);
    var clipChannelName = OksusuCard.getChannelName(cardInfo.grids[1]);

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));
    $(target + ' .contentNum' + i + ' .vlist_time').text(durationTime);
    // 조회수
    $(target + ' .contentNum' + i + ' .vlist_text_box .ico_count').text(viewCount);
    // 방영일
    $(target + ' .contentNum' + i + ' .text_date').html(openDate);

    // 19금 아이콘
    if (cardInfo.grids[i].age_cd === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').show();
    }

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(clipChannelName);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 타이틀
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(clipChannelName);
      }

      // 일반
    } else {

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');

      // 타이틀
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_subtitle').text(clipChannelName);
    }

  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 4);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

// 정의되지 않은 카드타입
Oksusu.Card.putCardType26 = function(target, cardInfo){
  $(target).remove();
};

// [27] 공통 3XN 버튼형
Oksusu.Card.putCardType27 = function(target, cardInfo){
  var i;
  var totSlideNum = cardInfo.grids.length;

  var cardFrameDom
      = '  <ul></ul>';

  var slideDom=[];
  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
    = '<li class="contentNum' + i + '">'
    + '  <a href="javascript:" title=""><span></span></a>'
    + '</li>';
  }

  $(target).addClass('general_menu_list');
  $(target).addClass('cardType27');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  for (i = 0; i < totSlideNum; i++) {
    var text = cardInfo.grids[i].btn_name;
    var callObject = cardInfo.grids[i].call_object.split('|');
    var link = '/' + Oksusu.MenuProp.MenuId[callObject[0]] + '?mid=' + callObject[1] + '&sid=' + callObject[2];
    if (link.indexOf('adaptable')>-1) {
      link = link.replace('adaptable', 'browse');
    }
    $(target + ' ul').append(slideDom[i]);
    $(target + ' .contentNum' + i + ' a').attr('title', text);
    $(target + ' .contentNum' + i + ' a').attr('href', link);
    $(target + ' .contentNum' + i + ' span').text(text);
  }
};

// [28] 공통 1X1 이미지형
Oksusu.Card.putCardType28 = function(target){
  $(target).remove();

  // var slidingBannerDom = '';
  //
  // $(target).addClass('cardType28');
  // $(target).addClass('cardFilled');
  //
  // $(target).append(slidingBannerDom);
  //
  // $(target + ' .list_banner_slider .items').bxSlider({
  //   mode: 'horizontal', // 가로 스크롤
  //   pause: 5000,        // 배너 표시 시간
  //   auto: true,         // 오토스크롤
  //   controls : true,   // 좌/우 화살표
  //   pager: false,
  //   infiniteLoop : true, // 무한반복
  //   touchEnabled: false
  // });
  //
  // setArrowsAndViewAll(target, 0, 0);
};

// [29] 방송VOD 2XN 그리드형
Oksusu.Card.putCardType29 = function(target, cardInfo) {
  var i;
  var totSlideNum = cardInfo.grids.length > 25 ? 25 : cardInfo.grids.length;    // 전체 슬라이드 갯수
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수

  // card header
  var cardFrameDom
      = '  <div class="section_title_box">'
      + '    <span class="ico_name">' + OksusuCard.getHeadline(cardInfo, '방송') + '</span>'
      + '    <span class="section_title">' + cardInfo.card_title + '</span>'
      + '  </div>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="section_vlist"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++){
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      slideDom[i] = '<li class="slide contentNum' + i + '">';
      slideDom[i] += '  <a href="javascript:" title="">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <img alt="" class="img_default">';
      slideDom[i] += '    </div>';
      slideDom[i] += '    <div class="vlist_text_box">';
      slideDom[i] += '      <div class="text_title line1"><i class="rating_19" style="display:none">19세이상</i></div>';
      slideDom[i] += '      <div class="txt_log"></div>';
      slideDom[i] += '    </div>';
      slideDom[i]  += ' </div>';
      slideDom[i] += '  </a>';
      slideDom[i] += '</li>';
    } else {
      slideDom[i] = '<li class="slide contentNum' + i + ' type">';
      slideDom[i] += '  <a href="javascript:" title="">';
      slideDom[i] += '  <div class="section_info">';
      slideDom[i] += '    <div class="vlist_img">';
      slideDom[i] += '      <div class="vlist_bg type_v"></div>';  // background-image
      slideDom[i] += '      <img alt="" class="img_default type_v" />';
      slideDom[i] += '      <div class="vlist_tit type_v"></div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '    <div class="vlist_text_box">';
      slideDom[i] += '      <div class="text_title line1"><i class="rating_19" style="display:none">19세이상</i></div>';
      slideDom[i] += '      <div class="txt_log"></div>';
      slideDom[i] += '    </div>';
      slideDom[i] += '  </div>';
      slideDom[i] += '  </a>';
      slideDom[i] += '</li>';
    }
    //
    // slideDom[i]
    //     = '<li class="slide contentNum' + i + '">'
    //     + '  <a href="javascript:" title="">'
    //     + '    <div class="section_info">'
    //     + '      <div class="vlist_img">'
    //     + '        <img alt="" class="img_default">'
    //     + '        <div class="ico_right_box">'
    //     + '          <span class="ico_free" style="display:none;">FREE</span>'
    //     + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
    //     + '        </div>'
    //     + '      </div>'
    //     + '      <div class="vlist_text_box">'
    //     + '       <div class="text_title line1">'
    //     + '         <i class="rating_19" style="display:none;">19세이상</i>'
    //     + '       </div>'
    //     + '       <div class="txt_log">채널명</div>'
    //     + '      </div>'
    //     + '    </div>'
    //     + '  </a>'
    //     + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).addClass('cardType29');
  $(target).addClass('cardFilled');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .section_vlist').append(slideDom[i]);
  }

  for (i=0; i<totSlideNum; i++){

    var image = '';
    if (OksusuCard.haveHorizontalImage(cardInfo.grids[i])) {
      image = OksusuCard.getVodThumbImage(cardInfo.grids[i], '224_126');
    } else {
      image = OksusuCard.getVodPosterImage(cardInfo.grids[i], '80_114');
    }

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

    // 채널명
    if ( cardInfo.grids[i].at_contents !== null ){
      $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].at_contents);
    }

    // 유/무료 여부
    if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo.grids[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 19금
    if (cardInfo.grids[i].level === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title .rating_19').show();
    }

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').html(OksusuCard.getChannelName(cardInfo.grids[i]));

    // 에로스
    if (cardInfo.grids[i].yn_adult === 'Y') {

      // 성인유저
      if (User.isAdult === true) {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');
        $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');

        // 프로그램명
        var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
        $(target + ' .contentNum' + i + ' a').attr('title', title);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);

        // 미성년 유저
      } else {
        // 포스터
        $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
            '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
        $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

        // 프로그램명
        $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
        $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(Oksusu.StringProp.adultOnly);
      }

      // 일반
    } else {

      // 포스터
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
      $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + ReplaceImage.img_default_224x126 + '\'');
      $(target + ' .contentNum' + i + ' .vlist_bg').css('background-image', 'url(' + image + ')');

      // 프로그램명
      var title = '[' + cardInfo.grids[i].seq_no + '회] ' + cardInfo.grids[i].title;
      $(target + ' .contentNum' + i + ' a').attr('title', title);
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').append(title);
    }
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 전체보기 버튼
  Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd, cardInfo.call_type);
  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

// [51] 시청 구매내역
Oksusu.Card.putCardType51 = function(target, cardInfo, watchLevel) {

  $(target).addClass('cardType51');
  $(target).addClass('cardFilled');
  var title = target === '#watched' ? '시청' : '구매';

  if(cardInfo.length===0){
    $(target).append(
        '<p class="tit">' + title + '내역</p>' +
        '  <div class="cnt_box">' + title + '내역이 없습니다.</div>');
    return;
  }

  var i;
  // 전체 슬라이드 갯수(firefox array length 대응)
  for (i=0; i<cardInfo.length; i++){
    if (cardInfo[i]===undefined){
      break;
    }
  }
  var totSlideNum = i > 25 ? 25 : i;
  var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
  var date;
  var runningTime; // 재생시간
  var endTime;
  var removedItemNum  = 0;
  var slideNumDrwan = 0;

  // card header
  var cardFrameDom
      = '<p class="tit first">' + title + '내역</p>'
      + '  <div class="vlist_allview">'
      + '    <a href="javascript:" title="전체보기" class="ico_arrow">전체보기</a>'
      + '  </div>'
      + '  <ul class="poster_vlist movie"></ul>';

  var slideDom=[];

  for (i = 0; i < totSlideNum; i++) {
    slideDom[i]
      = '<li class="contentNum' + i + '">'
      + '  <a href="javascript:" title="">'
      + '    <div class="poster_info">'
      + '      <div class="vlist_img">'
      + '        <img alt="">'
      + '        <div class="summary_info">'
      + '          <span class="ico_grade">평점을 남겨주세요.</span>'
      + '          <div class="text_title"></div>'
      + '          <div class="text_summary"></div>'
      + '        </div>'
      + '      </div>'
      + '      <div class="vlist_text_box">'
      + '        <div class="text_title"></div>'
      + '        <div class="new_type01">'
      + '          <span class="watchDate"></span>'
      + '          <span class="period"><span class="empha cTime">00:00:00</span> / <span class="wTime">00:00:00</span></span>'
      + '        </div>'
      + '      </div>'
      + '    </div>'
      + '  </a>'
      + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).append(cardFrameDom);

  var lastPageNum = Math.ceil(totSlideNum / slideNumOnPage);

  // 컨텐츠 갯수(i)만큼 슬라이드 삽입
  for (i = 0; i < lastPageNum*slideNumOnPage ; i++) {
    $(target + ' .poster_vlist').append(slideDom[i]);
  }

  var title;
  for (i = 0; i < totSlideNum; i++) {
    // 성인등급제한 설정
    if (watchLevel !== 'N') {
      if (cardInfo[i].adult === 'Y') {
        $(target + ' .contentNum' + i).remove();
        removedItemNum++;
        continue;
      }
    }
    slideNumDrwan++;

    // 링크
    $(target + ' .contentNum' + i + ' a').attr('contentId', cardInfo[i].con_id);
    var onClickEvent = OksusuCard.getLinkClickHandler(cardInfo[i]);
    $(target + ' .contentNum' + i + ' a').attr('on_click', onClickEvent);

   // -------->2017/08/30 end
   // $(target + ' .contentNum' + i + ' .watchDate').text('시청일: '+ cardInfo[i].reg_date);

    // 19금
    if (cardInfo[i].rating === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
    }

    // 포스터
    var highDefImg = OksusuCard.getVodBookmarkPoster(cardInfo[i]);
    var normanDefImg = OksusuCard.getVodPoster(cardInfo[i]);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr(
      'src', highDefImg);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + normanDefImg + '\'');

    // 타이틀
    if (cardInfo[i].series_num !== '0' && cardInfo[i].section === 'WG003') {
      title = '[' + cardInfo[i].series_num + '회] ' + cardInfo[i].title;
    } else {
      title = cardInfo[i].title;
    }

    $(target + ' .contentNum' + i + ' a').attr('title',  title);
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').css('display', 'block').text(title);

    if (cardInfo[i].end_time !== undefined) {
      // 시청내역
      // 시청일   2017/08/30 add--------->
      var inTmprt = editCard.chgEdit(cardInfo[i].reg_date, 'date');
      $(target + ' .contentNum' + i + ' .watchDate').text(inTmprt);

      // 전체시간
      date = new Date(null);
      date.setSeconds(cardInfo[i].running_time);
      if (cardInfo[i].running_time >= 3600) {
        runningTime = date.toISOString().substr(11, 8);
      } else if (cardInfo[i].running_time >= 60) {
        runningTime = date.toISOString().substr(14, 5);
      }

      $(target + ' .contentNum' + i + ' .wTime').text(runningTime);

      // 시청한 시간
      date = new Date(null);
      date.setSeconds(cardInfo[i].end_time);

      if (cardInfo[i].end_time >= 3600) {
        endTime = date.toISOString().substr(11, 8);
        endTime.replace()
      } else {
          endTime = date.toISOString().substr(11, 8);

          // endTime = date.toISOString().substr(14, 5);
      }
      $(target + ' .contentNum' + i + ' .cTime').text(editCard.chgEdit(endTime, 'time'));

    } else {
      // 구매내역
      // 구매일 + 가격
      $(target + ' .contentNum' + i + ' .watchDate').text(
        "구매일:" + cardInfo[i].start_date + " (" + cardInfo[i].price + "원)");

      var dueDate = Oksusu.Card.getVodDueDateFormat(cardInfo[i].start_date, cardInfo[i].end_date, cardInfo[i].life);
      $(target + ' .contentNum' + i + ' .period').text('기간 : '+ dueDate);
    }
  }

  // 성인정책때문에 표시할 슬라이드가 없을 때
  if (slideNumDrwan === 0) {
    $(target).empty();
    $(target).append(
      '<p class="tit">시청/구매내역</p>' +
      '  <div class="cnt_box">시청/구매내역이 없습니다.</div>');
    return;
  }

  setBxSliderForOksusuCard(target, Oksusu.CardProp.SlideWidth.five, 5);

  // 슬라이드 클릭
  $(target + ' .poster_vlist a').click(function(e){
    e.preventDefault();
    Oksusu.Card.vodCliick($(this).attr('contentId'), $(this).attr('on_click'));
  });

  // 전체보기
  if (target === '#watched') {
    $(target + ' .vlist_allview a').attr('href', '/my/watched');
  } else {
    $(target + ' .vlist_allview a').attr('href', '/my/purchased');
  }

  // 페이저
  setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

// [51] 시청 구매내역 상세보기
Oksusu.Card.putCardType51Edit = function(target, cardInfo, type, curPage){

  $(target).addClass('cardType51Edit');
  $(target).addClass('cardFilled');

  if (cardInfo.length === 0) {
    if (type === 'watched') {
      $(target).append(
        '<div class="general_poster_list edit">'
        + '  <div class="nolistbox">'
        + '    <strong class="ico01">시청내역이 없습니다.</strong>'
        + '    <p>VOD를 시청하시면 MY 시청 / 구매내역에서 시청한 내역을 볼 수 있습니다.</p>'
        + '    </div>'
        + '</div>');
    } else {
      $(target).append(
        '<div class="general_poster_list edit">'
        + '  <div class="nolistbox">'
        + '    <strong class="ico02">구매내역이 없습니다.</strong>'
        + '    <p>VOD를 구매하시면 구매한 내역을 볼 수 있습니다.</p>'
        + '    </div>'
        + '</div>');
    }
    $('#noEdit').hide();
    $('#yesEdit').hide();
    return;
  }

  if (curPage >= 1) {
    $(target).css('margin-top', 0);
  }

  var i;
  // 그리드 정보의 갯수가 10보다 작으면 그만큼만 출력한다.
  for (i=0; i<cardInfo.length; i++){
    if (cardInfo[i]===undefined){
      break;
    }
  }

  var totSlideNum = i < 10  ? i : 10;
  var date;
  var runningTime; // 재생시간
  var endTime;

  // card header
  var cardFrameDom
    = '  <ul class="poster_vlist sort line3"></ul>';

  var slideDom=[];

  for (i = 0; i < totSlideNum; i++) {
    slideDom[i]
      = '<li content_id="' + cardInfo[i].con_id + '" class="contentNum' + i + ' movie editLi">'
      + '  <a href="javascript:" title="">'
      + '    <div class="poster_info">'
      + '      <div class="checkbox_wrap" style="display:none">'
      + '        <input type="checkbox" class="cm_chkbox" id="chk' + cardInfo[i].con_id +'">'
      + '        <label for="chk' + cardInfo[i].con_id + '"><i class="ico_checkbox wh"></i></label>'
      + '      </div>'
      + '      <div class="vlist_img">'
      + '        <img alt="">'
      + '        <div class="summary_info">'
      + '          <span class="ico_grade"></span>'
      + '          <div class="text_title"></div>'
      + '          <div class="text_summary"></div>'
      + '        </div>'
      + '      </div>'
      + '      <div class="vlist_text_box">'
      + '        <div class="text_title"></div>'
      + '        <div class="text_subtitle watchDate">시청일</div>'
      + '        <div class="text_subtitle period"><em><span class="cTime">00:01:00</span></em> / <span class="wTime">00:00:00</span></div>'
      + '      </div>'
      + '    </div>'
      + '  </a>'
      + '</li>';
  }

  $(target).addClass('general_poster_list');
  $(target).append(cardFrameDom);

  var title;

  for (i = 0; i < totSlideNum; i++) {

    $(target + ' .poster_vlist').append(slideDom[i]);

    if (type === 'purchased') {
      $(target + ' .contentNum' + i).attr('purc_idx', cardInfo[i].purc_idx)
    }
    // 링크
    $(target + ' .contentNum' + i + ' a').attr('contentId', cardInfo[i].con_id);
    var onClickEvent = OksusuCard.getLinkClickHandler(cardInfo[i]);
    $(target + ' .contentNum' + i + ' a').attr('on_click', onClickEvent);

    // 19금
    if (cardInfo[i].rating === '19') {
      $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
    }

    // 포스터
    var highDefImg = OksusuCard.getVodBookmarkPoster(cardInfo[i]);
    var normanDefImg = OksusuCard.getVodPoster(cardInfo[i]);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr(
      'src', highDefImg);
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('onerror', 'this.src=\'' + normanDefImg + '\'');

    // 타이틀
    if (cardInfo[i].series_num !== '0' && cardInfo[i].section === 'WG003') {
      title = '[' + cardInfo[i].series_num + '회] ' + cardInfo[i].title;
    } else {
      title = cardInfo[i].title;
    }

    $(target + ' .contentNum' + i + ' a').attr('title', title);
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').css('display', 'block').text(title);

    if (cardInfo[i].end_time !== undefined) {
      // 시청내역
      // 시청일
      $(target + ' .contentNum' + i + ' .watchDate').text( editCard.chgEdit(cardInfo[i].reg_date, 'date') );

      // 전체시간
      date = new Date(null);
      date.setSeconds(cardInfo[i].running_time);

      if (cardInfo[i].running_time >= 3600) {
        runningTime = date.toISOString().substr(11, 8);
      } else {
        runningTime = date.toISOString().substr(14, 5);
      }
      $(target + ' .contentNum' + i + ' .wTime').text(runningTime);
      // 시청한 시간
      date = new Date(null);
      date.setSeconds(cardInfo[i].end_time);

      if (cardInfo[i].end_time >= 3600) {
        endTime = date.toISOString().substr(11, 8);
      } else {
        endTime = date.toISOString().substr(11, 8);
//      endTime = date.toISOString().substr(11, 8);
      }
      $(target + ' .contentNum' + i + ' .cTime').text(  editCard.chgEdit(endTime,'time')  );
    } else {
      // 구매내역
      // 구매일 + 가격
      $(target + ' .contentNum' + i + ' .watchDate').text(
        "구매일:" + cardInfo[i].start_date + " (" + cardInfo[i].price + "원)");

      var dueDate = Oksusu.Card.getVodDueDateFormat(cardInfo[i].start_date, cardInfo[i].end_date, cardInfo[i].life);
      $(target + ' .contentNum' + i + ' .period').text('기간 : ' + dueDate);
    }

  }

  // 슬라이드 클릭
  $(target + ' .poster_vlist a').click(function(e){
    if($(this).parents('.general_poster_list').hasClass('edit')){
      return;
    }
    e.preventDefault();
    Oksusu.Card.vodCliick($(this).attr('contentId'), $(this).attr('on_click'));
  });
};

// 마이채널 전체보기
Oksusu.Card.putCardTypeMyChannelEdit = function(target, cardInfo, curPage) {
  $(target).addClass('cardTypeMyChannelEdit');
  $(target).addClass('cardFilled');

  if (cardInfo.length === 0) {
    $(target).append(
       '<div class="general_section_list edit">'
      +'  <div class="nolistbox">'
      +'    <strong class="ico03">즐겨찾기 채널이 없습니다.</strong>'
      +'    <p>자주 시청하는 채널을 즐겨찾기 하여 쉽고 편리하게 이용하세요!</p>'
      +'    </div>'
      +'</div>');
    $('#noEdit').hide();
    $('#yesEdit').hide();
    return;
  }

  if (curPage >= 1) {
    $(target).css('margin-top', 0);
  }

  var i;

  // 그리드 정보의 갯수가 10보다 작으면 그만큼만 출력한다.(firefox array length 대응에도 필요)
  for (i=0; i<cardInfo.length; i++){
    if (cardInfo[i]===undefined){
      break;
    }
  }
  var totSlideNum = i < 10  ? i : 10;    // 전체 슬라이드 갯수
    // card header
  var cardFrameDom
    = '  <ul class="section_vlist sort line3"></ul>';

  var slideDom=[];

  for(i=0; i<totSlideNum; i++) {
    slideDom[i]
      = '<li service_id="' + cardInfo[i].serviceId + '" class="slide contentNum' + i + ' editLi">'
      + '  <a href="javascript:" title="">'
      + '    <div class="section_info">'
      + '      <div class="checkbox_wrap" style="display:none">'
      + '        <input type="checkbox" class="cm_chkbox" id="chk' + cardInfo[i].serviceId +'">'
      + '        <label for="chk' + cardInfo[i].serviceId + '"><i class="ico_checkbox wh"></i></label>'
      + '      </div>'
      + '      <div class="vlist_img">'
      + '        <img alt="" class="img_default" onerror="this.src=\'' + ReplaceImage.img_default_224x126 + '\'">'
      + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
      + '        <span class="ico_onair" style="display:none;">ON-AIR</span>'
      + '        <div class="ico_right_box">'
      + '          <span class="ico_free" style="display:none;">FREE</span>'
      + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
      + '        </div>'
      + '      </div>'
      + '      <div class="vlist_text_box">'
      + '        <div class="text_title"><i class="rating_19" style="display:none">19세이상</i><span></span></div>'
      + '        <div class="txt_log"></div>'
      + '      </div>'
      + '    </div>'
      + '  </a>'
      + '</li>';
  }

  $(target).addClass('general_section_list');
  $(target).append(cardFrameDom);

  for (i=0; i<totSlideNum; i++){

    $(target + ' .section_vlist').append(slideDom[i]);

    if( cardInfo[i].programs.length >= 1 ){
      // image URL check
      if(cardInfo[i].thumbExtImageName.indexOf('http')!==0){
        cardInfo[i].thumbExtImageName = Oksusu.ImageUrlProp.STIMAGE.production + cardInfo[i].thumbExtImageName;
      }

      // ON AIR
      if (cardInfo[i].programs[0].is_live === Oksusu.ContentProp.is_live) {
        $(target + ' .contentNum' + i + ' .ico_onair').show();
      }

      // 프로그래스바
      var progressPercent = OksusuCard.getLiveProgressRate(cardInfo[i]);
      $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressPercent + '%');
    }

    // pc사용가능 여부
    $(target + ' .contentNum' + i).attr('pc_yn', cardInfo[i].pc_yn);

    // 링크
    var onClickEvent = OksusuCard.getLinkClickHandler(cardInfo[i]);
    $(target + ' .contentNum' + i + ' a').attr('on_click', onClickEvent);

    // 채널명
    $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo[i].channelName);


    // 유/무료 여부
    if (cardInfo[i].channelProd === Oksusu.ContentProp.channelProd.free) {
      // 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();
    } else if (cardInfo[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
      // 로그인 무료
      $(target + ' .contentNum' + i + ' .ico_free').show();

    } else if (cardInfo[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
      // 기본 월정액 무료

    } else {
      // 전체유료

    }

    // 채팅중
    if(cardInfo[i].chatYn==='Y'){
      $(target + ' .contentNum' + i + ' .ico_chatting').show();
    }

    // 이미지
    var image = OksusuCard.getChannelThumbnail(cardInfo[i], '224_126') || ReplaceImage.img_default_224x126;
    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', image);
    // 19금 아이콘
    if (OksusuCard.isLiveAdult(cardInfo[i])) {
      $(target + ' .contentNum' + i + ' .vlist_text_box .rating_19').css('display', 'inline-block');
    }

    var programName = OksusuCard.getProgramName(cardInfo[i]);
    // 프로그램명
    $(target + ' .contentNum' + i + ' a').attr('title', programName);
    $(target + ' .contentNum' + i + ' .vlist_text_box .text_title span').text(programName);
  }

};


/**
edit function
*/
var editCard = {
    watchDay:"시청일",
    watchTime:"시간",
    chgEdit : function  (itmpdata, itmpgubun) {
        var tmp_edegdate;
        var tmp_regdate;

        if(typeof itmpdata == "undefined" ||  itmpdata == '' ||  itmpdata == null )
        {
            switch(itmpgubun) {
                case  'date'  :   //시청일자없슴
                    tmp_edegdate = editCard.watchDay + ' :' + '0000/00/00';
                    break;
                case  'time'  :   //시간
                    tmp_edegdate = editCard.watchTime + ' :' + '00:00:00';
            }
        }else {
            switch(itmpgubun) {
                case  'date'  :   //시청일자없슴
                    tmp_edegdate = editCard.watchDay + ' :' + itmpdata;
                    break;
                case  'time'  :   //시간
                    tmp_edegdate = editCard.watchTime + ' :' + itmpdata;
                    break;
                default :
                    tmp_edegdate =  itmpdata;
            }
        }
        return tmp_edegdate;
    },

    getSubsLength : function  (  str,  byteLength ) {
        var length = str.length;
        var retLength = 0 , tempSize = 0, asc = 0, i = 0;
        for (  i = 1; i<=length; i++)
        {
            asc =  str.charAt(i-1);
            if ( asc > 127)
            {
                if ( byteLength > tempSize )
                {
                    tempSize += 2;
                    retLength++;
                }
            }
            else
            {
                if ( byteLength > tempSize )
                {
                    tempSize++;
                    retLength++;
                }
            }
        }
        return retLength;
    },

   //
    getTitleEdit : function  ( strtitle ) {
        var insubpos = 0;
        var tmptitle = strtitle;
        var viewtitle = '';
        var stringByteLength = tmptitle.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length;

        // alert (tmptitle + '(stringByteLength) : ' + stringByteLength);
        if (stringByteLength > 40 ) {
            viewtitle = tmptitle.substr(0, editCard.getSubsLength(tmptitle, 20) ) + '...';
        }
        else {
            viewtitle = tmptitle;
        }
        // alert (viewtitle );

        return  viewtitle;

    }
   //









};

/**
 * 좌/우 이동버튼과 전체보기 버튼의 감추기 효과를 적용한다.
 * @param target : target card ID
 * @param totSlideNum : 슬라이드 갯수
 */
function setArrowsAndViewAll(target, totSlideNum, slideNumOnPage){
  // 좌/우 이동버튼 감추기
  $(target + ' .bx-viewport').hover(
      function(){
        $(target + ' .bx-prev').css('opacity', '1');
        $(target + ' .bx-next').css('opacity', '1');
      },function(){
        $(target + ' .bx-prev').css('opacity', '0');
        $(target + ' .bx-next').css('opacity', '0');
      }
  );

  $(target + ' .bx-prev').hover(
      function(){
        $(target + ' .bx-prev').css('opacity', '1');
        $(target + ' .bx-next').css('opacity', '1');
      },function(){
        $(target + ' .bx-prev').css('opacity', '0');
        $(target + ' .bx-next').css('opacity', '0');
      }
  );

  $(target + ' .bx-next').hover(
      function(){
        $(target + ' .bx-prev').css('opacity', '1');
        $(target + ' .bx-next').css('opacity', '1');
      },function(){
        $(target + ' .bx-prev').css('opacity', '0');
        $(target + ' .bx-next').css('opacity', '0');
      }
  );

  // 슬라이드 갯수가 6개 이하일 때 pager, 전체보기 감추기
  if (totSlideNum <= slideNumOnPage) {
    $(target + ' .bx-pager').css('display', 'none');
    // $(target + ' .vlist_allview').css('display', 'none');
  }
}

/**
 * pc에서 시청가능 컨텐츠인지 여부를 판단하여, 시청 불가능한 컨텐츠는 안내메시지를 출력한다.
 * 시청 가능한 컨텐츠는 플레이어 페이지로 이동한다.
 * @param contentId
 */
Oksusu.Card.vodCliick = function(contentId, on_click) {
  $.ajax({
    async: 'true',
    url: '/api/vod/' + contentId,
    type: "GET",
    dataType: "json"
  }).done(function (res) {
    if (res.result === 'OK') {

      if (res.content.icon_info.pc_yn === 'Y') {
        eval(on_click);
      } else {
        CommonPopupWithHeader.open('시청안내',
          '모바일앱에서만 제공되는 콘텐츠로</br>PC에서는 시청이 불가한 콘텐츠입니다');
      }

    } else {
      CommonPopupWithHeader.open('안내',
        '시스템 장애가 발생하였습니다</br>다시 시도해주세요.');
    }
  }).fail(function (jqXHR, textStatus) {
    var fRes = "ajax failed widh : " + JSON.stringify(jqXHR) + textStatus;
    log(fRes);
  });
};

// [27] 공통 3XN 버튼형
/**
 * @description 뉴스vod text category
 * @param target
 * @param cardInfo
 * @author ungsik.j
 * @date 2017.08.05
 */
Oksusu.Card.putCardType3XN27 = function(target, cardInfo){
    var i,cardFrameDom,h;

    var totSlideNum = (isNaN(cardInfo.grids.length)) ? cardInfo.grids.length : 0;
    var cardFrameDom = "";
    cardFrameDom +="<div class=\"general_menu_list\" id=\"putCardType3XN27\"><ul></ul></div>";

    $(target).addClass('cardType27');
    $(target).addClass('cardFilled');
    $(target).append(cardFrameDom);

    var slideDom=[];
    for(var i in cardInfo.grids){
        h = "";
        h +="<li class=\"contentNum\" style=\"width:0px;\">";
        h +="<a href=\"javascript:void(0);\" class=\"contentNum"+i+"\" id="+cardInfo.grids[i].call_object.split("|")[2]+" title="+cardInfo.grids[i].btn_name+"\">";
        h +="<span>"+cardInfo.grids[i].btn_name+"</span>";
        h +="</a>";
        h +="</li>";
        slideDom[i] = h;
    }
    $(target + ' .general_menu_list ul').append(slideDom);
};
/**
 * @description 뉴스vod text category
 * @param target
 * @param cardInfo
 * @author ungsik.j
 * @date 2017.08.05
 */
Oksusu.Card.putCardTypeTextGTLT = function(target, cardInfo){
    var i,cardFrameDom,h;
    var totSlideNum = (isNaN(cardInfo.grids.length)) ? cardInfo.grids.length : 0;
    var cardFrameDom = "";
    cardFrameDom +="<div class=\"general_menu_list\" id=\"putCardType3XN27\"><ul></ul></div>";

    $(target).addClass('cardType27');
    $(target).addClass('cardFilled');
    $(target).append(cardFrameDom);

    var slideDom=[];
    for(var i in cardInfo.grids){
        h = "";
        h +="<li class=\"contentNum\" style=\"width:0px;\">";
        h +="<a href=\"javascript:void(0);\" onclick=\"fn_cellObject('"+cardInfo.grids[i].call_object+"','"+cardInfo.card_typ_cd+"')\" class=\"contentNum"+i+"\" id="+cardInfo.grids[i].call_object.split("|")[2]+" title="+cardInfo.grids[i].btn_name+">";
        h +="<span>"+cardInfo.grids[i].btn_name+"</span>";
        h +="</a>";
        h +="</li>";
        slideDom[i] = h;
    }
    $(target + ' .general_menu_list ul').append(slideDom);
};
//[4] LIVE 1XN 리스트형
/**
 * 스포츠 프로야구 TODAY LIVE
 * @param target
 * @param cardInfo
 * @param User.isAdult
 */
Oksusu.Card.putCardType_s4 = function(target, cardInfo) {

    var i;
    var totSlideNum = cardInfo.grids_count;    // 전체 슬라이드 갯수
    var slideNumOnPage = 5; // 한 페이지에 보여지는 슬라이드 갯수
    var startTime;     // 시작시간
    var endTime;       // 종료시간
    var currentTime = moment().format('x'); // 현재시간
    var runningTime;   // 러닝타임
    var elapseTime;    // 플레이된 시간
    var progressRate;  // 플레이된 시간(백분율)

    // card header
    var cardFrameDom;
    //<!-- [1] LIVE 1X1 그리드형 -->
    cardFrameDom =  "<div class=\"section_title_box\">";
    cardFrameDom += "<span class=\"ico_name text_blue\">LIVE</span>";
    cardFrameDom += "<span class=\"section_title normal\">"+cardInfo.card_title+"</span>";
    cardFrameDom += "</div>";
    cardFrameDom += "<ul class=\"section_vlist\"></ul>";

    var slideDom=[];

    $(target).html(cardFrameDom);

    var h;
    for(i=0; i<totSlideNum; i++){

            h = '<li class="slide contentNum' + i + '">'
            + '  <a href="javascript:" title="">'
            + '    <div class="section_info">'
            + '      <div class="vlist_img">'
            + '        <img alt="" class="img_default">'
            + '        <div class="info-play-linear"><span style="width:0%">재생진행률</span></div>'
            + '        <div class="ico_right_box">'
            + '          <span class="ico_free" style="display:none;">FREE</span>'
            + '          <span class="ico_chatting" style="display:none;">채팅중</span>'
            + '        </div>'
            + '      </div>'
            + '      <div class="vlist_text_box">'
            + '        <div class="text_title"></div>'
            + '        <div class="txt_log">채널명</div>'
            + '      </div>'
            + '    </div>'
            + '  </a>'
            + '</li>';
        slideDom[i] = h;
        h = '';
    }

    $('ul.section_vlist' , target).html(slideDom);

    $(target).addClass('cardType4');
    $(target).addClass('cardFilled');

    for (i=0; i<totSlideNum; i++){

        // 링크
      $(target + ' .contentNum' + i + ' a').attr('onclick', OksusuCard.getLinkClickHandler(cardInfo.grids[i]));

        // 채널명
        $(target + ' .contentNum' + i + ' .vlist_text_box .txt_log').text(cardInfo.grids[i].channelName);

        startTime = parseInt(cardInfo.grids[i].programs[0].startTime);
        endTime = parseInt(cardInfo.grids[i].programs[0].endTime);
        runningTime = endTime - startTime;
        elapseTime = currentTime - startTime;
        progressRate = Math.floor((elapseTime / runningTime) * 100);

        // 프로그래스바
        $(target + ' .contentNum' + i + ' .info-play-linear span').css('width', progressRate + '%');

        // 유/무료 여부
        if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.free) {
            // 무료
            $(target + ' .contentNum' + i + ' .ico_free').show();
        } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.loginFree) {
            // 로그인 무료
            $(target + ' .contentNum' + i + ' .ico_free').show();

        } else if (cardInfo.grids[i].channelProd === Oksusu.ContentProp.channelProd.basicFree) {
            // 기본 월정액 무료

        } else {
            // 전체유료

        }

        // 채팅중
        if(cardInfo.grids[i].chatYn==='Y'){
            $(target + ' .contentNum' + i + ' .ico_chatting').show();
        }


        // 에로스
        if (cardInfo.grids[i].genreCd === Oksusu.ContentProp.genreCd.eros) {

            // 19금 아이콘
            $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');

            // 성인유저
            if (User.isAdult === true) {
                // 포스터
                if (cardInfo.grids[i].hr_poster_low !== null) {
                    $(target + ' .contentNum' + i + ' .vlist_img img').attr(
                        'src', cardInfo.grids[i].thumbExtImageName);
                } else {
                    $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x126);
                }

                // 프로그램명
                $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
                $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].programs[0].programName);

                // 미성년 유저
            } else {
                // 포스터
                $(target + ' .contentNum' + i + ' .vlist_img img').attr('src',
                    '/public/assets/img/logo/'+ cardInfo.grids[i].channelImageName);
                $(target + ' .contentNum' + i + ' .vlist_img img').addClass('erosLogo');

                // 프로그램명
                $(target + ' .contentNum' + i + ' a').attr('title', Oksusu.StringProp.adultOnly);
                $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(Oksusu.StringProp.adultOnly);
            }

            // 일반
        } else {

            // 19금
            if (cardInfo.grids[i].level === '19') {
                $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').addClass('rating_19');
            }

            // 포스터
            if (cardInfo.grids[i].hr_poster_low !== null) {
                $(target + ' .contentNum' + i + ' .vlist_img img').attr(
                    'src', cardInfo.grids[i].thumbExtImageName);
            } else {
                $(target + ' .contentNum' + i + ' .vlist_img img').attr('src', ReplaceImage.img_default_224x126);
            }

            // 프로그램명
            $(target + ' .contentNum' + i + ' a').attr('title', cardInfo.grids[i].programs[0].programName);
            $(target + ' .contentNum' + i + ' .vlist_text_box .text_title').text(cardInfo.grids[i].programs[0].programName);

        }

    }

    // bx slider 생성
    $(target + ' .section_vlist').bxSlider({
        mode: 'horizontal',
        moveSlides: totSlideNum,
        slideMargin: 20,
        infiniteLoop: true,
        slideWidth: 'auto',
        minSlides: 3,
        maxSlides: totSlideNum,
        speed: 1000,
        useCSS: false,
        pager: true,
        touchEnabled: false,
        controls : (totSlideNum > 3 ) ? true : false
    });

    // 전체보기 버튼
    Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
    // 페이저
    setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};
/**
 * 스포츠 프로야구 TODAY 하이라이트
 * @param target
 * @param cardInfo
 * @param User.isAdult
 */
Oksusu.Card.putCardType_s22 = function(target, cardInfo, adultYn, typegbn ){

    var i;
    var totSlideNum = cardInfo.grids_count;    // 전체 슬라이드 갯수
    var slideNumOnPage = 4; // 한 페이지에 보여지는 슬라이드 갯수

    // card header
    var cardFrameDom;
    //<!-- [1] LIVE 1X1 그리드형 -->
    cardFrameDom =  "<div class=\"section_title_box\">";
    cardFrameDom += "<span class=\"ico_name text_blue\">"+OksusuCard.getHeadline(cardInfo, '클립')+"</span>";
    cardFrameDom += "<span class=\"section_title normal\">"+cardInfo.card_title+"</span>";
    cardFrameDom += "</div>";
    cardFrameDom += "<div class=\"vlist_allview\">";
    cardFrameDom += "<a href=\"javascript:;\" title=\"전체보기\" class=\"ico_arrow\">전체보기</a>";
    cardFrameDom += "</div>";
    cardFrameDom += "<ul class=\"section_vlist\"></ul>";

    var slideDom=[];

    $(target).html(cardFrameDom);

    console.log(cardInfo.grids);
    var h,data;
    for(var x in cardInfo.grids){
        data = cardInfo.grids[x];
        h = "";
        h+="<li class=\"slide contentNum"+i+"\" >";
        h+="<a href=\"javascript:;\" onclick=\"fn_vlink('"+data.clip_id+"')\" title=\"\">";
        h+="<div class=\"section_info\">";
        h+="<div class=\"vlist_img\">";
        h+="<img class=\"no_image\" src=\""+data.thum_info_half+"\" alt=\"경기 장면\"  onerror=\"this.src=\'/public/assets/img/bg_blur.png'\" >'";
        h+="<div class=\"ico_right_box\">";
        h+="<span class=\"ico_free\" style=\"display:none;\">FREE</span>";
        h+="<span class=\"ico_chatting\" style=\"display:none;\">채팅중</span>";
        h+="</div>";
        h+="</div>";
        h+="<div class=\"vlist_text_box\">";
        h+="<div class=\"text_title line2\">";
        h+=data.clip_title;
        h+="</div>";
        h+="<div class=\"text_subtitle text_blue\">";
        h+=data.clip_chnl_nm;
        h+="</div>";
        h+="<div class=\"text_play_count\">";
        h+="<span class=\"ico_count\">"+ common.mask.getdatefmt(data.disp_cnt,'comma') +"</span>";
        h+="<span class=\"text_date\">"+ common.mask.getdatefmt(data.spo_dt,'ymddot') +"</span>";
        h+="</div>";
        h+="</div>";
        h+="</a>";
        h+="</li>";
        slideDom[x] = h;
    }

    $('ul.section_vlist' , target).html(slideDom);
    var slideMargin = 1;
    if(typegbn != '9000000251'){
        $(target).addClass('cardType22_1');
        $(".cardType22_1").css("width","840px");
        slideMargin = 10;
    }else{
        $(target).addClass('cardType22');
    }
    $(target).addClass('cardFilled');

    $("div.vlist_allview").show(); // 전체보기

    // bx slider 생성
    $(target + ' .section_vlist').bxSlider({
        mode: 'horizontal',
        moveSlides: 4,
        slideMargin: slideMargin,
        infiniteLoop: true,
        slideWidth: 'auto',
        minSlides: 4,
        maxSlides: totSlideNum,
        speed: 500,
        useCSS: true,
        pager: false,
        touchEnabled: false,
        controls : (totSlideNum > 4 ) ? true : false

    });

    // 전체보기 버튼
    Oksusu.Card.viewAll(target, cardInfo.call_object, cardInfo.card_typ_cd);
    // 페이저
    setArrowsAndViewAll(target, totSlideNum, slideNumOnPage);
};

var setBxSliderForOksusuCard = function(target, slideWidth, slideCount) {
  var sliderId = target.replace('#', '');
  var sliderPrevId = '#slider-prev' + sliderId;
  var sliderNextId = '#slider-next' + sliderId;
  var hasControl = ($(target).find('ul').find('li').length > slideCount) ? true : false;
  var lastIndex = Math.ceil($(target).find('li').length / slideCount) - 1;

  $(target).find('ul').before('<span id="slider-prev' + sliderId + '"></span>');
  $(target).find('ul').after('<span id="slider-next' + sliderId + '"></span>');

  $(target).find('ul').bxSlider({
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
};

Oksusu.Card.getVodDueDateFormat = function(startDate, endDate, life){
  var res;

  if(life){
    res = startDate + " ~ " + '무제한';
  }else{
    var startOfDay = moment().startOf('day');
    var expiredDay = moment((endDate).replace(/\./g, '-'));
    if( expiredDay.isBefore(startOfDay)){
      res = '시청기간 만료';
    }else{
      res = startDate + " ~ " + endDate;
    }
  }
  return res;
};
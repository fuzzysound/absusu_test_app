function peopleInfo(characterId) {
  $.ajax({
    async: 'true',
    url: '/api/search/peopleDetail/' + characterId,
    type: "GET",
    data: {
      from: "web",
      //query: searchVal,
      pg: 1,
      deviceType: "0",
      al_code: "PQ",
      selectScope: "",
      tgroup: "",
      tvalue: "",
      docPage: "5",
      type: 0,
      rating: "",
      sort: "relev",
      fromMain: "",
      extr_flag: ""
    },
    dataType: "json"
  }).success(function (response) {
    getLiveList(response);
  }).fail(function () {
  });
}

function getLiveList(topData) {
  var peopleName = topData.staff.title;

  $.ajax({
    async: 'false',
    url: '/api/search/result/list',
    type: 'get',
    data: {
      query: peopleName,
      type: '0',
      pooqCode: 'PQ',
      selectScope: 'ALL',
      pageNo: 1,
      pageSize: 20,
      rating: '',
      sort: 'new',
      fromMain: 'N',
      externalCode: '1,2'
    },
    cache: false,
    success: function (response) {
      if (response && response.result === 'OK') {
        getClipList(topData, response.results);
      }
    },
    error: function (response) {
    }
  });
}

function getClipList(topData, liveData) {
  var peopleName = topData.staff.title;

  $.ajax({
    async: 'false',
    url: '/api/search/result/list',
    type: 'get',
    data: {
      query: peopleName,
      type: '3',
      pooqCode: 'PQ',
      selectScope: 'ALL',
      pageNo: 1,
      pageSize: 20,
      rating: '',
      sort: 'new',
      fromMain: 'N',
      externalCode: '1,2'
    },
    cache: false,
    success: function (response) {
      if (response && response.result === 'OK') {
        renderSearchResultSectionChatChk(liveData);
        peopleInfoRender(topData, liveData, response.results);
      }
    },
    error: function (response) {
    }
  });
}

function getPaidResolIcons(data) {
  var icons = '';
  var padiIcon = '';
  var resolIcon = '';
  var html = '';
  if (!data) {
    return '';
  }

  if (data.pkgecd === "20") {
    padiIcon = '<i class="ico_price"></i>';
  }

  switch (data.fgResoluNew) {
    case '1':
      resolIcon = '<i class="ico_hd"></i>';
      break;
    case '2':
      resolIcon = '<i class="ico_fhd"></i>';
      break;
  }

  icons = padiIcon + resolIcon;

  if (icons !== '') {
    html = '<div class="ico_set">' + icons + '</div>';
  }

  return html;
}

function renderSearchResultSectionChatChk(response) {
  $(response).each(function (index, data) {
    var chatList = [];
    var channelServiceId = data.channelId;

    $.ajax({
      async: false,
      url: '/api/chat/list',
      type: 'get',
      cache: false,
      success: function (response) {
        if (response.root.rooms.length > 0) {
          for (var i = 0; i < response.root.rooms.length; i++) {
            chatList.push(response.root.rooms[i].channel_service_id);
          }
          for (var i = 0; i < chatList.length; i++) {
            if (chatList[i] == channelServiceId) {
              data.chat_flag = 'Y';
              break;
            }
          }
        }
      },
      error: function () {
      }
    });
  });
}

function peopleInfoRender(data, liveData, clipData) {
  var html = "";

  var characterName = data.staff.title;  // 이름
  var series = data.staff.series;        // 시리즈
  var sourceImage = data.staff.i_img;    // 출처
  var poster = 'http://stimage.oksusu.com:8080/meta/'+data.staff.poster;        // 포스터 파일명
  var sportClass = '';
  if(poster.indexOf('sports') > -1){
    sportClass = "sportImg";
  }

  var characterValueHtml = "";
  var contentTitle = "";
  var contentValue = "";
  var birth = "";
  var affiliated = "";

  // 인물상세정보 배열
  $(data.staff.c_info_list).each(function (i, characterDetail) {
    contentTitle = (characterDetail.c_title == '데뷰') ? '데뷔' : characterDetail.c_title;  // 성별,영문명,출생,직업,신체,경력
    $(data.staff.c_info_list[i].value_list).each(function (j, valueList) {
      contentValue = valueList.value;

      if (contentTitle == "출생") {
        birth = contentValue;
      } else if (contentTitle == "소속") {
        affiliated = contentValue;
      }
    });

    // 소속 중복방지
    if (contentTitle != "소속") {
      characterValueHtml += '<li><span>' + contentTitle + '</span>' + contentValue.split('\n').join('</br>') + '</li>';
    }
  });

  html += '<div class="profile_area">';
  html += '<div class="tit">프로필</div>';
  html +=   '<div class="profile_photo '+ sportClass +'"><span><img src="'+ poster +'" alt="" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'"/></span></div>';
  html += '<div class="profile_view">';
  html += '<p class="name">' + characterName + '</p>';
  if (!birth) {
    html += '<p class="with_msg">' + birth + '</p>';
  }
  html += '<p class="with_msg">' + affiliated + '</p>';
  html += '<ul class="profile_detail">';
  html += characterValueHtml;
  html += '</ul>';
  html += '</div>';
  html += '</div>';

  // LIVE,영화:6,VOD:7,CLIP 순으로 노출
  var movieArr = new Array();
  var vodArr = new Array();

  var linkUrl = "";
  var posterImg = "";
  var contTitle = "성인 전용";

  if (liveData.length > 0) {
    html += '<div class="unifiedSchTit">관련 영상</div>';
    html += '<div class="tab_wrap">'
    html += ' <div class="searchResultBox" style="display:block;">';

    html += '   <div class="result_program_list_wrap">';
    html += '     <div class="result_program_list_top">';
    html += '       <div class="program_list_tit">LIVE <span class="number">(' + liveData.length + ')</span></div>';
    html += '     </div>'
    html += '     <div class="result_program_list">';
    html += '       <div class="general_section_list">';
    html += '         <ul class="section_vlist sort line3">';

    $(liveData).each(function (i, item) {
      var adultHtml = (item.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
      var channelName = item.channelNm;
      var iconSet = getPaidResolIcons(item);
      item.serviceId = item.channelId;
      var channelServiceId = item.channelId;
      var currentTime = parseInt(moment().format('YYYYMMDDHHmmss'));
      var startTime = parseInt(item.startTime);
      var endTime = parseInt(item.endTime);
      var runningTime = endTime - startTime;
      var elapseTime = currentTime - startTime;
      var percent = Math.floor((elapseTime / runningTime) * 100);
      var progressHtml = '<div class="info-play-linear"><span style="width:' + percent + '%">재생진행률</span></div>';
      var freeHtml = (item.pkgecd == '0' || item.pkgecd == '5') ? '<span class="ico_free">FREE</span>' : '';
      var chatHtml = (item.chat_flag == 'Y') ? '<span class="ico_chatting">채팅중</span>' : '';
      var timeHtml = moment(item.startTime, 'YYYYMMDDHHmmss').format('ahh:mm') + ' ~ ' + moment(item.endTime, 'YYYYMMDDHHmmss').format('ahh:mm');
      var liveImg;

      linkUrl = OksusuCard.getLinkClickHandler(item);
      contTitle = (item.categoryNm == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : item.title;

      if (item.categoryNm == '에로스') {
        item.serviceId = item.channelId;
        liveImg = OksusuCard.getChannelLogoBGWhite(item);
      } else {
        liveImg = 'http://igs.oksusu.com:8080/thumbnails/nsigs/224_126/thumb_' + channelServiceId + '.jpg';
      }

      html += '         <li>';
      html += '           <a href="javascript:;" title="' + contTitle + '" onclick=' + linkUrl + '>';
      html += '             <div class="section_info">';
      html += '               <div class="vlist_img">';
      html += '                 <img src="' + liveImg + '" alt="' + contTitle + '" class="img_default" onerror="this.src=\'' + 'http://image.oksusu.com:8080/thumbnails/image/0_0_F20/live/logo/387/nsepg_'.replace('0_0', '224_126') + channelServiceId + '.png' + '\'" />';
      html += progressHtml;
      html += '                 <div class="ico_right_box">';
      html += freeHtml;
      html += chatHtml;
      html += '                 </div>';
      html += '               </div>';
      html += '               <div class="vlist_text_box">';
      html += '                 <div class="text_title">';
      html += adultHtml;
      html += contTitle;
      html += '                 </div>';
      html += '                 <div class="txt_log">' + channelName + iconSet + '</div>';
      html += '                 <div class="text_date">' + timeHtml + '</div>';
      html += '               </div>';
      html += '             </div>';
      html += '           </a>';
      html += '         </li>';
    });
    html += '         </ul>';
    html += '       </div>';
    html += '     </div>';
    html += '   </div>';
  }

  if (series) {
    var movieCnt = 0;
    var vodCnt = 0;

    $(series).each(function (index, seriesData) {
      if (series[index].typ_cd == "6") {
        movieCnt++;
        movieArr.push(seriesData);
      } else if (series[index].typ_cd == "7") {
        vodCnt++;
        vodArr.push(seriesData);
      }
    });

    if (movieArr.length > 0 || vodArr.length > 0) {
      if (liveData.length < 1) {
        html += '<div class="unifiedSchTit">관련 영상</div>';
        html += '<div class="tab_wrap">'
        html += ' <div class="searchResultBox" style="display:block;">';
      }

      if (movieArr.length > 0) {
        if (movieArr.length > 20) {
          movieArr.length = 20;
        }

        html += '   <div class="result_program_list_wrap">';
        html += '     <div class="result_program_list_top">';
        html += '       <div class="program_list_tit">영화 <span class="number">(' + movieCnt + ')</span></div>';
        html += '     </div>'
        html += '     <div class="result_program_list">';
        html += '       <div class="general_poster_list">';
        html += '         <ul class="poster_vlist sort movie">';
        $(movieArr).each(function (i, item) {
          var adultHtml = (item.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
          var priceHtml = (item.sale_prc != '0') ? '<i class="ico_price"></i>' : '';
          var hdHtml = (item.yn_hd == 'Y') ? '<i class="ico_hd"></i>' : '';
          var starrHtml = (item.starr) ? '출연 : ' + item.starr : ''; // 출연(배우)
          var movieImg = (item.at_contents == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '/public/assets/img/img_restricted03.png' : 'http://image.oksusu.com:8080/thumbnails/image/224_320' + item.poster;

          linkUrl = OksusuCard.getLinkClickHandler(item);
          contTitle = (item.at_contents == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : item.title;

          html += '         <li>';
          html += '           <a href="javascript:;" title="' + contTitle + '" onclick=' + linkUrl + '>';
          html += '             <div class="poster_info">';
          html += '               <div class="vlist_img">';
          html += '                 <img src="' + movieImg + '" alt="' + contTitle + '" class="img_default" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'" />';
          // html += '                 <div class="info-play-linear"><span style="width:80%">재생진행률</span></div>';
          // html += '                 <div class="ico_right_box">';
          // html += '                   <span class="ico_free">FREE</span>';
          // html += '                   <span class="ico_chatting">채팅중</span>';
          // html += '                 </div>';
          html += '               </div>';
          html += '               <div class="vlist_text_box">';
          html += '                 <div class="text_title">';
          html += adultHtml;
          html += contTitle;
          html += '                 </div>';
          html += '                 <div class="text_subtitle">' + item.at_contents;
          html += '                   <div class="ico_set">';
          html += priceHtml;
          html += hdHtml;
          html += '                   </div>';
          html += '                 </div>';
          // html += '               <div class="text_date">오후03:00 ~ 오후04:20</div>';
          html += '                 <div class="text_subtitle">';
          html += starrHtml;
          html += '                 </div>';
          html += '               </div>';
          html += '             </div>';
          html += '           </a>';
          html += '         </li>';
        });
        html += '         </ul>';
        html += '       </div>';
        html += '     </div>';
        html += '   </div>';
      }

      if (vodArr.length > 0) {
        if (vodArr.length > 20) {
          vodArr.length = 20;
        }

        html += '   <div class="result_program_list_wrap">';
        html += '     <div class="result_program_list_top">';
        html += '       <div class="program_list_tit">방송VOD <span class="number">(' + vodCnt + ')</span></div>';
        html += '     </div>'
        html += '     <div class="result_program_list">';
        html += '       <div class="general_poster_list">';
        html += '         <ul class="poster_vlist movie sort">';
        $(vodArr).each(function (i, item) {
          var adultHtml = (item.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
          var priceHtml = (item.sale_prc != '0') ? '<i class="ico_price"></i>' : '';
          var hdHtml = (item.yn_hd == 'Y') ? '<i class="ico_hd"></i>' : '';
          var vodImg = (item.at_contents == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '/public/assets/img/img_restricted03.png' : 'http://image.oksusu.com:8080/thumbnails/image/224_320' + item.poster;

          linkUrl = OksusuCard.getLinkClickHandler(item);
          contTitle = (item.at_contents == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : item.title;

          html += '         <li>';
          html += '           <a href="javascript:;" title="' + contTitle + '" onclick=' + linkUrl + '>';
          html += '             <div class="poster_info">';
          html += '               <div class="vlist_img">';
          html += '                 <img src="' + vodImg + '" alt="' + contTitle + '" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'" />';
          // html += '                 <div class="info-play-linear"><span style="width:80%">재생진행률</span></div>';
          // html += '                 <div class="ico_right_box">';
          // html += '                   <span class="ico_free">FREE</span>';
          // html += '                   <span class="ico_chatting">채팅중</span>';
          // html += '                 </div>';
          html += '               </div>';
          html += '               <div class="vlist_text_box">';
          html += '                 <div class="text_title">';
          html += adultHtml;
          html += contTitle;
          html += '                 </div>';
          html += '                 <div class="text_subtitle">' + item.at_contents;
          html += '                   <div class="ico_set">';
          html += priceHtml;
          html += hdHtml;
          html += '                   </div>';
          html += '                 </div>';
          // html += '               <div class="text_date">오후03:00 ~ 오후04:20</div>';
          html += '               </div>';
          html += '             </div>';
          html += '           </a>';
          html += '         </li>';
        });
        html += '         </ul>';
        html += '       </div>';
        html += '     </div>';
        html += '   </div>';
      }
    }
  }

  // 클립은 검색결과의 데이터 노출
  if (clipData.length > 0) {
    if (liveData.length < 1 && movieArr.length < 1 && vodArr.length < 1) {
      html += '<div class="unifiedSchTit">관련 영상</div>';
      html += '<div class="tab_wrap">'
      html += ' <div class="searchResultBox" style="display:block;">';
    }

    html += '   <div class="result_program_list_wrap">';
    html += '     <div class="result_program_list_top">';
    html += '       <div class="program_list_tit">클립 <span class="number">(' + clipData.length + ')</span></div>';
    html += '     </div>'
    html += '     <div class="result_program_list">';
    html += '       <div class="general_section_list">';
    html += '         <ul class="section_vlist sort line4">';
    $(clipData).each(function (i, item) {
      linkUrl = OksusuCard.getLinkClickHandler(item);

      var clipId = item.clip_id;
      var title = item.clip_title;
      var programTitle = item.title;
      var image = '';
      var isLandscape = true;

      if (item.adlt_cd == '02' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) {
        image = '/public/assets/img/img_restricted01.png';
        title = '성인 전용';
      } else {
        if (item.poster2.indexOf('_320x180') > -1) {
          image = 'http://image.oksusu.com:8080/thumbnails/image/224_126' + item.poster2.replace('_320x180', '');
        } else if (item.poster2.indexOf('_190x272') > -1) {
          image = 'http://image.oksusu.com:8080/thumbnails/image/190_272' + item.poster2.replace('_190x272', '');
          isLandscape = false;
        }
      }

      var viewCount = comma(item.view_count);
      var dateHtml = (item.broad_date) ? '<span class="text_date">' + item.broad_date + '</span>' : '';
      var runtimeHtml = getRuntimeBySecond(item.runtime);
      var adultHtml = (item.adlt_cd == '01' || item.adlt_cd == '02') ? '<i class="rating_19">19세이상</i>' : '';

      if (isLandscape) {
        html += '         <li>';
        html += '           <a href="javascript:;" title="' + title + '" onclick=' + linkUrl + '>';
        html += '             <div class="section_info">';
        html += '               <div class="vlist_img">';
        html += '                 <img src="' + image + '" onerror="this.src=' + ReplaceImage.img_default_224x126 + '" />';
        html += '                 <i class="bg_line">이미지 그라데이션</i>';
        html += '                 <span class="vlist_time">' + runtimeHtml + '</span>';
        html += '               </div>';
        html += '               <div class="vlist_text_box">';
        html += '                 <div class="text_title">';
        html += adultHtml + title;
        html += '                 </div>';
        html += '                 <div class="text_subtitle text_blue">';
        html += programTitle;
        html += '                 </div>';
        html += '                 <div class="text_play_count">';
        html += '                   <span class="ico_count">' + viewCount + '</span>';
        html += dateHtml;
        html += '                 </div>';
        html += '               </div>';
        html += '             </div>';
        html += '           </a>';
        html += '         </li>';
      } else {
        html += '         <li>';
        html += '           <a href="' + linkUrl + '" title="' + title + '">';
        html += '             <div class="section_info">';
        html += '               <div class="vlist_img imgH">';
        html += '                 <img src="' + image + '" onerror="this.src=' + ReplaceImage.img_default_224x126 + '" class="img_default">';
        html += '                 <i class="bg_line">이미지 그라데이션</i>';
        html += '                 <span class="vlist_time">' + runtimeHtml + '</span>';
        html += '               </div>';
        html += '               <div class="vlist_text_box">';
        html += '                 <div class="text_title">';
        html += adultHtml + title;
        html += '                 </div>';
        html += '                 <div class="text_subtitle text_blue">';
        html += programTitle;
        html += '                 </div>';
        html += '                 <div class="text_play_count">';
        html += '                   <span class="ico_count">' + viewCount + '</span>';
        html += dateHtml;
        html += '                 </div>';
        html += '               </div>';
        html += '             </div>';
        html += '           </a>';
        html += '         </li>';
      }
    });

    html += '         </ul>';
    html += '       </div>';
    html += '     </div>';
    html += '   </div>';
  }

  $('.unifiedResultWrap').show().find('.result_page_wrap').append(html);
  if (liveData.length > 0 || series || clipData.length > 0) {
    var lastHtml = "";
    lastHtml += '   </div>';
    lastHtml += ' </div>';
    lastHtml += '</div>';
    $('.unifiedResultWrap').show().find('.result_page_wrap').append(lastHtml);
  }
}

var PlayerPageCommon = {
  videoType : ''
};

  var scrollConnector = true;

  function userLogin(text,returnWeb){
    $("#login_popup_wrap_area").empty();

    commonPopup(text,'');
    $("#login_popup_wrap_area").show();

    $(".popup_btn_close").click(function(){   $("#login_popup_wrap_area").hide();    });

    $("#login_popup_wrap_area .pop_wrap_inner .popup_footer .cancel").click(function(){   $("#login_popup_wrap_area").hide();    });

    $("#login_popup_wrap_area .pop_wrap_inner .popup_footer .find").click(function(){
      location.href = '/user/login?rw=' + encodeURIComponent("/v/"+ returnWeb);
    });
  }

  function purchasePopup(){

    if ( PlayerPageCustomEventAdder.next ) {

      playerSynopVodInfo.movePurchasePage( encodeURIComponent( PlayerPageCustomEventAdder.videoId ) );

    } else {

      $("#login_popup_wrap_area").empty();
      var comm_pop = "";

      comm_pop +="<div class='pop_wrap_inner ident'>";
      comm_pop +="  <div class='popup_header'>상품구매<a href='javascript:void(0);' class='popup_btn_close' title='팝닫기'>닫기</a></div>";
      comm_pop +="   <div class='popup_content'>";
      comm_pop +="    <div class='one_txt'>상품 구매 후 시청이 가능한 프로그램입니다.<br />선택하신 상품을 구매하시겠습니까?</div>";
      comm_pop +="  </div>";
      comm_pop +="  <div class='popup_footer'>";
      comm_pop +="    <button type='button' class='btn_default find'>확인</button>";
      comm_pop +="    <button type='button' class='btn_default cancel'>취소</button>";
      comm_pop +="  </div>";
      comm_pop +="</div>";

      $("#login_popup_wrap_area").append(comm_pop);

      $(".popup_btn_close").click(function(){
        $("#login_popup_wrap_area .pop_wrap_inner .popup_footer .cancel").trigger( 'click' );
      });
      $("#login_popup_wrap_area .pop_wrap_inner .popup_footer .cancel").click(function(){
        $("#login_popup_wrap_area").hide();
      });
      $("#login_popup_wrap_area .pop_wrap_inner .popup_footer .find").click(function(){
        if ( PlayerPageCommon.videoType == OksusuVideo.LIVE ) {
          if ( PlayerPageCustomEventAdder.fullscreen ) {
            playerSynopVodInfo.fullScreenPurchaseEvent(PlayerPageCustomEventAdder.videoId);
            $( '.voucher_sum' ).trigger( 'click' );
          } else {
            $( '.voucher_sum' ).trigger( 'click' );
          }
        } else if ( PlayerPageCommon.videoType == OksusuVideo.VOD || PlayerPageCommon.videoType == OksusuVideo.MOVIE ) {
          $( '.btn_buy' ).trigger( 'click' );
        }
      });
    }
  }

  function commonPopup(content, only){
    var comm_pop = "";

    comm_pop +="<div class='pop_wrap_inner ident'>";
    comm_pop +="<div class='popup_header'><a href='javascript:void(0);' class='popup_btn_close' title='닫기'>닫기</a></div>";
    comm_pop +="<div class='popup_content'>";
    comm_pop +="<p class='one_txt'>" + content + "</p>";
    comm_pop +="</div>";
    comm_pop +="<div class='popup_footer'>";
    comm_pop +="<button type='button' class='btn_default find'>확인</button>";
    if(only == ""){
      comm_pop +="<button type='button' class='btn_default cancel'>취소</button>";
    }
    comm_pop +="</div>";
    comm_pop +="</div>";

    $("#login_popup_wrap_area").append(comm_pop);
  }

  function replaceTitle(title, type){
    var check = title;
    var text;
    if(type == null || type == ''){
      if(check.length > 27){
        check = check.substr(0,27) + "...";
      }
    } else {
      if(check.length > 22){
        check = check.substr(0,22) + "...";
      }
    }

    text = playerCommon.titleTagReplace(check);

    return text;
  }

  function convertNumver(number){
    var convertNum = Number(number).toLocaleString('en').split(".")[0];
    return convertNum;
  }

  function convertNumverAddStr(number){
    var convertNum = '';

    if(parseInt(number) > 999 && parseInt(number) < 10000) {
      convertNum = '999+';
    } else if(parseInt(number) > 9999 && parseInt(number) < 1000000){
      convertNum = '9,999+';
    } else if(parseInt(number) >= 1000000){
      convertNum = '999,999+';
    } else {
      convertNum = Number(number).toLocaleString('en').split(".")[0];
    }

    return convertNum;
  }

  var personal = "", per_arr = [], arrDirector = [], arrCast = [], i, selectContentId, userInfo = [], usedDay;

  function convertDateYYYYMMDD(broadDay){
    var date = ''
    if (broadDay) {
      var temp = broadDay.substr(0, 8);
      var cyear = temp.substr(0, 4);
      var cmonth = temp.substr(4, 2);
      var cday = temp.substr(6, 8);
      date = cyear + "." + cmonth + "." + cday;
    }

    return date;
  }

  /**
   * 구매하기
   * @type {{purchase: product.purchase}}
   */
  var product = {
    purchase: function() {
      var contents_id = '';
      if ($('.buy_list li').length >= 1) {
        $('.buy_list li').each(function(){
          if ($(this).hasClass('on')) {
            contents_id = $(this).attr('add');
          }
        });
        if (contents_id) {
          location.href = "/bill/purchase/package?id_contents=" + contents_id + "&dsc=vod&rw=/v/"+contents_id;
        }
      } else {
        $('.btn_buy').trigger('click');
      }
      return false;
    }
  };

  var playerCommon = {

    etc : function(){

      $('.btn_share').click(function(e){
        e.preventDefault();
        e.stopPropagation();
      });

      $(document).click(function(){
        if($('.btn_share').hasClass('on')){
          $('.btn_share').removeClass('on');
        }
      });

      $(".btn_comment").click(function(e){
        scrollConnector = false;
        var height = $(document).height() - $(".comment_wrap").height();
        $('html, body').animate({
          scrollTop: height - 530
        }, 1000, 'easeInOutCubic', function(){
          scrollConnector = true;
        });
        e.preventDefault();
      });

      $(".btn_facebook").click(function (e){
        var url = encodeURIComponent( location.href );
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '', 'width=470, height=350' );
        e.preventDefault();
      });

      $(".btn_kakao").click(function (e){
        var url = encodeURIComponent( location.href );
        window.open( 'https://story.kakao.com/share?url=' + url, '', 'width=670, height=470' );
        e.preventDefault();
      });

      $("#share_copy_url_btn").attr( { 'data-clipboard-text' : location.href } );
      var copy = new Clipboard( $("#share_copy_url_btn")[ 0 ] );
      copy.on('success',function() {
        alert("주소를 복사했습니다.");
      });

      $('.video-mini-close').click(function(e){
        $( '.video-default.mini' ).hide();
        e.preventDefault();
      });

    },

    bandShare : function(title){
      var name = encodeURIComponent(title);
      var url = encodeURIComponent( location.href );
      window.open( 'http://www.band.us/plugin/share?body=' + name + '%0A' + url, '', 'width=900, height=1000' );
    },

    alreadyWatched : function(text){
      var already = "";
      $("#already_watched").empty();

      already += "<div class='toast_wrap_inner'>";
      already += "<p>" + text + "</p>";
      already += "</div>";

      $("#already_watched").append(already);
      $("#already_watched").stop( true ).delay( 400 ).fadeIn( 600 ).delay( 1000 ).fadeOut( 600 );
    },

    playListAutoScroll : function(area, type){
      var check;
      if(!type){
        if (area.position()) {
          check = area.position().top - $('.tabs').height();
          $(".tab_cnt.tab_cnt01 ul").scrollTop(check);
        }
      } else if(type == 'movie'){
        if ($('#movie_vlist_area_hot li.already').length) {
          check = $('#movie_vlist_area_hot li.already').position().top - $('.video_channel_list h4').height();
          $('.movie_vlist_wrap ul').scrollTop(check);
        }
      } else if(type == 'broad'){
        check = area.position().top - $('.tabs').height() - $(".sort_view").height() - 28;
        $(".tab_cnt.tab_cnt01 ul").scrollTop(check);
      } else if(type == 'live'){
        check = area.position().top - $('.tabs').height() - 15;
        $(".tab_cnt.tab_cnt01 ul").scrollTop(check);
      }
    },

    storyViewToggle : function(e){
      var check_val = $(".meta_info_summary").hasClass("on");
      if(!check_val){
        $('#casting_list').parent().addClass('active');
        $(".meta_info_summary").addClass("on");
      } else {
        $('#casting_list').parent().removeClass('active');
        $(".meta_info_summary").removeClass("on");
      }
      e.preventDefault();
    },

    checkedBookMark : function(type, contentId){
      if(type == 'IPTV'){
        $.ajax({
          url: "/api/my/bookmark/list",
          data: {
            group: type,
            supplyArchive : 1,
            curPage:1,
            pageSize:1000
          },
          type: "get",
          cache:false,
          success : function(result){
            var tmp = result.bookmark;
            if(result.bookmark !== null){
              for(var i = 0 ; i < tmp.length ; i++){
                if(contentId == tmp[i].svc_id){
                  $(".btn_bookmark").addClass("on");
                  break;
                }
              }
            }
            $(".btn_bookmark").click(function (){
              playerCommon.bookMarkToggle(contentId, type);
            });
          }

        });

      } else {
        $.ajax({
          url: "/api/my/bookmark/list",
          data: {
            group: "VOD",
            section: type,
            curPage: 1,
            pageSize: 1000
          },
          type: "get",
          cache: false,
          success : function(result){
            var tmp = result.bookmark;
            if(result.bookmark !== null){
              for(var i = 0 ; i < tmp.length ; i++){
                if(contentId == tmp[i].con_id){
                  $(".btn_bookmark").addClass("on");
                  break;
                }
              }
            }
            $(".btn_bookmark").click(function (){
              playerCommon.bookMarkToggle(contentId, type);
            });
          }
        });
      }
    },

    bookMarkToggle : function(contentId, type){

      if(!User.isLogin){
        userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?", contentId);
      } else {
        if ($(".btn_bookmark").hasClass("on")) {
          playerCommon.bookMarkCancel(contentId, type);
        }else{
          playerCommon.bookMarkInsert(contentId, type);
        }
      }
    },

    bookMarkCancel : function(contentId, type) {
      if (type == 'IPTV') {
        $.ajax({
          url: "/api/my/bookmark/cancel",
          data: {
            group: type,
            svcId: contentId,
            deleteNum: "1"
          },
          type: "get",
          cache: false,
          success: playerCommon.cancelBookMarkSuccess
        });
      } else {
        $.ajax({
          url: "/api/my/bookmark/cancel",
          data: {
            contentId: contentId,
            group: "VOD",
            price: 1000,
            section: type,
            deleteNum: "1"
          },
          type: "get",
          cache: false,
          success: playerCommon.cancelBookMarkSuccess
        });
      }
    },

    cancelBookMarkSuccess : function(result){
      if (result.result == "OK") {
        $(".btn_bookmark").removeClass("on");
        playerCommon.alreadyWatched( '즐겨찾기가 취소되었습니다.' );
      } else {
        playerCommon.alreadyWatched( '즐겨찾기 취소에 실패했습니다.' );
      }
    },

    bookMarkInsert : function(contentId, type) {
      if (type == 'IPTV') {
        $.ajax({
          url: "/api/my/bookmark/insert",
          data: {
            group: type,
            serviceId: contentId,
            supplyArchive: "1"
          },
          type: "get",
          cache: false,
          success: playerCommon.insertBookMarkSuccess
        });
      } else {
        $.ajax({
          url: "/api/my/bookmark/insert",
          data: {
            contentId: contentId,
            group: "VOD",
            price: 1000,
            section: type
          },
          type: "get",
          cache: false,
          success: playerCommon.insertBookMarkSuccess
        });
      }
    },

    insertBookMarkSuccess : function(result){
      if(result.result == "OK"){
        $(".btn_bookmark").addClass("on");
        playerCommon.alreadyWatched( '즐겨찾기가 완료되었습니다.' );
      } else {
        playerCommon.alreadyWatched( '즐겨찾기 등록에 실패했습니다.' );
      }
    },

    titleDotReplace : function(type){
      if(type == 'cliptovod'){
        $('.vlist_contents_wrap .contents_info_box .info_title').dotdotdot({
          wrap: 'letter',
          height  : null,
          tolerance : 0
        });
      } else {
        $('.list_thumb_info .list_info_box .list_title').dotdotdot({
          wrap: 'letter',
          height  : null,
          tolerance : 0
        });
      }

    },

    titleTagReplace : function(title){
      var text;
      text = title.replace(/'/g,"&#39;").replace(/"/g,"&#34;").replace(/ /g,"&#32;").replace(/</g,"&#60;").replace(/>/g, "&#62;").replace(/"/g,"&#34;");
      return text;
    }
  };

  var playerSynopVodInfo = {

    checked : '',

    vodCastingInfoGrid : function(str){
      if (str.c_info_list != null) {
        personal = playerSynopVodInfo.personInfo(str.c_info_list);
        if (personal != undefined) {
          per_arr = personal.split(":::::");
          if (per_arr[0].indexOf("<dt>감독</dt>") != -1) {
            arrDirector = per_arr[0].split("^&*()");
            if (arrDirector) {
              for (i = 0; i < arrDirector.length; i++) {
                if (arrDirector[i] != "") {
                  if (i == 0 || i == arrDirector.length - 1) {
                    $("#director_list").append(arrDirector[i].replace("<dt>감독</dt>", ""));
                  } else {
                    $("#director_list").append(arrDirector[i].replace("<dt>감독</dt>", "") + ", ");
                  }
                }
              }
            } else {
              playerSynopVodInfo.memberInfo(str, 'director');
            }
          } else if($("#director_list").text() == '' || $("#director_list").text() == null) {
            playerSynopVodInfo.memberInfo(str, 'director');
          }

          if (per_arr[1].indexOf("<dt>출연</dt>") != -1) {
            arrCast = per_arr[1].split("^&*()");
            if (arrCast) {
              for (i = 0; i < arrCast.length; i++) {
                if (i == 0 || i == arrCast.length - 1) {
                  $("#casting_list").append(arrCast[i].replace("<dt>출연</dt>", ""));
                } else {
                  $("#casting_list").append(arrCast[i].replace("<dt>출연</dt>", "") + ", ");
                }
              }
            } else {
              playerSynopVodInfo.memberInfo(str, 'starr');
              return false;
            }
          } else if($("#casting_list").text() == '' || $("#casting_list").text() == null) {
            playerSynopVodInfo.memberInfo(str, 'starr');
            return false;
          }
        } else {
          playerSynopVodInfo.memberInfo(str, 'all');
          return false;
        }
      } else {
        playerSynopVodInfo.memberInfo(str, 'all');
        return false;
      }

    },

    memberInfo : function (str, type) {
      if(type == 'director'){
        if (str.director) {
          $("#director_list").append(str.director);
        } else {
          $("#director_list").parent('dl').hide();
        }
      }

      if(type == 'starr') {
        if (str.starr) {
          $("#casting_list").append(str.starr);
        } else {
          $("#casting_list").parent('dl').hide();
        }
      }

      if(type == 'all'){
        if (str.director) {
          $("#director_list").append(str.director);
        } else {
          $("#director_list").parent('dl').hide();
        }

        if (str.starr) {
          $("#casting_list").append(str.starr);
        } else {
          $("#casting_list").parent('dl').hide();
        }

      }
    },

    personInfo : function(str){

      if(str[0] != undefined){
        var perId = "", name = "", title = "", director = "", casting = "";
        for(var i = 0 ; i < str.length ; i++){
          title = str[i].c_title;
          for(var j = 0 ; j < str[i].value_list.length ; j++){
            perId = str[i].value_list[j].person_id;
            name = str[i].value_list[j].value;
            if(title == "감독" && name != null){
              director += "^&*()";
              director +="<dt>감독</dt>";
              //director +="<a href='javascript:;' class='text_link' person='" + perId + "'> " + name + " </a>&nbsp;";
              director += name;
            }

            if(title == "출연" || title == '배우' && name != null){
              casting += "^&*()";
              casting +="<dt>출연</dt>";
              //casting +="<a href='javascript:;' class='text_link' person='" + perId + "'> " + name + " </a>&nbsp;";
              casting += name;
            }
          }
        }
        return director + ":::::" + casting;
      }
    },

    vodSalesComment : function(str){

      var saleComment = str.sales_cmts;
      if(saleComment != null){
        $('.event_category').append('[' + saleComment.sales_title + ']');
        $('.text_info_detail').append(saleComment.sales_text);
        if(saleComment.sales_call_url != null){
          $('.link_event').attr('href',saleComment.sales_call_url);
          $('.link_event').show();
        }
        $('.meta_event_wrap').show();

        if($('.text_info_detail').outerHeight() > 40) {
          $('.text_info_detail').css('height', '40px');
          $('.meta_event_wrap .btn_sales_more').show();
        }

        $('.meta_event_wrap .btn_sales_more').click(function(e){
          if($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.text_info_detail').css('height', '40px');
          } else {
            $(this).addClass('on');
            $('.text_info_detail').css('height', 'auto');
          }
          e.preventDefault();
        });
      }
    },

    vodFreeComment : function(str, tmpCostDate){

      var salePrice = convertNumver(str.schd_sale_prc);
      var convertChangeDay = tmpCostDate.substr(0,12);
      var convertDay = convertChangeDay.substr(0,4) + "." + convertChangeDay.substr(4,2) + "." + convertChangeDay.substr(6,2)
          + "&nbsp;&nbsp;" + convertChangeDay.substr(8,2) + ":" + convertChangeDay.substr(10,2);
      $('.change_cost_day').prepend(convertDay);
      $('.buy_info_notice .text_status').append(' ' + salePrice + '원');
    },

    useDiveceDataInfo : function(str){

      var use_item = "";
      var dv = str.prd_device;
      var size = str.etc[0].split(", ");
      var sd = size[0].split(" ");

      var hd;
      if(size[1] != null){
        hd = size[1].split(" ");
      }

      use_item += "<dt>이용기기</dt>";
      use_item += " <dd>";
      if(dv.indexOf("B tv") > -1){
        use_item += "   <span class='ico_btv'>(TV 시청), </span>";
        use_item += dv.replace(", B tv(IPTV)", "");
      } else {
        use_item += dv;
      }
      use_item += " </dd>";

      if(size[1] !== undefined && size[0] !== undefined || size[0] !== ""){
        use_item += "<dt>이용화질</dt>";
        use_item += " <dd>";

        if(size[1] !== undefined){
          use_item += "<em>" + hd[0] + "</em>" + hd[1] + ", ";
        }
        if(size[0] !== undefined && size[0] !== ""){
          use_item += "<em>" + sd[0] + "</em>" +sd[1];
        }
        use_item += " </dd>";
      }

      $("#use_item_definition_area").append(use_item);
    },

    watchInfo : function (str, type) {
      var openDay = "", watch_level, days = '';

      switch (type) {
        case 'vod' :
          days = str.ddayTelevise;
          break;
        case 'mov' :
          days = str.dd_showing;
          break;
      }

      var watch = str.level;
      if(watch == 0) {
        watch_level = "전체관람가";
      } else {
        watch_level = watch + "세 이상 관람가";
      }

      if(days && days != 'null') {
        switch (type) {
          case 'vod' :
            openDay += "    <strong>방영일</strong>" + days.substr(0, 4) + "." + days.substr(4, 2) + "." + days.substr(6, 2) + '('+OksusuCard.getDayOfWeek(days.substring(0,8))+')';
            break;
          case 'mov' :
            openDay += "    <strong>개봉일</strong>" + days.substr(0, 4) + "." + days.substr(4, 2) + "." + days.substr(6, 2) + '('+OksusuCard.getDayOfWeek(days.substring(0,8))+')';
            break;
        }
      }
      $(".text_data").append(openDay);
      $(".watch_level").append(watch_level);

    },
//----------------------------
    checkPurchaseSelecBox : function (str){
      if(str.matl_sts_cd != '80' && (str.contents_list != null && str.contents_list.length > 1)) {
        var buy_ment = "";

        buy_ment += "<div class='sel_type_wrap buy_select'>";
        buy_ment += " <div class='buy_select date_select'>";
        buy_ment += "   <button type='button' class='btn text_buy_info text_date'>";
        buy_ment += "     <span class='text_item'><strong></strong></span>";
        buy_ment += "     <span class='text_right_box'>";
        buy_ment += "       <span class='text_status'></span>";
        buy_ment += "     </span>";
        buy_ment += "   </button>";
        buy_ment += "   <ul class='buy_list date_list'>";
        if (str.contents_list != null) {
          if (str.contents_list.length > 1) {
            buy_ment += playerSynopVodInfo.gridPurchaseList(str);
          } else {
            buy_ment = '';
          }
        } else {
          buy_ment = '';
        }
        buy_ment += "   </ul>";
        buy_ment += " </div>";
        buy_ment += "</div>";

        $(".buy_type_info").prepend(buy_ment);
        playerSynopVodInfo.selectBoxAdderEvent();

        if ($('.buy_list li a .text_status.finish').length >= 1) {
          var selectBoxArr = [], lastPur, selected;
          $('.buy_list li a .text_status.finish').each(function () {

            if ($(this).attr('pday') !== 'null') {
              selectBoxArr.push($(this).attr('pday'));
            }
          });
          lastPur = selectBoxArr.sort().pop();
          $('.buy_list li a .text_status.finish').each(function () {
            selected = $(this).attr('pday');

            if (lastPur == selected) {
              $(this).parents('.buy_list li a').trigger('click');
              var service = $(this).parents('.buy_list li a').find('.buy_type_box .text_right_box .text_status').text();
              playerSynopVodInfo.convertSelectItemMent(service);
              playerSynopVodInfo.girdPurChaseButton(str);

            }
          });
        } else {
          $('.buy_list li a').first().trigger('click');
          var service = $('.buy_list li.on a').first().find('.buy_type_box .text_right_box .text_status').text();
          playerSynopVodInfo.convertSelectItemMent(service);
          playerSynopVodInfo.girdPurChaseButton(str);
          selectContentId = $('.buy_list li.on').attr('add');
        }

        $('.buy_list li a').click(function () {
          var finish = $('.btn.text_buy_info.text_date.selected .buy_type_box .text_right_box .text_status.finish').text();
          var type = $('.btn.text_buy_info.text_date.selected .buy_type_box .text_item').text();
          var service = $(this).find('.buy_type_box .text_right_box .text_status').text();
          var costComment = '';

          // 일반,소장용 등 구매방식 변경에 따른 시청등급 변경
          var watch = 0;
          var watch_level = "";

          for (var i = 0; i < str.contents_list.length; i++) {
            if (str.contents_list[i].product_nm === type) {
              watch = str.contents_list[i].level;

              if (watch == 0) {
                watch_level = "전체관람가";
              } else {
                watch_level = watch + "세 이상 관람가";

                // 비로그인 - 로그인페이지 호출
                if (!User.isLogin && watch >= 19) {
                  location.href = '/user/login?rw=' + encodeURIComponent("/v/" + str.con_id);
                  return false;
                }
                // 미성인(본인인증 안한사람) - 본인인증 페이지 호출
                if (!User.isMemberAuth && watch >= 19) {
                  Popup.move('popupCheckMe', '/user/check/me');
                  return false;
                }
                // 미성년(본인인증 한 사람),비성인(본인인증했을시 미성년이고 현재 성인인 경우) - 자동성인인증 페이지 호출(미성년 자동성인증 실패 / 비성인(성인) 자동성인인증 성공)
                if (!User.isAdult && watch >= 19) {
                  Popup.move('popupCheckAdult', '/user/check/adult');
                  return false;
                }
                // 등급제한설정자 - 등급제한 설정 팝업 호출
                if (User.watchLevel !== 'N' && watch >= 19) {
                  if ($.cookie('popupRestrictView') != 'Y') {
                    if (!User.isAdult) {
                      $('.buy_list li a').first().trigger('click');
                      Popup.show('popupRestrictView', '', '', 'detailSynopsis');
                      return false;
                    }
                  }
                }
              }
            }
          }
          selectContentId = $(this).parent().attr('add');
          if (str.matl_sts_cd != '80') {
            if (finish == '') {
              $(".btn_buy").removeClass('disabled');
              if ($(this).attr('svod') == 'Y') {
                playerSynopVodInfo.girdPurChaseButton(str);
              } else {
                if (service == '서비스 중지') {
                  playerSynopVodInfo.girdPurChaseButton(str);
                } else {
                  costComment = playerSynopVodInfo.convertCostButton($(this).attr('add'), $(this).attr('adder'));
                  $('.btn_buy').html(costComment);
                  if (type.indexOf('소장용') > -1) {
                    $(".buy_result_text.org").html("구매 후 바로보기 무제한");
                  } else {
                    var usedDay = '10';
                    if(str.purchase_validity_time == '9999'){
                      $.ajax({
                        url: "/api/vod/content/info",
                        type: "get",
                        data : {
                          contentId : $('.buy_list li.on').attr('data-conid')
                        },
                        cache: false,
                        success: function (result) {
                          usedDay = result.content.purchase_validity_time;
                          $(".buy_result_text.org").html("구매 후 바로보기<em class='normal'>" + usedDay + "일</em>");
                        }
                      });
                    } else {
                      usedDay = str.purchase_validity_time;
                      $(".buy_result_text.org").html("구매 후 바로보기<em class='normal'>" + usedDay + "일</em>");
                    }

                  }
                  $(".buy_result_text.divLine").hide();
                  $(".watch_level").html(watch_level);
                }
              }
            } else {
              $(".btn_buy").removeClass('disabled');
              playerSynopVodInfo.girdPurChaseButton(str);
            }
          }
          playerSynopVodInfo.convertSelectItemMent(service);
        });
        playerSynopVodInfo.checkRecommendTicket(str, 'vod');
      } else {

        playerSynopVodInfo.girdPurChaseButton(str);
        playerSynopVodInfo.checkRecommendTicket(str, 'vod');
      }
    },

    gridPurchaseList : function( str ) {
      var tmp = str.contents_list;
      var purlist = '', btv;
      var price, salePrice, basePrice, contentId;
      var purchasedInfo;

      for(var i = 0 ; i < tmp.length ; i++){
        price = convertNumver(tmp[i].pri);
        salePrice = convertNumver(tmp[i].sale_pri);
        contentId = encodeURIComponent(tmp[i].con_id);

        if(price == 0) {     price = '';   }
        if(salePrice == 0) {    salePrice = '';   }
        basePrice = price;
        if(basePrice == ''){  basePrice = salePrice; }

        if(tmp[i].purchase_info_cd == '3'){
          if(tmp[i].nm_product){
            btv = '2';
          } else {
            btv = '1';
          }
        }

        purlist += " <li add='" + contentId + "' data-conid='" + tmp[i].con_id + "'>";
        purlist += "   <a href='javascript:;' add='" + tmp[i].pri + "' adder='" + tmp[i].sale_pri + "' svod='" + tmp[i].svod_yn + "'>";
        purlist += "     <div class='buy_type_box' >";
        purlist += "       <span class='text_item'><strong>" + tmp[i].product_nm +"</strong></span>";
        purlist += "       <div class='text_right_box'>";

        if(tmp[i].purchase_yn != "Y"){
          if(price != '' && salePrice != '' && tmp[i].svod_yn != 'Y'){
            purlist += "<span class='text_sale'>" + price + "원</span>";
            purlist += "<span class='text_status'>" + salePrice + "원</span>";
          } else if (basePrice == '' || str.matl_sts_cd == '80') {
            //purlist += "         <span class='text_status normal'>무료</span>";
          } else if(tmp[i].purchase_info_cd == '9'){
            purlist += "         <span class='text_status normal' pnm = 'stop'>서비스 중지</span>";
          } else if(tmp[i].svod_yn == 'Y'){
            purlist += "         <span class='text_status normal' pnm = 'svod'>이용권 전용</span>";
          } else {
            purlist += "         <span class='text_status normal'>" + basePrice + "원</span>";
          }
        }

        if(tmp[i].purchase_yn == "Y"){
          purchasedInfo = tmp[i];
          if(tmp[i].purchase_info_cd == '2' || btv == '2') {
            if (tmp[i].nm_product.indexOf('SK') != -1) {
              purlist += "         <span class='text_status finish' pday = '" + tmp[i].purchase_dt + "' pnm = '2' nmproduct = '" + tmp[i].nm_product + "'>무료시청</span>";
            } else {
              purlist += "         <span class='text_status finish' pday = '" + tmp[i].purchase_dt + "' pnm = '2' nmproduct = '" + tmp[i].nm_product + "'>시청가능</span>";
            }
          } else if(tmp[i].purchase_info_cd == '0'){
            purlist += "         <span class='text_status finish' pday = '" + tmp[i].purchase_dt + "' pnm = '0'>무료시청</span>";
          } else {
            purlist += "         <span class='text_status finish' pday = '" + tmp[i].purchase_dt + "' pnm = '1' pdayto='" + tmp[i].wat_to_dt+ "'>구매완료</span>";
          }
        }

        purlist += "       </div>";
        purlist += "     </div>";

        if(tmp[i].lite_yn == 'Y'){
          purlist += "    <p class='text_detail'>oksusu 안심팩 무비월정액 가입 시 무료</p>";
        } else if(tmp[i].skt_benefit_yn == 'Y') {
          purlist += "    <p class='text_detail'>SKT 전용관 가입 시 무료</p>";
        }

        purlist += "   </a>";
        purlist += " </li>";
      }

      return purlist;
    },

    girdPurChaseButton : function(str){
      var selectedItem = '';
      if($('.buy_list li.on a .text_status').attr('pnm') || userInfo.ver == '1.0'){
        selectedItem =  $('.buy_list li.on a .text_status').attr('pnm');
        usedDay = str.purchase_validity_time || 10;
        $(".buy_result_text.divLine").show();
        if(selectedItem == 'stop' || userInfo.purchase_info_cd == '9' || userInfo.result == '90006') {
          playerSynopVodInfo.checkPurChaseButton('stop', str);
        } else if(str.yn_fre == 'Y' || userInfo.purchase_info_cd == '0' || selectedItem == '0'){
          playerSynopVodInfo.checkPurChaseButton('free', str);
        } else if(userInfo.purchase_info_cd == '1' || selectedItem == '1'){
          playerSynopVodInfo.checkPurChaseButton('ppv', str);
        } else if(userInfo.purchase_info_cd == '2' || selectedItem == '2'){
          playerSynopVodInfo.checkPurChaseButton('ppm', str);
        } else if(selectedItem == 'svod' || userInfo.svod_yn == 'Y'){
          playerSynopVodInfo.checkPurChaseButton('svod', str);
        } else {
          playerSynopVodInfo.checkPurChaseButton('button', str);
        }

        $('.btn_buy').click(function(e) {
          if($(this).text() == '바로보기') {
            OksusuVideo.playing.start();
            return false;
          } else if($(this).text() == '서비스 중지'){
            return false;
          } else if($(this).text() != '바로보기' && $(this).text() != '서비스 중지' && !User.isLogin){
            userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?", str.con_id);
          } else if(allowIp == 'N') {
            CommonPopupWithHeader.open('오류안내', '저작권자의 요청에 의해 해외에서는 구매 및 시청이 제한됩니다.');
          } else if($(this).text() == '이용권 구매'){
            $('.voucher_sum').trigger('click');
          } else {
            var conId = (selectContentId) ? selectContentId : location.pathname.split('/').pop();
            playerSynopVodInfo.movePurchasePage( conId );
          }
          e.preventDefault();
        });
      } else {
        playerSynopVodInfo.noneTotalSynop(str);
      }
    },

    noneTotalSynop : function(str){
      $.ajax({
        url: "/api/bill/purch/vod",
        data: {
          contentId: str.con_id
        },
        type: "post",
        success: function (result) {
          userInfo = result;
          playerSynopVodInfo.girdPurChaseButton(str);
        }
      });
    },

    checkPurChaseButton : function( type, str ) {
      $(".buy_result_text.divLine").show();
      switch ( type ){
        case 'stop' :
          $(".btn_buy").addClass('disabled').html('서비스 중지');
          $(".buy_result_text.org").html('서비스 중지로 인해 시청이 불가한 상품입니다.');
          $(".buy_result_text.divLine").hide();
          playerSynopVodInfo.convertSelectItemMent('서비스 중지');
          break;
        case 'free' :
          $(".btn_buy").removeClass('disabled').html('바로보기');
          $(".buy_result_text.org").html('무료시청');
          $(".buy_result_text.divLine em").addClass('normal').html('바로보기 무제한');
          break;
        case 'ppv' :
          $('.buy_info_notice dl').hide();
          var yymmdd = userInfo.wat_to_dt || $('.buy_list li.on a .text_status.finish').attr('pdayto');

          var useDate = yymmdd.substr(0, 4) + '.' + yymmdd.substr(4, 2) + '.'
              + yymmdd.substr(6, 2) + '&nbsp;&nbsp;' + yymmdd.substr(8, 2) + ':' + yymmdd.substr(10, 2) + '까지';
          $(".btn_buy").removeClass('disabled').html('바로보기');
          $(".buy_result_text.org").html('구매완료');
          var type = $('.btn.text_buy_info.text_date.selected .buy_type_box .text_item').text();
          if(yymmdd.substr(0, 4).indexOf('204') != -1 || type.indexOf('소장용') > -1 ){
            $(".buy_result_text.divLine em").addClass('normal').html('바로보기 무제한');
          } else {
            $(".buy_result_text.divLine em").removeClass('normal').html(useDate);
          }
          break;
        case 'ppm' :
          var productName = userInfo.nm_product || $('.buy_list li.on a .text_status.finish').attr('nmproduct');
          $('.buy_info_notice dl').hide();
          $(".btn_buy").removeClass('disabled').html('바로보기');
          $(".buy_result_text.org").html('시청가능');
          $(".buy_result_text.divLine em").addClass('normal').html(productName);
          break;
        case 'svod' :
          $(".btn_buy").html('이용권 구매');
          $(".buy_result_text.org").html('이용권 전용');
          $(".buy_result_text.divLine").hide();
          break;
        case 'button' :
          var cost = playerSynopVodInfo.convertCostButton(str.pre_sale_prc, str.sale_prc);
          $(".btn_buy").html(cost);
          if(usedDay == '9999'){
            $(".buy_result_text.org").html("구매 후 바로보기 무제한");
          } else {
            $(".buy_result_text.org").html("구매 후 바로보기<em class='normal'>" + usedDay + "일</em>");
          }
          $(".buy_result_text.divLine").hide();
          break;
      }
    },

    movePurchasePage : function ( conId ) {
      location.href = "/bill/purchase/package?id_contents=" +  conId  + "&dsc=vod&rw=/v/"+ conId;
    },

    convertCostButton : function(origin, sale){
      var salePrice, price;

      price = convertNumver(origin);
      salePrice = convertNumver(sale);

      if(price == 0) {     price = '';   }
      if(salePrice == 0) {    salePrice = '';   }

      var buy_menu = '';
      if (price == "" && salePrice == "") {
        buy_menu = "바로보기";
      } else if (price != "" && salePrice != "") {
        buy_menu = '<em>' + price + '원</em> ' + salePrice + '원';
      } else if (price != "" && salePrice == "") {
        buy_menu = price + '원';
      } else if(price == "" && salePrice != ""){
        buy_menu = salePrice + '원';
      }

      return buy_menu;
    },

    convertSelectItemMent : function(service){
      if(service == '서비스 중지'){
        playerSynopVodInfo.contentsStatusStopEvent('stop');
      } else {
        if(playerSynopVodInfo.checked != 'hide'){
          playerSynopVodInfo.contentsStatusStopEvent('start');
        }

      }
      $('.buy_select .date_select .selected .text_right_box .text_sale').hide();
      $('.buy_select .date_select .selected .text_right_box .text_status').removeClass('finish').addClass('normal').html('상품선택');
    },

    selectBoxAdderEvent : function() {
      var select_root = $(".date_select");
      var select_value = $(".date_select button");
      var select_a = $(".date_select>ul>li>a");
      var select_b = $(".buy_type_info .buy_select>ul>li>a");

      // Line
      select_value.bind("focusin",function(){$(this).addClass("outLine")});
      select_value.bind("focusout",function(){$(this).removeClass("outLine")});

      // Show
      function show_option(){
        $(this).parents(".date_select:first").toggleClass("open");
      }

      // Hide
      function hide_option(){
        var select_hide = $(this);
        setTimeout(function(){
          select_hide.parents(".date_select:first").removeClass("open");
        }, 1);
      }

      // Set Anchor
      function set_anchor(){
        var set_selected = $(this).text();

        $(this).parents("ul:first").prev(".text_date").text("").append(set_selected);
        $(this).parents("ul:first").prev(".text_date").addClass("selected");
        $(this).parent("li").addClass("on");
        $(".date_select li a").not($(this)).parent("li").removeClass("on");
      }

      function set_anchor_sel(){
        var set_selected = $(this).html();

        $(this).parents("ul:first").prev(".text_date").text("").append(set_selected);
        $(this).parents("ul:first").prev(".text_date").addClass("selected");
        $(this).parent("li").addClass("on");
        $(".date_select li a").not($(this)).parent("li").removeClass("on");
      }

      // Anchor Focus Out
      $("*:not('.date_select a')").focus(function(){
        $(".date_list").parent(".date_select").removeClass("open");
      });

      select_value.click(show_option);
      select_root.removeClass("open");
      select_root.mouseleave(function(){$(this).removeClass("open")});
      select_a.click(set_anchor).click(hide_option);
      select_b.click(set_anchor_sel).click(hide_option);
    },
//-------------------------------
    checkRecommendTicket : function(str, type){
      if(type == 'vod'){
        $.ajax({
          url: "/api/bill/purch/ticket",
          data: {
            dsc : 'vod',
            contentId: str.con_id
          },
          type: "post",
          success: function (result) {
            if(result.recom_prod != null){
              var contentId = str.con_id.replace('{','%7B').replace('}','%7D');
              playerSynopVodInfo.gridRecommendTicket(result, contentId);
            }
          }
        });
      } else {
        $.ajax({
          url: "/api/bill/purch/ticket",
          data: {
            dsc : 'iptv',
            serviceId: str
          },
          cache: false,
          type: "post",
          success: function (result) {
            if (result.recom_prod != null || result.recom_lite != null) {
              playerSynopVodInfo.gridRecommendTicket(result, str);
            }
          }
        });
      }
    },

    gridRecommendTicket : function (result, id) {
      var i, recommProd = '', band = '', baseTicket, bandTicket;
      baseTicket = result.recom_prod;
      bandTicket = result.recom_lite;
      if(baseTicket != null && baseTicket.length > 0){
        for(i in baseTicket){
          recommProd += '<div class="voucher_wrap" add=' + baseTicket[i].prd_typ_cd + '>';
          recommProd += ' <div class="voucher_inner" add=' + baseTicket[i].id_product + '>';
          recommProd += '   <span class="voucher_category">이용권추천</span>';
          recommProd += '   <span class="voucher_title">' + baseTicket[i].nm_product + '</span>';
          recommProd += '   <span class="voucher_subtitle">' + baseTicket[i].prod_desc + '</span>';
          recommProd += '   <span class="voucher_sum">' + convertNumver(baseTicket[i].prd_amt) + '원</span>'
          recommProd += ' </div>';
          recommProd += '</div>';
        }
        $('.voucher_wrap_area').append(recommProd);
      }

      if(bandTicket != null && bandTicket.length > 0){
        for(i in bandTicket){
          band += '<div class="voucher_wrap" add=' + bandTicket[i].prd_typ_cd + '>';
          band += ' <div class="voucher_inner" add=' + bandTicket[i].id_product + '>';
          band += '   <span class="voucher_category">이용권추천</span>';
          band += '   <span class="voucher_title">' + bandTicket[i].nm_product + '</span>';
          band += '   <span class="voucher_subtitle">' + bandTicket[i].prod_desc + '</span>';
          band += '   <span class="voucher_sum">' + convertNumver(bandTicket[i].prd_amt) + '원</span>'
          band += ' </div>';
          band += '</div>';
        }
        $('.voucher_wrap_area').append(band);
      }

      $('.voucher_sum').click(function(){
        if(!User.isLogin){
          userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?", id);
        } else {
          var prdCd = $(this).parents('.voucher_wrap').attr('add');
          var prdId = $(this).parents('.voucher_inner').attr('add');
          location.href = "/bill/purchase/package?prd_typ_cd=" + prdCd + "&id_product=" + prdId + "&acc_cd=guide&rw=/v/" + id;
        }
      });

    },

    fullScreenPurchaseEvent : function(videoId){
      $.ajax({
        url: "/api/bill/purch/ticket",
        data: {
          dsc : 'iptv',
          serviceId: videoId
        },
        cache: false,
        type: "post",
        success: function (result) {
          var prdCd = '', prdId = '';
          if(result.recom_prod != null){
            prdCd = result.recom_prod[0].prd_typ_cd;
            prdId = result.recom_prod[0].id_product;
            location.href = "/bill/purchase/package?prd_typ_cd=" + prdCd + "&id_product=" + prdId + "&acc_cd=guide&rw=/v/" + videoId;
          } else if (result.recom_lite != null){
            prdCd = result.recom_lite[0].prd_typ_cd;
            prdId = result.recom_lite[0].id_product;
            location.href = "/bill/purchase/package?prd_typ_cd=" + prdCd + "&id_product=" + prdId + "&acc_cd=guide&rw=/v/" + videoId;
          }

        }
      });
    },

    contentsStatusStopEvent : function(type) {
      if (type == 'stop') {
        $(".btn_bookmark").hide();
        $("#share_info_wrap_list_area_parent").hide();
      } else if (type == 'start') {
        $(".btn_bookmark").show();
        $("#share_info_wrap_list_area_parent").show();
      }
    }
  };

  var playerRecommendList = {

    recommendVod: function (option) {
      var url = '';
      if (option.type == 'movie') {
        url = '/api/vod/cast/movie';
      } else {
        url = '/api/vod/cast/broad';
      }

      $.ajax({
        url: url,
        data: {
          synopsisYn: option.synopsisYn,
          curCount: option.curCount,
          reqCount: option.reqCount,
          lastContentsId: option.lastContentsId,
          genreCode: option.lastContentsId,
          seriesId: option.seriesId,
          programId: option.programId,
          typeCode: option.typeCode,
          gender: option.gender,
          ageGroup: option.ageGroup
        },
        type: "get",
        cache: false,
        success : playerRecommendList.success
      });
    },

    recommendLive : function( option ){
      $.ajax({
        url: "/api/vod/cast/live",
        data: {
          synopsisYn: option.synopsisYn,
          genreCode: option.genreCode,
          serviceId: option.serviceId,
          programId: option.programId,
          curCount: option.curCount,
          reqCount: option.reqCount,
          typeCode : option.typeCode,
          gender : option.gender,
          ageGroup : option.ageGroup
        },
        type: "get",
        cache:false,
        success : playerRecommendList.success
      });
    },

    success : function( result ){
      if (result.grids !== null && result.grids !== undefined) {
        tmp = result.grids;
        if (tmp[0] !== null && tmp[0] !== undefined) {
          $("#cardSection").show();
          var i;
          var cardTypCd;
          var cardNum;
          for (i = 0; i < tmp.length; i++) {
            $('#cardSection').append('<div id="CardNum' + i + '"></div>');
            cardTypCd = tmp[i].card_typ_cd.substr(0, 10);
            cardNum = Oksusu.CardProp.CardType[cardTypCd];
            try {
              Oksusu.Card['putCardType' + cardNum]('#CardNum' + i, tmp[i], User.isAdult);
            } catch (e) {
              log(e);
            }
          }
          dotdotdotForMovie();
        }
      }
    }
  };

  var playerClip = {

    checkClipToVod : function(contentId){
      if(contentId == '') {
        playerClip.hideClipToVod();
      } else {
        playerClip.girdClipToVod(contentId);
      }
    },

    hideClipToVod : function(){
      $('.vlist_contents_wrap').hide();
      $('.tab_wrap').addClass('no_clip');
    },

    girdClipToVod : function(contentId){
      var dDay = '', vodInfo = '';
      $.ajax({
        url: "/api/vod/" + contentId,
        type: "get",
        cache:false,
        success: function (result) {
          if(result.content !== null){

            var tmp = result.content;
            var link = OksusuCard.getLink(tmp);
            var img = tmp.pstr_path.replace(":type","140_180");
            var title = tmp.title;
            var seqTitle = '';

            if(tmp.seq_no){
              seqTitle = tmp.seq_no;
              title = title + '(' + seqTitle + '회)';
            }

            dDay = tmp.ddayShowing;
            if(dDay == null){
              dDay = tmp.dd_televise;
            }

            var date = convertDateYYYYMMDD(dDay);

            vodInfo += "<div class='poster_img'>";
            vodInfo += "  <img src=" + img + " alt=" + replaceTitle(title) +">";
            vodInfo += "</div>";
            vodInfo += "<div class='contents_info_box'>";
            vodInfo += "  <div class='info_title'>" + title + "</div>";
            vodInfo += "  <dl>";

            if(date != null && date != ''){
              if(tmp.movie_yn == 'Y'){
                vodInfo += "    <dt>개봉일</dt>";
              } else {
                vodInfo += "    <dt>방영일</dt>";
              }
              vodInfo += "    <dd>" + date + "</dd>";
            }

            vodInfo += "  </dl>";
            vodInfo += "  <span class='info_summary'>" + replaceTitle(tmp.c_desc, 'clipTvod') + "</span>";
            vodInfo += '  <a href="'+ link + '" title=' + replaceTitle(title) + ' id="btn_feature_presentation" class="btn_detail_view">';
            vodInfo += "    <span>본편보기</span>";
            vodInfo += "  </a>";
            vodInfo += "</div>";

            $(".vlist_contents_wrap").append(vodInfo);
          } else {
            playerClip.hideClipToVod();
          }
          playerCommon.titleDotReplace('cliptovod');
        }
      });
    },

    convertBasInfo : function(str){
      var getDate;
      var broadDay = str.playerInfo.content.dd_broad;

      if(broadDay){
        getDate = moment(broadDay.substr(0, 8)).format('YYYY.MM.DD(ddd)');
        $('#broad_date_programe').append(getDate);
      } else {
        $('#broad_date_programe').hide();
      }
      //-----------
      var watch = str.playerInfo.content.age_cd;
      var watch_text;
      if(watch == "0") {
        watch_text = "전체관람가"
      } else {
        watch_text = watch+"세이상 관람가";
      }
      $("#watch_level_convert").append(watch_text);
      //------------
      var story = str.playerInfo.content.story;
      if(story != null){
        $(".meta_summary").append(story);
      } else {
        $('.btn_more').hide();
      }

      if( str.playerInfo.content.nm_genre == '뉴스' &&
          str.playerInfo.content.dd_broad == '' && story == null){
        $(".meta_summary").append('영상으로 뉴스 내용을 확인하세요');
      }

      if( str.playerInfo.content.actor == '-' ){
        $('.actor_list').hide();
      }
    },

    convertTime : function(str){
      var mm, ss, timer;
      var time = str;
      if(time > 60){
        if(parseInt(time/60) < 10) {
          mm = "0" + parseInt(time/60);
        } else {
          mm = parseInt(time/60);
        }
        if(parseInt(time%60) < 10) {
          ss = "0" + parseInt(time%60);
        } else {
          ss = parseInt(time%60);
        }

        timer = mm + ":" + ss;
      }
      if(time < 60){
        timer = "00:"+time;
      }

      return timer;
    },

    data : {
      contentsId : '',
      clipId : '',
      channelId : ''
    },

    getRelatedClipList : function() {
      playerClip.getRecommendClipListData(playerClip.data.clipId, playerClip.data.channelId);
    },

    getPopularClipList : function(genre) {
      playerClip.getPopularClipListData(genre);
    },

    getClipCardList : function() {
      playerClip.getClipCardListData(playerClip.data.clipId);
    },

    getRelatedClipListData : function(contentsId) {
      $.ajax({
        url: '/api/clip/related',
        data: {
          pageNo : 1,
          pageSize : 50,
          contentId: contentsId
        },
        type: "get",
        success: function (result) {
          if (result && result.result === 'OK') {
            playerClip.renderRelatedClipList(result.content);
          }
        },
        error: function (e) {
        }
      });
    },

    getRecommendClipListData : function(clipId, channelId) {
      $.ajax({
        url: '/api/clip/recommend',
        data: {
          pageNo : 1,
          pageSize : 50,
          clipId: clipId,
          channelId: channelId
        },
        type: "get",
        success: function (result) {
          if (result && result.result === 'OK') {
            if(result.content.length > 0){
              playerClip.renderRelatedClipList(result.content);
            } else {
              if(playerClip.data.contentsId){
                playerClip.getRelatedClipListData(playerClip.data.contentsId);
              } else {
                playerClip.renderNoClipList('related');
              }
            }
          }
        },
        error: function (e) {
        }
      });
    },

    getPopularClipListData : function(genre) {

      if(genre == 'JR007'){
        $.ajax({
          url: "/api/nav/home/clip/list",
          data: {
            mobileUserNo: User.userNo,
            specialCardYn: 'Y'
          },
          type: "get",
          cache: false,
          success: function (result) {
            if (result.result === 'OK') {
              var tmp = result.grids;
              var grids = [];
              for (var i = 0; i < tmp.length; i++) {
                if (tmp[i].card_headline == '스포츠') {
                  grids.push(tmp[i].grids);
                }
              }
              playerClip.renderPopularClipList(grids[0]);
            }
          }
        });
      } else {

        $.ajax({
          url: "/api/nav/menu/content/list",
          data: {
            pageNo: 1,
            pageSize: 50,
            menuId: '9000000300',
            sortMethod: '7'
          },
          type: "get",
          cache:false,
          success: function (result) {
            if (result && result.result === 'OK') {
              if (result.grids && result.grids.length > 0 && result.grids[0] && result.grids[0].grids.length > 0) {
                playerClip.renderPopularClipList(result.grids[0].grids);
              }
            }
          }
        });
      }
    },

    getClipCardListData : function(clipId) {
      $.ajax({
        url: "/api/vod/cast/clip",
        data: {
          pageNo: 1,
          pageSize: 30,
          synopsisYn: 'Y',
          typeCode: '2',
          lastContentsId: clipId
        },
        type: "get",
        cache:false,
        success: function (result) {
          if (result && result.result === 'OK') {
            if (result.grids && result.grids.length > 0) {
              playerClip.renderClipCardList(result.grids);
            }
          }
        }
      });
    },

    createClipListHtml : function(contents) {
      var html = '';

      $(contents).each(function(index, item) {

        var clipLink = OksusuCard.getLink(item);
        var clipTitle = playerCommon.titleTagReplace(item.clip_title);
        var clipChannelName = item.clip_chnl_nm;
        var clipViewCount = convertNumver(item.view_count);
        var clipTime = playerClip.convertTime(item.p_time);
        var clipThumbnail = OksusuCard.getClipThumbnail(item, '144_82');
        var clipAgeCode = item.age_cd;
        var onClass = '', rating = '';

        if(playerClip.data.clipId === item.clip_id) {
          clipLink = 'javascript:;';
          onClass = ' class="on"';
        }

        if(clipAgeCode == '19'){
          rating = "<i class='rating_19'>19세이상</i>"
        }

        html += '<li' + onClass + '>'
            + '  <a href="' + clipLink + '" title="' + clipTitle + '">'
            + '    <div class="list_thumb_info">'
            + '        <div class="list_thumb_img"><img src="' + clipThumbnail + '" alt="' + clipTitle + '">'
            + '        <span class="list_time">' + clipTime + '</span>'
            + '        </div>'
            + '        <div class="list_info_box">'
            + '          <div class="list_title">' + rating + clipTitle + '</div>'
            + '          <div class="list_subtitle">' + clipChannelName + '</div>'
            + '          <div class="list_view">' + clipViewCount + '</div>'
            + '        </div>'
            + '    </div>'
            + '  </a>'
            + '</li>';
      });

      return html;
    },

    renderRelatedClipList : function(contents) {
      if (contents && contents.length > 0) {
        var html = playerClip.createClipListHtml(contents);

        $('.none_clip').hide();
        $('#relate_clip_list_area').show().html(html);

        playerCommon.titleDotReplace();

        if(contents.length > 5) {
          playerCommon.playListAutoScroll($('#relate_clip_list_area li.on'));
        }

        $("#relate_clip_list_area li.on").off().click(function(e){
          playerCommon.alreadyWatched("현재 시청 중인 콘텐츠 입니다.");
          e.preventDefault();
        });
      } else {
        playerClip.renderNoClipList('related');
      }
    },

    renderPopularClipList : function(contents) {
      if (contents && contents.length > 0) {
        var html = playerClip.createClipListHtml(contents);

        $('.none_clip').hide();
        $('#hot_clip_list_area').show().html(html);

        playerCommon.titleDotReplace();

        if(contents.length > 5) {
          playerCommon.playListAutoScroll($('#hot_clip_list_area li.on'));
        }

        $("#hot_clip_list_area li.on").off().click(function(e){
          playerCommon.alreadyWatched("현재 시청 중인 콘텐츠 입니다.");
          e.preventDefault();
        });
      } else {
        playerClip.renderNoClipList('hot');
      }
    },

    renderClipCardList : function(grids) {

      $('#cardSection').show();

      $(grids).each(function(index, item) {
        if (item.card_typ_cd) {
          var cardTypCd;
          var cardNum;

          $('#cardSection').append('<div id="CardNum' + index + '"></div>');
          cardTypCd = item.card_typ_cd.substring(0, 10);
          cardNum = Oksusu.CardProp.CardType[cardTypCd] || '';

          OksusuCard.getCardTemplateWrapper(OksusuCard.getCardInfo('cardSection', cardNum), item);
        }
      });
    },

    renderNoClipList : function ( type ){
      if( type == 'hot' ){
        $('#hot_clip_list_area').hide();
      } else {
        $('#relate_clip_list_area').hide();
      }
      $('.none_clip').show();
    }

  };

  var ratingPopup = {

    rate : 10,
    rateDisplay : 10,
    nickName : '',
    myRating : '',
    participant : '',
    totRate : '',
    firstShow : false,

    asset : function () {

      var ALERT_RATING = '';

      ALERT_RATING += '<div class="video_popup_wrap">';
      ALERT_RATING += '<div class="video_popup_inner">';
      ALERT_RATING += '<div class="popup_content">';
      ALERT_RATING += '<strong>User1234님</strong><br>평점을 남겨주세요.';
      ALERT_RATING += '<div class="mgrade_box">';
      ALERT_RATING += '<i class="star full"></i><i class="star full"></i><i class="star half"></i><i class="star"></i><i class="star"></i>';
      ALERT_RATING += '</div>';
      ALERT_RATING += '</div>';
      ALERT_RATING += '<div class="popup_btn_box">';
      ALERT_RATING += '<button class="btn btn_confirm" title="평점주기">평점주기</button>';
      ALERT_RATING += '<button class="btn btn_cancel" title="취소">취소</button>';
      ALERT_RATING += '</div>';
      ALERT_RATING += '<a href="#" class="popup_btn_close" title="다음회차 시청여부 팝업닫기">닫기</a>';
      ALERT_RATING += '</div>';
      ALERT_RATING += '</div>';

      return ALERT_RATING;

    },

    add : function () {
      $( '#footer' ).after( '<div class="ratingPopup"></div>' );
      $( '.ratingPopup' ).append( ratingPopup.asset() );
      $( '.ratingPopup .video_popup_wrap' ).addClass( 'ver02' );
      ratingPopup.push();
    },

    push : function () {
      $( '.ratingPopup .popup_content strong' ).text( ratingPopup.nickName + '님' );
      $( '.ratingPopup .mgrade_box i' ).removeClass( 'half' ).removeClass( 'full' );
      ratingPopup.set();
    },

    set : function () {

      var cursor = {
        hand : function () {
          $( this ).css( { cursor : 'pointer' } );
        }
      };

      $( '.ratingPopup .mgrade_box i' ).on( {
        mouseover : cursor.hand,
        mousedown : ratingPopup.drag,
        mousemove : ratingPopup.drag
      } );
      $( document ).on( { mouseup : ratingPopup.drag } );

      $( '.ratingPopup .btn_confirm' ).on( { click : ratingPopup.send } );
      $( '.ratingPopup .btn_cancel' ).on( { click : ratingPopup.hide } );
      $( '.ratingPopup .popup_btn_close' ).on( { click : ratingPopup.hide } );
      $( '.ratingPopup .popup_btn_close' ).on( { click : ratingPopup.block.defaultAction } );

    },

    show : function () {
      $( '.ratingPopup .video_popup_wrap' ).fadeIn( 100 );
    },

    hide : function () {
      $( '.ratingPopup .video_popup_wrap' ).fadeOut( 100, function () {
        ratingPopup.gridRating(ratingPopup.rateDisplay,'pop');
      } );
    },

    drag : function ( e ) {

      var current;
      var center;

      var star = {

        tint : function ( I ) {
          ratingPopup.rate = current * 2;
          $( '.ratingPopup .mgrade_box i' ).each( star.tintMore );

          if ( e.pageX < center ) {
            ratingPopup.rate += 1;
            I.addClass( 'half' );
          } else {
            ratingPopup.rate += 2;
            I.addClass( 'full' );
          }

        },

        tintMore : function ( i ) {

          $( this ).removeClass( 'half' ).removeClass( 'full' );

          if ( i < current ) {
            $( this ).addClass( 'full' );
          }

        }

      };

      if ( this != document ) {
        current = $( this ).index();
        center = $( this ).offset().left + $( this ).width() / 2;
      }

      switch ( e.type ) {
        case 'mousedown' :
          ratingPopup.draging = true;
          star.tint( $( this ) );
          break;
        case 'mousemove' :
          if ( ratingPopup.draging ) {
            star.tint( $( this ) );
          }
          break;
        case 'mouseup' :
          ratingPopup.draging = false;
          break;
      }

    },

    send : function () {

      ratingPopup.hide();

      $.ajax( {

        url : '/api/rating/set',

        data : {
          rating : ratingPopup.rate,
          typeCode : 6,
          masterId : str.m_id,
          contentsId : str.con_id,
          mediaNm : str.title,
          nickName : ratingPopup.nickName
        },

        success : ratingPopup.complete

      } );

    },

    complete : function (result) {

      playerCommon.alreadyWatched( '평점이 등록되었습니다.' );

      var partCount = convertNumverAddStr( result.root.participant_count);
      $(".text_grade span").empty().append("평점");
      $(".text_grade .rating").html(result.root.rating);
      $(".text_grade .count").html("(" + partCount + ")");
      ratingPopup.gridRating(result.root.my_rating,'flat');

    },

    block : {
      defaultAction : function ( e ) {
        e.preventDefault();
      }
    },

    myRate : function (){

      if (ratingPopup.myRating == '-1') {
        $('.star_box i').addClass('none');
      } else {
        ratingPopup.gridRating(ratingPopup.myRating ,'flat');
      }

      if (ratingPopup.participant > 0) {
        var partCount = convertNumverAddStr(ratingPopup.participant);

        $(".text_grade span").append("평점");
        $(".text_grade .rating").html(ratingPopup.totRate);
        $(".text_grade .count").html("(" + partCount + ")");
      } else {
        $(".text_grade span").append("평점을 남겨주세요");
      }
    },

    sendRating : function(str){

      if (ratingPopup.myRating != -1) {
        ratingPopup.rate = ratingPopup.myRating;
      }

      if(!User.isLogin){
        var con = str.con_id;
        userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?", con);
      } else {
        if ( ! ratingPopup.firstShow ) {
          ratingPopup.firstShow = true;
          if(ratingPopup.myRating == '-1'){
            $( '.ratingPopup .mgrade_box i' ).addClass('full');
          } else {
            ratingPopup.gridRating(ratingPopup.myRating,'pop');
          }
        }
        ratingPopup.show();
      }
    },

    gridRating : function(str, type){
      var star = {

        number : parseInt( str / 2 ),

        tint : function ( i ) {
          $( this ).removeClass( 'half' ).removeClass( 'full' );
          if ( i < star.number ) {
            $( this ).removeClass( 'none' ).addClass( 'full' );
          }
          if ( i == star.number ) {
            if ( str % 2 == 1 ) {
              $( this ).removeClass( 'none' ).addClass( 'half' );
            }
          }
        }
      };

      if(type == 'flat') {
        ratingPopup.rateDisplay = str;
        $('.star_box i').addClass( 'none' );
        $('.star_box i').each( star.tint );
      } else {
        $('.ratingPopup .mgrade_box i').addClass( 'none' );
        $('.ratingPopup .mgrade_box i').each( star.tint );
      }
    }

  };

  var playerMovie = {

    data : {
      contentsId : ''
    },

    getPopularMovieList : function() {

      $.ajax({
        url: "/api/nav/menu/content/list",
        data: {
          menuId: "9000001458",
          sortMethod: "7",
          pageNo: "1",
          pageSize: "60"
        },
        type: "get",
        cache: false,
        success: playerMovie.gridPopularMovieList
      });
    },

    gridPopularMovieList : function(result) {

      var movie = '', tmp;

      tmp = result.grids[0].grids;
      $("#movie_vlist_area_hot").empty();
      for (var i = 0; i < tmp.length; i++) {
        var link = OksusuCard.getLink(tmp[i]);
        var image = OksusuCard.getMoviePoster(tmp[i], '142_199');
        var onClass = '', adultLogo = '';
        if (playerMovie.data.contentsId === tmp[i].con_id) {
          link = '';
          onClass = 'class="already"';
        }
        if (tmp[i].level == "19") {
          adultLogo = "<div class='list_title rating_19'>";
        } else {
          adultLogo = "<div class='list_title'>";
        }
        movie += "<li " + onClass+ " >";
        movie += '  <a href="' + link + '" title=' + replaceTitle(tmp[i].title) + '>';
        movie += "   <div class='list_thumb_info'>";
        movie += "     <div class='list_thumb_img'>";
        movie += '       <img src=\"' + image + '\" alt="영화 포스터" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">';
        movie += "     </div>";
        movie += "     <div class='list_info_box'>";
        movie += adultLogo + tmp[i].title;
        movie += "       </div>";
        movie += "     </div>";
        movie += "   </div>";
        movie += " </a>";
        movie += "</li>";
      }
      $("#movie_vlist_area_hot").append(movie);

      if($('#movie_vlist_area_hot li.already').length > 0) {
        playerCommon.playListAutoScroll($('#movie_vlist_area_hot li.already'),'movie')
      }

      $("#movie_vlist_area_hot li.already").click(function(e){
        playerCommon.alreadyWatched("현재 시청 중인 콘텐츠 입니다.");
        e.preventDefault();
      });

    }

  };

  var playerBroad = {
    data : {
      seriesId : '',
      contentsId : '',
      oderType : '',
      title : '',
      season : ''
    },

    checkRelatedVod : function(){

      $.ajax({
        url: "/api/vod/season",
        data: {
          seriesId: playerBroad.data.seriesId
        },
        type: "get",
        cache:false,
        success: function (result) {

          if(result.series_cnt == "0"){
            playerBroad.nullGridVodSeqGrid();
          } else {
            if(playerBroad.data.oderType == ''){
              playerBroad.data.oderType = 'lasted';
            }
            playerBroad.relatedVod(result.content.series);
          }
        }
      });
    },

    nullGridVodSeqGrid : function(type){
      var vod_seq = "";
      $(".sort_view").hide();

      vod_seq += "<li>";
      vod_seq += "  <a href='javascript:;' title='방송이미지'>";
      vod_seq += "    <div class='list_thumb_info'>";
      vod_seq += "      <div class='list_thumb_img'>";
      vod_seq += "        <img src='/public/assets/img/img_default.png' alt='방송 썸네일'>";
      vod_seq += "      </div>";
      vod_seq += "      <div class='list_info_box'>";
      vod_seq += "        <div class='list_number_info'>";
      vod_seq += "        </div>";
      vod_seq += "        <div class='list_title'>관련 시리즈가 없습니다.</div>";
      vod_seq += "        <div class='list_fare_info'></div>";
      vod_seq += "      </div>";
      vod_seq += "    </div>";
      vod_seq += "  </a>";
      vod_seq += "</li>";

      if(type == 'lasted'){
        $("#lasted_vod_list_box").html(vod_seq);
      } else {
        $("#seq_all_list_area").html(vod_seq);
      }

    },

    relatedVod : function(result){

      if(result == null || result == ''){
        playerBroad.nullGridVodSeqGrid();
        return false;
      }
      $(".video_channel_list").removeClass("newest");

      if(playerBroad.data.oderType == 'first'){
        result.sort( function (a, b) {
          return parseInt(a.seq_no) < parseInt(b.seq_no) ?
              -1 : parseInt(a.seq_no) > parseInt(b.seq_no) ? 1 : 0;
        });
      }

      if(playerBroad.data.oderType == 'lasted'){
        result.sort( function (a, b) {
          return parseInt(a.seq_no) > parseInt(b.seq_no) ?
              -1 : parseInt(a.seq_no) < parseInt(b.seq_no) ? 1 : 0;
        });
      }

      var vod_seq = '';
      $("#seq_all_list_area").empty();
      for (var i = 0; i < result.length; i++) {

        var link = OksusuCard.getLink(result[i]);
        var date = result[i].s_title;
        if(date.indexOf('-') != -1)  date = date.split('-')[0].replace(' ','');
        var seq = result[i].seq_no || result[i].no_broad;
        var img = result[i].thum_path || result[i].pstr_path;
        var story = playerCommon.titleTagReplace(result[i].story_mid || '');
        var title = playerCommon.titleTagReplace(result[i].title);
        var level =result[i].level;
        var adultLogo = '', onClass = '', seqTitle = '', freeYn = '';
        if(level == '19') adultLogo = "<i class='rating_19'>19세이상</i>";
        if (seq != null && seq != '0')  {
          seqTitle = seq + "회(" + date + ")";
        } else {
          seqTitle = title;
        }
        if (playerBroad.data.contentsId === result[i].con_id) {
          link = '';
          onClass = 'class="on"';
        }
        if (result[i].pkge_cd == '20') freeYn = "<div class='list_fare_info'>기본 월정액 무료</div>";
        img = img.replace(":type", "140_80");

        vod_seq += '<li ' + onClass + '>';
        vod_seq += '  <a href="' + link + '" title=' + title + '>';
        vod_seq += "    <div class='list_thumb_info'>";
        vod_seq += "      <div class='list_thumb_img'>";
        vod_seq += "        <img src=" + img + " alt='" + title + "'>";
        vod_seq += "      </div>";
        vod_seq += "      <div class='list_info_box'>";
        vod_seq += "        <div class='list_number_info'>";
        vod_seq += adultLogo;
        vod_seq += seqTitle;
        vod_seq += "        </div>";
        vod_seq += "        <div class='list_title'>" + story + "</div>";
        vod_seq += freeYn;
        vod_seq += "      </div>";
        vod_seq += "    </div>";
        vod_seq += "  </a>";
        vod_seq += "</li>";
      }

      $('.sort_view, .category_list').show();
      $('#seq_all_list_area').append(vod_seq);

      playerCommon.titleDotReplace();

      if($('#seq_all_list_area li.on').length > 0) {
        playerCommon.playListAutoScroll($('#seq_all_list_area li.on'), 'broad');
      }

      $('#seq_all_list_area li.on').click(function(e){
        playerCommon.alreadyWatched("현재 시청 중인 콘텐츠 입니다.");
        e.preventDefault();
      });
    },

    gridLastedVodList : function(){
      $(".video_channel_list").addClass("newest");
      $('.category_list').hide();
/*      $(".sel_type_wrap").hide();
      $(".sort_view").hide();*/

      $.ajax({
        url: "/api/nav/menu/content/list",
        data: {
          menuId: '9000000334',
          pageNo: '1',
          pageSize: '30'
        },
        type: "get",
        cache:false,
        success: function (result) {

          if(result.grids.length > 0){
            tmp = result.grids[0].grids;
            var vod_last = "";
            $("#lasted_vod_list_box").empty();

            for( var i = 0 ; i < tmp.length ; i++){
              var link = OksusuCard.getLink(tmp[i]);
              var img = tmp[i].thum_path.replace(":type","140_80");
              var date = tmp[i].org_dy;
              var seq = tmp[i].seq_no;
              if(seq == '0') seq = '';
              var title = replaceTitle(tmp[i].title);
              var onClass = '', seqTitle = '';
              if(playerBroad.data.contentsId === tmp[i].con_id){
                onClass = 'class="on"';
                link = '';
              }
              if(seq == '') {  seqTitle = date;  }
              else {  seqTitle = seq + "회(" + date + ")";  }

              vod_last += "<li " + onClass + ">";
              vod_last += '  <a href="' + link + '" title=' + title + '>';
              vod_last += "    <div class='list_thumb_info'>";
              vod_last += "      <div class='list_thumb_img'>";
              vod_last += "        <img src=" + img +" alt=" + title + "'>";
              vod_last += "      </div>";
              vod_last += "      <div class='list_info_box'>";
              vod_last += "        <div class='list_number_info'>";
              vod_last +=            seqTitle;
              vod_last += "        </div>";
              vod_last += "        <div class='list_title'>" + title + "</div>";
              vod_last += "        <div class='list_fare_info'></div>";
              vod_last += "      </div>";
              vod_last += "    </div>";
              vod_last += "  </a>";
              vod_last += "</li>";
            }
            $("#lasted_vod_list_box").append(vod_last);

            playerCommon.titleDotReplace();

            if($('#lasted_vod_list_box li.on').length > 0) {
              playerCommon.playListAutoScroll($('#lasted_vod_list_box li.on'));
            }

            $('#lasted_vod_list_box li.on').click(function(e){
              playerCommon.alreadyWatched("현재 시청 중인 콘텐츠 입니다.");
              e.preventDefault();
            });
          } else {
            playerBroad.nullGridVodSeqGrid('lasted');
          }

        }
      });
    },

    checkSeason : function(){

      if(playerBroad.data.season == '' || playerBroad.data.season == null){

        $(".sel_type_wrap").hide();

      } else {

        $("#selector").empty();
        $(".sel_type_wrap").show();
        var season = playerBroad.data.season;
        var seasonInfo = '';

        for(var i = 0 ; i < season.length ; i++){

          var titleName = season[i].season_nm;
          if(titleName && titleName.length > 6){
            titleName = titleName.substr(0,6) + "..";
          }
          seasonInfo += "<option value=" + season[i].series_id + ">" + titleName + "</option>";

        }
        $("#selector").append(seasonInfo);

        $( "#selector" ).val(playerBroad.data.seriesId);
        $( "#selector" ).selectmenu( 'refresh' );

        $( "#selector" ).selectmenu({
          change: function() {
            playerBroad.data.seriesId = $(".text_season_info option:selected").val();
            playerBroad.checkRelatedVod();
          }
        });
      }
    },

    orderRelatedVod : function(){
      if(playerBroad.data.oderType == 'first'){
        $('.sort_view ul li').first().removeClass('on');
        $('.sort_view ul li').last().addClass('on');
        playerBroad.checkRelatedVod();
      }

      if(playerBroad.data.oderType == 'lasted'){
        $('.sort_view ul li').first().addClass('on');
        $('.sort_view ul li').last().removeClass('on');
        playerBroad.checkRelatedVod();
      }
    }

  };

  var playerLive = {

    data : {
      genre : ''
    },

    makeLiveList : function ( tmp ) {
      var html = '';
      for(var i = 0 ; i < tmp.length ; i++) {
        var title = playerCommon.titleTagReplace(OksusuCard.getProgramName(tmp[i]) || '지금은 방송시간이 아닙니다');
        var img = OksusuCard.getChannelThumbnail(tmp[i], '144_82');
        var link = OksusuCard.getLink(tmp[i]);
        var rate = OksusuCard.getLiveProgressRate(tmp[i]);
        var channelName =  OksusuCard.getChannelName(tmp[i]);
        var duration = OksusuCard.getDurationText(tmp[i]);
        var onClass = '', onAir = '', freeYn = '', chatYn = '', programName = '', adultLogo = '';
        if(location.href.split('/').pop() == tmp[i].serviceId){
          link = '';
          onClass = 'class="on"';
        }
        if(tmp[i].programs.length > 0 && tmp[i].programs[0].is_live == "Y")  onAir = "<span class='ico_onair'>ON-AIR</span>";
        if(tmp[i].channelProd == "0" || tmp[i].channelProd == "5") freeYn = "<span class='ico_free'>FREE</span>";
        if(tmp[i].chatYn == "Y") chatYn = "<span class='ico_chatting'>채팅중</span>";
        if(tmp[i].programs.length > 0 && tmp[i].programs[0].ratingCd == "19") adultLogo = "<i class='rating_19'>19세이상</i>";
        if(tmp[i].genreCd == '260') {
          programName = "<div class='list_title'>" + playerLive.adultMessageCheck(title) + "</div>"
        } else {
          programName = "<div class='list_title'>" + adultLogo + title + "</div>";
        }

        html += '<li ' + onClass + '>';
        html += '  <a href="' + link + '" title="' + title + '">';
        html += "  <div class='list_thumb_info'>";
        html += "    <div class='list_thumb_img'>";
        html += '      <img src="' + img + '" alt="방송 썸네일" onerror="this.src=\'' + ReplaceImage.img_default_144x82 + '\'">';
        html += "        <div class='info-play-linear'>";
        html += "          <span style='width:" + rate + "%;'>재생진행률</span>";
        html += "        </div>";
        html +=          onAir;
        html += "        <div class='ico_right_box'>";
        html +=           freeYn;
        html +=           chatYn;
        html += "    </div>";
        html += "   </div>";
        html += "   <div class='list_info_box'>";
        html +=       programName;
        html += "     <div class='list_logo'>" + channelName + "</div>";
        html += "     <div class='list_time'>" + duration + "</div>";
        html += "   </div>";
        html += "  </div>";
        html += " </a>";
        html += "</li>";
      }

      return html;
    },

    allChannelList : function() {
      $.ajax({
        url: "/api/live/organization/list?genreCode=99&orgaPropCode=ALL",
        data: {
          audioAddYn: 'Y'
        },
        cache: false,
        success: function (result) {
          var html = playerLive.makeLiveList(result.channels);

          $("#all_live_channel_list_area").html(html);

          if($('#all_live_channel_list_area li.on').length > 0) {
            playerCommon.playListAutoScroll($('#all_live_channel_list_area li.on'), 'live');
          }

          $("#all_live_channel_list_area li.on").click(function(e){
            playerCommon.alreadyWatched("현재 시청 중인 채널입니다.");
            e.preventDefault();
          });

          playerCommon.titleDotReplace();
        }
      });
    },

    nowPlayerChannel : function(){
      var mainInfo = '';
      var ch = playerData.playerInfo.channel;
      var name = '', adultLogo = '', shopping = '', freeYn = '', title = '';
      var onAir = '&nbsp;&nbsp;';
      var channelLogo = "<i class='logo'><img src='http://image.oksusu.com:8080/thumbnails/image/0_0_A20/live/logo/63/nsepg_" + ch.serviceId + ".png' alt='logo'></i>";
      if(ch.genreCd == "210") {
        shopping = "<div class='shopping_info_title'><i class='ico_info'>infomation icon</i>" +
            "쇼핑은 모바일에서만 구매가 가능합니다. 옥수수 모바일 앱을 이용해주세요.</div>";
      }
      if(ch.serviceId == "330") $('.live_watch_wrap').addClass('b_shopping');

      if(ch.programs[0]){   name = ch.programs[0].programName;   }
      else {  name = '지금은 방송시간이 아닙니다.';   }
      if(name == "방송사 사정으로 제공할 수 없습니다") name = '방송사의 사정으로 제공할 수 없습니다.';
      if(ch.blackout_yn == 'Y' && ch.genreCd == "190") name = "지금은 경기시간이 아닙니다.";
      if(level == '19') {   adultLogo = '<i class="rating_19">19세이상</i>';    }
      if(isLive == 'Y') {   onAir = ' <i class="onair">ON-AIR</i>';    }
      if(ch.channelProd == '0' || ch.channelProd == '5' ){  freeYn = "<i class='free'>FREE</i>";   }
      var music = ch.channelName +'<em>' + name + '</em>';

      if(ch.genreCd == '800'){
        title = music;
      } else {
        if (ch.genreCd == "260") {
          title += channelLogo + playerLive.adultMessageCheck(name)
        } else {
          title += channelLogo + adultLogo + name;
        }
      }

      mainInfo += "<div class='watch_title ver02'>";
      mainInfo += "<h4>";
      mainInfo += title;
      mainInfo += onAir;
      mainInfo += freeYn;
      mainInfo += "</h4>";
      mainInfo += shopping;
      mainInfo += "</div>";

      $("#live_channel_main_info_area").prepend(mainInfo);
    },

    getGenreType : function(){

      var genreArr = [];
      if(playerLive.data.genre == 'G0') {
        str = '800';
      } else if(playerLive.data.genre == '270'){
        playerLive.jtbcArchive();
        return false;
      }

      $.ajax({
        url: "/api/live/organization/list?genreCode=99&orgaPropCode=ALL",
        data: {
          audioAddYn : 'Y'
        },
        cache:false,
        success: function (result) {

          $("#genre_live_channel_list_area").empty();

          var tmp = result.channels;
          for(var i = 0; i < tmp.length; i++){
            if(playerLive.data.genre == tmp[i].genreCd){
              genreArr.push(tmp[i]);
            }
          }
          if(genreArr.length > 0) {
            playerLive.gridLiveGenre(genreArr);
            genreArr = [];
          }
        }
      });
    },

    gridLiveGenre : function(genre){
      var html = playerLive.makeLiveList(genre);

      $("#genre_live_channel_list_area").html(html);

      if($('#genre_live_channel_list_area li.on').length > 0) {
        playerCommon.playListAutoScroll($('#genre_live_channel_list_area li.on'), 'live');
      }

      $("#genre_live_channel_list_area li.on").click(function(e){
        playerCommon.alreadyWatched("현재 시청 중인 채널입니다.");
        e.preventDefault();
      });

      playerCommon.titleDotReplace();
    },

    jtbcArchive : function(){

      $.ajax({
        url: "/api/live/genre/more",
        data: {
          genreCd: 270,
          endNum : 100
        },
        cache:false,
        success: function (result) {

          $("#genre_live_channel_list_area").empty();
          playerLive.gridLiveGenre(result);

        }
      });
    },

    checkliveTimeTable : function(){

      $.ajax({
        url: "/api/live/schedule",
        data: {
          channelServiceId:playerData.playerInfo.serviceId,
          startTime: moment().format('YYYYMMDD') + '00',
          endTime: moment().format('YYYYMMDD') + '23',
          scheduleKey:"key"
        },
        cache: false,
        success: function (result) {
          if(result.channel.programs.length > 0){
            playerLive.gridliveTimeTable(result.channel);
          } else {
            playerLive.anotherTimetableCase(result.channel);
          }
        }
      });
    },

    gridliveTimeTable : function(ch){
      var timtable = "", comChat, comProd, program, yesterday;
      comChat = ch.chatYn;
      comProd = ch.channelProd;
      program = ch.programs;
      yesterday = moment().add(-1, 'days').format('YYYYMMDD');

      for(var i = 0 ; i < program.length ; i++ ) {
        var convertSt = program[i].startTimeYMDHIS;
        if(convertSt.indexOf(yesterday) == -1){
          var st = program[i].startTime;
          var et = program[i].endTime;
          var watchLevel = program[i].ratingCd;
          var title = program[i].programName;
          var onClass = "", adultLogo = "", programName = "", freeYn = "", chatYn ="";
          if(title == "프로야구 중계 시 서비스됩니다") title = "지금은 경기 시간이 아닙니다";
          if(program[i].currentProgramYn == "Y"){  onClass = ' class="on"';  }
          if (watchLevel == "19") {  adultLogo = " <i class='rating_19'>19세이상</i>";  }

          if (ch.genreCd == "260") {  programName = playerLive.timeTableAdultMessageCheck(title);  }
          else {  programName = adultLogo + title;  }

          if (comProd == "0" || comProd == "5") {   freeYn = '<span class="icoFree">FREE</span>';   }
          if (comChat == "Y") {  chatYn = '     <span class="icoChat">채팅중</span>'  }
          var timer = playerLive.timeTableConvertTimer(convertSt.substr(8, 2), convertSt.substr(10, 2));

          timtable += '<li ' + onClass + 'data-start-time="' + st + '" data-end-time="' + et + '">';
          timtable += ' <a href="javascript:;">';
          timtable += '  <div class="titS">';
          timtable += programName;
          timtable += '   </div>';
          timtable += '   <div class="time">' + timer + '</div>';
          timtable += '   <div class="icoBox">';
          timtable += freeYn;
          timtable += chatYn;
          timtable += '   </div>';
          timtable += ' </a>';
          timtable += '</li>'
        }
      }
      $("#channel_time_box_list_area").append(timtable);
      playerLive.scheduleCommonEvent(ch);
    },

    timeTableConvertTimer : function(hh, mm){
      var timer = '', convert = '';
      if (hh < 12) timer = '오전 ' + hh + ':' + mm;
      if (hh >= 12) {
        convert = hh - 12;
        if (convert < 10) {
          convert = '0' + convert;
          if(convert == '00') convert = '12';
          timer = '오후 ' + convert + ':' + mm;
        } else {
          timer = '오후 ' + convert + ':' + mm;
        }
      }
      return timer;
    },

    scheduleCommonEvent : function(ch){
      var genre = playerData.playerInfo.channel.genreCd;
      if(genre == '800' || genre == '270'){
        //
      } else {
        $('.btnMore').show();
      }
      $(".tvProgTit").html(ch.channelName + " 편성표").show();
      $(".tvScheduleWrap").show();
      playerLive.tvScheduleListFn();
    },

    tvScheduleListFn : function () {
      var synobSchedule = new customSlideFn('#tvScheduleWrap', {
        innerWrap : $('#tvScheduleWrap .tvProgramIn')
        //, disabledClass : 'disabled'
        , eleAlign : 'left'
        , btnDisabled : true
        , areaMove : false
        , slideBefore : function(newIdx, firstIdx, lastIdx, moveP, maxP) {
          var _thisWrapper = $('#tvScheduleWrap');
          var _btnPrev = $('.btnPrev', _thisWrapper);
          var _btnNext = $('.btnNext', _thisWrapper);

          if(_btnPrev.hasClass('disabled')) _btnPrev.removeClass('disabled');
          if(_btnNext.hasClass('disabled')) _btnNext.removeClass('disabled');
          if(moveP == 0) {
            _btnPrev.addClass('disabled');
          }else if(moveP == maxP) {
            _btnNext.addClass('disabled');
          }
        }
      });

      if(synobSchedule.isSlideState) {
        synobSchedule.slideTo($('#channel_time_box_list_area li.on').index(), 700);
        $('#tvScheduleWrap .btnPrev').click(function() {
          var idx = synobSchedule.getIndex();
          var lastIdx = synobSchedule.getLastIndex();
          var targetIdx = idx - 4;

          if($(this).hasClass('disabled')) return;
          if(targetIdx <= 0) {
            synobSchedule.slideTo(0, 700);
          }else{
            synobSchedule.slideTo(targetIdx, 700);
          }
        });
        $('#tvScheduleWrap .btnNext').click(function() {
          var idx = synobSchedule.getIndex();
          var lastIdx = synobSchedule.getLastIndex();
          var targetIdx = idx + 4;

          if($(this).hasClass('disabled')) return;
          if(targetIdx >= lastIdx) {
            synobSchedule.slideTo(lastIdx, 700);
          } else {
            synobSchedule.slideTo(targetIdx, 700);
          }
        });
      } else {
        $('#tvScheduleWrap .btnPrev').remove();
        $('#tvScheduleWrap .btnNext').remove();
      }
    },

    anotherTimetableCase : function(ch){
      var out, outer;
      var name = "방송사 사정으로 제공할 수 없습니다.";
      if(ch){
        out = ch.blackout_yn;
        outer = ch.botordYn;
        if(outer == 'Y' || out == 'Y'){
          name = "편성 정보가 없습니다.";
        }
      }
      $(".tvProgramIn").append('<div class="nodata">' + name + '</div>');
      playerLive.scheduleCommonEvent(ch);
    },

    adultMessageCheck : function(title){
      var text = "";
      var hh = playerLive.currentTime();

      if(hh >= 18 && hh < 22){
        if (!User.isLogin
            || (User.isLogin && !User.isAdult) || (User.serviceProvider != '')) {
          text = "성인전용";
        } else {
          text = "정파방송";
        }
      } else {
        if (!User.isLogin
            || (User.isLogin && !User.isAdult)
            || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19)) {
          text = "<i class='rating_19'>19세이상</i>성인전용";
        } else {
          text = "<i class='rating_19'>19세이상</i>" + title;
        }
      }
      return text;
    },

    timeTableAdultMessageCheck : function(title) {
      var text = '';
      if(title.indexOf('정파방송') > -1 || title.indexOf('정파 방송') > -1){
        if (!User.isLogin || (User.isLogin && !User.isAdult) || (User.serviceProvider != '')) {
          text = "성인전용";
        } else {
          text = "정파방송";
        }
      }else if (!User.isLogin
          || (User.isLogin && !User.isAdult)
          || (User.isLogin && User.watchLevel != 'N' && User.watchLevel <= 19)) {
        text = "<i class='rating_19'>19세이상</i>성인전용";
      } else {
        text = "<i class='rating_19'>19세이상</i>" + title;
      }
      return text;
    },

    currentTime : function(){
      var d = new Date();
      var hh = d.getHours();
      return hh;
    }
  }

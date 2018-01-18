

var report = "", commentsarr, replyarr, uN = "", uNov, update="", replyUpdate = "", convertCount;
var typeCode, masterId, contentsId, contentName, seriesNo, adultLevel, erosYn, nick="", orderType = '';
var flag, checkMy = "", uId="";
var beforeIndex = 0, pageSize = 0;
var counter = [];

var drawComment = (
    function () {
      var public = {};
      public.commentSeqGrid = commentSeqGrid;

      function commentSeqGrid( option ){

        if (navigator.onLine == false){
          var online = netWorkCheck();
          $("#comment_list_area_view_common").empty().append(online);
          return false;
        }


        if (option.masterId !== "" && option.contentId !== "") {

          var tmp;
          orderType = option.order;

          $.ajax({
            url: "/api/comment/list",
            data: {
              masterId: option.masterId,
              contentsId: option.contentId,
              typeCode: option.videoType,
              //parentCommentNo: option.parentCommentNo,
              order: orderType,
              size: option.commentSize,
              lastCommentNo: option.commentNo,
              lastRowNumber: option.rowNumber,
              myYn: option.my,
              erosYn: option.adultYn,
              includeNoticeYn: "Y"
            },
            type: "get",
            cache: false,
            success: function (result) {

              if (result !== null) {

                tmp = result.root;

                $(".ico_comment").empty();
                $(".text_count").empty();

                convertCount = numberToAbbreviation(tmp.total_count);
                $(".ico_comment").append(convertCount);

                if(option.my == 'Y' && tmp.comments == null){
                  checkMy = '';
                  commentSeqGrid({
                    first: 1,
                    masterId: masterId,
                    contentId: contentsId,
                    contentTitle: contentName,
                    contentNo: seriesNo,
                    ageCode: adultLevel,
                    adultYn: erosYn,
                    nickName: uN,
                    userNo: uNov,
                    videoType: typeCode,
                    commentNo: '',
                    rowNumber: '',
                    parentCommentNo: '',
                    order : 'new',
                    commentSize : 20,
                    my : '',
                    index : '',
                    replyCount : ''
                  });
                }

                gridCommentArea(tmp, option);
              }
            }, error : function(){

              var online = netWorkCheck();
              $("#comment_list_area_view_common").empty().append(online);

            }
          });

        } else {
          $(".btn_comment").hide();
        }

      }

      function netWorkCheck(){
        var online = "";

        online += "<div style='width:1200px;margin:60px auto 120px auto;'>";
        online += " <div class='comment_wrap ver02'>";

        online += "   <div class='comment_write_top'>";
        online += "     <h5>댓글</h5>";
        online += "     <span class='text_count'>0</span>";
        online += "     <a href='javascript:;' title='새로고침' class='btn_refresh'>";
        online += "       <span class='ico_refresh'>새로고침</span>";
        online += "     </a>";
        online += "   </div>";

        online += "   <div class='comment_cont_wrap'>";
        online += "     <div class='comment_write_box'>";
        online += "       <div class='write_box'>";
        online += "         <label>주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.</label>";
        online += "         <textarea cols='30' placeholder='주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.' " +
            "class='write_textarea' id='content_write_textarea' maxlength='400'></textarea>";
        online += "       </div>";
        online += "       <button type='button' class='btn_register' id='content_register_request'>등록</button>";
        online += "       <span class='write_count' max=400><em id='content_write_counter'>0</em>/<em>400</em></span>";
        online += "     </div>";
        online += "   </div>";

        online += "    <div class='general_category_wrap'>";
        online += "      <ul class='general_category_list'>";
        online += "        <li class='on'>";
        online += "          <a href='javascript:;' title='최신순' class='lasted_comment_list_order'>최신순</a>";
        online += "        </li>";
        online += "        <li>";
        online += "          <a href='javascript:;' title='공감순' class='like_it_comment_list_order'>공감순</a>";
        online += "        </li>";
        online += "      </ul>";
        online += "    </div>";

        online += "   <div class='comment_list_wrap'>";
        online += "     <div class='comment_none_wrap'>";
        online += "       <div class='none_box'>";
        online += "         <div class='img_box'>";
        online += "           <img src='/public/assets/img/ico_comm_disabled.png' alt='일시적으로 댓글 서비스 이용이 불가 합니다.'>";
        online += "         </div>";
        online += "         <p>일시적으로 댓글 서비스 이용이 불가 합니다.</p>";
        online += "       </div>";
        online += "     </div>";
        online += "   </div>";

        online += " </div>";
        online += "</div>";

        return online;
      }

      function gridCommentArea(str, option) {
        var html = '';
        if(option.first == 1){
          uN = option.nickName;
          uNov = option.userNo;

          typeCode = option.videoType;
          masterId = option.masterId;
          contentsId = option.contentId;
          contentName = option.contentTitle;
          seriesNo = option.contentNo;
          adultLevel = option.ageCode;
          erosYn = option.adultYn;
          uId = option.userId;

          $("#comment_list_area_view_common").empty();

          html += "<div style='width:1200px;margin:60px auto 120px auto;'>";
          html += "  <div class='comment_wrap ver02'>";

          html += "    <div class='comment_write_top'>";
          html += "      <h5>댓글</h5>";
          html += "      <span class='text_count'>" + convertCount + "</span>";
          html += "      <a href='javascript:;' title='새로고침' class='btn_refresh'>";
          html += "        <span class='ico_refresh' id='btn_comment_refresh_request'>새로고침</span>";
          html += "      </a>";
          html += "    </div>";

          html += "    <div class='comment_cont_wrap'>";
          html += "      <div class='comment_profile_box'>";
          html += "        <span class='text_name'>" + uN + "</span>";
          html += "        <a href='javascript:;' title='닉네임 등록' class='btn_add_name'>닉네임 등록</a>";
          html += "      </div>";
          html += "      <div class='comment_write_box'>";
          html += "        <div class='write_box'>";
          html += "          <label>주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.</label>";
          html += "          <textarea cols='30' placeholder='주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.' " +
                      "class='write_textarea' id='content_write_textarea' maxlength='400'></textarea>";
          html += "        </div>";
          html += "        <button type='button' class='btn_register' id='content_register_request'>등록</button>";
          html += "        <span class='write_count' max=400><em id='content_write_counter'></em>/<em>400</em></span>";
          html += "      </div>";
          html += "    </div>";

          html += "    <div class='general_category_wrap'>";
          html += "      <ul class='general_category_list'>";
          html += "        <li class='on'>";
          html += "          <a href='javascript:;' title='최신순' class='lasted_comment_list_order'>최신순</a>";
          html += "        </li>";
          html += "        <li class='none_my'>";
          html += "          <a href='javascript:;' title='공감순' class='like_it_comment_list_order'>공감순</a>";
          html += "        </li>";
          html += "      </ul>";
          html += "      <button type='button' class='btn_view my' style='display:none;'>내 댓글</button>";
          html += "    </div>";



          if(str.notices != null && option.my != 'Y'){
            var tmp = str.notices;
            for(var i = 0; i < tmp.length; i++){
              html += "    <div class='comment_notice_wrap'>";
              html += "     <div class='notice_cont'>" + tmp[i].content + "<em></em>";

              if(tmp[i].link_type == 'IN' || tmp[i].link_type == 'OUT'){
                  html += "<a href=" + tmp[i].link_url + " class='btn_more' target='_blank'>이벤트자세히보기</a>";
              }
              //html += "     <em>-기간 : 3/10 금~3/23 목</em>";
              html += "     </div>";
              html += "    </div>";
            }
          }

          if (str.total_count > 0) {
            html += "<div class='comment_list_wrap'>";
            html += " <ul class='comment_list_box' id='comment_list_area'>";
            if(option.my == 'Y'){
              html +=       gridMyCommentList(str);
            } else {
              html +=       gridCommentList(str);
            }
            html += "  </ul>";
            html += " <a href='javascript:;' title='댓글 더보기' class='btn_comment_more' id='comment_list_add_comment_request_btn' style='display:none;'><span>댓글 더보기</span></a>";
            html += "</div>";
          }

          if (str.total_count == 0) {
            html += "<div class='comment_list_wrap'>";
            html += "  <div class='comment_none_wrap'>";
            html += "    <div class='none_box'>";
            html += "      <div class='img_box'>";
            html += "        <img src='/public/assets/img/ico_comm_none.png' alt='가장먼저 댓글을 남겨보세요!!'>";
            html += "      </div>";
            html += "      <p>가장 먼저 댓글을 남겨보세요!</p>";
            html += "    </div>";
            html += "  </div>";
            html += "</div>";
          }

          html += "  </div>";
          html += "</div>";

          $("#comment_list_area_view_common").append(html);

        } else {
          $('.text_count').empty().append(numberToAbbreviation(str.total_count));

/*          if(option.first == 2){
            $("#comment_list_area").empty();
          }*/

          if(option.my == 'Y'){
            html +=       gridMyCommentList(str);
          } else {
            html +=       gridCommentList(str);
          }

          $("#comment_list_area").append(html);

        }

        $(".general_category_list li").removeClass("on");
        if(orderType === 'new') {  $(".general_category_list li").first().addClass("on"); }
        if(orderType === 'like') { $(".general_category_list li").last().addClass("on");  }
        if(orderType === '') { $(".general_category_list li").first().addClass("on");  }

        myCommentListCheck();
        if(option.my === "Y"){
          $(".btn_view.my").text("전체 댓글");
          $('.none_my').hide();
        }

        if(option.first == 1){

          commonContentLengthCheck("#content_write_textarea","#content_write_counter");

          $("#content_register_request").click(function (e) {
            var context = $('#content_write_textarea').val();

            if(context === ""){
              commonContentNullCheck('댓글입력', '댓글 내용을 입력하지 않았습니다', 'only');
            } else {
              jamoCheck(context,'ci','','','','');
            }
            e.preventDefault();
          });

          $(".btn_view.my").click(function() {
            if(uN === ""){
              var url = location.href.split("/v/");
              userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
            } else {
              beforeIndex = 0;
              if ($(this).text() === "전체 댓글") {
                checkMy = "";
                beforeIndex = 0;
                commentSeqGrid({
                  first: 1,
                  masterId: masterId,
                  contentId: contentsId,
                  contentTitle: contentName,
                  contentNo: seriesNo,
                  ageCode: adultLevel,
                  adultYn: erosYn,
                  nickName: uN,
                  userNo: uNov,
                  videoType: typeCode,
                  commentNo: '',
                  rowNumber: '',
                  parentCommentNo: '',
                  order : orderType,
                  commentSize : 20,
                  my : checkMy,
                  index : '',
                  replyCount : ''
                });
              } else {
                checkMy = "Y";
                beforeIndex = 0;
                commentSeqGrid({
                  first: 1,
                  masterId: masterId,
                  contentId: contentsId,
                  contentTitle: contentName,
                  contentNo: seriesNo,
                  ageCode: adultLevel,
                  adultYn: erosYn,
                  nickName: uN,
                  userNo: uNov,
                  videoType: typeCode,
                  commentNo: '',
                  rowNumber: '',
                  parentCommentNo: '',
                  order : orderType,
                  commentSize : 20,
                  my : checkMy,
                  index : '',
                  replyCount : ''
                });
              }
            }
          });

          $(".lasted_comment_list_order").click(function(e) {
            beforeIndex = 0;
            orderType = 'new';
            commentSeqGrid({
              first: 1,
              masterId: masterId,
              contentId: contentsId,
              contentTitle: contentName,
              contentNo: seriesNo,
              ageCode: adultLevel,
              adultYn: erosYn,
              nickName: uN,
              userNo: uNov,
              videoType: typeCode,
              commentNo: '',
              rowNumber: '',
              parentCommentNo: '',
              order : orderType,
              commentSize : 20,
              my : checkMy,
              index : '',
              replyCount : ''
            });
            e.preventDefault();
          });

          $(".like_it_comment_list_order").click(function(e){
            beforeIndex = 0;
            orderType = 'like';
            commentSeqGrid({
              first: 1,
              masterId: masterId,
              contentId: contentsId,
              contentTitle: contentName,
              contentNo: seriesNo,
              ageCode: adultLevel,
              adultYn: erosYn,
              nickName: uN,
              userNo: uNov,
              videoType: typeCode,
              commentNo: '',
              rowNumber: '',
              parentCommentNo: '',
              order : orderType,
              commentSize : 20,
              my : checkMy,
              index : '',
              replyCount : ''
            });
            e.preventDefault();
          });

          $("#btn_comment_refresh_request").click(function(e){
            beforeIndex = 0;
            pageSize = 0;
            checkMy = '';
            $('.btn_view.my').empty().append('내 댓글');
            $('.none_my').show();
            commentSeqGrid({
              first : 1,
              masterId : masterId,
              contentId : contentsId,
              contentTitle : contentName,
              contentNo : seriesNo,
              ageCode : adultLevel,
              adultYn : erosYn,
              nickName : uN,
              userNo : uNov,
              videoType: typeCode,
              commentSize : 20,
              commentNo : '',
              rowNumber : '',
              order : 'new',
              parentCommentNo : '',
              my : '',
              userId : uId
            });
            e.preventDefault();
          });

          $(".btn_add_name").click(function(e){
            myNickNameCheck();
            e.preventDefault();
          });

          counter[1] = 0;
          $("#comment_list_add_comment_request_btn").click(function(e){
            counter[1]++;
            if ( counter[1] % 2 != 1 ) {
              $('#comment_list_area li').each( function () {
                $('#comment_list_area li').show();
                if(lastLength){
                  $('#comment_list_add_comment_request_btn').hide();
                }
              });
            } else {
              var lastConNo, lastRowNo;
              lastRowNo = $('#comment_list_area').children().last().index() +1;
              var tmp = $('#comment_list_area').children().last();
              if(tmp.attr('class') == 'comment_reply_wrap'){
                lastConNo = tmp.attr('id');
              } else {
                lastConNo = tmp.attr('class');
              }

              commentSeqGrid({
                first : 3,
                masterId : masterId,
                contentId : contentsId,
                contentTitle : contentName,
                contentNo : seriesNo,
                ageCode : adultLevel,
                adultYn : erosYn,
                nickName : uN,
                userNo : uNov,
                videoType : typeCode,
                commentSize : 20, //size
                commentNo: lastConNo,
                rowNumber: lastRowNo,
                order : orderType, //order
                parentCommentNo: '', //parentCommentNo
                my : checkMy, //myYn
                index : '', //순서
                replyCount : '' //댓글수
              });
            }

            e.preventDefault();
          });

          if(option.parentCommentNo !== "" && option.replyCount !== ""){
            counter[0] = 0;
            $("."+option.parentCommentNo).find('.btn_reply').addClass("on");
            commentReplyCheck(option.parentCommentNo, option.index, '', '', option.replyCount);
          }

        }
        var listLength = $("#comment_list_area li").length;
        var lastLength = false;
        $("#comment_list_area li").each( function ( i ) {
          if(counter[1] == 0){
            if(str.has_more == 'Y'){
              $('#comment_list_add_comment_request_btn').show();
            } else {
              $('#comment_list_add_comment_request_btn').hide();
            }
          } else {
            if(listLength % 10 == 0){
              if(listLength == 10){

              } else if( listLength != 10 && i + 1 > listLength-10){
                $('#comment_list_add_comment_request_btn').show();
                $(this).hide();
              }

            } else {
              if (listLength > 10 && listLength < 20) {
                $('#comment_list_add_comment_request_btn').show();
                if (i > 9) {
                  $(this).hide();
                }
                lastLength = true;
              } else if (listLength % 10 < 10) {
                $('#comment_list_add_comment_request_btn').hide();
              }
            }
          }




          if( i >= beforeIndex){

            $( this ).find( '.btn_like' ).click(function(e){
              if(uN === ""){
                var url = location.href.split("/v/");
                userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
              }
              if(uN !== "") {
                var contentNum = $(this).parents('li').attr('class');
                commentLike(contentNum);
              }
              e.preventDefault();
            });

            $( this ).find( '.btn_hate' ).click(function(e){
              if(uN === ""){
                var url = location.href.split("/v/");
                userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
              }
              if(uN !== "") {
                var contentNum = $(this).parents('li').attr('class');
                commentHate(contentNum);
              }
              e.preventDefault();
            });

            $( this ).find( '.btn_reply' ).click( function ( e ) {
              var li = $(this).parents('li');
              var s = li.index();
              flag = 1;
              counter[0] = 0;

              $('.comment_list_box li').not(li).find('.btn_reply').removeClass("on");
              var check_val = $(this).hasClass("on");
              if(!check_val){
                $(this).addClass("on");
              } else {
                $(this).removeClass("on");
              }

              $('.comment_list_box li').not(li).find('#reply_content_area_close').trigger('click');
              $('.update_comment_btn_close').trigger('click');
              if(li.find('.comment_reply_wrap').length === 0){
                var replyCount = $(this).find(".reply_count_area").text();
                var contentNum = $(this).parents('li').attr('class');
                commentReplyCheck(contentNum, s, '', '', replyCount);
              } else {
                $('#reply_content_area_close').trigger('click');
              }
              e.preventDefault();
            } );

            $( this ).find( '.my_comment_update' ).click( function ( e ) {

              $('#reply_content_area_close').trigger('click');
              $('.update_comment_btn_close').trigger('click');

              var wcontent = $(this).parents('.comment_box.mine').find('.comment_cont span').html().replace(/<br>/g,"\n");
              wcontent = wcontent.trim();

              var li = $(this).parents('.comment_box').parent();
              li.find('.comment_box.mine').hide();
              li.prepend(myCommentUpdateForm(wcontent));

              commonContentLengthCheck("#reply_upate_set_text_area","#reply_upate_set_count");

              li.find('.update_comment_btn_close').click(function(e){
                $(this).parents('li').children().show();
                $(this).parents('.comment_box.modify').remove();
                e.preventDefault();
              });

              $("#content_update_register_request").click(function(){
                var context = $('#reply_upate_set_text_area').val();
                if(context === ""){
                  commonContentNullCheck('댓글입력','댓글 내용을 입력하지 않았습니다.','only');
                } else {
                  var contentNum = $(this).parents('li').attr('class');
                  jamoCheck(context,'cu','','','',contentNum,'');
                }
              });
              $(".btn_add_name").click(function(e){
                myNickNameCheck();
                e.preventDefault();
              });
              e.preventDefault();
            });

            $( this ).find( '.my_comment_delete' ).click( function ( e ){
              var contentNum = $(this).parents('li').attr('class');
              commonContentDelete('댓글삭제','댓글을 삭제하시겠습니까?','',contentNum,'','','');
              e.preventDefault();
            });

            $( this ).find( '.comment_tool .request_report_area' ).click( function ( e ){
              if(uN === ""){
                var url = location.href.split("/v/");
                userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
              } else {
                var nm = $(this).parents('.comment_box').find('.info_name').text();
                var contentNum = $(this).parents('li').attr('class');
                reportComment(nm, contentNum, uN);
              }
              e.preventDefault();
            });
//---------------------------------
            $( this ).find('.only_my_comment_delete').click(function(e){
              var contentNum = $(this).parents('li').attr('class');
              commonContentDelete('댓글삭제','댓글을 삭제하시겠습니까?','',contentNum,'','','my');
              e.preventDefault();
            });

            $( this ).find('.only_my_comment_reply_cancel').click(function(e){
              var convert = $(this).parents('.comment_reply_wrap').attr('id');
              var contentNum = convert.replace('comment_reply_wrap ','');
              commonContentDelete('댓글삭제','댓글을 삭제하시겠습니까?','',contentNum,'','','my');
              e.preventDefault();
            });

            $( this ).find('.only_my_comment_reply_update').click(function(e){
              $('.update_reply_btn_close').trigger('click');
              $('.update_comment_btn_close').trigger('click');

              var content =  $(this).parents('.reply_box').find('.reply_cont').html().replace(/<br>/g,"\n");
              var contentNum = $(this).parents('.comment_reply_wrap').attr('id');
              var li = $(this).parents('.reply_box').parent();
              li.find('.reply_box.mine').hide();
              li.prepend(myReplyUpdateForm(content));

              commonContentLengthCheck("#reply_content_write_textarea_update","#reply_content_write_counter_update");

              li.find('.update_reply_btn_close').click(function(e){
                $(this).parents('li').children().show();
                $(this).parents('.reply_update_form').remove();
                e.preventDefault();
              });

              li.find('.comment_reply_insert_update').click(function(){
                var context = $('#reply_content_write_textarea_update').val();
                if(context === ""){
                  commonContentNullCheck('댓글입력','댓글 내용을 입력하지 않았습니다.','only');
                } else {
                  jamoCheck(context,"ru",'','', '',contentNum,'my');
                }
              });
              $(".btn_add_name").click(function(e){
                myNickNameCheck();
                e.preventDefault();
              });
              e.preventDefault();
            });
//------------------------------
          }
        } );

        beforeIndex = $("#comment_list_area li").last().index();

      }

      function gridCommentList(str) {
        var html = '';
        var replyCount, likeCount, hateCount;
        commentsarr = str.comments;

        for (var i = 0; i < commentsarr.length; i++) {
          replyCount = numberToAbbreviation(commentsarr[i].reply_count);
          likeCount = numberToAbbreviation(commentsarr[i].like_count);
          hateCount = numberToAbbreviation(commentsarr[i].dislike_count);

          html += "   <li class="+ commentsarr[i].comment_no+">";
          if(commentsarr[i].my_comment_yn === "Y"){
            html += "     <div class='comment_box mine'>";
          } else{
            html += "     <div class='comment_box'>";
          }

          html += "       <div class='comment_info'>";
          html += "        <span class='info_name'>" + commentsarr[i].display_name + "</span>";
          html += "       </div>";
          html += "       <div class='comment_cont'>";

          if (commentsarr[i].recommend_yn === "Y") {
            html += "         <i class='ico_recommend'>추천</i>";
          }

          html += "<span>" + commonContentsEnterCheck(commentsarr[i].content) + "</span>";
          html += "       </div>";
          html += "       <div class='comment_tool'>";
          html += "         <span class='text_time'>" + commentsarr[i].dt_insert + "</span>";

          if(commentsarr[i].blind_author === null) {
            if(commentsarr[i].my_comment_yn === "Y"){
              html += "         <a href='#' class='btn_tool my_comment_update'>수정</a>";
            } else {
              html += "         <a href='javascript:void(0);' class='btn_tool request_report_area' >신고</a>";
            }
          }

          html += "         <div class='tool_right_box'>";
          html += "           <button type='button' class='btn_reply'>답글<em class='reply_count_area'>" + replyCount + "</em></button>";

          if(commentsarr[i].like_yn === "Y"){
            html += "           <button type='button' class='btn_like on'>" + likeCount + "</button>";
          } else if(commentsarr[i].blind_author !== null){
            html += "           <button type='button' class='btn_like disabled' disabled='disabled'>" + likeCount + "</button>";
          } else {
            html += "           <button type='button' class='btn_like'>" + likeCount + "</button>";
          }

          if(commentsarr[i].dislike_yn === "Y"){
            html += "           <button type='button' class='btn_hate on'>" + hateCount + "</button>";
          } else if(commentsarr[i].blind_author !== null){
            html += "           <button type='button' class='btn_hate disabled' disabled='disabled'>" + hateCount + "</button>";
          } else {
            html += "           <button type='button' class='btn_hate'>" + hateCount + "</button>";
          }

          html += "         </div>";
          html += "       </div>";
          if(commentsarr[i].my_comment_yn === "Y" && commentsarr[i].blind_author === null){
            html += "<a href='#' title='닫기' class='btn_close my_comment_delete'>닫기</a>";
          }
          html += "     </div>";
          html += "   </li>";
        }
        return html;

      }

      function gridMyCommentList(str){

        var my = '';
        for(var i = 0 ; i < str.comments.length; i++){

          if(str.comments[i].parent_comment_no == 0){
            my += gridMyComment(str.comments[i]);

          } else {

            my += "<div class='comment_reply_wrap' id='" + str.comments[i].comment_no + "'>";
            my += " <ul class='reply_list_box'>";
            my +=     gridMyReply(str.comments[i]);
            my += " </ul>";
            my += "</div>";

          }
        }
        return my;
      }

      function gridMyComment(str){

        var myComment = '';
        var replyCount, likeCount, hateCount;

        replyCount = numberToAbbreviation(str.reply_count);
        likeCount = numberToAbbreviation(str.like_count);
        hateCount = numberToAbbreviation(str.dislike_count);

        myComment += "   <li class=" + str.comment_no + ">";
        myComment += "     <div class='comment_box mine'>";
        myComment += "       <div class='comment_info'>";
        myComment += "        <span class='info_name'>" + str.display_name + "</span>";
        myComment += "       </div>";
        myComment += "       <div class='comment_cont'>";

        if (str.recommend_yn === "Y") {
          myComment += "         <i class='ico_recommend'>추천</i>";
        }

        myComment += commonContentsEnterCheck(str.content);
        myComment += "       </div>";
        myComment += "       <div class='comment_tool'>";
        myComment += "         <span class='text_time'>" + str.dt_insert + "</span>";

        if(str.blind_author === null) {
          myComment += "         <a href='javascript:;' class='btn_tool my_comment_update'>수정</a>";
        }

        myComment += "         <div class='tool_right_box'>";
        myComment += "           <button type='button' class='btn_reply'>답글<em class='reply_count_area'>" + replyCount + "</em></button>";

        if(str.like_yn === "Y"){
          myComment += "           <button type='button' class='btn_like on'>" + likeCount + "</button>";
        } else if(str.blind_author !== null){
          myComment += "           <button type='button' class='btn_like disabled' disabled='disabled'>" + likeCount + "</button>";
        } else {
          myComment += "           <button type='button' class='btn_like'>" + likeCount + "</button>";
        }

        if(str.dislike_yn === "Y"){
          myComment += "           <button type='button' class='btn_hate on'>" + hateCount + "</button>";
        } else if(str.blind_author !== null){
          myComment += "           <button type='button' class='btn_hate disabled' disabled='disabled'>" + hateCount + "</button>";
        } else {
          myComment += "           <button type='button' class='btn_hate'>" + hateCount + "</button>";
        }

        myComment += "         </div>";
        myComment += "       </div>";
        if(str.blind_author === null){
          myComment += "<a href='#' title='닫기' class='btn_close only_my_comment_delete'>닫기</a>";
        }
        myComment += "     </div>";
        myComment += "   </li>";

        return myComment;
      }

      function gridMyReply(str){
        var reply = "";

        reply += "<li>";
        reply += "<div class='reply_box mine'>";
        reply += "<div class='reply_info'>";
        reply += "<span class='info_name'>" + str.display_name + "</span>";
        reply += "</div>";
        reply += "<div class='reply_cont'>";
        reply += commonContentsEnterCheck(str.content);
        reply += "</div>";
        reply += "<div class='comment_tool'>";
        reply += "<span class='text_time'>" + str.dt_insert + "</span>";
        reply += "<a href='javascript:;' class='btn_tool only_my_comment_reply_update'>수정</a>";
        reply += "</div>";
        reply += "<a href='javascript:;' title='닫기' class='btn_close only_my_comment_reply_cancel'>닫기</a>";
        reply += "</div>";
        reply += "</li>";

        return reply;
      }

      function commentInsertRequest(content, parent, index, replyCount) {

        if(uN !== null && content.length <= 400 && content !== ""){

          $.ajax({
            url: "/api/comment/insert",
            type: "post",
            cache:false,
            data: {
              typeCode: typeCode,
              masterId: masterId,
              contentsId: contentsId,
              contentName: contentName,
              replyContent: content,
              nickName: uN,
              adultLevel: adultLevel,
              erosYn: erosYn,
              parentCommentNo: parent
            },
            success: function (result) {
              if(result.result === "CO-89301"){
                commonContentNullCheck('댓글입력','oksusu가 지정한 금칙어로 입력이 제한됩니다.','badwords');
              }

              if(result.result === "CO-89202"){ //댓글 신
                var st = convertDate(result.root.start_date);
                var et = convertDate(result.root.end_date);
                var context = '댓글 신고가 접수되어 심사 진행한 결과,<br />'+ st + ' ~ ' + et + '까지<br />댓글 이력이 제한됩니다.';
                commonContentNullCheck('댓글입력', context ,'only');
              }

              if(result.result === "CO-89201"){ //oksusu
                var context = 'Oksusu 운영정책에 따라 댓글 서비스 이용이<br /> 영구 정지 처리되었습니다';
                commonContentNullCheck('댓글입력', context, 'only');
              }

              if(result.result === "OK"){
                //플레이어 연동 등록 후 연속 재생 처리
                OksusuVideo.relay.on();

                beforeIndex = 0;
                var liSize = $('#comment_list_area').children().last().index() + 1;
                if(liSize < 20) liSize = 20;
                commentSeqGrid({
                  first: 1,
                  masterId: masterId,
                  contentId: contentsId,
                  contentTitle: contentName,
                  contentNo: seriesNo,
                  ageCode: adultLevel,
                  adultYn: erosYn,
                  nickName: uN,
                  userNo: uNov,
                  videoType: typeCode,
                  commentSize : liSize,
                  commentNo: '',
                  rowNumber: '',
                  parentCommentNo: parent,
                  order : orderType,
                  my : checkMy,
                  index : index,
                  replyCount : parseInt(replyCount)+1
                });
              }
            }, error : function() {

              var online = netWorkCheck();
              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }
      }

      function convertDate(str){
        var temp = str.substr(0,8);
        var cyear = temp.substr(0,4);
        var cmonth = temp.substr(4,2);
        var cday = temp.substr(6,8);
        var date = cyear+"년 "+cmonth+"월 "+cday +"일";
        return date;
      }

     //입력체크 :자모체크, 스페이스체크
      function jamoCheck(injamowd,incmtyn,inparent,inindex,inreplayCount, incontentNum, my)  {
        var tmp = /[a-z]|[0-9]/gi; // 알파벳과 숫자
        var repjamo = '';
        var pattern = /([^ㄱ-ㅎㅏ-ㅣ])/i;
        var cmtmsg = '댓글';
        var repmsg = '답글';
        var dispmsg = '';
        var regType = /^[A-Za-z0-9+]*$/;
        var spjamo = '';

        //순서는 건드리지마세요
        //자모체크
        if (tmp.test(injamowd))  {
          repjamo = injamowd;
        } else {
          //전체공백제거
           spjamo = injamowd.replace(/ /gi,"");
           repjamo  = spjamo.replace(regType, '');
        }

          //스페이스체크
          var spchkyn = spaceChk(injamowd);

         //댓글답글구분
          //
          var titmsg = new Array (' 댓글 입력',' 댓글 수정',' 답글 입력',' 답글 수정');
          var chkmag = '';
          switch(incmtyn) {
              case 'ci' :   //댓글입력
                  chkmsg = titmsg[0];
                  break;
              case 'cu' :   //댓글수정
                  chkmsg = titmsg[1];
                  break;
              case 'ri' :   //답글입력
                  chkmsg = titmsg[2];
                  break;
              case 'ru' :   //답글수정
                  chkmsg = titmsg[3];
                 }

          var incmtynEdit = '';
          if (spchkyn == 'Y') {
              incmtynEdit = 'nl' +  incmtyn ;
          }
          else {
              incmtynEdit = incmtyn;
               }

         //앞뒤 공백문자만 삭제
        var insertTxt = injamowd.trim() ;

          if (pattern.test(repjamo)) {     //자음모음 chk
           switch(incmtynEdit.substr(0,2)) {
            case 'ci' :   //댓글입력
              dispmsg = cmtmsg;
              commonContentInsert(dispmsg+'등록',dispmsg+'을 등록하시겠습니까?','',insertTxt,'','','');
              break;
            case 'cu':    //댓글수정
              dispmsg = cmtmsg;
              commonContentUpdate(dispmsg+'수정','수정한 댓글로 등록하시겠습니까?','',insertTxt,incontentNum,'','','');
              break;
            case 'ri' :  //답글입력
              dispmsg = repmsg;
              commonContentInsert(dispmsg+'등록',dispmsg+'을 등록하시겠습니까?','', insertTxt, inparent, inindex,inreplayCount);
              break;
            case 'ru' :  //답글수정
                dispmsg = repmsg;
              commonContentUpdate(dispmsg+'수정','수정한 답글로 등록하시겠습니까?','',insertTxt, incontentNum, inparent, inreplayCount, my);
               break;
            case 'nl' :  //공백
                dispmsg = chkmsg;
                commonContentNullCheck(dispmsg ,'공백으로만 구성된 ' + dispmsg +' 은 제한됩니다.','only');
               }
            }
        else {
           //공백,자음모음
            switch(incmtynEdit.substr(0,2)) {
                case 'nl' :  //공백
                    dispmsg = chkmsg;
                   commonContentNullCheck(dispmsg,'공백으로만 구성된 ' + dispmsg +' 은 제한됩니다.','only');
                    break;
                default  :
                    dispmsg = chkmsg;
                    commonContentNullCheck(dispmsg,'자음, 모음만으로 구성된 ' + dispmsg + '은 제한됩니다.','only');
                  }

            }
      }

      //space check
      function spaceChk(spcword) {
       var spresult = 'N';
       var blank_pattern = /^\s+|\s+$/gi;
       var jamotxt =  '';
       var tmptxt = '';

          // 공백제거
          tmptxt =  spcword.replace(blank_pattern, '');
          //탭제거
          tmptxt.replace(/^\s/gm, '');
          //엔터값제거
          jamotxt = tmptxt.replace(/\r\n$/gi, '');

          if (jamotxt.length == 0) {
              spresult = 'Y';
          } else {
              spresult = 'N';
          }
        return  spresult
      }

      function commentLike(commentNo){
      if (uN === "") {
        var url = location.href.split("/v/");
        userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
      }  else {
        $.ajax({
          url: "/api/comment/like",
          type: "get",
          cache:false,
          data: {
            commentNo: commentNo
          },
          success: function (result) {
            if(result.result === "OK"){

              var likeCount = numberToAbbreviation(result.root.like_count);
              var hateCount = numberToAbbreviation(result.root.dislike_count);

              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').empty();
              $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').empty();
              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').addClass("on");
              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').append(likeCount);
              $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').append(hateCount);
            }

            if(result.result === "CO-89601"){
              commentUnLike(commentNo);
            }

            if(result.result ===  "CO-89603"){
              commentLikeHateDirectEvect('hateToLike',commentNo);
            }
            if(result.result === "CO-89010"){
              commonContentNullCheck('추천하기',$("#comment_list_area").find(commentNo).children().find('.comment_cont').text(), 'only');
            }
          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }
    }

      function commentUnLike(commentNo){
        $.ajax({
          url: "/api/comment/unlike",
          type: "get",
          cache:false,
          data: {
            commentNo: commentNo
          },
          success: function (result) {
            if(result.result === "OK"){

              var likeCount = numberToAbbreviation(result.root.like_count);
              var hateCount = numberToAbbreviation(result.root.dislike_count);

              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').empty();
              $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').empty();
              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').removeClass("on");
              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').append(likeCount);
              $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').append(hateCount);
            }
          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }

      function commentHate(commentNo){
        if (uN === "") {
          var url = location.href.split("/v/");
          userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
        }  else {
          $.ajax({
            url: "/api/comment/hate",
            type: "get",
            cache:false,
            data: {
              commentNo: commentNo
            },
            success: function (result) {

              if(result.result === "OK"){

                var likeCount = numberToAbbreviation(result.root.like_count);
                var hateCount = numberToAbbreviation(result.root.dislike_count);

                $("#comment_list_area").find("."+commentNo).children().find('.btn_like').empty();
                $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').empty();
                $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').addClass("on");
                $("#comment_list_area").find("."+commentNo).children().find('.btn_like').append(likeCount);
                $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').append(hateCount);
              }

              if(result.result ===  "CO-89603"){
                commentNoHate(commentNo);
              }

              if(result.result ===  "CO-89601"){
                commentLikeHateDirectEvect('likeToHate',commentNo);
              }

              if(result.result === "CO-89010"){
                commonContentNullCheck('추천하기',$("#comment_list_area").find(commentNo).children().find('.comment_cont').text(), 'only');
              }
            }, error : function() {

              var online = netWorkCheck();
              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }
      }

      function commentNoHate(commentNo){
        $.ajax({
          url: "/api/comment/nohate",
          type: "get",
          cache:false,
          data: {
            commentNo: commentNo
          },
          success: function (result) {
            if(result.result === "OK"){

              var likeCount = numberToAbbreviation(result.root.like_count);
              var hateCount = numberToAbbreviation(result.root.dislike_count);

              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').empty();
              $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').empty();
              $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').removeClass("on");
              $("#comment_list_area").find("."+commentNo).children().find('.btn_like').append(likeCount);
              $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').append(hateCount);
            }
          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }

      function commentLikeHateDirectEvect(to, commentNo) {
        if (to === 'hateToLike') {
          $.ajax({
            url: "/api/comment/nohate",
            type: "get",
            cache:false,
            data: {
              commentNo: commentNo
            },
            success: function (result) {
              if (result.result === "OK") {
                $("#comment_list_area").find("."+commentNo).children().find('.btn_hate').removeClass("on");
                commentLike(commentNo);
              }
            }, error : function() {

              var online = netWorkCheck();
              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }
        if (to === 'likeToHate') {
          $.ajax({
            url: "/api/comment/unlike",
            type: "get",
            cache:false,
            data: {
              commentNo: commentNo
            },
            success: function (result) {
              if (result.result === "OK") {
                $("#comment_list_area").find("."+commentNo).children().find('.btn_like').removeClass("on");
                commentHate(commentNo);
              }
            }, error : function() {

              var online = netWorkCheck();
              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }
      }

      function commentReplyCheck(parent, index, lastNum, lastRow, replyCount) {
        $.ajax({
          url: "/api/comment/list",
          data: {
            masterId: masterId,
            contentsId: contentsId,
            typeCode: typeCode,
            parentCommentNo: parent,
            order : orderType, //order
            lastCommentNo:lastNum,
            lastRowNumber:lastRow
          },
          type: "get",
          cache:false,
          success: function (result) {
            commentReplyGrid(result, index, parent, replyCount);
          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }

      function commentReplyGrid(str, index, parent, replyCount){
        var reply = "";
        var i;

        counter[0]++;

        switch ( flag ) {

          case 1 :

            reply += "<div class='comment_reply_wrap'>";
            if(str.root.comments !== null) {
              replyarr = str.root.comments;
              reply += "<ul class='reply_list_box'>";

              reply += commentReplyGridList(replyarr);

              reply += "</ul>";
              if(replyCount > 10){
                reply += "<a href='javascript:;' title='답글 더보기' class='btn_reply_more'><span>답글 더보기</span></a>";
              }
            }

            reply += " <div class='reply_mine_box origin'>";
            reply += "   <div class='comment_write_box'>";
            reply += "     <div class='write_box type02'>";
            reply += "       <div class='comment_info'>";
            reply += "         <span class='info_name'>" + uN + "</span>";
            reply += "         <a href='javascript:;' title='닉네임 등록' class='btn_add_name'>닉네임 등록</a>";
            reply += "       </div>";
            reply += "       <label>주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.</label>";
            reply += "       <textarea cols='30' placeholder='주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.' class='write_textarea' id='reply_content_write_textarea'></textarea>";
            reply += "     </div>";

            reply += "     <button type='button' class='btn_register comment_reply_insert'>등록</button>";
            reply += "     <span class='write_count'><em id='reply_content_write_counter'></em>/<em>400</em></span>";
            reply += "   </div>";
            reply += "  </div>";
            reply += " <a href='#' title='답글 접기' class='btn_reply_close' id='reply_content_area_close'><span>답글 접기</span></a>";
            reply += "</div>";

            $(".comment_list_box li").eq(index).append(reply);

            $('#reply_content_area_close').click(function(e){
              $('.comment_list_box li').eq(index).find('.btn_reply').removeClass("on");
              $(".comment_list_box li").eq(index).find('.comment_reply_wrap').remove();
              e.preventDefault();
            });

            $(".btn_reply_more").click(function(){
              replyCount = replyCount-10;
              if(replyCount < 10){
                $(this).remove();
              }
              flag = 2;
              commentReplyCheck(parent, index, replyarr[replyarr.length-1].comment_no, replyarr[replyarr.length-1].rnum, replyCount);
            });

            $(".comment_reply_insert").click(function(e){
              var context = $("#reply_content_write_textarea").val();
              if(context === ""){
                commonContentNullCheck('답글입력','답글 내용을 입력하지 않았습니다.','only');
              } else {
                jamoCheck(context,"ri",parent, index, replyCount,'');
              }

              $(".btn_add_name").click(function(e){
                myNickNameCheck();
                e.preventDefault();
              });
              e.preventDefault();
            });

            break;

          case 2 :
            if(str.root.comments !== null){
              reply += commentReplyGridList(str.root.comments);
              $(".reply_list_box").append(reply);
              for ( i in str.root.comments ) {
                replyarr.push( str.root.comments[i] );
              }
            }

           break;

        }

        commonContentLengthCheck("#reply_content_write_textarea","#reply_content_write_counter");


        $(".comment_reply_update").each( function () {

          if ( $( this ).parents( 'li' ).attr( 'add' ) == counter[0] ) {
            $( this ).click( function ( e ) {
              var li = $(this).parents('li').eq(0);
              var content = $(this).parents('.reply_box').find('.reply_cont').html().replace(/<br>/g,"\n");
              $('.reply_list_box li').not(li).find('.update_reply_btn_close').trigger('click');
              li.children().hide();
              $(".reply_mine_box.origin").hide();

              li.append(myReplyUpdateForm(content));
              commonContentLengthCheck("#reply_content_write_textarea_update","#reply_content_write_counter_update");

              li.find('.update_reply_btn_close').click(function(e){
                $(".reply_mine_box.origin").show();
                $(this).parents('li').children().show();
                $(this).parents('.reply_update_form').remove();
                e.preventDefault();
              });

              $(".comment_reply_insert_update").click(function(){
                var context = $('#reply_content_write_textarea_update').val();
                if(context === ""){
                  commonContentNullCheck('답글입력','답글 내용을 입력하지 않았습니다.','only');
                } else {
                  jamoCheck(context,"ru",parent, li.index(), replyCount,replyarr[li.index()].comment_no,'');
                }
              });

              $(".btn_add_name").click(function(e){
                myNickNameCheck();
                e.preventDefault();
              });

              e.preventDefault();

            } );

          }

        } );

        $(".comment_reply_cancel").click(function(e){
          var s = $(this).parents('.reply_box').parent().index();
          commonContentDelete('답글삭제','답글을 삭제하시겠습니까?','',replyarr[s].comment_no, parent, replyCount, index);
          e.preventDefault();
        });

        $(".btn_add_name").click(function(e){
          myNickNameCheck();
          e.preventDefault();
        });

        $(".request_report_area.reply").click(function(e){
          if(uN === ""){
            var url = location.href.split("/v/");
            userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
          } else {
            var nm = $(this).parents('.reply_box').find('.info_name').text();
            var s = $(this).parents('.reply_box').parent().index();
            reportComment(nm, replyarr[s].comment_no, uN);
          }
          e.preventDefault();
        });
      }

      function commentReplyGridList(replyarr){
        var reply = "";

        for (var i = 0; i < replyarr.length; i++) {
          reply += "<li add='" + counter[0] + "' class='" + replyarr[i].comment_no + "'>";
          if(replyarr[i].muser_num === uNov){
            reply += "<div class='reply_box mine '>";
          } else {
            reply += "<div class='reply_box'>";
          }
          reply += "<div class='reply_info'>";
          reply += "<span class='info_name'>" + replyarr[i].display_name + "</span>";
          reply += "</div>";
          reply += "<div class='reply_cont'>";
          reply += commonContentsEnterCheck(replyarr[i].content);
          reply += "</div>";
          reply += "<div class='comment_tool'>";
          reply += "<span class='text_time'>" + replyarr[i].dt_insert + "</span>";
          if(replyarr[i].muser_num === uNov){
            reply += "<a href='javascript:;' class='btn_tool comment_reply_update'>수정</a>";
          } else {
            if(replyarr[i].blind_author === null) {
              reply += "<a href='javascript:;' class='btn_tool request_report_area reply'>신고</a>";
            }
          }
          reply += "</div>";
          if(replyarr[i].muser_num === uNov){
            reply += "<a href='javascript:;' title='닫기' class='btn_close comment_reply_cancel'>닫기</a>";
          }
          reply += "</div>";
          reply += "</li>";
        }
        return reply;
      }

      function reportComment(nm, no) {
        $.ajax({
          url: "/api/comment/report/list",
          type: "get",
          cache:false,
          success: function (result) {

            var tmp = result.root;
            $(".info_notice_msg").empty();

            reportCommentGrid(tmp, nm, no);

          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }

      function reportCommentGrid(tmp, nm, no) {
        report = "";
        var temp = tmp.reasons;

        report += "<div class='popup_wrap'>";
        report += " <div class='pop_wrap_inner comment_report'>";

        report += "   <div class='popup_header'>신고하기";
        report += "     <a href='#' class='popup_btn_close' title='댓글 신고 닫기'>닫기</a>";
        report += "   </div>";

        report += "<div class='popup_content'>";


        report += "<div class='comment_report_wrap'>";
        report += "<div class='repert_box'>";
        report += "<div class='title title_name'>신고자</div>";
        report += "<div class='text_detail title_name'>" + uId + "</div>";
        report += "</div>";

        report += "<div class='repert_box'>";
        report += "<div class='title title_target'>신고대상</div>";
        report += "<div class='text_detail title_contact_number'>" + nm + "</div>";
        report += "</div>";

        report += "<div class='repert_box'>";
        report += "<div class='title title_target'>신고사유</div>";
        report += "<div class='text_detail title_contact_reason'>";
        report += "<ul>";
        for (var i = 0; i < temp.length; i++) {
          report += "<li>";
          report += " <div class='select_report_box_inner rdo_wrap'>";
          if(i == 0 ){
            report += "   <input type='radio' id='lbl_lrw0" + (i + 1) + "' name='lrw_rdo' class=" + temp[i].reason_no + " title='신고' checked='checked'>";
          } else {
            report += "   <input type='radio' id='lbl_lrw0" + (i + 1) + "' name='lrw_rdo' class=" + temp[i].reason_no + " title='신고' >";
          }
          report += "     <label for='lbl_lrw0" + (i + 1) + "' class='lbl_lrw'>";
          report += "       <div class='btn_rdo_layer'>";
          report += "         <div class='btn_rdo_point'></div>";
          report += "       </div> ";
          report += "     <span>" + temp[i].reason + "</span>";
          report += "   </label>";
          report += " </div>";
          report += "</li>";
        }
        report += "</ul>";
        report += "</div>";
        report += "</div>";
        report += "</div>";

        report += "<div class='info_notice_msg type02'>";
        report += " <i class='ico_info_gray'></i>" + tmp.guide_message;
        report += "</div>";
        report += "</div>";

        report += "<div class='popup_footer'>";
        report += "<button type='button' class='btn_default find' id='report_confirm_comment_request'>신고하기</button>";
        report += "<button type='button' class='btn_default cancel' id='report_confirm_comment_cancel'>취소</button>";
        report += "</div>";

        report += " </div>";
        report += "</div>";

        var ddIndex;

        $("#comment_report_popup_layer").empty();
        $("#comment_report_popup_layer").append( report );
        $("#comment_report_popup_layer").show();

        $(".popup_btn_close").click(reportClose);
        $("#report_confirm_comment_cancel").click(reportClose);

        $('input:radio[name="lrw_rdo"]').click(function () {
          ddIndex = $(this).attr("class");
        });

        $("#report_confirm_comment_request").click(function (e) {
          if(!$('input:radio[name="lrw_rdo"]').is(':checked')){
            commonContentNullCheck('신고하기','신고사유를 선택해 주시기 바랍니다.','only');
          }
          if($('input:radio[name="lrw_rdo"]').is(':checked')) {

            if(ddIndex == undefined){
              ddIndex = 1;
            }

            requestReport(no, ddIndex);
            $("#comment_report_popup_layer").hide();
            e.preventDefault();
          }

        });
      }

      function requestReport(commentNo, reasonNo) {

        $.ajax({
          url: "/api/comment/report",
          type: "get",
          data : {
            commentNo : commentNo,
            reasonNo : reasonNo
          },
          cache:false,
          success: function (result) {
            if(result.result === "OK"){
              commonContentNullCheck('신고하기','신고가 완료되었습니다.','only');
            }

            if(result.result === "CO-89402") {
              commonContentNullCheck('신고하기', result.message, 'only');
            }


          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }

      function reportClose(e) {
        $(".title_contact_number").empty();
        $("#comment_report_popup_layer").hide();
        e.preventDefault();
      }

      function myCommentDeleteRequest(str, parent, replyCount, index){

        var parentContent = '';
        $.ajax({
          url: "/api/comment/delete",
          type: "get",
          data: {
            commentNo: str
          },
          cache:false,
          success: function (result) {
            pageSize = 0;

            if(index == 'my'){
              $('#comment_list_area').children().each(function () {
                if($(this).css('display') != 'none'){
                  pageSize++;
                }
              });
            } else {
              if(parent){
                parentContent = $('#comment_list_area').find('.' + parent + ' .comment_box .comment_cont').text();
              }
              $('#comment_list_area li').each(function(){
                if($(this).css('display') != 'none'){
                  pageSize++;
                }
              });
            }

           if(result.result === "OK"){
             //플레이어 연동 삭제 후 연속 재생 체크
             OksusuVideo.relay.on();
             beforeIndex = 0;
             if(parentContent.indexOf('작성자에 의해 삭제') > -1 || parentContent.indexOf('oksusu 운영정책에 의해 삭제된 댓글') > -1){
               parent = '';
               replyCount = '';
             }

             var liSize = $('#comment_list_area').children().last().index() + 1;
             if(liSize < 20) liSize = 20;
             commentSeqGrid({
               first: 1,
               masterId: masterId,
               contentId: contentsId,
               contentTitle: contentName,
               contentNo: seriesNo,
               ageCode: adultLevel,
               adultYn: erosYn,
               nickName: uN,
               userNo: uNov,
               videoType: typeCode,
               commentSize : liSize,
               commentNo: '',
               rowNumber: '',
               parentCommentNo: parent,
               order : orderType,
               my : checkMy,
               index : index,
               replyCount : replyCount
             });
           }
          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }

      function myCommentUpdateRequest(content, str, parent, replyCount, my){

        if(content !== ""){
          $.ajax({
            url: "/api/comment/update",
            type: "get",
            data: {
              replyContent : content,
              replyContentNo: str,
              nickName : uN
            },
            cache:false,
            success: function (result) {

              if(parent == '' && my == ''){
                $('#comment_list_area').find('.'+str).children().show();
                $('#comment_list_area').find('.'+str +' .comment_box.mine.modify').remove();
              } else if(parent == '' && my != '') {
                $('#comment_list_area').find('#' + str + ' ul li .reply_box.mine').show();
                $('#comment_list_area').find('#' + str + ' ul li .reply_update_form').remove();
              } else {
                $(".reply_mine_box.origin").show();
                $('.comment_reply_wrap ul').find('.' + str + ' .reply_box.mine ').show();
                $('.comment_reply_wrap ul').find('.' + str + ' .reply_update_form').remove();
              }

             if(result.result === "OK"){
                //플레이어 연동 업데이트 후 연속재생 체크
                OksusuVideo.relay.on();

                if(parent == '' && my == ''){
                  $('#comment_list_area').find('.' + str + ' .comment_box.mine .comment_cont span').html(commonContentsEnterCheck(content));
                } else if(parent == '' && my != '') {
                  $('#comment_list_area').find('#' + str + ' ul li .reply_box.mine .reply_cont').html(commonContentsEnterCheck(content));
                } else {
                  $('.comment_reply_wrap ul').find('.' + str + ' .reply_box.mine .reply_cont').html(commonContentsEnterCheck(content));
                }
              }

              if(result.result === "CO-89301"){
                commonContentNullCheck('댓글입력','oksusu가 지정한 금칙어로 입력이 제한됩니다.','badwords');
              }
              if(result.result === "CO-89202"){
                var st = convertDate(result.root.start_date);
                var et = convertDate(result.root.end_date);
                var context = '댓글 신고가 접수되어 심사 진행한 결과,<br />'+ st + ' ~ ' + et + '까지<br />댓글 이력이 제한됩니다.'
                commonContentNullCheck('댓글입력', context ,'only');
              }
              if(result.result === "CO-89201"){
                var context = 'Oksusu 운영정책에 따라 댓글 서비스 이용이<br /> 영구 정지 처리되었습니다'
                commonContentNullCheck('댓글입력', context, 'only');
              }
            }, error : function() {

              var online = netWorkCheck();

              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }

      }

      function myCommentUpdateForm(content){
        //content = content.replace('<i class="ico_recommend">추천</i>','');
        update = "";
        update += " <div class='comment_box mine modify'>";
        update += "   <div class='comment_mine_edit'>";
        update += "     <div class='comment_info'>";
        update += "       <span class='info_name'>" + uN + "</span>";
        update += "       <a href='#' title='닉네임 등록' class='btn_add_name'>닉네임 등록</a>";
        update += "     </div>";
        update += "     <div class='comment_write_box'>";
        update += "       <div class='write_box'>";
        update += "       <label>주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.</label>";
        update += "       <textarea cols='30' placeholder='주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.' class='write_textarea' id='reply_upate_set_text_area'>";
        update +=           content + "</textarea>";
        update += "     </div>";
        update += "     <button type='button' class='btn_register' id='content_update_register_request'>등록</button>";
        update += "     <span class='write_count'><em id='reply_upate_set_count'></em>/<em>400</em></span>";
        update += "    </div>";
        update += "   </div>";
        update += "   <a href='javascript:;' title='닫기' class='btn_close update_comment_btn_close'>닫기</a>";
        update += " </div>";

        return update;
      }

      function myReplyUpdateForm(content){

        replyUpdate = "";
        replyUpdate += "<div class='reply_update_form'>";
        replyUpdate += " <div class='reply_mine_box modify'>";
        replyUpdate += "   <div class='comment_write_box'>";
        replyUpdate += "     <div class='write_box'>";
        replyUpdate += "       <div class='comment_info'>";
        replyUpdate += "         <span class='info_name'>" + uN + "</span>";
        replyUpdate += "         <a href='#' title='닉네임 등록' class='btn_add_name'>닉네임 등록</a>";
        replyUpdate += "       </div>";
        replyUpdate += "       <label>주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.</label>";
        replyUpdate += "       <textarea cols='30' placeholder='주제와 무관한 글 또는 스포일러는 삭제될 수 있습니다.' class='write_textarea' id='reply_content_write_textarea_update'>";
        replyUpdate +=            content +"</textarea>";
        replyUpdate += "     </div>";
        replyUpdate += "     <button type='button' class='btn_cancel update_reply_btn_close'>취소</button>";
        replyUpdate += "     <button type='button' class='btn_register comment_reply_insert_update'>등록</button>";
        replyUpdate += "     <span class='write_count'><em id='reply_content_write_counter_update'>" + content.length + "</em><em>/400</em></span>";
        replyUpdate += "   </div>";
        replyUpdate += "  </div>";
        //replyUpdate += " <a href='#' title='답글 접기' class='btn_reply_close update_reply_btn_close'><span>답글 수정 접기</span></a>";
        replyUpdate += "</div>";

        return replyUpdate;
      }

      function myNickNameCheck(){
        if(uN === ""){

          var url = location.href.split("/v/");
          userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);

        } else {
          $.ajax({
            url: "/api/my/nickName/info",
            type: "get",
            cache:false,
            success: function (result) {

              if(result.change_yn === "N"){
                commonContentNullCheck('닉네임','닉네임 변경은 매달 1회 가능합니다.','only');
              } else {
                myNickNameGrid();
              }
            }, error : function() {

              var online = netWorkCheck();

              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }
      }

      function myNickNameGrid() {
        nick = "";
        nick += "<div class='popup_wrap my' style=''>";
        nick += " <div class='pop_wrap_inner'>";
        nick += "   <div class='popup_header'>닉네임<a href='#' class='popup_btn_close mynickname' title='팝업 닫기'>닫기</a></div>";
        nick += "   <div class='popup_content'>";
        nick += "     <p class='one_txt'>닉네임을 입력해 주세요.</p>";
        nick += "     <div class='popup_one_input'>";
        nick += "       <input type='text' title='닉네임을 입력해 주세요.' id='nickname_set_text_check'>";
        nick += "     </div>";
        nick += "     <div class='info_notice_msg'>1-8자 / 한글,영문,숫자 입력 가능</div>";
        nick += "     <div class='info_notice_msg gray'>";
        nick += "       <i class='ico_info_gray'></i>닉네임 변경은 매달 1회 가능합니다.";
        nick += "     </div>";
        nick += "     <div class='info_notice_msg red' style='display:none;'>";
        nick += "       <i class='ico_info_red_small'></i>";
        nick += "     </div>";
        nick += "   </div>";
        nick += "   <div class='popup_footer'>";
        nick += "     <button type='button' class='btn_default check mynickname'>확인</button>";
        nick += "     <button type='button' class='btn_default cancel mynickname'>취소</button>";
        nick += "   </div>";
        nick += " </div>";
        nick += "</div>";

        $("#comment_report_popup_layer").empty();
        $("#comment_report_popup_layer").append(nick);
        $("#comment_report_popup_layer").show();

        $(".popup_btn_close.mynickname").click(function (e) {
          $("#comment_report_popup_layer").empty();
          $("#comment_report_popup_layer").hide();
          e.preventDefault();
        });

        $(".btn_default.cancel.mynickname").click(function (e) {
          $("#comment_report_popup_layer").empty();
          $("#comment_report_popup_layer").hide();
          e.preventDefault();
        });

        $(".btn_default.check.mynickname").click(function () {

          if ($("#nickname_set_text_check").val() === "") {
            var text = "닉네임을 입력해주세요";
            $(".info_notice_msg.red").empty();
            $(".info_notice_msg.red").append(text);
            $(".info_notice_msg.red").show();
          } else if($("#nickname_set_text_check").val().length > 8){
            var text = "8자 이내 한글, 영문, 숫자만 입력 가능합니다.";
            $(".info_notice_msg.red").empty();
            $(".info_notice_msg.red").append(text);
            $(".info_notice_msg.red").show();
          } else {
            var pattern = /[^(가-힣a-zA-Z0-9)]/;
            if(pattern.test($("#nickname_set_text_check").val())){
              var text = "8자 이내 한글, 영문, 숫자만 입력 가능합니다.";
              $(".info_notice_msg.red").empty();
              $(".info_notice_msg.red").append(text);
              $(".info_notice_msg.red").show();
            }
            if(!pattern.test(text)){
              requestMyNickName();
            }
          }
        });
      }

      function requestMyNickName(){
        $.ajax({
          url: "/api/my/nickName/set",
          type: "get",
          data: {
            nickName : $("#nickname_set_text_check").val()
          },
          cache:false,
          success: function (result) {

            if(result.result === "NE-89034"){
              var text = "이미 사용중인 닉네임입니다.";
              $(".info_notice_msg.red").empty();
              $(".info_notice_msg.red").append(text);
              $(".info_notice_msg.red").show();
            }

            if(result.result === "NE-89032"){
              var text = "사용 할 수 없는 단어가 포함 되었습니다.";
              $(".info_notice_msg.red").empty();
              $(".info_notice_msg.red").append(text);
              $(".info_notice_msg.red").show();
            }

            if(result.result === "OK"){
              location.reload();
              $(".btn_comment").trigger('click');
              /*$("#comment_report_popup_layer").hide();
              beforeIndex = 0;
              commentSeqGrid({
                first : 1,
                masterId : masterId,
                contentId : contentsId,
                contentTitle : contentName,
                contentNo : seriesNo,
                ageCode : adultLevel,
                adultYn : erosYn,
                nickName : uN,
                userNo : uNov,
                videoType : typeCode,
                commentSize : 20,
                commentNo:'', //lastCommentNo
                rowNumber:'', //lastRowNumber
                parentCommentNo: '', //parentCommentNo
                order : orderType, //order
                my : '', //myYn
                index : '', //순서
                replyCount : '' //댓글수
              });*/
            }
          }, error : function() {

            var online = netWorkCheck();
            $("#comment_list_area_view_common").empty().append(online);
          }
        });
      }

      function myCommentListCheck() {

        if (uN !== "") {
          $.ajax({
            url: "/api/comment/list",
            data: {
              masterId: masterId,
              contentsId: contentsId,
              typeCode: typeCode,
              myYn: "Y"
            },
            type: "get",
            cache:false,
            success: function (result) {

              if(result.root.comments !== null){
                $(".btn_view.my").show();
              } else {
                $(".btn_view.my").hide();
              }
            }, error : function() {

              var online = netWorkCheck();
              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }
      }

      function commonContentLengthCheck(textarea, counter){

        if($(textarea).val() === ""){
            $(counter).html(0);
        } else {
            $(counter).html($(textarea).val().length);
        }

        $(textarea).keydown(function () {

          //player 연동 연속재생기능 > 댓글 작성 중 연속재생기능 멈춤
          OksusuVideo.relay.off();
          $(counter).html($(this).val().length);

          //400자체크
          if ($(textarea).val().length >= 400) {
            $(textarea).val($(textarea).val().substring(0,399));
            $(counter).html(400);
            commonContentNullCheck('댓글입력','400자 이상 입력할 수 없습니다.','only','P');
          }
        });

        $(textarea).keyup(function () {
          if(uN === "" || uNov === ""){
            this.blur();
            var url = location.href.split("/v/");
            userLogin("로그인이 필요한 정보입니다.<br>로그인하시겠습니까?",url[1]);
          } else {
            //var spcflag =   spaceChk($(textarea).val());
              ///if (spcflag === 'N') {
             $(counter).html($(this).val().length);
             // }

            if ($(textarea).val().length >= 400) {
               $(textarea).val($(textarea).val().substring(0,399));
               $(counter).html(400);
              commonContentNullCheck('댓글입력','400자 이상 입력할 수 없습니다.','only','P');

            }
          }
        });

        $(textarea).focus(gridMessage);
      }

      function gridMessage(){
        var I = $(this);
        if(uN != "") {
          $.ajax({
            url: "/api/comment/check",
            type: "get",
            cache:false,
            success: function (result) {
              if ( result.result === "CO-89202" || result.result === "CO-89201" ) {
                I.blur();
              }
              if(result.result === "CO-89202"){
                var st = convertDate(result.root.start_date);
                var et = convertDate(result.root.end_date);
                var context = '댓글 신고가 접수되어 심사 진행한 결과,<br />'+ st + ' ~ ' + et + '까지<br />댓글 이력이 제한됩니다.'
                commonContentNullCheck('댓글입력', context ,'only');
              }
              if(result.result === "CO-89201"){
                var context = 'Oksusu 운영정책에 따라 댓글 서비스 이용이<br /> 영구 정지 처리되었습니다'
                commonContentNullCheck('댓글입력', context, 'only');
              }
            }, error : function() {

              var online = netWorkCheck();
              $("#comment_list_area_view_common").empty().append(online);
            }
          });
        }

      }

      function commonContentNullCheck(title, content, type, ingubun){
        $("#comment_report_popup_layer").empty();
        $("#comment_report_popup_layer").append(commonPopup(title,content,type));
        $("#comment_report_popup_layer").show();
     //   if (ingubun == 'P') {
     //  //     $(window).scrollTop(window.oriScroll);layout.css
     // //      $("#comment_report_popup_layer").attr("tabindex", 0).show().focus();
     //    //   $this = $(this);
      //
     //   }
        $(".btn_default.find").click( commonPopupHide );
        $(".popup_btn_close").click( commonPopupHide );
      }

      function commonContentInsert(title, content, type, context, parent, index, replyCount){


        $("#comment_report_popup_layer").empty();
        $("#comment_report_popup_layer").append(commonPopup(title, content,type));
        $("#comment_report_popup_layer").show();

        $(".btn_default.find").click(function() {
          commonPopupHide();

            commentInsertRequest(context, parent, index, replyCount);
        });
        $(".btn_default.cancel").click( commonPopupHide );
        $(".popup_btn_close").click( commonPopupHide );
        // $this.find("content_write_textarea").focus();
        
      }

      function commonContentUpdate(title, content, type, context, no, parent, replyCount, my){
        $("#comment_report_popup_layer").empty();
        $("#comment_report_popup_layer").append(commonPopup(title,content,type));
        $("#comment_report_popup_layer").show();
        $(".btn_default.find").click(function(){
          commonPopupHide();
          myCommentUpdateRequest(context, no, parent, replyCount, my);
        });
        $(".btn_default.cancel").click( commonPopupHide );
        $(".popup_btn_close").click( commonPopupHide );
      }

      function commonContentDelete(title, content, type, no, parent, replyCount, index){
        $("#comment_report_popup_layer").empty();
        $("#comment_report_popup_layer").append(commonPopup(title, content, type));
        $("#comment_report_popup_layer").show();

        $(".btn_default.find").click(function(){
          commonPopupHide();
          myCommentDeleteRequest(no, parent, replyCount, index);
        });
        $(".btn_default.cancel").click( commonPopupHide );
        $(".popup_btn_close").click( commonPopupHide );
      }

      function commonPopup(title, content, only){
        var pop = "";
        pop += "<div class='popup_wrap'>";
        pop += " <div class='pop_wrap_inner leave'>";
        pop += "   <div class='popup_header'>" + title;
        pop += "    <a href='javascript:void(0);' class='popup_btn_close' title='팝업 닫기'>닫기</a>";
        pop += "  </div>";
        pop += "   <div class='popup_content'>";
        pop += "     <p class='one_txt'>";
        if(only === "badwords") {
          pop += "      [<em class='text_blue'>금칙어</em>]";
        }
        pop +=         content + " </p>";
        pop += "   </div>";
        pop += "   <div class='popup_footer'>";
        pop += "     <button type='button' class='btn_default find'>확인</button>";
        if(only === ""){
          pop += "     <button type='button' class='btn_default cancel'>취소</button>";
        }
        pop += "   </div>";
        pop += " </div>";
        pop += "</div>";

        return pop;
      }

      function commonPopupHide(){
        $("#comment_report_popup_layer").hide();
      }

      function commonContentsEnterCheck(str){
        var contents = str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        return contents;
      }

      return public;
    }
)();

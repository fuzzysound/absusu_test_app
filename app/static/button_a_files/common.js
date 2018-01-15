'use strict';

$(function (){

    k_web();
    s_web();


});

function k_web() {

    var $header = $("#header");
    var $wrap = $("#wrap");
    var $container = $("#container");
    var $footer = $("#footer");
    var $popup_wrap = $(".popup_wrap");
    var $popup_btn_close = $(".popup_btn_close, .cfm");

    var $terms_accordion = $(".terms_accordion");
    var $tab_wrap = $(".tab_wrap");
    var $result_page = $(".result_page");
    var $unified_search_wrap = $(".unified_search_wrap");
    var $cc_content_wrap = $(".cc_content_wrap");


    var $usage_guide_box_wrap = $(".usage_guide_box_wrap");
    var $payment_wrap = $(".payment_wrap");

    $(window).on("scroll load", function() {
        var $win_st = $(window).scrollTop();
        $header.css("position","absolute").css("top", $win_st);

         /*if ($win_st < $(document).height() - $(window).height() - $("#footer").height()) {
            $('.btn_top').css("bottom","20px");
        }else{
            $('.btn_top').css("bottom","290px");
        }*/

       if ($(this).scrollTop() > 300) {
    	   var btnTopT = ($(window).height() - 70) + $win_st;
    	   var btnPos = (btnTopT + 270) - $('#wrap').outerHeight();
    	   if($('#wrap').outerHeight() - btnTopT > 340) {
	           $('.btn_top').hide().css("top",btnPos).fadeIn();
	        }else if($('#wrap').outerHeight() - btnTopT <= 340){
	           $('.btn_top').hide().css("top", "-70px").fadeIn();
	        }
        } else {
            $('.btn_top').hide();
        }


    });

    $(".disabled_case").click(function(){

        if($(this).next().find(".with_msg").prop("disabled") === true){

             $(this).next().find(".with_msg").removeAttr("disabled");

        }else if($(this).next().find(".with_msg").prop("disabled") === false){

             $(this).next().find(".with_msg").prop("disabled","true");
        }

    })

    $(".btn_top").click(function() {

        $('html, body').animate({
            scrollTop : 0
        }, 0);


        return false;
    });

    $wrap.find(".default_select_box").on("click",function(){
        $(this).find(".default_select_box_option").show();
    });

    $payment_wrap.find(".cls_cm_btn").on("click",function(){

        var selected = $(this);

        if(selected.hasClass("btn_detail_view") === true){
            selected.parents().find(".payment01").removeClass("inactive").addClass("active");

        }else if(selected.hasClass("detail_view") === true){
            selected.parents().find(".payment02").removeClass("inactive").addClass("active");

        }

    });

    // $popup_btn_close.on("click",function(){
    //     $(this).parents(".popup_wrap").removeClass("active").addClass("inactive");
    // });

    if($header.find(".ipt_unified_search").focusin() === true) {
        var $wrap_removeclass = $wrap.removeClass("auto_com_opened");
        var $wrap_addclass = $wrap.addClass("auto_com_opened");
    }

    $usage_guide_box_wrap.find("button").on("click",function(){

        var selected = $(this);

        if(selected.hasClass("btn_combi_dc") || selected.hasClass("btn_band_playpack")) {
            selected.next().addClass("active").removeClass("inactive");
        }else{
            selected.next().removeClass("inactive").addClass("active");
        }
    });

    $cc_content_wrap.find(".cc_list_wrap").find("dt").click(function(){

        var selected = $(this);

        if(selected.hasClass("opened") === true){
            selected.addClass("close").removeClass("opened");

        }else{
            selected.addClass("opened").removeClass("close");

        }

    });

    $header.find(".search").on("click",function(){

        if($(this).hasClass("close")){
            $(this).removeClass("close");

            $wrap.removeClass("opened");

            $unified_search_wrap.hide();

        }else{
            $(this).addClass("close");

            $wrap.addClass("opened");
            $unified_search_wrap.show();

            if($wrap.hasClass("rp")){
                $wrap.removeClass("opened");
            }
        }
    });

    $header.find(".ipt_unified_search").focusin(function(){

        if($wrap.hasClass("opened") === false){
            $wrap_addclass;

        }else{
            $wrap_removeclass;

        }

    }).focusout(function(){
        $wrap_removeclass;

    });

    $terms_accordion.find(".checkbox_wrap .ico_arrow_down").on("click",function(){

        var target = $(this).parent().parent().next(".terms_cnt");
        var display = target.is(":visible");
        var checked_val = $(this).parent().parent().find(".cm_chkbox");
        var a = checked_val.is(":checked");


        if(display === false) {
            target.show();
            checked_val.prop("checked","false").addClass("arrow_up");



        }else if(display === true) {
            target.hide();
            checked_val.prop("checked","true").removeClass("arrow_up");

        }
    });

    var tabs_num = $tab_wrap.find(".tabs > li.on").index();
    $tab_wrap.find(".tab_cnt").hide();
    $tab_wrap.find(".tab_cnt").eq(tabs_num).show();

    $tab_wrap.find(".tabs > li").on("click",function(){

        var $tab_wrap = $(".tab_wrap");

        var left = $(this).attr("class").slice(0,3);
        var right = $(this).attr("class").slice(3,5);
        var active = left + "_cnt" + right;
        var act = "." + active;

        $(".tabs li").removeClass("on");
        $(this).addClass("on");

        $(".tab_cnt").hide();
        $(act).show();

    });

    $result_page.find(".select_join_box label").on("click",function(){
        var $this_parents = $(this).parents();
        var $btn_set = $this_parents.find(".btn_set");
        var $multi_login_social = $this_parents.find("multi_login_social");

        var $change_id_btn = $(this).hasClass("change_id_btn");
        var $social_fb_btn = $(this).hasClass("social_fb_btn");
        var $social_katalk_btn = $(this).hasClass("social_katalk_btn");

        if($change_id_btn === true){
            $btn_set.show();
            $multi_login_social.hide();
            $this_parents.find(".btn_set button").hide();
            $this_parents.find(".btn_set button.change_id").show()

        }else if($social_fb_btn === true){
            $btn_set.hide();
            $multi_login_social.show();
            $this_parents.find(".multi_login_social .btn_sns_katalk").hide();
            $this_parents.find(".multi_login_social .btn_sns_fb").show();

        }else if(social_katalk_btn === true){
            $btn_set.hide();
            $multi_login_social.show();
            $this_parents.find(".multi_login_social .btn_sns_fb").hide();
            $this_parents.find(".multi_login_social .btn_sns_katalk").show();
        }else{
            $btn_set.show()
            $multi_login_social.hide();
            $this_parents.find(".btn_set button").hide();
            $this_parents.find(".btn_set button.login,.btn_set button.find").show();
        }
    });



}



function s_web() {
    // Common
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
        //console.log($(this).parents(".date_select"));
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



    //즐겨찾기 클릭
    //var bookmark = $(".watch_btn_box .btn_bookmark");
    var share = $(".watch_btn_box .ico_share");

    /*bookmark.on("click",function(){

        $(this).toggleClass("on");

    });*/

    //공유하기 펼침

    share.on("click",function(){

        $(this).parent("a").toggleClass("on");

    });


    //예외케이스
    $(".ex_box").click(function(){

        var string = String($(this).attr("class"));
        var split = string.split('.');
        var id_name = String("#"+split[1]);

        $(id_name).toggle();

    });

    //예외케이스
    $(".ex_pop").click(function(){
      var string = String($(this).attr("class"));
      var split = string.split(' ');
      var id_name = String("#"+split[1]);

      $(id_name).toggle();

    });


	$('.text_title.line2').dotdotdot({
		  wrap : 'letter',
		  height  : null,
		  tolerance : 0
	  });

    //menu click
    var gnb_user = $(".util_menu .user_info");
    var gnb_user_id = $(".util_menu .user_id i.img_arrow");
    $(".util_menu .user_id").mouseover(function(){
        gnb_user.show();
        gnb_user_id.show();
    });
    $(".util_menu .user_info").mouseleave(function(){
        gnb_user.hide();
        gnb_user_id.hide();
    });
    $("#header, #container").mouseover(function(){
        gnb_user.hide();
        gnb_user_id.hide();
    });

    //전체선택 체크박스 클릭
    var chk_all_delete = $("#inp_all_delete");
    var my_checkbox = $(".cont_mypage input[type=checkbox]");
    chk_all_delete.click(function(){
        if(chk_all_delete.prop("checked")) {
             my_checkbox.prop("checked",true);
        } else {
            my_checkbox.prop("checked",false);
        }
    });

}

$(function() {
  var marginLeft = parseInt( $("#header").css('margin-left') );
  $(window).scroll(function(e) {
    $("#header").css("margin-left", marginLeft - $(this).scrollLeft() );
  });
});
/*

$(document).ready(function() {
	videoChannelResize(); // added by psk 20170830
});


function videoChannelResize() { // added by psk 20170830
	videoChannelResizeDo(); // 처음 불렀을 때

	$('div.video-default').resize(function() {
		videoChannelResizeDo(); // 사이즈가 변경 되었을 때
	}).resize();
}

function videoChannelResizeDo() { // added by psk 20170830
	var videoDefaultObj = $('div.video-default');
	var videoChannelListObj = $('div.video_channel_list');

	if(videoChannelListObj.height() != null && videoDefaultObj.height() != null) {
		//console.log(videoChannelListObj.height() + " | " + videoDefaultObj.height());

		videoChannelListObj.height(videoDefaultObj.height());
	}
}
*/

/* s : 플로팅 배너 */
$(window).scroll(function() {
	if($('.floatBannerWrap').length>0) {
		var _winST = $(window).scrollTop();
		//console.log(_winST);
		$('.floatBannerWrap').css({
			top : _winST + 144
		});
		$('.floatBannerWrap').hide().fadeIn();
	}
});
$(document).on('click', '.floatBannerWrap .btnFloatClose', function() {
	$('.floatBannerWrap').hide();
})
/* e : 플로팅 배너 */
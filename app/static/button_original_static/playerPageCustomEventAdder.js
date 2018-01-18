
var PlayerPageCustomEventAdder = (

    function ( $ ) {

      var public = {};

      public.fullscreen = false;
      public.start = start;

      function start () {

        setMiniPlayer1();
        setDefaultPlayer();

      }

      function setMiniPlayer1 () {

        $( '.video-default.mini .video-mini-close' ).click( closeI );
        $( '.video-default.mini .video-mini-close' ).trigger( 'click' );

        function closeI ( e ) {
          $( '.video-default.mini' ).hide();
          e.preventDefault();
        }

      }

      function setDefaultPlayer () {

        $( '#popupRestrictView' ).on( OksusuVideo.EVENT.ALLOW_WATCH, OksusuVideo.popup.exception.clear );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.VIDEO_DATA_GET, getVideoData );
        //$( '#oksusuPlayer' ).on( OksusuVideo.EVENT.CHAT_CONTAINER_SHOW, showChatContainer );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.PROGRAM_CHANGE, changeNextProgram );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.MINI_PLAYER_SET, setMiniPlayer2 );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.RATING_DATA_GET, getRatingData );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.RATING_POPUP_SHOW, showRatingPopup );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.BUY, jumpBuyPage );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.FULLSCREEN_CHANGE, shiftPopup );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.POPUP_SHIFT, shiftPopup );

        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.VIDEO_PLAY, OksusuLogger.sendWebPlayingAuto.start );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.VIDEO_PAUSE, OksusuLogger.sendWebPlayingAuto.end );

      }

      function getVideoData ( e ) {

        var convertTime = "";
        var timer = e.runningTime.split(':');
        if(timer[0] != "00") convertTime += timer[0] + ":";
        if(timer[1] != "00") convertTime += timer[1] + ":";
        convertTime += timer[2];

        $(".play_time_for_convert").append(convertTime);

        registerSynopEventTracking();
      }

      /*function showChatContainer () {
        Chat.clickChatBtn();
      }*/

      function changeNextProgram ( e ) {
        
        Chat.setChatLikeInfo(e.masterId, e.startTime);
      }

      function getRatingData ( e ) {
        var partCount = numberToAbbreviation( e.count, 'rating');
        $(".text_grade span").empty().append("평점");
        $(".text_grade .rating").html(e.rateAll);
        $(".text_grade .count").html("(" + partCount + ")");
        gridRating(e.rate);
      }

      function showRatingPopup () {
        $('.star_score').trigger( 'click' );
      }

      function setMiniPlayer2 () {

        var playerLimitY = $( '#oksusuPlayer' ).offset().top + $( '#oksusuPlayer' ).height();
        var shiftChecker = { up : true, down : false };

        $( document ).on( { scroll : minimizePlayer } );
        $( '#oksusuPlayer' ).on( OksusuVideo.EVENT.FULLSCREEN_CHANGE, connectScrollEvent );
        $( '#oksusuPlayer .vjs-fullscreen-control' ).on( { click : connectScrollEvent } );

        function minimizePlayer () {

          if ( playerLimitY > $( this ).scrollTop() ) {
            shiftChecker.down = false;
            if ( ! shiftChecker.up ) {
              shiftChecker.up = true;
              OksusuVideo.playing.save();
              $( '.video-default.mini' ).hide();
              $( '.video-default .video-default-bg' ).prepend( $( '#oksusuPlayer' ) );
              OksusuVideo.normalize();
            }
          } else {
            shiftChecker.up = false;
            if ( ! shiftChecker.down ) {
              shiftChecker.down = true;
              OksusuVideo.playing.save();
              $( '.video-default.mini' ).prepend( $( '#oksusuPlayer' ) );
              $( '.video-default.mini' ).show();
              OksusuVideo.minimize();
            }
          }

        }

        function connectScrollEvent ( e ) {
          if ( e.type == 'click' ) {
            $( document ).off( { scroll : minimizePlayer } );
          } else {
            if ( e.fullscreen ) {
              $( document ).off( { scroll : minimizePlayer } );
              $( '.video-default' ).eq( 1 ).removeClass( 'mini' );
            } else {
              $( document ).on( { scroll : minimizePlayer } );
              $( '.video-default' ).eq( 1 ).addClass( 'mini' );
            }
          }
        }

      }

      function jumpBuyPage ( e ) {
        public.next = e.next;
        public.videoId = e.videoId;
        purchasePopup();
        $("#login_popup_wrap_area").show();
      }

      var popupId;
      var popupAddPosition;

      function shiftPopup ( e ) {
        switch ( e.type ) {
          case OksusuVideo.EVENT.POPUP_SHIFT :
            switch ( e.popup ) {
              case OksusuVideo.POPUP.BUY :
                popupId = '#login_popup_wrap_area';
                break;
              case OksusuVideo.POPUP.ALLOW_WATCH :
                popupId = '#popupRestrictView';
                break;
            }
            popupAddPosition = $( popupId ).parent();
            $( '#oksusuPlayer' ).append( $( popupId ) );
            break;
          case OksusuVideo.EVENT.FULLSCREEN_CHANGE :
            if ( e.fullscreen ) {
              public.fullscreen = true;
            } else {
              public.fullscreen = false;
              if ( popupId ) {
                popupAddPosition.append( $( popupId ) );
                popupId = null;
              }
            }
            break;
        }
      }

      return public;

    }


)( $ );
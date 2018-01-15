/**
 * Created by cassmee on 2017-06-02.
 */

var OksusuVideo = (

    function ( $ ) {

      var keyword = {

        // 플레이어 타입 정의
        CLIP : 'clip',
        VOD : 'vod',
        MOVIE : 'movie',
        LIVE : 'live',

        // 이벤트 타입 정의
        EVENT : {
          VIDEO_DATA_GET : 'videoDataGet',
          MINI_PLAYER_SET : 'miniPlayerSet',
          VIDEO_PLAY : 'videoPlay',
          VIDEO_PAUSE : 'videoPause',
          RATING_POPUP_SHOW : 'ratingPopupShow',
          RATING_DATA_GET : 'ratingDataGet',
          PROGRAM_CHANGE : 'programChange',
          POPUP_SHIFT : 'popupShift',
          BUY : 'buy',
          ALLOW_WATCH : 'allowWatch',
          FULLSCREEN_CHANGE : 'fullscreenChange'
        },

        // 팝업 타입 정의
        POPUP : {
          BUY : 'buy',
          ALLOW_WATCH : 'allowWatch'
        },

        add : function ( data ) {

          code.trace( data.content );

          var version = browser.check();

          video.data = data;

          if ( version.indexOf( 'ie' ) == 0 ) {
            if ( version.substring( 2 ) < 11 ) {
              browser.popup.add();
            } else {
              video.add();
            }
          } else {
            video.add();
          }

        },

        play : function () {

          video.player.play();

        },

        pause : function () {

          video.player.pause();

        },

        playing : {

          start : function () {

            controller.igs.jump();

          },

          save : function () {

            if ( video.player.paused() ) {
              video.state = video.PAUSE;
            } else {
              video.state = video.PLAY;
            }

          }

        },

        time : {

          current : function () {

            return video.player.currentTime();

          },

          duration : function () {

            return video.player.duration();

          }

        },

        relay : {

          on : function () {

            if ( controller.button.relay.isActive ) {
              controller.button.relay.isActive = false;
              if ( ! controller.button.relay.active ) {
                video.wrapper.find( '.vjs-replay-control' ).trigger( 'click' );
              }
            }

          },

          off : function () {

            if ( controller.button.relay.active ) {
              controller.button.relay.isActive = true;
              video.wrapper.find( '.vjs-replay-control' ).trigger( 'click' );
            }

          }

        },

        minimize : function () {

          controller.type.current = video.MINI;
          video.wrapper.removeClass( video.HALF ).addClass( video.MINI );
          controller.off();
          video.playing.load();

          if ( video.wrapper.find( '.setting-ratio li' ).eq( 1 ).hasClass( 'on' ) ) {
            video.change.ratio.apply( true );
          }

          if ( exception.popup.mini != undefined ) {
            exception.popup.default.hide();
            exception.popup.mini.show();
          }

        },

        normalize : function () {

          controller.type.current = video.HALF;
          video.wrapper.removeClass( video.MINI ).addClass( video.HALF );
          video.playing.load();

          if ( video.wrapper.find( '.setting-ratio li' ).eq( 1 ).hasClass( 'on' ) ) {
            video.change.ratio.apply( true );
          }

          if ( exception.popup.mini != undefined ) {
            exception.popup.default.show();
            exception.popup.mini.hide();
          }

        },

        popup : {

          rating : {

            show : function () {

              controller.popup.rating.show();

            }

          },

          toast : {

            show : function ( value ) {

              controller.popup.toast.show( value, 300 );

            }

          },

          exception : {

            clear : function () {

              exception.clear();

            }

          }

        }

      };

      var URL = {

        DATA : '/api/media/playerInfo/',

        IMAGE : {

          THUMBNAIL : 'http://igs.oksusu.com:8080/thumbnails/nsigs/',
          CHANNEL_LOGO : 'http://image.oksusu.com:8080/thumbnails/image/284_161_A20/live/logo/387/',
          ERROR : '/public/assets/img/img_default02.png'

        },

        MOSAIC : {

          LIVE : {
            ALL : '/api/live/organization/list?genreCode=99&orgaPropCode=ALL',
            POPULAR : '/api/live/organization/list?genreCode=99&orgaPropCode=RANK'
          },

          CLIP : {
            RELATED : '/api/clip/related',
            RECOMMENDATION : '/api/clip/recommend',
            POPULAR : '/api/nav/menu/content/list'
          }

        },

        EXCEPTION : {

          LOGIN : '/user/login',
          ADULT_CERTIFICATION : '/user/check/adult',
          BUY : ''

        },

        DOWNLOAD : {

          IE11 : 'https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads',
          CHROME : 'https://www.google.com/chrome/browser/desktop/index.html',
          SUPPORT_PAGE : '/support/faq'

        },

        SHARE : {

          FACEBOOK : 'https://www.facebook.com/sharer/sharer.php',
          FACEBOOK_API : '/api/share/url',
          KAKAO_STORY : 'https://story.kakao.com/share',
          BAND : 'http://www.band.us/plugin/share'

        },

        CURRENT_TIME : '/api/my/watch/log',

        ALLOW_WATCH : '/api/media/watch'

      };

      var browser = {

        EDGE : 'edge',
        OPERA : 'opera',
        CHROME : 'chrome',
        SAFARI : 'safari',
        FIREFOX : 'firefox',

        scroll : true,

        check : function () {

          var agent = navigator.userAgent.toLowerCase();
          var browser;

          if ( agent.indexOf( 'msie' ) > -1 || agent.indexOf( 'trident' ) > -1 || agent.indexOf( 'edge/' ) > -1 ) {

            browser = 'ie';

            if ( agent.indexOf( 'msie' ) > -1 ) {

              agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( agent );
              browser += parseInt( agent[ 1 ] );

            } else {

              if ( agent.indexOf( 'trident' ) > -1 ) {
                browser += 11;
              } else if ( agent.indexOf( 'edge/' ) > -1 ) {
                browser = 'edge';
              }

            }

          } else if ( agent.indexOf( 'safari' ) > -1 ) {

            if ( agent.indexOf( 'opr' ) > -1 ) {
              browser = 'opera';
            } else if ( agent.indexOf( 'chrome' ) > -1 ) {
              browser = 'chrome';
            } else {
              browser = 'safari';
            }

          } else if ( agent.indexOf( 'firefox' ) > -1 ) {

            browser = 'firefox';

          }

          return browser;

        },

        popup : {

          add : function () {

            video.data.addPosition.html( OksusuVideoAsset.EXCEPTION_NOT_SUPPORTED_BROWSER );
            video.data.addPosition.find( '.video_exception_popup' ).fadeIn( 500 );

            browser.popup.set();

          },

          set : function () {

            video.data.addPosition.find( '.video_exception_popup .btn_browser' ).on( { click : browser.download } );
            video.data.addPosition.find( '.video_exception_popup .btn_browser_detail' ).on( { click : browser.support } );

          }

        },

        download : function () {

          switch ( $( this ).index() ) {
            case 0 :
              window.open( URL.DOWNLOAD.IE11 );
              break;
            case 1 :
              window.open( URL.DOWNLOAD.CHROME );
              break;
          }

        },

        support : function () {

          window.open( URL.DOWNLOAD.SUPPORT_PAGE );

        }

      };

      var element = {

        BUTTON : 'button',
        BIG_PLAY_BUTTON : 'BigPlayButton',

        add : function ( option ) {

          var container;

          switch ( option.type ) {
            case element.BUTTON :
              container = video.player.getChild( 'controlBar' );
              break;
            case element.BIG_PLAY_BUTTON :
              container = video.player;
              break;
          }

          container.addChild( option.type, {
            'el' : videojs.dom.createEl( 'div', { className : option.className } )
          } );

          if ( option.asset ) {
            video.wrapper.find( '.' + option.className ).html( option.asset );
          }

        }

      };

      var video = {

        HALF : 'half',
        MINI : 'mini',
        FULL : 'full',

        PLAY : 'play',
        PAUSE : 'pause',

        option : {
          preload : 'auto',
          autoplay : true,
          controls : true
        },
        
        time : {},

        url : {

          set : function () {

            var url;

            var search = {

              type : function ( url ) {

                var i;
                var type;
                var format = [
                  '.mp4',
                  '.webm',
                  '.ogv',
                  '.m3u8'
                ];

                url = url.toLowerCase();

                for ( i in format ) {
                  if ( url.indexOf( format[ i ] ) > -1 ) {
                    type = format[ i ];
                  }
                }

                switch ( type ) {
                  case format[ 0 ] :
                    type = 'video/mp4';
                    break;
                  case format[ 1 ] :
                    type = 'video/webm';
                    break;
                  case format[ 2 ] :
                    type = 'video/ogg';
                    break;
                  case format[ 3 ] :
                    type = 'application/vnd.apple.mpegurl';
                    break;
                }

                return type;

              }

            };

            if ( video.data.type == keyword.LIVE && video.data.content.playerInfo.channel.channel_extr_cd == 1 ) {

              video.jtbc.active = true;
              url = video.data.content.playerInfo.streamUrl.nvodHlsUrlList[ 0 ].nvod_token;

            } else {

              switch ( video.quality ) {
                case video.change.AUTO :
                  url = video.data.content.playerInfo.streamUrl.hlsUrlAUTO;
                  break;
                case video.change.SD :
                  url = video.data.content.playerInfo.streamUrl.hlsUrlPhoneSD;
                  break;
                case video.change.HD :
                  url = video.data.content.playerInfo.streamUrl.hlsUrlPhoneHD;
                  break;
                case video.change.FULL_HD :
                  url = video.data.content.playerInfo.streamUrl.hlsUrlPhoneFHD;
                  break;
              }

            }

            if ( url ) {
              video.option.sources = {
                src : url,
                type : search.type( url )
              };
            } else {
              video.option.sources = undefined;
            }

          },

          check : function () {

            var i;

            var error = function ( status ) {

              switch ( status ) {
                case 0 :
                  code.trace( '0 :: 파일을 찾을 수 없음' );
                  break;
                case 400 :
                  code.trace( '400 :: 문법 오류' );
                  break;
                case 404 :
                  code.trace( '404 :: 파일을 찾을 수 없음' );
                  break;
              }

            };

            // 현재 ts의 일정 범위 내에서만 통신하도록 개발
            console.log( video.list );

            for ( i in video.list.media().segments ) {
              data.load( {
                url : video.list.media().segments[ i ].resolvedUri,
                error : error
              } );
            }

          }

        },

        add : function () {

          code.trace( 'player add...' );

          video.data.addPosition.append( OksusuVideoAsset.PLAYER );

          video.data.addPosition.find( 'video' ).attr( {
            id : video.data.id,
            width : video.data.width,
            height : video.data.height
          } );

          video.set();

        },

        set : function () {

          code.trace( 'player set...' );

          video.wrapper = $( '#' + video.data.id );
          video.wrapper.addClass( video.data.type );

          video.quality = video.change.AUTO;
          video.url.set();

          video.next.check( {
            first : function () {
              video.option.autoplay = false;
            },
            nextAndFollow : function () {
              video.option.autoplay = false;
            }
          } );

          video.player = videojs( video.data.id, video.option, video.ready );

        },

        ready : function () {

          code.trace( 'player ready...' );

          var display = {};

          video.wrapper = $( '#' + video.data.id );
          video.wrapper.addClass( video.HALF );
          video.wrapper.css( { overflow : 'hidden' } );
          video.wrapper.focus();

          video.player.on( 'loadedmetadata', video.loaded.metadata );
          video.player.on( 'error', video.error );
          video.player.on( 'timeupdate', video.playing.first );
          video.player.on( 'timeupdate', video.playing.new );

          video.volume.set( 0.5 );

          switch ( video.data.type ) {

            case keyword.CLIP :
              video.id = video.data.content.playerInfo.content.clip_id;
              break;

            case keyword.LIVE :
              video.id = video.data.content.playerInfo.channel.serviceId;
              display.currentTime = video.wrapper.find( '.vjs-current-time-display' );
              display.currentTime.parent().append( display.currentTime.clone().addClass( 'clone' ) );
              display.currentTime.hide();
              display.duration = video.wrapper.find( '.vjs-duration-display' );
              display.duration.parent().append( display.duration.clone().addClass( 'clone' ) );
              display.duration.hide();
              if ( video.jtbc.active ) {
                video.jtbc.set();
              }
              break;

            default :
              video.id = video.data.content.playerInfo.content.con_id;
              if ( ! video.option.autoplay ) {
                controller.popup.follow.ready();
              }
              break;

          }

          controller.add();

        },

        loaded : {

          metadata : function () {

            var event = $.Event( keyword.EVENT.VIDEO_DATA_GET );

            video.list = video.player.tech( { IWillNotUseThisInPlugins : true } ).hls.playlists;

            // clearInterval( video.url.timer );
            // video.url.timer = setInterval( video.url.check, video.list.media().targetDuration * 1000 );

            if ( video.time.now > 0 ) {
              video.player.currentTime( video.time.now );
              video.time.now = 0;
            }

            if ( cookie.get( 'oksusuVideoRefresh' ) > 0 ) {
              cookie.set( 'oksusuVideoRefresh', 0, 30 );
              video.player.currentTime( cookie.get( 'oksusuVideoRefresh' ) );
            }

            if ( video.jtbc.active ) {

              if ( video.jtbc.seeking ) {
                video.jtbc.seeking = false;
                video.jtbc.seek();
              }

              if ( video.jtbc.current + 1 == video.data.content.playerInfo.channel.another_programs.length ) {
                video.jtbc.reload();
              }

            }

            event.duration = video.player.duration();
            event.runningTime = time.convert.runningTime( event.duration );
            video.wrapper.trigger( event );

          }

        },

        error : function () {

          code.trace( '::::: error catch test :::::' );

        },

        playing : {

          first : function () {

            video.player.off( 'timeupdate', video.playing.first );

            if ( browser.check() != browser.EDGE ) {
              video.miniPlayer.set();
            }

            if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE ) {
              $( window ).on( { unload : data.send.time.current } );
            }

          },

          new : function () {

            var event = $.Event( keyword.EVENT.VIDEO_PLAY );

            video.player.off( 'timeupdate', video.playing.new );

            if ( ! video.playing.already ) {
              video.playing.already = true;
              video.wrapper.trigger( event );
            }

          },

          toggle : function () {

            var event;

            controller.icon.play.show();

            if ( ! video.player.paused() ) {

              event = $.Event( keyword.EVENT.VIDEO_PLAY );

              if ( video.data.type == keyword.LIVE ) {

                if ( video.jtbc.active ) {
                  video.player.pause();
                  video.jtbc.reload( true );
                } else {
                  video.player.on( 'timeupdate', video.program.check );
                }

              }

            } else {

              event = $.Event( keyword.EVENT.VIDEO_PAUSE );

              if ( video.data.type == keyword.LIVE ) {

                if ( video.jtbc.active ) {
                  video.player.off( 'timeupdate', video.jtbc.display.time );
                } else {
                  video.player.off( 'timeupdate', video.program.check );
                }

              }

            }

            video.wrapper.trigger( event );

          },

          load : function () {

            switch ( video.state ) {
              case video.PLAY :
                video.player.play();
                break;
              case video.PAUSE :
                video.player.pause();
                break;
            }

          },

          end : function () {

            controller.igs.show();

            if ( video.data.type == keyword.VOD ) {
              if ( ! video.next.active ) {
                controller.popup.toast.show( '마지막 회차입니다.', 500 );
              }
            }

            if ( video.data.type == keyword.MOVIE ) {
              popup.open.rating();
            }

            if ( video.data.type == keyword.CLIP || video.data.type == keyword.LIVE ) {
              if ( video.player.isFullscreen() ) {
                controller.popup.mosaic.finish = true;
                controller.popup.mosaic.show();
              }
            }

          }

        },

        volume : {

          set : function ( value ) {

            video.player.volume( value );
            controller.icon.volume.sync();

          },

          unmute : function () {

            if ( video.wrapper.find( '.vjs-mute-control .vjs-control-text' ).text() == 'Unmute' ) {
              video.wrapper.find( '.vjs-mute-control' ).trigger( 'click' );
            }

          }

        },

        change : {

          AUTO : 'auto',
          SD : 'sd',
          HD : 'hd',
          FULL_HD : 'fhd',

          ratio : {

            apply : function ( change ) {

              var aspectRatio = {

                video : video.player.videoWidth() / video.player.videoHeight(),
                wrapper : video.wrapper.width() / video.wrapper.height(),
                compare : 0

              };

              if ( change ) {

                if ( aspectRatio.video > aspectRatio.wrapper ) {
                  aspectRatio.compare = video.wrapper.height() / video.player.videoHeight();
                  video.wrapper.find( '.vjs-tech' ).width( video.player.videoWidth() * aspectRatio.compare ).height( video.wrapper.height() );
                } else {
                  aspectRatio.compare = video.wrapper.width() / video.player.videoWidth();
                  video.wrapper.find( '.vjs-tech' ).width( video.wrapper.width() ).height( video.player.videoHeight() * aspectRatio.compare );
                }

                video.wrapper.find( '.vjs-tech' ).css( {
                  left : video.wrapper.width() / 2 - video.wrapper.find( '.vjs-tech' ).width() / 2,
                  top : video.wrapper.height() / 2 - video.wrapper.find( '.vjs-tech' ).height() / 2
                } );

                video.change.ratio.correction( {
                  width : video.wrapper.width(),
                  height : video.wrapper.height()
                } );

              } else {

                clearInterval( video.change.ratio.timer );

                video.wrapper.find( '.vjs-tech' ).width( '100%' ).height( '100%' );
                video.wrapper.find( '.vjs-tech' ).css( { left : 0, top : 0 } );

              }

            },

            correction : function ( ratio ) {

              var counter = 0;
              var start = function () {
                counter++;
                if ( counter < 30 * 5 ) {
                  if ( ratio.width != video.wrapper.width() || ratio.height != video.wrapper.height() ) {
                    video.change.ratio.apply( true );
                  }
                } else {
                  clearInterval( video.change.ratio.timer );
                }
              };

              clearInterval( video.change.ratio.timer );
              video.change.ratio.timer = setInterval( start, 1000 / 30 );

            }

          },

          quality : function ( level ) {

            video.time.now = video.player.currentTime();

            video.quality = level;
            video.url.set();

            video.player.autoplay( true );
            video.player.src( video.option.sources );

          }

        },

        fullscreen : {

          change : function () {

            var event = $.Event( keyword.EVENT.FULLSCREEN_CHANGE );

            controller.off();

            if ( video.wrapper.find( '.setting-ratio li' ).eq( 1 ).hasClass( 'on' ) ) {
              video.change.ratio.apply( true );
            }

            if ( video.player.isFullscreen() ) {

              event.fullscreen = true;

              controller.type.before = controller.type.current;
              controller.type.current = video.FULL;
              video.wrapper.removeClass( controller.type.before );
              video.wrapper.addClass( video.FULL );

            } else {

              event.fullscreen = false;

              controller.type.current = controller.type.before;
              video.wrapper.removeClass( video.FULL );
              video.wrapper.addClass( controller.type.before );

              if ( page.reloading ) {
                cookie.set( 'oksusuVideoRefresh', video.player.currentTime(), 30 );
                page.jump.video( video.id );
              }

            }

            video.wrapper.trigger( event );

          }

        },

        freeze : function () {

          video.player.controls( false );
          video.player.reset();

        },

        reload : function ( id ) {

          var success = function ( data ) {

            video.data.content = data;
            video.playing.already = false;
            controller.popup.preview.showed = false;

            video.url.set();
            video.prev.set();
            video.next.set();
            video.volume.set( 0.5 );

            controller.push( true );
            controller.igs.add();

            video.player.on( 'timeupdate', video.playing.new );

            if ( video.data.type == keyword.VOD ) {
              controller.popup.follow.ready( true );
            }

            if ( video.data.type == keyword.LIVE ) {
              video.music.on();
              if ( video.jtbc.active ) {
                video.jtbc.set();
              }
            }

            exception.pass( data );

            video.player.src( video.option.sources );

          };

          controller.off();

          video.id = id;
          video.quality = video.change.AUTO;

          if ( video.data.type == keyword.LIVE ) {
            if ( video.jtbc.active ) {
              video.jtbc.clear();
            } else {
              video.player.off( 'timeupdate', video.program.check );
            }
          }

          data.load( {
            url : URL.DATA + id,
            success : success
          } );

        },

        prev : {

          set : function () {

            if ( video.data.type == keyword.CLIP ) {

              if ( video.data.content.playerInfo.content.prev_clip ) {
                video.prev.active = true;
                video.prev.id = video.data.content.playerInfo.content.prev_clip.clip_id;
                video.wrapper.find( '.vjs-prev-control' ).show();
              } else {
                video.prev.active = false;
                video.wrapper.find( '.vjs-prev-control' ).hide();
              }

            }

          }

        },

        next : {

          set : function () {

            var i;
            var list;

            var compare = function ( a, b ) {

              return a.ser_no - b.ser_no;

            };

            var authority = {

              get : function ( data ) {

                if ( data.playerInfo.streamUrl.permission == 'Y' ) {
                  video.next.buy = true;
                }

              }

            };

            video.next.active = false;
            video.next.buy = false;

            switch ( video.data.type ) {

              case keyword.CLIP :

                if ( video.data.content.playerInfo.content.next_clip ) {

                  video.next.active = true;
                  video.next.buy = true;
                  video.next.id = video.data.content.playerInfo.content.next_clip.clip_id;
                  video.wrapper.find( '.vjs-next-control' ).show();

                } else {

                  video.wrapper.find( '.vjs-next-control' ).hide();

                }

                break;

              case keyword.VOD :

                if ( video.data.content.playerInfo.content.series2 ) {

                  list = video.data.content.playerInfo.content.series2;

                  if ( list.length > 0 ) {

                    list.sort( compare );

                    for ( i in list ) {
                      if ( video.id == list[ i ].con_id ) {
                        if ( i < list.length - 1 ) {

                          video.next.active = true;
                          video.next.id = list[ parseInt( i ) + 1 ].con_id;

                          data.load( {
                            url : URL.DATA + video.next.id,
                            success : authority.get
                          } );

                        }
                      }
                    }

                  }

                }

                break;

            }

          },

          check : function ( F ) {

            if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE ) {

              if ( cookie.get( 'oksusuVideoRefresh' ) == 0 || cookie.get( 'oksusuVideoRefresh' ) == '' ) {
                if ( cookie.get( 'oksusuVideoNextPlay' ) == 'true' ) {
                  if ( video.data.content.playerInfo.streamUrl.lastWatchPosition > 0 ) {

                    if ( F.nextAndFollow ) F.nextAndFollow();

                  }
                } else {

                  if ( F.first ) F.first();

                }
              }

            }

          }

        },

        program : {

          time : {},

          push : function () {

            var i;
            var event = $.Event( keyword.EVENT.PROGRAM_CHANGE );

            if ( video.data.content.playerInfo.channel.programs.length > 0 ) {

              for ( i in video.data.content.playerInfo.channel.programs ) {
                if ( video.data.content.playerInfo.channel.programs[ i ].currentProgramYn == 'Y' ) {
                  video.program.current = i;
                }
              }

              video.program.time.end = video.data.content.playerInfo.channel.programs[ video.program.current ].endTime;

              controller.title.change( {
                channel : video.data.content.playerInfo.channel.channelName,
                title : video.data.content.playerInfo.channel.programs[ video.program.current ].programName
              } );

              if ( video.music.active ) {
                video.wrapper.find( '.vjs-music-control h3' ).text( video.data.content.playerInfo.channel.programs[ video.program.current ].programName );
                video.wrapper.find( '.vjs-music-control h4' ).text( video.data.content.playerInfo.channel.channelName );
              }

              if ( video.data.content.playerInfo.channel.programs[ video.program.current ].is_live ) {
                event.masterId = video.data.content.playerInfo.channel.programs[ video.program.current ].programId;
              } else {
                event.masterId = video.data.content.playerInfo.channel.programs[ video.program.current ].masterId;
              }
              event.startTime = video.data.content.playerInfo.channel.programs[ video.program.current ].startTime;
              event.watchLevel = video.data.content.playerInfo.channel.age_rating;
              event.programName = video.data.content.playerInfo.channel.programs[ video.program.current ].programName;
              video.wrapper.trigger( event );

              video.player.on( 'timeupdate', video.program.check );

            } else {

              video.playing.end();

            }

          },

          check : function () {

            video.wrapper.find( '.vjs-current-time-display.clone' ).text( time.convert.airTime( $.now() ) );
            video.wrapper.find( '.vjs-duration-display.clone' ).text( time.convert.airTime( video.program.time.end ) );
            video.wrapper.find( '.vjs-live-control' ).addClass( 'vjs-hidden' );

            if ( $.now() >= video.program.time.end ) {

              video.player.off( 'timeupdate', video.program.check );

              data.load( {
                url : URL.DATA + video.id,
                success : video.program.sync
              } );

            }

          },

          sync : function ( data ) {

            video.data.content = data;
            video.program.push();

            exception.pass( data );

          }

        },

        music : {

          on : function () {

            if ( video.data.content.playerInfo.channel.music_yn == 'Y' ) {

              video.music.active = true;
              video.wrapper.find( '.vjs-music-wrap' ).fadeIn( 500 );
              video.wrapper.find( '.vjs-setting-box' ).addClass( 'case01' );
              video.wrapper.find( '.vjs-setting-menu li' ).each( controller.menu.setting.hide );

            } else {

              video.music.active = false;
              video.wrapper.find( '.vjs-music-wrap' ).fadeOut( 500 );
              video.wrapper.find( '.vjs-setting-box' ).removeClass( 'case01' );
              video.wrapper.find( '.vjs-setting-menu li' ).show();

            }

          }

        },

        jtbc : {

          set : function () {

            video.jtbc.seeking = true;
            video.jtbc.current = 0;

            video.wrapper.find( '.vjs-progress-control' ).hide();

            video.player.on( 'timeupdate', video.jtbc.display.time );
            video.player.on( 'ended', video.jtbc.change );

          },

          display : {

            time : function () {

              var end = video.data.content.playerInfo.channel.another_programs[ video.jtbc.current ].endTime;

              video.wrapper.find( '.vjs-current-time-display.clone' ).text( time.convert.airTime( $.now() ) );
              video.wrapper.find( '.vjs-duration-display.clone' ).text( time.convert.airTime( end ) );

            }

          },

          seek : function () {

            var time = {};

            time.duration = video.data.content.playerInfo.channel.another_programs[ video.jtbc.current ].endTime;
            time.duration -= video.data.content.playerInfo.channel.another_programs[ video.jtbc.current ].startTime;

            time.now = video.data.content.playerInfo.timestamp;
            time.now -= video.data.content.playerInfo.channel.another_programs[ video.jtbc.current ].startTime;

            video.player.currentTime( video.player.duration() * ( time.now / time.duration ) );

          },

          change : function () {

            video.jtbc.current++;

            video.option.sources.src = video.data.content.playerInfo.streamUrl.nvodHlsUrlList[ video.jtbc.current ].nvod_token;
            video.player.src( video.option.sources );

            video.jtbc.push();

          },

          push : function () {

            var event = $.Event( keyword.EVENT.PROGRAM_CHANGE );

            controller.title.change( {
              channel : video.data.content.playerInfo.channel.channelName,
              title : video.data.content.playerInfo.channel.another_programs[ video.jtbc.current ].programName
            } );

            event.masterId = video.data.content.playerInfo.channel.programs[ video.jtbc.current ].masterId;
            event.startTime = video.data.content.playerInfo.channel.programs[ video.jtbc.current ].startTime;
            event.programName = video.data.content.playerInfo.channel.another_programs[ video.jtbc.current ].programName;
            video.wrapper.trigger( event );

          },

          reload : function ( pauseAndPlay ) {

            var success = function ( data ) {

              video.jtbc.current = 0;
              video.data.content = data;

              if ( pauseAndPlay ) {
                video.jtbc.seeking = true;
                video.jtbc.current--;
                video.jtbc.change();
                video.player.on( 'timeupdate', video.jtbc.display.time );
              }

              exception.pass( data );

            };

            data.load( {
              url : URL.DATA + video.id,
              success : success
            } );

          },

          clear : function () {

            video.jtbc.active = false;

            video.player.off( 'timeupdate', video.jtbc.display.time );
            video.player.off( 'ended', video.jtbc.change );

          }

        },

        miniPlayer : {

          set : function () {

            code.trace( 'miniPlayer set...' );

            var event = $.Event( keyword.EVENT.MINI_PLAYER_SET );

            video.wrapper.trigger( event );

          }

        }

      };

      var controller = {

        type : {

          current : video.HALF

        },

        add : function () {

          code.trace( 'controller add...' );

          // 타이틀 add
          element.add( {
            type : element.BIG_PLAY_BUTTON,
            className : 'vjs-overlay-control'
          } );
          video.wrapper.find( '.vjs-overlay-control' ).addClass( 'vjs-title-control' ).html( OksusuVideoAsset.TITLE );

          // 기본 UI 툴팁 add
          video.wrapper.find( '.vjs-fullscreen-control, .vjs-mute-control' ).append( OksusuVideoAsset.TOOLTIP );

          // 설정 버튼, 팝업 add
          element.add( {
            type : element.BUTTON,
            className : 'vjs-setting-control',
            asset : OksusuVideoAsset.TOOLTIP
          } );
          video.wrapper.find( '.vjs-setting-control' ).addClass( 'tooltip' );
          video.wrapper.find( '.vjs-setting-control' ).after( OksusuVideoAsset.SETTING_POPUP );

          // 키보드 조작 안내 팝업 add
          element.add( {
            type : element.BIG_PLAY_BUTTON,
            className : 'vjs-helpbox-control',
            asset : OksusuVideoAsset.KEYBOARD_HELP_POPUP
          } );

          // 공유하기 버튼, 팝업 add
          element.add( {
            type : element.BIG_PLAY_BUTTON,
            className : 'vjs-share-control'
          } );
          video.wrapper.find( '.vjs-share-control' ).attr( 'title', '공유하기' );
          element.add( {
            type : element.BIG_PLAY_BUTTON,
            className : 'vjs-sharebox-control',
            asset : OksusuVideoAsset.SHARE_POPUP
          } );
          video.wrapper.find( '.vjs-share-copy .share-text' ).text( location.href );
          video.wrapper.find( '.vjs-share-copy .btn-share' ).attr( { 'data-clipboard-text' : location.href } );

          // 음소거, 음량조절 영역 add
          element.add( {
            type : element.BIG_PLAY_BUTTON,
            className : 'vjs-volume-group',
            asset : OksusuVideoAsset.VOLUME_CONTROLLER
          } );

          // 연속재생, 모자이크, 채팅 버튼을 위한 컨테이너 add
          element.add( {
            type : element.BUTTON,
            className : 'control-right-group',
            asset : OksusuVideoAsset.RIGHT_CONTAINER
          } );

          // 볼륨 슬라이더 show, hide 이벤트 처리를 위한 히트영역 add
          video.wrapper.find( '.vjs-control-bar' ).prepend( OksusuVideoAsset.VOLUME_BAR_EVENTAREA );
          video.wrapper.find( '.volume-bar-eventarea' ).css( {
            position : 'absolute',
            width : 300,
            height : video.wrapper.find( '.vjs-control-bar' ).height()
          } );

          // 토스트 팝업 add
          element.add( {
            type : element.BIG_PLAY_BUTTON,
            className : 'vjs-toast-control'
          } );
          video.wrapper.find( '.vjs-toast-control' ).append( OksusuVideoAsset.TOAST_POPUP );
          video.wrapper.find( '.vjs-toast-control .toast_popup_wrap' ).hide();

          // IGS add
          element.add( {
            type : element.BIG_PLAY_BUTTON,
            className : 'igs',
            asset : OksusuVideoAsset.IGS
          } );
          video.wrapper.find( '.igs' ).hide();
          video.wrapper.find( '.igs' ).css( { cursor : 'pointer' } );

          controller.igs.add();

          video.wrapper.find( '.igs button' ).hide();

          if ( video.data.type == keyword.CLIP || video.data.type == keyword.VOD || video.data.type == keyword.MOVIE ) {

            // 재생시간 영역 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'vjs-time-big',
              asset : OksusuVideoAsset.PLAYTIME_CONTROLLER
            } );

          }

          if ( video.data.type == keyword.LIVE ) {

            // 음악채널 배경 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'vjs-music-control',
              asset : OksusuVideoAsset.LIVE_MUSIC_BG
            } );
            video.wrapper.find( '.vjs-big-play-button' ).before( video.wrapper.find( '.vjs-music-control' ) );
            video.wrapper.find( '.vjs-music-control' ).css( { pointerEvents : 'none' } );

            video.music.on();

          }

          if ( video.data.type == keyword.CLIP || video.data.type == keyword.LIVE ) {

            // 모자이크 버튼 add
            video.wrapper.find( '.vjs-rightBox-control' ).append( OksusuVideoAsset.MOSAIC_BUTTON );

            // 모자이크 보기 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'vjs-mosaicbox-control',
              asset : OksusuVideoAsset.MOSAIC_POPUP
            } );
            video.wrapper.find( '.mosaic-tab li' ).each( controller.popup.mosaic.tab.input );
            video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).css( { position : 'relative' } );
            controller.popup.mosaic.list.add();

          }

          if ( video.data.type == keyword.CLIP ) {

            // 이전 버튼 add
            video.wrapper.find( '.vjs-play-control.vjs-button.vjs-control' ).before( OksusuVideoAsset.PREV_BUTTON );

            // 다음 버튼 add
            video.wrapper.find( '.vjs-play-control.vjs-button.vjs-control' ).after( OksusuVideoAsset.NEXT_BUTTON );

            // 다음 미리보기 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'vjs-preview-control',
              asset : OksusuVideoAsset.NEXT_PREVIEW_POPUP
            } );

          }

          if ( video.data.type == keyword.CLIP || video.data.type == keyword.VOD ) {

            // 연속재생 버튼 add
            video.wrapper.find( '.vjs-rightBox-control' ).append( OksusuVideoAsset.REPLAY_BUTTON );

          }

          if ( video.data.type == keyword.VOD ) {

            // 다음회차 시청 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'vjs-popup',
              asset : OksusuVideoAsset.ALERT_NEXT_PLAY
            } );

            // 다음회차 구매 팝업 add
            video.wrapper.find( '.vjs-popup' ).append( OksusuVideoAsset.ALERT_NEXT_BUY );

          }

          if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE ) {

            // 이어보기 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'followPopup',
              asset : OksusuVideoAsset.ALERT_RELAY_PLAY
            } );

            // IGS show
            if ( ! video.option.autoplay ) {
              controller.igs.show();
            }

          }

          video.prev.set();
          video.next.set();

          controller.push();

        },

        push : function ( reload ) {

          code.trace( 'controller data push...' );

          var image = {};

          switch ( video.data.type ) {

            case keyword.CLIP :

              video.wrapper.find( '.vjs-title-text' ).html( video.data.content.playerInfo.content.clip_title );

              if ( video.next.active ) {

                image.source = video.data.content.playerInfo.content.next_clip.thum_info_high[ 0 ][ '1' ].split( '/' );
                image.next = video.data.content.playerInfo.content.next_clip.thum_info_high[ 0 ][ '1' ].replace( image.source[ 5 ], '137_78' );
                video.wrapper.find( '.preview-wrap .preview-bg' ).css( { backgroundImage : 'url( ' + image.next + ' )' } );

                video.wrapper.find( '.preview-wrap .preview-text' ).text( video.data.content.playerInfo.content.next_clip.clip_title );
                video.wrapper.find( '.preview-wrap .preview-sub-text' ).text( video.data.content.playerInfo.content.clip_chnl_nm );

                if ( video.data.content.playerInfo.content.next_clip.yn_first == 'N' ) {
                  video.wrapper.find( '.preview-wrap .preview-title .one' ).hide();
                }

              }

              break;

            case keyword.VOD :

              controller.title.change( {
                channel : video.data.content.playerInfo.content.genre_nm,
                title : video.data.content.playerInfo.content.title
              } );

              break;

            case keyword.MOVIE :

              video.wrapper.find( '.vjs-title-text' ).html( video.data.content.playerInfo.content.title );

              break;

            case keyword.LIVE :

              if ( video.jtbc.active ) {
                video.jtbc.push();
              } else {
                video.program.push();
              }

              break;

          }

          controller.change( reload );

        },

        change : function ( reload ) {

          code.trace( 'controller change...' );

          var content = data.content.get();

          video.wrapper.find( '.setting-item' ).eq( 0 ).find( 'li' ).show();
          video.wrapper.find( '.setting-item' ).eq( 0 ).find( 'li' ).each( controller.menu.setting.quality.hide );

          if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE || video.data.type == keyword.LIVE ) {
            if ( ! video.jtbc.active ) {
              video.wrapper.find( '.setting-item li' ).off( { click : controller.menu.setting.depth2.apply } );
              video.wrapper.find( '.setting-item' ).eq( 0 ).find( 'li' ).eq( 0 ).trigger( 'click' );
              video.wrapper.find( '.setting-item li' ).on( { click : controller.menu.setting.depth2.apply } );
            }
          }

          if ( content.erotic == 'Y' || content.attribute == 'Y' ) {
            video.wrapper.find( '.vjs-share-control' ).hide();
          } else {
            video.wrapper.find( '.vjs-share-control' ).show();
          }

          if ( ! reload ) {
            controller.set();
          }

        },

        set : function () {

          code.trace( 'controller set...' );

          var block = {

            quality : function ( i ) {

              video.wrapper.find( '.setting-item li' ).eq( i ).trigger( 'click' );
              video.wrapper.find( '.vjs-setting-menu li' ).eq( 0 ).off( { click : controller.menu.setting.depth2.jump } );

            }

          };

          var seekingButton = {

            zoom : {

              in : function () {
                $( this ).addClass( 'hover' );
              },

              out : function () {
                $( this ).removeClass( 'hover' );
              }

            },

            drag : function ( e ) {

              switch ( e.type ) {
                case 'mousedown' :
                  video.wrapper.find( '.vjs-play-progress' ).off( { mouseout : seekingButton.zoom.out } );
                  break;
                case 'mouseup' :
                  video.wrapper.find( '.vjs-play-progress' ).on( { mouseout : seekingButton.zoom.out } );
                  break;
              }

            }

          };

          var volumeBar = {

            pick : false,

            show : function () {
              video.wrapper.find( '.vjs-volume-panel' ).addClass( '_slide' );
              video.wrapper.find( '.vjs-mute-control' ).addClass( '_active' );
            },

            hide : function () {
              video.wrapper.find( '.vjs-volume-panel' ).removeClass( 'vjs-slider-active' );
              video.wrapper.find( '.vjs-mute-control' ).removeClass( '_active' );
              if ( volumeBar.pick == false ) {
                video.wrapper.find( '.vjs-volume-panel' ).removeClass( '_slide' );
              }
            },

            drag : function ( e ) {
              switch ( e.type ) {
                case 'mousedown' :
                  volumeBar.pick = true;
                  break;
                case 'mouseup' :
                  volumeBar.pick = false;
                  break;
              }
            }

          };

          var sharePopup = {

            show : function () {

              if ( video.data.type != keyword.LIVE ) {
                video.player.pause();
              }
              video.wrapper.find( '.vjs-sharebox' ).fadeIn( 200 );

            },

            hide : function () {

              if ( video.data.type != keyword.LIVE ) {
                video.player.play();
              }
              video.wrapper.find( '.vjs-sharebox' ).fadeOut( 200 );

              video.wrapper.focus();

            },

            facebook : function () {

              var D = {};

              D.id = video.id;

              switch ( video.data.type ) {
                case keyword.CLIP :
                  D.typeCode = video.data.content.playerInfo.content.typ_cd;
                  break;
                case keyword.LIVE :
                  D.typeCode = video.data.content.playerInfo.channel.typ_cd;
                  break;
              }

              data.load( {
                url : URL.SHARE.FACEBOOK_API,
                data : D,
                success : popup.open.share.facebook
              } );

            },

            copyButton : {

              clipboard : new Clipboard( video.wrapper.find( '.vjs-share-copy .btn-share' )[ 0 ], {
                container : video.wrapper.find( '.vjs-share-copy' )[ 0 ]
              } ),

              success : function () {
                // window.alert( '주소를 복사했습니다.' );
              }

            }

          };

          video.player.on( 'fullscreenchange', video.fullscreen.change );
          video.player.on( 'click', event.bubbling.block );

          video.wrapper.find( 'a' ).on( { click : event.defaultAction.block } );

          video.wrapper.find( '.vjs-control-bar' ).on( { click : event.bubbling.block } );

          video.wrapper.find( '.vjs-play-progress' ).on( {
            mouseover : seekingButton.zoom.in,
            mouseout : seekingButton.zoom.out,
            mousedown : seekingButton.drag
          } );
          $( document ).on( { mouseup : seekingButton.drag } );

          video.wrapper.find( '.vjs-volume-panel' ).on( { mouseover : volumeBar.show } );
          video.wrapper.find( '.volume-bar-eventarea' ).on( { mouseleave : volumeBar.hide } );
          video.wrapper.find( '.vjs-tech' ).on( { mouseover : volumeBar.hide } );
          video.wrapper.on( { mouseleave : volumeBar.hide } );
          video.wrapper.find( '.vjs-volume-level' ).on( { mousedown : volumeBar.drag } );
          $( document ).on( { mouseup : volumeBar.drag } );

          video.wrapper.find( '.vjs-setting-control' ).on( { click : controller.menu.setting.show } );
          video.wrapper.find( '.vjs-setting-menu li' ).on( { click : controller.menu.setting.depth2.jump } );
          video.wrapper.find( '.setting-sub-menu' ).on( { click : controller.menu.setting.depth1.jump } );
          video.wrapper.find( '.setting-item li' ).on( { click : controller.menu.setting.depth2.on } );
          video.wrapper.find( '.vjs-setting-help' ).on( { click : event.bubbling.block } );
          video.wrapper.find( '.help-close' ).on( { click : controller.popup.help.hide } );

          video.wrapper.find( '.vjs-share-control' ).on( { click : sharePopup.show } );
          video.wrapper.find( '.vjs-sharebox' ).on( { click : event.bubbling.block } );
          video.wrapper.find( '.vjs-share-inner li' ).eq( 0 ).find( 'a' ).on( { click : sharePopup.facebook } );
          video.wrapper.find( '.vjs-share-inner li' ).eq( 1 ).find( 'a' ).on( { click : popup.open.share.kakaostory } );
          video.wrapper.find( '.vjs-share-inner li' ).eq( 2 ).find( 'a' ).on( { click : popup.open.share.band } );
          video.wrapper.find( '.vjs-share-close' ).on( { click : sharePopup.hide } );
          sharePopup.copyButton.clipboard.on( 'success', sharePopup.copyButton.success );

          if ( video.data.type == keyword.CLIP ) {

            block.quality( 2 );

            video.wrapper.find( '.vjs-prev-control' ).on( { click : page.jump.prev } );
            video.wrapper.find( '.vjs-next-control' ).on( {
              mouseover : controller.popup.preview.show,
              click : page.jump.next
            } );

            video.wrapper.find( '.preview-wrap' ).on( { click : page.jump.next } );
            video.wrapper.find( '.preview-wrap' ).on( { click : event.bubbling.block } );
            video.wrapper.find( '.preview-wrap .preview-close' ).on( { click : controller.popup.preview.hide } );
            video.wrapper.find( '.preview-wrap .preview-close' ).on( { click : event.bubbling.block } );

          }

          if ( video.data.type == keyword.VOD ) {

            video.wrapper.find( '.video_popup_wrap.nextnotice' ).on( { click : event.bubbling.block } );
            video.wrapper.find( '.video_popup_wrap.nextnotice .btn_cancel' ).on( { click : controller.popup.relay.hide } );
            video.wrapper.find( '.video_popup_wrap.nextnotice .popup_close' ).on( { click : controller.popup.relay.hide } );

            video.wrapper.find( '.video_popup_wrap.nextnotice.play .btn_confirm' ).on( { click : page.jump.next } );
            video.wrapper.find( '.video_popup_wrap.nextnotice.buy .btn_confirm' ).on( { click : page.jump.buy } );

          }

          if ( video.data.type == keyword.MOVIE ) {

            video.player.on( 'ended', video.playing.end );

          }

          if ( video.data.type == keyword.LIVE ) {

            if ( video.jtbc.active ) {
              block.quality( 2 );
            }

          }

          if ( video.data.type == keyword.CLIP || video.data.type == keyword.VOD ) {

            video.wrapper.find( '.vjs-replay-control' ).on( { click : controller.button.relay.on } );
            controller.button.relay.off();

            if ( cookie.get( 'oksusuVideoRelayActive' ) == 'true' ) {
              video.wrapper.find( '.vjs-replay-control' ).trigger( 'click' );
            }

          }

          if ( video.data.type == keyword.CLIP || video.data.type == keyword.LIVE ) {

            video.wrapper.find( '.vjs-mosaic-control' ).on( { click : controller.popup.mosaic.show } );
            video.wrapper.find( '.mosaic-close' ).on( { click : controller.popup.mosaic.hide } );
            video.wrapper.find( '.vjs-mosaic-wrap' ).on( { click : event.bubbling.block } );
            video.wrapper.find( '.mosaic-tab li a' ).on( { click : controller.popup.mosaic.tab.change } );
            video.wrapper.find( '.vjs-slider-btn a' ).on( { click : controller.popup.mosaic.list.rotate } );

          }

          if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE ) {

            video.wrapper.find( '.followPopup .btn_confirm' ).on( { click : controller.popup.follow.up } );
            video.wrapper.find( '.followPopup .popup_close' ).on( { click : controller.popup.follow.hide } );
            video.wrapper.find( '.followPopup .video_popup_wrap' ).on( { click : event.bubbling.block } );

          }

          if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE || video.data.type == keyword.LIVE ) {

            video.wrapper.find( '.video_exception_popup' ).on( { click : event.bubbling.block } );

          }

          video.player.on( 'click', video.playing.toggle );
          video.wrapper.find( '.vjs-play-control.vjs-control' ).on( { click : video.playing.toggle } );

          video.next.check( {
            nextAndFollow : function () {
              controller.popup.follow.show( true );
            }
          } );

          cookie.set( 'oksusuVideoNextPlay', false, 30 );

          keyboard.set();

        },

        off : function () {

          video.wrapper.find( '.volume-upbox' ).hide();
          video.wrapper.find( '.volume-mute' ).hide();

          video.wrapper.find( '.vjs-setting-wrap' ).hide();
          video.wrapper.find( '.vjs-setting-help' ).hide();
          video.wrapper.find( '.vjs-sharebox' ).hide();

          if ( video.data.type == keyword.CLIP ) {
            video.wrapper.find( '.preview-wrap' ).hide();
          }

          if ( video.data.type == keyword.VOD ) {
            video.wrapper.find( '.video_popup_wrap.nextnotice' ).hide();
          }

          if ( video.data.type == keyword.CLIP || video.data.type == keyword.LIVE ) {
            video.wrapper.find( '.vjs-mosaic-wrap' ).hide();
            controller.popup.mosaic.reset();
          }

        },

        title : {

          change : function ( option ) {

            video.wrapper.find( '.vjs-title-text' ).html( OksusuVideoAsset.TAG.EM );
            video.wrapper.find( '.vjs-title-text em' ).text( option.channel );
            video.wrapper.find( '.vjs-title-text em' ).after( option.title );

          }

        },

        icon : {

          play : {

            show : function () {

              video.wrapper.find( '.vjs-big-play-button' ).stop( true ).fadeIn( 100 ).delay( 1500 ).fadeOut( 300 );

              video.wrapper.find( '.volume-upbox' ).hide();
              video.wrapper.find( '.volume-mute' ).hide();

            }

          },

          volume : {

            sync : function () {

              video.wrapper.find( '.volume-upbox .volume-content div' ).width( ( video.player.volume() * 100 ) + '%' );

            }

          }

        },

        button : {

          relay : {

            on : function () {

              $( this ).toggleClass( 'off' );

              if ( $( this ).hasClass( 'off' ) ) {

                controller.button.relay.active = true;

                video.player.on( 'ended', page.jump.next );
                video.player.off( 'ended', video.playing.end );

                switch ( video.data.type ) {
                  case keyword.CLIP :
                    video.player.on( 'timeupdate', controller.popup.preview.notice );
                    break;
                  case keyword.VOD :
                    video.player.off( 'ended', controller.popup.relay.show );
                    video.player.on( 'ended', controller.popup.buy.show );
                    break;
                }

                cookie.set( 'oksusuVideoRelayActive', true, 30 );

              } else {

                controller.button.relay.off();

                cookie.set( 'oksusuVideoRelayActive', false, 30 );

              }

            },

            off : function () {

              controller.button.relay.active = false;

              video.player.off( 'ended', page.jump.next );
              video.player.on( 'ended', video.playing.end );

              switch ( video.data.type ) {
                case keyword.CLIP :
                  video.player.off( 'timeupdate', controller.popup.preview.notice );
                  break;
                case keyword.VOD :
                  video.player.on( 'ended', controller.popup.relay.show );
                  video.player.off( 'ended', controller.popup.buy.show );
                  break;
              }

            }

          }

        },

        menu : {

          setting : {

            show : function () {

              video.wrapper.find( '.vjs-setting-wrap' ).fadeToggle( 100 );

            },

            hide : function ( i ) {

              if ( i < video.wrapper.find( '.vjs-setting-menu li' ).last().index() ) {
                $( this ).hide();
              }

            },

            depth1 : {

              jump : function () {

                $( this ).parent().hide();
                video.wrapper.find( '.vjs-setting-menu' ).show();

              }

            },

            depth2 : {

              jump : function () {

                if ( $( this ).index() < 2 ) {
                  video.wrapper.find( '.vjs-setting-menu' ).hide();
                }

                switch ( $( this ).index() ) {
                  case 0 :
                    video.wrapper.find( '.setting-quality' ).show();
                    break;
                  case 1 :
                    video.wrapper.find( '.setting-ratio' ).show();
                    break;
                  case 2 :
                    controller.popup.help.show();
                    break;
                }

              },

              on : function () {

                var depth2 = $( this ).parent().parent();
                var i = depth2.index();

                depth2.find( '.setting-item li' ).addClass( 'on' ).not( $( this ) ).removeClass( 'on' );
                video.wrapper.find( '.vjs-setting-menu li' ).eq( i - 1 ).children().eq( 1 ).text( $( this ).text() );

                depth2.hide();
                video.wrapper.find( '.vjs-setting-menu' ).show();

              },

              apply : function () {

                switch ( $( this ).parent().prev().text() ) {
                  case '화질설정' :
                    switch ( $( this ).text() ) {
                      case 'Auto' :
                        video.change.quality( video.change.AUTO );
                        break;
                      case 'SD' :
                        video.change.quality( video.change.SD );
                        break;
                      case 'HD' :
                        video.change.quality( video.change.HD );
                        break;
                      case 'Full HD' :
                        video.change.quality( video.change.FULL_HD );
                        break;
                    }
                    break;
                  case '화면비율' :
                    switch ( $( this ).text() ) {
                      case '원본비율' :
                        video.change.ratio.apply();
                        break;
                      case '꽉찬화면' :
                        video.change.ratio.apply( true );
                        break;
                    }
                    break;
                }

              }

            },

            quality : {

              keyword : [

                'hlsUrlAUTO',
                'hlsUrlPhoneSD',
                'hlsUrlPhoneHD',
                'hlsUrlPhoneFHD'

              ],

              hide : function ( i ) {

                if ( ! video.data.content.playerInfo.streamUrl[ controller.menu.setting.quality.keyword[ i ] ] ) {
                  $( this ).hide();
                }

              }

            }

          }

        },

        popup : {

          follow : {

            ready : function ( reload ) {

              if ( video.data.content.playerInfo.streamUrl.lastWatchPosition == 0 ) {
                video.player.controls( true );
                if ( reload ) {
                  video.option.autoplay = true;
                }
              } else {
                video.player.controls( false );
                if ( reload ) {
                  video.option.autoplay = false;
                  controller.igs.show();
                  controller.popup.follow.show( true );
                }
              }

              if ( reload ) {
                video.player.autoplay( video.option.autoplay );
              }

            },

            show : function ( delay ) {

              if ( delay ) {
                video.wrapper.find( '.followPopup .video_popup_wrap' ).delay( 700 ).fadeIn( 400 );
              } else {
                video.wrapper.find( '.followPopup .video_popup_wrap' ).fadeIn( 200 );
              }

            },

            hide : function () {

              video.wrapper.find( '.followPopup .video_popup_wrap' ).fadeOut( 200 );

            },

            up : function () {

              controller.popup.follow.hide();

              if ( ! $( this ).hasClass( 'text_blue' ) ) {
                video.time.now = 0;
              } else {
                video.time.now = video.data.content.playerInfo.streamUrl.lastWatchPosition;
              }
              video.player.currentTime( video.time.now );

              video.player.controls( true );
              controller.igs.jump();

            }

          },

          relay : {

            show : function () {

              if ( controller.type.current != video.MINI ) {

                if ( video.next.buy ) {
                  video.wrapper.find( '.video_popup_wrap.nextnotice.play' ).fadeIn( 200 );
                }

              }

            },

            hide : function () {

              video.wrapper.find( '.video_popup_wrap.nextnotice' ).fadeOut( 200 );

            }

          },

          buy : {

            show : function () {

              if ( controller.type.current != video.MINI ) {

                if ( video.next.active ) {
                  if ( ! video.next.buy ) {
                    video.wrapper.find( '.video_popup_wrap.nextnotice.buy' ).fadeIn( 200 );
                  }
                }

              }

            }

          },

          preview : {

            show : function () {

              video.wrapper.find( '.preview-wrap' ).fadeIn( 500 );
              video.wrapper.find( '.preview-wrap .preview-text' ).dotdotdot( { wrap : 'letter' } );

            },

            hide : function () {

              video.wrapper.find( '.preview-wrap' ).fadeOut( 500 );
              video.wrapper.focus();

            },

            notice : function () {

              if ( controller.button.relay.active ) {
                if ( ! controller.popup.preview.showed && video.player.currentTime() > video.player.duration() - 5 ) {

                  if ( controller.type.current != video.MINI ) {
                    controller.popup.preview.showed = true;
                    controller.popup.preview.show();
                  }

                }
              }

            }

          },

          help : {

            show : function () {

              if ( video.data.type != keyword.LIVE ) {
                video.player.pause();
              }
              video.wrapper.find( '.vjs-setting-wrap' ).hide();
              video.wrapper.find( '.vjs-setting-help' ).fadeIn( 200 );

            },

            hide : function () {

              if ( video.data.type != keyword.LIVE ) {
                video.player.play();
              }
              video.wrapper.find( '.vjs-setting-help' ).fadeOut( 200 );

              video.wrapper.focus();

            }

          },

          mosaic : {

            show : function () {

              if ( video.data.type != keyword.LIVE ) {
                video.player.pause();
              }
              video.wrapper.find( '.vjs-mosaic-wrap' ).fadeIn( 200 );
              video.wrapper.find( '.mosaic-tab li' ).eq( 0 ).find( 'a' ).trigger( 'click' );

            },

            hide : function () {

              if ( controller.popup.mosaic.finish ) {
                controller.popup.mosaic.finish = false;
              } else {
                if ( video.data.type != keyword.LIVE ) {
                  video.player.play();
                }
              }
              video.wrapper.find( '.vjs-mosaic-wrap' ).fadeOut( 200, controller.popup.mosaic.reset );

              video.wrapper.focus();

            },

            reset : function () {

              video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).empty();
              controller.popup.mosaic.list.add();

            },

            tab : {

              LIVE : {
                ALL : '전체채널',
                POPULAR : '인기채널'
              },
              CLIP : {
                RELATED : '관련클립',
                POPULAR : '인기클립'
              },

              input : function ( i ) {

                switch ( video.data.type ) {

                  case keyword.CLIP :
                    switch ( i ) {
                      case 0 :
                        $( this ).find( 'a' ).attr( { title : controller.popup.mosaic.tab.CLIP.RELATED } ).text( controller.popup.mosaic.tab.CLIP.RELATED );
                        break;
                      case 1 :
                        $( this ).find( 'a' ).attr( { title : controller.popup.mosaic.tab.CLIP.POPULAR } ).text( controller.popup.mosaic.tab.CLIP.POPULAR );
                        break;
                    }
                    break;

                  case keyword.LIVE :
                    switch ( i ) {
                      case 0 :
                        $( this ).find( 'a' ).attr( { title : controller.popup.mosaic.tab.LIVE.ALL } ).text( controller.popup.mosaic.tab.LIVE.ALL );
                        break;
                      case 1 :
                        $( this ).find( 'a' ).attr( { title : controller.popup.mosaic.tab.LIVE.POPULAR } ).text( controller.popup.mosaic.tab.LIVE.POPULAR );
                        break;
                    }
                    break;

                }

              },

              change : function () {

                var url;
                var D = {};

                controller.popup.mosaic.tab.current = $( this ).parent().index();

                video.wrapper.find( '.mosaic-tab li' ).removeClass( 'on' );
                $( this ).parent().addClass( 'on' );

                switch ( video.data.type ) {

                  case keyword.CLIP :
                    D.pageSize = controller.popup.mosaic.list.LIMIT;
                    D.pageNo = 1;
                    switch ( controller.popup.mosaic.tab.current ) {
                      case 0 :
                        if ( video.data.content.playerInfo.content.id_contents ) {
                          url = URL.MOSAIC.CLIP.RELATED;
                          D.contentId = video.data.content.playerInfo.content.id_contents;
                        } else {
                          url = URL.MOSAIC.CLIP.RECOMMENDATION;
                          D.clipId = video.id;
                          D.channelId = video.data.content.playerInfo.content.channel_id;
                        }
                        break;
                      case 1 :
                        url = URL.MOSAIC.CLIP.POPULAR;
                        D.menuId = '9000000300';
                        break;
                    }
                    break;

                  case keyword.LIVE :
                    switch ( controller.popup.mosaic.tab.current ) {
                      case 0 :
                        url = URL.MOSAIC.LIVE.ALL;
                        break;
                      case 1 :
                        url = URL.MOSAIC.LIVE.POPULAR;
                        D.pageSize = controller.popup.mosaic.list.LIMIT;
                        break;
                    }
                    break;

                }

                data.load( {
                  url : url,
                  data : D,
                  success : controller.popup.mosaic.list.remove
                } );

              }

            },

            list : {

              LENGTH : 12,
              LIMIT : 60,

              sliding : false,

              remove : function ( data ) {

                var complete = function () {

                  var D;

                  video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).css( { left : 0 } );
                  video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).empty();

                  switch ( video.data.type ) {
                    case keyword.CLIP :
                      switch ( controller.popup.mosaic.tab.current ) {
                        case 0 :
                          D = data.content;
                          break;
                        case 1 :
                          D = data.grids[ 0 ].grids;
                          break;
                      }
                      break;
                    case keyword.LIVE :
                      D = data.channels;
                      break;
                  }

                  if ( D.length > 0 ) {
                    controller.popup.mosaic.list.add( data );
                  } else {
                    controller.popup.mosaic.list.add();
                  }

                };

                video.wrapper.find( '.mosaic-list-wrap ul' ).eq( controller.popup.mosaic.list.page.current ).animate( { opacity : 0 }, 400, complete );

              },

              add : function ( data ) {

                var i;

                var L = {

                  add : function ( i ) {

                    var ii;

                    for ( ii = 0; ii < controller.popup.mosaic.list.LENGTH; ii++ ) {
                      $( this ).append( OksusuVideoAsset.TAG.LI );
                      if ( i == 0 ) {
                        $( this ).find( 'li' ).css( { opacity : 0 } );
                      }
                    }

                  },

                  content : {

                    add : function ( i ) {

                      if ( i < controller.popup.mosaic.list.total ) {
                        switch ( video.data.type ) {
                          case keyword.CLIP :
                            $( this ).html( OksusuVideoAsset.MOSAIC_LIST_CLIP );
                            break;
                          case keyword.LIVE :
                            $( this ).html( OksusuVideoAsset.MOSAIC_LIST_LIVE );
                            break;
                        }
                      }

                    }

                  }

                };

                controller.popup.mosaic.list.page.set( data );

                video.wrapper.find( '.vjs-mosaic-wrap .mosaic-list-wrap .list-wrap' ).css( {
                  width : ( ( controller.popup.mosaic.list.page.length + 1 ) * 100 ) + '%'
                } );

                for ( i = 0; i < controller.popup.mosaic.list.page.length; i++ ) {
                  video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).append( OksusuVideoAsset.TAG.UL );
                }

                video.wrapper.find( '.mosaic-list-wrap ul' ).each( L.add );

                if ( data ) {

                  video.wrapper.find( '.mosaic-list-wrap li' ).each( L.content.add );
                  video.wrapper.find( 'a' ).on( { click : event.defaultAction.block } );

                  controller.popup.mosaic.list.push( data );

                }

              },

              push : function ( data ) {

                var D;

                var L = {

                  push : function ( i ) {

                    var image = {};

                    switch ( video.data.type ) {

                      case keyword.CLIP :

                        switch ( controller.popup.mosaic.tab.current ) {
                          case 0 :
                            D = data.content;
                            break;
                          case 1 :
                            D = data.grids[ 0 ].grids;
                            break;
                        }

                        if ( i < D.length ) {

                          controller.popup.mosaic.list.id[ i ] = D[ i ].clip_id;

                          image.source = D[ i ].thum_info_high[ 0 ][ '1' ].split( '/' );
                          image.url = D[ i ].thum_info_high[ 0 ][ '1' ].replace( image.source[ 5 ], '284_161' );

                          L.set( $( this ), i );

                          $( this ).find( '.list-box .list-img img' ).attr( { src : image.url } );
                          $( this ).find( '.list-box .list-title span' ).text( D[ i ].clip_title );
                          $( this ).find( '.list-info .list-title' ).text( D[ i ].clip_title );
                          $( this ).find( '.list-info .list-subtitle' ).text( D[ i ].clip_chnl_nm );
                          $( this ).find( '.list-info .list-stat span' ).eq( 0 ).text( time.convert.runningTime( D[ i ].p_time, time.SIMPLE ) );
                          $( this ).find( '.list-info .list-stat span' ).eq( 1 ).text( D[ i ].view_count );

                        }

                        break;

                      case keyword.LIVE :

                        if ( i < data.channels.length ) {

                          controller.popup.mosaic.list.id[ i ] = data.channels[ i ].serviceId;

                          L.set( $( this ), i );

                          $( this ).find( '.list-box .list-title span' ).text( data.channels[ i ].channelName );

                          if ( data.channels[ i ].genreCd == 260 ) {

                            L.empty( $( this ), i );

                          } else {

                            if ( data.channels[ i ].programs.length > 0 ) {

                              D = {};

                              D.start = time.convert.airTime( data.channels[ i ].programs[ 0 ].startTime );
                              D.end = time.convert.airTime( data.channels[ i ].programs[ 0 ].endTime );

                              image.source = data.channels[ i ].thumbExtImageName.split( '/' );
                              image.url = data.channels[ i ].thumbExtImageName.replace( image.source[ 5 ], '284_161' );

                              $( this ).find( '.list-box .list-img img' ).attr( { src : image.url } );
                              $( this ).find( '.list-info .list-subtitle' ).text( data.channels[ i ].channelName );
                              $( this ).find( '.list-info .list-title' ).text( data.channels[ i ].programs[ 0 ].programName );
                              $( this ).find( '.list-info .list-stat' ).text( D.start + '~' + D.end );

                              D.start = data.channels[ i ].programs[ 0 ].startTime;
                              D.current = $.now();
                              D.end = data.channels[ i ].programs[ 0 ].endTime;

                              D.progress = time.convert.progress( {
                                start : D.start,
                                current : D.current,
                                end : D.end
                              } );

                              $( this ).find( '.list-info .info-play-linear span' ).width( D.progress + '%' );

                              if ( data.channels[ i ].channelProd != 0 && data.channels[ i ].channelProd != 5 ) {
                                $( this ).find( '.list-info .ico_free' ).hide();
                              }

                              if ( data.channels[ i ].chatYn != 'Y' ) {
                                $( this ).find( '.list-info .ico_chatting' ).hide();
                              }

                            } else {

                              L.empty( $( this ), i );

                            }

                          }

                        }

                        break;

                    }

                  },

                  set : function ( I, i ) {

                    I.find( '.list-box .list-img img' ).on( { error : L.replace } );

                    if ( i < controller.popup.mosaic.list.LENGTH ) {
                      I.find( '.list-box .list-img img' ).on( { load : L.show } );
                    }

                  },

                  empty : function ( I, i ) {

                    I.find( '.list-box .list-img' ).css( { backgroundColor : '#FFFFFF' } );
                    I.find( '.list-box .list-img img' ).attr( { src : URL.IMAGE.CHANNEL_LOGO + data.channels[ i ].channelImageName } );
                    I.find( '.list-info .list-subtitle' ).text( '' );
                    I.find( '.list-info .list-title' ).text( '' );
                    I.find( '.list-info .list-stat' ).text( '' );
                    I.find( '.list-info .info-play-linear span' ).width( 0 );
                    I.find( '.list-info .ico_free' ).hide();
                    I.find( '.list-info .ico_chatting' ).hide();

                  },

                  replace : function () {

                    $( this ).attr( { src : location.origin + URL.IMAGE.ERROR } );

                  },

                  show : function () {

                    $( this ).parents( 'li' ).animate( { opacity : 1 }, 400 );

                  }

                };

                controller.popup.mosaic.list.id = [];
                video.wrapper.find( '.mosaic-list-wrap li' ).each( L.push );

                controller.popup.mosaic.list.set();

                if ( controller.popup.mosaic.list.page.length > 1 ) {
                  controller.popup.mosaic.list.dummy.add();
                }

              },

              set : function () {

                video.wrapper.find( '.mosaic-list-wrap li' ).css( { overflow : 'hidden' } );
                video.wrapper.find( '.mosaic-list-wrap li .list-info' ).css( { opacity : 0 } );

                video.wrapper.find( '.mosaic-list-wrap li a' ).on( {
                  mouseover : controller.popup.mosaic.list.info.show,
                  mouseleave : controller.popup.mosaic.list.info.hide,
                  click : page.jump.mosaic
                } );

              },

              change : function () {

                if ( controller.popup.mosaic.list.sliding == false ) {

                  controller.popup.mosaic.list.sliding = true;
                  controller.popup.mosaic.list.page.current = $( this ).index();
                  controller.popup.mosaic.list.slide( $( this ).index() );

                }

              },

              rotate : function () {

                var limit = controller.popup.mosaic.list.page.NORMAL;

                if ( controller.popup.mosaic.list.sliding == false ) {

                  controller.popup.mosaic.list.sliding = true;

                  switch ( $( this ).attr( 'class' ).split( ' ' ).pop() ) {

                    case 'btn-prev' :

                      controller.popup.mosaic.list.page.current--;

                      if ( controller.popup.mosaic.list.page.current < 0 ) {
                        limit = controller.popup.mosaic.list.page.MINIMUM;
                        controller.popup.mosaic.list.page.current = controller.popup.mosaic.list.page.length - 1;
                      }

                      break;

                    case 'btn-next' :

                      controller.popup.mosaic.list.page.current++;

                      if ( controller.popup.mosaic.list.page.current >= controller.popup.mosaic.list.page.length ) {
                        limit = controller.popup.mosaic.list.page.MAXIMUM;
                        controller.popup.mosaic.list.page.current = 0;
                      }

                      break;

                  }

                  controller.popup.mosaic.list.slide( controller.popup.mosaic.list.page.current, limit );

                }

              },

              slide : function ( current, limit ) {

                var width = 1170;

                var complete = function () {
                  controller.popup.mosaic.list.sliding = false;
                  if ( limit == controller.popup.mosaic.list.page.MAXIMUM ) {
                    video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).css( { left : 0 } );
                  }
                };

                video.wrapper.find( '.vjs-slider-indicate a' ).removeClass( 'on' );
                video.wrapper.find( '.vjs-slider-indicate a' ).eq( current ).addClass( 'on' );

                switch ( limit ) {
                  case controller.popup.mosaic.list.page.MINIMUM :
                    video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).css( { left : -width * controller.popup.mosaic.list.page.length } );
                    break;
                  case controller.popup.mosaic.list.page.MAXIMUM :
                    current = controller.popup.mosaic.list.page.length;
                    break;
                }

                video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).animate( { left : -width * current }, 500, 'easeInOutSine', complete );

              },

              info : {

                show : function () {

                  $( this ).find( '.list-box .list-title' ).stop( true ).animate( { bottom : -$( this ).height() }, 200 );
                  $( this ).find( '.list-info' ).stop( true ).animate( { opacity : 1 }, 200 );

                },

                hide : function () {

                  $( this ).find( '.list-box .list-title' ).stop( true ).animate( { bottom : 0 }, 200 );
                  $( this ).find( '.list-info' ).stop( true ).animate( { opacity : 0 }, 200 );

                }

              },

              dummy : {

                add : function () {

                  video.wrapper.find( '.mosaic-list-wrap .list-wrap' ).append( video.wrapper.find( '.mosaic-list-wrap ul' ).first().clone() );
                  video.wrapper.find( '.mosaic-list-wrap ul' ).last().find( 'li' ).css( { opacity : 1 } );

                }

              },

              page : {

                MINIMUM : 'minimum',
                NORMAL : 'normal',
                MAXIMUM : 'maximum',

                length : 0,
                current : 0,

                set : function ( data ) {

                  var i;

                  var indicator = {

                    numbering : function ( i ) {
                      $( this ).text( i + 1 );
                    },

                    show : function ( i ) {
                      if ( i < controller.popup.mosaic.list.page.length ) {
                        $( this ).show();
                      }
                    }

                  };

                  video.wrapper.find( '.vjs-slider-btn a' ).hide();
                  video.wrapper.find( '.vjs-slider-indicate a' ).hide();

                  if ( data ) {

                    switch ( video.data.type ) {
                      case keyword.CLIP :
                        switch ( controller.popup.mosaic.tab.current ) {
                          case 0 :
                            controller.popup.mosaic.list.total = data.content.length;
                            break;
                          case 1 :
                            controller.popup.mosaic.list.total = data.grids[ 0 ].grids.length;
                            break;
                        }
                        break;
                      case keyword.LIVE :
                        controller.popup.mosaic.list.total = data.channels.length;
                        break;
                    }

                    controller.popup.mosaic.list.page.length = Math.ceil( controller.popup.mosaic.list.total / controller.popup.mosaic.list.LENGTH );
                    controller.popup.mosaic.list.page.current = 0;

                    if ( controller.popup.mosaic.list.page.length > video.wrapper.find( '.vjs-slider-indicate a' ).length ) {
                      indicator.addLength = controller.popup.mosaic.list.page.length - video.wrapper.find( '.vjs-slider-indicate a' ).length;
                      for ( i = 0; i < indicator.addLength; i++ ) {
                        video.wrapper.find( '.vjs-slider-indicate' ).append( video.wrapper.find( '.vjs-slider-indicate a' ).last().clone() );
                      }
                      video.wrapper.find( '.vjs-slider-indicate a' ).each( indicator.numbering );
                    }

                    if ( controller.popup.mosaic.list.page.length > 1 ) {
                      video.wrapper.find( '.vjs-slider-btn a' ).show();
                      video.wrapper.find( '.vjs-slider-indicate a' ).each( indicator.show );
                    }

                    video.wrapper.find( '.vjs-slider-indicate a' ).off( { click : controller.popup.mosaic.list.change } );
                    video.wrapper.find( '.vjs-slider-indicate a' ).on( { click : controller.popup.mosaic.list.change } );

                    video.wrapper.find( '.vjs-slider-indicate a' ).eq( controller.popup.mosaic.list.page.current ).trigger( 'click' );

                  } else {

                    controller.popup.mosaic.list.total = 0;
                    controller.popup.mosaic.list.page.length = 1;
                    controller.popup.mosaic.list.page.current = 0;

                  }

                }

              }

            }

          },

          toast : {

            show : function ( value, delay ) {

              video.wrapper.find( '.vjs-toast-control .toast_popup_wrap p' ).html( value );
              video.wrapper.find( '.vjs-toast-control .toast_popup_wrap' ).stop( true ).delay( delay ).fadeIn( 500 ).delay( 1000 ).fadeOut( 500 );

            }

          }

        },

        igs : {

          add : function () {

            var image;

            if ( video.data.type == keyword.CLIP ) {
              image = video.data.content.playerInfo.content.thum_info_type[ 0 ][ '1' ];
            } else if ( video.data.type == keyword.LIVE ) {
              image = video.data.content.playerInfo.channel.thumbTypImageName;
            } else {
              image = video.data.content.playerInfo.content.thum_path;
            }

            if ( image ) {
              video.wrapper.find( '.igs' ).html( OksusuVideoAsset.IGS );
            } else {
              video.wrapper.find( '.igs' ).html( OksusuVideoAsset.POSTER );
            }

            controller.igs.push( image );

          },

          push : function ( image ) {

            var active;

            if ( image ) {
              active = true;
              image = image.replace( ':type', '860_484' );
              video.wrapper.find( '.igs .movie-thumb02' ).css( { backgroundImage : 'url( ' + image + ' )' } );
            } else {
              active = false;
              image = video.data.content.playerInfo.content.pstr_path.replace( ':type', '224_320' );
              video.wrapper.find( '.igs .movie-thumb03 .posterBgBox' ).css( { backgroundImage : 'url( ' + image + ' )' } );
              video.wrapper.find( '.igs .movie-thumb03 .posterBox' ).css( { backgroundImage : 'url( ' + image + ' )' } );
            }

            controller.igs.set( active );

          },

          set : function ( active ) {

            if ( active ) {
              video.wrapper.find( '.igs .movie-thumb02' ).on( { click : controller.igs.jump } );
              video.wrapper.find( '.igs .movie-thumb02' ).on( { click : event.bubbling.block } );
            } else {
              video.wrapper.find( '.igs .movie-thumb03' ).on( { click : controller.igs.jump } );
              video.wrapper.find( '.igs .movie-thumb03' ).on( { click : event.bubbling.block } );
            }

          },

          show : function () {

            var event = $.Event( keyword.EVENT.VIDEO_PAUSE );

            video.wrapper.find( '.igs' ).fadeIn( 500 );
            video.wrapper.find( '.igs button' ).delay( 500 ).fadeIn( 500 );

            video.wrapper.trigger( event );

          },

          hide : function () {

            var event = $.Event( keyword.EVENT.VIDEO_PLAY );

            video.wrapper.find( '.igs button' ).fadeOut( 500 );
            video.wrapper.find( '.igs' ).delay( 500 ).fadeOut( 500 );

            if ( ! video.playing.already ) {
              video.playing.already = true;
            }

            video.wrapper.trigger( event );

          },

          jump : function () {

            switch ( exception.type ) {

              case exception.LOGIN :

                page.jump.login();

                break;

              case exception.BUY :

                popup.open.buy();

                break;

              case exception.NULL :

                code.trace( 'do not jump' );

                break;

              default :

                if ( video.player.controls() ) {
                  controller.igs.hide();
                  video.player.play();
                } else {
                  controller.popup.follow.show();
                }

                break;

            }

          }

        }

      };

      var keyboard = {

        set : function () {

          code.trace( 'keyboard set...' );

          video.wrapper.on( { keydown : keyboard.control } );

          exception.popup.add();

        },

        control : function ( e ) {

          code.trace( e.keyCode );

          var timeIcon = {

            show : function () {

              video.wrapper.find( '.vjs-big-play-button' ).hide();
              video.wrapper.find( '.play-time-control' ).stop( true ).fadeIn( 100 ).delay( 500 ).fadeOut( 500 );
              video.wrapper.find( '.volume-upbox' ).hide();
              video.wrapper.find( '.volume-mute' ).hide();

            }

          };

          var volumeIcon = {

            show : function () {

              video.wrapper.find( '.vjs-big-play-button' ).hide();
              video.wrapper.find( '.play-time-control' ).hide();
              video.wrapper.find( '.volume-upbox' ).stop( true ).fadeIn( 100 ).delay( 500 ).fadeOut( 500 );
              video.wrapper.find( '.volume-mute' ).hide();

            }

          };

          var muteIcon = {

            show : function () {

              video.wrapper.find( '.vjs-big-play-button' ).hide();
              video.wrapper.find( '.play-time-control' ).hide();
              video.wrapper.find( '.volume-upbox' ).hide();
              video.wrapper.find( '.volume-mute' ).stop( true ).fadeIn( 100 ).delay( 500 ).fadeOut( 500 );

            }

          };

          if ( video.player.controls() ) {

            switch ( e.keyCode ) {

              // 엔터 키
              case 13 :
                video.wrapper.find( '.vjs-fullscreen-control' ).trigger( 'click' );
                break;

              // 스페이스바
              case 32 :
                controller.icon.play.show();
                if ( video.player.paused() ) {
                  video.player.play();
                } else {
                  video.player.pause();
                }
                video.player.trigger( 'click' );
                break;

              // 업 키
              case 38 :
                if ( video.player.volume() == 0 ) {
                  video.volume.zero = true;
                } else {
                  video.volume.zero = false;
                }
                video.volume.unmute();
                if ( video.player.volume() < 1 ) {
                  if ( video.volume.zero ) {
                    controller.icon.volume.sync();
                  } else {
                    video.volume.set( ( video.player.volume() + 0.1 ).toFixed( 1 ) );
                  }
                }
                volumeIcon.show();
                break;

              // 다운 키
              case 40 :
                video.volume.unmute();
                if ( video.player.volume() > 0 ) {
                  video.volume.set( ( video.player.volume() - 0.1 ).toFixed( 1 ) );
                  volumeIcon.show();
                }
                if ( video.player.volume() == 0 ) {
                  muteIcon.show();
                }
                break;

              // M 키
              case 77 :
                video.wrapper.find( '.vjs-big-play-button' ).hide();
                video.wrapper.find( '.vjs-mute-control' ).trigger( 'click' );
                switch ( video.wrapper.find( '.vjs-mute-control .vjs-control-text' ).text() ) {
                  case 'Mute' :
                    muteIcon.show();
                    break;
                  case 'Unmute' :
                    volumeIcon.show();
                    break;
                }
                break;

            }

            if ( video.data.type == keyword.CLIP || video.data.type == keyword.VOD || video.data.type == keyword.MOVIE ) {

              switch ( e.keyCode ) {

                // 왼쪽 키
                case 37 :
                  video.player.currentTime( video.player.currentTime() - 5 );
                  video.wrapper.find( '.play-time-control .time-control .ico-time' ).text( '-' );
                  video.wrapper.find( '.play-time-control .total-time' ).text( time.convert.runningTime( video.player.currentTime() ) );
                  timeIcon.show();
                  break;

                // 오른쪽 키
                case 39 :
                  video.player.currentTime( video.player.currentTime() + 5 );
                  video.wrapper.find( '.play-time-control .time-control .ico-time' ).text( '+' );
                  video.wrapper.find( '.play-time-control .total-time' ).text( time.convert.runningTime( video.player.currentTime() ) );
                  timeIcon.show();
                  break;

              }

            }

          }

          if ( e.keyCode < 48 || e.keyCode > 57 ) {
            e.preventDefault();
          }

        }

      };

      var exception = {

        LOGIN : 'login',
        BUY : 'buy',
        NULL : 'null',

        popup : {

          add : function () {

            code.trace( 'exceptionCasePopup add...' );

            // 해외IP 차단 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'allowIpPopup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.allowIpPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_FOREIGN_IP_ONLINE );

            // 성인인증 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'adultCertificationPopup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.adultCertificationPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_ADULT_CERTIFICATION );

            // 성인인증 MINI 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'adultCertificationMiniPopup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.adultCertificationMiniPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_ADULT_CERTIFICATION_MINI );

            // 12세 미만 이용제한 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'age12Popup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.age12Popup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_AGE_12 );

            // 12세 미만 이용제한 MINI 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'age12MiniPopup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.age12MiniPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_AGE_12_MINI );

            // 15세 미만 이용제한 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'age15Popup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.age15Popup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_AGE_15 );

            // 15세 미만 이용제한 MINI 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'age15MiniPopup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.age15MiniPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_AGE_15_MINI );

            // 19세 미만 이용제한 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'age19Popup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.age19Popup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_AGE_19 );

            // 19세 미만 이용제한 MINI 팝업 add
            element.add( {
              type : element.BIG_PLAY_BUTTON,
              className : 'age19MiniPopup',
              asset : OksusuVideoAsset.EXCEPTION_POPUP
            } );
            video.wrapper.find( '.age19MiniPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_AGE_19_MINI );

            if ( video.data.type == keyword.LIVE ) {

              // 블랙아웃 팝업 add
              element.add( {
                type : element.BIG_PLAY_BUTTON,
                className : 'blackoutPopup',
                asset : OksusuVideoAsset.EXCEPTION_POPUP
              } );
              video.wrapper.find( '.blackoutPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_BLACKOUT );

              // 블랙아웃 MINI 팝업 add
              element.add( {
                type : element.BIG_PLAY_BUTTON,
                className : 'blackoutMiniPopup',
                asset : OksusuVideoAsset.EXCEPTION_POPUP
              } );
              video.wrapper.find( '.blackoutMiniPopup .video_popup_inner' ).html( OksusuVideoAsset.EXCEPTION_BLACKOUT_MINI );

              // 경기시간이 아닐 때 팝업 add
              element.add( {
                type : element.BIG_PLAY_BUTTON,
                className : 'gameoutPopup',
                asset : OksusuVideoAsset.EXCEPTION_GAMEOUT
              } );

              // 경기시간이 아닐 때 MINI 팝업 add
              element.add( {
                type : element.BIG_PLAY_BUTTON,
                className : 'gameoutMiniPopup',
                asset : OksusuVideoAsset.EXCEPTION_GAMEOUT_MINI
              } );

            }

            if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE || video.data.type == keyword.LIVE ) {

              // 에로스 상품구매 팝업 add
              element.add( {
                type : element.BIG_PLAY_BUTTON,
                className : 'buyErosPopup',
                asset : OksusuVideoAsset.EXCEPTION_ADULT_BUY
              } );
              video.wrapper.find( '.buyErosPopup' ).css( { cursor : 'pointer' } );

            }

            exception.popup.push();

          },

          push : function () {

            if ( video.data.type == keyword.LIVE ) {
              video.wrapper.find( '.gameoutPopup .popup_top strong' ).text( video.data.content.playerInfo.channel.channelName );
            }

            exception.popup.set();

          },

          set : function () {

            code.trace( 'exceptionCasePopup set...' );

            video.data.addPosition.find( 'a' ).on( { click : event.defaultAction.block } );

            video.wrapper.find( '.adultCertificationPopup .btn_default' ).on( { click : page.jump.adultCertification } );

            video.wrapper.find( '.age12Popup .btn_default' ).on( { click : popup.open.allowWatch } );
            video.wrapper.find( '.age15Popup .btn_default' ).on( { click : popup.open.allowWatch } );
            video.wrapper.find( '.age19Popup .btn_default' ).on( { click : popup.open.allowWatch } );

            video.wrapper.find( '.buyErosPopup' ).on( { click : popup.open.buy } );

            exception.check();

          }

        },

        check : function () {

          code.trace( 'exceptionCase check...' );

          var event;
          var content = data.content.get();
          var showed = false;

          var login = function ( F ) {

            if ( video.data.user.login ) {

              F();

            } else {

              if ( ! showed ) {

                showed = true;
                video.freeze();

                exception.type = exception.LOGIN;
                controller.igs.show();

              }

            }

          };

          exception.type = undefined;

          // 성인 여부 분기
          if ( content.watch == 19 || content.erotic == 'Y' || content.attribute == 'Y' ) {

            login( function () {

              if ( ! video.data.user.adult ) {

                code.trace( 'user adult :: ' + video.data.user.adult );
                code.trace( 'content watch level :: ' + content.watch );
                code.trace( 'content erotic :: ' + content.erotic );
                code.trace( 'content erotic :: ' + content.attribute );

                if ( ! showed ) {

                  showed = true;
                  video.freeze();

                  video.wrapper.find( '.adultCertificationPopup .btn_default' ).trigger( 'click' );

                }

              }

            } );

          }

          // 해외IP 제한 분기
          if ( video.data.content.playerInfo.allowIPYn != 'Y' ) {

            code.trace( 'allow ip :: ' + video.data.content.playerInfo.allowIPYn );

            if ( ! showed ) {

              showed = true;
              video.freeze();

              video.wrapper.find( '.allowIpPopup .video_exception_popup' ).fadeIn( 500 );

            }

          }

          // 서비스 중지 분기
          if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE ) {

            if ( video.data.content.playerInfo.content.matl_sts_cd == 80 || video.data.content.playerInfo.content.purchase_info_cd == 80 ) {

              code.trace( 'content close :: ' + video.data.content.playerInfo.content.matl_sts_cd );

              if ( ! showed ) {

                showed = true;
                video.freeze();

                exception.type = exception.NULL;
                video.wrapper.find( '.igs button' ).remove();
                controller.igs.show();

              }

            }

          }

          // 구매 여부 분기
          if ( video.data.type == keyword.VOD || video.data.type == keyword.MOVIE || video.data.type == keyword.LIVE ) {
            if ( video.data.type != keyword.LIVE || video.data.content.playerInfo.channel.channel_extr_cd != 2 ) {

              if ( video.data.content.playerInfo.streamUrl.permission != 'Y' ) {

                login( function () {

                  code.trace( 'content permission :: ' + video.data.content.playerInfo.streamUrl.permission );

                  if ( ! showed ) {

                    showed = true;
                    video.freeze();

                    exception.type = exception.BUY;

                    if ( video.data.type == keyword.LIVE && content.erotic == 'Y' ) {
                      video.wrapper.find( '.buyErosPopup' ).find( '.video_exception_popup' ).fadeIn( 500 );
                    } else {
                      controller.igs.show();
                    }

                    if ( video.player.isFullscreen() ) {
                      event = $.Event( keyword.EVENT.POPUP_SHIFT );
                      event.popup = keyword.POPUP.BUY;
                      video.wrapper.trigger( event );
                    }

                  }

                } );

              }

            }
          }

          // 시청연령 제한 분기
          if ( video.data.user.watch.level > 10 ) {
            if ( User.isWatchAvailable != 'Y' ) {
              if ( video.data.user.watch.level <= content.watch ) {

                code.trace( 'user watch level :: ' + video.data.user.watch.level );
                code.trace( 'content watch level :: ' + content.watch );
                code.trace( 'watch allow :: ' + User.isWatchAvailable );

                if ( ! showed ) {

                  showed = true;
                  video.freeze();

                  switch ( content.watch ) {
                    case '12' :
                      exception.popup.default = video.wrapper.find( '.age12Popup .video_exception_popup' );
                      exception.popup.mini = video.wrapper.find( '.age12MiniPopup .video_exception_popup' );
                      break;
                    case '15' :
                      exception.popup.default = video.wrapper.find( '.age15Popup .video_exception_popup' );
                      exception.popup.mini = video.wrapper.find( '.age15MiniPopup .video_exception_popup' );
                      break;
                    case '19' :
                      exception.popup.default = video.wrapper.find( '.age19Popup .video_exception_popup' );
                      exception.popup.mini = video.wrapper.find( '.age19MiniPopup .video_exception_popup' );
                      break;
                  }

                  exception.popup.default.fadeIn( 500 );

                  if ( video.player.isFullscreen() ) {
                    event = $.Event( keyword.EVENT.POPUP_SHIFT );
                    event.popup = keyword.POPUP.ALLOW_WATCH;
                    video.wrapper.trigger( event );
                  }

                }

              }
            }
          }

          // 블랙아웃 분기
          if ( video.data.type == keyword.LIVE ) {

            if ( video.data.content.playerInfo.channel.blackout_yn == 'Y' ) {

              code.trace( 'black out :: ' + video.data.content.playerInfo.channel.blackout_yn );

              if ( ! showed ) {

                showed = true;
                video.freeze();

                video.option.sources = undefined;

                if ( video.data.content.playerInfo.channel.genreCd == 190 ) {
                  exception.popup.default = video.wrapper.find( '.gameoutPopup .video_exception_popup' );
                  exception.popup.mini = video.wrapper.find( '.gameoutMiniPopup .video_exception_popup' );
                } else {
                  exception.popup.default = video.wrapper.find( '.blackoutPopup .video_exception_popup' );
                  exception.popup.mini = video.wrapper.find( '.blackoutMiniPopup .video_exception_popup' );
                }

                exception.popup.default.fadeIn( 500 );

              }

            }

          }

          if ( showed ) {
            event = $.Event( keyword.EVENT.VIDEO_PAUSE );
            video.wrapper.trigger( event );
          }

        },

        clear : function () {

          code.trace( 'exceptionCase clear...' );

          code.check( function () {

            if ( video.data.type == keyword.CLIP || video.data.type == keyword.LIVE ) {
              video.player.controls( true );
            } else {
              video.player.off( 'timeupdate', video.playing.new );
              controller.igs.show();
              controller.popup.follow.ready();
            }

            video.player.src( video.option.sources );

            exception.popup.default.fadeOut( 500 );
            exception.popup.default = undefined;
            exception.popup.mini = undefined;

          } );

        },

        pass : function ( D ) {

          var id = {

            get : function () {

              var value;

              switch ( D.playerInfo.mediaType ) {
                case 'CLIP' :
                  value = D.playerInfo.content.clip_id;
                  break;
                case 'LIVE' :
                  value = D.playerInfo.channel.serviceId;
                  break;
                default :
                  value = D.playerInfo.content.con_id;
                  break;
              }

              return value;

            }

          };

          var watchAvailable = {

            refresh : function ( allow ) {

              User.isWatchAvailable = allow;

              exception.check();

              code.check( function () {
                checkViewPage( D );
              } );

            }

          };

          data.load( {
            url : URL.ALLOW_WATCH,
            data : {
              contentType : D.playerInfo.mediaType,
              id : id.get()
            },
            success : watchAvailable.refresh
          } );

        }

      };

      var popup = {

        open : {

          buy : function () {

            var event = $.Event( keyword.EVENT.BUY );

            event.videoId = video.id;

            video.wrapper.trigger( event );

          },

          allowWatch : function () {

            var event = $.Event( keyword.EVENT.POPUP_SHIFT );

            event.popup = keyword.POPUP.ALLOW_WATCH;
            event.fullscreen = video.player.isFullscreen();
            video.wrapper.trigger( event );

            // exception.clear();

          },

          rating : function () {

            var event = $.Event( keyword.EVENT.RATING_POPUP_SHOW );

            video.wrapper.trigger( event );

          },

          share : {

            facebook : function () {

              var url = encodeURIComponent( location.href );

              window.open( URL.SHARE.FACEBOOK + '?u=' + url, '', 'width=470, height=350' );

            },

            kakaostory : function () {

              var url = encodeURIComponent( location.href );

              window.open( URL.SHARE.KAKAO_STORY + '?url=' + url, '', 'width=670, height=470' );

            },

            band : function () {

              var title = encodeURIComponent( video.wrapper.find( '.vjs-title-text' ).text() );
              var url = encodeURIComponent( location.href );

              window.open( URL.SHARE.BAND + '?body=' + title + '%0A' + url, '', 'width=1000, height=900' );

            }

          }

        }

      };

      var page = {

        path : function () {

          var path = location.pathname.split( '/' );

          path.pop();
          path = path.join( '/' );
          path += '/';

          return path;

        },

        jump : {

          prev : function () {

            if ( video.prev.active ) {
              page.jump.video( video.prev.id );
            }

          },

          next : function () {

            var stop = true;

            if ( video.next.active ) {
              if ( video.next.buy ) {
                stop = false;
                cookie.set( 'oksusuVideoNextPlay', true, 30 );
                page.jump.video( video.next.id );
              }
            }

            if ( stop ) {
              video.playing.end();
            }

          },

          mosaic : function () {

            var i = $( this ).parent().parent().index() * controller.popup.mosaic.list.LENGTH;

            i += $( this ).parent().index();
            page.jump.video( controller.popup.mosaic.list.id[ i ] );

          },

          video : function ( id ) {

            var url;

            if ( video.player.isFullscreen() ) {

              page.reloading = true;
              video.reload( id );

            } else {

              url = page.path();
              url += encodeURIComponent( id );
              location.href = url;

            }

          },

          login : function () {

            page.jump.other( URL.EXCEPTION.LOGIN );

          },

          adultCertification : function () {

            page.jump.other( URL.EXCEPTION.ADULT_CERTIFICATION );

          },

          buy : function () {

            var event = $.Event( keyword.EVENT.BUY );

            event.next = true;
            event.videoId = video.next.id;

            video.wrapper.trigger( event );

          },

          other : function ( url ) {

            url += '?rw=';
            url += page.path();
            url += encodeURIComponent( video.id );

            location.href = url;

          }

        },

        reload : function () {

          location.reload();

        }

      };

      var event = {

        bubbling : {

          block : function ( e ) {
            e.stopPropagation();
          }

        },

        defaultAction : {

          block : function ( e ) {
            e.preventDefault();
          }

        }

      };

      var time = {

        SIMPLE : 'simple',

        convert : {

          runningTime : function ( seconds, type ) {

            var H = time.zero.add( parseInt( seconds / ( 60 * 60 ) ) );
            var M = time.zero.add( parseInt( seconds / 60 % 60 ) );
            var S = time.zero.add( parseInt( seconds % 60 ) );
            var T;

            if ( type == time.SIMPLE ) {
              if ( seconds < 3600 ) {
                T = M + ':' + S;
              } else {
                T = H + ':' + M;
              }
            } else {
              T = H + ':' + M + ':' + S;
            }

            return T;

          },

          airTime : function ( timestamp ) {

            var D = new Date( parseInt( timestamp ) );
            var H = D.getHours();
            var M = D.getMinutes();

            if ( H <= 12 ) {
              H = '오전' + time.zero.add( H );
            } else {
              H = '오후' + time.zero.add( H - 12 );
            }

            M = time.zero.add( M );

            return H + ':' + M;

          },

          progress : function ( time ) {

            return Math.floor( ( ( time.current - time.start ) / ( time.end - time.start ) ) * 100 );

          }

        },

        zero : {

          add : function ( x ) {

            if ( x < 10 ) {
              x = '0' + x;
            }

            return x;

          }

        }

      };

      var data = {

        load : function ( option ) {

          $.ajax( {
            url : option.url,
            data : option.data,
            cache : false,
            success : function ( data, textStatus, jqXHR ) {
              // code.trace( 'data load success :: ' + jqXHR.status );
              if ( option.success ) {
                option.success( data );
              }
            },
            error : function ( jqXHR ) {
              code.trace( 'data load error :: ' + jqXHR.status );
              if ( option.error ) {
                option.error( jqXHR.status );
              }
            }
          } );

        },

        send : {

          time : {

            current : function () {

              if ( video.player.currentTime() > 5 && video.player.currentTime() < video.player.duration() * 0.98 ) {
                video.time.now = parseInt( video.player.currentTime() );
              } else {
                video.time.now = 0;
              }

              $.ajax( {
                url : URL.CURRENT_TIME,
                data : {
                  contentId : video.id,
                  section : 'WG002',
                  playTime : video.time.now
                },
                cache : false,
                async : false,
                success : function () {
                  code.trace( 'save current time :: ' + video.time.now );
                },
                error : function () {
                  code.trace( 'save error' );
                }
              } );

            }

          }

        },

        content : {

          get : function () {

            var value = {};

            switch ( video.data.type ) {
              case keyword.CLIP :
                value.attribute = video.data.content.playerInfo.content.adlt_cd;
                break;
              case keyword.LIVE :
                value.attribute = video.data.content.playerInfo.channel.genreCd;
                break;
              default :
                value.attribute = video.data.content.playerInfo.content.at_contents;
                break;
            }

            switch ( value.attribute ) {
              case '02' :
              case '260' :
              case '에로스' :
                value.attribute = 'Y';
                break;
              default :
                value.attribute = 'N';
                break;
            }

            if ( video.data.type == keyword.LIVE ) {
              value.watch = video.data.content.playerInfo.channel.age_rating;
              value.erotic = video.data.content.playerInfo.channel.eros_yn;
            } else {
              value.watch = video.data.content.playerInfo.content.age_rating;
              value.erotic = video.data.content.playerInfo.content.eros_yn;
            }

            return value;

          }

        }

      };

      var cookie = {

        set : function ( name, value, keep ) {

          var C = '';
          var D = new Date();

          D.setDate( D.getDate() + keep );

          C += name;
          C += '=';
          C += value;
          C += ';';
          C += 'expires=';
          C += D.toUTCString();

          document.cookie = C;

        },

        get : function ( name ) {

          var i;
          var V = '';
          var C = document.cookie.split( ';' );

          name += '=';

          for ( i in C ) {
            C[ i ] = C[ i ].trim();
            if ( C[ i ].indexOf( name ) == 0 ) {
              V = C[ i ].substring( name.length, C[ i ].length );
            }
          }

          return V;

        }

      };

      var code = {

        trace : function ( value ) {

          // console.log( value );

        },

        check : function ( F ) {

          try {
            F();
          } catch ( error ) {
            code.trace( error.message );
          }

        }

      };

      return keyword;

    }

)( $ );
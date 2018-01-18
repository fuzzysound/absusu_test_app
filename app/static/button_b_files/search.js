var Search = (function() {
  var SearchObject = {
    CATEGORY : {
      ALL: {name : '전체', code : '5'},
      LIVE: {name : 'LIVE', code : '0'},
      MOVIE: {name : '영화', code : '1'},
      VOD: {name : '방송VOD', code : '2'},
      CLIP: {name : '클립', code : '3'},
      PEOPLE: {name : '인물', code : '4'}
    },
    PARAM : {
      ALL : {query : '', type : '5', pooqCode : 'PQ', selectScope : 'ALL', pageNo : 1, pageSize : 10, rating : '', sort : 'new', fromMain : 'N', externalCode : '1,2^1,2'},
      LIVE : {query : '',type : '0',pooqCode : 'PQ',selectScope : 'ALL',pageNo : 1,pageSize : 30,rating : '',sort : 'new',fromMain : 'N', externalCode : '1,2'},
      MOVIE : {query : '',type : '1',pooqCode : 'PQ',selectScope : 'ALL',pageNo : 1,pageSize : 30,rating : '',sort : 'new',fromMain : 'N'},
      VOD : {query : '',type : '2',pooqCode : 'PQ',selectScope : 'ALL',pageNo : 1,pageSize : 30,rating : '',sort : 'new',fromMain : 'N'},
      CLIP : {query : '',type : '3',pooqCode : 'PQ',selectScope : 'ALL',pageNo : 1,pageSize : 30,rating : '',sort : 'new',fromMain : 'N', externalCode : '1,2'},
      PEOPLE : {query : '',type : '4',pooqCode : 'PQ',selectScope : '',pageNo : 1,pageSize : 24,rating : '',sort : 'hit',fromMain : 'N'}
    },
    data : {
      query : '',
      inputQuery : '',
      activeTab : null,
      searchDimHtml : '<div id="search-dim" class="unifiedSearchDim"></div>',
      popularKeywordData : null,
      $searchBtn : null,
      $searchArea : null,
      $searchAutocompleteArea : null,
      $searchResultBtn : null,
      $popularKeywordArea : null,
      $searchResultArea : null,
      $searchResultTab : null,
      $lsearchKeywordArea : null
    },
    init : function(searchQuery) {
      SearchObject.data.activeTab = SearchObject.CATEGORY.ALL;
      SearchObject.data.$searchBtn = $('#search-btn');
      SearchObject.data.$searchArea = $('#search-area');
      SearchObject.data.$searchKeywordInput = $('#search-area').find('input.iptSearch');
      SearchObject.data.$searchAutocompleteArea = $('#search-area').find('div.searchRelateWrap');
      SearchObject.data.$searchResultBtn = $('#search-area').find('button.btnSearch');
      SearchObject.data.$popularKeywordArea = $('#search-area').find('div.unifiedPopularWrap');
      SearchObject.data.$searchResultArea = $('#container');
      SearchObject.data.$searchResultTab = $('#container').find('ul.searchTab');
      SearchObject.data.$lsearchKeywordArea = $('#search-area').find('div.unifiRecentBox');

      var searchKeyword = $(".unifiedResultComt span").text().replace(/([‘’])/g,"");
      SearchObject.data.$searchKeywordInput.val(searchKeyword);

      SearchObject.getPopularKeywordList();

      if (location.pathname.indexOf('/search/result') > -1) {
        // SearchObject.data.$searchBtn.addClass('on');
        // SearchObject.data.$searchArea.show();
        // SearchObject.data.$popularKeywordArea.hide();

        if (!searchQuery) {
          searchQuery = ' ';
        }

        SearchObject.data.query = searchQuery;

        // SearchObject.data.$searchKeywordInput.val(query);

        SearchObject.PARAM.ALL.query = SearchObject.data.query;
        SearchObject.getSearchResultList(SearchObject.PARAM.ALL, insertLSearchWrdYn==="Y");
      }

      // 검색 버튼 클릭
      SearchObject.data.$searchBtn.click(function() {
        SearchObject.data.$searchArea.attr("keepYn", "N");
        if (SearchObject.data.$searchArea.is(":visible")) {
          SearchObject.data.$searchBtn.removeClass('on');
          SearchObject.data.$searchArea.hide();
          $('#search-dim').remove();
          SearchObject.data.$searchAutocompleteArea.hide();
        } else {
          SearchObject.data.$searchBtn.addClass('on');
          SearchObject.data.$searchArea.show();
          SearchObject.data.$searchKeywordInput.focus();


        }
      });

      // 검색결과 버튼 클릭
      SearchObject.data.$searchResultBtn.click(function() {
        SearchObject.clickSearchResultBtn();
      });

      SearchObject.data.$searchKeywordInput.keypress(function(e) {
        if (e.keyCode === 13) {
          SearchObject.clickSearchResultBtn();
        }
      });
      // 검색어입력 영역에서 delete 버튼 입력시 검색영역 hide
      SearchObject.data.$searchKeywordInput.keyup(function(e) {
        if (e.keyCode === 46) {
          SearchObject.data.$searchKeywordInput.val('');
        }
      });
      // 연관검색어 영역에서 delete 버튼 입력시 검색영역 hide
      SearchObject.data.$searchAutocompleteArea.keyup(function(e) {
        if (e.keyCode === 46) {
          SearchObject.data.$searchKeywordInput.val('');
          SearchObject.clickClearKeyword();
        }
      });
      SearchObject.data.$searchKeywordInput.focus(function(){
        if(!$("#search-dim").length){ $('#header').before(SearchObject.data.searchDimHtml); }
        if (SearchObject.data.$searchKeywordInput.val() === '') {
          SearchObject.data.$popularKeywordArea.show();
          SearchObject.data.$searchAutocompleteArea.hide();
        } else {
          SearchObject.data.$popularKeywordArea.hide();

          SearchObject.data.inputQuery = SearchObject.data.$searchKeywordInput.val().trim();
          SearchObject.getAutocompleteList(SearchObject.data.inputQuery);
        }
      });

      if (window.ua_result.browser.name === 'firefox') {
        var typewatchOptions = {
          callback: function (value) {
            if (value === '') {
              SearchObject.data.$searchArea.find('button.btnSchClear').hide();
              SearchObject.data.$popularKeywordArea.show();
              SearchObject.data.$searchAutocompleteArea.hide();
              SearchObject.data.inputQuery = '';
            } else {
              SearchObject.data.$searchArea.find('button.btnSchClear').show();
              SearchObject.data.$popularKeywordArea.hide();

              if (SearchObject.data.inputQuery != value.trim()) {
                SearchObject.data.inputQuery = value.trim();
                SearchObject.getAutocompleteList(SearchObject.data.inputQuery);
              }
            }
          },
          wait: 100,
          highlight: false,
          allowSubmit: false,
          captureLength: 1
        };

        SearchObject.data.$searchKeywordInput.typeWatch(typewatchOptions);
      } else {
        SearchObject.data.$searchKeywordInput.keyup(function (e) {
          if (SearchObject.data.$searchKeywordInput.val() === '') {
            SearchObject.data.$searchArea.find('button.btnSchClear').hide();
            SearchObject.data.$popularKeywordArea.show();
            SearchObject.data.$searchAutocompleteArea.hide();
            SearchObject.data.inputQuery = '';
          } else {
            SearchObject.data.$searchArea.find('button.btnSchClear').show();
            SearchObject.data.$popularKeywordArea.hide();

            if (SearchObject.data.inputQuery != SearchObject.data.$searchKeywordInput.val().trim()) {
              SearchObject.data.inputQuery = SearchObject.data.$searchKeywordInput.val().trim();
              SearchObject.getAutocompleteList(SearchObject.data.inputQuery);
            }
          }
        });
      }

      // 검색영역 이외 영역 클릭
      $(document).click(function() {
        // 검색결과 페이지 구분
        // if (location.pathname.indexOf('/search/result') > -1) {
        //   $('#search-dim').remove();
        //   SearchObject.data.$searchAutocompleteArea.hide();
        //   SearchObject.data.$popularKeywordArea.hide();
        // } else {



          if(SearchObject.data.$searchArea.attr("keepYn")==="N"){
            SearchObject.data.$searchArea.hide();
            SearchObject.data.$searchBtn.removeClass('on');
          }
          $('#search-dim').remove();
          SearchObject.data.$popularKeywordArea.hide();
          SearchObject.data.$searchAutocompleteArea.hide();
          SearchObject.data.$searchResultArea.css({'padding' : ''});
        // }
      }).on('click', '#search-area', function(e) {
        e.stopPropagation();
      }).on('click', '#search-btn', function(e) {
        e.stopPropagation();
        SearchObject.getLsearchList();  // 최근검색 - 돋보기 클릭시 조회(말줄임 태우기위함)
      }).on('click', 'button[name=recent-btn]', function(e) {
        e.stopPropagation();
      });

      $(document).on('keydown', '.unifiedSearchWrap .iptSearch', function(e) {//검색어 입력박스에 포커스일 경우
        var _this = $(this);
        var _keycode = e.originalEvent.keyCode;
        var _relateListBox = $('.unifiedSearchWrap .relateListBox');

        //_this.attr('data-original-text', _this.val());
        _this.data('original-text', _this.val());

        if(_keycode == 40) {
          e.preventDefault();
          _this.val(_relateListBox.find('li a').eq(0).data('text'));
          _relateListBox.find('li a').eq(0).focus().find('.relateDetailWrap').show();
          SearchObject.setAutocompleteImageAlign(_relateListBox.find('li a').eq(0));
        }
      });

      $(document).on('keydown', '.unifiedSearchWrap .searchRelateWrap .relateListBox li a', function(e) {//연관검색어 리스트에 포커스일 경우
        var _keycode = e.originalEvent.keyCode;
        var _this = $(this);
        var _relateWrap = _this.parents('.relateListBox');
        var _parentEle = _this.parent();
        var _eleIdx = _parentEle.index();
        var _scrollT = $(window).scrollTop();
        var _iptSearch = _this.parents('.unifiedSearchWrap').find('.iptSearch');

        if(_keycode == 38) {//방향키 위
          e.preventDefault();
          _relateWrap.find('.relateDetailWrap').hide();
          if(_eleIdx == 0) {//리스트 첫번쨰에서 방향키 up클릭시 검색어 입력 박스로 포커스 이동
            _iptSearch.focus();
            _iptSearch.val(_iptSearch.data('original-text'));
          }else{
            _parentEle.prev().find('a').focus().find('.relateDetailWrap').show();
            _iptSearch.val(_parentEle.prev().find('a').data('text'));
          }
          SearchObject.setAutocompleteImageAlign(_parentEle.prev().find('a'));
        }else if(_keycode == 40) {//방향키 아래
          e.preventDefault();
          if(_eleIdx == 4) {return;}
          _relateWrap.find('.relateDetailWrap').hide();
          _parentEle.next().find('a').focus().find('.relateDetailWrap').show();
          _iptSearch.val(_parentEle.next().find('a').data('text'));
          SearchObject.setAutocompleteImageAlign(_parentEle.next().find('a'));
        }
      });
    },
    getCategoryByCode : function(categoryCode) {
      for (var item in SearchObject.CATEGORY) {
        if (SearchObject.CATEGORY[item].code == categoryCode) {
          return SearchObject.CATEGORY[item];
        }
      }
    },
    clickSearchResultBtn : function () {
      var searchKeyword = SearchObject.data.$searchKeywordInput.val();
      if (searchKeyword.trim() != '') {
        SearchObject.moveSearchResult(searchKeyword.trim());
      } else {
        SearchObject.data.$searchKeywordInput.val('');
        SearchObject.data.$searchKeywordInput.focus();
      }
    },
    clickClearKeyword : function() {
      SearchObject.data.$searchArea.find('button.btnSchClear').hide();
      SearchObject.data.$searchKeywordInput.val('');
      SearchObject.data.$searchKeywordInput.focus();
      SearchObject.data.$searchAutocompleteArea.hide();
      SearchObject.data.$popularKeywordArea.show();
    },
    moveSearchResult : function(searchKeyword) {
      location.href = '/search/result?q=' + encodeURIComponent(searchKeyword);
    },
    getAutocompleteList : function(query) {
      $.ajax({
        url: '/api/search/autocomplete/list',
        type: 'get',
        data : {
          query : query
        },
        cache: false,
        success: function (response) {
          if (response && response.result === 'OK') {
            SearchObject.renderAutocompleteList(response);
          }
        },
        error: function (response) {
        }
      });
    },
    renderAutocompleteList : function(response) {
      var html = '';

      if (response.totalResultNo != 0) {
        SearchObject.data.$searchAutocompleteArea.show();

        $(response.results).each(function (index, data) {
          if (index < 5) {
            var searchCategory = SearchObject.getCategoryByCode(data.code);
            var title = data.title;
            var skbCid = data.skbCid;
            var link = '';
            var categoryName = searchCategory.name;
            var channelName = '';
            var image = '';
            var detailHtml = '';
            var imageInfo = '';
            var adultHtml = '';

            if (searchCategory == SearchObject.CATEGORY.LIVE) {
              data.serviceId = data.channelId;
              link = OksusuCard.getLinkClickHandler(data);
              channelName = '<span class="chName">' + data.channelNm + '</span>';
              title = OksusuCard.getProgramName(data);

              if (data.adlt_cd == 'Y') {
                data.serviceId = data.channelId;
                image = OksusuCard.getChannelLogoBGWhite(data);
              }else {
                image = 'http://igs.oksusu.com:8080/thumbnails/nsigs/224_126/thumb_' + data.channelId + '.jpg';
              }

              var iconSet = SearchObject.getPaidResolIcons(data);
              detailHtml = iconSet;
              adultHtml = (data.level === '19') ? '<em class="icoAdult">19세이하관람불가</em>' : '';
            } else if (searchCategory == SearchObject.CATEGORY.MOVIE) {
              title = ((!User.isLogin || !User.isAdult || !User.isMemberAuth || (User.watchLevel != 'N' && User.watchLevel <= 19)) && data.adlt_cd == 'Y') ? '성인 전용' : OksusuCard.getVodTitle(data);
              data.con_id = data.conId;
              link = OksusuCard.getLinkClickHandler(data);
              channelName = '<span class="chName">' + data.genre + '</span>';
              image =  ((!User.isLogin || !User.isAdult || !User.isMemberAuth || (User.watchLevel != 'N' && User.watchLevel <= 19)) && data.adlt_cd == 'Y') ? '/public/assets/img/img_restricted03.png' : OksusuCard.getMoviePoster(data);
              var iconSet = SearchObject.getPaidResolIcons(data);
              detailHtml = iconSet;
              adultHtml = (data.level === '19') ? '<em class="icoAdult">19세이하관람불가</em>' : '';
            } else if (searchCategory == SearchObject.CATEGORY.VOD) {
              title = OksusuCard.getVodTitle(data);
              data.con_id = data.conId;
              link = OksusuCard.getLinkClickHandler(data);
              categoryName = categoryName.replace('VOD', '');
              channelName = '<span class="chName">' + data.genre + '</span>';
              image = (data.img) ? data.img.replace('imagedev', 'image') : '';
              var iconSet = SearchObject.getPaidResolIcons(data);
              detailHtml = iconSet;
              adultHtml = (data.level === '19') ? '<em class="icoAdult">19세이하관람불가</em>' : '';
            } else if (searchCategory == SearchObject.CATEGORY.CLIP) {
              title = OksusuCard.getClipTitle(data);
              link = OksusuCard.getLinkClickHandler(data);
              channelName = '<span class="chName">' + data.clip_channelNm + '</span>';

              image = OksusuCard.getClipThumbnail(data);

              var runtime = getRuntimeBySecond(data.runtime);
              imageInfo = '<div class="imgInfo">'
                        + '  <span class="time">' + runtime + '</span>'
                        + '</div>';
              var viewCount = comma(data.view_count);
              var broadDate = data.broad_date;
              detailHtml = '<div class="infoUtil">'
                        + '  <span class="view">' + viewCount + '</span>'
                        + '  <span>' + broadDate + '</span>'
                        + '</div>';
              adultHtml = (data.level==='19') ? '<em class="icoAdult">19세이하관람불가</em>' : '';
            } else if (searchCategory == SearchObject.CATEGORY.PEOPLE) {
              title = data.nameKor;
              link = 'move(' + "'" + '/search/people/' + encodeURIComponent(skbCid) + "'" + ')';
              channelName = '<span class="chName">' + data.occupation + '</span>';
              image = (data.photoImg) ? 'http://stimage.oksusu.com:8080/meta/' + data.photoImg : '/public/assets/img/img_default.png';
              var birth = (data.birth) ? moment(data.birth, 'YYYY.MM.DD').format('YYYY년MM월DD일') : '';
              birth = (birth != 'Invalid date') ? birth : '';
              detailHtml = '<div class="infoUtil">'
                        + '  <span>' + birth + '</span>'
                        + '</div>';
            }

            title = title.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
            matchTitle = title.split(SearchObject.data.inputQuery).join('<strong>' + SearchObject.data.inputQuery + '</strong>');

            if (searchCategory != SearchObject.CATEGORY.LIVE || data.adlt_cd != 'Y' || (User.isLogin && User.isMemberAuth && User.isAdult && User.watchLevel == 'N')) {
              html += '<li>'
                  + '  <a href="javascript:;" data-text="' + title + '" onclick=' + link + '>'
                  + '    <span class="searchVary">' + categoryName + '</span>' + matchTitle
                  + '    <div class="relateDetailWrap">'
                  + '      <span class="img"><img src="' + image + '" alt="" width="'+(data.code === '4' ? 100 : '')+'" />' + imageInfo + '</span>'
                  + '      <div class="detailBox">'
                  + '        <span class="chType">' + categoryName + '</span>'
                  + '        <strong class="pgTit">'
                  + adultHtml
                  + title
                  + '        </strong>'
                  + channelName
                  + detailHtml
                  + '      </div>'
                  + '    </div>'
                  + '  </a>'
                  + '</li>';
            }
          }
        });
      } else {
        SearchObject.data.$searchAutocompleteArea.hide();
      }

      SearchObject.data.$searchAutocompleteArea.find('ul').html(html);
      SearchObject.data.$searchAutocompleteArea.find('ul').find('li').mouseenter(function(e) {
        SearchObject.setAutocompleteImageAlign($(this));
      }).mouseleave(function(e) {
        var _this = $(this);
        var _relateDetailWrap = $('.relateDetailWrap', _this);
        _relateDetailWrap.hide();
      });
    },
    setAutocompleteImageAlign : function($this) {
      var _this = $this;
      var _relateDetailWrap = $('.relateDetailWrap', _this);
      var _detailBox = $('.detailBox', _relateDetailWrap);
      var _thisImg = $('img', _relateDetailWrap);

      _relateDetailWrap.show();
      var _thisImgW = _thisImg.outerWidth();
      var _thisImgH = _thisImg.outerHeight();
      if(!_detailBox.hasClass('type02') && _thisImgW / _thisImgH < 1) {
        _detailBox.addClass('type02');
      }

      $this.find('.pgTit').dotdotdot({
        wrap : 'letter'
        , height : 40
      });
    },
    getPopularKeywordList : function() {
      $.ajax({
        url: '/api/search/popular/keyword/list',
        type: 'get',
        cache: false,
        success: function (response) {
          if (response && response.result === 'OK') {
            SearchObject.data.popularKeywordData = response;
            var $renderArea = SearchObject.data.$popularKeywordArea;
            SearchObject.renderPopularKeywordList(response, $renderArea);
          }
        },
        error: function (response) {
        }
      });
    },
    renderPopularKeywordList : function(response, $renderArea) {
      $renderArea.find('div.timeBox').html(response.time + ' <span>기준</span>');

      var html = '';
      $(response.results).each(function(index, data) {
        var splitCount = index % 5;
        var topClass = (index < 3) ? ' class="popularTop"' : '';
        var newHtml = (data.new === 'Y') ? '<span class="flagNew">NEW</span>' : '';
        var linkUrl = '/search/result?q=' + encodeURIComponent(data.title);

        if (splitCount === 0) {
          html += '<ul>';
        }

        html += '	<li><span' + topClass + '>' + data.idx + '</span> <a href="' + linkUrl + '">' + data.title + '</a> ' + newHtml + '</li>';

        if (splitCount !== 0 && splitCount === 4) {
          html +=  '</ul>';
        }
      });

      $renderArea.find('div.popularList').html(html);
    },
    renderSearchResultFooter: function (response, param) {
      var html = "";
      if(param.type===SearchObject.CATEGORY.ALL.code) {
        html += '<div id="popular-keyword-bottom" class="unifiedPopularWrap">'
            + '  <div class="unifiedPopularInner">'
            + '    <div class="popularTit">이런 검색어 어떠세요? <span>옥수수 사용자들이 관심있게 검색한 인기 검색어 입니다.</span></div>'
            + '    <div class="timeBox">'
            + '    </div>'
            + '    <div class="popularList">'
            + '    </div>'
            + '  </div>'
            + '</div>';
        SearchObject.data.$searchResultArea.find('div.searchResultBox').append(html);
        if (SearchObject.data.popularKeywordData) {
          var $renderArea = $('#popular-keyword-bottom');
          SearchObject.renderPopularKeywordList(SearchObject.data.popularKeywordData, $renderArea);
        }
      } else {
        var categoryName = SearchObject.getCategoryByCode(param.type).name;
        var listTitle = "인기 " + categoryName.replace('VOD', '').replace('LIVE', '채널');
        html+='<div class="result_program_list_wrap">'
            + '  <div class="result_program_list_top">'
            + '    <div class="program_list_tit">' + listTitle + '</div>'
            + '  </div>'
            + '  <div class="result_program_list">';

        var list = response.results || [];

        switch (param.type) {
          case SearchObject.CATEGORY.LIVE.code :
            html += '<div class="general_section_list">'
            var liveList = (response.channels || []);
            if (liveList && liveList.length > 0) {
              var $ul = $('<ul class="section_vlist sort line3">');
              $(liveList).each(function (i, item) {
                var $li = $(OksusuCard.getLiveTemplate(item));
                if(item.programs && item.programs.length){
                  var startTime = moment(parseInt(item.programs[0].startTime)).format('a hh:mm');
                  var endTime = moment(parseInt(item.programs[0].endTime)).format('a hh:mm');
                  $li.append('<div class="text_date">' + startTime + ' ~ ' + endTime + '</div>');
                }
                $ul.append($li);

              });
              // html += '</ul>';
              html += $ul.prop("outerHTML");
            }
            html +='</div>';
            break;
          case SearchObject.CATEGORY.MOVIE.code :
            html += '<div class="general_poster_list">'
                + '    <ul class="poster_vlist sort movie">';

            $(list).each(function (index, data) {
              // var contentsId = data.conId;
              var title = ((data.categoryNm == '에로스' && User.watchLevel != 'N') || (data.categoryNm == '에로스' && !User.isLogin)) ? '성인 전용' : data.title;
              var categoryName = data.categoryNm;
              // var link = '/v/' + contentsId;
              var adultHtml = (data.level && data.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
              var iconSet = SearchObject.getPaidResolIcons(data);

              var guestHtml = (data.guest) ? '<div class="text_subtitle">출연 : ' + data.guest + '</div>' : '';
              var story = data.storyMid;
              var vodImg = (data.categoryNm == '에로스') ? '/public/assets/img/img_restricted03.png' : 'http://image.oksusu.com:8080/thumbnails/image/224_320' + data.img;

              data.con_id = data.conId;
              var clickEventHandler = OksusuCard.getLinkClickHandler(data);

              html += '<li class="beforeDot">'
                  + '  <a href="javascript:;" onClick=' + clickEventHandler + ' title="' + title + '">'
                  + '    <div class="poster_info">'
                  + '      <div class="vlist_img">'
                  + '        <img src="' + vodImg + '" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '">'
                  + '        <div class="summary_info">'
                  + '          <span class="ico_grade">평점을 남겨주세요</span>'
                  + '          <div class="text_title">' + title + '</div>'
                  + '          <div class="text_summary">' + story + '</div>'
                  + '        </div>'
                  + '      </div>'
                  + '      <div class="vlist_text_box">'
                  + '        <div class="text_title">'
                  + adultHtml + title
                  + '        </div>'
                  + '        <div class="text_subtitle">'
                  + categoryName
                  + iconSet
                  + '        </div>'
                  + guestHtml
                  + '      </div>'
                  + '    </div>'
                  + '  </a>'
                  + '</li>';
            });
            html += '</ul></div>'
            break;
          case SearchObject.CATEGORY.VOD.code :
            html += '<div class="general_poster_list">'
                + '    <ul class="poster_vlist live sort">';
            $(list).each(function (index, data) {
              // var contentsId = data.conId;
              var title = ((data.categoryNm == '에로스' && User.watchLevel != 'N') || (data.categoryNm == '에로스' && !User.isLogin)) ? '성인 전용' : data.title;
              var categoryName = data.categoryNm;
              // var link = '/v/' + contentsId;
              var adultHtml = (data.level && data.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
              var iconSet = SearchObject.getPaidResolIcons(data);
              var guestHtml = (data.guest) ? '<div class="text_subtitle">출연 : ' + data.guest + '</div>' : '';
              var vodImg = (data.categoryNm == '에로스') ? '/public/assets/img/img_restricted03.png' : 'http://image.oksusu.com:8080/thumbnails/image/224_320' + data.img;

              data.con_id = data.conId;
              var clickEventHandler = OksusuCard.getLinkClickHandler(data);

              html += '<li class="beforeDot">'
                  + '  <a href="javascript:;" onClick=' + clickEventHandler + ' title="' + title + '">'
                  + '    <div class="poster_info">'
                  + '      <div class="vlist_img">'
                  + '        <img src="' + vodImg + '" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">'
                  + '      </div>'
                  + '      <div class="vlist_text_box">'
                  + '        <div class="text_title">'
                  + adultHtml + title
                  + '        </div>'
                  + '        <div class="text_subtitle">'
                  + categoryName
                  + iconSet
                  + '        </div>'
                  + guestHtml
                  + '      </div>'
                  + '    </div>'
                  + '  </a>'
                  + '</li>';
            });
            html += '</ul></div>';
            break;
          case SearchObject.CATEGORY.CLIP.code :
            html += '<div class="general_section_list">'
                + '    <ul class="section_vlist sort line4">';
            $(list).each(function (index, data) {
              // var contentsId = data.conId;
              var title = ((data.adlt_cd == '02' && User.watchLevel != 'N') || (data.adlt_cd == '02' && !User.isLogin)) ? '성인 전용' : data.clip_title;
              // var link = '/v/' + contentsId;
              var adultHtml = (data.level && data.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
              var poster = data.poster || "";
              var posterSplit = poster.split(".");
              var fileName = posterSplit[0].substring(0, posterSplit[0].length-8);
              var fileExt = posterSplit[1];
              var vodImg = (data.adlt_cd == '02') ? '/public/assets/img/img_restricted03.png' : 'http://image.oksusu.com:8080/thumbnails/image/180_101' + fileName + "." + fileExt;
              var clickEventHandler = OksusuCard.getLinkClickHandler(data);

              html += '<li class="beforeDot">'
                  + '  <a href="javascript:;" onClick=' + clickEventHandler + ' title="' + title + '">'
                  + '    <div class="section_info">'
                  + '      <div class="vlist_img">'
                  + '        <img src="' + vodImg + '" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">'
                  + '        <i class="bg_line">이미지 그라데이션</i>'
                  + '        <span class="vlist_time">' + getRuntimeBySecond(data.runtime) + '</span>'
                  + '      </div>'
                  + '      <div class="vlist_text_box">'
                  + '        <div class="text_title">'
                  + adultHtml + title
                  + '        </div>'
                  + '        <div class="text_subtitle">'
                  + data.title
                  + '        </div>'
                  + '        <div class="text_play_count">'
                  + '          <span class="ico_count">' + parseInt(data.view_count).toLocaleString("en") + '</span>'
                  + '          <span class="text_date">' + data.broad_date + '</span>'
                  + '        </div>'
                  + '      </div>'
                  + '    </div>'
                  + '  </a>'
                  + '</li>';
            });
            html += '</ul></div>';
            break;
          case SearchObject.CATEGORY.PEOPLE.code :
            html += '<div class="general_photo_list">'
                + '    <ul class="photo_list">';

            $(list).each(function (index, data) {
              var skbCid = data.skbCid;
              var name = data.nameKor;
              var photoImg = data.photoImg;

              html += '<li class="beforeDot">'
                  + '  <a href="/search/people/' + skbCid + '" class="photo_bg" title="' + name + '">'
                  + '    <div class="img_photo">'
                  + '      <img src="http://stimage.oksusu.com:8080/meta/' + photoImg + '" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">'
                  + '    </div>'
                  + '  </a>'
                  + '  <div class="photo_info">'
                  + '    <div class="photo_info_inner">'
                  + '      <div class="text_title">'
                  + name
                  + '      </div>'
                  + '      <div class="text_subtitle">'
                  + '        <p>' + data.occupation + '</p>'
                  + '        <p>' + ((data.birth || "").indexOf("0000")!=-1 ? "" : data.birth)  + '</p>'
                  + '      </div>'
                  + '    </div>'
                  + '  </div>'
                  + '</li>';
            });
            html += '</ul></div>';
            break;
        }
        html +='</div></div>';

        var $renderArea = SearchObject.data.$searchResultArea.find('div.searchResultBox');
        $renderArea.append(html);

        $renderArea.find('ul').find('li.beforeDot').find('.summary_info').find('.text_title').dotdotdot({
          wrap: 'letter'
          , height: 55
        });
        $renderArea.find('ul').find('li.beforeDot').find('.summary_info').find('.text_summary').dotdotdot({
          wrap: 'letter'
          , height: 105
        });
        $renderArea.find('ul').find('li').removeClass('beforeDot');
      }
    },
    getPopularLiveList:function(param){
      //TOP 30 Live 목록
      $.ajax({
        url: '/api/live/organization/list',
        data: {
          genreCode: '99',
          orgaPropCode: 'RANK'
        },
        success: function (response) {
          if (response.result === 'OK') {
            SearchObject.renderSearchResultFooter(response, param);
          }
        }
      });
    },
    getPopularContentsList: function (param) {
      $.ajax({
        url: '/api/search//popular/contents/list',
        type: 'get',
        data : {
          type : param.type,
          tgroup : "",
          tvalue : "",
          externalCode : "1"
        },
        cache: false,
        success: function (response) {
          if (response && response.result === 'OK') {
            SearchObject.renderSearchResultFooter(response, param);
          }
        },
        error: function (response) {
        }
      });
    },
    getSearchResultList : function(param, boolInsertLSearchWrd) {
      $.ajax({
        url: '/api/search/result/list',
        type: 'get',
        data : param,
        cache: false,
        success: function (response) {
          if (response && response.result === 'OK') {
            SearchObject.renderSearchResultList(response, param);
            if (response.totalResultNo === 0) {
              if (param.type === SearchObject.CATEGORY.ALL.code) { SearchObject.renderSearchResultFooter(response, param); }
              else if(param.type === SearchObject.CATEGORY.LIVE.code) { SearchObject.getPopularLiveList(param); }
              else { SearchObject.getPopularContentsList(param); }
            }

            // 최근검색 적재
            if (boolInsertLSearchWrd) {
              if(User.isLogin){ SearchObject.insertLsearchWrd(param); }
              else { addCookie(param.query); SearchObject.getLsearchList(); }
            }
            else { SearchObject.getLsearchList(); }
          }
        },
        error: function (response) {
        }
      });
    },
    renderSearchResultList : function(response, param) {
      if (param.type == SearchObject.CATEGORY.ALL.code) {
        SearchObject.renderSearchResultTab(response);
        if (response.totalResultNo != 0) {
          if(response.results_tv.length > 0) {
            SearchObject.renderSearchResultSectionChatChk(response.results_tv);
            SearchObject.renderSearchResultSection(response);
          } else{
            SearchObject.renderSearchResultSection(response);
          }
        }
        else {
          var recommendWord = '';
          var recommendHtml = '';
          var recommendLink = '';

          if (response.results_word.length > 0) {
            if (response.results_word[0].recomFlag == 'Y') {
              recommendWord = response.results_word[0].recomWord;
              recommendLink = '/search/result?q=' + encodeURIComponent(recommendWord) + "&insertLSearchWrdYn=N";
              recommendHtml += '<div class="searchRecomLink">'
                  + ' <p><strong>' + recommendWord + '</strong>로 검색하시겠습니까?</p>'
                  + ' <a href="' + recommendLink + '">' + recommendWord + ' 검색결과 보기</a>'
                  + '</div>';
            }
          }

          var html='<div class="searchNotFound">'
              + '  <div class="nodata">'
              + '    <span class="searchWord">‘' + SearchObject.data.query + '’</span> 검색 결과가 없습니다.'
              + recommendHtml
              + '  </div>'
              + '  <p class="txtComt">'
              + '    검색어가 정확한지 확인해 주세요.<br />한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.<br />검색어의 단어 수를 줄이거나 특수문자가 들어있는지 확인해 주세요.'
              + '  </p>'
              + '</div>';
          SearchObject.data.$searchResultArea.find('div.searchResultBox').html(html);
        }
      } else {
        var searchCategory = SearchObject.getCategoryByCode(param.type);

        if (response.totalResultNo != 0) {
          if (param.pageNo == 1) {
            var sortHtml = '';
            var moreHtml = '';

            if (response.totalResultNo > 1) {
              sortHtml = SearchObject.getSortListHtml(param);
            }

            moreHtml += '<div href="javascript:;" class="program_list_more" style="display:none;">'
                + '    <div>더보기<i class="ico_checked_more"></i></div>'
                + '</div>';

            var html = '<div class="result_program_list_wrap">'
                + '    <div class="result_program_list_top">'
                + '        <div class="program_list_tit">' + searchCategory.name + ' <span class="number">(' + response.totalResultNo + ')</span></div>'
                + sortHtml
                + '    </div>'
                + '  <div class="result_program_list">'
                + '  </div>'
                + moreHtml
                + '</div>';

            SearchObject.data.$searchResultArea.find('div.searchResultBox').html(html);
          }

          if (searchCategory == SearchObject.CATEGORY.LIVE) {
            SearchObject.renderSearchResultSectionChatChk(response.results);
            SearchObject.renderSearchResultSectionLive(response.results, SearchObject.data.$searchResultArea.find('div.result_program_list'));
            if (response.totalResultNo > param.pageNo * param.pageSize) {
              SearchObject.data.$searchResultArea.find('div.program_list_more').show().off().click(function (e) {
                e.preventDefault();

                SearchObject.PARAM.LIVE.pageNo = param.pageNo + 1;
                SearchObject.getSearchResultList(SearchObject.PARAM.LIVE);
              });
            } else {
              SearchObject.data.$searchResultArea.find('div.program_list_more').hide();
            }
          } else if (searchCategory == SearchObject.CATEGORY.MOVIE) {
            SearchObject.renderSearchResultSectionMovie(response.results, SearchObject.data.$searchResultArea.find('div.result_program_list'));
            if (response.totalResultNo > param.pageNo * param.pageSize) {
              SearchObject.data.$searchResultArea.find('div.program_list_more').show().off().click(function (e) {
                e.preventDefault();

                SearchObject.PARAM.MOVIE.pageNo = param.pageNo + 1;
                SearchObject.getSearchResultList(SearchObject.PARAM.MOVIE);
              });
            } else {
              SearchObject.data.$searchResultArea.find('div.program_list_more').hide();
            }
          } else if (searchCategory == SearchObject.CATEGORY.VOD) {
            SearchObject.renderSearchResultSectionVod(response.results, SearchObject.data.$searchResultArea.find('div.result_program_list'));
            if (response.totalResultNo > param.pageNo * param.pageSize) {
              SearchObject.data.$searchResultArea.find('div.program_list_more').show().off().click(function (e) {
                e.preventDefault();

                SearchObject.PARAM.VOD.pageNo = param.pageNo + 1;
                SearchObject.getSearchResultList(SearchObject.PARAM.VOD);
              });
            } else {
              SearchObject.data.$searchResultArea.find('div.program_list_more').hide();
            }
          } else if (searchCategory == SearchObject.CATEGORY.CLIP) {
            SearchObject.renderSearchResultSectionClip(response.results, SearchObject.data.$searchResultArea.find('div.result_program_list'));
            if (response.totalResultNo > param.pageNo * param.pageSize) {
              SearchObject.data.$searchResultArea.find('div.program_list_more').show().off().click(function (e) {
                e.preventDefault();

                SearchObject.PARAM.CLIP.pageNo = param.pageNo + 1;
                SearchObject.getSearchResultList(SearchObject.PARAM.CLIP);
              });
            } else {
              SearchObject.data.$searchResultArea.find('div.program_list_more').hide();
            }
          } else if (searchCategory == SearchObject.CATEGORY.PEOPLE) {
            SearchObject.renderSearchResultSectionPeople(response.results, SearchObject.data.$searchResultArea.find('div.result_program_list'));
            if (response.totalResultNo > param.pageNo * param.pageSize) {
              SearchObject.data.$searchResultArea.find('div.program_list_more').show().off().click(function (e) {
                e.preventDefault();

                SearchObject.PARAM.PEOPLE.pageNo = param.pageNo + 1;
                SearchObject.getSearchResultList(SearchObject.PARAM.PEOPLE);
              });
            } else {
              SearchObject.data.$searchResultArea.find('div.program_list_more').hide();
            }
          }
        }
        else {
          var categoryName = SearchObject.getCategoryByCode(param.type).name.replace('VOD', '');
          var html='<div class="searchNotFound">'
              + '  <div class="nodata">'
              +       categoryName + ' 검색결과가 없습니다.'
              + '  </div>'
              + '  <p class="txtComt">'
              + '    검색어가 정확한지 확인해 주세요.<br />한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.<br />검색어의 단어 수를 줄이거나 특수문자가 들어있는지 확인해 주세요.'
              + '  </p>'
              + '</div>';
          SearchObject.data.$searchResultArea.find('div.searchResultBox').html(html);
        }
      }
    },
    getLsearchList : function() {
      var html = '';
      var linkUrl = '';

      if (User.isLogin) {
        $.ajax({
          url: '/api/search/lsearch/list',
          type: 'get',
          cache: false,
          success: function (response) {
            if (response.length === 0) {
              SearchObject.data.$lsearchKeywordArea.hide();
              SearchObject.data.$lsearchKeywordArea.find('ul.recentList').empty();
            } else {
              SearchObject.data.$lsearchKeywordArea.show();

              $(response).each(function (index) {
                linkUrl = '/search/result?q=' + encodeURIComponent(response[index]);

                html += '<li>';
                html += '<a href="' + linkUrl + '" title="' + response[index] + '">' + response[index] + '</a>';
                html += '<button type="button" name="recent-btn" onclick="Search.deleteLsearchWrd(\'' + response[index] + '\')">지우기</button>';
                html += '</li>';
              });

              SearchObject.data.$lsearchKeywordArea.find('ul.recentList').html(html);
              SearchObject.recentList();  // 말줄임
            }
          },
          error: function (response) {
          }
        });
      } else {
        if (!getCookie('recent')) {
          SearchObject.data.$lsearchKeywordArea.find('ul.recentList').empty();
          SearchObject.data.$lsearchKeywordArea.hide();
        } else {
          SearchObject.data.$lsearchKeywordArea.show();

          var lsearchWord = getCookie('recent');
          var lsearchWordArr = new Array();

          if (lsearchWord) {
            lsearchWordArr = lsearchWord.split(',');
            for (var i = lsearchWordArr.length - 1; i >= 0; i--) {
              linkUrl = '/search/result?q=' + encodeURIComponent(lsearchWordArr[i]);

              html += '<li>';
              html += '<a href="' + linkUrl + '" title="' + lsearchWordArr[i] + '">' + lsearchWordArr[i] + '</a>';
              html += '<button type="button" name="recent-btn" onclick="Search.deleteLsearchWrd(\'' + lsearchWordArr[i] + '\')">지우기</button>';
              html += '</li>';
            }

            SearchObject.data.$lsearchKeywordArea.find('ul.recentList').html(html);
            SearchObject.recentList();  // 말줄임
          }
        }
      }
    },
    insertLsearchWrd : function(param) {
      $.ajax({
        url: '/api/search/lsearch/insert',
        type: 'get',
        data: { lsearchWord : param.query },
        cache: false,
        success: function () {
          SearchObject.getLsearchList();
        },
        error: function () {
        }
      });
    },
    deleteLsearchWrd : function(param) {
      if (User.isLogin) {
        $.ajax({
          url: '/api/search/lsearch/delete',
          type: 'get',
          data: {lsearchWord: param},
          cache: false,
          success: function () {
            SearchObject.getLsearchList();
          },
          error: function () {
          }
        });
      } else {
        var lsearchWord = getCookie('recent');
        var delWordAfter = "";

        if (lsearchWord) {
          if (lsearchWord.indexOf(param) > -1) {
            if (lsearchWord.indexOf(param) == 0) {
              delWordAfter = lsearchWord.substring(lsearchWord.indexOf(param) + param.length);
              if (delWordAfter[0] == ',') {
                delWordAfter = delWordAfter.substring(1);
              }
            } else {
              delWordAfter = lsearchWord.substring(0, lsearchWord.indexOf(param)) + lsearchWord.substring(lsearchWord.indexOf(param) + param.length);

              if (delWordAfter[0] == ',') {
                delWordAfter = delWordAfter.substring(1);
              }
              if (delWordAfter[delWordAfter.length - 1] == ',') {
                delWordAfter = delWordAfter.substring(0, delWordAfter.length - 1);
              }
              if (delWordAfter.indexOf(',,') > -1) {
                delWordAfter = delWordAfter.replace(',,', ',');
              }
            }
          }

          setCookie('recent', '', -1);
          if (delWordAfter.length > 0) {
            setCookie('recent', delWordAfter);
          }

          SearchObject.getLsearchList();
        }
      }
    },
    recentList : function() {
      var _ulW = $('.recentList').width();
      var _this = $('.recentList li');
      var _liLeng = _this.length;
      var _thisW = (_ulW/_liLeng)-45;
      $('a',_this).css('max-width',_thisW);
    },
    getSortListHtml : function(param) {
      var searchCategory = SearchObject.getCategoryByCode(param.type);
      var html = '';

      if (searchCategory != SearchObject.CATEGORY.PEOPLE) {
        html = '<div class="program_list_order">'
            + '  <a href="javascript:;" onclick="Search.clickSortBtn(\'' + param.type + '\',\'new\');" data-sort="new"><span class="latest_order">최신순<span class="divide"></span></span></a>'
            + '  <a href="javascript:;" onclick="Search.clickSortBtn(\'' + param.type + '\',\'hit\');" data-sort="hit"><span class="popular_order">인기순<span class="divide"></span></span></a>'
            + '  <a href="javascript:;" onclick="Search.clickSortBtn(\'' + param.type + '\',\'relev\');" data-sort="relev"><span class="acc_order">정확도순</span></a>'
            + '</div>';
      }else {
        html = '<div class="program_list_order">'
            + '  <a href="javascript:;" onclick="Search.clickSortBtn(\'' + param.type + '\',\'hit\');" data-sort="hit"><span class="popular_order">인기순<span class="divide"></span></span></a>'
            + '  <a href="javascript:;" onclick="Search.clickSortBtn(\'' + param.type + '\',\'alpha\');" data-sort="alpha"><span class="acc_order">가나다순</span></a>'
            + '</div>';
      }

      if (html) {
        var $html = $(html).wrapAll('<div>').parent();

        $html.find('a').each(function (index, data) {
          $(data).find('span').removeClass('on');

          if ($(data).data('sort') == param.sort) {
            $(data).find('span').addClass('on');
          }
        });

        html = $html.html();
      }

      return html;
    },
    clickSortBtn : function(code, sort) {
      if (SearchObject.CATEGORY.LIVE == SearchObject.getCategoryByCode(code)) {
        SearchObject.PARAM.LIVE.query = SearchObject.data.query;
        SearchObject.PARAM.LIVE.pageNo = 1;
        SearchObject.PARAM.LIVE.sort = sort;
        SearchObject.getSearchResultList(SearchObject.PARAM.LIVE);
      } else if (SearchObject.CATEGORY.MOVIE == SearchObject.getCategoryByCode(code)) {
        SearchObject.PARAM.MOVIE.query = SearchObject.data.query;
        SearchObject.PARAM.MOVIE.pageNo = 1;
        SearchObject.PARAM.MOVIE.sort = sort;
        SearchObject.getSearchResultList(SearchObject.PARAM.MOVIE);
      } else if (SearchObject.CATEGORY.VOD == SearchObject.getCategoryByCode(code)) {
        SearchObject.PARAM.VOD.query = SearchObject.data.query;
        SearchObject.PARAM.VOD.pageNo = 1;
        SearchObject.PARAM.VOD.sort = sort;
        SearchObject.getSearchResultList(SearchObject.PARAM.VOD);
      } else if (SearchObject.CATEGORY.CLIP == SearchObject.getCategoryByCode(code)) {
        SearchObject.PARAM.CLIP.query = SearchObject.data.query;
        SearchObject.PARAM.CLIP.pageNo = 1;
        SearchObject.PARAM.CLIP.sort = sort;
        SearchObject.getSearchResultList(SearchObject.PARAM.CLIP);
      } else if (SearchObject.CATEGORY.PEOPLE == SearchObject.getCategoryByCode(code)) {
        SearchObject.PARAM.PEOPLE.query = SearchObject.data.query;
        SearchObject.PARAM.PEOPLE.pageNo = 1;
        SearchObject.PARAM.PEOPLE.sort = sort;
        SearchObject.getSearchResultList(SearchObject.PARAM.PEOPLE);
      }
    },
    renderSearchResultTab : function(response) {
      var tabHtml = '<li data-code="' + SearchObject.CATEGORY.ALL.code + '" class="on">전체 <span>(' + response.totalResultNo + ')</span></li>';

      $(response.category).each(function(index, data) {
        tabHtml += '<li data-code="'+ data.code + '">' + data.title + ' <span>(' + data.count + ')</span></li>';
      });

      SearchObject.data.$searchResultTab.html(tabHtml);

      SearchObject.data.$searchResultTab.find('li').click(function(e) {
        e.preventDefault();

        SearchObject.clickSearchResultTab($(this).data('code'));
      });
    },
    clickSearchResultTab : function(categoryCode) {
      if (SearchObject.data.activeTab.code != categoryCode) {
        SearchObject.data.$searchResultTab.find('li').removeClass('on');
        $(SearchObject.data.$searchResultTab.find('li')).each(function (index, data) {
          if ($(this).data('code') == categoryCode) {
            $(this).addClass('on');
            SearchObject.data.activeTab = SearchObject.getCategoryByCode(categoryCode);

            if (SearchObject.data.activeTab == SearchObject.CATEGORY.ALL) {
              SearchObject.getSearchResultList(SearchObject.PARAM.ALL);
            } else if (SearchObject.data.activeTab == SearchObject.CATEGORY.LIVE) {
              SearchObject.PARAM.LIVE.query = SearchObject.data.query;
              SearchObject.PARAM.LIVE.pageNo = 1;
              SearchObject.PARAM.LIVE.sort = 'new';
              SearchObject.getSearchResultList(SearchObject.PARAM.LIVE);
            } else if (SearchObject.data.activeTab == SearchObject.CATEGORY.MOVIE) {
              SearchObject.PARAM.MOVIE.query = SearchObject.data.query;
              SearchObject.PARAM.MOVIE.pageNo = 1;
              SearchObject.PARAM.MOVIE.sort = 'new';
              SearchObject.getSearchResultList(SearchObject.PARAM.MOVIE);
            } else if (SearchObject.data.activeTab == SearchObject.CATEGORY.VOD) {
              SearchObject.PARAM.VOD.query = SearchObject.data.query;
              SearchObject.PARAM.VOD.pageNo = 1;
              SearchObject.PARAM.VOD.sort = 'new';
              SearchObject.getSearchResultList(SearchObject.PARAM.VOD);
            } else if (SearchObject.data.activeTab == SearchObject.CATEGORY.CLIP) {
              SearchObject.PARAM.CLIP.query = SearchObject.data.query;
              SearchObject.PARAM.CLIP.pageNo = 1;
              SearchObject.PARAM.CLIP.sort = 'new';
              SearchObject.getSearchResultList(SearchObject.PARAM.CLIP);
            } else if (SearchObject.data.activeTab == SearchObject.CATEGORY.PEOPLE) {
              SearchObject.PARAM.PEOPLE.query = SearchObject.data.query;
              SearchObject.PARAM.PEOPLE.pageNo = 1;
              SearchObject.PARAM.PEOPLE.sort = 'hit';
              SearchObject.getSearchResultList(SearchObject.PARAM.PEOPLE);
            }
          }
        });
      }
    },
    renderSearchResultSection : function(response) {
      var sectionHtml = '';
      $(response.category).each(function(index, data) {
        if (data.count != '0') {

          var moreHtml = '';
          if (data.count > SearchObject.PARAM.ALL.pageSize) {
            moreHtml += '  <div href="javascript:;" class="program_list_more" onclick="Search.clickSearchResultTab(\'' + data.code + '\');window.scrollTo(0, 0);">'
                      + '    <div>더보기<i class="ico_checked_more"></i></div>'
                      + '  </div>';
          }

          sectionHtml += '<div class="result_program_list_wrap" data-category-code="' + data.code + '">'
                      + '  <div class="result_program_list_top">'
                      + '    <div class="program_list_tit">' + data.title + ' <span class="number">(' + data.count + ')</span></div>'
                      + '  </div>'
                      + '  <div class="result_program_list">'
                      + '  </div>'
                      + moreHtml
                      + '</div>';
        }
      });

      SearchObject.data.$searchResultArea.find('div.searchResultBox').html(sectionHtml);
      SearchObject.data.$searchResultArea.find('div.result_program_list_wrap').each(function (index, data) {
        var categoryCode = $(this).data('categoryCode');
        if (categoryCode == SearchObject.CATEGORY.LIVE.code) {
          SearchObject.renderSearchResultSectionLive(response.results_tv, $(this).find('div.result_program_list'));
        } else if (categoryCode == SearchObject.CATEGORY.MOVIE.code) {
          SearchObject.renderSearchResultSectionMovie(response.results_mvod, $(this).find('div.result_program_list'));
        } else if (categoryCode == SearchObject.CATEGORY.VOD.code) {
          SearchObject.renderSearchResultSectionVod(response.results_bvod, $(this).find('div.result_program_list'));
        } else if (categoryCode == SearchObject.CATEGORY.CLIP.code) {
          SearchObject.renderSearchResultSectionClip(response.results_clip, $(this).find('div.result_program_list'));
        } else if (categoryCode == SearchObject.CATEGORY.PEOPLE.code) {
          SearchObject.renderSearchResultSectionPeople(response.results_people, $(this).find('div.result_program_list'));
        }
      });
    },
    renderSearchResultSectionChatChk: function (response) {
      $(response).each(function(index, data) {
        var chatList = [];
        var channelServiceId = data.channelId;

        $.ajax({
          async: false,
          url: '/api/chat/list',
          type: 'get',
          cache: false,
          success: function (response) {
            if (response.root.rooms.length > 0) {
              for(var i=0; i<response.root.rooms.length; i++){
                chatList.push(response.root.rooms[i].channel_service_id);
              }
              for(var i=0; i<chatList.length; i++){
                if(chatList[i] == channelServiceId){
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
    },
    renderSearchResultSectionLive : function(response, $renderArea) {
      var html = '';

      $(response).each(function(index, data) {
        var query = SearchObject.data.query;
        var channelServiceId = data.channelId;
        var title = (data.categoryNm == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : data.title;
        var channelName = data.channelNm;
        var iconSet = SearchObject.getPaidResolIcons(data);
        data.serviceId = data.channelId;
        //var link = OksusuCard.getLinkClickHandler(data);
        var link = '/v/' + channelServiceId;
        var matchTitle = title.split(query).join('<strong class="strong_blue">' + query + '</strong>');
        var adultHtml = (data.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
        var timeHtml = moment(data.startTime, 'YYYYMMDDHHmmss').format('ahh:mm') + ' ~ ' + moment(data.endTime, 'YYYYMMDDHHmmss').format('ahh:mm');
        var freeHtml = (data.pkgecd == '0' || data.pkgecd == '5') ? '<span class="ico_free">FREE</span>' : '';
        var chatHtml = (data.chat_flag == 'Y') ? '<span class="ico_chatting">채팅중</span>' : '';
        var currentTime = parseInt(moment().format('YYYYMMDDHHmmss'));
        var startTime = parseInt(data.startTime);
        var endTime = parseInt(data.endTime);
        var runningTime = endTime - startTime;
        var elapseTime = currentTime - startTime;
        var percent = Math.floor((elapseTime / runningTime) * 100);
        var progressHtml = '<div class="info-play-linear"><span style="width:' + percent + '%">재생진행률</span></div>';
        var liveImg;

        if (data.categoryNm == '에로스') {
          data.serviceId = data.channelId;
          liveImg = OksusuCard.getChannelLogoBGWhite(data);
        }else if (moment().isBetween(moment(data.startTime, "YYYYMMDDHHmmss"),  moment(data.endTime, "YYYYMMDDHHmmss"))) {
          // 00:default,1:JTBC아카이브,2:스트리밍
          if (data.channel_extr_cd === '1') {
            liveImg = data.igsImg;
          } else {
            liveImg = 'http://igs.oksusu.com:8080/thumbnails/nsigs/224_126/thumb_' + channelServiceId + '.jpg';
          }
        }else{
          liveImg = Oksusu.ImageUrlProp.Logo.white387 + data.chnImg;
        }

        html += '<li class="beforeDot">'
              + '  <a href="javascript:;" onclick=' + link +'>'
              + '        <div class="section_info">'
              + '            <div class="vlist_img">'
              + '                <img src="'+ liveImg +'" class="img_default" onerror="this.src=\'' + 'http://image.oksusu.com:8080/thumbnails/image/0_0_F20/live/logo/387/nsepg_'.replace('0_0', '224_126') + channelServiceId + '.png' + '\'">'
              + progressHtml
              + '                <div class="ico_right_box">'
              + freeHtml
              + chatHtml
              + '                </div>'
              + '            </div>'
              + '            <div class="vlist_text_box">'
              + '                <div class="text_title">'
              +                     adultHtml + matchTitle
              + '                </div>'
              + '                <div class="txt_log">' + channelName + iconSet + '</div>'
              + '                <div class="text_date">' + timeHtml + '</div>'
              + '            </div>'
              + '        </div>'
              + '    </a>'
              + '</li>'
      });

      var $html = $(html);

      $html.each(function(index, data) {
        var responseData = response[index];
        var responseCategoryNm = responseData.categoryNm;
        var responseTitle = (responseCategoryNm == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : responseData.title;

        $(this).find('img').attr('alt', responseData.title);
        $(this).find('a').click(function(e) {
          e.preventDefault();

          SearchObject.moveViewPage(responseData.channelId, '0', responseData.title, responseData.channelId, responseData.channelNm, responseData);
        }).attr('title', responseTitle);
      });

      if (SearchObject.data.activeTab == SearchObject.CATEGORY.ALL
          || (SearchObject.data.activeTab == SearchObject.CATEGORY.LIVE && SearchObject.PARAM.LIVE.pageNo == 1)) {

        $html = $html.wrapAll('<ul class="section_vlist sort line3">').parent();
        $html = $html.wrapAll('<div class="general_section_list">').parent();

        $renderArea.html($html);
      } else {
        $renderArea.find('ul').append($html);
      }

      $renderArea.find('ul').find('li.beforeDot').find('.text_title').dotdotdot({
        wrap: 'letter'
        , height: 36
      });

      $renderArea.find('ul').find('li').removeClass('beforeDot');
    },
    renderSearchResultSectionMovie : function(response, $renderArea) {
      var html = '';

      $(response).each(function(index, data) {
        var query = SearchObject.data.query;
        var contentsId = data.conId;
        var title = data.title;
        var categoryName = data.categoryNm;
        var link;
        var matchTitle;
        var ratingHtml = (data.grade == '0.0' || data.grade == '0') ? '평점을 남겨주세요.' : data.grade;
        var adultHtml = (data.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
        var iconSet = SearchObject.getPaidResolIcons(data);
        var guestHtml = (data.guest) ? '<div class="text_subtitle">출연 : ' + data.guest + '</div>' : '';
        var story = data.storyMid;
        var matchStory = story.split(query).join('<strong class="strong_blue">' + query + '</strong>');
        var movieImg = 'http://image.oksusu.com:8080/thumbnails/image/224_320' + data.img;
        var movieSummary;
        var checkException = function ( F ) {
          if ( data.categoryNm == '에로스' ) {
            if ( ! User.isLogin || ! User.isAdult || User.watchLevel != 'N' ) {
              F();
            }
          }
        };

        data.con_id = data.conId;
        //link = OksusuCard.getLinkClickHandler(data);
        link = '/v/' + contentsId;

        checkException( function () {
          title = '성인 전용';
          movieImg = '/public/assets/img/img_restricted03.png';
        } );

        matchTitle = title.split(query).join('<strong class="strong_blue">' + query + '</strong>');
        movieSummary = '<div class="summary_info"><span class="ico_grade">' + ratingHtml + '</span><div class="text_title">' + matchTitle + '</div><div class="text_summary">' + matchStory + '</div></div>';

        checkException( function () {
          movieSummary = '';
        } );

        html += '<li class="beforeDot">'
              + '  <a href="javascript:;" onclick=' + link +'>'
              + '        <div class="poster_info">'
              + '            <div class="vlist_img">'
              + '                <img src="' + movieImg + '" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">'
            + movieSummary
              + '            </div>'
              + '            <div class="vlist_text_box">'
              + '                <div class="text_title">'
              +                     adultHtml + matchTitle
              + '                </div>'
              + '                <div class="text_subtitle">'
              +                     categoryName + iconSet
              + '                </div>'
              +                  guestHtml
              + '            </div>'
              + '        </div>'
              + '    </a>'
              + '</li>';
      });

      var $html = $(html);

      $html.each(function(index, data) {
        var responseData = response[index];
        var responseCategoryNm = responseData.categoryNm;
        var responseTitle = (responseCategoryNm == '에로스' && (!User.isLogin || !User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : responseData.title;

        $(this).find('img').attr('alt', responseData.title);
        $(this).find('a').click(function(e) {
          e.preventDefault();

          SearchObject.moveViewPage(responseData.conId, '1', responseData.title, responseData.categoryCd, responseData.categoryNm, responseData);
        }).attr('title', responseTitle);
      });

      if (SearchObject.data.activeTab == SearchObject.CATEGORY.ALL
          || (SearchObject.data.activeTab == SearchObject.CATEGORY.MOVIE && SearchObject.PARAM.MOVIE.pageNo == 1)) {

        $html = $html.wrapAll('<ul class="poster_vlist sort movie">').parent();
        $html = $html.wrapAll('<div class="general_poster_list">').parent();

        $renderArea.html($html);
      } else {
        $renderArea.find('ul').append($($html));
      }

      $renderArea.find('ul').find('li.beforeDot').find('.summary_info').find('.text_title').dotdotdot({
        wrap: 'letter'
        , height: 55
      });

      $renderArea.find('ul').find('li.beforeDot').find('.summary_info').find('.text_summary').dotdotdot({
        wrap: 'letter'
        , height: 105
      });

      $renderArea.find('ul').find('li').removeClass('beforeDot');
    },
    renderSearchResultSectionVod : function(response, $renderArea) {
      var html = '';

      $(response).each(function(index, data) {
        var query = SearchObject.data.query;
        var contentsId = data.conId;
        var title = (data.categoryNm == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : data.title;
        var categoryName = data.categoryNm;
        data.con_id = data.conId;
        //var link = OksusuCard.getLinkClickHandler(data);
        var link = '/v/' + contentsId;
        var matchTitle = title.split(query).join('<strong class="strong_blue">' + query + '</strong>');
        var adultHtml = (data.level == '19') ? '<i class="rating_19">19세이상</i>' : '';
        var iconSet = SearchObject.getPaidResolIcons(data);
        var guestHtml = (data.guest) ? '<div class="text_subtitle">출연 : ' + data.guest + '</div>' : '';
        var story = data.storyMid;
        var matchStory = story.split(query).join('<strong class="strong_blue">' + query + '</strong>');
        var vodImg = (data.categoryNm == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '/public/assets/img/img_restricted03.png' : 'http://image.oksusu.com:8080/thumbnails/image/224_320' + data.img;
        var vodSummary = (data.categoryNm == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '' : '<div class="summary_info"><div class="text_title">' + matchTitle + '</div><div class="text_summary">' + matchStory + '</div></div>';

        html += '<li class="beforeDot">'
              + '  <a href="javascript:;" onclick=' + link +'>'
              + '        <div class="poster_info">'
              + '            <div class="vlist_img">'
              + '                <img src="' + vodImg + '" onerror="this.src=\'' + ReplaceImage.img_default_224x320 + '\'">'
            + vodSummary
              + '            </div>'
              + '            <div class="vlist_text_box">'
              + '                <div class="text_title">'
              +                     adultHtml + matchTitle
              + '                </div>'
              + '                <div class="text_subtitle">'
              +                    categoryName + iconSet
              + '                </div>'
              +                  guestHtml
              + '            </div>'
              + '        </div>'
              + '    </a>'
              + '</li>';
      });

      var $html = $(html);

      $html.each(function(index, data) {
        var responseData = response[index];
        var responseCategoryNm = responseData.categoryNm;
        var responseTitle = (responseCategoryNm == '에로스' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : responseData.title;

        $(this).find('img').attr('alt', responseData.title);
        $(this).find('a').click(function(e) {
          e.preventDefault();

          SearchObject.moveViewPage(responseData.conId, '2', responseData.title, responseData.categoryCd, responseData.categoryNm, responseData);
        }).attr('title', responseTitle);
      });

      if (SearchObject.data.activeTab == SearchObject.CATEGORY.ALL
          || (SearchObject.data.activeTab == SearchObject.CATEGORY.VOD && SearchObject.PARAM.VOD.pageNo == 1)) {

        $html = $html.wrapAll('<ul class="poster_vlist movie sort">').parent();
        $html = $html.wrapAll('<div class="general_poster_list">').parent();

        $renderArea.html($html);
      } else {
        $renderArea.find('ul').append($html);
      }

      $renderArea.find('ul').find('li.beforeDot').find('.summary_info').find('.text_title').dotdotdot({
        wrap: 'letter'
        , height: 55
      });

      $renderArea.find('ul').find('li.beforeDot').find('.summary_info').find('.text_summary').dotdotdot({
        wrap: 'letter'
        , height: 105
      });

      $renderArea.find('ul').find('li').removeClass('beforeDot');
    },
    renderSearchResultSectionClip : function(response, $renderArea) {
      var html = '';

      $(response).each(function(index, data) {
        var query = SearchObject.data.query;
        var clipId = data.clip_id;
        var title = data.clip_title;
        //var link = OksusuCard.getLinkClickHandler(data);
        var link = '/v/' + clipId;
        var matchTitle = title.split(query).join('<strong class="strong_blue">' + query + '</strong>');
        var programTitle = data.title;
        var image = '';
        var isLandscape = true;
        if (data.adlt_cd == '02' && (!User.isLogin || !User.isAdult || User.watchLevel != 'N')) {
          image = '/public/assets/img/img_restricted01.png';
          title = '성인 전용';
          matchTitle = '성인 전용';
        } else {
          if (data.poster2.indexOf('_320x180')  > -1) {
            image = 'http://image.oksusu.com:8080/thumbnails/image/224_126' + data.poster2.replace('_320x180', '');
          } else if (data.poster2.indexOf('_190x272')  > -1) {
            image = 'http://image.oksusu.com:8080/thumbnails/image/224_126' + data.poster2.replace('_190x272', '');
            isLandscape = false;
          }
        }

        var viewCount = comma(data.view_count);
        var dateHtml = (data.broad_date) ? '<span class="text_date">' + data.broad_date + '</span>' : '';
        var runtimeHtml = getRuntimeBySecond(data.runtime);
        var adultHtml = (data.adlt_cd == '01' || data.adlt_cd == '02') ? '<i class="rating_19">19세이상</i>' : '';

        if (isLandscape) {
          html += '<li class="beforeDot">'
              + '  <a href="javascript:;" onclick=' + link +'>'
              + '        <div class="section_info">'
              + '            <div class="vlist_img">'
              + '                <img src="' + image + '" onerror="this.src=\'' + ReplaceImage.img_default_224x126 + '\'">'
              + '                <i class="bg_line">이미지 그라데이션</i>'
              + '                <span class="vlist_time">' + runtimeHtml + '</span>'
              + '            </div>'
              + '            <div class="vlist_text_box">'
              + '                <div class="text_title">'
              + adultHtml + matchTitle
              + '                </div>'
              + '                <div class="text_subtitle text_blue">'
              + programTitle
              + '                </div>'
              + '                <div class="text_play_count">'
              + '                    <span class="ico_count">' + viewCount + '</span>'
              + dateHtml
              + '                </div>'
              + '            </div>'
              + '        </div>'
              + '    </a>'
              + '</li>';
        } else {
          html += '<li class="beforeDot type">'
              + '    <a href="' + link + '">'
              + '        <div class="section_info">'
              + '            <div class="vlist_img bg_black">'
              + '                <div class="vlist_bg type_v"></div>'
              + '                <img src="' + image + '" onerror="this.src=\'' + ReplaceImage.img_default_224x126 + '\'">'
              + '                <i class="bg_line">이미지 그라데이션</i>'
              + '                <span class="vlist_time">' + runtimeHtml + '</span>'
              + '            </div>'
              + '            <div class="vlist_text_box">'
              + '                <div class="text_title">'
              + adultHtml + matchTitle
              + '                </div>'
              + '                <div class="text_subtitle text_blue">'
              + programTitle
              + '                </div>'
              + '                <div class="text_play_count">'
              + '                    <span class="ico_count">' + viewCount + '</span>'
              + dateHtml
              + '                </div>'
              + '            </div>'
              + '        </div>'
              + '    </a>'
              + '</li>';
        }
      });

      var $html = $(html);

      $html.each(function(index, data) {
        var responseData = response[index];
        var responseCategoryNm = responseData.adlt_cd;
        var responseTitle = (responseCategoryNm == '02' && (! User.isLogin || ! User.isAdult || User.watchLevel != 'N')) ? '성인 전용' : responseData.clip_title;

        $(this).find('img').attr('alt', responseData.clip_title);
        $(this).find('a').click(function(e) {
          e.preventDefault();

          SearchObject.moveViewPage(responseData.clip_id, '3', responseData.clip_title, responseData.con_id, responseData.clip_title, responseData);
        }).attr('title', responseTitle);
      });

      if (SearchObject.data.activeTab == SearchObject.CATEGORY.ALL
          || (SearchObject.data.activeTab == SearchObject.CATEGORY.CLIP && SearchObject.PARAM.CLIP.pageNo == 1)) {

        $html = $html.wrapAll('<ul class="section_vlist sort line4">').parent();
        $html = $html.wrapAll('<div class="general_section_list">').parent();

        $renderArea.html($html);
      } else {
        $renderArea.find('ul').append($html);
      }

      $renderArea.find('ul').find('li.beforeDot').find('.text_title').dotdotdot({
        wrap: 'letter'
        , height: 36
      });

      $renderArea.find('ul').find('li').removeClass('beforeDot');
    },
    renderSearchResultSectionPeople : function(response, $renderArea) {
      var html = '';

      $(response).each(function(index, data) {
        if (SearchObject.data.activeTab == SearchObject.CATEGORY.ALL && index >= 8) {
          return false;
        }

        var skbCid = data.skbCid;
        var query = SearchObject.data.query;
        var name = data.nameKor;
        var photoImg = data.photoImg;
        var sportClass = '';
        if(photoImg.indexOf('sports') > -1){
          sportClass = 'sportImg';
        }
        var matchName = name.split(query).join('<strong>' + query + '</strong>');
        var birth = (data.birth) ? moment(data.birth, 'YYYY.MM.DD').format('YYYY년MM월DD일') : '';
        birth = (birth != 'Invalid date') ? birth : '';

        html += '<li>'
            + '  <a href="/search/people/'+ skbCid +'">'
            + '  <div class="photo_bg">'
            + '    <div class="img_photo ' + sportClass +'">'
            + '      <span>'
            + '        <img src="http://stimage.oksusu.com:8080/meta/' + data.photoImg + '" alt="" onerror="this.src=\'' + ReplaceImage.img_default + '\'">'
            + '      </span>'
            + '    </div>'
            + '  </div>'
            + '  <div class="photo_info">'
            + '      <div class="photo_info_inner">'
            + '          <div class="text_title">' + matchName
            + '          </div>'
            + '          <div class="text_subtitle">'
            + '              <p>'
            + data.occupation
            + '              </p>'
            + '              <p>'
            + birth
            + '              </p>'
            + '          </div>'
            + '      </div>'
            + '  </div>'
            + '  </a>'
            + '</li>';
      });

      var $html = $(html);

      if (SearchObject.data.activeTab == SearchObject.CATEGORY.ALL
          || (SearchObject.data.activeTab == SearchObject.CATEGORY.PEOPLE && SearchObject.PARAM.PEOPLE.pageNo == 1)) {

        $html = $html.wrapAll('<ul class="photo_list">').parent();
        $html = $html.wrapAll('<div class="general_photo_list">').parent();

        $renderArea.html($html);
      } else {
        $renderArea.find('ul').append($html);
      }
    },
    isContentsAdult : function(data) {
      if (!data || !data.level) {
        return false;
      }
      return (data.level >= 19 || data.categoryNm == '에로스' || data.adlt_cd == '01' || data.adlt_cd == '02') ? true : false;
    },
    getPaidResolIcons : function (data) {
      var icons = '';
      var padiIcon = '';
      var resolIcon = '';
      var html = '';
      if (!data) {
        return '';
      }

      if (data.pkgecd === "20" || data.price != '0') {
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

      icons = padiIcon + ' ' + resolIcon;

      if (icons !== '') {
        html = '<div class="ico_set">' + icons + '</div>';
      }

      return html;

    },
    moveViewPage : function(contentsId, type, title, menuCode, menuName, data) {
      var linkUrl = '/v/' + contentsId;

      if (!User.isLogin || (User.isMemberAuth && User.isAdult && User.watchLevel === 'N')) {
        SearchObject.insertLog(contentsId, type, title, menuCode, menuName);
        location.href = '/v/' + contentsId;
      }

      // 로그아웃 || 본인인증X
      if (!User.isMemberAuth) {
        if (SearchObject.isContentsAdult(data) && !User.isLogin) {
          move("/user/login?rw=" + location.pathname + location.search);
        } else if (SearchObject.isContentsAdult(data) && !User.isMemberAuth) {
          Popup.show('popupCheckAdult','list',linkUrl);
        } else if (!SearchObject.isContentsAdult(data) && data.level >= '15' && !User.isLogin) {
          move("/user/login?rw=" + location.pathname + location.search);
        } else {
          SearchObject.insertLog(contentsId, type, title, menuCode, menuName);
          location.href = linkUrl;
        }
      } else if (User.isAdult) {
        if (User.watchLevel != 'N' && data.level >= User.watchLevel) {
          Popup.show('popupRestrictView','list',linkUrl);
        } else {
          SearchObject.insertLog(contentsId, type, title, menuCode, menuName);
          location.href = linkUrl;
        }
      } else if (!User.isAdult) {
        if (SearchObject.isContentsAdult(data)) {
          Popup.show('popupCheckAdult','list',linkUrl);
        } else {
          // 성인 설정을 위해서는 성인인증이 필수이므로 case 없음
        }
      } else {
        SearchObject.insertLog(contentsId, type, title, menuCode, menuName);
        location.href = linkUrl;
      }
    },
    insertLog : function(contentsId, type, title, menuCode, menuName) {
      $.ajax({
        url: '/api/search/insert/log',
        type: 'post',
        data : {
          query : SearchObject.data.query,
          fromIF : 'IF-NSCSS-0005',
          contentsId : contentsId,
          type : type,
          title : title,
          menuCode : menuCode,
          menuName : menuName
        },
        cache: false,
        success: function (response) {
        },
        error: function (response) {
        }
      });
    }
  };

  return {
    CATEGORY : SearchObject.CATEGORY,
    init : SearchObject.init,
    clickSearchResultTab : SearchObject.clickSearchResultTab,
    clickSortBtn : SearchObject.clickSortBtn,
    clickClearKeyword : SearchObject.clickClearKeyword,
    getSearchResultList : SearchObject.getSearchResultList,
    moveViewPage : SearchObject.moveViewPage,
    deleteLsearchWrd : SearchObject.deleteLsearchWrd
  }
})();

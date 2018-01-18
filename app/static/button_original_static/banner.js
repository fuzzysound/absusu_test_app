(function()
{
  window.Oksusu = Oksusu || {};
  Oksusu.Banner = {
    TYPE :{
      HOME_CENTER : "HOME_CENTER",
      LIVE_CENTER : "LIVE_CENTER",
      VOD_CENTER : "VOD_CENTER",
      MOVIE_CENTER : "MOVIE_CENTER",
      CLIP_CENTER : "CLIP_CENTER",
      FREE_CENTER : "FREE_CENTER"
    },
    BANNER_SELECTOR : ".list_banner_slider",
    DATA_ATTRIBUTE_NAME_KEY : "key",
    URL : "/api/banner",
    TEMPLATE_STRING :
      "<ul>" +
      " <li>" +
      "   <a>" +
      "     <img/>" +
      "   </a>" +
      " </li>" +
      "</ul>",

    $banner : undefined,

    load : function(options)
    {
      options = options || {};
      if(!options.codes || !options.codes.length){
        console.warn("[BANNER]failed loading banner. Codes are required. codes:" + options.codes);
        return;
      }
      if(this.getBannerElement()) {
        this.loadBannerData(options.codes, this.renderBanner);
      }
    },
    getBannerElement:function()
    {
      this.$banner = $(this.BANNER_SELECTOR);
      if(!this.$banner.length){
        console.warn("[BANNER]failed loading banner. selector:" + this.BANNER_SELECTOR);
        this.$banner = undefined;
        return;
      }
      return this.$banner;
    },
    loadBannerData:function(codes, callback) {
      var url = this.URL;
      $.ajax({
        url: url,
        dataType: "json",
        data : { bannerCodes : codes },
        traditional : true
      }).done(function (res) {
        if(!res || res.constructor !== Object){
          console.warn("[BANNER]failed loading banner. The response was wrong. url:" + url);
          return;
        }
        callback.apply(Oksusu.Banner, [codes, res]);
      });
    },
    renderBanner:function(codes, bannerLists) {
      var templateString = this.TEMPLATE_STRING;
      var $banner = this.$banner;

      //배너 코드 반복
      codes.forEach(function(code){

        // 타겟 엘리먼트 지정
        var $target = $banner.filter("[data-key=" + code + "]");
        //추가될 배너 컨텐츠
        var $bannerContents = $(templateString);
        //각 줄에 대한 템플릿
        var $rowTemplate = $("li", $bannerContents);

        // 각 배너코드에 해당하는 데이터 반복
        bannerLists[code] && bannerLists[code].forEach(function(rowData) {
          $rowTemplate.clone()
              .find("a").prop("href", rowData.listImgLink).prop("target", rowData.listImgLinkTarget)
                .find("img").prop("src", rowData.listImgUrl).prop("alt", rowData.listImgTitle)
                .end()
              .end()
              .appendTo($bannerContents);
        });
        $rowTemplate.remove();

        //배너컨텐츠 추가
        $bannerContents.appendTo($target.empty());
      });
    }
  };
})();
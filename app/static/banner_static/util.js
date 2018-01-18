/**
 * get URL parameter's value
 * @param b
 * @returns {*}
 */
var getUrlParam = function (name, search) {
  search = search || location.search;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

/**
 * remove param
 * @param key
 * @param sourceURL
 * @returns {*|string|undefined}
 */
var removeParam = function (key, sourceURL) {
  sourceURL = (sourceURL) ? sourceURL : location.search;
  var rtn = sourceURL.split("?")[0],
      param,
      params_arr = [],
      queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
};

var CheckValid = {
  regex: {
    id: /^[a-z0-9_]{5,15}$/,
    password: /^[a-zA-Z0-9!#$%()*+-.;@\[\]\^_|~,\/:=?`]{6,20}$/,
    passwordMix: /(?=.*\d)(?=.*[a-zA-Z])/,
    lower: /[a-z]/,
    upper: /[A-Z]/,
    number: /\d/,
    email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/,
    mobileNo: /^01(?:0|1[6-9])(?:\d{3}|\d{4})\d{4}$/,
    nickName: /^[(가-힣a-zA-Z0-9)]{1,8}$/
  },
  id: function (id) {
    var self = CheckValid;

    return self.regex.id.test(id) &&
        (self.regex.lower.test(id) || self.regex.number.test(id));
  },
  password: function (password) {
    var self = CheckValid;

    return self.regex.password.test(password);
  },
  passwordMix: function (password) {
    var self = CheckValid;

    return self.regex.passwordMix.test(password);
  },
  email: function (email) {
    var self = CheckValid;

    return self.regex.email.test(email);
  },
  mobileNo: function (mobileNo) {
    var self = CheckValid;

    return self.regex.mobileNo.test(mobileNo);
  },
  nickName: function (nickName) {
    var self = CheckValid;

    return self.regex.nickName.test(nickName);
  }
};

var GetDate = {
  hours: function (hour) {
    var date = new Date();
    var hours = hour;
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
  },
  minutes: function (min) {
    var date = new Date();
    var minutes = min;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    return date;
  },
  seconds: function (sec) {
    var date = new Date();
    var seconds = sec;
    date.setTime(date.getTime() + (seconds * 1000));
    return date;
  }
};

var replaceErrorImage = function (image, type) {
  image.onerror = "";

  if (type === 'thumb') {
    image.src = ReplaceImage.img_default_144x82;
  } else if (type === 'live' || type === 'clip') {
    image.src = ReplaceImage.img_default_224x126;
  } else if (type === 'vod') {
    image.src = ReplaceImage.img_default_224x320;
  } else if (type === 'grid') {
    image.src = ReplaceImage.img_default_387x217;
  } else {
    image.src = ReplaceImage.img_default;
  }
  return true;
};

var comma = function (text) {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var getUUID = function () {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var scroll_lock = function () {
  $("body").on('touchmove', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
  $(".layerpop").off('scroll touchmove mousewheel');
};
//scroll 해제
var scroll_active = function () {
  $("body").off('scroll touchmove mousewheel');
};

var stripTags = function (text) {
  if (text) {
    return text.replace(/(<([^>]+)>)/ig, "");
  } else {
    return text;
  }
};

var htmlEntities = function (str) {
  if (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, "<br>");
  } else {
    return str;
  }
};

var getBrowserInfo = function () {
  var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {name: 'IE', version: (tem[1] || '')};
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return {name: 'Opera', version: tem[1]};
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if (M[1] && M[1].split(' ').length > 1) {
    M[1] = M[1].split(' ')[0];
  }
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
};

var mobilePopup;
var ipinPopup;

var closeCertPopup = function () {
  if (mobilePopup && !mobilePopup.closed) {
    mobilePopup.close();
  }

  if (ipinPopup && !ipinPopup.closed) {
    ipinPopup.close();
  }
};

/**
 * @comment date 날짜(day) 조회 ddiff
 * @param dt:날짜(yyyymmdd),len:길이,tp:타입(m:월)
 *
 * @example default : common.getdate.ddiff('20170101',-12|12,'m')
 * @author ungsik.J
 * @date 2017.06.01
 */
var common = {};// 초기화
common.getdate = {
  ddiff: function (dt, len, tp) {/* 날짜diff */
    try {
      var obj = (typeof dt === 'undefined') ? this.defaultDate() : dt.toString();
      var diff = 0;
      var rtn;
      if (typeof len === 'undefined') {
        diff = 0;
      } else if ((len < -29999 || len > 29999)) {
        alert('common.getdate.ddiff length Error');
        diff = 0;
      } else {
        diff = len;
      }
      obj = this.vaildate(obj).replace(/-/gi, '');
      var yy = parseInt(obj.substr(0, 4), 10);
      var mm = parseInt(obj.substr(4, 2), 10);
      var dd = parseInt(obj.substr(6), 10);
      if (tp === 'y') {
        d = new Date(yy + diff, mm - 1, dd);
      } else if (tp === 'm') {
        d = new Date(yy, (mm - 1) + diff, dd);
      } else {
        d = new Date(yy, mm - 1, dd + diff);
      }
      yy = d.getFullYear();
      mm = d.getMonth() + 1;
      mm = (mm.toString().length === 1) ? '0' + mm : mm;
      dd = d.getDate();
      dd = (dd.toString().length === 1) ? '0' + dd : dd;

      if (tp == 'y') {
        rtn = yy.toString()
      } else if (tp == 'm') {
        rtn = yy.toString() + '-' + mm.toString()
      } else {
        rtn = yy.toString() + '-' + mm.toString() + '-' + dd.toString()
      }
      return yy.toString() + "-" + mm.toString() + "-" + dd.toString();
    } catch (e) {
      console.log("common.getdate.ddiff Exception! " + e.message);
    }
  },
  defaultDate: function () { /* 오늘 날짜 */
    try {
      var dt = new Date();
      var y = dt.getFullYear();
      var m = dt.getMonth() + 1;
      var d = dt.getDate();
      m = (m.toString().length === 1) ? '0' + m : m;
      d = (d.toString().length === 1) ? '0' + d : d;
      return String(y) + String(m) + String(d);
    } catch (e) {
      console.log("common.getdate.defaultDate Exception! " + e.message);
    }
  },
  vaildate: function (obj) { /* 날짜 유효성 검사 */
    try {
      var pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
      obj = obj.toString().replace(/[~!@\#$%<>^&*\()\-=+_\'\"\,\.\:]/gi, '');
      return (!pattern.test(obj)) ? obj : this.defaultDate();
    } catch (e) {
      console.log("common.getdate.vaildate Exception! " + e.message);
    }
  },
  toDay: function (obj, len) {/* 날짜요일 리턴 */
    var dt = this.ddiff(obj, len);
    var yy = parseInt(dt.substr(0, 4), 10);
    var mm = parseInt(dt.substr(4, 2), 10);
    var dd = parseInt(dt.substr(6), 10);
    var d = new Date(yy, mm - 1, dd);
    var weekday = ['일', '월', '화', '수', '목', '금', '토'];
    return dt + weekday[d.getDay()];
  },
  selectdate: function (FORM, year, month, day) {
    var current, year, month, day, days, i, j;
    try {
      current = new Date();
      year = (year) ? year : current.getFullYear();
//            for (i = 0, j = year - 3; i < 5; i++, j++) {
//                FORM.year.options[i] = new Option(j, j);
//            }
      /** yyyy +-2 */
      for (i = 0, j = year - 1; i < 3; i++, j++) {
        if (parseInt(year, 10) <= 2015 || parseInt(year, 10) >= 2019) {
          return;
        } else {
          FORM.year.options[i] = new Option(j, j);
        }
      }

      month = (month) ? month : current.getMonth() + 1;
      for (i = 0; i < 12; i++) {
        j = (i < 9) ? '0' + (i + 1) : i + 1;
        FORM.month.options[i] = new Option(j, j);
      }
      day = (day) ? day : current.getDate();
      days = new Date(new Date(year, month, 1) - 86400000).getDate();
      FORM.day.length = 0;
      for (i = 0, j; i < days; i++) {
        j = (i < 9) ? '0' + (i + 1) : i + 1;
        FORM.day.options[i] = new Option(j, j);
      }
      FORM.year.value = year;
      FORM.month.options[month - 1].selected = true;
      FORM.day.options[day - 1].selected = true;
    } catch (e) {
      console.log("common.getdate.selectdate Exception! " + e.message);
    }
  },
  /** selectbox date 2017.09.09 */
  selectdate_jqUI : function (FORM, year, month, day) {
    var current, year, month, day, days, i, j;
    try {
      current = new Date();
      year = (year) ? year : current.getFullYear();
//            for (i = 0, j = year - 3; i < 5; i++, j++) {
//                FORM.year.options[i] = new Option(j, j);
//            }
      /** yyyy +-2 */
      for (i = 0, j = year - 1; i < 3; i++, j++) {
        if (parseInt(year, 10) <= 2015 || parseInt(year, 10) >= 2019) {
          return;
        } else {
          FORM.year.options[i] = new Option(j, j);
        }
      }

      month = (month) ? month : current.getMonth() + 1;
      for (i = 0; i < 12; i++) {
        j = (i < 9) ? '0' + (i + 1) : i + 1;
        FORM.month.options[i] = new Option(j, j);
      }
      day = (day) ? day : current.getDate();
      days = new Date(new Date(year, month, 1) - 86400000).getDate();
      FORM.day.length = 0;
      for (i = 0, j; i < days; i++) {
        j = (i < 9) ? '0' + (i + 1) : i + 1;
        FORM.day.options[i] = new Option(j, j);
      }
      FORM.year.value = year;
      FORM.month.options[month - 1].selected = true;
      FORM.day.options[day - 1].selected = true;
    } catch (e) {
      console.log("common.getdate.selectdate Exception! " + e.message);
    }
  },
  selectedFullYear: function () {
    var r = [];
    var h, i, j;
    var fullyear = new Date();
    var year = fullyear.getFullYear();
    for (i = 0, j = year - 1; i < 3; i++, j++) {
      h = "";
      h += "<option value=\"" + j + "\">" + j + "년</option>";
      r[i] = h;

    }
    return r.reverse();
  },
  getday: function (arg) {
    var weekName = ['일', '월', '화', '수', '목', '금', '토'];
    var year = arg.substring(0, 4);
    var month = arg.substring(4, 6);
    var day = arg.substring(6, 8);
    var week = new Date(year, month - 1, day, 0, 0, 0, 0);               //month는 0~11까지임
    week = weekName[week.getDay()];
    return arg + week;
  },
  getWeekday: function (arg) {
    var weekName = ['일', '월', '화', '수', '목', '금', '토'];
    var year = arg.substring(0, 4);
    var month = arg.substring(4, 6);
    var day = arg.substring(6, 8);
    var week = new Date(year, month - 1, day, 0, 0, 0, 0);               //month는 0~11까지임
    week = weekName[week.getDay()];
    arg = common.mask.getdatefmt(arg.substr(4, 4), 'mddot') + "(" + week + ")";
    return arg;
  }
};
common.mask = {
  gettimeConvert: function (obj) {
    var rtn = "";
    if (obj != null && typeof obj != 'undefined') {
      var time = obj.substr(0, 2) + ":" + obj.substr(2);
      var getTime = time.substring(0, 2);
      var intTime = parseInt(getTime);
      var str = (intTime < 12) ? '오전 ' : '오후 ';
      var cvHour = (intTime == 12) ? intTime : intTime % 12;
      rtn = str + parseInt(('0' + cvHour).slice(-2)) + time.slice(-3); // return
    }
    return rtn;
  },
  gettimeConvert_P: function (obj) {
    var arr = [];
    var q = obj, r = 0;
    for (var i = 0; i < 2; i++) {
      r = q % 60;
      q = Math.floor(q / 60);
      arr.unshift(r);
      if (i == 1) arr.unshift(q);
    }
    return arr.map(function (n) {
      return (n < 10) ? '0' + n : n;
    }).join(':');
  },
  isempty: function (obj) {
    return (typeof obj == 'undefined' || obj == null || obj == 'null') ? '' : obj;
  },
  isemptyInit: function (obj) {
    return (typeof obj == 'undefined' || obj == null || obj == 'null') ? 0 : parseInt(obj, 10)
  },
  isemptyScore: function (obj) {
    return (typeof obj == 'undefined' || obj == null || obj == 'null') ? '미정' : obj;
  },
  getdatefmt: function (obj, t) {
    var rtn;
    try {
      if (t == 'ymddot') {
        var data = obj || '00000000';
        rtn = data.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
      } else if (t == 'time') {
        rtn = obj.replace(/(\d{2})(\d{2})/, '$1:$2');
      } else if (t == 'default') {
        rtn = obj.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      } else if (t == 'mddot') {
        rtn = obj.replace(/(\d{2})(\d{2})/, '$1.$2');
      } else if (t == 'comma') {
        rtn = obj.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    } catch (e) {
    }
    return rtn;
  },
  isMenuInit: function (argm, args) {
    var rtn = 0;
    var mid = argm || 0;
    var sid = args || 0;
    rtn = (sid != 0) ? sid : mid;
    return rtn;
  },
  getWeekNo: function (arg) {
    /*해당 월주차*/
    var param = (typeof arg != 'undefined') ? this.getdatefmt(arg, 'default') : this.getdatefmt(common.getdate.defaultDate(), 'default');
    var date = new Date(param);
    return Math.ceil(date.getDate() / 7)+1;
  }
};

function log(message) {

  // console.log(message);
}

var fn_vlink = function (arg) {

  window.location.href = '/v/' + arg || '';
  // var arg = '/v/'+arg||'';
  // var http = new XMLHttpRequest();
  // http.open('HEAD', arg, false);
  // http.send();
  // if(http.status === 200){
  //     window.location.href = arg;
  // }else if(http.status === 500){
  //     alert('서버 통신오류 입니다.');
  // }else{
  //     alert('잘못된 vod정보 입니다.\nService IF : ' + arg.split(",")[1] +'\nvodId : ' + arg.split(",")[0]);
  // }
  // return;
};

var fn_cardtypeNulltoZero = function () {
  //catdtype vod null to zero
  $.each($('span.ico_count', '[id*=CardNum]'), function () {
    if ($(this).text() == 'null') {
      $(this).text('0')
    }
  });
  $.each($('span.ico_name', '[id*=CardNum]'), function () {
    if ($(this).text() == '') {
      $(this).hide();
    }
  })
};

/**
 * 3자리마다 콤마를 추가한다.
 * @returns {string}
 */
function commaNum(num){
  return num === undefined || num === null || num === '' ? '' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * left,right pad
 * @param t L|R
 * @param s string
 * @param padLength
 * @param padString
 * @return {*}
 */
var fn_pad = function (t, s, padLength, padString) {
  if (t == 'L') {
    while (s.length < padLength)
      s = padString + s;
    return s
  } else if (t == 'R') {
    while (s.length < padLength)
      s += padString;
    return s
  }
};

/**
 * 전화번호 하이픈 처리
 * @param 전화번호 하이픈 처리
 */
var phoneFormatter = function (num, type) {
  var formatNum = '';
  if (num.length == 11) {
    if (type == 0) {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
    } else {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
  } else if (num.length == 8) {
    formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else {
    if (num.indexOf('02') == 0) {
      if (type == 0) {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
      } else {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      }
    } else {
      if (type == 0) {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    }
  }
  return formatNum;
};

/**
 * 년월일 한글 처리
 * @param xxxx년xx월xx일
 */
var dateFormatter = function (str) {
  var dateStr = "";
  dateStr = str.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일');
  return dateStr;
};


/**
 * 기본 레이어 팝업
 * @param msg
 */
var CommonPopup = {
  open: function (msg) {
    $('#commonPopup .one_txt').html(msg);
    $('#commonPopup').show(); 
    $('.pop_dimmed').show();

    $('#commonPopup .btn_default').off({click: CommonPopup.clickOk});
    $('#commonPopup .btn_default').on({click: CommonPopup.clickOk});

    $('#commonPopup .popup_btn_close').off({click: CommonPopup.clickClose});
    $('#commonPopup .popup_btn_close').on({click: CommonPopup.clickClose});
  },
  clickOk: function () {
    $('#commonPopup').hide();
    $('.pop_dimmed').hide();
  },
  clickClose: function () {
    $('#commonPopup').hide();
    $('.pop_dimmed').hide();
  }
};

/**
 * 헤더가 있는 기본 레이어 팝업
 * @param header
 * @param msg
 */
var CommonPopupWithHeader = {
  okurlin : "",  //url

  open: function (header, msg, okurl) {
      okurlin = okurl;

    $('#commonPopupWithHeader .header').text(header);
    $('#commonPopupWithHeader .one_txt').html(msg);
    $('#commonPopupWithHeader').show();
    $('.pop_dimmed').show();

    $('#commonPopupWithHeader .accept').off({click: CommonPopupWithHeader.clickOk});
    $('#commonPopupWithHeader .accept').on({click: CommonPopupWithHeader.clickOk});

    $('#commonPopupWithHeader .popup_btn_close').off({click: CommonPopupWithHeader.clickClose});
    $('#commonPopupWithHeader .popup_btn_close').on({click: CommonPopupWithHeader.clickClose});

  },
  clickOk: function () {
    $('#commonPopupWithHeader').hide();
    $('.pop_dimmed').hide();

        switch (okurlin){
            case '',' ', null:
                break;
            default :
                var url = okurlin;
                $(location).attr('href', url);
        }
  },

  clickClose: function () {
    $('#commonPopupWithHeader').hide();
    $('.pop_dimmed').hide();
   }



};

/**
 * 4자리 숫자 비밀번호 체크
 * @param true, flase
 */
var number4PwCheckValid = {
  regex: {
    password: /^[0-9]{4}$/
  },
  password: function (password) {
    var self = number4PwCheckValid;
    return self.regex.password.test(password);
  }
};

var hideElement = function (elementId) {
  $('#' + elementId).hide();
  return false;
};

var showElement = function (elementId) {
  $('#' + elementId).show();
  return false;
};

var reloadPage = function () {
  location.reload(true);
  return false;
};

var purchasePopup;
var closePurchasePopup = function () {
  if (purchasePopup && !purchasePopup.closed) {
    purchasePopup.close();
  }
};

/**
 * window.console.log|info|error|debugger|clear
 * @param t 0:log,1:info,2:error,8:debugger,9:clear
 * @param arg
 */
var clog = function (t, arg) {
  switch (t) {
    case 0:
      return window.console.log(arg);
      break;
    case 1:
      return window.console.info(arg);
      break;
    case 2:
      return window.console.error(arg);
      break;
    case 8:
      debugger;
    case 9:
      return window.console.clear();
  }
};

var getRuntimeBySecond = function(second) {
  if (!second) {
    return '00:00';
  }

  var sec_num = parseInt(second, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (hours <= 0) {
    return minutes + ':' + seconds;
  } else {
    if (hours < 10) {
      hours = "0" + hours;
    }
    return hours + ':' + minutes + ':' + seconds;
  }
};

/**
 * @param minute
 * @returns 'hh:mm'
 */
var getPlaytimeByMinute = function(minute) {
  if (!minute) {
    return '00:00';
  }

  var min_num = parseInt(minute, 10);
  min_num = min_num < 0 ? 0 : min_num;

  var hours = Math.floor(min_num / 60);
  var minutes = Math.floor(min_num % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }
  return hours + ':' + minutes;
};

var numberToAbbreviation = function(number){
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

var dotdotdotForMovie = function() {
  $('.general_section_list .section_vlist movie.movie .summary_info .text_title, .general_section_list .section_vlist.movie .summary_info .text_summary').dotdotdot({
    wrap: 'letter'
    , height: 59
  });

  $('.general_poster_list .poster_vlist.movie .summary_info .text_title').dotdotdot({
    wrap: 'letter'
    , height: 55
  });

  $('.general_poster_list .poster_vlist.movie .summary_info .text_summary').dotdotdot({
    wrap: 'letter'
    , height: 105
  });
}
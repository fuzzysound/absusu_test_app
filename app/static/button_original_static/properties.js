var Oksusu = Oksusu || {};

moment.locale('ko');

Oksusu.ContentProp = {
  channelProd: {
    free: '0',        // 무료
    loginFree: '5',   // 로그인 무료
    basicFree: '20',  // 기본월정액 무료
    paid: '99'        // 전체유료
  },
  genreCd: {
    eros: '260',       // Eros
    music: '800',
    jtbc: '270',
    enm: '230',
    news: '110',
    entertainment: '160',
    sports: '190',
    life: '170',
    kids: '130',
    shopping: '210'
  },
  likingId : {
    sports : "JR007"
  },
  is_live: 'Y',
  chatYn: 'Y',
  adlt_cd: {
    adult: '01',
    eros: '02'
  },
  PurchaseApp: {
    STB: 0,
    mobileTV: 2
  },
  Group: {
    IPTV: 'IPTV',
    VOD: 'VOD'
  },
  Section: {
    movie: 'WG002',
    broad: 'WG003'
  },
  channelExtrCd: {
    JTBC: '1',
    Streaming: '2'
  },
  YES: 'Y',
  NO: 'N',
  OK: 'OK'
};

Oksusu.UserProp = {
  LoginType: {
    ID_PASSWORD: '1', // 일반
    SOCIAL: '3',      // 소셜
    FACEBOOK: 'fb',   // 페이스북
    KAKAO: 'kakao'    // 카카오
  },
  ageGrade: null
};

Oksusu.ImageUrlProp = {
  NSIGS: {
    production: 'http://igs.oksusu.com:8080',
    develop: 'http://igsdev.oksusu.com:8080'
  },
  IMAGE: {
    production1: 'http://image.oksusu.com:8080',
    production2: 'http://nsimage.oksusu.com:8080',
    develop: 'http://imagedev.oksusu.com:8080'
  },
  STIMAGE: {
    production: 'http://stimage.oksusu.com:8080',
    develop: 'http://stimagedev.oksusu.com:8080'
  },
  Logo: {
    black387: 'http://image.oksusu.com:8080/thumbnails/image/0_0/live/logo/387/',
    white387: 'http://image.oksusu.com:8080/thumbnails/image/0_0_F20/live/logo/387/'
  }
};

Oksusu.MenuProp = {
  MenuCd: {
    137800: 'live',
    138100: 'movie',
    138200: 'vod',
    138300: 'clip',
    140400: 'free',
    137900: 'sports',
    138500: 'sktMembers',
    155500: 'bandPlayPack'
  },
  Section_order: {
    '2': 'clip',
    '4': 'live',
    '6': 'movie',
    '7': 'vod'
  },
  MenuId: {
    '9000000232': '',
    '9000001345': 'free',
    '9000000270': 'vod',
    '9000000269': 'movie',
    '9000000239': 'sports',
    '9000000271': 'clip',
    '9000000400': 'adaptable',
    '9000000396': 'special/sktmember',
    '9000002081': 'news', //뉴스
    '9000002489': 'special/bandplay',
    '9000000238': 'live'
  },
  LiveTabMenuId: {
    'TOP 30': '9000000273',
    '전체': '9000000399',
    '종편/뉴스': '9000000884',
    'CJ': '9000000883',
    'ch.JTBC': '9000001884',
    '연예/오락': '9000000885',
    '스포츠': '9000000886',
    '라이프': '9000000887',
    '키즈/애니': '9000000888',
    '홈쇼핑': '9000000889',
    '성인': '9000000890',
    '음악': '9000000891',
  },
  ClipTabMenuId: {
    '테마': '9000000291'
  }

};

Oksusu.CardProp = {
  CardType: {
    R000000001: '1',
    R000000002: '2',
    R000000003: '3',
    R000000004: '4',
    R000000005: '1_1',
    R000000006: '3_1',
    M000000001: '5',
    M000000002: '6',
    M000000003: '7',
    M000000004: '8',
    M000000005: '9',
    M000000006: '10',
    M000000007: '11',
    M000000008: '5_1',
    M000000009: '7_1',
    M000000010: '7_2',
    M000000011: '7_3',
    B000000001: '12',
    B000000002: '13',
    B000000003: '14',
    B000000004: '15',
    B000000005: '16',
    B000000006: '17',
    B000000007: '18',
    B000000008: '19',
    B000000009: '12_1',
    B000000010: '14_1',
    B000000012: '14_2',
    B000000013: '14_3',
    C000000001: '20',
    C000000002: '21',
    C000000003: '20_1', /*OKQ-3155 해당 영역의 카드 타입이 [20-1]클립 카드로 노출 되어야 함. */
    C000000004: '23',
    C000000005: '20_1', /*OKQ-3150 해당 영역의 카드 타입이 [20-1]클립 카드로 노출 되어야 함. */
    C000000006: '20_1',
    C000000007: '20_1', /*OKQ-3160 해당 영역의 카드 타입이 [20-1]클립 카드로 노출 되어야 함. */
    C000000008: '24', /* 2017.08.25 IF-NSMXPG-002 카드타입 추가 cardNum : 24 / cardTypCd : C000000008 --ungsik.J */
    C000000009: '',
    O000000001: '25',
    O000000002: '26',
    O000000003: '27',
    O000000004: '28',
    B000000011: '29',
    I000000001: '30',
    L000000001: '31',
    L000000002: '32',
    L000000003: '33',
    L000000004: '34',
    L000000005: '35',
    L000000006: '36'
  },
  SlideWidth: {
    three: 387,
    five: 224,
  },
  SlideMargin: {
    three: 20,
    five: 20
  },
};

Oksusu.StringProp = {
  adultOnly: '성인전용'
};

Oksusu.PlayerProp = {
  url: '/v/'
};

ReplaceImage = {
  img_default_144x82: '/public/assets/img/img_default_144x82.png',
  img_default_224x126: '/public/assets/img/img_default_224x126.png',
  img_default_224x320: '/public/assets/img/img_default_224x320.png',
  img_default_387x217: '/public/assets/img/img_default_387x217.png',
  img_default: '/public/assets/img/img_default.png'
};
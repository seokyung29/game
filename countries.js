/* 
  전 세계 출생아 및 인구 통계 기반 가중치 데이터 + 유쾌한 밈/컨셉 텍스트
  출생 가중치(birthWeight): 연간 약 1억 3천만 신생아 출생 비율 반영
*/
const COUNTRIES_DATA = [
  // --- 최다 확률 군단 (빅 2) ---
  {
    name: "인도",
    code: "IN",
    flag: "🇮🇳",
    birthWeight: 17.5, // 연간 출생아 약 2,300만명 (세계 약 17.5%)
    rarity: "흔함 (Very Common)",
    rarityClass: "common",
    quote: "“와 나는 다시 태어나면 인도인이네 ㅋㅋ 나마스테!”",
    job: "실리콘밸리를 주름잡을 IT 개발자 or 발리우드 댄서",
    skill: "손기술 & 수학 암산 & 어디서든 춤출 수 있는 흥",
    climate: "화끈하게 더운 여름 & 역동적인 몬순 우기",
    commentary: "전 세계 1위 인구 대국 당첨! 어딜 가나 사람이 북적북적해서 외로울 틈이 없습니다. 카레 맛집은 보장!"
  },
  {
    name: "중국",
    code: "CN",
    flag: "🇨🇳",
    birthWeight: 7.5,
    rarity: "흔함 (Very Common)",
    rarityClass: "common",
    quote: "“니하오! 엄청난 대륙 스케일의 삶이 시작된다!”",
    job: "이커머스 라이브커머스 거상 or 훠궈 마스터",
    skill: "모바일 QR 결제 초스피드 터치 & 대륙의 담력",
    climate: "하얼빈의 혹한부터 하이난의 열대까지 다양",
    commentary: "스케일부터 남다른 대륙 환생! 아침 식사로 따끈한 요우티아오와 또우장을 매일 먹게 됩니다."
  },
  {
    name: "나이지리아",
    code: "NG",
    flag: "🇳🇬",
    birthWeight: 5.8, // 아프리카 최대 출생국
    rarity: "흔함 (Common)",
    rarityClass: "common",
    quote: "“아프리카 최대 경제 대국의 에너지를 받아라! 와칸다 포에버? 노, 여긴 나이지리아!”",
    job: "아프로비츠 팝스타 or 놀리우드 영화 프로듀서",
    skill: "폭풍 그루브 & 긍정적인 파이팅",
    climate: "연중 따뜻하고 후끈한 열대 기후",
    commentary: "인구 증가율 전 세계 최상위권! 엄청난 청년층 에너지와 비트 감각을 물려받게 됩니다."
  },
  {
    name: "파키스탄",
    code: "PK",
    flag: "🇵🇰",
    birthWeight: 4.8,
    rarity: "흔함 (Common)",
    rarityClass: "common",
    quote: "“크리켓 방망이 하나면 온 동네 골목대장 가능!”",
    job: "국가대표 크리켓 스타 or 밀크티(차이) 장인",
    skill: "진한 차이 티 끓이기 & 히말라야 뷰 감상",
    climate: "북부 설산과 남부 건조 사막의 조화",
    commentary: "차이(Chai) 한 잔 마시며 크리켓 중계를 보며 하루를 마무리하는 열정적인 삶!"
  },
  {
    name: "인도네시아",
    code: "ID",
    flag: "🇮🇩",
    birthWeight: 3.3,
    rarity: "보통 (Uncommon)",
    rarityClass: "uncommon",
    quote: "“1만 7천 개 섬 중 한 곳에서 태어났습니다. 발리가 내 앞마당?!”",
    job: "발리 서핑 인스트럭터 or 나시고랭 셰프",
    skill: "스쿠터 운전 마스터 & 여유로운 미소",
    climate: "사시사철 반팔 반바지 열대 낙원",
    commentary: "삼시세끼 미고랭과 나시고랭을 즐기며 평화롭게 스쿠터를 타는 라이프스타일!"
  },
  {
    name: "미국",
    code: "US",
    flag: "🇺🇸",
    birthWeight: 2.7,
    rarity: "레어 (Rare)",
    rarityClass: "rare",
    quote: "“오 마이 갓! 아메리칸 드림 티켓 당첨! 팁 문화 적응 준비 완료!”",
    job: "스타트업 창업자 or 넷플릭스 중독 인플루언서",
    skill: "어깨 으쓱하기(Shrug) & 파티용 스몰톡",
    climate: "캘리포니아 햇살부터 알래스카 눈보라까지 취향 선택",
    commentary: "축하합니다! 천조국의 시민권 획득. 거대한 피자와 햄버거, 팁 계산기 어플이 기본 지급됩니다."
  },
  {
    name: "브라질",
    code: "BR",
    flag: "🇧🇷",
    birthWeight: 2.1,
    rarity: "레어 (Rare)",
    rarityClass: "rare",
    quote: "“삼바 리듬이 내 핏속에 흐른다! 쌈바 삼바 삼바!”",
    job: "차세대 축구 판타지스타 or 카니발 삼바 킹/퀸",
    skill: "선천적 발재간 & 무한 긍정 친화력",
    climate: "아마존의 열정과 코파카바나 해변의 태양",
    commentary: "걸을 때도 스텝을 밟게 된다는 남미의 열정국가! 축구공 하나만 주면 세상을 다 가진 기분."
  },
  {
    name: "에티오피아",
    code: "ET",
    flag: "🇪🇹",
    birthWeight: 3.0,
    rarity: "보통 (Uncommon)",
    rarityClass: "uncommon",
    quote: "“커피의 고향에서 태어났으니 매일 아침 커피 세리머니!”",
    job: "마라톤 메달리스트 or 스페셜티 커피 바리스타",
    skill: "지치지 않는 심폐지구력 & 고유 문자 쓰기",
    climate: "고원 지대의 쾌적하고 선선한 봄 날씨",
    commentary: "인류의 기원이자 커피의 본고장! 마라톤 풀코스도 조깅처럼 달릴 수 있는 신체 스펙."
  },
  {
    name: "멕시코",
    code: "MX",
    flag: "🇲🇽",
    birthWeight: 1.4,
    rarity: "레어 (Rare)",
    rarityClass: "rare",
    quote: "“올라! 인생 뭐 있어? 타코에 살사 소스 듬뿍 뿌려 먹는 거지!”",
    job: "루차 리브레 복면 레슬러 or 타코 트럭 대박 사장님",
    skill: "매운맛 내성 100단 & 흥겨운 마리아치 노래",
    climate: "햇살 가득한 사막과 카리브해의 에메랄드 바다",
    commentary: "매일매일이 축제인 나라. 아보카도와 라임이 냉장고에 떨어질 날이 없습니다."
  },
  {
    name: "일본",
    code: "JP",
    flag: "🇯🇵",
    birthWeight: 0.55,
    rarity: "초희귀 (Epic)",
    rarityClass: "epic",
    quote: "“스미마센... 애니메이션 속 주인공 학교로 등교합니다.”",
    job: "만화가 어시스턴트 or 편의점 신상 디저트 감별사",
    skill: "정중한 90도 인사 & 자판기 위치 본능적 탐색",
    climate: "봄의 벚꽃, 가을의 단풍, 겨울의 온천",
    commentary: "이웃나라 환생 성공! 편의점 털기와 철도 여행, 온천욕으로 소소하지만 확실한 행복을 누립니다."
  },
  {
    name: "대한민국",
    code: "KR",
    flag: "🇰🇷",
    birthWeight: 0.18, // 전 세계 출생아 1억 3천만 중 약 23만명 -> 약 0.18%
    rarity: "초희귀 (Epic)",
    rarityClass: "epic",
    quote: "“익숙한 이 맛은... 배달의 민족?! 또 한국인으로 환생해버렸다!”",
    job: "K-POP 연습생 or 카페인 수혈하는 야근러",
    skill: "빨리빨리 스피드 & 키보드 타자 800타",
    climate: "뚜렷한 사계절 (여름엔 찜통, 겨울엔 냉동고)",
    commentary: "확률 0.18%의 초희귀 당첨! 다시 태어나도 치킨 배달 30분 컷과 초고속 Wi-Fi를 누릴 수 있습니다."
  },
  {
    name: "독일",
    code: "DE",
    flag: "🇩🇪",
    birthWeight: 0.5,
    rarity: "초희귀 (Epic)",
    rarityClass: "epic",
    quote: "“구텐탁! 아우토반에서 속도제한 없이 밟아볼 준비 되셨습니까?”",
    job: "명품 자동차 엔지니어 or 수제 맥주 브루마스터",
    skill: "철저한 시간 약속 & 소시지 커팅 기술",
    climate: "맥주와 소시지가 당기는 온대 대륙성 기후",
    commentary: "정밀 기계처럼 규칙적인 일상! 일요일엔 모든 상점이 닫히지만 평화로운 휴식이 보장됩니다."
  },
  {
    name: "영국",
    code: "GB",
    flag: "🇬🇧",
    birthWeight: 0.45,
    rarity: "초희귀 (Epic)",
    rarityClass: "epic",
    quote: "“비가 와도 우산은 쓰지 않는 게 런더너의 쿨함이지.”",
    job: "프리미어리그 축구선수 or 비밀 첩보요원(007)",
    skill: "영국식 억양 & 홍차와 스콘 티타임 즐기기",
    climate: "일 년 365일 중 200일은 흐리고 촉촉한 감성",
    commentary: "축구의 종가이자 해리포터의 나라! 펍(Pub)에서 축구 보며 피시앤칩스를 뜯는 삶."
  },
  {
    name: "프랑스",
    code: "FR",
    flag: "🇫🇷",
    birthWeight: 0.5,
    rarity: "초희귀 (Epic)",
    rarityClass: "epic",
    quote: "“봉쥬르~ 바게트 하나 겨드랑이에 끼고 센강을 걷는 인생!”",
    job: "미슐랭 3스타 셰프 or 파리 패션위크 모델",
    skill: "예술적 철학 토론 & 와인 블라인드 테이스팅",
    climate: "낭만적인 유럽의 온화한 햇살",
    commentary: "여유로운 2시간 점심시간과 연간 5주의 유급휴가가 보장되는 예술의 나라!"
  },
  {
    name: "스위스",
    code: "CH",
    flag: "🇨🇭",
    birthWeight: 0.06, // 약 8만 명 출생 (0.06%)
    rarity: "전설 (Legendary 👑)",
    rarityClass: "legendary",
    quote: "“🌟 대박 로또 당첨!! 알프스 소녀 하이디 뷰가 내 일상?!”",
    job: "스위스 비밀금고 관리자 or 명품 시계 장인",
    skill: "퐁뒤 치즈 늘리기 & 스키 타고 등교하기",
    climate: "만년설이 빛나는 청정 알프스 공기",
    commentary: "전생에 나라를 구하셨군요! 1인당 GDP 최상위권, 창밖을 보면 엽서 속 풍경이 펼쳐집니다."
  },
  {
    name: "노르웨이",
    code: "NO",
    flag: "🇳🇴",
    birthWeight: 0.04,
    rarity: "전설 (Legendary 👑)",
    rarityClass: "legendary",
    quote: "“🌟 북유럽 복지 천국 당첨! 오로라를 보며 연어를 썰어볼까?”",
    job: "피오르드 탐험가 or 청정 연어 양식 재벌",
    skill: "바이킹의 강철 멘탈 & 오로라 사진 마스터",
    climate: "백야의 여름과 오로라가 춤추는 겨울",
    commentary: "요람에서 무덤까지 책임지는 복지국가! 추운 날씨 따위 따뜻한 벽난로와 사우나로 극복합니다."
  },
  {
    name: "모나코",
    code: "MC",
    flag: "🇲🇨",
    birthWeight: 0.0003, // 극악의 확률
    rarity: "신화 (Mythic ✨)",
    rarityClass: "mythic",
    quote: "“💎 세상에 이런 일이! 요트 타고 슈퍼카 몰고 다니는 0.0003%의 선택받은 자!”",
    job: "지중해 요트 선주 or F1 그랑프리 VIP",
    skill: "소득세 0원의 여유 & 카지노 룰렛 눈치",
    climate: "연중 온화하고 찬란한 지중해 햇살",
    commentary: "전생에 은하계를 구하셨습니다! 모나코 국적자는 전 세계를 통틀어 극소수만의 특권!"
  },
  {
    name: "호주",
    code: "AU",
    flag: "🇦🇺",
    birthWeight: 0.22,
    rarity: "초희귀 (Epic)",
    rarityClass: "epic",
    quote: "“G'day mate! 캥거루와 쿼카가 뛰어노는 대자연으로 환생!”",
    job: "그레이트 배리어 리프 해양구조대 or 바리스타",
    skill: "부메랑 던지기 & 거대 거미 보고도 안 놀라기",
    climate: "따스한 햇살과 환상적인 해변 라이프",
    commentary: "마당에 캥거루가 들어와도 침착하게 바비큐를 굽는 여유만만 호주 라이프!"
  },
  {
    name: "아이슬란드",
    code: "IS",
    flag: "🇮🇸",
    birthWeight: 0.003,
    rarity: "신화 (Mythic ✨)",
    rarityClass: "mythic",
    quote: "“얼음과 불의 섬! 온천에 몸 담그고 요정(엘프) 설화를 믿는 나라!”",
    job: "화산 폭발 유튜버 or 지열 온천 관리자",
    skill: "온천 달걀 삶기 & 빙하 워킹",
    climate: "여름엔 시원하고 겨울엔 신비로운 극야",
    commentary: "인구 39만 명의 희귀 국가! 범죄율이 거의 0에 가까운 평화로운 겨울왕국입니다."
  },
  {
    name: "이집트",
    code: "EG",
    flag: "🇪🇬",
    birthWeight: 1.6,
    rarity: "보통 (Uncommon)",
    rarityClass: "uncommon",
    quote: "“창문 열면 피라미드 뷰?! 5천 년 역사의 나일강을 품은 삶!”",
    job: "피라미드 고고학 가이드 or 낙타 레이서",
    skill: "상형문자 해독 흉내내기 & 모래바람 견디기",
    climate: "비 한 방울 안 오는 화끈한 사막 기후",
    commentary: "파라오의 가호를 받는 환생! 매일 피라미드를 보며 출근하는 남다른 스케일의 일상."
  }
];

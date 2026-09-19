// stop.js

// 1. 사용할 정류장 데이터베이스 (번호별로 정의)
// 영어명(englishName)이 없는 경우 생략 가능합니다.
const stationDB = {
    1: { name: "미화공영차고지", englishName: "" },
    2: { name: "미화생명빌딩", englishName: "" },
    3: { name: "미화다은마을2단지", englishName: "" },
    4: { name: "미화역", englishName: "" }, // 영어명 생략 예시
    5: { name: "조차장터", englishName: "" },
    6: { name: "청렴역", englishName: "" },
    7: { name: "미화마을.미화청렴타운", englishName: "" },
    8: { name: "미화2지구입구", englishName: "" },
    9: { name: "미화워크벨리입구", englishName: "" },
    10: { name: "과학관역", englishName: "" },
    11: { name: "서부지방법원등기국.단고세무서.과학빌라", englishName: "" },
    12: { name: "다은마을1차아파트", englishName: "" },
    13: { name: "미화과학관", englishName: "" },
    14: { name: "다은마을2차.미화경찰서후문", englishName: "" },
    15: { name: "미화테크노파트.미화복합터미널", englishName: "Mihwa Technopark. Mihwa Integrated Terminal" },
    16: { name: "미화제1대교 ", englishName: "" },
    17: { name: "미화문고", englishName: "" },
    18: { name: "미화주공1단지", englishName: "" },
    19: { name: "미화마을.미화청렴타운", englishName: "" },
    20: { name: "청렴역", englishName: "" },
    21: { name: "조차장터", englishName: "" },
    22: { name: "미화역", englishName: "" },
    23: { name: "미화다은마을2단지 ", englishName: "" },
    24: { name: "미화생명빌딩", englishName: "" },
    25: { name: "미화공영차고지", englishName: "" }
};
// ** 추가 안내사항 풀(Pool) : 개수 상관없이 자유롭게 추가 가능 **
const noticePool = [
    "부정승차 적발시 운임의 30배가 부과됩니다. 기후동행카드 많은이용 부탁드립니다.",
    "오늘도 미화마을버스를 이용해주신 승객여러분께 감사드립니다.",
    "승차 시 버스가 완전히 정차한 후 승차해주시기 바랍니다.",
    "환절기 감기 조심하세요",
    "여러분 노약자 좌석은 노약자에게 양보하시고 내리실때는 벨을 미리 눌러주시고 차가 완전히 정차한 후 자리에서 일어나주시기 바랍니다",
    "미화버스 미화02"
];

// 2. 버스 노선 정보 및 재생 시퀀스
const busConfig = {
    busNumber: "미화02", // 버스 노선 번호
    // 순서대로 재생될 시퀀스 [출발 정류장 번호, 다음 정류장 번호, 오디오 파일 경로]
    sequence: [
            { current: 1, next: 2, audio: "audios/stop1.mp3" },
            { current: 2, next: 3, audio: "audios/stop2.mp3" },
            { current: 3, next: 4, audio: "audios/stop3.mp3" },
            { current: 4, next: 5, audio: "audios/stop4.mp3" },
            { current: 5, next: 6, audio: "audios/stop5.mp3" },
            { current: 6, next: 7, audio: "audios/stop6.mp3" },
            { current: 7, next: 8, audio: "audios/stop7.mp3" },
            { current: 8, next: 9, audio: "audios/stop8.mp3" },
            { current: 9, next: 10, audio: "audios/stop9.mp3" },
            { current: 10, next: 11, audio: "audios/stop10.mp3" },
            { current: 11, next: 12, audio: "audios/stop11.mp3" },
            { current: 12, next: 13, audio: "audios/stop12.mp3" },
            { current: 13, next: 14, audio: "audios/stop13.mp3" },
            { current: 14, next: 15, audio: "audios/stop14.mp3" },
            { current: 15, next: 16, audio: "audios/stop15.mp3" },
            { current: 16, next: 17, audio: "audios/stop16.mp3" },
            { current: 17, next: 18, audio: "audios/stop17.mp3" },
            { current: 18, next: 19, audio: "audios/stop18.mp3" },
            { current: 19, next: 20, audio: "audios/stop19.mp3" },
            { current: 20, next: 21, audio: "audios/stop20.mp3" },
            { current: 21, next: 22, audio: "audios/stop21.mp3" },
            { current: 22, next: 23, audio: "audios/stop22.mp3" },
            { current: 23, next: 24, audio: "audios/stop23.mp3" },
            { current: 24, next: 25, audio: "audios/stop24.mp3" },
            { current: 25, next: null, audio: "audios/stop25.mp3" },
        ]
};

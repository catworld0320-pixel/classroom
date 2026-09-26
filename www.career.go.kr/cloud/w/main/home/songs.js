const songDatabase = [
    {
        id: 1,
        title: "Dynamite",
        artist: "BTS",
        src: "Music/BTS/Dynamite.mp3",
        // 노래제목.png 형태로 커버 이미지 경로 설정
        cover: "Music/BTS/Dynamite.png",
        lyrics: [
            { time: 0, text: "Dynamite - BTS" },
            { time: 3, text: "" },
            { time: 23.5, text: "Cos I'm in the stars tonight" },
            { time: 27, text: "So watch me bring the fire and set the night alight" },
            { time: 32, text: "Shoes on, get up in the morn'" },
            { time: 41, text: "Cup of milk, let's rock and roll" },
            { time: 42, text: "King Kong, kick the drum" },
            { time: 43, text: "Rolling on like a Rolling Stone" }
        ]
    },
    {
        id: 2,
        title: "Peace Sign",
        artist: "요네즈켄시",
        src: "Music/Fromis_9/PraceSign.mp3",
        cover: "Music/Fromis_9/PraceSign.png", // 파일이 없으면 회색 이미지로 자동 대체됨
        lyrics: [
            { time: 18.71, text: "Itsuka bokura no ue wo suresure ni" },
            { time: 21.17, text: "Toorisugitetta ano hikouki wo" },
            { time: 23.54, text: "Fushigi na kurai ni oboeteru" },
            { time: 25.70, text: "Imi mo nai no ni nazeka" },
            { time: 28.47, text: "Fugainakute naita hi no yoru ni" },
            { time: 30.86, text: "Tada tsuyoku naritai to negatteta" },
            { time: 33.22, text: "Sono tame ni hitsuyou na yuuki wo" },
            { time: 35.41, text: "Sagashi motomete ita" },
            { time: 38.05, text: "Zankoku na unmei ga sadamatteru toshite" },
            { time: 42.61, text: "Sore ga itsu no hi ka boku no mae ni arawareru toshite" },
            { time: 48.08, text: "Tada isshun kono isshun iki ga dekiru nara" },
            { time: 52.52, text: "Dou demo ii to omoeta" },
            { time: 55.26, text: "sono kokoro wo" },
            { time: 59.19, text: "Mou ichido, Tooku he ike tooku he ike to" },
            { time: 62.30, text: "Boku no naka de dareka ga utau" },
            { time: 64.37, text: "Doushiyou mo nai hodo netsuretsu ni" },
            { time: 68.30, text: "Itsu datte me wo harashita kimi ga nido to" },
            { time: 71.53, text: "Kanashimanai you ni waraeru" },
            { time: 73.92, text: "Sonna hiiroo ni naru tame no uta" },
            { time: 78.71, text: "Saraba kakagero peace sign" },
            { time: 81.18, text: "Korogatteku sutoorii wo" },
            { time: 93.01, text: "Mamoritai da nante ieru hodo" },
            { time: 95.76, text: "Kimi ga yowaku wa nai no wakatteta" },
            { time: 97.86, text: "Sore ijou ni boku wa yowakute sa" },
            { time: 100.36, text: "Kimi ga daiji datta'n da" },
            { time: 102.75, text: "Hitori de ikite iku'n da nante sa" },
            { time: 105.19, text: "Kuchi wo tsuite sakenda ano hi kara" },
            { time: 107.52, text: "Kawatte iku boku wo waraeba ii" },
            { time: 110.13, text: "Hitori ga kowai boku wo" },
            { time: 112.63, text: "Ketobashite kamitsuite" },
            { time: 115.09, text: "iki mo dekinakute" },
            { time: 117.14, text: "Sawagu atama to hara no oku ga" },
            { time: 119.50, text: "gusha gusha ni nattatte" },
            { time: 122.22, text: "Terai mo ge ren mo kiete shimau kurai ni" },
            { time: 126.73, text: "Ima wa sawatte itai'n da kimi no kokoro ni" },
            { time: 133.19, text: "Boku-tachi wa kitto itsuka" },
            { time: 135.37, text: "Tooku hanareta taiyou ni sura te ga todoite" },
            { time: 139.15, text: "Yoake mae wo te ni irete waraou" },
            { time: 143.20, text: "Sou yatte aoku moeru iro ni somari" },
            { time: 146.04, text: "Oboroge na machi no mukou he" },
            { time: 148.78, text: "Te wo tsunaide hashitte ikeru hazu da" },
            { time: 153.26, text: "Kimi to mirai wo nusumi egaku" },
            { time: 155.65, text: "Hineri no nai sutoorii wo" },
            { time: 168.24, text: "Kasabuta darake arakureta hibi ga" },
            { time: 170.35, text: "Kezuri kezurare surikireta ima ga" },
            { time: 172.85, text: "Kimi no kotoba de yomigaeru" },
            { time: 174.90, text: "Azayaka ni mo arawareteku" },
            { time: 177.96, text: "Sanagi no mama de nemuru tamashii wo" },
            { time: 180.07, text: "Tabekake no mama suteta ano yume wo" },
            { time: 182.42, text: "Mou ichido torimodose" },
            { time: 186.00, text: "♪" },
            { time: 204.28, text: "Mou ichido, Tooku he ike tooku he ike to" },
            { time: 208.36, text: "Boku no naka de dareka ga utau" },
            { time: 211.02, text: "Doushiyou mo nai hodo netsuretsu ni" },
            { time: 215.04, text: "Itsu datte me wo harashita kimi ga nido to" },
            { time: 218.02, text: "Kanashimanai you ni waraeru" },
            { time: 220.78, text: "Sonna hiiroo ni naru tame no uta" },
            { time: 225.09, text: "Saraba kakagero peace sign" },
            { time: 227.70, text: "Korogatteku sutoorii wo" },
            { time: 230.19, text: "Kimi to mirai wo nusumi egaku" },
            { time: 232.53, text: "Hineri no nai sutoorii wo" }

        ]
    },
        {
        id: 3,
        title: "Vitamin Me",
        artist: "Fromis_9",
        src: "Music/Fromis_9/Vitamin_Me.mp3",
        cover: "Music/Fromis_9/Vitamin_Me.png", // 파일이 없으면 회색 이미지로 자동 대체됨
        lyrics: [
            { time: 0.93, text: "Mm" },
            { time: 2.57, text: "I think you need a dose of" },
            { time: 4.69, text: "Vitamin me" },
            { time: 8.51, text: "찌는 더위, 처진 눈꼬리" },
            { time: 11.81, text: "잠에 들 것 같은 너, you need some of my citrus" },
            { time: 16.73, text: "한 방울 튄 맘을 담은 squeeze" },
            { time: 20.03, text: '고장 난 네 맘을 touch, you\'ll be like, "Oh"' },
            { time: 24.61, text: "하나, 둘, 셋, 맘을 refresh, 상큼한 lime juice" },
            { time: 28.79, text: "I would hate to see you with a gloomy attitude" },
            { time: 32.86, text: "원하는 색을 맘대로 섞어 단숨에 들이켜" },
            { time: 37.07, text: "I'll mix it up on a silver platter now" },
            { time: 39.24, text: 'Call it, "Vitamin me"' },
            { time: 40.01, text: "I'ma make you happy, 달콤한 lemon fizz" },
            { time: 44.68, text: "Love it like you do, hoo-hoo-hoo-hoo" },
            { time: 46.61, text: "Got you feeling new, hoo-hoo-hoo-hoo" },
            { time: 48.23, text: "I'ma make you healthy, 커져가는 heartbeat" },
            { time: 52.34, text: "밤이 없는 햇빛, yes, me" },
            { time: 55.75, text: "Got a boost of vitamin me, me" },
            { time: 61.21, text: "Not A, B, C, vitamin me" },
            { time: 64.96, text: "Vitamin me, me" },
            { time: 69.49, text: "Not A, B, C, but you need vitamin me" },
            { time: 74.13, text: "네 하루를 비출 때, 미지근한 바람은 부족해" },
            { time: 77.77, text: "'Cause I'm feeling you just come alive" },
            { time: 81.85, text: "I'm the best pick-me-up that you ever had (ever had)" },
            { time: 83.99, text: "게으른 네 심장을 뛰게 해 (did that)" },
            { time: 85.93, text: '네가 바라던 노랠 sing along, like, "Oh-oh, oh"' },
            { time: 90.26, text: "하나, 둘, 셋, 맘을 refresh, 새빨간 grapefruit" },
            { time: 94.37, text: "I would hate to see you with a gloomy attitude" },
            { time: 98.46, text: "원하는 색을 맘대로 섞어 단숨에 들이켜" },
            { time: 102.67, text: "I'll mix it up on a silver platter now" },
            { time: 104.9, text: 'Call it, "Vitamin me"' },
            { time: 105.78, text: "I'ma make you happy, 달콤한 lemon fizz" },
            { time: 110.24, text: "Love it like you do, hoo-hoo-hoo-hoo" },
            { time: 112.31, text: "Got you feeling new, hoo-hoo-hoo-hoo" },
            { time: 113.88, text: "I'ma make you healthy, 커져가는 heartbeat" },
            { time: 118.06, text: "밤이 없는 햇빛, yes, me" },
            { time: 121.32, text: "Got a boost of vitamin me, me" },
            { time: 126.91, text: "Not A, B, C, vitamin me" },
            { time: 130.56, text: "Vitamin me, me" },
            { time: 135.12, text: "Not A, B, C, but you need vitamin me" },
            { time: 140.08, text: "너만 비추는 spotlight" },
            { time: 143.01, text: "아무도 몰래 내 손을 잡아" },
            { time: 147.77, text: "Maybe, maybe you've changed me, changed me now" },
            { time: 151.89, text: "너라면 뭐든지, 난" },
            { time: 154.99, text: "한여름의 dreamy, 차오르는 sparkling (yeah)" },
            { time: 159.48, text: "Love it like you do, hoo-hoo-hoo-hoo (yeah)" },
            { time: 161.51, text: "Got you feeling new, hoo-hoo-hoo-hoo" },
            { time: 163.04, text: "싱그러운 wavy (oh), 커져가는 heartbeat (ha)" },
            { time: 167.22, text: "밤이 없는 햇빛, yes, me" },
            { time: 170.52, text: "Got a boost of vitamin me, me (vitamin, vitamin me)" },
            { time: 176.28, text: "Not A, B, C, vitamin me (vitamin, vitamin me)" },
            { time: 179.51, text: "(Oh) vitamin me, me (vitamin, vitamin me)" },
            { time: 184.56, text: "Not A, B, C (vitamin, vitamin), but you need vitamin me" }
        ]
    },
    {
        id: 4,
        title: "LIKE YOU BETTER",
        artist: "Fromis_9",
        src: "Music/fromis_9/LIKE YOU BETTER.mp3",
        cover: "Music/fromis_9/LIKE YOU BETTER.png", // 파일이 없으면 회색 이미지로 자동 대체됨
        lyrics: [
            { time: 7.95, text: "You know what" },
            { time: 9.15, text: "This isn't just a moment" },
            { time: 10.65, text: "And once you feel it" },
            { time: 11.68, text: "There's no turning back" },
            { time: 14.96, text: "널 닮은 파도에 dive" },
            { time: 17.27, text: "I can go anywhere" },
            { time: 19.14, text: "말해봐 뭐든 say" },
            { time: 21.9, text: "붉게 타는 태양의 끝에" },
            { time: 24.73, text: "우릴 그려볼래" },
            { time: 26.62, text: "Let's call ourselves the starlight" },
            { time: 29.81, text: "From summer days to the last dance" },
            { time: 33.28, text: "다쳐도 놓지 않을 이 rendez-vous" },
            { time: 36.58, text: "So I know" },
            { time: 37.65, text: "바람 속에 몸을 맡긴 채" },
            { time: 42.61, text: "So hit it off" },
            { time: 43.41, text: "1 2 3 4 dive" },
            { time: 45, text: "I like you better" },
            { time: 46.34, text: "I like you better" },
            { time: 47.76, text: "You and I" },
            { time: 49.09, text: "Our love is true cause this is too great" },
            { time: 52.4, text: "I like you better" },
            { time: 53.79, text: "널 내일이라 부를래" },
            { time: 56.31, text: "더 뜨겁게" },
            { time: 59.63, text: "Oh" },
            { time: 103.55, text: "달콤한 바람" },
            { time: 104.92, text: "So hit it off" },
            { time: 105.71, text: "1 2 3 4 dive" },
            { time: 107.08, text: "Oh" },
            { time: 110.99, text: "네 꿈에 닿아 stay" },
            { time: 114.73, text: "네가 머문 계절 속에" },
            { time: 116.59, text: "끊임없이 떠다닐래" },
            { time: 118.09, text: "Break the compass" },
            { time: 119.06, text: "I let you in but" },
            { time: 119.96, text: "You gave me something really special" },
            { time: 121.94, text: "I'm gonna be with you" },
            { time: 123.82, text: "Like this 나 나 나" },
            { time: 125.88, text: "You're never falling like that" },
            { time: 127.46, text: "Never gonna be wasting our time" },
            { time: 129.37, text: "From summer days to the last dance" },
            { time: 132.82, text: "아파도 놓지 않을 이 rendez-vous" },
            { time: 136.15, text: "So I know" },
            { time: 137.22, text: "너라면 어디든 가볼래" },
            { time: 142.13, text: "So hit it off" },
            { time: 142.91, text: "1 2 3 4 dive" },
            { time: 144.49, text: "I like you better" },
            { time: 145.87, text: "I like you better" },
            { time: 147.3, text: "You and I" },
            { time: 148.66, text: "Our love is true cause this is too great" },
            { time: 151.91, text: "I like you better" },
            { time: 153.26, text: "널 내일이라 부를래" },
            { time: 155.79, text: "더 뜨겁게" },
            { time: 159.21, text: "Oh" },
            { time: 163.07, text: "달콤한 바람" },
            { time: 164.47, text: "So hit it off" },
            { time: 165.24, text: "1 2 3 4 dive" },
            { time: 166.54, text: "Oh" },
            { time: 170.55, text: "네 꿈에 닿아 stay" },
            { time: 173.98, text: "빛이 나 높은 하늘과" },
            { time: 177.25, text: "쏘아올린 sign" },
            { time: 179.14, text: "바래지지 않을 story" },
            { time: 181.43, text: "피어오르듯 타올라" },
            { time: 184.73, text: "나와 손을 뻗어 저 끝까지 high" },
            { time: 191.03, text: "I like you better" },
            { time: 192.39, text: "I like you better" },
            { time: 193.78, text: "You and I" },
            { time: 195.19, text: "Our love is true cause this is too great" },
            { time: 198.4, text: "I like you better" },
            { time: 199.83, text: "널 내일이라 부를래" },
            { time: 202.32, text: "더 뜨겁게" },
            { time: 205.92, text: "It doesn't matter cause we're better" },
            { time: 207.99, text: "When we are together" },
            { time: 211.03, text: "더 외쳐 here we go" },
            { time: 213.36, text: "I find it funny" },
            { time: 214.45, text: "See? Aren't you glad we did this together" },
            { time: 217.53, text: "Our love is true cause this is too great" }
        ]
    },
    {
        id: 5,
        title: "white",
        artist: "이세계아이돌",
        src: "Music/이세계아이돌/white.mp3",
        cover: "Music/이세계아이돌/white.png",
        lyrics: [
            { time: 18.88, text: "너도 오늘만은 기억하고 있겠지?" },
            { time: 23.34, text: "벌써 만난 지도 일 년이 됐어" },
            { time: 27.82, text: "우리 그때보다 변한 것이 있다면" },
            { time: 32.82, text: "좀 더 커져 버린 사랑일 거야" },
            { time: 36.88, text: "겨울 내내 너를 생각하며 만들던" },
            { time: 41.37, text: "빨간 스웨터도 입혀 줄 거야" },
            { time: 45.84, text: "항상 포근했던 네 마음과 어울려" },
            { time: 50.86, text: "날 생각하면 정말 좋겠어" },
            { time: 54.85, text: "거리에 함께 나온 연인들" },
            { time: 59.84, text: "밤새 들려오는 노랫소리들" },
            { time: 64.3, text: "모두가 우리들의 만남을" },
            { time: 68.86, text: "축복하는 예쁜 선물들 같아" },
            { time: 73.32, text: "저기 하얀 눈이 내려 저 하늘 모두 내려" },
            { time: 78.37, text: "우리 서로 닿은 마음 위로 사랑이 내려" },
            { time: 82.33, text: "살짝 네 가슴에 기대 안겨 먼저 말을 할까" },
            { time: 87.38, text: "나를 느끼는 너의 모든 걸 사랑해" },
            { time: 94.81, text: "(Snow is falling in the world of white)" },
            { time: 98.84, text: "(Our story begins once more)" },
            { time: 100.82, text: "우리 처음 만난 일 년 전에 오늘도" },
            { time: 104.81, text: "지금처럼 하얀 눈이 내렸지" },
            { time: 109.86, text: "추워 코끝까지 빨개진 날 보면서" },
            { time: 114.36, text: "넌 놀려대며 웃고 있었어" },
            { time: 118.35, text: "가만히 빛을 내는 촛불에" },
            { time: 122.81, text: "지금 내 마음을 비쳐 보일까" },
            { time: 127.87, text: "이렇게 너와 함께 있는 나" },
            { time: 132.32, text: "세상 누구보다 행복하다고" },
            { time: 136.89, text: "저기 하얀 눈이 내려 저 하늘 모두 내려" },
            { time: 141.33, text: "우리 서로 닿은 마음 위로 사랑이 내려" },
            { time: 145.82, text: "살짝 네 가슴에 기대 안겨 먼저 말을 할까" },
            { time: 150.87, text: "나를 느끼는 너의 모든 걸" },
            { time: 154.89, text: "지금 네 바람이 들려 저 하늘까지 들려" },
            { time: 159.3, text: "나도 오늘 밤엔 같은 소원 빌게 될 거야" },
            { time: 163.81, text: "많은 시간들이 흘러가도 우리들의 사랑" },
            { time: 168.82, text: "지금처럼만 간직해 주길 기도해" },
            { time: 173.52, text: "" }
        ]
    },
    {
    "id": 6,
    "title": "SYZYGY",
    "artist": "I이세계아이돌",
    "src": "Music/이세계아이돌/SYZYGY.mp3",
    "cover": "Music/이세계아이돌/SYZYGY.png",
    "lyrics": [
        {
            "time": 6.99,
            "text": "Like a beep-bloop"
        },
        {
            "time": 8.3,
            "text": "Beep-beep-beep, I'm runnin' now"
        },
        {
            "time": 10.12,
            "text": "비밀 속의 sign, 가볼까"
        },
        {
            "time": 12.13,
            "text": "Ready-go, babe?"
        },
        {
            "time": 13.38,
            "text": "Yeah, I'm alive"
        },
        {
            "time": 15.65,
            "text": "길을 찾아 spot, 눈부신 light"
        },
        {
            "time": 19.04,
            "text": "Yeah, 별 끝 따라"
        },
        {
            "time": 21.6,
            "text": "시작됐어, now, to be a star, yeah"
        },
        {
            "time": 25.39,
            "text": "I'm on the edge on the line, 지금 이 순간"
        },
        {
            "time": 28.32,
            "text": "곧 눈 앞에 펼쳐질 새로운 세상"
        },
        {
            "time": 31.38,
            "text": "Who's out there reachin'?"
        },
        {
            "time": 32.56,
            "text": "I'm catchin' the vibe"
        },
        {
            "time": 34.32,
            "text": "꿈꾸던 closer, 널 비추는 shine"
        },
        {
            "time": 37.41,
            "text": "Hi, 어서와"
        },
        {
            "time": 39.52,
            "text": "공간을 넘어, beep-bloop"
        },
        {
            "time": 41.29,
            "text": "Beep-beep-beep, 널 데리고"
        },
        {
            "time": 43.37,
            "text": "High, 날아가, fantasy로"
        },
        {
            "time": 46.65,
            "text": "한계를 초월하는 D-I-V-E"
        },
        {
            "time": 49.44,
            "text": "Babe, I'm on the stage"
        },
        {
            "time": 52.01,
            "text": "너와 나 지금, through the night"
        },
        {
            "time": 54.25,
            "text": "내 손 안에 flag, 꽂히는 tag"
        },
        {
            "time": 57.9,
            "text": "To burnin' stars, whoa"
        },
        {
            "time": 61.38,
            "text": "Come with me, 따라와, 내 universe"
        },
        {
            "time": 64.36,
            "text": "Findin' through the light"
        },
        {
            "time": 66.28,
            "text": "함께할 night, 시작된 day"
        },
        {
            "time": 70.04,
            "text": "Come in SYZYGY, yeah"
        },
        {
            "time": 72.38,
            "text": "널 기다려"
        },
        {
            "time": 74.02,
            "text": "기다려, by your side (By your side)"
        },
        {
            "time": 79.15,
            "text": "내 기분은 마치 butterfly"
        },
        {
            "time": 82.26,
            "text": "분위기 점점 더 thrillin'"
        },
        {
            "time": 85.41,
            "text": "무대는 갈수록 뜨거워 (It's too hot)"
        },
        {
            "time": 88.45,
            "text": "끝없는 상상 속 wonder road (Wonder road)"
        },
        {
            "time": 91.45,
            "text": "저 공간을 넘어서 맞닿은 시간"
        },
        {
            "time": 94.33,
            "text": "밤 하늘 위 la-la-like, 꿈꿔온 순간"
        },
        {
            "time": 97.28,
            "text": "'Cause I feel rhythm, I'm catchin' the vibe"
        },
        {
            "time": 100.34,
            "text": "나만의 closet, 마주하는 star"
        },
        {
            "time": 103.49,
            "text": "뭘 망설여?"
        },
        {
            "time": 105.32,
            "text": "자, 문을 열어, beep-bloop"
        },
        {
            "time": 107.24,
            "text": "Beep-beep-beep, you got it now"
        },
        {
            "time": 109.28,
            "text": "널 기다릴"
        },
        {
            "time": 111.75,
            "text": "은하수로 끝까지 뛰어들어, D-I-V-E"
        },
        {
            "time": 115.33,
            "text": "Babe, I'm on the stage"
        },
        {
            "time": 117.83,
            "text": "너와 나 지금, through the night"
        },
        {
            "time": 120.28,
            "text": "내 손 안에 flag, 꽂히는 tag"
        },
        {
            "time": 123.85,
            "text": "To burnin' stars, whoa (Whoa, whoa)"
        },
        {
            "time": 127.35,
            "text": "Come with me, 따라와, 내 universe"
        },
        {
            "time": 130.47,
            "text": "Findin' through the light"
        },
        {
            "time": 132.22,
            "text": "함께할 night, 시작된 day"
        },
        {
            "time": 136.01,
            "text": "Come in SYZYGY, yeah"
        },
        {
            "time": 138.51,
            "text": "널 기다려"
        },
        {
            "time": 139.74,
            "text": "우리만의 fiesta"
        },
        {
            "time": 142.76,
            "text": "우리 안의 universe"
        },
        {
            "time": 145.73,
            "text": "Feel the gravity, feel the beat, unity"
        },
        {
            "time": 148.52,
            "text": "사라진대도, 지워진대도"
        },
        {
            "time": 151.63,
            "text": "To the stars, we see the stars (See the stars)"
        },
        {
            "time": 154.82,
            "text": "그 순간에 borderline (Right)"
        },
        {
            "time": 157.77,
            "text": "네 두 손을 맞잡고 뛰어가"
        },
        {
            "time": 160.22,
            "text": "빛나는 여기로 D-I-V-E"
        },
        {
            "time": 163.33,
            "text": "Bang, I'm with the flame"
        },
        {
            "time": 165.83,
            "text": "전부 다 change through the light (There's no time)"
        },
        {
            "time": 168.38,
            "text": "하늘 위로 shoot, 터지는 bloom"
        },
        {
            "time": 171.95,
            "text": "To burnin' stars, whoa (It's meant to be)"
        },
        {
            "time": 175.49,
            "text": "Come with me, 너와 나의 universe"
        },
        {
            "time": 178.34,
            "text": "Findin' through the light"
        },
        {
            "time": 180.39,
            "text": "함께할 night, 시작된 day"
        },
        {
            "time": 183.97,
            "text": "Come in SYZYGY, yeah"
        },
        {
            "time": 186.48,
            "text": "널 기다려"
        },
        {
            "time": 187.66,
            "text": ""
        },
        {
            "time": 196.08,
            "text": "Like a beep-bloop, beep, beep, beep, 널 기다려"
        },
        {
            "time": 199.5,
            "text": ""
        }
    ]
},
{
    "id": 7,
    "title": "Stargazers",
    "artist": "이세계아이돌",
    "src": "Music/이세계아이돌/Stargazers.mp3",
    "cover": "Music/이세계아이돌/Stargazers.png",
    "lyrics": [
        {
            "time": 0.69,
            "text": "Star"
        },
        {
            "time": 4.23,
            "text": "Starry haze"
        },
        {
            "time": 7.82,
            "text": "소리 없는 말 이끌리는 moon light"
        },
        {
            "time": 12.7,
            "text": "벌써 이렇게나 반짝이는 밤"
        },
        {
            "time": 16.36,
            "text": "느껴봐 내 Vibe 가까이 다가와"
        },
        {
            "time": 20.98,
            "text": "직감처럼 이어진 너완 운명일지 몰라"
        },
        {
            "time": 25.77,
            "text": "어쩌면 네겐 보였던 걸까"
        },
        {
            "time": 29.61,
            "text": "우리 사일 이어주는 어둠 속의 Blue"
        },
        {
            "time": 33.53,
            "text": "약속해, 망설이지 마, 아마도 이건 시작일거야"
        },
        {
            "time": 39.89,
            "text": "I could be your star"
        },
        {
            "time": 43.46,
            "text": "구름을 넘어"
        },
        {
            "time": 45.74,
            "text": "to the stage"
        },
        {
            "time": 47.48,
            "text": "조금만 더 알고싶어 널"
        },
        {
            "time": 51.59,
            "text": "찬란한 이 달빛"
        },
        {
            "time": 54.9,
            "text": "마음 속에 그려온 둘만의 순간"
        },
        {
            "time": 59.12,
            "text": "살며시 옮겨오는 그대 거리 틈에 닿는 숨"
        },
        {
            "time": 63.43,
            "text": "꿈일지도 몰라 난 알고 싶어"
        },
        {
            "time": 67.56,
            "text": "눈동자에 비치는 모습 누구보다 짙은 You"
        },
        {
            "time": 71.7,
            "text": "이젠 멀어질 수 없어 내 맘 속의 Truth"
        },
        {
            "time": 77.1,
            "text": "We - e - party on the block"
        },
        {
            "time": 78.8,
            "text": "just hand me then"
        },
        {
            "time": 79.78,
            "text": "더 높아지는 ultrasound"
        },
        {
            "time": 81.84,
            "text": "like a bossy gang  can’t resist myself"
        },
        {
            "time": 84.11,
            "text": "Take the king and come play with me"
        },
        {
            "time": 86.27,
            "text": "깜깜한 것 같던 하늘에 나타난 stargazer"
        },
        {
            "time": 90,
            "text": "설렘처럼 다가온 너완 영원일지 몰라"
        },
        {
            "time": 94.69,
            "text": "어쩌면 네겐 들렸던 걸까"
        },
        {
            "time": 98.52,
            "text": "소리 없이 머무는 백만번의 꿈"
        },
        {
            "time": 102.52,
            "text": "약속해, 후회하지 않아, 마음 속에 녹아든거야"
        },
        {
            "time": 108.92,
            "text": "I could be your star"
        },
        {
            "time": 112.25,
            "text": "구름을 넘어"
        },
        {
            "time": 114.62,
            "text": "to the stage"
        },
        {
            "time": 116.31,
            "text": "조금만 더 알고싶어 널"
        },
        {
            "time": 120.53,
            "text": "찬란한 이 달빛"
        },
        {
            "time": 123.92,
            "text": "마음 속에 그려온 둘만의 순간"
        },
        {
            "time": 127.99,
            "text": "살며시 옮겨오는 그대 거리 틈에 닿는 숨"
        },
        {
            "time": 132.23,
            "text": "꿈일지도 몰라 난 알고 싶어"
        },
        {
            "time": 136.41,
            "text": "눈동자에 비치는 모습 누구보다 짙은 you"
        },
        {
            "time": 140.6,
            "text": "이젠 멀어질 수 없어 내 맘 속의 truth"
        },
        {
            "time": 145.15,
            "text": "우리가 함께 보낸 시간은"
        },
        {
            "time": 148.57,
            "text": "날 이루는 곳에 자리잡을 거야"
        },
        {
            "time": 153.58,
            "text": "상처입지 않도록"
        },
        {
            "time": 156.88,
            "text": "서로가 서로를 지킬 수 있게"
        },
        {
            "time": 162.19,
            "text": "이제서야 말할게"
        },
        {
            "time": 164.93,
            "text": "나의 소원은 너였던 걸"
        },
        {
            "time": 169.24,
            "text": "약속해, 잊지 말아주길 바라, 우리 함께한 추억을"
        },
        {
            "time": 177.76,
            "text": "cause you could be my star"
        },
        {
            "time": 181.31,
            "text": "구름을 넘어"
        },
        {
            "time": 183.85,
            "text": "to the stage"
        },
        {
            "time": 185.25,
            "text": "조금만 더 알고싶어 널"
        },
        {
            "time": 189.47,
            "text": "찬란한 이 달빛"
        },
        {
            "time": 192.59,
            "text": "마음 속에 그려온 둘만의 순간"
        },
        {
            "time": 196.8,
            "text": "살며시 옮겨오는 그대 거리 틈에 닿는 숨"
        },
        {
            "time": 201.06,
            "text": "꿈일지도 몰라 난 알고 싶어"
        },
        {
            "time": 205.22,
            "text": "눈동자에 비치는 모습 누구보다 짙은 you"
        },
        {
            "time": 209.36,
            "text": "이젠 멀어질 수 없어 내 맘 속의 truth"
        }
    ]
},
    {
    "id": 8,
    "title": "ㅇㄷㅅㅌ",
    "artist": "ㄴㅁㅎ",
    "src": "Music/ㄴㅁㅎ/ㅇㄷㅅㅌ.mp3",
    "cover": "Music/ㄴㅁㅎ/ㅇㄷㅅㅌ.png",
    "lyrics": [
                {"time": 5.19, "text": "여긴 응디시티"},
                {"time": 11, "text": "노무현이 왔습니다"},
                {"time": 11.8, "text": "싱싱한 노무현이 왔습니다"},
                {"time": 14.25, "text": "대한민국 군대들 지금까지 뭐했어 마 뭐했노 이기"},
                {"time": 18.12, "text": "심심하면 불러다가 뺑뺑뺑뺑이"},
                {"time": 20, "text": "북 따악 딱 따닥따닥"},
                {"time": 22, "text": "제가 뭐 경제살리겠다고 말이나 했습니까?"},
                {"time": 25, "text": "했는데, 그래도 했으면 됐지 그쵸?"},
                {"time": 27.2, "text": "북 따악 딱 따닥따닥"},
                {"time": 29.19, "text": "미국한테 매달려가지고"},
                {"time": 31.1, "text": "형님형님 (야)"},
                {"time": 33.1, "text": "바짓가랑이 매달려가지고"},
                {"time": 35, "text": "형님형님 (야)"},
                {"time": 37, "text": "응딩이 뒤에서 숨어가지고"},
                {"time": 38.28, "text": "형님형님 (야)"},
                {"time": 40.1, "text": "그렇게 별들달고"},
                {"time": 41.2, "text": "뺑뺑뺑뺑이 돌리고 말았단 얘깁니까?"},
                {"time": 43.2, "text": "(Yes)"},
                {"time": 44, "text": "야 딱 좋다 기분 좋다"},
                {"time": 47.2, "text": "여러분 마지막 까지 흔들어 볼까요?"},
                {"time": 50.2, "text": "(좋습니다)"},
                {"time": 51.2, "text": "야 딱 좋다 기분 좋다"},
                {"time": 55, "text": "오늘은 제가 쏩니다!"},
                {"time": 58, "text": "야 기분좋다"},
                {"time": 66, "text": "여긴 응디시티"},
                {"time": 68.2, "text": "응디 응디 응디 응디"},
                {"time": 72, "text": "응디 응디 응디 응디"},
                {"time": 75, "text": "(흔들어)"},
                {"time": 75.25, "text": "응디 응디 응디 응디 응디 응디"},
                {"time": 81, "text": "(마, 마! 맽기놔라 고마!)"},
                {"time": 83, "text": "응디 응디 응디 응디 응디 응디"},
                {"time": 88.2, "text": "(팍 올라갔다 확 내려 갔다)"},
                {"time": 90.2, "text": "응디 응디 응디 응디 응디 응디"},
                {"time": 95.3, "text": "(이 부엉이바위 쪽으로 가자)"},
                {"time": 99.1, "text": "감사합니다"},
                {"time": 101, "text": ""},
                
    ]
},
];

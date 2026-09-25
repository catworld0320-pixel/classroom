// =========================================
// 급여 설정
// =========================================

export const BASE_SALARY = 50000;

export const PRICE_PER_MODEL = 5000;


// =========================================
// 급여 계산
// =========================================

function calcSalary(completedList) {

  const count =
    completedList
      ? completedList.length
      : 0;

  const total =
    BASE_SALARY +
    (count * PRICE_PER_MODEL);

  return total;
}


// =========================================
// 원본 데이터
// =========================================

const rawData = {

  // 매월 정산일
  payday: 24,


  periods: [

    // =====================================
    // 현재 정산
    // =====================================

    {
      period: "09.24 ~ 10.24",

      note: "진행 중인 정산 기간",

      completed: [

        "장구",

        "5첩밥상 그릇 6개,수저",

        "4가지 깃발",

        "도자기막걸리그릇+병",

        "꽹과리",

        "북",

        "징",

        "태평소",

        "상,수저받침대"

      ],


      inProgress: [
        {name: "곰방대",percent: 5,detail: "자료 찾는중",priority: "normal"},
        {name: "육모방망이",percent: 5,detail: "작업 예정",priority: "normal"},
        {name: "부채",percent: 0,detail: "작업 예정",priority: "normal"},
        {name: "호각",percent: 0,detail: "작업 예정",priority: "normal"},
        {name: "책",percent: 0,detail: "자료 찾는중",priority: "normal"},

      ]
    },


    // =====================================
    // 08월 정산
    // =====================================

    {
      period: "08.24 ~ 09.24",

      note: "정산 완료",

      completed: [

        // 이전 데이터가 있으면 여기에 추가
      ],

      inProgress: []
    },


    // =====================================
    // 07월 정산
    // =====================================

    {
      period: "07.24 ~ 08.24",

      note: "정산 완료",

      completed: [],

      inProgress: []
    },


    // =====================================
    // 06월 정산
    // =====================================

    {
      period: "06.24 ~ 07.24",

      note: "정산 완료",

      completed: [],

      inProgress: []
    }

  ]
};


// =========================================
// 최종 데이터 생성
// =========================================

const dashboardData = {

  ...rawData,


  periods:

    rawData.periods.map((item, index) => ({

      ...item,


      // 계산된 급여
      salary:
        calcSalary(item.completed),


      // 현재 기간인지
      isCurrent:
        index === 0

    }))

};


export default dashboardData;

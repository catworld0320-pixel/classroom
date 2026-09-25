const BASE_SALARY = 50000;
const PRICE_PER_MODEL = 5000;
function calcSalary(completedList) {
  const count = completedList ? completedList.length : 0;
  const total = BASE_SALARY + (count * PRICE_PER_MODEL);
  return `${total.toLocaleString()}원`;
}

const rawData = {
  payday: 24,
  periods: [
    {
      period: "09.24 ~ 10.24",
      note: "진행 중인 정산 기간",
      completed: [
        "장구",
        "5첩밥상 그릇 6개",
        "4가지 깃발",
        "도자기막걸리그릇+병",
        "꽹과리",
        "북",
        "징",
        "태평소",
        
      ],
      inProgress: [
        { name: "상", percent: 0 },
        { name: "곰방대", percent: 5 },
        { name: "부채", percent: 0 },
        { name: "육모방망이", percent: 0 },
        { name: "호각", percent: 0 },
        { name: "책", percent: 0 }
      ]
    },
    {
      period: "08.24 ~ 09.24",
      note: "정산 완료",
      completed: [],
      inProgress: []
    },
    {
      period: "07.24 ~ 08.24",
      note: "정산 완료",
      completed: [],
      inProgress: []
    },
    {
      period: "06.24 ~ 07.24",
      note: "정산 완료",
      completed: [],
      inProgress: []
    }
  ]
};

const dashboardData = {
  ...rawData,
  periods: rawData.periods.map(item => ({
    ...item,
    salary: calcSalary(item.completed)
  }))
};

export default dashboardData;

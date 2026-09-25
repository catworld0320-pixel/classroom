import dashboardData, {
  BASE_SALARY,
  PRICE_PER_MODEL
} from './model.js';


// =========================================
// 전역 변수
// =========================================

let currentPeriodIndex = 0;

let currentFilter = "all";

let salaryChart = null;

let completedChart = null;


// =========================================
// DOM 로딩
// =========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initNavigation();

    initPeriodSelect();

    initSalarySelect();

    initSearch();

    initFilters();

    updateDday(
      dashboardData.payday
    );

    renderDashboard(
      currentPeriodIndex
    );

    renderSalary(
      currentPeriodIndex
    );

    initCharts();

  }
);


// =========================================
// 하단 탭 네비게이션
// =========================================

function initNavigation() {

  const buttons =
    document.querySelectorAll(
      ".nav-button"
    );


  const pages =
    document.querySelectorAll(
      ".page"
    );


  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          button.dataset.page;


        // 버튼 활성화
        buttons.forEach(btn => {

          btn.classList.remove(
            "active"
          );

        });


        button.classList.add(
          "active"
        );


        // 페이지 변경
        pages.forEach(page => {

          page.classList.remove(
            "active"
          );

        });


        const targetPage =
          document.getElementById(
            `page-${target}`
          );


        if (targetPage) {

          targetPage.classList.add(
            "active"
          );

        }


        // 헤더 변경
        updateHeader(
          target
        );

      }

    );

  });

}


// =========================================
// 헤더 변경
// =========================================

function updateHeader(page) {

  const title =
    document.getElementById(
      "page-title"
    );


  const subtitle =
    document.getElementById(
      "page-subtitle"
    );


  if (!title || !subtitle) {
    return;
  }


  if (page === "work") {

    title.textContent =
      "조선 개발현황";

    subtitle.textContent =
      "작업 진행 상황을 확인하세요.";

  }


  else if (page === "salary") {

    title.textContent =
      "급여";

    subtitle.textContent =
      "정산 기간별 급여 내역입니다.";

  }


  else if (page === "chart") {

    title.textContent =
      "통계";

    subtitle.textContent =
      "작업과 급여 데이터를 확인하세요.";

  }

}


// =========================================
// 제작 페이지
// =========================================

function initPeriodSelect() {

  // 제작 페이지에서는
  // 현재 기간 기준으로 표시
  renderDashboard(
    currentPeriodIndex
  );

}


function renderDashboard(index) {

  const currentPeriod =
    dashboardData.periods[index];


  if (!currentPeriod) {
    return;
  }


  currentPeriodIndex =
    index;


  // ---------------------------------------
  // 완료 작업
  // ---------------------------------------

  const completed =
    currentPeriod.completed || [];


  // ---------------------------------------
  // 진행중 작업
  // ---------------------------------------

  const inProgress =
    currentPeriod.inProgress || [];


  // ---------------------------------------
  // 전체 작업
  // ---------------------------------------

  const total =
    completed.length +
    inProgress.length;


  const completedCount =
    completed.length;


  const overallProgress =
    total > 0
      ? Math.round(
          (completedCount / total) * 100
        )
      : 0;


  // ---------------------------------------
  // 전체 작업 수
  // ---------------------------------------

  const totalWorkEl =
    document.getElementById(
      "total-work-count"
    );


  if (totalWorkEl) {

    totalWorkEl.textContent =
      `${total}개`;

  }


  // ---------------------------------------
  // 전체 진행률
  // ---------------------------------------

  const progressText =
    document.getElementById(
      "overall-progress-text"
    );


  const progressBar =
    document.getElementById(
      "overall-progress-bar"
    );


  const progressCount =
    document.getElementById(
      "overall-progress-count"
    );


  if (progressText) {

    progressText.textContent =
      `${overallProgress}%`;

  }


  if (progressBar) {

    progressBar.style.width =
      `${overallProgress}%`;

  }


  if (progressCount) {

    progressCount.textContent =
      `${completedCount} / ${total} 완료`;

  }


  // ---------------------------------------
  // 완료 작업 수
  // ---------------------------------------

  const completedCountEl =
    document.getElementById(
      "completed-count"
    );


  if (completedCountEl) {

    completedCountEl.textContent =
      `${completed.length}개`;

  }


  // ---------------------------------------
  // 진행중 작업 수
  // ---------------------------------------

  const inProgressCountEl =
    document.getElementById(
      "inprogress-count"
    );


  if (inProgressCountEl) {

    inProgressCountEl.textContent =
      `${inProgress.length}개`;

  }


  // ---------------------------------------
  // 리스트
  // ---------------------------------------

  renderCompletedList(
    completed
  );


  renderInProgressList(
    inProgress
  );

}


// =========================================
// 완료 작업 출력
// =========================================

function renderCompletedList(
  completed
) {

  const list =
    document.getElementById(
      "completed-list"
    );


  if (!list) {
    return;
  }


  const search =
    getSearchValue();


  const filtered =
    completed.filter(item => {

      return item
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    });


  // 진행중 필터면 완료 작업 숨김
  if (
    currentFilter ===
    "progress"
  ) {

    list.innerHTML = "";

    return;

  }


  if (filtered.length === 0) {

    list.innerHTML =
      `<li class="empty">
        ${search
          ? "검색 결과가 없습니다."
          : "완료된 작업이 없습니다."
        }
      </li>`;

    return;
  }


  list.innerHTML =
    filtered
      .map(item => {

        return `

          <li class="completed-item">

            <span class="completed-check">
              ✓
            </span>

            <span class="completed-name">
              ${escapeHtml(item)}
            </span>

          </li>

        `;

      })
      .join("");

}


// =========================================
// 진행중 작업 출력
// =========================================

function renderInProgressList(
  inProgress
) {

  const list =
    document.getElementById(
      "inprogress-list"
    );


  if (!list) {
    return;
  }


  const search =
    getSearchValue();


  const filtered =
    inProgress.filter(item => {

      return item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    });


  // 완료 필터면 숨김
  if (
    currentFilter ===
    "completed"
  ) {

    list.innerHTML = "";

    return;

  }


  if (filtered.length === 0) {

    list.innerHTML =
      `<li class="empty">
        ${search
          ? "검색 결과가 없습니다."
          : "진행 중인 작업이 없습니다."
        }
      </li>`;

    return;
  }


  list.innerHTML =
    filtered
      .map(item => {

        const detail =
          item.detail ||
          `현재 진행률 ${item.percent}%`;


        const percent =
          Math.max(
            0,
            Math.min(
              100,
              Number(item.percent) || 0
            )
          );


        return `

          <li
            class="progress-item"
            data-name="${escapeHtml(item.name)}"
          >

            <div class="progress-main">

              <div class="progress-left">

                <span class="expand-icon">
                  ▶
                </span>

                <span class="progress-name">
                  ${escapeHtml(item.name)}
                </span>

              </div>


              <span class="percent">
                ${percent}%
              </span>

            </div>


            <div class="item-progress">

              <div
                class="item-progress-fill"
                style="width: ${percent}%"
              ></div>

            </div>


            <div class="progress-detail">

              ${escapeHtml(detail)}

            </div>

          </li>

        `;

      })
      .join("");


  // ---------------------------------------
  // 아코디언 클릭
  // ---------------------------------------

  const items =
    list.querySelectorAll(
      ".progress-item"
    );


  items.forEach(item => {

    item.addEventListener(
      "click",
      () => {

        item.classList.toggle(
          "active"
        );

      }
    );

  });

}


// =========================================
// 검색
// =========================================

function initSearch() {

  const searchInput =
    document.getElementById(
      "task-search"
    );


  if (!searchInput) {
    return;
  }


  searchInput.addEventListener(
    "input",
    () => {

      renderDashboard(
        currentPeriodIndex
      );

    }
  );

}


function getSearchValue() {

  const input =
    document.getElementById(
      "task-search"
    );


  if (!input) {
    return "";
  }


  return input.value.trim();

}


// =========================================
// 필터
// =========================================

function initFilters() {

  const buttons =
    document.querySelectorAll(
      ".filter-button"
    );


  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        currentFilter =
          button.dataset.filter;


        buttons.forEach(btn => {

          btn.classList.remove(
            "active"
          );

        });


        button.classList.add(
          "active"
        );


        renderDashboard(
          currentPeriodIndex
        );

      }
    );

  });

}


// =========================================
// 급여 기간 선택
// =========================================

function initSalarySelect() {

  const select =
    document.getElementById(
      "salary-period-select"
    );


  if (!select) {
    return;
  }


  select.innerHTML =
    dashboardData.periods
      .map((item, index) => {

        const status =
          item.isCurrent
            ? "진행 중"
            : "정산 완료";


        return `

          <option value="${index}">
            ${item.period} · ${status}
          </option>

        `;

      })
      .join("");


  select.value =
    currentPeriodIndex;


  select.addEventListener(
    "change",
    event => {

      const index =
        Number(event.target.value);


      renderSalary(index);

    }
  );

}


// =========================================
// 급여 출력
// =========================================

function renderSalary(index) {

  const period =
    dashboardData.periods[index];


  if (!period) {
    return;
  }


  const completedCount =
    period.completed.length;


  const bonus =
    completedCount *
    PRICE_PER_MODEL;


  const total =
    BASE_SALARY +
    bonus;


  // ---------------------------------------
  // 메인 금액
  // ---------------------------------------

  setText(
    "salary-amount",
    formatWon(total)
  );


  setText(
    "salary-period",
    `기간: ${period.period}`
  );


  // ---------------------------------------
  // 선택 기간 설명
  // ---------------------------------------

  setText(
    "salary-period-note",
    period.note || ""
  );


  // ---------------------------------------
  // 상세
  // ---------------------------------------

  setText(
    "salary-base",
    formatWon(BASE_SALARY)
  );


  setText(
    "salary-work-count",
    `${completedCount}개`
  );


  setText(
    "salary-bonus",
    formatWon(bonus)
  );


  setText(
    "salary-total",
    formatWon(total)
  );


  // ---------------------------------------
  // 상태
  // ---------------------------------------

  const statusIcon =
    document.getElementById(
      "salary-status-icon"
    );


  const statusTitle =
    document.getElementById(
      "salary-status-title"
    );


  const statusDescription =
    document.getElementById(
      "salary-status-description"
    );


  if (period.isCurrent) {

    if (statusIcon) {
      statusIcon.textContent = "🟢";
    }


    if (statusTitle) {
      statusTitle.textContent =
        "진행 중인 정산";
    }


    if (statusDescription) {
      statusDescription.textContent =
        "현재 작업에 따라 급여가 계속 변경될 수 있습니다.";
    }

  }

  else {

    if (statusIcon) {
      statusIcon.textContent = "✓";
    }


    if (statusTitle) {
      statusTitle.textContent =
        "정산 완료";
    }


    if (statusDescription) {
      statusDescription.textContent =
        "해당 정산 기간의 작업이 완료되었습니다.";
    }

  }

}


// =========================================
// Chart.js
// =========================================

function initCharts() {

  if (
    typeof Chart ===
    "undefined"
  ) {

    console.warn(
      "Chart.js를 불러오지 못했습니다."
    );

    return;

  }


  createSalaryChart();

  createCompletedChart();

  updateChartStats();

}


// =========================================
// 급여 차트
// =========================================

function createSalaryChart() {

  const canvas =
    document.getElementById(
      "salary-chart"
    );


  if (!canvas) {
    return;
  }


  const periods =
    [...dashboardData.periods]
      .reverse();


  const labels =
    periods.map(
      item => item.period
    );


  const salaryData =
    periods.map(
      item => item.salary
    );


  if (salaryChart) {

    salaryChart.destroy();

  }


  salaryChart =
    new Chart(
      canvas,
      {

        type: "line",


        data: {

          labels,

          datasets: [

            {

              label: "급여",

              data: salaryData,

              borderWidth: 2,

              tension: 0.35,

              pointRadius: 5,

              pointHoverRadius: 7,

              fill: true,

              backgroundColor:
                "rgba(255,255,255,0.08)",

              borderColor:
                "#ffffff",

              pointBackgroundColor:
                "#ffffff"

            }

          ]

        },


        options: {

          responsive: true,

          maintainAspectRatio: false,


          interaction: {

            intersect: false,

            mode: "index"

          },


          plugins: {

            legend: {

              display: false

            },


            tooltip: {

              backgroundColor:
                "rgba(20,20,25,0.92)",

              borderColor:
                "rgba(255,255,255,0.15)",

              borderWidth: 1,

              padding: 12,

              callbacks: {

                label: context => {

                  return ` ${formatWon(context.raw)}`;

                }

              }

            }

          },


          scales: {

            x: {

              grid: {

                color:
                  "rgba(255,255,255,0.06)"

              },

              ticks: {

                color: "#929eaa",

                maxRotation: 0

              }

            },


            y: {

              beginAtZero: true,

              grid: {

                color:
                  "rgba(255,255,255,0.06)"

              },

              ticks: {

                color: "#929eaa",

                callback: value => {

                  return `${Number(value).toLocaleString()}원`;

                }

              }

            }

          }

        }

      }
    );

}


// =========================================
// 완료 작업 차트
// =========================================

function createCompletedChart() {

  const canvas =
    document.getElementById(
      "completed-chart"
    );


  if (!canvas) {
    return;
  }


  const periods =
    [...dashboardData.periods]
      .reverse();


  const labels =
    periods.map(
      item => item.period
    );


  const completedData =
    periods.map(
      item =>
        item.completed.length
    );


  if (completedChart) {

    completedChart.destroy();

  }


  completedChart =
    new Chart(
      canvas,
      {

        type: "bar",


        data: {

          labels,

          datasets: [

            {

              label: "완료 작업",

              data: completedData,

              borderRadius: 8,

              backgroundColor:
                "rgba(74,222,128,0.65)",

              borderColor:
                "rgba(74,222,128,0.9)",

              borderWidth: 1

            }

          ]

        },


        options: {

          responsive: true,

          maintainAspectRatio: false,


          plugins: {

            legend: {

              display: false

            },


            tooltip: {

              backgroundColor:
                "rgba(20,20,25,0.92)",

              padding: 12,

              callbacks: {

                label: context => {

                  return ` ${context.raw}개`;

                }

              }

            }

          },


          scales: {

            x: {

              grid: {

                display: false

              },

              ticks: {

                color: "#929eaa",

                maxRotation: 0

              }

            },


            y: {

              beginAtZero: true,

              ticks: {

                color: "#929eaa",

                precision: 0

              },

              grid: {

                color:
                  "rgba(255,255,255,0.06)"

              }

            }

          }

        }

      }
    );

}


// =========================================
// 차트 통계
// =========================================

function updateChartStats() {

  const totalCompleted =
    dashboardData.periods.reduce(
      (total, period) =>
        total +
        period.completed.length,
      0
    );


  const totalSalary =
    dashboardData.periods.reduce(
      (total, period) =>
        total +
        period.salary,
      0
    );


  const averageSalary =
    dashboardData.periods.length > 0
      ? Math.round(
          totalSalary /
          dashboardData.periods.length
        )
      : 0;


  setText(
    "chart-total-completed",
    `${totalCompleted}개`
  );


  setText(
    "chart-average-salary",
    formatWon(averageSalary)
  );

}


// =========================================
// D-Day
// =========================================

function updateDday(payday) {

  const today =
    new Date();


  let targetDate =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      payday
    );


  if (
    today.getDate() >
    payday
  ) {

    targetDate.setMonth(
      targetDate.getMonth() + 1
    );

  }


  const diffTime =
    targetDate -
    today;


  const diffDays =
    Math.ceil(
      diffTime /
      (1000 * 60 * 60 * 24)
    );


  const ddayEl =
    document.getElementById(
      "dday"
    );


  if (!ddayEl) {
    return;
  }


  if (diffDays <= 0) {

    ddayEl.textContent =
      "D-Day";

  }

  else {

    ddayEl.textContent =
      `D-${String(diffDays).padStart(2, "0")}`;

  }

}


// =========================================
// 유틸
// =========================================

function formatWon(value) {

  return `${Number(value).toLocaleString()}원`;

}


function setText(
  id,
  text
) {

  const element =
    document.getElementById(id);


  if (element) {

    element.textContent =
      text;

  }

}


// =========================================
// XSS 방지
// =========================================

function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

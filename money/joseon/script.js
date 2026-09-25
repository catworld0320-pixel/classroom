import dashboardData from './model.js';

document.addEventListener("DOMContentLoaded", () => {
  initPeriodSelect();
  updateDday(dashboardData.payday);
  renderDashboard(0);
});


// ==================================================
// 정산 기간 선택
// ==================================================
function initPeriodSelect() {
  const selectEl = document.getElementById("period-select");
  if (!selectEl) return;

  selectEl.innerHTML = dashboardData.periods
    .map((item, index) => {
      const isCurrent = index === 0
        ? " (진행 중)"
        : " (정산 완료)";

      return `
        <option value="${index}">
          ${item.period}${isCurrent}
        </option>
      `;
    })
    .join("");

  selectEl.addEventListener("change", (e) => {
    const selectedIndex = parseInt(e.target.value, 10);

    if (!Number.isNaN(selectedIndex)) {
      renderDashboard(selectedIndex);
    }
  });
}


// ==================================================
// 대시보드 출력
// ==================================================
function renderDashboard(index) {
  const currentPeriod = dashboardData.periods[index];

  if (!currentPeriod) return;


  // ==================================================
  // 급여
  // ==================================================
  const salaryEl = document.getElementById("salary-amount");
  const periodEl = document.getElementById("salary-period");

  if (salaryEl) {
    salaryEl.textContent = currentPeriod.salary;
  }

  if (periodEl) {
    const noteText = currentPeriod.note
      ? ` (${currentPeriod.note})`
      : "";

    periodEl.textContent =
      `기간: ${currentPeriod.period}${noteText}`;
  }


  // ==================================================
  // 완료된 작업
  // ==================================================
  const completedCountEl =
    document.getElementById("completed-count");

  const completedListEl =
    document.getElementById("completed-list");

  const completed =
    Array.isArray(currentPeriod.completed)
      ? currentPeriod.completed
      : [];


  if (completedCountEl) {
    completedCountEl.textContent =
      `${completed.length}개`;
  }


  if (completedListEl) {

    if (completed.length === 0) {

      completedListEl.innerHTML = `
        <li class="empty">
          완료된 작업이 없습니다.
        </li>
      `;

    } else {

      completedListEl.innerHTML = completed
        .map(item => `
          <li class="completed-item">
            <span>${item}</span>
          </li>
        `)
        .join("");
    }
  }


  // ==================================================
  // 진행 중인 작업
  // ==================================================
  const inProgressCountEl =
    document.getElementById("inprogress-count");

  const inProgressListEl =
    document.getElementById("inprogress-list");

  const inProgress =
    Array.isArray(currentPeriod.inProgress)
      ? currentPeriod.inProgress
      : [];


  if (inProgressCountEl) {
    inProgressCountEl.textContent =
      `${inProgress.length}개`;
  }


  if (inProgressListEl) {

    if (inProgress.length === 0) {

      inProgressListEl.innerHTML = `
        <li class="empty">
          진행 중인 작업이 없습니다.
        </li>
      `;

      return;
    }


    // ------------------------------------------
    // 진행 중인 작업 박스 생성
    // ------------------------------------------
    inProgressListEl.innerHTML = inProgress
      .map(item => `
        <li class="progress-item">

          <div class="progress-main">
            <span class="progress-name">
              ${item.name}
            </span>

            <span class="percent">
              ${item.percent}%
            </span>
          </div>

          <div class="progress-detail">
            <span>
              ${item.detail || `현재 진행률 ${item.percent}%`}
            </span>
          </div>

        </li>
      `)
      .join("");


    // ------------------------------------------
    // 클릭했을 때만 상세 내용 표시
    // ------------------------------------------
    const progressItems =
      inProgressListEl.querySelectorAll(".progress-item");


    progressItems.forEach(item => {

      item.addEventListener("click", () => {

        item.classList.toggle("active");

      });

    });
  }
}


// ==================================================
// D-Day
// ==================================================
function updateDday(payday) {

  const today = new Date();

  let targetDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    payday
  );


  if (today.getDate() > payday) {
    targetDate.setMonth(
      targetDate.getMonth() + 1
    );
  }


  const diffTime =
    targetDate.getTime() - today.getTime();

  const diffDays =
    Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );


  const ddayEl =
    document.getElementById("dday");


  if (ddayEl) {

    ddayEl.textContent =
      diffDays === 0
        ? "D-Day"
        : `D-${String(diffDays).padStart(2, "0")}`;

  }
}

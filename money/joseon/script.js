import dashboardData from './model.js';

document.addEventListener("DOMContentLoaded", () => {
  initPeriodSelect();
  updateDday(dashboardData.payday);
  renderDashboard(0); // 기본값: 가장 최근 진행 중인 정산 기간 (index 0)
});

// 정산 기간 선택 드롭다운 초기화
function initPeriodSelect() {
  const selectEl = document.getElementById("period-select");
  if (!selectEl) return;

  selectEl.innerHTML = dashboardData.periods
    .map((item, index) => {
      const isCurrent = index === 0 ? " (진행 중)" : " (정산 완료)";
      return `<option value="${index}">${item.period}${isCurrent}</option>`;
    })
    .join("");

  selectEl.addEventListener("change", (e) => {
    const selectedIndex = parseInt(e.target.value, 10);
    renderDashboard(selectedIndex);
  });
}

// 선택된 기간의 데이터를 화면에 출력
function renderDashboard(index) {
  const currentPeriod = dashboardData.periods[index];
  if (!currentPeriod) return;

  // 1. 해당 구간 급여 및 상태 노출
  const salaryEl = document.getElementById("salary-amount");
  const periodEl = document.getElementById("salary-period");

  if (salaryEl) salaryEl.textContent = currentPeriod.salary;
  if (periodEl) {
    const noteText = currentPeriod.note ? ` (${currentPeriod.note})` : '';
    periodEl.textContent = `기간: ${currentPeriod.period}${noteText}`;
  }

  // 2. 완료된 작업 연동
  const completedCountEl = document.getElementById("completed-count");
  const completedListEl = document.getElementById("completed-list");

  if (completedCountEl) {
    completedCountEl.textContent = `${currentPeriod.completed.length}개`;
  }
  if (completedListEl) {
    if (currentPeriod.completed.length === 0) {
      completedListEl.innerHTML = `<li class="empty">완료된 작업이 없습니다.</li>`;
    } else {
      completedListEl.innerHTML = currentPeriod.completed
        .map(item => `<li><span>${item}</span></li>`)
        .join("");
    }
  }

  // 3. 진행 중인 작업 연동
  const inProgressCountEl = document.getElementById("inprogress-count");
  const inProgressListEl = document.getElementById("inprogress-list");

  if (inProgressCountEl) {
    inProgressCountEl.textContent = `${currentPeriod.inProgress.length}개`;
  }
  if (inProgressListEl) {
    if (currentPeriod.inProgress.length === 0) {
      inProgressListEl.innerHTML = `<li class="empty">진행 중인 작업이 없습니다.</li>`;
    } else {
      inProgressListEl.innerHTML = currentPeriod.inProgress
        .map(
          item => `
          <li class="progress-item">
            <span>${item.name}</span>
            <span class="percent">${item.percent}%</span>
          </li>
        `
        )
        .join("");
    }
  }
}

// D-Day 계산
function updateDday(payday) {
  const today = new Date();
  let targetDate = new Date(today.getFullYear(), today.getMonth(), payday);

  if (today.getDate() > payday) {
    targetDate.setMonth(targetDate.getMonth() + 1);
  }

  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const ddayEl = document.getElementById("dday");
  if (ddayEl) {
    ddayEl.textContent = diffDays === 0 ? "D-Day" : `D-${String(diffDays).padStart(2, '0')}`;
  }
}

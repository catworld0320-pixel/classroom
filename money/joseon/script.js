document.addEventListener('DOMContentLoaded', () => {
  const periods = dashboardData.periods || [];
  let selectedIndex = 0;

  // 1. 매달 24일 기준 D-Day 계산
  function calculateDday(targetDay) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    let targetDate = new Date(currentYear, currentMonth, targetDay);

    if (today.getDate() > targetDay) {
      targetDate = new Date(currentYear, currentMonth + 1, targetDay);
    }

    const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = targetDate - todayReset;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const ddayText = document.getElementById('dday-text');
    if (diffDays === 0) {
      ddayText.innerText = 'D-Day (오늘!)';
      ddayText.style.color = 'var(--accent-green)';
    } else {
      ddayText.innerText = `D-${diffDays}`;
      ddayText.style.color = 'var(--accent-color)';
    }
  }
  function initTabs() {
    const container = document.getElementById('tab-container');
    container.innerHTML = '';
    periods.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
      btn.innerText = item.period;
      btn.addEventListener('click', () => selectTab(index));
      container.appendChild(btn);
    });
    const salaryTabBtn = document.createElement('button');
    salaryTabBtn.className = 'tab-btn highlight';
    salaryTabBtn.innerText = '📊 급여 내역 전체보기';
    salaryTabBtn.addEventListener('click', () => selectSalaryTab());
    container.appendChild(salaryTabBtn);
  }

  // 3. 특정 날짜 구간 선택 시 렌더링
  function selectTab(index) {
    selectedIndex = index;
    const data = periods[index];

    // 탭 버튼 active 클래스 처리
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn, idx) => {
      if (idx === index) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // 화면 패널 전환
    document.getElementById('tab-tasks').classList.add('active');
    document.getElementById('tab-salary').classList.remove('active');

    // 상단 카드 정보 업데이트
    document.getElementById('card-period-salary').innerText = data.salary || '데이터 없음';
    document.getElementById('card-period-label').innerText = `기간: ${data.period}`;

    // 1) 완료한 작업 렌더링
    const completedList = document.getElementById('completed-list');
    completedList.innerHTML = '';
    if (data.completed && data.completed.length > 0) {
      data.completed.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="item-title">✓ ${task}</span>`;
        completedList.appendChild(li);
      });
      document.getElementById('completed-count').innerText = `${data.completed.length}개`;
    } else {
      completedList.innerHTML = `<div class="no-data">등록된 완료 작업이 없습니다.</div>`;
      document.getElementById('completed-count').innerText = `0개`;
    }

    // 2) 진행 중인 작업 렌더링
    const progressList = document.getElementById('progress-list');
    progressList.innerHTML = '';
    if (data.inProgress && data.inProgress.length > 0) {
      data.inProgress.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="progress-info">
            <span class="item-title">${task.name}</span>
            <span>${task.percent}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${task.percent}%;"></div>
          </div>
        `;
        progressList.appendChild(li);
      });
      document.getElementById('in-progress-count').innerText = `${data.inProgress.length}개`;
    } else {
      progressList.innerHTML = `<div class="no-data">등록된 진행 중 작업이 없습니다.</div>`;
      document.getElementById('in-progress-count').innerText = `0개`;
    }
  }

  // 4. 급여 전체보기 탭 선택 시
  function selectSalaryTab() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn, idx) => {
      if (idx === buttons.length - 1) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    document.getElementById('tab-tasks').classList.remove('active');
    document.getElementById('tab-salary').classList.add('active');

    const salaryGrid = document.getElementById('salary-grid');
    salaryGrid.innerHTML = '';

    periods.forEach((item) => {
      const box = document.createElement('div');
      box.className = 'salary-box';
      box.innerHTML = `
        <span class="box-label">📅 ${item.period}</span>
        <span class="box-value">${item.salary || '데이터 없음'}</span>
        <span class="box-note">${item.note || ''}</span>
      `;
      salaryGrid.appendChild(box);
    });
  }

  // 초기 실행
  calculateDday(dashboardData.payday || 24);
  initTabs();
  if (periods.length > 0) selectTab(0);
});
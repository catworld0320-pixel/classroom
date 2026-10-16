/* =====================================================
   JBN — script.js
   ===================================================== */
(function () {
  'use strict';

  /* ---------- 편성표 데이터 (여기서 수정하세요) ---------- */
  const SCHEDULE = {
    tv: [
      { start: '17:00', end: '18:00', name: 'JBN 뉴스 12', genre: '보도 프로그램' },
      { start: '18:00', end: '19:00', name: '시사 토크 오늘', genre: '시사/교양' },
      { start: '19:00', end: '20:00', name: '글로벌 리포트', genre: '다큐멘터리' },
      { start: '20:00', end: '21:00', name: 'JBN 뉴스24', genre: '보도 프로그램' },
      { start: '21:00', end: '22:00', name: '주간 이슈 분석', genre: '시사/교양' },
      { start: '22:00', end: '23:00', name: '라디오 스테이션 (TV)', genre: '예능/음악' }
    ],
    radio: [
      { start: '17:00', end: '18:00', name: '퇴근길 라디오', genre: '음악/토크' },
      { start: '18:00', end: '19:00', name: '저녁 뉴스 라이브', genre: '보도' },
      { start: '19:00', end: '20:00', name: '오늘의 클래식', genre: '음악' },
      { start: '20:00', end: '21:00', name: '시사 인사이드', genre: '시사/교양' },
      { start: '21:00', end: '22:00', name: '사연 라디오', genre: '청취자 참여' },
      { start: '22:00', end: '23:00', name: '라디오 스테이션', genre: '음악/토크' }
    ]
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------- 이미지 로드 실패 시 그라데이션 플레이스홀더 유지 ---------- */
  $$('.ph img').forEach(img => {
    img.addEventListener('error', () => img.remove());
  });
  const heroSlides = $$('.hero-slide');

  /* ---------- 모바일 메뉴 ---------- */
  const menuBtn = $('#menuBtn');
  const gnb = $('#gnb');
  menuBtn.addEventListener('click', () => {
    const open = gnb.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  function closeMenu() {
    gnb.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', '메뉴 열기');
  }

  /* ---------- 내비게이션 활성 표시 ---------- */
  const navLinks = $$('.gnb a');
  navLinks.forEach(a => a.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    a.classList.add('active');
    closeMenu();
    if (a.dataset.tabLink) setTab(a.dataset.tabLink);
  }));

  const spy = [
    ['#news', '뉴스'], ['#programs', '프로그램'], ['#schedule', '라디오']
  ];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const href = '#' + e.target.id;
        const link = navLinks.find(l => l.getAttribute('href') === href && !l.dataset.tabLink)
                  || (href === '#schedule' ? null : null);
        if (link) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    ['news', 'programs'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- 검색 ---------- */
  const searchForm = $('#searchForm');
  const searchInput = $('#searchInput');
  const searchables = $$('.news-main h3, .news-list h4, .prog-list h4, .schedule .name');

  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const q = searchInput.value.trim().toLowerCase();
    $$('.search-hit').forEach(el => el.classList.remove('search-hit'));
    if (!q) { showToast('검색어를 입력해 주세요.'); searchInput.focus(); return; }

    const hits = searchables.filter(el => el.textContent.toLowerCase().includes(q));
    if (!hits.length) { showToast(`‘${searchInput.value.trim()}’에 대한 검색 결과가 없습니다.`); return; }

    hits.forEach(el => el.classList.add('search-hit'));
    hits[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`‘${searchInput.value.trim()}’ 검색 결과 ${hits.length}건`);
    setTimeout(() => hits.forEach(el => el.classList.remove('search-hit')), 4000);
  });
  const style = document.createElement('style');
  style.textContent = '.search-hit{background:#ECE6FA;box-shadow:0 0 0 4px #ECE6FA;border-radius:3px}';
  document.head.appendChild(style);

  /* ---------- 히어로 슬라이드 ---------- */
  const SLIDES = [
    { eyebrow: '대한민국의 오늘, JBN이 함께합니다', title: '오늘을 전하고,<br>내일을 잇다', btn: '뉴스 바로가기', href: '#news' },
    { eyebrow: '지금 가장 빠른 소식', title: '현장의 목소리를,<br>있는 그대로', btn: '실시간 방송 보기', href: '#hero-live' },
    { eyebrow: '하루의 끝을 함께', title: '당신의 밤을 채우는<br>라디오 스테이션', btn: '편성표 보기', href: '#schedule' }
  ];
  const dots = $$('#heroDots button');
  const eyebrow = $('.hero-eyebrow');
  const title = $('.hero-title');
  const heroBtn = $('.hero-copy .btn-primary');
  const heroBtnLabel = heroBtn.firstChild;
  let cur = 0, timer;

  function goSlide(i) {
    cur = (i + SLIDES.length) % SLIDES.length;
    const s = SLIDES[cur];
    eyebrow.textContent = s.eyebrow;
    title.innerHTML = s.title;
    heroBtnLabel.textContent = s.btn + ' ';
    heroBtn.setAttribute('href', s.href);
    heroSlides.forEach((el, n) => el.classList.toggle('active', n === cur));
    dots.forEach((d, n) => {
      d.classList.toggle('active', n === cur);
      d.setAttribute('aria-selected', String(n === cur));
    });
  }
  function startAuto() {
    clearInterval(timer);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => goSlide(cur + 1), 6000);
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { goSlide(i); startAuto(); }));
  goSlide(0); startAuto();

  /* ---------- 라이브 시청 버튼 ---------- */
  $('#liveBtn').addEventListener('click', () => {
    showToast('실시간 방송 플레이어는 연결 주소를 설정하면 새 창으로 열립니다.');
  });

  /* ---------- 편성표 ---------- */
  const list = $('#scheduleList');
  const tabs = $$('.tab');
  let currentTab = 'tv';

  const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

  function render() {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const items = SCHEDULE[currentTab];
    // 현재 시각에 맞는 프로그램이 없으면(심야 등) 20:00 프로그램을 데모로 강조
    let onIdx = items.findIndex(p => nowMin >= toMin(p.start) && nowMin < toMin(p.end));
    if (onIdx === -1) onIdx = items.findIndex(p => p.start === '20:00');

    list.innerHTML = items.map((p, i) => `
      <li class="${i === onIdx ? 'on' : ''}">
        <span class="time">${p.start}</span>
        <div class="info">
          <p class="name">${p.name}</p>
          <p class="genre">${p.genre}</p>
        </div>
        ${i === onIdx ? '<span class="on-air-chip">ON AIR</span>' : ''}
      </li>`).join('');
  }

  function setTab(name) {
    currentTab = name;
    tabs.forEach(t => {
      const active = t.dataset.tab === name;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
    render();
  }
  tabs.forEach(t => t.addEventListener('click', () => setTab(t.dataset.tab)));
  render();
  setInterval(render, 60 * 1000);

  /* ---------- 더보기 / 전체보기 안내 ---------- */
  $$('.more').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    showToast('해당 페이지는 준비 중입니다.');
  }));
  $$('.news-list a, .news-main-link, .prog-list a, .f-links a, .social a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      showToast('해당 페이지는 준비 중입니다.');
    });
  });
})();

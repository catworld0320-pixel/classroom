// 지원할 확장자 목록
const SUPPORTED_EXTS = ["jpg", "png", "jpeg", "bmp", "webp"];

/**
 * 1장 단위의 이미지 확장자를 순차 탐색
 * @returns {Promise<boolean>} 로드 성공 여부 반환
 */
function loadImageAutoExt(imgElement, basePath) {
  return new Promise((resolve) => {
    let extIndex = 0;

    function tryNextExtension() {
      if (extIndex < SUPPORTED_EXTS.length) {
        const ext = SUPPORTED_EXTS[extIndex];
        extIndex++;
        imgElement.src = `${basePath}.${ext}`;
      } else {
        // 모든 확장자 탐색 실패 시 (해당 번호의 이미지가 없음)
        imgElement.onerror = null;
        resolve(false);
      }
    }

    imgElement.onload = () => resolve(true);
    imgElement.onerror = tryNextExtension;

    tryNextExtension();
  });
}

// 1. 웹툰 데이터 설정
const WEBTOON_DATA = [
  {
    id: "한요일",
    title: "오늘의 한요일은 여자다",
    author: "송극장",
    description: "학폭 가해자라는 치명적인 누명을 쓰고 아이돌을 꿈꾸는 김상현. 어느 날 찾아온 대형 기획사 실장의 제안으로 '전생의 모습으로 바꿔주는 약'을 사용하게 되는데,  변신한 거울 속 전생의 모습은 엄청난 미인.. 그런데 여자? 과연 남자라는 정체를 들키지 않고 연습생들 무리에서 살아남을 수 있을까?",
    // 제목 폴더 바로 아래 1.jpg를 웹툰 대표 프로필로 사용
    profileImg: `webtoons/한요일/1.${EXT}`,
    episodes: [
      {
        id: 1,
        title: "1화-어제의 나는 김상현(1)",
        folder: "1화",
        cutCount: 3 // 본문 컷 수 (2.jpg, 3.jpg, 4.jpg 총 3장 출력)
      },
      {
        id: 2,
        title: "2화-어제의 나는 김상현(2)",
        folder: "2화",
        cutCount: 2 // 본문 컷 수 (2.jpg, 3.jpg 총 2장 출력)
      }
    ]
  }
];

// 현재 상태
const state = {
  currentView: "HOME",
  selectedWebtoonId: null,
  selectedEpisodeId: null
};

const appContainer = document.getElementById("app");

function render() {
  appContainer.innerHTML = "";

  const header = document.createElement("header");
  header.innerHTML = `<div class="logo">NAVER 웹툰</div>`;
  header.querySelector(".logo").addEventListener("click", goHome);
  appContainer.appendChild(header);

  const container = document.createElement("div");
  container.className = "container";

  if (state.currentView === "HOME") {
    container.appendChild(createHomeView());
  } else if (state.currentView === "DETAIL") {
    container.appendChild(createDetailView());
  } else if (state.currentView === "VIEWER") {
    container.appendChild(createViewerPage());
  }

  appContainer.appendChild(container);
}

function goHome() {
  state.currentView = "HOME";
  state.selectedWebtoonId = null;
  state.selectedEpisodeId = null;
  render();
}

function openDetail(webtoonId) {
  state.currentView = "DETAIL";
  state.selectedWebtoonId = webtoonId;
  render();
}

function openViewer(webtoonId, episodeId) {
  state.currentView = "VIEWER";
  state.selectedWebtoonId = webtoonId;
  state.selectedEpisodeId = episodeId;
  render();
  window.scrollTo(0, 0);
}

// [홈 화면] (1번 이미지를 프로필로 사용)
function createHomeView() {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<h3>수요웹툰</h3>`;
  
  const grid = document.createElement("div");
  grid.className = "webtoon-grid";

  WEBTOON_DATA.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    
    const img = document.createElement("img");
    img.alt = item.title;
    loadImageAutoExt(img, `webtoons/${item.id}/1`);

    const titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = item.title;

    const authorDiv = document.createElement("div");
    authorDiv.className = "author";
    authorDiv.textContent = item.author;

    card.appendChild(img);
    card.appendChild(titleDiv);
    card.appendChild(authorDiv);
    
    card.addEventListener("click", () => openDetail(item.id));
    grid.appendChild(card);
  });

  wrapper.appendChild(grid);
  return wrapper;
}

// [상세 페이지] (1번 이미지를 회차 썸네일로 사용)
function createDetailView() {
  const webtoon = WEBTOON_DATA.find((w) => w.id === state.selectedWebtoonId);
  const wrapper = document.createElement("div");

  const headerDiv = document.createElement("div");
  headerDiv.className = "detail-header";

  const profileImg = document.createElement("img");
  profileImg.className = "detail-thumb";
  loadImageAutoExt(profileImg, `webtoons/${webtoon.id}/1`);

  const infoDiv = document.createElement("div");
  infoDiv.className = "detail-info";
  infoDiv.innerHTML = `
    <h2>${webtoon.title}</h2>
    <div class="author-name">${webtoon.author}</div>
    <p class="desc">${webtoon.description}</p>
  `;

  headerDiv.appendChild(profileImg);
  headerDiv.appendChild(infoDiv);
  wrapper.appendChild(headerDiv);

  const epList = document.createElement("ul");
  epList.className = "episode-list";

  webtoon.episodes.forEach((ep) => {
    const li = document.createElement("li");
    li.className = "episode-item";

    const epThumbImg = document.createElement("img");
    epThumbImg.className = "ep-thumb";
    loadImageAutoExt(epThumbImg, `webtoons/${webtoon.id}/${ep.folder}/1`);

    const titleSpan = document.createElement("span");
    titleSpan.className = "ep-title";
    titleSpan.textContent = ep.title;

    li.appendChild(epThumbImg);
    li.appendChild(titleSpan);
    li.addEventListener("click", () => openViewer(webtoon.id, ep.id));
    epList.appendChild(li);
  });

  wrapper.appendChild(epList);
  return wrapper;
}

// [웹툰 뷰어] (2번 이미지부터 더 이상 이미지가 없을 때까지 무제한 연달아 로드)
function createViewerPage() {
  const webtoon = WEBTOON_DATA.find((w) => w.id === state.selectedWebtoonId);
  const epIndex = webtoon.episodes.findIndex((e) => e.id === state.selectedEpisodeId);
  const episode = webtoon.episodes[epIndex];

  const prevEp = webtoon.episodes[epIndex - 1];
  const nextEp = webtoon.episodes[epIndex + 1];

  const wrapper = document.createElement("div");

  // 상단 헤더
  const viewerBar = document.createElement("div");
  viewerBar.className = "viewer-bar";
  viewerBar.innerHTML = `
    <div><strong>${webtoon.title}</strong> - ${episode.title}</div>
    <div class="viewer-nav">
      <button id="btn-list">목록</button>
      <button id="btn-prev" ${!prevEp ? "disabled" : ""}>이전화</button>
      <button id="btn-next" ${!nextEp ? "disabled" : ""}>다음화</button>
    </div>
  `;

  viewerBar.querySelector("#btn-list").addEventListener("click", () => openDetail(webtoon.id));
  if (prevEp) viewerBar.querySelector("#btn-prev").addEventListener("click", () => openViewer(webtoon.id, prevEp.id));
  if (nextEp) viewerBar.querySelector("#btn-next").addEventListener("click", () => openViewer(webtoon.id, nextEp.id));

  const viewerContent = document.createElement("div");
  viewerContent.className = "viewer-content";

  // 본문 이미지 순차 로드 로직 (2번부터 탐색)
  async function loadEpisodeCuts() {
    let imgIndex = 2; // 1번은 썸네일이므로 2번부터 본문 시작

    while (true) {
      const img = document.createElement("img");
      const basePath = `webtoons/${webtoon.id}/${episode.folder}/${imgIndex}`;
      
      // 이미지 로드 시도
      const isSuccess = await loadImageAutoExt(img, basePath);

      if (isSuccess) {
        viewerContent.appendChild(img); // 성공 시 화면에 추가
        imgIndex++; // 다음 번호로 이동 (3, 4, 5...)
      } else {
        break; // 불러오기 실패 시 회차 끝으로 판단 후 종료
      }
    }
  }

  loadEpisodeCuts();

  // 하단 컨트롤바
  const footerNav = document.createElement("div");
  footerNav.className = "viewer-footer-nav";
  footerNav.innerHTML = `
    <button id="f-btn-prev" ${!prevEp ? "disabled" : ""}>◀ 이전화</button>
    <button id="f-btn-list">목록으로</button>
    <button id="f-btn-next" ${!nextEp ? "disabled" : ""}>다음화 ▶</button>
  `;

  footerNav.querySelector("#f-btn-list").addEventListener("click", () => openDetail(webtoon.id));
  if (prevEp) footerNav.querySelector("#f-btn-prev").addEventListener("click", () => openViewer(webtoon.id, prevEp.id));
  if (nextEp) footerNav.querySelector("#f-btn-next").addEventListener("click", () => openViewer(webtoon.id, nextEp.id));

  wrapper.appendChild(viewerBar);
  wrapper.appendChild(viewerContent);
  wrapper.appendChild(footerNav);

  return wrapper;
}

render();
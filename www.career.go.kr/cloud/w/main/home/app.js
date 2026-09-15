let currentSong = null;
let currentPlaylist = [];
let currentIndexInPlaylist = 0;

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const lyricsScrollBox = document.getElementById('lyrics-scroll-box');

// SVG 회색 픽셀 데이터 (이미지가 없을 때 보여줄 기본 커버)
const fallbackImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><rect width='60' height='60' fill='%23555555'/><text x='50%' y='55%' fill='%23888888' font-size='10' text-anchor='middle'>NO COVER</text></svg>";

window.onload = () => {
    initTheme();
    renderSongList(songDatabase);
    loadMyPlaylist();
};

// 1. 이미지 로드 실패 시 회색 이미지 대체
function handleImageError(imgEl) {
    imgEl.onerror = null; // 무한 루프 방지
    imgEl.src = fallbackImage;
}

// 오디오 로딩 상태 관리를 위한 변수
let isAudioReady = false;

function playSong(song) {
    currentSong = song;
    isAudioReady = false; // 로딩 시작 전 상태 초기화
    
    // 재생 버튼 중복 클릭 방지 및 로딩 표시 (선택사항)
    playBtn.innerText = '⏳'; 

    document.getElementById('player-title').innerText = song.title;
    document.getElementById('player-artist').innerText = song.artist;
    
    const coverEl = document.getElementById('player-cover');
    coverEl.src = encodeURI(song.cover);

    renderFullLyrics(song.lyrics);

    // 이전 이벤트 리스너 제거 후 오디오 경로 설정
    audio.oncanplaythrough = null;
    audio.src = encodeURI(song.src);
    audio.load(); // 오디오 리소스 사전 로딩 강제 진행

    // 음원 데이터가 끝까지 문제없이 로딩된 직후 실행
    audio.oncanplaythrough = () => {
        if (!isAudioReady) {
            isAudioReady = true;
            audio.play();
            playBtn.innerText = '⏸';
        }
    };

    // MediaSession 설정
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            album: 'Genie Web Player',
            artwork: [{ src: song.cover, sizes: '96x96', type: 'image/png' }]
        });
        
        navigator.mediaSession.setActionHandler('play', () => { audio.play(); playBtn.innerText = '⏸'; });
        navigator.mediaSession.setActionHandler('pause', () => { audio.pause(); playBtn.innerText = '▶'; });
        navigator.mediaSession.setActionHandler('previoustrack', () => prevSong());
        navigator.mediaSession.setActionHandler('nexttrack', () => nextSong());
    }
}

// 3. 전체 가사 목록을 화면에 생성
function renderFullLyrics(lyrics) {
    lyricsScrollBox.innerHTML = '';
    
    if (!lyrics || lyrics.length === 0) {
        lyricsScrollBox.innerHTML = '<p class="no-lyric">가사 정보가 없습니다.</p>';
        return;
    }

    lyrics.forEach((item, index) => {
        const p = document.createElement('p');
        p.className = 'lyric-line';
        p.dataset.time = item.time;
        p.dataset.index = index;
        p.innerText = item.text;

        // 가사 클릭 시 해당 시간으로 오디오 위치 이동
        p.onclick = () => seekToLyric(item.time);

        lyricsScrollBox.appendChild(p);
    });
}
function seekToLyric(time) {
    if (!audio.src) return;

    // 해당 가사 시간으로 타임라인 이동
    audio.currentTime = time;

    // 혹시 정지 상태였다면 자동 재생
    if (audio.paused) {
        audio.play();
        playBtn.innerText = '⏸';
    }
}
let animationFrameId = null;

// 오디오 재생 중일 때 초당 ~60번 실행되는 정밀 타이머 루프
function updateLyricLoop() {
    if (!audio.paused && !audio.ended) {
        updateProgressAndLyrics();
        animationFrameId = requestAnimationFrame(updateLyricLoop);
    }
}

// 오디오 상태 변경 이벤트 리스너
audio.onplay = () => {
    cancelAnimationFrame(animationFrameId);
    updateLyricLoop();
};

audio.onpause = () => {
    cancelAnimationFrame(animationFrameId);
};

audio.onseeked = () => {
    updateProgressAndLyrics();
};

// 오디오 사전 로딩이 완료되었으므로 오프셋을 0(또는 필요시 0.02 내외)으로 설정
const LYRIC_OFFSET = 0; 

function updateProgressAndLyrics() {
    if (!audio.duration) return;

    // 1. 프로그레스 바 & 시간 표기
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    document.getElementById('time-display').innerText = 
        `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;

    // 2. 가사 스크롤 처리
    if (currentSong && currentSong.lyrics && currentSong.lyrics.length > 0) {
        const lyricLines = lyricsScrollBox.querySelectorAll('.lyric-line');
        let activeIndex = -1;

        // 보정 없이 현재 오디오 시간 그대로 비교
        const currentTime = audio.currentTime + LYRIC_OFFSET;

        currentSong.lyrics.forEach((lyric, idx) => {
            if (currentTime >= lyric.time) {
                activeIndex = idx;
            }
        });

        lyricLines.forEach((line, idx) => {
            if (idx === activeIndex) {
                if (!line.classList.contains('active')) {
                    line.classList.add('active');
                    line.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                line.classList.remove('active');
            }
        });
    }
}

function togglePlay() {
    if (!audio.src) return;
    if (audio.paused) {
        audio.play();
        playBtn.innerText = '⏸';
    } else {
        audio.pause();
        playBtn.innerText = '▶';
    }
}

function seekAudio(val) {
    if (!audio.duration) return;
    audio.currentTime = (val / 100) * audio.duration;
}

function formatTime(sec) {
    if (isNaN(sec) || sec === null) return "00:00.00";
    const m = Math.floor(sec / 60);
    const s = sec % 60; // 소수점 이하 포함
    
    const minStr = String(m).padStart(2, '0');
    // 초 단위를 소수점 2자리(toFixed(2))로 맞추고, 10초 미만일 경우 앞에 0 채우기
    const secStr = s.toFixed(2).padStart(5, '0'); 
    
    return `${minStr}:${secStr}`;
}

function prevSong() {
    if (currentPlaylist.length === 0) return;
    currentIndexInPlaylist = (currentIndexInPlaylist - 1 + currentPlaylist.length) % currentPlaylist.length;
    playSong(currentPlaylist[currentIndexInPlaylist]);
}

function nextSong() {
    if (currentPlaylist.length === 0) return;
    currentIndexInPlaylist = (currentIndexInPlaylist + 1) % currentPlaylist.length;
    playSong(currentPlaylist[currentIndexInPlaylist]);
}

audio.onended = () => { nextSong(); };

function searchSongs() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = songDatabase.filter(s => 
        s.title.toLowerCase().includes(query) || 
        s.artist.toLowerCase().includes(query)
    );
    renderSongList(filtered);
}

function renderSongList(songs) {
    const listEl = document.getElementById('song-list');
    listEl.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${song.title}</strong> - ${song.artist}</span>
            <button class="add-btn" onclick="addToPlaylist(${song.id}); event.stopPropagation();">+ 담기</button>
        `;
        li.onclick = () => playSong(song);
        listEl.appendChild(li);
    });
}

function addToPlaylist(songId) {
    const song = songDatabase.find(s => s.id === songId);
    if (currentPlaylist.some(s => s.id === songId)) return;
    currentPlaylist.push(song);
    saveAndRenderPlaylist();
}

function removeFromPlaylist(songId) {
    currentPlaylist = currentPlaylist.filter(s => s.id !== songId);
    saveAndRenderPlaylist();
}

function saveAndRenderPlaylist() {
    localStorage.setItem('myPlaylist', JSON.stringify(currentPlaylist));
    const myPlaylistEl = document.getElementById('my-playlist');
    myPlaylistEl.innerHTML = '';
    
    currentPlaylist.forEach((song, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${song.title}</strong> - ${song.artist}</span>
            <button class="remove-btn" onclick="removeFromPlaylist(${song.id}); event.stopPropagation();">삭제</button>
        `;
        li.onclick = () => {
            currentIndexInPlaylist = idx;
            playSong(song);
        };
        myPlaylistEl.appendChild(li);
    });
}

function loadMyPlaylist() {
    const saved = localStorage.getItem('myPlaylist');
    if (saved) {
        currentPlaylist = JSON.parse(saved);
        saveAndRenderPlaylist();
    }
}

// 5. 라이트 / 다크 테마 전환 로직
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-toggle-btn').innerText = savedTheme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('theme-toggle-btn').innerText = newTheme === 'dark' ? '☀️' : '🌙';
}
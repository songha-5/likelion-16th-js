import './style.css'

// 문서의 DOM 요소 참조
const loginForm = document.querySelector('[data-login-form]')
const logoutButton = document.querySelector('[data-logout-button]')
const authShell = document.querySelector('[data-auth-shell]')
const contentDisplay = document.querySelector('[data-content-display]')

// 이벤트 리스너 바인딩
loginForm.addEventListener('submit', handleCurateMusic)
logoutButton.addEventListener('click', handleReset)

// --------------------------------------------------------------------------
// TODO 1: 클로저를 활용해 프라이빗 데이터 저장소를 구축하세요.
// --------------------------------------------------------------------------

let currentPlaySong = null

const PLAYLIST = {
  'sunny-happy': {
    title: '라라랜드 (La La Land)',
    track: 'Another Day of Sun',
    url: '/media/Another-Day-of-Sun.webm',
  },
  'rainy-calm': {
    title: '어바웃 타임 (About Time)',
    track: 'How Long Will I Love You',
    url: '/media/How-Long-Will-I-Love-You.webm',
  },
  'snowy-energetic': {
    title: '겨울왕국 (Frozen)',
    track: 'Let It Go',
    url: '/media/Let-It-Go.webm',
  },
  'default-song': {
    title: '위대한 쇼맨',
    track: 'This Is Me',
    url: '/media/This-Is-Me.webm',
  },
}

function createCinemaManager() {
  // 이 공간은 외부에서 접근 불가능한 영역

  return {
    // 날씨, 감정 정보 기반으로 현재 재생 곡 설정
    // - 현재 재생 곡 반환 (없을 경우, 기본 재생 곡 반환)
    curate(weather, mood) {
      const key = `${weather}-${mood}`
    },
    // 현재 재생 중인 곡 반환
    // - 유효 범위(scope) 접근
    getCurrentPlaySong() {},
    // 현재 재생 중인 곡 비우기
    cleanup() {},
  }
}

// TODO 2: 시네마 매니저 객체를 생성하세요.
// - 스코프 체인: 상위 스코프 변수 참조 및 제어
// - 함수가 정의된 위치에 따라 결정되는 렉시컬 스코프를 활용해 상태를 공유함
const cinemaManager = {}

// --------------------------------------------------------------------------
// 이벤트 리스너
// --------------------------------------------------------------------------

function handleCurateMusic(e) {
  e.preventDefault()

  // TODO 3: FormData를 사용하여 입력값(weather, mood)을 스코프 내 상수로 선언하세요.
  const form = e.currentTarget
  const weather = null
  const mood = null

  if (!weather || !mood) return

  // TODO 4: weather, mood를 인자로 전달해 시네마 매니저의 큐레이션 함수를 실행하세요.

  renderPlayer()
  toggleUI(true)
}

// --------------------------------------------------------------------------
// UI 업데이트
// --------------------------------------------------------------------------

function renderPlayer() {
  // TODO 5: 시네마 매니저의 현재 재생 곡을 가져오세요.
  const movie = mull

  if (!movie) return

  contentDisplay.innerHTML = `
    <article data-movie-card>
      <h2 data-movie-title>🎬 ${movie.title}</h2>
      <p data-track-info>🎵 Now Playing: ${movie.track}</p>
      <audio controls autoplay data-audio-player src="${movie.url}" aria-label="${movie.title} OST 재생기">
        브라우저가 오디오 재생을 지원하지 않습니다.
      </audio>
      <p style="font-size: 0.8rem; color: #64748b; margin-top: 1.5rem;">
        ※ 이 큐레이션 데이터는 <strong>클로저 스코프</strong> 내부에 <br>
        격리되어 안전하게 보호되고 있습니다.
      </p>
    </article>
  `
}

function toggleUI(isLogin) {
  authShell.dataset.state = isLogin ? 'login' : 'logout'
}

function handleReset() {
  // 재생 중인 오디오 요소 찾기
  const player = contentDisplay.querySelector('[data-audio-player]')

  if (player) {
    player.pause() // 재생 일시정지
    player.src = '' // 소스 비우기 (네트워크 스트리밍 중단)
    player.load() // 리소스 해제
  }

  // 상태 및 UI 초기화
  // TODO 6: 시네마 매니저의 클린업 함수를 실행하세요.

  contentDisplay.innerHTML = '' // 렌더링된 카드 제거
  loginForm.reset()
  toggleUI(false)
}

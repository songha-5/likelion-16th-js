import './style.css'

const authShell = document.querySelector('[data-auth-shell]')
const loginForm = document.querySelector('[data-login-form]')
const pianoKeysContainer = document.querySelector('[data-piano-keys]')
const contentDisplay = document.querySelector('[data-content-display]')
const saveButton = document.querySelector('[data-save-record]')
const logoutButton = document.querySelector('[data-logout-button]')

// --------------------------------------------------------------------------
// 데이터 매핑 설정

// 키보드의 물리적 위치와 피아노 건반 인덱스 연결
const KEY_MAP = {
  KeyA: 0, // 'A'
  KeyS: 1, // 'S'
  KeyD: 2, // 'D'
  KeyF: 3, // 'F'
  KeyG: 4, // 'G'
  KeyH: 5, // 'H'
  KeyJ: 6, // 'J'
  KeyK: 7, // 'K'
}

// 화면에 표시될 계이름 정보
const NOTE_LABELS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
// 화면에 표시될 키힌트 정보
const KEY_HINTS = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K']


// --------------------------------------------------------------------------
// 이벤트 리스너 추가

globalThis.addEventListener('keydown', handleKeyPress)
loginForm.addEventListener('submit', handleEnterStudio)
pianoKeysContainer.addEventListener('click', handleKeyClick)
saveButton.addEventListener('click', handleSaveRecord)
logoutButton.addEventListener('click', handleExitStudio)

// --------------------------------------------------------------------------
// 상태 관리

// 초기값 (불변성 관리: 금고에 보관된 원본)
const INITIAL_KEYS = Array(8).fill(false)

// 앱의 피아노 상태 (사용자 행동에 따라 변경)
let pianoState = {
  currentKeys: [], // 현재 눌린 건반들의 상태 (true | false)
  records: [], // 저장된 연주 스냅샷 목록
}

// --------------------------------------------------------------------------
// 웹 오디오 (Web Audio API)

// Web Audio API를 사용해 오디오 생성
const audioCtx = new (globalThis.AudioContext || globalThis.webkitAudioContext)()

function playNote(i) {
  const o = audioCtx.createOscillator()
  const g = audioCtx.createGain()

  // 도(C)를 기준으로 주파수 계산해 오디오 생성
  o.frequency.value = 261.63 * Math.pow(1.05946, i)
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5)
  
  o.connect(g)
  g.connect(audioCtx.destination)
  
  o.start()
  o.stop(audioCtx.currentTime + 0.5)
}

// --------------------------------------------------------------------------
// 이벤트 리스너

function handleEnterStudio(e) {
  e.preventDefault()

  if (audioCtx.state === 'suspended') audioCtx.resume()
  
  // TODO 1: 불변성 유지 업데이트
  // - 아래처럼 할당하면 두 변수가 동일한 '메모리 주소'를 가리킵니다.
  // - 피아노 상태의 현재 키 값을 변경하면 문제가 발생할 수 있습니다. (데이터 오염)
  // - 서로 다른 '메모리 주소'를 가리키게 만들어 원본 데이터 오염을 방지해야 합니다.
  pianoState.currentKeys = INITIAL_KEYS
  
  renderPiano()
  switchDisplayMode(true)
}

function handleKeyPress(e) {
  if (authShell.dataset.state !== 'login') return
  const index = KEY_MAP[e.code] // 물리 키 코드로 매핑하여 한/영 설정과 무관하게 작동
  if (index !== undefined) toggleKey(index)
}

function handleKeyClick(event) {
  // 가장 가까운 건반 요소([data-key])의 인덱스를 찾음
  const note = event.target.closest('[data-key]')
  const index = Number(note?.dataset.index)
  if (!Number.isNaN(index)) toggleKey(index)
}

// --------------------------------------------------------------------------
// 상태 업데이트

function toggleKey(index) {
  // 건반 오디오 재생
  playNote(index)

  // TODO 2: 배열 불변성 업데이트
  // - 배열의 특정 인덱스 값을 직접 바꾸는 것은 뮤테이션(mutation)입니다. 
  // - 뮤테이션은 예측할 수 없는 문제를 유발할 수 있습니다. (데이터 오염)
  // - 새로운 배열을 만들어 사용해야 원본을 유지할 수 있습니다.
  const nextKeyState = !pianoState.currentKeys[index]
  pianoState.currentKeys[index] = nextKeyState

  renderPiano()

  // 데이터 오염이 가져오는 문제 확인용 (실제로는 기록 저장 시에만 호출되어야 함)
  // renderRecords()

  maintainkeyboardFocus(index)
}

function handleSaveRecord() {

  // TODO 3: 객체 불변성 업데이트
  // - 기록을 저장할 때 현재 피아노 상태의 현재 키 배열을 참조하게 됩니다. 
  // - 기록을 저장한 이후, 건반을 칠 때 이전 기록까지 변경됩니다. (데이터 오염)
  // - 문제를 해결하려면 현재 피아노 상태를 복사해 고정된 '스냅샷'으로 저장해야 합니다.
  const newRecord = {
    time: new Date().toLocaleTimeString(),
    data: pianoState.currentKeys,
  }

  // TODO 4: 배열 불변성 업데이트
  // - 전체 기록 배열도 불변성 업데이트가 필요합니다. 
  // - 배열을 변경(mutation)하는 메서드를 사용하면 문제가 발생합니다. (데이터 오염)
  pianoState.records.unshift(newRecord)
  renderRecords()
}

function renderPiano() {
  pianoKeysContainer.innerHTML = pianoState.currentKeys
    .map(
      (active, i) => `
        <button type="button" data-key data-index="${i}" data-active="${active}">
          <span data-note-name>${NOTE_LABELS[i]}</span>
          <span data-key-hint>${KEY_HINTS[i]}</span>
        </button>
      `,
    )
    .join('')
}

function renderRecords() {
  contentDisplay.innerHTML = pianoState.records
    .map(
      (rec) => `
        <div data-record-card>
          <small>기록 시간: ${rec.time}</small>
          <div data-mini-piano>
            ${rec.data.map((active) => `<div data-mini-key data-active="${active}"></div>`).join('')}
          </div>
        </div>
      `,
    )
    .join('')
}

function switchDisplayMode(isLoggedIn) {
  authShell.dataset.state = isLoggedIn ? 'login' : 'logout'
}

function handleExitStudio() {
  pianoState = { currentKeys: [], records: [] }
  switchDisplayMode(false)
}

let timerId = null

function maintainkeyboardFocus(index) {
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }

  timerId = setTimeout(() => {
    pianoKeysContainer.querySelector(`[data-index="${index}"]`).focus?.()
    timerId = null
  })
}
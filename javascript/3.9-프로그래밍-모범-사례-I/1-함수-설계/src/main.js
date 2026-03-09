import './style.css'

// 문서의 DOM 요소 참조
const loginForm = document.querySelector('[data-login-form]')
const authShell = document.querySelector('[data-auth-shell]')
const contentDisplay = document.querySelector('[data-content-display]')
const logoutButton = document.querySelector('[data-logout-button]')
const description = document.querySelector('[data-description]')
const errorMessage = document.querySelector('[data-error-message]')

// 이벤트 리스너 바인딩
loginForm.addEventListener('submit', handleLogin)
logoutButton.addEventListener('click', handleLogout)

// ⚠️ 스파게티 코드
// - 기능적으로는 문제없이 작동
// - 한 함수 안에 너무 많은 로직이 혼재되어 있는 상황
// - 유지보수 및 재사용이 어려운 문제를 가짐
// - 단일 책임 원칙(SRP)을 고려해 개선 필요
async function handleLogin(e) {
  e.preventDefault()

  const form = e.currentTarget
  const formData = new FormData(form)
  const nickname = formData.get('nickname')
  const submitButton = form.querySelector('[data-submit-button]')

  displayErrorMessage(errorMessage)
  toggleLoadingState(true, submitButton)

  try {
    validateNickname(nickname)
    const data = await getAdviceData()
    const { advice: fortune } = data.slip
    const compliment = getRandomCompliment()
    const hue = getRandomHue()

    authShell.dataset.state = 'login'
    description.textContent = '당신을 위한 행운 리포트가 완성되었습니다.'

    contentDisplay.innerHTML = createFortuneCard({
      compliment,
      fortune,
      nickname,
      hue,
    })

    updateAppTheme(hue)
  } catch (error) {
    displayErrorMessage(errorMessage, error)
  } finally {
    toggleLoadingState(false, submitButton)
  }
}

// --------------------------------------------------------------------------
// 단일 책임 원칙(SRP)
// - '함수는 단 하나의 책임만 진다'는 원칙입니다.
// --------------------------------------------------------------------------

// TODO 1: getAdviceData
// - 할 일: fetch 로직과 응답 검증(response.ok)을 별도 비동기 함수로 분리합니다.
// - 포인트: 메인 함수는 더 이상 서버 주소가 무엇인지 알 필요가 없습니다.

// 어드바이스 API
const ADVICES_LIP_URL = import.meta.env.VITE_ADVICES_LIP_URL

async function getAdviceData() {
  const response = await fetch(ADVICES_LIP_URL)
  if (!response.ok) throw new Error('운세 서버가 응답하지 않습니다.')
  return response.json()
}

// TODO 2: toggleLoadingState
// - 할 일: 버튼 활성화/비활성화 및 aria-busy 속성 제어를 한곳에 모읍니다.
// - 포인트: 로딩 UI 관리가 누락되는 실수를 원천 차단합니다.
function toggleLoadingState(isLoading, buttonElement) {
  const buttonText = buttonElement.querySelector('[data-button-text]')

  buttonElement.disabled = isLoading
  buttonElement.setAttribute('aria-busy', isLoading)
  buttonText.textContent = isLoading
    ? '운명을 읽어오는 중...'
    : '운세 뽑고 로그인하기'
}

// TODO 3: getRandomCompliment
// - 할 일: 칭찬 배열과 랜덤 인덱스 추출 로직을 분리합니다.
// - 포인트: 나중에 칭찬 목록만 DB에서 가져오거나 수정할 때 매우 편리해집니다.

// 칭찬 상수
const COMPLIMENTS = [
  '천부적인 감각의 소유자',
  '모두가 의지하는 리더',
  '따뜻한 마음을 가진 동료',
  '디테일을 놓치지 않는 완벽주의자',
  '복잡한 문제를 단순하게 푸는 해결사',
  '긍정적인 에너지로 주변을 밝히는 사람',
  '끊임없이 성장하는 열정적인 학습자',
  '경청의 미덕을 아는 최고의 소통가',
  '창의적인 아이디어가 샘솟는 아이디어 뱅크',
  '보이지 않는 곳에서도 묵묵히 최선을 다하는 실력자',
]

function getRandomCompliment() {
  const randomIndex = Math.floor(Math.random() * COMPLIMENTS.length)
  const randomCompliment = COMPLIMENTS[randomIndex]
  return randomCompliment
}

function getRandomHue() {
  return Math.floor(Math.random() * 360)
}

// TODO 4: createFortuneCard
// - 할 일: HTML 문자열을 생성하는 템플릿 리터럴 로직을 분리합니다.
// - 포인트: 비즈니스 로직과 UI 표현(Markup)의 결합도를 낮춥니다.
function createFortuneCard({ nickname, fortune, compliment, hue } = {}) {
  return `
    <article data-dashboard-card style="border-top: 6px solid hsl(${hue}, 70%, 50%)">
      <h3>✨ ${nickname}님을 위한 메시지</h3>
      <p>"${fortune}"</p>
      <div style="margin-top: 1rem; font-weight: bold; color: hsl(${hue}, 60%, 40%)">
        당신은 오늘의 [${compliment}] 입니다.
      </div>
    </article>
  `
}

// TODO 5: updateAppTheme
// - 할 일: 배경색 및 카드 포인트 컬러를 변경하는 스타일 제어 로직을 분리합니다.
// - 포인트: 디자인 시스템 변경 시 이 함수만 고치면 됩니다.
function updateAppTheme(hue) {
  document.body.style.setProperty('background-color', `hsl(${hue}, 40%, 96%)`)
}

// TODO 6: validateNickname
// - 할 일: 입력된 별명의 유효성(공백 체크, 글자 수 등)을 검사하는 함수를 만듭니다.
// - 포인트: "깨끗한 데이터만 통과시킨다"는 원칙을 고수합니다.
function validateNickname(nickname) {
  if (!nickname || nickname.trim().length < 2) {
    throw new Error('별명은 최소 2글자 이상 입력해 주세요.')
  }
}

// TODO 7: displayErrorMessage
// - 할 일: 에러 객체를 받아 메시지를 정제하고 errorMessage 영역에 출력하는 로직을 분리합니다.
// - 포인트: 에러 발생 시 사용자 경험(UX)을 일관되게 관리할 수 있습니다.
function displayErrorMessage(errorDisplayElement, error = null) {
  errorDisplayElement.textContent = error?.message
  errorDisplayElement.hidden = !error
  error && console.error('오류 발생:', error?.message)
}

// TODO 8: handleLogin
// - 할 일: 위 7개 함수를 순서대로 호출하는 비즈니스 흐름(Workflow)만 남깁니다.
// - 포인트: handleLogin 함수는 10줄 내외의 깔끔한 코드(Clean Code)가 됩니다.

// --------------------------------------------------------------------------

function handleLogout() {
  authShell.dataset.state = 'logout'
  description.textContent =
    '별명을 입력하고 버튼을 누르면 당신의 운세와 칭찬을 한꺼번에 확인하실 수 있습니다.'
  document.body.style.backgroundColor = '#f0f2f5'
  loginForm.reset()
  contentDisplay.innerHTML = ''
}
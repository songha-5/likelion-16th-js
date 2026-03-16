import './style.css'

const greetingInput = document.querySelector('[data-input-greeting-msg]')
const dateInput = document.querySelector('[data-input-date-msg]')
const screenText = document.querySelector('[data-screen-text]')
const currentThisDisplay = document.querySelector('[data-current-this]')
const controlCenter = document.querySelector('[data-control-center]')
const execBoundButton = document.querySelector('[data-bind-action="exec-bound"]')

let boundFunction = null

controlCenter.addEventListener('click', (e) => {
  const action = e.target.dataset.bindAction
  if (!action) return

  if (action === 'call') runCall()
  if (action === 'apply') runApply()
  if (action === 'bind') createBind()
  if (action === 'exec-bound') runBound()
})

/* 실습 ----------------------------------------------------------------------- */

const user = { name: '하은주' }
const admin = { name: '박형준' }

const instructor = {
  name: '김종혁',
  introduce(greetingMessage, dateMessage) {
    const result = `${greetingMessage} 난 ${this.name}. 넌 ${dateMessage}`
    updateScreen(result, this.name ?? 'window')
  },
}

function runCall() {
  const greetingMessage = greetingInput.value
  const dateMessage = dateInput.value
  
  // TODO 1: call은 인자를 쉼표로 구분하여 '낱개'로 전달합니다.
  // - Function.prototype.call 메서드로 this를 admin으로 변경해보세요.
  instructor.introduce(greetingMessage, dateMessage)
}

function runApply() {
  const greetingMessage = greetingInput.value
  const dateMessage = dateInput.value
  
  // TODO 2: apply는 인자를 '배열'에 담아서 전달합니다.
  // - Function.prototype.apply 메서드로 this를 user로 변경해보세요.
  instructor.introduce(greetingMessage, dateMessage)
}

function createBind() {
  const yamoo9 = { name: '야무' }
  const greetingMessage = greetingInput.value
  const dateMessage = dateInput.value
  
  // TODO 3: bind는 함수를 즉시 실행하지 않고, this가 고정된 '새로운 함수'를 반환합니다.
  // - Function.prototype.bind 메서드로 this를 yamoo9으로 변경해보세요.
  boundFunction = () => instructor.introduce(greetingMessage, dateMessage)
  // - JSON.stringify(yamoo9)로 변경해보세요.
  const jsonString = JSON.stringify(instructor)

  updateScreen(
    `함수는 ${jsonString} 객체에 의해 바운드되었습니다.`,
    '호출 대기중...',
  )
  
  execBoundButton.disabled = false
}

function runBound() {
  boundFunction?.()
}

/* UI 업데이트 함수 --------------------------------------------------------------- */

function updateScreen(content, thisName) {
  screenText.textContent = content
  currentThisDisplay.textContent = thisName
}
import './style.css'

const stackList = document.querySelector('[data-stack-list]')
const thisMonitor = document.querySelector('[data-this-value]')
const scopeMonitor = document.querySelector('[data-scope-name]')
const logDisplay = document.querySelector('[data-log-display]')
const controlPanel = document.querySelector('[data-control-panel]')

controlPanel.addEventListener('click', handleClick)

/* 이벤트 리스너 ----------------------------------------------------------------- */

function handleClick(e) {
  const { action } = e.target.dataset
  if (!action) return

  switch (action) {
    case 'global': runGlobalContext()
      break
    case 'object-method': runObjectMethod()
      break
    case 'arrow-function': runArrowFunction()
      break
    case 'clear':
    default: clearLogs()
  }
}

/* 실행 컨텍스트 함수 ------------------------------------------------------------- */

function runGlobalContext() {
  const contextName = 'Global'
  // TODO 1: 전역 컨텍스트와 일반 함수 호출
  //
  // Q1. 전역에서 함수를 그냥 호출했을 때 this는 무엇을 가리킬까요?
  // 
  // Q2. 전역에서 함수를 그냥 호출했을 때 this는 무엇을 가리킬까요?
  //

}

function runObjectMethod() {
  const studyGroup = {
    name: 'JS 스터디',
    // TODO 2: 메서드 호출에서의 this 바인딩
    start() {
      // Q1. 일반 함수 메서드의 this는 무엇을 가리킬까요?
      //

      function innerFunc() {
        // Q2. 메서드 안의 일반 함수(inner)의 this는 어떻게 변할까요?
        //

      }
      
    },
  }

  
}

function runArrowFunction() {
  const arrowTest = {
    name: '화살표 테스트',
    start() {
      // TODO 3: 화살표 함수와 렉시컬(Lexical, 어휘적) this
      const innerArrow = () => {
        // Q. 메서드 안의 화살표 함수(innerArrow)의 this는 어떻게 변할까요?
        // 

      }
        
    },
  }

}

/* UI 렌더링 함수 ---------------------------------------------------------------- */

function updateUI(contextName, thisBinding, logMessage) {
  // 스택 시각화 추가
  const newItem = document.createElement('li')
  newItem.dataset.stackItem = 'function'
  newItem.textContent = `${contextName} Context`
  stackList.appendChild(newItem)
  
  // 모니터 업데이트
  thisMonitor.textContent = thisBinding
  scopeMonitor.textContent = contextName
  
  // 로그 추가
  const logEntry = document.createElement('p')
  logEntry.textContent = `> ${logMessage}`
  logDisplay.prepend(logEntry)
  
  // 1.5초 후 스택에서 제거 (실행 완료 시뮬레이션)
  setTimeout(() => {
    if (stackList.lastChild && contextName !== 'Global') {
      stackList.removeChild(stackList.lastChild)
    }
  }, 1500)
}

function clearLogs() {
  logDisplay.innerHTML = '<p data-log-placeholder>로그가 초기화되었습니다.</p>'
  thisMonitor.textContent = 'window'
  scopeMonitor.textContent = 'Global'

  // 초기 전역 스택 외 제거
  const items = stackList.querySelectorAll('[data-stack-item="function"]')
  items.forEach((item) => {
    item.remove()
  })
}


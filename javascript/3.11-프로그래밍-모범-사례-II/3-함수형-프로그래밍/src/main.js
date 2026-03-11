import './style.css'

const processorShell = document.querySelector('[data-processor-shell]')
const processForm = document.querySelector('[data-process-form]')
const contentDisplay = document.querySelector('[data-content-display]')
const prettifyButton = document.querySelector('[data-prettify-button]')
const resetButton = document.querySelector('[data-reset-button]')
const description = document.querySelector('[data-description]')
const errorMessage = document.querySelector('[data-error-message]')

const INITIAL_JSON = [
  {
    id: 1,
    name: '맥북 프로',
    price: 2970000,
  },
  {
    id: 2,
    name: '로지컬 마우스',
    price: 48000,
  },
]


init()

function init() {
  initRawData()
  processForm.addEventListener('submit', handleProcessSubmit)
  prettifyButton.addEventListener('click', handlePrettify)
  resetButton.addEventListener('click', handleReset)
}

// --------------------------------------------------------------------------
// 순수 함수 (Pure Function)

let renderCount = 0

// TODO 1: 순수하지 않은 함수 개선
// - createCardHtml 함수는 순수하지 못합니다.
// - 순수 함수의 요건을 고려해 어떤 문제가 있는지 진단해보세요.
// - createCardHtml 함수가 순수할 수 있도록 수정해보세요.
function createCardHtml(title, value) {
  // 부수 효과(Side Effect)
  
  // 1. 외부 변수에 의존
  ++renderCount
  
  // 2. 함수 외부의 요소를 직접 수정 (DOM 조작)
  description.textContent = `방금 ${title} 카드가 생성되었습니다!`
  
  // 3. API 서버에서 데이터 가져오기
  fetch('https://dummyjson.com/quotes/random')
    .then((response) => {
      if (!response.ok) {
        const errorMessage = response.text()
        throw new Error(errorMessage)
      }
      return response.json()
    })
    .then((data) => {
      const card = document.querySelector('[data-result-card]')
      if (card) card.dataset.dummyQuote = `rednerCount(${renderCount}) | ${data.quote} - ${data.author}`
    })
    .catch((error) => {
      console.error(error.message)
      return error
    })
  
  return `
    <article data-result-card data-render-count="${renderCount}">
      <h3 data-card-title>${title}</h3>
      <span data-card-value>${value}</span>
    </article>
  `
}


// --------------------------------------------------------------------------
// 고차 함수 (HoF: Higher-order Function)

// TODO 2: 일급 객체로서의 함수
// - 자바스크립트의 함수는 값으로 취급됩니다.
// - 값으로 취급되므로 함수는 다른 함수의 인자로 전달할 수 있습니다.
// - 값이므로 함수는 다른 함수의 반환 값이 될 수도 있습니다.
// - formatter 함수를 인자로 받아 유연하게 데이터를 변환해보세요.
function transformData(list, title) {
  const processedValues = list.map((item) => item.name)
  const resultString = processedValues.join(', ')

  return createCardHtml(title, resultString)
}


// --------------------------------------------------------------------------
// 이벤트 리스너

function handleProcessSubmit(e) {
  e.preventDefault()

  const form = e.currentTarget
  const formData = new FormData(form)
  const rawInput = formData.get('rawData')

  try {
    const parsedData = JSON.parse(rawInput)
    errorMessage.hidden = true

    // TODO 3: 일급 객체의 특성을 활용한 데이터 조립
    // - formatter 함수를 transformData 함수의 3번째 인자로 전달해보세요.
    // - transformData 함수는 formatter 인자를 가져와 트랜스폼에 사용합니다.
    const formatter = (item) => item.name

    const nameCard = transformData(
      parsedData,
      'PRODUCT NAMES'
    )

    const totalPrice = parsedData.reduce((acc, curr) => acc + curr.price, 0)

    const priceCard = createCardHtml(
      'TOTAL PRICE',
      `${totalPrice.toLocaleString()}원`,
    )

    renderResults(nameCard + priceCard)
    switchDisplayMode('result')
  } catch (error) {
    showInputError('JSON 형식이 올바르지 않습니다 ☺️ 다시 확인해 주세요!')
  }
}

function handlePrettify() {
  const textarea = processForm.elements.rawData
  
  try {
    const currentVal = JSON.parse(textarea.value)
    textarea.value = JSON.stringify(currentVal, null, 2)
    errorMessage.hidden = true
  } catch (error) {
    showInputError('정돈할 수 없는 JSON 형식입니다. 오타를 확인해 주세요!')
  }
}

function handleReset() {
  switchDisplayMode('input')
  processForm.reset()
  initRawData()
  errorMessage.hidden = true
}

// --------------------------------------------------------------------------
// UI 업데이트

function renderResults(htmlContent) {
  contentDisplay.innerHTML = htmlContent
}

function showInputError(message) {
  errorMessage.textContent = message
  errorMessage.hidden = false
}

function switchDisplayMode(state) {
  processorShell.dataset.state = state

  const message = state === 'result'
      ? '데이터가 순수 함수에 의해 안전하게 처리되었습니다.'
      : '함수형 프로그래밍 원리로 데이터를 안전하게 처리하세요.'

  description.textContent = message
}

function initRawData() {
  const textarea = processForm.elements.rawData
  if (textarea) textarea.textContent = JSON.stringify(INITIAL_JSON, null, 2)
}
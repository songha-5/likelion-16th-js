import './style.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const loading = document.querySelector('[data-practice] [data-loading]')
const container = document.querySelector('[data-practice] [data-container]')
const button = document.querySelector('[data-practice] [data-fetching-button]')

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-fetching-button]')
  if (!button) return

  // TODO 4: 데이터를 가져오는 함수 호출
  fetchData()
})

// --------------------------------------------------------------------------
// TODO 1: Promise를 사용해 대기 시간을 설정하는 지연(delay) 함수 작성
function wait(delay = 1000) {
  // promise 객체 생성(new) 반환
  const promise = new Promise((resolve) => {
    // 지연처리(Timer API)
    setTimeout(resolve, delay)
  })

  // 생선된 Promise 객체 반환
  return promise
}

// --------------------------------------------------------------------------
// TODO 2: fetchData 함수 코드를 비동기 함수로 작성
// 1. 비동기 함수로 선언 async
async function fetchData() {
  loadingState(true) // 로딩중 표시

  // 2. promise를 반환하는 함수 앞에 await를 받을 수 있음 (동기방식의 코드처럼 처리됨)
  const data = await simpleFetch()

  // 3. Promise를 반환하는 함수 앞에 await를 붙일 수 있음
  await wait(3000)

  // 4. 로딩 감추고, 데이터 렌더링
  loadingState(false)
  render(data)

  return

  simpleFetch()
    .then((data) => {
      return wait(1200).then(() => data)
    })
    .then((data) => {
      loadingState(false)
      render(data)
    })
}

// --------------------------------------------------------------------------
// TODO 3: simpleFetch 함수 코드를 비동기 함수로 작성
async function simpleFetch() { 
  // fetch() => Promise 객체 반환
  // return fetch(`${API_BASE_URL}/users/1`).then((response) => response.json())

  const response = await fetch(`${API_BASE_URL}/users/1`)
  const data = await response.json()

  return data
}

// 화면에 로딩 상태를 처리하는 함수(기능)
function loadingState(state = true) {
  if (state) {
    loading.hidden = false
    container.hidden = true
    button.disabled = true
  } else {
    loading.hidden = true
    container.hidden = false
    button.disabled = false
  }
}

// 서버에서 전달받은 데이터를 화면에 그리기 함수(기능)
function render(data) {
  container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`
}

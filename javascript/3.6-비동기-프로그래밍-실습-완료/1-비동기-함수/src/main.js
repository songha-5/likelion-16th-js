import './style.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const loading = document.querySelector('[data-loading]')
const container = document.querySelector('[data-container]')
const button = document.querySelector('[data-fetching-button]')

// 이벤트 위임 (메모리 효과적 관리, 성능 최적화)
document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-fetching-button]')
  if (!button) return // 빠른 반환 (함수 실행 종료)

  // TODO 4: 데이터를 가져오는 함수 호출
  console.log('데이터 페칭')
  fetchData()
})

// --------------------------------------------------------------------------
// TODO 1: Promise를 사용해 대기 시간을 설정하는 지연(delay) 함수 작성
function wait(delay = 1000 /* 지연시간(1000ms === 1s) */) {
  // Promise 객체 생성(new)
  const promise = new Promise((resolve) => {
    // 지연 처리(Timer API: setTimeout)
    setTimeout(resolve, delay)
  })

  // 생성된 Promise 객체 반환
  return promise // Promise { then, catch, finally }
}

// --------------------------------------------------------------------------
// TODO 2: fetchData 함수 코드를 비동기 함수(async function)로 작성

// 1. 비동기 함수로 선언
async function fetchData() {
  loadingState(true) // 화면에 로딩 중... 표시

  // 2. Promise를 반환하는 함수 앞에 await 붙일 수 있음 (마치 동기 방식의 코드처럼 처리)
  const data = await simpleFetch() // await Promise<data>
  console.log('데이터 가져옴')
  // 3. Promise를 반환하는 함수 앞에 await 붙일 수 있음 (마치 동기 방식의 코드처럼 처리)
  await wait(1200) // 1.2초 동안 대기...

  // 4. 로딩 감추고, 데이터 렌더링
  loadingState(false)
  render(data)

  return // 밑에 코드 실행 안함

  // 위/아래 코드 비교
  simpleFetch() // 반환 타입: Promise<Response>
    .then((data) => {
      return wait(3000).then(() => data)
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
  return response.json()
  // const data = await response.json()
  // return data
}

// 화면에 로딩 상태를 처리하는 함수(기능)
function loadingState(isLoading = true) {
  if (isLoading) {
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

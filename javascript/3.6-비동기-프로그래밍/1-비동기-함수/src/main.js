import './style.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const loading = document.querySelector('[data-practice] [data-loading]')
const container = document.querySelector('[data-practice] [data-container]')
const button = document.querySelector('[data-practice] [data-fetching-button]')

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-fetching-button]')
  if (!button) return

  // TODO 4: 데이터를 가져오는 함수 호출
})

// --------------------------------------------------------------------------
// TODO 1: Promise를 사용해 대기 시간을 설정하는 지연(delay) 함수 작성
function wait() {}

// --------------------------------------------------------------------------
// TODO 2: fetchData 함수 코드를 비동기 함수로 작성
function fetchData() {
  loadingState(true)

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
function simpleFetch() {
  return fetch(`${API_BASE_URL}/users/1`).then((response) => response.json())
}

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

function render(data) {
  container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`
}

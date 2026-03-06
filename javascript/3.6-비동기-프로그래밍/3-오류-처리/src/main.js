import './style.css'

const description = document.querySelector('[data-description]')
const authShell = document.querySelector('[data-auth-shell]')
const loginForm = document.querySelector('[data-login-form]')
const submitButton = document.querySelector('[data-submit-button]')
const loadingIcon = document.querySelector('[data-loading-icon]')
const buttonText = document.querySelector('[data-button-text]')
const contentDisplay = document.querySelector('[data-content-display]')
const logoutButton = document.querySelector('[data-logout-button]')
const errorMessage = document.querySelector('[data-error-message]')

loginForm.addEventListener('submit', handleLoginSubmit)

logoutButton.addEventListener('click', function () {
  switchDisplayMode(false)
  loginForm.reset()
})

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function requestAuth(credentials) {
  // 정상 경로
  let endpoint = `${API_BASE_URL}/auth/login`

  // TODO 1: 오류 발생 상황
  // - 404 Not Found 오류: `${API_BASE_URL}/wrong-path`로 수정해 보세요.
  // - CORS 오류: `http://localhost:4000/auth/login`으로 수정해 보세요.

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    // 404나 401 에러 시, 서버가 보내는 JSON 메시지를 추출합니다.
    const errorData = await response.json()
    throw new Error(errorData.message ?? '인증에 실패했습니다.')
  }

  return response.json()
}

async function handleLoginSubmit(event) {
  event.preventDefault()
  const payload = Object.fromEntries(new FormData(event.target))
  
  // 이전 에러 초기화
  errorMessage.hidden = true

  try {
    loadingState(true)

    const user = await requestAuth(payload)

    // TODO 2: 멀티 요청 병렬 처리 (Promise.allSettled 활용)
    // 일부 API 주소를 고의로 틀리게 수정해 특정 카드만 에러 UI가 출력되는 확인하세요.
    const results = await Promise.allSettled([
      fetch(`${API_BASE_URL}/carts/user/${user.id}`).then((response) => response.json()),
      fetch(`${API_BASE_URL}/products?limit=2`).then((response) => response.json()),
      fetch(`${API_BASE_URL}/posts/user/${user.id}`).then((response) => response.json()),
      fetch(`${API_BASE_URL}/todos/user/${user.id}`).then((response) => response.json())
    ])

    const [carts, products, posts, todos] = results

    const isRenderSuccess = renderDashboard(user, {
      carts,
      products,
      posts,
      todos
    })

    if (isRenderSuccess) switchDisplayMode(true)

  } catch (error) {
    // 전역 오류 처리 (네트워크 단절, CORS 위반 등)
    showGlobalError(error.message)
  } finally {
    loadingState(false)
  }
}

function renderDashboard(user, data) {
  if (!user || !data) return false

  const { carts, products, posts, todos } = data

  contentDisplay.innerHTML = `
    <div data-dashboard-card>
      <span data-user-name>👋 환영합니다, ${user.firstName}님!</span>
      <span data-user-email>${user.email}</span>
    </div>

    ${createDataCard('🛒 장바구니', carts, (val) => 
      val.carts.length ? `ID: ${val.carts[0].id} 포함 ${val.carts.length}건` : '비어있음'
    )}

    ${createDataCard('🍎 추천 상품', products, (val) => 
      val.products.slice(0, 1).map((p) => p.title).join('')
    )}

    ${createDataCard('📝 포스트', posts, (val) => 
      val.posts.length ? `${val.posts[0].title}` : '글 없음'
    )}
  `
  return true
}

// 에러 상황을 고려한 카드 생성 함수
function createDataCard(title, result, templateCallback) {
  // Promise.allSettled의 결과가 'rejected'일 때 에러 상태로 간주
  const isError = result.status === 'rejected'
  
  return `
    <div data-dashboard-card data-is-error="${isError}">
      <h4 data-card-title>${title}</h4>
      <div data-list-display>
        ${isError 
          ? `<span data-error-text>⚠️ 데이터를 불러올 수 없습니다 (CORS/Network Error)</span>` 
          : templateCallback(result.value)
        }
      </div>
    </div>
  `
}

// 브라우저에 오류 출력하는 함수
function showGlobalError(message) {
  errorMessage.textContent = `오류 발생: ${message}`
  errorMessage.hidden = false
}

function switchDisplayMode(isLoggedIn) {
  authShell.dataset.state = isLoggedIn ? 'login' : 'logout'
  description.textContent = isLoggedIn ? '데이터 로드 완료' : '로그인 정보를 입력하세요'
}

function loadingState(isLoading) {
  submitButton.disabled = isLoading
  loadingIcon.hidden = !isLoading
  buttonText.textContent = isLoading ? '연결 확인 중...' : '로그인'
}
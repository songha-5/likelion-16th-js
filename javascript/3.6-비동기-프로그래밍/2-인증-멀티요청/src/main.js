import './style.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const description = document.querySelector('[data-description]')
const authShell = document.querySelector('[data-auth-shell]')
const loginForm = document.querySelector('[data-login-form]')
const submitButton = document.querySelector('[data-submit-button]')
const loadingIcon = document.querySelector('[data-loading-icon]')
const buttonText = document.querySelector('[data-button-text]')
const contentDisplay = document.querySelector('[data-content-display]')
const logoutButton = document.querySelector('[data-logout-button]')

loginForm.addEventListener('submit', handleLoginSubmit)

logoutButton.addEventListener('click', () => {
  switchDisplayMode(false)
  loginForm.reset()
})

function requestAuth(credentials) {
  // fetch를 사용하여 `${API_BASE_URL}/auth/login`에 POST 요청을 보내세요.
  // headers에 'Content-Type': 'application/json'을 설정하고 body를 JSON 문자열로 변환하세요.
  // 응답이 ok가 아니면 에러를 던지고, 성공하면 json 결과를 반환하세요,
}

// TODO 2: 멀티 요청 처리
function handleLoginSubmit(e) {
  e.preventDefault()
  const payload = Object.fromEntries(new FormData(e.target))

  try {
    loadingState(true)

    // TODO 2-1: requestAuth 함수를 호출하여 사용자 정보를 가져오세요.
    const user = null

    // TODO 2-2: 다음의 멀티 엔드포인트에 데이터를 요청하세요.
    // 각 fetch 요청 뒤에 .then((response) => response.json())을 연결하세요
    // - carts/user/${id}
    // - products
    // - recipes
    // - posts/user/${id}
    // - comments
    // - todos/user/${id}
    // - quotes
    const cartsData = { carts: null }
    const productsData = { products: null }
    const recipesData = { recipes: null }
    const postsData = { posts: null }
    const commentsData = { comments: null }
    const todosData = { todos: null }
    const quotesData = { quotes: null }

    // TODO 2-3: 멀티 요청 병렬 처리
    // Promise.all을 사용해 멀티 데이터를 병렬 방식으로 요청합니다.
    // 가져온 데이터 리스트(멀티 데이터)를 구조 분해 할당합니다. (모두 성공해야 함)
    // 반면, Promise.allSettled는 일부가 실패해도 데이터를 보여줍니다. (일부만 성공해도 됨)

    const isRenderSuccess = renderDashboard(user, {
      cartsData,
      productsData,
      recipesData,
      postsData,
      commentsData,
      todosData,
      quotesData,
    })

    isRenderSuccess && switchDisplayMode(true)
  } catch (error) {
    console.error(error)
    alert('데이터를 불러오는 중 오류가 발생했습니다!')
  } finally {
    loadingState(false)
  }
}

function renderDashboard(user, data) {
  if (!user || !data) return false

  // Promise.all()을 사용할 경우
  const carts = data.cartsData?.carts
  const products = data.productsData?.products
  const posts = data.postsData?.posts
  const todos = data.todosData?.todos

  // Promise.allSettled()을 사용할 경우
  // const carts = getSafeData(data.cartsData, 'carts')
  // const products = getSafeData(data.productsData, 'products')
  // const posts = getSafeData(data.postsData, 'posts')
  // const todos = getSafeData(data.todosData, 'todos')

  contentDisplay.innerHTML = `
    <div data-dashboard-card>
      <span data-user-name>👋 반갑습니다, ${user.firstName} ${user.lastName}님!</span>
      <span data-user-email>${user.email}</span>
    </div>

    <div data-dashboard-card>
      <h4 data-card-title>🛒 장바구니 요약</h4>
      <pre data-list-display>${
        carts
          ? carts.length
            ? carts.map((cart) => `• 주문 ID: ${cart.id}`).join('\n')
            : '장바구니 비어있음'
          : '⚠️ 정보를 불러오지 못했습니다'
      }</pre>
    </div>

    <div data-dashboard-card>
      <h4 data-card-title>🍎 추천 상품</h4>
      <pre data-list-display>${
        products
          ? products
              .slice(0, 2)
              .map((product) => `• ${product.title}`)
              .join('\n')
          : '⚠️ 상품 목록을 가져올 수 없습니다'
      }</pre>
    </div>

    <div data-dashboard-card>
      <h4 data-card-title>📝 나의 포스트</h4>
      <pre data-list-display>${
        posts
          ? posts.length
            ? posts
                .slice(0, 2)
                .map((post) => `• ${post.title}`)
                .join('\n')
            : '글 없음'
          : '⚠️ 포스트 로드 실패'
      }</pre>
    </div>

    <div data-dashboard-card>
      <h4 data-card-title>✅ 할 일 목록</h4>
      <pre data-list-display>${
        todos
          ? todos.length
            ? todos
                .slice(0, 2)
                .map((todo) => `[${todo.completed ? 'V' : ' '}] ${todo.todo}`)
                .join('\n')
            : '할 일 없음'
          : '⚠️ 목록 로드 실패'
      }</pre>
    </div>
  `

  return true
}

function getSafeData(result, key) {
  if (result.status === 'fulfilled') {
    return result.value[key] || result.value
  }
  return null
}

function switchDisplayMode(isLoggedIn) {
  authShell.dataset.state = isLoggedIn ? 'login' : 'logout'

  description.textContent = isLoggedIn
    ? '성공적으로 데이터를 불러왔습니다!'
    : '사용자 정보를 입력하여 서비스를 이용하세요'
}

function loadingState(isLoading) {
  submitButton.disabled = isLoading
  loadingIcon.hidden = !isLoading
  buttonText.textContent = isLoading ? '멀티 데이터 동기화 중...' : '로그인'
}

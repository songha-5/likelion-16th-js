import './style.css'

const description = document.querySelector('[data-description]')
const authShell = document.querySelector('[data-auth-shell]')
const loginForm = document.querySelector('[data-login-form]')
const contentDisplay = document.querySelector('[data-content-display]')
const logoutButton = document.querySelector('[data-logout-button]')

loginForm.addEventListener('submit', handleInitializeSession)
contentDisplay.addEventListener('click', handleCartAction)
logoutButton.addEventListener('click', handleSessionExit)

// --------------------------------------------------------------------------
// 상태 관리

// 앱의 기준이 되는 데이터
// 실무에서는 서버에서 받아온 원본 데이터라고 생각하면 좋습니다. 
// 절대 직접 수정해서는 안됩니다! (불변성 필요)
const INITIAL_INVENTORY = [
  { id: 1, name: '맥북 프로 M5', price: 2970000, quantity: 1 },
  { id: 2, name: '로지텍 마우스', price: 48000, quantity: 2 },
  { id: 3, name: '무소음 키보드', price: 39200, quantity: 1 },
]

// 현재 세션의 카트 데이터 (사용자의 행동에 따라 변하는 상태)
let currentCart = []

// --------------------------------------------------------------------------
// 이벤트 리스너

function handleInitializeSession(e) {
  e.preventDefault()
  
  const form = e.currentTarget
  const formData = new FormData(form)
  const managerName = formData.get('managerName')

  // TODO 1: 불변(immutable) 상태 관리
  // - 아래처럼 할당하면 두 변수가 동일 '메모리 주소'를 가리키게 됩니다. (참조 연결)
  // - 원본과 연결 고리를 끊어야 안전하게 관리가 가능합니다.
  // - 두 변수가 다른 메모리 주소를 가리키도록 수정하세요.
  currentCart = INITIAL_INVENTORY

  updateDescription(`${managerName} 관리자님, 세션이 시작되었습니다.`)
  renderCart(currentCart)
  switchDisplayMode(true)
}

function handleCartAction({ target }) {
  const button = target.closest('[data-count-button]')
  if (!button) return

  const { id, action } = target.dataset
  updateItemQuantity(id, action)
}

function handleSessionExit() {
  currentCart = []
  loginForm.reset()
  updateDescription('로그인 정보를 입력하세요.')
  switchDisplayMode(false)
}

// --------------------------------------------------------------------------
// UI 업데이트

function updateItemQuantity(targetId, action) {
  // TODO 2: 배열 및 객체의 불변성 업데이트
  // - 현재 배열에서 직접 아이템 객체를 찾아 수정하고 있습니다.
  // - 이처럼 배열 내부의 객체를 직접 건드리면 문제가 발생할 수 있습니다. (데이터 오염)
  // - 안전하게 업데이트하려면 '새로운' 배열과 객체를 생성해 반환해야 합니다.
  // - 불변성 관리 방법으로 안전하게 업데이트 하도록 코드를 수정하세요.

  const id = Number(targetId)
  const editItem = currentCart.find((item) => item.id === id)

  if (action === 'plus') {
    editItem.quantity += 1
  } else {
    editItem.quantity = Math.max(0, editItem.quantity - 1)
  }
  
  renderCart(currentCart)
}

function updateDescription(text) {
  description.textContent = text
}

function switchDisplayMode(isLoggedIn) {
  authShell.dataset.state = isLoggedIn ? 'login' : 'logout'
}

function renderCart(cartData) {
  const totalAmount = cartData.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  )

  contentDisplay.innerHTML = `
    <h3 style="margin-top: 0">🛒 실시간 카트 현황</h3>
    ${cartData
      .map(
        (item) => `
          <div data-cart-item aria-live="polite">
            <div data-item-info>
              <strong>${item.name}</strong>
              <span>${item.price.toLocaleString()}원</span>
            </div>
            <div data-control-group role="group">
              <button 
                type="button" 
                data-count-button 
                data-id="${item.id}" 
                data-action="minus"
                aria-label="수량 감소"
                title="수량 감소"
              >
                -
              </button>
              <span data-quantity>${item.quantity}</span>
              <button 
                type="button" 
                data-count-button 
                data-id="${item.id}" 
                data-action="plus"
                aria-label="수량 증가"
                title="수량 증가"
              >
                +
              </button>
            </div>
          </div>
        `
      )
      .join('')}
    <output data-output>
      총 결제 예정 금액: ${totalAmount.toLocaleString()}원
    </output>
  `
}



import './style.css'

const authShell = document.querySelector('[data-auth-shell]')
const loginForm = document.querySelector('[data-login-form]')
const logoutButton = document.querySelector('[data-logout-button]')
const contentDisplay = document.querySelector('[data-content-display]')

loginForm.addEventListener('submit', handleAuthSubmit)
logoutButton.addEventListener('click', handleAppLogout)

// --------------------------------------------------------------------------
// 프로토타입(Prototype) & 클래스(Class) 구조 정의
// --------------------------------------------------------------------------

// TODO 1-1: BaseCard 상위(부모) 생성자 함수를 정의하세요.
// - category, content 인자를 전달 받아 자신의 속성으로 설정합니다.
function BaseCard() {}

// TODO 1-2: BaseCard의 prototype 속성(객체)에 render 메서드를 추가하세요.
// 반환값: `
//   <article data-dashboard-card>
//     <span data-card-type>${this.category}</span>
//     <div data-card-body>${this.content}</div>
//   </article>
// `

// TODO 2-1: UserCard 하위(자식) 생성자 함수를 정의하세요. (속성 상속)
// - 부모 생성자를 빌려써 'User Profile', userName을 전달합니다.
function UserCard() {}

// TODO 2-2: 프로토타입 체인을 연결하여 상속을 구현하세요. (메서드 상속)
// - UserCard ← BaseCard (Object.create, .constructor 활용)

// TODO 2-3: render() 메서드 오버라이딩으로 다형성을 구현하세요. (메서드 오버라이딩)
// - 상위(부모) 생성자 함수의 render()를 실행해 originalHtml 참조 (super 활용)
// - originalHtml 내부의 값을 다른 값으로 교체
//   - 'data-dashboard-card' → 'data-dashboard-card data-type="user"'


// [참고] SystemCard (BaseCard를 상속받는 프로토타입 체인)
function SystemCard(systemStatus) {
  BaseCard.call(this, 'System Status', systemStatus)
}

SystemCard.prototype = Object.create(BaseCard.prototype)
SystemCard.prototype.constructor = SystemCard
SystemCard.prototype.render = function() {
  return BaseCard.prototype.render.call(this)
}


// --------------------------------------------------------------------------
// 실행 로직 함수
// --------------------------------------------------------------------------

function handleAuthSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const loginData = Object.fromEntries(formData)

  // 간단한 인증 시뮬레이션
  if (loginData.id === 'yamoo9') {
    renderDashboardComponents(loginData.id)
    updateDisplayState('login')
  } else {
    alert('인증 정보가 올바르지 않습니다.')
  }
}

function renderDashboardComponents(userId) {
  // 인스턴스 생성 (Prototype 체인 형성)
  const components = [
    new UserCard(`${userId} 강사님`),
    new SystemCard('엔진 가동 중 (v2.0)'),
    new SystemCard('메모리 상태 양호')
  ]

  // 각 인스턴스의 Prototype에 있는 render 메서드 호출
  contentDisplay.innerHTML = components
    .map((component) => component.render())
    .join('')
}

function handleAppLogout() {
  updateDisplayState('logout')
}

function updateDisplayState(state) {
  authShell.dataset.state = state
  if (state === 'logout') loginForm.reset()
}
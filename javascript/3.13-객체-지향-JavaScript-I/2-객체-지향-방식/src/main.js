import './style.css'

const authShell = document.querySelector('[data-auth-shell]')
const loginForm = document.querySelector('[data-login-form]')
const logoutButton = document.querySelector('[data-logout-button]')
const contentDisplay = document.querySelector('[data-content-display]')

loginForm.addEventListener('submit', (e) => {
  handleAuthSubmit(e)
})

logoutButton.addEventListener('click', () => {
  handleAppLogout()
})

// --------------------------------------------------------------------------
// 객체 지향 프로그래밍 (클래스: 캡슐화, 상속, 다형성)
// --------------------------------------------------------------------------

// TODO 1: 추상화 & 캡슐화(정보를 안전하게 관리)하는 클래스
class SessionManager {
  // 아래 변수들을 Private(#) 필드로 전환하세요.
  isLoggedIn = false
  currentUser = null

  static ADMIN_ACCOUNT = {
    id: 'yamoo9',
    name: '야무',
    role: 'Administrator',
    password: 'qwerty!9',
  }

  // 내부 로직은 숨기고 '로그인'이라는 행위만 제공 (추상화)
  login(userId, password) {
    const { ADMIN_ACCOUNT } = SessionManager

    if (userId === ADMIN_ACCOUNT.id && password === ADMIN_ACCOUNT.password) {
      this.isLoggedIn = true
      this.currentUser = {
        id: userId,
        name: ADMIN_ACCOUNT.name,
        role: ADMIN_ACCOUNT.role,
      }
      return true
    }
    return false
  }

  logout() {
    this.isLoggedIn = false
    this.currentUser = null
  }

  // 읽기 전용 getter (캡슐화 유지)
  get user() { return this.currentUser }
  get status() { return this.isLoggedIn }
}

const session = new SessionManager()

// 공개 필드는 접근 가능
console.log(session.isLoggedIn)

// 비공개 필드에 접근 시도할 경우 오류 발생
// Uncaught SyntaxError: Private field '#isLoggedIn' must be declared in an enclosing class
// console.log(session.#isLoggedIn)


// UI 컴포넌트 (상위) 클래스
// - 모든 카드의 `공통` 속성 정의
// - `상속` 받은 하위 클래스에서 `다양하게` 메서드 `재정의` 가능
class DashboardCard {
  constructor(label, value) {
    this.label = label
    this.value = value
  }

  // 기본 렌더링 로직
  // 상속받은 클래스들이 공통으로 사용
  render() {
    return `
      <article data-dashboard-card>
        <div data-card-info>
          <span data-card-label>${this.label}</span>
          <div data-card-value>${this.value}</div>
        </div>
        ${this.renderBadge()} 
      </article>
    `
  }

  // 다형성: 하위 클래스에서 각자 정의할 메소드
  renderBadge() { return `` }
}


// TODO 2: DashboardCard를 상속하는 UserProfileCard 클래스를 작성하세요.
//         상속을 통해 중복 코드 제거
class UserProfileCard {
  constructor(name, role) {
    // super를 호출해 상위 생성자에게 '사용자 프로필'과 name 값을 전달하세요.
    
    this.role = role
  }

  // renderBadge() 메서드 오버라이딩을 통한 다형성을 구현합니다.  
  // 반환값: `<span data-badge data-type="user">${this.role}</span>`
  renderBadge() { return `` }

  // ⚠️ 상속 받은 후에는 render() 메서드를 제거하세요.
  render() { return `` }
}


// SystemStatusCard 클래스 (DashboardCard 상속)
class SystemStatusCard extends DashboardCard {
  constructor(systemName, status) {
    super('시스템 상태', systemName)
    this.status = status
  }

  // 다형성 오버라이딩
  renderBadge() {
    const statusText = this.status ? 'ONLINE' : 'OFFLINE'
    const statusValue = statusText.toLowerCase()
    return `<span data-badge data-status="${statusValue}">${statusText}</span>`
  }
}


// --------------------------------------------------------------------------
// 애플리케이션 로직 함수
// --------------------------------------------------------------------------

function handleAuthSubmit(e) {
  e.preventDefault()
  const payload = Object.fromEntries(new FormData(e.target))

  if (session.login(payload.id, payload.pw)) {
    renderApp()
    toggleUI('login')
  } else {
    alert('아이디 또는 비밀번호를 확인하세요.')
  }
}

function renderApp() {
  const userData = session.user
  
  // 다형성 활용
  // 서로 다른 클래스들을 하나의 배열에 넣고 
  // 동일한 인터페이스(render) 호출
  const widgets = [
    new UserProfileCard(userData.name, userData.role),
    new SystemStatusCard('API 서버', true),
    new SystemStatusCard('데이터베이스', false),
  ]

  contentDisplay.innerHTML = widgets.map((widget) => widget.render()).join('')
}

function handleAppLogout() {
  session.logout()
  toggleUI('logout')
}

function toggleUI(state) {
  authShell.dataset.state = state
  if (state === 'logout') loginForm.reset()
}
import './style.css'

// --------------------------------------------------------------------
// 기억되는 공간의 데이터: 클로저(Closure)
// --------------------------------------------------------------------
// - 오직 정해진 방법만으로 아이템을 넣고 뺄 수 있어 인벤토리(Inventory)와 유사
// - 함수 실행이 종료되어도 내부 함수가 변수를 붙잡고(reference) 있다면 
//   자바스크립트 청소부(G.C)가 해당 변수를 메모리에 유지
// - 데이터 무결성(Data Integrity)의 중요성
// --------------------------------------------------------------------

const gameShell = document.querySelector('[data-game-shell]')
const createForm = document.querySelector('[data-create-form]')
const heroNameDisplay = document.querySelector('[data-hero-display-name]')
const levelBadge = document.querySelector('[data-level-badge]')
const expFill = document.querySelector('[data-exp-fill]')
const expText = document.querySelector('[data-exp-text]')
const systemLog = document.querySelector('[data-system-log]')
const gameContainer = document.querySelector('[data-game-container]')
const resetButton = document.querySelector('[data-reset-button]')

createForm.addEventListener('submit', handleCreateHero)
gameContainer.addEventListener('click', handleGameArea)
resetButton.addEventListener('click', handleReset)


// 캐릭터 액션 상수
const HERO_ACTION = {
  battle: { type: 'battle', amount: 20 },
  cheat: { type: 'cheat', amount: 99 },
}

// --------------------------------------------------------------------------
// 클로저로 캐릭터 관리

// 여러분은 지금 '용사 육성 엔진'의 핵심 개발자입니다.
// 아래의 미션들을 수행하며 클로저가 어떻게 데이터를 보호하고 유지하는지 확인해보세요!
function createHero(name) {
  // TODO 1: 외부에서 절대 볼 수 없는 '프라이빗 인벤토리'를 만드세요.
  // level: 1, exp: 0, maxExp: 100 변수를 선언합니다.

  // TODO 2: 내부에서만 사용하는 levelUp 함수를 작성하세요. (캡슐화)
  // 레벨을 1 증가시키고 경험치를 0으로 초기화한 뒤, 축하 메시지를 반환합니다.
  // `name`님이 레벨업했습니다! (현재 Lv. `level`)

  // TODO 3: 외부에서 주머니 속 데이터를 안전하게 다룰 수 있는 '클로저 통로'를 반환하세요.
  const heroControl = {
    // 3-1. 경험치를 획득하는 통로
    // - gainExp(amount)
    //   - 전달받은 amount만큼 exp를 더하고 메시지를 준비하세요.
    //   - 만약 경험치가 maxExp 이상이 되면 내부 함수인 levelUp()을 실행하세요.
    //   - 현재 상태(level, exp 등)와 메시지를 객체로 반환합니다.

    // 3-2. 현재 정보를 확인하는 통로
    // - getStatus()
    //   - 외부에서 직접 변수를 볼 수 없으니, 이 메서드를 통해서만 값을 전달합니다.
    
  }

  return heroControl
}

// --------------------------------------------------------------------------
// 테스트 및 검증 구간
// --------------------------------------------------------------------------

{
  // 1. 나만의 용사 생성

  // 2. 상태 확인 (처음에는 Lv.1, EXP.0)

  // 3. 경험치 획득 시도 (클로저를 통한 상태 유지 확인)
  // - 40 획득
  // - 70 획득 → 레벨업!

  // 4. 보안 검사 (은닉화 확인)
  // - 직접 접근 시도(level)
  // - 직접 접근 시도(exp)

  // 5. 치트 엔진 차단 확인
  // - 외부에서 강제로 값을 바꾸려 해도 클로저 속 변수는 안전한가요?
  // - 히어로의 레벨을 99로 치트 시도!
  // - 치트 후 상태: ???
  
}

// 캐릭터 인스턴스(클로저)를 담을 변수
let heroInstance = null

// --------------------------------------------------------------------------
// 이벤트 리스너

function handleCreateHero(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const name = formData.get('heroName')

  // 히어로 캐릭터 생성
  // 로직 작성
  
  if (!heroInstance) return alert('히어로 캐릭터 생성 로직을 작성해야 합니다.')
  updateUI()
  switchState('playing')
}

function handleGameArea(e) {
  const { action } = e.target.dataset
  if (action) excuteHeroAction(action)
}

function excuteHeroAction(actionType) {
  if (!heroInstance) return

  const { battle, cheat } = HERO_ACTION

  if (actionType === battle.type) {
    // 히어로 경험치 획득
    // 로직 작성 (battle.amount)
    let result

    if (!result) return alert('히어로 경험치 획득 로직 작성 필요!')
    updateUI(result.message)
  }

  if (actionType === cheat.type) {
    try {
      // 히어로의 레벨 99 치트 시도!
      // 로직 작성 (cheat.amount)

      updateUI('치트 감지: 시스템 주머니에 손을 댈 수 없습니다!')
    } catch (e) {
      updateUI('보안 시스템이 치트를 차단했습니다.')
    }
  }
}

function handleReset() {
  switchState('setup')
  
  // 히어로가 차지하고 있는 메모리 회수
  // 로직 작성
}

// --------------------------------------------------------------------------
// UI 업데이트

function updateUI(logMessage) {
  // 히어로의 상태 확인
  // 로직 작성
  const { level, exp, maxExp, name } = { level: 0, exp: 0, maxExp: 0, name: 0 }

  if (level === 0) return alert('히어로 상태 확인 로직을 작성해야 합니다!')
  
  heroNameDisplay.textContent = name
  levelBadge.textContent = `Lv. ${level}`
  expText.textContent = `EXP: ${exp} / ${maxExp}`
  expFill.style.width = `${(exp / maxExp) * 100}%`
  
  if (logMessage) {
    systemLog.textContent = logMessage
  }
}

function switchState(state) {
  gameShell.dataset.state = state
  if (state === 'setup') createForm.reset()
}
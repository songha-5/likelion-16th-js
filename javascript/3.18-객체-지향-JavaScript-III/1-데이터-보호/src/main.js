import './style.css'

// --------------------------------------------------------------------
// 데이터 보호: 클로저(Closure)
// --------------------------------------------------------------------
// - 클로저의 생성 원리를 이해하고 함수가 종료된 후에도 변수가 살아남는 이유
// - 공개할 필요가 없는 데이터를 숨기는 은닉화(Infirmation Hiding)의 중요성
// - 클로저를 활용해 외부 접근이 차단된 독립적인 객체를 만드는 캡슐화(Encapsulation)
// - 클로저는 함수만으로 데이터를 보호할 수 있는 자바스크립트의 근본적인 메커니즘
// - 예측 가능한 코드를 만드는 것이 클로저 은닉화의 진짜 목적! (정해진 방법만 사용 가능)
// --------------------------------------------------------------------

const vaultShell = document.querySelector('[data-vault-shell]')
const initForm = document.querySelector('[data-init-form]')
const assetValueDisplay = document.querySelector('[data-asset-value]')
const logText = document.querySelector('[data-log-text]')
const vaultContainer = document.querySelector('[data-vault-container]')
const resetButton = document.querySelector('[data-reset-button]')

initForm.addEventListener('submit', handleVaultInit)
vaultContainer.addEventListener('click', handleClickVaultContainer)
resetButton.addEventListener('click', handleReset)

// 금고 액션 타입
const VAULT_ACTION = {
  deposit: { type: 'deposit', amount: 620 },   // 입금
  withdraw: { type: 'withdraw', amount: 240 }, // 출금
}

// --------------------------------------------------------------------------
// 핵심 로직 (캡슐화 & 클로저)

/**
 * 보안 금고를 생성하는 함수 (클로저 팩토리: Closure Factory)
 * @param {number} initialBalance 외부에서 전달된 초기값
 * @returns {object} 은닉된 데이터에 접근할 수 있는 공개 메서드들
 */
function createVault(initialBalance) {
  // TODO 1: initialBalance를 외부에서 접근 못하게 은닉하세요.

  // TODO 2: 클로저를 통해 반환되는 객체를 생성합니다.
  // - deposit(amount) : amount 만큼 금고에 입금하고 총액을 반환합니다. (은닉된 자산 증가)
  // - withdraw(amount)
  //   - amount 만큼 금고에 출금하고 총액을 반환합니다. (은닉된 자산 감소)
  //   - 더 이상 출금할 은닉된 자산이 없다면? null을 반환합니다.
  // - getBalance() : 은닉된 자산을 반환합니다.
  
}

// "내 금고" 캡슐화된 인스턴스를 담는 용도 변수
let myVault = null

// --------------------------------------------------------------------------
// 이벤트 핸들러 함수


function handleVaultInit(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const initialAsset = Number(formData.get('asset'))

  // 클로저 인스턴스 생성 ('은닉화' 시작)
  // 로직 작성

  if (!myVault) alert('금고를 열려면 먼저 클로저 인스턴스(myVault)를 생성해야 합니다.')

  renderBalance()
  updateLog('보안 금고가 성공적으로 캡슐화되었습니다.', 'success')
  switchMode(true)
}

function handleClickVaultContainer(e) {
  const { actionButton: action } = e.target.dataset
  if (!action) return
  excuteVaultAction(action)
}

function handleReset() {
  switchMode(false)
  myVault = null
}

function excuteVaultAction(actionType) {
  if (!myVault) return

  const { deposit, withdraw } = VAULT_ACTION

  if (actionType === deposit.type) {
    // 입금
    // 로직 작성

    updateLog(`${deposit.amount}원이 안전하게 입금되었습니다.`, 'success')
  }

  if (actionType === withdraw.type) {
    // 출금
    // 로직 작성

    const result = myVault.withdraw(withdraw.amount)
    
    result !== null
      ? updateLog(`${withdraw.amount}원이 성공적으로 출금되었습니다.`, 'success')
      : updateLog('잔액이 부족하여 출금에 실패했습니다.', 'danger')
  }

  if (actionType === 'hack') {
    try {
      // 은닉된 자산에 접근 시도 (차단!)
      // 로직 작성

      updateLog(
        '접근 실패! 은닉된 변수(balance)에 직접 접근할 수 없습니다.',
        'danger',
      )
    } catch (error) {
      updateLog('시스템 보안: 정의되지 않은 접근입니다.', 'danger')
    }
  }

  renderBalance()
}

// --------------------------------------------------------------------------
// UI 유틸리티 함수

function renderBalance() {
  assetValueDisplay.textContent = myVault.getBalance().toLocaleString()
  renderButtonLabels()
}

function updateLog(message, type) {
  logText.textContent = message
  logText.style.color =
    type === 'danger' ? 'hsl(var(--destructive))' : 'hsl(var(--success))'
}

function switchMode(isUnlocked) {
  vaultShell.dataset.state = isUnlocked ? 'unlocked' : 'locked'
  // 클로저 메모리 회수
  // 로직 작성
}

function renderButtonLabels() {
  const { deposit, withdraw } = VAULT_ACTION
  
  vaultShell
    .querySelector('[data-action-button="deposit"]')
    .textContent = `입금 (+${deposit.amount})`
  
    vaultShell
    .querySelector('[data-action-button="withdraw"]')
    .textContent = `출금 (+${withdraw.amount})`
}
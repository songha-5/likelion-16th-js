import './style.css'

const profileShell = document.querySelector('[data-profile-shell]')
const profileForm = document.querySelector('[data-profile-form]')
const errorFeedback = document.querySelector('[data-error-feedback]')
const viewName = document.querySelector('[data-view-name]')
const viewWeight = document.querySelector('[data-view-weight]')
const resetButton = document.querySelector('[data-reset-button]')

profileForm.addEventListener('submit', handleProfileSubmit)
resetButton.addEventListener('click', handleSwitchState)

// --------------------------------------------------------------------------
// 핵심 설계: 접근 제어가 적용된 객체 생성 함수
// - 접근자(getter) / 설정자(setter)


// TODO 1: 접근 제한 및 유효성 검사를 수행하는 일반 속성을 활용해 작성합니다.
function createSecureProfile() {

  // 프라이빗 저장소 (실제 데이터가 담기는 곳)
  // _data 객체 : 밑줄(_)은 비공개라는 관례적 의미를 가짐
  //   - name 속성 ''
  //   - weight 속성 0


  // 객체 반환 (외부 공개)
  return {
    // [Getter] 이름을 가져올 때 추가 가공 (예: "님" 붙이기)
    // name 속성 (읽기): _data 객체의 name 속성 반환 


    // [Setter] 이름 저장 전 검증 (2자 이상만 허용)
    // name 속성 (쓰기): newName을 전달받아 _data 객체의 name 속성 업데이트


    // [Getter] 체중을 가져올 때 단위 포맷팅 (소수점 1자리 + kg)
    // weight 속성 (읽기): _data 객체의 weight 속성 반환

    
    // [Setter] 체중 저장 전 검증 (0 이하 방지)
    // weight 속성 (쓰기): newWeight을 전달받아 _data 객체의 weight 속성 업데이트


  }
}

// 사용자 프로필 인스턴스 생성
const userProfile = { name: '', weight: 0 }

// --------------------------------------------------------------------------
// 이벤트 리스너

function handleProfileSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const inputName = formData.get('name')
  const inputWeight = formData.get('weight')

  try {
    // TODO 2: 입력 값 유효성 검사 후, userProfile 객체에 설정


    invalidCheck(
      !('name' in userProfile),
      'userProfile 객체에 name 속성이 포함되어 있지 않습니다.',
    )

    invalidCheck(
      !('weight' in userProfile),
      'userProfile 객체에 weight 속성이 포함되어 있지 않습니다.',
    )

    // 성공 시 UI 업데이트 (Getter 호출)
    renderDashboard()
  } catch (error) {
    showError(error.message)
  }
}

function handleSwitchState() {
  switchState('form')
  errorFeedback.hidden = true
}

// --------------------------------------------------------------------------
// UI 업데이트

function renderDashboard() {
  try {

    // TODO 3: viewName, viewWeight 화면 데이터 값 업데이트
    

    invalidCheck(
      viewName.textContent.includes('-'),
      'viewName 값이 채워지지 않았습니다.',
    )
    invalidCheck(
      viewWeight.textContent.includes('-'),
      'viewWeight 값이 채워지지 않았습니다.',
    )

    switchState('view')
  } catch(error) {
    showError(error.message)
  }
}

function showError(message) {
  errorFeedback.textContent = `⚠️ ${message}`
  errorFeedback.hidden = false
}

function switchState(state) {
  profileShell.dataset.state = state
}

// --------------------------------------------------------------------------
// 유틸리티

/**
 * 오류 검증 조건이 참이면 오류를 반환하는 함수
 * @param {boolean} errorCondition 오류 검증 조건
 * @param {string} errorMessage 오류 메시지
 * @returns {Error|undefined}
 */
function invalidCheck(errorCondition, errorMessage) {
  if (errorCondition) throw new Error(errorMessage)
}
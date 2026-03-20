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

{
  const profile = /* IIFE 패턴 */(() => {
    // 비공개 관례적으로 표현
    const _data = {
      name: '',
      weight: 0,
    }

    // 읽기(get)
    function getName() {
      // 외부에서 접근 가능하지 않은 것에 접근할 수 있는 수단
      return _data.name + '님'
    }

    function getWeight() {
      return _data.weight.toFixed(1) + 'kg'
    }

    // 쓰기(set)
    function setName(newName) {
      // 검증
      if (newName.trim().length < 2) {
        throw new Error('이름은 최소 2글자 이상이어야 한다.')
      }

      // 데이터 수정
      _data.name = newName
    }

    function setWeight(newWeight) {
      // 검증
      const weightNum = Number(newWeight)
      if (Number.isNaN(weightNum) || weightNum <= 0) {
        throw new Error('몸무게는 0보다 커야 한다.')
      }

      // 데이터 수정
      _data.weight = weightNum
    }

    // 외부로 노출하고 싶은 것만 설정
    return /* profile */ {
      // 읽기 접근 제한
      getName,
      getWeight,
      // 쓰기 접근 제한
      setName,
      setWeight,
    }
  })()

  // 쓰기
  profile.setName('황동주')
  profile.setWeight(68.6)

  // 읽기
  console.log(profile.getName())
  console.log(profile.getWeight())

  // 접근 제한 ❌
  // profile._data.name = '강주영'
  // console.log(profile._data)
}

// TODO 1: 접근 제한 및 유효성 검사를 수행하는 일반 속성을 활용해 작성합니다.
function createSecureProfile() {

  // 프라이빗 저장소 (실제 데이터가 담기는 곳)
  // _data 객체 : 밑줄(_)은 비공개라는 관례적 의미를 가짐
  //   - name 속성 ''
  //   - weight 속성 0
  const _data = {
    name: '',
    weight: 0
  }


  // 객체 반환 (외부 공개)
  return {
    // [Getter] 이름을 가져올 때 추가 가공 (예: "님" 붙이기)
    // name 속성 (읽기): _data 객체의 name 속성 반환 
    get name() {
      return _data.name + '님'
    },

    // [Setter] 이름 저장 전 검증 (2자 이상만 허용)
    // name 속성 (쓰기): newName을 전달받아 _data 객체의 name 속성 업데이트
    set name(newName) {
      const name = newName.trim()
      if(name.length < 2) {
        throw new Error('이름은 최소 2글자 이상이여야 합니다.')
      }

      _data.name = name
    },

    // [Getter] 체중을 가져올 때 단위 포맷팅 (소수점 1자리 + kg)
    // weight 속성 (읽기): _data 객체의 weight 속성 반환
    get weight() {
      return _data.weight.toFixed(1) + 'kg'
    },
    
    // [Setter] 체중 저장 전 검증 (0 이하 방지)
    // weight 속성 (쓰기): newWeight을 전달받아 _data 객체의 weight 속성 업데이트
    set weight(newWeight) {
      const weightNum = Number(newWeight)

      if(Number.isNaN(weightNum) || weightNum < 1) {
        throw new Error('몸무게는 0kg보다 커야 한다.')
      }

      _data.weight = weightNum
    }

  }
}

const profile = createSecureProfile()
profile.name = '이정'
profile.weight = '20'
console.log(profile.name)
console.log(profile.weight)


// 사용자 프로필 인스턴스 생성
const userProfile = createSecureProfile()

// --------------------------------------------------------------------------
// 이벤트 리스너

function handleProfileSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const inputName = formData.get('name')
  const inputWeight = formData.get('weight')

  console.log(inputName, inputWeight)

  try {
    // TODO 2: 입력 값 유효성 검사 후, userProfile 객체에 설정
    userProfile.name = inputName
    userProfile.weight = inputWeight


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
    viewName.textContent = userProfile.name
    viewWeight.textContent = userProfile.weight

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
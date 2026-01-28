const registerForm = document.querySelector('.form')

registerForm.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('폼 전송 하지마');
})

const checkbox = document.querySelector('.prevent-default-demo-checkbox [type="checkbox"]')

checkbox.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('사용자의 preventDefault 작동 여부', e.preventDefault)  
})
checkbox.addEventListener('change', (e) => {
  e.preventDefault()
  
  const checkboxInput = e.currentTarget
  console.log(checkboxInput.checked)
})


// --------------------------------------------------------------------------
// 실습: 브라우저 기본 작동 방지 (Prevent Default)
// --------------------------------------------------------------------------

// [실습] 링크 이동 방지
// 1. <a> 요소를 선택하고 클릭 이벤트를 연결하세요.
// 2. e.preventDefault()를 호출하여 href에 설정된 주소로 이동하지 않도록 작성하세요.
// 3. 콘솔에 "링크 이동이 방지되었습니다."라고 출력하세요.
console.groupCollapsed('링크 기본 동작 방지 실습')

const googleLink = document.querySelector('[href*="google"]')

googleLink.addEventListener('click', (e) => {
  // 브라우저의 기본 작동(default) 방지(prevent, 중단) 명령
  // '브라우저. 너 원래 하던 거 하지마!' (preventDefault)
  e.preventDefault()
  console.log('브라우저 기본 작동 방지')
})

// 리디렉션 시뮬레이션 (서버 측 애플리케이션 처리)
// 현재 사용자가 로그인되었나요? (상태)
let isLogin = false

// 로그인 상태가 아니라면
// 로그인 페이지로 리디렉션하세요.
if (!isLogin) {
  // window.location.href = 'https://nid.naver.com/nidlogin.login'
}

console.groupEnd()


// [실습] 폼 제출 및 페이지 리디렉션 방지
// 1. <form> 요소의 submit 이벤트를 가로채세요.
// 2. 페이지가 새로고침되거나 action 주소로 리디렉션되지 않도록 방지하세요.
// 3. e.defaultPrevented 속성 값을 콘솔로 확인하는 로직을 작성하세요.
console.groupCollapsed('폼 제출 기본 동작 방지 실습')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] 체크박스 상태 변경 방지 (응용)
// 1. <input type="checkbox"> 요소를 선택하고 클릭 이벤트를 연결하세요.
// 2. 특정 조건(예: confirm 확인)에 따라 체크 상태가 변하지 않도록 제어하세요.
// 3. 브라우저의 고유 동작이 실행되지 않았음을 사용자에게 알리세요.
console.groupCollapsed('체크박스 상태 변경 제어 실습')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] 방어적 프로그래밍과 기본 작동 확인
// 1. 이벤트 리스너 내부에서 e.preventDefault()를 실행한 후,
// 2. 실제 브라우저가 해당 이벤트를 '취소 가능한 상태'인지 e.cancelable 속성으로 확인하세요.
console.groupCollapsed('이벤트 취소 가능 여부 확인')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. e.preventDefault(): 브라우저가 가진 고유의 동작(이동, 새로고침 등)을 중단시킵니다.
// 2. 리디렉션 방지: 특히 폼 제출(submit) 시 데이터만 처리하고 페이지를 유지할 때 필수입니다.
// 3. 상태 확인: e.defaultPrevented가 true라면, 기본 동작이 이미 차단되었음을 의미합니다.
// 4. 주의사항: 모든 이벤트가 취소 가능한 것은 아닙니다. e.cancelable이 true인 경우에만 작동합니다.
// --------------------------------------------------------------------------
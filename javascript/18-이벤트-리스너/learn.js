// --------------------------------------------------------------------------
// 실습: 브라우저와 대화하는 방법 (Event Handling)
// --------------------------------------------------------------------------
// * 이벤트(Event): 성문 밖에서 발생하는 사건 (클릭, 키 입력 등)
// * 리스너(Listener): 사건을 기다리는 보초병 (addEventListener)
// * 핸들러(Handler): 사건 발생 시 수행하는 보초병의 행동 (함수)
// --------------------------------------------------------------------------

// 1. 대상 정하기 (보초병이 지킬 성문 선택)
// const clickableButton = document.querySelector('clickable')

// 2. 이벤트 리스닝 (보초병 배치 및 귀 기울이기)
// console.log(typeof clickableButton.addEventListener)
// clickableButton.addEventListener('click', function() {
  // 연습: gateButton에 'click' 이벤트 리스너를 추가하고 콘솔에 메시지를 출력하세요.
  // console.log('HI')
// })

// 1. 대상 정하기 (보초병이 지킬 성문 선택)
const gateButton = document.querySelector('.clickable')
// console.log(clickableButton)

// 전역에서 접근 가능하도록 공개
// globalThis.gateButton = gateButton

// 2. 이벤트 리스닝 (보초병 배치 및 귀 기울이기)
// gateButton.addEventListener('click', function() {
  // 연습: gateButton에 'click' 이벤트 리스너를 추가하고 콘솔에 메시지를 출력하세요.
  // console.log('🚪 성문을 두드렸어요!')
// })
// 전역
// const mood = '호기심'

// 지역
function localScope() {
    const mood = '진취적 기상'
    // 지역 변수는 외부에서 접근 가능하지 않음 ⚠️
    // 그런데 외부에서도 내부의 변수에 접근하고 싶다면?
    // 그럼 외부에 공개(노출)하자!
    const whoAmI = { name: '야무' } 
    // 전역에서 접근 가능하게 공개하려면?
    // 전역 객체의 속성으로 만들면 된다.
    // 전역객체.속성 = 지역변수
    window.whoAmI = whoAmI
    
    // 내부에서는 접근 가능
    console.log(whoAmI)
}

console.log(window.whoAmI)

localScope()
// --------------------------------------------------------------------------
// 실습: 이벤트로 DOM 조작 (클래스 토글 마법)
// --------------------------------------------------------------------------

// 시나리오: 버튼을 클릭할 때마다 배경색(body)과 버튼색을 반전시킵니다.
const clickedClassName = 'is-clicked'

// [연습 1] 조건문을 사용하여 클래스 'is-clicked'를 수동으로 넣고 빼보세요.
gateButton.addEventListener('click', function() {
  const hasClickedClassName = gateButton.classList.contains(clickedClassName)
  if (hasClickedClassName) {
    gateButton.classList.remove(clickedClassName)
  } else {
    gateButton.classList.add(clickedClassName)
  }
})

// [연습 2] 위 로직을 단축 주문인 toggle()로 한 줄씩 작성해 보세요.
gateButton.addEventListener('click', (e) => {
  console.dir(e)
  gateButton.classList.toggle(clickedClassName)
})

// --------------------------------------------------------------------------
// 실습: 리스너 연결 상태 확인 (브라우저 콘솔용, 웹표준 아님)
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. addEventListener('타입', 핸들러)는 현대 웹 개발의 표준 주문입니다.
// 2. 핸들러 내부에서 classList.toggle()을 사용하면 ON/OFF 상태를 쉽게 만듭니다.
// 3. 레거시 모델(onclick)은 구조와 동작이 섞이므로 실제 프로젝트에서는 피해야 합니다.
// 4. 이벤트 객체(e)는 '누가, 어디서, 어떻게' 사건을 일으켰는지에 대한 보고서입니다.
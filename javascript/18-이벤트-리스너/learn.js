// --------------------------------------------------------------------------
// 실습: 브라우저와 대화하는 방법 (Event Handling)
// --------------------------------------------------------------------------
// * 이벤트(Event): 성문 밖에서 발생하는 사건 (클릭, 키 입력 등)
// * 리스너(Listener): 사건을 기다리는 보초병 (addEventListener)
// * 핸들러(Handler): 사건 발생 시 수행하는 보초병의 행동 (함수)
// --------------------------------------------------------------------------

// 1. 대상 정하기 (보초병이 지킬 성문 선택)
const gateButton = document.querySelector('.clickable')
// console.log(clickableButton)

// 전역에서 접근 가능하도록 공개
// BOM (브라우저 객체 모델: 루트 객체 → window)
// 브라우저 콘솔 패널에서 접근하려면 전역에 공개되어야 한다.
window.gateButton = gateButton

// 2. 이벤트 리스닝 (보초병 배치 및 귀 기울이기)
gateButton.addEventListener('click', () => {
  // 연습: gateButton에 'click' 이벤트 리스너를 추가하고 콘솔에 메시지를 출력하세요.
  console.log('🚪 성문을 두드렸어요!')
})

// --------------------------------------------------------------------------
// 실습: 이벤트로 DOM 조작 (클래스 토글 마법)
// --------------------------------------------------------------------------

// 시나리오: 버튼을 클릭할 때마다 배경색(body)과 버튼색을 반전시킵니다.

const clickedClassName = 'is-clicked'
const body = document.body // HTMLBodyElement

// [연습 1] 조건문을 사용하여 클래스 'is-clicked'를 수동으로 넣고 빼보세요.
// gateButton.addEventListener('click', () => {
//   const hasClickedClassName = gateButton.classList.contains(clickedClassName)
//   if(hasClickedClassName) {
//     gateButton.classList.remove(clickedClassName)
//     body.classList.remove(clickedClassName)
//   } else {
//     gateButton.classList.add(clickedClassName)
//     body.classList.add(clickedClassName)
//   }
// })

// [연습 2] 위 로직을 단축 주문인 toggle()로 한 줄씩 작성해 보세요.

// 인라인 함수를 사용한 예시
// - 재사용이 어렵다.
// gateButton.addEventListener('click', (e) => {
//   gateButton.classList.toggle(clickedClassName)
//   body.classList.toggle(clickedClassName)
// })

// 함수와 이벤트 리스너 등록 코드를 분리한 예시

// 함수 = 객체 = 값 취급  
// 변수 = 함수값 ✅
// 분리의 장점은 재사용이 쉽다.
const handleClick = (e) => {
  // 이벤트 리스너(addEventListener로 연결된 함수)는
  // 이벤트 객체를 전달받습니다.
  console.dir(e)

  gateButton.classList.toggle(clickedClassName)
  body.classList.toggle(clickedClassName)
}

// - 함수실행(함수_또는_함수참조변수_전달)
// - addEventListener('type', (e) => {})
// - addEventListener('type', handleClick)
gateButton.addEventListener('click', handleClick)


// --------------------------------------------------------------------------
// 실습: 리스너 연결 상태 확인 (브라우저 콘솔용, 웹표준 아님)
// --------------------------------------------------------------------------

// console.log(getEventListeners) ❌ ReferenceError


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. addEventListener('타입', 핸들러)는 현대 웹 개발의 표준 주문입니다.
// 2. 핸들러 내부에서 classList.toggle()을 사용하면 ON/OFF 상태를 쉽게 만듭니다.
// 3. 레거시 모델(onclick)은 구조와 동작이 섞이므로 실제 프로젝트에서는 피해야 합니다.
// 4. 이벤트 객체(e)는 '누가, 어디서, 어떻게' 사건을 일으켰는지에 대한 보고서입니다.
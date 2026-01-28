// ## 1. 보기 전환 버튼 그룹

// `e.currentTarget`을 사용해 다음 요구사항을 구현합니다.

// 1. 버튼 중 하나를 클릭하면 활성 상태로 전환하고, 다른 버튼은 비활성 상태로 전환됩니다.
// 2. 사용자에 의해 선택된 뷰(view)가 무엇인 지, 콘솔 패널에 출력합니다.
// 3. `aria-pressed` 속성을 사용해 눌려진 버튼 상태를 명시합니다.

{
  // 보기 전환 버튼 그룹
  const viewToggleGroup = document.querySelector('.view-toggle')
  const toggleButtons = viewToggleGroup.querySelectorAll('[type="button"]')

  // 수집된 버튼 집합을 순환해서 각각의 버튼에 이벤트 리스너 추가
  toggleButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // `e.currentTarget`을 사용해 다음 요구사항을 구현합니다.
      const selectedButton = e.currentTarget
      // console.log('사용자가 선택한 버튼\n', selectedButton)
      
      // 이전에 활성화 상태였던 버튼
      const beforeActivedButton = viewToggleGroup.querySelector('.active')

      // 1-1. 현재 활성 상태였던 버튼을 비활성 상태로 전환
      beforeActivedButton.classList.remove('active')
      // 1-2. 버튼 중 하나를 클릭하면 활성 상태로 전환하고, 다른 버튼은 비활성 상태로 전환됩니다.
      selectedButton.classList.add('active')

      // 2. 사용자에 의해 선택된 뷰(view)가 무엇인 지, 콘솔 패널에 출력합니다.
      // 2-1. getAttribute로 data-로 시작하는 속성 값 가져오기
      console.log(selectedButton.getAttribute('data-view'))
      // 2-1. 요소의 dataset 속성을 사용해 data-로 시작하는 속성 값 가져오기
      console.log(selectedButton.dataset.view)
      
      // 3. `aria-pressed` 속성을 사용해 눌려진 버튼 상태를 명시합니다.
      // 이전 활성 상태였던 버튼(beforeActivedButton)은 aria-pressed="false"로 전환
      beforeActivedButton.setAttribute('aria-pressed', 'false')
      // 현재 활성 상태인 버튼(selectedButton)은 aria-pressed="true"로 전환
      selectedButton.setAttribute('aria-pressed', 'true')
    })
  })

}

const toggleButton = document.querySelector('.js-button-toggle')
const thiss = document.querySelector('.thiss')

thiss.addEventListener('click', handleCangeBGColor)

function handleCangeBGColor(e) {
  this.style.setProperty('background-color', "#155151")

  togglePrassState(this)
}
function togglePrassState(button) {
  if(button.getAttribute('aria-pressed') === 'false') {
    button.setAttribute('aria-pressed', 'true')
  } else {
    button.setAttribute('aria-pressed', 'false')
  }
}

// --------------------------------------------------------------------------
// 실습: 이벤트 핸들러 내 요소 참조 (Event Target)
// --------------------------------------------------------------------------

// [실습] this 키워드를 사용한 요소 참조
// 1. 일반 함수(function)를 이벤트 리스너 콜백으로 등록하세요.
// 2. 함수 내부에서 this가 가리키는 대상의 배경색을 변경하는 로직을 작성하세요.
// 3. 주의: 화살표 함수를 사용할 때와의 차이점을 콘솔로 확인해 보세요.
console.groupCollapsed('this 키워드 활용 실습')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] e.currentTarget을 사용한 요소 참조
// 1. 이벤트 리스너 콜백의 첫 번째 인자로 이벤트 객체(e)를 받으세요.
// 2. e.currentTarget 속성을 사용하여 이벤트를 수신한 요소에 접근하세요.
// 3. 변수 이름(button, someButton 등)에 상관없이 동작하도록 로직을 작성하세요.
console.groupCollapsed('e.currentTarget 활용 실습')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] 화살표 함수에서의 요소 참조 (방어적 프로그래밍)
// 1. 화살표 함수 내부에서 this를 사용했을 때 어떤 결과가 나오는지 테스트하세요.
// 2. 화살표 함수를 사용하면서도 요소를 안전하게 참조하기 위해 e.currentTarget을 활용하세요.
console.groupCollapsed('화살표 함수와 요소 참조')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] 변수 이름 독립성 테스트 (Refactoring)
// 1. 외부 함수를 선언하고 이를 여러 버튼의 이벤트 리스너로 등록하세요.
// 2. 함수 내부에서 특정 변수명이 아닌 '참조 키워드'를 사용하여 재사용 가능한 코드를 만드세요.
console.groupCollapsed('재사용 가능한 핸들러 작성')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. this (일반 함수): 이벤트를 수신(청취)한 요소 그 자체를 가리킵니다.
// 2. e.currentTarget: 이벤트 리스너가 등록된 요소를 명확히 참조하며 가장 권장되는 방법입니다.
// 3. 화살표 함수 주의: 화살표 함수 내부의 this는 상위 스코프(대개 Window)를 가리킵니다.
//    - 화살표 함수를 즐겨 쓰신다면 반드시 e.currentTarget을 사용해 요소를 참조하세요!
// 4. 독립성: 변수 이름에 의존하지 않는 코드를 짜야 리팩토링과 유지보수가 쉬워집니다.
// --------------------------------------------------------------------------
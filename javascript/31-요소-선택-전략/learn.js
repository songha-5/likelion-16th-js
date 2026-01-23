// --------------------------------------------------------------------------
// 실습: 효율적인 요소 선택 전략과 JavaScript 훅(Hook)
// --------------------------------------------------------------------------

// [실습] 다양한 선택자를 활용한 요소 선택
// 1. ID 속성이 'main-title'인 요소를 선택하여 콘솔에 출력하세요.
// 2. Class 속성이 'description'인 요소를 선택하여 콘솔에 출력하세요.
// 3. 'button' 태그 이름을 가진 모든 요소를 선택하여 콘솔에 출력하세요.
// 4. 'data-role' 속성값이 'confirm'인 요소를 선택하여 콘솔에 출력하세요.
console.group('1. 상황별 선택자 활용')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] JS 훅(js-접두사)을 활용한 상호작용 구현
// 1. JS 훅 클래스 '.jsNotification'을 사용하여 알림창 요소를 선택하세요.
// 2. JS 훅 클래스 '.jsHideBtn'을 사용하여 버튼 요소를 선택하세요.
// 3. 버튼에 'click' 이벤트 리스너를 추가하여, 알림창에 'hidden' 클래스가 추가되도록 만드세요.
console.group('2. JS 훅과 이벤트 연결')

const notification = null // 선택자를 작성하세요.
const hideBtn = null      // 선택자를 작성하세요.

// 이곳에 버튼 클릭 시 알림을 숨기는 로직을 작성하세요.

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. 요소가 하나인 경우 고유 식별이 가능한 ID 선택자를 사용하는 것이 가장 좋습니다.
// 2. 요소가 여러 개인 경우 클래스나 속성 선택자를 사용하며, 태그 선택은 지양합니다.
// 3. 태그 선택자는 범위가 너무 넓어 의도치 않은 요소까지 수정될 위험이 큽니다.
// 4. HTML을 직접 제어할 수 없을 때는 데이터 속성(attribute)이 유용한 대안이 됩니다.
// 5. JS 조작용 클래스에 'js-' 접두사를 붙이면 스타일과 기능을 명확히 분리할 수 있습니다.
// 6. JavaScript 훅을 사용하면 유지보수 시 기능 손상을 예방하고 협업 효율을 높입니다.
// --------------------------------------------------------------------------

/* ## . 선택자를 활용해 요소 선택

다음 코드를 복사, 붙여넣은 후 연습을 진행합니다.



1. `id` 속성으로 요소를 선택한 후, 콘솔에 출력합니다.
2. `class` 속성으로 요소를 선택한 후, 콘솔에 출력합니다.
3. `button` 태그 이름으로 모든 요소를 선택한 후, 콘솔에 출력합니다.
4. `data-role` 속성으로 요소를 선택한 후, 콘솔에 출력합니다. */

const choiceId = document.getElementById('main-title')
console.log(choiceId)

const choiceClass = document.querySelector('.description')
console.log(choiceClass)

const choiceButtonAll = document.querySelectorAll('button')
console.log(choiceButtonAll)

const choiceData = document.querySelector("[data-role=confirm]")
console.log(choiceData)

// ## 2. JS 훅을 활용해 요소 선택
// 다음 코드를 복사, 붙여넣은 후 연습을 진행합니다.

// 1. JS 훅을 사용해 요소를 선택합니다.
// 2. `"알림 숨기기"` 버튼을 사용자가 누르면 알림 내용(`notification`)이 감춰지도록 설정합니다.
const hideText = document.querySelector('.js-notification')
const hideButton = document.querySelector('.js-hide-button')

hideButton.addEventListener('click', () => {
  hideText.classList.add('hide')
})

// ## 3. 쇼핑 카트 '전체 선택'

// 쇼핑몰 장바구니에서 흔히 볼 수 있는 **"전체 선택"** 기능을 구현해봅니다.
// 하나의 버튼(`id`)을 클릭했을 때, 여러 개의 상품 요소(`class`)들이 동시에 변경되어야 합니다.

// 다음 코드를 복사, 붙여넣은 후 연습을 진행합니다.


// 1. 'id`를 사용하여"전체 선택" 버튼을 선택하세요.
const allSelcet = document.getElementById('btn-select-all')

// 2. `class`를 사용하여 모든 "상품 아이템(.cart-item)"을 한 번에 선택하세요.
const cartItem = document.querySelectorAll('.cart-item')

allSelcet.addEventListener('click', () => {
  for (let i = 0, l = cartItem.length; i < l; i++) {
    const item = cartItem[i]
    item.classList.add('selected')
  }
})
// 3. 버튼을 클릭하면, 모든 상품 아이템에'selected'클래스가 추가되도록 코드를 작성하세요.
/* allSelcet.addEventListener('click', () => {
  cartItem.forEach((item) => {
    item.classList.add('selected')
  })
}) */

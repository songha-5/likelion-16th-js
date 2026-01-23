// --------------------------------------------------------------------------
// 실습: 스타일 제어 유틸리티 함수 작성 (Utilities)
// --------------------------------------------------------------------------

// [실습] getStyle() 함수
// 1. 요소(element)와 CSS 속성 이름(propertyName)을 인자로 받습니다.
// 2. getComputedStyle()을 사용하여 요소의 계산된 스타일 값을 반환하는 로직을 작성하세요.
console.groupCollapsed('getStyle() 함수 작성')

function getStyle(element, propertyName) {
  // 이곳에 코드를 작성하세요.
  
}

console.groupEnd()


// [실습] setStyle() 함수
// 1. 요소, 속성 이름, 스타일 값을 인자로 받습니다.
// 2. 요소의 style 속성을 사용해 값을 설정하세요.
// 3. 메서드 체이닝이 가능하도록 요소를 반환(return)하세요.
console.groupCollapsed('setStyle() 함수 작성')

function setStyle(element, propertyName, propertyValue) {
  // 이곳에 코드를 작성하세요.
  
}

console.groupEnd()


// [실습] css() 함수
// 1. 위에서 작성한 getStyle과 setStyle을 내부에서 활용하세요.
// 2. propertyValue가 있으면 '설정(set)'하고, 없으면 '읽기(get)'를 수행하도록 조건문을 작성하세요.
console.groupCollapsed('css() 함수 작성')

function css(element, propertyName, propertyValue) {
  // 이곳에 코드를 작성하세요.
  
}

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. getStyle: window.getComputedStyle(element)[propertyName] 활용
// 2. setStyle: element.style[propertyName] = propertyValue return element 활용
// 3. css: 인자(propertyValue)의 존재 여부에 따라 분기 처리 (if/else)
// --------------------------------------------------------------------------
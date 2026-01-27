// --------------------------------------------------------------------------
// 실습: 스타일 제어 유틸리티 함수 작성 (Utilities)
// --------------------------------------------------------------------------

// [실습] getStyle() 함수
// 1. 요소(element)와 CSS 속성 이름(propertyName)을 인자로 받습니다.
// 2. getComputedStyle()을 사용하여 요소의 계산된 스타일 값을 반환하는 로직을 작성하세요.
console.groupCollapsed('getStyle() 함수 작성')

const strongElement = document.querySelector('.prose p:first-of-type strong')
// 첫 번째 버전
function getStyleV1(element, propertyName) {
  const elementStyleSnapshot = getComputedStyle(element)
  const propertyVaue = elementStyleSnapshot.getPropertyValue(propertyName)
  return propertyVaue
}

// 두 번째 버전 // 방어적 코드
function getStyleV2(element, propertyName) {
  if (element === null || element.nodeType !== document.ELEMENT_NODE) {
    console.warn('전달된 element는 문서의 요소가 아닙니다. 확인해보세요.')
    return null
  }
  
  const elementStyleSnapshot = getComputedStyle(element)

  if (typeof propertyName !== 'string') {
    console.warn('전달된 propertyName은 CSS 속성명을 문자열로 전달해야 합니다.')
    return null
  }

  const propertyVaue = elementStyleSnapshot.getPropertyValue(propertyName)
  return propertyVaue
}

console.log(getStyleV1(strongElement, 'font-weight'))
console.log(getStyleV1(strongElement, 'font-size'))
console.log(getStyleV1(strongElement, 'color'))
console.log(getStyleV1(strongElement, 'letter-spacing'))
console.log(getStyleV1(strongElement, 'word-spacing'))  


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
console.group('css() 함수 작성')

{
  
  function getStyle(element, propertyName) {
    getComputedStyle(element).getPropertyValue(propertyName)
  }

  function setStyle(element, propertyName, propertyValue) {
    element.style.setProperty(propertyName, propertyValue)
  }

  function removeStyle(element, propertyName) {
    element.style.removeProperty(propertyName)
  }

  function css(element, propName, propValue) {
    element.style.setProperty(propName, propValue)
  }
}
console.log(css(main, 'color'))
console.log(css(main, 'color', 'red'))
console.log(css(main, 'color', null))

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. getStyle: window.getComputedStyle(element)[propertyName] 활용
// 2. setStyle: element.style[propertyName] = propertyValue return element 활용
// 3. css: 인자(propertyValue)의 존재 여부에 따라 분기 처리 (if/else)
// --------------------------------------------------------------------------

const body = document.body
const main = body.querySelector('main')

function removeStyle(element, propName, propValue) {
  element.style.removeProperty(propName, propValue)
}
console.log(removeStyle(main, 'color', 'red'))


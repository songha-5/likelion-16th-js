// --------------------------------------------------------------------------
// 실습: DOM 요소 선택 (Selecting Elements)
// --------------------------------------------------------------------------
// * querySelector() : CSS 선택자를 사용하여 가장 먼저 발견된 첫 번째 요소를 반환합니다.
// * document.querySelector() : 전체 문서에서 탐색합니다.
// * element.querySelector() : 특정 요소 내부에서만 탐색합니다.
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// document.querySelector - 전체 문서 탐색
// --------------------------------------------------------------------------

// head
console.log(document.querySelector('head'))
// title
console.log(document.querySelector('title'))
// article
console.log(document.querySelector('article'))


// console.log(document.querySelector('head'))
// 1. ID 선택자를 사용하여 '#chapter' 요소를 선택하고 콘솔에 출력하세요.
const chapterElement = document.querySelector('#content')
console.log(chapterElement) // Element 또는 null

// 조건 처리 (문서에 요소가 존재하는지 검토)
// if (!chapterElement) console.warn('#chapter 요소가 문서에 없습니다.')
chapterElement || console.warn('#chapter 요소가 문서에 없습니다.')

// 2. 클래스 선택자를 사용하여 '.sr-only' 요소를 선택하고 콘솔에 출력하세요.
const screenReaderOnlyElement = document.querySelector('.a11y-hidden')
console.log(screenReaderOnlyElement)

if (screenReaderOnlyElement === null) {
  console.warn('.a11y-hidden 선택자로 요소를 찾을 수 없습니다.')
}

// 3. 속성 선택자를 사용하여 title에 'Model'이 포함된([title*="Model"]) 요소를 선택하세요.
const modelElement = document.querySelector('[title*="modle"]')
console.log(modelElement)

if(modelElement === null) {
  console.warn('[title*="modle"] 선택자로 요소를 찾을 수 없습니다.')
}
// 실 - 패
/* const modle = '[title*="modle"]'
const a11y = '.a11y-hidden'
const selectElement = document.querySelector(modle)

if (selectElement === null) {
  console.log( selectElement +'선택자로 요소를 찾을 수 없습니다.')
} */

// 답지
// 반복되는 코드를 재사용하기 위해 함수를 작성하기로 했다.
// 함수(기능)에 걸맞는 이름을 작성하기로 했다.
// 기능: 문서에 요소가 존재하는지 확인한 후, 존재하지 않을 경우 콘솔에 경고하기로 했다.
// 목적: 현재 어떤 상황의 문제가 발생했는지 개발자에게 알리고자 한다.
function checkElementWarn(element, selector) {
  // 요소가 문서에 존재하는지 검증
  // 문서에 요소가 없다면? 콘솔에 경고
  if(element === null) {
    console.warn( selector + ' 선택자로 요소를 찾을 수 없습니다...')
  }
}

console.log(checkElementWarn(chapterElement, '#chapter'))
console.log(checkElementWarn(modelElement, '[title*="modle"]'))


// 설명:
// querySelector는 CSS와 동일한 선택자 방식을 사용하여 요소를 선택합니다.
// 일치하는 대상이 여러 개여도 '가장 먼저 발견된 첫 번째' 요소만 반환합니다.


// --------------------------------------------------------------------------
// element.querySelector - 특정 범위 내 탐색
// --------------------------------------------------------------------------

// 1. 먼저 부모 요소인 '.musicians'를 찾아 변수 musicianList에 할당하세요.
const musiciansList = document.querySelector('.musicians')
console.log(musiciansList)

// 2. musicianList 변수(이미 선택된 요소) 내부에서만 'li' 요소를 찾아 출력하세요.
checkElementWarn(musiciansList, 'li:first-child')
console.log(musiciansList)

// 설명:
// 특정 서가(부모 요소)를 지정하고 그 안에서 책(자식 요소)을 찾는 방식입니다.
// 코드의 의도가 명확해지고, 다른 구역의 요소와 충돌할 버그를 예방하며, 성능 면에서도 효율적입니다.

// 문서의 모든 <li> 요소 중 첫 번째 매칭되는 요소 반환 (없을 경우, null 반환)
const liElement = document.querySelector('.musicians > li:first-child')
console.log(liElement)
// --------------------------------------------------------------------------
// 그 밖의 요소 선택 API (참고)
// --------------------------------------------------------------------------

// 1. getElementById()를 사용하여 '#chapter' 요소를 선택해 보세요.


// 2. getElementsByTagName()을 사용하여 모든 'li' 태그를 선택해 보세요.


// 설명:
// querySelector 이전에 사용되던 고전적인 주문들입니다. 
// ID 선택 시 getElementById는 매우 빠르지만, 유연함은 querySelector가 더 뛰어납니다.


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. querySelector(selector)는 첫 번째 매칭 요소만 가져옵니다.
// 2. 모든 요소를 가져오려면 querySelectorAll(selector)을 사용해야 합니다.
// 3. document는 전체를 대상으로, element는 그 내부를 대상으로 검색 범위를 좁힙니다.
// 4. 대상을 정확히 가리키는 것이 DOM 조작의 첫 번째 단계입니다.
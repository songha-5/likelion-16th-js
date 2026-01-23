// --------------------------------------------------------------------------
// 실습: JavaScript를 활용한 CSS 스타일 동적 제어
// --------------------------------------------------------------------------

// [실습] 기본 스타일 설정 (style 속성 활용)
// 1. '.change-style-button' 버튼과 '.box' 요소를 선택하세요.
// 2. 버튼 클릭 시 다음 스타일을 적용하세요:
//    - 글자색(color): 'white'
//    - 배경색(backgroundColor): '#ed4c67'
//    - 너비(width): '200px'
//    - 높이(height): '150px'

const box = document.querySelector('.box')
const changeStyleButton = document.querySelector('.button')

changeStyleButton.addEventListener(('click'), () => {
  // box.style['background-color'] = '#ed4c67'
  box.style.backgroundColor = '#ed4c67'
  box.style.color = 'white'
  box.style.width = 15 + 'px'
  box.style.height = 150 + 'px'
})

console.groupCollapsed('1. 기본 스타일 설정 (CamelCase)')

// 이곳에 코드를 작성하세요.


console.groupEnd()


// [실습] 사용자 정의 속성 설정 (setProperty 활용)
// 1. '.change-theme-button' 버튼과 '.themed-box' 요소를 선택하세요.
// 2. 버튼 클릭 시 setProperty()를 사용하여 '--theme-color'를 '#A3CB38'로 변경하세요.
console.groupCollapsed('2. 사용자 정의 속성 설정 (Hyphen-case)')

// 이곳에 코드를 작성하세요.


console.groupEnd()


// [실습] 실무 패턴: 진행률 바(Progress Bar) 제어
// 1. '#button-50' 클릭 시: .progress-bar 너비 '50%', 텍스트 '50%'로 변경
// 2. '#button-100' 클릭 시: .progress-bar 너비 '100%', 텍스트 '완료!', 배경색 '#2196f3'로 변경
console.groupCollapsed('3. 실무 응용: Progress Bar')

// 이곳에 코드를 작성하세요.


console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. style 속성 접근: '요소.style.속성명'으로 접근하며, 이름은 카멜 케이스로 작성합니다.
//    (예: background-color -> backgroundColor)
// 2. 단위의 중요성: px, %, rem 등 단위를 생략하면 스타일이 적용되지 않습니다.
// 3. setProperty()의 강점: CSS 변수(--)를 제어할 수 있고, 하이픈 케이스를 그대로 사용합니다.
// 4. 우선순위: JS로 설정한 스타일은 HTML의 style 속성에 직접 삽입되어 CSS 파일보다 우선순위가 높습니다.
// --------------------------------------------------------------------------
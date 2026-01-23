// --------------------------------------------------------------------------
// 실습: HTML 속성 및 데이터 속성 제어 (Attribute & Dataset)
// --------------------------------------------------------------------------

// [실습] 빌트인 속성 및 커스텀 속성 읽기 (getAttribute)
// 1. 문서에서 'data-category' 속성을 가진 요소를 선택하세요.
// 2. getAttribute()를 사용하여 'id', 'class', 'data-category' 값을 각각 콘솔에 출력하세요.
console.groupCollapsed('1. 속성 읽기 검토 (getAttribute)')

// 이곳에 코드를 작성하세요.


console.groupEnd()


// [실습] 불리언(Boolean) 속성 'checked'의 동작 확인
// 1. HTML에 'checked="false"'로 작성된 체크박스 요소를 선택하세요.
// 2. getAttribute('checked')의 값과 해당 요소의 .checked 프로퍼티(true/false) 값을 비교하여 출력하세요.
// 3. (관찰) 왜 "false"라고 적었는데 브라우저에서는 체크된 상태로 보이는지 생각해보세요.
console.groupCollapsed('2. checked 속성 특징 검토')

// 이곳에 코드를 작성하세요.


console.groupEnd()


// [실습] dataset을 이용한 이름 변환(CamelCase) 확인
// 1. 하이픈이 포함된 데이터 속성(예: data-product-name)을 가진 요소를 선택하세요.
// 2. element.dataset 객체를 콘솔에 출력하여 속성명이 어떻게 변환되었는지 확인하세요.
// 3. dataset을 사용하여 해당 값을 '읽기'와 '쓰기' 해보세요.
console.groupCollapsed('3. dataset 이름 변환 규칙 검토')

// 이곳에 코드를 작성하세요.


console.groupEnd()


// [실습] 속성 설정 및 제거 (Manipulation)
// 1. 특정 요소에 setAttribute()를 사용하여 'title' 속성을 새롭게 추가하거나 수정하세요.
// 2. removeAttribute()를 사용하여 'data-category' 속성을 제거한 후 요소의 변화를 확인하세요.
console.groupCollapsed('4. 속성 설정 및 제거 검토')

// 이곳에 코드를 작성하세요.


console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. 속성 vs 프로퍼티: getAttribute는 HTML에 적힌 글자 그대로를, 프로퍼티는 해석된 상태(true/false 등)를 다룹니다.
// 2. dataset 변환: data-user-id(HTML) → dataset.userId(JS)로 카멜 케이스 변환이 일어납니다.
// 3. 불리언 속성: checked, disabled 등은 값이 무엇이든 '존재'하는 것만으로 참(true)이 됩니다.
// --------------------------------------------------------------------------
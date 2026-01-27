// --------------------------------------------------------------------------
// 실습: DOM 탐색 (Traversal)
// --------------------------------------------------------------------------

// [실습] 아래로 탐색 (Downwards)
// 1. 특정 부모 요소 내부에서 querySelector()를 사용해 자손 요소를 찾는 로직을 작성하세요.
// 2. children 속성(HTMLCollection)을 Array.from()을 이용해 배열로 변환하고 순회해 보세요.
// 3. firstElementChild와 lastElementChild를 사용해 첫 번째와 마지막 자식에 접근하세요.
console.groupCollapsed('아래로 탐색 실습')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] 위로 탐색 (Upwards)
// 1. parentElement 속성을 사용하여 특정 요소의 직계 부모 노드에 접근하세요.
// 2. closest() 메서드를 사용하여 상위 요소 중 특정 클래스를 가진 가장 가까운 조상을 찾으세요.
// 3. 찾고자 하는 상위 요소가 없을 경우(null)를 대비한 방어적 코드(if문)를 작성하세요.
console.groupCollapsed('위로 탐색 실습')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] 옆으로 탐색 (Sideways)
// 1. nextElementSibling과 previousElementSibling을 사용하여 형제 요소 사이를 이동하세요.
// 2. parentElement와 children 조합을 사용하여 특정 인덱스의 형제 요소에 접근하세요.
// 3. Array.from().at(-1)을 사용하여 마지막 형제 요소를 선택하는 로직을 작성하세요.
console.groupCollapsed('옆으로 탐색 실습')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// [실습] 안전한 탐색 (Defensive Programming)
// 1. NodeList의 item() 메서드를 사용하여 인덱스 범위를 벗어날 때 null이 반환되는지 확인하세요.
// 2. 탐색 결과가 null인 경우 console.warn()을 통해 안내 메시지를 출력하는 로직을 작성하세요.
console.groupCollapsed('안전한 탐색 및 방어적 프로그래밍')

// 이곳에 코드를 작성하세요.

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. 탐색의 효율성: 전체 문서(document)에서 찾는 것보다 기준 요소에서 탐색하는 것이 더 빠릅니다.
// 2. HTMLCollection vs NodeList:
//    - children은 HTMLCollection을 반환하며, forEach를 쓰려면 배열로 변환(Array.from)이 필요합니다.
//    - querySelectorAll은 NodeList를 반환하며, 직접 forEach 사용이 가능합니다.
// 3. 위로 탐색의 핵심: 한 단계 위는 parentElement, 멀리 있는 조상은 closest()가 정답입니다.
// 4. 방어적 프로그래밍: 탐색 메서드는 대상을 못 찾으면 null을 반환합니다. 
//    - 항상 null 체크를 통해 '정의되지 않은 에러(undefined error)'를 방지하세요!
// --------------------------------------------------------------------------
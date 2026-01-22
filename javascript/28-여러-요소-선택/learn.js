// `querySelectorAll()` 메서드를 사용해 연습해보세요.



// 1. 좋은 사람(Good Guy)을 모두 선택하세요.
const goodGuy = document.querySelectorAll('[data-type=good-guy]')
console.log(goodGuy)

// 2. 좋은 사람(Good Guy) 모두에게 `excellent` 클래스 이름을 추가하세요.
for ( const guy of goodGuy ) {
  guy.classList.add('excellent')
}

// 3. 빌런(Villain)을 모두 선택하세요.
const villains = document.querySelectorAll('[data-type=villain]')

// 4. 빌런 모두에게 `naughty` 클래스 이름을 추가하세요.
// for ( const villain of villains ) {
//   villain.classList.add('naughty')
// }
villains.forEach((villain) => villain.classList.add('naughty') )

// 5. 모든 캐릭터(Character)를 선택하세요.
const characters = document.querySelectorAll('.character')

// 6. 모든 캐릭터에 `star-wars` 클래스 이름을 추가하세요.
characters.forEach((character) => character.classList.add('star-wars'))
// --------------------------------------------------------------------------
// 실습: 다중 요소 선택과 반복
// --------------------------------------------------------------------------
// * querySelectorAll : 조건에 맞는 모든 방(요소)을 한 번에 선택합니다.
// * NodeList         : 선택된 요소들의 집합이며, 배열과 유사한 특징을 가집니다.
// * Live vs Static   : 장부가 실시간으로 업데이트되는지 여부를 결정합니다.
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// 여러 요소를 선택하는 대체 방법
// * getElementsByTagName()
// * getElementsByClassName()
// --------------------------------------------------------------------------

// 문서의 모든 섹션 요소 찾아보자.
const allSectionElements = document.getElementsByTagName('section')

// console.log(allSectionElements) // HTMLCollection

// TypeError: allSectionElements.forEach is not a function
// 반복하고 싶은데??? 어떻게 해야 할까?
// allSectionElements.forEach((element) => {
//   console.log(element)
// })

// 그래? 그러면 반복문을 사용해 HTMLCollection 객체를 반복하자.
// - ✅ while (index가 필요해!)
// - ✅ do...while
// - ✅ for (index가 필요해!)
{
  for (let i = 0, l = allSectionElements.length; i < l; ++i) {
    // eslint-disable-next-line no-unused-vars
    const element = allSectionElements[i] // 또는 .item(i) 메서드 활용
    // console.log(element)
  }
}
// - ✅ for...of
{
  // eslint-disable-next-line no-unused-vars
  for(const element of allSectionElements) {
    // console.log(element)
  }
}

// - ⚠️ for...in (객체 순환용)
// - ❌ forEach (지원하지 않음) : 아... 이 방법 쓰고 싶은데...
//   🌻 아하! Array.from() 메서드가 있었지!! 배열로 바꿔서 해보자!
console.log(Array.isArray(allSectionElements)) // false
console.log(Array.isArray(Array.from(allSectionElements))) // true

// 문서의 모든 섹션 요소 찾아보기
// const allSectionElements = document.getElementsByTagName('section')

// 클래스 속성 이름으로 문서에서 요소를 수집해보자
const allReginByClassName = document.get

// --------------------------------------------------------------------------
// NodeList vs HTMLCollection
// --------------------------------------------------------------------------
// NodeList (Static Collection)     : querySelector, querySelectorAll
// HTMLCollection (Live Collection) : getElementsByTagName, getElementsByClassName
// --------------------------------------------------------------------------

console.group('ModeList bs HHTMLCollection')
// const lifeTips = document.querySelector('.life-tips')

// Sttic Collection (NodeList)
// const staticCollecttion = lifeTips.querySelector('p')

// Live Collection (HTMLCollection)
// const liveCollection = lifeTips.getElementsByTagName('p')

// 현재는 스태틱/라이브 콜랙션 모두 동일해보이지만
// 동적으로 DOM 조작(Manipulation) 해봄 => 화면 변경(update view)

// console.log(lifeTips)
console.groupCollapsed()

const lifeTips = document.querySelector('.life-tips')

// 라이브 콜렉션 (HTMLCollection)
// const liveCollection = lifeTips.getElementsByTagName('p')

// 스태틱 콜렉션 (NodeList)
// const staticCollection = lifeTips.querySelectorAll('p')


// --------------------------------------------------------------------------
// while 문
// --------------------------------------------------------------------------

// 특정 클래스를 가진 단락이 없을 때까지 첫 번째 요소를 반복 수정
// - 찾을 요소들의 선택자: '.life-tips p'
// - 인덱스를 활용해 순차적으로 접근


// --------------------------------------------------------------------------
// do...while 문
// --------------------------------------------------------------------------

// 최소 한 번은 첫 번째 단락의 배경색을 변경하고 조건 확인
// - 조건이 거짓이더라도 첫번째 요소는 배경색 변경
// - 단 한 번만 실행되도록 설정
const checkIndex = 0


// --------------------------------------------------------------------------
// for 문
// --------------------------------------------------------------------------

// 정해진 횟수만큼 단락에 고유 ID 부여
// - 설정할 고유 ID: 'tip-*'


// --------------------------------------------------------------------------
// 배열 반복 (역순/정순)
// --------------------------------------------------------------------------

// for 문 (정순)
// - 'is-active' 클래스 추가

// for 문 (역순)
// - 아래에서 위로 올라오며 텍스트 내용 출력
// - '역순 점검 중: ' + 단락 내용


// --------------------------------------------------------------------------
// for...of 문 (NodeList 순회 추천)
// --------------------------------------------------------------------------

// 가독성 좋게 모든 단락에 스타일 일괄 적용
// - 글자 색상에 'var(--primary-color)' 설정


// --------------------------------------------------------------------------
// for...in 문 (객체 반복)
// --------------------------------------------------------------------------

// ⚠️ 주의
//    NodeList나 배열에는 권장하지 않음. 
//    순수 객체의 정보를 확인할 때 사용.
const hotelInfo = {
  name: '배열 호텔',
  totalRooms: 100,
  isFull: false,
}

// 호텔 정보 출력
// - '호텔 정보 - ' + 키 + ' : ' + 키에 매칭되는 값 


// --------------------------------------------------------------------------
// forEach 메서드 활용 (NodeList 지원)
// --------------------------------------------------------------------------

// 단락 요소 집합 순회
// - 콘솔 패널에 '[인덱스]번째 정보 수정 완료' 출력


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. querySelectorAll()은 정적(Static) 컬렉션인 NodeList를 반환합니다.
// 2. NodeList는 배열이 아니지만 for...of와 forEach를 직접 사용할 수 있습니다.
// 3. getElementsByTagName 등은 라이브(Live) 컬렉션을 반환하여 실시간 DOM 변화를 감지합니다.
// 4. 새로운 요소가 추가되어도 이미 연결된 이벤트는 자동으로 전파되지 않으므로 '이벤트 위임'이 유리합니다.
// 5. Array.from(nodeList)를 사용하면 NodeList를 완전한 배열로 변환하여 map, filter 등을 쓸 수 있습니다.
// --------------------------------------------------------------------------



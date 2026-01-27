// querySelectorAll이랑 getElementsByTagName 차이 설명해주신 거에서
// DOM이 동적으로 추가된다는 말이 아직 잘 감이 안 옵니다.....

// 둘 다 똑같아 보이는데, 버튼 눌렀을 때 p 태그 하나 추가되는 간단한 예제로
// DOM이 바뀌는 순간에 NodeList랑 HTMLCollection이
// 어떻게 다르게 보이는지 한 번만 다시 실습으로 보여주실 수 있을까요?

// (수업시간에 이해해보려고하는데.. 코드가 너무 많아서.. 눈에 잘들어오지 않았어요 ㅠㅠ)


const starWars = document.getElementById('star-wars')
// console.log(starWars)

// 정적 수집(Static Collection)
// - querySelectorAll
const queryAll = starWars.querySelectorAll('li')
// console.log(queryAll) 
// 출력 결과: NodeList(3) [li.character, li.character, li.character]

// 동적 수집(Live Collection)
// - getElementsByClassName
// - getElementsByTagName
const getElements = starWars.getElementsByClassName('character')
// console.log(getElements) 
// 출력 결과: HTMLCollection(3) [li.character, li.character, li.character]

console.log('스태틱 콜렉션 (NodeList) 결과:', queryAll)
console.log('라이브 콜렉션 (HTMLCollection) 결과:', getElements)

const manipulateButton = document.querySelector('.prose button')
// console.log(manipulateButton)

manipulateButton.addEventListener('click', () => {
  console.log('DOM 조작(Manipulation): 화면 변경 (Update View)')
  // starWars(<ul>) 안에 마지막 자식 요소 노드로 새 항목(<li>) 추가
  starWars.innerHTML += '<li class="character" data-type="villain">카일로 렌</li>'

  console.log('스태틱 콜렉션 (NodeList) 결과:', queryAll)
  console.log('라이브 콜렉션 (HTMLCollection) 결과:', getElements)
})
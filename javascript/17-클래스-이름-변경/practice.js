console.log('practice')

// 문서에서 practice 요소 찾기
const practice = document.querySelector('.practice')

// 실습 진행을 위한 메서드 이름 변수
let methodName = 'add', activeClassName = 'text-indigo-600'

// .practice .item-add 요소 찾기
const itemAdd = practice.querySelector('.item-add')
console.log(itemAdd)

// itemAdd(객체)가 활성 클래스 이름을 가지고 있다면?
// 활성 클래스 이름을 제거해야 하니까 methodName값을 'remove'로 변경
if(itemAdd.classList.contains(activeClassName)) methodName = 'remove' // ???????????????????????????????
console.log('method', methodName)

console.log(typeof itemAdd.classList[methodName])//왜 타입오브가   펑션이지 메서드라?? ???????????????????????????????????????????
itemAdd.classList[methodName](activeClassName) // 왜 []대괄호고 그다음은 ()왜 괄호가 가들어가지 이 괄호의 이름은 뭐지?
// itemAdd.classList[methodName](activeClassName)


// 클래스 삭제
const itemRemove = practice.querySelector('.item-remove')
// console.log(itemRemove)

itemRemove.classList.remove('bg-yellow-100')

// 한 번에 글자색, 두께, 배경색을 모두 바꿔보세요! (연쇄 조작)
const itemMultiple = practice.querySelector('.item-multiple')
itemMultiple.classList.add('bg-yellow-100', 'text-green-500', 'font-semibold')

// "text-red-500"을 "text-green-500"으로 교체해 보세요! (교체)
const itemReplace = practice.querySelector('.item-replace')
itemReplace.classList.replace('text-red-500', 'text-green-500')

function replaceElementClasses(targetElement, removeClass, ...addClasses) {
  targetElement.classList.remove(removeClass)
  targetElement.classList.add(...addClasses)
}

replaceElementClasses(
  itemReplace, 
  'text-red-500', 
  'text-purple-500', 'font-bold', 'text-lg'
)


// 없는 클래스를 다른 클래스로 바꾸려 하면 어떻게 될까요? (안정성)
const itemSafeReplace = practice.querySelector('.item-safe-replace')
console.log(itemSafeReplace)

itemSafeReplace.classList.replace('unknown-class', 'text-blue-500')

// "text-indigo-600" 클래스가 있다면 제거하고, 없다면 추가해보세요. (토글)
const itemContainsTarget = practice.querySelector('.item-contains-target')
// 토글
itemContainsTarget.classList.toggle('text-indigo-600')

// 논리에 의한 조건 처리
if(itemContainsTarget.classList.contains('text-indigo-600')) {
  itemContainsTarget.classList.remove('text-indigo-600')
} else {
  itemContainsTarget.classList.add('text-indigo-600')
}
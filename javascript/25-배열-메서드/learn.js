// --------------------------------------------------------------------------
// 실습: 배열 조작 (Array Manipulation)
// --------------------------------------------------------------------------
// * indexOf() : 손님의 방 번호(인덱스)를 찾는 탐지기
// * push / pop : 호텔 끝방(마지막) 관리
// * unshift / shift : 호텔 입구(처음) 관리
// * splice() : 장부 중간을 수정하는 만능 도구
// * slice() : 원본 보존을 위한 장부 복사본 생성
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 손님 위치 파악하기
// --------------------------------------------------------------------------

const guestList = ['지율', '상연', '야무', '범쌤']

// [퀴즈] '야무' 손님은 몇 번 방에 계실까요?

function hasElement(object, item)  {
  const value = object.indexOf(item)
  return value > -1
}

console.log(hasElement(guestList, '야무'))
console.log(hasElement(guestList, '슬비'))
console.log(guestList.indexOf('슬비'))
console.log(guestList.indexOf('슬비'))

hasElement(guestList, '야무')
hasElement(guestList, '슬비')

guestList[guestList.length] = '슬비'
console.log(guestList.at(-1))

guestList.push('PUSH추가', '두개추가')
console.log(guestList)

guestList.pop()
console.log(guestList)


// --------------------------------------------------------------------------
// 입구와 끝방 손님 관리 (Push, Pop, Unshift, Shift)
// --------------------------------------------------------------------------


// 1. 끝방(마지막)에 새로운 손님 모시기
// ['지율', '상연', '야무', '범쌤', '심선생님']

// 2. 입구(첫 번째) 손님 배웅하기
// '지율' 퇴실
// console.log('방금 체크아웃하신 분:', leavingGuest)


// --------------------------------------------------------------------------
// 만능 도구 splice()로 장부 중간 수정하기
// --------------------------------------------------------------------------
// 공식: splice(시작_인덱스, 제거_개수, 추가_할_항목)

const numbers = [1, 2, 5]

// 중간(인덱스 2)에 3, 4를 추가하고 싶다면?
// console.log('장부 중간 수정 결과:', numbers) // [1, 2, 3, 4, 5]
numbers.splice(2, 0, 3, 4)
console.log(numbers)

numbers.splice(2,0,3,4)
console.log(numbers)

// 특정 구간(인덱스 1부터 3개)의 손님을 배웅하려면?
// [2, 3, 4] 제거
// console.log('남은 장부:', numbers) // [1, 5]
const removeNumber = numbers.splice(0,2)
console.log(removeNumber)
console.log(numbers)

// --------------------------------------------------------------------------
// 안전한 백업 장부 만들기 (slice)
// --------------------------------------------------------------------------

const originalLog = ['데이터1', '데이터2', '데이터3']
let backupLog = originalLog.slice(0) // 원본과 똑같은 사본 생성
// let backupLog = originalLog.slice(0, 1) // 원본과 똑같은 사본 생성
// let backupLog = originalLog.slice(0, originalLog.length) // 원본과 똑같은 사본 생성
// let backupLog = originalLog.slice(1) // 원본과 똑같은 사본 생성

originalLog.splice(originalLog.length - 2, 2)

console.log('원본 장부', originalLog)
console.log('원본 장부', backupLog)




// 사본(배열)에 끝에 '데이터4' 추가

// 사본을 수정해도 원본은 안전합니다. (불변성 유지)
console.log('원본 장부:', originalLog) 
console.log('백업 장부:', backupLog)

const items = [1,2,3,4,5,6,7,8]
// 값이 들어오면 
function removeItemsFromLast(arrayObjet, removeCount) {
  const startIndex = arrayObjet.length - removeCount
  const removeItems = arrayObjet.splice(startIndex, removeCount)
  return removeItems
}

const removedItems = removeItemsFromLast(items ,6)
console.log(items)
console.log(removedItems)



// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. indexOf는 원시 값(문자, 숫자)을 찾을 때 최적입니다.
// 2. splice는 원본 배열을 직접 수정(Mutable)하므로 주의해서 사용해야 합니다.
// 3. slice는 원본을 건드리지 않고 새로운 배열을 반환(Immutable)합니다.
// 4. 배열의 시작 조작(unshift, shift)은 끝 조작(push, pop)보다 컴퓨터에게 더 힘든 작업입니다.
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 린터(Linter) 점검 실습: 아래 코드의 '잠재적 버그'를 예측해보세요.
// --------------------------------------------------------------------------

const fruits = ['사과', '바나나']

// ⚠️ 린터가 'no-unused-vars' 경고를 보낼 수 있습니다.
// const lastFruit = fruits.pop()
fruits.pop()
console.log(fruits)
fruits.pop()
console.log(fruits)
// 만약 pop()을 한 번 더 실행한다면, fruits는 어떤 상태가 될까요?


// 아래 작성된 배열 데이터를 사용해 실습을 진행합니다. (people 배열을 복사해 연습)


const people = [
  '세종대왕',
  '이순신',
  '김구',
  '유관순',
  '장영실',
  '신사임당',
]

// 1. people 배열에서 '이순신' 항목의 인덱스를 확인합니다.
const sunsin = people.indexOf('이순신')
console.log(sunsin)

// 2. people 배열 시작 위치에 '정약용', '지석영'을 추가합니다. 
people.unshift('정약용', '지석영')
console.log(people)

// 3. people 배열 끝 위치에 '김유신', '을지문덕'을 추가합니다. 
people.splice(people.length, 0, '김유신', '을지문덕')
console.log(people)

// 4. people 배열 시작 위치에서 '세종대왕', '이순신'을 제거합니다.
people.splice(0, 0, '세종대왕', '이순신')
console.log(people)

// 5. people 배열 끝 위치에서 '장영실', '신사임당'을 제거합니다.
function delect (object, index, delectPeople) {
  const removePeople = object.splice(index, delectPeople)
  const result = object.splice(removePeople)
  return result
}
console.log(delect(people, 9, 2))

function shiftMany(arrayObject, removeCount) {
  // 함수 로직 작성
  return arrayObject.splice(0, removeCount)
}

// 사용법
const removedGreatePeople = shiftMany(people, 3)
console.log(removedGreatePeople)
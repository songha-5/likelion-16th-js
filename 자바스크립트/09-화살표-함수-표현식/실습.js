// --------------------------------------------------------------------------
// 실습: 화살표 함수 표현식 (Arrow Function Expression)
// --------------------------------------------------------------------------
// * 화살표 함수 : function 키워드 대신 '=>' 기호를 사용하여 함수를 간결하게 정의합니다.
// * 매개변수 규칙 : 매개변수의 개수에 따라 소괄호 () 생략 여부가 달라집니다.
// * 암묵적 반환 : 중괄호 {}를 생략하면 코드가 한 줄일 때 자동으로 값을 반환합니다.
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// 기본 구문 비교 (함수 표현식 vs 화살표 함수)
// --------------------------------------------------------------------------

// 일반 함수 표현식으로 sum 함수 정의 (매개변수 x, y / function 키워드 사용)

// 화살표 함수 표현식으로 add 함수 정의 (매개변수 x, y / => 기호 사용)

// sum 함수와 add 함수를 각각 호출하여 결과 콘솔 출력
const sum = function(x, y) {
  return parseFloat(x) + parseFloat(y)
}
console.log(sum(1, 2))

const sumArrow = (x, y) => {
  return parseInt(x) + parseInt(y)
}
console.log(sumArrow(1,2))

// 설명:
// 화살표 함수는 function 키워드를 제거하고, 
// 매개변수와 본문 사이에 '=>'를 추가하여 작동합니다.

// 출력 결과: 
// 두 함수 모두 동일한 덧셈 결과 출력


// --------------------------------------------------------------------------
// 매개변수 개수에 따른 구문 변화
// --------------------------------------------------------------------------

// 1. 매개변수가 없는 경우
// 빈 소괄호 () 또는 밑줄 _ 을 사용하여 log 함수 정의 ('로그' 출력)
// log 함수 호출
// 소괄호 사용
const px2rem = () => {
  return 'Hello JavaScript! 😃'
}
console.log(px2rem())
// 언더스코어, $ 사용가능
// $는 거의 안씀 
// 언더스코어는 비공개라는 뜻
/* const helloJS = _ => {
  return 'HI'
} */
const helloJS = $ => {
  return 'HI'
}
console.log(helloJS())

// 2. 매개변수가 1개인 경우
// 소괄호를 생략하고 매개변수(value)만 작성하여 double 함수 정의 (값 2배 반환)
// double 함수 호출 및 결과 출력

// 3. 매개변수가 2개 이상인 경우
// 소괄호를 반드시 포함하여 multiply 함수 정의 (두 값의 곱 반환)
// multiply 함수 호출 및 결과 출력

// 설명:
// 매개변수가 1개일 때만 소괄호를 생략할 수 있어 코드가 더 간결하게 작동합니다.
// 출력 결과:
// - 로그
// - 입력값의 2배
// - 입력값의 곱


// --------------------------------------------------------------------------
// 암묵적 반환 (Implicit Return)
// --------------------------------------------------------------------------

// 일반적인 화살표 함수 (중괄호 {}와 return 키워드 사용)
// 명시적 반환(Explicit Return) 함수 정의 (x + y 반환)

// 암묵적 반환을 사용하는 화살표 함수 (중괄호 {}와 return 생략)
// 암묵적 반환(Implicit Return) 함수 정의 (x + y 반환)

// 명시적 반환
/* const rem2px = (remValue) => {
  return parseFloat(remValue) * 16 + 'px'
} */

// 변신 1. 매개변수 1개 (소괄호 생략)
/* const rem2px = remValue => {
  return parseFloat(remValue) * 16 + 'px'
} */

// 변신 2. 암묵적 반환
const rem2px = (remValue) => parseFloat(remValue) * 16 + 'px'

console.log(rem2px(2))
console.log(rem2px('2'))
console.log(rem2px('2rem'))

// 두 함수의 결과 비교 출력

// 설명:
// 본문이 한 줄이고 중괄호가 없으면, 자동으로 계산된 값이 반환되도록 작동합니다.
// 출력 결과: 두 함수 모두 동일한 덧셈 결과 출력


// --------------------------------------------------------------------------
// 객체(Object) 반환 시 주의사항
// --------------------------------------------------------------------------

// 문자열 value를 받아 객체 { key: value }를 반환하는 createObject 함수 정의

// 함수 선언문
function createPerson(name, age, hobby) {
  const person ={
    name : name,
    age: age,
    hobby: hobby
  }

  return person
}
const minji = createPerson('민지', 17, '유튜브 시청')
const jisu = createPerson('지수', 34, '게임')
console.log(minji)
console.log(jisu)

const createPersonArrow = (name, age, hobby) => {
  const person = {
    name : name,
    age: age,
    hobby: hobby
  }

  return person
}
const sujin = createPersonArrow('수진', 17, '유튜브 시청')
const minho = createPersonArrow('민호', 34, '게임')
console.log(sujin)
console.log(minho)
const createPersonFn = function (name, age, hobby) {
  const person = {
    name : name,
    age: age,
    hobby: hobby
  }

  return person
}
const jiho = createPersonFn('지호', 17, '유튜브 시청')
console.log(jiho)

const createHouse = (name, category, area) => ({
  name : name,
  category : category,
  area: parseInt(area)
})
console.log(createHouse('성수동 자가','자가', 25000))
// 주의: 객체 리터럴의 중괄호 {}를 함수 본문 블록으로 착각하지 않도록 소괄호 ()로 감싸야 함

// createObject 함수 호출 및 결과 출력

// 설명:
// 객체를 암묵적으로 반환하려면 ({ key: value }) 형태처럼 소괄호로 감싸야 정상적으로 작동합니다.
// 출력 결과: { key: "입력한 값" }



// --------------------------------------------------------------------------
// 핵심!
// --------------------------------------------------------------------------
// 1. function 키워드 대신 화살표(=>)를 사용해 코드를 간결하게 만듭니다.
// 2. 매개변수가 1개면 소괄호 생략 가능, 0개거나 2개 이상이면 필수입니다.
// 3. 중괄호 {}를 생략하면 return 없이도 값이 자동으로 반환(암묵적 반환)됩니다.
// 4. 객체를 바로 반환할 때는 소괄호 ()로 감싸주어야 합니다.
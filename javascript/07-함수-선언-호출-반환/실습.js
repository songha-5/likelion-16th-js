// --------------------------------------------------------------------------
// 실습: 함수 (Function, 기능)
// --------------------------------------------------------------------------
// * 함수는 입력(Input) -> 처리(Processing) -> 출력(Output)을 담당하는 기능입니다.
// * 매개변수(Parameter)와 인자(Argument)의 차이를 이해해야 합니다.
// * 함수는 값을 반환(return)할 수 있으며, 값으로 취급됩니다.
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// 기본 함수 선언과 호출
// --------------------------------------------------------------------------

// 함수 선언 (기능 정의)
// "어떤 기능을 만들고 싶은가?"
// - 뭔가를 하는데... 어라? 자꾸 반복하네?
//   이거... 재사용하면 좋겠는데??? 
//   그래!!! 함수(기능)을 선언(정의)하자!

// 함수 호출 (기능 사용)
// "라면 끓이기 기능을 만들고 싶어!!"
function 라면_끓이기(라면_이름, 추가_재료) {
  // 함수가 처리해야할 절차
  console.log('1. 냄비에 물 올리기')
  console.log('2. 끓는 물에 라면 사리와 스프 넣기')
  console.log('3. 3분 끓이기 (면발 탱글탱글하게)')
  console.log('4. 냄비에서 그릇으로 옮기기')
  console.log('5. 김치 챙기기')
  
  // 함수가 반환하는 값
  // 함수 중단: 함수 내부에서 return을 만나면 JS 엔진이 더 실행하지 않고 중단
  return 추가_재료 + '를 넣어 더 맛있게 끓여진 ' + 라면_이름 + '~ 🍜'

  // console.log('왜 실행 안해요?')
  // console.log('이유는 JS 엔진이 함수 내부에서 return을 만났거든요!')
}

// 설명: 함수 이름 뒤에 소괄호 ()를 붙여서 실행(Call)합니다.
console.log(라면_끓이기('진라면', '파'))
// 출력 결과:
// '물 길러가!'
// '1. 양동이 챙기기'
// '2. 우물 다녀오기'


// --------------------------------------------------------------------------
// 매개변수와 인자
// --------------------------------------------------------------------------

// 성과 이름을 전달 받아 이름을 출력하는 함수 작성
// 설명: 함수 정의 시 변수는 '매개변수', 호출 시 전달하는 값은 '인자'입니다.
// 출력 결과:
// 성 = 지
// 이름 = 훈

// 인자를 전달하지 않은 경우
// 설명: 값을 전달하지 않으면 매개변수는 `undefined`가 됩니다.
// 출력 결과:
// 성 = undefined
// 이름 = undefined


// --------------------------------------------------------------------------
// 반환문 (Return)
// --------------------------------------------------------------------------

// 두 수를 합(add)한 결과를 반환하는 함수 작성
// 설명: `return` 키워드는 값을 반환하고 함수 실행을 즉시 종료합니다.
// 출력 결과: 결과값: 두 수의 합 (number)

// 암묵적 반환
// 설명: `return`이 없는 함수는 암묵적으로 `undefined`를 반환합니다.
// 출력 결과: undefined


// --------------------------------------------------------------------------
// 표현식 전달 (평가 순서)
// --------------------------------------------------------------------------

// 두 수의 곱(multiply)을 계산해 결과를 반환하는 함수 작성
function multiply(x, y) {
  return x * y
}

// 함수 호출 안에 다른 함수 호출(표현식)이 있는 경우
// 설명:
// 1. multiply(3, 5)가 먼저 평가(실행)되어 15이 됨
// 2. add(15, 12)이 실행됨
// 출력 결과: 27
function add(x, y) {
  return x + y
}

const result1 = add(15, 12)
const result2 = add(multiply(5, 3), 9 + 3)
console.log(result1)
console.log(result2)


// --------------------------------------------------------------------------
// 함수 표현식 (Function Expression)
// --------------------------------------------------------------------------

// JavaScript
// 기본 타입
// 1. String
// 2. Number
// 3. Boolean
// 4. Undefined
// 5. Null
// 6. Symbol
// 7. BigInt

// 객체 타입
// 1. Object
// 2. Array
// 3. Function

// 변수에 함수를 값처럼 할당
// 설명: 함수는 '값'이므로 변수에 할당할 수 있습니다. (익명 함수 사용)

// 함수 선언
function 함수이름() {
  console.log('나는 이름이 없는 함수입니다.')
  console.log('익명 함수')
  console.log('무명 함수')
}

// 함수 표현식(Function Expression)
// JavaScript 세상에서 함수는 `값`
// 변수에 값을 할당
// 함수는 값이므로 변수에 함수를 값으로 할당
// 변수에 할당하는 함수 이름은 없어도 되요. (익명 함수)
const 나의_함수 = function(정체) {
  return 정체 + ': 함수는 값이므로 변수에 할당 가능'
}

console.log(나의_함수('함수 표현식'))


// 두 수의 차(subtract)를 계산해 결과를 반환하는 함수 작성
// 출력 결과: 7


// --------------------------------------------------------------------------
// 핵심!
// --------------------------------------------------------------------------
// 1. 매개변수(Parameter)는 '빈 상자(변수)', 인자(Argument)는 '실제 내용물(값)'입니다.
// 2. `return`을 만나면 함수는 그 즉시 종료되고 값을 반환합니다.
// 3. 함수에 수식이나 다른 함수를 넣으면, 먼저 계산(평가)된 뒤에 결과값이 전달됩니다.


// --------------------------------------------------------------------------
// 실습 풀이
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 1. logger 이름의 함수를 선언하고, 
//    logMessage 매개변수로 받아 콘솔 패널에 출력하도록 작성합니다.
// 함수 정의
// 1. 함수 선언문
function logger(nth) {
  // 암묵적으로 undefined 반환
  // return

  // 명시적으로 결과 값 반환
  return parseInt(nth, 10) + ' 학번 화이팅!'
}

const myLogger = function(nth, message) {
  let resultMessage = ''
  resultMessage += '멋사 ' + parseInt(nth, 10) + '기 여러분!'
  resultMessage += ''
  resultMessage += message
  resultMessage += '😆'

  return resultMessage
}
console.log(myLogger(16, '오늘도 행복하세요!'))

// 함수 실행(사용, 호출)
console.log(logger('16기'))
console.log(logger(14))
console.log(logger(12))


// 표 생성하는 함수(기능)
// JavaScript를 사용해 마크업 (구조 설계)
function 표_만들기(표_제목) {
  // const 표_마크업 = '<table><caption>' + 표_제목 + '</caption><tr><th scope="col">셀 제목 1</th><th scope="col">셀 제목 2</th></tr><tbody><tr><td>셀 내용 1</td><td>셀 내용 2</td></tr></tbody></table>'

  // 요즘엔 이 방법을 사용하지 않음
  // +=를 어떻게 활용하는지 보기 위해서 적용한 예제
  let 표_마크업 = ''
  표_마크업 += '<table>'
  표_마크업 += '  <caption>' + 표_제목 + '</caption>'
  표_마크업 += '  <tr>'
  표_마크업 += '    <th scope="col">셀 제목 1</th>'
  표_마크업 += '    <th scope="col">셀 제목 2</th>'
  표_마크업 += '  </tr>'
  표_마크업 += '  <tbody>'
  표_마크업 += '    <tr>'
  표_마크업 += '      <td>셀 내용 1</td>'
  표_마크업 += '      <td>셀 내용 2</td>'
  표_마크업 += '    </tr>'
  표_마크업 += '  </tbody>'
  표_마크업 += '</table>'

  return 표_마크업
}

console.log(표_만들기('JavaScript로 마크업하기!'))
console.log(표_만들기('HTML로 마크업하기!'))

// --------------------------------------------------------------------------
// 2. px 값을 rem 단위 값으로 변경하는 pxToRem 함수를 선언하고, 
//    계산된 값을 반환하도록 작성하세요.

function pxToRem(pxValue) {
  return parseFloat(pxValue) / 16 + 'rem'
}

// 숫자 타입이 인자로 전달된 경우
console.log(pxToRem(20))
// 문자열 타입이 인자로 전달된 경우
console.log(pxToRem('20'))
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(pxToRem('20px'))

// --------------------------------------------------------------------------
// 3. rem 단위 값을 px 값으로 변경하는 remToPx 함수를 선언하고, 
//    계산된 값을 반환하도록 작성해보세요.

function remToPx(remValue) {
  return parseFloat(remValue) * 16 + 'px'
}

// 숫자 타입이 인자로 전달된 경우
console.log(remToPx(6))
// 문자열 타입이 인자로 전달된 경우
console.log(remToPx('6'))
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(remToPx('6rem'))

// --------------------------------------------------------------------------
// 4. 피자 한 판 가격 계산 함수 만들기
//    피자 한 판이 얼마인지 알고 있고, 몇 판을 살 건지도 알 때, 총 금액을 계산하는 함수

function calculatePizzaPrice(price, quantity) {
  return parseFloat(price) * parseFloat(quantity) + '원'
}

// 숫자 타입이 인자로 전달된 경우
console.log(calculatePizzaPrice(30000, 2))
// 문자열 타입이 인자로 전달된 경우
console.log(calculatePizzaPrice('30000', '2'))
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(calculatePizzaPrice('30000원', '2개'))

// --------------------------------------------------------------------------
// 5. 주차 요금 계산 함수 만들기
//    주차장에 몇 시간 있었는지를 입력하면, 1시간에 1,000원씩 계산하는 함수

function calculateParkingFee(hours) {
  return parseInt(hours, 10) * 1000 + '원'
}

// 숫자 타입이 인자로 전달된 경우
console.log(calculateParkingFee(3))
// 문자열 타입이 인자로 전달된 경우
console.log(calculateParkingFee('3'))
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(calculateParkingFee('3시간'))

// --------------------------------------------------------------------------
// 6. 짝수인지 확인하는 함수 만들기
//    어떤 숫자가 짝수인지 아닌지를 확인하는 함수. 짝수면 true, 홀수면 false

function isEven(number) {
  return Number(number) % 2 === 0
}

// 숫자 타입이 인자로 전달된 경우
console.log(isEven(3)) // 짝수
// 문자열 타입이 인자로 전달된 경우
console.log(isEven('3')) // 짝수

// 숫자 타입이 인자로 전달된 경우
console.log(isEven(10)) // 홀수
// 문자열 타입이 인자로 전달된 경우
console.log(isEven('10')) // 홀수

// --------------------------------------------------------------------------
// 7. 생일 축하 메시지 출력 함수 만들기
//    이름만 알려주면 자동으로 축하 메시지를 만들어주는 자동 응답기 같은 함수

function birthdayMessage(name) {
  return '생일 축하해요! ' + name + ' 🥳'
}

console.log(birthdayMessage('지훈'))
console.log(birthdayMessage('수진'))

// --------------------------------------------------------------------------
// 8. 올해 남은 날짜 계산 함수 만들기
//    오늘이 120일째라면, 1년(365일)에서 얼마나 남았는지 알려주는 함수

function daysLeft(passedDays) {
  return 365 - parseInt(passedDays, 10) + '일'
}

// 숫자 타입이 인자로 전달된 경우
console.log(daysLeft(120))
// 문자열 타입이 인자로 전달된 경우
console.log(daysLeft('120'))
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(daysLeft('120일'))

// --------------------------------------------------------------------------
// 9. 세금 포함 가격 계산 함수 만들기
//    상품 가격에 부가세를 붙여서 최종 금액을 계산하는 함수

function priceWithTax(price, tax) {
  return parseFloat(price) * (1 + parseFloat(tax)) + '원'
}

// 숫자 타입이 인자로 전달된 경우
console.log(priceWithTax(92000, 0.03))
// 문자열 타입이 인자로 전달된 경우
console.log(priceWithTax('92000', '0.03'))
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(priceWithTax('92000원', '0.03%'))

// --------------------------------------------------------------------------
// 10. 나이가 성인인지 판별하는 함수 만들기
//     놀이공원 입장 시, 성인(19+) 구역에 들어갈 수 있는 나이인지 확인해주는 함수

function isAdult(age) {
  return parseInt(age) >= 19
}

// 숫자 타입이 인자로 전달된 경우
console.log(isAdult(9)) // 성인 아님
// 문자열 타입이 인자로 전달된 경우
console.log(isAdult('9')) // 성인 아님
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(isAdult('9살')) // 성인 아님

// 숫자 타입이 인자로 전달된 경우
console.log(isAdult(21)) // 성인
// 문자열 타입이 인자로 전달된 경우
console.log(isAdult('21')) // 성인
// 문자열(단위 포함) 타입이 인자로 전달된 경우
console.log(isAdult('21살')) // 성인
//
/* function logger(logMessage) {
  console.log(logMessage)
}
logger('HI!')

const pxToRem = function(pxValue) {
  return parseInt(pxValue, 10) / 16 + 'rem'
}
console.log(pxToRem(24))
console.log(pxToRem('24px'))

const remToPx = function(remValue) {
  return parseFloat(remValue, 10) * 16 + 'px'
}
console.log(remToPx(1.2))
console.log(remToPx('1.1')) */



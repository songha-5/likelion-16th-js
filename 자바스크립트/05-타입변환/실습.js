// --------------------------------------------------------------------------
// 실습: 타입 변환
// --------------------------------------------------------------------------
// * 문자 → 숫자(정수) 변환
// * 문자 → 실수(소수) 변환
// * 숫자 → 문자 변환
// * 숫자 → 불리언 변환
// * 문자 → 불리언 변환
// * 숫자가 아님(NaN)
// * NaN 확인
// * Falsy 값 (6가지)
// * 권장 사항
// --------------------------------------------------------------------------


const LAST_YEAR = '2025년', 
      CURRENT_YEAR = '2026', 
      NEXT_YEAR = 2027,
      PI = '3.141592',
      RATING = '9.24점'


// --------------------------------------------------------------------------
// 문자 → 숫자(정수) 변환
// --------------------------------------------------------------------------
// * parseInt(str): 정수 변환 (앞에서부터 숫자 추출)
// * Number(str): 순수 숫자 문자열만 변환
// * +str: Number(str)과 동일 결과 출력
// --------------------------------------------------------------------------

// 출력 결과: '2025년' → 2025
// parseInt
console.log(parseInt(LAST_YEAR, 10)+1+'년')
console.log(parseInt('123abc'))
console.log(parseInt('abc123'))
console.log(parseInt(12.345))

// Number
console.log(Number(1234))
console.log(Number('1234년'))
console.log(Number('1234.1234'))

// 단항연산자
console.log(+1 + +1)

// 출력 결과: '2026' → 2026


// --------------------------------------------------------------------------
// 문자 → 실수(소수) 변환
// --------------------------------------------------------------------------
// * parseFloat(str): 실수 변환
// --------------------------------------------------------------------------

// 출력 결과: '3.141592' → 3.141592
console.log(parseFloat(PI))

// 출력 결과: '9.24점' → 9.24


// --------------------------------------------------------------------------
// 숫자 → 문자 변환
// --------------------------------------------------------------------------
// * String(num): 함수
// * num + '': 빈 문자 더하기
// * num.toString(radix?): 메서드 (진법 변환 가능)
// --------------------------------------------------------------------------

// 출력 결과: 2027 → '2027'
console.log(String(NEXT_YEAR))
console.log(NEXT_YEAR+'')
console.log(NEXT_YEAR.toString())
// 출력 결과: 2027 → '2027년'

// 출력 결과: 255 → '11111111' (2진수)

// 출력 결과: 255 → 'ff' (16진수)
// 색상 값(일상, 10진수) → 색상 코드(컴퓨터, 16진수) 변환
const red = 255, green = 128, blue = 0

let hexCode = '#'
const redHexValue = red.toString(16)
console.log(redHexValue)
const greenHexValue = green.toString(16)
console.log(greenHexValue)
const blueHexValue = blue.toString(16).padStart(2,'0')
console.log(blueHexValue)

// hexCode = hexCode + redHexValue
// 복합 할당 연산자 (+=)
hexCode += redHexValue
hexCode += greenHexValue
hexCode += blueHexValue

// 비추천 코드
const tempHexCode = '#' + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0')
console.log(tempHexCode)

// 출력 결과 (예시): '#ff8000'
console.log(hexCode)


// 색상코드 16진수 -> 색상값 10진수
const redHex = 'ff', greenHex = '80', blueHex = '00'
console.log(parseInt(redHex, 16))
console.log(parseInt(greenHex, 16))
console.log(parseInt(blueHex, 16))


// --------------------------------------------------------------------------
// 숫자 → 불리언 변환
// --------------------------------------------------------------------------
// * Boolean(num): 0은 false, 나머지는 true
// --------------------------------------------------------------------------

// 출력 결과: 0 → false
console.log(!!0, Boolean(0)) //false
console.log(!!1, Boolean(1)) //true


// --------------------------------------------------------------------------
// 문자 → 불리언 변환
// --------------------------------------------------------------------------
// * Boolean(str): ''은 false, 나머지는 true
// --------------------------------------------------------------------------

// 출력 결과: '' → false
console.log(!!'', Boolean('')) //false
console.log(!!' ', Boolean(' ')) //true


// --------------------------------------------------------------------------
// 숫자가 아님(NaN): 숫자 연산 실패 시, 생성
// --------------------------------------------------------------------------
// * Math.sqrt(-1)
console.log(Math.sqrt(-1))
// * 숫자 + NaN
console.log(1+NaN)
// * undefined + undefined
console.log(undefined + undefined)
// * 문자를 숫자로 나누기
console.log('문자' / 2)
// * Number(str), parseInt(str), parseFloat(str)
console.log(Number('문자'))
console.log(parseInt('문자'))
console.log(parseFloat('문자'))
// * 0 / 0
console.log(0/0)
// * Infinity - Infinity
console.log(Infinity - Infinity)
// --------------------------------------------------------------------------

// 출력 결과: Math.sqrt(-1) → NaN

// 출력 결과: 숫자 + NaN → NaN

// 출력 결과: undefined + undefined → NaN

// 출력 결과: 문자 / 숫자 → NaN

// 출력 결과: Number(str) → NaN

// 출력 결과: parseInt(str) → NaN

// 출력 결과: parseFloat(str) → NaN

// 출력 결과: 0 / 0 → NaN

// 출력 결과: Infinity - Infinity → NaN


// --------------------------------------------------------------------------
// NaN 확인
// --------------------------------------------------------------------------
// * typeof 연산자 ('number' 반환) ⚠️
// * isNaN(): 타입 변환 후 판단 (부정확) ⚠️
// * Number.isNaN(): 진짜 NaN만 판단 (정확) ✅
// --------------------------------------------------------------------------

// 출력 결과: typeof NaN → 'number' (⚠️ NaN이지만, number 타입으로 인식)

// 출력 결과: isNaN(1) → false (✅ NaN 아님)

// 출력 결과: isNaN('3') → false (✅ NaN 아님)

// 출력 결과: isNaN([]) → false (✅ NaN 아님)

// 출력 결과: isNaN(null) → false (✅ NaN 아님)

// 출력 결과: isNaN(NaN) → true (✅ NaN 맞음)

// 출력 결과: isNaN('3n') → true (⚠️ NaN 맞음? 부정확한 이유: 타입 변환 후, 검사)

// 출력 결과: isNaN(undefined) → true (⚠️ NaN 맞음?)

// 출력 결과: isNaN({}) → true (⚠️ NaN 맞음?)

// 출력 결과: Number.isNaN('3n') → false (✅ NaN 아님, 정확한 이유: 타입 변환 없이 검사)

// 출력 결과: Number.isNaN(undefined) → false (✅ NaN 아님)

// 출력 결과: Number.isNaN({}) → false (✅ NaN 아님)


// --------------------------------------------------------------------------
// Falsy & Truthy
// --------------------------------------------------------------------------
// * Falsy 값 (6가지): 0, '', false, null, undefined, NaN
// * 나머지 값은 모두 Truthy
// --------------------------------------------------------------------------

// 출력 결과: 0 → false

// 출력 결과: '' → false

// 출력 결과: false → false

// 출력 결과: null → false

// 출력 결과: undefined → false

// 출력 결과: NaN → false


// --------------------------------------------------------------------------
// 권장 사항
// --------------------------------------------------------------------------
// * 문자 변환: String() 또는 toString()
// * 숫자 변환: Number() 또는 parseInt()/parseFloat()
// * NaN 확인: Number.isNaN() 사용
// --------------------------------------------------------------------------
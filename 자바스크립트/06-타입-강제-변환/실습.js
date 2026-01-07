// --------------------------------------------------------------------------
// 연습 문제: 쇼핑몰 장바구니 계산기
// --------------------------------------------------------------------------
// 사용자가 입력한 상품 정보를 처리하여 최종 결제 금액을 계산하세요.

const PRODUCT_1_PRICE = '35000'  // 문자열로 입력됨
const PRODUCT_1_QUANTITY = '2'   // 문자열로 입력됨

const PRODUCT_2_PRICE = '48000'
const PRODUCT_2_QUANTITY = 3     // 숫자로 입력됨

const PRODUCT_3_PRICE = 25000
const PRODUCT_3_QUANTITY = '1'

// 첫 번째 상품의 소계를 계산하세요.
// 출력 결과: 70000 (number)
let product_1_subtotal

// 두 번째 상품의 소계를 계산하세요.
// 출력 결과: 144000 (number)
let product_2_subtotal

// 세 번째 상품의 소계를 계산하세요.
// 출력 결과: 25000 (number)
let product_3_subtotal

// 전체 상품의 합계를 계산하세요.
// 출력 결과: 239000 (number)
let cart_total

// 배송비를 추가하세요. (3000원, 문자열로 입력됨)
const SHIPPING_FEE = '3000'
// 출력 결과: 242000 (number)
let total_with_shipping

// 회원 할인율을 적용하세요. (10% 할인, 문자열로 입력됨)
const MEMBER_DISCOUNT_RATE = '0.1'
// 출력 결과: 24200 (number)
let discount_amount

// 최종 결제 금액을 계산하세요.
// 출력 결과: 217800 (number)
let final_payment

// 포인트 적립액을 계산하세요. (최종 금액의 1%, 문자열로 입력됨)
const POINT_RATE = '0.01'
// 출력 결과: 2178 (number)
let earned_points

// 다음 구매 시 사용 가능한 쿠폰 금액 (문자열)
const COUPON_AMOUNT = '5000'
// 쿠폰을 사용했을 때의 금액을 계산하세요.
// 출력 결과: 212800 (number)
let payment_with_coupon

// 결제 정보를 문자열로 출력하세요.
// 출력 결과: '상품 합계: 239000원, 배송비: 3000원, 할인: 24200원, 최종 결제: 217800원'
let payment_summary

// 잘못된 계산 예시 (주의!)
// PRODUCT_1_PRICE, PRODUCT_1_QUANTITY 덧셈: 문자열 연결이 일어나는 경우 
// 출력 결과: '350002' (string) - 잘못된 계산!
let wrong_calculation_1

// 올바른 계산 방법
// 출력 결과: 37000 (number)
let correct_calculation_1

// NaN이 발생하는 경우
const INVALID_PRICE = 'abc'
// 출력 결과: NaN (number)
let invalid_calculation

// NaN 체크하기
// 출력 결과: true
let is_invalid


// --------------------------------------------------------------------------
// 연습 문제: 사용자 정보 처리 시스템
// --------------------------------------------------------------------------
// 사용자가 입력한 정보를 처리하고 검증하세요.

const USER_AGE = '28'           // 문자열
const USER_HEIGHT = '175.5'     // 문자열
const USER_WEIGHT = '70'        // 문자열
const IS_MEMBER = 'true'        // 문자열
const LOGIN_COUNT = '0'         // 문자열
const USER_POINT = null         // null
const USER_COUPON = undefined   // undefined

// 나이를 숫자로 변환하세요.
// 출력 결과: 28 (number)
let age_number

// 내년 나이를 계산하세요.
// 출력 결과: 29 (number)
let next_year_age

// 키를 숫자로 변환하세요.
// 출력 결과: 175.5 (number)
let height_number

// 몸무게를 숫자로 변환하세요.
// 출력 결과: 70 (number)
let weight_number

// BMI를 계산하세요. (몸무게 / (키/100)²)
// 출력 결과: 약 22.73 (number)
let bmi

// 회원 여부를 불리언으로 변환하세요.
// 힌트! 부정(!) 연산자 활용
// 출력 결과: true (boolean)
let is_member_boolean

// 로그인 횟수를 숫자로 변환하세요.
// 출력 결과: 0 (number)
let login_count_number

// 로그인 횟수가 0인지 확인하세요.
// 출력 결과: true (boolean)
let is_first_login

// 포인트를 숫자로 변환하세요. (null → 0)
// 출력 결과: 0 (number)
let point_number

// 쿠폰을 숫자로 변환하세요. (undefined → NaN)
// 출력 결과: NaN (number)
let coupon_number

// 쿠폰이 유효한지 확인하세요.
// 출력 결과: false (쿠폰이 NaN이므로)
let is_coupon_valid

// 나이가 성인(20세 이상)인지 확인하세요.
// 출력 결과: true (boolean)
let is_adult

// 사용자 정보 요약 문자열 만들기
// 출력 결과: '나이: 28세, 키: 175.5cm, 몸무게: 70kg, 회원: true'
let user_info_summary

// Falsy 값 테스트
const TEST_VALUE_1 = '0'  // 문자열 '0'
const TEST_VALUE_2 = 0    // 숫자 0
const TEST_VALUE_3 = ''   // 빈 문자열
const TEST_VALUE_4 = null
const TEST_VALUE_5 = undefined

// Boolean으로 변환했을 때 결과를 예측하세요.
let test_1_boolean
// 출력 결과: 

let test_2_boolean
// 출력 결과: 

let test_3_boolean
// 출력 결과: 

let test_4_boolean
// 출력 결과: 

let test_5_boolean
// 출력 결과: 
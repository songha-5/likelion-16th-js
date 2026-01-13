// --------------------------------------------------------------------------
// 변수, 상수 작성 과제
// --------------------------------------------------------------------------

// 1. 영화 제목 (변수)
let favoriteMovie = '인셉션'

// 2. 빛의 속도 (상수 - 물리적 법칙이므로 변하지 않음)
const LIGHT_SPEED = 299_792_458

// 3. 이메일 인증 완료 여부 (불리언 변수)
let isEmailVerified = true

// 4. 상품 재고 수량 (변수)
let stockQuantity = 47

// 5. 회원 포인트 (변수)
let memberPoints = 15_800

// 6. API 서버 기본 URL (상수 - 설정값은 보통 고정됨)
const BASE_URL = 'https://api.example.com'

// 7. 게시글 조회수 (변수)
let viewCount = 1_234

// 8. 배송 상태 (변수)
let deliveryStatus = '배송중' 

// 9. 쿠폰 사용 가능 여부 (불리언 변수)
let isCouponAvailable = false

// 10. 최대 업로드 파일 크기 (상수 - 10MB)
const MAX_UPLOAD_SIZE = 10_485_760

// 11. 사용자 등급 점수 (변수 - 소수점 포함)
let userGradeScore = 85.5

// 12. 알림 수신 동의 여부 (불리언 변수)
let isNotificationAgreed = true


// --------------------------------------------------------------------------
// 함수 작성 과제
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 1. 환영 메시지 생성 (함수 선언문)
// 
// - 논리 연산자로 조건 처리
//   * 간단한 값 할당, 기본값(Default) 설정
//   * 숙련자에게는 효율적이나 초보자에겐 난해함
//   * 매우 짧고 간결함
{
  function createWelcomeMessage(name, grade) {
    // VIP 등급 여부
    const isVIP = grade === 'VIP'
    // 메시지 작성 (VIP 등급인 경우, VIP 메시지 설정. 아닌 경우 message는 false)
    let message = isVIP && '🌟 VIP ' + name + '님, 특별한 혜택이 준비되어 있습니다!'
    // 메시지 작성 (message 값이 거짓인 경우, 일반 메시지로 변경)
    message = message || '안녕하세요, ' + name + '님! 즐거운 쇼핑 되세요.'

    return message
  }

  console.log(createWelcomeMessage('이한영', 'VIP'))
  console.log(createWelcomeMessage('이한영'))
}
// - if 조건 문으로 조건 처리
//   * 복잡한 로직 분기, 실행 흐름 제어
//   * 누구나 쉽게 읽고 이해할 수 있음
//   * 상대적으로 길어짐
{
  function createWelcomeMessage(name, grade) {
    if (grade === 'VIP') {
      return '🌟 VIP ' + name + '님, 특별한 혜택이 준비되어 있습니다!'
    } else {
      return '안녕하세요, ' + name + '님! 즐거운 쇼핑 되세요.'
    }
  }

  console.log(createWelcomeMessage('이한영', 'VIP'))
  console.log(createWelcomeMessage('이한영'))
}

// --------------------------------------------------------------------------
// 2. 배송비 계산 (함수 표현식)
// 
// - 논리 연산자로 조건 처리
{
  const calcDeliveryFee = function(amount, area) {
    // 무료 배송 여부 (5만원 이상 주문)
    const isFree = amount >= 50000
    // 제주/도서 지역 여부 ('제주' or '도서')
    const isSpecialArea = area === '제주' || area === '도서'
    // 배송비 계산 (무료 배송이 아닌 경우 3천원. 무료 배송인 경우 0원)
    let fee = !isFree && 3000 || 0
    // 배송비 추가 계산 (제주/도서 지역 인 경우 +3천원. 아닌 경우 +0원)
    fee += isSpecialArea && 3000 || 0

    // 주문 금액이 0보다 작거나 같을 경우, 0원
    const isZeroAmount = amount <= 0

    return Number(isZeroAmount && '0' || fee)
  }

  console.log(calcDeliveryFee(0, '서울'))
  console.log(calcDeliveryFee(30000, '서울'))
  console.log(calcDeliveryFee(50000, '서울'))
  console.log(calcDeliveryFee(0, '제주'))
  console.log(calcDeliveryFee(30000, '제주'))
  console.log(calcDeliveryFee(50000, '제주'))
}

// - if 조건 문으로 조건 처리
{
  const calcDeliveryFee = function(amount, area) {
     // 주문 금액이 0보다 작거나 같을 경우, 0원 반환
    if (amount <= 0) {
      return 0
    }

    let fee = 0

    if (amount < 50000) {
      fee = 3000
    }

    if (area === '제주' || area === '도서') {
      fee += 3000
    }

    return fee
  }

  console.log(calcDeliveryFee(0, '서울'))
  console.log(calcDeliveryFee(30000, '서울'))
  console.log(calcDeliveryFee(50000, '서울'))
  console.log(calcDeliveryFee(0, '제주'))
  console.log(calcDeliveryFee(30000, '제주'))
  console.log(calcDeliveryFee(50000, '제주'))
}

// --------------------------------------------------------------------------
// 3. 비밀번호 유효성 검사 (화살표 함수 표현식)
// 
// - 논리 연산자로 조건 처리
{
  const validatePassword = (password) => {
    // 비밀번호 길이
    const length = password.length
    // 유효성 검사 (최소 8자 이상 최대 20자 이하)
    const isValid = length >= 8 && length <= 20
    return isValid
  }

  console.log(validatePassword('12345678'))
  console.log(validatePassword('1234'))
}

// - if 조건 문으로 조건 처리
{
  const validatePassword = (password) => {
    const length = password.length

    if (length >= 8 && length <= 20) {
      return true
    } else {
      return false
    }
  }

  console.log(validatePassword('12345678'))
  console.log(validatePassword('1234'))
}

// --------------------------------------------------------------------------
// 4. 포인트 적립 계산 (함수 선언문)
// 
// - 논리 연산자로 조건 처리
{
  const MEMBER_RATES = { 
    VIP: 0.05, 
    GOLD: 0.03, 
    SILVER: 0.01,
  }

  function calcPoints(amount, grade) {
    // 등급이 없을 경우, 일반 등급 적용
    const rate = MEMBER_RATES[grade] || 0.005

    // 포인트 계산(소수점 제외)
    const point = parseInt(amount * rate, 10)

    return point
  }

  console.log(calcPoints(100000, 'VIP'))
  console.log(calcPoints(100000, 'GOLD'))
  console.log(calcPoints(100000, 'SILVER'))
  console.log(calcPoints(100000))
}

// - if 조건 문으로 조건 처리
{
  function calcPoints(amount, grade) {
    // 등급이 없을 경우, 일반 등급 적용
    let rate = 0.005

    if (grade === 'VIP') {
      rate = 0.05
    }

    if (grade === 'GOLD') {
      rate = 0.03
    } 
    
    if (grade === 'SILVER') {
      rate = 0.01
    }

    const point = parseInt(amount * rate, 10)

    return point
  }

  console.log(calcPoints(100000, 'VIP'))
  console.log(calcPoints(100000, 'GOLD'))
  console.log(calcPoints(100000, 'SILVER'))
  console.log(calcPoints(100000))
}

// --------------------------------------------------------------------------
// 5. 영화 티켓 가격 계산 (함수 표현식 사용)
// 
// - 논리 연산자로 조건 처리
{
  const THEATER_PRICES = { 
    IMAX: 20_000,
    '3D': 17_000,
    NORMAL: 14_000,
  }

  const calcTicketPrice = function(type, isEarlyBird, count) {
    // 영화 타입이 없을 경우, 일반 영화 가격
    const basePrice = THEATER_PRICES[type] || THEATER_PRICES['NORMAL']
    
    // 조조할인인 경우 20% 할인 (1 - 0.2 = 0.8)
    const discountRate = (isEarlyBird && 0.8) || 1
    
    // 영화 티켓 계산
    const price = basePrice * discountRate * count

    return price
  }

  console.log(calcTicketPrice('', true, 1))
  console.log(calcTicketPrice('', false, 1))
  console.log(calcTicketPrice('3D', true, 2))
  console.log(calcTicketPrice('3D', false, 2))
  console.log(calcTicketPrice('IMAX', true, 3))
  console.log(calcTicketPrice('IMAX', false, 3))
}

// - if 조건 문으로 조건 처리
{
  const calcTicketPrice = function(type, isEarlyBird, count) {
    let basePrice = 0

    if (type === 'IMAX') {
      basePrice = 20_000
    } else if (type === '3D') {
      basePrice = 17_000
    } else {
      basePrice = 14_000
    }

    if (isEarlyBird) {
      basePrice *= 0.8
    }

    const price = basePrice * count
    return price
  }

  console.log(calcTicketPrice('', true, 1))
  console.log(calcTicketPrice('', false, 1))
  console.log(calcTicketPrice('3D', true, 2))
  console.log(calcTicketPrice('3D', false, 2))
  console.log(calcTicketPrice('IMAX', true, 3))
  console.log(calcTicketPrice('IMAX', false, 3))
}
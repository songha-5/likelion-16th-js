// --------------------------------------------------------------------------
// 연습 문제: 도서관 대출 시스템
// --------------------------------------------------------------------------
// 도서관에서 책을 대출하고 반납하는 시스템을 만들어보세요.

console.group('[도서관 대출 시스템]')

const TOTAL_BOOKS = 145        // 도서관 전체 보유 도서
const BORROWED_TODAY = '12권'  // 오늘 대출된 책
const RETURNED_TODAY = '8권'   // 오늘 반납된 책

// BORROWED_TODAY를 숫자로 변환하세요.
let borrowed_today = parseInt(BORROWED_TODAY)

// RETURNED_TODAY를 숫자로 변환하세요.
let returned_today = parseInt(RETURNED_TODAY)

// 현재 대출 가능한 책의 수를 계산하세요.
let loan_today = TOTAL_BOOKS - borrowed_today + returned_today

// 대출 가능한 책이 100권 이상인지 확인하세요.
let more_than_100_books = loan_today >= 100

// 결과를 출력하세요.
console.log('오늘 대출된 책 =', borrowed_today + '권')
console.log('오늘 반납됩 책 =', returned_today + '권')
console.log('현재 대출 가능한 책의 수 = ', loan_today + '권')
console.log('대출 가능한 책이 100권 이상 =', more_than_100_books)

console.groupEnd('[도서관 대출 시스템]')


// --------------------------------------------------------------------------
// 연습 문제: 온라인 서점 할인 계산
// --------------------------------------------------------------------------
// 온라인 서점에서 책을 구매할 때 할인을 적용하는 프로그램을 만들어보세요.

console.group('[온라인 서점 할인 계산]')

const BOOK_PRICE = '18500원'   // 책 정가
let cart_count = 0            // 장바구니 수량

// BOOK_PRICE를 숫자로 변환하세요.
let book_price = parseInt(BOOK_PRICE)

// 장바구니에 책을 3권 추가하세요.
cart_count += 3

// 총 금액을 계산하세요. (책 가격 × 수량)
let total_price = book_price * cart_count
let original_price = total_price

// 10% 할인된 금액을 계산하세요.
let discounted_price = total_price * 0.1

// 최종 결제 금액을 계산하세요.
total_price -= discounted_price

// 결과를 출력하세요.
console.log('장바구니 수량 =', cart_count + '권')
console.log('할인 전 금액 =', original_price + '원')
console.log('할인된 금액 =', discounted_price + '원')
console.log('최종 결제 금액 =', total_price + '원')

console.groupEnd('[온라인 서점 할인 계산]')


// --------------------------------------------------------------------------
// 연습 문제: 도서 페이지 진행률 계산
// --------------------------------------------------------------------------
// 책을 읽는 진행률을 계산하는 프로그램을 만들어보세요.

console.group('[도서 페이지 진행률 계산]')

const BOOK_PAGE = '256쪽'  // 전체 페이지
const SHELF_NUMBER = '12'  // 서가 번호
let current_page = 0        // 현재 읽은 페이지

// BOOK_PAGE를 숫자로 변환하세요.
let book_pages = parseInt(BOOK_PAGE)

// 오늘 64페이지를 읽었습니다. current_page에 더하세요.
current_page += 64

// 내일 48페이지를 더 읽을 예정입니다. current_page에 더하세요.
current_page += 48

// 읽은 페이지가 전체의 절반 이상인지 확인하세요.
let more_than_half_read = current_page >= book_pages / 2

// 남은 페이지를 계산하세요.
let remaining_pages = book_pages - current_page

// 진행률을 계산하세요. (읽은 페이지 / 전체 페이지 * 100)
let read_progress = remaining_pages / book_pages * 100

// 하루에 32페이지씩 읽는다면, 남은 책을 다 읽는데 며칠이 걸릴까요?
let read_it_all_days = Math.ceil(remaining_pages / 32)


// 결과를 출력하세요.
console.log('전체 페이지 =', book_pages + '쪽')
console.log('현재 페이지 =', current_page + '쪽')
console.log('남은 페이지 =', remaining_pages + '쪽')
console.log('진행률 =', read_progress + '%')
console.log('절반 이상 읽음 =', more_than_half_read)
console.log('완독까지 남은 일수 =', read_it_all_days + '일')

console.groupEnd('[도서 페이지 진행률 계산]')

// --------------------------------------------------------------------------
// 연습 문제: 도서관 회원 포인트 시스템
// --------------------------------------------------------------------------
// 도서관에서 책을 대출하면 포인트를 적립하는 시스템입니다.

console.group('[도서관 회원 포인트 시스템]')

const MEMBER_ID = '2024' // 회원 번호
let points = 0           // 현재 포인트

// 책 1권 대출 시, 100포인트를 적립합니다. (3권 대출)
points += 100
points += 100
points += 100

// 포인트가 500점 이상이면 '우수 회원'입니다.
let is_excellent_member = points >= 500

// 회원 번호가 숫자 2024와 일치하는지 확인하세요.
console.log(MEMBER_ID === 2024)

// 포인트로 책 1권을 교환하려면 250포인트가 필요합니다.
// 현재 포인트로 몇 권을 교환할 수 있나요?
let exchange_books = Math.floor(points / 250)

// 교환 후 남은 포인트는 얼마인가요?
let remaining_points = points - 250 * exchange_books

// 결과를 출력하세요.
console.log('회원 번호:', MEMBER_ID)
console.log('현재 포인트:', points + '점')
console.log('우수 회원:', is_excellent_member)
console.log('교환 가능 권수:', exchange_books + '권')
console.log('교환 후 남은 포인트:', remaining_points + '점')

console.groupEnd('[도서관 회원 포인트 시스템]')
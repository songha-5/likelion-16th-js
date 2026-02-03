const number = [1,2,3,4,5,6,7,8,9,10,33]

// 3의배수 나눠서 나머지 0가지기
const multplesOf3 = number.filter((number) => number & 3 === 0)

//짝수만 나머지 가지기
const filtereEven = number.filter((n) => n % 2 === 0)

const users = [
  { id: 1, name: '지수', age: 20, location: '서울', nationality: '대한민국' },
  { id: 2, name: '유키', age: 18, location: '오사카', nationality: '일본' },
  { id: 3, name: '아리아', age: 19, location: '뉴욕', nationality: '미국' },
  { id: 4, name: '유나', age: 24, location: '부산', nationality: '대한민국' },
  { id: 5, name: '마테오', age: 28, location: '방콕', nationality: '태국' },
  { id: 6, name: '올리비아', age: 40, location: '토론토', nationality: '캐나다' },
  { id: 7, name: '노아', age: 1, location: '베를린', nationality: '독일' },
  { id: 8, name: '민지', age: 4, location: '인천', nationality: '대한민국' },
  { id: 9, name: '에이든', age: 9, location: '파리', nationality: '프랑스' },
  { id: 10, name: '현지', age: 12, location: '대구', nationality: '대한민국' },
  { id: 11, name: '루카스', age: 18, location: '도쿄', nationality: '일본' },
  { id: 12, name: '아일라', age: 20, location: '로스앤젤레스', nationality: '미국' },
  { id: 13, name: '은우', age: 20, location: '광주', nationality: '대한민국' },
  { id: 14, name: '밀라', age: 20, location: '하노이', nationality: '베트남' },
  { id: 15, name: '지민', age: 20, location: '제주', nationality: '대한민국' },
  { id: 16, name: '히로', age: 20, location: '교토', nationality: '일본' },
  { id: 17, name: '엠마', age: 20, location: '시카고', nationality: '미국' },
  { id: 18, name: '유토', age: 20, location: '나고야', nationality: '일본' },
  { id: 19, name: '클로이', age: 20, location: '시드니', nationality: '호주' },
  { id: 20, name: '지원', age: 20, location: '대전', nationality: '대한민국' },
  { id: 21, name: '레비', age: 20, location: '런던', nationality: '영국' },
  { id: 22, name: '서진', age: 20, location: '수원', nationality: '대한민국' },
  { id: 23, name: '최유키', age: 20, location: '후쿠오카', nationality: '일본' },
  { id: 24, name: '메이슨', age: 20, location: '멜버른', nationality: '호주' },
  { id: 25, name: '하나', age: 31, location: '상하이', nationality: '중국' },
]
{
  const LastName = '유키'
  let namePeople = null
  namePeople = users.filter(({ name }) => name.slice(1) === LastName)
  console.log(namePeople.length)
  console.log(namePeople)

  // 
  let agePeople = null
  agePeople = users.filter(({ age }) => age >= 20 && age < 30 )
  console.log(agePeople.length)
  console.log(agePeople)
}

{

  let userEmail = users.map(({email}) => email)
  console.log(userEmail)

  let uesrName = users.map(({ name }) => name)
  console.log(uesrName)

  const neoUsers = users.map((user, index) => {
    // 가공된 새로운 사용자 객체 반환
    const neoUser = {
      ...user,
      index,
      role: 'GUEST'
    }

    return neoUser
  })

  console.log(neoUsers)
}
// --------------------------------------------------------------------------
// 실습: 속성 할당 단축 (Property Shorthand)
// --------------------------------------------------------------------------

// [실습] 변수를 객체 속성으로 빠르게 할당하기
// 1. const title = 'ES6 학습', const level = 'Intermediate' 변수를 선언하세요.
// 2. 단축 구문을 사용하여 두 변수를 속성으로 가진 course 객체를 생성하세요.
// 3. 기존 방식(title: title)과 차이점을 확인해 보세요.
console.groupCollapsed('속성 할당 단축 실습')

// 이곳에 코드를 작성하세요

console.groupEnd()


// --------------------------------------------------------------------------
// 실습: 메서드 단축 (Method Shorthand)
// --------------------------------------------------------------------------

// [실습] 객체 내부 메서드 간결하게 정의하기
// 1. play, pause 메서드를 가진 오디오 플레이어 객체를 만드세요.
// 2. ': function' 키워드를 생략한 단축 구문을 사용하세요.
// 3. 메서드 내부에서 this를 사용하여 객체의 다른 속성에 접근해 보세요.
console.groupCollapsed('메서드 단축 실습')

// 이곳에 코드를 작성하세요

console.groupEnd()


// --------------------------------------------------------------------------
// 실습: 계산된 속성 이름 (Computed Property Names)
// --------------------------------------------------------------------------

// [실습] 동적 키(Key)를 가진 객체 생성하기
// 1. 변수 prefix = 'user'와 변수 id = 123을 준비하세요.
// 2. 객체 생성 시 대괄호[]를 사용하여 [`${prefix}_${id}`] 형태의 키를 만드세요.
// 3. 해당 키에 '홍길동'이라는 값을 할당하고 결과를 확인하세요.
console.groupCollapsed('계산된 속성 이름 실습')

// 이곳에 코드를 작성하세요

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. 속성 단축: 변수명과 속성명이 일치하면 코드가 절반으로 줄어듭니다.
// 2. 메서드 단축: 객체 지향적인 코드를 짤 때 훨씬 깔끔한 문법을 제공합니다.
// 3. 계산된 속성: API 응답 데이터의 키가 유동적이거나, 특정 변수 값에 따라 키를 정해야 할 때 필수적입니다.
// 4. 가독성: 이 세 가지를 적절히 섞어 쓰면 유지보수가 쉬운 현대적인 코드가 완성됩니다.
// --------------------------------------------------------------------------
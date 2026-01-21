// --------------------------------------------------------------------------
// 실습: 반복문 (Loops & Iteration)
// --------------------------------------------------------------------------
// * while : 조건이 참인 동안 계속해서 방을 점검합니다.
// * for : 정해진 횟수만큼 손님에게 인사합니다.
// * for...of : 배열 장부의 손님 이름을 하나씩 꺼냅니다.
// * for...in : 객체 장부의 상세 정보(Key)를 확인합니다.
// --------------------------------------------------------------------------

const drow = () => console.log('화면에 그림그리기')
drow()
drow()
drow()
drow()


// const list = []

// --------------------------------------------------------------------------
// while 문
// --------------------------------------------------------------------------

// let iterationCount = 0
// let condition = false

// if (condition < 5) {
//   iterationCount = iterationCount + 1
//   console.log(iterationCount)
// } else {
//   console.log('조건이 거짓')
// }

// let count = 0
// while (count < 5) {
//   count = count + 1
//   console.log(count)
// }
// const draw = (n) => '화면에 '+ n +'번째 그림을 그리다.'

// // 화면에 [n]번 드로잉하고 싶다.
// let count = 0
// const REPEAT_COUNT = 5 // n번

// while (count < REPEAT_COUNT) {
//   count += 1 // [1], [2], 3, 4, [5]

//   // continue: 건너뗘서 계속
//   if (count >= 3 && count <= 4) {
//     continue
//   }

//   draw(count)
//   console.log(count)
// }
// const draw = (n) => '화면에 '+ n +'번째 그림을 그리다.'

// // 화면에 [n]번 드로잉하고 싶다.
// let count = 0
// const REPEAT_COUNT = 10 // n번

// while (count < REPEAT_COUNT) {
//   count += 1 
//   // break: [1], [2], 3(중단)

//   if (count === 9) {
//     break     // 반복문 종료
//   }

//   draw(count)
//   console.log(count) // 1, 2
// }

// --------------------------------------------------------------------------
// do...while 문
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// for 문
// --------------------------------------------------------------------------
// let inerationCount = 0 // 반복횟수
// const TARGET_CUNT = 3

// while (inerationCount < TARGET_CUNT) {
//   console.log(inerationCount)
//   inerationCount += 1
// }

// for (let forCount = 0; forCount < TARGET_CUNT; forCount+=1 ) {
//     console.log(forCount)
// }


// for (변수_선언; 변수_값_비교(참,거짓); 변수_값_변경 ) {
//     console.log(forCount)
// }


// --------------------------------------------------------------------------
// 배열 반복 (역순/정순)
// --------------------------------------------------------------------------
const numbers = ['하나', '둘', '셋', '넷', '다섯', '여섯', '일곱']

{
  // while 
  let i = 0
  while ( i < numbers.length) {
    const number = numbers[i]
    console.log(number)
    i++
  }
}



{
  // do while
  let i = 0

  do {
    const number = numbers[i]
    console.log(number) 
    i++
  } while ( i < numbers.length )
}

{
  // for
  for(let i = 0; i < numbers.length; i++ ) {
    const number = numbers[i]
    console.log(number)
  }
}

// 역순(내림차순) 반복 처리
const webFrameworks = [
  'react',   // 0
  'vue.js',  // 1
  'svelte',  // 2
  'angular', // 3
  'solid.js' // 4 
]

/* {
  // for문
for (let i = webFrameworks.length - 1; i >= 0; i = i - 1) {
  const frameworkName = webFrameworks[i]
  console.log(frameworkName)
}
} */

/* {
  let i = webFrameworks.length - 1; 
  while (i >= 0) {
    const frameworkName = webFrameworks[i]
    console.log(frameworkName)
    i = i - 1
  }
} */
/* {
  // do for
  let i = webFrameworks.length - 1; 
  do {
    const frameworkName = webFrameworks[i]
    console.log(frameworkName)
  } while (i >= 1) {
    i = i - 1
  }
} */


// --------------------------------------------------------------------------
// for...of 문
// --------------------------------------------------------------------------

const personList =[
  { name: '박주영', age: 22 },
  { name: '최한나', age: 31 },
  { name: '김상준', age: 29 },
] 

for (const person of personList) {
  console.log(person.name)
  console.log(person.age)
}

for (let i = 0; i < personList.length; i++) {
  const person = personList[i]
  console.log(person.name)
  console.log(person.age)
}


// --------------------------------------------------------------------------
// for...in 문 (객체 반복)
// --------------------------------------------------------------------------
const members = [
  { id: 'dkiclsk', name: '박준우', role: '검사' },
  { id: 'xdkics3', name: '배상현', role: '판사' },
  { id: 'qedkxa2', name: '하원희', role: '변호사' },
]

const message = '너무 추워요'
console.log(message.length)

for (const character of message) {
  console.log(character)
}

const points = {
  x: 10,
  y: 13,
  z: 8,
}
console.log(points.z)
for (const pointSpoit in points ) {
  const propName = points[pointSpoit]
  console.log(pointSpoit)
  console.log(propName)
}


const teacher = {
	name: '김데레사',
	subjects: ['HTML', 'CSS', 'Sass']
}

console.log(teacher) 
console.log('name' in teacher)

for (const property in teacher ) {
	const value = teacher[property]
	console.log(property)
	console.log(value) 
}

// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. while 문은 반복 횟수가 정해지지 않았을 때 유리합니다.
// 2. for 문은 인덱스(i)가 필요하거나 정해진 범위 반복에 최적입니다.
// 3. 배열 순회 시에는 가독성이 좋은 for...of를 적극 활용하세요.
// 4. 객체의 속성을 훑을 때는 for...in을 사용합니다.
// 5. break는 루프 탈출, continue는 이번 차례만 건너뛰기입니다.
// --------------------------------------------------------------------------


// 컴퓨터 프로그래밍의 기본 구조 중 하나인 루프에 숙달하기 위한 연습을 진행하세요.

// 1. [짝수 출력] for 문을 사용해 `1`부터 `100`까지의 숫자 중, 짝수만 출력
    
    
//     // 출력 예시
//     2
//     4
//     6
//     8
//     10
    

for (let i = 0; i <= 100; i += 2) {
  console.log(i)
}

/* 5. [성적표 출력] for … in 문을 사용해 객체의 key, value 출력
    
    ```jsx
    const student = {
      name: '선호',
      grade: 'A',
      age: 22,
    }
    ``` */

const student = {
  name: '선호',
  grade: 'A',
  age: 22,
}

for (let report in student) {
  const key = student[report]
  const value = report
  console.log(key)
  console.log(value)
}


/* 6. [까다로운 반복문] `1`부터 `20`까지 반복
    1. `5`부터 `10`까지는 건너띄고 나머지 출력
    2. `17`이 되면 반복 종료
        
        ```jsx
        // 출력 예시
        1
        2
        3
        4
        11
        12
        13
        14
        15
        16
        ``` */
for (let i = 1; i <= 20; ++i) {
  if ( i > 4 && i <11) continue
  if (i === 17) break
  console.log(i)
}




// 4. [비밀번호 찾기] do … while 문을 사용해 입력된 비밀번호(`'3001'`) 매칭 검토 후 결과 출력
    
//     ```jsx
//     let i = 0, attempt
    
//     const input = '3001', 
//     			attempts = ['0124', '8291', '8259', '3001', '9073']
//     ```

let i = 0, attempt
const input = '3001', attempts = ['0124', '8291', '8259', '3001', '9073']
do {
  attempt = attempts[i++]
  attempt = attempts[i]
  console.log(attempt)
} while (input !== attempt) {
  console.log(attempt)
}



// 3. [과일바구니] for … of 문을 사용해 다음 배열의 과일 출력
    
//     ```jsx
//     const fruits = ['사과', '바나나', '귤', '복숭아']
//     ```
const fruits = ['사과', '바나나', '귤', '복숭아']
for ( let fruitsList of fruits ) {
  console.log(fruitsList)
} 



// 2. [카운트다운] while 문을 사용해 숫자 `10`부터 `1`까지 역순으로 출력
    
//     ```jsx
//     // 출력 예시
//     10
//     9
//     .
//     .
//     .
//     1
//     발사!
//     ```

for (let i = 10; i >= 0; i -= 1) {
  console.log(i)
}
let countDown = 10
while (countDown > 0) {
  console.log(countDown)
  --countDown
}
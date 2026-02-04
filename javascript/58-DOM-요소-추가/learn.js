{
  const practice = document.getElementById('practice1')
  const form = practice.querySelector('.user-search-form')
  const list = practice.querySelector('.user-list')

  form.addEventListener('submit', (e) => {  
    e.preventDefault

    // 사용자 입력 값 가져오기
    const { search } = form.elements
    const inputedName = search.value.trim().toLowerCase()

    const searchedUser = users.find(({ name }) => name.includes(inputedName))

    if(searchedUser) {
      const item = document.createElement('li')
       const { name, age, job } = searchedUser
      item.textContent = `${job} ${name}(${age})`
      // 생성된 <li> 요소를 <ul> 안에 마지막 자식 요소로 추가
      list.appendChild(item)
    } else {
      // 검색 결과 사용자가 없다면?
      // 일치하는 사용자가 없다면 경고 메시지를 출력

    }
      // 폼 초기화
    form.reset()
  })
}

// --------------------------------------------------------------------------
// 실습: 요소 생성 및 추가 (createElement, appendChild, insertBefore)
// --------------------------------------------------------------------------

// [실습 1] 할 일 추가
// 1. form의 submit 이벤트를 차단하세요 (e.preventDefault())
// 2. input의 값을 읽어와서 새로운 <li> 요소를 만드세요.
// 3. .todo-list의 마지막 자식으로 추가하세요.
console.groupCollapsed('1. appendChild 실습 (Todo)')

// 1. <ol> 요소 생성
const orderdList = document.createElement('ol')

// 2. 리스트에 들어갈 내용들
const items = ['K팝 노래1', 'K팝 노래2', 'K팝 노래3']

// 3. 반복문을 통해 <li> 생성 및 <ol>에 추가
items.forEach(text => {
  const li = document.createElement('li')
  li.textContent = text
  orderdList.appendChild(li)
})

// 이곳에 코드를 작성하세요
const container = document.querySelector('.container')

container.addEventListener('click', (e) => {
  const parentElement = e.currentTarget
  const button = e.target.closest('button')
  if(!button) return

  parentElement.appendChild(orderdList)
})

console.groupEnd()


// --------------------------------------------------------------------------
// [실습 2] 다른 요소 앞에 추가
// 1. "면을 넣고" 앞에 추가 버튼을 클릭하면 실행합니다.
// 2. '물이 끓으면 스프를 넣습니다.' 내용을 가진 <li>를 만드세요.
// 3. insertBefore를 사용하여 "면을 넣고" 항목 앞에 삽입하세요.
console.groupCollapsed('2. insertBefore 실습 (Recipe)')

const appendButton = container.querySelector('.append-button')

appendButton.click()
// 이곳에 코드를 작성하세요
// 자바스크립트 복습 위에 삽입
const newListItem = document.createElement('li')
newListItem.textContent = 'K팝 노래 0'

console.log(newListItem.outerHTML)

// 부모 요소와 삽입할 위치의 요소
const list = container.querySelector('ol')
const targetListItem = list.firstElementChild

// 부모요소 insertBefore(삽입할 요소, 삽입할 위치의 요소)
list.insertBefore(newListItem, targetListItem)


console.groupEnd()


// --------------------------------------------------------------------------
// [실습 3] 다른 목록으로 이동
// 1. 버튼을 클릭하면 "망고" 요소를 찾으세요.
// 2. appendChild를 사용하여 "안 좋아하는 과일" 목록으로 이동시키세요.
console.groupCollapsed('3. 요소 이동 실습 (Fruits)')

// 이곳에 코드를 작성하세요

console.groupEnd()


// --------------------------------------------------------------------------
// 핵심 요약!
// --------------------------------------------------------------------------
// 1. 2단계 공정: 요소는 '생성(createElement)' 후 반드시 '추가(appendChild 등)'해야 화면에 보입니다.
// 2. 이동 효과: 이미 존재하는 요소를 다시 appendChild 하면 복사가 아니라 '이동'합니다.
// 3. 기준점 찾기: insertBefore를 쓸 때는 부모.children이나 querySelector로 정확한 기준 요소를 잡아야 합니다.
// 4. 이벤트 주의: form에서 버튼을 누를 때는 페이지가 새로고침되지 않도록 주의하세요.
// --------------------------------------------------------------------------
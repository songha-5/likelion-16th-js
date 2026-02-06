// --------------------------------------------------------------------------
// 실습: 폼 필드 선택하기 (form.elements)
// --------------------------------------------------------------------------
const form = document.getElementById('login-form')


form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formControls = form.elements
  // 아이디 
  const { value: idValue } = formControls.userid

  // 패스워드
  const { value: passwordValue }= formControls.password

  console.log( idValue, passwordValue )

  const formElement = e.currentTarget
  formElement.reset()

})


// --------------------------------------------------------------------------
// 핵심 정리
// --------------------------------------------------------------------------
// - 순서가 중요하다면? -> index
// - 데이터 구조가 중요하다면? -> name
// - 특정 고유 요소가 필요하다면? -> id (대괄호 표기 주의)
// --------------------------------------------------------------------------
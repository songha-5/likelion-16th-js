// --------------------------------------------------------------------------
// 실습: XMLHttpRequest(XHR)를 이용한 AJAX 통신
// --------------------------------------------------------------------------

const usernameInput = document.getElementById('github-username')
const fetchButton = document.querySelector('.button-fetch')
const responseLog = document.getElementById('response-log')

/**
 * GitHub API에 사용자 정보를 요청하는 함수
 * @param {string} username - 조회할 GitHub 계정 이름
 */
function requestGitHubUser(username) {
  // 1. XHR 객체 생성
  // 서버와 통신을 담당할 XMLHttpRequest 인스턴스를 생성하세요
  

  // 2. 응답 이벤트 리스너 설정 (load 이벤트)
  // 서버로부터 응답이 완료되었을 때 실행될 로직을 작성합니다  
  // - 응답 받은 JSON 문자열을 자바스크립트 객체로 변환하세요
  // - 변환된 객체를 콘솔에 출력하여 확인해 보세요
  // - 응답 결과를 화면에 출력하는 로직을 작성하세요
  // - 성공 시 유저 정보를 표시하고 실패 시 에러 메시지를 출력합니다
  // - 보안을 위해 DOMPurify.sanitize() 사용을 권장합니다
    

  // 3. 요청 구성 (GET 메서드, API URL)
  // .open() 메서드를 사용해 요청 방식과 목적지 URL을 설정하세요
  // URL: https://api.github.com/users/{username}
  

  // 4. 요청 전송
  // .send() 메서드를 호출하여 서버에 실제 요청을 전달하세요
}


// 버튼 클릭 이벤트 연결
fetchButton.addEventListener('click', () => {
  const username = usernameInput.value.trim()
  
  if (!username) {
    alert('사용자 이름을 입력해 주세요!')
    return
  }

  responseLog.textContent = '데이터 로딩 중...'
  requestGitHubUser(username)
})


// --------------------------------------------------------------------------
// 핵심 요약
// --------------------------------------------------------------------------
// - AJAX는 페이지 새로고침 없이 서버와 통신하여 사용자 경험을 높여줍니다.
// - XMLHttpRequest의 load 이벤트를 통해 응답(Response) 시점을 감지합니다.
// - 서버 응답 데이터(JSON 문자열)는 JSON.parse()를 통해 객체로 변환해 사용합니다.
// - API 사용 시 서버 측의 요청 제한(Rate Limit) 정책을 항상 확인해야 합니다.
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// 실습: JSON 파싱 및 데이터 정리 (Data Massaging)
// --------------------------------------------------------------------------

/**
 * GitHub 저장소 데이터를 가져와 필요한 정보만 추출하고 화면에 렌더링합니다.
 * @param {string} username - GitHub 사용자 이름
 */
function fetchAndProcessRepos(username) {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', (e) => {
    // [실습 1] JSON 파싱
    // 서버가 응답한 JSON 문자열을 배열 객체로 변환하여 변수 repos에 할당하세요.
    

    // [실습 2] 데이터 정리 (Data Massaging)
    // .map() 메서드를 사용하여 repos 배열에서 다음 정보만 추출한 새 배열 data를 만드세요.
    // - name: 저장소 이름 (repo.name)
    // - isPublic: 공개 여부 (repo.private 속성을 반전시켜 boolean으로 저장)
    // - url: 저장소 주소 (repo.html_url)
    

    // [실습 3] 데이터 렌더링 (DOM 업데이트)
    // 정리된 data 배열을 순회하며 <ul> 요소 내부에 <li> 항목들을 추가하세요.
    // (힌트: .reduce() 또는 .forEach()를 사용하여 innerHTML을 구성해 보세요.)
    
  })

  xhr.open('GET', `https://api.github.com/users/${username}/repos`)
  xhr.send()
}

// [실습 4] JSON 문자화 (stringify) 연습
// 아래 객체를 들여쓰기 2칸이 적용된 JSON 문자열로 변환하여 콘솔에 출력해 보세요.
const studyStatus = {
  subject: 'JSON & AJAX',
  progress: '80%',
  isFun: true
}


// --------------------------------------------------------------------------
// 핵심 요약
// --------------------------------------------------------------------------
// - JSON은 "JavaScript Object Notation"의 약자로 데이터 전송을 위한 문자열 포맷입니다.
// - JSON.parse()는 문자열을 객체로 변환하며 통신 응답 처리의 필수 단계입니다.
// - JSON.stringify()는 객체를 문자열로 변환하며 서버로 데이터를 보낼 때 주로 사용합니다.
// - 데이터 정리(Data Massaging)는 원본 데이터에서 불필요한 정보를 걷어내고 
//   프론트엔드 로직에 최적화된 구조로 재가공하는 과정을 말합니다.
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// 실습: JSON 파싱 및 데이터 정리 (Data Massaging)
// --------------------------------------------------------------------------

const family = {
  name: '우리 가족',
  people: ['강한울', '이세주', '강하나', '강두나', '강세나'],
  location: '서울',
  getPeopleCount() {
    return this.people.length
  }
}
// JS->JSON
const familyJSON = JSON.stringify(family)
console.log(familyJSON)
// JSON->JS
const parsedFamilyObject = JSON.parse(familyJSON)
console.log(parsedFamilyObject)

/**
 * GitHub 저장소 데이터를 가져와 필요한 정보만 추출하고 화면에 렌더링합니다.
 * @param {string} username - GitHub 사용자 이름
 */
;(() => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'https://api.github.com/users/yamoo9')

  const data = {
    message: '문자열'
  }

  xhr.send( JSON.stringify(data))

  xhr.addEventListener('readystatechange', (e) => {
    const { response } = e.currentTarget
    console.log(response, typeof response)
    // json string -> js object
    const githubUser = JSON.parse(response)
    console.table(githubUser)
  })
})()

// 응답 받은 결과(json 문자열 -> js 객체화)
xhr.addEventListener('readystatechange', (e) => {
  const { response } = e.currentTarget
  // console.log(response, typeof response)
  // json string -> js object
  const repos = JSON.parse(response)
  // 실제 필요한 정보만 데이터 정리(massage)
  const massagedRepos = repos.map(({ name, visibility, private: priv, url }) => {
    return {
      name,
      visibility,
      private: priv,
      url,
    }
  })

  console.log(massagedRepos)
})
// --------------------------------------------------------------------------
// 핵심 요약
// --------------------------------------------------------------------------
// - JSON은 "JavaScript Object Notation"의 약자로 데이터 전송을 위한 문자열 포맷입니다.
// - JSON.parse()는 문자열을 객체로 변환하며 통신 응답 처리의 필수 단계입니다.
// - JSON.stringify()는 객체를 문자열로 변환하며 서버로 데이터를 보낼 때 주로 사용합니다.
// - 데이터 정리(Data Massaging)는 원본 데이터에서 불필요한 정보를 걷어내고 
//   프론트엔드 로직에 최적화된 구조로 재가공하는 과정을 말합니다.
// --------------------------------------------------------------------------
import express from 'express'

const app = express()
const PORT = 4000

// 서버에 저장된 정답 인증 더미(dummy) 정보 
// - 실제 서비스에서는 데이터베이스나 환경 변수에 저장합니다.
const USERNAME = 'yamoo9'
const PASSWORD = 'qwerty'

// 인증(HTTP Basic Authentication) 미들웨어
// - 요청이 들어올 때마다 인증 정보를 검사합니다.
function basicAuth(req, res, next) {
  // 요청 헤더(Request Header)에서 'authorization' 항목을 꺼내옵니다. 
  const authHeader = req.headers['authorization']
  
  // 인증 헤더가 없거나, 'Basic '으로 시작하지 않는 경우
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // 클라이언트에 "인증이 필요하니 
    // 아이디/패스워드를 보내"라고 응답 헤더를 설정합니다.
    res.set('WWW-Authenticate', 'Basic realm="Test Area"')
    // 401 Unauthorized
    // 요청된 리소스에 대한 유효한 인증 자격 증명이 
    // 없기 때문에 클라이언트 요청이 완료되지 않았음을 나타냄
    return res.status(401).send('로그인이 필요한 서비스입니다.')
  }

  // "Basic bXlJZDpteVB3" 형태에서 
  // base64로 인코딩된 문자열 부분만 잘라냅니다.
  // 형식: "Basic <encoded_string>" -> "<encoded_string>"
  const base64Credentials = authHeader.split(' ').at(1)

  // Base64로 암호화된 문자열을 사람이 읽을 수 있는 utf8 문자열로 변환합니다.
  // 예: "eWFtb285OnF3ZXJ0eQ==" -> "yamoo9:qwerty"
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8')

  // ':' 기호를 기준으로 아이디와 비밀번호를 분리합니다.
  const [username, password] = credentials.split(':')

  // 입력받은 정보와 서버의 정답 정보가 일치하는지 확인합니다.
  if (username === USERNAME && password === PASSWORD) {
    // 정보가 일치하면 다음 단계(실제 라우트 핸들러)로 넘어갑니다.
    next()
  } else {
    // 정보가 틀리면 다시 인증을 요구하며 401 에러를 보냅니다.
    res.set('WWW-Authenticate', 'Basic realm="Test Area"')
    return res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다.')
  }
}

// 기본 인증 미들웨어를 거쳐야만 접속 가능한 경로
app.get('/', basicAuth, (req, res) => {
  res.send('인증 성공! 환영합니다 🎉')
})

app.listen(PORT, () => {
  console.log(`인증 테스트 서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
})

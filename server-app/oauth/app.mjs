import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'

// 파일 경로 변수
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 시크릿 키 설정
const SECRET_KEY = 'yamoo9'

// 더미 사용자 데이터
const users = [
  { id: 1, username: 'admin', password: 'password123' },
  { id: 2, username: 'user', password: 'userpass' },
]

// 더미 데이터
const posts = [
  { id: 1, title: '첫 번째 게시물', content: '안녕하세요!', userId: 1 },
  { id: 2, title: '두 번째 게시물', content: 'OAuth 테스트입니다.', userId: 2 },
  { id: 3, title: '세 번째 게시물', content: 'Bearer 토큰 인증', userId: 1 },
]

// Express 앱
const app = express()
const PORT = 4000

// 미들웨어 설정
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// JWT 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  console.log('인증 헤더 (Authorization Header)', authHeader)
  console.log('추출된 토큰 (Extracted Token)', token)

  if (!token) {
    return res.status(401).json({
      error: 'Access token required',
      message: 'Bearer 토큰이 포함된 인증 헤더가 필요합니다.',
    })
  }

  // Bearer 형식 확인
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Invalid token format',
      message: '인증 헤더는 "Bearer"로 시작해야합니다.',
    })
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log('토큰 확인 오류', err.message)
      return res.status(403).json({
        error: 'Invalid token',
        message: '토큰이 유효하지 않거나 만료되었습니다.',
      })
    }

    console.log('인증된 사용자', user)
    req.user = user

    next()
  })
}

// 로그인 엔드포인트 (토큰 발급)
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body

  console.log('로그인 시도', { username, password })

  const user = users.find(
    (u) => u.username === username && u.password === password,
  )

  if (!user) {
    return res.status(401).json({
      error: 'Invalid credentials',
      message: '사용자 이름 또는 비밀번호가 올바르지 않습니다.',
    })
  }

  // JWT 토큰 생성
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  })

  res.json({
    message: '로그인에 성공했습니다.',
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600,
    user: {
      id: user.id,
      username: user.username,
    },
  })
})

// 보호된 라우트들
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id)

  res.json({
    message: '프로필 데이터가 성공적으로 검색되었습니다.',
    user: {
      id: user.id,
      username: user.username,
    },
  })
})

app.get('/api/posts', authenticateToken, (req, res) => {
  res.json({
    message: '게시물이 성공적으로 검색되었습니다.',
    posts: posts,
    authenticated_user: req.user,
  })
})

app.get('/api/my-posts', authenticateToken, (req, res) => {
  const userPosts = posts.filter((post) => post.userId === req.user.id)
  res.json({
    message: '사용자 게시물이 성공적으로 검색되었습니다.',
    posts: userPosts,
    count: userPosts.length,
  })
})

// 공개 라우트 (인증 불필요)
app.get('/api/public', (req, res) => {
  res.json({
    message: '이것은 공개 엔드 포인트입니다.',
    data: '누구나 액세스 할 수 있습니다.',
  })
})

// 토큰 검증 엔드포인트
app.get('/auth/verify', authenticateToken, (req, res) => {
  res.json({
    message: '토큰이 유효합니다.',
    user: req.user,
    timestamp: new Date().toISOString(),
  })
})

// 테스트용 HTML 페이지 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './test.html'))
})

// 에러 핸들링
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Internal server error',
    message: '무엇인가 잘못되었습니다!',
  })
})

// 404 핸들링
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: '요청된 리소스를 찾을 수 없었습니다.',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 OAuth 테스트 서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
  console.log(`📖 테스트 페이지: http://localhost:${PORT}`)
  console.log(`🔑 테스트 계정: admin / password123`)
  console.log(`🔑 테스트 계정: user / userpass`)
})

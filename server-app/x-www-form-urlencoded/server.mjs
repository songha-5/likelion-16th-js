import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 4000

// CORS 허용
// 다른 출처(사이트)에서 리소스 공유 요청하는 것을 허용
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.post('/submit', (request, response) => {
  console.log(request.body)

  const responseData = { ...request.body, password: '********' }
  response.status(200).json(responseData)
})

app.listen(PORT, () => {
  console.log(`테스트 서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
})

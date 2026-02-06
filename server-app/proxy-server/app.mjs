import express from 'express'
import fetch from 'node-fetch'

const app = express()
const PORT = 4000

// JSON, urlencoded 등 POST body 파싱
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CORS 허용
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') { return res.sendStatus(200) }
  next()
})

// 프록시 라우트 (GET, POST 지원)
app.all('/proxy', async (req, res) => {
  const targetUrl = req.query.url

  if (!targetUrl) {
    return res.status(400).json({ error: 'url 쿼리 매개 변수가 필요합니다.' })
  }

  try {
    // fetch 옵션 구성
    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers },
      // GET, DELETE 요청일 때 Body는 undefined
      body: ['GET', 'DELETE'].includes(req.method)
        ? undefined
        : JSON.stringify(req.body),
    }

    // Host, origin 등 일부 헤더는 제거
    delete fetchOptions.headers['host']
    delete fetchOptions.headers['origin']
    delete fetchOptions.headers['referer']

    // fetch 요청
    const response = await fetch(targetUrl, fetchOptions)

    // 응답 헤더와 바디 전달
    res.status(response.status)
    response.headers.forEach((value, key) => {
      // CORS 관련 헤더는 무시
      if (
        ![
          'content-length',
          'content-encoding',
          'transfer-encoding',
          'connection',
        ].includes(key)
      ) {
        res.setHeader(key, value)
      }
    })
    
    const buffer = await response.buffer()
    res.send(buffer)
  } catch (error) {
    res
      .status(500)
      .json({ error: '페칭 요청된 URL 오류 발생', detail: error.message })
  }
})

// 앱 리스닝
app.listen(PORT, () => {
  console.log(`CORS 프록시 서버 구동: http://localhost:${PORT}`)
})

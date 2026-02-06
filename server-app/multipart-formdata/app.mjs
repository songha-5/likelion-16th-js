import express from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'

// 환경 설정 및 디렉토리 관리 ------------------------------------------------------

// 파일이 저장될 폴더가 없다면 자동으로 만들어 줍니다.
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

// 파일 저장 장소와 이름을 세밀하게 설정합니다.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // 중복 방지를 위해 [시간-랜덤숫자.확장자] 형식으로 이름을 지어줍니다.
    let uniqueName = `${Date.now()}-`
    uniqueName += Math.round(Math.random() * 1e9)
    uniqueName += path.extname(file.originalname)
    cb(null, uniqueName)
  },
})


// 보안 및 제약 사항 설정 --------------------------------------------------------

// 파일 필터링 (선택사항)
const fileFilter = (req, file, cb) => {
  // 사용자가 이미지만 올릴 수 있도록 안내합니다.
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('이미지 파일만 업로드 가능합니다.'), false)
  }
}

// 파일 업로드
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한
  },
  // 필요하지 않을 경우, 주석 처리
  fileFilter,
})

// 라우팅 및 요청 처리 ----------------------------------------------------------

const app = express()
const PORT = 4000

// 정적 파일 제공
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

// 테스트용 HTML 페이지
app.get('/', (req, res) => {
  res.send(/* html */`
    <!DOCTYPE html>
    <html lang="ko-KR">
      <head>
        <meta charset="utf-8" />
        <title>파일 업로드 테스트 (multipart/form-data)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/cloud-upload.png" />
      </head>
      <body>
        
        <main>
          <h1>파일 업로드</h1>
        
          <section>
            <h2><abbr title="Hyper Text Markup Language">HTML</abbr> 폼 방식</h2>
            <form action="/upload" method="post" enctype="multipart/form-data">
              <div>
                <label for="username">이름</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div>
                <label for="email">이메일</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label for="avatar">파일</label>
                <input type="file" id="avatar" name="avatar" required />
              </div>
              <div>
                <button type="submit">업로드</button>
              </div>
            </form>
          </section>
          
          <section>
            <h2>JavaScript 비동기 요청 방식</h2>
            <form id="js-form" autocomplete="off" novalidate>
              <div>
                <label for="js-username">이름</label>
                <input type="text" id="js-username" name="username" required />
              </div>
              <div>
                <label for="js-email">이메일</label>
                <input type="email" id="js-email" name="email" required />
              </div>
              <div>
                <label for="js-file">파일</label>
                <input type="file" id="js-file" name="avatar" required />
              </div>
              <div>
                <button type="submit">업로드</button>
              </div>
            </form>
          </section>

          <div id="result"></div>
        </main>
        
        <script>
          const jsForm = document.getElementById('js-form')
          const result = document.getElementById('result')

          jsForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const form = e.currentTarget
            const formData = new FormData(form)
            
            // 또는 빈 FormData를 만들고 직접 추가
            // const formData = new FormData()
            // const [usernameInput, emailInput, fileInput] = form.elements
            // formData.append('username', usernameInput.value.trim())
            // formData.append('email', emailInput.value.trim())
            // formData.append('avatar', fileInput.files[0])

            // Fetch API 사용
            uploadWithFetch(formData)
            
            // XMLHttpRequest 사용
            // uploadByXMLHttpRequest(formData)
          })

          function uploadWithFetch(formData) {
            return fetch('/upload', {
              method: 'POST',
              body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
              result.innerHTML = '<h3>업로드 결과:</h3>'
              result.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>'
            })
            .catch((error) => {
              result.innerHTML = '<h3>오류:</h3><p>' + error.message + '</p>';
            })
          }

          function uploadByXMLHttpRequest(formData) {
            const xhr = new XMLHttpRequest()
            
            // 업로드 진행률 표시 (선택사항)
            xhr.upload.addEventListener('progress', (e) => {
              if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100
                console.log('업로드 진행률: ' + percentComplete.toFixed(2) + '%')
              }
            })
            
            // 요청 완료 처리
            xhr.addEventListener('load', () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const data = JSON.parse(xhr.responseText)
                  result.innerHTML = '<h3>업로드 결과:</h3>'
                  result.innerHTML += '<pre>' + JSON.stringify(data, null, 2) + '</pre>'
                  console.log('업로드 성공:', data)
                } catch (error) {
                  result.innerHTML = '<h3>오류:</h3><p>응답 파싱 실패</p>'
                  console.error('응답 파싱 실패:', error)
                }
              } else {
                result.innerHTML = '<h3>오류:</h3><p>서버 오류: ' + xhr.status + '</p>'
                console.error('서버 오류:', xhr.status)
              }
            })
            
            // 네트워크 오류 처리
            xhr.addEventListener('error', () => {
              result.innerHTML = '<h3>오류:</h3><p>네트워크 오류가 발생했습니다.</p>'
              console.error('네트워크 오류')
            })
            
            // 요청 타임아웃 처리
            xhr.addEventListener('timeout', () => {
              result.innerHTML = '<h3>오류:</h3><p>요청 시간이 초과되었습니다.</p>'
              console.error('요청 시간 초과')
            })
            
            // 요청 설정
            xhr.open('POST', '/upload')
            xhr.timeout = 30000 // 30초 타임아웃
            
            // Content-Type을 설정하지 않음
            // 브라우저가 자동으로 multipart/form-data와 boundary 설정
            xhr.send(formData)
          }
        </script>
      </body>
    </html>
  `)
})

// 단일 파일 업로드 처리
app.post('/upload', upload.single('avatar'), (req, res) => {
  try {
    console.log('업로드된 파일:', req.file)
    console.log('폼 데이터:', req.body)

    if (!req.file) {
      return res.status(400).json({ error: '파일이 업로드되지 않았습니다.' })
    }

    res.json({
      message: '파일 업로드 성공!',
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path,
      },
      formData: req.body,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 다중 파일 업로드 처리
app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
  try {
    console.log('업로드된 파일들:', req.files)
    console.log('폼 데이터:', req.body)

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: '파일이 업로드되지 않았습니다.' })
    }

    const fileInfo = req.files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
    }))

    res.json({
      message: '다중 파일 업로드 성공!',
      files: fileInfo,
      formData: req.body,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 오류 처리 미들웨어
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ error: '파일 크기가 너무 큽니다. (최대 5MB)' })
    }
  }
  res.status(500).json({ error: error.message })
})

// Express 앱 리스닝
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
  console.log('브라우저에서 위 주소로 접속하여 테스트하세요.')
})

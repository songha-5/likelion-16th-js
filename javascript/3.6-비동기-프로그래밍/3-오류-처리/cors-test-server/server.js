const server = {
  port: 4000,
  async fetch(request) {
    const url = new URL(request.url)
    const userId = url.pathname.split('/').pop()

    const corsHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      // 'Access-Control-Allow-Origin': '*', // CORS 허용 시 필요한 헤더
      'Access-Control-Allow-Headers': 'Content-Type', // POST 요청 시 필요한 헤더
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // ---------------------------------------------------------------
    // 인증 엔드포인트: /auth/login (POST)
    // ---------------------------------------------------------------
    if (url.pathname === '/auth/login' && request.method === 'POST') {
      const credentials = await request.json()

      // 입력한 값과 비교 (avat, avatpass)
      if (credentials.username === 'avat' && credentials.password === 'avatpass') {
        return new Response(JSON.stringify({
          id: 1,
          username: 'avat',
          firstName: 'Javascript',
          lastName: 'Learner',
          email: 'avat@example.com',
          token: 'fake-jwt-token-for-lab' // 실습용 가짜 토큰
        }), { headers: corsHeaders })
      }

      // 인증 실패 시 401 에러 반환
      return new Response(
        JSON.stringify({
          message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        }),
        {
          status: 401,
          headers: corsHeaders,
        },
      )
    }

    // ---------------------------------------------------------------
    // 데이터 엔드포인트별 응답 구성
    // ---------------------------------------------------------------

    // 1. 장바구니 데이터
    if (url.pathname.includes('/carts/user/')) {
      return new Response(JSON.stringify({
        carts: [
          { id: 1, userId, products: [{ title: '아이폰 15' }] },
          { id: 2, userId, products: [{ title: '맥북 에어' }] }
        ]
      }), { headers: corsHeaders })
    }

    // 2. 상품 데이터
    if (url.pathname.includes('/products')) {
      return new Response(JSON.stringify({
        products: [
          { id: 10, title: '친환경 텀블러' },
          { id: 11, title: '무선 키보드' }
        ]
      }), { headers: corsHeaders })
    }

    // 3. 포스트 데이터 (에러 상황 테스트용 - 500 에러 반환)
    // Promise.allSettled에서 'rejected' 상태 확인용
    if (url.pathname.includes('/posts/user/')) {
      // 주석을 해제하면 에러가 발생하여 UI에 '⚠️ 로드 실패'가 뜹니다.
      // return new Response(JSON.stringify({ message: 'Server Error' }), {
      //   status: 500,
      //   headers: corsHeaders,
      // })

      return new Response(JSON.stringify({
        posts: [
          { id: 101, title: '오늘의 자바스크립트 학습 기록' },
          { id: 102, title: 'CORS란 무엇인가?' }
        ]
      }), { headers: corsHeaders })
    }

    // 4. 할 일 데이터
    if (url.pathname.includes('/todos/user/')) {
      return new Response(JSON.stringify({
        todos: [
          { id: 1, todo: '비동기 통신 복습하기', completed: true },
          { id: 2, todo: 'Bun으로 서버 띄워보기', completed: false }
        ]
      }), { headers: corsHeaders })
    }

    return new Response(JSON.stringify({ message: 'Not Found' }), {
      status: 404,
      headers: corsHeaders,
    })
  }
}

export default server
export function useState(initialState) {
  // 은닉화 (데이터 보호)
  // 지역 변수
  let state = initialState

  // 은닉화된 지역 변수를 변경할 수 있는 함수
  const setState = (nextState) => {
    state = nextState

    render(state)
    
    // 업데이트 된 상태
    return state
  }

  // 명시적으로 [state, setState] 반환
  return [state, setState]
}

// useState 함수의 API
// const [state, setState] = useState(initialState)

function render(state) {
  console.log(`UI 렌더링 (현재 상태) = ${state}`)
}
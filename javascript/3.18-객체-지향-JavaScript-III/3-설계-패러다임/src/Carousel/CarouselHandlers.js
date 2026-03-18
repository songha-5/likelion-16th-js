/**
 * --------------------------------------------------------------------------
 * 외부에서 주입받아 이벤트를 처리하는 핸들러 생성기
 * --------------------------------------------------------------------------
 * - 예: 운영체제(OS)
 * - 똑같은 화면(하드웨어)이라도 OS에 따라 조작법이 바뀌듯, 가로/세로 방향에 따라 작동이 결정됨
 * --------------------------------------------------------------------------
 */

// 키보드 조작 로직 부품
export const createKeyboardHandler = (strategy, moveFn, stopAutoFn) => (e) => {
  const step = strategy.getStepFromKey(e)
  if (step !== 0) {
    stopAutoFn()
    moveFn(step)
  }
}

// 마우스 휠 조작 로직 부품
export const createWheelHandler = (strategy, moveFn, stopAutoFn, state) => (e) => {
  e.preventDefault()
  if (state.isWheeling) return
  state.isWheeling = true
  stopAutoFn()
  moveFn(strategy.getStepFromWheel(e))
  setTimeout(() => { state.isWheeling = false }, 600)
}

// 포인터(드래그) 조작 로직 부품
export const createPointerHandlers = (strategy, stage, rail, state, moveFn, stopAutoFn) => {
  return {
    down: (e) => {
      if (e.target.closest('[data-nav]')) return
      state.isDragging = true
      stopAutoFn()
      state.startPos = strategy.getPointerPos(e)
      rail.dataset.animating = 'false'
      stage.setPointerCapture(e.pointerId)
    },
    move: (e) => {
      if (!state.isDragging) return
      const currentPos = strategy.getPointerPos(e)
      state.currentTranslate = state.prevTranslate + (currentPos - state.startPos)
      strategy.setTransform(rail, state.currentTranslate)
    },
    up: () => {
      if (!state.isDragging) return
      state.isDragging = false
      rail.dataset.animating = 'true'
      const diff = state.currentTranslate - state.prevTranslate
      const step = Math.abs(diff) > strategy.getSize(stage) / 10 ? (diff < 0 ? 1 : -1) : 0
      moveFn(step)
    }
  }
}
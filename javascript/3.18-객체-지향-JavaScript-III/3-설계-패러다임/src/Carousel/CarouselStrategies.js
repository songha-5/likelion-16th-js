/**
 * --------------------------------------------------------------------------
 * 부품(전략)
 * --------------------------------------------------------------------------
 * - 예: 운영체제(OS)
 * - 똑같은 화면(하드웨어)이라도 OS에 따라 조작법이 바뀌듯, 가로/세로 방향에 따라 작동이 결정됨
 * --------------------------------------------------------------------------
 */

// 가로 방향 이동 전략(부품)
export const HorizontalStrategy = {
  getSize: (stage) => stage.offsetWidth,
  setTransform: (rail, pos) => {
    rail.style.transform = `translate3d(${pos}px, 0, 0)`
  },
  // 이벤트 주입 시 방향에 맞는 결과 반환
  getStepFromKey: (e) => (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0),
  getStepFromWheel: (e) => (e.deltaY > 0 ? 1 : -1),
  getPointerPos: (e) => e.clientX,
}

// 세로 방향 이동 전략(부품)
export const VerticalStrategy = {
  getSize: (stage) => stage.offsetHeight,
  setTransform: (rail, pos) => {
    rail.style.transform = `translate3d(0, ${pos}px, 0)`
  },
  getStepFromKey: (e) => (e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0),
  getStepFromWheel: (e) => (e.deltaY > 0 ? 1 : -1),
  getPointerPos: (e) => e.clientY,
}
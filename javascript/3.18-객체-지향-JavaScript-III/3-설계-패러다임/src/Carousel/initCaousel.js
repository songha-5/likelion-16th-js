/**
 * --------------------------------------------------------------------------
 * initCarousel 초기화 함수
 * --------------------------------------------------------------------------
 * - 예: 밖에서 가져온 부품들을 실제 UI에 '장착'하는 조립 기사
 * - 하드웨어(UI)와 소프트웨어(Strategy)를 가져와 하나로 합쳐 실제 작동하게 만듬
 * --------------------------------------------------------------------------
 */

import {
  createKeyboardHandler,
  createPointerHandlers,
  createWheelHandler,
} from './CarouselHandlers.js'

function initCarousel(container, strategy) {
  const rail = container.querySelector('[data-carousel-rail]')
  const stage = container.querySelector('[data-carousel-stage]')
  const indicator = container.querySelector('[data-indicator-numeric]')
  const previews = container.querySelectorAll('[data-preview-box]')
  const toggleButton = container.querySelector('[data-nav="toggle"]')

  const items = Array.from(rail.children)
  const total = items.length
  if (total === 0) return

  const imageSources = items.map((item) => item.querySelector('img').src)
  rail.append(items.at(0).cloneNode(true))
  rail.firstElementChild.before(items.at(-1).cloneNode(true))

  // 상태 관리 객체 (부품들이 공유함)
  const state = {
    index: 1,
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    autoTimer: null,
    isWheeling: false,
  }

  const updateUI = () => {
    const displayIndex = ((state.index - 1 + total) % total) + 1
    indicator.textContent = `${String(displayIndex).padStart(2, '0')} | ${String(total).padStart(2, '0')}`
    previews.forEach((preview) => {
      const type = preview.dataset.previewBox
      const idx =
        type === 'prev'
          ? (displayIndex - 2 + total) % total
          : displayIndex % total
      preview.innerHTML = `<img src="${imageSources[idx]}" alt="" />`
    })
  }

  const move = (step = 0, smooth = true) => {
    state.index += step
    rail.dataset.animating = smooth ? 'true' : 'false'
    state.currentTranslate = -state.index * strategy.getSize(stage)
    state.prevTranslate = state.currentTranslate
    strategy.setTransform(rail, state.currentTranslate)
    updateUI()
  }

  const stopAuto = () => {
    if (state.autoTimer) {
      clearInterval(state.autoTimer)
      state.autoTimer = null
      toggleButton.textContent = '▶'
      toggleButton.setAttribute('aria-label', '재생')
    }
  }

  // 외부 부품 조립 (Dependency Injection)
  const keyboardHandler = createKeyboardHandler(strategy, move, stopAuto)
  const wheelHandler = createWheelHandler(strategy, move, stopAuto, state)
  const pointerHandlers = createPointerHandlers(
    strategy,
    stage,
    rail,
    state,
    move,
    stopAuto,
  )

  // 이벤트 연결
  container.addEventListener('keydown', keyboardHandler)
  stage.addEventListener('wheel', wheelHandler, { passive: false })
  stage.addEventListener('pointerdown', pointerHandlers.down)
  stage.addEventListener('pointermove', pointerHandlers.move)
  stage.addEventListener('pointerup', pointerHandlers.up)

  // 기본 인터페이스(버튼 클릭 등)는 여기서 조립
  container.addEventListener('click', (e) => {
    const toggleButton = e.target.closest('[data-nav]')
    if (!toggleButton) return
    if (
      toggleButton.dataset.nav === 'next' ||
      toggleButton.dataset.nav === 'prev'
    ) {
      stopAuto()
      move(toggleButton.dataset.nav === 'next' ? 1 : -1)
    } else if (toggleButton.dataset.nav === 'toggle') {
      if (state.autoTimer) stopAuto()
      else {
        state.autoTimer = setInterval(() => move(1), 3000)
        toggleButton.textContent = 'Ⅱ'
        toggleButton.setAttribute('aria-label', '일시 정지')
      }
    }
  })

  rail.addEventListener('transitionend', () => {
    if (state.index >= total + 1) {
      state.index = 1
      move(0, false)
    } else if (state.index <= 0) {
      state.index = total
      move(0, false)
    }
  })

  globalThis.addEventListener('resize', () => move(0, false))
  globalThis.requestAnimationFrame(() => move(0, false))
}

export default initCarousel

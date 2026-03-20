// --------------------------------------------------------------------------
// ⚙️ 이벤트 핸들러 : 모든 이벤트를 수집하고 위임하는 컨트롤러 모듈
// --------------------------------------------------------------------------

import { UIManager } from './ui-manager'

export const EventHandler = (() => {
  // 문서 전체 이벤트 위임 로직
  const documentEventDelegation = () => {
    document.addEventListener('click', (e) => {
      const { body } = e.currentTarget
      const target = e.target

      // 테마 버튼 클릭 처리
      if (target.closest('[data-theme-btn]')) {
        const current = body.getAttribute('data-theme')
        UIManager.toggleThemeUI(current === 'dark' ? 'light' : 'dark')
        return
      }

      // 셀렉트 트리거 클릭
      const trigger = target.closest('[data-select-trigger]')
      if (trigger) {
        e.stopPropagation()
        const optionsList = document.querySelector('[data-select-options]')
        const isOpen = optionsList.style.display === 'block'
        optionsList.style.display = isOpen ? 'none' : 'block'
        trigger.setAttribute('aria-expanded', !isOpen)
        return
      }

      // 셀렉트 옵션 아이템 클릭
      const optionItem = target.closest('[data-option]')
      if (optionItem) {
        const val = optionItem.getAttribute('data-option')
        const triggerBtn = document.querySelector('[data-select-trigger]')
        const native = document.querySelector('[data-native-select]')

        triggerBtn.textContent = optionItem.textContent
        native.value = val
        document.querySelector('[data-select-options]').style.display = 'none'
        triggerBtn.setAttribute('aria-expanded', 'false')
        triggerBtn.focus() // 선택 후 포커스 복구
        return
      }

      // 외부 클릭 시 셀렉트 닫기
      document.querySelector('[data-select-options]').style.display = 'none'
    })
  }

  // 셀렉트 키보드 접근성 로직
  const selectMenuKeyA11y = () => {
    const selectContainer = document.querySelector(
      '[data-custom-select-container]',
    )
    const selectTrigger = selectContainer.querySelector('[data-select-trigger]')
    const optionsList = selectContainer.querySelector('[data-select-options]')
    
    // 셀렉트 메뉴 옵션 목록 열기 함수
    const openOptionsList = (options) => {
      optionsList.style.display = 'block'
      selectTrigger.setAttribute('aria-expanded', 'true')
      // 열리자마자 첫 항목에 포커스
      setTimeout(() => options[0]?.focus())
    }

    // 셀렉트 메뉴 옵션 목록 닫기 함수
    const closeOptionsList = () => {
      optionsList.style.display = 'none'
      selectTrigger.setAttribute('aria-expanded', 'false')
      selectTrigger.focus()
    }

    // 트리거가 버튼이 아닐 경우를 대비해 키보드 포커스 허용
    if (selectTrigger && selectTrigger.tagName !== 'BUTTON') {
      selectTrigger.setAttribute('tabindex', '0')
    }

    selectContainer?.addEventListener('keydown', (e) => {
      const isOpen = optionsList.style.display === 'block'
      const options = Array.from(optionsList.querySelectorAll('[data-option]'))
      // 현재 선택된(포커스된) 옵션의 인덱스 찾기
      const currentIndex = options.indexOf(document.activeElement)

      // 열기 (Enter, Space, ArrowDown, ArrowUp)
      if (!isOpen && ['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        openOptionsList(options)
        return
      }

      // 닫기 (Escape)
      if (isOpen && e.key === 'Escape') closeOptionsList()
    })

    // 옵션 리스트 내부에서의 키보드 이동
    optionsList?.addEventListener('keydown', (e) => {
      const options = Array.from(optionsList.querySelectorAll('[data-option]'))
      const currentIndex = options.indexOf(document.activeElement)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % options.length
        options[nextIndex].focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + options.length) % options.length
        options[prevIndex].focus()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        document.activeElement.click()
        setTimeout(closeOptionsList)
      }
    })

    // 옵션들이 키보드 포커스를 받을 수 있도록 설정
    optionsList
      ?.querySelectorAll('[data-option]')
      .forEach((option) => option.setAttribute('tabindex', '-1'))
  }

  // 폼 제출 이벤트 로직
  const formSubmitEvent = (onSystemStart) => {
    document
      .querySelector('[data-iot-form]')
      .addEventListener('submit', (e) => {
        e.preventDefault()
        onSystemStart(new FormData(e.currentTarget))
      })
  }

  // 셧다운 버튼 로직
  const shutdownButton = () => {
    document
      .querySelector('[data-btn-shutdown]')
      .addEventListener('click', () => {
        if (confirm('시스템 전체를 종료하시겠습니까?')) {
          location.reload()
        }
      })
  }

  // 테마 전환 단축키(D) 로직
  const toggleThemeShorcut = () => {
    globalThis.addEventListener('keydown', (e) => {
      if (
        /d|ㅇ/.test(e.key.toLowerCase()) &&
        !e.shiftKey &&
        !e.altKey &&
        e.target.tagName === 'BODY'
      ) {
        const current = document.body.getAttribute('data-theme')
        UIManager.toggleThemeUI(current === 'dark' ? 'light' : 'dark')
      }
    })
  }

  return {
    init: (onSystemStart) => {
      formSubmitEvent(onSystemStart)
      documentEventDelegation()
      toggleThemeShorcut()
      selectMenuKeyA11y()
      shutdownButton()
    },
  }
})()

// --------------------------------------------------------------------------
// ⚙️ UI 매니저 : 화면 표시 및 로그 출력을 담당하는 UI 모듈
// --------------------------------------------------------------------------

export const UIManager = {
  updateMonitor: (data) => {
    document.querySelector('[data-view-hub]').textContent = data.hubId
    document.querySelector('[data-view-adapter]').textContent = data.protocol
    document.querySelector('[data-view-device-info]').textContent = `${data.emoji} ${data.name}`
    document.querySelector('[data-view-action-log]').innerHTML = `${data.strategyMsg}<br /><small style="color:var(--dim)">${data.decorated ?? ''}</small>`
  },

  addLog: (message) => {
    const list = document.querySelector('[data-observer-list]')
    const item = document.createElement('div')
    item.style.setProperty('padding', '4px 0')
    item.textContent = `> ${new Date().toLocaleTimeString()} ${message}`
    list.prepend(item)
  },

  toggleThemeUI: (theme) => {
    document.body.setAttribute('data-theme', theme)
    const iconPath = theme === 'dark'
      ? `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`
      : `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z" />`
    document.querySelector('[data-theme-icon]').innerHTML = iconPath
  },

  focusingSelectMenu: () => {
    const selectTrigger = document.querySelector('[data-select-trigger]')
    selectTrigger?.focus()
  }
}
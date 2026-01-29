const ACTIVE_CLASS = {
  tab: 'tab-nav__button--active',
  panel: 'tab-panel--active',
}

const tabs = document.querySelectorAll('.tab-nav .tab-nav__button')
const panels = document.querySelectorAll('.tab-panel')

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedTab = tab

    removeActivatedClass(tabs, 'tab')
    activeSelectedTab(selectedTab)

    removeActivatedClass(panels, 'panel')
    activeSelectedPanel(selectedTab)
  })
})

function removeActivatedClass(list, type) {
  const activeClassName = ACTIVE_CLASS[type]
  list.forEach((item) => {
    if (item.classList.contains(activeClassName)) {
      item.classList.remove(activeClassName)
    }
  })
}

function activeSelectedTab(selectedTab) {
  selectedTab.classList.add(ACTIVE_CLASS.tab)
}

function activeSelectedPanel(selectedTab) {
  const targetId = selectedTab.getAttribute('data-target')
  const targetPanel = document.getElementById(targetId)
  
  if (targetPanel) {
    targetPanel.classList.add(ACTIVE_CLASS.panel)
  }
}
console.log('HI')

// const siteContainer = document.classList.container('site-container')
// const offSiteContainer = document.classList.container('offsite-container')

const siteContainerSelect = document.querySelector('.site-container')
const siteButton = siteContainerSelect.querySelector('[data-role="open-button"]')

const offSiteContainerSelect = document.querySelector('.offsite-container')

siteButton.addEventListener('click', () => {
  siteButton.classList.toggle('offsite-is-open')
  offSiteContainerSelect.classList.toggle('offsite-open')
})




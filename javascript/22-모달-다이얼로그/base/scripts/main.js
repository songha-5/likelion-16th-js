const ACTIVE_CLASS = 'is-open'
const bodyClass = document.body
const modalOverlay = document.querySelector('.modal-overlay')
const modalCloseButton = bodyClass.querySelector('[data-type="close-button"]')
const modalOpenButton = bodyClass.querySelector('[data-type="open-button"]')

modalCloseButton.addEventListener('click', handleCloseModal)
modalOpenButton.addEventListener('click', handleOpenModal)

function handleOpenModal() {
  modalOverlay.classList.add(ACTIVE_CLASS)
}
function handleCloseModal() {
  modalOverlay.classList.remove(ACTIVE_CLASS)
}


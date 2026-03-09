import fetchProducts from './api/fetchProducts'

const searchInput = document.querySelector('[data-search-input]')
const categoryGroup = document.querySelector('[data-category-buttons]')
const productList = document.querySelector('[data-product-list]')
const loading = document.querySelector('[data-loading-text]')

let allProducts = []

searchInput.addEventListener('input', handleSearchInput)
categoryGroup.addEventListener('click', handleCategoryClick)

init()

async function init() {
  try {
    showLoading(true)

    const data = await fetchProducts()
    allProducts = data.products

    createProductElements(allProducts)
  } catch (error) {
    console.error(error.message)
    // 에러 발생 시 알림 역할(role="alert")을 부여하여 즉시 알림
    productList.innerHTML = `<p role="alert">데이터 로드 실패: ${error.message}</p>`
  } finally {
    showLoading(false)
  }
}

function handleSearchInput(e) {
  const { value } = e.target
  const keyword = value.toLowerCase()
  const activeCategory = categoryGroup.querySelector('[data-active="true"]')
  const { category: currentCategory } = activeCategory.dataset
  applyFilters(keyword, currentCategory)
}

function handleCategoryClick(e) {
  const button = e.target.closest('button')
  if (!button) return

  const buttons = categoryGroup.querySelectorAll('button')
  buttons.forEach((button) => {
    // [명령형] 시각적 상태와 보조 공학 상태를 각각 직접 수정
    button.dataset.active = 'false'
    button.setAttribute('aria-pressed', 'false')
  })

  button.dataset.active = 'true'
  button.setAttribute('aria-pressed', 'true')

  const keyword = searchInput.value.toLowerCase()
  applyFilters(keyword, button.dataset.category)
}

function applyFilters(keyword, category) {
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild)
  }

  const filtered = allProducts.filter((product) => {
    const matchKeyword = product.title.toLowerCase().includes(keyword)
    const matchCategory = category === 'all' || product.category === category
    return matchKeyword && matchCategory
  })

  createProductElements(filtered)
}

function createProductElements(items) {
  if (items.length === 0) {
    const emptyMessage = document.createElement('p')
    // 검색 결과가 없음을 알리는 상태 역할 부여
    emptyMessage.setAttribute('role', 'status')
    emptyMessage.textContent = '검색 결과가 없습니다.'
    productList.appendChild(emptyMessage)
    return
  }

  items.forEach((item) => {
    const article = document.createElement('article')
    article.dataset.productCard = ''

    const img = document.createElement('img')
    img.dataset.productImage = ''
    img.src = item.thumbnail
    img.alt = `${item.title} 상품`

    const h3 = document.createElement('h3')
    h3.dataset.productName = ''
    h3.textContent = item.title

    const span = document.createElement('span')
    span.dataset.productPrice = ''
    span.textContent = `$${item.price}`

    article.append(img, h3, span)
    productList.append(article)
  })
}

function showLoading(isLoading) {
  if (isLoading) {
    loading.hidden = false
    productList.hidden = true
    // [명령형] 섹션이 바쁜 상태임을 직접 지시
    productList.setAttribute('aria-busy', 'true')
  } else {
    loading.hidden = true
    productList.hidden = false
    productList.setAttribute('aria-busy', 'false')
  }
}

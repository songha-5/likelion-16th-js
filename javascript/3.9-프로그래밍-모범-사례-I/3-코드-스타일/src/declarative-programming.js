import fetchProducts from './api/fetchProducts'

/**
 * [실습 목표]
 * 1. 시스템의 모든 상태를 하나의 'state' 객체에서 관리합니다.
 * 2. 상태를 변경하는 로직(updateState)과 UI를 그리는 로직(render)을 분리합니다.
 * 3. render 함수는 오직 state를 기반으로 "무엇이 보여야 하는지"만 정의합니다.
 */

// TODO 1: 초기 상태 선언
// - 앱에 필요한 데이터들을 하나의 객체로 구조화해 보세요.
//   - isLoading: false
//   - error: ''
//   - products: []
//   - filter
//     - keyword: ''
//     - category: 'all'
let state = null

// TODO 2: 상태 업데이트 엔진
// - 상태를 업데이트한 후 반드시 render() 함수를 호출하여 UI를 동기화하세요.
function updateState(newState) {
  // - updateState 함수는 newState 전달 받아 state 객체 업데이트 (Object.assign 활용)
  // - newState 타입이 함수인 경우, state를 전달해 반환되 값과 상태 병합
}


// --------------------------------------------------------------------------


const searchInput = document.querySelector('[data-search-input]')
const categoryGroup = document.querySelector('[data-category-buttons]')
const productList = document.querySelector('[data-product-list]')
const loading = document.querySelector('[data-loading-text]')


searchInput.addEventListener('input', handleSearchInput)
categoryGroup.addEventListener('click', handleCategoryClick)

init()

// 데이터 초기화
async function init() {
  try {
    // TODO 3: 로딩 상태를 true로 변경하여 화면에 로딩 표시를 띄우세요.
        
    const data = await fetchProducts()
    
    // TODO 4: 받아온 데이터(data)를 state에 저장하고 로딩 상태를 false로 바꾸세요.

  } catch (error) {
    // TODO 5: 에러 발생 시, state.error에 메시지를 담고 로딩을 종료하세요.
    
  }
}

function handleSearchInput(e) {
  const keyword = e.target.value.toLowerCase()
  // TODO 6: 사용자가 입력한 검색어를 state.filter.keyword에 반영하세요.
  
}

function handleCategoryClick(e) {
  const button = e.target.closest('button')
  if (!button) return

  const { category } = button.dataset

  // TODO 7: 선택된 카테고리(cateogry)를 state에 반영하세요. (updateState 활용)
  
}

function render() {
  // 로딩 및 접근성 상태 제어
  loading.hidden = !state.isLoading
  productList.hidden = state.isLoading
  productList.setAttribute('aria-busy', state.isLoading)

  if (state.isLoading) return
  
  // 에러 UI 처리
  if (state.error) {
    productList.innerHTML = `<p role="alert">오류 발생: ${state.error}</p>`
    return
  }

  // 카테고리 버튼의 활성 상태 동기화
  categoryGroup.querySelectorAll('button').forEach((button) => {
    const isSelected = button.dataset.category === state.filter.category
    button.dataset.active = isSelected
    button.setAttribute('aria-pressed', isSelected)
  })

  // 필터링 로직 (데이터 가공)
  const filteredList = state.products.filter((product) => {
    const matchKeyword = product.title.toLowerCase().includes(state.filter.keyword)
    const matchCategory = state.filter.category === 'all' || product.category === state.filter.category
    return matchKeyword && matchCategory
  })

  // 리스트 출력 (템플릿 정의)
  const productHTML = filteredList
    .map(
      (item) => `
        <article data-product-card>
          <img data-product-image src="${item.thumbnail}" alt="${item.title} 상품 이미지" />
          <h3 data-product-name>${item.title}</h3>
          <span data-product-price>$${item.price}</span>
        </article>
      `
    )
    .join('')

  productList.innerHTML = productHTML || '<p role="status">검색 결과가 없습니다.</p>'
}
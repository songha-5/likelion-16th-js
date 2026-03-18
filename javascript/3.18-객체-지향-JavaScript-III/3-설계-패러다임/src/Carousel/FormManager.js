/**
 * --------------------------------------------------------------------------
 * FormManager (Assembler) 객체
 * --------------------------------------------------------------------------
 * - 전체 앱의 어셈블러(Assembler, 조립가) 역할을 수행
 * - 내부에서 Carousel(UI), Strategy(Parts)를 initCarousel 함수에 전달(합성)
 * --------------------------------------------------------------------------
 */

import { HorizontalStrategy } from './CarouselStrategies.js'
import CarouselUI from './CarouselUI.js'
import initCarousel from './initCaousel.js'


const FormManager = {
  form: document.querySelector('[data-config-form]'), // 폼 요소
  uploadedFiles: [], // 업로드 파일 관리(배열)
  fileInput: document.querySelector('[data-file-upload-input]'), // 파일 입력 필드
  dropZone: document.querySelector('[data-file-drop-zone]'), // 드래그 & 드롭 존 영역
  previewContainer: document.querySelector('[data-preview-grid]'), // 파일 미리보기 그리드
  renderContent: document.querySelector('[data-rendered-content]'),

  // 초기화
  init() {
    const { fileInput, dropZone, previewContainer, form } = this

    // change 이벤트 리스너 추가
    fileInput.addEventListener('change', (e) => {
      this.uploadedFiles = [
        ...this.uploadedFiles,
        ...Array.from(e.target.files),
      ]
      this.renderUploadPreviews()
    })

    // dragenter 이벤트 리스너 추가
    fileInput.addEventListener(
      'dragenter',
      () => (dropZone.dataset.state = 'drag-over'),
    )

    // dragleave 이벤트 리스너 추가
    fileInput.addEventListener(
      'dragleave',
      () => (dropZone.dataset.state = ''),
    )
    
    // drop 이벤트 리스너 추가
    fileInput.addEventListener(
      'drop',
      () => (dropZone.dataset.state = ''),
    )

    // [이벤트 위임] previewContainer 요소에 click 이벤트 리스너 추가
    previewContainer.addEventListener('click', (e) => {
      const removeButton = e.target.closest('[data-action="remove"]')
      if (!removeButton) return

      // 버튼이 포함된 아이템의 index를 가져와서 제거 로직 수행
      const item = removeButton.closest('[data-preview-item]')
      const index = Array.from(previewContainer.children).indexOf(item)
      
      if (index > -1) {
        this.uploadedFiles.splice(index, 1)
        this.renderUploadPreviews()
      }
    })

    // submit 이벤트 리스너 추가
    form.addEventListener('submit', (e) => this.handleSubmit(e))
  },

  // 이미지 업로드 미리보기 렌더링
  renderUploadPreviews() {

    const { previewContainer, uploadedFiles } = this

    // 기존 생성된 이미지들의 URL을 해제하여 메모리 확보 (메모리 누수 방지)
    previewContainer
      .querySelectorAll('img')
      .forEach((img) => URL.revokeObjectURL(img.src))

    previewContainer.innerHTML = uploadedFiles.map((file) => {
      const label = `${file.name} 제거`
      const previewImageURL = URL.createObjectURL(file) // 미리보기 이미지 URL 생성
      
      return `
        <div data-preview-item="true">
          <img src="${previewImageURL}">
          <button 
            type="button" 
            data-action="remove" 
            aria-label="${label}"
            title="${label}"
          >
            ×
          </button>
        </div>
      `
    }).join('')
  },

  // 컴포넌트 생성 이벤트 리스너
  handleSubmit(e) {
    e.preventDefault()

    const { form, renderContent } = this

    if (!this.uploadedFiles.length) return

    const formData = new FormData(form)
    const mode = formData.get('mode')

    // UI 조립
    const ui = new CarouselUI(formData.get('title'), mode)
    const dom = ui.render()

    // 전략(Strategy) 부품 선택
    const strategy = HorizontalStrategy 

    if (mode === 'vertical') {
      return alert('세로 모드는 지원 예정입니다.')
    }
    
    // 슬라이드 추가
    const rail = dom.querySelector('[data-carousel-rail]')
    const fragment = document.createDocumentFragment() // 가상 컨테이너 생성 (최적화)

    this.uploadedFiles.forEach((file) => {
      const slide = document.createElement('div')
      slide.dataset.slideItem = 'true'
      slide.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="${file.name}" />`
      fragment.append(slide) // 메모리 내에서만 추가 (리플로우 발생 X)
    })
    
    rail.append(fragment) // 실제 DOM에 한 번에 삽입 (리플로우 1회 발생)

    renderContent.prepend(dom)

    // UI에 부품(전략) 합성
    initCarousel(dom, strategy)

    // 폼 초기화 및 업로드 파일 배열 비우기
    this.uploadedFiles = []
    this.renderUploadPreviews() // URL 정리 (메모리 누수 방지)
    form.reset()
  },
}

export default FormManager
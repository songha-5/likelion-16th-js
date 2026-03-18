/**
 * --------------------------------------------------------------------------
 * 캐러셀(Carousel) UI 클래스
 * --------------------------------------------------------------------------
 * - 예: 스마트폰 하드웨어(외형)와 유사
 * - 화면이 있고, 버튼이 어디 있을지 결정. 전원을 켜기 전까지는 아무 것도 못함
 * --------------------------------------------------------------------------
 */

const ICON_URL = 'https:///systemuicons.com/images/icons/arrow_right.svg'

class CarouselUI {
  constructor(title, mode) {
    this.title = title
    this.mode = mode
    this.iconUrl = ICON_URL
  }

  // UI 렌더링(render)
  render() {
    const el = document.createElement('section')
    el.dataset.component = 'carousel'
    el.dataset.mode = this.mode
    el.tabIndex = 0

    const isHorizontal = this.mode === 'horizontal'
    const rotatePrev = `rotate(${isHorizontal ? 180 : -90}deg)`
    const rotateNext = `rotate(${isHorizontal ? 0 : 90}deg)`

    el.innerHTML = `
      <div data-carousel-header><h3>${this.title}</h3></div>
      <div data-carousel-stage>
        <div data-carousel-rail data-animating="true"></div>
        <div data-control-panel>
          <button type="button" data-nav="prev" aria-label="이전 탐색">
            <img src="${this.iconUrl}" alt="" style="transform: ${rotatePrev}" />
            <div data-preview-box="prev"></div>
          </button>
          <div data-indicator-numeric>01 | 01</div>
          <button type="button" data-nav="next" aria-label="다음 탐색">
            <img src="${this.iconUrl}" alt="" style="transform: ${rotateNext}" />
            <div data-preview-box="next"></div>
          </button>
          <button type="button" data-nav="toggle" aria-label="재생">▶</button>
        </div>
      </div>
    `
    return el
  }
}

export default CarouselUI
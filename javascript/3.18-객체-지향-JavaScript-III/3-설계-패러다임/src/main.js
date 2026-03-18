import FormManager from './Carousel/FormManager.js'
import './style.css'

// --------------------------------------------------------------------------
// 설계 패러다임: 상속(Inheritance) vs 합성(Composition)
// --------------------------------------------------------------------------
// - 상속 방식 (Is-A): "가로 캐러셀은 캐러셀이다." 
//   부모의 유전자를 물려받는 방식입니다. 만약 가로와 세로 기능을 모두 
//   가지려면 상속 구조가 복잡하게 꼬이며 설계의 유연성이 떨어집니다.
//
// - 전략 방식 (Has-A): "캐러셀은 이동 전략을 가방에 담고 있다."
//   필요한 기능을 부품처럼 소유하는 방식입니다. 캐러셀 본체는 그대로 두고 
//   전략 부품만 갈아 끼우면 되므로 클래스를 새로 만들 필요가 없습니다.
// --------------------------------------------------------------------------
// 합성(전략: 끼워넣을 수 있는 부품 = 컴포넌트 = 레고 블럭)
// '필요한 기능(부품)을 갈아끼면 돼!'

{
  // 상속 (class)
// - 슈퍼 클래스 캐러셀(Carousel)
// - 서브 클래스 호리즌탈 캐러셀 (HorizontalCarousel)

class Carousel {
  constructor(name) {
    this.name = name
  }
  
  render() {
    console.log(`${this.name} 캐러셀을 화면에 렌더링합니다.`)
  }
}

// const myCarousel = new Carousel('기본')
// myCarousel.render()

class HorizontalCarousel extends Carousel {
  constructor() {
    super('가로형')
  }

  move() {
    console.log(`가로 방향(← →)으로만 이동 가능합니다.`)
  }
}

// const myHCarousel = new HorizontalCarousel()
// myHCarousel.render()
// myHCarousel.move()


class VerticalCarousel extends Carousel {
  constructor() {
    super('세로형')
  }

  render() {
    super.render()
    console.log(`${this.name} 캐러셀은 불투명도를 조정해 부드럽게 등장합니다.`)
  }

  move() {
    console.log(`세로 방향(↑↓)으로만 이동 가능합니다.`)
  }
}
}
{
  class Carousel {
    constructor(strategy/* 전략(합성) */) {
      this.strategy = strategy // 초기 전략 장착
    }

    // 런타임(실행) 중에 전략(장비) 자유롭게 교체 가능
    setStrategy(newStrategy) {
      console.log('이동 전략을 변경합니다.')
      this.strategy = newStrategy
    }

    performMove() {
      // Carousel 본체는 구체적인 전략에 대해 잘 몰라도 됩니다.
      // 전략(부품)에 맡길 뿐입니다.
      this.strategy.move() // 하나의 통일된 약속(인터페이스) : 다형성
    }

    calculateSize(element) {
      return this.strategy.getSize(element) // 부품(전략)이 가진 동일한 인터페이스(약속) : 다형성
    }
  }

  // 부품(전략) 생성
  // - 가로형 이동
  const HorizontalStrategy = {
    move() {
      console.log('가로 슬라이딩 실행: 왼쪽/오른쪽로 움직입니다.')
    },
    getSize(element) {
      return element.offsetWidth
    },
    // ...
  }

  // - 세로형 이동
  const VerticalStrategy = {
    move() {
      console.log('세로 슬라이딩 실행: 위/아래로 움직입니다.')
    },
    getSize(element) {
      return element.offsetHeight
    },
    // ...
  }

  // - 페이드인/아웃 이동
  const FadeStrategy = {
    move() {
      console.log('페이드 효과 실행: 현재 슬라이드는 서서히 사라지고, 다음 슬라이드는 서서히 나타납니다.')
    },
    getSize(element) {
      return { width: element.offsetWidth, height: element.offsetHeight }
    },
  }

  // 캐러셀 생성 (가로형 이동 전략 설정)
  const myCarousel = new Carousel(HorizontalStrategy)
  myCarousel.performMove()
  
  // 런타임(실행) 중에 필요에 의해서 전략을 교체
  // 가로형 부품 -> 세로형 부품 교체
  myCarousel.setStrategy(VerticalStrategy)
  myCarousel.performMove()

  myCarousel.setStrategy(FadeStrategy)
  myCarousel.performMove()

}
// --------------------------------------------------------------------------
// 확장성(Scalability) 관점의 차이
// --------------------------------------------------------------------------
// - 상속(Inheritance): "나는 가로 전용 유전자를 타고났어. 
//   방향을 바꾸려면 다시 태어나는 수밖에 없어!" (경직된 구조)
// 
// - 전략(Strategy): "나는 기본 캐러셀이야. 지금은 가로 키트를 장착했지만, 
//   원한다면 언제든 세로 키트로 교체할 수 있지!" (유연한 구조)
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// "역할 분담"이 클린 코드와 좋은 설계의 첫걸음
// --------------------------------------------------------------------------
// - CarouselUI : "어떻게 생겼지?" (외형 담당)
// - Strategies : "가로로 가나, 세로로 가나?" (이동 방식 전략)
// - Handlers : "사용자가 뭘 눌렀지?" (조작 로직 부품)
// - initCarousel : "언제, 어떻게 움직여야 하지?" (조립 및 중재 담당)
// - FormManager : "어떻게 캐러셀을 만들지?" (전체 관리자)
// --------------------------------------------------------------------------

FormManager.init()

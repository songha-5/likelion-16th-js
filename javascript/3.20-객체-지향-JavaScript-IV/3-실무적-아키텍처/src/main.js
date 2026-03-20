import DeliverySubject from './architectures/DeliverySubject'
import Logger from './architectures/Logger'
import GiftDecorator, { BasePayment } from './architectures/PaymentDecorator'
import PaymentContext, { FixedStrategy, PercentStragety } from './architectures/PaymentStrategy'
import './style.css'

program()

function program() {
  
  // 현재 가격 상수
  const CURRENT_PRICE = 20000

  // 선물 포장 비용
  const GIFT_OPTION_PRICE = 3000

  const logList = document.querySelector('[data-log-list]')
  const statusDisplay = document.querySelector('[data-status-display]')
  const priceDisplay = document.querySelector('[data-price-display]')
  const resetButton = document.querySelector('[data-reset-button]')
  const controlGroup = document.querySelector('[data-control-group]')
  const StrategyGroup = document.querySelector('[data-strategy-group]')
  const decoratorButton = document.querySelector('[data-decorator]')

  controlGroup.addEventListener('click', handleControls)
  StrategyGroup.addEventListener('click', handleStrategy)
  decoratorButton.addEventListener('click', handleGiftOption)
  resetButton.addEventListener('click', handleReload)

  // --------------------------------------------------------------------------
  // [실습 1] 싱글톤: 시스템 로그 관리자 불러오기
  // - 가치: 전역에서 단 하나의 인스턴스로 로그를 통합 관리하여 데이터 일관성을 확보함
  // - TODO: Logger 클래스의 정적 메서드 get()을 이용해 단일 인스턴스를 가져오세요.

  let logger = null


  // --------------------------------------------------------------------------
  // [실습 2] 옵저버: 알림 시스템 교체 시뮬레이션
  // - 가치: UI와 비즈니스 로직을 완전히 분리하여 알림 방식이 바뀌어도 메인 로직을 보호함

  const deliverySubject = new DeliverySubject()

  // 기본 알림 (카톡)
  const kakaoNotifier = (status) => logger.write(`[카톡] 상태 변경: ${status}`)

  // TODO: 새로운 알림(문자) 기능을 정의해 보세요.
  const smsNotifier = null

  // 초기 구독 설정
  deliverySubject.subscribe(kakaoNotifier)
  deliverySubject.subscribe(updateStatusDisplayUI)

  // [수정 상황] 알림 수단 전격 교체 (결합도 해제 확인)
  // - 카카오톡 알림 기능 구독 해제
  // - 문자 알림 기능 구독 해제


  // --------------------------------------------------------------------------
  // [실습 3] 전략: 새로운 할인 정책 추가 및 교체
  // - 가치: '첫 구매 할인' 등이 추가되어도 if/else 문 없이 신규 클래스 추가만으로 대응 가능

  const paymentContext = new PaymentContext()

  // 전략 인스턴스 맵핑 (불필요한 if문 제거를 위해 객체로 관리)
  const strategies = {
    fixed: new FixedStrategy(1000),
    percent: new PercentStragety(0.9),
    // [수정 상황] TODO: 50% 반값 할인 전략(half)을 새로 추가해 보세요.

  }

  function applyPaymentStrategy(strategyKey) {
    const strategy = strategies[strategyKey]

    if (!strategy) {
      logger.write(`오류: ${strategyKey}는 존재하지 않는 전략입니다.`)
      return
    }
    
    // TODO: paymentContext에 선택된 전략을 주입(setStrategy)하세요.
    
    // TODO: paymentContext에 주입된 전략으로 현재 가격 계산(calc)하세요.
    
    // TODO: 그 결과를 basePayment 인스턴스에 할당하여 가격을 업데이트합니다.

    updatePriceUI(`할인 적용가: ${basePayment.getPrice().toLocaleString()}원`)
    logger.write(`${strategyKey} 전략(클래스)으로 결제 금액 계산 완료`)
  }

  // --------------------------------------------------------------------------
  // [실습 4] 데코레이터: 기능 확장
  // - 가치: 원본 결제 로직을 수정하지 않고 '선물 포장' 같은 유료 옵션을 유연하게 감싸기

  let basePayment = new BasePayment(CURRENT_PRICE)

  function applyGiftOption() {
    // TODO: 기존 basePayment를 GiftDecorator로 감싸서(Wrapping) 기능을 확장하세요.
    const giftPayment = GIFT_OPTION_PRICE
    
    updatePriceUI(`선물 포장 추가: ${giftPayment.getPrice().toLocaleString()}원`)
    logger.write('데코레이터 패턴으로 선물 포장 비용 합산')
  }

  // --------------------------------------------------------------------------
  // 이벤트 리스너

  function handleControls(e) {
    const button = e.target.closest('button')
    if (!button) return

    // 배달 알림
    deliverySubject.notify(button.dataset.action)
  }

  function handleStrategy(e) {
    const button = e.target.closest('button')
    if (!button) return

    // 전략 선택
    applyPaymentStrategy(button.dataset.strategy)
  }

  function handleGiftOption() {
    // 선물 옵션 추가 (데코레이터)
    applyGiftOption()
  }

  function handleReload() {
    resetUI()
    program()
  }

  // --------------------------------------------------------------------------
  // UI 업데이트

  function updatePriceUI(text) {
    priceDisplay.textContent = text
  }

  function updateStatusDisplayUI(status) {
    statusDisplay.dataset.state = status
    statusDisplay.textContent = status === 'cooking' ? '👨‍🍳 열심히 조리 중!' : '🛵 라이더가 출발했어요!'
    logger.write(`배달 상태 변경 알림: ${status}`)
  }

  function resetUI() {
    logList.innerHTML = ''
    statusDisplay.textContent = '결제 대기 중'
    statusDisplay.dataset.state = 'ready'
    updatePriceUI(`기본 금액: ${CURRENT_PRICE.toLocaleString()}원`)
  }
}

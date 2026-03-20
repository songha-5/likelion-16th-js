/**
 * 전략들의 공통 규격 (Interface 역할)
 * @abstract
 */
class PaymentStrategy {
  /**
   * 가격을 계산하는 메서드
   * @abstract
   * @param {number} price - 원래 가격
   * @returns {number} 계산된 가격
   * @throws {Error} 이 메서드는 하위 클래스에서 구현되어야 함
   */
  calculate(price) {
    throw new Error('calculate 메서드를 구현해야 합니다.')
  }
}

/**
 * 고정 금액을 할인하는 전략 클래스
 * @extends PaymentStrategy
 */
export class FixedStrategy extends PaymentStrategy {
  /**
   * 고정 할인 전략 생성자
   * @param {number} amount - 할인할 고정 금액
   */
  constructor(amount) {
    super()
    this.amount = amount
  }
  
  /**
   * 고정 금액을 할인하여 가격을 계산
   * @param {number} price - 원래 가격
   * @returns {number} 할인된 가격
   */
  calculate(price) {
    return price - this.amount
  }
}

/**
 * 비율로 할인하는 전략 클래스
 * @extends PaymentStrategy
 */
export class PercentStragety extends PaymentStrategy {
  /**
   * 비율 할인 전략 생성자
   * @param {number} rate - 할인율 (예: 0.1 = 10% 할인)
   */
  constructor(rate) {
    super()
    this.rate = rate
  }
  
  /**
   * 비율에 따라 가격을 계산
   * @param {number} price - 원래 가격
   * @returns {number} 할인된 가격
   */
  calculate(price) {
    return price * this.rate
  }
}

/**
 * 전략 패턴을 구현하는 컨텍스트 클래스
 * 다양한 가격 계산 전략을 사용할 수 있음
 */
export default class PaymentContext {
  #strategy

  /**
   * 가격 계산에 사용될 전략 설정 메서드
   * @param {PaymentStrategy} strategy - 가격 계산에 사용될 전략
   */
  setStrategy(strategy) {
    this.#strategy = strategy
  }
  
  /**
   * 설정된 전략을 사용하여 가격을 계산하는 메서드
   * @param {number} price - 원래 가격
   * @returns {number} 전략에 따라 계산된 가격
   */
  calc(price) {
    return this.#strategy.calculate(price)
  }
}
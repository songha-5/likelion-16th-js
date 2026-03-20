/**
 * @class BasePayment
 * @description 기본 가격 정보를 관리하는 컴포넌트 클래스
 * @exports BasePayment
 */
export class BasePayment {
  #price = 0
  /**
   * @constructor
   * @param {number} price - 기본 가격
   */
  constructor(price) {
    this.#price = price
  }
  /**
   * @method getPrice
   * @description 현재 설정된 가격을 반환
   * @returns {number} 현재 가격
   */
  getPrice() {
    return this.#price
  }
}

/**
 * @class PaymentDecorator
 * @description 결제 데코레이터의 추상 클래스로, 다양한 결제 옵션을 추가할 수 있는 기반 제공
 */
class PaymentDecorator {
  #payment
  /**
   * @constructor
   * @param {BasePayment|PaymentDecorator} payment - 장식할 결제 객체
   */
  constructor(payment) {
    this.#payment = payment
  }
  /**
   * @method getPrice
   * @description 장식된 결제 객체의 가격을 반환
   * @returns {number} 현재 가격
   */
  getPrice() {
    return this.#payment.getPrice()
  }
}

/**
 * @class GiftDecorator
 * @description 선물 포장 옵션을 추가하는 구체적인 데코레이터 클래스
 * @extends PaymentDecorator
 */
class GiftDecorator extends PaymentDecorator {
  #optionPrice = 0
  /**
   * @constructor
   * @param {BasePayment|PaymentDecorator} payment - 장식할 결제 객체
   * @param {number} optionPrice - 선물 포장 추가 비용
   */
  constructor(payment, optionPrice) {
    super(payment)
    this.#optionPrice = optionPrice
  }
  /**
   * @method getPrice
   * @description 기존 가격에 선물 포장 비용을 더한 총 가격을 반환
   * @returns {number} 선물 포장 비용이 추가된 총 가격
   */
  getPrice() {
    // 기존 가격에 선물 포장 비용을 더함
    return super.getPrice() + this.#optionPrice
  }
}

export default GiftDecorator
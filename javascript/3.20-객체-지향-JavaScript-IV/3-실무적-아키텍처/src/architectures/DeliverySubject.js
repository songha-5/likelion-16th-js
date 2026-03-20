/**
 * 배송 상태를 구독하는 주체를 관리하는 클래스입니다.
 * 옵저버 패턴을 구현하여 배송 상태 변경 시 등록된 구독자들에게 알림을 보냅니다.
 */
class DeliverySubject {
  /** @type {Set<Function>} 배송 상태 변경을 구독하는 함수들의 집합 */
  #subscriptors = new Set()

  /**
   * 배송 상태 변경 알림을 구독합니다.
   * @param {Function} fn - 상태 변경 시 호출될 콜백 함수
   */
  subscribe(fn) {
    this.#subscriptors.add(fn)
  }

  /**
   * 배송 상태 변경 알림 구독을 취소합니다.
   * @param {Function} fn - 구독 취소할 콜백 함수
   */
  unsubscribe(fn) {
    this.#subscriptors.delete(fn)
  }

  /**
   * 모든 구독자에게 배송 상태 변경을 알립니다.
   * @param {Object} status - 변경된 배송 상태 정보
   */
  notify(status) {
    this.#subscriptors.forEach((subscriptor) => subscriptor(status))
  }
}

export default DeliverySubject

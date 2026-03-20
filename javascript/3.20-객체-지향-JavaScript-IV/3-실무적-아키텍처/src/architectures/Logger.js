/**
 * 로그를 기록하기 위한 싱글톤 로거 클래스
 */
class Logger {
  /** @type {Logger|null} 싱글톤 인스턴스 */
  static #instance = null
  
  /** @type {HTMLElement|null} 로그를 표시할 DOM 컨테이너 */
  #logContainer = null

  /**
   * Logger 싱글톤 인스턴스를 가져오는 정적 메서드
   * @param {HTMLElement} logContainer 로그를 기록할 DOM 요소
   * @returns {Logger} 로거 인스턴스
   */
  static get(logContainer) {
    const logger = new Logger()
    logger.change(logContainer)
    return logger
  }

  /**
   * 로거 클래스의 생성자
   * 싱글톤 패턴을 구현하여 하나의 인스턴스만 존재하도록 함
   * @returns {Logger} 로거 인스턴스
   */
  constructor() {
    if (Logger.#instance) return Logger.#instance
    Logger.#instance = this
  }

  /**
   * 로그 메시지를 DOM에 기록
   * @param {string} message 기록할 로그 메시지
   */
  write(message) {
    const li = document.createElement('li')
    const localeTimeString = new Date().toLocaleTimeString()
    li.textContent = `[${localeTimeString}] ${message}`
    this.#logContainer.prepend(li)
  }

  /**
   * 로그 컨테이너 DOM 요소 변경
   * @param {HTMLElement} logContainer 새로운 로그 컨테이너 DOM 요소
   */
  change(logContainer) {
    this.#logContainer = logContainer
  }
}

export default Logger

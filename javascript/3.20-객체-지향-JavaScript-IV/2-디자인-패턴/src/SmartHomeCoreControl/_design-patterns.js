// 싱글톤 패턴 (Singleton)
{

  // 중앙 제어 허브
  class CentralHub {
    static #instance = null

    constructor() {
      // 이미 생성된 인스턴스가 있다면 새로 만들지 않고 기존 것을 반환
      if (CentralHub.#instance) return CentralHub.#instance

      this.id = 'HUB-001'
      CentralHub.#instance = this
    }

    // 전역 어디서든 접근 가능한 정적 메서드
    static get() {
      if (!this.#instance) this.#instance = new CentralHub()
      return this.#instance
    }
  }

  const hub1 = new CentralHub()
  const hub2 = CentralHub.get()

  // ✅ 결과: hub1과 hub2는 완전히 동일한 객체
  console.log(hub1 === hub2) // true

}

// 옵저버 패턴 (Observer)
{

  // 시스템 로거 (Subject)
  class SystemLogger {
    #observers = new Set() // 알림을 받을 구독자 명단

    // 알림 받을 구독자 추가
    subscribe(observer) {
      this.#observers.add(observer)
      const unsubscribe = () => this.#observers.delete(observer)
      return unsubscribe
    }

    // 상태 변화를 모든 구독자에게 방송
    log(message) {
      this.#observers.forEach((observer) => observer.update(message))
    }
  }

  // 알림을 받는 디스플레이 기기 (Observer)
  class ConsoleDisplay {
    update(message) {
      console.log(`[화면]: ${message}`)
    }
  }

  const logger = new SystemLogger()

  // ✅ 구독 후 로그를 남기면 자동으로 모니터에 알림 전달
  logger.subscribe(new ConsoleDisplay())
  logger.log('시스템 가동 준비 완료!')

}

// 팩토리 패턴 (Factory)
{
  // 팬(fan) 기기
  class Fan {
    constructor() {
      this.name = '선풍기'
      this.emoji = '🌀'
    }
  }

  // 라이트(light) 기기
  class Light {
    constructor() {
      this.name = '조명'
      this.emoji = '💡'
    }
  }

  // 기기 생성 공장(Factory)
  class DeviceFactory {

    // 타입을 전달하면 적절한 클래스의 인스턴스를 대신 생성
    static create(type) {
      switch(type) {
        case 'fan': {
          return new Fan()
        }
        case 'light': {
          return new Light()
        }
        default:
          return null
      }
    }
  }

  // 구체적인 클래스명을 몰라도 타입만으로 인스턴스 생성
  const myFan = DeviceFactory.create('fan')
  const myLight = DeviceFactory.create('light')

}

// 전략 패턴 (Strategy)
{

  // 저전력 운영 전략
  class EcoStrategy {
    execute(name) { return `${name} 저전력 모드 🌱` }
  }

  // 고성능 운영 전략
  class PowerStrategy {
    execute(name) { return `${name} 고성능 모드 🔥` }
  }

  // 시스템 컨텍스트
  class DeviceContext {
    setStrategy(strategy) { 
      this.strategy = strategy // 현재 설정된 전략
    }
    run(deviceName) { 
      console.log(this.strategy.execute(deviceName)) 
    }
  }

  const deviceRunner = new DeviceContext()

  // ✅ 같은 메서드를 호출하지만 전략에 따라 결과가 다름

  // '에코' 모드로 전략 설정
  deviceRunner.setStrategy(new EcoStrategy())
  deviceRunner.run('에어컨') // 에어컨 가동 (에코 모드로)
  
  // '파워' 모드로 전략 설정 (런타임 중에 변경 가능)
  deviceRunner.setStrategy(new PowerStrategy())
  deviceRunner.run('에어컨') // 에어컨 가동 (파워 모드로)

}

// 어댑터 패턴 (Adapter)
{
  
  // 구형 전구 (Legacy Interface)
  class OldBulb {
    // 이 전구는 옛날 방식이라 flickSwitch() 메서드 사용
    flickSwitch() {
      return '구형 전구가 노란 빛을 내며 켜졌어요 💡'
    }
  }

  // 최신 스마트 홈 시스템 (Modern Interface)
  class SmartHome {
    // 표준 규격(powerOn)을 가진 기기만 실행 가능
    execute(device) {
      console.log(device.powerOn())
    }
  }

  // 어댑터(Adapter): 인터페이스 변환
  function bulbAdapter(oldBulb) {
    return {
      // 스마트 홈이 기대하는 표준 메서드 이름을 제공
      powerOn() {
        // 내부적으로는 구형 전구의 메서드를 호출하여 결과를 반환
        return `${oldBulb.flickSwitch()} (어댑터를 통해 변환됨)`
      }
    }
  }

  const myHome = new SmartHome()
  const myOldBulb = new OldBulb()

  // ❌ 에러 발생: OldBulb에는 powerOn 메서드가 없어 실행 불가
  // myHome.execute(myOldBulb) 

  // ✅ 어댑터를 사용하여 호환되지 않는 두 인터페이스를 연결
  myHome.execute(bulbAdapter(myOldBulb))

}

// 데코레이터 패턴 (Decorator)
{

  // 기본 스마트 기기
  class BasicDevice {
    constructor(name) {
      this.name = name
    }
    operation() {
      return `${this.name} 작동 중`
    }
  }

  // 기능을 확장하는 데코레이터 클래스
  class VoiceDecorator {
    constructor(device) {
      this.device = device
    }
    operation() {
      // 기존 기능에 새로운 기능을 추가하여 반환
      return `${this.device.operation()} + [음성 제어 활성]`
    }
  }

  const myTV = new BasicDevice('TV')
  const decoratedTV = new VoiceDecorator(myTV)

  // ✅ 클래스를 수정하지 않고도 동적으로 기능 확장
  console.log(decoratedTV.operation())
}
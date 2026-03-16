// 아래 코드를 수정하여 미션을 완료하세요!

class Appliance {
  constructor(name) {
    this.name = name
    this.status = 'off'
  }

  // 부모의 전원 켜기 메서드
  turnOn() {
    this.status = 'on'
    console.log(`${this.name}의 전원이 켜졌습니다.`)
  }
}

// TODO 1: Appliance를 상속받는 SmartAppliance 클래스를 만드세요.
// TODO 2: 생성자에서 super를 사용해 부모의 name을 초기화하고, 자신만의 'wifi' 속성을 추가하세요.
// TODO 3: 부모의 turnOn을 오버라이딩하되, super.turnOn()을 호출한 뒤 "Wi-Fi 연결 중..."을 출력하세요.

class SmartAppliance extends Appliance {
  constructor(name, wifiName) {
    // 여기에 코드를 작성하세요.
    super(name)
    this.wifi = wifiName
  }

  turnOn() {
    // 부모의 기능을 먼저 실행하고
    super.turnOn()
    // 추가 기능을 확장하세요.
    console.log(`${this.wifi} 네트워크에 연결 중입니다...`)
  }
}

function introduceAppliance(location) {
  console.log(`이 기기는 ${location}에 설치된 ${this.name}입니다. (상태: ${this.status})`)
}

const myAircon = new SmartAppliance('무풍 에어컨', 'LivingRoom_5G')

myAircon.turnOn()

// TODO 4: introduceAppliance 함수를 myAircon 인스턴스가 빌려 사용해보세요.
// 여기에 코드를 작성하세요.
// --------------------------------------------------------------------------
// ⚙️ 메인 엔트리 : 모든 모듈을 조립하고 실행하는 진입점
// --------------------------------------------------------------------------

import '../style.css'
import * as Core from './core-system'
import { EventHandler } from './event-handler'
import { UIManager } from './ui-manager'

// [옵저버 패턴] 시스템 이벤트를 관찰하고 알림을 보낼 로거 생성
const systemLogger = Core.createLogger()

// [옵저버 구독] 로거에 UI 로그 출력 함수를 등록하여 실시간 업데이트 연결
systemLogger.subscribe((message) => UIManager.addLog(message))

// 시스템 가동 핵심 로직 (이벤트 핸들러 콜백)
const startSystem = (formData) => {
  // 폼 데이터에서 기기 타입(deviceType) 값 가져오기
  const type = formData.get('deviceType')
  // 타입이 없을 경우, 사용자에게 경고
  if (!type) {
    alert('기기를 선택해 주세요 ☺️')
    // 셀렉트 메뉴에 초점 이동
    UIManager.focusingSelectMenu()
    return
  }

  // [팩토리 패턴] 입력된 타입에 맞는 스마트 기기 인스턴스 동적 생성
  let device = Core.DeviceFactory.create(type)
  
  // AI 음성 제어 인터페이스 활성화한 상태라면
  if (formData.get('useVoice')) {
    // [데코레이터 패턴] 음성 제어 옵션 선택 시, 기존 기기에 음성 인터페이스 기능 확장
    device = Core.withVoiceControl(device)
  }

  // [싱글톤 패턴] 시스템 전역에서 유일하게 존재하는 중앙 제어 허브 인스턴스 참조
  const hub = Core.CentralHub.get()

  // [어댑터 패턴] 시스템 표준에 맞게 구형/신형 통신 프로토콜 호환성 연결
  const protocol = Core.ProtocolAdapter('modern')

  // [전략 패턴] 선택된 모드(에코/파워)에 따라 실행 알고리즘을 동적으로 교체
  const strategyMessage = Core.modeStrategies[formData.get('mode')](device.name)

  // UI의 모니터 영역 업데이트
  UIManager.updateMonitor({
    hubId: hub.id,
    protocol,
    emoji: device.emoji,
    name: device.name,
    strategyMsg: strategyMessage,
    decorated: device.decorated,
  })

  // [옵저버 통지] 가동 준비 완료 메시지를 구독 중인 모든 매체에 전송
  systemLogger.log(`${device.name} 가동 준비 완료 (패턴 로직 적용됨)`)
}

// 모든 이벤트 리스너 초기화 및 시스템 시작 준비
EventHandler.init(startSystem)

import './style.css'

// TODO 1: 상위(부모) 클래스 정의
class BaseWidget {
  // 생성자(name)
  // - 자신의 name 속성 설정 
  // - 자신의 type 속성 값 'Normal' 설정 

  // 기본 렌더링 로직
  // render()
  // 반환값: `
  //   <section data-widget-card data-grade="base">
  //     <h4 data-widget-title>📦 ${this.name}</h4>
  //     <p data-widget-info>이것은 부모 클래스에서 정의된 기본 기능만 가진 위젯입니다.</p>
  //   </section>
  // `
}

// TODO 2: BaseWidget 클래스로부터 파생된 클래스 정의
class PremiumWidget {
  // 생성자(name, bonusFeature)
  // - 부모 생성자에게 name 전달
  // - 자신의 type 속성 값 'Premium' 설정
  // - 자신의 feature 속성 값 bonusFeature 설정

  // 렌더링 메서드 오버라이딩으로 다형성 구현
  // - 새로운 프리미엄 전용 UI 제공
  // 반환값: `
  //   <div data-widget-card data-grade="premium">
  //     <h4 data-widget-title>💎 ${this.name} (확장 모델)</h4>
  //     <p data-widget-info>
  //       <strong>추가 기능:</strong> ${this.feature}<br />
  //       super()를 통해 부모의 속성을 상속받고, 자신만의 특징을 추가했습니다.
  //     </p>
  //   </div>
  // `
}

/* DOM 접근/조작 ---------------------------------------------------------------- */

const authShell = document.querySelector('[data-auth-shell]')
const createForm = document.querySelector('[data-create-form]')
const contentDisplay = document.querySelector('[data-content-display]')
const resetButton = document.querySelector('[data-reset-button]')

createForm.addEventListener('submit', handleCreateWidget)
resetButton.addEventListener('click', handleResetView)

/* 이벤트 리스너 ------------------------------------------------------------------ */

function handleCreateWidget(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const name = formData.get('widgetName')
  const type = formData.get('widgetType')

  let widgetInstance = null

  if (type === 'premium') {
    // TODO 3-1: 파생된 클래스 PremiumWidget으로 인스턴스 생성
    // - name, '24시간 우선 지원 서비스' 전달
    
  } else {
    // TODO 3-2: 기본 클래스 BaseWidget으로 인스턴스 생성
    // - name 전달
    
  }

  if (!widgetInstance) {
    return alert('먼저 클래스 인스턴스를 생성해야 작동합니다.')
  }

  renderToDashboard(widgetInstance)
  authShell.dataset.state = 'login'
}

function handleResetView() {
  return () => {
    contentDisplay.innerHTML = ''
    authShell.dataset.state = 'logout'
  }
}

/* UI 업데이트 함수 --------------------------------------------------------------- */

function renderToDashboard(widget) {
  // 다형성(Polymorphism)
  // - widget이 어떤 클래스인지 몰라도 .render() 메서드를 동일하게 호출할 수 있습니다.
  const widgetHtml = widget.render()
  contentDisplay.insertAdjacentHTML('afterbegin', widgetHtml)
}
import './style.css'

const characterForm = document.querySelector('[data-character-form]')
const listDisplay = document.querySelector('[data-character-list-display]')
const characters = [] // 생성된 객체 인스턴스들을 담는 배열

characterForm.addEventListener('submit', handleFormSubmit)
listDisplay.addEventListener('click', handleCharacterAction)

// --------------------------------------------------------------------------
// TODO 1: 함수형 구성 (데이터와 기능의 분리: 관리가 번거로움)
// --------------------------------------------------------------------------
// - 일반 객체(Object)로 데이터 생성
//   - name, job, level(1), hp(100) 속성을 가짐
// - 독립적인 함수 작성
//   - levelUp(character): 전달받은 객체의 level +1, hp 100 설정 -> 캐릭터 렌더링
//   - takeDamage(character): 전달받은 객체의 hp -20 (0 미만 방지) -> 캐릭터 렌더링
// --------------------------------------------------------------------------
;() => {

  function createCharacter() {
    // 캐릭터 객체 생성
    // - name (사용자 설정)
    // - job (사용자 설정)
    // - level = 1 (기본값)
    // - hp = 100 (기본값)

    // 생성된 캐릭터 객체 반환

  }

  function levelUp(character) {
    // 전달받은 객체의 level +1
    
    // 전달받은 객체의 hp = 100
    
    // 모든 캐릭터 렌더링
    
  }

  function takeDamage(character) {
    // 전달받은 객체의 hp - (5 ~ 20 사이) (0 미만 방지)
    
    // 모든 캐릭터 렌더링
    
  }

  // 함수형으로만 구성할 경우, 캐릭터가 100명일 때 100번이나 함수에 데이터를 넣어야 합니다.
  // 함수와 데이터가 따로 놀다 보니 실수로 마법사 함수에 전사 데이터를 넣는 사고가 날 수도 있죠!

  // '아서'(전사) 캐릭터 생성

  // '간달프'(마법사) 캐릭터 생성

  // 아서 캐릭터 데미지 받음!
  // 간달프 캐릭터 데미지 받음!
  // 아서 캐릭터 데미지 받음!
  // 간달프 레벨 업!! ✨
  
} //()

// --------------------------------------------------------------------------
// TODO 2: 생성자 함수 정의 (객체 지향의 초기 모델: prototype 활용)
// --------------------------------------------------------------------------
// - Character 생성자 함수 작성 (이름 첫 글자는 대문자)
//   - 매개변수로 name, job 전달 받음
//     - this를 사용하여 name, job, level(1), hp(100) 속성 설정
// - 프로토타입(prototype)에 능력(Method) 추가
//   - levelUp 설정 (자신의 level +1, hp 100 회복) -> 캐릭터 렌더링
//   - takeDamage 설정 (자신의 hp -20, 0보다 낮으면 0 설정) -> 캐릭터 렌더링
// --------------------------------------------------------------------------
;() => {
  // 캐릭터(객체) 생성 함수

  // 모든 캐릭터가 공유하는 기술(메서드)을 프로토타입에 등록

  // 캐릭터(객체) 생성
  // - '아서'(전사) 생성
  // - '간달프'(마법사) 생성

  // 아서 캐릭터 데미지 받음!
  // 간달프 캐릭터 데미지 받음!
  // 아서 캐릭터 데미지 받음!
  // 간달프 레벨 업!! ✨
  
  // 이 방법을 사용하면 데이터와 함수가 '묶음'이 됩니다.
  // 하지만 프로토타입(prototype)이라는 용어가 낯설고
  // 사용된 코드가 여기저기 흩어져 있어서 한눈에 안 들어옵니다.

  
} //()

// --------------------------------------------------------------------------
// TODO 3: 클래스 정의 (객체 지향의 핵심: 설계도 만들기)
// --------------------------------------------------------------------------
// - Character 클래스 작성
//   - 생성자(constructor) name, job 전달 받음
//     - 자신의 이름(name) 속성 설정
//     - 자신의 직업(job) 속성 설정
//     - 자신의 레벨(level) 속성 설정 (기본값: 1)
//     - 자신의 체력(hp) 속성 설정 (기본값: 100)
//   - 레벨업(levelUp) 능력 설정 (자신의 level +1, hp 100 회복) -> 캐릭터 렌더링
//   - 데미지(takeDamage) 능력 설정 (자신의 hp -20, 0보다 낮으면 0 설정) -> 캐릭터 렌더링
// --------------------------------------------------------------------------
;(() => {
  // 캐릭터 클래스(설계도: 붕어빵 틀) 작성
  // - 모든 캐릭터가 공유하는 기술(메서드) 등록
  
  // 캐릭터 인스턴스(객체: 붕어빵) 생성
  // - '아서'(전사) 생성
  // - '간달프'(마법사) 생성

  // 아서 캐릭터 데미지 받음!
  // 간달프 캐릭터 데미지 받음!
  // 아서 캐릭터 데미지 받음!
  // 간달프 레벨 업!! ✨

  
  // 2015년부터 지원하는 ECMAScript의 클래스 문법은 
  // 객체 지향 프로그래밍을 지원하는 JAVA, C#과 
  // 유사(정확히는 다름)해서 객체 지향의 원칙을 
  // JS에 더 쉽게 적용할 수 있게 된 것이 
  // 가장 큰 수확이라고 볼 수 있습니다.

}) //()


// --------------------------------------------------------------------------
// 작동 로직
// --------------------------------------------------------------------------

function handleFormSubmit(e) {
  e.preventDefault()

  const form = e.currentTarget
  const formData = new FormData(form)
  const name = formData.get('name')
  const job = formData.get('job')

  // 클래스를 이용해 새로운 객체 인스턴스 생성
  const newCharacter = new Character(name, job)

  // 관리 배열에 추가
  characters.push(newCharacter)

  // UI 업데이트 및 폼 초기화
  renderAllCharacters()
  form.reset()
}

function renderAllCharacters() {
  // 기존 리스트 비우기
  listDisplay.innerHTML = ''

  // 배열 안의 모든 객체를 순회하며 카드 생성
  characters.forEach((characterInstance, index) => {
    const card = createCharacterCard(characterInstance, index)
    listDisplay.append(card)
  })
}

function createCharacterCard(character, index) {
  const cardArticle = document.createElement('article')
  cardArticle.dataset.characterCard = ''
  cardArticle.dataset.index = index

  cardArticle.innerHTML = /* html */`
    <div data-char-header>
      <strong data-char-name>${character.name}</strong>
      <span data-job-badge data-job="${character.job}">${character.job}</span>
    </div>
    <div data-char-body>
      <div data-level-info>Level: ${character.level}</div>
      <div data-stat-bar>
        <div data-stat-fill style="width: ${character.hp}%"></div>
      </div>
      <div data-hp-text>HP: ${character.hp}/100</div>
    </div>
    <div data-action-group>
      <button data-action="level-up">레벨업</button>
      <button data-action="damage">데미지</button>
    </div>
  `

  return cardArticle
}

function handleCharacterAction(event) {
  // 클릭된 요소가 버튼인지 확인하고 액션 값 추출
  const button = event.target.closest('button')
  if (!button) return

  const action = button.dataset.action

  // 클릭된 버튼이 속한 카드(부모)에서 인덱스 정보를 가져옴
  const card = button.closest('[data-character-card]')
  const index = card.dataset.index

  // 배열에서 해당 인덱스의 객체 인스턴스를 찾음
  const character = characters[index]
  if (!character) return

  // 액션에 따른 객체 메서드 호출
  if (action === 'level-up') {
    character.levelUp()
  } else if (action === 'damage') {
    character.takeDamage()
  }
}

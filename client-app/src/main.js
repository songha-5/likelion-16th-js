import './styles/main.css'

const API_ENDPOINT = 'http://localhost:4000/'
const readButton = document.querySelector('.read-user-button')
const addButton = document.querySelector('.add-user-button')
const editButton = document.querySelector('.edit-user-button')
const delectButton = document.querySelector('.delect-user-button')

readButton.addEventListener('click', () => {
  readAllUsers()
})
editButton.addEventListener('click', () => {
  updateUser({
    id: 4,
    name: '정수진'
  })
})

deleteButton.addEventListener('click', () => {
  deleteUser(5) // 이민기 지워!
})

addButton.addEventListener('click', () => {
  createUser({
    name: '이민기' // 더미(dummy)
  })
})


// --------------------------------------------------------------------------
// Create (POST)

function createUser(newUserInfo/* { name: string } */) {
  // 데이터 생성 서버에 요청
  fetch(`${API_ENDPOINT}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUserInfo),
  })
    .then((response) => response.json())
    .then((createUser) => console.log(createUser))
    .catch((error) => console.error(error))
    .finally(() => console.log('새로운 사용자를 생성했어요!'))
}

// --------------------------------------------------------------------------
// Read (GET)
function readAllUsers() {
  fetch(`${API_ENDPOINT}/users`)
  .then((response) => response.json())
  .then((allUsers) => console.log(allUsers))
  .catch((error) => console.error(error))
  .finally(() => console.log(`"모든 사용자 정보를 가져왔습니다.`))
}

// --------------------------------------------------------------------------
// Update (PUT / PATCH)
function updateUser(editUserInfo/* { id, name: editName } */) {
  fetch(`${API_ENDPOINT}/users/${editUserInfo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: editUserInfo.name }),
  })
    .then(response => response.json())
    .then(editedUser => console.log(editedUser))
    .catch(error => console.error(error))
    .finally(() => console.log(`"${editUserInfo.id}" id 사용자를 수정했습니다.`))
}

// --------------------------------------------------------------------------
// Delete (DELETE)
function deleteUser(deleteUserId/* number */) {
  fetch(`${API_ENDPOINT}/users/${deleteUserId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(deltedUser => console.log(deltedUser))
    .catch(error => console.error(error))
    .finally(() => console.log(`"${deleteUserId}" id 사용자 삭제했습니다.`))
}
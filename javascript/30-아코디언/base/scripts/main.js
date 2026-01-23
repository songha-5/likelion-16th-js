const container = document.querySelector('.accordion__container')
const accordions = container.querySelectorAll('.accordion')

console.log(accordions.length)

/* accordions.addEventListener('click', () => {
  // accordions.classList.toggle('is-open')
}) */

/* for(let number = 0, l = accordions.length; number < l; ++number) {
  const count = accordions[number]
  count.addEventListener('click',() => {
    console.log(count)
    count.classList.toggle('is-open')
  })
} */
/* for (let item of accordions) {
  console.log('?')
  item.addEventListener((item) => {item.classList.add('is-open')})
}
 */

accordions.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    accordion.classList.toggle('is-open')
  })
})

{
  function add (number1, number2) {
    return number1 + number2
  }
  console.log(add(2,3))
}

{
const getLength = ((string) => {
  return string.length
})
console.log(getLength('hello2'))
}

{
  const square = ((square) => {
    return square ** 2
  })
  console.log(square(4))
}
{
  const sayHello = (name) => {
    return "Hello, " + name;
  }
  console.log(sayHello('hani'))
}
{
  function isEven (number) {
    if(0 === number % 2) console.log(true) 
    else console.log(false)
  }
  console.log(isEven(6))
}
{
  function checkAdult (age) {
    if(age >= 20) console.log('성인')
    else console.log('미성년자')
  }
  console.log(checkAdult(19))
}
{
  const findMax = (number1, number2) => {
    return number1 > number2 ? number1 : number2
  }
}
{
  const sumUpTo = (number) => {
    let sum = 0
    for(let i = 0; i <= number; i++ ) {
      console.log(sum)
      sum = sum + i
    }
    return sum
  }
  console.log(sumUpTo(5))
}
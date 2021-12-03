const select = el => document.querySelector(el)
const selectAll = el => document.querySelectorAll(el)

pizzaJson.map((item, index) => {
   let pizzaItem = select('.models .pizza-item').cloneNode(true) //Clonando o item

   pizzaItem.querySelector('.pizza-item--img img').src = item.img
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
   pizzaItem.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault()

      select('.pizzaWindowArea').style.opacity = 0
      select('.pizzaWindowArea').style.display = 'flex'
      setInterval( () => {
         select('.pizzaWindowArea').style.opacity = 1
      }, 200)
   })

   select('.pizza-area').append(pizzaItem) //Adiciona mais um conteúdo no DOM final
})
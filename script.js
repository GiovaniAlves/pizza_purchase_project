const querySelect = el => document.querySelector(el)
const querySelectAll = el => document.querySelectorAll(el)

pizzaJson.map((item, index) => {
   let pizzaItem = querySelect('.models .pizza-item').cloneNode(true) //Clonando o item

   pizzaItem.querySelector('.pizza-item--img img').src = item.img
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

   querySelect('.pizza-area').append(pizzaItem) //Adicionar mais um conteúdo no DOM final
})
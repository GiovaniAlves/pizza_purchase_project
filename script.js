const select = el => document.querySelector(el)
const selectAll = el => document.querySelectorAll(el)

let cart = []
let modalQtd = 1
let modalKey = 0

//Listando as pizzas
pizzaJson.map((item, index) => {
   let pizzaItem = select('.models .pizza-item').cloneNode(true) //Clonando o item

   pizzaItem.setAttribute('key', index)
   pizzaItem.querySelector('.pizza-item--img img').src = item.img
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

   pizzaItem.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault()
      
      let key = event.target.closest('.pizza-item').getAttribute('key')
      modalKey = key
      modalQtd = 1
      select('.pizzaInfo--qt').innerHTML = modalQtd

      select('.pizzaBig img').src = pizzaJson[key].img
      select('.pizzaInfo h1').innerHTML = pizzaJson[key].name
      select('.pizzaInfo--desc').innerHTML = pizzaJson[key].description

      select('.pizzaInfo--size.selected').classList.remove('selected')
      selectAll('.pizzaInfo--size').forEach((itemPizzaSize, sizeIndex) => {
         if(sizeIndex === 2){
            itemPizzaSize.classList.add('selected')
         }
         itemPizzaSize.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
      })

      select('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

      select('.pizzaWindowArea').style.opacity = 0
      select('.pizzaWindowArea').style.display = 'flex'
      setInterval(() => {
         select('.pizzaWindowArea').style.opacity = 1
      }, 200)
   })

   select('.pizza-area').append(pizzaItem) //Adiciona mais um conteúdo no DOM final
})

//Eventos do modal
function closeModal() {
   select('.pizzaWindowArea').style.opacity = 0
   setTimeout(() => {
      select('.pizzaWindowArea').style.display = 'none'
   }, 200)
}

selectAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
   item.addEventListener('click', closeModal)
})
select('.pizzaInfo--qtmenos').addEventListener('click', () => {
   if(modalQtd > 1){
      modalQtd --
      select('.pizzaInfo--qt').innerHTML = modalQtd
   }
})
select('.pizzaInfo--qtmais').addEventListener('click', () => {
   modalQtd++
   select('.pizzaInfo--qt').innerHTML = modalQtd
})
selectAll('.pizzaInfo--size').forEach((item) => {
   item.addEventListener('click', () => {
      select('.pizzaInfo--size.selected').classList.remove('selected')
      item.classList.add('selected')
   })
})
select('.pizzaInfo--addButton').addEventListener('click', () => {
   let size = parseInt(select('.pizzaInfo--size.selected').getAttribute('data-key'))

   let identifier = `${pizzaJson[modalKey].id}@${size}`
   let keyIdentifier = cart.findIndex((cartItem) => cartItem.identifier == identifier ) //Se retornar -1 é pq não tem o item correspondente

   if(keyIdentifier > -1){
      cart[keyIdentifier].qtd += modalQtd
   }
   else {
      cart.push({
         identifier,
         id: pizzaJson[modalKey].id,
         size,
         qtd: modalQtd
      })
   }
   updateCart()
   closeModal()
})

function updateCart() {
   if(cart.length > 0){
      select('aside').classList.add('show')

      for(let i in cart){
         let pizzaJsonClone = pizzaJson.find((itemPizza) => itemPizza.id == pizzaJson[i].id)
         console.log(pizzaJsonClone)
      }
   }
   else {
      select('aside').classList.remove('show')
   }
}
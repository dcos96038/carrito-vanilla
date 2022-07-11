const comprarButtons = document.querySelectorAll('.btnComprar')

const agregarAlCarrito = (event) => {

  event.preventDefault()

  const card = event.target.closest('.card__border');
  const img = card.querySelector('.card-img-top').src
  const titulo = card.querySelector('.card-title').textContent
  const precio = Number(card.querySelector('.card-text').textContent.replace('$', '').replace('.',''))
  const listaProductos = document.querySelector('.lista-productos')

  const itemsEnCarrito = document.querySelectorAll('.item')
  console.log(Array.from(itemsEnCarrito).map(item => console.log(item.textContent)));
  // if () {
  //   return
  // }




  const item = document.createElement('div')
  const itemContenido = `<li class="px-2 d-flex justify-content-between align-items-start item">${titulo} <div class='precio'>$${precio}</div> <input type="number" class="form-control cantidad pe-0" value='1'></li>`
  item.innerHTML = itemContenido
  listaProductos.append(item)

  const elementoCantidad = document.querySelectorAll('.cantidad')
  Array.from(elementoCantidad).forEach(item => item.addEventListener('change', actualizarPrecio))

  actualizarPrecio()

}

const actualizarPrecio = () => {
  let precioTotal = 0

  Array.from(document.querySelectorAll('.item')).forEach(item => {
    precioTotal += (Number(item.querySelector('.precio').textContent.replace('$', '')) * Number(item.querySelector('.cantidad').value))
  })

  elementoPrecioTotal = document.querySelector('.precio-total')
  elementoPrecioTotal.innerHTML = `Total: $ ${precioTotal}`
}

function borrarProductos() {
  const nodes = document.querySelectorAll('.item')
  Array.from(nodes).forEach(node => node.remove())
  actualizarPrecio()
  // const itemContenido = `<div> Te quedaste sin productos pa </div>`
  // console.log("lo borraste pa")
}

Array.from(comprarButtons).forEach(button => button.addEventListener('click', agregarAlCarrito))
const comprarButtons = document.querySelectorAll('.btn-comprar')

const agregarAlCarrito = (event) => {

  event.preventDefault()

  const card = event.target.closest('.card__border');
  // const img = card.querySelector('.card-img-top').src
  const titulo = card.querySelector('.card-title').textContent
  const precio = Number(card.querySelector('.card-text').textContent.replace('$', '').replace('.',''))


  const listaProductos = document.querySelector('.lista-productos')
  const itemsEnCarrito = document.querySelectorAll('.item')
  const itemsArray = Array.from(itemsEnCarrito)
  for (let i = 0; i < itemsArray.length; i++) {
    const title = itemsArray[i].innerText;
    if(title.search(titulo) !== -1){
      const cantidad = itemsArray[i].querySelector('.cantidad')
      cantidad.value++
      actualizarCantidadTotal()
      actualizarPrecio()
      return
    }
  }

  const item = document.createElement('div')
  const itemContenido = `<li class="px-2 d-flex justify-content-between align-items-start item">${titulo} <div class='precio'>$${precio}</div> <input type="number" class="form-control cantidad pe-0" value='1'></li>`
  item.innerHTML = itemContenido
  listaProductos.append(item)

  const elementoCantidad = document.querySelectorAll('.cantidad')
  Array.from(elementoCantidad).forEach(item => item.addEventListener('change', actualizarCantidad))

  actualizarCantidadTotal()
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

const actualizarCantidad = (event) => {
  if(event.target.value <= 0){
    event.target.value = 1
  }
  actualizarCantidadTotal()
  actualizarPrecio()
}

const borrarProductos = () => {
  const productos = document.querySelectorAll('.item')
  Array.from(productos).forEach(producto => producto.remove())
  actualizarCantidadTotal()
  actualizarPrecio()
}

const actualizarCantidadTotal = () => {

  let total = 0

  const badgeCantProductos = document.querySelector('.cart__icon')
  const cantidades = document.querySelectorAll('.cantidad')
  Array.from(cantidades).forEach(cantidad => {
    total = total + Number(cantidad.value)
  })
  badgeCantProductos.textContent = total
}

const btnBorrar = document.querySelector('.btn-borrar-carrito')
btnBorrar.addEventListener('click', borrarProductos)

Array.from(comprarButtons).forEach(button => button.addEventListener('click', agregarAlCarrito))

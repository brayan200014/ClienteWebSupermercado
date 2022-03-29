var datos = [
    {
        id: 1,
        nombre: 'Lechuga',
        precio: 200,
        cantidad: 2 
    },
    {
        id: 2,
        nombre: 'Tomates',
        precio: 10,
        cantidad: 5
    },
    {
        id: 2,
        nombre: 'Tomates',
        precio: 10,
        cantidad: 5
    }
]

const shoppingCartList = document.querySelector('#shoppingCartList');

//Calls functions
insertShoppingCart()

function insertShoppingCart(){
    shoppingCartList.innerHTML = '';
    var subTotal = 0, isv = 0, total = 0;

    for(let item of datos){
        shoppingCartList.innerHTML += `
            <div class="media mb-2 border-bottom">
                <div class="media-body"> <a href="#">${item.nombre}</a>
                    <div class="small text-muted">Precio: $${item.precio} <span class="mx-2">|</span> Cantidad: ${item.cantidad} <span class="mx-2">|</span> Subtotal: $${item.cantidad * item.precio}</div>
                </div>
            </div>
        `
        subTotal += item.cantidad * item.precio;
    }

    const qrySubtotal = document.querySelector('#coSubtotal');
    qrySubtotal.innerHTML = "$ " + subTotal;
    const qryIsv = document.querySelector('#coIsv');
    qryIsv.innerHTML = "$ " + subTotal * 0.15;
    const qryTotal = document.querySelector('#coTotal');
    qryTotal.innerHTML = "$ " + (subTotal + (subTotal * 0.15));
}



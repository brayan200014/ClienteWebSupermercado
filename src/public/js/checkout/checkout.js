const shoppingCartList = document.querySelector('#shoppingCartList');
const btnInsertSale = document.querySelector('#btnInsertSale').addEventListener('click', insertSale);
const selectSucursal = document.querySelector('#sucursal');

var datos = [
    /*{
        Productos_IdProducto: 0,
        NombreProducto: '',
        PrecioVenta: 0,
        Cantidad: 0 
    }*/
]

var data = {
    "subtotal": 0,
    "isv": 0.15,
    "clientId": parseInt(JSON.parse(sessionStorage.getItem('userId'))),
    "sucursalId": 0,
    "detalleVenta": []
};

//Calls functions
extractShopingCart();
insertShoppingCart();

function extractShopingCart(){
    var shoppingCartId = [];
    var shoppingCartNombre = [];
    var shoppingCartPrecio = [];
    var shoppingCartCantidad = [];

    shoppingCartId = JSON.parse(localStorage.getItem('id'));
    shoppingCartNombre = JSON.parse(localStorage.getItem('nombre'));
    shoppingCartPrecio = JSON.parse(localStorage.getItem('precio'));
    shoppingCartCantidad = JSON.parse(localStorage.getItem('cantidad'));

    for(let i = 0; i<shoppingCartId.length; i++ ){
        var product = {
            Productos_IdProducto: shoppingCartId[i],
            NombreProducto: shoppingCartNombre[i],
            PrecioVenta: shoppingCartPrecio[i],
            Cantidad: shoppingCartCantidad[i]
        }

        datos.push(product);
        
        /*datos[i].Productos_IdProducto = shoppingCartId[i];
        datos[i].NombreProducto = shoppingCartNombre[i];
        datos[i].PrecioVenta = shoppingCartPrecio[i];
        datos[i].Cantidad = shoppingCartCantidad[i];*/
    }
}

function insertShoppingCart(){
    shoppingCartList.innerHTML = '';
    var subTotal = 0, isv = 0, total = 0;

    for(let item of datos){
        shoppingCartList.innerHTML += `
            <div class="media mb-2 border-bottom">
                <div class="media-body"> <a href="#">${item.NombreProducto}</a>
                    <div class="small text-muted">Precio: $${item.PrecioVenta} <span class="mx-2">|</span> Cantidad: ${item.Cantidad} <span class="mx-2">|</span> Subtotal: $${item.Cantidad * item.PrecioVenta}</div>
                </div>
            </div>
        `;
        subTotal += item.Cantidad * item.PrecioVenta;
    }

    const qrySubtotal = document.querySelector('#coSubtotal');
    qrySubtotal.innerHTML = "$ " + (subTotal - (subTotal * 0.15)).toFixed(2);
    const qryIsv = document.querySelector('#coIsv');
    qryIsv.innerHTML = "$ " + (subTotal * 0.15).toFixed(2);
    const qryTotal = document.querySelector('#coTotal');
    qryTotal.innerHTML = "$ " + (subTotal).toFixed(2);

    data.subtotal = subTotal;
}

async function insertSale(){
    var url = 'http://localhost:3002/app/ventas/guardar';

    data.detalleVenta = datos;
    data.sucursalId = selectSucursal.value;

    if(selectSucursal.value != "Choose..."){
        if(data.clientId){
            await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(
                res => {
                    res.json();

                    //Limpiar 
                    localStorage.removeItem('id');
                    localStorage.removeItem('nombre');
                    localStorage.removeItem('precio');
                    localStorage.removeItem('cantidad');
                
                    swal({
                        title: "¡Compra procesada!",
                        text: "Tu compra fue procesada con exito.",
                        type: "success"
                    }).then(function() {
                        window.location.href = 'http://localhost:3002/app';
                    });
                }
            )
            .catch(
                error => {
                    console.error('Error:', error);
                    swal({
                        title: "¡Error al procesar la compra!",
                        text: "Tu compra no pudo ser procesada, intenta de nuevo.",
                        type: "success"
                    });
                }
            )
        }
        else{
            swal({
                title: "¡Error!",
                text: "No has iniciado sesion.",
                type: "success"
            })
        }
    }
    else{
        swal({
            title: "¡Error!",
            text: "No has seleccionado la sucursal.",
            type: "success"
        })
    }
}

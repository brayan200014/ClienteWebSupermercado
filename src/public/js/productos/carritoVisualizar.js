const addcar = document.getElementById('cart-list');
const canti = document.getElementById('cantidadProducto');
const name = document.getElementById('name');
const cost = document.getElementById('cost');
const ide = document.getElementById('ide');
//const loadCar = document.getElementById('productosCargar');

let id = [];
let nombre = [];
let precio = [];
let cantidad = [];


function agregarCarrito(){

    var valor = 0;
    var bandera = false;

    id = JSON.parse(localStorage.getItem('id'));
    nombre = JSON.parse(localStorage.getItem('nombre'));
    precio = JSON.parse(localStorage.getItem('precio'));
    cantidad = JSON.parse(localStorage.getItem('cantidad'));

    if(id.length == 0)
    {
        id.push(ide.value);
        nombre.push(name.value);
        precio.push(cost.value);
        cantidad.push(canti.value);
    }
    else
    {
        bandera = false;

        for(var i = 0; i<id.length; i++)
        {
            if(id[i]== ide.value){
                valor = parseInt(cantidad[i]) + parseInt(canti.value);
                cantidad[i] = valor;
                bandera = true;
            }
        }

        if(bandera == false){
            id.push(ide.value);
            nombre.push(name.value);
            precio.push(cost.value);
            cantidad.push(canti.value);
        }
    }

    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('nombre', JSON.stringify(nombre));
    localStorage.setItem('precio', JSON.stringify(precio));
    localStorage.setItem('cantidad', JSON.stringify(cantidad));
    canti.value = 1;
    alert("Producto Agregado al Carrito Exitosamente.")
}


function mostrarCarrito(){

    var id = JSON.parse(localStorage.getItem('id'));
    var nombre = JSON.parse(localStorage.getItem('nombre'));
    var precio = JSON.parse(localStorage.getItem('precio'));
    var cantidad = JSON.parse(localStorage.getItem('cantidad'));
    var subtotal = 0;

    addcar.innerHTML = ` `;

    for(var i=0; i<id.length; i++){
        subtotal += cantidad[i] * precio[i];
        addcar.innerHTML += `
        <li>
            <a href="#" class="photo"><img src="http://localhost:3002/app/archivos/consultar?id=${id[i]}" class="cart-thumb" alt="" /></a>
            <h6><a href="#">${nombre[i]}</a></h6>
            <p>${cantidad[i]}x - <span class="price">L${precio[i]}</span></p>
         </li>
        ` 
    }

    addcar.innerHTML += `
    <li class="total">
        <a href="http://localhost:3002/app/Carrito/visualizarCarrito" class="btn btn-default hvr-hover btn-cart">Ver Carrito</a>
        <span class="float-right"><strong>Total</strong>: L. ${subtotal}</span>
    </li>
    `

}

/*
function mostrarCarritoPrincipal(){
    var id = JSON.parse(localStorage.getItem('id'));
    var nombre = JSON.parse(localStorage.getItem('nombre'));
    var precio = JSON.parse(localStorage.getItem('precio'));
    var cantidad = JSON.parse(localStorage.getItem('cantidad'));


    loadCar.innerHTML = ` `;

    for(var i=0; i<id.length; i++){
        subtotal += cantidad[i] * precio[i];
        loadCar.innerHTML += `
        ${id[i]}
        ` 
    }
}*/


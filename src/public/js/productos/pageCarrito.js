var loadCar = document.getElementById('productosCargar');

window.onload = mostrarCarritoPrincipal();

function eliminardelCarrito(ide){
    var id = JSON.parse(localStorage.getItem('id'));
    var nombre = JSON.parse(localStorage.getItem('nombre'));
    var precio = JSON.parse(localStorage.getItem('precio'));
    var cantidad = JSON.parse(localStorage.getItem('cantidad'));

    for(var i=0; i<id.length; i++){
        if(id[i] == ide){
            id.splice(i,1);
            nombre.splice(i,1);
            precio.splice(i,1);
            cantidad.splice(i,1);
        }
    }

    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('nombre', JSON.stringify(nombre));
    localStorage.setItem('precio', JSON.stringify(precio));
    localStorage.setItem('cantidad', JSON.stringify(cantidad));
    alert("Producto Eliminado con Exito del Carrito");
}

function mostrarCarritoPrincipal() {
    var id = JSON.parse(localStorage.getItem('id'));
    var nombre = JSON.parse(localStorage.getItem('nombre'));
    var precio = JSON.parse(localStorage.getItem('precio'));
    var cantidad = JSON.parse(localStorage.getItem('cantidad'));


    for(var i=0; i<id.length; i++){
        loadCar.innerHTML += `
        <tr>
        <td class="thumbnail-img">
            <a href="#">
                <img class="img-fluid" src="http://192.168.0.11:3002/app/archivos/consultar?id=${id[i]}" alt="" />
                <input type="hidden" name="identificador" value="${id[i]}">
            </a>
        </td>
        <td class="name-pr">
            <a href="#">
                ${nombre[i]}
            </a>
        </td>
        <td class="price-pr">
            <p>L. ${precio[i]}</p>
        </td>
        <td class="quantity-box">
            <input name="cant" type="number" size="4" value="${cantidad[i]}" min="0" step="1" class="c-input-text qty text">
        </td>
        <td class="total-pr">
            <p>L. ${precio[i]*cantidad[i]}</p>
        </td>
        <td class="remove-pr">
            <a href="http://localhost:3002/app/Carrito/visualizarCarrito" onclick="eliminardelCarrito(${id[i]})">
                <i class="fas fa-times"></i>
            </a>
        </td>
        </tr>
        `;
    }
    
}

function modificarItemCarrito(){
    var id = JSON.parse(localStorage.getItem('id'));
    var cantidad = JSON.parse(localStorage.getItem('cantidad'));
    const nodelistId = document.getElementsByName('identificador');
    const ids = Array.from(nodelistId);
    const nodelistCant = document.getElementsByName('cant');
    const cants = Array.from(nodelistCant);

    let idAct = [];
    let cantAct = [];
    
    for(var i = 0; i< ids.length; i++){
        idAct.push(ids[i].value);
        cantAct.push(cants[i].value);
    }

    for(var i = 0; i<id.length; i++){
        if(id[i]==idAct[i]){
            if(cantidad[i] != cantAct[i]){
                cantidad[i] = cantAct[i];
            }
        }
    }
    localStorage.setItem('cantidad', JSON.stringify(cantidad));
    window.location.reload();
    alert("Carrito Actualizado Con Exito");
}
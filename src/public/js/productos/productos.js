const display_product = document.querySelector('#display_products');
displayProducts()
function displayProducts(){
    display_product.innerHTML='';
    for(let item of datos){
        display_product.innerHTML +=`
            <div class="products-single fix">
                <div class="box-img-hover">
                    <div class="type-lb">
                        <p class="sale">Sale</p>
                    </div>
                    <img src="${item.Imagen}" class="img-fluid" alt="Image">
                    <div class="mask-icon">
                        <ul>
                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                        </ul>
                        <a class="cart" href="#">Add to Cart</a>
                    </div>
                </div>
                <div class="why-text">
                    <h4>${item.NombreProducto}</h4>
                    <h5>LPS.50</h5>
                </div>
            </div>
        `
    }
}

function extraerproductos(){
    var url = 'http://192.168.0.146:3002/app/productos/listarproductos';
    fetch(url,{
        method: 'GET',
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(
        res => res.json()
    )
    .catch(
        error=>console.error('ERROR:',error)
    )
}
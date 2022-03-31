var data;
const display_product = document.getElementById('display');

window.onload = async()=>{
    extraerproductos();
}

function displayProducts(){
    for(let item of data){
        display_product.innerHTML +=`
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
        <div class="products-single fix">
            <div class="box-img-hover">
                <div class="type-lb">
                    <p class="sale">Sale</p>
                </div>
                <img src="../public/media/img-pro-02.jpg" class="img-fluid" alt="Image">
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
                <h5> ${item.IdProducto}</h5>
            </div>
        </div>
    </div>
        `
    }
}

const extraerproductos=async()=>{
    try{
        const solicitud = await fetch(
            'http://localhost:3002/app/productos/cargarproductos',
            {
                method:'GET',
                headers:{
                    Accept: 'application/json', 
                    'Content-Type': 'application/json'
                }
            }
        );
        const json = await solicitud.json();
        data=json.data;
        console.log(data);
        displayProducts();
    }
    catch(error){
        console.log(error);
    }
}



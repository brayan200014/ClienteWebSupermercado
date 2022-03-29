const ModeloProductos= require('../modelos/modeloProducto');
const msj= require('../componentes/mensaje');

exports.listarproductos= async (req,res) => {
    const listarproductos = await ModeloProductos.findAll();

    if(listarproductos.lenght==0)
    {
        res.send("No existen datos");
    }
    else{
        res.json(listarproductos);
    }
 };

 exports.listarProducto= async (req,res) => {
    const {id}= req.query; 
    if(!id) {
        msj("Envie un id de producto", 200, [], res);
    }
    else 
    {
       const buscarId=await ModeloProductos.findOne({
           where: {
               IdProducto:id
           }
       });

       if(!buscarId) {
           msj("El id del producto enviado no existe", 200, [], res);
       }
       else 
       {
           msj("Consulta exitosa", 200, buscarId, res);
       }
    }
}
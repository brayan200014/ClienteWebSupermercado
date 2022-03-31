const ModeloProductos= require('../modelos/modeloProducto');
const msj= require('../componentes/mensaje');
const render = require('express/lib/response');

exports.listarproductos = (req,res)=>{
    res.render('productos');
}

exports.cargarProductos = async (req,res)=>{
    try{
        const products = await ModeloProductos.findAll()
        msj("Se cargaron los productos",200,products,res);

    }catch(error){
        msj("ocurrio un error en el servidor",500,error,res);
    }
}
const ModeloProductos= require('../modelos/modeloProducto');
const msj= require('../componentes/mensaje');
const render = require('express/lib/response');

exports.listarproductos = (req,res)=>{
    res.render('productos');
}

const ModeloProductos= require('../modelos/modeloProducto');
const msj= require('../componentes/mensaje');
const render = require('express/lib/response');
const { request } = require('express');
const {QueryTypes}=require('@sequelize/core')
const db= require('../configuraciones/db');

exports.listarproductos = (req,res)=>{
    res.render('productos');
}

exports.cargarProductos = async (req,res)=>{
    try{
        const products = await db.query('SELECT p.IdProducto,e.PrecioVenta, p.DescripcionProducto, p.NombreProducto FROM BasePortales.Inventario as e inner join BasePortales.Productos as p on  e.Productos_IdProducto = p.IdProducto where p.Estado=1', { type: QueryTypes.SELECT});
        msj("Se cargaron los productos",200,products,res);
        console.log(products)

    }catch(error){
        msj("ocurrio un error en el servidor",500,error,res);
    }
}

exports.detalle = (req,res)=>{
    const{id, nombre, dsc, precio}=req.query;
    if(nombre && id){
        res.render('shop_detail',{id:id, nombre:nombre, dsc:dsc, precio:precio});
    }
    else{
        res.render('shop_detail');
    }
}
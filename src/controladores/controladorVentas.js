const { query } = require("express");
const ModeloVenta = require("../modelos/modeloVenta");
const ModeloDetalleVenta = require("../modelos/modeloDetalleVenta");

const insertarVenta = async (req, res) => {
    try{
        const {clientId, sucursalId, isv, subtotal, detalleVenta} = req.body;

        const factura = await ModeloVenta.create({
            FechaVenta: new Date(),
            Subtotal: subtotal,
            ISV: isv,
            Clientes_IdCliente: clientId,
            Sucursales_IdSucursal: sucursalId
        })

        if(factura){
            const data = detalleVenta.map(detail => {
                detail.Ventas_IdVenta = factura.IdVenta;
                return detail
            });
    
            const detalle = await ModeloDetalleVenta.bulkCreate(
                data
            );

            res.send("Venta almacenada con exito");
        }
        else{
            res.send("Error al guardar la venta")
        }

    }
    catch (err){
        console.log(err);
    }
}

module.exports = {insertarVenta};
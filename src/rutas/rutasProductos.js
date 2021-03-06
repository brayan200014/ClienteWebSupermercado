const {Router} = require('express');
const controladorProductos= require('../controladores/controladorProductos');
const router = Router(); 

router.get('/listarproductos', controladorProductos.listarproductos);
router.get('/cargarproductos', controladorProductos.cargarProductos);

router.get('/detalleproducto', controladorProductos.detalle);
module.exports=router;
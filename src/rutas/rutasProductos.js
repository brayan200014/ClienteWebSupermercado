const {Router} = require('express');
const controladorProductos= require('../controladores/controladorProductos');
const router = Router(); 

router.get('/listarproductos', controladorProductos.listarproductos);
router.get('/listarproducto', controladorProductos.listarProducto);

module.exports=router;
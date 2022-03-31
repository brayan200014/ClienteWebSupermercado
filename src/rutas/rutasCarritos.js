
const {Router} = require('express');
const controladorCarrito= require('../controladores/controladorCarrito');
const router = Router(); 

router.get('/visualizarCarrito', controladorCarrito.verCarrito);

module.exports=router;
const { Router } = require('express');
const controladorVenta = require('../controladores/controladorVentas');
const router = Router();

router.post('/guardar', controladorVenta.insertarVenta);

module.exports = router;
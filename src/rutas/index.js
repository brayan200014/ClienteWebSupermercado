const { Router } = require('express');
const { render } = require('express/lib/response');
const router = Router();
router.get('/', (req, res) => {
    res.render("Home");
})

router.get('/iniciomodificar', (req, res) => {
    res.render("IniciomiCuenta");
})

module.exports = router;
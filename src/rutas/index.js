const { Router } = require('express');
const { render } = require('express/lib/response');
const router = Router();
router.get('/', (req, res) => {
    res.render("home");
})

router.get('/checkout', (req, res) => {
    res.render("checkout");
})

module.exports = router;
const { Router } = require('express');
const { render } = require('express/lib/response');
const router = Router();
router.get('/', (req, res) => {
    res.render("Home");
})

module.exports = router;
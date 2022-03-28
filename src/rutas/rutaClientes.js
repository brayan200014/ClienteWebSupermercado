const {Router}= require('express'); 
const res = require('express/lib/response');
const router= Router(); 
const render= require('express/lib/response');
const { route } = require('.');

router.get('/', (req,res) => {
    res.render('registroClientes')
})

module.exports= router;
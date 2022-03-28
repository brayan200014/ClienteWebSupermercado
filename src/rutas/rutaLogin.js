const {Router}= require('express');
const router= Router(); 
const  { render }= require('express/lib/response');

router.get('/', (req,res) => {
    res.render('login', {layout:false});
})

module.exports= router;
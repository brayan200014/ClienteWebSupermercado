const {Router}= require('express');
const router= Router(); 
const  { render }= require('express/lib/response');
const {body,query}= require('express-validator');
const controladorLogin= require('../controladores/controladorLogin');
const res = require('express/lib/response');

router.get('/', (req,res) => {
    const {boolean, cambio}= req.query;
    if(boolean){
        res.render('login', {layout:false, boolean: boolean});
    }
    else if(cambio) {
        res.render('login', {layout:false, cambio: cambio});
    }else 
    {
        res.render('login', {layout:false});
    }
})

router.get('/recovery', controladorLogin.recovery);

router.post('/verificarDatos', body('correo').isEmail().withMessage('Envie un correo valido'),
body('contrasenia').isLength({min:6, max:15}).withMessage('La longitud mínima de la contraseña es de 6 caracteres')
.isStrongPassword().withMessage('La contraseña debe incluir al menos un caracter en mayúscula, minusculas, números y un caracter especial'), 
controladorLogin.verificarAuntenticacion);

router.post('/enviarPin', body('correo').isEmail().withMessage("Debe enviar un correo valido"), controladorLogin.enviarPin);  
router.post('/cambiarContra', body('correo').isEmail().withMessage('Envie un correo con formato valido'),
body('contrasenia').isLength({min:6, max:15}).withMessage('La longitud mínima de la contraseña es de 6 caracteres')
.isStrongPassword().withMessage('La contraseña debe incluir al menos un caracter en mayúscula, minusculas, números y un caracter especial'), 
body('pin').isInt().withMessage("El pin solo debe ser entero"), controladorLogin.cambiarContra);



module.exports= router;
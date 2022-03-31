const {Router}= require('express'); 
const res = require('express/lib/response');
const router= Router(); 
const render= require('express/lib/response');
const { route } = require('.');
const controladorCliente= require('../controladores/controladorCliente');
const { body , query }= require('express-validator');

router.get('/', controladorCliente.inicio);
router.get('/modificar', controladorCliente.modificar);
router.post('/guardarCliente', body('nombre').isLength({min:3}).withMessage("La longitud minima del es 3"),
body('apellido').isLength({min:3}).withMessage("La longitud minima del es 3"),
body('telefono').isLength({min:8}).withMessage("Enviar un telefono valido"),
body('identidad').isLength({min:13}).withMessage("La longitud minima es 13"),
body('email').isEmail().withMessage("Enviar un correo valido"),
body('contrasenia').isLength({min:6, max:15}).withMessage('La longitud mínima de la contraseña es de 6 caracteres')
.isStrongPassword().withMessage('La contraseña debe incluir al menos un caracter en mayúscula, minusculas, números y un caracter especial'),
controladorCliente.guardarCliente);

router.put('/modificarCliente', controladorCliente.modificarCliente);
router.get('/listar', controladorCliente.buscar);


module.exports= router;
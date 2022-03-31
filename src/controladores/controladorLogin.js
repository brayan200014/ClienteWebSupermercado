const modeloCliente= require('../modelos/modeloCliente'); 
const {validationResult}= require('express-validator');
const msj= require('../componentes/mensaje');
const render= require('express/lib/response');
const correoEnviar= require('../configuraciones/correo');


exports.recovery= async (req,res) => {
    const {existe, send, failed}= req.query; 
    if(existe)
    {
        res.render('recovery',{layout:false, existe: existe});
    }
    else if(send && failed)
    {
        res.render('recovery',{layout:false, send: send, failed: failed});
    }
    else if(send)
    {
        res.render('recovery',{layout:false, send: send});
    }
    else 
    {
        res.render('recovery',{layout:false});
    }
}

exports.verificarAuntenticacion= async (req,res)=> {
    const validacion= validationResult(req);

    if(!validacion.isEmpty()) {
        msj("Validacion", 404,validacion.array(), res);
        const data= {
            data: validacion.array()
        }
        console.log(data);
    }
    else 
    {
        const {correo, contrasenia}= req.body;

        if(!correo || !contrasenia) {
            msj("Complete los datos", 200,[], res);
        }
        else 
        {
            const buscarUsuario= await modeloCliente.findOne({
                where:{
                    Email: correo
                }
            });

            if(!buscarUsuario) { 
               msj("Usuario y/o Contraseña incorrectos", 200,[], res);
            }
            else 
            {
                if(!buscarUsuario.VerificarContraseña(contrasenia, buscarUsuario.contrasenia))
                {
                    msj("Usuario y/o Contraseña incorrectos", 200,[], res);
                }
                else 
                {
                    console.log('bienvenido')
                    const data= {
                        correo:correo,
                        contrasenia: contrasenia,
                        idCliente: buscarUsuario.IdCliente,
                        nombre: buscarUsuario.Nombre
                    }
                    msj("Bienvenido", 200, data, res);
                    
                }
            }
        }
    }
}

exports.enviarPin= async (req,res)=> {
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        msj("Enviar los datos en formato correcto",200,validacion.array(), res);
    }
    else 
    {
        const {correo}= req.body; 

        if(!correo) {
            msj("El correo esta vacio", 200,[], res);
        }
        else 
        {
            const buscarUsuario= await modeloCliente.findOne({
                where: {
                    Email: correo
                }
            }); 

            const dataR= {
                error: true
            }

            if(!buscarUsuario) {
                msj("El correo no es valido", 200, dataR , res); 
               // console.log(dataR)
            }
            else 
            {
                const pin = Math.floor(Math.random() * (999999-100000)) + 100000;
                const dataR= {
                    correo: correo, 
                    pin: pin
                }; 

                buscarUsuario.pin= pin; 
                await buscarUsuario.save().then((data) => {
                    if(correoEnviar.recuperarContrasena(dataR)) {
                        msj("Correo enviado con exito", 200, dataR, res);
                    }
                    else 
                    {
                        msj("Error al enviar al correo", 200, [], res);
                    }
                }).catch((error)=> {
                    console.log(error); 
                })
            }
        }
    }
}

exports.cambiarContra= async (req, res)=> {
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        msj("Los datos no tienen el formato correcto", 200, validacion.array(), res); 
    }
    else 
    {
        const {correo, contrasenia, pin}= req.body; 

        if(!correo || !contrasenia || !pin){
            msj("Los datos estan vacios", 200, [], res); 
        }
        else 
        {
            const buscarUsuario= await modeloCliente.findOne({
                where: {
                    Email: correo, 
                    pin: pin
                }
            }); 

            const data= {
                error:true
            }

            if(!buscarUsuario) {
                msj("Correo o Pin invalidos", 200, data, res); 
            }
            else 
            {
                buscarUsuario.pin= "";
                buscarUsuario.contrasenia= contrasenia;
                const dataR= {
                    guardar: true
                } 

                await buscarUsuario.save().then((data)=> {
                    msj("Contraseña actualizada con exito", 200, dataR, res); 
                }).catch((error)=> {
                    console.log(error);
                    msj("No se completo la peticion", 200,[], res);
                })
            }
        }
    }
}
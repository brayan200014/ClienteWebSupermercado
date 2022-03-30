const modeloCliente= require('../modelos/modeloCliente'); 
const {validationResult}= require('express-validator');
const msj= require('../componentes/mensaje');
const render= require('express/lib/response');


exports.inicio= (req, res)=> {
    const {guardar, existe, validacion}= req.query;
    res.render('registroClientes', {guardar:guardar, existe: existe, validacion:validacion});
}

exports.guardarCliente=async (req,res)=> {
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        console.log(validacion.array());
        const data= {
            validacion: validacion.array()
        }
       msj("No valido vali", 200, data, res);
    }
    else 
    {
        const {nombre,apellido,telefono,email,identidad,contrasenia, direccion, rtn}= req.body; 

        if(!nombre || !apellido || !telefono || !email || !identidad || !contrasenia) {
           msj("No valido datos", 200, [nombre,apellido, telefono,email,identidad,contrasenia,direccion], res);
        }
        else 
        {
            const buscarCliente= await modeloCliente.findOne({
                where: {
                    Email: email
                }
            })
            

            if(buscarCliente) {
              // res.render('registroCliente', {validacion:"Ya existe un cliente registrado con ese correo"});
               console.log("Ya existe un correo")
               const data= {
                   error: true
               }
               msj("Ya existe un mismo correo registrado", 200,data, res);
            }
            else 
            {
                const data= {
                    Nombre: nombre,
                    Apellido: apellido,
                    Telefono: telefono,
                    Direccion: direccion,
                    Email: email, 
                    Identidad: identidad,
                    RTN: rtn,
                    contrasenia: contrasenia
                }
                await modeloCliente.create({
                    Nombre: nombre,
                    Apellido: apellido,
                    Telefono: telefono,
                    Direccion: direccion,
                    Email: email, 
                    Identidad: identidad,
                    RTN: rtn,
                    contrasenia: contrasenia
                }).then((result)=> {
                   msj("Registro guardado exitosamente", 200, data,res);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
}
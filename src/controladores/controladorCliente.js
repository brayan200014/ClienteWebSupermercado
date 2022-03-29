const modeloCliente= require('../modelos/modeloCliente'); 
const {validationResult}= require('express-validator');
const msj= require('../componentes/mensaje');
const render= require('express/lib/response');


exports.inicio= (req, res)=> {
    res.render('registroClientes')
}

exports.guardarCliente=async (req,res)=> {
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        console.log(validacion.array());
       res.render('registroClientes', {validacion:validacion.array()})
      // msj("No valido vali", 200, validacion.array(), res);
    }
    else 
    {
        const {nombre,apellido,telefono,email,identidad,contrasenia, direccion, rtn}= req.body; 

        if(!nombre || !apellido || !telefono || !email || !identidad || !contrasenia) {
          res.render('registroCliente', {valinull:"Envie los datos completos"});
           console.log("Rellene los campos");
          // msj("No valido datos", 200, [nombre,apellido, telefono,email,identidad,contrasenia,direccion], res);
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
               res.render('registroClientes', {existe: true});
            }
            else 
            {
                await modeloCliente.create({
                    Nombre: nombre,
                    Apellido: apellido,
                    Telefono: telefono,
                    Direccion: direccion,
                    Email: email, 
                    Identidad: identidad,
                    RTN: rtn,
                    contrasenia: contrasenia
                }).then((data)=> {
                   res.render('registroClientes', {guardar: true});
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
}
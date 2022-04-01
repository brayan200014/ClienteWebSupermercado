
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', async function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
        
        event.preventDefault(); 


        var nombre= document.getElementById('nombre'); 
        var apellido= document.getElementById('apellido');
        var direccion= document.getElementById('direccion'); 
        var telefono= document.getElementById('telefono'); 
        var identidad= document.getElementById('identidad'); 
        var email= document.getElementById('email');
        var contrasenia= document.getElementById('contrasenia'); 

        var url= 'http://localhost:3002/app/clientes/guardarCliente';

        const respuesta= await fetch(
          url,
          {
            method: 'POST',
            headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          nombre: nombre.value,
                          apellido: apellido.value,
                          direccion: direccion.value, 
                          telefono: telefono.value, 
                          identidad: identidad.value,
                          email: email.value,
                          contrasenia: contrasenia.value,
                          rtn: null
                      })
          }
        )

         const info= await respuesta.json();
        const answer= info.data; 
        if(answer.Nombre) {
            window.location.assign('http://localhost:3002/app/clientes?guardar=true')
        }
        else if(answer.error) {
            window.location.assign('http://localhost:3002/app/clientes?existe=true')
        }
        else if(!nombre.value || !apellido.value || !telefono.value || !identidad.value || !direccion.value || !contrasenia.value || !email.value)
        {

        }
        else if(answer.validacion)
        {
            window.location.assign('http://localhost:3002/app/clientes?validacion=true')
        }



      }, false)
    })
})() 
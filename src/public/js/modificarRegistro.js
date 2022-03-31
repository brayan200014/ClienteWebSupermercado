
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
  
  
          var Nombre= document.getElementById('Nombre'); 
          var Apellido= document.getElementById('Apellido');
          var Direccion= document.getElementById('Direccion'); 
          var Telefono= document.getElementById('Telefono'); 
          var Identidad= document.getElementById('Identidad'); 
          var Email= document.getElementById('Email');
          var contrasenia= document.getElementById('contrasenia'); 
  
          var url= 'http://localhost:3002/app/clientes/modificarCliente';
  
          const respuesta= await fetch(
            url,
            {
              method: 'PUT',
              headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Nombre: Nombre.value,
                            Apellido: Apellido.value,
                            Direccion: Direccion.value, 
                            Telefono: Telefono.value, 
                            Identidad: Identidad.value,
                            Email: Email.value,
                            contrasenia: contrasenia.value,
                            RTN: null
                        })
            }
          )
  
           const info= await respuesta.json();
          const answer= info.data; 
          if(answer.Nombre) {
              window.location.assign('http://localhost:3002/app/clientes/modificarCliente?IdCliente')
          }
          else if(!Nombre.value || !Apellido.value || !Telefono.value || !Identidad.value || !Direccion.value || !contrasenia.value || !Email.value)
          {
  
          }
          else if(answer.validacion)
          {
              window.location.assign('http://localhost:3002/app/clientes?validacion=true')
          }
  
  
  
        }, false)
      })
  })() 
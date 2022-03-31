
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    
    document.addEventListener("DOMContentLoaded", async function(event) {

        var url= 'http://localhost:3002/app/clientes/listar?userId='+ sessionStorage.getItem('userId');
  
          const respuesta= await fetch(
            url,
            {
              method: 'GET',
              headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },    
            }
          )
          const info= await respuesta.json();
          console.log(info);
          //const answer= info.data; 

          document.getElementById('Nombre').value= info.Nombre;
          document.getElementById('Apellido').value=info.Apellido;
          document.getElementById('Direccion').value=info.Direccion; 
          document.getElementById('Telefono').value=info.Telefono; 
          document.getElementById('Identidad').value=info.Identidad; 
          document.getElementById('Email').value=info.Email;
          document.getElementById('RTN').value=info.RTN; 
    });
    
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
  
          var userId = sessionStorage.getItem('userId');
          var Nombre= document.getElementById('Nombre'); 
          var Apellido= document.getElementById('Apellido');
          var Direccion= document.getElementById('Direccion'); 
          var Telefono= document.getElementById('Telefono'); 
          var Identidad= document.getElementById('Identidad'); 
          var Email= document.getElementById('Email');
          var RTN= document.getElementById('RTN');
          
  
          //var url= 'http://localhost:3002/app/clientes/modificarCliente?IdCliente=' + userId;
          var url= 'http://localhost:3002/app/clientes/modificarCliente?IdCliente=' + sessionStorage.getItem('userId');
  
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
                            RTN: RTN.value
                        })
            }
          )
  
          /*const info= await respuesta.json();
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
          }*/
  
  
  
        }, false)
      })
})() 



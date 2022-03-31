const enviarCliente= async ()=> {


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
          
          
          event.preventDefault()

          var correo= document.getElementById('email');
          var contrasenia= document.getElementById('password');
          var url= 'http://localhost:3002/app/loginIn/verificarDatos'
      
          const respuesta= await fetch(
              url,
                  {
                      method: 'POST',
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          correo: correo.value,
                          contrasenia: contrasenia.value
                      })
                  } 
          )
      
          const info= await respuesta.json();
          const answer= info.data; 
          if(answer.correo && answer.contrasenia && answer.idCliente) {
              sessionStorage.setItem('userId', answer.idCliente);
              sessionStorage.setItem('userCorreo', answer.correo);
              window.location.assign('http://localhost:3002/app/');
          } else if(correo.value && contrasenia.value){
              window.location.assign('http://localhost:3002/app/loginIn?boolean=true')
          }



        }, false)
      })
  })()
}


const cambiarContra= async () => {
      
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
          
          
         event.preventDefault()


          var correo= localStorage.getItem('correoPin');
          var pin= document.getElementById('pin');
          var contrasenia= document.getElementById('contrasenia');
          var confirmCon= document.getElementById('confirm');

          if(contrasenia.value==confirmCon.value) {
            var url= 'http://localhost:3002/app/loginIn/cambiarContra'
      
            const respuesta= await fetch(
                url,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            correo: correo,
                            contrasenia: contrasenia.value,
                            pin: pin.value
                        })
                    } 
            )
        
            const info= await respuesta.json();
            const answer= info.data;
          if(answer.error) {
              window.location.assign('http://localhost:3002/app/loginIn/recovery?send=true&failed=true');
          }
          else if(answer.guardar) {
              window.location.assign('http://localhost:3002/app/loginIn?cambio=true');
          } 
          
          } else {
              alert('Contraseñas no coinciden');
          }

         



        }, false)
      })
  })()
  }

  const enviarPin= async () => {
      
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
              
              
             event.preventDefault()
    
              var correo= document.getElementById('email');
              var url= 'http://localhost:3002/app/loginIn/enviarPin'
          
              const respuesta= await fetch(
                  url,
                      {
                          method: 'POST',
                          headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                              correo: correo.value
                          })
                      } 
              )
          
              const info= await respuesta.json();
              const answer= info.data;
            if(answer.error) {
                window.location.assign('http://localhost:3002/app/loginIn/recovery?existe=true');
            }
            else if(answer.correo) {
              localStorage.setItem('correoPin',answer.correo); 
                window.location.assign('http://localhost:3002/app/loginIn/recovery?send=true');
            } 
            
    
    
    
            }, false)
          })
      })()
      }
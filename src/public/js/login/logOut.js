

var a= document.getElementById('a-log');
var ul= document.getElementById('ul-log');
var div_op= document.getElementById('div-opcion-log')



if(sessionStorage.getItem('userId')) {
  ul.innerHTML= `
  <li><a id="a-log" href="http://localhost:3002/app/" onclick="sessionStorage.removeItem('userId'); sessionStorage.removeItem('userCorreo');  "><i class="fa s_color"></i> Cerrar Sesion</a></li>
  <li><a href="http://localhost:3002/app/iniciomodificar"><i class="fa fa-user s_color"></i> Mi cuenta</a></li> `
}
else 
{
  div_op.innerHTML= `
  <a href="http://localhost:3002/app/loginIn" style="color: white; margin-left: -20%; margin-right: 5%"><i class="fa s_color"></i>Iniciar Sesion</a>
  <a href="http://localhost:3002/app/clientes" style="color: white;"><i class="fa s_color"></i>Registrarse</a>
  `
}


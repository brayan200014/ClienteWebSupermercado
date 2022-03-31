require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
app.set('port', process.env.port || 3002);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


//Rutas
app.use('/app/public', express.static(path.join(__dirname, 'public/')));
app.use('/app', require('./rutas/index'));
app.use('/app/productos', require('./rutas/rutasProductos'));
app.use('/app/archivos', require('./rutas/rutasArchivos')); 
app.use('/app/loginIn', require('./rutas/rutaLogin'));
app.use('/app/clientes', require('./rutas/rutaClientes'));
app.use('/app/ventas', require('./rutas/ventasRutas'));
app.use('/app/Carrito', require('./rutas/rutasCarritos'));

app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto 3002');
});
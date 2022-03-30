const sequelize  =  require('sequelize');
const db = require('../configuraciones/db');
const Categorias= require('../modelos/modeloCategorias')

const Productos = db.define("producto",
{
    IdProducto:{
        type: sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement: true,
        allowNull: false,      
    },
    NombreProducto:{
        type: sequelize.STRING(45),
        allowNull: false,
    },
    DescripcionProducto:{
        type: sequelize.STRING(100),
        allowNull: true,
    },
   ISV:{
        type: sequelize.DOUBLE,
        allowNull: true,
    },
    Estado:{
        type: sequelize.TINYINT(1),
        allowNull: true,
       
    },
    Imagen:{
        type: sequelize.STRING(250),
        allowNull: true,
    }
},
{
    tableName: "Productos",
    timestamps : false,
}

);

Categorias.hasOne(Productos, {foreignKey: 'Categorias_IdCategoria'});
module.exports=Productos;
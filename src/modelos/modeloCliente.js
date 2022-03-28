const sequelize= require('sequelize');
const db= require('../configuraciones/db');
const bcrypt = require('bcrypt');

const Cliente= db.define(
    "cliente",
    {
        IdCliente: {
            type: sequelize.INTEGER, 
            primarykey: true, 
            allowNull: false,
            autoIncrement: true
        },
        Nombre: {
            type: sequelize.STRING(45),
            allowNull: false
        },
        Apellido: {
            type: sequelize.STRING(45),
            allowNull: false
        },
        Telefono: {
            type: sequelize.STRING(15),
            allowNull: false
        },
        Direccion: {
            type: sequelize.STRING(150),
            allowNull: false
        },
        Email: {
            type: sequelize.STRING(60),
            allowNull: false
        },
        Identidad: {
            type: sequelize.STRING(13),
            allowNull: false
        },
        RTN: {
            type: sequelize.STRING(13),
            allowNull: true
        },
        contraseña: {
            type: sequelize.STRING(1000),
            allowNull: false
        },
        pin: {
                type: sequelize.INTEGER(6),
                allowNull: true
            }
    },
    {
        tableName: "Clientes",
        timestamps: false,
        hooks: {
            beforeCreate(Cliente) {
                const hash= bcrypt.hashSync(Cliente.contraseña, 10);
                Cliente.contraseña= hash;
            },
            beforeUpdate(Cliente) {
                const hash= bcrypt.hashSync(Cliente.contraseña, 10);
                Cliente.contraseña= hash;
            }
        } 
    }
);

Cliente.prototype.VerificarContraseña= (contra, compara) => {
    return bcrypt.compareSync(contra,compara);
}

module.exports= Cliente;
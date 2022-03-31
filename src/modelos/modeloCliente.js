const sequelize= require('sequelize');
const db= require('../configuraciones/db');
const bcrypt = require('bcrypt');

const Cliente= db.define(
    "cliente",
    {
        IdCliente: {
            type:sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
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
        contrasenia: {
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
                const hash= bcrypt.hashSync(Cliente.contrasenia, 10);
                Cliente.contrasenia= hash;
            },
            beforeUpdate(Cliente) {
                const hash= bcrypt.hashSync(Cliente.contrasenia, 10);
                Cliente.contrasenia= hash;
            }
        } 
    }
);

Cliente.prototype.VerificarContraseña= (contra, compara) => {
    return bcrypt.compareSync(contra,compara);
}

module.exports= Cliente;
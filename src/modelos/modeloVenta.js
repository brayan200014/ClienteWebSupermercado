const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Venta = db.define(
    "Ventas",
    {
        IdVenta: {
            type: sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        FechaVenta: {
            type: sequelize.DATE,
            allowNull: false
        },
        Subtotal: {
            type: sequelize.DOUBLE,
            allowNull: false
        },
        ISV: {
            type: sequelize.DOUBLE,
            allowNull: true
        },
        Clientes_IdCliente: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        Usuarios_IdUsuario: {
            type: sequelize.INTEGER,
            allowNull: true
        },
        Sucursales_IdSucursal: {
            type: sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "Ventas",
        timestamps: false
    }
);

module.exports = Venta;
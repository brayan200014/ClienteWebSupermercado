const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const DetalleVenta = db.define(
    "DetalleVenta",
    {
        Ventas_IdVenta: {
            type: sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Productos_IdProducto: {
            type: sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Cantidad    : {
            type: sequelize.INTEGER,
            allowNull: false
        },
        PrecioVenta: {
            type: sequelize.STRING(45),
            allowNull: false
        },
    },
    {
        tableName: "DetalleVenta",
        timestamps: false
    }
);

module.exports = DetalleVenta;
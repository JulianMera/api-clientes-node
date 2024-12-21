const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentoIdentidad: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Cliente;

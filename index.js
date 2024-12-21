const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const Cliente = require('./src/models/cliente');
const clienteRoutes = require('./src/routes/clientes');

const app = express();
app.use(bodyParser.json());
app.use('/api/clientes', clienteRoutes);

const inicializarDatos = async () => {
    await sequelize.sync({ force: true });

    await Cliente.bulkCreate([
        { nombre: 'Juan Pérez', documentoIdentidad: '123456789', correoElectronico: 'juan.perez@example.com', fechaNacimiento: '1990-05-15' },
        { nombre: 'Ana López', documentoIdentidad: '987654321', correoElectronico: 'ana.lopez@example.com', fechaNacimiento: '1985-03-22' },
        { nombre: 'Pedro Sánchez', documentoIdentidad: '456123789', correoElectronico: 'pedro.sanchez@example.com', fechaNacimiento: '2000-08-10' },
        { nombre: 'María Fernández', documentoIdentidad: '789456123', correoElectronico: 'maria.fernandez@example.com', fechaNacimiento: '1995-12-05' },
    ]);

    console.log('Clientes precargados');
};

const iniciarServidor = async () => {
    await inicializarDatos();

    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
};

iniciarServidor();

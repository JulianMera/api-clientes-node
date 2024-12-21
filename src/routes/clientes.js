const express = require('express');
const Cliente = require('../models/cliente');
const router = express.Router();
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/clientes-por-nombre', async (req, res) => {
    const clientes = await Cliente.findAll({ order: [['nombre', 'ASC']] });
    res.json(clientes);
});

router.get('/clientes-por-edad', async (req, res) => {
    const clientes = await Cliente.findAll();
    const resultado = clientes.map(cliente => {
        const edad = new Date().getFullYear() - new Date(cliente.fechaNacimiento).getFullYear();
        return { nombre: cliente.nombre, edad };
    }).sort((a, b) => a.edad - b.edad);
    res.json(resultado);
});

module.exports = router;

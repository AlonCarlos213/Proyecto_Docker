const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  const clientes = await Cliente.find();
  res.render('clientes', { clientes });
});

// Insertar un cliente (opcional para probar con POST)
router.post('/', async (req, res) => {
  const nuevoCliente = new Cliente(req.body);
  await nuevoCliente.save();
  res.send('Cliente guardado');
});

module.exports = router;

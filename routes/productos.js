const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.render('productos', { productos });
});

router.post('/', async (req, res) => {
  const producto = new Producto(req.body);
  await producto.save();
  res.send('Producto guardado');
});

module.exports = router;
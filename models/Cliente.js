const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: String,
  correo: String
});

module.exports = mongoose.model('Cliente', clienteSchema);

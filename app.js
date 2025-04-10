const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware para JSON y archivos estáticos
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Importación de modelos y rutas
const Cliente = require('./models/Cliente');
const Producto = require('./models/Producto');
const clientesRoutes = require('./routes/clientes');
const productosRoutes = require('./routes/productos');

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/midb')
  .then(() => {
    console.log('🟢 Conectado a MongoDB');
    generarDatos(); // Insertar datos si la colección está vacía
  })
  .catch(err => console.error('🔴 Error al conectar a MongoDB:', err));

// Rutas
app.use('/clientes', clientesRoutes);
app.use('/productos', productosRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.render('index');
});

// Inicio del servidor
app.listen(9000, () => {
  console.log('🚀 Microservicio escuchando en http://localhost:9000');
});

// Función para poblar datos
async function generarDatos() {
  const clientes = await Cliente.find();
  const productos = await Producto.find();

  if (clientes.length === 0 && productos.length === 0) {
    await Cliente.create([
      { nombre: 'Carlos', correo: 'carlos@mail.com' },
      { nombre: 'Lucía', correo: 'lucia@mail.com' }
    ]);

    await Producto.create([
      { nombre: 'Teclado', precio: 49.99 },
      { nombre: 'Mouse', precio: 29.99 }
    ]);

    console.log('✅ Datos aleatorios insertados');
  } else {
    console.log('ℹ️ Ya existen datos, no se insertaron duplicados');
  }
}

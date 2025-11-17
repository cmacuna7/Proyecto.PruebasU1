const express = require('express');
<<<<<<< HEAD
let corsPkg;
=======
const autoRoutes = require('./routes/auto.routes');
const vendorRoutes = require('./routes/vendor.route');
const clienteRoutes = require('./routes/cliente.routes');
>>>>>>> 88fa1acfddc4c6b498a61b959c87ed8137f1ed65

const autoController = require('./controllers/auto.controller');
// Añadimos nuevos controladores
const clienteController = require('./controllers/cliente.controller');
const vendedorController = require('./controllers/vendedor.controller');
const concesionariaController = require('./controllers/concesionaria.controller');

const app = express();

// middlewares
// Si corsPkg existe, usamos la librería; si no, aplicamos un middleware que añade cabeceras CORS básicas.
if (corsPkg) {
    app.use(corsPkg());
} else {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        // Responder OPTIONS inmediatamente
        if (req.method === 'OPTIONS') return res.sendStatus(200);
        next();
    });
}

app.use(express.json());

<<<<<<< HEAD
// rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'API Concesionarias - Backend activo' });
=======
// Rutas Base de cada modelo
app.use('/api/autos', autoRoutes);

app.use('/api/vendedores', vendorRoutes) ;

app.use('/api/clientes', clienteRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
>>>>>>> 88fa1acfddc4c6b498a61b959c87ed8137f1ed65
});

// Rutas para autos (usamos los métodos exportados en controllers/auto.controller.js)
app.get('/autos', autoController.getAllPatients);
app.post('/autos', autoController.addnewPatient);
app.put('/autos/:id', autoController.updatePatient);
app.delete('/autos/:id', autoController.deletePatient);

// Nuevas rutas CRUD
app.get('/clientes', clienteController.getAllClients);
app.post('/clientes', clienteController.addNewClient);
app.put('/clientes/:id', clienteController.updateClient);
app.delete('/clientes/:id', clienteController.deleteClient);

app.get('/vendedores', vendedorController.getAllSellers);
app.post('/vendedores', vendedorController.addNewSeller);
app.put('/vendedores/:id', vendedorController.updateSeller);
app.delete('/vendedores/:id', vendedorController.deleteSeller);

app.get('/concesionarias', concesionariaController.getAllDealerships);
app.post('/concesionarias', concesionariaController.addNewDealership);
app.put('/concesionarias/:id', concesionariaController.updateDealership);
app.delete('/concesionarias/:id', concesionariaController.deleteDealership);

// manejo simple de 404
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint no encontrado' });
});

// iniciar servidor si se ejecuta con `node app.js`
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor backend escuchando en http://localhost:${port}`);
    });
}

module.exports = app;
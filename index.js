const express = require('express');
const routes = require('./routes')
const path = require('path');
const bodyParser    = require('body-parser');

//helpers
const helpers = require('./helpers');

//Crear la conexion a la BBDD
const db = require('./config/db');

//Sync en lugar de Authenticate
// db.authenticate()
//     .then(()=> console.log("Conectado a la BBDD"))
//     .catch(error => console.log(error));

//Importar el modelo
require('./models/Proyectos')

//sync Actualiza la estructura de tablas en BBD
db.sync()
    .then(()=> console.log("Conectado a la BBDD"))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//path de Archivos Staticos
app.use(express.static('public'));

//Habilitar PUG
app.set('view engine', 'pug')

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'))

//Pasar vardump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

//Habillitar BodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes());

app.listen(3000);

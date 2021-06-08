const express       = require('express');
const routes        = require('./routes')
const path          = require('path');
//const bodyParser    = require('body-parser');
const flash         = require('connect-flash');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const passport      = require('./config/passport');

require('dotenv').config({path: 'variables.env'});


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
require('./models/Tareas')
require('./models/Usuarios')

//sync Actualiza la estructura de tablas en BBD
db.sync()
    .then(()=> console.log("Conectado a la BBDD"))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//Habillitar BodyParser para leer datos del formulario
//app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//app.use(expressValidator());

//path de Archivos Staticos
app.use(express.static('public'));

//Habilitar PUG
app.set('view engine', 'pug')

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'))

//Agregar flash messages
app.use(flash());

app.use(cookieParser());

//Sesiones nos permite navegar
app.use(session({
    secret: 'clustercatamarca',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

//Pasar vardump a la aplicacion
//Flash de Mensajes entre paginas

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;   
    res.locals.mensajes = req.flash();
    res.locals.usuario  = {...req.user} || null;
    next();
})

app.use('/', routes());

//Servidor y Puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log('>> El servidor esta funcionando!!');
} );

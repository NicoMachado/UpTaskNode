const express = require('express');
const router = express.Router();

// Importar Express Validator
const { body } = require('express-validator/check');

//Importamos Controllador
const proyectosController = require('../controllers/proyectosController')

module.exports = function(){
    //Ruta para el Home (use toma todos los verbos)
    router.get('/', proyectosController.proyectosHome );
    router.get('/nuevo-proyecto', proyectosController.proyectosNuevo)
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    //Listar Proyecto        s
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    //Editar Proyecto
    router.get('/proyectos/editar/:id', proyectosController.proyectosEditar)
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);



    router.get('/nosotros', (req, res) => {
        res.render('nosotros');
    })
    return router;
}

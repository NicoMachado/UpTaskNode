const express = require('express');
const router = express.Router();

// Importar Express Validator
const { body } = require('express-validator');

//Importamos Controllador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController    = require('../controllers/authController');

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

    //Eliminiar Proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    //Tareas 
    //Alta
    router.post('/proyectos/:url', tareasController.agregarTarea);

    //Actualizar Tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)
    //Eliminar Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea)


    //Crear Nueva Cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta', usuariosController.crearCuenta)

    //Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSession);
    router.post('/iniciar-sesion', authController.autenticarUsuario);


    router.get('/nosotros', (req, res) =>{
        res.send('nosotros');
    })

    return router;
}

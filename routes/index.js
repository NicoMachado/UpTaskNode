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
    router.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome 
    );
    router.get('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        proyectosController.proyectosNuevo)
    router.post('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    //Listar Proyecto        s
    router.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl);
    //Editar Proyecto
    router.get('/proyectos/editar/:id', 
        authController.usuarioAutenticado,
        proyectosController.proyectosEditar)
    
    router.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    //Eliminiar Proyecto
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto);

    //Tareas 
    //Alta
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea);

    //Actualizar Tarea
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea)
    //Eliminar Tarea
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea)


    //Crear Nueva Cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta', usuariosController.crearCuenta)

    //Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSession);
    router.post('/iniciar-sesion', authController.autenticarUsuario);


    //Cerrar Sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //Restablecer contraseña
    router.get('/restablecer', usuariosController.formRestablecerPassword);
    router.post('/restablecer', authController.enviarToken);
    router.get('/restablecer/:token', authController.validarToken);
    router.post('/restablecer/:token', authController.actualizarPassword);

    //Confirmar Cuenta
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

    return router;
}

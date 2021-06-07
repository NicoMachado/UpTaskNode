const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.proyectosNuevo = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('./proyectos/nuevo', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.proyectoPorUrl = async (req, res, next) => {
    /*
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({where : {url: req.params.url } });
    */
    /*Version Promise */

    const proyectosPromise =  Proyectos.findAll();
    const proyectoPromise =  Proyectos.findOne({where : {url: req.params.url } });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
   
    //Consultar Tareas
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    });



    if (!proyecto) return next() ;

    //Render a la Vista

    res.render('./proyectos/view', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
}


exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    //Enviar a la consola lo que le usuario escriba
   //console.log(req.body);

   //Validar
   const { nombre } = req.body;

   let errores = [];
   if (!nombre ) {
       errores.push({'texto': 'Agrega un nombre al proyecto'})
   }

   if (errores.length > 0) {
       res.render('./proyectos/nuevo', {
           nombrePagina : 'Nuevo Proyecto',
           errores,
           proyectos
       })
   } else {
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
   }
}

exports.proyectosEditar = async (req, res) => {
    /* Version await

    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({where : {id: req.params.id } });
   */

    /*Version Promise */
    const proyectosPromise =  Proyectos.findAll();
    const proyectoPromise =  Proyectos.findOne({where : {id: req.params.id } });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);


    if (!proyecto) return next() ;
    
    res.render('./proyectos/nuevo', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    })

}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    //Enviar a la consola lo que le usuario escriba
   //console.log(req.body);

   //Validar
   const { nombre } = req.body;

   let errores = [];
   if (!nombre ) {
       errores.push({'texto': 'Agrega un nombre al proyecto'})
   }

   if (errores.length > 0) {
       res.render('./proyectos/nuevo', {
           nombrePagina : 'Editar Proyecto',
           errores,
           proyectos
       })
   } else {
        await Proyectos.update(
            { nombre: nombre },
            {where: {id: req.params.id}}
        );
        res.redirect('/');
   }
}


exports.eliminarProyecto = async (req, res, next) => {
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});

    if (!resultado) {
        return next();
    }
    
    res.status(200).send('Proyecto Eliminado Correctamente')
}

//Exporta Solo un modulo
/*
module.exports 
*/

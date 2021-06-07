const Proyectos  = require('../models/Proyectos');
const Tareas  = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    console.log(req.params.url);
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});

    //Leer valor del input
    const {tarea} = req.body;
    const estado = 0;
    const proyectoId = proyecto.id ; 
    //Insertar en la BBDD
    const resultado = await Tareas.create({tarea, estado, proyectoId}) ;

    if (!resultado) {
        return next();
    }

    //Redireccionar
    res.redirect(`/proyectos/${req.params.url}`)
    
    //res.send('Enviado  ...');
}

exports.cambiarEstadoTarea = async (req, res, next) => {
    const {id} = req.params;
    const tarea = await Tareas.findOne({where: { id }});
    
    let estado = 0;
    if (tarea.estado === 0) {
        estado = 1;
    } 

    tarea.estado = estado;
    const resultado = await tarea.save();

    if (!resultado) return next();

    res.status(200).send('Estado tarea actualizada')
}

exports.eliminarTarea = async (req, res, next) => {
    console.log(req.query);
    console.log(req.params);
    
    const {id} = req.params;
    const resultado = await Tareas.destroy({where: { id }});

    if (!resultado) return next();

    res.status(200).send('Tarea Eliminada Exitosamente')

}

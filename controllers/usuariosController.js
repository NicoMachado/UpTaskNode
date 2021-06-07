const Usuarios = require ('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta de UpTask'
    })
}

exports.formIniciarSession = async (req, res) => {
    const {error} = res.locals.mensajes ;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar sesion en UpTask',
        error : error
    })
}


exports.crearCuenta = async (req, res) => {
    //Leer los Datos
    const { email, password} = req.body;

    try {
        //Crear Usuario
        await Usuarios.create({
            email,
            password
        }),
        res.redirect('/iniciar-sesion')
       
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta de UpTask',
            email,
            password
        })
    }

        // //Version con el promise de Sequelize
        // //Crear Usuario
        // Usuarios.create({
        //     email,
        //     password
        // })
        // .then(()=> {
        //     res.redirect('/iniciar-sesion')
        // })
        // .catch((er)=> {
        //     console.log('er', er.errors);
        //     res.render('crearCuenta', {
        //         error: er.errors,
        //         nombrePagina: 'Crear cuenta de UpTask'
        //     })
        // })

}
const Usuarios = require ('../models/Usuarios');
const enviarEmail = require('../handler/email');


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
        });
        

        //Crear Url de Confirmacion
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`

        const usuario = { email };

        //enviar Email
        await enviarEmail.enviar( {
            usuario,
            subject: 'Confirmar Cuenta UpTask!',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
    
        //Redirigir al Usuario
        req.falsh('correcto', 'Enviamos un correo, revisa tu bandeja de entrada!')
        res.redirect('/iniciar-sesion');
       
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

exports.formRestablecerPassword = (req, res) => {
    res.render('restablecer', {
        nombrePagina: 'Restablecer tu Contraseña'
    })
}

exports.confirmarCuenta = async (req, res) => {
    const usuario = Usuarios.findOne({where: {
        email: req.params.correo
    }})    
    if (!usuario) {
        req.flash('error', 'No valido!!');
        res.redirect('/crear-cuenta')
    }

    usuario.activo = 1;
    console.log(usuario);
    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciar-sesion');

}
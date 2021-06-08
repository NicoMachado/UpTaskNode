const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require ('sequelize') ;
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handler/email');

exports.autenticarUsuario = passport.authenticate('local' , {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'

});

//Funcion q revisa si el usuario esta logeueado o no,
exports.usuarioAutenticado = (req, res, next)  => {

    //Si el usuario esta autenticado
    if (req.isAuthenticated()) {
        return next();
    } 

    //Sino redirigir
    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion = (req, res) =>  {
    req.session.destroy( () => {
        res.redirect('/iniciar-sesion')
    })
}

//genera un tocken si el usuario es valido
exports.enviarToken = async (req, res) => {
    //Verificar qu el usuario existe

    const {email} = req.body;

    const usuario = await Usuarios.findOne({where: {email}})

    //si no existe el usuario
    if (!usuario) {
        req.flash('error', 'No existe el email/usuario');
        res.redirect('/restablecer')
    }

    //Usuario Existe
    //Token
    usuario.token = crypto.randomBytes(20).toString('hex');
    //Expiracion
    usuario.expiracion = Date.now() + 3600000;
    //Guardar datos en la BBDD
    await usuario.save()    ;

    //Url de Reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`

    //Eviar el Correo
    await enviarEmail.enviar( {
        usuario,
        subject: 'Password Reset!',
        resetUrl,
        archivo: 'restablecer-password'
    });

    req.flash('correcto', 'Se envio un mail para restablecer password!')

    res.redirect('/iniciar-sesion');
}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
        }
    })
    
    if (!usuario) {
        req.flash('error', 'Token No Válido');
        res.redirect('/restablecer');
    }

    //Formulario para generar Password
    res.render('resetPassword' ,{
        nombrePagina: 'Restablecer Contraseña'
    })
}

//Cambia el password por uno nuevo
exports.actualizarPassword = async (req, res) => {
    console.log(req.params.token);

    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    })

    if (!usuario) {
        req.flash('error', 'Token No Válido');
        res.redirect('/restablecer');
    }

    console.log(usuario);
    

    //usuario.password = req.body.password;
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token      = null;
    usuario.expiracion = null;
    //Actualizacio del registro
    await usuario.save()    ;

    req.flash('correcto', 'Se cambio la password exitosamente!');
    res.redirect('/iniciar-sesion');
}
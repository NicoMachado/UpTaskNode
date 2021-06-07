const passport = require('passport');

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
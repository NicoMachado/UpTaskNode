const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al Modelo

const Usuarios = require('../models/Usuarios');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1}
                });
                //Usuario existe, pero con password incorrecto.
                if (!usuario.verificarPassword(password)){
                    console.log('Clave Incorrecta')
                    return done(null, false, {
                        message: 'Password Incorrecto'
                    })
                };
                //El emai y el usuario estan correctos
                return done(null, usuario);

            } catch (error) {
                //Ese Usuario no existe
                console.log('la cuenta no existe!')
                return done(null, false, {
                    message: 'Esa cuenta no existe o no esta confirmada!'
                })
            }
        }
    )
);

passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})

passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

module.exports = passport;

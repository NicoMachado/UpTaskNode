const Sequelize = require ('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Proyectos = require('./Proyectos')

const Usuarios = db.define('usuarios', {
    id: {
        type:Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido!'
            },
            notEmpty: {
                msg: 'El email no puede ser vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ser vacio'
            }
        }
    },

    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,

    activo: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    }
    
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
})

//Metodos Propios
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
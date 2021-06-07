const Sequelize     = require('sequelize');
const shortid       = require('shortid');
const slug          = require('slug');
const db            = require('../config/db');

const Proyectos = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(100)
    },
    //Manera Corta si hay un solo atributo..
    url: Sequelize.STRING(100)

}, {
    hooks: {
        beforeCreate(proyecto) {

            //console.log('Antes de que se inserte en la BBDD', proyecto);
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`;

        }
    }
})

module.exports = Proyectos
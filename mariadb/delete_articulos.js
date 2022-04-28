const { options } = require('./options/mariaDB');
const knex = require('knex')(options);


knex.from('articulos').del()
    .then(()=> console.log('todos los articulos deleted'))
    .catch(err => { console.log(err); throw err})
    .finally(()=> {
        // knet.destroy > nos permite cerrar esa conexion y darle ese lugar al pool en caso de que se necesite.
        knex.destroy();
    })
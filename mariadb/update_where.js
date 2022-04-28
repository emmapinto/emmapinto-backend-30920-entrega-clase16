const { options } = require('./options/mariaDB');
const knex = require('knex')(options);


knex.from('articulos').where('id', '=', 5).update({ stock: 45})
    .then(()=> console.log('Stock de articulo actualizado'))
    .catch(err => { console.log(err); throw err})
    .finally(()=> {
        // knet.destroy > nos permite cerrar esa conexion y darle ese lugar al pool en caso de que se necesite.
        knex.destroy();
    })
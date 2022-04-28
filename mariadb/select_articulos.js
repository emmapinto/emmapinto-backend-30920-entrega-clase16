const { options } = require('./options/mariaDB');
const knex = require('knex')(options);


//Seleccionamos toodas las filas y luego revisamos la matriz de filas devueltas y imprimimos 3 campos.
knex.from('articulos').select("*")
    .then( rows => {
        for (row of rows) {
            console.log(`ID: ${row['id']} | Nombre: ${row['nombre']} | Precio: ${row['precio']} | Stock: ${row['stock']}`)
        }
    }).catch(err => { console.log(err); throw err})
    .finally(()=> {
        // knet.destroy > nos permite cerrar esa conexion y darle ese lugar al pool en caso de que se necesite.
        knex.destroy();
    })

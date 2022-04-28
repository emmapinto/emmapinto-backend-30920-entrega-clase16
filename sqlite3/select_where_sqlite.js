const { knex } = require('./options/SQLite3');

// Seleccionamos solo los articulos cuyo precio es mayor a 130
knex.from('articulos').select("nombre", "precio").where("precio", ">", "130")
    .then( rows => {
        for (row of rows) {
            console.log(`Nombre: ${row['nombre']} | Precio: ${row['precio']}`);
        }
    }).catch(err => { console.log(err); throw err})
    .finally(()=> {
        // knet.destroy > nos permite cerrar esa conexion y darle ese lugar al pool en caso de que se necesite.
        knex.destroy();
    })

const { knex } = require('./options/SQLite3');

// Vamos a eliminar la tabla en caso de que YA EXISTA antes de CREARLA.
knex.schema.dropTable('articulos')
    .then(()=> console.log('Tabla borrada'))
    .catch(err => console.log(err))


//Se crea una nueva tabla con la función createTable del esquema knex.js.
//Definimos el esquema para que contenga tres columnas: id, nombre y precio.
knex.schema.createTable('articulos', (table) => {
    table.increments('id')
    table.string('nombre')
    table.string('codigo')
    table.float('precio')
    table.integer('stock')

})
.then(()=> console.log("Tabla creada"))
.catch(error => console.log(error))

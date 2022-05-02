const { knexProducto } = require("./config"); 

// knexProducto.schema.dropTableIfExists("articulos")
//     .finally(() => { 
//         return knexProducto.schema.createTable("articulos", table => { 
//             table.increments("id").primary();
//             table.string("nombre", 50).notNullable();
//             table.string("codigo", 10).notNullable();
//             table.float("precio");
//             table.integer("stock");
//         })
//     })

exports.guardarProductos = producto =>
    knexProducto("articulos").insert(producto)
    .then( art => art )
    .catch(err => { console.log(err); throw err} )


exports.obtenerProductos = () => 
    knexProducto.from("articulos").select("*")
    .then(rows => rows)
    .catch(err => { console.log(err); throw err})


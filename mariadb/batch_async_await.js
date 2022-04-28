const { options } = require('./options/SQLite3');
const knex = require('knex')(options);

(async () => {
    try {
        console.log("--> Borramos todos los autos")
        await knex("articulos").del()

        console.log("--> Insertamos articulos")
        await knex("articulos").insert(articulos)
        
        console.log("--> Leemos todos los articulos")
        let rows = await knex.from("articulos").select("*")
        for (row of rows) console.log(`ID: ${row['id']} | Nombre: ${row['nombre']} | Precio: ${row['precio']} | Stock: ${row['stock']}`)
        
        console.log("--> Insertamos un articulo mas")
        await knex("articulos").insert( { nombre: "nuevoArticulo", precio: 333, stock: 99} )
        
        console.log("--> Leemos todos los articulos actualizados")
        rows = await knex.from("articulos").select("*")
        for (row of rows) console.log(`ID: ${row['id']} | Nombre: ${row['nombre']} | Precio: ${row['precio']} | Stock: ${row['stock']}`)
    }
    catch(err) {
        console.log(err)
    }
    finally {
        knex.destroy();
    }
})()
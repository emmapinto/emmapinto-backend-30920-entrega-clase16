const { options } = require('./options/mariaDB');
const knex = require('knex')(options);


const articulos = [
    {nombre: 'articulo1', codigo: 'codigo1', precio: 1, stock: 30},
    {nombre: 'articulo2', codigo: 'codigo2', precio: 2, stock: 30},
    {nombre: 'articulo3', codigo: 'codigo3', precio: 3, stock: 30},
    {nombre: 'articulo4', codigo: 'codigo4', precio: 4, stock: 30},
    {nombre: 'articulo5', codigo: 'codigo5', precio: 5, stock: 30}
]


knex('articulos').insert(articulos)
.then(()=> console.log('Articulos insertados'))
.catch(err => { console.log(err); throw err})
.finally(()=> {
    // knet.destroy > nos permite cerrar esa conexion y darle ese lugar al pool en caso de que se necesite.
    knex.destroy();
})



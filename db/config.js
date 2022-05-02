const knexProducto = require('knex')({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "desafioclase16"
    },
    pool: { min: 0, max: 7 }
});

const knexChat = require('knex')({
    client: "sqlite3",
    connection: {
        filename: "./mydb.sqlite"
    },
    useNullAsDefault: true
});


module.exports = {
    knexProducto, knexChat
}
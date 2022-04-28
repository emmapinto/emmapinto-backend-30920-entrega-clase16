/******************** CLASE 16 ********************/
/********* Desafio Entregable: SQL y Node.js *********/

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const {engine} = require("express-handlebars")


let messages = [
];

io.on("connection", async socket => {
    console.log("Un cliente se ha conectado");
    socket.emit("messages", messages); // emitir todos los mensajes a un cliente nuevo
    
    socket.on("new-message", function(data) {
        messages.push(data); // agregar mensajes a array 
        io.sockets.emit("messages", messages); //emitir a todos los clientes
    });    
});

//Configuración para handlebars
app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views/partials",
    })
)

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/*********** API PRODUCTOS *************/

const productos = []

/*********** RENDER HANDLEBARS *************/

app.get("/", (req, res) => {
    //Sirve el cuerpo de la página "main.hbs" en el contenedor "index.hbs"
    if (productos != []) {
        res.render("main", { listProd: productos, listExists: true } );
    } else {
        res.render("main", { listProd: productos, listExists: false } );
    }
});

/********** Me devuelve el array de productos entero **********/

app.get("/productos", (req, res) => {
    res.redirect("/")
})

/********** Guarda un producto nuevo en el array productos **********/

app.post("/productos", (req, res) => {
    req.body = {...req.body, id: productos.length + 1}
    productos.push(req.body)
    // productos[productos.length].id = productos.length
    // res.json(res.body)
    res.render("main", { listProd: productos, listExists: true } );
    
})

/*************SERVER LISTEN***********/

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${srv.address().port}`)
});

srv.on("error", error => console.log(`Error en el servidor ${error}`))

/************************************/

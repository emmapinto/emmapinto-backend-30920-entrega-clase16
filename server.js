/******************** CLASE 16 ********************/
/********* Desafio Entregable: SQL y Node.js *********/

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const {engine} = require("express-handlebars")

const { agregarProductos, listarProductos } = require('./controllers/producto')

const { knexChat } = require("./db/config")
const Messages = require('./controllers/chat')


/********* Configuración para SOCKET.IO *********/

const messagesApi = new Messages(knexChat, 'messages')

io.on('connection', async (socket) => {
	console.log('Se ha conectado un usuario')

	// Envio los mensajes al cliente que se conectó
	socket.emit('messages', await messagesApi.getAll())

	// Escucho los mensajes enviados por el cliente y se los propago a todos
	socket.on('new-message', async (data) => {
		data.fyh = new Date().toLocaleString()
		messagesApi.save(data)
		io.sockets.emit('messages', await messagesApi.getAll())
	})
})

/********* Configuración para HANDLEBARS *********/

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views/partials",
    })
)

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


/*********** END POINTS *************/

app.get("/", listarProductos)


app.get("/productos", (req, res) => {
    res.redirect("/")
})

app.post("/productos", agregarProductos)


/*************SERVER LISTEN***********/

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${srv.address().port}`)
});

srv.on("error", error => console.log(`Error en el servidor ${error}`))

/************************************/

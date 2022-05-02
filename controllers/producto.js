const { obtenerProductos, guardarProductos } = require('../db/producto');


exports.agregarProductos = async (req, res) => {
    let producto = req.body;
    await guardarProductos(producto);
    console.log("producto agregado");
    res.redirect("/")
}


exports.listarProductos = async (req, res) => {
    let productos = await obtenerProductos();
    // res.json(productos);
    res.render("main", { listProd: productos, listExists: true } );
}


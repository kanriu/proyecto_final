const carritosMongoDbModel = require("../models/CarritosMongoDb");
const productosMongoDbModel = require("../models/ProductosMongoDb");
const productosFirebaseModel = require("../models/ProductosFirebase");
const carritosFirebaseModel = require("../models/CarritosFirebase");

const isAdmin = true;

const validarIdCart = async (req, res, next) => {
  const { id } = req.params;
  try {
    //const carrito = await carritosMongoDbModel.getById(id);
    const carrito = await carritosFirebaseModel.getById(id);
    if (carrito) next();
    else return res.status(404).send({ error: "El carrito no existe" });
  } catch (err) {
    return res.status(404).send({ error: "El carrito no existe" });
  }
};

const validarIdProduct = async (req, res, next) => {
  const id = req.params.id_prod ? req.params.id_prod : req.params.id;
  try {
    //const producto = await productosMongoDbModel.getById(id);
    const producto = await productosFirebaseModel.getById(id);
    if (producto) next();
    else return res.status(404).send({ error: "El producto no existe" });
  } catch (err) {
    return res.status(404).send({ error: "El producto no existe" });
  }
};

const validarIsAdmin = (req, res, next) => {
  if (!isAdmin)
    return res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizada`,
    });
  next();
};

module.exports = {
  validarIdCart,
  validarIdProduct,
  validarIsAdmin,
};

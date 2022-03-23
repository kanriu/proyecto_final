const carritosMongoDbModel = require("../models/CarritosMongoDb");
const carritosFirebaseModel = require("../models/CarritosFirebase");

const saveCart = async (req, res) => {
  const { body } = req;
  await carritosMongoDbModel.save(body);
  await carritosFirebaseModel.save(body);
  res.status(201).send("Carrito creado");
};

const saveProductCart = async (req, res) => {
  const { id } = req.params;
  const { productos } = req.body;
  //await carritosMongoDbModel.saveProducts(id, productos);
  await carritosFirebaseModel.saveProducts(id, productos);
  res.status(201).send("Los productos han sido ingresados correctamente");
};

const getProductCart = async (req, res) => {
  const { id } = req.params;
  //const carrito = await carritosMongoDbModel.getById(id);
  const carrito = await carritosFirebaseModel.getById(id);
  if (carrito.productos.length === 0)
    return res.status(404).send({ error: "El carrito esta vacío" });
  return res.status(200).send(carrito.productos);
};

const removeCart = async (req, res) => {
  const { id } = req.params;
  //await carritosMongoDbModel.deleteById(id);
  await carritosFirebaseModel.deleteById(id);
  res.status(202).send("Carrito removido");
};

const removeProductCart = async (req, res) => {
  const { id, id_prod } = req.params;
  //await carritosMongoDbModel.deleteByIdProduct(id, id_prod);
  await carritosFirebaseModel.deleteByIdProduct(id, id_prod);
  res.status(201).send("El producto ha sido removido del carrito exitosamente");
};

module.exports = {
  saveCart,
  saveProductCart,
  getProductCart,
  removeCart,
  removeProductCart,
};

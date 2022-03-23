const productosMongoDbModel = require("../models/ProductosMongoDb");
const productosFirebaseModel = require("../models/ProductosFirebase");

const getProducts = async (req, res) => {
  const contentMongoDb = await productosMongoDbModel.getAll();
  const contentFirebase = await productosFirebaseModel.getAll();
  res.status(200).send(contentFirebase);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;
  //const findItemMongoDb = await productosMongoDbModel.getById(id);
  const findItemFirebase = await productosFirebaseModel.getById(id);
  res.status(200).send(findItemFirebase);
};

const saveProducts = async (req, res) => {
  const { body } = req;
  try {
    await productosMongoDbModel.save(body);
    await productosFirebaseModel.save(body);
    res.status(201).send("Producto creado");
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: e.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  //await productosMongoDbModel.updateById(id, body);
  await productosFirebaseModel.updateById(id, body);
  res.status(202).send("Producto editado");
};
const removeProduct = async (req, res) => {
  const { id } = req.params;
  //await productosMongoDbModel.deleteById(id);
  await productosFirebaseModel.deleteById(id);
  res.status(202).send("Producto removido");
};

module.exports = {
  getProducts,
  saveProducts,
  getProductsId,
  updateProduct,
  removeProduct,
};

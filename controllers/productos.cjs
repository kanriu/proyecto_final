const moment = require("moment");
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../database/productos.json");

const getProducts = async (req, res) => {
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  res.status(200).send(content);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const findItem = content.find((item) => item.id === parseInt(id));
  res.status(200).send(findItem);
};

const saveProducts = async (req, res) => {
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  content.push({
    id: content.length + 1,
    timestamp: moment(),
    ...req.body,
  });
  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  res.status(201).send("Producto creado");
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const index = content.findIndex((i) => i.id === parseInt(id));
  content[index] = { ...content[index], ...req.body };
  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  res.status(202).send("Producto editado");
};
const removeProduct = async (req, res) => {
  const { id } = req.params;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const filter = content.filter((item) => item.id !== parseInt(id));
  await fs.writeFile(filePath, JSON.stringify(filter, null, 2));
  res.status(202).send("Producto removido");
};

module.exports = {
  getProducts,
  saveProducts,
  getProductsId,
  updateProduct,
  removeProduct,
};

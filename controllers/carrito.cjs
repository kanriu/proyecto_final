const moment = require("moment");
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../database/carrito.json");
const filePathProd = path.join(__dirname, "../database/productos.json");

const saveCart = async (req, res) => {
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  content.push({
    id: content.length + 1,
    timestamp: moment(),
    productos: [],
  });
  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  res.status(201).send("Carrito creado");
};

const saveProductCart = async (req, res) => {
  const { id } = req.params;
  const { productos } = req.body;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  let contentProd = JSON.parse(await fs.readFile(filePathProd, "utf-8"));
  const index = content.findIndex((i) => i.id === parseInt(id));
  const productosDetail = productos.map((item) => {
    const producto = contentProd.find((i) => i.id === item);
    return producto ? producto : null;
  });
  const validar = productosDetail.find((i) => i === null);
  if (validar !== null) {
    content[index] = {
      ...content[index],
      productos: [...content[index].productos, ...productosDetail],
    };
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    res.status(201).send("Los productos han sido ingresados correctamente");
  } else {
    res.status(404).send({ error: "Uno de los productos no existe" });
  }
};

const getProductCart = async (req, res) => {
  const { id } = req.params;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const carrito = content.find((i) => i.id === parseInt(id));
  if (carrito.productos.length === 0)
    return res.status(404).send({ error: "El carrito esta vacío" });
  return res.status(200).send(carrito.productos);
};

const removeCart = async (req, res) => {
  const { id } = req.params;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const filter = content.filter((item) => item.id !== parseInt(id));
  await fs.writeFile(filePath, JSON.stringify(filter, null, 2));
  res.status(202).send("Carrito removido");
};

const removeProductCart = async (req, res) => {
  const { id, id_prod } = req.params;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const carrito = content.find((i) => i.id === parseInt(id));
  const filter = carrito.productos.filter(
    (item) => item.id !== parseInt(id_prod)
  );
  const index = content.findIndex((i) => i.id === parseInt(id));
  content[index] = {
    ...content[index],
    productos: filter,
  };
  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  res.status(201).send("El producto ha sido removido del carrito exitosamente");
};

module.exports = {
  saveCart,
  saveProductCart,
  getProductCart,
  removeCart,
  removeProductCart,
};

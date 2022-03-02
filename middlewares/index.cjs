const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../database/carrito.json");
const filePathProd = path.join(__dirname, "../database/productos.json");

const isAdmin = false;

const validarIdCart = async (req, res, next) => {
  const { id } = req.params;
  let content = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const carrito = content.find((i) => i.id === parseInt(id));
  if (!carrito) return res.status(404).send({ error: "El carrito no existe" });
  next();
};

const validarIdProduct = async (req, res, next) => {
  const id = req.params.id_prod ? req.params.id_prod : req.params.id;
  let content = JSON.parse(await fs.readFile(filePathProd, "utf-8"));
  const carrito = content.find((i) => i.id === parseInt(id));
  if (!carrito) return res.status(404).send({ error: "El producto no existe" });
  next();
};

const validarIsAdmin = (req, res, next) => {
  if (!isAdmin)
    return res
      .status(403)
      .send({
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

const { Router } = require("express");
const controller = require("../controllers/productos");
const middleware = require("../middlewares");

const router = Router();
const {
  getProducts,
  saveProducts,
  getProductsId,
  updateProduct,
  removeProduct,
} = controller;

const { validarIdProduct, validarIsAdmin } = middleware;

router.get("/", getProducts);
router.post("/", validarIsAdmin, saveProducts);
router.get("/:id", validarIdProduct, getProductsId);
router.put("/:id", validarIsAdmin, validarIdProduct, updateProduct);
router.delete("/:id", validarIsAdmin, validarIdProduct, removeProduct);

module.exports = {
  router,
};

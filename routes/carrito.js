const { Router } = require("express");
const controller = require("../controllers/carrito");
const middleware = require("../middlewares");

const router = Router();
const {
  saveProductCart,
  saveCart,
  getProductCart,
  removeCart,
  removeProductCart,
} = controller;
const { validarIdCart, validarIdProduct } = middleware;

router.post("/", saveCart);
router.post("/:id/productos", validarIdCart, saveProductCart);
router.get("/:id/productos", validarIdCart, getProductCart);
router.delete("/:id/productos", validarIdCart, removeCart);
router.delete(
  "/:id/productos/:id_prod",
  validarIdCart,
  validarIdProduct,
  removeProductCart
);

module.exports = {
  router,
};

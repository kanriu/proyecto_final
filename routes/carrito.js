import { Router } from "express";
import controller from "../controllers/carrito.cjs";
import middleware from "../middlewares/index.cjs";

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

export { router };

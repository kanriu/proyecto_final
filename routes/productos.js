import { Router } from "express";
import controller from "../controllers/productos.cjs";
import middleware from "../middlewares/index.cjs";

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

export { router };

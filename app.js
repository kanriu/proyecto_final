import express from "express";
import { router as productosRouter } from "./routes/productos.js";
import { router as carritoRouter } from "./routes/carrito.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

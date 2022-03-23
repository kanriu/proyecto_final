const express = require("express");
const mongoose = require("mongoose");
const { router: carritoRouter } = require("./routes/carrito");
const { router: productosRouter } = require("./routes/productos");
const { HOSTNAME, SCHEMA, DATABASE, PORT: PORTDB } = require("./config");

const app = express();
const PORT = process.env.PORT || 8080;
mongoose
  .connect(`${SCHEMA}://${HOSTNAME}:${PORTDB}/${DATABASE}`)
  .then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/productos", productosRouter);
    app.use("/api/carritos", carritoRouter);

    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("error on mongo", err));

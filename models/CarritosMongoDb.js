const mongoose = require("mongoose");
const moment = require("moment");

class CarritosMongoDb {
  constructor() {
    const schema = new mongoose.Schema({
      timestamp: {
        type: String,
        default: moment().format("DD/MM/YYYY hh:mm:ss"),
      },
      productos: [
        {
          timestamp: {
            type: String,
            default: moment().format("DD/MM/YYYY hh:mm:ss"),
          },
          nombre: String,
          descripcion: String,
          codigo: String,
          foto: String,
          precio: Number,
          stock: { type: Number, default: 0 },
        },
      ],
    });

    this.model = mongoose.model("carritos", schema);
  }
  async save(obj) {
    await this.model.create(obj);
  }
  async getById(id) {
    const carrito = await this.model.findById(id);
    return {
      id: carrito["_id"],
      timestamp: carrito.timestamp,
      productos: carrito.productos,
    };
  }
  async saveProducts(id, products) {
    const content = await this.getById(id);
    const productsNow = products.map((item) => {
      return {
        _id: item.id,
        timestamp: item.timestamp,
        nombre: item.nombre,
        descripcion: item.descripcion,
        codigo: item.codigo,
        foto: item.foto,
        precio: item.precio,
        stock: item.stock,
      };
    });
    content.productos.push(...productsNow);
    await this.model.findByIdAndUpdate(id, content);
  }
  async deleteById(id) {
    await this.model.findByIdAndDelete(id);
  }

  async deleteByIdProduct(id, id_prod) {
    const content = await this.getById(id);
    const filter = content.productos.filter(
      (item) => item._id.toString() !== id_prod
    );
    content.productos = filter;
    await this.model.findByIdAndUpdate(id, content);
  }
}

module.exports = new CarritosMongoDb();

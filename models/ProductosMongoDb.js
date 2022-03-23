const mongoose = require("mongoose");
const moment = require("moment");

class ProductosMongoDb {
  constructor() {
    const schema = new mongoose.Schema({
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
    });

    this.model = mongoose.model("productos", schema);
  }

  async save(obj) {
    await this.model.create(obj);
  }

  async getAll() {
    const productos = await this.model.find();
    return productos.map((item) => {
      return {
        nombre: item.nombre,
        descripcion: item.descripcion,
        codigo: item.codigo,
        foto: item.foto,
        precio: item.precio,
        stock: item.stock,
        id: item["_id"],
        timestamp: item.timestamp,
      };
    });
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async updateById(id, body) {
    await this.model.findByIdAndUpdate(id, body);
  }

  async deleteById(id) {
    await this.model.findByIdAndDelete(id);
  }
}

module.exports = new ProductosMongoDb();

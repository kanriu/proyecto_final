const moment = require("moment");
class ProductosFirebase {
  constructor() {
    const admin = require("firebase-admin");
    const { getFirestore } = require("firebase-admin/firestore");

    const serviceAccount = require("../database/sdk.json");

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://proyecto-final-ee945.firebaseio.com",
      });
    }

    const db = getFirestore();

    this.query = db.collection("productos");
  }

  async save(obj) {
    await this.query
      .doc()
      .create({ ...obj, timestamp: moment().format("DD/MM/YYYY hh:mm:ss") });
  }

  async getAll() {
    const querySnapshot = await this.query.get();
    const productos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      timestamp: doc.data().timestamp,
      nombre: doc.data().nombre,
      descripcion: doc.data().descripcion,
      codigo: doc.data().codigo,
      foto: doc.data().foto,
      precio: doc.data().precio,
      stock: doc.data().stock,
    }));
    return productos;
  }

  async getById(id) {
    const item = await this.query.doc(id).get();
    return item.data();
  }

  async updateById(id, body) {
    await this.query.doc(id).update(body);
  }

  async deleteById(id) {
    await this.query.doc(id).delete();
  }
}

module.exports = new ProductosFirebase();

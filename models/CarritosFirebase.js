const moment = require("moment");
class CarritosFirebase {
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

    this.query = db.collection("carritos");
  }

  async save(obj) {
    await this.query
      .doc()
      .create({ ...obj, timestamp: moment().format("DD/MM/YYYY hh:mm:ss") });
  }

  async getById(id) {
    const item = await this.query.doc(id).get();
    return item.data();
  }

  async saveProducts(id, products) {
    const content = await this.getById(id);
    content.productos.push(...products);
    await this.query.doc(id).update(content);
  }

  async deleteById(id) {
    await this.query.doc(id).delete();
  }

  async deleteByIdProduct(id, id_prod) {
    const content = await this.getById(id);
    const filter = content.productos.filter((item) => item.id !== id_prod);
    content.productos = filter;
    await this.query.doc(id).update(content);
  }
}

module.exports = new CarritosFirebase();

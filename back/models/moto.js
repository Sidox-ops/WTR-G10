const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const motoModelSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const moto = mongoose.model("MotorcycleModel", motoModelSchema);

module.exports = moto;
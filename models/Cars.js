const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    model: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    year: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;

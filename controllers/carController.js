const Car = require("../models/Cars");
const fs = require("fs");

module.exports = {
  getCarView: async (req, res) => {
    try {
      const cars = await Car.find();
      res.render("cars", { cars: cars });
    } catch (error) {
      console.log(error);
    }
  },

  getCreateView: (req, res) => {
    res.render("createCar");
  },

  getDashboardView: (req, res) => {
    res.render("dashboard");
  },

  createCar: async (req, res) => {
    try {
      await Car.create({
        name: req.body.name,
        model: req.body.model,
        description: req.body.description,
        color: req.body.color,
        year: req.body.year,
        price: req.body.price,
        image: req.file.filename,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  getUpdateView: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Car.findById(id);
      res.render("updateCar", { car: result });
    } catch (error) {
      console.log(error);
    }
  },

  updateCar: async (req, res) => {
    try {
      const id = req.params.id;
      let new_image = "";

      if (req.file) {
        new_image = req.file.filename;
        try {
          fs.unlinkSync("public/images/" + req.body.old_image);
        } catch (error) {}
      } else {
        new_image = req.body.old_image;
      }

      await Car.findByIdAndUpdate(
        { _id: id },
        {
          image: new_image,
          name: req.body.name,
          model: req.body.model,
          description: req.body.description,
          color: req.body.color,
          year: req.body.year,
          price: req.body.price,
        }
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  getCarById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Car.findById(id);
      res.render("viewCar", { car: result });
    } catch (error) {
      console.log(error);
    }
  },

  // getCarById: (req, res) => {
  //   const id = req.params.id;
  //   Car.findById(id)
  //     .then((result) => {
  //       res.render("viewCar", { car: result });
  //     })
  //     .catch((err) => console.log(err));
  // },

  deleteCar: async (req, res) => {
    try {
      const id = req.params.id;
      await Car.findByIdAndDelete({ _id: id });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};

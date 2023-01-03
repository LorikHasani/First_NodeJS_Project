const carController = require("../controllers/carController");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// image upload
const storage = multer.diskStorage({
  destination: "public/images",

  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", carController.getCarView);
router.get("/createCar", carController.getCreateView);
router.post("/createCar", upload.single("image"), carController.createCar);
router.get("/:id", carController.getCarById);

router.get("/updateCar/:id", carController.getUpdateView);
router.put("/updateCar/:id", upload.single("image"), carController.updateCar);

router.get("/delete/:id", carController.deleteCar);

module.exports = router;

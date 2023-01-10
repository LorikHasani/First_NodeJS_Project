const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const carController = require("../controllers/carController");
// const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const multer = require("multer");

// router.get('/', homeController.getIndex)



router.get("/dashboard", carController.getDashboardView);


router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);



module.exports = router;

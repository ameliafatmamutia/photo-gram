const express = require("express");
const { authController } = require("../controllers/index");
const router = express.Router();

router.post("/register", authController.register);
router.get("/:id_user/verify/:token", authController.verify);
router.post("/login", authController.login);

module.exports = router;

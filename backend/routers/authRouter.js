const express = require("express");
const { authController } = require("../controllers/index");
const router = express.Router();

router.post("/register", authController.register);
router.get("/:id_user/verify/:token", authController.verify);
router.post("/login", authController.login);
router.post("/resend-verification", authController.resend_email);

module.exports = router;

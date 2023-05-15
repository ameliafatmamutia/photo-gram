const express = require("express");
const { userController } = require("../controllers/index");
const router = express.Router();
const { upload } = require("../utils/multer");

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.fetchUser);
router.put("/data/:id", upload.single("image"), userController.updateUserById);
router.post("/forgot-password", userController.forgotPasswordSendEmail);
router.get(
  "/:id_user/verify-forgot-password/:token",
  userController.verifyForgotPassword
);
router.post("/reset-password", userController.resetPassword);

module.exports = router;

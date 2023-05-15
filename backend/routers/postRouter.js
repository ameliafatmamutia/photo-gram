const express = require("express");
const { postController } = require("../controllers/index");
const router = express.Router();
const { upload } = require("../utils/multer");

router.get("/", postController.fetchPosts);
router.get("/detail", postController.fetchDetailedPost);
router.post("/", upload.single("image"), postController.createPost);
router.post("/image", upload.single("image"), postController.uploadImage);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updateCaption);
router.delete("/:id", postController.deletePost);

module.exports = router;

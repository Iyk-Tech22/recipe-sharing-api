const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const FileStorage = require("../utils/fileStorage");

const router = express.Router();
const fileStorage = new FileStorage();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/confirmEmail/:token", authController.confirmEmail);

router.use(authController.protect);
router
  .route("/profile")
  .get(userController.profile)
  .patch(
    fileStorage.uploadSingle("photo"),
    fileStorage.processFileUpload(),
    userController.updateProfile,
  );
module.exports = router;

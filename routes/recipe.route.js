const express = require("express");

const recipeController = require("../controllers/recipe.controller");
const authController = require("../controllers/auth.controller");
const FileStorage = require("../utils/fileStorage");

const router = express.Router({ mergeParams: true });
const fileStorage = new FileStorage();

router.use(authController.protect);

router
  .route("/")
  .post(
    fileStorage.uploadMultiple("images"),
    fileStorage.processFileUpload(),
    recipeController.createRecipe,
  )
  .get(recipeController.getAllRecipes);

router
  .route("/:id")
  .get(recipeController.getRecipe)
  .post(recipeController.publishRecipe);

module.exports = router;

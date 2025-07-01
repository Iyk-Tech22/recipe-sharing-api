const Recipe = require("../models/recipe.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

exports.createRecipe = asyncHandler(async (req, res, next) => {
  const { title, description, ingredients, instructions, tags } = req.body;

  if (req.uploadedFiles) {
    req.body.images = req.uploadedFiles.map((file) => file.url);
  }

  const newRecipe = await Recipe.create({
    tags,
    title,
    description,
    ingredients,
    instructions,
    author: req.user._id,
    images: req.body.images,
  });

  if (!newRecipe) {
    return next(new AppError(400, "Failed to create recipe"));
  }

  res.status(200).json({
    status: "success",
    message: "Recipe created successfully",
    data: {
      recipe: newRecipe,
    },
  });
});

exports.publishRecipe = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "All recipes fetched successfully",
    data: {
      recipes: [], // This should be replaced with actual recipe data
    },
  });
};

exports.getAllRecipes = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "All recipes fetched successfully",
    data: {
      recipes: [], // This should be replaced with actual recipe data
    },
  });
};

exports.getRecipe = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "All recipes fetched successfully",
    data: {
      recipes: [], // This should be replaced with actual recipe data
    },
  });
};

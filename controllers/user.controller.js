const asyncHandler = require("../utils/asyncHandler");
const FileStorage = require("../utils/fileStorage");
// const User = require("../models/user.model");
const AppError = require("../utils/appError");

exports.profile = (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: "success",
    message: "User profile retrieved successfully",
    data: user,
  });
};

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { user, uploadedFiles } = req;
  const { username } = req.body;

  if (uploadedFiles && uploadedFiles.length > 0) {
    if (user.photo) {
      const fileName = user.photo.split("/").pop();
      try {
        await FileStorage.deleteFile(fileName);
      } catch (error) {
        return next(
          new AppError(500, error.message || "Error deleting old photo"),
        );
      }
    }
    user.photo = uploadedFiles[0].url;
  }
  if (username) {
    user.username = username;
  }

  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "User profile updated successfully",
    data: user,
  });
});

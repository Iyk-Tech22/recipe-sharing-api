const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, email, role, password, passwordConfirm } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    role,
  });

  if (!user) {
    return next(AppError(400, "User not created"));
  }

  res.status(200).json({
    status: "success",
    message: "User created successfully",
    data: user,
  });
});

const jwt = require("jsonwebtoken");

const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const Email = require("../utils/emailHandler");

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (res, user) => {
  const jwtToken = signToken({ id: user._id, role: user.role });
  user.password = undefined;
  res.status(200).json({
    status: "success",
    accessToken: jwtToken,
    data: {
      user: user,
    },
  });
};

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

  const token = user.createToken("emailConfirmation");
  user.save({ validateBeforeSave: false });

  try {
    const url = `${req.protocol}://${req.get("host")}/api/v1/users/confirmEmail/${token}`;
    await new Email(user, url).emailConfirmation();
  } catch (err) {
    return next(new AppError(500, "Error sending confirmation email"));
  }

  res.status(200).json({
    status: "success",
    message: "User created successfully, Check your email for confirmation",
    data: user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(400, "Please provide email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AppError(401, "Incorrect email or password"));
  }

  createSendToken(res, user);
});

exports.confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const hashedToken = User.createHash(token);
  const user = await User.findOne({
    confirmEmailToken: hashedToken,
    confirmEmailTokenExpires: { $gt: Date.now() },
    active: false,
  });

  if (!user) {
    return next(new AppError(400, "Invalid or expired confirmation token"));
  }

  user.active = true;
  user.confirmEmailToken = undefined;
  user.confirmEmailTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });
  createSendToken(res, user);
});

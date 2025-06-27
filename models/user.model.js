const mongoose = require("mongoose");
const validators = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: [validators.isEmail, "Please enter a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm password is required"],
    minLength: [8, "Confirm password must be at least 8 characters"],
  },
  active: {
    type: Boolean,
    default: false,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  confirmEmailToken: String,
  confirmEmailTokenExpires: Date,
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    delete ret.active;
    delete ret.passwordChangedAt;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.confirmEmailToken;
    delete ret.confirmEmailTokenExpires;
  },
});

userSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  if (!("active" in this._conditions)) this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.validatePassword = async (
  candidatePassword,
  userPassword,
) => {
  const res = await bcrypt.compare(candidatePassword, userPassword);
  return res;
};

userSchema.methods.createToken = function (type) {
  const token = crypto.randomBytes(32).toString("hex");
  switch (type) {
    case "emailConfirmation":
      this.confirmEmailToken = userSchema.statics.createHash(token);
      this.confirmEmailTokenExpires =
        Date.now() + process.env.EMAIL_CONFIRMATION_EXPIRY * 60 * 1000;
      break;
    default:
      break;
  }
  return token;
};

userSchema.statics.createHash = function (token) {
  return crypto.createHash("sha256").update(token).digest("hex");
};

module.exports = mongoose.model("User", userSchema);

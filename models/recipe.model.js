const mongoose = require("mongoose");
const slugify = require("slugify");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  tags: {
    type: [String],
    trim: true,
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required"],
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
    trim: true,
  },
  images: [
    {
      type: String,
      required: [true, "Image URL is required"],
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

recipeSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
  },
});

recipeSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "recipe",
});

recipeSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "recipe",
});

recipeSchema.pre("save", function (next) {
  if (!this.slug) this.slug = slugify(this.title, { lower: true });
  next();
});

recipeSchema.pre("findOneAndUpdate", function (next) {
  if (!this._update.slug && this._update.title) {
    this._update.slug = slugify(this._update.title, { lower: true });
  }
  next();
});

recipeSchema.pre(/^find/, function (next) {
  this.populate({
    author: {
      select: "username email photo",
    },
  });
});

recipeSchema.pre(/^find/, function (next) {
  if (!("isPublished" in this._conditions))
    this.find({ isPublished: { $ne: false } });
  next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

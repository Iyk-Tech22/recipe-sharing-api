const AppError = require("./appError");
const asyncHandler = require("./asyncHandler");

exports.findOne = async (model, popOps) =>
  asyncHandler(async (req, res, next) => {
    let query = await model.findById(req.params.id);
    if (popOps) query = query.populate(query);
    const doc = await query;

    if (!doc) {
      return next(new AppError(404, "Document not found"));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

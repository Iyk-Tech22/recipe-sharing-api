const express = require("express");
const globalErrorHandler = require("./controllers/error.controller");
const AppError = require("./utils/appError");

const app = express();

app.use((req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;

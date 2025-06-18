/* eslint-disable no-console */

function sendDevError(error, req, res) {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
}

function sendProdError(error, req, res) {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.error("ERROR 💥", error);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
}

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(error, req, res);
  } else {
    sendProdError(error, req, res);
  }
};

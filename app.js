const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");

const globalErrorHandler = require("./middlewares/error-handler.middleware");
const AppError = require("./utils/appError");
const userRoute = require("./routes/user.route");

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

//  Routes
app.use("/api/v1/users", userRoute);

app.use((req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});
app.use(globalErrorHandler);

module.exports = app;

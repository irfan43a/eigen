const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const helmet = require("helmet");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const mainRoute = require("./src/routes");


app.use("/v1", mainRoute);

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res, next) => {
  const messError = err.message || "Internal server Error";
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: messError,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

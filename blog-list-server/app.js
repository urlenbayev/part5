const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("./utils/morganMiddleware");

mongoose
  .connect(config.mongoUrl)
  .then(console.log("Connected to db"))
  .catch((error) => {
    console.log(error);
  });

//Middlewares
app.use(cors());
app.use(express.static("../bloglist-frontend/dist"));
app.use(express.json());
app.use(morgan);

//Routers
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");

//Endpoints
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "development") {
  app.use("/api/testing", testingRouter);
}

module.exports = app;

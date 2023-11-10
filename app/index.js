const express = require("express");
const app = express();
const usersRouter = require("../routes/user.js");
const showsRouter = require("../routes/shows.js");

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mounting the user and show routers
app.use("/users", usersRouter);
app.use("/shows", showsRouter);

module.exports = app;

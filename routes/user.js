const express = require("express");
const usersRouter = express.Router();
const { User, Show } = require("../models/index.js");

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = usersRouter;

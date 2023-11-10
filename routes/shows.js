const express = require("express");
const showsRouter = express.Router();
const { User, Show } = require("../models/index.js");

showsRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = showsRouter;

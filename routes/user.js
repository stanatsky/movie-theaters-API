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
usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findByPk(id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
usersRouter.get("/:id/shows", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id, { include: Show });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.json(user.shows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
usersRouter.put("/:uId/shows/:sId", async (req, res) => {
  const uId = req.params.uId;
  const sId = req.params.sId;

  try {
    const user = await User.findByPk(uId);
    const show = await Show.findByPk(sId);
    await user.addShow(show);
    res.json({ message: "Show added for the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = usersRouter;

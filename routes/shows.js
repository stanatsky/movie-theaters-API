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

showsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const show = await Show.findByPk(id);
    res.json(show);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

showsRouter.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;
  try {
    const shows = await Show.findAll({
      where: {
        genre,
      },
    });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

showsRouter.put("/:id/watched", async (req, res) => {
  const id = req.params.id;
  const { rating } = req.body;

  try {
    const show = await Show.findByPk(id, { include: User });
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    show.rating = rating;
    await show.save();

    res.json({ message: "Rating updated for the show" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

showsRouter.put("/:id/updates", async (req, res) => {
  const id = req.params.id;
  const { rating } = req.body;

  try {
    const show = await Show.findByPk(id, { include: User });
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    show.rating = rating;
    await show.save();

    res.json({ message: "Rating updated for the show" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
showsRouter.put("/:id/updates", async (req, res) => {
  const showId = req.params.id;
  const { status } = req.body;

  try {
    const show = await Show.findByPk(showId);
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    // Update the status of the show
    show.status = status;
    await show.save();

    res.json({ message: "Status updated for the show" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = showsRouter;

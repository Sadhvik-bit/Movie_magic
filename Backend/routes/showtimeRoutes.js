// routes/showtimeRoutes.js
const express = require("express");
const router = express.Router();
const Showtime = require("../models/showtime");
const Movie = require("../models/movie");

// 🎬 Get showtime by ID with movie details
router.get("/:id", async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id);
    if (!showtime) return res.status(404).json({ error: "Showtime not found" });

    const movie = await Movie.findById(showtime.movieId);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json({ showtime, movie });
  } catch (err) {
    console.error("❌ Showtime fetch error:", err);
    res.status(500).json({ error: "Error fetching showtime details" });
  }
});

module.exports = router;

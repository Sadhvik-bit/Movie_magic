const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// ✅ GET: Fetch all movies with populated showtimes
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().populate('showtimes');
    res.json(movies);
  } catch (err) {
    console.error("❌ Error fetching movies:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET: Fetch a single movie by ID with showtimes
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('showtimes');
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    console.error("❌ Error fetching movie:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST: Add a new movie
router.post('/movie', async (req, res) => {
  const { title, description, posterUrl } = req.body;

  if (!title || !posterUrl) {
    return res.status(400).json({ error: 'Title and poster URL are required' });
  }

  try {
    const newMovie = new Movie({ title, description, posterUrl });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    console.error("❌ Error adding movie:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

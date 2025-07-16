const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  posterUrl: String,
  showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Showtime" }],
});

module.exports = mongoose.model("Movie", movieSchema);

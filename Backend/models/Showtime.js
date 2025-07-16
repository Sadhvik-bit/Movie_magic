const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date, // ✅ Must be Date type
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  bookedSeats: {
    type: [Number],
    default: [],
  },
});

module.exports = mongoose.model("Showtime", showtimeSchema);

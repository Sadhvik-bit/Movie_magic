const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: String,
  email: String,
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' },
  seats: [Number],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);

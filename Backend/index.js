require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const Showtime = require('./models/showtime');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', movieRoutes);
app.use('/api', bookingRoutes);

// Auto-patch showtimes missing `bookedSeats`
async function patchShowtimes() {
  try {
    const result = await Showtime.updateMany(
      { bookedSeats: { $exists: false } },
      { $set: { bookedSeats: [] } }
    );
    console.log(`✅ Patched ${result.modifiedCount} showtime(s) with missing bookedSeats`);
  } catch (err) {
    console.error('❌ Failed to patch showtimes:', err.message);
  }
}

// Run the patch once at startup
patchShowtimes();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

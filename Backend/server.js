require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes'); // ✅ NEW
const cors = require('cors');
const path = require('path');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../public")));

// 🔗 API Routes
app.use('/api', movieRoutes);
app.use('/api', bookingRoutes);
app.use('/api/showtime', showtimeRoutes); // ✅ ADDED

// Fallback route (for SPA or direct root access)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

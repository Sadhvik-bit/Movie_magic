const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Showtime = require("../models/showtime");
const Movie = require("../models/movie");
const nodemailer = require("nodemailer");
require("dotenv").config();

// 🎟️ Book Tickets + Send Confirmation Email
router.post("/book", async (req, res) => {
  const { showtimeId, seats, user, email } = req.body;

  try {
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) return res.status(404).json({ error: "Showtime not found" });

    const overlapping = showtime.bookedSeats.filter((s) => seats.includes(s));
    if (overlapping.length) {
      return res.status(400).json({ error: "Some seats already booked" });
    }

    showtime.bookedSeats.push(...seats);
    await showtime.save();

    const booking = new Booking({ showtimeId, seats, user, email });
    await booking.save();

    const movie = await Movie.findById(showtime.movieId);
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Booking:${booking._id}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Movie Magic 🎬" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎟️ Your Movie Ticket - ${movie.title}`,
      html: `
        <h2>Thanks for booking with Movie Magic!</h2>
        <p><strong>Name:</strong> ${user}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Movie:</strong> ${movie.title}</p>
        <p><strong>Time:</strong> ${showtime.time}</p>
        <p><strong>Seats:</strong> ${seats.map((s) => s + 1).join(", ")}</p>
        <p><strong>Booking ID:</strong> ${booking._id}</p>
        <img src="${qrCode}" alt="QR Code" />
        <p>Please show this QR code at the theatre entrance.</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("❌ Email send error:", err);
      else console.log("✅ Email sent:", info.response);
    });

    res.status(200).json({ success: true, booking });
  } catch (err) {
    console.error("❌ Booking Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🪑 Get Seat Availability
router.get("/seats/:showtimeId", async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.showtimeId);
    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    const totalSeats = 50;
    const booked = new Set(showtime.bookedSeats);
    const seatMap = Array.from({ length: totalSeats }, (_, i) => booked.has(i));

    res.json(seatMap);
  } catch (err) {
    console.error("❌ Seat fetch error:", err);
    res.status(500).json({ error: "Error fetching seats" });
  }
});

// 🎫 Get Ticket by Booking ID
router.get("/ticket/:bookingId", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const showtime = await Showtime.findById(booking.showtimeId);
    const movie = await Movie.findById(showtime.movieId);

    res.json({
      booking: {
        _id: booking._id,
        seats: booking.seats,
        user: booking.user,
        email: booking.email,
      },
      showtime,
      movie,
    });
  } catch (err) {
    console.error("❌ Ticket fetch error:", err);
    res.status(500).json({ error: "Failed to load ticket" });
  }
});

// 📜 Get Booking History with filters
router.get("/history", async (req, res) => {
  const { name, title = "", date = "" } = req.query;
  if (!name) return res.status(400).json({ error: "Missing user name" });

  try {
    const bookings = await Booking.find({ user: name })
      .populate({
        path: "showtimeId",
        populate: { path: "movieId" },
      })
      .sort({ createdAt: -1 });

    const filtered = bookings.filter((b) => {
      const movieTitle = b.showtimeId?.movieId?.title?.toLowerCase() || "";
      const matchesTitle = title ? movieTitle.includes(title.toLowerCase()) : true;

      const bookingDate = new Date(b.createdAt).toISOString().split("T")[0];
      const matchesDate = date ? bookingDate === date : true;

      return matchesTitle && matchesDate;
    });

    res.json(filtered);
  } catch (err) {
    console.error("❌ History fetch error:", err);
    res.status(500).json({ error: "Error fetching booking history" });
  }
});

module.exports = router;

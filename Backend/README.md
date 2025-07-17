# 🎬 Movie Magic – Backend API

A robust backend for the **Movie Ticket Booking Web App**, built with **Node.js**, **Express.js**, and **MongoDB**.  
Handles movie listings, showtimes, and ticket bookings with clean RESTful routes and modular structure.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Fast, minimalist server framework
- **MongoDB Atlas** – Cloud NoSQL database
- **Mongoose** – ODM for MongoDB
- **dotenv** – Secure environment config
- **Cors** & **Body-parser** – Middleware support

---

## ✨ Features

🗂️ Modular routing structure  
🎥 Movie schema and dynamic showtimes  
🌱 Seeder scripts for initial movie data  
🔐 Environment variable config support  
📡 RESTful APIs for frontend consumption  
🧩 Easy to scale with future features

---

## 📁 Folder Structure

```bash
backend/
│
├── .env               # Environment variables (PORT, MONGO_URI)
├── index.py           # Entry point (optional - for testing or local runs)
├── server.py          # Main server config with Express setup
├── seed.py            # General DB seeding script
├── seedMovies.py      # Movie-specific seeding
├── _pycache_
│
├── config/
│   └── db.js          # MongoDB connection logic
│   └── _pycache_
│
├── models/
│   └── Movie.js       # Mongoose schema for movies
│   └── Showtime.js    # Mongoose schema for showtimes 
|   └── Booking.js     # Mongoose schema for Booking
│   └── _pycache_
│
├── routes/
│   └── movieRoutes.js # API routes for movies
|   └── bookingRoutes.js # API routes for booking
|   └── showtimeRoutes.js # API routes for showtimes
│   └── _pycache_

```

---

## 📦 Upcoming Features
- 🔐 JWT-based authentication
- 🛠️ Admin CRUD for movie & showtime mgmt
- 📅 Real-time seat availability
- 💳 Payment integration
- 📈 Analytics dashboard


✨ Made with ❤️ by Sadhvik



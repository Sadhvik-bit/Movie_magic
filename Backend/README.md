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
├── index.js           # Entry point (optional - for testing or local runs)
├── server.js          # Main server config with Express setup
├── seed.js            # General DB seeding script
├── seedMovies.js      # Movie-specific seeding
│
├── config/
│   └── db.js          # MongoDB connection logic
│
├── models/
│   └── Movie.js       # Mongoose schema for movies
│   └── Showtime.js    # Mongoose schema for showtimes (if any)
│
├── routes/
│   └── movieRoutes.js # API routes for movies and showtimes


```

---

## 📦 Upcoming Features
- 🔐 JWT-based authentication
- 🛠️ Admin CRUD for movie & showtime mgmt
- 📅 Real-time seat availability
- 💳 Payment integration
- 📈 Analytics dashboard


✨ Made with ❤️ by Ammu



const mongoose = require("mongoose");
require("dotenv").config();
const Movie = require("./models/movie");
const Showtime = require("./models/showtime");

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  try {
    // 🧹 Clear existing data
    await Movie.deleteMany({});
    await Showtime.deleteMany({});
    console.log("🗑️ Old movie and showtime data cleared.");

    const movies = [
      {
        title: "Avengers: Endgame",
        description:
          "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions.",
        posterUrl:
          "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
        genre: "Action, Sci-Fi",
      },
      {
        title: "Interstellar",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        posterUrl:
          "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        genre: "Adventure, Drama, Sci-Fi",
      },
      {
        title: "Inception",
        description:
          "A thief who steals corporate secrets through dream-sharing is given the inverse task of planting an idea.",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        genre: "Action, Thriller, Sci-Fi",
      },
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    for (const movie of movies) {
      // Step 1: Create the Movie
      const newMovie = await Movie.create({
        ...movie,
        showtimes: [], // initially empty
      });

      // Step 2: Create Showtimes using the movieId
      const show1 = await Showtime.create({
        movieId: newMovie._id,
        date: new Date(today),
        time: "6:30 PM",
        bookedSeats: [],
      });

      const show2 = await Showtime.create({
        movieId: newMovie._id,
        date: new Date(tomorrow),
        time: "9:00 PM",
        bookedSeats: [],
      });

      // Step 3: Update Movie with created showtime IDs
      newMovie.showtimes = [show1._id, show2._id];
      await newMovie.save();

      console.log(
        `🎬 Seeded: ${newMovie.title} → Showtimes: ${show1.date.toISOString()} & ${show2.date.toISOString()}`
      );
    }

    console.log("✅ Movies and showtimes seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.disconnect();
  }
};

seed();

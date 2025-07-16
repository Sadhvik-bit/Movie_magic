const mongoose = require('mongoose');
const Movie = require('./models/movie');
const Showtime = require('./models/showtime');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Movie.deleteMany();
  await Showtime.deleteMany();

  const showtime = await Showtime.create({
    time: "6:30 PM",
    seats: new Array(50).fill(false) // 50 seats, all available
  });

  const movie = await Movie.create({
    title: "Avengers: Endgame",
    poster: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    genre: "Action, Sci-Fi",
    showtimes: [showtime._id]
  });

  showtime.movieId = movie._id;
  await showtime.save();

  console.log("Sample movie and showtime added.");
  process.exit();
});

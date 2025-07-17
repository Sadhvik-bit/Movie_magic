import os
from mongoengine import connect, disconnect
from models.movie import Movie
from models.showtime import Showtime
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

# Connect to MongoDB
MONGODB_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/movie_db")
connect(host=MONGODB_URI)

def seed_data():
    try:
        # Clear collections
        Movie.objects.delete()
        Showtime.objects.delete()

        # Create a showtime (50 available seats as empty list)
        showtime = Showtime(
            time="6:30 PM",
            date=None,  # or datetime.now() if required
            bookedSeats=[]
        )
        showtime.save()

        # Create a movie with the showtime reference
        movie = Movie(
            title="Avengers: Endgame",
            description="Action, Sci-Fi",
            posterUrl="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
            showtimes=[showtime]
        )
        movie.save()

        # Link movie back to showtime
        showtime.movieId = movie
        showtime.save()

        print("✅ Sample movie and showtime added.")
    except Exception as e:
        print(f"❌ Error seeding data: {e}")
    finally:
        disconnect()

if __name__ == "__main__":
    seed_data()

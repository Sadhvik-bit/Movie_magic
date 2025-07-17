import os
from datetime import datetime, timedelta
from mongoengine import connect, disconnect
from dotenv import load_dotenv
from models.movie import Movie
from models.showtime import Showtime

load_dotenv()

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/movie_db")
connect(host=MONGO_URI)

def seed_movies():
    try:
        # 🧹 Clear existing data
        Movie.objects.delete()
        Showtime.objects.delete()
        print("🗑️ Old movie and showtime data cleared.")

        movies = [
            {
                "title": "Avengers: Endgame",
                "description": "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions.",
                "posterUrl": "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
                "genre": "Action, Sci-Fi",
            },
            {
                "title": "Interstellar",
                "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "posterUrl": "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
                "genre": "Adventure, Drama, Sci-Fi",
            },
            {
                "title": "Inception",
                "description": "A thief who steals corporate secrets through dream-sharing is given the inverse task of planting an idea.",
                "posterUrl": "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
                "genre": "Action, Thriller, Sci-Fi",
            }
        ]

        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        tomorrow = today + timedelta(days=1)

        for m in movies:
            # Step 1: Create Movie
            new_movie = Movie(**m)
            new_movie.save()

            # Step 2: Create Showtimes
            show1 = Showtime(
                movieId=new_movie,
                date=today,
                time="6:30 PM",
                bookedSeats=[]
            ).save()

            show2 = Showtime(
                movieId=new_movie,
                date=tomorrow,
                time="9:00 PM",
                bookedSeats=[]
            ).save()

            # Step 3: Update Movie with showtimes
            new_movie.showtimes = [show1, show2]
            new_movie.save()

            print(f"🎬 Seeded: {new_movie.title} → Showtimes: {show1.date.isoformat()} & {show2.date.isoformat()}")

        print("✅ Movies and showtimes seeded successfully!")
    except Exception as e:
        print(f"❌ Error seeding data: {e}")
    finally:
        disconnect()

if __name__ == "__main__":
    seed_movies()

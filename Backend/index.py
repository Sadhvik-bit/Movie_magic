import os
from flask import Flask
from flask_cors import CORS
from mongoengine import connect, Q
from models import Showtime
from movie_routes import movie_bp
from booking_routes import booking_bp
from showtime_routes import showtime_bp
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

app = Flask(__name__)
CORS(app)  # Enable CORS

# Connect to MongoDB
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/your_db_name")
connect(host=MONGODB_URI)

# Register routes (prefix with /api like Express)
app.register_blueprint(movie_bp, url_prefix='/api')
app.register_blueprint(booking_bp, url_prefix='/api')
app.register_blueprint(showtime_bp, url_prefix='/api/showtimes')  # example prefix

# Auto-patch showtimes missing 'bookedSeats'
def patch_showtimes():
    try:
        result = Showtime.objects(bookedSeats__exists=False).update(set__bookedSeats=[])
        print(f"✅ Patched {result} showtime(s) with missing bookedSeats")
    except Exception as e:
        print(f"❌ Failed to patch showtimes: {e}")

patch_showtimes()

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    print(f"🚀 Server running on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)

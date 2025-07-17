import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from mongoengine import connect
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Import blueprints from route files
from routes.movie_routes import movie_bp
from routes.booking_routes import booking_bp
from routes.showtime_routes import showtime_bp

# ✅ Create Flask app
app = Flask(__name__, static_folder='../frontend', static_url_path='/')

# ✅ Enable CORS
CORS(app)

# ✅ Connect to MongoDB using MongoEngine
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/movie_db")
connect(host=MONGO_URI)

# ✅ Register API Blueprints
app.register_blueprint(movie_bp, url_prefix='/api')
app.register_blueprint(booking_bp, url_prefix='/api')
app.register_blueprint(showtime_bp, url_prefix='/api/showtime')

# ✅ Serve static frontend files (CSS, JS, images)
@app.route('/<path:filename>')
def serve_static_files(filename):
    return send_from_directory(app.static_folder, filename)

# ✅ Fallback route (serves index.html for SPA routing)
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# ✅ Start the Flask server
if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    print(f"🚀 Server running on http://localhost:{port}")
    # Disable reloader to avoid WinError 10038 on Windows
    app.run(host='0.0.0.0', port=port, debug=True, use_reloader=False)

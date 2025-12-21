from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from backend.db import init_db, get_connection
from recommender import recommend_jobs, load_jobs_from_csv

app = Flask(__name__)
CORS(app)

# Initialize DB and load jobs
init_db()
load_jobs_from_csv()

@app.route("/")
def home():
    return "Job Recommendation Backend Running"

# ================= AUTH =================

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data["username"]
    password = data["password"]

    hashed_pw = generate_password_hash(password)

    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, hashed_pw)
        )
        conn.commit()
        return jsonify({"message": "Signup successful"})
    except:
        return jsonify({"message": "Username already exists"})
    finally:
        conn.close()

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT password FROM users WHERE username=?",
        (username,)
    )
    row = cur.fetchone()
    conn.close()

    if row and check_password_hash(row[0], password):
        return jsonify({"success": True})
    return jsonify({"success": False})

# ================= SKILLS =================

@app.route("/save-skills", methods=["POST"])
def save_skills():
    data = request.json
    username = data["username"]
    skills = data["skills"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "UPDATE users SET skills=? WHERE username=?",
        (skills, username)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Skills saved successfully"})

# ================= RECOMMEND =================

@app.route("/recommend", methods=["POST"])
def recommend():
    skills = request.json["skills"]
    jobs = recommend_jobs(skills)
    return jsonify(jobs)

if __name__ == "__main__":
    app.run()


@app.route("/jobs")
def jobs():
    conn = get_connection()
    rows = conn.execute("SELECT title, location FROM jobs").fetchall()
    conn.close()
    return str(rows)

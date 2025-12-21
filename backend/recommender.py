import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from backend.db import get_connection

# Load jobs from CSV into database
def load_jobs_from_csv():
    conn = get_connection()
    cur = conn.cursor()

    df = pd.read_csv("data/jobs.csv")

    for _, row in df.iterrows():
        cur.execute("""
        INSERT OR IGNORE INTO jobs (id, title, company, location, skills)
        VALUES (?, ?, ?, ?, ?)
        """, (
            row.job_id,
            row.title,
            row.company,
            row.location,
            row.skills
        ))

    conn.commit()
    conn.close()

def recommend_jobs(user_skills, top_n=5):
    conn = get_connection()
    df = pd.read_sql("SELECT * FROM jobs", conn)
    conn.close()

    vectorizer = TfidfVectorizer()
    job_vectors = vectorizer.fit_transform(df["skills"])
    user_vector = vectorizer.transform([user_skills])

    scores = cosine_similarity(user_vector, job_vectors)[0]
    df["score"] = scores

    user_skill_set = set(user_skills.lower().split())

    results = []
    for _, row in df.sort_values("score", ascending=False).head(top_n).iterrows():
        job_skill_set = set(row["skills"].lower().split())
        matched = list(user_skill_set & job_skill_set)

        results.append({
            "title": row["title"],
            "company": row["company"],
            "location": row["location"],
            "skills": row["skills"],
            "score": float(row["score"]),
            "matched_skills": matched
        })

    return results

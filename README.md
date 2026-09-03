# Job Recommendation System 🚀

A full-stack **Job Recommendation System** that matches user skills with relevant job roles using **NLP-based similarity matching**.  
This project demonstrates **machine learning fundamentals, backend engineering, database design, and real-world deployment**.

🔗 **Live Demo:** https://n-puneeth.github.io/Job_Recommender/index.html  
🔗 **Backend API:** https://job-recommender-backend-ez6u.onrender.com  

## 📌 Motivation

Finding relevant jobs based on skills is a common real-world problem.  
This project was built to understand how **recommendation systems**, **text similarity**, and **backend APIs** work together in production.

The goal was not just model accuracy, but **end-to-end system design**:
- Data → ML Model → Backend → Frontend → Deployment


## ✨ Features

- 🔐 User Signup & Login
- 🧠 Skill-based Job Recommendations
- 📊 Explainable recommendations (matched skills + similarity score)
- 💾 SQL database for users and jobs
- 🌐 RESTful API backend
- 📱 Mobile-responsive frontend
- ☁️ Fully deployed (Frontend + Backend)

## 🧠 Machine Learning Approach

### Problem Type
Content-based recommendation using **text similarity**

### Technique Used
- **TF-IDF Vectorization** for skill representation
- **Cosine Similarity** to measure relevance between user skills and job requirements

### Why TF-IDF?
- Lightweight
- Interpretable
- Works well for short text (skills)
- No large dataset required

### Recommendation Flow
1. User enters skills (e.g., *Python, SQL, Flask*)
2. Job skill descriptions are vectorized using TF-IDF
3. Cosine similarity is computed
4. Top-N most relevant jobs are returned
5. Matched skills are shown for explainability

---

## 🏗️ System Architecture

Frontend (HTML/CSS/JS)   
|           
| REST API     
v    
Backend (Flask + Gunicorn)  
|   
v   
SQLite Database    
|      
v     
ML Recommender (TF-IDF + Cosine Similarity)    
   
## 🛠️ Tech Stack   

### Languages  
- Python
- JavaScript

### Backend
- Flask
- REST APIs
- Gunicorn
- SQLite

### Machine Learning
- Scikit-learn
- TF-IDF Vectorizer
- Cosine Similarity

### Frontend
- HTML
- CSS
- JavaScript

### Deployment
- Backend: **Render**
- Frontend: **GitHub Pages**

## 📂 Project Structure

Job_Recommender/    
├── backend/  
│ ├── app.py    
│ ├── db.py          
│ ├── recommender.py   
│ └── database.db   
├── data/        
│ └── jobs.csv                         
├── docs/ # Frontend (GitHub Pages)    
│ ├── index.html      
│ ├── dashboard.html      
│ ├── style.css     
│ ├── script.js      
│ └── img.png         
├── requirements.txt     
└── README.md    

⚙️ Local Setup

Follow these steps to run the project locally.

1️⃣ Clone the repository
git clone https://github.com/N-Puneeth/Job_Recommender.git
cd Job_Recommender

2️⃣ Create and activate a virtual environment
python -m venv venv


Windows

venv\Scripts\activate


Linux / macOS

source venv/bin/activate

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Run the backend server
python backend/app.py


The backend will be available at:

http://127.0.0.1:5000

5️⃣ Run the frontend

Open the following file directly in your browser:

docs/index.html

📈 Future Improvements

JWT-based authentication

Role and location-based job filtering

Advanced NLP models (Word2Vec / BERT)

Pagination and caching

Migration to a production-grade database (PostgreSQL)

🎯 Key Learnings

End-to-end machine learning system design

NLP-based similarity matching using TF-IDF and cosine similarity

RESTful API development with Flask

SQL schema design and database integration

Debugging real-world deployment issues

Differences between local and production environments

Constraints of static frontend hosting (GitHub Pages)

## 👨‍💻 Author                     
  Yarragunta venkata kartheek
  B Tech CSE Sastra university(2024-2028)
  Linkedin:https://www.linkedin.com/in/kartheek-yarragunta-14b767432/




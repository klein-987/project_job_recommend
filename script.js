const API = "https://job-recommender-backend-ez6u.onrender.com";

/* =====================================================
   AUTO LOGIN (ONLY ON LOGIN PAGE)
===================================================== */
if (window.location.pathname.includes("index.html")) {
  const user = localStorage.getItem("username");
  if (user) {
    window.location.href = "dashboard.html";
  }
}

/* =====================================================
   LOADER
===================================================== */
function showLoader() {
  document.getElementById("loader")?.classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader")?.classList.add("hidden");
}

/* =====================================================
   THEME (DARK / LIGHT)
===================================================== */
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

/* Load saved theme */
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

/* =====================================================
   TAB SWITCH (LOGIN / SIGNUP)
===================================================== */
function showLogin() {
  document.getElementById("loginForm")?.classList.remove("hidden");
  document.getElementById("signupForm")?.classList.add("hidden");
  document.getElementById("loginTab")?.classList.add("active");
  document.getElementById("signupTab")?.classList.remove("active");
}

function showSignup() {
  document.getElementById("signupForm")?.classList.remove("hidden");
  document.getElementById("loginForm")?.classList.add("hidden");
  document.getElementById("signupTab")?.classList.add("active");
  document.getElementById("loginTab")?.classList.remove("active");
}

/* =====================================================
   LOGIN
===================================================== */
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  showLoader();

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem("username", username);
      window.location.href = "dashboard.html";
    } else {
      alert(data.error || "Invalid credentials");
    }
  } catch (err) {
    alert("Server error. Please try again.");
    console.error(err);
  } finally {
    hideLoader(); // ✅ always hide once
  }
});

/* =====================================================
   SIGNUP
===================================================== */
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  showLoader();

  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful. Please login.");
      showLogin();
    } else {
      alert(data.error || "Signup failed");
    }
  } catch (err) {
    alert("Server error. Please try again.");
    console.error(err);
  } finally {
    hideLoader(); // ✅ always hide once
  }
});

/* =====================================================
   JOB RECOMMENDATION (DASHBOARD)
===================================================== */
function getJobs() {
  const skillsInput = document.getElementById("skills")?.value.trim();

  if (!skillsInput) {
    alert("Please enter skills");
    return;
  }

  showLoader();

  fetch(`${API}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skills: skillsInput })
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("results");
      container.innerHTML = "";

      if (!data || data.length === 0) {
        container.innerHTML = "<p>No jobs found</p>";
        return;
      }

      data.forEach(job => {
        container.innerHTML += `
          <div class="job-card">
            <h3>${job.title}</h3>
            <p><b>Company:</b> ${job.company}</p>
            <p><b>Skills:</b> ${job.skills}</p>
            <p class="score">Match Score: ${job.score.toFixed(2)}</p>
            <div class="explanation">
              Recommended because you know:
              <b>${job.matched_skills?.join(", ") || "Related skills"}</b>
            </div>
          </div>
        `;
      });
    })
    .catch(err => {
      alert("Failed to fetch job recommendations");
      console.error(err);
    })
    .finally(() => {
      hideLoader(); // ✅ only here
    });
}

/* =====================================================
   DASHBOARD USER DISPLAY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("username");
  const userSpan = document.getElementById("userName");

  if (user && userSpan) {
    userSpan.innerText = user;
  }
});

/* =====================================================
   LOGOUT
===================================================== */
function logout() {
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

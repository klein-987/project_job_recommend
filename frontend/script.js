const API = "http://127.0.0.1:5000";

/* ===== SIGNUP ===== */
function signup() {
    fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        message.innerText = data.message;
    });
}

/* ===== LOGIN ===== */
function login() {
    fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.location.href = "dashboard.html";
        } else {
            message.innerText = "Invalid credentials";
        }
    });
}

/* ===== GET JOBS ===== */
function getJobs() {
    const skillsInput = document.getElementById("skills").value.toLowerCase();
    const userSkills = skillsInput.split(" ");

    fetch(`${API}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsInput })
    })
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("results");
        container.innerHTML = "";

        data.forEach(job => {
            const jobSkills = job.skills.split(" ");
            const matched = jobSkills.filter(skill =>
                userSkills.includes(skill)
            );

            container.innerHTML += `
                <div class="job-card">
                    <h3>${job.title}</h3>
                    <p><b>Company:</b> ${job.company}</p>
                    <p><b>Required Skills:</b> ${job.skills}</p>
                    <p class="score">Match Score: ${job.score.toFixed(2)}</p>
                    <div class="explanation">
                        Recommended because you know: <b>${matched.join(", ") || "Related skills"}</b>
                    </div>
                </div>
            `;
        });
    });
}


/* ===== LOGOUT ===== */
function logout() {
    window.location.href = "index.html";
}

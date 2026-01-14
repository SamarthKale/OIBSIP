// ===============================
// Toast Notification
// ===============================
function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}


// ===============================
// Register User
// ===============================
function register() {
    let username = document.getElementById("regUser").value.trim();
    let password = document.getElementById("regPass").value.trim();

    if (!username || !password) {
        showToast("All fields are required!");
        return;
    }

    if (password.length < 4) {
        showToast("Password must be at least 4 characters!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username === username)) {
        showToast("User already exists!");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    showToast("Registration successful!");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}


// ===============================
// Login User
// ===============================
function login() {
    let username = document.getElementById("loginUser").value.trim();
    let password = document.getElementById("loginPass").value.trim();

    if (!username || !password) {
        showToast("All fields are required!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        showToast("Invalid username or password!");
        return;
    }

    localStorage.setItem("loggedInUser", username);
    showToast("Login successful!");

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500);
}


// ===============================
// Dashboard Protection
// ===============================
function checkAuth() {
    let user = localStorage.getItem("loggedInUser");

    if (!user) {
        window.location.href = "login.html";
    } else {
        let welcomeText = document.getElementById("welcomeText");
        if (welcomeText) {
            welcomeText.innerText = "Welcome, " + user + " 👋";
        }
    }
}


// ===============================
// Logout
// ===============================
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


// ===============================
// Home Page Authentication Check
// ===============================
function checkHomeAuth() {
    let user = localStorage.getItem("loggedInUser");

    if (user) {
        let homeTitle = document.getElementById("homeTitle");
        let homeDesc = document.getElementById("homeDesc");
        let homeButtons = document.getElementById("homeButtons");
        let dashboardButton = document.getElementById("dashboardButton");
        let navLinks = document.getElementById("navLinks");

        if (homeTitle) homeTitle.innerText = "Welcome Back, " + user + " 👋";
        if (homeDesc) homeDesc.innerText = "You are logged in. Access your dashboard below.";

        if (homeButtons) homeButtons.style.display = "none";
        if (dashboardButton) dashboardButton.style.display = "block";

        if (navLinks) {
            navLinks.innerHTML = `
                <a href="dashboard.html">Dashboard</a>
                <a href="#" onclick="logout()">Logout</a>
            `;
        }
    }
}

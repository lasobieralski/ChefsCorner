//login.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ login.js is running!"); // Check if script runs

    // Get elements
    const signInButton = document.getElementById("signInButton");
    const signInDropdown = document.getElementById("signInDropdown");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const loginFormContainer = document.getElementById("loginFormContainer");
    const signupFormContainer = document.getElementById("signupFormContainer");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // ✅ Toggle dropdown when clicking "Sign In"
    signInButton.addEventListener("click", (event) => {
        event.stopPropagation();
        signInDropdown.classList.toggle("active");
    });

    // ✅ Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!signInButton.contains(event.target) && !signInDropdown.contains(event.target)) {
            signInDropdown.classList.remove("active");
        }
    });

    // ✅ Show login form when "Sign In" is clicked
    loginBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        loginFormContainer.classList.remove("hidden"); // Show login form
        signupFormContainer.classList.add("hidden"); // Hide signup form
        signInDropdown.classList.remove("active"); // Close dropdown
    });

    // ✅ Show signup form when "Create Account" is clicked
    signupBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        signupFormContainer.classList.remove("hidden"); // Show signup form
        loginFormContainer.classList.add("hidden"); // Hide login form
        signInDropdown.classList.remove("active"); // Close dropdown
    });

    // ✅ Close forms when clicking outside
    document.addEventListener("click", (event) => {
        if (!loginFormContainer.contains(event.target) && !signupFormContainer.contains(event.target)) {
            loginFormContainer.classList.add("hidden");
            signupFormContainer.classList.add("hidden");
        }
    });

    // ✅ Handle login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        // 🔹 Fake user database stored in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            updateUI(username);
        } else {
            alert("Invalid login credentials.");
        }
    });

    // ✅ Handle signup
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("signup-username").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.username === username)) {
            alert("Username already exists.");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created! Please sign in.");
        signupFormContainer.classList.add("hidden"); // Hide signup form after successful registration
    });

    // ✅ Function to update UI after login
    function updateUI(username) {
        if (username) {
            signInButton.textContent = `Welcome, ${username}`;
            loginFormContainer.classList.add("hidden");
            signupFormContainer.classList.add("hidden");
        }
    }

    // ✅ Check login state on page load
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        updateUI(loggedInUser);
    }
});

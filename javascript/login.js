//login.js
document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");
    const signInDropdown = document.getElementById("signInDropdown");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const loginFormContainer = document.getElementById("loginFormContainer");
    const signupFormContainer = document.getElementById("signupFormContainer");

    // Toggle dropdown when clicking "Sign In"
    signInButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents the event from closing immediately
        signInDropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!signInButton.contains(event.target) && !signInDropdown.contains(event.target)) {
            signInDropdown.classList.remove("active");
        }
    });

    // Show login form
    loginBtn.addEventListener("click", () => {
        loginFormContainer.style.display = "block";
        signupFormContainer.style.display = "none";
        signInDropdown.classList.remove("active"); // Hide dropdown after clicking
    });

    // Show signup form
    signupBtn.addEventListener("click", () => {
        signupFormContainer.style.display = "block";
        loginFormContainer.style.display = "none";
        signInDropdown.classList.remove("active"); // Hide dropdown after clicking
    });
});

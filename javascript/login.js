// new login.js
import { waitForElement } from "./ui.js";
import { redirectToMyRecipes } from "./auth.js";

export function initLoginModal() {
  waitForElement("#signInButton", () => {
    const modal = document.getElementById("signInModal");
    const signInButton = document.getElementById("signInButton");
    const closeButton = document.querySelector(".close-button");
    const openSignupBtn = document.getElementById("openSignupForm");
    const signupContainer = document.getElementById("signupFormContainer");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const signupToggle = document.getElementById("signupToggle");
    const modalTitle = document.getElementById("modalTitle");
    const backToLoginButton = document.getElementById("backToLogin");

    // Back to login from signup form
    if (backToLoginButton) {
      backToLoginButton.addEventListener("click", () => {
        loginForm?.classList.remove("hidden");
        signupToggle?.classList.remove("hidden");
        signupContainer?.classList.add("hidden");
        modalTitle?.classList.remove("hidden");
        loginForm?.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Open modal
    signInButton?.addEventListener("click", () => {
      modal?.classList.add("open");
    });

    // Close modal
    closeButton?.addEventListener("click", () => {
      modal?.classList.remove("open");
      loginForm?.reset();
      signupForm?.reset();
      signupContainer?.classList.add("hidden");
      signupToggle?.classList.remove("hidden");
      loginForm?.classList.remove("hidden");
      modalTitle?.classList.remove("hidden");
    });

    // Click outside modal to close (optional)
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        loginForm?.reset();
        signupForm?.reset();
        signupContainer?.classList.add("hidden");
        signupToggle?.classList.remove("hidden");
        loginForm?.classList.remove("hidden");
        modalTitle?.classList.remove("hidden");
      }
    });

    // Switch to signup form
    openSignupBtn?.addEventListener("click", () => {
      loginForm?.classList.add("hidden");
      signupToggle?.classList.add("hidden");
      signupContainer?.classList.remove("hidden");
      modalTitle?.classList.add("hidden");
      signupContainer?.scrollIntoView({ behavior: "smooth" });
    });

    // Login form submit
    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (username && password) {
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
              return;
            }
          
            loginForm?.reset(); // ✅ clear login inputs
            modal?.classList.remove("open"); // ✅ close the modal
          
            localStorage.setItem("currentUser", username);
            redirectToMyRecipes();
          })
          
          
          .catch((err) => {
            console.error("Login error:", err);
            alert("Something went wrong. Try again.");
          });
      }
    });

    // Signup form submit
    signupForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("signup-username").value.trim();
      const password = document.getElementById("signup-password").value.trim();

      if (username && password) {
        fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
              return; // 👈 this is the missing part!
            }
            loginForm?.reset(); // ✅ clears input fields
            modal?.classList.remove("open"); // ✅ closes the modal
            localStorage.setItem("currentUser", username);
            redirectToMyRecipes();
          })
          
          .catch((err) => {
            console.error("Signup error:", err);
            alert("Something went wrong. Try again.");
          });
      }
    });
  });
}

initLoginModal();

// new login.js
import { waitForElement } from "./ui.js";

export function initLoginModal() {
  waitForElement("#signInButton", () => {
    const modal = document.getElementById("signInModal");
    const signInButton = document.getElementById("signInButton");
    const closeButton = document.querySelector(".close-button");
    const openSignupBtn = document.getElementById("openSignupForm");
    const signupContainer = document.getElementById("signupFormContainer");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    
    if (signInButton && modal) {
      signInButton.addEventListener("click", () => {
        modal.classList.add("open");
      });
    }

   
    if (closeButton && modal) {
      closeButton.addEventListener("click", () => {
        modal.classList.remove("open");
      });
    }

   
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    }

    
    if (openSignupBtn && signupContainer) {
      openSignupBtn.addEventListener("click", () => {
        signupContainer.classList.remove("hidden");
        openSignupBtn.style.display = "none"; // hide the Create Account button after click
      });
    }

    
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();

        if (username && password) {
          localStorage.setItem("currentUser", username);
          // window.location.href = "pages/myrecipes.html";
          const inPages = window.location.pathname.includes("/pages/");
          const redirectPath = inPages ? "myrecipes.html" : "pages/myrecipes.html";
          window.location.href = redirectPath;

        }
      });
    }

    
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("signup-username").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if (username && email && password) {
          localStorage.setItem("currentUser", username);
          window.location.href = "pages/myrecipes.html";
        }
      });
    }
  });
}


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

    if (backToLoginButton) {
      backToLoginButton.addEventListener("click", () => {
        if (loginForm) loginForm.classList.remove("hidden");
        if (signupToggle) signupToggle.classList.remove("hidden");
        if (signupContainer) signupContainer.classList.add("hidden");
        if (modalTitle) modalTitle.classList.remove("hidden");

        loginForm.scrollIntoView({ behavior: "smooth" });
      })
    }

    if (signInButton && modal) {
      signInButton.addEventListener("click", () => {
        modal.classList.add("open");
      });
    }

    if (closeButton && modal) {
      closeButton.addEventListener("click", () => {
        modal.classList.remove("open");
    
        // ✅ Reset all forms and views inside the modal
        loginForm?.reset();
        signupForm?.reset();
        
        // Optionally go back to the sign-in view if someone closes from sign-up
        signupContainer?.classList.add("hidden");
        signupToggle?.classList.remove("hidden");
        loginForm?.classList.remove("hidden");
        modalTitle?.classList.remove("hidden");
      });
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
          loginForm?.reset();
          signupForm?.reset();
          signupContainer?.classList.add("hidden");
          signupToggle?.classList.remove("hidden");
          loginForm?.classList.remove("hidden");
          modalTitle?.classList.remove("hidden");
        }
      });
    }

    if (openSignupBtn) {
      openSignupBtn.addEventListener("click", () => {
        const loginForm = document.getElementById("loginForm");
        const signupToggle = document.getElementById("signupToggle");
        const signupContainer = document.getElementById("signupFormContainer");
        const modalTitle = document.getElementById("modalTitle");
    
        if (loginForm) loginForm.classList.add("hidden");
        if (signupToggle) signupToggle.classList.add("hidden");
        if (signupContainer) signupContainer.classList.remove("hidden");
        if (modalTitle) modalTitle.classList.add("hidden"); // ✅ hide the old "Sign In" heading
    
        signupContainer.scrollIntoView({ behavior: "smooth" });
      });
    }
                
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();
    
        if (username && password) {
          localStorage.setItem("currentUser", username);
          redirectToMyRecipes(); 
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
          signupForm.reset();
          redirectToMyRecipes(); 
        }
      });
    }
  });
}

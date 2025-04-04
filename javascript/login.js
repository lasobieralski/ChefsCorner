// login.js
import { waitForElement } from "./ui.js";
import { redirectToMyRecipes, createAccount, loginWithPassword } from "./auth.js";

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

    backToLoginButton?.addEventListener("click", () => {
      loginForm?.classList.remove("hidden");
      signupToggle?.classList.remove("hidden");
      signupContainer?.classList.add("hidden");
      modalTitle?.classList.remove("hidden");

      loginForm?.scrollIntoView({ behavior: "smooth" });
    });

    signInButton?.addEventListener("click", () => {
      modal?.classList.add("open");
    });

    closeButton?.addEventListener("click", () => {
      modal?.classList.remove("open");
      loginForm?.reset();
      signupForm?.reset();
      signupContainer?.classList.add("hidden");
      signupToggle?.classList.remove("hidden");
      loginForm?.classList.remove("hidden");
      modalTitle?.classList.remove("hidden");
    });

    modal?.addEventListener("click", (e) => {
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

    openSignupBtn?.addEventListener("click", () => {
      loginForm?.classList.add("hidden");
      signupToggle?.classList.add("hidden");
      signupContainer?.classList.remove("hidden");
      modalTitle?.classList.add("hidden");
      signupContainer?.scrollIntoView({ behavior: "smooth" });
    });

    loginForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      try {
        await loginWithPassword(username, password);
        console.log("Stored users:", localStorage.getItem("users"));
        loginForm.reset();
        redirectToMyRecipes();
      } catch (err) {
        alert(err.message);
      }
    });

    signupForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("signup-username").value.trim();
      const email = document.getElementById("signup-email").value.trim(); // not stored
      const password = document.getElementById("signup-password").value.trim();

      try {
        await createAccount(username, password);
        signupForm.reset();
        redirectToMyRecipes();
      } catch (err) {
        alert(err.message);
      }
    });
  });
}

// new ccmain.js
export function initNavFeatures() {
  setupMenuToggle();     // Handles hamburger menu for small screens
  updateLoginUI();       // Updates nav based on login status
  setupLogoutButton();   // Adds click listener to log out
}

function setupMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

function updateLoginUI() {
  const signInButton = document.getElementById("signInButton");
  const logOutButton = document.getElementById("logOutButton");
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    if (signInButton) {
      signInButton.textContent = `Welcome, ${currentUser}`;
      signInButton.disabled = true;
    }
    if (logOutButton) {
      logOutButton.classList.remove("hidden");
    }
  } else {
    if (signInButton) {
      signInButton.textContent = "Sign In";
      signInButton.disabled = false;
    }
    if (logOutButton) {
      logOutButton.classList.add("hidden");
    }
  }
}

function setupLogoutButton() {
  const logOutButton = document.getElementById("logOutButton");

  if (logOutButton) {
    logOutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");

      // Redirect to homepage
      const inPagesFolder = window.location.pathname.includes("/pages/");
      window.location.href = inPagesFolder ? "../index.html" : "index.html";
    });
  }
}


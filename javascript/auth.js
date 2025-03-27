//auth.js file
// import { updateUI } from './ui.js';

// export function initAuth() {
//   const loginForm = document.getElementById('loginForm');
//   const signupForm = document.getElementById('signupForm');
//   const signupFormContainer = document.getElementById('signupFormContainer');
//   const modal = document.getElementById('signInModal');

  // Login
  // loginForm?.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   const username = document.getElementById('login-username').value;
  //   const password = document.getElementById('login-password').value;

  //   const users = JSON.parse(localStorage.getItem('users')) || [];
  //   const user = users.find(u => u.username === username && u.password === password);

  //   if (user) {
  //     localStorage.setItem('loggedInUser', username);
  //     updateUI(username);
  //     modal?.classList.add('hidden');
  //   } else {
  //     alert('Invalid login credentials');
  //   }
  // });

  // Signup
  // signupForm?.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   const username = document.getElementById('signup-username').value;
  //   const email = document.getElementById('signup-email').value;
  //   const password = document.getElementById('signup-password').value;

  //   let users = JSON.parse(localStorage.getItem('users')) || [];

  //   if (users.find(u => u.username === username)) {
  //     alert('Username already exists.');
  //     return;
  //   }

  //   users.push({ username, email, password });
  //   localStorage.setItem('users', JSON.stringify(users));
  //   alert('Account created! You can now log in.');
  //   signupFormContainer?.classList.add('hidden');
  // });

  // Auto login if already logged in
//   const loggedInUser = localStorage.getItem('loggedInUser');
//   if (loggedInUser) {
//     updateUI(loggedInUser);
//   }
// }
// new auth.js
// Reusable authentication utilities for login/logout/session

/**
 * 🔐 Returns the current logged-in username (or null if not logged in)
 */
export function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

/**
 * ✅ Checks if a user is currently logged in
 */
export function isLoggedIn() {
  return !!getCurrentUser();
}

/**
 * 🚪 Clears user login and optionally redirects
 */
export function logout(redirectTo = "index.html") {
  localStorage.removeItem("currentUser");

  // Adjust for /pages/ if needed
  const inPages = window.location.pathname.includes("/pages/");
  const redirectPath = inPages ? `../${redirectTo}` : redirectTo;

  window.location.href = redirectPath;
}

/**
 * 💾 Stores the logged-in user in localStorage
 */
export function saveUser(username) {
  localStorage.setItem("currentUser", username);
}

/**
 * 🔒 Protects a page — if no user is logged in, redirects
 */
export function requireAuth(redirectTo = "index.html") {
  if (!isLoggedIn()) {
    const inPages = window.location.pathname.includes("/pages/");
    const redirectPath = inPages ? `../${redirectTo}` : redirectTo;
    window.location.href = redirectPath;
  }
}

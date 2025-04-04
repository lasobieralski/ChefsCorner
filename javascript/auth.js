// auth.js

export async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

export function logout(redirectTo = "index.html") {
  localStorage.removeItem("currentUser");
  const inPages = window.location.pathname.includes("/pages/");
  const redirectPath = inPages ? `../${redirectTo}` : redirectTo;
  window.location.href = redirectPath;
}

export function requireAuth(redirectTo = "index.html") {
  if (!isLoggedIn()) {
    const inPages = window.location.pathname.includes("/pages/");
    const redirectPath = inPages ? `../${redirectTo}` : redirectTo;
    window.location.href = redirectPath;
  }
}

export function redirectToMyRecipes() {
  const inPages = window.location.pathname.includes("/pages/");
  const redirectPath = inPages ? "myrecipes.html" : "pages/myrecipes.html";
  window.location.href = redirectPath;
}

export async function createAccount(username, password) {
  const hashed = await hashPassword(password);

  const raw = localStorage.getItem("users");
  const users = raw ? JSON.parse(raw) : {};

  if (users[username]) {
    throw new Error("Username already exists.");
  }

  users[username] = hashed;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", username);
}

export async function loginWithPassword(username, password) {
  const hashed = await hashPassword(password);
  const raw = localStorage.getItem("users");
  const users = raw ? JSON.parse(raw) : {};

  if (!(username in users)) {
    throw new Error("Account not found. Please create an account.");
  }

  if (users[username] !== hashed) {
    throw new Error("Invalid password.");
  }

  localStorage.setItem("currentUser", username);
  return true;
}

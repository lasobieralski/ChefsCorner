//auth.js file
export function getCurrentUser() {
  return localStorage.getItem("currentUser");
}


export function isLoggedIn() {
  return !!getCurrentUser();
}


export function logout(redirectTo = "index.html") {
  localStorage.removeItem("currentUser");

  // Adjust for /pages/ if needed
  const inPages = window.location.pathname.includes("/pages/");
  const redirectPath = inPages ? `../${redirectTo}` : redirectTo;

  window.location.href = redirectPath;
}


export function saveUser(username) {
  localStorage.setItem("currentUser", username);
}


export function requireAuth(redirectTo = "index.html") {
  if (!isLoggedIn()) {
    const inPages = window.location.pathname.includes("/pages/");
    const redirectPath = inPages ? `../${redirectTo}` : redirectTo;
    window.location.href = redirectPath;
  }
}

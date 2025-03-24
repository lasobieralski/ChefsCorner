//ccmain.js
import { loadModal, initUI } from './ui.js';
import { initAuth } from './auth.js';

let recipes = []; // Store recipes globally

// ✅ Fetch recipes from JSON file
async function fetchRecipes() {
  try {
    const response = await fetch("../data/recipes.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    recipes = await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

// ✅ Get random number
function random(num) {
  return Math.floor(Math.random() * num);
}

// ✅ Get random recipe from list
function getRandomListEntry(list) {
  if (!Array.isArray(list) || list.length === 0) {
    console.error("❌ Error: No recipes available.");
    return null;
  }
  return list[random(list.length)];
}

// ✅ Render a random recipe
function renderRandomRecipe() {
  if (recipes.length === 0) {
    console.error("❌ No recipes loaded yet.");
    return;
  }
  const resultElement = document.querySelector("#result");
  if (!resultElement) {
    console.warn("🔸 Skipping render: #result element not found on this page.");
    return;
  }
  const randomRecipe = getRandomListEntry(recipes);
  if (!randomRecipe) return;

  document.querySelector("#result").innerHTML = `
    <figure class="recipe">
      <img src="${randomRecipe.image}" alt="Image of ${randomRecipe.name}" />
      <figcaption>
        <ul class="recipe__tags">
          ${randomRecipe.tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
        <a href="#">${randomRecipe.name}</a>
        <p class="recipe__description">${randomRecipe.description}</p>
      </figcaption>
    </figure>
  `;
}

// ✅ Handle nav recipe button click
function handleNavigationClick() {
  const navRecipeButton = document.querySelector("#navRecipeButton");
  if (!navRecipeButton) return;

  navRecipeButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderRandomRecipe();
  });
}

// ✅ Check if user is logged in
function checkUserLogin() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    console.log(`✅ Logged in as: ${loggedInUser}`);
    const signInButton = document.getElementById("signInButton");
    if (signInButton) signInButton.textContent = `Welcome, ${loggedInUser}`;
  } else {
    console.log("🔹 User is browsing as a guest.");
  }
}

// ✅ Initialize all functionality once DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  await loadModal();    // Load sign-in modal
  initUI();             // Modal UI behavior
  initAuth();           // Login/signup logic

  checkUserLogin();     // Update sign-in button if user is logged in

  await fetchRecipes(); // Get recipes from JSON
  renderRandomRecipe(); // Show random recipe
  handleNavigationClick(); // Hook up nav recipe button

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // 👇 This prints out whether the elements were found or not
  console.log("🧪 menuToggle found:", !!menuToggle);
  console.log("🧪 navLinks found:", !!navLinks);

  // 👇 Only run the toggle if both are found
  if (menuToggle && navLinks) {
    console.log("✅ Setting up mobile nav toggle");
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  } else {
    console.warn("❌ Could not find menu toggle or nav links on this page.");
  }

  
});

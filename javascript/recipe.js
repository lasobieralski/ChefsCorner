//new.recipe.js
import { saveUserRecipe } from "./storage.js";

let recipes = [];
let rotationInterval;
let rotationPaused = false;

// 🧠 Utility
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function getRecipeIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}
function attachResumeButtonListener() {
  const resumeBtn = document.getElementById("resume-rotation");
  if (resumeBtn) {
    resumeBtn.removeEventListener("click", resumeRotation); // Prevent duplicates
    resumeBtn.addEventListener("click", resumeRotation);
  }
}

document.addEventListener("DOMContentLoaded", init);

async function init() {
  console.log("✅ Initializing Recipes Page...");
  await fetchRecipes();

  const recipeId = getRecipeIdFromURL();
  if (recipeId) {
    const recipe = recipes.find(r => r.id == recipeId);
    if (recipe) openRecipeModal(recipes.indexOf(recipe), recipes);
    return;
  }

  const searchForm = document.querySelector("#search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", searchHandler);
  }

  attachResumeButtonListener();

}

async function fetchRecipes() {
  try {
    const res = await fetch("../data/recipes.json");
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    recipes = await res.json();

    const random = getRandomRecipe(recipes);
    renderRecipes([random]);
    setupCategoryFilters();
    startRotation();
  } catch (err) {
    console.error("❌ Error loading recipes:", err);
  }
}

function getRandomRecipe(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function pauseRotation() {
  rotationPaused = true;
  document.getElementById("resume-rotation")?.classList.remove("hidden");
}

function resumeRotation() {
  rotationPaused = false;
  document.getElementById("resume-rotation")?.classList.add("hidden");
  renderRecipes([getRandomRecipe(recipes)]);
}

function startRotation() {
  rotationInterval = setInterval(() => {
    if (!rotationPaused) {
      const newRandom = getRandomRecipe(recipes);
      fadeSwapRecipe(newRandom);
    }
  }, 30000);
}

function fadeSwapRecipe(recipe) {
  const container = document.querySelector("#recipe-list");
  if (!container) return;

  container.classList.remove("fade-in");
  container.classList.add("fade-out");

  setTimeout(() => {
    renderRecipes([recipe]);
    container.classList.remove("fade-out");
    container.classList.add("fade-in");
  }, 1000);
}

function searchHandler(e) {
  e.preventDefault();
  const input = document.querySelector("#search-bar");
  const query = input.value.toLowerCase().trim();

  if (!query) {
    resumeRotation();
    return;
  }

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.tags.some(tag => tag.toLowerCase().includes(query)) ||
    r.ingredients.some(ing => ing.toLowerCase().includes(query))
  );

  pauseRotation();
  renderRecipes(filtered);
  input.value = "";

  history.replaceState(null, "", "ccrecipes.html");
}

function setupCategoryFilters() {
  const buttons = document.querySelectorAll('#category-buttons .category-card');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category.toLowerCase();
      const filtered = recipes.filter(r =>
        r.tags.map(tag => tag.toLowerCase()).includes(category)
      );
      pauseRotation();
      renderRecipes(filtered);
      history.replaceState(null, "", "ccrecipes.html");
    });
  });
}

function renderRecipes(recipeList) {
  const output = document.querySelector("#recipe-list");
  if (!output) return;

  output.innerHTML = recipeList.map((r, i) => `
    <div class="recipe-card" data-index="${i}">
      <div class="recipe-summary">
        <img src="${r.image}" alt="Image of ${r.name}" />
        <h2>${r.name}</h2>
        <div class="recipe-tags">${r.tags.join(", ")}</div>
        ${getCurrentUser() ? `<button class="save-recipe" data-id="${r.id}">Save Recipe</button>` : ""}
        <a href="?id=${r.id}" class="view-link">View Details</a>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".recipe-card").forEach(card => {
    card.addEventListener("click", function (e) {
      if (e.target.classList.contains("save-recipe") || e.target.classList.contains("view-link")) return;
      openRecipeModal(this.dataset.index, recipeList);
    });
  });

  document.querySelectorAll(".save-recipe").forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = button.dataset.id;
      const recipe = recipes.find(r => r.id == id);
      if (recipe) {
        saveUserRecipe(recipe);
        alert("✅ Recipe saved!");
      }
    });
  });
}
// ✅ Reattach resume button listener after rendering — just once
attachResumeButtonListener();

function openRecipeModal(index, list) {
  index = Number(index);
  if (isNaN(index)) return;

  const recipe = list[index];
  const modal = document.getElementById("recipe-modal");
  const content = document.getElementById("modal-recipe-content");

  if (!modal || !content) return;

  content.innerHTML = `
    <button class="close-modal-button">&times;</button>
    <button class="print-button" title="Print Recipe">🖨️</button>
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="Image of ${recipe.name}">
    <div class="recipe-tags">${recipe.tags.join(", ")}</div>
    <p><strong>Servings:</strong> ${recipe.servings}</p>
    <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
    <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    <h3>Directions</h3>
    <ol>${recipe.directions.map(step => `<li>${step}</li>`).join("")}</ol>
  `;

  modal.classList.add("show");
  content.querySelector(".print-button").addEventListener("click", () => printRecipe(recipe));
  content.querySelector(".close-modal-button").addEventListener("click", () => {
    modal.classList.remove("show");
      // ✅ Reattach resume button listener after rendering
    attachResumeButtonListener();

  });
}
function printRecipe(recipe) {
  const printWindow = window.open("", "_blank", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>${recipe.name}</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Poppins', sans-serif; padding: 2rem; max-width: 800px; margin: auto; }
          .print-icon { text-align: right; margin-bottom: 1rem; }
          .print-icon button { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
          @media print { .print-icon { display: none; } }
        </style>
      </head>
      <body>
        <div class="print-icon">
          <button onclick="window.print()" title="Print Recipe">🖨️</button>
        </div>
        <h1>${recipe.name}</h1>
        <img src="${recipe.image}" alt="${recipe.name}" style="max-width:100%; height:auto;" />
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
        <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
        <p><strong>Tags:</strong> ${recipe.tags.join(", ")}</p>
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <h3>Directions</h3>
        <ol>${recipe.directions.map(step => `<li>${step}</li>`).join("")}</ol>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
}

window.addEventListener("click", e => {
  const modal = document.getElementById("recipe-modal");
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

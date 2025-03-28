import {
  getUserRecipes,
  updateUserRecipe,
  deleteUserRecipe,
  toggleFavorite
} from "./storage.js";

let savedRecipes = [];
let showFavoritesOnly = false;

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  savedRecipes = getUserRecipes();
  const recipeId = getRecipeIdFromURL();
  if (recipeId) {
    const recipe = savedRecipes.find(r => r.id == recipeId);
    if (recipe) openRecipeModal(savedRecipes.indexOf(recipe), savedRecipes);
  } else {
    renderRecipes(savedRecipes);
  }

  setupFilters();
  setupFavoritesToggle();
});

function getRecipeIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderRecipes(recipes) {
  const container = document.getElementById("recipeContainer");
  if (!container) return;

  const filtered = showFavoritesOnly
    ? recipes.filter(r => r.isFavorite)
    : recipes;

  container.innerHTML = filtered.map((recipe, index) => `
    <div class="recipe-card" data-index="${index}">
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p>${recipe.tags.join(", ")}</p>
      <div class="button-row">
        <button class="view-btn" data-id="${recipe.id}">View</button>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-id="${recipe.id}">Delete</button>
        <button class="fav-btn" data-id="${recipe.id}">${recipe.isFavorite ? "★" : "☆"}</button>
      </div>
    </div>
  `).join("");

  setupRecipeActions(filtered);
}

function setupRecipeActions(recipes) {
  document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      history.replaceState(null, "", `myrecipes.html?id=${id}`);
      const index = recipes.findIndex(r => r.id == id);
      openRecipeModal(index, recipes);
    });
  });

  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      openEditModal(savedRecipes[index]);
    });
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      deleteUserRecipe(id);
      savedRecipes = getUserRecipes();
      renderRecipes(savedRecipes);
    });
  });

  document.querySelectorAll(".fav-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      toggleFavorite(id);
      savedRecipes = getUserRecipes();
      renderRecipes(savedRecipes);
    });
  });
}

function openRecipeModal(index, list) {
  const recipe = list[index];
  const modal = document.getElementById("recipe-modal");
  const content = document.getElementById("modal-recipe-content");

  if (!modal || !content || !recipe) return;

  content.innerHTML = `
    <button class="close-modal-button">&times;</button>
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}">
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

  content.querySelector(".close-modal-button").addEventListener("click", () => {
    modal.classList.remove("show");
    history.replaceState(null, "", "myrecipes.html");
  });
}

function setupFilters() {
  const categorySelect = document.getElementById("filterCategory");
  const sortBySelect = document.getElementById("sortBy");

  if (categorySelect) {
    categorySelect.addEventListener("change", applyFilters);
  }

  if (sortBySelect) {
    sortBySelect.addEventListener("change", applyFilters);
  }
}

function applyFilters() {
  const category = document.getElementById("filterCategory").value;
  const sortBy = document.getElementById("sortBy").value;

  let filtered = [...savedRecipes];

  if (category !== "all") {
    filtered = filtered.filter(r =>
      r.tags.map(t => t.toLowerCase()).includes(category.toLowerCase())
    );
  }

  if (sortBy === "title") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "date") {
    filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  renderRecipes(filtered);
}

function setupFavoritesToggle() {
  const showAllBtn = document.getElementById("showAll");
  const showFavsBtn = document.getElementById("showFavorites");

  if (showAllBtn && showFavsBtn) {
    showAllBtn.addEventListener("click", () => {
      showFavoritesOnly = false;
      renderRecipes(savedRecipes);
    });

    showFavsBtn.addEventListener("click", () => {
      showFavoritesOnly = true;
      renderRecipes(savedRecipes);
    });
  }
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("recipe-modal");
  if (event.target === modal) {
    modal.classList.remove("show");
    history.replaceState(null, "", "myrecipes.html");
  }
});

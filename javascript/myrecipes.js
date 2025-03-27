//new myrecipes.js
import {
  getUserRecipes,
  updateUserRecipe,
  deleteUserRecipe,
  toggleFavorite,
  getFavoriteRecipes
} from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "../index.html";
    return;
  }

  setupFilters();
  setupFavoritesToggle();
  renderMyRecipes(getUserRecipes());
});

function renderMyRecipes(recipeList) {
  const container = document.getElementById("recipeContainer");
  if (!container) return;

  if (recipeList.length === 0) {
    container.innerHTML = `<p class="empty-message">No recipes saved yet.</p>`;
    return;
  }

  container.innerHTML = recipeList.map((r, i) => `
    <div class="recipe-card" data-index="${i}">
      <img src="${r.image}" alt="${r.name}">
      <h2>${r.name}</h2>
      <p><strong>Servings:</strong> ${r.servings}</p>
      <p class="recipe-tags">${r.tags.join(", ")}</p>
      <div class="button-row">
        <button class="view-btn" data-index="${i}">👁 View</button>
        <button class="edit-btn" data-id="${r.id}">✏️ Edit</button>
        <button class="fav-btn" data-id="${r.id}">${r.isFavorite ? "★" : "☆"}</button>
        <button class="delete-btn" data-id="${r.id}">🗑 Delete</button>
      </div>
    </div>
  `).join("");

  addCardListeners(recipeList);
}

function addCardListeners(recipes) {
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      openRecipeModal(recipes[index]);
    });
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = Number(btn.dataset.id);
      const recipe = getUserRecipes().find(r => r.id === id);
      openEditModal(recipe);
    });
  });

  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      toggleFavorite(Number(btn.dataset.id));
      renderMyRecipes(getUserRecipes());
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (confirm("Delete this recipe?")) {
        deleteUserRecipe(Number(btn.dataset.id));
        renderMyRecipes(getUserRecipes());
      }
    });
  });
}

function openRecipeModal(recipe) {
  const modal = document.getElementById("recipe-modal");
  const content = document.getElementById("modal-recipe-content");

  content.innerHTML = `
    <button class="close-modal-button">&times;</button>
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}">
    <p><strong>Servings:</strong> ${recipe.servings}</p>
    <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
    <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
    <p><strong>Tags:</strong> ${recipe.tags.join(", ")}</p>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    <h3>Directions</h3>
    <ol>${recipe.directions.map(s => `<li>${s}</li>`).join("")}</ol>
  `;
  modal.classList.add("show");

  content.querySelector(".close-modal-button").addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

function openEditModal(recipe) {
  const modal = document.getElementById("edit-recipe-modal");
  document.getElementById("edit-id").value = recipe.id;
  document.getElementById("edit-name").value = recipe.name;
  document.getElementById("edit-servings").value = recipe.servings;
  document.getElementById("edit-tags").value = recipe.tags.join(", ");
  document.getElementById("edit-prepTime").value = recipe.prepTime;
  document.getElementById("edit-cookTime").value = recipe.cookTime;
  document.getElementById("edit-ingredients").value = recipe.ingredients.join("\n");
  document.getElementById("edit-directions").value = recipe.directions.join("\n");
  document.getElementById("edit-recipe-form").dataset.image = recipe.image;

  modal.classList.add("show");
}

document.getElementById("edit-recipe-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const updated = {
    id: Number(document.getElementById("edit-id").value),
    name: document.getElementById("edit-name").value,
    servings: document.getElementById("edit-servings").value,
    prepTime: document.getElementById("edit-prepTime").value,
    cookTime: document.getElementById("edit-cookTime").value,
    tags: document.getElementById("edit-tags").value.split(",").map(t => t.trim()),
    ingredients: document.getElementById("edit-ingredients").value.split("\n"),
    directions: document.getElementById("edit-directions").value.split("\n"),
    isFavorite: getUserRecipes().find(r => r.id === Number(document.getElementById("edit-id").value))?.isFavorite || false,
  
    // ✅ Keep original image
    image: document.getElementById("edit-recipe-form").dataset.image
  };
  

  updateUserRecipe(updated);
  document.getElementById("edit-recipe-modal").classList.remove("show");
  renderMyRecipes(getUserRecipes());
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("show");
  }
});

function setupFilters() {
  document.getElementById("filterCategory").addEventListener("change", applyFilters);
  document.getElementById("sortBy").addEventListener("change", applyFilters);
}

function applyFilters() {
  const category = document.getElementById("filterCategory").value;
  const sort = document.getElementById("sortBy").value;
  let recipes = getUserRecipes();

  if (category !== "all") {
    recipes = recipes.filter(r => r.tags.includes(category));
  }

  if (sort === "title") {
    recipes.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderMyRecipes(recipes);
}

function setupFavoritesToggle() {
  document.getElementById("showAll").addEventListener("click", () => {
    renderMyRecipes(getUserRecipes());
  });
  document.getElementById("showFavorites").addEventListener("click", () => {
    renderMyRecipes(getFavoriteRecipes());
  });
}

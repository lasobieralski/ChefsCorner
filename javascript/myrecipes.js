//new myrecipes.js
import { waitForElement } from "./ui.js";
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
    const messageBox = document.getElementById("auth-message");
    if (messageBox) {
      messageBox.innerHTML = `
        <p>⚠️ Please sign in to have access to this page!</p>`;
      messageBox.classList.remove("hidden");
    }
    return; // ⛔ Stop loading recipes
  }

  savedRecipes = getUserRecipes();

  const recipeId = getRecipeIdFromURL();
  renderRecipes(savedRecipes);

  if (recipeId) {
    setTimeout(() => {
      const recipe = savedRecipes.find(r => r.id == recipeId);
      if (recipe) {
        const index = savedRecipes.indexOf(recipe);
        openRecipeModal(index, savedRecipes);
      }
    }, 100);
  }

  setupFilters();
  setupFavoritesToggle();
  setupEditForm();
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
        <button class="fav-btn" data-id="${recipe.id}">${recipe.isFavorite ? "❤️" : "🤍"}</button>

      </div>
      <div class="rating" data-id="${recipe.id}">
        ${[1, 2, 3, 4, 5].map(star => `
          <span class="star" data-rating="${star}">
            ${recipe.rating >= star ? "★" : "☆"}
          </span>`).join("")}
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
      console.log("Edit button clicked! Index:", index);
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
  document.querySelectorAll(".rating").forEach(ratingEl => {
    ratingEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("star")) {
        const recipeId = ratingEl.dataset.id;
        const newRating = parseInt(e.target.dataset.rating);
  
        const recipe = savedRecipes.find(r => r.id == recipeId);
        if (recipe) {
          recipe.rating = newRating;
          updateUserRecipe(recipe);
          savedRecipes = getUserRecipes();
          renderRecipes(savedRecipes);
        }
      }
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

function openEditModal(recipe) {
  document.getElementById("recipe-modal").classList.remove("show");

  const modal = document.getElementById("edit-recipe-modal");
  if (!modal || !recipe) return;

  document.getElementById("edit-id").value = recipe.id;
  document.getElementById("edit-name").value = recipe.name;
  document.getElementById("edit-servings").value = recipe.servings;
  document.getElementById("edit-tags").value = recipe.tags.join(", ");
  document.getElementById("edit-prepTime").value = recipe.prepTime;
  document.getElementById("edit-cookTime").value = recipe.cookTime;
  document.getElementById("edit-ingredients").value = recipe.ingredients.join("\n");
  document.getElementById("edit-directions").value = recipe.directions.join("\n");

  modal.classList.add("show"); // ✅ fix here
}

function setupEditForm() {
  waitForElement("#edit-recipe-form", () => {
    const form = document.getElementById("edit-recipe-form");

    document.querySelector("#edit-recipe-modal .close-modal-button").addEventListener("click", () => {
      document.getElementById("edit-recipe-modal").classList.remove("show");
    });
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const updated = {
        id: document.getElementById("edit-id").value,
        name: document.getElementById("edit-name").value.trim(),
        servings: document.getElementById("edit-servings").value.trim(),
        tags: document.getElementById("edit-tags").value.split(",").map(t => t.trim()),
        prepTime: document.getElementById("edit-prepTime").value.trim(),
        cookTime: document.getElementById("edit-cookTime").value.trim(),
        ingredients: document.getElementById("edit-ingredients").value.split("\n").map(i => i.trim()),
        directions: document.getElementById("edit-directions").value.split("\n").map(d => d.trim()),
        isFavorite: savedRecipes.find(r => String(r.id) === document.getElementById("edit-id").value)?.isFavorite || false
      };

      updateUserRecipe(updated);
      savedRecipes = getUserRecipes();
      renderRecipes(savedRecipes);
      document.getElementById("edit-recipe-modal").classList.add("hidden");
    });
  });
}

function setupFilters() {
  const categorySelect = document.getElementById("filterCategory");
  const sortBySelect = document.getElementById("sortBy");

  if (categorySelect) categorySelect.addEventListener("change", applyFilters);
  if (sortBySelect) sortBySelect.addEventListener("change", applyFilters);
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
document.getElementById("loadUserRecipesTest").addEventListener("click", () => {
  const user = localStorage.getItem("currentUser");
  const key = `recipes_${user}`;
  const recipes = JSON.parse(localStorage.getItem(key)) || [];
  console.log("✅ Loaded Recipes for", user, ":", recipes);

  if (recipes.length === 0) {
    alert("No recipes found for " + user);
  } else {
    renderRecipes(recipes);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    document.getElementById("auth-message").classList.remove("hidden");
    document.getElementById("auth-message").textContent = "⚠️ Please sign in.";
    return;
  }

  savedRecipes = getUserRecipes(); // This must return from localStorage key `recipes_<username>`
  renderRecipes(savedRecipes);
});

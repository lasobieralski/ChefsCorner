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
      messageBox.innerHTML = `<p>⚠️ Please sign in to have access to this page!</p>`;
      messageBox.classList.remove("hidden");
    }
    return;
  }

  savedRecipes = getUserRecipes();
  renderRecipes(savedRecipes);

  const recipeId = getRecipeIdFromURL();
  if (recipeId) {
    setTimeout(() => {
      const recipe = savedRecipes.find(r => r.id == recipeId);
      if (recipe) {
        openRecipeModal(savedRecipes.indexOf(recipe), savedRecipes);
      }
    }, 100);
  }

  setupFilters();
  setupFavoritesToggle();
  setupEditForm();
  setupTestLoader();
});

function getRecipeIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderRecipes(recipes) {
  const container = document.getElementById("recipeContainer");
  if (!container) return;

  const filtered = showFavoritesOnly ? recipes.filter(r => r.isFavorite) : recipes;

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
  document.querySelectorAll(".view-btn").forEach(button =>
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      history.replaceState(null, "", `myrecipes.html?id=${id}`);
      openRecipeModal(recipes.findIndex(r => r.id == id), recipes);
    })
  );

  document.querySelectorAll(".edit-btn").forEach(button =>
    button.addEventListener("click", () => {
      openEditModal(savedRecipes[button.dataset.index]);
    })
  );

  document.querySelectorAll(".delete-btn").forEach(button =>
    button.addEventListener("click", () => {
      deleteUserRecipe(button.dataset.id);
      savedRecipes = getUserRecipes();
      renderRecipes(savedRecipes);
    })
  );

  document.querySelectorAll(".fav-btn").forEach(button =>
    button.addEventListener("click", () => {
      toggleFavorite(button.dataset.id);
      savedRecipes = getUserRecipes();
      renderRecipes(savedRecipes);
    })
  );

  document.querySelectorAll(".rating").forEach(ratingEl =>
    ratingEl.addEventListener("click", (e) => {
      if (!e.target.classList.contains("star")) return;
      const recipeId = ratingEl.dataset.id;
      const newRating = parseInt(e.target.dataset.rating);
      if (isNaN(newRating)) return;

      const recipe = savedRecipes.find(r => r.id == recipeId);
      if (recipe) {
        recipe.rating = newRating;
        updateUserRecipe(recipe);
        savedRecipes = getUserRecipes();
        renderRecipes(savedRecipes);
      }
    })
  );
}

function openRecipeModal(index, list) {
  const recipe = list[index];
  const modal = document.getElementById("recipe-modal");
  const content = document.getElementById("modal-recipe-content");
  if (!modal || !content || !recipe) return;

  content.innerHTML = `
    <button class="close-modal-button">&times;</button>
    <button class="print-button" title="Print Recipe">🖨️</button>
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

  content.querySelector(".print-button").addEventListener("click", () => printRecipe(recipe));
  content.querySelector(".close-modal-button").addEventListener("click", () => {
    modal.classList.remove("show");
    history.replaceState(null, "", "myrecipes.html");
  });

  modal.classList.add("show");
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

function openEditModal(recipe) {
  const modal = document.getElementById("edit-recipe-modal");
  if (!modal || !recipe) return;

  document.getElementById("recipe-modal").classList.remove("show");
  document.getElementById("edit-id").value = recipe.id;
  document.getElementById("edit-name").value = recipe.name;
  document.getElementById("edit-servings").value = recipe.servings;
  document.getElementById("edit-tags").value = recipe.tags.join(", ");
  document.getElementById("edit-prepTime").value = recipe.prepTime;
  document.getElementById("edit-cookTime").value = recipe.cookTime;
  document.getElementById("edit-ingredients").value = recipe.ingredients.join("\n");
  document.getElementById("edit-directions").value = recipe.directions.join("\n");

  modal.classList.add("show");
}

function setupEditForm() {
  waitForElement("#edit-recipe-form", () => {
    const form = document.getElementById("edit-recipe-form");
    const closeBtn = document.querySelector("#edit-recipe-modal .close-modal-button");
    closeBtn.addEventListener("click", () => {
      document.getElementById("edit-recipe-modal").classList.remove("show");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("edit-id").value;
      const existing = savedRecipes.find(r => String(r.id) === id);
      const imageInput = document.getElementById("edit-image");

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      let imageBase64 = existing?.image || "images/default-recipe.jpg";
      if (imageInput.files.length > 0) {
        imageBase64 = await toBase64(imageInput.files[0]);
      }

      const updated = {
        ...existing,
        id,
        name: document.getElementById("edit-name").value.trim(),
        servings: document.getElementById("edit-servings").value.trim(),
        tags: document.getElementById("edit-tags").value.split(",").map(t => t.trim()),
        prepTime: document.getElementById("edit-prepTime").value.trim(),
        cookTime: document.getElementById("edit-cookTime").value.trim(),
        ingredients: document.getElementById("edit-ingredients").value.split("\n").map(i => i.trim()),
        directions: document.getElementById("edit-directions").value.split("\n").map(d => d.trim()),
        image: imageBase64,
        date: existing?.date || new Date().toISOString()
      };

      updateUserRecipe(updated);
      savedRecipes = getUserRecipes();
      renderRecipes(savedRecipes);
      document.getElementById("edit-recipe-modal").classList.remove("show");
    });
  });
}

function setupFilters() {
  document.getElementById("filterCategory")?.addEventListener("change", applyFilters);
  document.getElementById("sortBy")?.addEventListener("change", applyFilters);
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
  document.getElementById("showAll")?.addEventListener("click", () => {
    showFavoritesOnly = false;
    renderRecipes(savedRecipes);
  });

  document.getElementById("showFavorites")?.addEventListener("click", () => {
    showFavoritesOnly = true;
    renderRecipes(savedRecipes);
  });
}

function setupTestLoader() {
  const loadBtn = document.getElementById("loadUserRecipesTest");
  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
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
  }
}

// Close modal on outside click
window.addEventListener("click", (event) => {
  const modal = document.getElementById("recipe-modal");
  if (event.target === modal) {
    modal.classList.remove("show");
    history.replaceState(null, "", "myrecipes.html");
  }
});

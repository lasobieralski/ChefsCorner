//new myrecipes.js
// Displays the logged-in user's saved, favorite, and rated recipes

import {
    getCurrentUser,
    requireAuth
  } from "./auth.js";
  
  import {
    getUserRecipes,
    saveUserRecipe,
    deleteUserRecipe
  } from "./storage.js";
  
  let allRecipes = [];
  let savedRecipes = [];
  let showFavoritesOnly = false;
  
  document.addEventListener("DOMContentLoaded", () => {
    requireAuth(); // 🔐 Redirect if not logged in
    loadRecipes();
    setupFilters();
    setupFavoritesToggle();
  });
  
  /**
   * 📦 Load all recipes and saved ones for current user
   */
  async function loadRecipes() {
    try {
      const res = await fetch("../data/recipes.json");
      allRecipes = await res.json();
      savedRecipes = getUserRecipes();
      renderRecipes(savedRecipes);
    } catch (err) {
      console.error("Error loading recipes:", err);
    }
  }
  
  /**
   * 🎨 Render recipe cards (with delete, favorite, and rating)
   */
  function renderRecipes(recipes) {
    const container = document.getElementById("recipeContainer");
    if (!container) return;
  
    const filtered = showFavoritesOnly
      ? recipes.filter(r => r.favorite)
      : recipes;
  
    container.innerHTML = filtered
      .map(recipe => `
        <div class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>${recipe.tags.join(", ")}</p>
          <p>Prep: ${recipe.prepTime} mins | Cook: ${recipe.cookTime} mins</p>
          <button class="fav-btn">${recipe.favorite ? "★" : "☆"} Favorite</button>
          <button class="delete-btn" data-id="${recipe.id}">🗑️ Delete</button>
  
          <label for="rating-${recipe.id}">Your Rating:</label>
          <select class="rating-select" data-id="${recipe.id}" id="rating-${recipe.id}">
            <option value="0" ${!recipe.rating ? "selected" : ""}>Rate</option>
            ${[1, 2, 3, 4, 5]
              .map(num => `<option value="${num}" ${recipe.rating == num ? "selected" : ""}>${num} ★</option>`)
              .join("")}
          </select>
        </div>
      `)
      .join("");
  
    setupFavoriteToggles(filtered);
    setupRatingDropdowns(filtered);
    setupDeleteButtons(filtered);
    setupExportButton();
  }
  
  /**
   * ❤️ Toggle favorite and save update
   */
  function setupFavoriteToggles(recipes) {
    const favButtons = document.querySelectorAll(".fav-btn");
  
    favButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        recipes[index].favorite = !recipes[index].favorite;
        saveUserRecipe(recipes[index]);
        renderRecipes(savedRecipes); // Re-render
      });
    });
  }
  
  /**
   * ⭐ Save recipe rating
   */
  function setupRatingDropdowns(recipes) {
    const selects = document.querySelectorAll(".rating-select");
  
    selects.forEach(select => {
      select.addEventListener("change", () => {
        const id = select.dataset.id;
        const newRating = +select.value;
        const updatedRecipe = recipes.find(r => r.id == id);
  
        if (updatedRecipe) {
          updatedRecipe.rating = newRating;
          saveUserRecipe(updatedRecipe);
          renderRecipes(savedRecipes);
        }
      });
    });
  }
  
  /**
   * 🗑️ Delete a saved recipe
   */
  function setupDeleteButtons(recipes) {
    const deleteButtons = document.querySelectorAll(".delete-btn");
  
    deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const recipeId = button.dataset.id;
        deleteUserRecipe(recipeId);
        savedRecipes = getUserRecipes(); // Refresh saved list
        renderRecipes(savedRecipes);
      });
    });
  }
  
  /**
   * 🎯 Setup category and sort dropdowns
   */
  function setupFilters() {
    const filterCategory = document.getElementById("filterCategory");
    const sortBy = document.getElementById("sortBy");
  
    if (filterCategory) {
      filterCategory.addEventListener("change", applyFilters);
    }
  
    if (sortBy) {
      sortBy.addEventListener("change", applyFilters);
    }
  }
  
  /**
   * 🧠 Apply filters and sorting
   */
  function applyFilters() {
    const category = document.getElementById("filterCategory").value;
    const sortBy = document.getElementById("sortBy").value;
  
    let filtered = [...savedRecipes];
  
    if (category !== "all") {
      filtered = filtered.filter(recipe =>
        recipe.tags.includes(category)
      );
    }
  
    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  
    renderRecipes(filtered);
  }
  
  /**
   * ⭐ Toggle between all recipes and favorites only
   */
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
  function setupExportButton() {
    const exportBtn = document.getElementById("exportRecipes");
  
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const recipes = getUserRecipes();
        if (recipes.length === 0) {
          alert("You have no saved recipes to export.");
          return;
        }
  
        const text = recipes.map(r =>
          `🍽️ Title: ${r.title}\n` +
          `📎 Tags: ${r.tags.join(", ")}\n` +
          `⏱️ Prep: ${r.prepTime} mins | Cook: ${r.cookTime} mins\n` +
          `👤 Servings: ${r.servings}\n` +
          `\n🧂 Ingredients:\n${r.ingredients.join("\n")}\n` +
          `\n📝 Directions:\n${r.directions}\n` +
          `\n⭐ Favorite: ${r.favorite ? "Yes" : "No"}\n` +
          `⭐ Rating: ${r.rating || "Not rated"}\n` +
          `\n------------------------\n`
        ).join("\n");
  
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "my_recipes.txt";
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  }
  
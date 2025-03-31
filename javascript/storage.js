// new storage.js
// Handles saving and retrieving recipes from localStorage
// Get the currently signed-in user
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

// Get the storage key for the current user
function getUserStorageKey() {
  const user = getCurrentUser();
  return user ? `userRecipes_${user}` : null;
}

// Get all recipes saved by the current user
export function getUserRecipes() {
  const key = getUserStorageKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Save a new recipe for the current user
export function saveUserRecipe(recipe) {
  const key = getUserStorageKey();
  if (!key) return;

  const recipes = getUserRecipes();
  recipes.push(recipe);
  localStorage.setItem(key, JSON.stringify(recipes));
}

// Update a recipe by ID
export function updateUserRecipe(updatedRecipe) {
  const key = getUserStorageKey();
  if (!key) return;

  let recipes = getUserRecipes();
  const index = recipes.findIndex(r => String(r.id) === String(updatedRecipe.id));
  if (index !== -1) {
    recipes[index] = updatedRecipe;
    localStorage.setItem(key, JSON.stringify(recipes));
  }
}

// Delete a recipe by ID
export function deleteUserRecipe(recipeId) {
  const key = getUserStorageKey();
  if (!key) return;

  let recipes = getUserRecipes();
  recipes = recipes.filter(r => String(r.id) !== String(recipeId));
  localStorage.setItem(key, JSON.stringify(recipes));
}

// Toggle favorite for a recipe by ID
export function toggleFavorite(recipeId) {
  const key = getUserStorageKey();
  if (!key) return;

  let recipes = getUserRecipes();
  const recipe = recipes.find(r => String(r.id) === String(recipeId));
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    localStorage.setItem(key, JSON.stringify(recipes));
  }
}

// Get favorite recipes only
export function getFavoriteRecipes() {
  return getUserRecipes().filter(r => r.isFavorite);
}


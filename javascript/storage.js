// new storage.js
// Handles saving and retrieving recipes from localStorage

// Get the currently signed-in user
function getCurrentUser() {
    return localStorage.getItem("currentUser");
  }
  
  // Get the localStorage key for the current user
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
  
  // Save a new recipe for the user
  export function saveUserRecipe(recipe) {
  const key = getUserStorageKey();
  if (!key) return;
  
  const recipes = getUserRecipes();
  recipes.push(recipe);
  localStorage.setItem(key, JSON.stringify(recipes));
  }
  
  // Update an existing recipe by ID
  export function updateUserRecipe(updatedRecipe) {
  const key = getUserStorageKey();
  if (!key) return;
  
  let recipes = getUserRecipes();
  const index = recipes.findIndex(r => r.id === updatedRecipe.id);
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
  recipes = recipes.filter(r => r.id !== recipeId);
  localStorage.setItem(key, JSON.stringify(recipes));
  }
  
  // Toggle favorite on a recipe by ID
  export function toggleFavorite(recipeId) {
  const key = getUserStorageKey();
  if (!key) return;
  
  let recipes = getUserRecipes();
  const recipe = recipes.find(r => r.id === recipeId);
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    localStorage.setItem(key, JSON.stringify(recipes));
  }
  }
  
  // Get only favorite recipes
  export function getFavoriteRecipes() {
  return getUserRecipes().filter(r => r.isFavorite);
  }
  
  export function deleteUserRecipe(username, recipeId) {
  const data = JSON.parse(localStorage.getItem("savedRecipes")) || {};
  const userRecipes = data[username] || [];
  
  const updated = userRecipes.filter(r => r.id !== recipeId);
  data[username] = updated;
  localStorage.setItem("savedRecipes", JSON.stringify(data));
  }
  
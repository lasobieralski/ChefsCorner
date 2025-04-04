/*new ui.js*/
export function renderRecipes(recipes, containerId = "recipe-list") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = recipes
    .map(recipe => `
      <div class="recipe-card" data-id="${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.tags.join(", ")}</p>
      </div>
    `)
    .join("");

  setupRecipeListeners(recipes);
}

export function setupRecipeListeners(recipes) {
  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const recipe = recipes.find(r => r.id == id);
      if (recipe) showRecipeModal(recipe);
    });
  });
}

export function showRecipeModal(recipe) {
  const modal = document.getElementById("recipe-modal");
  const content = document.getElementById("modal-recipe-content");

  if (!modal || !content) return;

  content.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}">
    <p><strong>Tags:</strong> ${recipe.tags.join(", ")}</p>
    <p><strong>Servings:</strong> ${recipe.servings}</p>
    <p><strong>Prep Time:</strong> ${recipe.prepTime} mins</p>
    <p><strong>Cook Time:</strong> ${recipe.cookTime} mins</p>
    <h3>Ingredients:</h3>
    <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
    <h3>Directions:</h3>
    <p>${recipe.directions}</p>
  `;

  modal.classList.remove("hidden");

  // Close modal on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
  });
}


export function resetUI(containerId = "recipe-list") {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<p>No recipes to show.</p>`;
  }
}


export function waitForElement(selector, callback) {
  const checkExist = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(checkExist);
      callback(el);
    }
  }, 100);
}

//recipe.js file
// let recipes = [];
// let rotationInterval;
// let rotationPaused = false;

// async function fetchRecipes() {
//     try {
//         const response = await fetch("../data/recipes.json");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         recipes = await response.json();

//         const params = new URLSearchParams(window.location.search);
//         const categoryFromURL = params.get("category");

//         if (categoryFromURL) {
//             const filtered = recipes.filter(recipe =>
//                 recipe.tags.some(tag => tag.toLowerCase() === categoryFromURL.toLowerCase())
//             );
//             pauseRotation();
//             renderRecipes(filtered);
//         } else {
//             const randomRecipe = getRandomRecipe(recipes);
//             renderRecipes([randomRecipe]);
//         }

//         setupCategoryFilters();
//         startRotation();

//     } catch(error) {
//         console.error("Error fetching recipes:", error);
//     }
// }

// function getRandomRecipe(list) {
//     const index = Math.floor(Math.random() * list.length);
//     return list[index];
// }

// function pauseRotation() {
//     rotationPaused = true;
//     const resumeBtn = document.getElementById("resume-rotation");
//     if (resumeBtn) resumeBtn.classList.remove("hidden");
// }

// function resumeRotation() {
//     rotationPaused = false;
//     const resumeBtn = document.getElementById("resume-rotation");
//     if (resumeBtn) resumeBtn.classList.add("hidden");

//     const randomRecipe = getRandomRecipe(recipes);
//     renderRecipes([randomRecipe]);
// }

// // ⏱ Rotate random recipe every 30s
// function startRotation() {
//     rotationInterval = setInterval(() => {
//         if (!rotationPaused) {
//             const newRandom = getRandomRecipe(recipes);
//             fadeSwapRecipe(newRandom);
//         }
//     }, 30000);
// }

// function fadeSwapRecipe(recipe) {
//     const container = document.querySelector("#recipe-list");
//     if (!container) return;

//     container.classList.remove("fade-in");
//     container.classList.add("fade-out");

//     setTimeout(() => {
//         renderRecipes([recipe]);
//         container.classList.remove("fade-out");
//         container.classList.add("fade-in");
//     }, 1000); // wait for fade-out to finish
// }

// function setupCategoryFilters() {
//     const buttons = document.querySelectorAll('#category-buttons .category-card');

//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             const category = button.dataset.category.toLowerCase();
//             // redirect to category-filtered page
//             window.location.href = `ccrecipes.html?category=${encodeURIComponent(category)}`;
//         });
//     });
// }

// function tagsTemplate(tags) {
//     return `<p class="tag-list">${tags.join(", ")}</p>`;
// }

// function renderRecipes(recipeList) {
//     const outputElement = document.querySelector("#recipe-list");

//     if (!outputElement) {
//         console.error("❌ ERROR: #recipe-list not found!");
//         return;
//     }

//     outputElement.innerHTML = recipeList.map((recipe, index) => `
//         <div class="recipe-card" data-index="${index}">
//             <div class="recipe-summary">
//                 <img src="${recipe.image}" alt="Image of ${recipe.name}" />
//                 <h2>${recipe.name}</h2>
//                 <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
//             </div>
//         </div>
//     `).join("");

//     document.querySelectorAll(".recipe-card").forEach(card => {
//         card.addEventListener("click", function () {
//             const index = this.getAttribute("data-index");
//             openRecipeModal(index, recipeList);
//         });
//     });
// }

// function filterRecipes(query) {
//     query = query.toLowerCase().trim();
//     return recipes.filter(recipe =>
//         recipe.name.toLowerCase().includes(query) ||
//         recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
//         recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
//     );
// }

// function searchHandler(event) {
//     event.preventDefault();
//     const searchInput = document.querySelector("#search-bar").value.toLowerCase().trim();

//     if (!searchInput) {
//         rotationPaused = false;
//         const randomRecipe = getRandomRecipe(recipes);
//         renderRecipes([randomRecipe]);
//         return;
//     }

//     const filtered = filterRecipes(searchInput);
//     pauseRotation();
//     // rotationPaused = true;
//     renderRecipes(filtered);
// }

// function openRecipeModal(index, recipeList) {
//     index = Number(index);
//     if (isNaN(index) || index < 0 || index >= recipeList.length) {
//         console.error("❌ Invalid recipe index:", index);
//         return;
//     }

//     const recipe = recipeList[index];
//     const modal = document.getElementById("recipe-modal");
//     const modalContent = document.getElementById("modal-recipe-content");

//     if (!modal || !modalContent) {
//         console.error("❌ Modal elements not found!");
//         return;
//     }

//     // modalContent.innerHTML = `
//     //     <h2>${recipe.name}</h2>
//     //     <img src="${recipe.image}" alt="Image of ${recipe.name}">
//     //     <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
//     //     <p><strong>Servings:</strong> ${recipe.servings}</p>
//     //     <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
//     //     <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
//     //     <h3>Ingredients</h3>
//     //     <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
//     //     <h3>Directions</h3>
//     //     <ol>${recipe.directions.map(step => `<li>${step}</li>`).join("")}</ol>
//     // `;
//     modalContent.innerHTML = `
//     <button class="close-modal-button">&times;</button>
//     <h2>${recipe.name}</h2>
//     <img src="${recipe.image}" alt="Image of ${recipe.name}">
//     <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
//     <p><strong>Servings:</strong> ${recipe.servings}</p>
//     <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
//     <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
//     <h3>Ingredients</h3>
//     <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
//     <h3>Directions</h3>
//     <ol>${recipe.directions.map(step => `<li>${step}</li>`).join("")}</ol>
// `;

//     modal.classList.add("show");
//      // Add event to close button
//     const closeBtn = modalContent.querySelector(".close-modal-button");
//     if (closeBtn) {
//         closeBtn.addEventListener("click", () => {
//             modal.classList.remove("show");
//         });
//     }

// }

// window.addEventListener("click", (event) => {
//     const modal = document.getElementById("recipe-modal");
//     if (event.target === modal) {
//         modal.classList.remove("show");
//     }
// });

// function init() {
//     fetchRecipes();

//     const searchForm = document.querySelector("#search-form");
//     if (searchForm) {
//         searchForm.addEventListener("submit", searchHandler);
//     } else {
//         console.error("❌ ERROR: search-form NOT FOUND in the DOM!");
//     }
    
//     const resumeBtn = document.getElementById("resume-rotation");
//     if (resumeBtn) {
//         resumeBtn.addEventListener("click", resumeRotation);
//     }
// }

// document.addEventListener("DOMContentLoaded", init);

let allRecipes = [];

document.addEventListener("DOMContentLoaded", () => {
  loadRecipes();
  setupSearch();
  setupCategoryFilters();
});

/**
 * 📦 Fetch and render all recipes
 */
async function loadRecipes() {
  try {
    const res = await fetch("../data/recipes.json");
    allRecipes = await res.json();
    renderRecipes(allRecipes);
  } catch (err) {
    console.error("Error loading recipes:", err);
  }
}

/**
 * 🎨 Render recipe cards in #recipe-list
 */
function renderRecipes(recipes) {
  const container = document.getElementById("recipe-list");
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

  setupRecipeListeners();
}

/**
 * 🔍 Setup search bar filtering
 */
function setupSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-bar");

  if (form && input) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const query = input.value.toLowerCase();
      const filtered = allRecipes.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.tags.join(" ").toLowerCase().includes(query)
      );
      renderRecipes(filtered);
    });
  }
}

/**
 * 🍳 Filter recipes by category buttons
 */
function setupCategoryFilters() {
  const buttons = document.querySelectorAll(".category-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      const filtered = allRecipes.filter(recipe =>
        recipe.tags.includes(category)
      );
      renderRecipes(filtered);
    });
  });
}

/**
 * 🧾 Handle recipe card clicks to open modal
 */
function setupRecipeListeners() {
  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const recipe = allRecipes.find(r => r.id == id);
      if (recipe) showRecipeModal(recipe);
    });
  });
}

/**
 * 💡 Populate modal with full recipe details
 */
function showRecipeModal(recipe) {
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

  // Optional: close modal on background click or Esc key
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
  });
}

//new.recipe.js
//recipe.js file
let recipes = [];
let rotationInterval;
let rotationPaused = false;

async function fetchRecipes() {
    try {
        const response = await fetch("../data/recipes.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        recipes = await response.json();

        const randomRecipe = getRandomRecipe(recipes);
        renderRecipes([randomRecipe]);

        setupCategoryFilters();
        startRotation(); // ⏱ Start rotating random recipe
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function getRandomRecipe(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}
function pauseRotation() {
    rotationPaused = true;
    const resumeBtn = document.getElementById("resume-rotation");
    if (resumeBtn) resumeBtn.classList.remove("hidden");
}

function resumeRotation() {
    rotationPaused = false;
    const resumeBtn = document.getElementById("resume-rotation");
    if (resumeBtn) resumeBtn.classList.add("hidden");

    const randomRecipe = getRandomRecipe(recipes);
    renderRecipes([randomRecipe]);
}

// ⏱ Rotate random recipe every 30s
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
    }, 1000); // wait for fade-out to finish
}

function setupCategoryFilters() {
    // const buttons = document.querySelectorAll('#category-buttons button');
    const buttons = document.querySelectorAll('#category-buttons .category-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category.toLowerCase();
            const filtered = recipes.filter(recipe =>
                recipe.tags.map(tag => tag.toLowerCase()).includes(category)
            );
            // rotationPaused = true;
            pauseRotation();
            renderRecipes(filtered);
        });
    });
}

function tagsTemplate(tags) {
    return `<p class="tag-list">${tags.join(", ")}</p>`;
}

function renderRecipes(recipeList) {
    const outputElement = document.querySelector("#recipe-list");

    if (!outputElement) {
        console.error("❌ ERROR: #recipe-list not found!");
        return;
    }

    outputElement.innerHTML = recipeList.map((recipe, index) => `
        <div class="recipe-card" data-index="${index}">
            <div class="recipe-summary">
                <img src="${recipe.image}" alt="Image of ${recipe.name}" />
                <h2>${recipe.name}</h2>
                <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".recipe-card").forEach(card => {
        card.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            openRecipeModal(index, recipeList);
        });
    });
}

function filterRecipes(query) {
    query = query.toLowerCase().trim();
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
    );
}

function searchHandler(event) {
  event.preventDefault();

  const inputEl = document.querySelector("#search-bar");
  const searchInput = inputEl.value.toLowerCase().trim();

  if (!searchInput) {
    rotationPaused = false;
    const randomRecipe = getRandomRecipe(recipes);
    renderRecipes([randomRecipe]);
    return;
  }

  const filtered = filterRecipes(searchInput);
  pauseRotation();
  renderRecipes(filtered);

  // ✅ Clear the search field
  inputEl.value = "";
}

function openRecipeModal(index, recipeList) {
    index = Number(index);
    if (isNaN(index) || index < 0 || index >= recipeList.length) {
        console.error("❌ Invalid recipe index:", index);
        return;
    }

    const recipe = recipeList[index];
    const modal = document.getElementById("recipe-modal");
    const modalContent = document.getElementById("modal-recipe-content");

    if (!modal || !modalContent) {
        console.error("❌ Modal elements not found!");
        return;
    }

 
    modalContent.innerHTML = `
    <button class="close-modal-button">&times;</button>
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="Image of ${recipe.name}">
    <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
    <p><strong>Servings:</strong> ${recipe.servings}</p>
    <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
    <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
    <h3>Directions</h3>
    <ol>${recipe.directions.map(step => `<li>${step}</li>`).join("")}</ol>
`;

    modal.classList.add("show");
     // Add event to close button
    const closeBtn = modalContent.querySelector(".close-modal-button");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }

}

window.addEventListener("click", (event) => {
    const modal = document.getElementById("recipe-modal");
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

function init() {
    console.log("✅ Initializing Recipes Page...");
    fetchRecipes();

    const searchForm = document.querySelector("#search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", searchHandler);
    } else {
        console.error("❌ ERROR: search-form NOT FOUND in the DOM!");
    }
    const resumeBtn = document.getElementById("resume-rotation");
    if (resumeBtn) {
        resumeBtn.addEventListener("click", resumeRotation);
}

}

document.addEventListener("DOMContentLoaded", init);

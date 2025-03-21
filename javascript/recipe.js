//recipe.js page
let recipes = []; // Store recipes globally

async function fetchRecipes() {
    try {
        const response = await fetch("../data/recipes.json"); // ✅ Fixed path
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        recipes = await response.json();
        renderRecipes(recipes); // ✅ Display recipes after fetching
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// ✅ Function to generate tags
function tagsTemplate(tags) {
    return `<p class="tag-list">${tags.join(", ")}</p>`;
}

// ✅ Function to render recipes on the page
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

    // ✅ Attach event listeners to open modal
    document.querySelectorAll(".recipe-card").forEach((card) => {
        card.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            openRecipeModal(index, recipeList);
        });
    });
}

// ✅ Function to filter recipes
function filterRecipes(query) {
    query = query.toLowerCase().trim();

    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
    );
}

// ✅ Search event listener
function searchHandler(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search-bar").value.toLowerCase().trim();
    
    if (!searchInput) {
        renderRecipes(recipes); // Show all if input is empty
        return;
    }

    const filteredRecipes = filterRecipes(searchInput);
    renderRecipes(filteredRecipes);
}

// ✅ Function to open modal
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
}

// ✅ Close modal when clicking outside
window.addEventListener("click", (event) => {
    const modal = document.getElementById("recipe-modal");
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

// ✅ Initialize the app
function init() {
    console.log("✅ Initializing ChefsCorner...");
    fetchRecipes();

    const searchForm = document.querySelector("#search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", searchHandler);
    } else {
        console.error("❌ ERROR: search-form NOT FOUND in the DOM!");
    }
}

document.addEventListener("DOMContentLoaded", init);

//ccrecipe.js page
import recipes from "./ccrecipe.mjs";

// Convert tags from string to array for easier handling
recipes.forEach(recipe => {
    if (typeof recipe.tags === 'string') {
        recipe.tags = recipe.tags.split(',').map(tag => tag.trim());
    }
});

// Function to generate a random number between 0 and num-1
function random(num) {
    return Math.floor(Math.random() * num);
}

// Function to get a random entry from an array
function getRandomListEntry(list) {
    if (!Array.isArray(list) || list.length === 0) {
        throw new Error("The list is either not defined or empty.");
    }
    const randomNum = random(list.length); // Generate a random index
    return list[randomNum]; // Return the random entry
}

// Function to generate tags HTML
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Function to generate the recipe HTML template
function recipeTemplate(recipe) {
    return `
        <figure class="recipe">
  <div class="recipe-container">
    <div class="recipe-image">
      <img src="${recipe.image}" alt="Image of ${recipe.name}" />
    </div>
    <div class="recipe-details">
      <ul class="recipe__tags">
        ${tagsTemplate(recipe.tags)}
      </ul>
      <h2>${recipe.name}</h2>
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
      <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
          ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
      ${recipe.note ? `<p><strong>Note:</strong> ${recipe.note}</p>` : ''}
      <p><strong>Directions:</strong></p>
      <ol>
          ${recipe.directions.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </div>
  </div>
</figure>

    `;
}

// Function to render recipes to the DOM
function renderRecipes(recipeList) {
    const outputElement = document.querySelector("#recipe-list");
    const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    outputElement.innerHTML = recipeHTML;
}

// Filter recipes based on a query string
function filterRecipes(query) {
    return recipes
        .filter(recipe => {
            const nameMatch = recipe.name.toLowerCase().includes(query);
            const ingredientMatch = recipe.ingredients.some(ing => ing.toLowerCase().includes(query));
            const tagMatch = recipe.tags.some(tag => tag.toLowerCase().includes(query));
            const noteMatch = recipe.note && recipe.note.toLowerCase().includes(query);

            return nameMatch || ingredientMatch || tagMatch || noteMatch;
        })
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
}

// Search handler for filtering recipes
function searchHandler(event) {
    event.preventDefault(); // Prevent the form from refreshing
    const searchInput = document.querySelector("#search-bar").value.toLowerCase().trim();

    const filteredRecipes = filterRecipes(searchInput);

    if (filteredRecipes.length === 0) {
        document.querySelector("#recipe-list").innerHTML = `<p>No recipes found for "${searchInput}".</p>`;
    } else {
        renderRecipes(filteredRecipes);
    }
    document.querySelector("#search-bar").value = "";
}

// Initialize the app and set up event listeners
function init() {
    // Render a random recipe on page load
    const randomRecipe = getRandomListEntry(recipes);
    renderRecipes([randomRecipe]);

    // Set up the search functionality
    document.querySelector("#search-form").addEventListener("submit", searchHandler);

    // Set up the "Generate Random Recipe" button
    // const generateButton = document.querySelector("#generateButton");
    // generateButton.addEventListener("click", () => {
    //     const randomRecipe = getRandomListEntry(recipes);
    //     renderRecipes([randomRecipe]);
    // });
}

document.addEventListener("DOMContentLoaded", init);

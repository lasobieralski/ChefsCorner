//ccrecipe.js page
import recipes from "./ccrecipe.mjs";

// Convert tags from string to array for easier handling
recipes.forEach((recipe) => {
  if (typeof recipe.tags === "string") {
    recipe.tags = recipe.tags.split(",").map((tag) => tag.trim());
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
// function tagsTemplate(tags) {
//   return tags.map((tag) => `<li>${tag}</li>`).join("");
// }
function tagsTemplate(tags) {
  return `<p class="tag-list">${tags.join(", ")}</p>`;
}

// Function to generate the recipe HTML template
// Only show image and title initially
// function recipeTemplate(recipe) {
//     return `
//         <div class="recipe-card" onclick="toggleRecipeDetails(this)">
//             <div class="recipe-summary">
//                 <img src="${recipe.image && recipe.image !== '#' ? recipe.image : 'images/default-image.jpg'}"
//                     alt="Image of ${recipe.name}" />
//                 <h2>${recipe.name}</h2>
//             </div>
//             <div class="recipe-details hidden">
//                 <ul class="recipe__tags">
//                     ${tagsTemplate(recipe.tags)}
//                 </ul>
//                 <p><strong>Servings:</strong> ${recipe.servings}</p>
//                 <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
//                 <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
//                 <p><strong>Ingredients:</strong></p>
//                 <ul>
//                     ${(Array.isArray(recipe.ingredients) ? recipe.ingredients.map(ing => `<li>${ing}</li>`) : ["<li>Ingredients not available</li>"]).join('')}
//                 </ul>
//                 ${recipe.note ? `<p><strong>Note:</strong> ${recipe.note}</p>` : ""}
//                 <p><strong>Directions:</strong></p>
//                 <ol>
//                     ${(recipe.directions || recipe.instructions || []).map(step => `<li>${step}</li>`).join("")}
//                 </ol>
//             </div>
//         </div>
//     `;
// }
function recipeTemplate(recipe, index) {
  // console.log("Generating Recipe:", recipe.name, "Index:", index); // ✅ Debugging log
  return `
        <div class="recipe-card" data-index="${index}"> <!-- ✅ Ensure index is assigned -->
            <div class="recipe-summary">
                <img src="${
                  recipe.image && recipe.image !== "#"
                    ? recipe.image
                    : "images/default-image.jpg"
                }" 
                    alt="Image of ${recipe.name}" />
                <h2>${recipe.name}</h2>
                <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
            </div>
        </div>
    `;
}

// Toggle recipe details
function toggleRecipeDetails(recipeCard) {
  const details = recipeCard.querySelector(".recipe-details");
  details.classList.toggle("hidden");
}

// Function to render recipes to the DOM
function renderRecipes(recipeList) {
    const outputElement = document.querySelector("#recipe-list");

    // ✅ Store the filtered list separately
    outputElement.innerHTML = recipeList
        .map((recipe, index) => {
            return `
                <div class="recipe-card" data-index="${index}"> <!-- ✅ Assign correct index -->
                    <div class="recipe-summary">
                        <img src="${recipe.image && recipe.image !== '#' ? recipe.image : 'images/default-image.jpg'}" 
                            alt="Image of ${recipe.name}" />
                        <h2>${recipe.name}</h2>
                        <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
                    </div>
                </div>
            `;
        })
        .join("");

    // ✅ Attach click event to the filtered recipe cards
    document.querySelectorAll(".recipe-card").forEach((card, i) => {
        card.addEventListener("click", () => openRecipeModal(i, recipeList)); // ✅ Pass filtered list
    });
}

// Filter recipes based on a query string
// function filterRecipes(query) {
//   return recipes
//     .filter((recipe) => {
//       const nameMatch = recipe.name.toLowerCase().includes(query);
//       const ingredientMatch = Array.isArray(recipe.ingredients)
//     ? recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
//     : false;

//     //   const ingredientMatch = recipe.ingredients.some((ing) =>
//     //     ing.toLowerCase().includes(query)
//     //   );
//       const tagMatch = recipe.tags.some((tag) =>
//         tag.toLowerCase().includes(query)
//       );
//       const noteMatch = recipe.note && recipe.note.toLowerCase().includes(query) ? true : false;
//       return nameMatch || ingredientMatch || tagMatch || noteMatch;
//     })
//     .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
// }
function filterRecipes(query) {
    query = query.toLowerCase().trim(); 

    console.log("🔍 Searching for:", query);

    return recipes.filter(recipe => {
        // ✅ Ensure `tags` is always an array
        let tags = Array.isArray(recipe.tags) ? recipe.tags : [];

        // ✅ Ensure each tag is properly formatted and checked
        let matches = tags.some(tag => {
            let cleanedTag = tag.toLowerCase().trim(); // Ensure clean comparison
            return cleanedTag.includes(query);
        });

        console.log(`🔎 Checking Recipe: ${recipe.name}`, "Tags:", tags, "Match:", matches);

        return matches;
    });
}

// Search handler for filtering recipes
function searchHandler(event) {
    event.preventDefault(); // Prevent the form from refreshing

    const searchInput = document.querySelector("#search-bar").value.toLowerCase().trim();
    console.log("🔍 Search Query Entered:", searchInput);

    const filteredRecipes = filterRecipes(searchInput);
    console.log("🛠 Filtered Recipes:", filteredRecipes);

    if (filteredRecipes.length === 0) {
        document.querySelector("#recipe-list").innerHTML = `<p>No recipes found for "${searchInput}".</p>`;
    } else {
        renderRecipes(filteredRecipes); // ✅ Now correctly maps indexes
    }

    document.querySelector("#search-bar").value = "";
}

// Initialize the app and set up event listeners
function init() {

    console.log("✅ init() is running!"); // Debugging Log

    // Find the search form
    const searchForm = document.querySelector("#search-form");
    
    // Check if the search form exists
    if (!searchForm) {
        console.error("❌ ERROR: search-form NOT FOUND in the DOM!");
        return; // Stop execution if the search form is missing
    }

    console.log("✅ search-form found, adding event listener!"); // Debugging Log
    searchForm.addEventListener("submit", searchHandler);
    renderRecipes(recipes); // ✅ Ensure recipes are rendered first

    // ✅ Attach event listeners to recipe cards dynamically
    document
        .querySelector("#recipe-list")
        .addEventListener("click", function (event) {
        const card = event.target.closest(".recipe-card"); // Find the clicked recipe card
        if (card) {
            const index = card.getAttribute("data-index"); // Get the index from data attribute
            console.log("✅ Recipe clicked! Index:", index); // ✅ Debugging log
            openRecipeModal(index); // ✅ Open modal with correct index
        }
        });

    // ✅ Close Modal When Clicking "X"
    const closeButton = document.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
        console.log("❌ Closing Modal"); // ✅ Debugging log
        document.getElementById("recipe-modal").classList.remove("show");
        });
  }

  // ✅ Close Modal When Clicking Outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("recipe-modal");
    if (event.target === modal) {
      console.log("❌ Closing Modal (Clicked Outside)"); // ✅ Debugging log
      modal.classList.remove("show");
    }
  });
}

function openRecipeModal(index, recipeList) {
    index = Number(index); // Convert to number
    if (isNaN(index) || index < 0 || index >= recipeList.length) {
        console.error("❌ Invalid recipe index:", index);
        return;
    }

    console.log("✅ Opening Modal for Recipe Index:", index, "Recipe:", recipeList[index].name);

    const recipe = recipeList[index]; // ✅ Use filtered list
    const modal = document.getElementById("recipe-modal");
    const modalContent = document.getElementById("modal-recipe-content");

    if (!modal || !modalContent) {
        console.error("❌ Modal elements not found!");
        return;
    }

    modalContent.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image && recipe.image !== '#' ? recipe.image : 'images/default-image.jpg'}" 
            alt="Image of ${recipe.name}" style="width: 100%; border-radius: 10px;">
        <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
        <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
            ${(Array.isArray(recipe.ingredients)
              ? recipe.ingredients.map(ing => `<li>${ing}</li>`)
              : ["<li>Ingredients not available</li>"]).join('')}
        </ul>
        ${recipe.note ? `<p><strong>Note:</strong> ${recipe.note}</p>` : ""}
        <p><strong>Directions:</strong></p>
        <ol>
            ${(recipe.directions || recipe.instructions || []).map(step => `<li>${step}</li>`).join("")}
        </ol>
    `;

    modal.classList.add("show");
}

document.addEventListener("DOMContentLoaded", init);

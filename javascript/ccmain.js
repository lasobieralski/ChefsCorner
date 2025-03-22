//ccmain.js
let recipes = []; // Store recipes globally

// ✅ Fetch recipes from JSON file
async function fetchRecipes() {
    try {
        const response = await fetch("../data/recipes.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        recipes = await response.json();
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// ✅ Function to generate a random number
function random(num) {
    return Math.floor(Math.random() * num);
}

// ✅ Function to get a random recipe from the list
function getRandomListEntry(list) {
    if (!Array.isArray(list) || list.length === 0) {
        console.error("❌ Error: No recipes available.");
        return null;
    }
    return list[random(list.length)];
}

// ✅ Function to render a random recipe
function renderRandomRecipe() {
    if (recipes.length === 0) {
        console.error("❌ No recipes loaded yet.");
        return;
    }

    const randomRecipe = getRandomListEntry(recipes);
    if (!randomRecipe) return;

    document.querySelector("#result").innerHTML = `
        <figure class="recipe">
            <img src="${randomRecipe.image}" alt="Image of ${randomRecipe.name}" />
            <figcaption>
                <ul class="recipe__tags">
                    ${randomRecipe.tags.map(tag => `<li>${tag}</li>`).join('')}
                </ul>
                <a href="#">${randomRecipe.name}</a>
                <p class="recipe__description">${randomRecipe.description}</p>
            </figcaption>
        </figure>
    `;
}

// ✅ Function to handle random recipe navigation button
function handleNavigationClick() {
    const navRecipeButton = document.querySelector("#navRecipeButton");

    if (!navRecipeButton) {
        console.error("❌ Navigation button not found!");
        return;
    }

    navRecipeButton.addEventListener("click", (event) => {
        event.preventDefault();
        renderRandomRecipe();
    });
}

// ✅ Initialize app (Only for navigation & random recipe)
async function init() {
    await fetchRecipes(); // Fetch recipes first
    renderRandomRecipe(); // Display a random recipe
    handleNavigationClick();
}

// ✅ Check if the user is logged in
function checkUserLogin() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        console.log(`✅ Logged in as: ${loggedInUser}`);
        document.getElementById("signInButton").textContent = `Welcome, ${loggedInUser}`;
    } else {
        console.log("🔹 User is browsing as a guest.");
    }
}

// ✅ Run login check on page load
document.addEventListener("DOMContentLoaded", checkUserLogin);
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});

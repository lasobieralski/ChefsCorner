//ccmain.js
import recipes from './javascript/ccrecipe.mjs';
 
// function to generate a randome number between 0 and num-1
function random(num) {
    return Math.floor(Math.random() * num);
}

// function to get a andom entry from an array
function getRandomListEntry(list) {
    if (!Array.isArray(list) || list.length === 0) {
        throw new Error("The list is either not defined or empty.");
    }
    const randomNum = random(list.length); //generate a random index
    return list[randomNum]; //return the random entry
}

//function to generate the recipe HTML template
function recipeTemplate(recipe) {
        return `
        <figure class="recipe">
            <img src="${recipe.image}" alt="Image of ${recipe.name}" />
            <figcaption>
                <ul class="recipe__tags">
                    ${tagsTemplate(recipe.tags)}
                </ul>
                <a href="#">${recipe.name}</a>
                <p class="recipe__description">
                    ${recipe.description}
                </p>
            </figcaption>
        </figure>
    `;
}

// Function to generate tags HTML
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Function to render recipes to the DOM
function renderRecipes(recipeList) {
    const outputElement = document.querySelector("#result");
    const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    outputElement.innerHTML = recipeHTML;
}

// Filter recipes based on a query string
function filterRecipes(query) {
    return recipes
        .filter(recipe => {
            return (
                recipe.name.toLowerCase().includes(query) || // Check name
                recipe.description.toLowerCase().includes(query) || // Check description
                recipe.tags.find(tag => tag.toLowerCase().includes(query)) || // Check tags
                recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query)) // Check ingredients
            );
        })
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
}

// Search handler for filtering recipes
function searchHandler(event) {
    event.preventDefault(); // Prevent the form from refreshing

    // Get the search input and convert to lowercase
    const searchInput = document.querySelector("#search-bar").value.toLowerCase();

    // Filter recipes based on the search query
    const filteredRecipes = filterRecipes(searchInput);

    // Render the filtered recipes
    if (filteredRecipes.length === 0) {
        document.querySelector("#result").innerHTML = `<p>No recipes found for "${searchInput}".</p>`;
    } else {
        renderRecipes(filteredRecipes);
    }

    document.querySelector("#search-bar").value = ""; // Clear the search bar
}

// Function to render a random recipe
function renderRandomRecipe() {
    try {
        const randomRecipe = getRandomListEntry(recipes);
        renderRecipes([randomRecipe]);
    } catch (error) {
        console.error("Error generating random recipe:", error);
        document.querySelector("#result").innerHTML = `<p>Could not load a random recipe. Please try again later.</p>`;
    }
}

// Handle navigation button click to display random recipe
function handleNavigationClick() {
    const navRecipeButton = document.querySelector("#navRecipeButton"); // Ensure the button has this ID in your HTML

    if (!navRecipeButton) {
        console.error("Navigation button not found!");
        return;
    }

    navRecipeButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior if it's a link
        renderRandomRecipe();
    });
}

// Initialize the app and set up event listeners
function init() {
    // Render a random recipe on page load
    renderRandomRecipe();

    // Set up the search functionality
    const searchForm = document.querySelector("form");
    if (searchForm) {
        searchForm.addEventListener("submit", searchHandler);
    }

    // Set up the "Generate Random Recipe" button
    const generateButton = document.querySelector("#generateButton");
    if (generateButton) {
        generateButton.addEventListener("click", renderRandomRecipe);
    }

    // Set up the navigation button to render a random recipe
    handleNavigationClick();


}

// Get modal and button elements
const signupModal = document.getElementById('signupModal');
const openModalButton = document.getElementById('openSignupModal');
const closeModalButton = document.getElementById('closeSignupModal'); // Assuming you have a close button in the modal

// Function to open modal
function openModal() {
    signupModal.style.display = 'block';
}

// Function to close modal
function closeModal() {
    signupModal.style.display = 'none';
}

// Show modal when clicking the "Create an Account" button
openModalButton.addEventListener('click', openModal);

// Close modal when clicking the close button
closeModalButton.addEventListener('click', closeModal);

// Handle the form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Save user data to localStorage (for demo purposes)
    localStorage.setItem('user', JSON.stringify({ username, password }));

    // Hide the modal after signup
    closeModal();

    // Notify the user
    alert('Account created successfully!');
});

// // Show the modal when the page loads
// window.onload = function() {
//     document.getElementById('signupModal').style.display = 'block';
//   };

//   // Handle the form submission
//   document.getElementById('signupForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     // Get username and password values
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
    
//     // For demonstration purposes, save the user data to localStorage
//     // NOTE: In a production environment, you should never store passwords in plain text
//     localStorage.setItem('user', JSON.stringify({ username, password }));
    
//     // Hide the modal after signup
//     document.getElementById('signupModal').style.display = 'none';
    
//     // Notify the user or update the UI accordingly
//     alert('Account created successfully!');
//   });

// Call init to start the app
document.addEventListener("DOMContentLoaded", init);
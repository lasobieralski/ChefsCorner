//ui.js file
// export async function loadModal() {
//     try {
//       // Get the current page location
//       const currentPath = window.location.pathname;
  
//       // Build correct path to modal based on where you're at
//       let modalPath;
  
//       // If you're already in the /pages folder
//       if (currentPath.includes('/pages/')) {
//         modalPath = 'signin-modal.html'; // file is in same folder
//       } else {
//         modalPath = 'pages/signin-modal.html'; // homepage or root level
//       }
    
//         const response = await fetch(modalPath);
//         const html = await response.text();
//         document.getElementById('modal-container').innerHTML = html;
//       } catch (err) {
//         console.error('❌ Failed to load modal:', err);
//       }
//     }
    
//     export function initUI() {
//       const modal = document.getElementById('signInModal');
//       const signInBtn = document.getElementById('signInButton');
//       const closeBtn = document.querySelector('.close-button');
//       const openSignupBtn = document.getElementById('openSignupForm');
//       const signupFormContainer = document.getElementById('signupFormContainer');
    
//       signInBtn?.addEventListener('click', () => {
//         modal?.classList.remove('hidden');
//          // 🧽 Clear previous input values
//         const loginUsername = document.getElementById('login-username');
//         const loginPassword = document.getElementById('login-password');
//         const signupUsername = document.getElementById('signup-username');
//         const signupEmail = document.getElementById('signup-email');
//         const signupPassword = document.getElementById('signup-password');
  
//         if (loginUsername) loginUsername.value = '';
//         if (loginPassword) loginPassword.value = '';
//         if (signupUsername) signupUsername.value = '';
//         if (signupEmail) signupEmail.value = '';
//         if (signupPassword) signupPassword.value = '';
//         // Always start with login form
//         signupFormContainer?.classList.add('hidden');
//       });        
    
//       closeBtn?.addEventListener('click', () => {
//         modal?.classList.add('hidden');
//       });
    
//       window.addEventListener('click', (e) => {
//         if (e.target === modal) {
//           modal.classList.add('hidden');
//         }
//       });
    
//       openSignupBtn?.addEventListener('click', () => {
//         signupFormContainer?.classList.toggle('hidden');
//       });
//     }
    
//     export function updateUI(username) {
//       const signInBtn = document.getElementById('signInButton');
//       if (signInBtn && username) {
//         signInBtn.textContent = `Welcome, ${username}`;
//       }
//     }


// new ui.js
// Handles rendering recipes and managing recipe modal UI

/**
 * 🎨 Render recipe cards in the provided container
 * @param {Array} recipes - Array of recipe objects
 * @param {string} containerId - ID of the element where cards should go
 */
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

/**
 * 👂 Set up click listeners for each recipe card
 * @param {Array} recipes - Array of recipe objects to reference by ID
 */
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

/**
 * 🧾 Show full recipe details in a modal
 * @param {Object} recipe - The full recipe object
 */
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

/**
 * 🧼 Reset recipe UI to empty state
 */
export function resetUI(containerId = "recipe-list") {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<p>No recipes to show.</p>`;
  }
}

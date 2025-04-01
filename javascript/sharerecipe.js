// new sharerecipe.js
import { saveUserRecipe } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("share-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("⚠️ You must be signed in to share a recipe.");
      return;
    }

    const formData = new FormData(form);

    const newRecipe = {
      id: Date.now().toString(),
      author: formData.get("author"),
      name: formData.get("recipe"),
      tags: formData.get("tags").split(",").map(tag => tag.trim()),
      servings: formData.get("servings"),
      prepTime: formData.get("preptime"),
      cookTime: formData.get("cooktime"),
      ingredients: formData.get("ingredients").split("\n").map(i => i.trim()),
      directions: formData.get("directions").split("\n").map(d => d.trim()),
      image: "images/default-recipe.jpg", // placeholder
      isFavorite: false,
      rating: 0,
      date: new Date().toISOString()
    };

    saveUserRecipe(newRecipe); // ✅ uses your helper method

    alert("🎉 Recipe shared successfully!");
    form.reset();
    window.location.href = "myrecipes.html";
  });
});

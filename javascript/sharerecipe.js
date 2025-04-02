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
    const file = formData.get("image");
    const reader = new FileReader();

    reader.onload = function () {
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
        image: reader.result, // Base64 image data
        isFavorite: false,
        rating: 0,
        date: new Date().toISOString()
      };

      saveUserRecipe(newRecipe);
      alert("🎉 Recipe shared successfully!");
      form.reset();
      window.location.href = "myrecipes.html";
    };

    if (file && file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      alert("⚠️ Please upload a valid image file.");
    }
  });
});

//modal.js file
document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");
    const signInModal = document.getElementById("signInModal");
    const closeModalButton = document.querySelector(".close-button");
    const openSignupButton = document.getElementById("openSignupForm");
    const signupFormContainer = document.getElementById("signupFormContainer");

    if (!signInButton || !signInModal) {
        console.error("❌ Sign-in elements not found. Check HTML IDs.");
        return;
    }

    // Open Sign-in Modal
    signInButton.addEventListener("click", () => {
        signInModal.classList.add("open");
    });

    // Close Modal
    closeModalButton.addEventListener("click", () => {
        signInModal.classList.remove("open");
    });

    // Close modal when clicking outside of modal-content
    window.addEventListener("click", (event) => {
        if (event.target === signInModal) {
            signInModal.classList.remove("open");
        }
    });

    // Show Signup Form inside modal
    openSignupButton.addEventListener("click", () => {
        signupFormContainer.classList.toggle("hidden");
    });
});

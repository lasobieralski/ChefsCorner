//modal.js file
document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");
    const signInModal = document.getElementById("signInModal");
    const closeModalButton = document.querySelector(".close-button");
    const openSignupButton = document.getElementById("openSignupForm");
    const signupFormContainer = document.getElementById("signupFormContainer");

    if (!signInButton || !signInModal) {
        console.warn("❌ Sign-in elements not found. Skipping modal initialization.");
        return;
    }

    // ✅ Open Sign-in Modal (Only if button exists)
    if (signInButton) {
        signInButton.addEventListener("click", () => {
            signInModal.classList.add("open");
        });
    }

    // ✅ Close Modal (Only if button exists)
    if (closeModalButton) {
        closeModalButton.addEventListener("click", () => {
            signInModal.classList.remove("open");
        });
    }

    // ✅ Close modal when clicking outside of modal-content
    window.addEventListener("click", (event) => {
        if (signInModal && event.target === signInModal) {
            signInModal.classList.remove("open");
        }
    });

    // ✅ Show Signup Form inside modal (Only if button exists)
    if (openSignupButton && signupFormContainer) {
        openSignupButton.addEventListener("click", () => {
            signupFormContainer.classList.toggle("hidden");
        });
    }
});


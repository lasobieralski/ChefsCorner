//modal.js file
const modal = document.querySelector("#modal");
const openModalButton = document.querySelector("#open-modal"); //assume you have a button to open the modal
const closeModalButton = document.querySelector(".close-button");

function openModal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", false);
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", true);
}

openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
    //close the modal when user clicks outside of the .modall-content
    if (event.target === modal) {
        closeModal();
    }  
});
//allow the escape key to close the modal as well.
window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
    }
});

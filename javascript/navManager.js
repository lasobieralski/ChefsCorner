// new navManager.js
import { initLoginModal } from "./login.js";
import { initNavFeatures } from "./ccmain.js";

// Load HTML partials dynamically
async function loadPartial(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Load nav, footer, and modal
export async function setupNavForSubpage() {
  const headerExists = document.getElementById("header-container");
  if (headerExists) {
    await loadPartial("header-container", "../partials/nav.html");
  }

  const footerExists = document.getElementById("footer-placeholder");
  if (footerExists) {
    await loadPartial("footer-placeholder", "../partials/footer.html");
  }

  // Continue setting up modal and other dynamic content
  const modalContainer = document.getElementById("modal-container");
  if (modalContainer) {
    const res = await fetch("../partials/signInModal.html");
    const html = await res.text();
    modalContainer.innerHTML = html;
  }

  adjustNavLinks();
  adjustLogoPath();
  initLoginModal();
  initNavFeatures();
  adjustFooterIcons();
  adjustFooterLinks();
}


// Adjust nav link paths based on page location
function adjustNavLinks() {
  document.querySelectorAll("a[data-link]").forEach((link) => {
    const type = link.getAttribute("data-link");
    let path = "";

    switch (type) {
      case "home":
        path = "index.html";
        break;
      case "recipes":
        path = "pages/ccrecipes.html";
        break;
      case "share":
        path = "pages/sharerecipes.html";
        break;
      case "my":
        path = "pages/myrecipes.html";
        break;
      case "contact":
        path = "pages/contactus.html";
        break;
    }

    link.setAttribute("href", `../${path}`);
  });
}

// Adjust logo path for subpages
function adjustLogoPath() {
  const logo = document.getElementById("site-logo");
  if (logo) {
    logo.src = "../images/logo.jpg";
  }
}
function adjustFooterIcons() {
  const fb = document.getElementById("facebook-icon");
  if (!fb) return;

  const currentSrc = fb.getAttribute("src");
  if (!currentSrc || currentSrc.includes("facebook.png") || currentSrc.endsWith("/")) {
    const isInPages = window.location.pathname.includes("/pages/");
    const basePath = isInPages ? "../" : "";
    fb.src = basePath + "images/facebook.png";
  }
}

function adjustFooterLinks() {
  const isInPages = window.location.pathname.includes("/pages/");
  const contactLink = document.getElementById("footer-contact-link");

  if (contactLink) {
    contactLink.href = isInPages ? "../pages/contactus.html" : "pages/contactus.html";
  }
}

// new loadPartials.js
// Dynamically injects the nav, footer, and login modal into the page

export async function loadAllPartials() {
    try {
      // Auto-detect base path (root vs pages/)
      const basePath = window.location.pathname.includes("/pages/") ? "../" : "";
  
      console.log("🧩 Loading partials from:", basePath + "partials/");
  
      const [navHtml, footerHtml, modalHtml] = await Promise.all([
        fetch(`${basePath}partials/nav.html`).then(res => res.text()),
        fetch(`${basePath}partials/footer.html`).then(res => res.text()),
        fetch(`${basePath}partials/signInModal.html`).then(res => res.text())
      ]);
  
      // Inject HTML
      document.getElementById("header-container").innerHTML = navHtml;
      document.getElementById("footer-placeholder").innerHTML = footerHtml;
  
      const modalContainer = document.getElementById("modal-container");
      if (modalContainer) {
        modalContainer.innerHTML = modalHtml;
      }
  
      initHeaderListeners(); // ⬅️ Only call after DOM injection
    } catch (error) {
      console.error("❌ Error loading partials:", error);
    }
  }
  
  function initHeaderListeners() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const signInBtn = document.getElementById("signInButton");
    const modal = document.getElementById("signInModal");
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  
    if (signInBtn && modal) {
      signInBtn.addEventListener("click", () => {
        modal.classList.add("open");
      });
    }
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("close-button")) {
        modal?.classList.remove("open");
      }
    });
  }
  function fixNavLinks() {
    const isInPagesFolder = window.location.pathname.includes("/pages/");
    const links = document.querySelectorAll("a[data-link]");
  
    links.forEach(link => {
      const rawPath = link.getAttribute("data-link");
      // If you're in a subfolder (like /pages), go up one level
      const finalPath = isInPagesFolder ? `../${rawPath}` : rawPath;
      link.setAttribute("href", finalPath);
    });
  }
  document.getElementById("header-container").innerHTML = navHtml;
  fixNavLinks(); // 🔧 Adjust relative paths
  
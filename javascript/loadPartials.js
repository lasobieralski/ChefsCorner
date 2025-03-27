// new loadPartials.js
export async function loadPartial(id, filePath) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const res = await fetch(filePath);
    const html = await res.text();
    container.innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}
export async function loadAllPartials() {
  const currentPath = window.location.pathname;
  const inPagesFolder = currentPath.includes("/pages/");

  const navPath = inPagesFolder ? "../partials/nav.html" : "partials/nav.html";
  const footerPath = inPagesFolder ? "../partials/footer.html" : "partials/footer.html";
  const modalPath = inPagesFolder ? "../partials/signInModal.html" : "partials/signInModal.html";

  const navPromise = loadPartial("header-container", navPath);
  const footerPromise = loadPartial("footer-placeholder", footerPath);
  const modalPromise = new Promise((resolve) => {
    const modalContainer = document.getElementById("modal-container");
    if (modalContainer) {
      fetch(modalPath)
        .then(res => res.text())
        .then(html => {
          modalContainer.innerHTML = html;
          resolve();
        })
        .catch(err => {
          console.error("Error loading modal:", err);
          resolve();
        });
    } else {
      resolve();
    }
  });

  return Promise.all([navPromise, footerPromise, modalPromise]);
}

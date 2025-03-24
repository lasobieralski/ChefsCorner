//ui.js file
export async function loadModal() {
    try {
      // Get the current page location
      const currentPath = window.location.pathname;
  
      // Build correct path to modal based on where you're at
      let modalPath;
  
      // If you're already in the /pages folder
      if (currentPath.includes('/pages/')) {
        modalPath = 'signin-modal.html'; // file is in same folder
      } else {
        modalPath = 'pages/signin-modal.html'; // homepage or root level
      }
    
        const response = await fetch(modalPath);
        const html = await response.text();
        document.getElementById('modal-container').innerHTML = html;
      } catch (err) {
        console.error('❌ Failed to load modal:', err);
      }
    }
    
    export function initUI() {
      const modal = document.getElementById('signInModal');
      const signInBtn = document.getElementById('signInButton');
      const closeBtn = document.querySelector('.close-button');
      const openSignupBtn = document.getElementById('openSignupForm');
      const signupFormContainer = document.getElementById('signupFormContainer');
    
      signInBtn?.addEventListener('click', () => {
        modal?.classList.remove('hidden');
         // 🧽 Clear previous input values
        const loginUsername = document.getElementById('login-username');
        const loginPassword = document.getElementById('login-password');
        const signupUsername = document.getElementById('signup-username');
        const signupEmail = document.getElementById('signup-email');
        const signupPassword = document.getElementById('signup-password');
  
        if (loginUsername) loginUsername.value = '';
        if (loginPassword) loginPassword.value = '';
        if (signupUsername) signupUsername.value = '';
        if (signupEmail) signupEmail.value = '';
        if (signupPassword) signupPassword.value = '';
        // Always start with login form
        signupFormContainer?.classList.add('hidden');
      });        
    
      closeBtn?.addEventListener('click', () => {
        modal?.classList.add('hidden');
      });
    
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    
      openSignupBtn?.addEventListener('click', () => {
        signupFormContainer?.classList.toggle('hidden');
      });
    }
    
    export function updateUI(username) {
      const signInBtn = document.getElementById('signInButton');
      if (signInBtn && username) {
        signInBtn.textContent = `Welcome, ${username}`;
      }
    }
    
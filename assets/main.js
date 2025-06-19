// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Project modals
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close');

projectCards.forEach(card => {
  card.querySelector('.view-details').addEventListener('click', e => {
    e.stopPropagation();
    const modalId = card.getAttribute('data-modal');
    document.getElementById(modalId).classList.add('active');
  });
});
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('active');
  });
});
window.addEventListener('click', e => {
  modals.forEach(modal => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

// Dynamic background gradient based on time of day
function setTimeGradient() {
  const hour = new Date().getHours();
  let gradient = '';
  let textColor = '#2c3e50';
  if (hour >= 5 && hour < 8) {
    // Early morning: soft blue/pink
    gradient = 'linear-gradient(135deg, #f8fafc 0%, #e0c3fc 100%)';
    textColor = '#2c3e50';
  } else if (hour >= 8 && hour < 11) {
    // Morning: light blue/yellow
    gradient = 'linear-gradient(135deg, #e0eafc 0%, #fff6b7 100%)';
    textColor = '#2c3e50';
  } else if (hour >= 11 && hour < 16) {
    // Afternoon: bright blue/white
    gradient = 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)';
    textColor = '#2c3e50';
  } else if (hour >= 16 && hour < 19) {
    // Evening: orange/purple
    gradient = 'linear-gradient(135deg, #fbc2eb 0%, #fcb69f 100%)';
    textColor = '#2c3e50';
  } else {
    // Night: dark blue/indigo
    gradient = 'linear-gradient(135deg, #232526 0%, #414345 100%)';
    textColor = '#ecf0f1';
  }
  document.body.style.background = gradient;
  document.body.style.color = textColor;
  // Also update nav, hero, and footer backgrounds for contrast
  document.querySelectorAll('.hero, footer').forEach(el => {
    el.style.background = 'transparent';
    el.style.color = textColor;
  });
}
setTimeGradient();
setInterval(setTimeGradient, 60 * 60 * 1000); // Update every hour 
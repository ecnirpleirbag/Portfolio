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

// BLOG PAGE LOGIC (Static, no comments)
if (window.location.pathname.endsWith('blog.html')) {
  const postsSection = document.getElementById('blog-posts');
  if (!window.blogPosts || !Array.isArray(blogPosts) || !blogPosts.length) {
    postsSection.innerHTML = '<p>No blog posts yet.</p>';
  } else {
    postsSection.innerHTML = '';
    blogPosts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'blog-post';
      postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p class="blog-date">${new Date(post.date).toLocaleString()}</p>
        <div class="blog-content">${post.content.replace(/\n/g, '<br>')}</div>
      `;
      postsSection.appendChild(postDiv);
    });
  }
}

// Day/Night Icon Animation and Tooltip (multi-icon support)
function updateAllDayNightIcons() {
  const icons = document.querySelectorAll('.daynight-icon');
  let hour = new Date().getHours();
  icons.forEach(icon => {
    icon.classList.toggle('night', hour < 6 || hour >= 18);
    icon.innerHTML = `
      <span class="sunmoon"></span>
      <span class="moon-cut"></span>
      <span class="daynight-tooltip"></span>
    `;
  });
}
function updateAllDayNightTooltips() {
  const icons = document.querySelectorAll('.daynight-icon');
  const now = new Date();
  icons.forEach(icon => {
    const tooltip = icon.querySelector('.daynight-tooltip');
    if (tooltip) tooltip.textContent = now.toLocaleString();
  });
}
updateAllDayNightIcons();
updateAllDayNightTooltips();
setInterval(() => {
  updateAllDayNightIcons();
  updateAllDayNightTooltips();
}, 60 * 60 * 1000);
document.querySelectorAll('.daynight-icon').forEach(icon => {
  icon.addEventListener('mouseenter', updateAllDayNightTooltips);
  icon.addEventListener('focus', updateAllDayNightTooltips);
});

// Dynamic navbar background based on time of day
function setNavbarTimeColor() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navLogo = document.querySelector('.nav-logo');
  const hour = new Date().getHours();
  let bg = '#4a6bdf';
  let linkColor = '#fff';
  let hoverColor = '#ffe066';
  if (hour >= 5 && hour < 8) {
    bg = '#e0c3fc'; // Early morning: soft blue/pink
    linkColor = '#2c3e50';
    hoverColor = '#4a6bdf';
  } else if (hour >= 8 && hour < 11) {
    bg = '#e0eafc'; // Morning: light blue/yellow
    linkColor = '#2c3e50';
    hoverColor = '#4a6bdf';
  } else if (hour >= 11 && hour < 16) {
    bg = '#a1c4fd'; // Afternoon: bright blue/white
    linkColor = '#2c3e50';
    hoverColor = '#e74c3c';
  } else if (hour >= 16 && hour < 19) {
    bg = '#fcb69f'; // Evening: orange/purple
    linkColor = '#2c3e50';
    hoverColor = '#e74c3c';
  } else {
    bg = '#232526'; // Night: dark blue/indigo
    linkColor = '#fff';
    hoverColor = '#ffe066';
  }
  if (navbar) navbar.style.backgroundColor = bg;
  if (navLogo) navLogo.style.color = linkColor;
  navLinks.forEach(link => {
    link.style.color = linkColor;
    link.addEventListener('mouseenter', () => link.style.color = hoverColor);
    link.addEventListener('mouseleave', () => link.style.color = linkColor);
  });
}
setNavbarTimeColor();
setInterval(setNavbarTimeColor, 60 * 60 * 1000);

// Hero subheading: allow focus/active for illumination on touch/keyboard
const heroSubheadingSpans = document.querySelectorAll('.hero-subheading span');
heroSubheadingSpans.forEach(span => {
  span.addEventListener('touchstart', () => span.classList.add('active'));
  span.addEventListener('touchend', () => span.classList.remove('active'));
  span.addEventListener('blur', () => span.classList.remove('active'));
});

// Seamless marquee for skills section (side-by-side, horizontal)
window.addEventListener('DOMContentLoaded', () => {
  const marquee = document.querySelector('#skills .marquee-wrapper');
  const skillsList = marquee && marquee.querySelector('.skills-list');
  if (marquee && skillsList) {
    const clone = skillsList.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    // Create inner flex container
    const inner = document.createElement('div');
    inner.className = 'skills-marquee-inner';
    inner.appendChild(skillsList);
    inner.appendChild(clone);
    marquee.appendChild(inner);
  }
}); 
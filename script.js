

// ===== THEME SYSTEM (Light, Dark, System Default) =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Theme options: 'light', 'dark', 'system'
let currentTheme = localStorage.getItem('theme') || 'system';

// Detect system theme preference from device
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// Apply theme based on selection
function applyTheme(theme) {
  if (theme === 'system') {
    // Automatically detect and apply system/device theme
    const systemTheme = getSystemTheme();
    body.classList.toggle('dark-mode', systemTheme === 'dark');
  } else {
    // Manually apply selected theme
    body.classList.toggle('dark-mode', theme === 'dark');
  }
  updateThemeIcon(theme);
}

// Update theme toggle icon based on current theme
function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeToggle.textContent = '☀️'; // Sun icon for dark mode
    themeToggle.setAttribute('aria-label', 'Switch to system default theme');
  } else if (theme === 'light') {
    themeToggle.textContent = '🌙'; // Moon icon for light mode
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    themeToggle.textContent = '🖥️'; // Computer/device icon for system default
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  }
}

// Initialize theme on page load
applyTheme(currentTheme);

// Theme toggle click handler - cycles through: light → dark → system
themeToggle.addEventListener('click', () => {
  if (currentTheme === 'light') {
    currentTheme = 'dark';
  } else if (currentTheme === 'dark') {
    currentTheme = 'system';
  } else {
    currentTheme = 'light';
  }
  
  localStorage.setItem('theme', currentTheme);
  applyTheme(currentTheme);
  
  // Add click animation with gaming style
  themeToggle.style.transform = 'scale(0.85) rotate(180deg)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 300);
});

// Listen for system theme changes (when theme is set to 'system')
// This automatically updates when device theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (currentTheme === 'system') {
    applyTheme('system');
  }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuBtn && mobileMenu && closeMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });

  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close menu when clicking on a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class for enhanced shadow
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== TYPING EFFECT (Home Page Only) =====
const typingText = document.getElementById('typingText');

if (typingText) {
  const phrases = [
    'Game Developer',
    'Console Enthusiast',
    'Level Designer',
    'Gaming Innovator',
    'Digital Creator'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }

  // Start typing effect
  setTimeout(type, 500);
}

// ===== PROFILE PICTURE POPUP (Home Page Only) =====
const profilePic = document.getElementById('profilePic');

if (profilePic) {
  profilePic.addEventListener('click', () => {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
      animation: fadeIn 0.4s ease;
      backdrop-filter: blur(10px);
    `;
    
    // Create enlarged image
    const img = document.createElement('img');
    img.src = profilePic.src;
    img.alt = 'Gaming Console Profile';
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 25px;
      box-shadow: 0 20px 80px rgba(102, 126, 234, 0.8), 0 0 100px rgba(139, 92, 246, 0.6);
      animation: zoomIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      border: 4px solid rgba(167, 139, 250, 0.5);
    `;
    
    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes zoomIn {
        from { transform: scale(0.3) rotate(-10deg); opacity: 0; }
        to { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on click with animation
    modal.addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s ease';
      img.style.animation = 'zoomOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
        document.body.style.overflow = '';
      }, 300);
    });
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

// Initial check
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Check on scroll with debounce
window.addEventListener('scroll', debounce(revealOnScroll, 10));

// ===== SKILL TAG INTERACTIONS (Skills Page Only) =====
const skillTags = document.querySelectorAll('.skill-tag');

if (skillTags.length > 0) {
  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Create gaming-style particle effect
      const rect = tag.getBoundingClientRect();
      const particles = ['⭐', '✨', '💫', '🎮', '🕹️'];
      
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
          position: fixed;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
          pointer-events: none;
          font-size: 1.8rem;
          filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.8));
          animation: particleBurst 1.2s ease-out forwards;
          z-index: 9999;
        `;
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 60 + Math.random() * 80;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
          if (document.body.contains(particle)) {
            document.body.removeChild(particle);
          }
        }, 1200);
      }
      
      // Add pulse effect to tag
      tag.style.transform = 'scale(0.95)';
      setTimeout(() => {
        tag.style.transform = '';
      }, 150);
    });
  });

  // Add particle burst animation
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes particleBurst {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1) rotate(0deg);
      }
      100% {
        opacity: 0;
        transform: translate(var(--tx), var(--ty)) scale(0.3) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(particleStyle);
}

// ===== PROJECT CARD INTERACTIONS (Projects Page Only) =====
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    
    // Add click ripple effect
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, transparent 70%);
        width: 20px;
        height: 20px;
        left: ${e.clientX - rect.left - 10}px;
        top: ${e.clientY - rect.top - 10}px;
        animation: projectRipple 0.8s ease-out;
        pointer-events: none;
      `;
      
      card.style.position = 'relative';
      card.appendChild(ripple);
      
      setTimeout(() => {
        if (card.contains(ripple)) {
          card.removeChild(ripple);
        }
      }, 800);
    });
  });

  // Add ripple animation
  const projectRippleStyle = document.createElement('style');
  projectRippleStyle.textContent = `
    @keyframes projectRipple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(50);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(projectRippleStyle);
}

// ===== CONTACT BUTTONS INTERACTIONS (Contact Page Only) =====
const contactItems = document.querySelectorAll('.contact-item');

if (contactItems.length > 0) {
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('.contact-icon');
      if (icon) {
        icon.style.animation = 'wiggle 0.5s ease';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const icon = item.querySelector('.contact-icon');
      if (icon) {
        icon.style.animation = '';
      }
    });
    
    item.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = item.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%);
        width: 100px;
        height: 100px;
        left: ${e.clientX - rect.left - 50}px;
        top: ${e.clientY - rect.top - 50}px;
        animation: ripple 0.8s ease-out;
        pointer-events: none;
      `;
      
      item.style.position = 'relative';
      item.appendChild(ripple);
      
      setTimeout(() => {
        if (item.contains(ripple)) {
          item.removeChild(ripple);
        }
      }, 800);
    });
  });

  // Add wiggle and ripple animations
  const contactStyle = document.createElement('style');
  contactStyle.textContent = `
    @keyframes wiggle {
      0%, 100% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(-10deg) scale(1.1); }
      75% { transform: rotate(10deg) scale(1.1); }
    }
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(contactStyle);
}

// ===== TAG HOVER EFFECTS (Home Page Only) =====
const tags = document.querySelectorAll('.tag');

if (tags.length > 0) {
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });
}

// ===== TIMELINE ANIMATIONS (Education Page Only) =====
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(40px)';
    item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
    timelineObserver.observe(item);
  });
}

// ===== LOGO EASTER EGG (Click 5 times) =====
let clickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
  logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
      gamingEffect();
      clickCount = 0;
    }
  });
}

function gamingEffect() {
  const symbols = ['🎮', '🕹️', '👾', '🎯', '⚡', '💫', '✨', '🌟'];
  const duration = 5000;
  const interval = 80;
  
  const effectInterval = setInterval(() => {
    const symbol = document.createElement('div');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -50px;
      font-size: ${2 + Math.random() * 2}rem;
      pointer-events: none;
      z-index: 9999;
      filter: drop-shadow(0 0 10px rgba(167, 139, 250, 0.8));
      animation: fall ${2 + Math.random()}s linear forwards;
    `;
    
    document.body.appendChild(symbol);
    
    setTimeout(() => {
      if (document.body.contains(symbol)) {
        document.body.removeChild(symbol);
      }
    }, 3000);
  }, interval);
  
  setTimeout(() => {
    clearInterval(effectInterval);
  }, duration);
}

// Add fall animation for easter egg
const fallStyle = document.createElement('style');
fallStyle.textContent = `
  @keyframes fall {
    to {
      transform: translateY(120vh) rotate(${Math.random() * 720 - 360}deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(fallStyle);

// ===== BUTTON HOVER SOUND EFFECT (Optional) =====
const buttons = document.querySelectorAll('.btn, .glass-btn');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== CONSOLE EASTER EGG =====
console.log('%c🎮 GAMING CONSOLE WEBSITE', 'color: #667eea; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(102, 126, 234, 0.5);');
console.log('%c▶️ Press START to continue...', 'color: #8b5cf6; font-size: 18px; font-weight: bold;');
console.log('%c📧 Contact: gamedev@console.com', 'color: #a78bfa; font-size: 14px;');

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && mobileMenu) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Space or Enter on theme toggle
  if ((e.key === ' ' || e.key === 'Enter') && e.target === themeToggle) {
    e.preventDefault();
    themeToggle.click();
  }
});

// Focus trap for mobile menu
if (mobileMenu) {
  const focusableElements = mobileMenu.querySelectorAll('button, a');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

// ===== SMOOTH PAGE TRANSITIONS =====
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== INTERSECTION OBSERVER FOR LAZY LOADING =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== PRELOAD CRITICAL RESOURCES =====
window.addEventListener('DOMContentLoaded', () => {
  if (profilePic) {
    const img = new Image();
    img.src = profilePic.src;
  }
});

// ===== DYNAMIC YEAR UPDATE IN FOOTER =====
const footerYear = document.querySelector('.footer-tagline strong');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.textContent = footerYear.textContent.replace(/\d{4}/, currentYear);
}

// ===== PARALLAX SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.2);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== SMOOTH SCROLL TO TOP =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add smooth scroll to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== PREVENT FLASH ON PAGE LOAD =====
(function() {
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (savedTheme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (systemTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }
})();

// ===== GAMING CONSOLE WELCOME MESSAGE =====
setTimeout(() => {
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    console.log('%c🎮 WELCOME TO THE GAME!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cTheme System: Light → Dark → System Default (Auto)', 'color: #a78bfa; font-size: 14px;');
  }
}, 1000);

// ===== END OF SCRIPT =====
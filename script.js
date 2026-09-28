/* ============================================
   FRESHSTEP UF - JAVASCRIPT
   ============================================ */

// ============================================
// Mobile Navigation
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offset = 80; // Account for sticky navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('[data-animation]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#2D5A3D' : '#D32F2F'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 90vw;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// Particle Animation Enhancement
// ============================================

function animateParticles() {
    const particles = document.querySelectorAll('.odor-particle, .moisture-particle');
    
    particles.forEach((particle, index) => {
        // Restart animation by cloning and replacing
        const clone = particle.cloneNode(true);
        particle.parentNode.replaceChild(clone, particle);
    });
}

// Restart particle animations every 4 seconds
setInterval(animateParticles, 4000);

// ============================================
// Lazy Loading for SVGs
// ============================================

if ('IntersectionObserver' in window) {
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target;
                if (svg.dataset.src) {
                    svg.src = svg.dataset.src;
                }
                observer.unobserve(svg);
            }
        });
    });

    document.querySelectorAll('svg[data-src]').forEach(svg => {
        lazyLoadObserver.observe(svg);
    });
}

// ============================================
// Active Navigation Link
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// Scroll Progress Indicator (Optional Enhancement)
// ============================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2D5A3D, #8B9B7F);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

initScrollProgress();

// ============================================
// Add CSS for Animations to Head
// ============================================

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .nav-link.active {
            color: #2D5A3D;
            font-weight: 600;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

addAnimationStyles();

// ============================================
// Performance: Debounce Scroll Events
// ============================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Debounce active nav link update
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// ============================================
// Print Styles Enhancement
// ============================================

const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar,
        .footer,
        .hamburger {
            display: none;
        }
        
        body {
            line-height: 1.6;
            color: #000;
        }
        
        a {
            text-decoration: underline;
        }
    }
`;
document.head.appendChild(printStyles);

// ============================================
// Utility: Scroll to Top Button (Optional)
// ============================================

function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #2D5A3D;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: none;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('hover', () => {
        scrollToTopBtn.style.backgroundColor = '#8B9B7F';
    });
}

initScrollToTop();

// ============================================
// Accessibility: Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// ============================================
// Analytics: Track Page Views (Optional)
// ============================================

function trackPageView() {
    // This is where you would integrate with Google Analytics
    // or another analytics service
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            'page_path': window.location.pathname
        });
    }
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView);
} else {
    trackPageView();
}

// ============================================
// Feature Detection
// ============================================

function detectFeatures() {
    const features = {
        hasLocalStorage: typeof(Storage) !== 'undefined',
        hasServiceWorker: 'serviceWorker' in navigator,
        hasIntersectionObserver: 'IntersectionObserver' in window,
        hasTouchEvent: 'ontouchstart' in window
    };
    
    return features;
}

const browserFeatures = detectFeatures();

// ============================================
// Theme/Dark Mode Toggle (Optional Future Feature)
// ============================================

function initThemeToggle() {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Store preference
    const savedTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');
    
    // Note: Full dark mode implementation would require additional CSS
    // This is a foundation for future dark mode support
    console.log('Current theme preference:', savedTheme);
}

initThemeToggle();

// ============================================
// Export for Testing (if using modules)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        showNotification,
        debounce
    };
}

// ============================================
// Initialization Complete
// ============================================

console.log('FreshStep UF Website - Initialized successfully');
console.log('Browser features:', browserFeatures);

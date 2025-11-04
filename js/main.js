// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Countdown timer for first class
function updateCountdown() {
    const today = new Date();
    const targetTime = new Date();
    targetTime.setHours(8, 30, 0, 0); // 08:30

    // If it's already past 8:30, set to tomorrow
    if (today > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const now = new Date();
    const diff = targetTime - now;

    if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown').textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        document.getElementById('countdown').textContent = '¡En curso!';
    }
}

// Set today's date
function setTodayDate() {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('today-date').textContent =
        today.toLocaleDateString('es-ES', options);
}

// Utility functions
function showMessage(type, text) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;

    document.body.appendChild(message);
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.zIndex = '3000';
    message.style.padding = '1rem 1.5rem';
    message.style.borderRadius = '8px';
    message.style.fontWeight = '500';
    message.style.maxWidth = '300px';
    message.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    if (type === 'success') {
        message.style.background = '#10b981';
        message.style.color = 'white';
    } else {
        message.style.background = '#ef4444';
        message.style.color = 'white';
    }

    setTimeout(() => {
        if (document.body.contains(message)) {
            document.body.removeChild(message);
        }
    }, 5000);
}

// Welcome message for CLM students
function showWelcomeMessage() {
    showMessage('success', '¡Bienvenidos al Intensivo 3! Nos vemos en clase a las 08:30h');
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown and date
    setTodayDate();
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Show welcome message after a short delay
    setTimeout(showWelcomeMessage, 2000);

    // Observe elements for scroll animations
    document.querySelectorAll('.card, .week-card, .schedule-container').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = e.target.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.background = '#1f2937';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = '8px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.zIndex = '3000';
            tooltip.style.whiteSpace = 'nowrap';
        });

        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        });
    });

    // Add UGR branding enhancement
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.background = 'linear-gradient(135deg, #E30613 0%, #8B0000 100%)';
        logo.textContent = 'UGR';
        logo.style.fontSize = '1.1rem';
    }
});

// Add CSS for scroll animations and UGR styling
const style = document.createElement('style');
style.textContent = `
    .scroll-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .scroll-animate.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .message {
        animation: slideInRight 0.3s ease;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    #countdown {
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .hero .info-card:nth-child(2) {
        background: linear-gradient(135deg, var(--accent-color) 0%, #f97316 100%);
        color: white;
    }

    .hero .info-card:nth-child(5) {
        background: linear-gradient(135deg, var(--secondary-color) 0%, #2563eb 100%);
        color: white;
    }
`;
document.head.appendChild(style);

// Analytics tracking (placeholder)
function trackEvent(eventName, data) {
    console.log('Event tracked:', eventName, data);
    // Implement actual analytics tracking here
}

// Initialize tooltips and other interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Track page view
    trackEvent('page_view', {
        page: 'intensivo-3-home',
        timestamp: new Date().toISOString()
    });
});
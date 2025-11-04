// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const enrollmentForm = document.querySelector('#enrollmentForm');

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

// Form handler
enrollmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(enrollmentForm);
    const enrollmentData = Object.fromEntries(formData.entries());

    // Validate terms acceptance
    if (!enrollmentData.terms) {
        showMessage('error', 'Debes aceptar los términos y condiciones');
        return;
    }

    // Show loading state
    const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await simulateAPICall();

        // Show success message
        showMessage('success', '¡Solicitud de inscripción enviada correctamente! Te contactaremos pronto.');

        // Store enrollment data
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        enrollments.push({
            ...enrollmentData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('enrollments', JSON.stringify(enrollments));

        // Reset form
        enrollmentForm.reset();

        // Show confirmation details
        showConfirmationModal(enrollmentData);

    } catch (error) {
        showMessage('error', 'Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

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

function simulateAPICall() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

function showConfirmationModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;

    modalContent.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-check" style="color: white; font-size: 1.5rem;"></i>
            </div>
            <h3 style="color: #1f2937; margin-bottom: 1rem;">¡Inscripción Recibida!</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">Gracias por tu interés en el curso Intensivo 3.</p>

            <div style="text-align: left; background: #f9fafb; padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                <h4 style="color: #1f2937; margin-bottom: 1rem;">Detalles de tu solicitud:</h4>
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Fecha de inicio preferida:</strong> ${formatDate(data.start_date)}</p>
                <p><strong>Nivel actual:</strong> ${getLevelText(data.current_level)}</p>
            </div>

            <p style="color: #6b7280; margin-bottom: 2rem; font-size: 0.9rem;">
                Nos pondremos en contacto contigo en las próximas 24-48 horas para completar tu inscripción y resolver cualquier duda.
            </p>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.closest('.modal').remove()" style="background: linear-gradient(135deg, #E30613 0%, #b71c1c 100%); color: white; border: none; padding: 0.8rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function getLevelText(level) {
    const levels = {
        'beginner': 'Principiante absoluto (A1)',
        'elemental': 'Elemental (A1-A2)',
        'pre-a2': 'Pre-intermedio (接近 A2)',
        'a2': 'A2 (quiero repasar)'
    };
    return levels[level] || level;
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
    // Observe elements for scroll animations
    document.querySelectorAll('.card, .week-card, .schedule-container, .enrollment-form').forEach(el => {
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

    // Add form validation enhancements
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#10b981';
            }
        });
    });

    // Email validation
    const emailInput = document.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#ef4444';
                showMessage('error', 'Por favor, introduce un email válido');
            } else if (emailInput.value.trim()) {
                emailInput.style.borderColor = '#10b981';
            }
        });
    }

    // Phone validation
    const phoneInput = document.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneInput.style.borderColor = '#ef4444';
                showMessage('error', 'Por favor, introduce un teléfono válido');
            } else if (phoneInput.value.trim()) {
                phoneInput.style.borderColor = '#10b981';
            }
        });
    }
});

// Add CSS for scroll animations
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

    input:invalid {
        border-color: #ef4444 !important;
    }

    input:valid {
        border-color: #10b981 !important;
    }

    select:invalid {
        border-color: #ef4444 !important;
    }

    select:valid {
        border-color: #10b981 !important;
    }

    textarea:invalid {
        border-color: #ef4444 !important;
    }

    textarea:valid {
        border-color: #10b981 !important;
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
// AIR Dealer Presentation JavaScript
// Implements smooth scrolling, fade-in animations, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSmoothScrolling();
    initInteractiveElements();
    initNavigationHighlight();
    initLanguageToggle();
});

// Scroll-based fade-in animations
function initScrollAnimations() {
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

    // Add fade-in class to elements and observe them
    const animatedElements = [
        '.section-header',
        '.problem-item',
        '.solution-item',
        '.agent-card',
        '.dashboard-mockup',
        '.dashboard-features',
        '.arch-box',
        '.pricing-card',
        '.table-row',
        '.timeline-item',
        '.benefit-item'
    ];

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-item[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Interactive elements and hover effects
function initInteractiveElements() {
    // Agent cards hover effects
    const agentCards = document.querySelectorAll('.agent-card');
    agentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Pricing cards interaction
    const pricingCards = document.querySelectorAll('.pricing-card:not(.featured)');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove featured class from all cards
            document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('featured'));
            // Add featured class to clicked card
            this.classList.add('featured');
        });
    });

    // Architecture boxes animation
    const archBoxes = document.querySelectorAll('.arch-box');
    archBoxes.forEach((box, index) => {
        box.addEventListener('mouseenter', function() {
            // Animate the arrow after this box
            const nextArrow = this.parentElement.querySelector('.arch-arrow');
            if (nextArrow) {
                nextArrow.style.transform = 'scale(1.2)';
                nextArrow.style.color = '#F4E146'; // Lemon accent
            }
        });
        
        box.addEventListener('mouseleave', function() {
            const nextArrow = this.parentElement.querySelector('.arch-arrow');
            if (nextArrow) {
                nextArrow.style.transform = 'scale(1)';
                nextArrow.style.color = '#1464F4'; // Back to signature blue
            }
        });
    });

    // Timeline markers interaction
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#F4E146'; // Lemon accent
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#1464F4'; // Back to signature blue
        });
    });

    // Button interactions
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Navigation highlight based on scroll position
function initNavigationHighlight() {
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');
    const sections = document.querySelectorAll('.section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Parallax effect for geometric elements
function initParallaxEffect() {
    const geometricElements = document.querySelectorAll('.geo-line, .geo-circle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        geometricElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Initialize parallax effect
initParallaxEffect();

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-item.active {
        color: #1464F4;
        position: relative;
    }
    
    .nav-item.active::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        height: 2px;
        background: #1464F4;
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Typing animation for cover title
function initTypingAnimation() {
    const titleElement = document.querySelector('.cover-title');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let index = 0;
    const speed = 50;
    
    function typeWriter() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize typing animation when cover section is visible
const coverObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initTypingAnimation();
            coverObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const coverSection = document.querySelector('.cover');
if (coverSection) {
    coverObserver.observe(coverSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Language switching functionality
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithTranslations = document.querySelectorAll('[data-en][data-ru]');
    
    // Set default language
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(currentLang);
    
    // Add click listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newLang = this.getAttribute('data-lang');
            if (newLang !== currentLang) {
                switchLanguage(newLang);
                currentLang = newLang;
                localStorage.setItem('preferredLanguage', newLang);
            }
        });
    });
    
    function switchLanguage(lang) {
        // Update all elements with translations
        elementsWithTranslations.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.innerHTML = translation;
            }
        });
        
        // Update active language button
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update document language
        document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
    }
}

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);
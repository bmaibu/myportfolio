
// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('#navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active Navigation & Scroll Progress
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / docHeight) * 100;

    document.querySelector('.scroll-progress').style.width = scrollProgress + '%';

    // Header scroll effect
    const header = document.getElementById('header');
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active nav highlighting
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollTop >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            if (entry.target.classList.contains('skill-card')) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const width = skillProgress.getAttribute('data-width');
                setTimeout(() => {
                    skillProgress.style.width = width + '%';
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Typing Animation
const typingElement = document.getElementById('typing-text');
const texts = [
    'MERN Stack Specialist',
    'Full Stack Developer',
    'React.js Enthusiast',
    'Backend Developer',
    'Frontend Designer',
    'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Calculator Functionality
const display = document.getElementById("display");
let openParenNext = true;

function addToDisplay(value) {
    const start = display.selectionStart || display.value.length;
    const end = display.selectionEnd || display.value.length;
    const currentValue = display.value;

    if (value === '()') {
        value = openParenNext ? '(' : ')';
        openParenNext = !openParenNext;
    }

    display.value = currentValue.slice(0, start) + value + currentValue.slice(end);
    const newCursorPos = start + value.length;
    display.setSelectionRange(newCursorPos, newCursorPos);
    display.focus();
}

function calculate() {
    try {
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        display.value = eval(expression);
    } catch {
        display.value = "Error";
        setTimeout(() => {
            display.value = "";
        }, 1500);
    }
}

function clearDisplay() {
    display.value = "";
    openParenNext = true;
}

function backspace() {
    const errors = ["Error", "Syntax Error", "⚠️"];
    if (errors.includes(display.value)) {
        clearDisplay();
    } else {
        const start = display.selectionStart || display.value.length;
        const end = display.selectionEnd || display.value.length;

        if (start === end && start > 0) {
            display.value = display.value.slice(0, start - 1) + display.value.slice(end);
            display.setSelectionRange(start - 1, start - 1);
        } else if (start !== end) {
            display.value = display.value.slice(0, start) + display.value.slice(end);
            display.setSelectionRange(start, start);
        }
    }
    display.focus();
}

// Keyboard Support for Calculator
document.addEventListener('keydown', (e) => {
    if (e.target.closest('.calculator-section')) {
        const key = e.key;
        
        if (/[0-9]/.test(key)) {
            e.preventDefault();
            addToDisplay(key);
        } else if (['+', '-', '*', '/', '%', '.', '(', ')'].includes(key)) {
            e.preventDefault();
            if (key === '*') addToDisplay('×');
            else if (key === '/') addToDisplay('÷');
            else if (key === '-') addToDisplay('−');
            else addToDisplay(key);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            calculate();
        } else if (key === 'Escape' || key === 'Delete') {
            e.preventDefault();
            clearDisplay();
        } else if (key === 'Backspace') {
            e.preventDefault();
            backspace();
        }
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send this data to a server
    // For now, we'll use a mailto link as a fallback
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage: ${data.message}`);
    
    window.location.href = `mailto:bmaibu213@gmail.com?subject=${subject}&body=${body}`;
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setTimeout(typeText, 1000);
});

// Easter Egg - Konami Code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konami.toString()) {
        document.body.style.filter = 'hue-rotate(180deg) invert(1)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        konamiCode = [];
    }
});

// Performance optimization - Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    // Your scroll handling code here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Scroll to top
const scrollTopBtn = document.getElementById("scrollTop");
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Optional: Show/hide scroll button based on scroll position
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.pointerEvents = "auto";
    } else {
        scrollTopBtn.style.opacity = "0";
        scrollTopBtn.style.pointerEvents = "none";
    }

});


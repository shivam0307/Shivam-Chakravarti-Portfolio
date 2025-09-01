// Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // Animated counters
    initializeCounters();
    
    // Skill progress bars
    initializeSkillBars();
    
    // Contact form
    initializeContactForm();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Initialize scroll-to-top button
    addScrollToTop();
    
    // Add loading animation
    initializePageLoad();
    
    // Hero section effects
    initializeHeroEffects();
    
    // Fix profile image display
    initializeProfileImage();
});

// Fix profile image display
function initializeProfileImage() {
    const profilePhoto = document.querySelector('.profile-photo');
    const imagePlaceholder = document.querySelector('.image-placeholder');
    
    if (profilePhoto && imagePlaceholder) {
        profilePhoto.onload = function() {
            // Hide placeholder when image loads
            imagePlaceholder.style.display = 'none';
            profilePhoto.style.display = 'block';
        };
        
        profilePhoto.onerror = function() {
            // Show placeholder if image fails to load
            imagePlaceholder.style.display = 'flex';
            profilePhoto.style.display = 'none';
        };
        
        // Initially hide both to prevent flicker
        if (profilePhoto.complete && profilePhoto.naturalHeight !== 0) {
            imagePlaceholder.style.display = 'none';
            profilePhoto.style.display = 'block';
        } else {
            imagePlaceholder.style.display = 'flex';
            profilePhoto.style.display = 'none';
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 70;
                    const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    updateActiveNavLink(this);
                }
            }
        });
    });

    // Hero button functionality
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#contact') {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 70;
                    const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // Let other links work normally (mailto, external links)
        });
    });

    // Update navbar on scroll
    let ticking = false;
    function updateNavbarOnScroll() {
        const scrolled = window.pageYOffset;
        
        // Add/remove navbar background on scroll
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(19, 52, 59, 0.98)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'rgba(19, 52, 59, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }

        // Update active navigation link based on scroll position
        updateActiveNavOnScroll();
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbarOnScroll);
            ticking = true;
        }
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Update active navigation based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 120; // Account for navbar height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // If we're at the very top, highlight "Home"
    if (window.pageYOffset < 100) {
        current = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animated counters for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 60;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        hasAnimated = true;
    };

    // Check if stats section is in view
    const statsSection = document.querySelector('.about-stats');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// Skill progress bar animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let hasAnimatedSkills = false;

    const animateSkillBars = () => {
        if (hasAnimatedSkills) return;
        
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 100 + 200);
        });
        
        hasAnimatedSkills = true;
    };

    // Check if skills section is in view
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission with feedback
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // Scroll to show the success message
                const messageElement = document.querySelector('.form-message');
                if (messageElement) {
                    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1500);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message with better styling
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message`;
    messageEl.innerHTML = `
        <div class="status status--${type}" style="margin: 0; padding: 12px 16px; border-radius: 6px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            ${message}
        </div>
    `;
    messageEl.style.marginBottom = '16px';
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.insertBefore(messageEl, contactForm.firstChild);
        
        // Auto-remove message after 8 seconds for success, 5 for error
        const timeout = type === 'success' ? 8000 : 5000;
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.opacity = '0';
                messageEl.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 300);
            }
        }, timeout);
    }
}

// Scroll animations for cards and elements
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .education-card, .certification-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Enhanced scroll-to-top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    let ticking = false;
    function updateScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollButton);
            ticking = true;
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Page load animation
function initializePageLoad() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    });
}

// Hero section effects
function initializeHeroEffects() {
    // Add typing effect to hero tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click-to-copy functionality for contact info
    const contactMethods = document.querySelectorAll('.contact-method a[href^="mailto:"], .contact-method a[href^="tel:"]');
    contactMethods.forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const text = this.textContent;
                
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyTooltip(this, 'Copied!');
                    }).catch(err => {
                        console.log('Copy failed:', err);
                        showCopyTooltip(this, 'Copy failed');
                    });
                } else {
                    // Fallback for older browsers
                    try {
                        const textArea = document.createElement('textarea');
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        showCopyTooltip(this, 'Copied!');
                    } catch (err) {
                        console.log('Copy failed:', err);
                        showCopyTooltip(this, 'Copy failed');
                    }
                }
            }
        });
    });
});

// Show copy tooltip
function showCopyTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.className = 'copy-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: var(--color-primary);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        white-space: nowrap;
        pointer-events: none;
        opacity: 1;
        transition: opacity 0.3s ease;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 300);
    }, 2000);
}

// Utility function to debounce events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
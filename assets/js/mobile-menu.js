// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Update toggle button icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Hide mobile menu on desktop
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Mobile touch improvements
    if ('ontouchstart' in window) {
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('.btn, .nav-links a, .contact-item');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Improve scroll performance on mobile
        let ticking = false;
        function updateScroll() {
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Mobile form improvements
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus styles for mobile
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
            
            // Prevent zoom on iOS when focusing on inputs
            if (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.type === 'password') {
                input.style.fontSize = '16px';
            }
        });
        
        // Handle form submission on mobile
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Re-enable button after a delay (for demo purposes)
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Mobile performance optimizations
    if (window.innerWidth <= 768) {
        // Reduce animations on mobile
        const animatedElements = document.querySelectorAll('.project-card, .skill-category, .card');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
        });
        
        // Lazy load images for better performance
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Mobile accessibility improvements
    if (window.innerWidth <= 768) {
        // Ensure proper focus management
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--primary-blue)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
        
        // Improve keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close mobile menu on escape
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    if (mobileToggle) {
                        const icon = mobileToggle.querySelector('i');
                        icon.className = 'fas fa-bars';
                    }
                }
            }
        });
    }
    
    // Mobile theme toggle improvements
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.9)';
        });
        
        themeToggle.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }
    
    // Mobile scroll improvements
    if (window.innerWidth <= 768) {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Prevent horizontal scroll
        document.body.style.overflowX = 'hidden';
    }
});

// Mobile-specific utility functions
const MobileUtils = {
    // Check if device is mobile
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Check if device supports touch
    isTouchDevice: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },
    
    // Add mobile-specific classes to body
    addMobileClasses: function() {
        if (this.isMobile()) {
            document.body.classList.add('mobile-device');
        }
        if (this.isTouchDevice()) {
            document.body.classList.add('touch-device');
        }
    },
    
    // Handle mobile orientation changes
    handleOrientationChange: function() {
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                // Recalculate layout after orientation change
                window.dispatchEvent(new Event('resize'));
            }, 100);
        });
    }
};

// Initialize mobile utilities
document.addEventListener('DOMContentLoaded', function() {
    MobileUtils.addMobileClasses();
    MobileUtils.handleOrientationChange();
}); 
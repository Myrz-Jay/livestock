// Livestock Sitting Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Animate numbers in hero badges
    const animateNumber = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateNumber = () => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + '+';
            } else {
                element.textContent = Math.floor(current).toLocaleString() + '+';
                requestAnimationFrame(updateNumber);
            }
        };
        
        updateNumber();
    };
    
    // Intersection Observer for badge animations
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('.badge-number');
                badges.forEach(badge => {
                    const text = badge.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(number)) {
                        animateNumber(badge, number);
                    }
                });
                badgeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const trustBadges = document.querySelector('.trust-badges');
    if (trustBadges) {
        badgeObserver.observe(trustBadges);
    }
    
    // Smooth scroll to packages when clicking hero CTA
    const packageLinks = document.querySelectorAll('a[href="#packages"]');
    packageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const packagesSection = document.getElementById('packages');
            if (packagesSection) {
                packagesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate animal cards on scroll
    const animalCards = document.querySelectorAll('.animal-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 100);
                }, 100);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animalCards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });
    
    // Process timeline animation
    const processSteps = document.querySelectorAll('.process-step');
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 150);
                }, 200);
                
                stepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        stepObserver.observe(step);
    });
    
    // Package cards hover effect
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
                this.style.borderColor = 'var(--primary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
    
    // Testimonial cards animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }, 100);
                
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        testimonialObserver.observe(card);
    });
    
});

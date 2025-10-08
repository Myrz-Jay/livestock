// Shearing Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate service areas on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Animate area cards
    const areaCards = document.querySelectorAll('.area-card');
    const areaObserver = new IntersectionObserver(function(entries) {
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
                
                areaObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    areaCards.forEach(card => {
        card.style.opacity = '0';
        areaObserver.observe(card);
    });
    
    // Animate client items
    const clientItems = document.querySelectorAll('.client-item');
    const clientObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.4s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 50);
                }, 100);
                
                clientObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    clientItems.forEach(item => {
        item.style.opacity = '0';
        clientObserver.observe(item);
    });
    
    // Season cards hover effect
    const seasonCards = document.querySelectorAll('.season-card');
    seasonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
    
    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-actions a[href^="#"], .cta-buttons a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Animate trust indicators numbers
    const trustNumbers = document.querySelectorAll('.trust-item h3');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Check if it contains a number
                if (text.includes('+')) {
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.match(/[^\d]+$/)[0];
                    let current = 0;
                    
                    const increment = Math.ceil(number / 50);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        element.textContent = current.toLocaleString() + suffix;
                    }, 30);
                }
                
                numberObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    trustNumbers.forEach(number => {
        if (number.textContent.includes('+')) {
            numberObserver.observe(number);
        }
    });
    
    // Service list items animation
    const serviceLists = document.querySelectorAll('.service-list');
    const listObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.3s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 50);
                    }, 200);
                });
                
                listObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach(item => {
            item.style.opacity = '0';
        });
        listObserver.observe(list);
    });
});

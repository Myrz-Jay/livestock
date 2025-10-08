// Petting Farms Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items in the same column
            const column = faqItem.parentElement;
            column.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const navButtons = document.querySelectorAll('.nav-btn');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        navButtons[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 7000);
    
    // Nav button clicks
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Animate animals on hover
    const animalItems = document.querySelectorAll('.animal-item');
    
    animalItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.animal-image');
            image.style.animation = 'wiggle 0.5s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.animal-image');
            setTimeout(() => {
                image.style.animation = 'bounce 2s infinite';
            }, 500);
        });
    });
    
    // Smooth scroll to packages
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
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Animate showcase cards
    const showcaseCards = document.querySelectorAll('.showcase-card');
    const showcaseObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }, 100);
                
                showcaseObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    showcaseCards.forEach(card => {
        card.style.opacity = '0';
        showcaseObserver.observe(card);
    });
    
    // Animate animal gallery
    const animalsObserver = new IntersectionObserver((entries) => {
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
                
                animalsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animalItems.forEach(item => {
        item.style.opacity = '0';
        animalsObserver.observe(item);
    });
    
    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                const text = numberElement.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.includes('+') ? '+' : '';
                
                let current = 0;
                const increment = number / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                        numberElement.textContent = number.toLocaleString() + suffix;
                    } else {
                        numberElement.textContent = Math.floor(current).toLocaleString() + suffix;
                    }
                }, 30);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
    
    // Package hover effects
    const packages = document.querySelectorAll('.package');
    
    packages.forEach(pkg => {
        pkg.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }
        });
        
        pkg.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }, 200);
                
                processObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        processObserver.observe(step);
    });
    
    // Event cards hover
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.event-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.event-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
});

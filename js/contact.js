// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('booking-enquiry');
    const serviceSelect = document.getElementById('service');
    const eventFields = document.getElementById('event-fields');
    
    // Show/hide event fields based on service selection
    serviceSelect.addEventListener('change', function() {
        const eventServices = ['birthday-party', 'school-event', 'aged-care', 'corporate-event', 'wedding', 'christmas-party'];
        
        if (eventServices.includes(this.value)) {
            eventFields.style.display = 'block';
            // Smooth scroll to show new fields
            setTimeout(() => {
                eventFields.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            eventFields.style.display = 'none';
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            } else {
                clearError(field);
            }
        });
        
        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        const phoneField = document.getElementById('phone');
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (phoneField.value && !phoneRegex.test(phoneField.value)) {
            showError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Date validation - must be in the future
        const dateField = document.getElementById('date');
        if (dateField.value) {
            const selectedDate = new Date(dateField.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showError(dateField, 'Please select a future date');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    // Clear error message
    function clearError(field) {
        field.classList.remove('error');
        field.classList.add('success');
        
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Real-time validation
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showError(this, 'This field is required');
            } else {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearError(this);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Allow form to submit to Netlify - no preventDefault()
        // Netlify will handle the submission and redirect to success page
    });
    
    // Set minimum date to today
    const dateField = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateField.setAttribute('min', today);
    
    // Animate info cards on scroll
    const infoCards = document.querySelectorAll('.info-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }, 100);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    infoCards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });
    
    // Animate regions on hover
    const regions = document.querySelectorAll('.region');
    regions.forEach(region => {
        region.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.region-icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        region.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.region-icon');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Smooth scroll for quick contact links
    document.querySelectorAll('.quick-contact').forEach(link => {
        if (link.getAttribute('href')?.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
});

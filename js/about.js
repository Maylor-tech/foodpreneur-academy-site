document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements as they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.value-card, .expertise-content, .impact-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-fade-in');
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements in view on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Handle value card hover effects
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.value-icon');
            icon.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.value-icon');
            icon.style.transform = 'scale(1)';
        });
    });

    // Handle impact card hover effects
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const number = card.querySelector('.impact-number');
            number.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            const number = card.querySelector('.impact-number');
            number.style.transform = 'scale(1)';
        });
    });

    // Add smooth scroll to CTA button
    const ctaButton = document.querySelector('.cta-section a');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(ctaButton.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}); 
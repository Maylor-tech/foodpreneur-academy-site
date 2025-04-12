document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');

    // Initialize page transitions
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
        setTimeout(() => {
            mainContent.classList.add('active');
        }, 50);
    }

    // Add transition classes to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-up');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => observer.observe(element));
    slideElements.forEach(element => observer.observe(element));

    // Handle navigation with transitions
    document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't handle external links or anchor links
            if (link.hostname !== window.location.hostname || link.hash) {
                return;
            }

            e.preventDefault();
            const targetUrl = link.href;

            // Show loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            document.body.appendChild(loadingOverlay);
            setTimeout(() => loadingOverlay.classList.add('active'), 10);

            // Fade out current page
            if (mainContent) {
                mainContent.classList.remove('active');
            }

            // Load new page
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });
}); 
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ROI Calculator
    const roiCalculator = document.getElementById('roiCalculator');
    const roiResults = document.getElementById('roiResults');

    if (roiCalculator) {
        roiCalculator.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const monthlyRevenue = parseFloat(document.getElementById('monthlyRevenue').value);
            const currentProfitMargin = parseFloat(document.getElementById('currentProfitMargin').value) / 100;
            
            if (isNaN(monthlyRevenue) || isNaN(currentProfitMargin)) {
                showMessage('Please enter valid numbers', 'error');
                return;
            }

            // Calculate potential savings
            const foodCostSavings = monthlyRevenue * 0.08; // 8% reduction in food costs
            const laborCostSavings = monthlyRevenue * 0.05; // 5% reduction in labor costs
            const wasteSavings = monthlyRevenue * 0.03; // 3% reduction in waste

            // Update results display
            document.getElementById('foodCostSavings').textContent = formatCurrency(foodCostSavings * 12);
            document.getElementById('laborCostSavings').textContent = formatCurrency(laborCostSavings * 12);
            document.getElementById('wasteSavings').textContent = formatCurrency(wasteSavings * 12);
            document.getElementById('totalSavings').textContent = formatCurrency((foodCostSavings + laborCostSavings + wasteSavings) * 12);

            // Show results
            roiResults.classList.remove('hidden');
            
            // Track calculator usage
            Analytics.trackEvent('roi_calculator_used', {
                monthlyRevenue,
                currentProfitMargin,
                potentialSavings: (foodCostSavings + laborCostSavings + wasteSavings) * 12
            });
        });
    }

    // Initialize pricing card animations
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize testimonial animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Format currency helper
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Show message helper
    function showMessage(message, type = 'success') {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    // Analytics tracking
    const Analytics = {
        trackEvent: (eventName, data) => {
            // In a real implementation, this would send data to your analytics platform
            console.log('Event tracked:', eventName, data);
            
            // Store in localStorage for later analysis
            const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
            events.push({
                timestamp: new Date().toISOString(),
                event: eventName,
                data: data
            });
            localStorage.setItem('analytics_events', JSON.stringify(events));
        }
    };
}); 
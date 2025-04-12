document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('leadForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        restaurant: document.getElementById('restaurant').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
      };

      try {
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Send form data to your backend (you'll need to set this up)
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          // Show success message
          contactForm.innerHTML = `
            <div class="success-message">
              <h3>Thank you for your interest!</h3>
              <p>We've received your message and will get back to you within 24 hours.</p>
            </div>
          `;
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Sorry, there was an error sending your message. Please try again later.';
        contactForm.appendChild(errorDiv);
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }
}); 
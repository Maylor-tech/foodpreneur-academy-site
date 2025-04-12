class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.init();
    }

    init() {
        if (!this.form) return;

        // Get all form fields
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            this.fields[field.id] = {
                element: field,
                valid: false,
                error: null
            };
        });

        // Add event listeners
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    validateField(field) {
        const fieldData = this.fields[field.id];
        if (!fieldData) return;

        // Clear previous error
        this.clearError(field);

        // Validate based on field type
        let isValid = true;
        let errorMessage = '';

        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (field.type === 'tel' && !this.isValidPhone(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        } else if (field.type === 'number' && field.min && parseFloat(field.value) < parseFloat(field.min)) {
            isValid = false;
            errorMessage = `Value must be at least ${field.min}`;
        }

        fieldData.valid = isValid;
        fieldData.error = errorMessage;

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[\d\s-+()]{10,}$/.test(phone);
    }

    showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.classList.add('error');
        field.parentNode.appendChild(errorDiv);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        // Validate all fields
        let isValid = true;
        Object.values(this.fields).forEach(fieldData => {
            if (!this.validateField(fieldData.element)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="loading-spinner"></span>
            <span>Processing...</span>
        `;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            this.form.reset();
            Object.values(this.fields).forEach(fieldData => {
                fieldData.valid = false;
                fieldData.error = null;
            });
        } catch (error) {
            // Show error message
            this.showErrorMessage('Failed to submit form. Please try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-icon">✓</div>
            <div class="success-text">
                <h3>Thank You!</h3>
                <p>Your submission has been received. We'll get back to you soon.</p>
            </div>
        `;
        
        this.form.parentNode.insertBefore(successDiv, this.form.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message global';
        errorDiv.textContent = message;
        
        this.form.parentNode.insertBefore(errorDiv, this.form.nextSibling);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize form validation for all forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = ['contactForm', 'leadForm', 'businessCalculator'];
    forms.forEach(formId => {
        if (document.getElementById(formId)) {
            new FormValidator(formId);
        }
    });
}); 
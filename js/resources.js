// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for lazy loading
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('.resource-card').forEach(card => {
        observer.observe(card);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize popular resources
        updatePopularResources();
        
        // Newsletter form submission
        setupNewsletterForm();

        // Resource filtering and search
        setupResourceFiltering();

        // Download tracking
        setupDownloadTracking();

        // Initialize intersection observer
        observeElements();

        // Setup resource previews
        setupResourcePreviews();
    } catch (error) {
        console.error('Error initializing resources page:', error);
        showMessage('Something went wrong. Please refresh the page.', 'error');
    }
});

// Separate newsletter form setup for better organization
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('resourcesNewsletter');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        if (!validateEmail(emailInput.value)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';

            await subscribeToNewsletter(emailInput.value);

            // Track successful subscription
            Analytics.trackEvent(Analytics.events.NEWSLETTER_SUBSCRIBE, {
                success: true
            });

            emailInput.value = '';
            showMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            
            // Track failed subscription
            Analytics.trackEvent(Analytics.events.NEWSLETTER_SUBSCRIBE, {
                success: false,
                error: error.message
            });
            
            showMessage('Failed to subscribe. Please try again later.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mock newsletter subscription function (replace with actual API call)
async function subscribeToNewsletter(email) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
}

// Resource filtering setup with debounced search
function setupResourceFiltering() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search resources...';
    searchInput.className = 'resource-search';
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'resource-filters';
    
    const filters = ['All', 'Excel', 'Word', 'PDF'];
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.textContent = filter;
        button.className = `filter-btn ${filter === 'All' ? 'active' : ''}`;
        button.addEventListener('click', () => filterResources(filter.toLowerCase()));
        filterContainer.appendChild(button);
    });

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'resource-controls';
    controlsContainer.appendChild(searchInput);
    controlsContainer.appendChild(filterContainer);

    const resourcesSection = document.querySelector('.resources-grid .container');
    if (resourcesSection) {
        resourcesSection.insertBefore(controlsContainer, resourcesSection.firstChild);
        
        // Debounced search handler
        const debouncedSearch = debounce((searchTerm) => {
            const resources = document.querySelectorAll('.resource-card');
            resources.forEach(resource => {
                const title = resource.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = resource.querySelector('p')?.textContent.toLowerCase() || '';
                const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
                resource.style.display = isVisible ? 'flex' : 'none';
            });
        }, 300);

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            debouncedSearch(searchTerm);
            
            // Track search event
            if (searchTerm.length > 2) {
                Analytics.trackEvent(Analytics.events.RESOURCE_SEARCH, {
                    searchTerm,
                    resultCount: document.querySelectorAll('.resource-card[style*="flex"]').length
                });
            }
        });

        // Track filter usage
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                Analytics.trackEvent(Analytics.events.RESOURCE_FILTER, {
                    filterType: e.target.textContent.toLowerCase()
                });
            }
        });
    }
}

// Download tracking setup
function setupDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            try {
                const resourceCard = button.closest('.resource-card');
                if (!resourceCard) return;

                const resourceName = resourceCard.querySelector('h3')?.textContent;
                if (resourceName) {
                    trackDownload(resourceName);
                    updatePopularResources();
                }
            } catch (error) {
                console.error('Error tracking download:', error);
            }
        });
    });
}

// Update popular resources section
function updatePopularResources() {
    const downloads = JSON.parse(localStorage.getItem('resourceDownloads') || '{}');
    const popularResourcesGrid = document.querySelector('.popular-resources-grid');
    
    if (!popularResourcesGrid) return;

    // Convert downloads object to sorted array
    const sortedResources = Object.entries(downloads)
        .sort(([, a], [, b]) => b - a) // Sort by download count
        .slice(0, 3); // Get top 3

    if (sortedResources.length === 0) {
        // If no downloads yet, hide the section
        document.querySelector('.popular-resources').style.display = 'none';
        return;
    }

    // Show the section
    document.querySelector('.popular-resources').style.display = 'block';
    
    // Clear existing content
    popularResourcesGrid.innerHTML = '';

    // Add popular resource cards
    sortedResources.forEach(([name, count]) => {
        const card = document.createElement('div');
        card.className = 'popular-resource-card';
        
        card.innerHTML = `
            <div class="popular-resource-header">
                <h3 class="popular-resource-title">${name}</h3>
                <span class="download-count">${count} downloads</span>
            </div>
            <a href="#" class="download-btn" onclick="findAndTriggerDownload('${name}')">
                Download Again
            </a>
        `;
        
        popularResourcesGrid.appendChild(card);
    });
}

// Helper function to find and trigger original download button
function findAndTriggerDownload(resourceName) {
    const allResources = document.querySelectorAll('.resource-card');
    for (const resource of allResources) {
        const title = resource.querySelector('h3').textContent;
        if (title === resourceName) {
            resource.querySelector('.download-btn').click();
            break;
        }
    }
}

// Show message function
function showMessage(message, type = 'success') {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        background: ${type === 'success' ? '#059669' : '#dc2626'};
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    messageElement.textContent = message;

    // Add to document
    document.body.appendChild(messageElement);

    // Remove after delay
    setTimeout(() => {
        messageElement.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => messageElement.remove(), 300);
    }, 3000);
}

// Track download analytics
function trackDownload(resourceName) {
    // Implement analytics tracking here
    console.log(`Resource downloaded: ${resourceName}`);
    
    // Track download count in localStorage
    const downloads = JSON.parse(localStorage.getItem('resourceDownloads') || '{}');
    downloads[resourceName] = (downloads[resourceName] || 0) + 1;
    localStorage.setItem('resourceDownloads', JSON.stringify(downloads));
    
    // Update popular resources display
    updatePopularResources();

    // Track download event
    Analytics.trackEvent(Analytics.events.RESOURCE_DOWNLOAD, {
        resourceName,
        downloadCount: downloads[resourceName]
    });
}

// Filter resources by file type
const filterResources = (filterType) => {
    const resources = document.querySelectorAll('.resource-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === filterType);
    });

    resources.forEach(resource => {
        const fileType = resource.querySelector('.file-type').textContent.toLowerCase();
        if (filterType === 'all' || fileType === filterType) {
            resource.style.display = 'flex';
        } else {
            resource.style.display = 'none';
        }
    });
};

// Analytics tracking
const Analytics = {
    events: {
        RESOURCE_DOWNLOAD: 'resource_download',
        RESOURCE_SEARCH: 'resource_search',
        RESOURCE_FILTER: 'resource_filter',
        NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe'
    },

    trackEvent: async function(eventName, eventData = {}) {
        try {
            // Add common data
            const enrichedData = {
                ...eventData,
                timestamp: new Date().toISOString(),
                page: window.location.pathname,
                referrer: document.referrer
            };

            // Log to console in development
            if (window.location.hostname === 'localhost') {
                console.log('Analytics Event:', eventName, enrichedData);
            }

            // Store in localStorage for analysis
            const analytics = JSON.parse(localStorage.getItem('analytics') || '[]');
            analytics.push({ event: eventName, data: enrichedData });
            localStorage.setItem('analytics', JSON.stringify(analytics));

            // TODO: Send to analytics service when implemented
            // await fetch('/api/analytics', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ event: eventName, data: enrichedData })
            // });
        } catch (error) {
            console.error('Analytics Error:', error);
        }
    }
};

// Add necessary CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .resource-controls {
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .resource-search {
        padding: 0.75rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 1rem;
        width: 100%;
        max-width: 400px;
    }

    .resource-filters {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .filter-btn.active {
        background: #f97316;
        color: white;
        border-color: #f97316;
    }

    @media (min-width: 768px) {
        .resource-controls {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .resource-search {
            width: auto;
        }
    }
`;
document.head.appendChild(style);

// Resource Preview Modal
const Modal = {
    show: function(content) {
        const modal = document.createElement('div');
        modal.className = 'resource-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close preview">&times;</button>
                ${content}
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close handlers
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }
};

// Add preview functionality to resource cards
function setupResourcePreviews() {
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        const previewBtn = document.createElement('button');
        previewBtn.className = 'preview-btn';
        previewBtn.textContent = 'Preview';
        previewBtn.setAttribute('aria-label', 'Preview resource');

        previewBtn.addEventListener('click', async () => {
            const resourceName = card.querySelector('h3').textContent;
            const resourceType = card.querySelector('.file-type').textContent;
            
            try {
                // Show loading state
                previewBtn.disabled = true;
                previewBtn.textContent = 'Loading...';

                // Get preview content based on resource type
                const previewContent = await getResourcePreview(resourceName, resourceType);
                
                // Track preview event
                Analytics.trackEvent('resource_preview', {
                    resourceName,
                    resourceType
                });

                // Show preview modal
                Modal.show(previewContent);
            } catch (error) {
                console.error('Preview error:', error);
                showMessage('Failed to load preview', 'error');
            } finally {
                previewBtn.disabled = false;
                previewBtn.textContent = 'Preview';
            }
        });

        // Add preview button before download button
        const downloadBtn = card.querySelector('.download-btn');
        downloadBtn.parentNode.insertBefore(previewBtn, downloadBtn);
    });
}

// Get preview content for different resource types
async function getResourcePreview(resourceName, resourceType) {
    // This would typically fetch from an API
    // For now, return mock preview content
    const previewContent = `
        <div class="preview-container">
            <h3>${resourceName} Preview</h3>
            ${resourceType === 'Excel' ? `
                <div class="spreadsheet-preview">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        <tr>
                            <td>Sample Item 1</td>
                            <td>$10.00</td>
                            <td>2</td>
                            <td>$20.00</td>
                        </tr>
                        <!-- Add more sample rows -->
                    </table>
                </div>
            ` : `
                <div class="document-preview">
                    <p>Sample content preview for ${resourceName}</p>
                    <p>This is a preview of the document's structure and format.</p>
                </div>
            `}
            <p class="preview-note">Download the full resource to access all features and content.</p>
        </div>
    `;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return previewContent;
}

// Add modal styles
const modalStyles = `
    .resource-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        position: relative;
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        max-width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        z-index: 1;
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
    }

    .preview-btn {
        padding: 0.75rem 1.5rem;
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        margin-right: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .preview-btn:hover {
        background: #e5e7eb;
    }

    .preview-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .preview-container {
        min-width: 300px;
    }

    .spreadsheet-preview table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
    }

    .spreadsheet-preview th,
    .spreadsheet-preview td {
        border: 1px solid #e5e7eb;
        padding: 0.5rem;
        text-align: left;
    }

    .preview-note {
        margin-top: 1rem;
        color: #6b7280;
        font-style: italic;
    }

    @media (prefers-color-scheme: dark) {
        .modal-content {
            background: #1f2937;
            color: #f3f4f6;
        }

        .preview-btn {
            background: #374151;
            color: #f3f4f6;
            border-color: #4b5563;
        }

        .preview-btn:hover {
            background: #4b5563;
        }

        .spreadsheet-preview th,
        .spreadsheet-preview td {
            border-color: #4b5563;
        }

        .preview-note {
            color: #9ca3af;
        }
    }
`;

// Add styles to existing style element
style.textContent += modalStyles; 
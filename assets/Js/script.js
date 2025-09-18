// Virtual Encounters Popup
console.log('Script loaded');

// Dynamic pricing and slot data
const pricingData = {
    // Base prices that never change
    basePrices: {
        luxury: 333,
        deep: 200,
        intimate: 111
    }
};

// Function to get dynamic pricing data (in a real implementation, this could come from an API)
function getDynamicPricingData() {
    // In a real app, this would fetch from a server or use more complex logic
    // For now, we'll simulate changing data based on a weekly cycle
    
    // Get current date and determine "week number" for simulation
    const now = new Date();
    const weekNumber = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000)) % 4;
    
    // Different scenarios for different weeks
    const scenarios = [
        { discount: 1.25, slots: { luxury: 2, deep: 5, intimate: 8 }, days: 7 },  // Week 1: Highest discount, lowest slots
        { discount: 1.20, slots: { luxury: 3, deep: 6, intimate: 10 }, days: 7 }, // Week 2: High discount, low slots
        { discount: 1.15, slots: { luxury: 5, deep: 8, intimate: 12 }, days: 7 }, // Week 3: Medium discount, medium slots
        { discount: 1.10, slots: { luxury: 8, deep: 10, intimate: 15 }, days: 7 } // Week 4: Lower discount, more slots
    ];
    
    return scenarios[weekNumber];
}

// Function to calculate remaining days in current discount period
function getRemainingDays() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    
    const diffTime = endOfWeek - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
}

// Function to update pricing display
function updatePricingDisplay() {
    const dynamicData = getDynamicPricingData();
    const remainingDays = getRemainingDays();
    
    // Update luxury package pricing
    const luxuryOriginal = Math.round(pricingData.basePrices.luxury * dynamicData.discount);
    const luxuryCurrent = pricingData.basePrices.luxury;
    const luxurySavings = luxuryOriginal - luxuryCurrent;
    
    // Update DOM elements
    const originalPriceElement = document.querySelector('.original-price');
    const currentPriceElement = document.querySelector('.current-price');
    const slotsRemainingElement = document.querySelector('.slots-remaining');
    const discountAmountElement = document.querySelector('.discount-amount');
    const countdownElement = document.getElementById('discountCountdown');
    
    if (originalPriceElement) {
        originalPriceElement.textContent = '$' + luxuryOriginal;
        originalPriceElement.style.display = 'inline';
    }
    
    if (currentPriceElement) {
        currentPriceElement.textContent = '$' + luxuryCurrent;
    }
    
    if (slotsRemainingElement) {
        slotsRemainingElement.textContent = dynamicData.slots.luxury;
    }
    
    if (discountAmountElement) {
        discountAmountElement.innerHTML = 'Save $' + luxurySavings + ' with this exclusive offer!';
        discountAmountElement.style.display = 'block';
    }
    
    if (countdownElement) {
        countdownElement.textContent = remainingDays + ' day' + (remainingDays !== 1 ? 's' : '');
    }
}

// Function to update slots remaining display
function updateSlotsDisplay() {
    const dynamicData = getDynamicPricingData();
    
    // Update slots in services section
    const slotsElements = document.querySelectorAll('.slots-remaining');
    if (slotsElements.length >= 3) {
        // Assuming order is intimate, deep, luxury
        slotsElements[0].textContent = dynamicData.slots.intimate;
        slotsElements[1].textContent = dynamicData.slots.deep;
        slotsElements[2].textContent = dynamicData.slots.luxury;
    }
}

// Function to update countdown timer
function updateCountdownTimer() {
    const remainingDays = getRemainingDays();
    const countdownElement = document.getElementById('discountCountdown');
    
    if (countdownElement) {
        countdownElement.textContent = remainingDays + ' day' + (remainingDays !== 1 ? 's' : '');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded event fired');
    const popup = document.getElementById('virtualEncountersPopup');
    const closeBtn = document.querySelector('.popup-close');
    
    // Debugging
    console.log('DOM loaded, popup element:', popup);
    
    if (!popup) {
        console.error('Popup element not found');
        return;
    }
    
    // Update pricing and slots display
    updatePricingDisplay();
    updateSlotsDisplay();
    
    // Set up real-time countdown timer
    setInterval(updateCountdownTimer, 60000); // Update every minute
    
    // Show popup after 3 seconds on every page load
    console.log('Setting timeout to show popup');
    setTimeout(function() {
        console.log('Showing popup');
        // Try both approaches
        popup.style.display = 'block';
        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }, 3000); // Show after 3 seconds
    
    // Close popup when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            console.log('Closing popup via close button');
            popup.style.display = 'none';
            popup.classList.remove('show');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    }
    
    // Close popup when clicking outside the content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            console.log('Closing popup via outside click');
            popup.style.display = 'none';
            popup.classList.remove('show');
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // Also close popup with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && (popup.style.display === 'block' || popup.classList.contains('show'))) {
            console.log('Closing popup via ESC key');
            popup.style.display = 'none';
            popup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle "View all virtual session options" link click
    const viewAllLink = document.querySelector('.popup-text a[href="#services"]');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Closing popup and navigating to services section');
            popup.style.display = 'none';
            popup.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            // Scroll to services section
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Also try with window.onload as a fallback
window.addEventListener('load', function() {
    console.log('Window load event fired');
});

// AOS Animation Library Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems) {
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="Gallery Image">
                    <span class="lightbox-close">&times;</span>
                </div>
            `;
            document.body.appendChild(lightbox);

            lightbox.querySelector('.lightbox-close').addEventListener('click', function () {
                document.body.removeChild(lightbox);
            });

            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
}
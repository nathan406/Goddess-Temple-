// Soul Support Session Popup
console.log('Script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded event fired');
    const popup = document.getElementById('soulSupportPopup');
    const closeBtn = document.querySelector('.popup-close');
    
    // Debugging
    console.log('DOM loaded, popup element:', popup);
    
    if (!popup) {
        console.error('Popup element not found');
        return;
    }
    
    // Check if popup has been shown today
    const popupShown = localStorage.getItem('soulSupportPopupShown');
    const today = new Date().toDateString();
    
    console.log('Popup shown today:', popupShown);
    console.log('Today:', today);
    
    // Always show popup for testing (removed the date check)
    console.log('Setting timeout to show popup');
    setTimeout(function() {
        console.log('Showing popup');
        // Try both approaches
        popup.style.display = 'block';
        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        // Mark popup as shown today
        localStorage.setItem('soulSupportPopupShown', today);
    }, 2000); // Show after 2 seconds
    
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
});

// Also try with window.onload as a fallback
window.addEventListener('load', function() {
    console.log('Window load event fired');
});
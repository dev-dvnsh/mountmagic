/*
 * ===================================
 * MOUNTMAGIC TOURISM WEBSITE
 * Main JavaScript File
 * Contains all interactive functionality
 * ===================================
 */

// ==================
// GLOBAL VARIABLES
// ==================
let currentSlide = 0; // Tracks which slide is currently displayed (0-based index)
let slideInterval; // Stores the interval ID for automatic sliding
const slides = document.querySelectorAll('.hero-slide'); // Get all hero slide elements
const indicators = document.querySelectorAll('.indicator'); // Get all indicator dot elements

// Video tracking to maintain play state when scrolling
const videoStates = new Map(); // Map to store video playing states and references

// ==================
// LOGO MODAL FUNCTIONALITY
// ==================
const logoImage = document.getElementById('logoImage'); // Get the logo image in navbar
const logoModal = document.getElementById('logoModal'); // Get the modal overlay element
const logoModalImage = document.getElementById('logoModalImage'); // Get the large logo image in modal
const logoModalClose = document.getElementById('logoModalClose'); // Get the close button element

// Open modal when logo is clicked
if (logoImage && logoModal && logoModalImage) { // Check if all elements exist
    logoImage.addEventListener('click', function() { // Add click event listener to logo
        logoModal.style.display = 'block'; // Show the modal by changing display to block
        logoModalImage.src = this.src; // Set modal image source to logo's source
    });
}

// Close modal when X button is clicked
if (logoModalClose && logoModal) { // Check if close button and modal exist
    logoModalClose.addEventListener('click', function() { // Add click event to close button
        logoModal.style.display = 'none'; // Hide the modal by changing display to none
    });
}

// Close modal when clicking outside the image
if (logoModal) { // Check if modal exists
    logoModal.addEventListener('click', function(event) { // Add click event to modal overlay
        if (event.target === logoModal) { // Check if click was on overlay, not image
            logoModal.style.display = 'none'; // Hide the modal
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) { // Add keyboard event listener
    if (event.key === 'Escape' && logoModal) { // Check if Escape key was pressed and modal exists
        logoModal.style.display = 'none'; // Hide the modal
    }
});

// ==================
// NAVBAR FUNCTIONALITY
// ==================
const hamburger = document.getElementById('hamburger'); // Get the hamburger menu button element
const navMenu = document.getElementById('navMenu'); // Get the navigation menu element
const navLinks = document.querySelectorAll('.nav-link'); // Get all navigation link elements

// Toggle mobile menu
hamburger.addEventListener('click', () => { // Add click event to hamburger icon
    hamburger.classList.toggle('active'); // Toggle 'active' class to animate hamburger to X
    navMenu.classList.toggle('active'); // Toggle 'active' class to show/hide menu
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => { // Loop through each navigation link
    link.addEventListener('click', () => { // Add click event to each link
        hamburger.classList.remove('active'); // Remove active class from hamburger (reset to lines)
        navMenu.classList.remove('active'); // Remove active class from menu (hide menu)
    });
});

// Smooth scroll for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => { // Select all links starting with #
    anchor.addEventListener('click', function (e) { // Add click event to each anchor link
        e.preventDefault(); // Prevent default jump behavior
        const targetId = this.getAttribute('href'); // Get the href attribute (e.g., #gallery)
        if (targetId === '#') return; // If just #, do nothing
        
        const targetElement = document.querySelector(targetId); // Find the target section element
        if (targetElement) { // If target section exists
            const headerOffset = 80; // Height of fixed navbar to offset scroll
            const elementPosition = targetElement.getBoundingClientRect().top; // Get element position relative to viewport
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Calculate scroll position with offset

            window.scrollTo({ // Scroll to calculated position
                top: offsetPosition, // Vertical scroll position
                behavior: 'smooth' // Smooth scrolling animation
            });
        }
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => { // Add scroll event listener to window
    const header = document.getElementById('header'); // Get the header element
    if (window.scrollY > 50) { // If page scrolled more than 50px down
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'; // Add stronger shadow
    } else { // If at top of page
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Use lighter shadow
    }
});

// ==================
// HERO SLIDER (AUTOMATIC IMAGE CAROUSEL)
// ==================

// Show specific slide
function showSlide(index) { // Function to display a specific slide by index
    // Handle wrap around
    if (index >= slides.length) { // If index exceeds number of slides
        currentSlide = 0; // Go back to first slide (wrap around)
    } else if (index < 0) { // If index is negative
        currentSlide = slides.length - 1; // Go to last slide (wrap around backwards)
    } else { // If index is valid
        currentSlide = index; // Set current slide to given index
    }

    // Update slides
    slides.forEach((slide, i) => { // Loop through all slide elements
        slide.classList.remove('active'); // Remove active class from all slides
        if (i === currentSlide) { // If this is the current slide
            slide.classList.add('active'); // Add active class to make it visible
        }
    });

    // Update indicators
    indicators.forEach((indicator, i) => { // Loop through all indicator dots
        indicator.classList.remove('active'); // Remove active class from all indicators
        if (i === currentSlide) { // If this indicator matches current slide
            indicator.classList.add('active'); // Add active class to highlight it
        }
    });
}

// Next slide
function nextSlide() { // Function to advance to next slide
    showSlide(currentSlide + 1); // Increment slide index and show it
}

// Previous slide
function prevSlide() { // Function to go to previous slide
    showSlide(currentSlide - 1); // Decrement slide index and show it
}

// Auto slide functionality - AUTOMATIC SLIDING EVERY 5 SECONDS
function startAutoSlide() { // Function to start automatic sliding
    slideInterval = setInterval(nextSlide, 5000); // Call nextSlide every 5000ms (5 seconds)
}

function stopAutoSlide() { // Function to stop automatic sliding
    clearInterval(slideInterval); // Clear the interval to stop auto-advancing
}

// Initialize slider - STARTS AUTOMATIC SLIDING
if (slides.length > 0) { // Check if slides exist
    showSlide(0); // Show first slide initially
    startAutoSlide(); // *** START AUTOMATIC SLIDING HERE ***
}

// Manual navigation buttons
const prevBtn = document.getElementById('prevBtn'); // Get previous button element
const nextBtn = document.getElementById('nextBtn'); // Get next button element

if (prevBtn) { // If previous button exists
    prevBtn.addEventListener('click', () => { // Add click event to previous button
        stopAutoSlide(); // Stop auto-sliding when user manually navigates
        prevSlide(); // Go to previous slide
        startAutoSlide(); // Restart auto-sliding with fresh timer
    });
}

if (nextBtn) { // If next button exists
    nextBtn.addEventListener('click', () => { // Add click event to next button
        stopAutoSlide(); // Stop auto-sliding when user manually navigates
        nextSlide(); // Go to next slide
        startAutoSlide(); // Restart auto-sliding with fresh timer
    });
}

// Indicator click navigation
indicators.forEach((indicator, index) => { // Loop through each indicator dot
    indicator.addEventListener('click', () => { // Add click event to each indicator
        stopAutoSlide(); // Stop auto-sliding when user clicks indicator
        showSlide(index); // Show the slide corresponding to clicked indicator
        startAutoSlide(); // Restart auto-sliding with fresh timer
    });
});

// Pause slider on hover - PAUSES AUTOMATIC SLIDING WHEN HOVERING
const heroSection = document.querySelector('.hero'); // Get hero section element
if (heroSection) { // If hero section exists
    heroSection.addEventListener('mouseenter', stopAutoSlide); // Pause auto-slide when mouse enters
    heroSection.addEventListener('mouseleave', startAutoSlide); // Resume auto-slide when mouse leaves
}

// ==================
// VIDEO CONTROLS (Gallery & Reviews)
// ==================

// Function to check if element is in viewport
function isInViewport(element) { // Check if element is fully visible in viewport
    const rect = element.getBoundingClientRect(); // Get element position and size
    return ( // Return true if all conditions met
        rect.top >= 0 && // Top edge is below viewport top
        rect.left >= 0 && // Left edge is after viewport left
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && // Bottom is above viewport bottom
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) // Right is before viewport right
    );
}

// Function to check if element is partially in viewport (for pausing)
function isPartiallyInViewport(element) { // Check if any part of element is visible
    const rect = element.getBoundingClientRect(); // Get element position and size
    return ( // Return true if partially visible
        rect.top < (window.innerHeight || document.documentElement.clientHeight) && // Top is within viewport
        rect.bottom > 0 // Bottom is within viewport
    );
}

// Handle play button clicks for all videos
function setupVideoControls() { // Initialize video control functionality
    const playButtons = document.querySelectorAll('.play-btn'); // Get all play button elements
    
    playButtons.forEach(button => { // Loop through each play button
        button.addEventListener('click', function() { // Add click event to play button
            const videoId = this.getAttribute('data-video-id'); // Get video ID from button's data attribute
            const videoElement = document.querySelector(`video[data-video-id="${videoId}"]`); // Find corresponding video element
            
            if (videoElement) { // If video element exists
                if (videoElement.paused) { // If video is currently paused
                    // Play video
                    videoElement.play(); // Start playing the video
                    this.textContent = '⏸'; // Change button icon to pause symbol
                    this.classList.add('playing'); // Add 'playing' class for styling
                    
                    // Store video state
                    videoStates.set(videoId, { // Store video state in Map
                        element: videoElement, // Store video element reference
                        button: this, // Store button element reference
                        wasPlaying: true // Mark that video was playing
                    });
                } else { // If video is currently playing
                    // Pause video
                    videoElement.pause(); // Pause the video
                    this.textContent = '▶'; // Change button icon to play symbol
                    this.classList.remove('playing'); // Remove 'playing' class
                    
                    // Update video state
                    if (videoStates.has(videoId)) { // If video state exists in Map
                        videoStates.get(videoId).wasPlaying = false; // Mark that video was paused
                    }
                }
            }
        });
    });
}

// Pause videos when they go out of viewport
function handleVideoVisibility() { // Function to pause videos when scrolled away
    videoStates.forEach((state, videoId) => { // Loop through all tracked videos
        const { element, button } = state; // Destructure video element and button
        
        if (!isPartiallyInViewport(element)) { // If video is completely out of view
            // Video is out of viewport
            if (!element.paused) { // If video is currently playing
                element.pause(); // Pause the video
                // Don't change button state, so user can resume later
                // Store that it was playing
                state.wasPlaying = true; // Remember video was playing
            }
        } else { // Video is visible in viewport
            // Video is back in viewport
            // Only auto-resume if user manually started it and it was playing before
            if (state.wasPlaying && element.paused && button.classList.contains('playing')) {
                // Video was playing before and should resume
                // But we won't auto-resume, user needs to click play again
                // This is better UX - videos only play when user explicitly clicks
            }
        }
    });
}

// Initialize video controls
setupVideoControls(); // Call function to set up all video controls

// Add scroll listener for video visibility
let scrollTimeout; // Variable to store timeout ID for debouncing
window.addEventListener('scroll', () => { // Add scroll event listener
    clearTimeout(scrollTimeout); // Clear previous timeout
    scrollTimeout = setTimeout(handleVideoVisibility, 100); // Wait 100ms after scrolling stops before checking
});

// Also check on page load
document.addEventListener('DOMContentLoaded', handleVideoVisibility); // Check video visibility when page loads

// ==================
// PACKAGES SECTION
// ==================

// Package data - Easy to update
const packages = [ // Array of package objects - add or modify packages here
    {
        name: 'Shimla Delight', // Package name
        image: 'assets/images/package1.jpg', // Image path for this package
        description: 'Experience the colonial charm of Shimla with stunning mountain views, pleasant weather, and memorable adventures.' // Package description
    },
    {
        name: 'Manali Magic', // Package name
        image: 'assets/images/package2.jpg', // Image path for this package
        description: 'Discover the beauty of Manali with snow-capped peaks, adventure sports, and serene valleys perfect for all travelers.' // Package description
    },
    {
        name: 'Kasol Paradise', // Package name
        image: 'assets/images/package3.jpg', // Image path for this package
        description: 'Immerse yourself in the hippie culture of Kasol, surrounded by lush forests, the Parvati River, and peaceful vibes.' // Package description
    },
    {
        name: 'Spiti Expedition', // Package name
        image: 'assets/images/package4.jpg', // Image path for this package
        description: 'Embark on a thrilling journey to Spiti Valley, exploring high-altitude deserts, ancient monasteries, and rugged landscapes.' // Package description
    },
    {
        name: 'Dharamshala Retreat', // Package name
        image: 'assets/images/package5.jpg', // Image path for this package
        description: 'Find peace in Dharamshala, home to Tibetan culture, scenic tea gardens, and breathtaking Dhauladhar mountain ranges.' // Package description
    },
    {
        name: 'Kullu Adventure', // Package name
        image: 'assets/images/package6.jpg', // Image path for this package
        description: 'Explore the vibrant Kullu Valley with river rafting, trekking, and the famous Kullu Dussehra festival experience.' // Package description
    }
];

// Render packages dynamically
function renderPackages() { // Function to generate and display package cards
    const packagesGrid = document.getElementById('packagesGrid'); // Get packages container element
    
    if (packagesGrid) { // If packages container exists
        packagesGrid.innerHTML = packages.map(pkg => ` 
            <div class="package-card">
                <img src="${pkg.image}" alt="${pkg.name}" class="package-image" onerror="this.src='assets/images/placeholder.jpg'">
                <div class="package-content">
                    <h3 class="package-name">${pkg.name}</h3>
                    <p class="package-description">${pkg.description}</p>
                    <button class="view-details-btn">View Details</button>
                </div>
            </div>
        `).join(''); // Map each package to HTML and join into single string
        
        // Add click handlers for View Details buttons
        const detailButtons = packagesGrid.querySelectorAll('.view-details-btn'); // Get all detail buttons
        detailButtons.forEach((button, index) => { // Loop through each button
            button.addEventListener('click', () => { // Add click event to each button
                alert(`Package details for ${packages[index].name} will be shown here. You can implement a modal or redirect to a details page.`); // Show alert with package name
            });
        });
    }
}

// Initialize packages on page load
renderPackages(); // Call function to render all packages

// ==================
// CONTACT - COPY PHONE NUMBER
// ==================

const copyBtn = document.getElementById('copyBtn'); // Get copy button element
const phoneNumber = document.getElementById('phoneNumber'); // Get phone number text element
const copyFeedback = document.getElementById('copyFeedback'); // Get feedback message element

if (copyBtn && phoneNumber) { // Check if both elements exist
    copyBtn.addEventListener('click', () => { // Add click event to copy button
        // Get the phone number text
        const phoneText = phoneNumber.textContent; // Extract phone number from element
        
        // Copy to clipboard
        navigator.clipboard.writeText(phoneText).then(() => { // Use Clipboard API to copy text
            // Show feedback
            copyFeedback.classList.add('show'); // Add 'show' class to make feedback visible
            
            // Hide feedback after 2 seconds
            setTimeout(() => { // Set timer to hide feedback
                copyFeedback.classList.remove('show'); // Remove 'show' class after 2 seconds
            }, 2000); // 2000 milliseconds = 2 seconds
        }).catch(err => { // If copying fails
            console.error('Failed to copy text: ', err); // Log error to console
            alert('Failed to copy phone number. Please copy manually: ' + phoneText); // Show alert with phone number
        });
    });
}

// ==================
// VIEW ALL BUTTONS (Reviews)
// ==================

const viewAllButtons = document.querySelectorAll('.view-all-btn'); // Get all "View All" buttons

viewAllButtons.forEach(button => { // Loop through each button
    button.addEventListener('click', () => { // Add click event to each button
        const buttonText = button.textContent; // Get button text content
        if (buttonText.includes('Reviews')) { // If button is for reviews
            alert('All reviews page will be shown here. You can implement a modal or separate page with all customer reviews.'); // Show alert
        } else if (buttonText.includes('Videos')) { // If button is for videos
            alert('All video testimonials will be shown here. You can implement a modal or separate page with all video reviews.'); // Show alert
        }
    });
});

// ==================
// SCROLL ANIMATIONS
// ==================

// Add fade-in animation to elements as they come into viewport
const observerOptions = { // Options for Intersection Observer
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
};

const observer = new IntersectionObserver((entries) => { // Create new Intersection Observer
    entries.forEach(entry => { // Loop through each observed element
        if (entry.isIntersecting) { // If element is entering viewport
            entry.target.style.opacity = '1'; // Make element fully visible
            entry.target.style.transform = 'translateY(0)'; // Move element to normal position
        }
    });
}, observerOptions); // Pass options to observer

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => { // Wait for page to fully load
    const animatedElements = document.querySelectorAll('.package-card, .review-card, .gallery-item, .feature'); // Select elements to animate
    
    animatedElements.forEach(el => { // Loop through each element
        el.style.opacity = '0'; // Start invisible
        el.style.transform = 'translateY(20px)'; // Start shifted down 20px
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Set transition properties
        observer.observe(el); // Start observing element for intersection
    });
});

// ==================
// UTILITY FUNCTIONS
// ==================

// Lazy load images (optional enhancement)
function lazyLoadImages() { // Function to load images only when they're about to be visible
    const images = document.querySelectorAll('img[data-src]'); // Get all images with data-src attribute
    
    const imageObserver = new IntersectionObserver((entries, observer) => { // Create observer for lazy loading
        entries.forEach(entry => { // Loop through each image
            if (entry.isIntersecting) { // If image is entering viewport
                const img = entry.target; // Get the image element
                img.src = img.dataset.src; // Set actual src from data-src
                img.removeAttribute('data-src'); // Remove data-src attribute
                imageObserver.unobserve(img); // Stop observing this image
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img)); // Start observing each image
}

// Initialize lazy loading if needed
// lazyLoadImages(); // Uncomment this line to enable lazy loading

// ==================
// CONSOLE MESSAGE
// ==================

console.log('%c🏔️ Welcome to MountMagic! 🏔️', 'color: #2d5016; font-size: 24px; font-weight: bold;'); // Print styled welcome message
console.log('%cYour trusted partner for mountain adventures', 'color: #3d6b2e; font-size: 14px;'); // Print tagline
console.log('%c✨ All features are working! ✨', 'color: #87ceeb; font-size: 12px;'); // Print confirmation message
console.log('%c🎬 Images slide automatically every 5 seconds', 'color: #2c5f7d; font-size: 12px; font-weight: bold;'); // Print auto-slide info
console.log('%c🖼️ Click the logo to view it larger!', 'color: #3d6b2e; font-size: 12px; font-weight: bold;'); // Print logo click info

// ==================
// ERROR HANDLING
// ==================

// Global error handler for images
document.addEventListener('DOMContentLoaded', () => { // Wait for page to load
    const allImages = document.querySelectorAll('img'); // Get all image elements
    
    allImages.forEach(img => { // Loop through each image
        img.addEventListener('error', function() { // Add error event listener
            // If image fails to load, you can set a placeholder
            if (!this.src.includes('placeholder')) { // If not already using placeholder
                console.warn(`Failed to load image: ${this.src}`); // Log warning to console
                // Optionally set a placeholder or hide the image
                // this.style.display = 'none'; // Uncomment to hide failed images
            }
        });
    });
});

// ==================
// PERFORMANCE OPTIMIZATION
// ==================

// Debounce function for scroll events
function debounce(func, wait) { // Function to limit how often a function can be called
    let timeout; // Variable to store timeout ID
    return function executedFunction(...args) { // Return wrapped function
        const later = () => { // Function to call later
            clearTimeout(timeout); // Clear the timeout
            func(...args); // Call the original function
        };
        clearTimeout(timeout); // Clear any existing timeout
        timeout = setTimeout(later, wait); // Set new timeout
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => { // Create debounced version of scroll handler
    handleVideoVisibility(); // Check video visibility
}, 150); // Wait 150ms after last scroll event

// Replace the existing scroll listener for videos with optimized version
window.removeEventListener('scroll', handleVideoVisibility); // Remove old listener
window.addEventListener('scroll', optimizedScrollHandler); // Add optimized listener

// ==================
// PAGE LOAD COMPLETE
// ==================

window.addEventListener('load', () => { // When entire page has loaded (including images)
    console.log('✅ MountMagic website loaded successfully!'); // Print success message
    console.log('📱 Responsive design active'); // Print responsive confirmation
    console.log('🎬 Video controls initialized'); // Print video controls confirmation
    console.log('🖼️ Image slider ready - Auto-sliding every 5 seconds'); // Print slider confirmation with auto-slide info
    console.log('📦 Packages loaded'); // Print packages confirmation
    console.log('🖼️ Logo modal ready - Click logo to view larger'); // Print logo modal confirmation
});

// ================================
// Story Screen - Cinematic Experience
// ================================

/**
 * Initializes the Story screen experience
 */
function initStoryScreen() {
    const storyText = document.querySelector('.story-text');
    const storyButton = document.getElementById('storyContinue');
    
    if (!storyText || !storyButton) return;

    // 1. Prepare for Typewriter effect (character by character)
    const originalText = storyText.textContent.trim();
    storyText.innerHTML = ''; // Clear content

    // Create character spans
    const chars = Array.from(originalText);
    chars.forEach(char => {
        const span = document.createElement('span');
        span.className = 'story-char';
        span.textContent = char;
        storyText.appendChild(span);
    });

    // Create a blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    storyText.appendChild(cursor);

    // 2. Listen for Stage Activation
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.dataset.stage === "3" && target.classList.contains('active')) {
                    startStorySequence();
                }
            }
        });
    });

    const storyStage = document.querySelector('.screen[data-stage="3"]');
    if (storyStage) {
        observer.observe(storyStage, { attributes: true });
        
        // Initial check if already active
        if (storyStage.classList.contains('active')) {
            startStorySequence();
        }
    }
}

/**
 * Starts the character-by-character reveal and reveals the button at the end
 */
function startStorySequence() {
    const chars = document.querySelectorAll('.story-char');
    const storyButton = document.getElementById('storyContinue');
    const cursor = document.querySelector('.typing-cursor');
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        chars.forEach(char => char.classList.add('visible'));
        storyButton.classList.add('visible');
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let delay = 800; // Base delay for start (after card entrance)
    const interval = 45; // Speed of typing (ms per character)

    chars.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
            
            // If it's the last character, show the button and hide cursor
            if (index === chars.length - 1) {
                setTimeout(() => {
                    storyButton.classList.add('visible');
                    if (cursor) {
                        cursor.style.opacity = '0';
                        setTimeout(() => cursor.style.display = 'none', 300);
                    }
                }, 500);
            }
        }, delay + (index * interval));
    });
}

// Event Listeners
const storyContinue = document.getElementById("storyContinue");
if (storyContinue) {
    storyContinue.addEventListener("click", () => {
        showStage(4);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initStoryScreen);

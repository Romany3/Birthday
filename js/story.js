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

    // 1. Prepare for Typewriter effect (word by word)
    const originalText = storyText.innerText;
    const words = originalText.split(/\s+/);
    storyText.innerHTML = ''; // Clear content

    words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word-span';
        span.innerText = word + ' ';
        storyText.appendChild(span);
    });

    // 2. Create Atmosphere
    createStoryAtmosphere();

    // 3. Listen for Stage Activation
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
 * Starts the word-by-word reveal and reveals the button at the end
 */
function startStorySequence() {
    const words = document.querySelectorAll('.word-span');
    const storyButton = document.getElementById('storyContinue');
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        words.forEach(word => word.classList.add('visible'));
        storyButton.classList.add('visible');
        return;
    }

    let delay = 600; // Base delay for start (after card entrance)
    const interval = 55; // 45-60ms as per requirements

    words.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('visible');
            
            // If it's the last word, show the button
            if (index === words.length - 1) {
                setTimeout(() => {
                    storyButton.classList.add('visible');
                }, 400);
            }
        }, delay + (index * interval));
    });
}

/**
 * Creates soft floating light particles for background atmosphere
 */
function createStoryAtmosphere() {
    const storyLayout = document.querySelector('.story-layout');
    if (!storyLayout || storyLayout.querySelector('.story-atmosphere')) return;

    const atmosphere = document.createElement('div');
    atmosphere.className = 'story-atmosphere';

    const colors = ['#FFC0CB', '#FFFFFF', '#E6E6FA']; // Pink, White, Lavender
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'atmosphere-particle';
        
        const size = Math.random() * 200 + 100 + 'px';
        particle.style.width = size;
        particle.style.height = size;
        
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        atmosphere.appendChild(particle);
    }

    storyLayout.appendChild(atmosphere);
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

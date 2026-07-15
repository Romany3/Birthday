// ================================
// Hero Screen - Premium Experience
// ================================

function getGreetingByTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  if (currentMinutes >= 5 * 60 && currentMinutes <= 11 * 60 + 59) {
    return {
      icon: '☀️',
      title: 'Good Morning',
      subtitle: 'What a beautiful morning to celebrate someone as wonderful as you.'
    };
  }

  if (currentMinutes >= 12 * 60 && currentMinutes <= 16 * 60 + 59) {
    return {
      icon: '🌸',
      title: 'Good Afternoon',
      subtitle: 'Hope your afternoon is filled with smiles and beautiful moments.'
    };
  }

  if (currentMinutes >= 17 * 60 && currentMinutes <= 20 * 60 + 59) {
    return {
      icon: '✨',
      title: 'Good Evening',
      subtitle: 'The evening feels even brighter because today is your special day.'
    };
  }

  return {
    icon: '🌙',
    title: 'Good Night',
    subtitle: 'Tonight is special because it\'s your birthday eve/night.'
  };
}

function renderTimeGreeting() {
  const heroGreeting = document.querySelector('.hero-greeting');

  if (!heroGreeting || heroGreeting.querySelector('.time-greeting-wrapper')) {
    return;
  }

  const greeting = getGreetingByTime();
  const wrapper = document.createElement('div');
  wrapper.className = 'time-greeting-wrapper';

  wrapper.innerHTML = `
    <div class="time-greeting" aria-label="${greeting.title}">
      <span>${greeting.icon}</span>
      <span>${greeting.title}</span>
    </div>
    <p class="time-subtitle">${greeting.subtitle}</p>
  `;

  // Insert at the top of hero-greeting
  heroGreeting.insertBefore(wrapper, heroGreeting.firstChild);
}

/**
 * Creates elegant premium decorations around the profile image
 */
function createPremiumDecorations() {
    const heroRight = document.querySelector('.hero-right');
    if (!heroRight) return;

    // Clean existing premium decors if any
    const existing = heroRight.querySelectorAll('.premium-decor');
    existing.forEach(el => el.remove());

    const config = [
        { type: 'sparkle', top: '10%', left: '15%', size: '20px', delay: '0s' },
        { type: 'star', top: '20%', right: '10%', size: '15px', delay: '1s' },
        { type: 'dot', bottom: '15%', left: '10%', size: '12px', delay: '2s' },
        { type: 'circle', bottom: '25%', right: '15%', size: '30px', delay: '0.5s' },
        { type: 'sparkle', top: '50%', left: '-5%', size: '18px', delay: '1.5s' },
        { type: 'dot', top: '5%', right: '25%', size: '10px', delay: '2.5s' }
    ];

    const icons = {
        sparkle: '✨',
        star: '⭐',
        circle: '',
        dot: ''
    };

    config.forEach(item => {
        const decor = document.createElement('div');
        decor.className = `premium-decor ${item.type}`;
        
        if (item.top) decor.style.top = item.top;
        if (item.bottom) decor.style.bottom = item.bottom;
        if (item.left) decor.style.left = item.left;
        if (item.right) decor.style.right = item.right;
        
        if (item.type === 'circle' || item.type === 'dot') {
            decor.style.width = item.size;
            decor.style.height = item.size;
        } else {
            decor.style.fontSize = item.size;
            decor.innerText = icons[item.type];
        }

        decor.style.animationDelay = item.delay;
        heroRight.appendChild(decor);
    });
}

/**
 * Background Parallax Effect
 * Moves decorations slightly based on mouse movement
 */
function initHeroParallax() {
    const heroLayout = document.querySelector('.hero-layout');
    
    document.addEventListener('mousemove', (e) => {
        const stage = document.querySelector('.screen[data-stage="2"]');
        if (!stage || !stage.classList.contains('active')) return;

        const moveX = (e.clientX - window.innerWidth / 2) / 100;
        const moveY = (e.clientY - window.innerHeight / 2) / 100;

        // Move decorations slower than foreground (Max 10px)
        const decors = document.querySelectorAll('.premium-decor');
        decors.forEach((decor, index) => {
            const factor = (index % 2 === 0) ? 0.5 : 0.8;
            const x = Math.min(Math.max(moveX * factor, -10), 10);
            const y = Math.min(Math.max(moveY * factor, -10), 10);
            decor.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Event Listeners
const heroContinue = document.getElementById("heroContinue");
if (heroContinue) {
    heroContinue.addEventListener("click", () => {
        showStage(3);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTimeGreeting();
    createPremiumDecorations();
    initHeroParallax();
});

// Re-render if stage changes (in case dynamic elements need refresh)
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.dataset.stage === "2" && target.classList.contains('active')) {
                renderTimeGreeting();
                // We don't recreate decors every time to avoid jumps, 
                // but we could if needed.
            }
        }
    });
});

const heroStage = document.querySelector('.screen[data-stage="2"]');
if (heroStage) {
    observer.observe(heroStage, { attributes: true });
}

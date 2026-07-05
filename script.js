const pageContainer = document.getElementById('pageContainer');
const screens = document.querySelectorAll('.screen');
const loadScreen = document.getElementById('loadScreen');
const loadingText = document.getElementById('loadingText');
const confettiContainer = document.getElementById('confettiContainer');
const bgBubbles = document.getElementById('bgBubbles');
const calcDisplay = document.getElementById('calcDisplay');
const calcMessage = document.getElementById('calcMessage');
const calcButtons = document.querySelectorAll('.calc-button');

let currentStage = 0;
const expectedBirthday = '16072007'; // JoJo's birthday in DDMMYYYY format.
let enteredDigits = '';
let autoAdvanceTimer = null;

function clearAutoAdvance() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function updateCalcDisplay() {
  const padded = enteredDigits.padEnd(8, '*');
  const formatted = `${padded.slice(0, 2)} - ${padded.slice(2, 4)} - ${padded.slice(4, 8)}`;
  calcDisplay.textContent = formatted;
}

function setCalcMessage(text, valid = false) {
  calcMessage.textContent = text;
  calcMessage.style.color = valid ? '#1d7a2f' : '#9e2f6c';
}

function handleCalcKey(key) {
  if (key === 'clear') {
    enteredDigits = '';
    updateCalcDisplay();
    setCalcMessage('Enter the date to unlock the surprise.');
    return;
  }

  if (key === 'submit') {
    if (enteredDigits.length !== 8) {
      setCalcMessage('Enter 8 digits first.');
      return;
    }
    validateBirthday();
    return;
  }

  if (enteredDigits.length >= 8) {
    return;
  }

  enteredDigits += key;
  updateCalcDisplay();
  if (enteredDigits.length === 8) {
    setCalcMessage('Tap OK to unlock the message.');
  }
}

function validateBirthday() {
  if (enteredDigits === expectedBirthday) {
    setCalcMessage('Correct! Birthday unlocked.');
    setTimeout(() => {
      // celebratory confetti burst
      triggerConfetti(80);
      showStage(2);
    }, 500);
  } else {
    setCalcMessage('This date is not right. Try again.');
    enteredDigits = '';
    setTimeout(() => {
      updateCalcDisplay();
    }, 300);
  }
}

function triggerConfetti(count = 30) {
  if (!confettiContainer) return;
  for (let i = 0; i < count; i += 1) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = `${Math.random() * 100}%`;
    // start slightly above the visible area for natural fall
    confetti.style.top = `${-5 + Math.random() * 8}%`;
    confetti.style.background = `hsl(${Math.random() * 360}, 80%, ${45 + Math.random() * 20}%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    const duration = 1200 + Math.random() * 1200;
    confetti.style.animation = `confettiFall ${duration}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards`;
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), duration + 300);
  }
}

// Continuous subtle confetti across the site
let confettiLoopId = null;
function spawnConfettiPiece() {
  if (!confettiContainer) return;
  const confetti = document.createElement('div');
  confetti.className = 'confetti-piece';
  const size = 6 + Math.random() * 12;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.top = `${-8 + Math.random() * 6}%`;
  confetti.style.background = `hsl(${Math.random() * 360}, 80%, ${45 + Math.random() * 20}%)`;
  const duration = 2200 + Math.random() * 2200;
  confetti.style.animation = `confettiFall ${duration}ms linear forwards`;
  confetti.style.opacity = 0.9;
  confettiContainer.appendChild(confetti);
  setTimeout(() => confetti.remove(), duration + 400);
}

function startConfettiLoop(rate = 700) {
  if (confettiLoopId) return;
  confettiLoopId = setInterval(() => {
    const n = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i += 1) spawnConfettiPiece();
  }, rate);
}

function stopConfettiLoop() {
  if (!confettiLoopId) return;
  clearInterval(confettiLoopId);
  confettiLoopId = null;
}

function createBubbles(count = 10) {
  if (!bgBubbles) return;
  for (let i = 0; i < count; i += 1) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 40 + Math.random() * 220;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.bottom = `${-10 - Math.random() * 20}vh`;
    const delay = Math.random() * 6;
    const dur = 14 + Math.random() * 18;
    b.style.animationDelay = `${-delay}s`;
    b.style.animationDuration = `${dur}s`;
    b.style.opacity = 0.06 + Math.random() * 0.12;
    bgBubbles.appendChild(b);
  }
}

function clearStageThreeEffects() {
  const stageThree = document.querySelector('.screen[data-stage="3"]');
  if (!stageThree) return;
  stageThree.querySelectorAll('.confetti, .balloon, .firework').forEach((element) => element.remove());
}

function createStageThreeConfettiCannon(count, delayMultiplier) {
  const confettiCannonContainer = document.querySelector('.screen[data-stage="3"] .confetti-cannon-container');
  if (!confettiCannonContainer) return;
  const colors = ['#e94560', '#f0e68c', '#ffffff', '#00d8d6', '#8e44ad'];

  for (let i = 0; i < count; i += 1) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `${Math.random() * 20 - 10}vh`;

    const duration = Math.random() * 2 + 3;
    const delay = Math.random() * delayMultiplier;
    confetti.style.animationDuration = `${duration}s`;
    confetti.style.animationDelay = `${delay}s`;

    const size = Math.random() * 8 + 4;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    confettiCannonContainer.appendChild(confetti);
    confetti.addEventListener('animationend', () => confetti.remove());
  }
}

function createStageThreeBalloons(count) {
  const balloonsContainer = document.querySelector('.screen[data-stage="3"] .balloons-container');
  if (!balloonsContainer) return;
  const colors = ['#e94560', '#f0e68c', '#00d8d6', '#8e44ad', '#3498db'];

  for (let i = 0; i < count; i += 1) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * 80 + 10}vw`;
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = `${Math.random() * 6 + 10}s`;
    balloon.style.animationDelay = `${Math.random() * 5}s`;
    balloonsContainer.appendChild(balloon);
    balloon.addEventListener('animationend', () => balloon.remove());
  }
}

function createStageThreeFireworks(count) {
  const fireworksContainer = document.querySelector('.screen[data-stage="3"] .fireworks-container');
  if (!fireworksContainer) return;
  const colors = ['#e94560', '#f0e68c', '#ffffff', '#00d8d6'];

  for (let i = 0; i < count; i += 1) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${Math.random() * 80 + 10}vw`;
    firework.style.bottom = `${Math.random() * 20}vh`;
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    firework.style.boxShadow = `0 0 5px ${firework.style.backgroundColor}`;

    const delay = Math.random() * 3;
    firework.style.animationDelay = `${delay}s, ${delay + 3}s`;

    fireworksContainer.appendChild(firework);
    firework.addEventListener('animationend', () => firework.remove());
  }
}

function startStageThreeCelebration() {
  const stageThree = document.querySelector('.screen[data-stage="3"]');
  if (!stageThree) return;

  clearStageThreeEffects();

  const finalGreetingElement = stageThree.querySelector('#finalGreeting');
  if (!finalGreetingElement) return;

  const messageGreeting = 'Happy Birthday,';
  let i = 0;
  finalGreetingElement.textContent = '';
  finalGreetingElement.classList.remove('typed');
  finalGreetingElement.style.borderRight = '3px solid #f0e68c';

  const typingInterval = setInterval(() => {
    if (i < messageGreeting.length) {
      finalGreetingElement.textContent += messageGreeting.charAt(i);
      i += 1;
    } else {
      clearInterval(typingInterval);
      finalGreetingElement.classList.add('typed');
    }
  }, 100);

  createStageThreeConfettiCannon(100, 0.5);
  setTimeout(() => createStageThreeConfettiCannon(80, 0.3), 500);
  setTimeout(() => createStageThreeConfettiCannon(60, 0.2), 1000);
  createStageThreeBalloons(15);
  createStageThreeFireworks(5);
}

function showStage(stage) {
  screens.forEach((screen) => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.querySelector(`[data-stage="${stage}"]`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    currentStage = stage;
    clearAutoAdvance();

    if (stage === 2) {
      autoAdvanceTimer = setTimeout(() => {
        showStage(3);
      }, 3000);
    } else if (stage === 3) {
      startStageThreeCelebration();
    } else if (stage > 1) {
      triggerConfetti(22);
    }
  }
}

function nextStage() {
  const nextStage = currentStage + 1;
  if (document.querySelector(`[data-stage="${nextStage}"]`)) {
    showStage(nextStage);
  }
}


calcButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;
    handleCalcKey(key);
  });
});

// Click on screen to advance after the birthday check screen
document.addEventListener('click', (e) => {
  if (e.target.closest('button')) {
    return;
  }
  if (currentStage === 1) {
    return;
  }
  if (document.querySelector('.screen.active')) {
    nextStage();
  }
});

function initializeApp() {
  showStage(1);
  updateCalcDisplay();
  // decorative bubbles
  createBubbles(12);
  // start subtle background confetti
  startConfettiLoop(600);
}

function startLoadingScreen(duration = 10000) {
  if (!loadScreen || !loadingText) {
    initializeApp();
    return;
  }

  const phrase = 'HAPPY BIRTHDAY';
  const letters = phrase.split('');
  loadingText.innerHTML = '';

  // nicer timing: reveal letters over ~75% of the duration for a brief settle
  const revealWindow = Math.max(300, Math.floor(duration * 0.75));
  const perDelay = revealWindow / Math.max(letters.length, 1);

  letters.forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'loader-letter';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = `${i * perDelay}ms`;
    // allow the bounce to last a bit longer for nicer effect
    span.style.animationDuration = '420ms, 820ms';
    loadingText.appendChild(span);
  });

  // decorative sparkles around the text
  createLoaderSparkles(14, revealWindow);

  setTimeout(() => {
    // fade out sparkles quickly
    const sparks = loadingText.querySelectorAll('.sparkle');
    sparks.forEach(s => s.remove());
    loadScreen.classList.add('hidden');
    setTimeout(() => {
      if (loadScreen && loadScreen.parentNode) loadScreen.parentNode.removeChild(loadScreen);
    }, 700);
    initializeApp();
  }, duration);
}

function createLoaderSparkles(count = 10, revealWindow = 1000) {
  if (!loadingText) return;
  const rect = loadingText.getBoundingClientRect();
  for (let i = 0; i < count; i += 1) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    // start roughly around the center of the text
    const startX = rect.width / 2 + (Math.random() * 160 - 80);
    const startY = rect.height / 2 + (Math.random() * 40 - 20);
    s.style.left = `${startX}px`;
    s.style.top = `${startY}px`;
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 140;
    const dx = Math.cos(angle) * dist + 'px';
    const dy = Math.sin(angle) * dist + 'px';
    s.style.setProperty('--dx', dx);
    s.style.setProperty('--dy', dy);
    const animDur = 700 + Math.random() * 900;
    s.style.animation = `sparkleMove ${animDur}ms cubic-bezier(.2,.9,.3,1) forwards`;
    // stagger sparkles to start within reveal window
    s.style.animationDelay = `${Math.random() * revealWindow}ms`;
    loadingText.appendChild(s);
    setTimeout(() => s.remove(), animDur + revealWindow + 300);
  }
}

// Initialize with loading screen (shortened for better UX)
startLoadingScreen(2800);
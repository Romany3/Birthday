function clearStageThreeEffects() {
  const stageThree = document.querySelector('.screen[data-stage="4"]');
  if (!stageThree) return;
  stageThree.querySelectorAll('.confetti, .balloon, .firework').forEach((element) => element.remove());
}

function createStageThreeConfettiCannon(count, delayMultiplier) {
  const confettiCannonContainer = document.querySelector('.screen[data-stage="4"] .confetti-cannon-container');
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
  const balloonsContainer = document.querySelector('.screen[data-stage="4"] .balloons-container');
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
  const fireworksContainer = document.querySelector('.screen[data-stage="4"] .fireworks-container');
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
  const stageThree = document.querySelector('.screen[data-stage="4"]');
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
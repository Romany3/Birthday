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

function typeText(element, text, speed, onComplete) {
  if (!element) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  element.textContent = '';
  element.classList.remove('typed');
  // We handle display in CSS to allow better layout control (block vs inline-block)
  element.style.whiteSpace = 'pre-wrap';
  element.style.borderRight = '2px solid #ff4fa3';
  element.style.minHeight = '1.4em';
  element.style.opacity = '1';
  element.style.visibility = 'visible';

  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index += 1;
    } else {
      clearInterval(typingInterval);
      element.classList.add('typed');
      element.style.borderRight = 'none';
      if (typeof onComplete === 'function') onComplete();
    }
  }, speed);
}

function startStageThreeCelebration() {
  const stageThree = document.querySelector('.screen[data-stage="4"]');
  if (!stageThree) return;

  clearStageThreeEffects();

  const subGreetingElement = stageThree.querySelector('.sub-greeting');
  const recipientNameElement = stageThree.querySelector('.recipient-name');
  const finalWishElement = stageThree.querySelector('.final-wish');
  const signatureElement = stageThree.querySelector('.signature');

  const subGreetingMessage = 'To the amazing';
  const recipientNameMessage = 'JoJo';
  const messageWish = `Wishing you the happiest birthday and many more blessed years with Jesus.
   May He continue to guide you, protect you, and fill your life with love, happiness, and countless blessings.
   I hope this year is filled with success, beautiful memories, and exciting opportunities.
   May your special day be filled with immense joy, laughter, and all the wonderful things life has to offer.
   Here's to another year of amazing adventures!`;
  const signatureMessage = 'hope this little gift brings a smile to your face and reminds you how special you are. ⭐✨';

  // Sequence the typing
  typeText(subGreetingElement, subGreetingMessage, 50, () => {
    typeText(recipientNameElement, recipientNameMessage, 100, () => {
      setTimeout(() => {
        typeText(finalWishElement, messageWish, 15, () => {
          setTimeout(() => {
            typeText(signatureElement, signatureMessage, 20);
          }, 500);
        });
      }, 500);
    });
  });

  createStageThreeConfettiCannon(100, 0.5);
  setTimeout(() => createStageThreeConfettiCannon(80, 0.3), 500);
  setTimeout(() => createStageThreeConfettiCannon(60, 0.2), 1000);
  createStageThreeBalloons(15);
  createStageThreeFireworks(5);
}
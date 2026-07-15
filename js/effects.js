// ================================
// Background Confetti
// ================================

function triggerConfetti(count = 30) {
  if (!confettiContainer) return;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");

    confetti.className = "confetti-piece";

    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${-5 + Math.random() * 8}%`;

    confetti.style.background =
      `hsl(${Math.random() * 360},80%,${45 + Math.random() * 20}%)`;

    confetti.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    const duration = 1200 + Math.random() * 1200;

    confetti.style.animation =
      `confettiFall ${duration}ms cubic-bezier(.1,.9,.2,1) forwards`;

    confettiContainer.appendChild(confetti);

    setTimeout(() => confetti.remove(), duration + 300);
  }
}

// ================================
// Continuous Confetti
// ================================

function spawnConfettiPiece() {

  if (!confettiContainer) return;

  const confetti = document.createElement("div");

  confetti.className = "confetti-piece";

  const size = 6 + Math.random() * 12;

  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;

  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.top = `${-8 + Math.random() * 6}%`;

  confetti.style.background =
    `hsl(${Math.random() * 360},80%,${45 + Math.random() * 20}%)`;

  const duration = 2200 + Math.random() * 2200;

  confetti.style.animation =
    `confettiFall ${duration}ms linear forwards`;

  confetti.style.opacity = .9;

  confettiContainer.appendChild(confetti);

  setTimeout(() => confetti.remove(), duration + 400);

}

function startConfettiLoop(rate = 700) {

  if (confettiLoopId) return;

  confettiLoopId = setInterval(() => {

    const amount = 1 + Math.floor(Math.random() * 3);

    for (let i = 0; i < amount; i++) {
      spawnConfettiPiece();
    }

  }, rate);

}

function stopConfettiLoop() {

  if (!confettiLoopId) return;

  clearInterval(confettiLoopId);

  confettiLoopId = null;

}

// ================================
// Background Bubbles
// ================================

function createBubbles(count = 10) {

  if (!bgBubbles) return;

  for (let i = 0; i < count; i++) {

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    const size = 40 + Math.random() * 220;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * 100}%`;

    bubble.style.bottom =
      `${-10 - Math.random() * 20}vh`;

    bubble.style.animationDelay =
      `${-Math.random() * 6}s`;

    bubble.style.animationDuration =
      `${14 + Math.random() * 18}s`;

    bubble.style.opacity =
      0.06 + Math.random() * .12;

    bgBubbles.appendChild(bubble);

  }

}
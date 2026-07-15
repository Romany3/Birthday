// ================================
// Loading Screen
// ================================

function startLoadingScreen(duration = 10000) {

  if (!loadScreen || !loadingText) {
    initializeApp();
    return;
  }

  const phrase = "HAPPY BIRTHDAY";

  const letters = phrase.split("");

  loadingText.innerHTML = "";

  const revealWindow = Math.max(
    300,
    Math.floor(duration * 0.75)
  );

  const perDelay =
    revealWindow / Math.max(letters.length, 1);

  letters.forEach((letter, index) => {

    const span = document.createElement("span");

    span.className = "loader-letter";

    span.textContent =
      letter === " " ? "\u00A0" : letter;

    span.style.animationDelay =
      `${index * perDelay}ms`;

    span.style.animationDuration =
      "420ms,820ms";

    loadingText.appendChild(span);

  });

  createLoaderSparkles(14, revealWindow);

  setTimeout(() => {

    const sparkles =
      loadingText.querySelectorAll(".sparkle");

    sparkles.forEach((sparkle) => sparkle.remove());

    loadScreen.classList.add("hidden");

    setTimeout(() => {

      if (loadScreen && loadScreen.parentNode) {

        loadScreen.parentNode.removeChild(loadScreen);

      }

    }, 700);

    initializeApp();

  }, duration);

}

// ================================
// Sparkles
// ================================

function createLoaderSparkles(
  count = 10,
  revealWindow = 1000
) {

  if (!loadingText) return;

  const rect = loadingText.getBoundingClientRect();

  for (let i = 0; i < count; i++) {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    const startX =
      rect.width / 2 +
      (Math.random() * 160 - 80);

    const startY =
      rect.height / 2 +
      (Math.random() * 40 - 20);

    sparkle.style.left = `${startX}px`;

    sparkle.style.top = `${startY}px`;

    const angle = Math.random() * Math.PI * 2;

    const distance =
      40 + Math.random() * 140;

    sparkle.style.setProperty(
      "--dx",
      `${Math.cos(angle) * distance}px`
    );

    sparkle.style.setProperty(
      "--dy",
      `${Math.sin(angle) * distance}px`
    );

    const animationDuration =
      700 + Math.random() * 900;

    sparkle.style.animation =
      `sparkleMove ${animationDuration}ms cubic-bezier(.2,.9,.3,1) forwards`;

    sparkle.style.animationDelay =
      `${Math.random() * revealWindow}ms`;

    loadingText.appendChild(sparkle);

    setTimeout(() => {

      sparkle.remove();

    }, animationDuration + revealWindow + 300);

  }

}
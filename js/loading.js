// ================================
// Loading Screen
// ================================

function startLoadingScreen(duration = 10000) {

  if (!loadScreen || !loadingText) {
    initializeApp();
    return;
  }

  // Text requirements
  const line1Text = "This is a simple gift for you.";
  const line2Text = "Hope you like it ❤️";

  loadingText.innerHTML = "";

  // Typography & Layout setup for the two lines
  // h1 is already styled in CSS, we add flex column to stack lines vertically
  loadingText.style.display = "inline-flex";
  loadingText.style.flexDirection = "column";
  loadingText.style.alignItems = "center";
  loadingText.style.justifyContent = "center";
  loadingText.style.gap = "0";

  /**
   * Helper to create a line container (span) with specific typography rules
   */
  function createLineContainer(isSubline) {
    const lineSpan = document.createElement("span");
    lineSpan.style.display = "flex";
    lineSpan.style.justifyContent = "center";
    lineSpan.style.flexWrap = "wrap";
    lineSpan.style.gap = "6px"; // Preserve letter spacing from original design
    
    if (isSubline) {
      // Subtitle rules: 60-70% size, 400-500 weight, 0.85-0.9 opacity, 10px margin-top
      lineSpan.style.fontSize = "0.65em";
      lineSpan.style.fontWeight = "500";
      lineSpan.style.opacity = "0.9";
      lineSpan.style.marginTop = "10px";
    } else {
      // Main line rules: 700-800 weight
      lineSpan.style.fontWeight = "800";
    }
    return lineSpan;
  }

  const container1 = createLineContainer(false);
  const container2 = createLineContainer(true);

  loadingText.appendChild(container1);
  loadingText.appendChild(container2);

  // Restore Typewriter Cursor
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "|";

  const charDelay = 40; // Original typewriter feel (35-45ms)

  /**
   * Types text into a container letter by letter
   */
  function typeChars(text, container, callback) {
    const chars = Array.from(text);
    let i = 0;
    container.appendChild(cursor); // Move cursor to the active container
    
    function nextChar() {
      if (i < chars.length) {
        const span = document.createElement("span");
        span.className = "loader-letter";
        span.textContent = chars[i] === " " ? "\u00A0" : chars[i];
        
        // Insert letter before the cursor
        container.insertBefore(span, cursor);
        i++;
        setTimeout(nextChar, charDelay);
      } else if (callback) {
        callback();
      }
    }
    nextChar();
  }

  // Sequential typing behavior
  typeChars(line1Text, container1, () => {
    // Small pause between sentences exactly as before
    setTimeout(() => {
      typeChars(line2Text, container2, () => {
        // After full sentence finishes, wait 600ms then finish loading
        setTimeout(() => {
          finishLoading();
        }, 600);
      });
    }, 400);
  });

  // Sparkles logic remains identical
  createLoaderSparkles(14, duration * 0.8);

  /**
   * Handles the transition from loading to main app
   */
  function finishLoading() {
    const sparkles = loadingText.querySelectorAll(".sparkle");
    sparkles.forEach((sparkle) => sparkle.remove());

    loadScreen.classList.add("hidden");

    setTimeout(() => {
      if (loadScreen && loadScreen.parentNode) {
        loadScreen.parentNode.removeChild(loadScreen);
      }
      initializeApp();
    }, 700);
  }
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

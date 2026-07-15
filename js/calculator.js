// ===============================
// Calculator Screen
// ===============================

function updateCalcDisplay() {
  const padded = enteredDigits.padEnd(8, ' ');
  const boxes = calcDisplay.querySelectorAll('.digit-box');
  
  if (boxes.length === 8) {
    for (let i = 0; i < 8; i++) {
      const newVal = padded[i] === ' ' ? '' : padded[i];
      if (boxes[i].textContent !== newVal) {
        boxes[i].textContent = newVal;
        // Add animation class
        boxes[i].classList.remove('digit-new');
        void boxes[i].offsetWidth; // Force reflow to restart animation
        boxes[i].classList.add('digit-new');
      }
    }
  } else {
    // Fallback if the boxes aren't in the DOM for some reason
    const displayPadded = enteredDigits.padEnd(8, '-');
    const formatted =
      `${displayPadded.slice(0, 2)} - ${displayPadded.slice(2, 4)} - ${displayPadded.slice(4, 8)}`;
    calcDisplay.textContent = formatted;
  }
}

function setCalcMessage(text, valid = false) {
  calcMessage.textContent = text;
  calcMessage.style.color = valid ? '#1d7a2f' : '#9e2f6c';
}

function bindCalculatorEvents() {
  const buttons = document.querySelectorAll('.calc-button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.key;
      handleCalcKey(key);
    });
  });

  // Physical Keyboard Support
  document.addEventListener('keydown', (e) => {
    // Only respond when calculator screen is active (Stage 1)
    if (currentStage !== 1) return;

    if (e.key >= '0' && e.key <= '9') {
      handleCalcKey(e.key);
    } else if (e.key === 'Backspace') {
      handleCalcKey('backspace');
    } else if (e.key === 'Enter') {
      handleCalcKey('submit');
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
      handleCalcKey('clear');
    }
  });
}

bindCalculatorEvents();

function handleCalcKey(key) {

  if (key === 'clear') {
    enteredDigits = '';
    updateCalcDisplay();
    setCalcMessage('Enter The Special Date');
    return;
  }

  if (key === 'backspace') {
    if (enteredDigits.length > 0) {
      enteredDigits = enteredDigits.slice(0, -1);
      updateCalcDisplay();
      
      // Update message based on new length
      if (enteredDigits.length < 8) {
        setCalcMessage('Think About Special Numbers');
      }
    }
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

  // Handle numeric keys
  if (!isNaN(key) && key !== null && key !== ' ') {
    if (enteredDigits.length >= 8) {
      return;
    }

    enteredDigits += key;
    updateCalcDisplay();

    if (enteredDigits.length === 8) {
      setCalcMessage('Tap OK to unlock the message.');
    }
  }
}

function validateBirthday() {

  if (enteredDigits === expectedBirthday) {

    setCalcMessage('Correct! Birthday unlocked.');

    triggerConfetti(80);
    showStage(2);

  } else {

    setCalcMessage('This date is not right. Try again.');

    enteredDigits = '';

    setTimeout(() => {
      updateCalcDisplay();
    }, 300);

  }
}
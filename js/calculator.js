// ===============================
// Calculator Screen
// ===============================

function updateCalcDisplay() {
  const padded = enteredDigits.padEnd(8, '*');
  const formatted =
    `${padded.slice(0, 2)} - ${padded.slice(2, 4)} - ${padded.slice(4, 8)}`;

  calcDisplay.textContent = formatted;
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
}

bindCalculatorEvents();

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
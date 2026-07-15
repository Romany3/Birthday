// ================================
// DOM Elements
// ================================

const pageContainer = document.getElementById('pageContainer');
const screens = document.querySelectorAll('.screen');

const loadScreen = document.getElementById('loadScreen');
const loadingText = document.getElementById('loadingText');

const confettiContainer = document.getElementById('confettiContainer');
const bgBubbles = document.getElementById('bgBubbles');

const calcDisplay = document.getElementById('calcDisplay');
const calcMessage = document.getElementById('calcMessage');

const progressContainer = document.getElementById('progressContainerIndicator');

function showStage(stage){

    const current=document.querySelector(".screen.active");
    const next=document.querySelector(`[data-stage="${stage}"]`);

    if(!next) return;

    if(current){

        current.classList.add("exit");

        setTimeout(()=>{

            current.classList.remove("active");
            current.classList.remove("exit");

            next.classList.add("active");

        },250);

    }else{

        next.classList.add("active");

    }

    currentStage=stage;
    updateProgressIndicator(stage);

    clearAutoAdvance();

    if(stage===4){

        setTimeout(() => {
            startStageThreeCelebration();
        }, 260);

    }else if(stage>1){

        triggerConfetti(22);

    }

}

function nextStage() {
  const nextStage = currentStage + 1;
  if (document.querySelector(`[data-stage="${nextStage}"]`)) {
    showStage(nextStage);
  }
}

/**
 * Updates the progress indicator visual state
 */
function updateProgressIndicator(stage) {
    if (!progressContainer) return;

    // Show indicator if it's the first time
    if (!progressContainer.classList.contains('visible')) {
        progressContainer.classList.add('visible');
    }

    const steps = progressContainer.querySelectorAll('.progress-step');
    const connectors = progressContainer.querySelectorAll('.progress-connector');

    steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('current', 'completed');
        
        if (stepNum < stage) {
            step.classList.add('completed');
        } else if (stepNum === stage) {
            step.classList.add('current');
        }
    });

    connectors.forEach((connector, index) => {
        const connectorNum = index + 1;
        connector.classList.remove('completed');
        if (connectorNum < stage) {
            connector.classList.add('completed');
        }
    });
}


// Click on screen to advance after the birthday check screen
document.addEventListener('click', (e) => {

  // لو ضغط زرار سيبه يتعامل لوحده
  if (e.target.closest('button')) {
    return;
  }

  // منتحركش في شاشة الكالكوليتر
  if (currentStage === 1) {
    return;
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

// Initialize with loading screen - Updated to 22.8s (2.8s + 20s) to give the user more time to read the message.
startLoadingScreen(5000);
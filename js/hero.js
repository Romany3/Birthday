// ================================
// Hero Screen
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
    title: 'Tonight is a beautiful night to celebrate you.',
    subtitle: 'Some nights are ordinary... Tonight is special because it\'s yours.'
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

  const mainTitle = heroGreeting.querySelector('h1');
  heroGreeting.insertBefore(wrapper, mainTitle || heroGreeting.firstChild);
}

const heroContinue = document.getElementById("heroContinue");

if (heroContinue) {

    heroContinue.addEventListener("click", () => {

        showStage(3);

    });

}

renderTimeGreeting();
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const victoryContainer = document.getElementById('victory-container');

// Texts to cycle through when trying to click No
const noTexts = [
  "Tu es sûre ?",
  "Vraiment ?",
  "Pense-y bien !",
  "Allez...",
  "Sois sympa !",
  "Juste un dîner !",
  "Ne brise pas mon cœur 💔",
  "Dernière chance !",
  "S'il te plaît 🥺",
  "Ok, j'insiste !"
];

let textIndex = 0;

// Function to move the No button
// Function to move the No button
function moveNoButton() {
  // Get viewport dimensions
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  const randomX = Math.random() * (maxX - 40) + 20;
  const randomY = Math.random() * (maxY - 40) + 20;

  // Handle the first move from static to fixed seamlessly
  if (noBtn.style.position !== 'fixed') {
    // 1. Get current position
    const rect = noBtn.getBoundingClientRect();

    // 2. Set strict fixed coordinates to match current position (no visual jump)
    noBtn.style.left = rect.left + 'px';
    noBtn.style.top = rect.top + 'px';
    noBtn.style.position = 'fixed';

    // 3. Force reflow to ensure the browser registers the start position before validating transition
    void noBtn.offsetWidth;

    // 4. Now move to the new random position with transition
    requestAnimationFrame(() => {
      noBtn.style.left = randomX + 'px';
      noBtn.style.top = randomY + 'px';
    });
  } else {
    // Subsequent moves
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
  }

  // Add a random rotation for fun
  const randomRot = (Math.random() * 20) - 10; // -10 to 10 deg
  noBtn.style.transform = `rotate(${randomRot}deg)`;

  // Change text
  noBtn.innerText = noTexts[textIndex];
  textIndex = (textIndex + 1) % noTexts.length;

  // Make Yes button grow slightly each time No is hovered/clicked
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize * 1.1) + 'px';
}

// Event listeners for No button
// Use mouseover for desktop (makes it impossible to click)
// Use click/touchstart for mobile (makes it jump when tapped)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent actual click if possible
  moveNoButton();
});
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Stop double-tap zoom etc
  moveNoButton();
});

// Event listener for Yes button
yesBtn.addEventListener('click', () => {
  // Hide question, show victory
  questionContainer.classList.add('hidden');
  victoryContainer.classList.remove('hidden');

  // Launch confetti
  launchConfetti();
});

function launchConfetti() {
  // Basic confetti blast
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff4d6d', '#ff8fa3', '#ffffff', '#ffccd5']
  });

  // Validated "School Pride" style canon
  var end = Date.now() + 15 * 1000;

  // go Buckeyes!
  var colors = ['#ff4d6d', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

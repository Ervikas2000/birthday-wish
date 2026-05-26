const nameInput = document.getElementById('nameInput');
const generateBtn = document.getElementById('generateBtn');
const creatorBox = document.getElementById('creator-box');
const wishBox = document.getElementById('wish-box');
const birthdayText = document.getElementById('birthdayText');
const typing = document.getElementById('typing');
const countdown = document.getElementById('countdown');
const music = document.getElementById('music');


// URL params
const params = new URLSearchParams(window.location.search);
const personName = params.get('name');


// If name exists in URL
if (personName) {

  creatorBox.classList.add('hidden');
  wishBox.classList.remove('hidden');

  startCountdown(personName);
}


// Generate Link
const linkBox = document.getElementById('linkBox');
const generatedLink = document.getElementById('generatedLink');
const copyBtn = document.getElementById('copyBtn');

generateBtn.addEventListener('click', () => {

  const name = nameInput.value.trim();

  if(name === ''){
    alert('Please enter a name');
    return;
  }

  const url = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}`;

  // show link box
  linkBox.style.display = 'block';
  generatedLink.value = url;

});

copyBtn.addEventListener('click', () => {

  generatedLink.select();
  generatedLink.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(generatedLink.value);

  copyBtn.innerText = "Copied ✔";

  setTimeout(() => {
    copyBtn.innerText = "📋 Copy Link";
  }, 1500);

});


// Countdown
function startCountdown(name) {

  let count = 3;

  countdown.innerText = count;

  const interval = setInterval(() => {

    count--;

    if (count > 0) {

      countdown.innerText = count;

    } else {

      clearInterval(interval);

      countdown.style.display = 'none';

      showWish(name);

    }

  }, 1000);

}


// Show Birthday Wish
function showWish(name) {

  birthdayText.innerHTML =
    `🎂 Happy Birthday ${name} 🎂`;

  startTyping();

  launchConfetti();

   music.play().catch(() => {
    console.log("User interaction required for autoplay");
  });

}


// Typing Effect
function startTyping() {

  const message =
    'May your life be filled with happiness, success, love and unlimited cake! 🎉';

  let index = 0;

  typing.innerHTML = '';

  const interval = setInterval(() => {

    typing.innerHTML += message[index];

    index++;

    if (index >= message.length) {
      clearInterval(interval);
    }

  }, 50);

}


// Confetti
function launchConfetti() {

  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {

    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }

  }());

}
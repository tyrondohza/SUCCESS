const particleLayer = document.querySelector('.floating-particles');

if (particleLayer) {
  const totalParticles = 18;

  for (let i = 0; i < totalParticles; i += 1) {
    const particle = document.createElement('span');
    const isHeart = i % 2 === 0;

    particle.textContent = isHeart ? '♥' : '✦';
    particle.className = isHeart ? 'heart' : 'spark';

    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = (Math.random() * 18 + 8) * (isHeart ? 1.4 : 1);
    const delay = (Math.random() * 7).toFixed(2);
    const duration = (Math.random() * 7 + 8).toFixed(2);

    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.fontSize = `${size}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = String(Math.random() * 0.5 + 0.35);

    particleLayer.appendChild(particle);
  }
}

const themeButtons = document.querySelectorAll('.theme-btn');
const card = document.getElementById('loveCard');
const flipButton = document.querySelector('.flip-btn');
const burstLayer = document.querySelector('.burst-layer');
const soundButton = document.querySelector('.sound-btn');

let isSoundOn = true;

const createBurst = () => {
  if (!burstLayer) return;

  const colors = ['#f7d98a', '#ff9fc4', '#b799ff', '#ffffff'];

  for (let i = 0; i < 18; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'burst-particle';

    const angle = (Math.PI * 2 * i) / 18;
    const distance = 50 + Math.random() * 120;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const size = 6 + Math.random() * 11;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--size', `${size}px`);
    particle.style.setProperty('--burst-color', color);

    burstLayer.appendChild(particle);
    window.setTimeout(() => particle.remove(), 800);
  }
};

const createHeartBurst = () => {
  if (!burstLayer) return;

  const heart = document.createElement('span');
  heart.textContent = '♥';
  heart.style.position = 'absolute';
  heart.style.left = '50%';
  heart.style.top = '50%';
  heart.style.color = '#ff7bb8';
  heart.style.fontSize = '24px';
  heart.style.textShadow = '0 0 12px rgba(255, 123, 184, 0.7)';
  heart.style.opacity = '0';
  heart.style.setProperty('--hx', `${(Math.random() - 0.5) * 140}px`);
  heart.style.setProperty('--hy', `${-25 - Math.random() * 35}px`);
  heart.style.animation = 'heartFloat 0.9s ease-out forwards';

  burstLayer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 900);
};

const playSoftTone = () => {
  if (!isSoundOn || typeof window.AudioContext === 'undefined') return;

  try {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.18);
    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.35);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.38);
  } catch (error) {
    // Ignore audio errors silently.
  }
};

const applyTheme = (themeName) => {
  const validThemes = ['soft-pink', 'midnightglow', 'gold'];
  const theme = validThemes.includes(themeName) ? themeName : 'midnightglow';

  document.body.classList.remove('theme-soft-pink', 'theme-midnightglow', 'theme-gold');
  document.body.classList.add(`theme-${theme}`);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === theme;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyTheme(button.dataset.theme);
  });
});

if (soundButton) {
  soundButton.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    soundButton.textContent = isSoundOn ? '♡ Sound On' : '♡ Sound Off';
    soundButton.classList.toggle('is-muted', !isSoundOn);
    soundButton.setAttribute('aria-pressed', String(isSoundOn));
  });
}

if (flipButton && card) {
  const triggerFlip = () => {
    card.classList.toggle('is-flipped');
    createBurst();
    createHeartBurst();
    playSoftTone();

    flipButton.classList.remove('is-animating');
    void flipButton.offsetWidth;
    flipButton.classList.add('is-animating');

    const isFlipped = card.classList.contains('is-flipped');
    flipButton.textContent = isFlipped ? 'Tap to reveal the front' : 'Tap to reveal my love';

    window.setTimeout(() => {
      flipButton.classList.remove('is-animating');
    }, 450);
  };

  flipButton.addEventListener('click', triggerFlip);
}

applyTheme('midnightglow');

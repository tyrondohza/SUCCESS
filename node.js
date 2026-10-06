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
const openCardButton = document.querySelector('.open-card-btn');
const burstLayer = document.querySelector('.burst-layer');
const soundButton = document.querySelector('.sound-btn');
const greetingShell = document.querySelector('.greeting-shell');
const loveJar = document.querySelector('.love-jar');
const complimentText = document.querySelector('.compliment-text');
const dateDay = document.getElementById('dateDay');
const dateMonth = document.getElementById('dateMonth');
const dateArea = document.getElementById('dateArea');
const datePreview = document.getElementById('datePreview');
const saveDateValue = document.getElementById('saveDateValue');
const savePlaceValue = document.getElementById('savePlaceValue');
const saveDateButton = document.getElementById('saveDateButton');
const savedDateSummary = document.getElementById('savedDateSummary');
const savedDateValue = document.querySelector('.saved-date-value');
const saveDateCard = document.getElementById('saveDateCard');
const calendarMonth = document.getElementById('calendarMonth');
const calendarDay = document.getElementById('calendarDay');
const countdownDays = document.getElementById('countdownDays');
const countdownHours = document.getElementById('countdownHours');
const countdownMinutes = document.getElementById('countdownMinutes');
const countdownSeconds = document.getElementById('countdownSeconds');

const compliments = [
  'You make my heart feel safe in the quietest moments, HABIBI.',
  'Your kindness is the kind of love I never want to lose.',
  'You are so beautiful in the way you care for everyone around you.',
  'The way you smile makes my whole world feel softer and brighter.',
  'You are the sweetest part of my day and the gentlest part of my heart.',
  'Your love feels like a warm light I can always trust.',
  'You are deeply cherished, endlessly admired, and so beautifully loved.',
  'The way you exist makes life feel more meaningful and magical.'
];

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

const createTapHearts = (x, y) => {
  if (!burstLayer) return;

  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'tap-heart';
    heart.textContent = '♥';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    const driftX = (Math.random() - 0.5) * 110;
    const driftY = -30 - Math.random() * 80;
    heart.style.setProperty('--tap-x', `${driftX}px`);
    heart.style.setProperty('--tap-y', `${driftY}px`);
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.opacity = String(0.9);
    burstLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 900);
  }
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
  const switcher = document.querySelector('.theme-switcher');

  document.body.classList.remove('theme-soft-pink', 'theme-midnightglow', 'theme-gold');
  document.body.classList.add(`theme-${theme}`);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === theme;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  if (switcher) {
    const activeButton = [...themeButtons].find((button) => button.dataset.theme === theme);

    if (activeButton) {
      const indicatorX = activeButton.offsetLeft - 12;
      const indicatorWidth = activeButton.offsetWidth;
      switcher.style.setProperty('--indicator-x', `${indicatorX}px`);
      switcher.style.setProperty('--indicator-width', `${indicatorWidth}px`);
    }
  }
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

if (card) {
  const triggerOpenCard = () => {
    const isOpening = !card.classList.contains('is-open');
    card.classList.toggle('is-open', isOpening);
    card.classList.toggle('is-flipped', isOpening);

    if (greetingShell) {
      greetingShell.classList.toggle('is-hidden', isOpening);
    }

    createBurst();
    for (let i = 0; i < 7; i += 1) {
      createHeartBurst();
    }
    playSoftTone();

    if (flipButton) {
      flipButton.classList.remove('is-animating');
      void flipButton.offsetWidth;
      flipButton.classList.add('is-animating');
      flipButton.textContent = isOpening ? 'Close the card' : 'Open the card';
      window.setTimeout(() => flipButton.classList.remove('is-animating'), 450);
    }

    if (openCardButton) {
      openCardButton.textContent = isOpening ? 'Opened' : 'Open Card';
    }
  };

  if (flipButton) {
    flipButton.addEventListener('click', triggerOpenCard);
  }

  if (openCardButton) {
    openCardButton.addEventListener('click', triggerOpenCard);
  }
}

if (loveJar && complimentText) {
  loveJar.addEventListener('click', () => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    complimentText.textContent = randomCompliment;
    loveJar.classList.remove('is-popping', 'is-shaking');
    void loveJar.offsetWidth;
    loveJar.classList.add('is-shaking', 'is-popping');
    createBurst();
    createHeartBurst();
    playSoftTone();
    setTimeout(() => {
      loveJar.classList.remove('is-popping', 'is-shaking');
    }, 450);
  });
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const getNextDateFromSelection = () => {
  const day = Number.parseInt(dateDay.value, 10);
  const monthText = String(dateMonth.value || '').trim();
  const monthIndex = monthNames.findIndex((name) => name.toLowerCase() === monthText.toLowerCase());
  const now = new Date();
  const safeDay = Number.isFinite(day) && day > 0 ? Math.min(day, 31) : 1;
  const safeMonth = monthIndex >= 0 ? monthIndex : now.getMonth();

  let target = new Date(now.getFullYear(), safeMonth, safeDay, 18, 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target = new Date(now.getFullYear() + 1, safeMonth, safeDay, 18, 0, 0, 0);
  }

  return target;
};

const renderSavedDate = (day, month, area) => {
  if (!savedDateValue) return;

  const cleanDay = String(day || '').trim();
  const cleanMonth = String(month || '').trim();
  const cleanArea = String(area || '').trim();

  if (!cleanDay && !cleanMonth && !cleanArea) {
    savedDateValue.textContent = 'No date saved yet';
    return;
  }

  savedDateValue.textContent = `${cleanDay || '?'} ${cleanMonth || 'your month'} • ${cleanArea || 'your place'}`;
};

const updateSaveDateCard = () => {
  if (!dateDay || !dateMonth || !dateArea || !datePreview || !saveDateValue || !savePlaceValue) return;

  const day = String(dateDay.value || '').trim();
  const month = String(dateMonth.value || '').trim();
  const area = String(dateArea.value || '').trim();

  const hasSelection = day || month || area;

  if (!hasSelection) {
    datePreview.textContent = 'We’ll choose our perfect date together soon.';
    saveDateValue.textContent = 'Your date';
    savePlaceValue.textContent = 'Your place';
    if (calendarMonth) calendarMonth.textContent = '?';
    if (calendarDay) calendarDay.textContent = '?';
    if (countdownDays) countdownDays.textContent = '00';
    if (countdownHours) countdownHours.textContent = '00';
    if (countdownMinutes) countdownMinutes.textContent = '00';
    if (countdownSeconds) countdownSeconds.textContent = '00';
    renderSavedDate('', '', '');
    return;
  }

  const previewDay = day || '??';
  const previewMonth = month || 'your month';
  const previewArea = area || 'your dream place';

  datePreview.innerHTML = `We’ll make time for our date in <strong>${previewArea}</strong> on <strong>${previewDay} ${previewMonth}</strong>.`;
  saveDateValue.textContent = `${previewDay} ${previewMonth}`;
  savePlaceValue.textContent = previewArea;

  if (calendarMonth) calendarMonth.textContent = month || 'Soon';
  if (calendarDay) calendarDay.textContent = day || '?';

  if (saveDateCard) {
    saveDateCard.classList.remove('is-animating');
    void saveDateCard.offsetWidth;
    saveDateCard.classList.add('is-animating');
    window.setTimeout(() => saveDateCard.classList.remove('is-animating'), 900);
  }

  renderSavedDate(day, month, area);

  const targetDate = getNextDateFromSelection();
  const countdownTarget = targetDate.getTime();
  const now = Date.now();
  const diff = Math.max(0, countdownTarget - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (countdownDays) countdownDays.textContent = String(days).padStart(2, '0');
  if (countdownHours) countdownHours.textContent = String(hours).padStart(2, '0');
  if (countdownMinutes) countdownMinutes.textContent = String(minutes).padStart(2, '0');
  if (countdownSeconds) countdownSeconds.textContent = String(seconds).padStart(2, '0');
};

const saveDatePlan = () => {
  if (!dateDay || !dateMonth || !dateArea) return;

  const day = String(dateDay.value || '').trim();
  const month = String(dateMonth.value || '').trim();
  const area = String(dateArea.value || '').trim();

  if (!day && !month && !area) {
    if (savedDateValue) savedDateValue.textContent = 'No date saved yet';
    return;
  }

  const savedPlan = { day, month, area };
  localStorage.setItem('loveDatePlan', JSON.stringify(savedPlan));
  renderSavedDate(day, month, area);

  if (savedDateSummary) {
    savedDateSummary.classList.remove('is-saved');
    void savedDateSummary.offsetWidth;
    savedDateSummary.classList.add('is-saved');
    window.setTimeout(() => savedDateSummary.classList.remove('is-saved'), 600);
  }
};

const restoreSavedDate = () => {
  try {
    const stored = localStorage.getItem('loveDatePlan');
    if (!stored) return;

    const savedPlan = JSON.parse(stored);
    if (!savedPlan) return;

    if (dateDay) dateDay.value = savedPlan.day || '';
    if (dateMonth) dateMonth.value = savedPlan.month || '';
    if (dateArea) dateArea.value = savedPlan.area || '';

    updateSaveDateCard();
    renderSavedDate(savedPlan.day, savedPlan.month, savedPlan.area);
  } catch (error) {
    // Ignore invalid saved data.
  }
};

if (dateDay && dateMonth && dateArea && datePreview) {
  [dateDay, dateMonth, dateArea].forEach((field) => {
    field.addEventListener('input', updateSaveDateCard);
    field.addEventListener('change', updateSaveDateCard);
  });

  if (saveDateButton) {
    saveDateButton.addEventListener('click', saveDatePlan);
  }

  restoreSavedDate();
  updateSaveDateCard();
  window.setInterval(updateSaveDateCard, 1000);
}

document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('button')) return;
  createTapHearts(event.clientX, event.clientY);
});

applyTheme('midnightglow');

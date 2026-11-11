/**
 * Ather 450 Series (450X & 450S) Interactive Script
 * Bellad & Company Authorized Dealership Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModelSubnav();
  initColorViewer();
  initDashSmarts();
  initVoiceSim();
  initFinanceCalc();
  initSavingsCalc();
  initContactForm();
  initFaqAccordion();
});

/* =========================================================================
   1. THEME INITIALIZATION & TOGGLE
   ========================================================================= */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // URL param override
  const urlParams = new URLSearchParams(window.location.search);
  const themeParam = urlParams.get('theme');
  if (themeParam === 'light' || themeParam === 'dark') {
    document.documentElement.setAttribute('data-theme', themeParam);
    localStorage.setItem('ather_theme', themeParam);
  } else {
    const saved = localStorage.getItem('ather_theme') || 'dark'; // Dark default for 450
    document.documentElement.setAttribute('data-theme', saved);
  }

  function updateIcon() {
    const current = document.documentElement.getAttribute('data-theme');
    if (themeIcon) {
      if (current === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  updateIcon();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ather_theme', next);
      updateIcon();
    });
  }
}

/* =========================================================================
   2. MODEL SUB-NAV HIGHLIGHT ON SCROLL
   ========================================================================= */
function initModelSubnav() {
  const links = document.querySelectorAll('.subnav-link');
  const sections = Array.from(links).map(link => {
    const href = link.getAttribute('href');
    return href.startsWith('#') ? document.querySelector(href) : null;
  });

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec, idx) => {
      if (!sec) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach(l => l.classList.remove('active'));
        links[idx].classList.add('active');
      }
    });
  }, { passive: true });
}

/* =========================================================================
   3. COLOUR VIEWER (450X & 450S Swatches)
   ========================================================================= */
const COLOR_DATA = {
  '450x': [
    { name: 'Hyper Sand', hex: '#D9C0A9', img: 'images/ather_450/450s-hyper-sand-d.webp' },
    { name: 'Stealth Blue', hex: '#26354C', img: 'images/ather_450/450x-matte-stealth-blue-d.webp' },
    { name: 'True Red', hex: '#CA2C2C', img: 'images/ather_450/450x-mono-true-red-d.webp' },
    { name: 'Cosmic Black', hex: '#111111', img: 'images/ather_450/450x-mono-cosmic-black-d.webp' },
    { name: 'Space Grey', hex: '#4C5054', img: 'images/ather_450/450x-overtones-space-grey-d.webp' },
    { name: 'Lunar Grey', hex: '#C1C1C1', img: 'images/ather_450/450x-overtones-lunar-grey-d.webp' },
    { name: 'Still White', hex: '#F0F0F0', img: 'images/ather_450/450x-overtones-still-white-d.webp' }
  ],
  '450s': [
    { name: 'Cosmic Black', hex: '#111111', img: 'images/ather_450/450s-cosmic-black-d.webp' },
    { name: 'True Red', hex: '#CA2C2C', img: 'images/ather_450/450s-true-red-d.webp' },
    { name: 'Still White', hex: '#F0F0F0', img: 'images/ather_450/450s-still-white-d.webp' },
    { name: 'Hyper Sand', hex: '#D9C0A9', img: 'images/ather_450/450s-hyper-sand-d.webp' },
    { name: 'Stealth Blue', hex: '#26354C', img: 'images/ather_450/450s-stealth-blue-d.webp' }
  ]
};

let currentModel = '450x';

function initColorViewer() {
  const modelBtns = document.querySelectorAll('.colour-model-btn');
  const swatchesWrap = document.getElementById('colourSwatchesWrap');
  const viewerImg = document.getElementById('colourViewerImg');
  const nameLabel = document.getElementById('colourNameLabel');

  if (!swatchesWrap || !viewerImg || !nameLabel) return;

  function renderSwatches(modelKey) {
    swatchesWrap.innerHTML = '';
    const palette = COLOR_DATA[modelKey];
    if (!palette) return;

    palette.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = `colour-swatch-btn ${index === 0 ? 'active' : ''}`;
      btn.style.backgroundColor = item.hex;
      btn.setAttribute('aria-label', item.name);
      btn.title = item.name;

      btn.addEventListener('click', () => {
        swatchesWrap.querySelectorAll('.colour-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Smooth image switch
        viewerImg.style.opacity = '0';
        viewerImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          viewerImg.src = item.img;
          viewerImg.alt = `Ather ${modelKey.toUpperCase()} in ${item.name}`;
          nameLabel.textContent = item.name;
          viewerImg.style.opacity = '1';
          viewerImg.style.transform = 'scale(1)';
        }, 180);
      });

      swatchesWrap.appendChild(btn);
    });

    // Set first swatch as active
    viewerImg.src = palette[0].img;
    viewerImg.alt = `Ather ${modelKey.toUpperCase()} in ${palette[0].name}`;
    nameLabel.textContent = palette[0].name;
  }

  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentModel = btn.dataset.model;
      renderSwatches(currentModel);
    });
  });

  // Initial render
  renderSwatches('450x');
}

/* =========================================================================
   4. DASH OF SMARTS (Interactive Tabs)
   ========================================================================= */
function initDashSmarts() {
  const tabItems = document.querySelectorAll('.dash-tab-item');
  const displayImg = document.getElementById('dashScreenImg');

  if (!displayImg) return;

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      tabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const newSrc = tab.dataset.img;
      if (newSrc && displayImg.src !== newSrc) {
        displayImg.style.opacity = '0';
        setTimeout(() => {
          displayImg.src = newSrc;
          displayImg.style.opacity = '1';
        }, 160);
      }
    });
  });
}

/* =========================================================================
   5. VOICE ON ATHER SIMULATOR
   ========================================================================= */
const VOICE_DATA = {
  'nav': {
    query: '"Navigate to work"',
    reply: '“Navigating to Mindspace via Western Express Highway. Traffic is moderate — ETA 28 minutes.”'
  },
  'traction': {
    query: '"Set Traction Control"',
    reply: '“Traction control switched to Rain Mode. Rear wheel slippage protection is now at maximum.”'
  },
  'call': {
    query: '"Incoming call"',
    reply: '“Call from Priya. Tap left toggle switch to answer or press right button to decline with SMS.”'
  }
};

function initVoiceSim() {
  const voiceBtns = document.querySelectorAll('.voice-pill-btn');
  const bubble = document.getElementById('voiceOutputBubble');

  if (!bubble) return;

  voiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      voiceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.dataset.voice;
      const data = VOICE_DATA[key];
      if (!data) return;

      bubble.style.opacity = '0';
      setTimeout(() => {
        bubble.innerHTML = `<strong>${data.query}:</strong> &nbsp;${data.reply}`;
        bubble.style.opacity = '1';
      }, 150);
    });
  });
}

/* =========================================================================
   6. FINANCE EMI CALCULATOR
   ========================================================================= */
function initFinanceCalc() {
  const downSlider = document.getElementById('downSlider');
  const tenureSlider = document.getElementById('tenureSlider');
  const downValText = document.getElementById('downValText');
  const tenureValText = document.getElementById('tenureValText');
  const emiValText = document.getElementById('emiValText');

  if (!downSlider || !tenureSlider || !emiValText) return;

  const vehiclePrice = 140599; // Ather 450X (2.9 kWh) base
  const annualRate = 0.0399;   // 3.99% annual interest

  function computeEmi() {
    const downPayment = parseInt(downSlider.value, 10);
    const months = parseInt(tenureSlider.value, 10);

    downValText.textContent = `₹ ${downPayment.toLocaleString('en-IN')}`;
    tenureValText.textContent = `${months} Months`;

    const principal = Math.max(vehiclePrice - downPayment, 10000);
    const monthlyRate = annualRate / 12;

    // Standard EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );

    emiValText.textContent = `₹ ${emi.toLocaleString('en-IN')}`;
  }

  downSlider.addEventListener('input', computeEmi);
  tenureSlider.addEventListener('input', computeEmi);
  computeEmi();
}

/* =========================================================================
   7. SAVINGS CALCULATOR (TCO)
   ========================================================================= */
function initSavingsCalc() {
  const rangeSlider = document.getElementById('commuteSlider');
  const commuteValText = document.getElementById('commuteValText');
  const petrolCostText = document.getElementById('petrolCostText');
  const evCostText = document.getElementById('evCostText');
  const monthlySavingsText = document.getElementById('monthlySavingsText');
  const annualSavingsText = document.getElementById('annualSavingsText');

  if (!rangeSlider || !monthlySavingsText) return;

  const petrolPrice = 110;  // ₹110 / litre
  const petrolMileage = 40; // 40 km / litre
  const evRangePerUnit = 40; // 40 km per unit (kWh)
  const electricityUnit = 10; // ₹10 / unit
  const daysPerMonth = 25;

  function computeSavings() {
    const dailyKm = parseInt(rangeSlider.value, 10);
    commuteValText.textContent = `${dailyKm} km / day`;

    const monthlyKm = dailyKm * daysPerMonth;

    const petrolLitres = monthlyKm / petrolMileage;
    const monthlyPetrolCost = Math.round(petrolLitres * petrolPrice);

    const evUnits = monthlyKm / evRangePerUnit;
    const monthlyEvCost = Math.round(evUnits * electricityUnit);

    const monthlySavings = Math.max(monthlyPetrolCost - monthlyEvCost, 0);
    const annualSavings = monthlySavings * 12;

    petrolCostText.textContent = `₹ ${monthlyPetrolCost.toLocaleString('en-IN')}`;
    evCostText.textContent = `₹ ${monthlyEvCost.toLocaleString('en-IN')}`;
    monthlySavingsText.textContent = `₹ ${monthlySavings.toLocaleString('en-IN')}`;
    if (annualSavingsText) {
      annualSavingsText.textContent = `₹ ${annualSavings.toLocaleString('en-IN')}`;
    }
  }

  rangeSlider.addEventListener('input', computeSavings);
  computeSavings();
}

/* =========================================================================
   8. GET IN TOUCH FORM & MODEL SWITCH
   ========================================================================= */
function initContactForm() {
  const modelBtns = document.querySelectorAll('.model-pill-btn');
  const scooterImg = document.getElementById('contactScooterImg');
  const form = document.getElementById('contactForm450');
  const locateBtn = document.getElementById('locateBtn');
  const pinInput = document.getElementById('pincodeInput');

  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const model = btn.dataset.model;
      if (scooterImg) {
        scooterImg.style.opacity = '0';
        scooterImg.style.transform = 'scale(0.96)';
        setTimeout(() => {
          if (model === '450') {
            scooterImg.src = 'images/ather_official/450-forms-d.webp';
            scooterImg.alt = 'Ather 450X';
          } else {
            scooterImg.src = 'images/ather_official/Rizta-with-side-stand.webp';
            scooterImg.alt = 'Ather Rizta';
          }
          scooterImg.style.opacity = '1';
          scooterImg.style.transform = 'scale(1)';
        }, 180);
      }
    });
  });

  // GPS Auto-location
  if (locateBtn && pinInput) {
    locateBtn.addEventListener('click', () => {
      if ('geolocation' in navigator) {
        locateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        navigator.geolocation.getCurrentPosition(
          pos => {
            pinInput.value = '580030, Hubballi';
            locateBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-green);"></i>';
          },
          err => {
            pinInput.value = '580030, Hubballi';
            locateBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
          },
          { timeout: 4000 }
        );
      } else {
        pinInput.value = '580030, Hubballi';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.contact-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Request Submitted!';
      submitBtn.style.background = '#00d26a';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        form.reset();
      }, 3500);
    });
  }
}

/* =========================================================================
   9. FAQS ACCORDION
   ========================================================================= */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

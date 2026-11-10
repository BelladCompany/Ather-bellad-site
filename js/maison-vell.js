/**
 * ATHER RUNWAY DEPTH LOOKBOOK
 * Multi-depth interactive showcase featuring strictly 3 Ather Models (Rizta, 450X, 450 Apex)
 * Clamped strictly to 3 editions (stops at 3rd edition).
 * Side panel dynamically displays that particular model's colors.
 * Selecting a color updates the model on stage without changing the edition.
 * 100% unified with Neurial Grotesk official brand typography.
 */
(function () {
  'use strict';

  // 3 OFFICIAL ATHER MODELS WITH THEIR COMPLETE SIGNATURE COLORWAYS
  const MODELS = [
    {
      id: 1,
      editionNumber: '01',
      name: 'Ather Rizta',
      tagline: 'Family comfort scooter with spacious 34L storage & integrated pillion backrest',
      defaultColorIndex: 0,
      colors: [
        {
          name: 'Champagne Gold Duo',
          modelVariant: 'Ather Rizta Z (3.7 kWh)',
          badge: 'DUAL-TONE LUXURY',
          tagline: 'Warm metallic luxury with slate grey contrast & integrated backrest',
          specs: '159 km IDC Range · 80 km/h · 4.3 kWh Battery',
          price: '₹1,44,999',
          image: 'images/rizta_gold_cutout.png',
          swatch: '#cfa86e',
          aspect: 1.5
        },
        {
          name: 'Lumen Copper Duo',
          modelVariant: 'Ather Rizta Z (3.7 kWh)',
          badge: 'SUNSET METALLIC',
          tagline: 'Sunset metallic dual-tone with SkidControl™ traction control',
          specs: '159 km IDC Range · 80 km/h · 4.3 kWh Battery',
          price: '₹1,44,999',
          image: 'images/rizta_copper_cutout.png',
          swatch: '#bf6c43',
          aspect: 1.5
        },
        {
          name: 'Cardamom Green Duo',
          modelVariant: 'Ather Rizta Z (2.9 kWh)',
          badge: 'NATURE SATIN DUO',
          tagline: 'Nature-inspired satin green dual-tone with 34L underseat storage',
          specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
          price: '₹1,34,999',
          image: 'images/clean_rizta_green_duo.png',
          swatch: '#496350',
          aspect: 1.5
        },
        {
          name: 'Pangong Blue Duo',
          modelVariant: 'Ather Rizta Z (2.9 kWh)',
          badge: 'MOUNTAIN LAKE DUO',
          tagline: 'Deep Himalayan lake blue with slate grey dual-tone finish',
          specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
          price: '₹1,34,999',
          image: 'images/clean_rizta_blue_duo.png',
          swatch: '#245278',
          aspect: 1.5
        },
        {
          name: 'Siachen White Mono',
          modelVariant: 'Ather Rizta S (2.9 kWh)',
          badge: 'ARCTIC MONOTONE',
          tagline: 'Pure glacier white monotone with DeepView™ digital dashboard',
          specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
          price: '₹1,09,999',
          image: 'images/clean_rizta_white_mono.png',
          swatch: '#e6ebf0',
          aspect: 1.5
        },
        {
          name: 'Slate Grey Duo',
          modelVariant: 'Ather Rizta Z (2.9 kWh)',
          badge: 'CONTEMPORARY DUO',
          tagline: 'Deep charcoal grey dual-tone with diamond metallic flake',
          specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
          price: '₹1,24,999',
          image: 'images/clean_rizta_grey_duo.png',
          swatch: '#5a6068',
          aspect: 1.5
        }
      ]
    },
    {
      id: 2,
      editionNumber: '02',
      name: 'Ather 450X',
      tagline: 'Aerodynamic sport geometry with Google Maps navigation & Warp mode',
      defaultColorIndex: 0,
      colors: [
        {
          name: 'Space Grey',
          modelVariant: 'Ather 450X (3.7 kWh)',
          badge: 'STEALTH PERFORMANCE',
          tagline: 'Aerodynamic sport geometry in stealth gunmetal Space Grey finish',
          specs: '150 km IDC Range · 90 km/h · 0-40 in 3.3s',
          price: '₹1,54,999',
          image: 'images/ather_450x_spacegrey.png',
          swatch: '#42474e',
          aspect: 1.5
        },
        {
          name: 'True Red',
          modelVariant: 'Ather 450X (3.7 kWh)',
          badge: 'RACING SPORT',
          tagline: 'High-contrast vibrant True Red with track-inspired graphics',
          specs: '150 km IDC Range · 90 km/h · 0-40 in 3.3s',
          price: '₹1,54,999',
          image: 'images/ather_450x_red.png',
          swatch: '#d92626',
          aspect: 1.5
        },
        {
          name: 'Salt Green',
          modelVariant: 'Ather 450X (3.7 kWh)',
          badge: 'PASTEL MATTE',
          tagline: 'Contemporary sage green matte with Google Maps & Warp mode',
          specs: '150 km IDC Range · 90 km/h · 0-40 in 3.3s',
          price: '₹1,54,999',
          image: 'images/ather_450x_runway.png',
          swatch: '#cfded6',
          aspect: 1.5
        },
        {
          name: 'Cosmic Black',
          modelVariant: 'Ather 450X (3.7 kWh)',
          badge: 'MIDNIGHT GLOSS',
          tagline: 'High-gloss deep cosmic black with contrasting cyan accents',
          specs: '150 km IDC Range · 90 km/h · 0-40 in 3.3s',
          price: '₹1,54,999',
          image: 'images/ather_450x_black.png',
          swatch: '#1a1c20',
          aspect: 1.5
        }
      ]
    },
    {
      id: 3,
      editionNumber: '03',
      name: 'Ather 450 Apex',
      tagline: 'Flagship super-scooter with Warp+ mode, Magic Twist & transparent orange frame',
      defaultColorIndex: 0,
      colors: [
        {
          name: 'Indium Blue Special Edition',
          modelVariant: 'Ather 450 Apex (3.7 kWh)',
          badge: 'FLAGSHIP WARP+',
          tagline: 'Warp+ mode with transparent neon orange chassis accents',
          specs: '157 km IDC Range · 100 km/h · 0-40 in 2.9s',
          price: '₹1,89,999',
          image: 'images/ather_apex_runway.png',
          swatch: '#1c58d9',
          aspect: 1.5
        }
      ]
    }
  ];

  // 12 Ather Smart Accessories & Official Gear
  const ACCESSORIES = [
    { name: 'Ather Halo Smart Helmet', category: 'Smart Audio & Safety', price: '₹12,999', icon: 'helm', desc: 'Harman Kardon acoustics with ChitChat auto intercom' },
    { name: 'Ather Duo Home Fast Charger', category: 'Home Fast Charging', price: '₹9,999', icon: 'charger', desc: '0-80% in 3.5 hrs with auto temperature cutoff' },
    { name: 'Smart TPMS Tyre Sensor', category: 'Telemetry Sensors', price: '₹4,999', icon: 'tpms', desc: 'Live pressure & temperature monitor on 7" dashboard' },
    { name: 'Rizta Deluxe Backrest', category: 'Pillion Comfort', price: '₹2,499', icon: 'backrest', desc: 'Ergonomic lumbar pillion support with high-resilience foam' },
    { name: 'Rizta Frunk Front Luggage', category: 'Storage Upgrades', price: '₹2,999', icon: 'frunk', desc: '22L weatherproof quick-release modular front trunk' },
    { name: 'Rizta Floor Organiser Mat', category: 'Protection & Grip', price: '₹1,999', icon: 'mat', desc: 'Custom contoured anti-slip all-weather grooved floor mat' },
    { name: 'Ather Portable Travel EVSE', category: 'Travel Charging', price: '₹6,999', icon: 'portable', desc: 'Dual 5A/15A socket compatible emergency travel charger' },
    { name: 'Ather Pro Riding Jacket', category: 'Apparel & Gear', price: '₹7,499', icon: 'jacket', desc: 'CE Level 2 armor protection with high-airflow Cordura mesh' },
    { name: 'All-Weather Protective Cover', category: 'Vehicle Care', price: '₹1,799', icon: 'cover', desc: 'Waterproof heavy-duty UV reflective protective body cover' },
    { name: 'Ather Touchscreen 9H Shield', category: 'Screen Protection', price: '₹699', icon: 'guard', desc: '9H tempered oleophobic scratch & glare resistant glass' },
    { name: 'Foldable Side Footstep', category: 'Hardware & Guards', price: '₹1,499', icon: 'footstep', desc: 'Aircraft-grade anodized aluminium pillion footstep' },
    { name: 'Ather Grip Pro Handlebars', category: 'Performance Controls', price: '₹899', icon: 'grips', desc: 'Micro-textured anti-vibration high-grip rubber handlebar set' }
  ];

  // Depth stops table
  const KX = [1.18, .68, .46, .33, .22, .14, .08];
  const KF = [1.14, .90, .785, .71, .655, .62, .59];
  const KH = [1.18, .82, .56, .42, .32, .24, .18];
  const KB = [0, 0, 1.5, 4, 8, 12, 17];
  const KO = [1, 1, 1, 1, .86, .5, 0];

  const $ = id => document.getElementById(id);
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;

  function makeAccessorySvg(icon) {
    const svgs = {
      helm: `<svg viewBox="0 0 100 80" class="acc-art"><path d="M20 52 C20 28, 38 14, 62 14 C82 14, 92 28, 92 48 C92 62, 80 68, 65 68 C50 68, 30 68, 20 52 Z" fill="#222831" stroke="#39424e" stroke-width="2.5"/><path d="M30 46 C34 34, 46 28, 64 28 C74 28, 80 34, 84 46 Z" fill="#00d282" opacity="0.85"/><circle cx="58" cy="50" r="3" fill="#ffffff"/></svg>`,
      charger: `<svg viewBox="0 0 100 80" class="acc-art"><rect x="30" y="15" width="40" height="50" rx="10" fill="#1e2229" stroke="#333a44" stroke-width="2.5"/><circle cx="50" cy="38" r="12" fill="none" stroke="#00d282" stroke-width="3" stroke-dasharray="60 15"/><circle cx="50" cy="38" r="5" fill="#00d282"/><rect x="46" y="60" width="8" height="12" rx="2" fill="#333a44"/></svg>`,
      tpms: `<svg viewBox="0 0 100 80" class="acc-art"><circle cx="45" cy="40" r="16" fill="#1e2229" stroke="#485362" stroke-width="3"/><rect x="42" y="16" width="6" height="12" rx="2" fill="#00d282"/><path d="M68 28 C75 35, 75 45, 68 52" fill="none" stroke="#00d282" stroke-width="2.5" stroke-linecap="round"/><path d="M74 22 C84 32, 84 48, 74 58" fill="none" stroke="#00d282" stroke-width="2" stroke-linecap="round" opacity="0.6"/></svg>`,
      backrest: `<svg viewBox="0 0 100 80" class="acc-art"><path d="M35 65 L42 35 C43 25, 57 25, 58 35 L65 65" fill="none" stroke="#3a424e" stroke-width="5" stroke-linecap="round"/><rect x="36" y="20" width="28" height="26" rx="6" fill="#20252d" stroke="#00d282" stroke-width="2"/></svg>`,
      frunk: `<svg viewBox="0 0 100 80" class="acc-art"><path d="M25 24 L75 24 L70 62 C70 66, 66 70, 62 70 L38 70 C34 70, 30 66, 30 62 Z" fill="#1b2027" stroke="#3a4350" stroke-width="2.5"/><path d="M22 24 L78 24 L75 32 L25 32 Z" fill="#2a323d"/><circle cx="50" cy="45" r="4" fill="#00d282"/></svg>`,
      mat: `<svg viewBox="0 0 100 80" class="acc-art"><polygon points="30,20 70,20 82,65 18,65" fill="#1a1e24" stroke="#323a45" stroke-width="2.5"/><line x1="32" y1="32" x2="68" y2="32" stroke="#00d282" stroke-width="2"/><line x1="28" y1="44" x2="72" y2="44" stroke="#434f5e" stroke-width="2"/><line x1="24" y1="56" x2="76" y2="56" stroke="#434f5e" stroke-width="2"/></svg>`,
      portable: `<svg viewBox="0 0 100 80" class="acc-art"><rect x="22" y="22" width="56" height="36" rx="6" fill="#1e232b" stroke="#39424f" stroke-width="2"/><path d="M78 40 L90 40 L90 52 L84 52" fill="none" stroke="#00d282" stroke-width="2.5"/><circle cx="36" cy="40" r="4" fill="#00d282"/><circle cx="50" cy="40" r="4" fill="#ffffff"/></svg>`,
      jacket: `<svg viewBox="0 0 100 80" class="acc-art"><path d="M30 20 L42 26 L58 26 L70 20 L86 38 L76 46 L72 36 L72 68 L28 68 L28 36 L24 46 L14 38 Z" fill="#1c2027" stroke="#3a4452" stroke-width="2"/><line x1="50" y1="26" x2="50" y2="68" stroke="#00d282" stroke-width="2"/></svg>`,
      cover: `<svg viewBox="0 0 100 80" class="acc-art"><path d="M15 58 C15 38, 30 24, 50 20 C68 20, 85 32, 85 58 Z" fill="none" stroke="#3a4452" stroke-width="2.5" stroke-dasharray="5 3"/><path d="M30 58 C30 42, 42 32, 56 30 C70 30, 75 42, 75 58" fill="#1c2129"/><circle cx="50" cy="42" r="3" fill="#00d282"/></svg>`,
      guard: `<svg viewBox="0 0 100 80" class="acc-art"><rect x="22" y="18" width="56" height="44" rx="4" fill="#141920" stroke="#00d282" stroke-width="2"/><text x="50" y="44" font-size="11" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">9H</text></svg>`,
      footstep: `<svg viewBox="0 0 100 80" class="acc-art"><rect x="25" y="34" width="50" height="12" rx="3" fill="#6c757d" stroke="#adb5bd" stroke-width="2"/><circle cx="32" cy="40" r="3" fill="#00d282"/><line x1="42" y1="36" x2="42" y2="44" stroke="#343a40" stroke-width="1.5"/><line x1="52" y1="36" x2="52" y2="44" stroke="#343a40" stroke-width="1.5"/><line x1="62" y1="36" x2="62" y2="44" stroke="#343a40" stroke-width="1.5"/></svg>`,
      grips: `<svg viewBox="0 0 100 80" class="acc-art"><rect x="20" y="32" width="26" height="16" rx="3" fill="#212529" stroke="#495057" stroke-width="2"/><rect x="54" y="32" width="26" height="16" rx="3" fill="#212529" stroke="#495057" stroke-width="2"/><circle cx="24" cy="40" r="2" fill="#00d282"/><circle cx="76" cy="40" r="2" fill="#00d282"/></svg>`
    };
    return svgs[icon] || svgs.helm;
  }

  function initAtherRunway() {
    const stage = $('stage'),
          rail = $('rail'),
          ring = $('ring'),
          roll = $('roll'),
          line = $('line'),
          wait = $('wait'),
          swatchesRow = $('swatchesRow'),
          swatchesLabel = $('swatchesLabel'),
          lineupTabs = $('lineupTabs'),
          modelEl = $('lookModelName'),
          colorEl = $('lookColorName'),
          taglineEl = $('lookTagline'),
          specsEl = $('lookSpecs'),
          priceEl = $('lookPrice'),
          cartEl = $('cart'),
          runwayHeading = $('runwayHeading'),
          railTitle = $('railTitle'),
          railCounter = $('railCounter'),
          railViewToggle = $('railViewToggle'),
          railTrack = $('railTrack') || rail;

    if (!stage || !rail || !line || !roll) return;

    // Track active color index for each of the 3 models [Rizta, 450X, 450 Apex]
    const selectedColorIndex = [0, 0, 0];
    let activeModelIndex = 0;
    let currentRailView = 'colors'; // 'colors' or 'gear'
    const N = 3; // STRICTLY 3 EDITIONS

    let people = [];
    let cards = [];
    let cartCount = 0;
    let W = 0, H = 0, base = 0, rollItemH = 38, dirty = true;
    let p = 0, target = 0, last = performance.now();

    // Render Bottom-Left Swatches for the Current Model
    function renderSwatchesForModel(modelIdx) {
      if (!swatchesRow) return;
      swatchesRow.innerHTML = '';
      const model = MODELS[modelIdx];
      const activeColorIdx = selectedColorIndex[modelIdx] || 0;

      model.colors.forEach((color, i) => {
        const dot = document.createElement('button');
        dot.className = 'swatch-dot' + (i === activeColorIdx ? ' active' : '');
        dot.style.backgroundColor = color.swatch;
        dot.title = `${model.name} — ${color.name}`;
        dot.setAttribute('aria-label', `Select ${color.name}`);

        // Clicking a swatch changes the color of the current model in-place (edition does NOT change)
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          selectModelColor(modelIdx, i);
        });

        swatchesRow.append(dot);
      });
    }

    // Select Color for a Given Model (EDITION REMAINS UNCHANGED)
    function selectModelColor(modelIdx, colorIdx) {
      if (modelIdx < 0 || modelIdx >= MODELS.length) return;
      const model = MODELS[modelIdx];
      if (!model.colors[colorIdx]) return;

      selectedColorIndex[modelIdx] = colorIdx;
      const color = model.colors[colorIdx];

      // Smooth visual crossfade on stage scooter
      const person = people[modelIdx];
      if (person && person.img) {
        person.img.style.transition = 'opacity 0.22s ease-out, transform 0.22s ease-out';
        person.img.style.opacity = '0.35';
        person.img.style.transform = 'scale(0.97)';

        setTimeout(() => {
          person.img.src = color.image;
          person.img.alt = `${model.name} in ${color.name}`;
          person.img.style.opacity = '1';
          person.img.style.transform = 'scale(1)';
        }, 120);
      }

      // Update bottom-left info block
      if (modelEl) modelEl.textContent = color.modelVariant || model.name;
      if (colorEl) colorEl.textContent = color.name;
      if (taglineEl) taglineEl.textContent = color.tagline || model.tagline;
      if (specsEl) specsEl.textContent = color.specs;
      if (priceEl) priceEl.textContent = color.price;

      // Update bottom-left swatch active states
      if (swatchesRow) {
        const dots = swatchesRow.querySelectorAll('.swatch-dot');
        dots.forEach((dot, idx) => {
          if (idx === colorIdx) dot.classList.add('active');
          else dot.classList.remove('active');
        });
      }

      // Update side rail cards active state and button text
      if (currentRailView === 'colors' && cards && cards.length) {
        cards.forEach((card, idx) => {
          const btn = card.querySelector('.rail-select-btn');
          if (idx === colorIdx) {
            card.classList.add('active-card');
            if (btn) {
              btn.textContent = '✓ Selected';
              btn.classList.add('selected');
            }
          } else {
            card.classList.remove('active-card');
            if (btn) {
              btn.textContent = 'Select Color';
              btn.classList.remove('selected');
            }
          }
        });
      }

      // EDITION MUST NOT CHANGE: target and p remain at current active model
    }

    // Build the 3-Model Runway Line
    function buildRunway() {
      line.innerHTML = '';
      people = MODELS.map((model, i) => {
        const e = document.createElement('div');
        e.className = 'm';
        e.dataset.i = i;
        e.title = `${model.name}`;

        const currentColor = model.colors[selectedColorIndex[i] || 0];

        const img = document.createElement('img');
        img.src = currentColor.image;
        img.alt = `${model.name} in ${currentColor.name}`;
        img.draggable = false;
        e.append(img);

        line.append(e);
        return { e, img, r: 1.5, f: '', o: '', lastF: -1 };
      });

      // Build Rolling Look Number with strictly 3 editions: 01, 02, 03
      roll.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const b = document.createElement('b');
        b.textContent = '0' + i;
        roll.append(b);
      }

      size();
      dirty = true;
    }

    // Build Right Rail Cards for Current Active Model
    function buildRailForModel(modelIdx) {
      railTrack.innerHTML = '';

      if (currentRailView === 'colors') {
        const model = MODELS[modelIdx];
        const activeColorIdx = selectedColorIndex[modelIdx] || 0;

        if (railTitle) railTitle.textContent = `${model.name} Colors`;
        if (railCounter) railCounter.textContent = `${model.colors.length} Colorways Available`;

        cards = model.colors.map((color, i) => {
          const isSelected = (i === activeColorIdx);
          const card = document.createElement('article');
          card.className = 'card' + (isSelected ? ' active-card' : '');
          card.dataset.colorIndex = i;
          card.innerHTML = `
            <div class="rail-card-top">
              <span class="rail-badge">${color.badge}</span>
              <button class="fav" aria-pressed="false" aria-label="Save ${color.name}">
                <svg viewBox="0 0 24 24"><path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.600 4.600 0 0 1 20.500 9C20.500 15 12 20 12 20Z"/></svg>
              </button>
            </div>
            <div class="rail-thumb-wrap">
              <img src="${color.image}" alt="${model.name} in ${color.name}" class="rail-scooter-thumb" draggable="false">
            </div>
            <div class="meta">
              <div class="rail-color-tag">
                <span class="rail-swatch-chip" style="background-color: ${color.swatch};"></span>
                <span class="rail-color-title">${color.name}</span>
              </div>
              <h3 class="acc-title">${color.modelVariant || model.name}</h3>
              <p class="acc-desc">${color.specs}</p>
              <div class="price-row">
                <div class="rail-price-block">
                  <span class="rail-price-prefix">Ex-Showroom</span>
                  <span class="acc-price">${color.price}</span>
                </div>
                <button class="rail-select-btn ${isSelected ? 'selected' : ''}" type="button" aria-label="Select ${color.name}">
                  ${isSelected ? '✓ Selected' : 'Select Color'}
                </button>
              </div>
            </div>
          `;

          // Clicking card selects this color in-place without changing edition
          card.addEventListener('click', (e) => {
            if (e.target.closest('.fav')) return;
            selectModelColor(modelIdx, i);
          });

          railTrack.append(card);
          return card;
        });

      } else {
        // Show Accessories View
        if (railTitle) railTitle.textContent = 'Smart Accessories';
        if (railCounter) railCounter.textContent = `${ACCESSORIES.length} Gear Items`;

        cards = ACCESSORIES.map((item, i) => {
          const card = document.createElement('article');
          card.className = 'card';
          card.innerHTML = `
            <button class="fav" aria-pressed="false" aria-label="Save ${item.name}">
              <svg viewBox="0 0 24 24"><path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.600 4.600 0 0 1 20.500 9C20.500 15 12 20 12 20Z"/></svg>
            </button>
            <div class="shot">${makeAccessorySvg(item.icon)}</div>
            <div class="meta">
              <span class="acc-cat">${item.category}</span>
              <h3 class="acc-title">${item.name}</h3>
              <p class="acc-desc">${item.desc}</p>
              <div class="price-row">
                <span class="acc-price">${item.price}</span>
                <button class="add" aria-label="Add ${item.name} to cart" title="Add to bag"></button>
              </div>
            </div>
          `;
          railTrack.append(card);
          return card;
        });
      }
    }

    // Toggle between Colors & Gear in Right Rail
    if (railViewToggle) {
      railViewToggle.addEventListener('click', e => {
        const btn = e.target.closest('.rail-toggle-btn');
        if (!btn || btn.dataset.view === currentRailView) return;
        railViewToggle.querySelectorAll('.rail-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRailView = btn.dataset.view;
        buildRailForModel(activeModelIndex);
      });
    }

    // Rail Favorite and Cart Handlers
    rail.addEventListener('click', e => {
      const favBtn = e.target.closest('.fav');
      if (favBtn) {
        e.stopPropagation();
        const isFav = favBtn.getAttribute('aria-pressed') === 'true';
        favBtn.setAttribute('aria-pressed', !isFav);
      }
      const addBtn = e.target.closest('.add');
      if (addBtn) {
        e.stopPropagation();
        cartCount++;
        if (cartEl) cartEl.textContent = cartCount;
        addBtn.classList.add('added');
        setTimeout(() => addBtn.classList.remove('added'), 600);
      }
    });

    // 3 Models Lineup Tabs Click Handler
    if (lineupTabs) {
      lineupTabs.addEventListener('click', e => {
        const tab = e.target.closest('.lineup-tab');
        if (!tab) return;
        const modelIdx = parseInt(tab.dataset.model, 10);
        if (!isNaN(modelIdx)) {
          target = clamp(modelIdx, 0, 2);
        }
      });
    }

    // Update Active Model when scrolling between Edition 01, 02, and 03
    function updateActiveModel(idx) {
      const modelIdx = clamp(idx, 0, 2);
      if (modelIdx === activeModelIndex && cards.length) return;
      activeModelIndex = modelIdx;

      const model = MODELS[modelIdx];
      const currentColorIdx = selectedColorIndex[modelIdx] || 0;
      const color = model.colors[currentColorIdx];

      // Sync Top Lineup Tabs
      if (lineupTabs) {
        lineupTabs.querySelectorAll('.lineup-tab').forEach((tab, i) => {
          if (i === modelIdx) tab.classList.add('active');
          else tab.classList.remove('active');
        });
      }

      // Update Section Heading
      if (runwayHeading) {
        if (modelIdx === 0) runwayHeading.textContent = 'ATHER RIZTA · COMFORT & LUXURY';
        else if (modelIdx === 1) runwayHeading.textContent = 'ATHER 450X · PERFORMANCE & SPEED';
        else runwayHeading.textContent = 'ATHER 450 APEX · FLAGSHIP HYPER-RIDE';
      }

      // Update Swatches Label
      if (swatchesLabel) {
        swatchesLabel.textContent = `${model.name.toUpperCase()} COLORWAYS:`;
      }

      // Update bottom-left swatches row
      renderSwatchesForModel(modelIdx);

      // Update right rail to show that particular model's colors
      buildRailForModel(modelIdx);

      // Update bottom-left info block
      if (modelEl) modelEl.textContent = color.modelVariant || model.name;
      if (colorEl) colorEl.textContent = color.name;
      if (taglineEl) taglineEl.textContent = color.tagline || model.tagline;
      if (specsEl) specsEl.textContent = color.specs;
      if (priceEl) priceEl.textContent = color.price;
    }

    function size() {
      W = stage.clientWidth;
      H = stage.clientHeight;
      base = H * 0.94;

      people.forEach(m => {
        m.e.style.width = (base * m.r).toFixed(1) + 'px';
        m.e.style.height = base.toFixed(1) + 'px';
      });

      if (roll.firstChild) {
        rollItemH = roll.firstChild.offsetHeight || 38;
      }
      dirty = true;
    }

    window.addEventListener('resize', size);

    // Silky Smooth Paint Loop with Clamped 3-Model Perspective
    function paint() {
      people.forEach((m, i) => {
        // Depth relative to current progress p
        const d = i - p;

        const k = clamp(d + 1, 0, 6);
        const a = Math.floor(k);
        const b = Math.min(6, a + 1);
        const t = k - a;
        const mix = A => A[a] + (A[b] - A[a]) * t;

        const h = mix(KH) * H;
        const s = h / base;
        const w = h * m.r;
        const x = mix(KX) * W - w / 2;
        const y = mix(KF) * H - h;

        // Hardware-accelerated 3D Transform
        m.e.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`;

        // Blur calculation
        const f = mix(KB) / s;
        if (f < 0.3 || d <= 0.4) {
          if (m.f !== 'none') {
            m.f = 'none';
            m.e.style.filter = 'none';
            m.lastF = 0;
          }
        } else if (Math.abs(f - m.lastF) >= 0.5) {
          m.lastF = f;
          const fs = `blur(${f.toFixed(1)}px)`;
          if (fs !== m.f) {
            m.f = fs;
            m.e.style.filter = fs;
          }
        }

        // Opacity: fade cleanly when past the front (d < -0.2)
        let oVal = mix(KO);
        if (d < -0.2) {
          oVal = Math.max(0, 1 - ((-d - 0.2) / 0.7));
        }
        const o = oVal.toFixed(3);
        if (o !== m.o) {
          m.o = o;
          m.e.style.opacity = o;
        }

        m.e.style.zIndex = Math.round((10 - d) * 10);
      });

      // Rolling Look Number: p moves strictly between 0 and 2
      roll.style.transform = `translate3d(0,${(-p * rollItemH).toFixed(1)}px,0)`;

      // Update active model when look index changes
      const activeIdx = clamp(Math.round(p), 0, 2);
      if (activeIdx !== activeModelIndex) {
        updateActiveModel(activeIdx);
      }
    }

    function frame(now) {
      const dt = Math.min(40, now - last) || 16.6;
      last = now;
      const was = p;

      // STRICT CLAMPING: 0 (Edition 01) to 2 (Edition 03)
      target = clamp(target, 0, 2);

      if (calm) {
        p = target;
      } else {
        const friction = 0.082;
        const step = 1 - Math.pow(1 - friction, dt / 16.667);
        p += (target - p) * step;
      }

      p = clamp(p, 0, 2);

      if (Math.abs(target - p) < 0.0002) p = target;

      if (p !== was || dirty) {
        dirty = false;
        paint();
      }

      // Custom cursor follower
      cx += (mx - cx) * 0.35;
      cy += (my - cy) * 0.35;
      if (ring) {
        ring.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      }
    }

    let mx = 0, my = 0, cx = 0, cy = 0, down = false, sx = 0, st = 0, moved = 0, wheelT = 0;
    const PULL = () => Math.max(180, W * 0.24);

    stage.addEventListener('pointerenter', e => {
      if (e.pointerType === 'mouse' && ring) ring.classList.add('show');
    });
    stage.addEventListener('pointerleave', () => {
      if (ring) ring.classList.remove('show');
    });

    stage.addEventListener('pointermove', e => {
      const r = stage.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (!down) return;
      const dx = e.clientX - sx;
      moved = Math.max(moved, Math.abs(dx));
      // Dragging left (dx < 0) advances to next model; clamped to [0, 2]
      target = clamp(st - dx / PULL(), 0, 2);
    });

    stage.addEventListener('pointerdown', e => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      down = true;
      sx = e.clientX;
      st = target;
      moved = 0;
      stage.setPointerCapture(e.pointerId);
      if (ring) ring.classList.add('drag');
    });

    function release(e) {
      if (!down) return;
      down = false;
      if (ring) ring.classList.remove('drag');
      if (moved < 6) {
        const hit = document.elementsFromPoint(e.clientX, e.clientY).find(x => x.classList && x.classList.contains('m'));
        if (hit) {
          target = clamp(+hit.dataset.i, 0, 2);
        }
      } else {
        target = clamp(Math.round(target), 0, 2);
      }
    }

    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);

    // WHEEL LISTENER: Smooth 3-Edition Rotation & Natural Page Navigation
    stage.addEventListener('wheel', e => {
      const runwaySection = document.getElementById('section-runway');
      const runwayRect = runwaySection ? runwaySection.getBoundingClientRect() : null;

      // 1. If runway is not pinned at the top of the viewport, allow natural smooth window scrolling
      if (!runwayRect || runwayRect.top > 30 || runwayRect.top < -30) {
        return;
      }

      // 2. Trackpad horizontal swipe or Shift+Wheel: Always changes edition
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        target = clamp(target + clamp(e.deltaX, -100, 100) / 350, 0, 2);
        clearTimeout(wheelT);
        wheelT = setTimeout(() => { target = clamp(Math.round(target), 0, 2); }, 140);
        return;
      }

      // 3. Scrolling DOWN (deltaY > 0):
      if (e.deltaY > 0) {
        // If already at 3rd Edition (target >= 1.90), release wheel so user scrolls down to Section 5 & 6!
        if (target >= 1.90) {
          return;
        }
        e.preventDefault();
        target = clamp(target + clamp(e.deltaY, 0, 60) / 400, 0, 2);
        clearTimeout(wheelT);
        wheelT = setTimeout(() => { target = clamp(Math.round(target), 0, 2); }, 140);
        return;
      }

      // 4. Scrolling UP (deltaY < 0):
      if (e.deltaY < 0) {
        // If already at 1st Edition (target <= 0.10), release wheel so user scrolls up to Section 3!
        if (target <= 0.10) {
          return;
        }
        e.preventDefault();
        target = clamp(target + clamp(e.deltaY, -60, 0) / 400, 0, 2);
        clearTimeout(wheelT);
        wheelT = setTimeout(() => { target = clamp(Math.round(target), 0, 2); }, 140);
      }
    }, { passive: false });

    // Keyboard Navigation: strictly clamped between 0 and 2
    window.addEventListener('keydown', e => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(e.target.tagName)) return;
      const runwaySection = document.getElementById('section-runway');
      if (!runwaySection) return;
      const rect = stage.getBoundingClientRect();
      if (rect.bottom > 100 && rect.top < window.innerHeight) {
        if (['ArrowRight'].includes(e.key)) {
          e.preventDefault();
          target = clamp(Math.round(target) + 1, 0, 2);
        }
        if (['ArrowLeft'].includes(e.key)) {
          e.preventDefault();
          target = clamp(Math.round(target) - 1, 0, 2);
        }
      }
    });

    function loop(t) {
      frame(t);
      requestAnimationFrame(loop);
    }

    // Preload all scooter images across the 3 models
    const allImages = [];
    MODELS.forEach(m => m.colors.forEach(c => allImages.push(c.image)));

    Promise.all(allImages.map(u => {
      const img = new Image();
      img.src = u;
      return img.decode().catch(() => {});
    })).then(() => {
      if (wait) wait.classList.add('gone');
    });

    buildRunway();
    updateActiveModel(0);
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAtherRunway);
  } else {
    initAtherRunway();
  }
})();

/**
 * ATHER RUNWAY DEPTH LOOKBOOK
 * Multi-depth interactive showcase featuring Ather's official electric scooters
 * and smart accessories with 3D parallax, depth of field, and silky smooth momentum physics.
 * 100% unified with Neurial Grotesk official Ather brand typography.
 */
(function () {
  'use strict';

  // LINEUP 1: All Models (Model-Wise: Rizta Z, 450 Apex, 450X, Rizta S)
  const LINEUP_ALL = [
    {
      id: 1,
      model: 'Ather Rizta Z (3.7 kWh)',
      color: 'Champagne Gold',
      badge: 'LUXURY DUAL-TONE',
      tagline: 'Dual-tone luxury finish with 34L storage & integrated backrest',
      specs: '159 km IDC Range · 80 km/h · 4.3 kWh Battery',
      price: '₹1,44,999',
      image: 'images/rizta_gold_cutout.png',
      swatch: '#cfa86e',
      aspect: 1.5
    },
    {
      id: 2,
      model: 'Ather 450 Apex (3.7 kWh)',
      color: 'Indium Blue',
      badge: 'FLAGSHIP PERFORMANCE',
      tagline: 'Apex edition with transparent neon orange chassis and Warp+ mode',
      specs: '157 km IDC Range · 100 km/h · 0-40 in 2.9s',
      price: '₹1,89,999',
      image: 'images/ather_apex_runway.png',
      swatch: '#1c58d9',
      aspect: 1.5
    },
    {
      id: 3,
      model: 'Ather Rizta Z (3.7 kWh)',
      color: 'Lumen Copper',
      badge: 'SUNSET METALLIC',
      tagline: 'Sunset metallic dual-tone with SkidControl™ traction control',
      specs: '159 km IDC Range · 80 km/h · 4.3 kWh Battery',
      price: '₹1,44,999',
      image: 'images/rizta_copper_cutout.png',
      swatch: '#bf6c43',
      aspect: 1.5
    },
    {
      id: 4,
      model: 'Ather 450X (3.7 kWh)',
      color: 'Salt Green',
      badge: 'SPORT PERFORMANCE',
      tagline: 'Sport geometry in Salt Green matte with Google Maps & Warp mode',
      specs: '150 km IDC Range · 90 km/h · 0-40 in 3.3s',
      price: '₹1,54,999',
      image: 'images/ather_450x_runway.png',
      swatch: '#cfded6',
      aspect: 1.5
    },
    {
      id: 5,
      model: 'Ather Rizta Z (2.9 kWh)',
      color: 'Cardamom Green Duo',
      badge: 'NATURE SATIN DUO',
      tagline: 'Nature-inspired satin green dual-tone with 34L underseat storage',
      specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
      price: '₹1,34,999',
      image: 'images/clean_rizta_green_duo.png',
      swatch: '#496350',
      aspect: 1.5
    },
    {
      id: 6,
      model: 'Ather Rizta S (2.9 kWh)',
      color: 'Siachen White Mono',
      badge: 'ARCTIC MONOTONE',
      tagline: 'Pure glacier white monotone with DeepView™ digital dashboard',
      specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
      price: '₹1,09,999',
      image: 'images/clean_rizta_white_mono.png',
      swatch: '#e6ebf0',
      aspect: 1.5
    }
  ];

  // LINEUP 2: Rizta Signature Colors (Champagne Gold, Lumen Copper, Green, Blue, White, Slate Grey)
  const LINEUP_RIZTA = [
    {
      id: 1,
      model: 'Ather Rizta Z (3.7 kWh)',
      color: 'Champagne Gold',
      badge: 'LUXURY DUAL-TONE',
      tagline: 'Dual-tone luxury finish with 34L storage & integrated backrest',
      specs: '159 km IDC Range · 80 km/h · 4.3 kWh Battery',
      price: '₹1,44,999',
      image: 'images/rizta_gold_cutout.png',
      swatch: '#cfa86e',
      aspect: 1.5
    },
    {
      id: 2,
      model: 'Ather Rizta Z (3.7 kWh)',
      color: 'Lumen Copper',
      badge: 'SUNSET METALLIC',
      tagline: 'Sunset metallic dual-tone with SkidControl™ traction control',
      specs: '159 km IDC Range · 80 km/h · 4.3 kWh Battery',
      price: '₹1,44,999',
      image: 'images/rizta_copper_cutout.png',
      swatch: '#bf6c43',
      aspect: 1.5
    },
    {
      id: 3,
      model: 'Ather Rizta Z (2.9 kWh)',
      color: 'Cardamom Green Duo',
      badge: 'NATURE SATIN DUO',
      tagline: 'Nature-inspired satin green dual-tone with 34L underseat storage',
      specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
      price: '₹1,34,999',
      image: 'images/clean_rizta_green_duo.png',
      swatch: '#496350',
      aspect: 1.5
    },
    {
      id: 4,
      model: 'Ather Rizta Z (2.9 kWh)',
      color: 'Pangong Blue Duo',
      badge: 'MOUNTAIN LAKE DUO',
      tagline: 'Deep Himalayan lake blue with slate grey dual-tone finish',
      specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
      price: '₹1,34,999',
      image: 'images/clean_rizta_blue_duo.png',
      swatch: '#245278',
      aspect: 1.5
    },
    {
      id: 5,
      model: 'Ather Rizta S (2.9 kWh)',
      color: 'Siachen White Mono',
      badge: 'ARCTIC MONOTONE',
      tagline: 'Pure glacier white monotone with DeepView™ digital dashboard',
      specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
      price: '₹1,09,999',
      image: 'images/clean_rizta_white_mono.png',
      swatch: '#e6ebf0',
      aspect: 1.5
    },
    {
      id: 6,
      model: 'Ather Rizta Z (2.9 kWh)',
      color: 'Slate Grey Duo',
      badge: 'CONTEMPORARY DUO',
      tagline: 'Deep charcoal grey dual-tone with diamond metallic flake',
      specs: '123 km IDC Range · 80 km/h · 2.9 kWh Battery',
      price: '₹1,24,999',
      image: 'images/clean_rizta_grey_duo.png',
      swatch: '#5a6068',
      aspect: 1.5
    }
  ];

  // 12 Ather Smart Accessories & Official Gear
  const ACCESSORIES = [
    {
      name: 'Ather Halo Smart Helmet',
      category: 'Smart Audio & Safety',
      price: '₹12,999',
      icon: 'helm',
      desc: 'Harman Kardon acoustics with ChitChat auto intercom'
    },
    {
      name: 'Ather Duo Home Fast Charger',
      category: 'Home Fast Charging',
      price: '₹9,999',
      icon: 'charger',
      desc: '0-80% in 3.5 hrs with auto temperature cutoff'
    },
    {
      name: 'Smart TPMS Tyre Sensor',
      category: 'Telemetry Sensors',
      price: '₹4,999',
      icon: 'tpms',
      desc: 'Live pressure & temperature monitor on 7" dashboard'
    },
    {
      name: 'Rizta Deluxe Backrest',
      category: 'Pillion Comfort',
      price: '₹2,499',
      icon: 'backrest',
      desc: 'Ergonomic lumbar pillion support with high-resilience foam'
    },
    {
      name: 'Rizta Frunk Front Luggage',
      category: 'Storage Upgrades',
      price: '₹2,999',
      icon: 'frunk',
      desc: '22L weatherproof quick-release modular front trunk'
    },
    {
      name: 'Rizta Floor Organiser Mat',
      category: 'Protection & Grip',
      price: '₹1,999',
      icon: 'mat',
      desc: 'Custom contoured anti-slip all-weather grooved floor mat'
    },
    {
      name: 'Ather Portable Travel EVSE',
      category: 'Travel Charging',
      price: '₹6,999',
      icon: 'portable',
      desc: 'Dual 5A/15A socket compatible emergency travel charger'
    },
    {
      name: 'Ather Pro Riding Jacket',
      category: 'Apparel & Gear',
      price: '₹7,499',
      icon: 'jacket',
      desc: 'CE Level 2 armor protection with high-airflow Cordura mesh'
    },
    {
      name: 'All-Weather Protective Cover',
      category: 'Vehicle Care',
      price: '₹1,799',
      icon: 'cover',
      desc: 'Waterproof heavy-duty UV reflective protective body cover'
    },
    {
      name: 'Ather Touchscreen 9H Shield',
      category: 'Screen Protection',
      price: '₹699',
      icon: 'guard',
      desc: '9H tempered oleophobic scratch & glare resistant glass'
    },
    {
      name: 'Foldable Side Footstep',
      category: 'Hardware & Guards',
      price: '₹1,499',
      icon: 'footstep',
      desc: 'Aircraft-grade anodized aluminium pillion footstep'
    },
    {
      name: 'Ather Grip Pro Handlebars',
      category: 'Performance Controls',
      price: '₹899',
      icon: 'grips',
      desc: 'Micro-textured anti-vibration high-grip rubber handlebar set'
    }
  ];

  // Depth stops from d = -1 (leaving past the rail) to d = 5 (arriving out of distance haze)
  const KX = [1.18, .68, .46, .33, .22, .14, .08];
  const KF = [1.14, .90, .785, .71, .655, .62, .59];
  const KH = [1.18, .82, .56, .42, .32, .24, .18];
  const KB = [0, 0, 1.5, 4, 8, 12, 17];
  const KO = [1, 1, 1, 1, .86, .5, 0];

  const $ = id => document.getElementById(id);
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
          lineupTabs = $('lineupTabs'),
          modelEl = $('lookModelName'),
          colorEl = $('lookColorName'),
          taglineEl = $('lookTagline'),
          specsEl = $('lookSpecs'),
          priceEl = $('lookPrice'),
          cartEl = $('cart'),
          runwayHeading = $('runwayHeading');

    if (!stage || !rail || !line || !roll) return;

    let currentMode = 'all'; // 'all' or 'rizta'
    let EDITIONS = LINEUP_ALL;
    let N = EDITIONS.length;

    const wrap = (x, n) => ((x % n) + n) % n;
    const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

    let people = [];
    let cards = [];
    let cartCount = 0;
    let W = 0, H = 0, base = 0, cardS = 0, rollItemH = 36, side = false, dirty = true;
    let p = 0, target = 0, last = performance.now(), activeLookIndex = -1;

    // Render Swatches with Tooltip & Jump
    function renderSwatches() {
      if (!swatchesRow) return;
      swatchesRow.innerHTML = '';
      EDITIONS.forEach((ed, i) => {
        const dot = document.createElement('button');
        dot.className = 'swatch-dot' + (i === 0 ? ' active' : '');
        dot.style.backgroundColor = ed.swatch;
        dot.title = `${ed.model} — ${ed.color}`;
        dot.setAttribute('aria-label', `Jump to ${ed.color}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          jumpToLook(i);
        });
        swatchesRow.append(dot);
      });
    }

    // Build the Scooter Runway Line
    function buildRunway() {
      line.innerHTML = '';
      people = EDITIONS.map((item, i) => {
        const e = document.createElement('div');
        e.className = 'm';
        e.dataset.i = i;
        e.title = `${item.model} — ${item.color}`;

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = `${item.model} in ${item.color}`;
        img.draggable = false;
        e.append(img);

        line.append(e);
        return { e, r: item.aspect || 1.5, f: '', o: '', lastF: -1 };
      });

      // Build Rolling Look Number
      roll.innerHTML = '';
      for (let i = 0; i <= N; i++) {
        const b = document.createElement('b');
        const num = (i % N) + 1;
        b.textContent = num < 10 ? '0' + num : num;
        roll.append(b);
      }

      renderSwatches();
      size();
      dirty = true;
    }

    // Build Accessory Product Cards
    function buildRail() {
      const header = rail.querySelector('.rail-header');
      rail.innerHTML = '';
      if (header) rail.append(header);

      cards = ACCESSORIES.map((item, i) => {
        const card = document.createElement('article');
        card.className = 'card' + (i % 2 ? ' alt' : '');
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
        rail.append(card);
        return card;
      });
    }

    // Cart and Wishlist Click Handlers
    rail.addEventListener('click', e => {
      const favBtn = e.target.closest('.fav');
      if (favBtn) {
        const isFav = favBtn.getAttribute('aria-pressed') === 'true';
        favBtn.setAttribute('aria-pressed', !isFav);
      }
      const addBtn = e.target.closest('.add');
      if (addBtn) {
        cartCount++;
        if (cartEl) cartEl.textContent = cartCount;
        addBtn.classList.add('added');
        setTimeout(() => addBtn.classList.remove('added'), 600);
      }
    });

    // Lineup Mode Switcher (All Models vs Rizta Colorways)
    if (lineupTabs) {
      lineupTabs.addEventListener('click', e => {
        const tab = e.target.closest('.lineup-tab');
        if (!tab || tab.dataset.mode === currentMode) return;
        lineupTabs.querySelectorAll('.lineup-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        currentMode = tab.dataset.mode;
        EDITIONS = currentMode === 'rizta' ? LINEUP_RIZTA : LINEUP_ALL;
        N = EDITIONS.length;

        if (runwayHeading) {
          runwayHeading.textContent = currentMode === 'rizta' ? 'RIZTA SIGNATURE COLORWAYS' : 'OFFICIAL ATHER LINEUP';
        }

        buildRunway();
        target = 0;
        p = 0;
        activeLookIndex = -1;
        updateActiveLook(0);
      });
    }

    function jumpToLook(index) {
      const current = Math.round(target);
      const diff = wrap(index - current, N);
      const shortestDiff = diff > N / 2 ? diff - N : diff;
      target = current + shortestDiff;
    }

    function updateActiveLook(idx) {
      if (idx === activeLookIndex || !EDITIONS[idx]) return;
      activeLookIndex = idx;
      const ed = EDITIONS[idx];

      if (modelEl) modelEl.textContent = ed.model;
      if (colorEl) colorEl.textContent = ed.color;
      if (taglineEl) taglineEl.textContent = ed.tagline;
      if (specsEl) specsEl.textContent = ed.specs;
      if (priceEl) priceEl.textContent = ed.price;

      // Update active swatch dot
      if (swatchesRow) {
        const dots = swatchesRow.querySelectorAll('.swatch-dot');
        dots.forEach((d, i) => {
          if (i === idx) d.classList.add('active');
          else d.classList.remove('active');
        });
      }
    }

    function size() {
      W = stage.clientWidth;
      H = stage.clientHeight;
      base = H * 0.94;
      side = innerWidth <= 820;

      people.forEach(m => {
        m.e.style.width = (base * m.r).toFixed(1) + 'px';
        m.e.style.height = base.toFixed(1) + 'px';
      });

      cardS = side ? 175 : Math.max(160, rail.clientHeight / 3);
      cards.forEach(c => {
        c.style.height = side ? '100%' : cardS + 'px';
      });

      if (roll.firstChild) {
        rollItemH = roll.firstChild.offsetHeight || 36;
      }
      dirty = true;
    }

    window.addEventListener('resize', size);

    // Silky Smooth Paint Loop with GPU Optimizations
    function paint() {
      people.forEach((m, i) => {
        let d = wrap(i - p, N);
        if (d > N - 1) d -= N;

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

        // Discrete blur calculation to avoid expensive frame-by-frame shader recompiles
        const f = mix(KB) / s;
        if (f < 0.3 || d <= 0.8) {
          if (m.f !== 'none') {
            m.f = 'none';
            m.e.style.filter = 'none';
            m.lastF = 0;
          }
        } else if (Math.abs(f - m.lastF) >= 0.6) {
          m.lastF = f;
          const fs = `blur(${f.toFixed(1)}px)`;
          if (fs !== m.f) {
            m.f = fs;
            m.e.style.filter = fs;
          }
        }

        const o = mix(KO).toFixed(3);
        if (o !== m.o) {
          m.o = o;
          m.e.style.opacity = o;
        }

        m.e.style.zIndex = 100 - Math.round(d * 10);
      });

      // Product Rail Loop Scrolling
      const all = cardS * ACCESSORIES.length;
      cards.forEach((c, i) => {
        let y = wrap(i * cardS - p * 2 * cardS, all);
        if (y > all - cardS) y -= all;
        c.style.transform = side ? `translate3d(${y.toFixed(1)}px,0,0)` : `translate3d(0,${y.toFixed(1)}px,0)`;
      });

      // Rolling Look Number
      roll.style.transform = `translate3d(0,${(-wrap(p, N) * rollItemH).toFixed(1)}px,0)`;

      // Update active edition info only when look index changes
      const activeIdx = wrap(Math.round(p), N);
      if (activeIdx !== activeLookIndex) {
        updateActiveLook(activeIdx);
      }
    }

    function frame(now) {
      const dt = Math.min(40, now - last) || 16.6;
      last = now;
      const was = p;

      if (calm) {
        p = target;
      } else {
        // Frame-rate independent critically damped exponential spring for silky smooth interpolation
        const friction = 0.082;
        const step = 1 - Math.pow(1 - friction, dt / 16.667);
        p += (target - p) * step;
      }

      if (Math.abs(target - p) < 0.0002) p = target;

      if (p !== was || dirty) {
        dirty = false;
        paint();
      }

      // Smooth custom cursor follower
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
      target = st + dx / PULL();
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
          let d = wrap(+hit.dataset.i - target, N);
          d = Math.round(d);
          if (d > 0 && d < N) target = Math.round(target) + d;
        }
      } else {
        target = Math.round(target);
      }
    }

    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);

    stage.addEventListener('wheel', e => {
      const runwaySection = document.getElementById('section-runway');
      // If user is at edition 0 and scrolling up, allow natural page scroll back up to Section 1-3
      if (e.deltaY < 0 && target <= 0.05 && runwaySection && window.scrollY <= runwaySection.offsetTop + 30) {
        return;
      }
      e.preventDefault();
      target += clamp(e.deltaY + e.deltaX, -100, 100) / 450;
      clearTimeout(wheelT);
      wheelT = setTimeout(() => { target = Math.round(target); }, 140);
    }, { passive: false });

    window.addEventListener('keydown', e => {
      const runwaySection = document.getElementById('section-runway');
      if (!runwaySection) return;
      const rect = stage.getBoundingClientRect();
      if (rect.bottom > 100 && rect.top < window.innerHeight) {
        if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          target = Math.round(target) + 1;
        }
        if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
          target = Math.round(target) - 1;
        }
      }
    });

    function loop(t) {
      frame(t);
      requestAnimationFrame(loop);
    }

    // Preload all scooter images
    const allImages = Array.from(new Set([
      ...LINEUP_ALL.map(x => x.image),
      ...LINEUP_RIZTA.map(x => x.image)
    ]));

    Promise.all(allImages.map(u => {
      const img = new Image();
      img.src = u;
      return img.decode().catch(() => {});
    })).then(() => {
      if (wait) wait.classList.add('gone');
    });

    buildRail();
    buildRunway();
    updateActiveLook(0);
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAtherRunway);
  } else {
    initAtherRunway();
  }
})();

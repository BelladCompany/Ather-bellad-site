/**
 * ATHER ENERGY 3D ANIMATED EXPERIENCE
 * Exact replica of the 3D interactive vehicle scroll experience
 * Built with HTML5, CSS3, Bootstrap 5, GSAP, Three.js
 * Featuring Ather Rizta & 450 Series for Bellad & Company
 */

(function () {
  'use strict';

  // =========================================================================
  // STATE & CONFIGURATION
  // =========================================================================
  const state = {
    progress: 0,
    currentSection: 1,
    ringFade: 1.0,          // Shown ONLY at start; 0.0 in Section 2 and 3
    isDark: true,
    activeEdition: 'gold',
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isDraggingScrollbar: false,
    basePosX: 1.35,
    basePosY: 0.0,
    basePosZ: 0.0,
    baseRotY: -0.05,
    baseRotX: 0.01,
    baseScale: 1.0          // Balanced MEDIUM size: full scooter completely visible, zero clipping
  };

  // DOM Elements
  const canvas = document.getElementById('webgl-canvas');
  const scrollTrack = document.getElementById('scroll-track');
  const scrollbarThumb = document.getElementById('scrollbarThumb');
  const customScrollbar = document.getElementById('customScrollbar');
  const techGrid = document.getElementById('techGrid');
  const scooterSpotlight = document.getElementById('scooterSpotlight');

  const secHero = document.getElementById('section-hero');
  const secSpecs = document.getElementById('section-specs');
  const secAbove = document.getElementById('section-above');

  const heroCopy = secHero ? secHero.querySelector('.hero-copy-block') : null;
  const heroRoadsterBg = secHero ? secHero.querySelector('.hero-bg-roadster') : null;
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroBgText = document.getElementById('heroBgText');

  const specsCopy = secSpecs ? secSpecs.querySelector('.specs-copy-block') : null;
  const specsEyebrow = document.getElementById('specsEyebrow');
  const specsHeading = document.getElementById('specsHeading');
  const specsDesc = document.getElementById('specsDesc');
  const specPills = secSpecs ? secSpecs.querySelectorAll('.spec-pill') : [];

  const aboveHeader = secAbove ? secAbove.querySelector('.above-header-block') : null;
  const featureCardsLeft = secAbove ? secAbove.querySelectorAll('.cards-col-left .feature-card') : [];
  const featureCardsRight = secAbove ? secAbove.querySelectorAll('.cards-col-right .feature-card') : [];

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const reserveModal = document.getElementById('reserveModal');
  const shopNowBtn = document.getElementById('shopNowBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const navContactBtn = document.getElementById('navContactBtn');
  const editionBtns = document.querySelectorAll('.edition-btn');

  // =========================================================================
  // THREE.JS SCENE SETUP
  // =========================================================================
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.35, 6.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  // =========================================================================
  // STUDIO LIGHTING
  // =========================================================================
  const ambientLight = new THREE.AmbientLight(0x1c212d, 1.8);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 3.4);
  mainLight.position.set(2, 12, 6);
  scene.add(mainLight);

  const frontRimLight = new THREE.DirectionalLight(0xfde047, 2.8);
  frontRimLight.position.set(-8, 5, 5);
  scene.add(frontRimLight);

  const rearRimLight = new THREE.DirectionalLight(0xff9f43, 2.6);
  rearRimLight.position.set(8, 4, -4);
  scene.add(rearRimLight);

  // Floor underglow light
  const underglowLight = new THREE.PointLight(0xffb300, 3.6, 10);
  underglowLight.position.set(0, -0.9, 0);
  scene.add(underglowLight);

  // =========================================================================
  // GROUND STAGE & PARTICLE EFFECTS
  // =========================================================================

  // 1. Ground Reflective Disc (Studio pedestal glow)
  const groundCanvas = document.createElement('canvas');
  groundCanvas.width = 512;
  groundCanvas.height = 512;
  const gctx = groundCanvas.getContext('2d');
  
  function drawGroundGlow(primaryHex) {
    gctx.clearRect(0, 0, 512, 512);
    const gradient = gctx.createRadialGradient(256, 256, 15, 256, 256, 256);
    gradient.addColorStop(0, primaryHex + '44');
    gradient.addColorStop(0.35, primaryHex + '20');
    gradient.addColorStop(0.70, primaryHex + '08');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    gctx.fillStyle = gradient;
    gctx.fillRect(0, 0, 512, 512);
    if (groundTexture) groundTexture.needsUpdate = true;
  }

  const groundTexture = new THREE.CanvasTexture(groundCanvas);
  drawGroundGlow('#d4af37');

  const groundGeo = new THREE.PlaneGeometry(18, 18);
  const groundMat = new THREE.MeshBasicMaterial({
    map: groundTexture,
    transparent: true,
    opacity: 0.90,
    depthWrite: false
  });
  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -1.14;
  scene.add(groundMesh);

  // 2. ROTATING WHITE CIRCULAR DOTS (Shown ONLY at start / Hero section)
  // Must disappear completely when scrolling down as Section 2 arrives.
  const ringCount = 320;
  const ringGeo = new THREE.BufferGeometry();
  const ringPos = new Float32Array(ringCount * 3);

  for (let i = 0; i < ringCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 2.4 + Math.random() * 2.3;
    ringPos[i * 3] = Math.cos(angle) * r;
    ringPos[i * 3 + 1] = -1.12 + (Math.random() - 0.5) * 0.12;
    ringPos[i * 3 + 2] = Math.sin(angle) * (r * 0.62);
  }
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));

  const ringMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.052,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const ringPoints = new THREE.Points(ringGeo, ringMat);
  ringPoints.position.x = 1.35; // Centered directly under the scooter inside marked area
  scene.add(ringPoints);

  // 3. Floating Ambient Starfield / Dust
  const dustCount = 340;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);

  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 18;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

  const dustMat = new THREE.PointsMaterial({
    color: 0xd0e8ff,
    size: 0.034,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  scene.add(dustPoints);

  // =========================================================================
  // BIGGER, HIGHLIGHTED ATHER SCOOTER 3D VEHICLE RIG
  // =========================================================================
  const carPivot = new THREE.Group();
  scene.add(carPivot);

  // Realistic contact shadow directly beneath scooter tires
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 512;
  shadowCanvas.height = 256;
  const sctx = shadowCanvas.getContext('2d');
  
  // Front wheel contact shadow (left side, right under front tire)
  const gradFront = sctx.createRadialGradient(130, 128, 5, 130, 128, 85);
  gradFront.addColorStop(0, 'rgba(0, 0, 0, 0.92)');
  gradFront.addColorStop(0.4, 'rgba(0, 0, 0, 0.48)');
  gradFront.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sctx.fillStyle = gradFront;
  sctx.fillRect(0, 0, 256, 256);

  // Rear wheel contact shadow (right side, right under rear tire)
  const gradRear = sctx.createRadialGradient(305, 128, 5, 305, 128, 95);
  gradRear.addColorStop(0, 'rgba(0, 0, 0, 0.94)');
  gradRear.addColorStop(0.4, 'rgba(0, 0, 0, 0.50)');
  gradRear.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sctx.fillStyle = gradRear;
  sctx.fillRect(180, 0, 332, 256);

  // Battery floorboard contact shadow connecting both tires
  const gradMid = sctx.createRadialGradient(215, 128, 10, 215, 128, 130);
  gradMid.addColorStop(0, 'rgba(0, 0, 0, 0.70)');
  gradMid.addColorStop(0.5, 'rgba(0, 0, 0, 0.28)');
  gradMid.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sctx.fillStyle = gradMid;
  sctx.fillRect(50, 0, 350, 256);

  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeo = new THREE.PlaneGeometry(4.6, 2.1);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.88,
    depthWrite: false
  });
  const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.set(0, -1.13, 0);
  carPivot.add(contactShadow);

  // Texture Loader & Editions Cache
  const texLoader = new THREE.TextureLoader();

  const editionsData = {
    duo: {
      name: 'ATHER RIZTA',
      tag: 'FAMILY SERIES',
      title: 'DESIGNED FOR<br>YOUR FAMILY',
      subtitle: 'Ather Rizta – Crafted for family comfort, safety, and electric joy.',
      img: 'images/Grey-Duo.png',
      aspect: 1.5,
      glow: '#00e5ff',
      lightHex: 0x00e5ff,
      rimHex: 0x38bdf8,
      specs: {
        val1: '161 km', sub1: 'IDC range',
        val2: '80 km/h', sub2: 'top speed',
        val3: '34L Boot', sub3: '+ 22L Frunk',
        val4: 'SkidControl™', sub4: 'traction safety',
        val5: 'Magic Twist™', sub5: 'brake to zero'
      }
    },
    gold: {
      name: 'ATHER RIZTA GOLD',
      tag: 'LUXURY EDITION',
      title: 'CHAMPAGNE<br>ELEGANCE',
      subtitle: 'Ather Rizta Champagne Gold – Warm luxury studio finish with deep seating.',
      img: 'images/rizta_gold_cutout.png',
      aspect: 1.5,
      glow: '#d4af37',
      lightHex: 0xffb300,
      rimHex: 0xfde047,
      specs: {
        val1: '161 km', sub1: 'IDC range',
        val2: '80 km/h', sub2: 'top speed',
        val3: '34L Boot', sub3: '+ 22L Frunk',
        val4: 'SkidControl™', sub4: 'traction safety',
        val5: 'Magic Twist™', sub5: 'brake to zero'
      }
    },
    copper: {
      name: 'ATHER RIZTA COPPER',
      tag: 'TWILIGHT SPECIAL',
      title: 'LUMEN<br>COPPER',
      subtitle: 'Ather Rizta Lumen Copper – Sunset bronze styling with aerodynamic dual-tone fairing.',
      img: 'images/rizta_copper_cutout.png',
      aspect: 1.5,
      glow: '#ea580c',
      lightHex: 0xf97316,
      rimHex: 0xfb923c,
      specs: {
        val1: '161 km', sub1: 'IDC range',
        val2: '80 km/h', sub2: 'top speed',
        val3: '34L Boot', sub3: '+ 22L Frunk',
        val4: 'SkidControl™', sub4: 'traction safety',
        val5: 'Magic Twist™', sub5: 'brake to zero'
      }
    }
  };

  // Preload primary textures
  const textures = {};
  for (const [key, data] of Object.entries(editionsData)) {
    textures[key] = texLoader.load(data.img, () => {
      renderer.render(scene, camera);
    });
    textures[key].generateMipmaps = true;
    textures[key].minFilter = THREE.LinearMipmapLinearFilter;
    textures[key].magFilter = THREE.LinearFilter;
  }

  // MEDIUM-SIZED HIGHLIGHTED Plane Geometry
  // Width: 4.30, Height: 2.87 (balanced medium size: 100% visible, no clipping)
  const scooterGeo = new THREE.PlaneGeometry(4.30, 2.87);

  const scooterMat = new THREE.MeshBasicMaterial({
    map: textures.gold, // Champagne Gold by default
    transparent: true,
    opacity: 1.0,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const scooterMesh = new THREE.Mesh(scooterGeo, scooterMat);
  // Lowered down so both wheels firmly rest on the floor contact shadow
  scooterMesh.position.set(0, -0.09, 0);
  scooterMesh.rotation.z = -0.138; // Levels the ground angle (-7.93 deg) in photo so both tires touch ground
  carPivot.add(scooterMesh);

  // SECTION 3 SHOWCASE VEHICLE: Ather Rizta New Model
  // The Ather Rizta seamlessly glides into the center between the 4 cards in Section 3

  // Responsive device scaling factor helper
  function getDeviceScaleFactor() {
    const w = window.innerWidth;
    if (w < 576) return 0.68;
    if (w < 768) return 0.80;
    if (w < 992) return 0.90;
    if (w < 1400) return 1.0;
    return 1.05;
  }

  // Set initial medium position
  state.baseScale = 1.02 * getDeviceScaleFactor();
  carPivot.position.set(state.basePosX, state.basePosY, state.basePosZ);
  carPivot.rotation.set(state.baseRotX, state.baseRotY, 0);
  carPivot.scale.setScalar(state.baseScale);

  // =========================================================================
  // INTERACTIVE EDITION SWITCHING
  // =========================================================================
  function switchEdition(editionKey) {
    const data = editionsData[editionKey];
    if (!data) return;

    state.activeEdition = editionKey;

    // Update Buttons UI
    editionBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-edition') === editionKey);
    });

    // Smooth texture switch
    if (textures[editionKey]) {
      gsap.to(scooterMat, {
        opacity: 0.2,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          scooterMat.map = textures[editionKey];
          scooterMat.needsUpdate = true;
          gsap.to(scooterMat, {
            opacity: 1.0,
            duration: 0.25,
            ease: 'power2.out'
          });
        }
      });
    }

    // Update Lighting & Floor Glow
    underglowLight.color.setHex(data.lightHex);
    frontRimLight.color.setHex(data.rimHex);
    drawGroundGlow(data.glow);

    // Update Ambient Spotlight CSS
    if (scooterSpotlight) {
      scooterSpotlight.style.background = `radial-gradient(circle at center, ${data.glow}26 0%, ${data.glow}0d 40%, transparent 70%)`;
    }

    // Update DOM Copy
    if (heroBgText) heroBgText.textContent = 'ATHER';
    if (heroTitle) heroTitle.innerHTML = data.title;
    if (heroSubtitle) heroSubtitle.textContent = data.subtitle;

    if (specsEyebrow) specsEyebrow.textContent = data.tag;
    if (specsHeading) specsHeading.innerHTML = data.name.replace(' ', '<br>');
    if (specsDesc) specsDesc.innerHTML = `${data.subtitle.split('–')[1] || data.subtitle}`;

    // Update Spec Badges
    const s = data.specs;
    document.getElementById('pillVal1').textContent = s.val1;
    document.getElementById('pillSub1').textContent = s.sub1;
    document.getElementById('pillVal2').textContent = s.val2;
    document.getElementById('pillSub2').textContent = s.sub2;
    document.getElementById('pillVal3').textContent = s.val3;
    document.getElementById('pillSub3').textContent = s.sub3;
    document.getElementById('pillVal4').textContent = s.val4;
    document.getElementById('pillSub4').textContent = s.sub4;
    document.getElementById('pillVal5').textContent = s.val5;
    document.getElementById('pillSub5').textContent = s.sub5;
  }

  editionBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ed = btn.getAttribute('data-edition');
      switchEdition(ed);
    });
  });

  // =========================================================================
  // HELPER FUNCTIONS
  // =========================================================================
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function getNormalizedScroll() {
    const track = document.getElementById('scroll-track');
    const trackH = track ? track.offsetHeight : (document.documentElement.scrollHeight - window.innerHeight);
    const maxScroll = Math.max(1, trackH - window.innerHeight);
    return clamp(window.scrollY / maxScroll, 0, 1);
  }

  // =========================================================================
  // SCROLL CHOREOGRAPHY & GSAP SCRUBBING
  // =========================================================================
  /**
   * Updates all sections, DOM transforms, and 3D Ather scooter orientations based on progress (0 to 1)
   */
  function updateScrollExperience(p) {
    state.progress = p;

    // 1. Update Custom Scrollbar Thumb (Far Right)
    if (customScrollbar && scrollbarThumb) {
      const trackH = customScrollbar.clientHeight;
      const thumbH = scrollbarThumb.clientHeight;
      const thumbY = p * (trackH - thumbH);
      scrollbarThumb.style.transform = `translateY(${thumbY}px)`;
    }

    // 2. Active Nav Link Highlighting
    const navLinks = document.querySelectorAll('.nav-item-link');
    navLinks.forEach((link) => link.classList.remove('active'));
    if (p < 0.22) {
      navLinks[0]?.classList.add('active'); // Shop
    } else if (p < 0.78) {
      navLinks[1]?.classList.add('active'); // Customize
    } else {
      navLinks[2]?.classList.add('active'); // Reviews
    }

    // -------------------------------------------------------------
    // 3. ROTATING WHITE CIRCULAR DOTS FADE
    // Rule: Shown ONLY at start (Section 1). When scrolling down as Section 2 arrives, it disappears completely!
    // -------------------------------------------------------------
    if (p <= 0.14) {
      state.ringFade = 1.0;
    } else if (p < 0.26) {
      state.ringFade = clamp((0.26 - p) / 0.12, 0, 1);
    } else {
      state.ringFade = 0.0;
    }

    // -------------------------------------------------------------
    // 4. SECTIONS VISIBILITY & DOM ANIMATIONS (MUTUALLY EXCLUSIVE)
    // -------------------------------------------------------------
    // SECTION 1: HERO (0.0 to 0.18)
    if (p < 0.18) {
      secHero?.classList.add('active');
      secSpecs?.classList.remove('active');
      secAbove?.classList.remove('active');

      const heroOpacity = clamp(1 - (p / 0.18) * 0.4, 0.6, 1);
      if (heroCopy) {
        heroCopy.style.opacity = heroOpacity;
        heroCopy.style.transform = `translateY(${-p * 60}px)`;
      }
      if (heroRoadsterBg) {
        heroRoadsterBg.style.opacity = heroOpacity;
        heroRoadsterBg.style.transform = `translateX(-50%) translateY(${-p * 30}px) scale(${1 - p * 0.06})`;
      }
    }
    // TRANSITION: HERO OUT -> SPECS IN (0.18 to 0.28)
    else if (p >= 0.18 && p < 0.28) {
      secHero?.classList.add('active');
      secSpecs?.classList.add('active');
      secAbove?.classList.remove('active');

      const tGlide = (p - 0.18) / 0.10; // 0 to 1

      // Hero fades out
      const heroOpacity = clamp(1 - tGlide * 1.5, 0, 1);
      if (heroCopy) {
        heroCopy.style.opacity = heroOpacity;
        heroCopy.style.transform = `translateY(${-18 - tGlide * 40}px)`;
      }
      if (heroRoadsterBg) {
        heroRoadsterBg.style.opacity = heroOpacity;
        heroRoadsterBg.style.transform = `translateX(-50%) translateY(${-9 - tGlide * 25}px) scale(${1 - (0.18 + tGlide * 0.1) * 0.06})`;
      }

      // Specs fade in smoothly
      const specsOpacity = clamp(tGlide * 1.2, 0, 1);
      const specsShiftY = (1 - tGlide) * 30;
      if (specsCopy) {
        specsCopy.style.opacity = specsOpacity;
        specsCopy.style.transform = `translateY(${specsShiftY}px)`;
      }

      specPills.forEach((pill, idx) => {
        const delay = idx * 0.04;
        const pillProg = clamp((tGlide - delay) / 0.7, 0, 1);
        pill.style.opacity = pillProg;
        pill.style.transform = `translateY(${(1 - pillProg) * 12}px)`;
      });
    }
    // SECTION 2: SPECS EXTENDED READING PLATEAU (0.28 to 0.74)
    // Scooter is completely parked at col left, all specs 100% visible and stable!
    else if (p >= 0.28 && p <= 0.74) {
      secHero?.classList.remove('active');
      secSpecs?.classList.add('active');
      secAbove?.classList.remove('active');

      if (specsCopy) {
        specsCopy.style.opacity = 1.0;
        specsCopy.style.transform = 'translateY(0px)';
      }

      // Spec pills at full 100% opacity throughout the entire reading plateau
      specPills.forEach((pill) => {
        pill.style.opacity = 1.0;
        pill.style.transform = 'translateY(0px)';
      });
    }
    // TRANSITION: SPECS OUT -> SECTION 3 IN (0.74 to 0.84)
    else if (p > 0.74 && p <= 0.84) {
      secHero?.classList.remove('active');
      secSpecs?.classList.add('active');
      secAbove?.classList.add('active');

      const tExit = (p - 0.74) / 0.10; // 0 to 1

      // Specs fade out smoothly
      const specsOpacity = clamp(1 - tExit, 0, 1);
      const specsShiftY = -tExit * 30;
      if (specsCopy) {
        specsCopy.style.opacity = specsOpacity;
        specsCopy.style.transform = `translateY(${specsShiftY}px)`;
      }
      specPills.forEach((pill) => {
        pill.style.opacity = specsOpacity;
      });

      // Section 3 enters
      const aboveOpacity = clamp(tExit * 1.2, 0, 1);
      const aboveShiftY = (1 - aboveOpacity) * 20;
      if (aboveHeader) {
        aboveHeader.style.opacity = aboveOpacity;
        aboveHeader.style.transform = `translateY(-${aboveShiftY}px)`;
      }

      featureCardsLeft.forEach((card, idx) => {
        const cardProg = clamp((tExit - idx * 0.1) / 0.7, 0, 1);
        card.style.opacity = cardProg;
        card.style.transform = `translateX(${(1 - cardProg) * -35}px)`;
      });

      featureCardsRight.forEach((card, idx) => {
        const cardProg = clamp((tExit - idx * 0.1) / 0.7, 0, 1);
        card.style.opacity = cardProg;
        card.style.transform = `translateX(${(1 - cardProg) * 35}px)`;
      });
    }
    // SECTION 3: BUILT FOR EVERY MOMENT (0.84 to 1.0)
    else {
      secHero?.classList.remove('active');
      secSpecs?.classList.remove('active');
      secAbove?.classList.add('active');

      if (aboveHeader) {
        aboveHeader.style.opacity = 1.0;
        aboveHeader.style.transform = 'translateY(0px)';
      }

      featureCardsLeft.forEach((card) => {
        card.style.opacity = 1.0;
        card.style.transform = 'translateX(0px)';
      });

      featureCardsRight.forEach((card) => {
        card.style.opacity = 1.0;
        card.style.transform = 'translateX(0px)';
      });
    }

    // Tech Grid visibility (in Section 3)
    if (techGrid) {
      techGrid.style.opacity = p > 0.74 ? clamp((p - 0.74) / 0.10 * 0.75, 0, 0.75) : 0;
    }

    // Dynamic Spotlight following scooter between Center (Hero), Left (Section 2), and Center (Section 3)
    if (scooterSpotlight) {
      if (p < 0.18) {
        scooterSpotlight.style.left = '50%';
      } else if (p < 0.28) {
        const tGlide = (p - 0.18) / 0.10;
        scooterSpotlight.style.left = `${lerp(50, 25, tGlide)}%`;
      } else if (p <= 0.74) {
        scooterSpotlight.style.left = '25%'; // Squarely behind left column scooter
      } else if (p <= 0.84) {
        const tExit = (p - 0.74) / 0.10;
        scooterSpotlight.style.left = `${lerp(25, 50, tExit)}%`;
      } else {
        scooterSpotlight.style.left = '50%';
      }
    }

    // -------------------------------------------------------------
    // 5. SECTION 3 VEHICLE: ATHER RIZTA NEW MODEL PERSISTS THROUGHOUT
    // -------------------------------------------------------------
    scooterMat.opacity = 1.0;
    scooterMesh.visible = true;

    // -------------------------------------------------------------
    // 6. ATHER SCOOTER CHOREOGRAPHY (RIGHT START -> GLIDE TO COL LEFT -> STATIC READ PLATEAU -> CENTER)
    // -------------------------------------------------------------
    const dFactor = getDeviceScaleFactor();
    let targetPosX = 0;
    let targetPosY = 0;
    let targetPosZ = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let targetScale = 1.02 * dFactor;

    if (p < 0.18) {
      // Hero: Parked exactly in user's marked red box on right (x = 1.35)
      targetPosX = 1.35;
      targetPosY = 0.0;
      targetPosZ = 0.0;
      targetRotY = -0.05;
      targetRotX = 0.01;
      targetScale = 1.02 * dFactor;
    } else if (p < 0.28) {
      // Smooth glide from Hero marked position across to Left Column (col left: x = -2.15)
      const t = (p - 0.18) / 0.10;
      targetPosX = lerp(1.35, -2.15, t);
      targetPosY = 0.0;
      targetPosZ = 0.0;
      targetRotY = lerp(-0.05, 0.12, t); // Rotates slightly towards right column content
      targetRotX = lerp(0.01, 0.02, t);
      targetScale = lerp(1.02 * dFactor, 0.94 * dFactor, t);
    } else if (p <= 0.74) {
      // Section 2: Complete the scroll till the image comes at col left, THEN sit completely parked!
      // Rock-solid stationary in left column, zero movement, zero disappearance!
      targetPosX = -2.15;
      targetPosY = 0.0;
      targetPosZ = 0.0;
      targetRotY = 0.12;
      targetRotX = 0.02;
      targetScale = 0.94 * dFactor;
    } else if (p <= 0.84) {
      // Smooth exit: glide from Left Column back to Center for Section 3 showcase
      const t = (p - 0.74) / 0.10;
      targetPosX = lerp(-2.15, 0.0, t);
      targetPosY = lerp(0.0, 0.05, t);
      targetPosZ = lerp(0.0, 0.08, t);
      targetRotY = lerp(0.12, 0.0, t);
      targetRotX = 0.02;
      targetScale = lerp(0.94 * dFactor, 0.92 * dFactor, t);
    } else {
      // Section 3: Centered showcase vehicle
      targetPosX = 0.0;
      targetPosY = 0.05;
      targetPosZ = 0.08;
      targetRotY = 0.0;
      targetRotX = 0.02;
      targetScale = 0.92 * dFactor;
    }
    state.basePosX = targetPosX;
    state.basePosY = targetPosY;
    state.basePosZ = targetPosZ;
    state.baseRotY = targetRotY;
    state.baseRotX = targetRotX;
    state.baseScale = targetScale;
  }

  // Global updater for programmatic testing / scrub control
  window.updateRoadsterScroll = updateScrollExperience;
  window.updateAtherScroll = updateScrollExperience;

  // =========================================================================
  // SCROLL EVENT LISTENERS (BOTH GSAP & NATIVE PASSIVE SCROLL)
  // =========================================================================

  // 1. GSAP ScrollTrigger Integration
  if (window.ScrollTrigger && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: scrollTrack,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        updateScrollExperience(self.progress);
      }
    });
  }

  // 2. High-performance Native Scroll Listener
  window.addEventListener('scroll', () => {
    updateScrollExperience(getNormalizedScroll());
  }, { passive: true });

  // 3. Universal Wheel Handler
  window.addEventListener('wheel', (e) => {
    if (reserveModal && reserveModal.classList.contains('open')) return;

    window.scrollBy({
      top: e.deltaY,
      behavior: 'auto'
    });
  }, { passive: true });

  // 4. Keyboard Arrow / Page Navigation
  window.addEventListener('keydown', (e) => {
    if (reserveModal && reserveModal.classList.contains('open')) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      window.scrollBy({ top: window.innerHeight * 0.35, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      window.scrollBy({ top: -window.innerHeight * 0.35, behavior: 'smooth' });
    }
  });

  // 5. Custom Scrollbar Dragging & Click-to-Scroll
  if (customScrollbar) {
    customScrollbar.style.pointerEvents = 'auto';
    customScrollbar.style.cursor = 'pointer';

    customScrollbar.addEventListener('click', (e) => {
      const rect = customScrollbar.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const progress = clamp(clickY / rect.height, 0, 1);
      const track = document.getElementById('scroll-track');
      const trackH = track ? track.offsetHeight : (document.documentElement.scrollHeight - window.innerHeight);
      const maxScroll = Math.max(1, trackH - window.innerHeight);
      window.scrollTo({
        top: progress * maxScroll,
        behavior: 'smooth'
      });
    });
  }

  if (scrollbarThumb) {
    scrollbarThumb.style.cursor = 'grab';

    scrollbarThumb.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      state.isDraggingScrollbar = true;
      document.body.style.userSelect = 'none';
      scrollbarThumb.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isDraggingScrollbar || !customScrollbar) return;
      const rect = customScrollbar.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const progress = clamp(clickY / rect.height, 0, 1);
      const track = document.getElementById('scroll-track');
      const trackH = track ? track.offsetHeight : (document.documentElement.scrollHeight - window.innerHeight);
      const maxScroll = Math.max(1, trackH - window.innerHeight);
      window.scrollTo(0, progress * maxScroll);
    });

    window.addEventListener('mouseup', () => {
      if (state.isDraggingScrollbar) {
        state.isDraggingScrollbar = false;
        document.body.style.userSelect = '';
        if (scrollbarThumb) scrollbarThumb.style.cursor = 'grab';
      }
    });
  }

  // =========================================================================
  // MOUSE PARALLAX & INTERACTIVE CONTROLS
  // =========================================================================
  window.addEventListener('mousemove', (e) => {
    state.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    state.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Smooth Navigation Links Click Handling
  document.querySelectorAll('[data-scroll-to]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const targetProg = parseFloat(elem.getAttribute('data-scroll-to'));
      const track = document.getElementById('scroll-track');
      const trackH = track ? track.offsetHeight : (document.documentElement.scrollHeight - window.innerHeight);
      const maxScroll = Math.max(1, trackH - window.innerHeight);
      window.scrollTo({
        top: targetProg * maxScroll,
        behavior: 'smooth'
      });
    });
  });

  // Modal Open / Close
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', () => {
      reserveModal?.classList.add('open');
    });
  }

  // Interactive Section 3 Cards: Click to preview New Ather Rizta Editions
  const cardGold = document.querySelector('.feature-card[data-card="1"]');
  const cardCopper = document.querySelector('.feature-card[data-card="3"]');
  if (cardGold) {
    cardGold.style.cursor = 'pointer';
    cardGold.setAttribute('title', 'Preview Champagne Gold Rizta');
    cardGold.addEventListener('click', () => {
      switchEdition('gold');
    });
  }
  if (cardCopper) {
    cardCopper.style.cursor = 'pointer';
    cardCopper.setAttribute('title', 'Preview Lumen Copper Rizta');
    cardCopper.addEventListener('click', () => {
      switchEdition('copper');
    });
  }

  if (navContactBtn) {
    navContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      reserveModal?.classList.add('open');
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      reserveModal?.classList.remove('open');
    });
  }

  if (reserveModal) {
    reserveModal.addEventListener('click', (e) => {
      if (e.target === reserveModal) {
        reserveModal.classList.remove('open');
      }
    });
  }

  // =========================================================================
  // THEME TOGGLE (DARK / LIGHT MODE)
  // =========================================================================
  function setTheme(isDark) {
    state.isDark = isDark;
    const html = document.documentElement;

    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      ambientLight.color.setHex(0x1c212d);
      ambientLight.intensity = 1.8;
      mainLight.intensity = 3.4;
      groundMat.opacity = 0.90;
    } else {
      html.setAttribute('data-theme', 'light');
      ambientLight.color.setHex(0x606575);
      ambientLight.intensity = 2.4;
      mainLight.intensity = 2.8;
      groundMat.opacity = 0.50;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      setTheme(!state.isDark);
    });
  }

  // =========================================================================
  // WINDOW RESIZE HANDLER
  // =========================================================================
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
    updateScrollExperience(getNormalizedScroll());
  });

  // =========================================================================
  // RENDER / ANIMATION LOOP
  // =========================================================================
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. Smooth lerping for mouse parallax
    state.mouseX += (state.targetMouseX - state.mouseX) * 0.06;
    state.mouseY += (state.targetMouseY - state.mouseY) * 0.06;

    // 2. Subtle idle hover bobbing animation
    const hoverBob = 0; // Tires stay firmly planted on floor shadow without floating

    // 3. Update Big Ather Scooter Transforms
    if (carPivot) {
      // Mouse parallax tilt & position shift
      const isCentered = state.progress > 0.68;
      const parallaxTiltX = isCentered ? 0.03 : 0.05;
      const parallaxTiltY = isCentered ? 0.04 : 0.07;

      carPivot.rotation.y = state.baseRotY + state.mouseX * parallaxTiltY;
      carPivot.rotation.x = state.baseRotX + state.mouseY * parallaxTiltX;

      carPivot.position.x = state.basePosX + state.mouseX * 0.10;
      carPivot.position.y = state.basePosY - state.mouseY * 0.06 + hoverBob;
      carPivot.position.z = state.basePosZ;
      carPivot.scale.setScalar(state.baseScale);
    }

    // 4. ROTATING WHITE CIRCULAR DOTS (Shown ONLY at start / Hero section)
    // Dissolves and completely disappears as user scrolls down into Section 2!
    if (ringPoints) {
      ringPoints.rotation.y = elapsedTime * 0.12;
      ringPoints.position.x = carPivot.position.x;
      const fade = (typeof state.ringFade === 'number') ? state.ringFade : 1.0;
      if (fade > 0.002) {
        ringPoints.visible = true;
        ringMat.opacity = fade * (0.80 + Math.sin(elapsedTime * 2.2) * 0.15);
      } else {
        ringPoints.visible = false;
        ringMat.opacity = 0;
      }
    }

    // 5. Slowly Drift Floating Dust
    if (dustPoints) {
      dustPoints.rotation.y = elapsedTime * 0.03;
      dustPoints.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
    }

    // 6. Pulse Floor Glow & Underglow Light (smoothly follows scooter position)
    if (underglowLight && carPivot) {
      underglowLight.position.x = carPivot.position.x;
      underglowLight.intensity = 3.2 + Math.sin(elapsedTime * 3) * 0.4;
    }
    if (groundMesh && carPivot) {
      groundMesh.position.x = carPivot.position.x;
    }

    renderer.render(scene, camera);
  }

  // Start the Animation Loop
  animate();

  // Initial sync
  updateScrollExperience(getNormalizedScroll());

})();

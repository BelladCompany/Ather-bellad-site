/**
 * ATHER ENERGY OFFICIAL WEBSITE REPLICA - INTERACTIVE CONTROLLER
 * Matching Home Page 3D Transition Effects & Interactive Dynamics
 * - GSAP ScrollTrigger 3D reveals
 * - 3D card tilt & parallax depth
 * - 3D gyroscopic Halo smart helmet tracking
 * - Dark & Light mode switcher with persistent state
 * - Smooth 3D scooter model switcher (Rizta vs Ather 450)
 * - GPS location detection & Lead capture
 * - FAQ accordion & disclaimer dropdown
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. THEME SWITCHER (DARK & LIGHT MODE)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlEl = document.documentElement;

  // Retrieve query param or stored theme, default to light mode
  const urlParams = new URLSearchParams(window.location.search);
  const queryTheme = urlParams.get('theme');
  const savedTheme = queryTheme || localStorage.getItem('ather_theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'light';
      const targetTheme = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', targetTheme);
      localStorage.setItem('ather_theme', targetTheme);
    });
  }

  // =========================================================================
  // 2. LANGUAGE DROPDOWN
  // =========================================================================
  const langDropdown = document.getElementById('langDropdown');
  const langDropdownMenu = document.getElementById('langDropdownMenu');

  if (langDropdown && langDropdownMenu) {
    langDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langDropdownMenu.classList.toggle('show');
      langDropdown.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    langDropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        langDropdownMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const langCode = item.textContent.match(/\((.*?)\)/)?.[1] || 'ENG';
        const span = langDropdown.querySelector('span');
        if (span) span.textContent = langCode;
        langDropdownMenu.classList.remove('show');
      });
    });

    document.addEventListener('click', () => {
      langDropdownMenu.classList.remove('show');
    });
  }

  // =========================================================================
  // 3. MOBILE MENU DRAWER
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    if (closeMobileMenu) {
      closeMobileMenu.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // =========================================================================
  // 4. GSAP SCROLLTRIGGER 3D REVEAL ANIMATIONS (LIKE HOME PAGE)
  // =========================================================================
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Halo content fade & 3D float in
    gsap.from('.hero-halo-content', {
      duration: 1.2,
      y: 45,
      opacity: 0,
      ease: 'power3.out'
    });

    // 3D Stagger Entrance: Quick Actions
    gsap.from('.quick-action-card', {
      scrollTrigger: {
        trigger: '.quick-actions-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 35,
      rotationX: 14,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // 3D Scale & Tilt: The Ather Electric Family full card
    gsap.from('.family-card-full', {
      scrollTrigger: {
        trigger: '.electric-family-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 1.0,
      y: 50,
      scale: 0.96,
      rotationX: 8,
      opacity: 0,
      ease: 'power2.out'
    });

    // 3D Stagger: Electric Family split cards
    gsap.from('.family-card-half', {
      scrollTrigger: {
        trigger: '.family-cards-row',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.9,
      y: 45,
      rotationX: 10,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out'
    });

    // 3D Entrance: Ather Advantage Cards
    gsap.from('.advantage-card', {
      scrollTrigger: {
        trigger: '.advantage-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      duration: 0.85,
      y: 40,
      rotationY: 8,
      opacity: 0,
      stagger: 0.12,
      ease: 'power2.out'
    });

    // 3D Entrance: Keep Exploring Cards
    gsap.from('.explore-card-replica', {
      scrollTrigger: {
        trigger: '.explore-section-replica',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 40,
      rotationX: 12,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // 3D Entrance: Get in Touch Lead Card & Scooter
    gsap.from('.contact-card-box', {
      scrollTrigger: {
        trigger: '.contact-section-replica',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 0.9,
      y: 40,
      opacity: 0,
      ease: 'power2.out'
    });

    gsap.from('.contact-scooter-showcase img', {
      scrollTrigger: {
        trigger: '.contact-section-replica',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      duration: 1.1,
      x: 60,
      scale: 0.95,
      opacity: 0,
      ease: 'power2.out'
    });
  }

  // =========================================================================
  // 5. INTERACTIVE 3D MOUSE HOVER TILT ON CARDS (LIKE HOME PAGE)
  // =========================================================================
  const tiltElements = document.querySelectorAll(
    '.quick-action-card, .family-card-full, .family-card-half, .advantage-card, .explore-card-replica'
  );

  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle dynamic 3D rotation (max +/- 7 degrees)
      const rotateX = (((y - centerY) / centerY) * -7).toFixed(2);
      const rotateY = (((x - centerX) / centerX) * 7).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // =========================================================================
  // 6. INTERACTIVE 3D GYROSCOPIC TRACKER ON HALO HELMET
  // =========================================================================
  const haloSection = document.getElementById('halo');
  const helmetImg = document.querySelector('.pair-world-img-wrap img');

  if (haloSection && helmetImg) {
    haloSection.addEventListener('mousemove', (e) => {
      const rect = haloSection.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      const rotY = (normX * 22).toFixed(2);
      const rotX = (-normY * 18).toFixed(2);

      helmetImg.style.transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.05)`;
    });

    haloSection.addEventListener('mouseleave', () => {
      helmetImg.style.transform = '';
    });
  }

  // =========================================================================
  // 7. GET IN TOUCH: SCOOTER MODEL SWITCHER & 3D TRANSITION
  // =========================================================================
  const modelBtns = document.querySelectorAll('.model-pick-btn');
  const contactScooterImg = document.getElementById('contactScooterImg');

  const scooterModelImages = {
    'Ather 450': 'images/contact_ather_450x_exact.png',
    'Rizta': 'images/clean_rizta_grey_duo.png'
  };

  let selectedModel = 'Ather 450';

  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const model = btn.getAttribute('data-model') || 'Ather 450';
      if (model === selectedModel) return;

      selectedModel = model;
      modelBtns.forEach(b => b.classList.toggle('active', b === btn));

      // 3D transition effect on scooter image
      if (contactScooterImg && scooterModelImages[model]) {
        contactScooterImg.style.opacity = '0.25';
        contactScooterImg.style.transform = 'scale(0.92) rotateY(-10deg)';

        setTimeout(() => {
          contactScooterImg.src = scooterModelImages[model];
          contactScooterImg.alt = `Ather ${model} Electric Scooter`;
          contactScooterImg.style.opacity = '1';
          contactScooterImg.style.transform = 'scale(1) rotateY(0deg)';
        }, 180);
      }
    });
  });

  // =========================================================================
  // 8. GPS AUTO-DETECT LOCATION
  // =========================================================================
  const gpsBtn = document.getElementById('gpsLocateBtn');
  const areaInput = document.getElementById('leadArea');

  if (gpsBtn && areaInput) {
    gpsBtn.addEventListener('click', () => {
      gpsBtn.classList.add('locating');
      areaInput.placeholder = 'Detecting nearest centre...';

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => {
            areaInput.value = '580030, Hubballi';
            gpsBtn.classList.remove('locating');
            areaInput.style.borderColor = '#00d282';
          },
          () => {
            areaInput.value = '580030, Hubballi';
            gpsBtn.classList.remove('locating');
            areaInput.style.borderColor = '#00d282';
          },
          { timeout: 4000 }
        );
      } else {
        areaInput.value = '580030, Hubballi';
        gpsBtn.classList.remove('locating');
        areaInput.style.borderColor = '#00d282';
      }
    });
  }

  // =========================================================================
  // 9. LEAD FORM SUBMISSION
  // =========================================================================
  const leadForm = document.getElementById('atherLeadForm');
  const successMsg = document.getElementById('leadSuccessMsg');
  const submitBtn = document.getElementById('leadSubmitBtn');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('leadName')?.value.trim();
      const phone = document.getElementById('leadPhone')?.value.trim();
      const area = document.getElementById('leadArea')?.value.trim();

      if (!name || !phone || !area) {
        alert('Please fill in your name, phone number, and area/pincode.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submitted ✓';
          submitBtn.style.background = '#00d282';
          submitBtn.style.color = '#000000';
          submitBtn.style.boxShadow = '0 0 20px rgba(0, 210, 130, 0.5)';
        }

        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.innerHTML = `<strong>Thank you, ${name}!</strong> Your request for the <strong>Ather ${selectedModel}</strong> in ${area} has been received. Bellad & Company Ather Hubballi will reach out to you shortly at +91 ${phone}.`;
        }
      }, 600);
    });
  }

  // =========================================================================
  // 10. FAQ ACCORDION TOGGLE
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerBody = item.querySelector('.faq-answer-body');

    if (questionBtn && answerBody) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBody = otherItem.querySelector('.faq-answer-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        // Toggle current FAQ
        if (isActive) {
          item.classList.remove('active');
          answerBody.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answerBody.style.maxHeight = answerBody.scrollHeight + 'px';
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstBody = firstItem.querySelector('.faq-answer-body');
    firstItem.classList.add('active');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // =========================================================================
  // 11. DISCLAIMER TOGGLE
  // =========================================================================
  const disclaimerBox = document.getElementById('disclaimerBox');
  const disclaimerToggle = document.getElementById('disclaimerToggle');
  const disclaimerContent = document.getElementById('disclaimerContent');

  if (disclaimerToggle && disclaimerBox && disclaimerContent) {
    disclaimerToggle.addEventListener('click', () => {
      const isActive = disclaimerBox.classList.contains('active');
      if (isActive) {
        disclaimerBox.classList.remove('active');
        disclaimerContent.style.maxHeight = null;
      } else {
        disclaimerBox.classList.add('active');
        disclaimerContent.style.maxHeight = disclaimerContent.scrollHeight + 'px';
      }
    });
  }
});

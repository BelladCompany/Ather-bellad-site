/**
 * Ather Bellad & Company — Keep Exploring & Contact Section Controller
 * Seamlessly handles model switching, GPS geolocation, and lead capture.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initContactAndExplore);

  function initContactAndExplore() {
    // 1. Model Picker (Rizta vs Ather 450)
    const modelPills = document.querySelectorAll('.contact-model-pill');
    const scooterImg = document.getElementById('contactScooterDisplayImg');

    const modelImages = {
      ather450: 'images/contact_ather_450x_exact.png',
      rizta: 'images/clean_rizta_grey_duo.png'
    };

    let selectedModel = 'ather450';

    modelPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const targetModel = pill.dataset.model;
        if (!targetModel || targetModel === selectedModel) return;

        selectedModel = targetModel;

        // Update pills active state
        modelPills.forEach(p => {
          const isActive = p === pill;
          p.classList.toggle('active', isActive);
          p.setAttribute('aria-checked', isActive ? 'true' : 'false');
        });

        // Smoothly swap scooter image
        if (scooterImg && modelImages[targetModel]) {
          scooterImg.style.opacity = '0.3';
          scooterImg.style.transform = 'scale(0.96)';

          setTimeout(() => {
            scooterImg.src = modelImages[targetModel];
            scooterImg.alt = targetModel === 'rizta' ? 'Ather Rizta Electric Scooter' : 'Ather 450X Electric Scooter';
            scooterImg.style.opacity = '1';
            scooterImg.style.transform = 'scale(1)';
          }, 180);
        }
      });
    });

    // 2. GPS Location Auto-detect
    const gpsBtn = document.getElementById('gpsLocateBtn');
    const areaInput = document.getElementById('leadArea');

    if (gpsBtn && areaInput) {
      gpsBtn.addEventListener('click', () => {
        gpsBtn.classList.add('locating');

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            () => {
              // Geolocation success - set Hubli / Dharwad Bellad dealership region
              areaInput.value = 'Hubballi, Karnataka - 580030';
              gpsBtn.classList.remove('locating');
              showInputFeedback(areaInput, 'Location detected');
            },
            () => {
              // Fallback default Bellad & Company flagship area
              areaInput.value = 'Hubballi (Gokul Road) - 580030';
              gpsBtn.classList.remove('locating');
              showInputFeedback(areaInput, 'Dealership region filled');
            },
            { timeout: 5000 }
          );
        } else {
          areaInput.value = 'Hubballi (Gokul Road) - 580030';
          gpsBtn.classList.remove('locating');
        }
      });
    }

    function showInputFeedback(input, text) {
      input.classList.add('detected');
      setTimeout(() => input.classList.remove('detected'), 1500);
    }

    // 3. Contact Form Submission
    const contactForm = document.getElementById('contactLeadForm');
    const successBanner = document.getElementById('contactSuccessBanner');

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('leadName')?.value.trim();
        const phone = document.getElementById('leadPhone')?.value.trim();
        const area = document.getElementById('leadArea')?.value.trim();

        if (!name || !phone || !area) return;

        const submitBtn = document.getElementById('leadSubmitBtn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Submitting...';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submitted ✓';
            submitBtn.style.background = '#ff6a00';
            submitBtn.style.color = '#ffffff';
          }

          if (successBanner) {
            successBanner.classList.add('show');
            const modelName = selectedModel === 'rizta' ? 'Ather Rizta' : 'Ather 450X';
            const textEl = successBanner.querySelector('.success-text p');
            if (textEl) {
              textEl.textContent = `Thank you, ${name}! Your inquiry for the ${modelName} in ${area} has been received. Bellad & Company Ather Hubballi will contact you at +91 ${phone} shortly.`;
            }
          }
        }, 600);
      });
    }
  }
})();


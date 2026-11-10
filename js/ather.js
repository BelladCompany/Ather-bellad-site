/**
 * ATHER ENERGY OFFICIAL WEBSITE REPLICA - INTERACTIVE SCRIPT
 * Handles FAQs, Lead Form, Mobile Menu, and Model Selector
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
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

  // 2. FAQ Accordion Toggle
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

  // Open the first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstBody = firstItem.querySelector('.faq-answer-body');
    firstItem.classList.add('active');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // 3. Disclaimer Accordion Toggle
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

  // 4. Contact / Lead Capture Form & Model Picker
  const modelBtns = document.querySelectorAll('.model-pick-btn');
  let selectedModel = 'Rizta';

  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedModel = btn.getAttribute('data-model') || 'Rizta';
    });
  });

  // GPS Auto-detect button
  const gpsBtn = document.getElementById('gpsLocateBtn');
  const areaInput = document.getElementById('leadArea');

  if (gpsBtn && areaInput) {
    gpsBtn.addEventListener('click', () => {
      gpsBtn.classList.add('locating');
      areaInput.placeholder = 'Locating area...';

      setTimeout(() => {
        gpsBtn.classList.remove('locating');
        areaInput.value = '580030, Hubballi';
        areaInput.style.borderColor = '#00d282';
      }, 700);
    });
  }

  // Form Submission
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
        }

        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.innerHTML = `<strong>Thank you, ${name}!</strong> Your request for the <strong>Ather ${selectedModel}</strong> in ${area} has been received. Bellad & Company Ather Hubballi will reach out to you shortly at +91 ${phone}.`;
        }
      }, 600);
    });
  }
});

// Boipelo Intervention Unit — shared behaviour

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Gallery lightbox
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  if (items.length && lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCap = lightbox.querySelector('.lightbox-cap');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = item.dataset.caption || img.alt || '';
        lightbox.classList.add('open');
      });
    });

    const closeLB = () => lightbox.classList.remove('open');
    closeBtn.addEventListener('click', closeLB);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });
  }

  // Contact form -> mailto handoff
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = document.querySelector('.form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const service = form.service.value;
      const message = form.message.value.trim();

      if (!name || !phone || !service) {
        if (status) {
          status.textContent = 'Please fill in your name, phone number and the service you need.';
          status.classList.add('show');
        }
        return;
      }

      const subject = encodeURIComponent(`Enquiry: ${service} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService interested in: ${service}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:info@boipeloiu.com?subject=${subject}&body=${body}`;

      if (status) {
        status.textContent = 'Opening your email app with this enquiry pre-filled. Prefer to talk now? Call 087 527 0957.';
        status.classList.add('show');
      }
    });
  }

});

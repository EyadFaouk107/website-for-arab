/**
 * forms.js
 * Contact form validation and submission feedback.
 */

export function initForms() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn?.textContent ?? 'Send Message';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ── Validate ───────────────────────────────────────────────
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      const isEmpty = !field.value.trim();
      field.classList.toggle('error', isEmpty);
      if (isEmpty) valid = false;
    });

    if (!valid) return;

    // ── Simulate submission ────────────────────────────────────
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    await new Promise(resolve => setTimeout(resolve, 1800));

    if (submitBtn) submitBtn.textContent = '✓ Message Sent!';
    form.reset();

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    }, 3000);
  });

  // Clear error state on input
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}

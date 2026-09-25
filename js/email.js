document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY');
  }

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitButton = this.querySelector('button');
    if (!submitButton) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    if (typeof emailjs === 'undefined') {
      alert('Email service is unavailable right now.');
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
      return;
    }

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => {
        alert('Message sent successfully!');
        contactForm.reset();
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to send message. Please try again.');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
  });
});

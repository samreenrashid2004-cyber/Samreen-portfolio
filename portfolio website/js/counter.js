document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');

  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.getAttribute('data-target') || 0);
      const speed = 200;
      const increment = Math.ceil(target / speed);

      const updateCounter = () => {
        const current = Number(counter.innerText);

        if (current < target) {
          counter.innerText = String(Math.min(current + increment, target));
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = String(target);
        }
      };

      updateCounter();
      observer.unobserve(counter);
    });
  }, {
    threshold: 0.5
  });

  counters.forEach((counter) => counterObserver.observe(counter));
});

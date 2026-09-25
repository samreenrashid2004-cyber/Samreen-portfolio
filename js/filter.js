document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || category === filterValue;

        card.style.opacity = shouldShow ? '1' : '0';
        card.style.transform = shouldShow ? 'scale(1)' : 'scale(0.9)';

        setTimeout(() => {
          card.style.display = shouldShow ? 'block' : 'none';
        }, shouldShow ? 0 : 300);
      });
    });
  });
});

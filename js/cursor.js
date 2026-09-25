const cursor = document.querySelector('.cursor');

if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  const hoverItems = document.querySelectorAll('a, button, .btn, .project-card, .service-card, .skill-card');

  hoverItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      cursor.style.width = '35px';
      cursor.style.height = '35px';
    });

    item.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
    });
  });
}

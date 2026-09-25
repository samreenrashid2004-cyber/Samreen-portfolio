const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
  if (!progressBar) return;

  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateProgressBar);
window.addEventListener('load', updateProgressBar);
window.addEventListener('resize', updateProgressBar);
document.addEventListener('DOMContentLoaded', updateProgressBar);

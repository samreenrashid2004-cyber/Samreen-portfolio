const typingElement = document.querySelector('.typing');

const words = [
  'Frontend Developer',
  'Full Stack Java Developer',
  'Web Designer',
  'Freelancer'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else {
      typingSpeed = 120;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 300;
    } else {
      typingSpeed = 60;
    }
  }

  setTimeout(typeEffect, typingSpeed);
}

window.addEventListener('load', () => {
  typeEffect();
});

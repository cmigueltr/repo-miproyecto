const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

// Configurar posiciones iniciales
slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Soporte para gestos táctiles
carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe derecha
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    } else {
      // Swipe izquierda
      currentSlide = (currentSlide + 1) % slides.length;
    }
    updateSlides();
  }
}

// Autoplay con pausa en hover y touch
let autoplayInterval = setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}, 5000);

function pauseAutoplay() {
  clearInterval(autoplayInterval);
}

function resumeAutoplay() {
  autoplayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }, 5000);
}

carousel.addEventListener('mouseenter', pauseAutoplay);
carousel.addEventListener('mouseleave', resumeAutoplay);
carousel.addEventListener('touchstart', pauseAutoplay);
carousel.addEventListener('touchend', resumeAutoplay);

document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlides();
  });
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = e.target;
  if (form.checkValidity()) {
      alert('Formulario enviado correctamente');
      form.reset();
  }
});
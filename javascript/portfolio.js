document.addEventListener('DOMContentLoaded', function() {
    // Inicializar cada carrusel
    document.querySelectorAll('.carousel-container2').forEach((container, containerIndex) => {
      const carousel = container.querySelector('.carousel2');
      const items = container.querySelectorAll('.carousel-item2');
      const prevButton = container.querySelector('.prev-button');
      const nextButton = container.querySelector('.next-button');
      const dots = container.querySelectorAll('.dot');
      
      let currentIndex = 0;
      
      function getItemsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
      }
      
      function updateCarousel() {
        const itemWidth = carousel.offsetWidth / getItemsPerView();
        carousel.scrollLeft = currentIndex * itemWidth;
        
        // Actualizar dots
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar estado de los botones
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = 
          currentIndex >= items.length - getItemsPerView() ? '0.5' : '1';
      }
      
      prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
      
      nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - getItemsPerView()) {
          currentIndex++;
          updateCarousel();
        }
      });
      
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentIndex = index;
          updateCarousel();
        });
      });
      
      // Inicializar el carrusel
      updateCarousel();
      
      // Actualizar en cambios de tamaño de ventana
      window.addEventListener('resize', updateCarousel);
    });
  });
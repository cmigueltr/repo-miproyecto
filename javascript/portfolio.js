document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.carousel-container2').forEach((container, containerIndex) => {
      const carousel = container.querySelector('.carousel2');
      const items = container.querySelectorAll('.carousel-item2');
      const prevButton = container.querySelector('.prev-button');
      const nextButton = container.querySelector('.next-button');
      const dots = container.querySelectorAll('.dot');
      
      let currentIndex = 0;
      let startX;
      let currentX;
      let isDragging = false;
      let startScrollLeft;
  
      function getItemsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
      }
      
      function updateCarousel() {
        const itemWidth = carousel.offsetWidth / getItemsPerView();
        carousel.scrollLeft = currentIndex * itemWidth;
        
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
        
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = 
          currentIndex >= items.length - getItemsPerView() ? '0.5' : '1';
      }
  
      // Eventos táctiles y de mouse
      function handleDragStart(e) {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
      }
  
      function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        carousel.scrollLeft = startScrollLeft - diff;
      }
  
      function handleDragEnd(e) {
        isDragging = false;
        carousel.classList.remove('dragging');
        
        if (!currentX) return;
        
        const moveDistance = currentX - startX;
        const itemWidth = carousel.offsetWidth / getItemsPerView();
        
        // Determinar si el swipe fue suficiente para cambiar de slide
        if (Math.abs(moveDistance) > itemWidth / 4) {
          if (moveDistance > 0 && currentIndex > 0) {
            currentIndex--;
          } else if (moveDistance < 0 && currentIndex < items.length - getItemsPerView()) {
            currentIndex++;
          }
        }
        
        updateCarousel();
        currentX = null;
      }
  
      // Event listeners para touch
      carousel.addEventListener('touchstart', handleDragStart);
      carousel.addEventListener('touchmove', handleDragMove);
      carousel.addEventListener('touchend', handleDragEnd);
  
      // Event listeners para mouse (opcional, para testing en desktop)
      carousel.addEventListener('mousedown', handleDragStart);
      carousel.addEventListener('mousemove', handleDragMove);
      carousel.addEventListener('mouseup', handleDragEnd);
      carousel.addEventListener('mouseleave', handleDragEnd);
  
      // Prevenir el comportamiento por defecto del arrastre de imágenes
      carousel.addEventListener('dragstart', (e) => e.preventDefault());
      
      // Botones de navegación
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
      
      window.addEventListener('resize', updateCarousel);
      updateCarousel();
    });
  });
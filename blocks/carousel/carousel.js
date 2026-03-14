export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  let currentSlide = 0;

  block.classList.add('carousel-wrapper');

  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide) => {
    slide.classList.add('carousel-slide');
    track.appendChild(slide);
  });

  block.innerHTML = '';
  block.appendChild(track);

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-btn carousel-btn-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.innerHTML = '&#8249;';

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-btn carousel-btn-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = '&#8250;';

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-dots';

  const dots = slides.map((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot';
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  prevButton.addEventListener('click', () => {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    updateCarousel();
  });

  block.appendChild(prevButton);
  block.appendChild(nextButton);
  block.appendChild(dotsWrap);

  updateCarousel();
}
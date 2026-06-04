
const track = document.getElementById('coverTrack');
const slides = Array.from(document.querySelectorAll('.cover-slide'));
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevCover');
const nextBtn = document.getElementById('nextCover');
const readCurrent = document.getElementById('readCurrent');
let current = 0;
let autoTimer;
let touchStartX = 0;

function makeDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to cover ${index + 1}`);
    dot.addEventListener('click', () => {
      current = index;
      updateCarousel();
      restartAuto();
    });
    dotsWrap.appendChild(dot);
  });
}

function updateCarousel() {
  track.style.transform = `translateX(-${current * 100}%)`;
  const dots = Array.from(dotsWrap.children);
  dots.forEach((dot, index) => dot.classList.toggle('active', index === current));
  slides.forEach((slide, index) => slide.classList.toggle('active', index === current));
  readCurrent.href = slides[current].href;
  readCurrent.textContent = `Read ${slides[current].dataset.title}`;
}

function goNext() {
  current = (current + 1) % slides.length;
  updateCarousel();
}

function goPrev() {
  current = (current - 1 + slides.length) % slides.length;
  updateCarousel();
}

function restartAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(goNext, 4200);
}

if (track && slides.length) {
  makeDots();
  updateCarousel();
  restartAuto();
  nextBtn?.addEventListener('click', () => { goNext(); restartAuto(); });
  prevBtn?.addEventListener('click', () => { goPrev(); restartAuto(); });
  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', restartAuto);
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) goNext();
    if (diff < 0) goPrev();
    restartAuto();
  }, { passive: true });
}

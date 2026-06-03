
const cover = document.getElementById("cover");
const reader = document.getElementById("reader");
const startBtn = document.getElementById("startBtn");
const homeBtn = document.getElementById("homeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageImage = document.getElementById("pageImage");
const pageCounter = document.getElementById("pageCounter");

let currentPage = 0;

function showCover() {
  reader.classList.remove("active");
  cover.classList.add("active");
}

function showReader() {
  cover.classList.remove("active");
  reader.classList.add("active");
  renderPage();
}

function renderPage() {
  const page = BOOK_PAGES[currentPage];
  pageImage.src = page.image;
  pageImage.alt = page.text;
  pageCounter.textContent = `Page ${currentPage + 1} of ${BOOK_PAGES.length}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.textContent = currentPage === BOOK_PAGES.length - 1 ? "Done" : "Next";
}

startBtn.addEventListener("click", () => {
  currentPage = 0;
  showReader();
});

homeBtn.addEventListener("click", showCover);

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < BOOK_PAGES.length - 1) {
    currentPage++;
    renderPage();
  } else {
    showCover();
  }
});

document.addEventListener("keydown", (event) => {
  if (!reader.classList.contains("active")) return;
  if (event.key === "ArrowRight") nextBtn.click();
  if (event.key === "ArrowLeft") prevBtn.click();
  if (event.key === "Escape") showCover();
});

let touchStartX = 0;
reader.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

reader.addEventListener("touchend", e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) < 55) return;
  if (diff > 0) nextBtn.click();
  if (diff < 0) prevBtn.click();
}, { passive: true });

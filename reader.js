
document.title = BOOK_TITLE;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageImage = document.getElementById("pageImage");
const storyTextBox = document.getElementById("storyTextBox");
const pageText = document.getElementById("pageText");
const showPageText = typeof SHOW_PAGE_TEXT !== "undefined" ? SHOW_PAGE_TEXT : false;
if (showPageText) {
  document.body.classList.add("has-page-text");
  if (storyTextBox) storyTextBox.style.display = "block";
} else {
  if (storyTextBox) storyTextBox.style.display = "none";
}
let currentPage = 0;
function renderPage() {
  const page = BOOK_PAGES[currentPage];
  pageImage.src = page.image;
  pageImage.alt = page.text;
  if (showPageText && pageText) pageText.textContent = page.text || "";
  prevBtn.disabled = currentPage === 0;
  nextBtn.textContent = currentPage === BOOK_PAGES.length - 1 ? "Done" : "Next";
}
prevBtn.addEventListener("click", () => { if (currentPage > 0) { currentPage--; renderPage(); } });
nextBtn.addEventListener("click", () => { if (currentPage < BOOK_PAGES.length - 1) { currentPage++; renderPage(); } else { window.location.href = "../../index.html"; } });
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextBtn.click();
  if (event.key === "ArrowLeft") prevBtn.click();
  if (event.key === "Escape") window.location.href = "../../index.html";
});
let touchStartX = 0;
document.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
document.addEventListener("touchend", e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) < 55) return;
  if (diff > 0) nextBtn.click();
  if (diff < 0) prevBtn.click();
}, { passive: true });
renderPage();

const carousel = document.querySelector("[data-featured]");

if (carousel) {
  const slides = [...carousel.querySelectorAll("[data-slide]")];
  const controls = carousel.querySelector("[data-controls]");
  const selectors = [...carousel.querySelectorAll("[data-select]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let timer;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, index) => { slide.hidden = index !== current; });
    selectors.forEach((button, index) => {
      if (index === current) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  function updateTimer() {
    clearInterval(timer);
    if (slides.length > 1 && !reducedMotion.matches && !document.hidden &&
        !slides.some((slide) => slide.contains(document.activeElement))) {
      timer = setInterval(() => show(current + 1), 4000);
    }
  }

  show(0);
  if (slides.length > 1) {
    controls.hidden = false;
    function select(index) { show(index); updateTimer(); }
    carousel.querySelector("[data-previous]").addEventListener("click", () => select(current - 1));
    carousel.querySelector("[data-next]").addEventListener("click", () => select(current + 1));
    selectors.forEach((button, index) => button.addEventListener("click", () => select(index)));
  }
  carousel.addEventListener("focusin", updateTimer);
  carousel.addEventListener("focusout", () => setTimeout(updateTimer, 0));
  document.addEventListener("visibilitychange", updateTimer);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) show(0);
    updateTimer();
  });
  updateTimer();
}

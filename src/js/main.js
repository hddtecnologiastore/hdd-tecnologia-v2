/* HDD V2 — Módulos ES importados */
import { initPreloader } from "./preloader.js";
import { initScroll } from "./scroll.js";
import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { initCursor } from "./cursor.js";
import { initCanvas } from "./canvas.js";
import { initTyping } from "./typing.js";
import { initTerminal } from "./terminal.js";
import { initTilt } from "./tilt.js";
import { initCounters } from "./counters.js";
import { initMarquee } from "./marquee.js";
import { initProducts } from "./products.js";
import { initModals } from "./modals.js";
import { initReviews } from "./reviews.js";

function boot() {
  initPreloader();
  initScroll();
  initNav();
  initReveal();
  initCursor();
  initCanvas();
  initTyping();
  initTerminal();
  initTilt();
  initCounters();
  initMarquee();
  initProducts();
  initModals();
  initReviews();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
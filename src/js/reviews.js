"use strict";

import { $, $$ } from "./utils.js";

export function initReviews() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tr = $("#revTrack");
  if (!tr || !window.HDD_REVIEWS) return;

  const dots = $("#revDots");
  const count = $("#revCount");
  const prev = $("#revPrev");
  const next = $("#revNext");
  const box = $("#revBox");
  const gm = window.HDD_GMAPS || "#resenas";

  const slides = window.HDD_REVIEWS.map((r) => `
    <article class="rev">
      <div class="rev-stars">★★★★★</div>
      <p>“${esc(r.t)}”</p>
      <footer>
        <span class="rev-av">${r.n.charAt(0)}</span>
        <span><b>${esc(r.n)}</b><small>${esc(r.d)}</small></span>
      </footer>
    </article>`
  ).join("");

  const ctaSlide = `
    <article class="rev rev-cta">
      <div class="rev-stars">★★★★★</div>
      <p>¿Ya confiaste tu equipo? Súmate en Google.</p>
      <footer>
        <a class="btn primary" target="_blank" rel="noopener" href="${gm}">Dejar reseña en Google →</a>
      </footer>
    </article>`;

  const allSlides = slides + ctaSlide;
  tr.innerHTML = allSlides;

  const total = window.HDD_REVIEWS.length + 1;
  let idx = 0;
  let timer = null;
  const DUR = 4500;

  function paint() {
    tr.style.transform = `translateX(-${idx * 100}%)`;
    const ds = dots.children;
    for (let i = 0; i < ds.length; i++) {
      ds[i].className = i === idx ? "on" : "";
      if (i === idx && !reduced) {
        const f = ds[i].querySelector("i");
        if (f) {
          f.style.animation = "none";
          void f.offsetWidth;
          f.style.animation = "";
        }
      }
    }
    if (count) count.textContent = (idx + 1) + " / " + total;
    tr.setAttribute("aria-live", "polite");
  }

  function buildDots() {
    dots.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const d = document.createElement("button");
      d.setAttribute("aria-label", `Ir a reseña ${i + 1}`);
      d.innerHTML = "<i></i>";
      (function (k) {
        d.addEventListener("click", () => { go(k); restart(); });
      })(i);
      dots.appendChild(d);
    }
  }

  function go(n) {
    idx = ((n % total) + total) % total;
    paint();
  }

  function restart() {
    stop();
    if (!reduced) timer = setInterval(() => go(idx + 1), DUR);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  buildDots();
  paint();
  restart();

  if (next) next.addEventListener("click", () => { go(idx + 1); restart(); });
  if (prev) prev.addEventListener("click", () => { go(idx - 1); restart(); });

  if (box) {
    box.addEventListener("mouseenter", stop);
    box.addEventListener("mouseleave", restart);
    box.addEventListener("focusin", stop);
    box.addEventListener("focusout", restart);

    let sx = 0;
    box.addEventListener("touchstart", (e) => {
      sx = e.touches[0].clientX;
      stop();
    }, { passive: true });

    box.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      restart();
    }, { passive: true });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const r = box ? box.getBoundingClientRect() : null;
    if (r && r.top < innerHeight && r.bottom > 0) {
      go(idx + (e.key === "ArrowRight" ? 1 : -1));
      restart();
    }
  });
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
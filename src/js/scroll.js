"use strict";

import { $ } from "./utils.js";

export function initScroll() {
  const bar = $("#progress");
  const topBtn = $("#top");
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onScroll() {
    const h = document.documentElement;
    const sc = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    if (bar) bar.style.width = (sc * 100) + "%";
    if (topBtn) topBtn.classList.toggle("show", h.scrollTop > 600);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }
}
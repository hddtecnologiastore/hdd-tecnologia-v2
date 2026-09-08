"use strict";

import { $ } from "./utils.js";

export function initTilt() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const card = $("#tiltCard");

  if (!card || reduced || !window.matchMedia("(pointer:fine)").matches) return;

  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
}
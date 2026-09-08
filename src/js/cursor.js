"use strict";

import { $, $$ } from "./utils.js";

export function initCursor() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cur = $("#cursor");

  if (!cur) return;

  if (window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    }, { passive: true });

    $$("a, button, .svc, .p-card").forEach((el) => {
      el.addEventListener("mouseenter", () => { cur.classList.add("big"); });
      el.addEventListener("mouseleave", () => { cur.classList.remove("big"); });
    });
  } else {
    cur.style.display = "none";
  }
}
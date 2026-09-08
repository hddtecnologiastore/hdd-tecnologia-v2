"use strict";

import { $, $$ } from "./utils.js";

export function initReveal() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  $$("[data-reveal]").forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}
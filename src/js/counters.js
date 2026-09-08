"use strict";

import { $, $$ } from "./utils.js";

export function initCounters() {
  const els = $$("[data-count]");
  if (!els.length) return;

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const end = parseInt(el.getAttribute("data-count"), 10);
        const suf = el.getAttribute("data-suffix") || "";
        let t0 = null;

        function st(t) {
          if (!t0) t0 = t;
          const pr = Math.min(1, (t - t0) / 1400);
          const v = Math.floor(
            end * (pr < 0.5 ? 2 * pr * pr : 1 - Math.pow(-2 * pr + 2, 2) / 2)
          );
          el.textContent = v.toLocaleString("es-CL") + suf;
          if (pr < 1) requestAnimationFrame(st);
        }

        if (reduced) {
          el.textContent = end.toLocaleString("es-CL") + suf;
        } else {
          requestAnimationFrame(st);
        }
      });
    },
    { threshold: 0.4 }
  );

  els.forEach((el) => io.observe(el));
}
"use strict";

import { $, $$ } from "./utils.js";

export function initPreloader() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pre = $("#preloader");
  if (!pre) return;

  const pf = $("#preFill");
  const pt = $("#preTxt");

  if (pre && !reduced) {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.random() * 22);
      if (pf) pf.style.width = p + "%";
      if (pt) pt.textContent = `Iniciando sistema… ${Math.floor(p)}%`;
      if (p >= 100) {
        clearInterval(iv);
        pre.classList.add("done");
        setTimeout(() => { pre.remove(); }, 500);
      }
    }, 140);
  } else if (pre) {
    pre.classList.add("done");
    setTimeout(() => { pre.remove(); }, 100);
  }
}
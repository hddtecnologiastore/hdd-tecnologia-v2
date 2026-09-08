"use strict";

import { $ } from "./utils.js";

export function initTyping() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = $("#typing");

  if (!el) return;

  const w = ["garantía real", "diagnóstico honesto", "atención personalizada"];
  let i = 0, j = 0, del = false;

  function t() {
    const s = w[i];
    if (!del) {
      j++;
      el.textContent = s.slice(0, j);
      if (j === s.length) {
        del = true;
        setTimeout(t, 1300);
        return;
      }
    } else {
      j--;
      el.textContent = s.slice(0, j);
      if (j === 0) {
        del = false;
        i = (i + 1) % w.length;
      }
    }
    setTimeout(t, del ? 45 : 110);
  }

  if (!reduced) t();
  else el.textContent = w[0];
}
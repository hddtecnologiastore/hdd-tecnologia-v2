"use strict";

import { $ } from "./utils.js";

export function initTerminal() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const box = $("#termLines");
  if (!box) return;

  const lines = [
    "> diagnóstico y reparación… OK",
    "> limpieza + pasta térmica CPU/GPU",
    "> todas las marcas",
    "> batería: informar estado real",
    "> coordinación por WhatsApp",
  ];
  let k = 0;

  function n() {
    if (k >= lines.length) return;
    const d = document.createElement("div");
    d.className = "ln";
    d.textContent = lines[k++];
    box.appendChild(d);
    setTimeout(n, reduced ? 0 : 650);
  }

  n();
}
"use strict";

import { $ } from "./utils.js";

export function initCanvas() {
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const c = $("#net");

  if (!c || reduced) return;

  const x = c.getContext("2d");
  const pts = [];
  let W, H;

  function rs() {
    c.width = innerWidth;
    c.height = innerHeight;
    W = c.width;
    H = c.height;
  }

  rs();
  window.addEventListener("resize", rs);

  for (let i = 0; i < 70; i++) {
    pts.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }

  (function loop() {
    x.clearRect(0, 0, W, H);
    pts.forEach((a) => {
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
      x.fillStyle = "rgba(56,189,248,.7)";
      x.beginPath();
      x.arc(a.x, a.y, 1.4, 0, 7);
      x.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i];
        const b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = dx * dx + dy * dy;
        if (d < 13000) {
          x.strokeStyle = `rgba(56,189,248,${0.16 * (1 - d / 13000)})`;
          x.beginPath();
          x.moveTo(a.x, a.y);
          x.lineTo(b.x, b.y);
          x.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  })();
}
"use strict";

import { $, $$ } from "./utils.js";

export function initModals() {
  function openM(id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.add("open");
      m.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeM(m) {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $$("[data-open]").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.getAttribute("data-open");
      if (b.getAttribute("data-svc")) {
        const s = $("#svcType");
        if (s) s.value = b.getAttribute("data-svc");
      }
      openM(id);
    });
  });

  $$(".ov").forEach((m) => {
    m.addEventListener("click", (e) => {
      if (e.target === m) closeM(m);
    });
  });

  $$("[data-close]").forEach((b) => {
    b.addEventListener("click", () => {
      closeM(b.closest(".ov"));
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".ov.open").forEach(closeM);
  });
}
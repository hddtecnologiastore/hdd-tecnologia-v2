"use strict";

import { $, $$ } from "./utils.js";

export function initNav() {
  const burger = $("#burger");
  const nav = $("#nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  $$("#nav a").forEach((a) => {
    a.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
    });
  });
}
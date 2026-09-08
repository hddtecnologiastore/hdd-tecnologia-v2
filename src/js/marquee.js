"use strict";

import { $ } from "./utils.js";

export function initMarquee() {
  const m = $("#mq");
  if (m) m.textContent = m.textContent + m.textContent;
}
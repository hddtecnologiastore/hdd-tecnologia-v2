"use strict";

function $(s, c) {
  return (c || document).querySelector(s);
}

function $$(s, c) {
  return Array.prototype.slice.call((c || document).querySelectorAll(s));
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function toast(m) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = m;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(function() { t.classList.remove("show"); }, 2600);
}

export { esc, toast, $, $$ };
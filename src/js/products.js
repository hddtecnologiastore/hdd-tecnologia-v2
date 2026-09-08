"use strict";

import { esc, $, $$ } from "./utils.js";

export function initProducts() {
  const grid = $("#catGrid");
  if (!grid || !window.HDD_PRODUCTS) return;

  function norm(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function validQ(s) {
    if (!s) return true;
    s = String(s);
    if (s.length > 100) return false;
    if (/[<>"'`.]/.test(s)) return false;
    return /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ \-\.,"]+$/i.test(s) || /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ \-\.,]+$/.test(s);
  }

  function list() {
    const queryEl = $("#q");
    const query = (queryEl ? queryEl.value : "") || "";
    if (query && !validQ(query)) {
      if (queryEl) queryEl.style.borderColor = "#f87171";
      return window.HDD_PRODUCTS.slice();
    }
    if (queryEl) queryEl.style.borderColor = "";
    const bEl = $("#fBrand");
    const rEl = $("#fRam");
    const b = bEl ? bEl.value : "";
    const r = rEl ? rEl.value : "";
    const qn = norm(query);

    const L = window.HDD_PRODUCTS.filter((pr) => {
      if (b && pr.brand !== b) return false;
      if (r && !(pr.ram || "").startsWith(r)) return false;
      if (qn && norm(pr.name + " " + pr.cpu + " " + pr.ram + " " + pr.disk + " " + pr.desc).indexOf(qn) < 0) return false;
      return true;
    });

    const sortEl = $("#fSort");
    if (sortEl && sortEl.value === "asc") L.sort((a, b2) => a.price - b2.price);
    if (sortEl && sortEl.value === "desc") L.sort((a, b2) => b2.price - a.price);

    return L;
  }

  function stars(n) {
    let s = "";
    for (let i = 1; i <= 5; i++) s += i <= n ? "★" : "☆";
    return s;
  }

  function render() {
    const L = list();
    const ct = $("#count");
    const gridEl = $("#catGrid");
    const emp = $("#empty");
    const cmp = $("#cmp");
    const cmpl = $("#cmpList");

    if (ct) ct.textContent = L.length + " equipo(s) · precios claros, garantía incluida";

    if (gridEl) {
      gridEl.innerHTML = L.map((pr) => {
        const specs = [pr.cpu, pr.ram, pr.disk, pr.screen]
          .concat(pr.extra || [])
          .map((s) => `<span>${esc(s)}</span>`)
          .join("");
        return `<article class="p-card hover-glow">
          <div class="p-top">
            <span class="p-brand">${esc(pr.brand)} · ${esc(pr.tag)}</span>
            <span class="p-stars">${stars(pr.stars)}</span>
          </div>
          <h3>${esc(pr.name)}</h3>
          <div class="specs">${specs}</div>
          <p class="p-desc">${esc(pr.desc)}</p>
          <div class="p-note">⛨ ${esc(pr.note)}</div>
          <div class="prices">
            <div class="price tr"><small>TRANSFERENCIA</small><b>${esc(pr.pTrans)}</b></div>
            <div class="price cd"><small>DÉBITO / CRÉDITO</small><b>${esc(pr.pCard)}</b></div>
          </div>
          <a class="p-wa" target="_blank" rel="noopener" href="https://wa.me/${window.HDD_WA}?text=${pr.wa}">Consultar por WhatsApp →</a>
        </article>`;
      }).join("");
    }

    if (emp) emp.hidden = L.length !== 0;
    if (cmp) {
      cmp.hidden = L.length < 2;
      if (cmpl && cmp.hidden === false) {
        const srt = L.slice().sort((a, b) => a.price - b.price);
        cmpl.innerHTML = srt.map((pr, i) => `<div class="cmp-row ${i === 0 ? "best" : ""}">
          <span>${esc(pr.name)}</span><b>${esc(pr.pTrans)}${i === 0 ? " ★ mejor" : ""}</b>
        </div>`).join("");
      }
    }
  }

  const inputs = [$("#q"), $("#fBrand"), $("#fRam"), $("#fSort")];
  inputs.forEach((el) => {
    if (el) {
      el.addEventListener("input", render);
      el.addEventListener("change", render);
    }
  });

  render();
}
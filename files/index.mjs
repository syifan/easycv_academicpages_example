const S = ["phone", "email", "website"], y = (e) => typeof e == "string" && e.trim().length > 0, D = (e) => /\bfa-[\w-]+/i.test(e), M = (e) => {
  if (y(e)) {
    const t = e.trim();
    if (D(t))
      return { type: "fontawesome", value: t };
  }
  return null;
}, w = (e) => /^https?:\/\//i.test(e) ? e : `https://${e}`, h = (e) => Array.isArray(e) ? e : [], O = (e) => e && typeof e == "object" && !Array.isArray(e) && typeof e.html == "string", A = (e) => e && typeof e == "object" && !Array.isArray(e) && typeof e.html == "string", C = (e) => e == null ? !1 : A(e) ? e.html.trim().length > 0 : typeof e == "boolean" ? !0 : String(e).trim().length > 0, g = (e) => y(e) ? e.trim() : "", j = (e, t) => {
  if (y(t)) {
    const n = t.trim();
    return {
      key: e,
      value: n,
      displayValue: n,
      icon: null,
      href: e === "email" ? `mailto:${n}` : e === "website" ? w(n) : void 0
    };
  }
  if (t && typeof t == "object" && !Array.isArray(t)) {
    const n = g(t.value);
    if (!n)
      return null;
    const r = {
      key: e,
      value: n,
      displayValue: g(t.display) || n,
      href: g(t.href) || void 0,
      icon: y(t.icon) ? M(t.icon) : null
    };
    return r.href || (e === "email" ? r.href = `mailto:${n}` : e === "website" && (r.href = w(n))), typeof t.newTab == "boolean" && (r.openInNewTab = t.newTab), y(t.label) && (r.label = t.label.trim()), r;
  }
  return null;
}, H = (e) => {
  if (!e || typeof e != "object" || Array.isArray(e))
    return [];
  const t = [], n = /* @__PURE__ */ new Set(), r = (o) => {
    if (n.has(o))
      return;
    n.add(o);
    const i = j(o, e[o]);
    i && t.push(i);
  };
  return S.forEach(r), Object.keys(e).forEach((o) => {
    n.has(o) || r(o);
  }), t;
}, s = (e, { className: t, attrs: n } = {}) => {
  const r = document.createElement(e);
  return t && (r.className = t), n && Object.entries(n).forEach(([o, i]) => {
    i != null && r.setAttribute(o, i);
  }), r;
}, I = (e) => !e || e.type !== "fontawesome" ? null : s("span", {
  className: `contact-icon fa-fw ${e.value}`,
  attrs: { "aria-hidden": "true" }
}), $ = (e) => {
  const t = s("div", {
    className: "contact-item"
  }), n = I(e.icon);
  n && t.appendChild(n);
  const r = e.displayValue ?? e.value ?? "";
  if (e.href) {
    const o = s("a", {
      attrs: {
        href: e.href,
        target: e.openInNewTab ? "_blank" : void 0,
        rel: e.openInNewTab ? "noreferrer" : void 0
      }
    });
    o.textContent = r, t.appendChild(o);
  } else {
    const o = document.createElement("span");
    o.textContent = r, t.appendChild(o);
  }
  return t;
}, B = (e) => {
  if (!Array.isArray(e) || e.length === 0)
    return null;
  const t = s("p", { className: "tagline" });
  return e.forEach((n, r) => {
    const o = document.createElement("span");
    o.textContent = String(n), t.appendChild(o), r < e.length - 1 && t.appendChild(document.createElement("br"));
  }), t;
}, F = (e, t) => {
  const n = s("header", { className: "cv-header" }), r = document.createElement("div"), o = document.createElement("h1");
  o.textContent = e.name ?? "", r.appendChild(o);
  const i = B(Array.isArray(e.tags) ? e.tags : []);
  if (i && r.appendChild(i), n.appendChild(r), t.length > 0) {
    const d = s("div", { className: "contact" });
    t.forEach(
      (c) => d.appendChild($(c))
    ), n.appendChild(d);
  }
  return n;
}, T = (e) => {
  if (e == null)
    return null;
  if (O(e)) {
    const n = s("p", { className: "list-heading" });
    return n.innerHTML = e.html, n;
  }
  const t = s("p", { className: "list-heading" });
  return t.textContent = String(e), t;
}, b = (e, { strong: t = !1 } = {}) => {
  if (!C(e))
    return null;
  if (A(e)) {
    const o = document.createElement("span");
    return o.innerHTML = e.html, o;
  }
  const n = document.createTextNode(String(e));
  if (!t) {
    const o = document.createElement("span");
    return o.appendChild(n), o;
  }
  const r = document.createElement("strong");
  return r.appendChild(n), r;
}, P = (e, t) => {
  const n = h(e?.content ?? []), r = h(e?.meta ?? []), o = C(e?.index), i = r.some(C), d = Math.max(
    n.length,
    i ? r.length : 0,
    o ? 1 : 0
  );
  if (d === 0)
    return null;
  const c = document.createDocumentFragment();
  for (let a = 0; a < d; a += 1) {
    const f = document.createElement("tr"), u = [];
    if (a === 0 && u.push("entry-start"), t && u.push("condensed-row"), f.className = u.filter(Boolean).join(" "), o) {
      const l = s("td", { className: "hanging-cell" });
      if (a === 0) {
        const p = b(e.index);
        p && l.appendChild(p);
      }
      f.appendChild(l);
    }
    if (i) {
      const l = s("td", { className: "right-cell" }), p = r[a];
      if (C(p)) {
        const m = b(p);
        m && l.appendChild(m);
      }
      f.appendChild(l);
    }
    if (t) {
      if (a === 0) {
        const l = s("td", { className: "left-cell" });
        l.setAttribute("rowspan", String(d)), n.forEach((p, m) => {
          if (!C(p))
            return;
          const E = s("span", {
            className: m === 0 ? "left-header-span" : "left-entry-span"
          }), N = b(p, {
            strong: m === 0
          });
          N && (E.appendChild(N), l.appendChild(E));
        }), f.appendChild(l);
      }
    } else {
      const l = n[a], p = document.createElement("td");
      a === 0 && C(l) && (p.className = "left-header");
      const m = b(l, {
        strong: a === 0
      });
      m && p.appendChild(m), f.appendChild(p);
    }
    c.appendChild(f);
  }
  return c;
}, x = (e, t) => {
  const n = s("table", { className: "cv-table" }), r = document.createElement("tbody");
  return e.forEach((o) => {
    const i = P(o, t);
    i && r.appendChild(i);
  }), n.appendChild(r), n;
}, _ = (e) => {
  const t = s("div", { className: "subsection" });
  e.id && (t.id = e.id);
  const n = document.createElement("h3");
  n.textContent = e.title ?? "", t.appendChild(n), h(e.meta).forEach((i) => {
    const d = T(i);
    d && t.appendChild(d);
  });
  const o = h(e.entries);
  return o.length > 0 && t.appendChild(x(o, !!e.condensed)), t;
}, q = (e) => {
  if (!e)
    return null;
  const t = s("section", {
    className: "cv-section",
    attrs: {
      id: e.id || void 0,
      "aria-label": e.title || void 0
    }
  }), n = s("header", { className: "section-header" }), r = document.createElement("h2");
  r.textContent = e.title ?? "", n.appendChild(r), t.appendChild(n), h(e.meta).forEach((c) => {
    const a = T(c);
    a && t.appendChild(a);
  });
  const i = h(e.entries);
  return i.length > 0 && t.appendChild(
    x(i, !!e.condensed)
  ), h(e.subsections).forEach((c) => {
    const a = _(c);
    t.appendChild(a);
  }), t;
}, R = () => {
  const e = s("footer", { className: "template-attribution" });
  return e.innerHTML = 'CV template provided by <a href="https://sarchlab.org/syifan" target="_blank" rel="noreferrer">Yifan Sun</a>. Template can be found at <a href="https://github.com/syifan/easycv" target="_blank" rel="noreferrer">https://github.com/syifan/easycv</a>.', e;
};
let v = 0;
const W = () => (v += 1, `easycv-${Date.now().toString(36)}-${v.toString(
  36
)}`), k = (e) => {
  const t = s("div", {
    className: "floating-actions",
    attrs: { "aria-label": "page controls" }
  }), n = s("button", {
    className: "action-button",
    attrs: { type: "button" }
  });
  n.textContent = "Back to Top", n.addEventListener("click", () => {
    typeof window < "u" && typeof window.scrollTo == "function" && window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const r = s("button", {
    className: "action-button",
    attrs: { type: "button" }
  });
  return r.textContent = "Download PDF", r.addEventListener("click", () => {
    if (typeof window > "u" || typeof document > "u")
      return;
    const o = document.body, i = () => {
      o.classList.add("easycv-print-cv-only"), e && o.setAttribute("data-easycv-print-id", e);
    }, d = () => {
      o.classList.remove("easycv-print-cv-only"), e && o.getAttribute("data-easycv-print-id") === e && o.removeAttribute("data-easycv-print-id");
    };
    i();
    const c = window.matchMedia ? window.matchMedia("print") : null, a = (f) => {
      f.matches || d();
    };
    c && (c.addEventListener ? c.addEventListener("change", a) : c.addListener && c.addListener(a)), typeof window.print == "function" && window.print(), setTimeout(d, 1500);
  }), t.appendChild(n), t.appendChild(r), t;
}, L = (e, { includeActions: t = !0 } = {}) => {
  const n = s("div", { className: "cv-container" }), r = s("div", { className: "cv-page" }), o = W();
  n.dataset.easycvPrintId = o;
  const i = e?.header ?? { name: "" }, d = h(e?.sections), c = H(i.contact);
  r.appendChild(F(i, c));
  const a = document.createElement("main");
  return d.forEach((f) => {
    const u = q(f);
    u && a.appendChild(u);
  }), r.appendChild(a), n.appendChild(r), n.appendChild(R()), t && n.appendChild(k(o)), {
    element: n,
    headerName: g(i?.name)
  };
}, z = (e) => {
  if (typeof document > "u")
    throw new Error("renderCv requires a DOM-like environment");
  if (typeof e == "string") {
    const t = document.querySelector(e);
    if (!t)
      throw new Error(`No element matches selector: ${e}`);
    return t;
  }
  if (e && typeof e.appendChild == "function")
    return e;
  throw new TypeError("renderCv expects a DOM element or selector string");
}, K = (e, t = "%s - Curriculum Vitae") => {
  if (!(!e || typeof document > "u")) {
    if (t && t.includes("%s")) {
      document.title = t.replace("%s", e);
      return;
    }
    if (t) {
      document.title = t;
      return;
    }
    document.title = e;
  }
}, Q = (e, t = {}) => L(e, { includeActions: t.actions !== !1 }).element, Y = (e, t, n = {}) => {
  const r = z(e), { element: o, headerName: i } = L(t, {
    includeActions: n.actions !== !1
  });
  return r.innerHTML = "", r.appendChild(o), n.setDocumentTitle !== !1 && K(i, n.titleTemplate), o;
};
export {
  Q as createCvElement,
  Y as renderCv
};
//# sourceMappingURL=index.mjs.map

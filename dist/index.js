import { jsxs as m, jsx as n } from "react/jsx-runtime";
import { useState as z, useRef as w, useMemo as J, useCallback as h, useEffect as O } from "react";
const _ = {
  line: 1,
  page: 2
}, ue = 18, he = 0.26, me = 0.35;
function fe(r, a) {
  return Math.min(Math.max(r, 0), a);
}
function we(r, a) {
  return r.deltaMode === _.line ? r.deltaY * ue : r.deltaMode === _.page ? r.deltaY * a.clientHeight : r.deltaY;
}
function pe(r) {
  var G;
  const [a, o] = z(((G = r[0]) == null ? void 0 : G.name) ?? ""), [p, u] = z(null), [b, s] = z(!1), [R, i] = z(!1), f = w(null), g = w(null), P = w(null), v = w(null), x = w(0), M = w(null), F = w(null), W = w(null), C = w(null), A = w(!1), I = w(!1), y = w([]), T = J(
    () => Math.max(0, r.findIndex((e) => e.name === a)),
    [a, r]
  ), te = J(
    () => r.find((e) => e.name === a) ?? r[0],
    [a, r]
  ), S = h((e) => {
    C.current !== e && (C.current = e, u(e));
  }, []), H = h(() => {
    var e;
    v.current !== null && (window.cancelAnimationFrame(v.current), v.current = null), x.current = ((e = g.current) == null ? void 0 : e.scrollTop) ?? 0;
  }, []), L = h(
    (e, t = !1) => {
      var c, d, N;
      const l = r[e];
      l && (o(l.name), S(null), t && (H(), (c = y.current[e]) == null || c.scrollIntoView({ block: "nearest", behavior: "auto" }), x.current = ((d = g.current) == null ? void 0 : d.scrollTop) ?? 0, (N = y.current[e]) == null || N.focus({ preventScroll: !0 })));
    },
    [H, S, r]
  ), U = h(() => {
    const e = g.current;
    if (!e) {
      v.current = null;
      return;
    }
    const t = x.current - e.scrollTop;
    if (Math.abs(t) <= me) {
      e.scrollTop = x.current, v.current = null;
      return;
    }
    e.scrollTop += t * he, v.current = window.requestAnimationFrame(U);
  }, []), Q = h((e) => {
    const t = g.current;
    if (!t)
      return !1;
    const l = t.scrollHeight - t.clientHeight;
    if (l <= 0)
      return !1;
    const c = v.current === null ? t.scrollTop : x.current, d = fe(c + we(e, t), l);
    return x.current = d, A.current ? (t.scrollTop = d, !0) : (v.current === null && (v.current = window.requestAnimationFrame(U)), !0);
  }, [U]);
  O(() => {
    const e = f.current;
    if (!e)
      return;
    const t = (l) => {
      Q(l) && (l.preventDefault(), l.stopPropagation());
    };
    return e.addEventListener("wheel", t, { passive: !1 }), () => {
      e.removeEventListener("wheel", t);
    };
  }, [Q]);
  const D = h(() => {
    W.current !== null && (window.cancelAnimationFrame(W.current), W.current = null), F.current = null;
  }, []), $ = h(() => {
    P.current !== null && (window.cancelAnimationFrame(P.current), P.current = null), M.current = null;
    const e = f.current;
    e && (e.style.removeProperty("--workbench-rotate-x"), e.style.removeProperty("--workbench-rotate-y"), e.style.removeProperty("--workbench-rotate-z"), e.style.removeProperty("--workbench-shift-x"), e.style.removeProperty("--workbench-shift-y"));
  }, []), X = h((e, t) => {
    if (A.current) {
      $();
      return;
    }
    M.current = { clientX: e, clientY: t }, P.current === null && (P.current = window.requestAnimationFrame(() => {
      const l = f.current, c = M.current;
      if (P.current = null, M.current = null, !l || !c)
        return;
      const d = c.clientX / window.innerWidth - 0.5, N = c.clientY / window.innerHeight - 0.5, K = -N * 13, k = d * 16, E = d * 0.72, B = d * 18, q = N * 16;
      l.style.setProperty("--workbench-rotate-x", `${K.toFixed(2)}deg`), l.style.setProperty("--workbench-rotate-y", `${k.toFixed(2)}deg`), l.style.setProperty("--workbench-rotate-z", `${E.toFixed(2)}deg`), l.style.setProperty("--workbench-shift-x", `${B.toFixed(2)}px`), l.style.setProperty("--workbench-shift-y", `${q.toFixed(2)}px`);
    }));
  }, [$]);
  O(() => {
    const e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
      A.current = e.matches, e.matches && $();
    };
    return t(), e.addEventListener("change", t), () => {
      e.removeEventListener("change", t);
    };
  }, [$]), O(
    () => () => {
      D(), H(), $();
    },
    [D, H, $]
  );
  const re = h(
    (e) => (t) => {
      y.current[e] = t;
    },
    []
  ), Z = h((e, t) => {
    const l = f.current;
    if (!l)
      return !1;
    const c = l.getBoundingClientRect(), d = 24;
    return e >= c.left - d && e <= c.right + d && t >= c.top - d && t <= c.bottom + d;
  }, []);
  O(() => {
    const e = (c) => {
      ["ArrowDown", "ArrowUp", "End", "Home", "Tab"].includes(c.key) && (I.current = !0);
    }, t = () => {
      I.current = !1;
    }, l = (c) => {
      var d;
      if (c.pointerType !== "touch") {
        if (A.current) {
          i(!1), s(Z(c.clientX, c.clientY));
          return;
        }
        if (I.current && ((d = f.current) != null && d.contains(document.activeElement))) {
          s(!0);
          return;
        }
        if (Z(c.clientX, c.clientY)) {
          s(!0), i(!1);
          return;
        }
        s(!1), i(!0), X(c.clientX, c.clientY);
      }
    };
    return window.addEventListener("keydown", e, { passive: !0 }), window.addEventListener("pointerdown", t, { passive: !0 }), window.addEventListener("pointermove", l, { passive: !0 }), () => {
      window.removeEventListener("keydown", e), window.removeEventListener("pointerdown", t), window.removeEventListener("pointermove", l);
    };
  }, [Z, X]);
  const Y = h(
    (e, t) => {
      const l = g.current, c = C.current;
      if (!l)
        return null;
      const d = l.getBoundingClientRect(), N = 8;
      if (e < d.left - N || e > d.right + N || t < d.top - N || t > d.bottom + N)
        return null;
      const K = y.current.findIndex((k) => {
        if (!k)
          return !1;
        const E = k.getBoundingClientRect();
        return t >= E.top && t <= E.bottom;
      });
      if (K >= 0)
        return K;
      if (c) {
        const k = r.findIndex((B) => B.name === c), E = y.current[k];
        if (E) {
          const B = E.getBoundingClientRect(), q = 10;
          if (t >= B.top - q && t <= B.bottom + q)
            return k;
        }
      }
      return c ? r.findIndex((k) => k.name === c) : null;
    },
    [r]
  ), V = h(
    (e, t) => {
      var d;
      const l = Y(e, t), c = l === null || l < 0 ? null : ((d = r[l]) == null ? void 0 : d.name) ?? null;
      S(c);
    },
    [S, r, Y]
  ), j = h(
    (e, t) => {
      F.current = { clientX: e, clientY: t }, W.current === null && (W.current = window.requestAnimationFrame(() => {
        const l = F.current;
        W.current = null, F.current = null, l && V(l.clientX, l.clientY);
      }));
    },
    [V]
  ), ae = h((e) => {
    e.currentTarget.contains(e.relatedTarget) || (D(), I.current = !1, s(!1), S(null));
  }, [D, S]), le = h(() => {
    I.current && (s(!0), i(!1));
  }, []), oe = h((e) => {
    D(), s(!1), i(!0), X(e.clientX, e.clientY), S(null);
  }, [D, S, X]), ce = h(
    (e) => {
      e.pointerType !== "touch" && (s(!0), i(!1), j(e.clientX, e.clientY));
    },
    [j]
  ), ie = h(
    (e) => {
      e.pointerType !== "touch" && (s(!0), i(!1), j(e.clientX, e.clientY));
    },
    [j]
  ), se = h(
    (e) => {
      I.current = !0, s(!0), i(!1), e.key === "ArrowDown" && (e.preventDefault(), L(Math.min(T + 1, r.length - 1), !0)), e.key === "ArrowUp" && (e.preventDefault(), L(Math.max(T - 1, 0), !0)), e.key === "Home" && (e.preventDefault(), L(0, !0)), e.key === "End" && (e.preventDefault(), L(r.length - 1, !0));
    },
    [L, T, r.length]
  ), de = h(
    (e) => {
      if (I.current = !1, e.target instanceof Element && e.target.closest("[data-showcase-index]"))
        return;
      const t = Y(e.clientX, e.clientY);
      t === null || t < 0 || L(t);
    },
    [L, Y]
  );
  return {
    activeItem: te,
    artifactRef: f,
    handleItemListClick: de,
    handleWorkbenchBlur: ae,
    handleWorkbenchFocus: le,
    handleWorkbenchKeyDown: se,
    handleWorkbenchPointerEnter: ce,
    handleWorkbenchPointerLeave: oe,
    handleWorkbenchPointerMove: ie,
    isWorkbenchEngaged: b,
    isWorkbenchTracking: R,
    listRef: g,
    previewedItemName: p,
    registerRow: re,
    selectItem: L
  };
}
function ee({ className: r = "showcase-detail", id: a, item: o }) {
  var b;
  const p = `${a}-title`, u = o.metadata ?? ((b = o.destination) != null && b.type ? [o.destination.type] : []);
  return /* @__PURE__ */ m("div", { "aria-labelledby": p, "aria-live": "polite", className: r, id: a, role: "region", children: [
    /* @__PURE__ */ n("h2", { className: "showcase-detail-title", id: p, children: o.name }),
    u.length > 0 ? /* @__PURE__ */ n("div", { className: "showcase-detail-meta", "aria-label": `${o.name} metadata`, children: u.map((s) => /* @__PURE__ */ n("span", { children: s }, s)) }) : null,
    o.details && o.details.length > 0 ? /* @__PURE__ */ n("dl", { className: "showcase-detail-evidence", children: o.details.map((s) => /* @__PURE__ */ m("div", { children: [
      /* @__PURE__ */ n("dt", { children: s.label }),
      /* @__PURE__ */ n("dd", { children: s.value })
    ] }, s.label)) }) : null,
    /* @__PURE__ */ n("span", { className: "showcase-detail-signal", children: o.signal }),
    o.destination ? /* @__PURE__ */ n(
      "a",
      {
        "aria-label": o.destination.ariaLabel,
        className: "showcase-detail-action",
        href: o.destination.href,
        rel: o.destination.rel,
        target: o.destination.target,
        children: o.destination.label
      }
    ) : null
  ] });
}
function be({ tags: r }) {
  return /* @__PURE__ */ n("div", { className: "metric-strip", "aria-hidden": "true", children: r.map((a) => /* @__PURE__ */ n("span", { children: a }, a)) });
}
function ge({
  controlsId: r,
  index: a,
  isActive: o,
  isPreviewed: p,
  item: u,
  onActivate: b,
  setRef: s
}) {
  var f, g;
  const R = ["workbench-row", o ? "is-active" : "", p ? "is-previewed" : ""].filter(Boolean).join(" "), i = `${u.slug}-summary`;
  return /* @__PURE__ */ m(
    "button",
    {
      "aria-controls": r,
      "aria-describedby": i,
      "aria-pressed": o,
      className: R,
      "data-showcase-index": a,
      id: `showcase-${u.slug}`,
      onClick: b,
      ref: s,
      type: "button",
      children: [
        /* @__PURE__ */ n("span", { className: "workbench-index", children: String(a + 1).padStart(2, "0") }),
        /* @__PURE__ */ m("div", { children: [
          /* @__PURE__ */ n("strong", { children: u.name }),
          /* @__PURE__ */ n("p", { children: u.summary }),
          /* @__PURE__ */ n("small", { id: i, children: ((g = (f = u.details) == null ? void 0 : f[0]) == null ? void 0 : g.value) ?? u.summary })
        ] }),
        /* @__PURE__ */ n("em", { children: u.signal })
      ]
    }
  );
}
function ne({ title: r }) {
  return /* @__PURE__ */ m("div", { className: "window-bar", children: [
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("strong", { children: r })
  ] });
}
function ve({ id: r, workbench: a }) {
  const o = "selected-showcase-item", p = "selected-showcase-item-inline", {
    activeItem: u,
    artifactRef: b,
    handleItemListClick: s,
    handleWorkbenchBlur: R,
    handleWorkbenchFocus: i,
    handleWorkbenchKeyDown: f,
    handleWorkbenchPointerEnter: g,
    handleWorkbenchPointerLeave: P,
    handleWorkbenchPointerMove: v,
    isWorkbenchEngaged: x,
    isWorkbenchTracking: M,
    listRef: F,
    previewedItemName: W,
    registerRow: C,
    selectItem: A
  } = pe(a.items), I = [
    "hero-art",
    x ? "is-workbench-engaged" : "",
    M ? "is-workbench-tracking" : ""
  ].filter(Boolean).join(" ");
  return u ? /* @__PURE__ */ n(
    "div",
    {
      className: I,
      id: r,
      "aria-label": a.ariaLabel ?? "Showcase index",
      onBlur: R,
      onFocus: i,
      onPointerEnter: g,
      onPointerLeave: P,
      onPointerMove: v,
      ref: b,
      children: /* @__PURE__ */ m("div", { className: "hero-art-stage", children: [
        /* @__PURE__ */ m("div", { className: "artifact-window artifact-window-main", onKeyDown: f, children: [
          /* @__PURE__ */ n(ne, { title: a.title }),
          /* @__PURE__ */ m("div", { className: "workbench-panel", children: [
            /* @__PURE__ */ m("div", { className: "workbench-summary", children: [
              /* @__PURE__ */ n("span", { children: a.eyebrow ?? "showcase index" }),
              /* @__PURE__ */ n("strong", { children: a.caption })
            ] }),
            /* @__PURE__ */ n(
              "ol",
              {
                "aria-label": a.listLabel ?? "Selectable showcase items",
                className: "workbench-list",
                onClick: s,
                ref: F,
                children: a.items.map((y, T) => /* @__PURE__ */ n("li", { className: "workbench-item", children: /* @__PURE__ */ n(
                  ge,
                  {
                    controlsId: `${o} ${p}`,
                    index: T,
                    isActive: y.name === u.name,
                    isPreviewed: y.name === W && y.name !== u.name,
                    item: y,
                    onActivate: () => A(T),
                    setRef: C(T)
                  }
                ) }, y.name))
              }
            ),
            /* @__PURE__ */ m("div", { className: "mobile-showcase-panel", children: [
              /* @__PURE__ */ n("div", { className: "mini-heading", children: a.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ n(
                ee,
                {
                  className: "showcase-detail showcase-detail-inline",
                  id: p,
                  item: u
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ m("div", { className: "artifact-window artifact-window-side", children: [
          /* @__PURE__ */ n("div", { className: "mini-heading", children: a.selectedLabel ?? "selected item" }),
          /* @__PURE__ */ n(ee, { id: o, item: u })
        ] }),
        a.tags && a.tags.length > 0 ? /* @__PURE__ */ n(be, { tags: a.tags }) : null
      ] })
    }
  ) : /* @__PURE__ */ n("div", { className: "hero-art", id: r, "aria-label": a.ariaLabel ?? "Showcase index", children: /* @__PURE__ */ n("div", { className: "hero-art-stage", children: /* @__PURE__ */ m("div", { className: "artifact-window artifact-window-main", children: [
    /* @__PURE__ */ n(ne, { title: a.title }),
    /* @__PURE__ */ n("div", { className: "workbench-panel", children: /* @__PURE__ */ m("div", { className: "workbench-summary", children: [
      /* @__PURE__ */ n("span", { children: a.eyebrow ?? "showcase index" }),
      /* @__PURE__ */ n("strong", { children: a.emptyState ?? a.caption })
    ] }) })
  ] }) }) });
}
const ye = "hero-title", Ne = "work";
function Ie(r, a) {
  return [r === "secondary" ? "secondary-action" : "primary-action", a].filter(Boolean).join(" ");
}
function ke(r, a) {
  const o = `orbit-tile-${["one", "two", "three", "four"][a] ?? "one"}`;
  return ["orbit-tile", r ?? o].filter(Boolean).join(" ");
}
function We({
  actions: r = [],
  className: a,
  content: o,
  id: p,
  orbitTiles: u = [],
  titleId: b = ye,
  workbench: s
}) {
  const R = ["showcase-hero", "hero", a].filter(Boolean).join(" ");
  return /* @__PURE__ */ m("section", { className: R, id: p, "aria-labelledby": b, children: [
    /* @__PURE__ */ n("div", { className: "hero-noise", "aria-hidden": "true" }),
    /* @__PURE__ */ n("div", { className: "hero-grid", "aria-hidden": "true" }),
    u.length > 0 ? /* @__PURE__ */ n("div", { className: "hero-orbit", "aria-hidden": "true", children: u.map((i, f) => /* @__PURE__ */ n("span", { className: ke(i.className, f), children: i.label }, `${i.className ?? f}-${i.label}`)) }) : null,
    /* @__PURE__ */ m("div", { className: "hero-copy", children: [
      /* @__PURE__ */ n("p", { className: "eyebrow", children: o.eyebrow }),
      /* @__PURE__ */ n("h1", { id: b, children: o.name }),
      /* @__PURE__ */ n("p", { className: "hero-statement", children: o.statement }),
      /* @__PURE__ */ n("p", { className: "hero-detail", children: o.detail }),
      r.length > 0 ? /* @__PURE__ */ n("div", { className: "hero-actions", "aria-label": "Primary actions", children: r.map((i) => /* @__PURE__ */ n(
        "a",
        {
          "aria-label": i.ariaLabel,
          className: Ie(i.variant, i.className),
          href: i.href,
          rel: i.rel,
          target: i.target,
          children: i.label
        },
        `${i.href}-${i.label}`
      )) }) : null
    ] }),
    s ? /* @__PURE__ */ n(ve, { id: s.id ?? Ne, workbench: s }) : null
  ] });
}
export {
  We as ShowcaseHero
};

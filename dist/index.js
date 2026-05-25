import { jsxs as h, jsx as n } from "react/jsx-runtime";
import { useState as B, useRef as v, useMemo as K, useCallback as s, useEffect as C } from "react";
const Q = {
  line: 1,
  page: 2
}, fe = 18, we = 0.26, be = 0.35, ye = 13, J = 16, ge = 0.72, ve = 18, Ne = 16, Pe = J * 0.5;
function ke(t, r) {
  return Math.min(Math.max(t, 0), r);
}
function Ie(t) {
  const r = t == null ? void 0 : t.maxTiltDegrees;
  return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? 1 : r / Pe;
}
function Te(t) {
  if (!(t instanceof Element))
    return null;
  const r = t.closest("[data-showcase-index]"), a = r == null ? void 0 : r.dataset.showcaseIndex;
  if (!a)
    return null;
  const m = Number.parseInt(a, 10);
  return Number.isNaN(m) ? null : m;
}
function We(t, r) {
  return t.deltaMode === Q.line ? t.deltaY * fe : t.deltaMode === Q.page ? t.deltaY * r.clientHeight : t.deltaY;
}
function Me(t, r) {
  var O;
  const [a, m] = B(((O = t[0]) == null ? void 0 : O.name) ?? ""), [c, y] = B(null), [u, p] = B(!1), [l, b] = B(!1), N = v(null), L = v(null), M = v(null), g = v(null), x = v(0), D = v(null), X = v(null), E = v(!1), W = v(!1), S = v(null), $ = v([]), A = K(
    () => Math.max(0, t.findIndex((e) => e.name === a)),
    [a, t]
  ), H = K(
    () => t.find((e) => e.name === a) ?? t[0],
    [a, t]
  ), R = K(() => Ie(r), [r]), f = s((e) => {
    X.current !== e && (X.current = e, y(e));
  }, []), P = s(() => {
    var e;
    g.current !== null && (window.cancelAnimationFrame(g.current), g.current = null), x.current = ((e = L.current) == null ? void 0 : e.scrollTop) ?? 0;
  }, []), k = s(
    (e, o = !1) => {
      var i, w, F;
      const d = t[e];
      d && (m(d.name), f(null), o && (P(), (i = $.current[e]) == null || i.scrollIntoView({ block: "nearest", behavior: "auto" }), x.current = ((w = L.current) == null ? void 0 : w.scrollTop) ?? 0, (F = $.current[e]) == null || F.focus({ preventScroll: !0 })));
    },
    [P, f, t]
  ), j = s(() => {
    const e = L.current;
    if (!e) {
      g.current = null;
      return;
    }
    const o = x.current - e.scrollTop;
    if (Math.abs(o) <= be) {
      e.scrollTop = x.current, g.current = null;
      return;
    }
    e.scrollTop += o * we, g.current = window.requestAnimationFrame(j);
  }, []), U = s((e) => {
    const o = L.current;
    if (!o)
      return !1;
    const d = o.scrollHeight - o.clientHeight;
    if (d <= 0)
      return !1;
    const i = g.current === null ? o.scrollTop : x.current, w = ke(i + We(e, o), d);
    return x.current = w, E.current ? (o.scrollTop = w, !0) : (g.current === null && (g.current = window.requestAnimationFrame(j)), !0);
  }, [j]);
  C(() => {
    const e = N.current;
    if (!e)
      return;
    const o = (d) => {
      U(d) && (d.preventDefault(), d.stopPropagation());
    };
    return e.addEventListener("wheel", o, { passive: !1 }), () => {
      e.removeEventListener("wheel", o);
    };
  }, [U]);
  const I = s(() => {
    M.current !== null && (window.cancelAnimationFrame(M.current), M.current = null), D.current = null;
    const e = N.current;
    e && (e.style.removeProperty("--workbench-rotate-x"), e.style.removeProperty("--workbench-rotate-y"), e.style.removeProperty("--workbench-rotate-z"), e.style.removeProperty("--workbench-shift-x"), e.style.removeProperty("--workbench-shift-y"), e.style.removeProperty("--workbench-origin-x"), e.style.removeProperty("--workbench-origin-y"));
  }, []), q = s((e, o, d) => {
    if (E.current) {
      I();
      return;
    }
    D.current = { clientX: e, clientY: o, pointerType: d }, M.current === null && (M.current = window.requestAnimationFrame(() => {
      const i = N.current, w = D.current;
      if (M.current = null, D.current = null, !i || !w)
        return;
      const F = w.clientX / window.innerWidth - 0.5, Z = w.clientY / window.innerHeight - 0.5, Y = w.pointerType === "touch" ? 0.86 : 1, de = -Z * ye * Y * R, ue = F * J * Y * R, he = F * ge * Y * R, me = F * ve * Y, pe = Z * Ne * Y;
      i.style.setProperty("--workbench-rotate-x", `${de.toFixed(2)}deg`), i.style.setProperty("--workbench-rotate-y", `${ue.toFixed(2)}deg`), i.style.setProperty("--workbench-rotate-z", `${he.toFixed(2)}deg`), i.style.setProperty("--workbench-shift-x", `${me.toFixed(2)}px`), i.style.setProperty("--workbench-shift-y", `${pe.toFixed(2)}px`);
    }));
  }, [R, I]), T = s(
    (e, o, d) => {
      if (E.current) {
        b(!1), I();
        return;
      }
      b(!0), q(e, o, d);
    },
    [I, q]
  );
  C(() => {
    const e = window.matchMedia("(prefers-reduced-motion: reduce)"), o = () => {
      E.current = e.matches, e.matches && I();
    };
    return o(), e.addEventListener("change", o), () => {
      e.removeEventListener("change", o);
    };
  }, [I]), C(
    () => () => {
      P(), I();
    },
    [P, I]
  );
  const _ = s(
    (e) => (o) => {
      $.current[e] = o;
    },
    []
  );
  C(() => {
    const e = (i) => {
      ["ArrowDown", "ArrowUp", "End", "Home", "Tab"].includes(i.key) && (W.current = !0);
    }, o = () => {
      W.current = !1;
    }, d = (i) => {
      var w;
      if (!(i.pointerType === "touch" && S.current !== i.pointerId)) {
        if (E.current) {
          b(!1), I();
          return;
        }
        W.current && ((w = N.current) != null && w.contains(document.activeElement)) && p(!0), T(i.clientX, i.clientY, i.pointerType);
      }
    };
    return window.addEventListener("keydown", e, { passive: !0 }), window.addEventListener("pointerdown", o, { passive: !0 }), window.addEventListener("pointermove", d, { passive: !0 }), () => {
      window.removeEventListener("keydown", e), window.removeEventListener("pointerdown", o), window.removeEventListener("pointermove", d);
    };
  }, [I, T]);
  const ee = s((e) => {
    e.currentTarget.contains(e.relatedTarget) || (W.current = !1, p(!1), f(null));
  }, [f]), ne = s(() => {
    W.current && p(!0);
  }, []), re = s((e) => {
    p(!1), f(null), !(e.pointerType === "touch" && S.current !== e.pointerId) && T(e.clientX, e.clientY, e.pointerType);
  }, [f, T]), te = s(
    (e) => {
      p(!0), T(e.clientX, e.clientY, e.pointerType);
    },
    [T]
  ), ae = s(
    (e) => {
      W.current = !1, p(!0), e.pointerType === "touch" && (S.current = e.pointerId), T(e.clientX, e.clientY, e.pointerType);
    },
    [T]
  ), z = s((e) => {
    e.pointerType === "touch" && S.current === e.pointerId && (S.current = null, b(!1));
  }, []), oe = s(
    (e) => {
      var i;
      if (e.pointerType === "touch")
        return;
      const o = Te(e.target), d = o === null ? null : ((i = t[o]) == null ? void 0 : i.name) ?? null;
      f(d);
    },
    [t, f]
  ), le = s(
    (e) => {
      e.pointerType !== "touch" && f(null);
    },
    [f]
  ), ie = s(
    (e) => {
      e.pointerType !== "touch" && f(null);
    },
    [f]
  ), ce = s(
    (e) => {
      e.pointerType === "touch" && S.current !== e.pointerId || (p(!0), T(e.clientX, e.clientY, e.pointerType));
    },
    [T]
  ), se = s(
    (e) => {
      W.current = !0, p(!0), e.key === "ArrowDown" && (e.preventDefault(), k(Math.min(A + 1, t.length - 1), !0)), e.key === "ArrowUp" && (e.preventDefault(), k(Math.max(A - 1, 0), !0)), e.key === "Home" && (e.preventDefault(), k(0, !0)), e.key === "End" && (e.preventDefault(), k(t.length - 1, !0));
    },
    [k, A, t.length]
  );
  return {
    activeItem: H,
    artifactRef: N,
    handleItemListPointerLeave: le,
    handleItemListPointerMove: oe,
    handleSelectedPanelPointerEnter: ie,
    handleWorkbenchBlur: ee,
    handleWorkbenchFocus: ne,
    handleWorkbenchKeyDown: se,
    handleWorkbenchPointerCancel: z,
    handleWorkbenchPointerDown: ae,
    handleWorkbenchPointerEnter: te,
    handleWorkbenchPointerLeave: re,
    handleWorkbenchPointerMove: ce,
    handleWorkbenchPointerUp: z,
    isWorkbenchEngaged: u,
    isWorkbenchTracking: l,
    listRef: L,
    previewedItemName: c,
    registerRow: _,
    selectItem: k
  };
}
function V({ className: t = "showcase-detail", id: r, item: a }) {
  var y;
  const m = `${r}-title`, c = a.metadata ?? ((y = a.destination) != null && y.type ? [a.destination.type] : []);
  return /* @__PURE__ */ h("div", { "aria-labelledby": m, "aria-live": "polite", className: t, id: r, role: "region", children: [
    /* @__PURE__ */ n("h2", { className: "showcase-detail-title", id: m, children: a.name }),
    c.length > 0 ? /* @__PURE__ */ n("div", { className: "showcase-detail-meta", "aria-label": `${a.name} metadata`, children: c.map((u) => /* @__PURE__ */ n("span", { children: u }, u)) }) : null,
    a.details && a.details.length > 0 ? /* @__PURE__ */ n("dl", { className: "showcase-detail-evidence", children: a.details.map((u) => /* @__PURE__ */ h("div", { children: [
      /* @__PURE__ */ n("dt", { children: u.label }),
      /* @__PURE__ */ n("dd", { children: u.value })
    ] }, u.label)) }) : null,
    /* @__PURE__ */ n("span", { className: "showcase-detail-signal", children: a.signal }),
    a.destination ? /* @__PURE__ */ n(
      "a",
      {
        "aria-label": a.destination.ariaLabel,
        className: "showcase-detail-action",
        href: a.destination.href,
        rel: a.destination.rel,
        target: a.destination.target,
        children: a.destination.label
      }
    ) : null
  ] });
}
function xe({ tags: t }) {
  return /* @__PURE__ */ n("div", { className: "metric-strip", "aria-hidden": "true", children: t.map((r) => /* @__PURE__ */ n("span", { children: r }, r)) });
}
function Se({
  controlsId: t,
  index: r,
  isActive: a,
  isPreviewed: m,
  item: c,
  onActivate: y,
  setRef: u
}) {
  var b, N;
  const p = ["workbench-row", a ? "is-active" : "", m ? "is-previewed" : ""].filter(Boolean).join(" "), l = `${c.slug}-summary`;
  return /* @__PURE__ */ h(
    "button",
    {
      "aria-controls": t,
      "aria-describedby": l,
      "aria-pressed": a,
      className: p,
      "data-showcase-index": r,
      id: `showcase-${c.slug}`,
      onClick: y,
      ref: u,
      type: "button",
      children: [
        /* @__PURE__ */ n("span", { className: "workbench-index", children: String(r + 1).padStart(2, "0") }),
        /* @__PURE__ */ h("div", { children: [
          /* @__PURE__ */ n("strong", { children: c.name }),
          /* @__PURE__ */ n("p", { children: c.summary }),
          /* @__PURE__ */ n("small", { id: l, children: ((N = (b = c.details) == null ? void 0 : b[0]) == null ? void 0 : N.value) ?? c.summary })
        ] }),
        /* @__PURE__ */ n("em", { children: c.signal })
      ]
    }
  );
}
function G({ title: t }) {
  return /* @__PURE__ */ h("div", { className: "window-bar", children: [
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("strong", { children: t })
  ] });
}
function Le({ id: t, workbench: r }) {
  const a = "selected-showcase-item", m = "selected-showcase-item-inline", {
    activeItem: c,
    artifactRef: y,
    handleItemListPointerLeave: u,
    handleItemListPointerMove: p,
    handleSelectedPanelPointerEnter: l,
    handleWorkbenchBlur: b,
    handleWorkbenchFocus: N,
    handleWorkbenchKeyDown: L,
    handleWorkbenchPointerCancel: M,
    handleWorkbenchPointerDown: g,
    handleWorkbenchPointerEnter: x,
    handleWorkbenchPointerLeave: D,
    handleWorkbenchPointerMove: X,
    handleWorkbenchPointerUp: E,
    isWorkbenchEngaged: W,
    isWorkbenchTracking: S,
    listRef: $,
    previewedItemName: A,
    registerRow: H,
    selectItem: R
  } = Me(r.items, r.motion), f = [
    "hero-art",
    W ? "is-workbench-engaged" : "",
    S ? "is-workbench-tracking" : ""
  ].filter(Boolean).join(" ");
  return c ? /* @__PURE__ */ n(
    "div",
    {
      className: f,
      id: t,
      "aria-label": r.ariaLabel ?? "Showcase index",
      onBlur: b,
      onFocus: N,
      onPointerCancel: M,
      onPointerDown: g,
      onPointerEnter: x,
      onPointerLeave: D,
      onPointerMove: X,
      onPointerUp: E,
      ref: y,
      children: /* @__PURE__ */ n("div", { className: "hero-art-stage", children: /* @__PURE__ */ h("div", { className: "hero-art-motion-layer", children: [
        /* @__PURE__ */ h("div", { className: "artifact-window artifact-window-main", onKeyDown: L, children: [
          /* @__PURE__ */ n(G, { title: r.title }),
          /* @__PURE__ */ h("div", { className: "workbench-panel", children: [
            /* @__PURE__ */ h("div", { className: "workbench-summary", children: [
              /* @__PURE__ */ n("span", { children: r.eyebrow ?? "showcase index" }),
              /* @__PURE__ */ n("strong", { children: r.caption })
            ] }),
            /* @__PURE__ */ n(
              "ol",
              {
                "aria-label": r.listLabel ?? "Selectable showcase items",
                className: "workbench-list",
                onPointerLeave: u,
                onPointerMove: p,
                ref: $,
                children: r.items.map((P, k) => /* @__PURE__ */ n("li", { className: "workbench-item", children: /* @__PURE__ */ n(
                  Se,
                  {
                    controlsId: `${a} ${m}`,
                    index: k,
                    isActive: P.name === c.name,
                    isPreviewed: P.name === A && P.name !== c.name,
                    item: P,
                    onActivate: () => R(k),
                    setRef: H(k)
                  }
                ) }, P.name))
              }
            ),
            /* @__PURE__ */ h("div", { className: "mobile-showcase-panel", children: [
              /* @__PURE__ */ n("div", { className: "mini-heading", children: r.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ n(
                V,
                {
                  className: "showcase-detail showcase-detail-inline",
                  id: m,
                  item: c
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ h(
          "div",
          {
            className: "artifact-window artifact-window-side",
            onPointerEnter: l,
            onPointerMove: l,
            children: [
              /* @__PURE__ */ n("div", { className: "mini-heading", children: r.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ n(V, { id: a, item: c })
            ]
          }
        ),
        r.tags && r.tags.length > 0 ? /* @__PURE__ */ n(xe, { tags: r.tags }) : null
      ] }) })
    }
  ) : /* @__PURE__ */ n("div", { className: "hero-art", id: t, "aria-label": r.ariaLabel ?? "Showcase index", children: /* @__PURE__ */ n("div", { className: "hero-art-stage", children: /* @__PURE__ */ n("div", { className: "hero-art-motion-layer", children: /* @__PURE__ */ h("div", { className: "artifact-window artifact-window-main", children: [
    /* @__PURE__ */ n(G, { title: r.title }),
    /* @__PURE__ */ n("div", { className: "workbench-panel", children: /* @__PURE__ */ h("div", { className: "workbench-summary", children: [
      /* @__PURE__ */ n("span", { children: r.eyebrow ?? "showcase index" }),
      /* @__PURE__ */ n("strong", { children: r.emptyState ?? r.caption })
    ] }) })
  ] }) }) }) });
}
const Ee = "hero-title", De = "work";
function Re(t, r) {
  return [t === "secondary" ? "secondary-action" : "primary-action", r].filter(Boolean).join(" ");
}
function Fe(t, r) {
  const a = `orbit-tile-${["one", "two", "three", "four"][r] ?? "one"}`;
  return ["orbit-tile", t ?? a].filter(Boolean).join(" ");
}
function Ye({
  actions: t = [],
  className: r,
  content: a,
  id: m,
  orbitTiles: c = [],
  titleId: y = Ee,
  workbench: u
}) {
  const p = ["showcase-hero", "hero", r].filter(Boolean).join(" ");
  return /* @__PURE__ */ h("section", { className: p, id: m, "aria-labelledby": y, children: [
    /* @__PURE__ */ n("div", { className: "hero-noise", "aria-hidden": "true" }),
    /* @__PURE__ */ n("div", { className: "hero-grid", "aria-hidden": "true" }),
    c.length > 0 ? /* @__PURE__ */ n("div", { className: "hero-orbit", "aria-hidden": "true", children: c.map((l, b) => /* @__PURE__ */ n("span", { className: Fe(l.className, b), children: l.label }, `${l.className ?? b}-${l.label}`)) }) : null,
    /* @__PURE__ */ h("div", { className: "hero-copy", children: [
      /* @__PURE__ */ n("p", { className: "eyebrow", children: a.eyebrow }),
      /* @__PURE__ */ n("h1", { id: y, children: a.name }),
      /* @__PURE__ */ n("p", { className: "hero-statement", children: a.statement }),
      /* @__PURE__ */ n("p", { className: "hero-detail", children: a.detail }),
      t.length > 0 ? /* @__PURE__ */ n("div", { className: "hero-actions", "aria-label": "Primary actions", children: t.map((l) => /* @__PURE__ */ n(
        "a",
        {
          "aria-label": l.ariaLabel,
          className: Re(l.variant, l.className),
          href: l.href,
          rel: l.rel,
          target: l.target,
          children: l.label
        },
        `${l.href}-${l.label}`
      )) }) : null
    ] }),
    u ? /* @__PURE__ */ n(Le, { id: u.id ?? De, workbench: u }) : null
  ] });
}
export {
  Ye as ShowcaseHero
};

import { jsxs as f, jsx as r } from "react/jsx-runtime";
import { useState as j, useRef as w, useMemo as z, useCallback as s, useEffect as O } from "react";
const te = {
  line: 1,
  page: 2
}, be = 18, ye = 0.26, ge = 0.35, ve = 13, ae = 16, Ne = 0.72, ke = 18, Me = 16, Te = ae * 0.5, Pe = 220, Ie = 760, We = 0.52, Se = 0.3, xe = 0.04;
function Re(t) {
  return {
    pointerType: t,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    shiftX: 0,
    shiftY: 0
  };
}
function Le(t, n) {
  return Math.min(Math.max(t, 0), n);
}
function Ye(t) {
  const n = t == null ? void 0 : t.maxTiltDegrees;
  return typeof n != "number" || !Number.isFinite(n) || n <= 0 ? 1 : n / Te;
}
function ne(t, n) {
  return typeof t != "number" || !Number.isFinite(t) || t < 0 ? n : t;
}
function Ee(t) {
  var n, o;
  return {
    durationMs: ne((n = t == null ? void 0 : t.touchReleaseReturn) == null ? void 0 : n.durationMs, Ie),
    holdMs: ne((o = t == null ? void 0 : t.touchReleaseReturn) == null ? void 0 : o.holdMs, Pe)
  };
}
function De(t, n) {
  t.style.setProperty("--workbench-rotate-x", `${n.rotateX.toFixed(2)}deg`), t.style.setProperty("--workbench-rotate-y", `${n.rotateY.toFixed(2)}deg`), t.style.setProperty("--workbench-rotate-z", `${n.rotateZ.toFixed(2)}deg`), t.style.setProperty("--workbench-shift-x", `${n.shiftX.toFixed(2)}px`), t.style.setProperty("--workbench-shift-y", `${n.shiftY.toFixed(2)}px`);
}
function Xe(t, n) {
  const o = n.pointerType === "touch" ? Se : We;
  return {
    pointerType: n.pointerType,
    rotateX: t.rotateX + (n.rotateX - t.rotateX) * o,
    rotateY: t.rotateY + (n.rotateY - t.rotateY) * o,
    rotateZ: t.rotateZ + (n.rotateZ - t.rotateZ) * o,
    shiftX: t.shiftX + (n.shiftX - t.shiftX) * o,
    shiftY: t.shiftY + (n.shiftY - t.shiftY) * o
  };
}
function Fe(t, n) {
  return Math.max(
    Math.abs(n.rotateX - t.rotateX),
    Math.abs(n.rotateY - t.rotateY),
    Math.abs(n.rotateZ - t.rotateZ),
    Math.abs(n.shiftX - t.shiftX),
    Math.abs(n.shiftY - t.shiftY)
  );
}
function $e(t) {
  if (!(t instanceof Element))
    return null;
  const n = t.closest("[data-showcase-index]"), o = n == null ? void 0 : n.dataset.showcaseIndex;
  if (!o)
    return null;
  const m = Number.parseInt(o, 10);
  return Number.isNaN(m) ? null : m;
}
function Ae(t, n) {
  return t.deltaMode === te.line ? t.deltaY * be : t.deltaMode === te.page ? t.deltaY * n.clientHeight : t.deltaY;
}
function He(t, n) {
  var ee;
  const [o, m] = j(((ee = t[0]) == null ? void 0 : ee.name) ?? ""), [c, v] = j(null), [u, p] = j(!1), [l, b] = j(!1), [F, W] = j(!1), S = w(null), Y = w(null), M = w(null), N = w(null), E = w(null), D = w(null), x = w(0), A = w(null), H = w(null), K = w(null), X = w(!1), P = w(!1), R = w(null), C = w([]), I = z(
    () => Math.max(0, t.findIndex((e) => e.name === o)),
    [o, t]
  ), Z = z(
    () => t.find((e) => e.name === o) ?? t[0],
    [o, t]
  ), U = z(() => Ye(n), [n]), B = z(() => Ee(n), [n]), y = s((e) => {
    K.current !== e && (K.current = e, v(e));
  }, []), q = s(() => {
    var e;
    N.current !== null && (window.cancelAnimationFrame(N.current), N.current = null), x.current = ((e = Y.current) == null ? void 0 : e.scrollTop) ?? 0;
  }, []), k = s(() => {
    E.current !== null && (window.clearTimeout(E.current), E.current = null), D.current !== null && (window.clearTimeout(D.current), D.current = null);
  }, []), $ = s(
    (e, a = !1) => {
      var i, h, L;
      const d = t[e];
      d && (m(d.name), y(null), a && (q(), (i = C.current[e]) == null || i.scrollIntoView({ block: "nearest", behavior: "auto" }), x.current = ((h = Y.current) == null ? void 0 : h.scrollTop) ?? 0, (L = C.current[e]) == null || L.focus({ preventScroll: !0 })));
    },
    [q, y, t]
  ), Q = s(() => {
    const e = Y.current;
    if (!e) {
      N.current = null;
      return;
    }
    const a = x.current - e.scrollTop;
    if (Math.abs(a) <= ge) {
      e.scrollTop = x.current, N.current = null;
      return;
    }
    e.scrollTop += a * ye, N.current = window.requestAnimationFrame(Q);
  }, []), G = s((e) => {
    const a = Y.current;
    if (!a)
      return !1;
    const d = a.scrollHeight - a.clientHeight;
    if (d <= 0)
      return !1;
    const i = N.current === null ? a.scrollTop : x.current, h = Le(i + Ae(e, a), d);
    return x.current = h, X.current ? (a.scrollTop = h, !0) : (N.current === null && (N.current = window.requestAnimationFrame(Q)), !0);
  }, [Q]);
  O(() => {
    const e = S.current;
    if (!e)
      return;
    const a = (d) => {
      G(d) && (d.preventDefault(), d.stopPropagation());
    };
    return e.addEventListener("wheel", a, { passive: !1 }), () => {
      e.removeEventListener("wheel", a);
    };
  }, [G]);
  const g = s(() => {
    M.current !== null && (window.cancelAnimationFrame(M.current), M.current = null), A.current = null, H.current = null;
    const e = S.current;
    e && (e.style.removeProperty("--workbench-rotate-x"), e.style.removeProperty("--workbench-rotate-y"), e.style.removeProperty("--workbench-rotate-z"), e.style.removeProperty("--workbench-shift-x"), e.style.removeProperty("--workbench-shift-y"), e.style.removeProperty("--workbench-origin-x"), e.style.removeProperty("--workbench-origin-y"));
  }, []), V = s(() => {
    const e = S.current, a = H.current;
    if (!e || !a) {
      M.current = null;
      return;
    }
    const d = A.current ?? Re(a.pointerType), i = Xe(d, a), h = Fe(i, a) <= xe ? a : i;
    if (A.current = h, De(e, h), h === a) {
      M.current = null;
      return;
    }
    M.current = window.requestAnimationFrame(V);
  }, []), J = s((e, a, d) => {
    if (X.current) {
      g();
      return;
    }
    const i = e / window.innerWidth - 0.5, h = a / window.innerHeight - 0.5, L = d === "touch" ? 0.86 : 1;
    H.current = {
      pointerType: d,
      rotateX: -h * ve * L * U,
      rotateY: i * ae * L * U,
      rotateZ: i * Ne * L * U,
      shiftX: i * ke * L,
      shiftY: h * Me * L
    }, M.current === null && (M.current = window.requestAnimationFrame(V));
  }, [U, g, V]), T = s(
    (e, a, d) => {
      if (X.current) {
        k(), W(!1), b(!1), g();
        return;
      }
      k(), W(!1), b(!0), J(e, a, d);
    },
    [k, g, J]
  );
  O(() => {
    const e = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => {
      X.current = e.matches, e.matches && (k(), W(!1), g());
    };
    return a(), e.addEventListener("change", a), () => {
      e.removeEventListener("change", a);
    };
  }, [k, g]), O(
    () => () => {
      q(), k(), g();
    },
    [q, k, g]
  );
  const le = s(
    (e) => (a) => {
      C.current[e] = a;
    },
    []
  );
  O(() => {
    const e = (i) => {
      ["ArrowDown", "ArrowUp", "End", "Home", "Tab"].includes(i.key) && (P.current = !0);
    }, a = () => {
      P.current = !1;
    }, d = (i) => {
      var h;
      if (!(i.pointerType === "touch" && R.current !== i.pointerId)) {
        if (X.current) {
          k(), W(!1), b(!1), g();
          return;
        }
        P.current && ((h = S.current) != null && h.contains(document.activeElement)) && p(!0), T(i.clientX, i.clientY, i.pointerType);
      }
    };
    return window.addEventListener("keydown", e, { passive: !0 }), window.addEventListener("pointerdown", a, { passive: !0 }), window.addEventListener("pointermove", d, { passive: !0 }), () => {
      window.removeEventListener("keydown", e), window.removeEventListener("pointerdown", a), window.removeEventListener("pointermove", d);
    };
  }, [k, g, T]);
  const ie = s((e) => {
    e.currentTarget.contains(e.relatedTarget) || (P.current = !1, p(!1), y(null));
  }, [y]), se = s(() => {
    P.current && p(!0);
  }, []), ce = s((e) => {
    p(!1), y(null), !(e.pointerType === "touch" && R.current !== e.pointerId) && T(e.clientX, e.clientY, e.pointerType);
  }, [y, T]), de = s(
    (e) => {
      p(!0), T(e.clientX, e.clientY, e.pointerType);
    },
    [T]
  ), ue = s(
    (e) => {
      P.current = !1, p(!0), e.pointerType === "touch" && (R.current = e.pointerId), T(e.clientX, e.clientY, e.pointerType);
    },
    [T]
  ), _ = s((e) => {
    if (e.pointerType === "touch" && R.current === e.pointerId) {
      const a = S.current;
      a && a.style.setProperty("--workbench-touch-return-ms", `${B.durationMs}ms`), R.current = null, b(!1), W(!0), k(), E.current = window.setTimeout(() => {
        E.current = null, g(), D.current = window.setTimeout(() => {
          D.current = null, W(!1);
        }, B.durationMs);
      }, B.holdMs);
    }
  }, [k, g, B.durationMs, B.holdMs]), he = s(
    (e) => {
      var i;
      if (e.pointerType === "touch")
        return;
      const a = $e(e.target), d = a === null ? null : ((i = t[a]) == null ? void 0 : i.name) ?? null;
      y(d);
    },
    [t, y]
  ), fe = s(
    (e) => {
      e.pointerType !== "touch" && y(null);
    },
    [y]
  ), me = s(
    (e) => {
      e.pointerType !== "touch" && y(null);
    },
    [y]
  ), pe = s(
    (e) => {
      e.pointerType === "touch" && R.current !== e.pointerId || (p(!0), T(e.clientX, e.clientY, e.pointerType));
    },
    [T]
  ), we = s(
    (e) => {
      P.current = !0, p(!0), e.key === "ArrowDown" && (e.preventDefault(), $(Math.min(I + 1, t.length - 1), !0)), e.key === "ArrowUp" && (e.preventDefault(), $(Math.max(I - 1, 0), !0)), e.key === "Home" && (e.preventDefault(), $(0, !0)), e.key === "End" && (e.preventDefault(), $(t.length - 1, !0));
    },
    [$, I, t.length]
  );
  return {
    activeItem: Z,
    artifactRef: S,
    handleItemListPointerLeave: fe,
    handleItemListPointerMove: he,
    handleSelectedPanelPointerEnter: me,
    handleWorkbenchBlur: ie,
    handleWorkbenchFocus: se,
    handleWorkbenchKeyDown: we,
    handleWorkbenchPointerCancel: _,
    handleWorkbenchPointerDown: ue,
    handleWorkbenchPointerEnter: de,
    handleWorkbenchPointerLeave: ce,
    handleWorkbenchPointerMove: pe,
    handleWorkbenchPointerUp: _,
    isWorkbenchEngaged: u,
    isWorkbenchSettling: F,
    isWorkbenchTracking: l,
    listRef: Y,
    previewedItemName: c,
    registerRow: le,
    selectItem: $
  };
}
function re({ className: t = "showcase-detail", id: n, item: o }) {
  var v;
  const m = `${n}-title`, c = o.metadata ?? ((v = o.destination) != null && v.type ? [o.destination.type] : []);
  return /* @__PURE__ */ f("div", { "aria-labelledby": m, "aria-live": "polite", className: t, id: n, role: "region", children: [
    /* @__PURE__ */ r("h2", { className: "showcase-detail-title", id: m, children: o.name }),
    c.length > 0 ? /* @__PURE__ */ r("div", { className: "showcase-detail-meta", "aria-label": `${o.name} metadata`, children: c.map((u) => /* @__PURE__ */ r("span", { children: u }, u)) }) : null,
    o.details && o.details.length > 0 ? /* @__PURE__ */ r("dl", { className: "showcase-detail-evidence", children: o.details.map((u) => /* @__PURE__ */ f("div", { children: [
      /* @__PURE__ */ r("dt", { children: u.label }),
      /* @__PURE__ */ r("dd", { children: u.value })
    ] }, u.label)) }) : null,
    /* @__PURE__ */ r("span", { className: "showcase-detail-signal", children: o.signal }),
    o.destination ? /* @__PURE__ */ r(
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
function Ce({ tags: t }) {
  return /* @__PURE__ */ r("div", { className: "metric-strip", "aria-hidden": "true", children: t.map((n) => /* @__PURE__ */ r("span", { children: n }, n)) });
}
function Ze({
  controlsId: t,
  index: n,
  isActive: o,
  isPreviewed: m,
  item: c,
  onActivate: v,
  setRef: u
}) {
  var b, F;
  const p = ["workbench-row", o ? "is-active" : "", m ? "is-previewed" : ""].filter(Boolean).join(" "), l = `${c.slug}-summary`;
  return /* @__PURE__ */ f(
    "button",
    {
      "aria-controls": t,
      "aria-describedby": l,
      "aria-pressed": o,
      className: p,
      "data-showcase-index": n,
      id: `showcase-${c.slug}`,
      onClick: v,
      ref: u,
      type: "button",
      children: [
        /* @__PURE__ */ r("span", { className: "workbench-index", children: String(n + 1).padStart(2, "0") }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ r("strong", { children: c.name }),
          /* @__PURE__ */ r("p", { children: c.summary }),
          /* @__PURE__ */ r("small", { id: l, children: ((F = (b = c.details) == null ? void 0 : b[0]) == null ? void 0 : F.value) ?? c.summary })
        ] }),
        /* @__PURE__ */ r("em", { children: c.signal })
      ]
    }
  );
}
function oe({ title: t }) {
  return /* @__PURE__ */ f("div", { className: "window-bar", children: [
    /* @__PURE__ */ r("span", {}),
    /* @__PURE__ */ r("span", {}),
    /* @__PURE__ */ r("span", {}),
    /* @__PURE__ */ r("strong", { children: t })
  ] });
}
function Be({ id: t, workbench: n }) {
  const o = "selected-showcase-item", m = "selected-showcase-item-inline", {
    activeItem: c,
    artifactRef: v,
    handleItemListPointerLeave: u,
    handleItemListPointerMove: p,
    handleSelectedPanelPointerEnter: l,
    handleWorkbenchBlur: b,
    handleWorkbenchFocus: F,
    handleWorkbenchKeyDown: W,
    handleWorkbenchPointerCancel: S,
    handleWorkbenchPointerDown: Y,
    handleWorkbenchPointerEnter: M,
    handleWorkbenchPointerLeave: N,
    handleWorkbenchPointerMove: E,
    handleWorkbenchPointerUp: D,
    isWorkbenchEngaged: x,
    isWorkbenchSettling: A,
    isWorkbenchTracking: H,
    listRef: K,
    previewedItemName: X,
    registerRow: P,
    selectItem: R
  } = He(n.items, n.motion), C = [
    "hero-art",
    x ? "is-workbench-engaged" : "",
    H ? "is-workbench-tracking" : "",
    A ? "is-workbench-settling" : ""
  ].filter(Boolean).join(" ");
  return c ? /* @__PURE__ */ r(
    "div",
    {
      className: C,
      id: t,
      "aria-label": n.ariaLabel ?? "Showcase index",
      onBlur: b,
      onFocus: F,
      onPointerCancel: S,
      onPointerDown: Y,
      onPointerEnter: M,
      onPointerLeave: N,
      onPointerMove: E,
      onPointerUp: D,
      ref: v,
      children: /* @__PURE__ */ r("div", { className: "hero-art-stage", children: /* @__PURE__ */ f("div", { className: "hero-art-motion-layer", children: [
        /* @__PURE__ */ f("div", { className: "artifact-window artifact-window-main", onKeyDown: W, children: [
          /* @__PURE__ */ r(oe, { title: n.title }),
          /* @__PURE__ */ f("div", { className: "workbench-panel", children: [
            /* @__PURE__ */ f("div", { className: "workbench-summary", children: [
              /* @__PURE__ */ r("span", { children: n.eyebrow ?? "showcase index" }),
              /* @__PURE__ */ r("strong", { children: n.caption })
            ] }),
            /* @__PURE__ */ r(
              "ol",
              {
                "aria-label": n.listLabel ?? "Selectable showcase items",
                className: "workbench-list",
                onPointerLeave: u,
                onPointerMove: p,
                ref: K,
                children: n.items.map((I, Z) => /* @__PURE__ */ r("li", { className: "workbench-item", children: /* @__PURE__ */ r(
                  Ze,
                  {
                    controlsId: `${o} ${m}`,
                    index: Z,
                    isActive: I.name === c.name,
                    isPreviewed: I.name === X && I.name !== c.name,
                    item: I,
                    onActivate: () => R(Z),
                    setRef: P(Z)
                  }
                ) }, I.name))
              }
            ),
            /* @__PURE__ */ f("div", { className: "mobile-showcase-panel", children: [
              /* @__PURE__ */ r("div", { className: "mini-heading", children: n.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ r(
                re,
                {
                  className: "showcase-detail showcase-detail-inline",
                  id: m,
                  item: c
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ f(
          "div",
          {
            className: "artifact-window artifact-window-side",
            onPointerEnter: l,
            onPointerMove: l,
            children: [
              /* @__PURE__ */ r("div", { className: "mini-heading", children: n.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ r(re, { id: o, item: c })
            ]
          }
        ),
        n.tags && n.tags.length > 0 ? /* @__PURE__ */ r(Ce, { tags: n.tags }) : null
      ] }) })
    }
  ) : /* @__PURE__ */ r("div", { className: "hero-art", id: t, "aria-label": n.ariaLabel ?? "Showcase index", children: /* @__PURE__ */ r("div", { className: "hero-art-stage", children: /* @__PURE__ */ r("div", { className: "hero-art-motion-layer", children: /* @__PURE__ */ f("div", { className: "artifact-window artifact-window-main", children: [
    /* @__PURE__ */ r(oe, { title: n.title }),
    /* @__PURE__ */ r("div", { className: "workbench-panel", children: /* @__PURE__ */ f("div", { className: "workbench-summary", children: [
      /* @__PURE__ */ r("span", { children: n.eyebrow ?? "showcase index" }),
      /* @__PURE__ */ r("strong", { children: n.emptyState ?? n.caption })
    ] }) })
  ] }) }) }) });
}
const je = "hero-title", Ke = "work";
function Ue(t, n) {
  return [t === "secondary" ? "secondary-action" : "primary-action", n].filter(Boolean).join(" ");
}
function qe(t, n) {
  const o = `orbit-tile-${["one", "two", "three", "four"][n] ?? "one"}`;
  return ["orbit-tile", t ?? o].filter(Boolean).join(" ");
}
function Qe({
  actions: t = [],
  className: n,
  content: o,
  id: m,
  orbitTiles: c = [],
  titleId: v = je,
  workbench: u
}) {
  const p = ["showcase-hero", "hero", n].filter(Boolean).join(" ");
  return /* @__PURE__ */ f("section", { className: p, id: m, "aria-labelledby": v, children: [
    /* @__PURE__ */ r("div", { className: "hero-noise", "aria-hidden": "true" }),
    /* @__PURE__ */ r("div", { className: "hero-grid", "aria-hidden": "true" }),
    c.length > 0 ? /* @__PURE__ */ r("div", { className: "hero-orbit", "aria-hidden": "true", children: c.map((l, b) => /* @__PURE__ */ r("span", { className: qe(l.className, b), children: l.label }, `${l.className ?? b}-${l.label}`)) }) : null,
    /* @__PURE__ */ f("div", { className: "hero-copy", children: [
      /* @__PURE__ */ r("p", { className: "eyebrow", children: o.eyebrow }),
      /* @__PURE__ */ r("h1", { id: v, children: o.name }),
      /* @__PURE__ */ r("p", { className: "hero-statement", children: o.statement }),
      /* @__PURE__ */ r("p", { className: "hero-detail", children: o.detail }),
      t.length > 0 ? /* @__PURE__ */ r("div", { className: "hero-actions", "aria-label": "Primary actions", children: t.map((l) => /* @__PURE__ */ r(
        "a",
        {
          "aria-label": l.ariaLabel,
          className: Ue(l.variant, l.className),
          href: l.href,
          rel: l.rel,
          target: l.target,
          children: l.label
        },
        `${l.href}-${l.label}`
      )) }) : null
    ] }),
    u ? /* @__PURE__ */ r(Be, { id: u.id ?? Ke, workbench: u }) : null
  ] });
}
export {
  Qe as ShowcaseHero
};

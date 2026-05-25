import { jsxs as f, jsx as r } from "react/jsx-runtime";
import { useState as j, useRef as w, useMemo as z, useCallback as s, useEffect as O } from "react";
const te = {
  line: 1,
  page: 2
}, ye = 18, ge = 0.26, ne = 0.35, ve = 13, le = 16, Me = 0.72, Ne = 18, ke = 16, Te = le * 0.5, Pe = 220, Ie = 760, We = 0.52, Se = 0.3, xe = 0.04;
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
function re(t, n) {
  return typeof t != "number" || !Number.isFinite(t) || t < 0 ? n : t;
}
function Ee(t) {
  var n, o;
  return {
    durationMs: re((n = t == null ? void 0 : t.touchReleaseReturn) == null ? void 0 : n.durationMs, Ie),
    holdMs: re((o = t == null ? void 0 : t.touchReleaseReturn) == null ? void 0 : o.holdMs, Pe)
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
  return t.deltaMode === te.line ? t.deltaY * ye : t.deltaMode === te.page ? t.deltaY * n.clientHeight : t.deltaY;
}
function He(t, n) {
  var ee;
  const [o, m] = j(((ee = t[0]) == null ? void 0 : ee.name) ?? ""), [c, v] = j(null), [u, p] = j(!1), [i, b] = j(!1), [F, W] = j(!1), Y = w(null), S = w(null), k = w(null), M = w(null), E = w(null), D = w(null), x = w(0), A = w(null), H = w(null), K = w(null), X = w(!1), P = w(!1), R = w(null), C = w([]), I = z(
    () => Math.max(0, t.findIndex((e) => e.name === o)),
    [o, t]
  ), Z = z(
    () => t.find((e) => e.name === o) ?? t[0],
    [o, t]
  ), U = z(() => Ye(n), [n]), B = z(() => Ee(n), [n]), y = s((e) => {
    K.current !== e && (K.current = e, v(e));
  }, []), q = s(() => {
    var e;
    M.current !== null && (window.cancelAnimationFrame(M.current), M.current = null), x.current = ((e = S.current) == null ? void 0 : e.scrollTop) ?? 0;
  }, []), N = s(() => {
    E.current !== null && (window.clearTimeout(E.current), E.current = null), D.current !== null && (window.clearTimeout(D.current), D.current = null);
  }, []), $ = s(
    (e, a = !1) => {
      var l, h, L;
      const d = t[e];
      d && (m(d.name), y(null), a && (q(), (l = C.current[e]) == null || l.scrollIntoView({ block: "nearest", behavior: "auto" }), x.current = ((h = S.current) == null ? void 0 : h.scrollTop) ?? 0, (L = C.current[e]) == null || L.focus({ preventScroll: !0 })));
    },
    [q, y, t]
  ), Q = s(() => {
    const e = S.current;
    if (!e) {
      M.current = null;
      return;
    }
    const a = x.current - e.scrollTop;
    if (Math.abs(a) <= ne) {
      e.scrollTop = x.current, M.current = null;
      return;
    }
    e.scrollTop += a * ge, M.current = window.requestAnimationFrame(Q);
  }, []), G = s((e) => {
    const a = S.current;
    if (!a)
      return !1;
    const d = a.scrollHeight - a.clientHeight;
    if (d <= 0)
      return !1;
    const l = M.current === null ? a.scrollTop : x.current, h = Le(l + Ae(e, a), d);
    return Math.abs(h - l) <= ne ? !1 : (x.current = h, X.current ? (a.scrollTop = h, !0) : (M.current === null && (M.current = window.requestAnimationFrame(Q)), !0));
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
    k.current !== null && (window.cancelAnimationFrame(k.current), k.current = null), A.current = null, H.current = null;
    const e = Y.current;
    e && (e.style.removeProperty("--workbench-rotate-x"), e.style.removeProperty("--workbench-rotate-y"), e.style.removeProperty("--workbench-rotate-z"), e.style.removeProperty("--workbench-shift-x"), e.style.removeProperty("--workbench-shift-y"), e.style.removeProperty("--workbench-origin-x"), e.style.removeProperty("--workbench-origin-y"));
  }, []), V = s(() => {
    const e = Y.current, a = H.current;
    if (!e || !a) {
      k.current = null;
      return;
    }
    const d = A.current ?? Re(a.pointerType), l = Xe(d, a), h = Fe(l, a) <= xe ? a : l;
    if (A.current = h, De(e, h), h === a) {
      k.current = null;
      return;
    }
    k.current = window.requestAnimationFrame(V);
  }, []), J = s((e, a, d) => {
    if (X.current) {
      g();
      return;
    }
    const l = e / window.innerWidth - 0.5, h = a / window.innerHeight - 0.5, L = d === "touch" ? 0.86 : 1;
    H.current = {
      pointerType: d,
      rotateX: -h * ve * L * U,
      rotateY: l * le * L * U,
      rotateZ: l * Me * L * U,
      shiftX: l * Ne * L,
      shiftY: h * ke * L
    }, k.current === null && (k.current = window.requestAnimationFrame(V));
  }, [U, g, V]), T = s(
    (e, a, d) => {
      if (X.current) {
        N(), W(!1), b(!1), g();
        return;
      }
      N(), W(!1), b(!0), J(e, a, d);
    },
    [N, g, J]
  );
  O(() => {
    const e = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => {
      X.current = e.matches, e.matches && (N(), W(!1), g());
    };
    return a(), e.addEventListener("change", a), () => {
      e.removeEventListener("change", a);
    };
  }, [N, g]), O(
    () => () => {
      q(), N(), g();
    },
    [q, N, g]
  );
  const ie = s(
    (e) => (a) => {
      C.current[e] = a;
    },
    []
  );
  O(() => {
    const e = (l) => {
      ["ArrowDown", "ArrowUp", "End", "Home", "Tab"].includes(l.key) && (P.current = !0);
    }, a = () => {
      P.current = !1;
    }, d = (l) => {
      var h;
      if (!(l.pointerType === "touch" && R.current !== l.pointerId)) {
        if (X.current) {
          N(), W(!1), b(!1), g();
          return;
        }
        P.current && ((h = Y.current) != null && h.contains(document.activeElement)) && p(!0), T(l.clientX, l.clientY, l.pointerType);
      }
    };
    return window.addEventListener("keydown", e, { passive: !0 }), window.addEventListener("pointerdown", a, { passive: !0 }), window.addEventListener("pointermove", d, { passive: !0 }), () => {
      window.removeEventListener("keydown", e), window.removeEventListener("pointerdown", a), window.removeEventListener("pointermove", d);
    };
  }, [N, g, T]);
  const se = s((e) => {
    e.currentTarget.contains(e.relatedTarget) || (P.current = !1, p(!1), y(null));
  }, [y]), ce = s(() => {
    P.current && p(!0);
  }, []), de = s((e) => {
    p(!1), y(null), !(e.pointerType === "touch" && R.current !== e.pointerId) && T(e.clientX, e.clientY, e.pointerType);
  }, [y, T]), ue = s(
    (e) => {
      p(!0), T(e.clientX, e.clientY, e.pointerType);
    },
    [T]
  ), he = s(
    (e) => {
      P.current = !1, p(!0), e.pointerType === "touch" && (R.current = e.pointerId), T(e.clientX, e.clientY, e.pointerType);
    },
    [T]
  ), _ = s((e) => {
    if (e.pointerType === "touch" && R.current === e.pointerId) {
      const a = Y.current;
      a && a.style.setProperty("--workbench-touch-return-ms", `${B.durationMs}ms`), R.current = null, b(!1), W(!0), N(), E.current = window.setTimeout(() => {
        E.current = null, g(), D.current = window.setTimeout(() => {
          D.current = null, W(!1);
        }, B.durationMs);
      }, B.holdMs);
    }
  }, [N, g, B.durationMs, B.holdMs]), fe = s(
    (e) => {
      var l;
      if (e.pointerType === "touch")
        return;
      const a = $e(e.target), d = a === null ? null : ((l = t[a]) == null ? void 0 : l.name) ?? null;
      y(d);
    },
    [t, y]
  ), me = s(
    (e) => {
      e.pointerType !== "touch" && y(null);
    },
    [y]
  ), pe = s(
    (e) => {
      e.pointerType !== "touch" && y(null);
    },
    [y]
  ), we = s(
    (e) => {
      e.pointerType === "touch" && R.current !== e.pointerId || (p(!0), T(e.clientX, e.clientY, e.pointerType));
    },
    [T]
  ), be = s(
    (e) => {
      P.current = !0, p(!0), e.key === "ArrowDown" && (e.preventDefault(), $(Math.min(I + 1, t.length - 1), !0)), e.key === "ArrowUp" && (e.preventDefault(), $(Math.max(I - 1, 0), !0)), e.key === "Home" && (e.preventDefault(), $(0, !0)), e.key === "End" && (e.preventDefault(), $(t.length - 1, !0));
    },
    [$, I, t.length]
  );
  return {
    activeItem: Z,
    artifactRef: Y,
    handleItemListPointerLeave: me,
    handleItemListPointerMove: fe,
    handleSelectedPanelPointerEnter: pe,
    handleWorkbenchBlur: se,
    handleWorkbenchFocus: ce,
    handleWorkbenchKeyDown: be,
    handleWorkbenchPointerCancel: _,
    handleWorkbenchPointerDown: he,
    handleWorkbenchPointerEnter: ue,
    handleWorkbenchPointerLeave: de,
    handleWorkbenchPointerMove: we,
    handleWorkbenchPointerUp: _,
    isWorkbenchEngaged: u,
    isWorkbenchSettling: F,
    isWorkbenchTracking: i,
    listRef: S,
    previewedItemName: c,
    registerRow: ie,
    selectItem: $
  };
}
function oe({ className: t = "showcase-detail", id: n, item: o }) {
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
  const p = ["workbench-row", o ? "is-active" : "", m ? "is-previewed" : ""].filter(Boolean).join(" "), i = `${c.slug}-summary`;
  return /* @__PURE__ */ f(
    "button",
    {
      "aria-controls": t,
      "aria-describedby": i,
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
          /* @__PURE__ */ r("small", { id: i, children: ((F = (b = c.details) == null ? void 0 : b[0]) == null ? void 0 : F.value) ?? c.summary })
        ] }),
        /* @__PURE__ */ r("em", { children: c.signal })
      ]
    }
  );
}
function ae({ title: t }) {
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
    handleSelectedPanelPointerEnter: i,
    handleWorkbenchBlur: b,
    handleWorkbenchFocus: F,
    handleWorkbenchKeyDown: W,
    handleWorkbenchPointerCancel: Y,
    handleWorkbenchPointerDown: S,
    handleWorkbenchPointerEnter: k,
    handleWorkbenchPointerLeave: M,
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
      onPointerCancel: Y,
      onPointerDown: S,
      onPointerEnter: k,
      onPointerLeave: M,
      onPointerMove: E,
      onPointerUp: D,
      ref: v,
      children: /* @__PURE__ */ r("div", { className: "hero-art-stage", children: /* @__PURE__ */ f("div", { className: "hero-art-motion-layer", children: [
        /* @__PURE__ */ f("div", { className: "artifact-window artifact-window-main", onKeyDown: W, children: [
          /* @__PURE__ */ r(ae, { title: n.title }),
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
                oe,
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
            onPointerEnter: i,
            onPointerMove: i,
            children: [
              /* @__PURE__ */ r("div", { className: "mini-heading", children: n.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ r(oe, { id: o, item: c })
            ]
          }
        ),
        n.tags && n.tags.length > 0 ? /* @__PURE__ */ r(Ce, { tags: n.tags }) : null
      ] }) })
    }
  ) : /* @__PURE__ */ r("div", { className: "hero-art", id: t, "aria-label": n.ariaLabel ?? "Showcase index", children: /* @__PURE__ */ r("div", { className: "hero-art-stage", children: /* @__PURE__ */ r("div", { className: "hero-art-motion-layer", children: /* @__PURE__ */ f("div", { className: "artifact-window artifact-window-main", children: [
    /* @__PURE__ */ r(ae, { title: n.title }),
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
    c.length > 0 ? /* @__PURE__ */ r("div", { className: "hero-orbit", "aria-hidden": "true", children: c.map((i, b) => /* @__PURE__ */ r("span", { className: qe(i.className, b), children: i.label }, `${i.className ?? b}-${i.label}`)) }) : null,
    /* @__PURE__ */ f("div", { className: "hero-copy", children: [
      /* @__PURE__ */ r("p", { className: "eyebrow", children: o.eyebrow }),
      /* @__PURE__ */ r("h1", { id: v, children: o.name }),
      /* @__PURE__ */ r("p", { className: "hero-statement", children: o.statement }),
      /* @__PURE__ */ r("p", { className: "hero-detail", children: o.detail }),
      t.length > 0 ? /* @__PURE__ */ r("div", { className: "hero-actions", "aria-label": "Primary actions", children: t.map((i) => /* @__PURE__ */ r(
        "a",
        {
          "aria-label": i.ariaLabel,
          className: Ue(i.variant, i.className),
          href: i.href,
          rel: i.rel,
          target: i.target,
          children: i.label
        },
        `${i.href}-${i.label}`
      )) }) : null
    ] }),
    u ? /* @__PURE__ */ r(Be, { id: u.id ?? Ke, workbench: u }) : null
  ] });
}
export {
  Qe as ShowcaseHero
};

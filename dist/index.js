import { jsxs as h, jsx as t } from "react/jsx-runtime";
import { useState as U, useRef as w, useMemo as O, useCallback as s, useEffect as Z } from "react";
const ne = {
  line: 1,
  page: 2
}, ke = 18, Pe = 0.26, Te = 0.35, Ie = 13, oe = 16, Me = 0.72, We = 18, Se = 16, xe = oe * 0.5, Re = 220, Le = 760;
function Ee(n, r) {
  return Math.min(Math.max(n, 0), r);
}
function De(n) {
  const r = n == null ? void 0 : n.maxTiltDegrees;
  return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? 1 : r / xe;
}
function re(n, r) {
  return typeof n != "number" || !Number.isFinite(n) || n < 0 ? r : n;
}
function Fe(n) {
  var r, a;
  return {
    durationMs: re((r = n == null ? void 0 : n.touchReleaseReturn) == null ? void 0 : r.durationMs, Le),
    holdMs: re((a = n == null ? void 0 : n.touchReleaseReturn) == null ? void 0 : a.holdMs, Re)
  };
}
function $e(n) {
  if (!(n instanceof Element))
    return null;
  const r = n.closest("[data-showcase-index]"), a = r == null ? void 0 : r.dataset.showcaseIndex;
  if (!a)
    return null;
  const m = Number.parseInt(a, 10);
  return Number.isNaN(m) ? null : m;
}
function Ae(n, r) {
  return n.deltaMode === ne.line ? n.deltaY * ke : n.deltaMode === ne.page ? n.deltaY * r.clientHeight : n.deltaY;
}
function Ye(n, r) {
  var _;
  const [a, m] = U(((_ = n[0]) == null ? void 0 : _.name) ?? ""), [c, v] = U(null), [u, f] = U(!1), [l, b] = U(!1), [A, I] = U(!1), M = w(null), L = w(null), W = w(null), N = w(null), E = w(null), D = w(null), S = w(0), Y = w(null), q = w(null), F = w(!1), T = w(!1), x = w(null), B = w([]), C = O(
    () => Math.max(0, n.findIndex((e) => e.name === a)),
    [a, n]
  ), $ = O(
    () => n.find((e) => e.name === a) ?? n[0],
    [a, n]
  ), R = O(() => De(r), [r]), j = O(() => Fe(r), [r]), y = s((e) => {
    q.current !== e && (q.current = e, v(e));
  }, []), z = s(() => {
    var e;
    N.current !== null && (window.cancelAnimationFrame(N.current), N.current = null), S.current = ((e = L.current) == null ? void 0 : e.scrollTop) ?? 0;
  }, []), k = s(() => {
    E.current !== null && (window.clearTimeout(E.current), E.current = null), D.current !== null && (window.clearTimeout(D.current), D.current = null);
  }, []), H = s(
    (e, o = !1) => {
      var i, p, X;
      const d = n[e];
      d && (m(d.name), y(null), o && (z(), (i = B.current[e]) == null || i.scrollIntoView({ block: "nearest", behavior: "auto" }), S.current = ((p = L.current) == null ? void 0 : p.scrollTop) ?? 0, (X = B.current[e]) == null || X.focus({ preventScroll: !0 })));
    },
    [z, y, n]
  ), Q = s(() => {
    const e = L.current;
    if (!e) {
      N.current = null;
      return;
    }
    const o = S.current - e.scrollTop;
    if (Math.abs(o) <= Te) {
      e.scrollTop = S.current, N.current = null;
      return;
    }
    e.scrollTop += o * Pe, N.current = window.requestAnimationFrame(Q);
  }, []), V = s((e) => {
    const o = L.current;
    if (!o)
      return !1;
    const d = o.scrollHeight - o.clientHeight;
    if (d <= 0)
      return !1;
    const i = N.current === null ? o.scrollTop : S.current, p = Ee(i + Ae(e, o), d);
    return S.current = p, F.current ? (o.scrollTop = p, !0) : (N.current === null && (N.current = window.requestAnimationFrame(Q)), !0);
  }, [Q]);
  Z(() => {
    const e = M.current;
    if (!e)
      return;
    const o = (d) => {
      V(d) && (d.preventDefault(), d.stopPropagation());
    };
    return e.addEventListener("wheel", o, { passive: !1 }), () => {
      e.removeEventListener("wheel", o);
    };
  }, [V]);
  const g = s(() => {
    W.current !== null && (window.cancelAnimationFrame(W.current), W.current = null), Y.current = null;
    const e = M.current;
    e && (e.style.removeProperty("--workbench-rotate-x"), e.style.removeProperty("--workbench-rotate-y"), e.style.removeProperty("--workbench-rotate-z"), e.style.removeProperty("--workbench-shift-x"), e.style.removeProperty("--workbench-shift-y"), e.style.removeProperty("--workbench-origin-x"), e.style.removeProperty("--workbench-origin-y"));
  }, []), G = s((e, o, d) => {
    if (F.current) {
      g();
      return;
    }
    Y.current = { clientX: e, clientY: o, pointerType: d }, W.current === null && (W.current = window.requestAnimationFrame(() => {
      const i = M.current, p = Y.current;
      if (W.current = null, Y.current = null, !i || !p)
        return;
      const X = p.clientX / window.innerWidth - 0.5, ee = p.clientY / window.innerHeight - 0.5, K = p.pointerType === "touch" ? 0.86 : 1, be = -ee * Ie * K * R, ye = X * oe * K * R, ge = X * Me * K * R, ve = X * We * K, Ne = ee * Se * K;
      i.style.setProperty("--workbench-rotate-x", `${be.toFixed(2)}deg`), i.style.setProperty("--workbench-rotate-y", `${ye.toFixed(2)}deg`), i.style.setProperty("--workbench-rotate-z", `${ge.toFixed(2)}deg`), i.style.setProperty("--workbench-shift-x", `${ve.toFixed(2)}px`), i.style.setProperty("--workbench-shift-y", `${Ne.toFixed(2)}px`);
    }));
  }, [R, g]), P = s(
    (e, o, d) => {
      if (F.current) {
        k(), I(!1), b(!1), g();
        return;
      }
      k(), I(!1), b(!0), G(e, o, d);
    },
    [k, g, G]
  );
  Z(() => {
    const e = window.matchMedia("(prefers-reduced-motion: reduce)"), o = () => {
      F.current = e.matches, e.matches && (k(), I(!1), g());
    };
    return o(), e.addEventListener("change", o), () => {
      e.removeEventListener("change", o);
    };
  }, [k, g]), Z(
    () => () => {
      z(), k(), g();
    },
    [z, k, g]
  );
  const le = s(
    (e) => (o) => {
      B.current[e] = o;
    },
    []
  );
  Z(() => {
    const e = (i) => {
      ["ArrowDown", "ArrowUp", "End", "Home", "Tab"].includes(i.key) && (T.current = !0);
    }, o = () => {
      T.current = !1;
    }, d = (i) => {
      var p;
      if (!(i.pointerType === "touch" && x.current !== i.pointerId)) {
        if (F.current) {
          k(), I(!1), b(!1), g();
          return;
        }
        T.current && ((p = M.current) != null && p.contains(document.activeElement)) && f(!0), P(i.clientX, i.clientY, i.pointerType);
      }
    };
    return window.addEventListener("keydown", e, { passive: !0 }), window.addEventListener("pointerdown", o, { passive: !0 }), window.addEventListener("pointermove", d, { passive: !0 }), () => {
      window.removeEventListener("keydown", e), window.removeEventListener("pointerdown", o), window.removeEventListener("pointermove", d);
    };
  }, [k, g, P]);
  const ie = s((e) => {
    e.currentTarget.contains(e.relatedTarget) || (T.current = !1, f(!1), y(null));
  }, [y]), ce = s(() => {
    T.current && f(!0);
  }, []), se = s((e) => {
    f(!1), y(null), !(e.pointerType === "touch" && x.current !== e.pointerId) && P(e.clientX, e.clientY, e.pointerType);
  }, [y, P]), de = s(
    (e) => {
      f(!0), P(e.clientX, e.clientY, e.pointerType);
    },
    [P]
  ), ue = s(
    (e) => {
      T.current = !1, f(!0), e.pointerType === "touch" && (x.current = e.pointerId), P(e.clientX, e.clientY, e.pointerType);
    },
    [P]
  ), J = s((e) => {
    if (e.pointerType === "touch" && x.current === e.pointerId) {
      const o = M.current;
      o && o.style.setProperty("--workbench-touch-return-ms", `${j.durationMs}ms`), x.current = null, b(!1), I(!0), k(), E.current = window.setTimeout(() => {
        E.current = null, g(), D.current = window.setTimeout(() => {
          D.current = null, I(!1);
        }, j.durationMs);
      }, j.holdMs);
    }
  }, [k, g, j.durationMs, j.holdMs]), he = s(
    (e) => {
      var i;
      if (e.pointerType === "touch")
        return;
      const o = $e(e.target), d = o === null ? null : ((i = n[o]) == null ? void 0 : i.name) ?? null;
      y(d);
    },
    [n, y]
  ), me = s(
    (e) => {
      e.pointerType !== "touch" && y(null);
    },
    [y]
  ), fe = s(
    (e) => {
      e.pointerType !== "touch" && y(null);
    },
    [y]
  ), pe = s(
    (e) => {
      e.pointerType === "touch" && x.current !== e.pointerId || (f(!0), P(e.clientX, e.clientY, e.pointerType));
    },
    [P]
  ), we = s(
    (e) => {
      T.current = !0, f(!0), e.key === "ArrowDown" && (e.preventDefault(), H(Math.min(C + 1, n.length - 1), !0)), e.key === "ArrowUp" && (e.preventDefault(), H(Math.max(C - 1, 0), !0)), e.key === "Home" && (e.preventDefault(), H(0, !0)), e.key === "End" && (e.preventDefault(), H(n.length - 1, !0));
    },
    [H, C, n.length]
  );
  return {
    activeItem: $,
    artifactRef: M,
    handleItemListPointerLeave: me,
    handleItemListPointerMove: he,
    handleSelectedPanelPointerEnter: fe,
    handleWorkbenchBlur: ie,
    handleWorkbenchFocus: ce,
    handleWorkbenchKeyDown: we,
    handleWorkbenchPointerCancel: J,
    handleWorkbenchPointerDown: ue,
    handleWorkbenchPointerEnter: de,
    handleWorkbenchPointerLeave: se,
    handleWorkbenchPointerMove: pe,
    handleWorkbenchPointerUp: J,
    isWorkbenchEngaged: u,
    isWorkbenchSettling: A,
    isWorkbenchTracking: l,
    listRef: L,
    previewedItemName: c,
    registerRow: le,
    selectItem: H
  };
}
function te({ className: n = "showcase-detail", id: r, item: a }) {
  var v;
  const m = `${r}-title`, c = a.metadata ?? ((v = a.destination) != null && v.type ? [a.destination.type] : []);
  return /* @__PURE__ */ h("div", { "aria-labelledby": m, "aria-live": "polite", className: n, id: r, role: "region", children: [
    /* @__PURE__ */ t("h2", { className: "showcase-detail-title", id: m, children: a.name }),
    c.length > 0 ? /* @__PURE__ */ t("div", { className: "showcase-detail-meta", "aria-label": `${a.name} metadata`, children: c.map((u) => /* @__PURE__ */ t("span", { children: u }, u)) }) : null,
    a.details && a.details.length > 0 ? /* @__PURE__ */ t("dl", { className: "showcase-detail-evidence", children: a.details.map((u) => /* @__PURE__ */ h("div", { children: [
      /* @__PURE__ */ t("dt", { children: u.label }),
      /* @__PURE__ */ t("dd", { children: u.value })
    ] }, u.label)) }) : null,
    /* @__PURE__ */ t("span", { className: "showcase-detail-signal", children: a.signal }),
    a.destination ? /* @__PURE__ */ t(
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
function He({ tags: n }) {
  return /* @__PURE__ */ t("div", { className: "metric-strip", "aria-hidden": "true", children: n.map((r) => /* @__PURE__ */ t("span", { children: r }, r)) });
}
function Xe({
  controlsId: n,
  index: r,
  isActive: a,
  isPreviewed: m,
  item: c,
  onActivate: v,
  setRef: u
}) {
  var b, A;
  const f = ["workbench-row", a ? "is-active" : "", m ? "is-previewed" : ""].filter(Boolean).join(" "), l = `${c.slug}-summary`;
  return /* @__PURE__ */ h(
    "button",
    {
      "aria-controls": n,
      "aria-describedby": l,
      "aria-pressed": a,
      className: f,
      "data-showcase-index": r,
      id: `showcase-${c.slug}`,
      onClick: v,
      ref: u,
      type: "button",
      children: [
        /* @__PURE__ */ t("span", { className: "workbench-index", children: String(r + 1).padStart(2, "0") }),
        /* @__PURE__ */ h("div", { children: [
          /* @__PURE__ */ t("strong", { children: c.name }),
          /* @__PURE__ */ t("p", { children: c.summary }),
          /* @__PURE__ */ t("small", { id: l, children: ((A = (b = c.details) == null ? void 0 : b[0]) == null ? void 0 : A.value) ?? c.summary })
        ] }),
        /* @__PURE__ */ t("em", { children: c.signal })
      ]
    }
  );
}
function ae({ title: n }) {
  return /* @__PURE__ */ h("div", { className: "window-bar", children: [
    /* @__PURE__ */ t("span", {}),
    /* @__PURE__ */ t("span", {}),
    /* @__PURE__ */ t("span", {}),
    /* @__PURE__ */ t("strong", { children: n })
  ] });
}
function Be({ id: n, workbench: r }) {
  const a = "selected-showcase-item", m = "selected-showcase-item-inline", {
    activeItem: c,
    artifactRef: v,
    handleItemListPointerLeave: u,
    handleItemListPointerMove: f,
    handleSelectedPanelPointerEnter: l,
    handleWorkbenchBlur: b,
    handleWorkbenchFocus: A,
    handleWorkbenchKeyDown: I,
    handleWorkbenchPointerCancel: M,
    handleWorkbenchPointerDown: L,
    handleWorkbenchPointerEnter: W,
    handleWorkbenchPointerLeave: N,
    handleWorkbenchPointerMove: E,
    handleWorkbenchPointerUp: D,
    isWorkbenchEngaged: S,
    isWorkbenchSettling: Y,
    isWorkbenchTracking: q,
    listRef: F,
    previewedItemName: T,
    registerRow: x,
    selectItem: B
  } = Ye(r.items, r.motion), C = [
    "hero-art",
    S ? "is-workbench-engaged" : "",
    q ? "is-workbench-tracking" : "",
    Y ? "is-workbench-settling" : ""
  ].filter(Boolean).join(" ");
  return c ? /* @__PURE__ */ t(
    "div",
    {
      className: C,
      id: n,
      "aria-label": r.ariaLabel ?? "Showcase index",
      onBlur: b,
      onFocus: A,
      onPointerCancel: M,
      onPointerDown: L,
      onPointerEnter: W,
      onPointerLeave: N,
      onPointerMove: E,
      onPointerUp: D,
      ref: v,
      children: /* @__PURE__ */ t("div", { className: "hero-art-stage", children: /* @__PURE__ */ h("div", { className: "hero-art-motion-layer", children: [
        /* @__PURE__ */ h("div", { className: "artifact-window artifact-window-main", onKeyDown: I, children: [
          /* @__PURE__ */ t(ae, { title: r.title }),
          /* @__PURE__ */ h("div", { className: "workbench-panel", children: [
            /* @__PURE__ */ h("div", { className: "workbench-summary", children: [
              /* @__PURE__ */ t("span", { children: r.eyebrow ?? "showcase index" }),
              /* @__PURE__ */ t("strong", { children: r.caption })
            ] }),
            /* @__PURE__ */ t(
              "ol",
              {
                "aria-label": r.listLabel ?? "Selectable showcase items",
                className: "workbench-list",
                onPointerLeave: u,
                onPointerMove: f,
                ref: F,
                children: r.items.map(($, R) => /* @__PURE__ */ t("li", { className: "workbench-item", children: /* @__PURE__ */ t(
                  Xe,
                  {
                    controlsId: `${a} ${m}`,
                    index: R,
                    isActive: $.name === c.name,
                    isPreviewed: $.name === T && $.name !== c.name,
                    item: $,
                    onActivate: () => B(R),
                    setRef: x(R)
                  }
                ) }, $.name))
              }
            ),
            /* @__PURE__ */ h("div", { className: "mobile-showcase-panel", children: [
              /* @__PURE__ */ t("div", { className: "mini-heading", children: r.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ t(
                te,
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
              /* @__PURE__ */ t("div", { className: "mini-heading", children: r.selectedLabel ?? "selected item" }),
              /* @__PURE__ */ t(te, { id: a, item: c })
            ]
          }
        ),
        r.tags && r.tags.length > 0 ? /* @__PURE__ */ t(He, { tags: r.tags }) : null
      ] }) })
    }
  ) : /* @__PURE__ */ t("div", { className: "hero-art", id: n, "aria-label": r.ariaLabel ?? "Showcase index", children: /* @__PURE__ */ t("div", { className: "hero-art-stage", children: /* @__PURE__ */ t("div", { className: "hero-art-motion-layer", children: /* @__PURE__ */ h("div", { className: "artifact-window artifact-window-main", children: [
    /* @__PURE__ */ t(ae, { title: r.title }),
    /* @__PURE__ */ t("div", { className: "workbench-panel", children: /* @__PURE__ */ h("div", { className: "workbench-summary", children: [
      /* @__PURE__ */ t("span", { children: r.eyebrow ?? "showcase index" }),
      /* @__PURE__ */ t("strong", { children: r.emptyState ?? r.caption })
    ] }) })
  ] }) }) }) });
}
const Ce = "hero-title", je = "work";
function Ke(n, r) {
  return [n === "secondary" ? "secondary-action" : "primary-action", r].filter(Boolean).join(" ");
}
function Ue(n, r) {
  const a = `orbit-tile-${["one", "two", "three", "four"][r] ?? "one"}`;
  return ["orbit-tile", n ?? a].filter(Boolean).join(" ");
}
function Oe({
  actions: n = [],
  className: r,
  content: a,
  id: m,
  orbitTiles: c = [],
  titleId: v = Ce,
  workbench: u
}) {
  const f = ["showcase-hero", "hero", r].filter(Boolean).join(" ");
  return /* @__PURE__ */ h("section", { className: f, id: m, "aria-labelledby": v, children: [
    /* @__PURE__ */ t("div", { className: "hero-noise", "aria-hidden": "true" }),
    /* @__PURE__ */ t("div", { className: "hero-grid", "aria-hidden": "true" }),
    c.length > 0 ? /* @__PURE__ */ t("div", { className: "hero-orbit", "aria-hidden": "true", children: c.map((l, b) => /* @__PURE__ */ t("span", { className: Ue(l.className, b), children: l.label }, `${l.className ?? b}-${l.label}`)) }) : null,
    /* @__PURE__ */ h("div", { className: "hero-copy", children: [
      /* @__PURE__ */ t("p", { className: "eyebrow", children: a.eyebrow }),
      /* @__PURE__ */ t("h1", { id: v, children: a.name }),
      /* @__PURE__ */ t("p", { className: "hero-statement", children: a.statement }),
      /* @__PURE__ */ t("p", { className: "hero-detail", children: a.detail }),
      n.length > 0 ? /* @__PURE__ */ t("div", { className: "hero-actions", "aria-label": "Primary actions", children: n.map((l) => /* @__PURE__ */ t(
        "a",
        {
          "aria-label": l.ariaLabel,
          className: Ke(l.variant, l.className),
          href: l.href,
          rel: l.rel,
          target: l.target,
          children: l.label
        },
        `${l.href}-${l.label}`
      )) }) : null
    ] }),
    u ? /* @__PURE__ */ t(Be, { id: u.id ?? je, workbench: u }) : null
  ] });
}
export {
  Oe as ShowcaseHero
};

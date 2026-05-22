import { jsxs as m, jsx as n } from "react/jsx-runtime";
import { useState as z, useRef as f, useMemo as J, useCallback as h, useEffect as O } from "react";
const _ = {
  line: 1,
  page: 2
}, ue = 18, he = 0.26, me = 0.35;
function fe(t, o) {
  return Math.min(Math.max(t, 0), o);
}
function pe(t, o) {
  return t.deltaMode === _.line ? t.deltaY * ue : t.deltaMode === _.page ? t.deltaY * o.clientHeight : t.deltaY;
}
function we(t) {
  var G;
  const [o, a] = z(((G = t[0]) == null ? void 0 : G.name) ?? ""), [p, u] = z(null), [w, d] = z(!1), [T, l] = z(!1), b = f(null), k = f(null), x = f(null), g = f(null), j = f(0), S = f(null), I = f(null), W = f(null), B = f(null), F = f(!1), y = f(!1), P = f([]), E = J(
    () => Math.max(0, t.findIndex((e) => e.name === o)),
    [o, t]
  ), re = J(
    () => t.find((e) => e.name === o) ?? t[0],
    [o, t]
  ), R = h((e) => {
    B.current !== e && (B.current = e, u(e));
  }, []), C = h(() => {
    var e;
    g.current !== null && (window.cancelAnimationFrame(g.current), g.current = null), j.current = ((e = k.current) == null ? void 0 : e.scrollTop) ?? 0;
  }, []), L = h(
    (e, r = !1) => {
      var c, s, v;
      const i = t[e];
      i && (a(i.name), R(null), r && (C(), (c = P.current[e]) == null || c.scrollIntoView({ block: "nearest", behavior: "auto" }), j.current = ((s = k.current) == null ? void 0 : s.scrollTop) ?? 0, (v = P.current[e]) == null || v.focus({ preventScroll: !0 })));
    },
    [C, R, t]
  ), U = h(() => {
    const e = k.current;
    if (!e) {
      g.current = null;
      return;
    }
    const r = j.current - e.scrollTop;
    if (Math.abs(r) <= me) {
      e.scrollTop = j.current, g.current = null;
      return;
    }
    e.scrollTop += r * he, g.current = window.requestAnimationFrame(U);
  }, []), Q = h((e) => {
    const r = k.current;
    if (!r)
      return !1;
    const i = r.scrollHeight - r.clientHeight;
    if (i <= 0)
      return !1;
    const c = g.current === null ? r.scrollTop : j.current, s = fe(c + pe(e, r), i);
    return j.current = s, F.current ? (r.scrollTop = s, !0) : (g.current === null && (g.current = window.requestAnimationFrame(U)), !0);
  }, [U]);
  O(() => {
    const e = b.current;
    if (!e)
      return;
    const r = (i) => {
      Q(i) && (i.preventDefault(), i.stopPropagation());
    };
    return e.addEventListener("wheel", r, { passive: !1 }), () => {
      e.removeEventListener("wheel", r);
    };
  }, [Q]);
  const A = h(() => {
    W.current !== null && (window.cancelAnimationFrame(W.current), W.current = null), I.current = null;
  }, []), D = h(() => {
    x.current !== null && (window.cancelAnimationFrame(x.current), x.current = null), S.current = null;
    const e = b.current;
    e && (e.style.removeProperty("--workbench-rotate-x"), e.style.removeProperty("--workbench-rotate-y"), e.style.removeProperty("--workbench-rotate-z"), e.style.removeProperty("--workbench-shift-x"), e.style.removeProperty("--workbench-shift-y"));
  }, []), H = h((e, r) => {
    if (F.current) {
      D();
      return;
    }
    S.current = { clientX: e, clientY: r }, x.current === null && (x.current = window.requestAnimationFrame(() => {
      const i = b.current, c = S.current;
      if (x.current = null, S.current = null, !i || !c)
        return;
      const s = c.clientX / window.innerWidth - 0.5, v = c.clientY / window.innerHeight - 0.5, K = -v * 13, N = s * 16, M = s * 0.72, $ = s * 18, q = v * 16;
      i.style.setProperty("--workbench-rotate-x", `${K.toFixed(2)}deg`), i.style.setProperty("--workbench-rotate-y", `${N.toFixed(2)}deg`), i.style.setProperty("--workbench-rotate-z", `${M.toFixed(2)}deg`), i.style.setProperty("--workbench-shift-x", `${$.toFixed(2)}px`), i.style.setProperty("--workbench-shift-y", `${q.toFixed(2)}px`);
    }));
  }, [D]);
  O(() => {
    const e = window.matchMedia("(prefers-reduced-motion: reduce)"), r = () => {
      F.current = e.matches, e.matches && D();
    };
    return r(), e.addEventListener("change", r), () => {
      e.removeEventListener("change", r);
    };
  }, [D]), O(
    () => () => {
      A(), C(), D();
    },
    [A, C, D]
  );
  const te = h(
    (e) => (r) => {
      P.current[e] = r;
    },
    []
  ), Z = h((e, r) => {
    const i = b.current;
    if (!i)
      return !1;
    const c = i.getBoundingClientRect(), s = 24;
    return e >= c.left - s && e <= c.right + s && r >= c.top - s && r <= c.bottom + s;
  }, []);
  O(() => {
    const e = (c) => {
      ["ArrowDown", "ArrowUp", "End", "Home", "Tab"].includes(c.key) && (y.current = !0);
    }, r = () => {
      y.current = !1;
    }, i = (c) => {
      var s;
      if (c.pointerType !== "touch") {
        if (F.current) {
          l(!1), d(Z(c.clientX, c.clientY));
          return;
        }
        if (y.current && ((s = b.current) != null && s.contains(document.activeElement))) {
          d(!0);
          return;
        }
        if (Z(c.clientX, c.clientY)) {
          d(!0), l(!1);
          return;
        }
        d(!1), l(!0), H(c.clientX, c.clientY);
      }
    };
    return window.addEventListener("keydown", e, { passive: !0 }), window.addEventListener("pointerdown", r, { passive: !0 }), window.addEventListener("pointermove", i, { passive: !0 }), () => {
      window.removeEventListener("keydown", e), window.removeEventListener("pointerdown", r), window.removeEventListener("pointermove", i);
    };
  }, [Z, H]);
  const X = h(
    (e, r) => {
      const i = k.current, c = B.current;
      if (!i)
        return null;
      const s = i.getBoundingClientRect(), v = 8;
      if (e < s.left - v || e > s.right + v || r < s.top - v || r > s.bottom + v)
        return null;
      const K = P.current.findIndex((N) => {
        if (!N)
          return !1;
        const M = N.getBoundingClientRect();
        return r >= M.top && r <= M.bottom;
      });
      if (K >= 0)
        return K;
      if (c) {
        const N = t.findIndex(($) => $.name === c), M = P.current[N];
        if (M) {
          const $ = M.getBoundingClientRect(), q = 10;
          if (r >= $.top - q && r <= $.bottom + q)
            return N;
        }
      }
      return c ? t.findIndex((N) => N.name === c) : null;
    },
    [t]
  ), V = h(
    (e, r) => {
      var s;
      const i = X(e, r), c = i === null || i < 0 ? null : ((s = t[i]) == null ? void 0 : s.name) ?? null;
      R(c);
    },
    [R, t, X]
  ), Y = h(
    (e, r) => {
      I.current = { clientX: e, clientY: r }, W.current === null && (W.current = window.requestAnimationFrame(() => {
        const i = I.current;
        W.current = null, I.current = null, i && V(i.clientX, i.clientY);
      }));
    },
    [V]
  ), oe = h((e) => {
    e.currentTarget.contains(e.relatedTarget) || (A(), y.current = !1, d(!1), R(null));
  }, [A, R]), ie = h(() => {
    y.current && (d(!0), l(!1));
  }, []), ce = h((e) => {
    A(), d(!1), l(!0), H(e.clientX, e.clientY), R(null);
  }, [A, R, H]), ae = h(
    (e) => {
      e.pointerType !== "touch" && (d(!0), l(!1), Y(e.clientX, e.clientY));
    },
    [Y]
  ), le = h(
    (e) => {
      e.pointerType !== "touch" && (d(!0), l(!1), Y(e.clientX, e.clientY));
    },
    [Y]
  ), se = h(
    (e) => {
      y.current = !0, d(!0), l(!1), e.key === "ArrowDown" && (e.preventDefault(), L(Math.min(E + 1, t.length - 1), !0)), e.key === "ArrowUp" && (e.preventDefault(), L(Math.max(E - 1, 0), !0)), e.key === "Home" && (e.preventDefault(), L(0, !0)), e.key === "End" && (e.preventDefault(), L(t.length - 1, !0));
    },
    [L, E, t.length]
  ), de = h(
    (e) => {
      if (y.current = !1, e.target instanceof Element && e.target.closest("[data-project-index]"))
        return;
      const r = X(e.clientX, e.clientY);
      r === null || r < 0 || L(r);
    },
    [L, X]
  );
  return {
    activeProject: re,
    artifactRef: b,
    handleProjectListClick: de,
    handleWorkbenchBlur: oe,
    handleWorkbenchFocus: ie,
    handleWorkbenchKeyDown: se,
    handleWorkbenchPointerEnter: ae,
    handleWorkbenchPointerLeave: ce,
    handleWorkbenchPointerMove: le,
    isWorkbenchEngaged: w,
    isWorkbenchTracking: T,
    listRef: k,
    previewedProjectName: p,
    registerRow: te,
    selectProject: L
  };
}
function ee({ className: t = "side-project", id: o, project: a }) {
  var w;
  const p = `${o}-title`, u = a.metadata ?? ((w = a.destination) != null && w.type ? [a.destination.type] : []);
  return /* @__PURE__ */ m("div", { "aria-labelledby": p, "aria-live": "polite", className: t, id: o, role: "region", children: [
    /* @__PURE__ */ n("h2", { className: "side-project-title", id: p, children: a.name }),
    u.length > 0 ? /* @__PURE__ */ n("div", { className: "side-project-meta", "aria-label": `${a.name} project metadata`, children: u.map((d) => /* @__PURE__ */ n("span", { children: d }, d)) }) : null,
    /* @__PURE__ */ m("dl", { className: "side-project-evidence", children: [
      /* @__PURE__ */ m("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Scope" }),
        /* @__PURE__ */ n("dd", { children: a.scope })
      ] }),
      /* @__PURE__ */ m("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Implementation" }),
        /* @__PURE__ */ n("dd", { children: a.implementation })
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: "side-project-signal", children: a.signal }),
    a.destination ? /* @__PURE__ */ n(
      "a",
      {
        "aria-label": a.destination.ariaLabel,
        className: "side-project-action",
        href: a.destination.href,
        rel: a.destination.rel,
        target: a.destination.target,
        children: a.destination.label
      }
    ) : null
  ] });
}
function be({ tags: t }) {
  return /* @__PURE__ */ n("div", { className: "metric-strip", "aria-hidden": "true", children: t.map((o) => /* @__PURE__ */ n("span", { children: o }, o)) });
}
function ge({
  controlsId: t,
  index: o,
  isActive: a,
  isPreviewed: p,
  item: u,
  onActivate: w,
  setRef: d
}) {
  const T = ["workbench-row", a ? "is-active" : "", p ? "is-previewed" : ""].filter(Boolean).join(" "), l = `${u.slug}-summary`;
  return /* @__PURE__ */ m(
    "button",
    {
      "aria-controls": t,
      "aria-describedby": l,
      "aria-pressed": a,
      className: T,
      "data-project-index": o,
      id: `project-${u.slug}`,
      onClick: w,
      ref: d,
      type: "button",
      children: [
        /* @__PURE__ */ n("span", { className: "workbench-index", children: String(o + 1).padStart(2, "0") }),
        /* @__PURE__ */ m("div", { children: [
          /* @__PURE__ */ n("strong", { children: u.name }),
          /* @__PURE__ */ n("p", { children: u.summary }),
          /* @__PURE__ */ n("small", { id: l, children: u.scope })
        ] }),
        /* @__PURE__ */ n("em", { children: u.signal })
      ]
    }
  );
}
function ne({ title: t }) {
  return /* @__PURE__ */ m("div", { className: "window-bar", children: [
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("span", {}),
    /* @__PURE__ */ n("strong", { children: t })
  ] });
}
function Pe({ id: t, workbench: o }) {
  const a = "selected-project", p = "selected-project-inline", {
    activeProject: u,
    artifactRef: w,
    handleProjectListClick: d,
    handleWorkbenchBlur: T,
    handleWorkbenchFocus: l,
    handleWorkbenchKeyDown: b,
    handleWorkbenchPointerEnter: k,
    handleWorkbenchPointerLeave: x,
    handleWorkbenchPointerMove: g,
    isWorkbenchEngaged: j,
    isWorkbenchTracking: S,
    listRef: I,
    previewedProjectName: W,
    registerRow: B,
    selectProject: F
  } = we(o.projects), y = [
    "hero-art",
    j ? "is-workbench-engaged" : "",
    S ? "is-workbench-tracking" : ""
  ].filter(Boolean).join(" ");
  return u ? /* @__PURE__ */ n(
    "div",
    {
      className: y,
      id: t,
      "aria-label": o.ariaLabel ?? "Public project index",
      onBlur: T,
      onFocus: l,
      onPointerEnter: k,
      onPointerLeave: x,
      onPointerMove: g,
      ref: w,
      children: /* @__PURE__ */ m("div", { className: "hero-art-stage", children: [
        /* @__PURE__ */ m("div", { className: "artifact-window artifact-window-main", onKeyDown: b, children: [
          /* @__PURE__ */ n(ne, { title: o.title }),
          /* @__PURE__ */ m("div", { className: "workbench-panel", children: [
            /* @__PURE__ */ m("div", { className: "workbench-summary", children: [
              /* @__PURE__ */ n("span", { children: o.eyebrow ?? "project index" }),
              /* @__PURE__ */ n("strong", { children: o.caption })
            ] }),
            /* @__PURE__ */ n(
              "ol",
              {
                "aria-label": "Selectable public projects",
                className: "workbench-list",
                onClick: d,
                ref: I,
                children: o.projects.map((P, E) => /* @__PURE__ */ n("li", { className: "workbench-item", children: /* @__PURE__ */ n(
                  ge,
                  {
                    controlsId: `${a} ${p}`,
                    index: E,
                    isActive: P.name === u.name,
                    isPreviewed: P.name === W && P.name !== u.name,
                    item: P,
                    onActivate: () => F(E),
                    setRef: B(E)
                  }
                ) }, P.name))
              }
            ),
            /* @__PURE__ */ m("div", { className: "mobile-project-panel", children: [
              /* @__PURE__ */ n("div", { className: "mini-heading", children: o.selectedLabel ?? "selected repo" }),
              /* @__PURE__ */ n(
                ee,
                {
                  className: "side-project side-project-inline",
                  id: p,
                  project: u
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ m("div", { className: "artifact-window artifact-window-side", children: [
          /* @__PURE__ */ n("div", { className: "mini-heading", children: o.selectedLabel ?? "selected repo" }),
          /* @__PURE__ */ n(ee, { id: a, project: u })
        ] }),
        o.tags && o.tags.length > 0 ? /* @__PURE__ */ n(be, { tags: o.tags }) : null
      ] })
    }
  ) : /* @__PURE__ */ n("div", { className: "hero-art", id: t, "aria-label": o.ariaLabel ?? "Public project index", children: /* @__PURE__ */ n("div", { className: "hero-art-stage", children: /* @__PURE__ */ m("div", { className: "artifact-window artifact-window-main", children: [
    /* @__PURE__ */ n(ne, { title: o.title }),
    /* @__PURE__ */ n("div", { className: "workbench-panel", children: /* @__PURE__ */ m("div", { className: "workbench-summary", children: [
      /* @__PURE__ */ n("span", { children: o.eyebrow ?? "project index" }),
      /* @__PURE__ */ n("strong", { children: o.emptyState ?? o.caption })
    ] }) })
  ] }) }) });
}
const ve = "hero-title", ye = "work";
function Ne(t, o) {
  return [t === "secondary" ? "secondary-action" : "primary-action", o].filter(Boolean).join(" ");
}
function ke(t, o) {
  const a = `orbit-tile-${["one", "two", "three", "four"][o] ?? "one"}`;
  return ["orbit-tile", t ?? a].filter(Boolean).join(" ");
}
function We({
  actions: t = [],
  className: o,
  content: a,
  id: p,
  orbitTiles: u = [],
  titleId: w = ve,
  workbench: d
}) {
  const T = ["source-hero", "hero", o].filter(Boolean).join(" ");
  return /* @__PURE__ */ m("section", { className: T, id: p, "aria-labelledby": w, children: [
    /* @__PURE__ */ n("div", { className: "hero-noise", "aria-hidden": "true" }),
    /* @__PURE__ */ n("div", { className: "hero-grid", "aria-hidden": "true" }),
    u.length > 0 ? /* @__PURE__ */ n("div", { className: "hero-orbit", "aria-hidden": "true", children: u.map((l, b) => /* @__PURE__ */ n("span", { className: ke(l.className, b), children: l.label }, `${l.className ?? b}-${l.label}`)) }) : null,
    /* @__PURE__ */ m("div", { className: "hero-copy", children: [
      /* @__PURE__ */ n("p", { className: "eyebrow", children: a.eyebrow }),
      /* @__PURE__ */ n("h1", { id: w, children: a.name }),
      /* @__PURE__ */ n("p", { className: "hero-statement", children: a.statement }),
      /* @__PURE__ */ n("p", { className: "hero-detail", children: a.detail }),
      t.length > 0 ? /* @__PURE__ */ n("div", { className: "hero-actions", "aria-label": "Primary actions", children: t.map((l) => /* @__PURE__ */ n(
        "a",
        {
          "aria-label": l.ariaLabel,
          className: Ne(l.variant, l.className),
          href: l.href,
          rel: l.rel,
          target: l.target,
          children: l.label
        },
        `${l.href}-${l.label}`
      )) }) : null
    ] }),
    d ? /* @__PURE__ */ n(Pe, { id: d.id ?? ye, workbench: d }) : null
  ] });
}
export {
  We as SourceHero
};

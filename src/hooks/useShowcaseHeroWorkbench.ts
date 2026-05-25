import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { ShowcaseHeroItem, ShowcaseHeroMotion } from "../types.js";

const wheelDeltaMode = {
  line: 1,
  page: 2,
} as const;
const wheelLineHeight = 18;
const smoothScrollEase = 0.26;
const smoothScrollSnapDistance = 0.35;
const defaultRotateXMultiplier = 13;
const defaultRotateYMultiplier = 16;
const defaultRotateZMultiplier = 0.72;
const defaultShiftXMultiplier = 18;
const defaultShiftYMultiplier = 16;
const defaultMaxTiltDegrees = defaultRotateYMultiplier * 0.5;
const defaultTouchReleaseHoldMs = 220;
const defaultTouchReleaseDurationMs = 760;
// Smooth coarse touch event streams while keeping pointer-follow movement responsive.
const mouseFollowEase = 0.52;
const touchFollowEase = 0.3;
const motionSnapDelta = 0.04;

type WorkbenchMotionState = {
  pointerType: string;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  shiftX: number;
  shiftY: number;
};

function createRestMotionState(pointerType: string): WorkbenchMotionState {
  return {
    pointerType,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    shiftX: 0,
    shiftY: 0,
  };
}

function clampScrollTop(nextScrollTop: number, maxScrollTop: number) {
  return Math.min(Math.max(nextScrollTop, 0), maxScrollTop);
}

function resolveMotionScale(motion: ShowcaseHeroMotion | undefined) {
  const maxTiltDegrees = motion?.maxTiltDegrees;

  if (typeof maxTiltDegrees !== "number" || !Number.isFinite(maxTiltDegrees) || maxTiltDegrees <= 0) {
    return 1;
  }

  return maxTiltDegrees / defaultMaxTiltDegrees;
}

function resolveDurationMs(value: number | undefined, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return fallback;
  }

  return value;
}

function resolveTouchReleaseReturn(motion: ShowcaseHeroMotion | undefined) {
  return {
    durationMs: resolveDurationMs(motion?.touchReleaseReturn?.durationMs, defaultTouchReleaseDurationMs),
    holdMs: resolveDurationMs(motion?.touchReleaseReturn?.holdMs, defaultTouchReleaseHoldMs),
  };
}

function applyWorkbenchMotion(artifact: HTMLDivElement, motion: WorkbenchMotionState) {
  artifact.style.setProperty("--workbench-rotate-x", `${motion.rotateX.toFixed(2)}deg`);
  artifact.style.setProperty("--workbench-rotate-y", `${motion.rotateY.toFixed(2)}deg`);
  artifact.style.setProperty("--workbench-rotate-z", `${motion.rotateZ.toFixed(2)}deg`);
  artifact.style.setProperty("--workbench-shift-x", `${motion.shiftX.toFixed(2)}px`);
  artifact.style.setProperty("--workbench-shift-y", `${motion.shiftY.toFixed(2)}px`);
}

function interpolateMotion(current: WorkbenchMotionState, target: WorkbenchMotionState) {
  const ease = target.pointerType === "touch" ? touchFollowEase : mouseFollowEase;

  return {
    pointerType: target.pointerType,
    rotateX: current.rotateX + (target.rotateX - current.rotateX) * ease,
    rotateY: current.rotateY + (target.rotateY - current.rotateY) * ease,
    rotateZ: current.rotateZ + (target.rotateZ - current.rotateZ) * ease,
    shiftX: current.shiftX + (target.shiftX - current.shiftX) * ease,
    shiftY: current.shiftY + (target.shiftY - current.shiftY) * ease,
  };
}

function getMotionDelta(current: WorkbenchMotionState, target: WorkbenchMotionState) {
  return Math.max(
    Math.abs(target.rotateX - current.rotateX),
    Math.abs(target.rotateY - current.rotateY),
    Math.abs(target.rotateZ - current.rotateZ),
    Math.abs(target.shiftX - current.shiftX),
    Math.abs(target.shiftY - current.shiftY),
  );
}

function getItemIndexFromTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  const row = target.closest<HTMLElement>("[data-showcase-index]");
  const index = row?.dataset.showcaseIndex;

  if (!index) {
    return null;
  }

  const parsedIndex = Number.parseInt(index, 10);

  return Number.isNaN(parsedIndex) ? null : parsedIndex;
}

function normalizeWheelDelta(event: WheelEvent, list: HTMLOListElement) {
  if (event.deltaMode === wheelDeltaMode.line) {
    return event.deltaY * wheelLineHeight;
  }

  if (event.deltaMode === wheelDeltaMode.page) {
    return event.deltaY * list.clientHeight;
  }

  return event.deltaY;
}

export function useShowcaseHeroWorkbench(items: readonly ShowcaseHeroItem[], motion?: ShowcaseHeroMotion) {
  const [activeItemName, setActiveItemName] = useState(items[0]?.name ?? "");
  const [previewedItemName, setPreviewedItemName] = useState<string | null>(null);
  const [isWorkbenchEngaged, setIsWorkbenchEngaged] = useState(false);
  const [isWorkbenchTracking, setIsWorkbenchTracking] = useState(false);
  const [isWorkbenchSettling, setIsWorkbenchSettling] = useState(false);
  const artifactRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const motionFrame = useRef<number | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const touchReleaseHoldTimer = useRef<number | null>(null);
  const touchReleaseSettleTimer = useRef<number | null>(null);
  const targetScrollTop = useRef(0);
  const motionCurrent = useRef<WorkbenchMotionState | null>(null);
  const motionTarget = useRef<WorkbenchMotionState | null>(null);
  const previewedItemNameRef = useRef<string | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const isKeyboardFocusRef = useRef(false);
  const activeTouchPointerIdRef = useRef<number | null>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeItemIndex = useMemo(
    () => Math.max(0, items.findIndex((item) => item.name === activeItemName)),
    [activeItemName, items],
  );
  const activeItem = useMemo(
    () => items.find((item) => item.name === activeItemName) ?? items[0],
    [activeItemName, items],
  );
  const motionScale = useMemo(() => resolveMotionScale(motion), [motion]);
  const touchReleaseReturn = useMemo(() => resolveTouchReleaseReturn(motion), [motion]);

  const previewItem = useCallback((nextItemName: string | null) => {
    if (previewedItemNameRef.current === nextItemName) {
      return;
    }

    previewedItemNameRef.current = nextItemName;
    setPreviewedItemName(nextItemName);
  }, []);

  const cancelSmoothItemScroll = useCallback(() => {
    if (scrollFrame.current !== null) {
      window.cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = null;
    }

    targetScrollTop.current = listRef.current?.scrollTop ?? 0;
  }, []);

  const clearTouchReleaseTimers = useCallback(() => {
    if (touchReleaseHoldTimer.current !== null) {
      window.clearTimeout(touchReleaseHoldTimer.current);
      touchReleaseHoldTimer.current = null;
    }

    if (touchReleaseSettleTimer.current !== null) {
      window.clearTimeout(touchReleaseSettleTimer.current);
      touchReleaseSettleTimer.current = null;
    }
  }, []);

  const activateItem = useCallback(
    (index: number, shouldScroll = false) => {
      const nextItem = items[index];

      if (!nextItem) {
        return;
      }

      setActiveItemName(nextItem.name);
      previewItem(null);

      if (shouldScroll) {
        cancelSmoothItemScroll();
        rowRefs.current[index]?.scrollIntoView({ block: "nearest", behavior: "auto" });
        targetScrollTop.current = listRef.current?.scrollTop ?? 0;
        rowRefs.current[index]?.focus({ preventScroll: true });
      }
    },
    [cancelSmoothItemScroll, previewItem, items],
  );

  const animateItemScroll = useCallback(() => {
    const list = listRef.current;

    if (!list) {
      scrollFrame.current = null;
      return;
    }

    const distance = targetScrollTop.current - list.scrollTop;

    if (Math.abs(distance) <= smoothScrollSnapDistance) {
      list.scrollTop = targetScrollTop.current;
      scrollFrame.current = null;
      return;
    }

    list.scrollTop += distance * smoothScrollEase;
    scrollFrame.current = window.requestAnimationFrame(animateItemScroll);
  }, []);

  const scrollItemList = useCallback((event: WheelEvent) => {
    const list = listRef.current;

    if (!list) {
      return false;
    }

    const maxScrollTop = list.scrollHeight - list.clientHeight;

    if (maxScrollTop <= 0) {
      return false;
    }

    const baseScrollTop = scrollFrame.current === null ? list.scrollTop : targetScrollTop.current;
    const nextScrollTop = clampScrollTop(baseScrollTop + normalizeWheelDelta(event, list), maxScrollTop);

    if (Math.abs(nextScrollTop - baseScrollTop) <= smoothScrollSnapDistance) {
      return false;
    }

    targetScrollTop.current = nextScrollTop;

    if (prefersReducedMotionRef.current) {
      list.scrollTop = nextScrollTop;
      return true;
    }

    if (scrollFrame.current === null) {
      scrollFrame.current = window.requestAnimationFrame(animateItemScroll);
    }

    return true;
  }, [animateItemScroll]);

  useEffect(() => {
    const target = listRef.current;

    if (!target) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!scrollItemList(event)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    target.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      target.removeEventListener("wheel", handleWheel);
    };
  }, [scrollItemList]);

  const resetWorkbenchMotion = useCallback(() => {
    if (motionFrame.current !== null) {
      window.cancelAnimationFrame(motionFrame.current);
      motionFrame.current = null;
    }

    motionCurrent.current = null;
    motionTarget.current = null;

    const artifact = artifactRef.current;

    if (!artifact) {
      return;
    }

    artifact.style.removeProperty("--workbench-rotate-x");
    artifact.style.removeProperty("--workbench-rotate-y");
    artifact.style.removeProperty("--workbench-rotate-z");
    artifact.style.removeProperty("--workbench-shift-x");
    artifact.style.removeProperty("--workbench-shift-y");
    artifact.style.removeProperty("--workbench-origin-x");
    artifact.style.removeProperty("--workbench-origin-y");
  }, []);

  const runWorkbenchMotionFrame = useCallback(() => {
    const artifact = artifactRef.current;
    const target = motionTarget.current;

    if (!artifact || !target) {
      motionFrame.current = null;
      return;
    }

    const current = motionCurrent.current ?? createRestMotionState(target.pointerType);
    const next = interpolateMotion(current, target);
    const resolved = getMotionDelta(next, target) <= motionSnapDelta ? target : next;

    motionCurrent.current = resolved;
    applyWorkbenchMotion(artifact, resolved);

    if (resolved === target) {
      motionFrame.current = null;
      return;
    }

    motionFrame.current = window.requestAnimationFrame(runWorkbenchMotionFrame);
  }, []);

  const setWorkbenchMotionTarget = useCallback((clientX: number, clientY: number, pointerType: string) => {
    if (prefersReducedMotionRef.current) {
      resetWorkbenchMotion();
      return;
    }

    const x = clientX / window.innerWidth - 0.5;
    const y = clientY / window.innerHeight - 0.5;
    const pointerScale = pointerType === "touch" ? 0.86 : 1;

    motionTarget.current = {
      pointerType,
      rotateX: -y * defaultRotateXMultiplier * pointerScale * motionScale,
      rotateY: x * defaultRotateYMultiplier * pointerScale * motionScale,
      rotateZ: x * defaultRotateZMultiplier * pointerScale * motionScale,
      shiftX: x * defaultShiftXMultiplier * pointerScale,
      shiftY: y * defaultShiftYMultiplier * pointerScale,
    };

    if (motionFrame.current === null) {
      motionFrame.current = window.requestAnimationFrame(runWorkbenchMotionFrame);
    }
  }, [motionScale, resetWorkbenchMotion, runWorkbenchMotionFrame]);

  const trackWorkbenchMotion = useCallback(
    (clientX: number, clientY: number, pointerType: string) => {
      if (prefersReducedMotionRef.current) {
        clearTouchReleaseTimers();
        setIsWorkbenchSettling(false);
        setIsWorkbenchTracking(false);
        resetWorkbenchMotion();
        return;
      }

      clearTouchReleaseTimers();
      setIsWorkbenchSettling(false);
      setIsWorkbenchTracking(true);
      setWorkbenchMotionTarget(clientX, clientY, pointerType);
    },
    [clearTouchReleaseTimers, resetWorkbenchMotion, setWorkbenchMotionTarget],
  );

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotionPreference = () => {
      prefersReducedMotionRef.current = reducedMotionQuery.matches;

      if (reducedMotionQuery.matches) {
        clearTouchReleaseTimers();
        setIsWorkbenchSettling(false);
        resetWorkbenchMotion();
      }
    };

    syncReducedMotionPreference();
    reducedMotionQuery.addEventListener("change", syncReducedMotionPreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncReducedMotionPreference);
    };
  }, [clearTouchReleaseTimers, resetWorkbenchMotion]);

  useEffect(
    () => () => {
      cancelSmoothItemScroll();
      clearTouchReleaseTimers();
      resetWorkbenchMotion();
    },
    [cancelSmoothItemScroll, clearTouchReleaseTimers, resetWorkbenchMotion],
  );

  const registerRow = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      rowRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const handleWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "End", "Home", "Tab"].includes(event.key)) {
        isKeyboardFocusRef.current = true;
      }
    };

    const handleWindowPointerDown = () => {
      isKeyboardFocusRef.current = false;
    };

    const handleWindowPointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch" && activeTouchPointerIdRef.current !== event.pointerId) {
        return;
      }

      if (prefersReducedMotionRef.current) {
        clearTouchReleaseTimers();
        setIsWorkbenchSettling(false);
        setIsWorkbenchTracking(false);
        resetWorkbenchMotion();
        return;
      }

      if (isKeyboardFocusRef.current && artifactRef.current?.contains(document.activeElement)) {
        setIsWorkbenchEngaged(true);
      }

      trackWorkbenchMotion(event.clientX, event.clientY, event.pointerType);
    };

    window.addEventListener("keydown", handleWindowKeyDown, { passive: true });
    window.addEventListener("pointerdown", handleWindowPointerDown, { passive: true });
    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
      window.removeEventListener("pointerdown", handleWindowPointerDown);
      window.removeEventListener("pointermove", handleWindowPointerMove);
    };
  }, [clearTouchReleaseTimers, resetWorkbenchMotion, trackWorkbenchMotion]);

  const handleWorkbenchBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      isKeyboardFocusRef.current = false;
      setIsWorkbenchEngaged(false);
      previewItem(null);
    }
  }, [previewItem]);

  const handleWorkbenchFocus = useCallback(() => {
    if (isKeyboardFocusRef.current) {
      setIsWorkbenchEngaged(true);
    }
  }, []);

  const handleWorkbenchPointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    setIsWorkbenchEngaged(false);
    previewItem(null);

    if (event.pointerType === "touch" && activeTouchPointerIdRef.current !== event.pointerId) {
      return;
    }

    trackWorkbenchMotion(event.clientX, event.clientY, event.pointerType);
  }, [previewItem, trackWorkbenchMotion]);

  const handleWorkbenchPointerEnter = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      setIsWorkbenchEngaged(true);
      trackWorkbenchMotion(event.clientX, event.clientY, event.pointerType);
    },
    [trackWorkbenchMotion],
  );

  const handleWorkbenchPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      isKeyboardFocusRef.current = false;
      setIsWorkbenchEngaged(true);

      if (event.pointerType === "touch") {
        activeTouchPointerIdRef.current = event.pointerId;
      }

      trackWorkbenchMotion(event.clientX, event.clientY, event.pointerType);
    },
    [trackWorkbenchMotion],
  );

  const releaseTouchPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && activeTouchPointerIdRef.current === event.pointerId) {
      const artifact = artifactRef.current;

      if (artifact) {
        artifact.style.setProperty("--workbench-touch-return-ms", `${touchReleaseReturn.durationMs}ms`);
      }

      activeTouchPointerIdRef.current = null;
      setIsWorkbenchTracking(false);
      setIsWorkbenchSettling(true);

      clearTouchReleaseTimers();
      touchReleaseHoldTimer.current = window.setTimeout(() => {
        touchReleaseHoldTimer.current = null;
        resetWorkbenchMotion();

        touchReleaseSettleTimer.current = window.setTimeout(() => {
          touchReleaseSettleTimer.current = null;
          setIsWorkbenchSettling(false);
        }, touchReleaseReturn.durationMs);
      }, touchReleaseReturn.holdMs);
    }
  }, [clearTouchReleaseTimers, resetWorkbenchMotion, touchReleaseReturn.durationMs, touchReleaseReturn.holdMs]);

  const handleItemListPointerMove = useCallback(
    (event: PointerEvent<HTMLOListElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      // Keep preview ownership inside the list; selected-panel links should not affect row hover.
      const nextItemIndex = getItemIndexFromTarget(event.target);
      const nextItemName = nextItemIndex === null ? null : items[nextItemIndex]?.name ?? null;

      previewItem(nextItemName);
    },
    [items, previewItem],
  );

  const handleItemListPointerLeave = useCallback(
    (event: PointerEvent<HTMLOListElement>) => {
      if (event.pointerType !== "touch") {
        previewItem(null);
      }
    },
    [previewItem],
  );

  const handleSelectedPanelPointerEnter = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "touch") {
        previewItem(null);
      }
    },
    [previewItem],
  );

  const handleWorkbenchPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch" && activeTouchPointerIdRef.current !== event.pointerId) {
        return;
      }

      setIsWorkbenchEngaged(true);
      trackWorkbenchMotion(event.clientX, event.clientY, event.pointerType);
    },
    [trackWorkbenchMotion],
  );

  const handleWorkbenchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      isKeyboardFocusRef.current = true;
      setIsWorkbenchEngaged(true);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        activateItem(Math.min(activeItemIndex + 1, items.length - 1), true);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        activateItem(Math.max(activeItemIndex - 1, 0), true);
      }

      if (event.key === "Home") {
        event.preventDefault();
        activateItem(0, true);
      }

      if (event.key === "End") {
        event.preventDefault();
        activateItem(items.length - 1, true);
      }
    },
    [activateItem, activeItemIndex, items.length],
  );

  return {
    activeItem,
    artifactRef,
    handleItemListPointerLeave,
    handleItemListPointerMove,
    handleSelectedPanelPointerEnter,
    handleWorkbenchBlur,
    handleWorkbenchFocus,
    handleWorkbenchKeyDown,
    handleWorkbenchPointerCancel: releaseTouchPointer,
    handleWorkbenchPointerDown,
    handleWorkbenchPointerEnter,
    handleWorkbenchPointerLeave,
    handleWorkbenchPointerMove,
    handleWorkbenchPointerUp: releaseTouchPointer,
    isWorkbenchEngaged,
    isWorkbenchSettling,
    isWorkbenchTracking,
    listRef,
    previewedItemName,
    registerRow,
    selectItem: activateItem,
  };
}

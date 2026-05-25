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
  const artifactRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const motionFrame = useRef<number | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const targetScrollTop = useRef(0);
  const pendingMotionPoint = useRef<{ clientX: number; clientY: number; pointerType: string } | null>(null);
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
    const target = artifactRef.current;

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

    pendingMotionPoint.current = null;

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

  const setWorkbenchMotionTarget = useCallback((clientX: number, clientY: number, pointerType: string) => {
    if (prefersReducedMotionRef.current) {
      resetWorkbenchMotion();
      return;
    }

    pendingMotionPoint.current = { clientX, clientY, pointerType };

    if (motionFrame.current !== null) {
      return;
    }

    motionFrame.current = window.requestAnimationFrame(() => {
      const artifact = artifactRef.current;
      const point = pendingMotionPoint.current;

      motionFrame.current = null;
      pendingMotionPoint.current = null;

      if (!artifact || !point) {
        return;
      }

      const x = point.clientX / window.innerWidth - 0.5;
      const y = point.clientY / window.innerHeight - 0.5;
      const pointerScale = point.pointerType === "touch" ? 0.86 : 1;
      const rotateX = -y * defaultRotateXMultiplier * pointerScale * motionScale;
      const rotateY = x * defaultRotateYMultiplier * pointerScale * motionScale;
      const rotateZ = x * defaultRotateZMultiplier * pointerScale * motionScale;
      const shiftX = x * defaultShiftXMultiplier * pointerScale;
      const shiftY = y * defaultShiftYMultiplier * pointerScale;

      artifact.style.setProperty("--workbench-rotate-x", `${rotateX.toFixed(2)}deg`);
      artifact.style.setProperty("--workbench-rotate-y", `${rotateY.toFixed(2)}deg`);
      artifact.style.setProperty("--workbench-rotate-z", `${rotateZ.toFixed(2)}deg`);
      artifact.style.setProperty("--workbench-shift-x", `${shiftX.toFixed(2)}px`);
      artifact.style.setProperty("--workbench-shift-y", `${shiftY.toFixed(2)}px`);
    });
  }, [motionScale, resetWorkbenchMotion]);

  const trackWorkbenchMotion = useCallback(
    (clientX: number, clientY: number, pointerType: string) => {
      if (prefersReducedMotionRef.current) {
        setIsWorkbenchTracking(false);
        resetWorkbenchMotion();
        return;
      }

      setIsWorkbenchTracking(true);
      setWorkbenchMotionTarget(clientX, clientY, pointerType);
    },
    [resetWorkbenchMotion, setWorkbenchMotionTarget],
  );

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotionPreference = () => {
      prefersReducedMotionRef.current = reducedMotionQuery.matches;

      if (reducedMotionQuery.matches) {
        resetWorkbenchMotion();
      }
    };

    syncReducedMotionPreference();
    reducedMotionQuery.addEventListener("change", syncReducedMotionPreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncReducedMotionPreference);
    };
  }, [resetWorkbenchMotion]);

  useEffect(
    () => () => {
      cancelSmoothItemScroll();
      resetWorkbenchMotion();
    },
    [cancelSmoothItemScroll, resetWorkbenchMotion],
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
  }, [resetWorkbenchMotion, trackWorkbenchMotion]);

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
      activeTouchPointerIdRef.current = null;
      setIsWorkbenchTracking(false);
    }
  }, []);

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
    isWorkbenchTracking,
    listRef,
    previewedItemName,
    registerRow,
    selectItem: activateItem,
  };
}

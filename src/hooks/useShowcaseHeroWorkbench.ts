import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import type { ShowcaseHeroItem } from "../types";

const wheelDeltaMode = {
  line: 1,
  page: 2,
} as const;
const wheelLineHeight = 18;
const smoothScrollEase = 0.26;
const smoothScrollSnapDistance = 0.35;

function clampScrollTop(nextScrollTop: number, maxScrollTop: number) {
  return Math.min(Math.max(nextScrollTop, 0), maxScrollTop);
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

export function useShowcaseHeroWorkbench(items: readonly ShowcaseHeroItem[]) {
  const [activeItemName, setActiveItemName] = useState(items[0]?.name ?? "");
  const [previewedItemName, setPreviewedItemName] = useState<string | null>(null);
  const [isWorkbenchEngaged, setIsWorkbenchEngaged] = useState(false);
  const [isWorkbenchTracking, setIsWorkbenchTracking] = useState(false);
  const artifactRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const motionFrame = useRef<number | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const targetScrollTop = useRef(0);
  const pendingMotionPoint = useRef<{ clientX: number; clientY: number } | null>(null);
  const pendingPreviewPoint = useRef<{ clientX: number; clientY: number } | null>(null);
  const previewFrame = useRef<number | null>(null);
  const previewedItemNameRef = useRef<string | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const isKeyboardFocusRef = useRef(false);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeItemIndex = useMemo(
    () => Math.max(0, items.findIndex((item) => item.name === activeItemName)),
    [activeItemName, items],
  );
  const activeItem = useMemo(
    () => items.find((item) => item.name === activeItemName) ?? items[0],
    [activeItemName, items],
  );

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

  const cancelPendingPreview = useCallback(() => {
    if (previewFrame.current !== null) {
      window.cancelAnimationFrame(previewFrame.current);
      previewFrame.current = null;
    }

    pendingPreviewPoint.current = null;
  }, []);

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
  }, []);

  const setWorkbenchMotionTarget = useCallback((clientX: number, clientY: number) => {
    if (prefersReducedMotionRef.current) {
      resetWorkbenchMotion();
      return;
    }

    pendingMotionPoint.current = { clientX, clientY };

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
      const rotateX = -y * 13;
      const rotateY = x * 16;
      const rotateZ = x * 0.72;
      const shiftX = x * 18;
      const shiftY = y * 16;

      artifact.style.setProperty("--workbench-rotate-x", `${rotateX.toFixed(2)}deg`);
      artifact.style.setProperty("--workbench-rotate-y", `${rotateY.toFixed(2)}deg`);
      artifact.style.setProperty("--workbench-rotate-z", `${rotateZ.toFixed(2)}deg`);
      artifact.style.setProperty("--workbench-shift-x", `${shiftX.toFixed(2)}px`);
      artifact.style.setProperty("--workbench-shift-y", `${shiftY.toFixed(2)}px`);
    });
  }, [resetWorkbenchMotion]);

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
      cancelPendingPreview();
      cancelSmoothItemScroll();
      resetWorkbenchMotion();
    },
    [cancelPendingPreview, cancelSmoothItemScroll, resetWorkbenchMotion],
  );

  const registerRow = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      rowRefs.current[index] = node;
    },
    [],
  );

  const isPointInsideWorkbenchZone = useCallback((clientX: number, clientY: number) => {
    const artifact = artifactRef.current;

    if (!artifact) {
      return false;
    }

    const rect = artifact.getBoundingClientRect();
    const pauseDeadband = 24;

    return (
      clientX >= rect.left - pauseDeadband &&
      clientX <= rect.right + pauseDeadband &&
      clientY >= rect.top - pauseDeadband &&
      clientY <= rect.bottom + pauseDeadband
    );
  }, []);

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
      if (event.pointerType === "touch") {
        return;
      }

      if (prefersReducedMotionRef.current) {
        setIsWorkbenchTracking(false);
        setIsWorkbenchEngaged(isPointInsideWorkbenchZone(event.clientX, event.clientY));
        return;
      }

      if (isKeyboardFocusRef.current && artifactRef.current?.contains(document.activeElement)) {
        setIsWorkbenchEngaged(true);
        return;
      }

      if (isPointInsideWorkbenchZone(event.clientX, event.clientY)) {
        setIsWorkbenchEngaged(true);
        setIsWorkbenchTracking(false);
        return;
      }

      setIsWorkbenchEngaged(false);
      setIsWorkbenchTracking(true);
      setWorkbenchMotionTarget(event.clientX, event.clientY);
    };

    window.addEventListener("keydown", handleWindowKeyDown, { passive: true });
    window.addEventListener("pointerdown", handleWindowPointerDown, { passive: true });
    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
      window.removeEventListener("pointerdown", handleWindowPointerDown);
      window.removeEventListener("pointermove", handleWindowPointerMove);
    };
  }, [isPointInsideWorkbenchZone, setWorkbenchMotionTarget]);

  const resolveItemIndexAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      const list = listRef.current;
      const currentItemName = previewedItemNameRef.current;

      if (!list) {
        return null;
      }

      const listRect = list.getBoundingClientRect();
      const listDeadband = 8;

      if (
        clientX < listRect.left - listDeadband ||
        clientX > listRect.right + listDeadband ||
        clientY < listRect.top - listDeadband ||
        clientY > listRect.bottom + listDeadband
      ) {
        return null;
      }

      const directRowIndex = rowRefs.current.findIndex((row) => {
        if (!row) {
          return false;
        }

        const rowRect = row.getBoundingClientRect();
        return clientY >= rowRect.top && clientY <= rowRect.bottom;
      });

      if (directRowIndex >= 0) {
        return directRowIndex;
      }

      if (currentItemName) {
        const currentItemIndex = items.findIndex((item) => item.name === currentItemName);
        const currentRow = rowRefs.current[currentItemIndex];

        if (currentRow) {
          const rowRect = currentRow.getBoundingClientRect();
          const rowDeadband = 10;

          if (clientY >= rowRect.top - rowDeadband && clientY <= rowRect.bottom + rowDeadband) {
            return currentItemIndex;
          }
        }
      }

      return currentItemName ? items.findIndex((item) => item.name === currentItemName) : null;
    },
    [items],
  );

  const previewItemAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      const nextItemIndex = resolveItemIndexAtPoint(clientX, clientY);
      const nextItemName = nextItemIndex === null || nextItemIndex < 0 ? null : items[nextItemIndex]?.name ?? null;

      previewItem(nextItemName);
    },
    [previewItem, items, resolveItemIndexAtPoint],
  );

  const schedulePreviewItemAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      pendingPreviewPoint.current = { clientX, clientY };

      if (previewFrame.current !== null) {
        return;
      }

      previewFrame.current = window.requestAnimationFrame(() => {
        const point = pendingPreviewPoint.current;

        previewFrame.current = null;
        pendingPreviewPoint.current = null;

        if (point) {
          previewItemAtPoint(point.clientX, point.clientY);
        }
      });
    },
    [previewItemAtPoint],
  );

  const handleWorkbenchBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      cancelPendingPreview();
      isKeyboardFocusRef.current = false;
      setIsWorkbenchEngaged(false);
      previewItem(null);
    }
  }, [cancelPendingPreview, previewItem]);

  const handleWorkbenchFocus = useCallback(() => {
    if (isKeyboardFocusRef.current) {
      setIsWorkbenchEngaged(true);
      setIsWorkbenchTracking(false);
    }
  }, []);

  const handleWorkbenchPointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    cancelPendingPreview();
    setIsWorkbenchEngaged(false);
    setIsWorkbenchTracking(true);
    setWorkbenchMotionTarget(event.clientX, event.clientY);
    previewItem(null);
  }, [cancelPendingPreview, previewItem, setWorkbenchMotionTarget]);

  const handleWorkbenchPointerEnter = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      setIsWorkbenchEngaged(true);
      setIsWorkbenchTracking(false);
      schedulePreviewItemAtPoint(event.clientX, event.clientY);
    },
    [schedulePreviewItemAtPoint],
  );

  const handleWorkbenchPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      setIsWorkbenchEngaged(true);
      setIsWorkbenchTracking(false);
      schedulePreviewItemAtPoint(event.clientX, event.clientY);
    },
    [schedulePreviewItemAtPoint],
  );

  const handleWorkbenchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      isKeyboardFocusRef.current = true;
      setIsWorkbenchEngaged(true);
      setIsWorkbenchTracking(false);

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

  const handleItemListClick = useCallback(
    (event: MouseEvent<HTMLOListElement>) => {
      isKeyboardFocusRef.current = false;

      if (event.target instanceof Element && event.target.closest("[data-showcase-index]")) {
        return;
      }

      const nextItemIndex = resolveItemIndexAtPoint(event.clientX, event.clientY);

      if (nextItemIndex === null || nextItemIndex < 0) {
        return;
      }

      activateItem(nextItemIndex);
    },
    [activateItem, resolveItemIndexAtPoint],
  );

  return {
    activeItem,
    artifactRef,
    handleItemListClick,
    handleWorkbenchBlur,
    handleWorkbenchFocus,
    handleWorkbenchKeyDown,
    handleWorkbenchPointerEnter,
    handleWorkbenchPointerLeave,
    handleWorkbenchPointerMove,
    isWorkbenchEngaged,
    isWorkbenchTracking,
    listRef,
    previewedItemName,
    registerRow,
    selectItem: activateItem,
  };
}

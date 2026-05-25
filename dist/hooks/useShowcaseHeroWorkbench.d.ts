import { type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import type { ShowcaseHeroItem, ShowcaseHeroMotion } from "../types";
export declare function useShowcaseHeroWorkbench(items: readonly ShowcaseHeroItem[], motion?: ShowcaseHeroMotion): {
    activeItem: ShowcaseHeroItem;
    artifactRef: import("react").RefObject<HTMLDivElement | null>;
    handleItemListPointerLeave: (event: PointerEvent<HTMLOListElement>) => void;
    handleItemListPointerMove: (event: PointerEvent<HTMLOListElement>) => void;
    handleSelectedPanelPointerEnter: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchBlur: (event: FocusEvent<HTMLDivElement>) => void;
    handleWorkbenchFocus: () => void;
    handleWorkbenchKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerEnter: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerLeave: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
    isWorkbenchEngaged: boolean;
    isWorkbenchTracking: boolean;
    listRef: import("react").RefObject<HTMLOListElement | null>;
    previewedItemName: string | null;
    registerRow: (index: number) => (node: HTMLButtonElement | null) => void;
    selectItem: (index: number, shouldScroll?: boolean) => void;
};
//# sourceMappingURL=useShowcaseHeroWorkbench.d.ts.map
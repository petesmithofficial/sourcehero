import { type FocusEvent, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import type { ShowcaseHeroItem } from "../types";
export declare function useShowcaseHeroWorkbench(items: readonly ShowcaseHeroItem[]): {
    activeItem: ShowcaseHeroItem;
    artifactRef: import("react").RefObject<HTMLDivElement | null>;
    handleItemListClick: (event: MouseEvent<HTMLOListElement>) => void;
    handleWorkbenchBlur: (event: FocusEvent<HTMLDivElement>) => void;
    handleWorkbenchFocus: () => void;
    handleWorkbenchKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerEnter: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerLeave: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
    isWorkbenchEngaged: boolean;
    isWorkbenchTracking: boolean;
    listRef: import("react").RefObject<HTMLOListElement | null>;
    previewedItemName: string | null;
    registerRow: (index: number) => (node: HTMLButtonElement | null) => void;
    selectItem: (index: number, shouldScroll?: boolean) => void;
};
//# sourceMappingURL=useShowcaseHeroWorkbench.d.ts.map
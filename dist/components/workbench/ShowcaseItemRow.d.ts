import type { ShowcaseHeroItem } from "../../types.js";
type ShowcaseItemRowProps = {
    controlsId: string;
    index: number;
    isActive: boolean;
    isPreviewed: boolean;
    item: ShowcaseHeroItem;
    onActivate: () => void;
    setRef: (node: HTMLButtonElement | null) => void;
};
export declare function ShowcaseItemRow({ controlsId, index, isActive, isPreviewed, item, onActivate, setRef, }: ShowcaseItemRowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ShowcaseItemRow.d.ts.map
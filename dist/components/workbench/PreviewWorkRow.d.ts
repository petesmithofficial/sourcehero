import type { SourceHeroProject } from "../../types";
type PreviewWorkRowProps = {
    controlsId: string;
    index: number;
    isActive: boolean;
    isPreviewed: boolean;
    item: SourceHeroProject;
    onActivate: () => void;
    setRef: (node: HTMLButtonElement | null) => void;
};
export declare function PreviewWorkRow({ controlsId, index, isActive, isPreviewed, item, onActivate, setRef, }: PreviewWorkRowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PreviewWorkRow.d.ts.map
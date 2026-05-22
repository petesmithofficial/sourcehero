import { type FocusEvent, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import type { SourceHeroProject } from "../types";
export declare function useSourceHeroWorkbench(projects: readonly SourceHeroProject[]): {
    activeProject: SourceHeroProject;
    artifactRef: import("react").RefObject<HTMLDivElement | null>;
    handleProjectListClick: (event: MouseEvent<HTMLOListElement>) => void;
    handleWorkbenchBlur: (event: FocusEvent<HTMLDivElement>) => void;
    handleWorkbenchFocus: () => void;
    handleWorkbenchKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerEnter: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerLeave: (event: PointerEvent<HTMLDivElement>) => void;
    handleWorkbenchPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
    isWorkbenchEngaged: boolean;
    isWorkbenchTracking: boolean;
    listRef: import("react").RefObject<HTMLOListElement | null>;
    previewedProjectName: string | null;
    registerRow: (index: number) => (node: HTMLButtonElement | null) => void;
    selectProject: (index: number, shouldScroll?: boolean) => void;
};
//# sourceMappingURL=useSourceHeroWorkbench.d.ts.map
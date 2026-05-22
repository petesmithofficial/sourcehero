import type { AnchorHTMLAttributes } from "react";
export type SourceHeroActionVariant = "primary" | "secondary";
export type SourceHeroAction = {
    ariaLabel?: string;
    className?: string;
    href: string;
    label: string;
    rel?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    variant?: SourceHeroActionVariant;
};
export type SourceHeroOrbitTile = {
    className?: string;
    label: string;
};
export type SourceHeroContent = {
    detail: string;
    eyebrow: string;
    name: string;
    statement: string;
};
export type SourceHeroProjectDestination = {
    ariaLabel?: string;
    href: string;
    label: string;
    rel?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    type?: string;
};
export type SourceHeroProject = {
    destination?: SourceHeroProjectDestination;
    implementation: string;
    metadata?: readonly string[];
    name: string;
    scope: string;
    signal: string;
    slug: string;
    summary: string;
};
export type SourceHeroWorkbench = {
    ariaLabel?: string;
    caption: string;
    emptyState?: string;
    eyebrow?: string;
    id?: string;
    projects: readonly SourceHeroProject[];
    selectedLabel?: string;
    tags?: readonly string[];
    title: string;
};
export type SourceHeroProps = {
    actions?: readonly SourceHeroAction[];
    className?: string;
    content: SourceHeroContent;
    id?: string;
    orbitTiles?: readonly SourceHeroOrbitTile[];
    titleId?: string;
    workbench?: SourceHeroWorkbench;
};
//# sourceMappingURL=types.d.ts.map
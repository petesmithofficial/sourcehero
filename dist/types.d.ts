import type { AnchorHTMLAttributes } from "react";
export type ShowcaseHeroActionVariant = "primary" | "secondary";
export type ShowcaseHeroAction = {
    /** Accessible label for the action link when the visible label needs more context. */
    ariaLabel?: string;
    /** Optional extra class added to this action link. */
    className?: string;
    /** Link target for the action. */
    href: string;
    /** Visible action text. */
    label: string;
    /** Relationship attribute for external links, such as "noopener noreferrer". */
    rel?: string;
    /** Browser target for the link. */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    /** Visual action treatment. Defaults to "primary". */
    variant?: ShowcaseHeroActionVariant;
};
export type ShowcaseHeroOrbitTile = {
    /** Optional class used to position or style this floating label. */
    className?: string;
    /** Short visible label shown in the orbit tile. */
    label: string;
};
export type ShowcaseHeroContent = {
    /** Supporting body copy below the main statement. */
    detail: string;
    /** Small uppercase label above the hero title. */
    eyebrow: string;
    /** Main hero title. Use natural word breaks for better mobile wrapping. */
    name: string;
    /** Large supporting statement under the title. */
    statement: string;
};
export type ShowcaseHeroItemDestination = {
    /** Accessible label for the destination link when the visible label needs more context. */
    ariaLabel?: string;
    /** Destination URL for the selected item. */
    href: string;
    /** Visible destination link text. */
    label: string;
    /** Relationship attribute for external destinations, such as "noopener noreferrer". */
    rel?: string;
    /** Browser target for the destination link. */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    /** Optional format label, such as "case study", "demo", or "writing". */
    type?: string;
};
export type ShowcaseHeroItemDetail = {
    /** Detail row label. */
    label: string;
    /** Detail row value. */
    value: string;
};
export type ShowcaseHeroItem = {
    /** Optional link shown in the selected item panel. */
    destination?: ShowcaseHeroItemDestination;
    /** Optional label/value rows shown in the selected item panel. */
    details?: readonly ShowcaseHeroItemDetail[];
    /** Optional chips shown in the selected item panel. */
    metadata?: readonly string[];
    /** Visible item title. */
    name: string;
    /** Compact category or status label shown in the list row. */
    signal: string;
    /** Stable caller-owned identifier for the item. */
    slug: string;
    /** Short list-row description. */
    summary: string;
};
export type ShowcaseHeroTouchReleaseReturn = {
    /** Touch release return duration in milliseconds. Defaults to 760. */
    durationMs?: number;
    /** Time in milliseconds to hold the final touch tilt before returning. Defaults to 220. */
    holdMs?: number;
};
export type ShowcaseHeroMotion = {
    /** Maximum Y-axis tilt in degrees. Defaults to 8. */
    maxTiltDegrees?: number;
    /** Touch-only behavior for easing the workbench back to its idle pose after finger release. */
    touchReleaseReturn?: ShowcaseHeroTouchReleaseReturn;
};
export type ShowcaseHeroWorkbench = {
    /** Accessible label for the workbench region. */
    ariaLabel?: string;
    /** Short summary shown at the top of the workbench. */
    caption: string;
    /** Optional message shown when no workbench item is available. */
    emptyState?: string;
    /** Optional small uppercase label above the workbench caption. */
    eyebrow?: string;
    /** Optional id for deep-linking to the workbench. */
    id?: string;
    /** Selectable workbench items. */
    items: readonly ShowcaseHeroItem[];
    /** Accessible label for the selectable item list. */
    listLabel?: string;
    /** Pointer and touch motion tuning. */
    motion?: ShowcaseHeroMotion;
    /** Small label above the selected item panel. */
    selectedLabel?: string;
    /** Optional metric or feature chips shown around the workbench on larger screens. */
    tags?: readonly string[];
    /** Window-bar title for the workbench frame. */
    title: string;
};
export type ShowcaseHeroProps = {
    /** Optional hero action links. */
    actions?: readonly ShowcaseHeroAction[];
    /** Optional class added to the root section for caller-owned theming hooks. */
    className?: string;
    /** Required hero copy. */
    content: ShowcaseHeroContent;
    /** Optional id for the root section. */
    id?: string;
    /** Optional floating labels around the hero. */
    orbitTiles?: readonly ShowcaseHeroOrbitTile[];
    /** Optional id for the hero title used by aria-labelledby. */
    titleId?: string;
    /** Optional interactive workbench. */
    workbench?: ShowcaseHeroWorkbench;
};
//# sourceMappingURL=types.d.ts.map
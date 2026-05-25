import type { AnchorHTMLAttributes } from "react";

export type ShowcaseHeroActionVariant = "primary" | "secondary";

export type ShowcaseHeroAction = {
  ariaLabel?: string;
  className?: string;
  href: string;
  label: string;
  rel?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  variant?: ShowcaseHeroActionVariant;
};

export type ShowcaseHeroOrbitTile = {
  className?: string;
  label: string;
};

export type ShowcaseHeroContent = {
  detail: string;
  eyebrow: string;
  name: string;
  statement: string;
};

export type ShowcaseHeroItemDestination = {
  ariaLabel?: string;
  href: string;
  label: string;
  rel?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  type?: string;
};

export type ShowcaseHeroItemDetail = {
  label: string;
  value: string;
};

export type ShowcaseHeroItem = {
  destination?: ShowcaseHeroItemDestination;
  details?: readonly ShowcaseHeroItemDetail[];
  metadata?: readonly string[];
  name: string;
  signal: string;
  slug: string;
  summary: string;
};

export type ShowcaseHeroMotion = {
  maxTiltDegrees?: number;
};

export type ShowcaseHeroWorkbench = {
  ariaLabel?: string;
  caption: string;
  emptyState?: string;
  eyebrow?: string;
  id?: string;
  items: readonly ShowcaseHeroItem[];
  listLabel?: string;
  motion?: ShowcaseHeroMotion;
  selectedLabel?: string;
  tags?: readonly string[];
  title: string;
};

export type ShowcaseHeroProps = {
  actions?: readonly ShowcaseHeroAction[];
  className?: string;
  content: ShowcaseHeroContent;
  id?: string;
  orbitTiles?: readonly ShowcaseHeroOrbitTile[];
  titleId?: string;
  workbench?: ShowcaseHeroWorkbench;
};

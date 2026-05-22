import type { SourceHeroProps } from "../types";

const repoBaseUrl = "https://github.com/petesmithofficial";

export const demoHeroProps: SourceHeroProps = {
  actions: [
    {
      href: repoBaseUrl,
      label: "Open GitHub",
      rel: "noopener noreferrer",
      target: "_blank",
      variant: "primary",
    },
    {
      href: "#work",
      label: "View work",
      variant: "secondary",
    },
  ],
  content: {
    detail: "A prop-driven React hero for public code, tools, experiments, and source-first project pages.",
    eyebrow: "Reusable component",
    name: "Source Hero",
    statement: "A focused hero for public engineering work.",
  },
  orbitTiles: [
    { label: "{ }", className: "orbit-tile-one" },
    { label: "TS", className: "orbit-tile-two" },
    { label: "API", className: "orbit-tile-three" },
    { label: "UI", className: "orbit-tile-four" },
  ],
  workbench: {
    caption: "Drop in projects, links, signals, and constraints.",
    id: "work",
    projects: [
      {
        destination: {
          ariaLabel: "Open source-hero repository in a new tab",
          href: `${repoBaseUrl}/source-hero`,
          label: "Open repo ->",
          rel: "noopener noreferrer",
          target: "_blank",
          type: "repo",
        },
        implementation: "Typed React props, scoped CSS, and Vite library output.",
        metadata: ["TypeScript", "repo"],
        name: "source-hero",
        scope: "Reusable hero component extracted from petesmithofficial.",
        signal: "component",
        slug: "source-hero",
        summary: "customizable hero package",
      },
      {
        destination: {
          href: "https://lumaqr.com",
          label: "Open site ->",
          rel: "noopener noreferrer",
          target: "_blank",
          type: "site",
        },
        implementation: "Static frontend with no hosted payload store.",
        metadata: ["JavaScript", "site"],
        name: "LumaQR",
        scope: "Runs in the browser and keeps generated QR data local.",
        signal: "local",
        slug: "lumaqr",
        summary: "local QR generator",
      },
      {
        destination: {
          href: `${repoBaseUrl}/timenow`,
          label: "Open repo ->",
          rel: "noopener noreferrer",
          target: "_blank",
          type: "repo",
        },
        implementation: "Small Go CLI output shaped for terminal workflows.",
        metadata: ["Go", "repo"],
        name: "timenow",
        scope: "Current time formatting for terminal and clipboard use.",
        signal: "CLI",
        slug: "timenow",
        summary: "time formatting CLI",
      },
    ],
    tags: ["typed props", "source-first", "responsive"],
    title: "demo projects",
  },
};

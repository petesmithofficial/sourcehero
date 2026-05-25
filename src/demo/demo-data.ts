import type { ShowcaseHeroProps } from "../types";

export const demoHeroProps: ShowcaseHeroProps = {
  actions: [
    {
      href: "#showcase",
      label: "View showcase",
      variant: "primary",
    },
    {
      href: "https://github.com/petesmithofficial/showcase-hero",
      label: "Read docs",
      rel: "noopener noreferrer",
      target: "_blank",
      variant: "secondary",
    },
  ],
  content: {
    detail: "A prop-driven React hero for products, case studies, tools, writing, and technical demos.",
    eyebrow: "Reusable component",
    name: "Showcase Hero",
    statement: "Present selected work without locking it to one format.",
  },
  orbitTiles: [
    { label: "{ }", className: "orbit-tile-one" },
    { label: "UI", className: "orbit-tile-two" },
    { label: "DOC", className: "orbit-tile-three" },
    { label: "API", className: "orbit-tile-four" },
  ],
  workbench: {
    caption: "One hero. Any curated set of work.",
    id: "showcase",
    items: [
      {
        destination: {
          href: "https://example.com/case-study",
          label: "Open case study ->",
          rel: "noopener noreferrer",
          target: "_blank",
          type: "case study",
        },
        details: [
          { label: "Context", value: "Launch story for a focused product workflow." },
          { label: "Format", value: "Outcome, screenshots, technical notes, and next steps." },
        ],
        metadata: ["product", "case study"],
        name: "Launch Brief",
        signal: "case study",
        slug: "launch-brief",
        summary: "product launch story",
      },
      {
        destination: {
          href: "https://example.com/playground",
          label: "Open demo ->",
          rel: "noopener noreferrer",
          target: "_blank",
          type: "demo",
        },
        details: [
          { label: "Context", value: "Interactive proof of concept for a browser-based workflow." },
          { label: "Format", value: "Live demo with implementation notes and lightweight state." },
        ],
        metadata: ["React", "demo"],
        name: "Workflow Lab",
        signal: "prototype",
        slug: "workflow-lab",
        summary: "interactive product demo",
      },
      {
        destination: {
          href: "https://example.com/notes",
          label: "Read notes ->",
          rel: "noopener noreferrer",
          target: "_blank",
          type: "writing",
        },
        details: [
          { label: "Context", value: "Short technical notes for decisions worth preserving." },
          { label: "Format", value: "Annotated examples, tradeoffs, and links to related material." },
        ],
        metadata: ["writing", "notes"],
        name: "Field Notes",
        signal: "notes",
        slug: "field-notes",
        summary: "technical writing index",
      },
    ],
    listLabel: "Selectable showcase items",
    motion: { maxTiltDegrees: 12 },
    selectedLabel: "selected item",
    tags: ["typed props", "responsive", "themeable"],
    title: "demo showcase",
  },
};

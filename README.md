# source-hero

A self-contained React hero component for public source-code pages. It renders the hero, orbit labels, action links, and an interactive project workbench from typed props.

## Install

```sh
npm install @petesmithofficial/source-hero
```

```tsx
import { SourceHero, type SourceHeroProps } from "@petesmithofficial/source-hero";
import "@petesmithofficial/source-hero/styles.css";

const hero: SourceHeroProps = {
  actions: [
    { href: "https://github.com/petesmithofficial", label: "Open GitHub", target: "_blank", rel: "noopener noreferrer" },
    { href: "#work", label: "View work", variant: "secondary" },
  ],
  content: {
    detail: "Projects, constraints, and source code in one place.",
    eyebrow: "Public engineering",
    name: "Pete Smith",
    statement: "Software that holds up in practice.",
  },
  orbitTiles: [
    { label: "{ }" },
    { label: "TS" },
    { label: "API" },
    { label: "UI" },
  ],
  workbench: {
    caption: "Public repos, constraints included.",
    id: "work",
    projects: [
      {
        destination: {
          href: "https://github.com/petesmithofficial/source-hero",
          label: "Open repo ->",
          rel: "noopener noreferrer",
          target: "_blank",
          type: "repo",
        },
        implementation: "Typed React props and scoped CSS.",
        metadata: ["TypeScript", "repo"],
        name: "source-hero",
        scope: "Reusable hero component extracted from petesmithofficial.",
        signal: "component",
        slug: "source-hero",
        summary: "customizable hero package",
      },
    ],
    tags: ["typed props", "source-first", "responsive"],
    title: "public projects",
  },
};

export function Page() {
  return <SourceHero {...hero} />;
}
```

## Props

`SourceHero` is controlled through a single `SourceHeroProps` object:

- `content`: eyebrow, name, statement, and detail copy.
- `actions`: primary or secondary hero links.
- `orbitTiles`: optional floating labels. The first four tiles get default positions.
- `workbench`: optional project list with project metadata, evidence, signal text, and destination links.

The stylesheet is scoped under `.source-hero` and includes responsive and reduced-motion handling. You can override colors and spacing with CSS custom properties on the component root.

## Local Demo

```sh
make dev
```

The demo runs on [http://localhost:8788](http://localhost:8788).

## Verify

```sh
make verify
```

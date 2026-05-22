# sourcehero

`sourcehero` is a small React package that exports `ShowcaseHero`: a reusable hero section with orbit labels, action links, and an interactive showcase workbench.

The component is intentionally data-driven. It can present products, case studies, talks, writing, demos, downloads, technical references, or any other selected set of work.

## Install

```sh
npm install https://github.com/petesmithofficial/sourcehero/archive/main.tar.gz
```

```tsx
import { ShowcaseHero, type ShowcaseHeroProps } from "@petesmithofficial/sourcehero";
import "@petesmithofficial/sourcehero/styles.css";

const hero: ShowcaseHeroProps = {
  actions: [
    { href: "#showcase", label: "View showcase" },
    { href: "/contact", label: "Contact", variant: "secondary" },
  ],
  content: {
    detail: "Selected work, demos, and notes in one focused opening section.",
    eyebrow: "Portfolio system",
    name: "ShowcaseHero",
    statement: "A flexible hero for public work.",
  },
  orbitTiles: [{ label: "UI" }, { label: "API" }, { label: "DOC" }],
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
    ],
    listLabel: "Selectable showcase items",
    selectedLabel: "selected item",
    tags: ["typed props", "responsive", "themeable"],
    title: "selected work",
  },
};

export function Page() {
  return <ShowcaseHero {...hero} />;
}
```

## Props

`ShowcaseHero` is controlled through a single `ShowcaseHeroProps` object:

- `content`: eyebrow, name, statement, and detail copy.
- `actions`: primary or secondary hero links.
- `orbitTiles`: optional floating labels. The first four tiles get default positions.
- `workbench`: optional interactive index with `items`, item metadata, arbitrary detail rows, signal text, tags, and destination links.

Each showcase item uses neutral fields:

- `name`: the visible item title.
- `summary`: the short row description.
- `details`: optional label/value rows for anything you want to explain.
- `metadata`: optional chips such as technology, medium, status, audience, or destination type.
- `signal`: a compact status/category label.
- `destination`: optional link with caller-controlled label, target, rel, and type.

The stylesheet is scoped under `.showcase-hero` and includes responsive and reduced-motion handling. You can override colors and spacing with CSS custom properties on the component root.

## Local Demo

```sh
make dev
```

The demo runs on [http://localhost:8788](http://localhost:8788).

## Verify

```sh
make verify
```

## License

MIT. See [LICENSE](LICENSE).

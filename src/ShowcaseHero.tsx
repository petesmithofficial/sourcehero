import { ShowcaseWorkbench } from "./components/ShowcaseWorkbench";
import type { ShowcaseHeroProps } from "./types";

const defaultTitleId = "hero-title";
const defaultWorkbenchId = "work";

function getActionClassName(variant: "primary" | "secondary" | undefined, className: string | undefined) {
  return [variant === "secondary" ? "secondary-action" : "primary-action", className].filter(Boolean).join(" ");
}

function getOrbitTileClassName(className: string | undefined, index: number) {
  const defaultOrbitClassName = `orbit-tile-${["one", "two", "three", "four"][index] ?? "one"}`;

  return ["orbit-tile", className ?? defaultOrbitClassName].filter(Boolean).join(" ");
}

export function ShowcaseHero({
  actions = [],
  className,
  content,
  id,
  orbitTiles = [],
  titleId = defaultTitleId,
  workbench,
}: ShowcaseHeroProps) {
  const sectionClassName = ["showcase-hero", "hero", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName} id={id} aria-labelledby={titleId}>
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      {orbitTiles.length > 0 ? (
        <div className="hero-orbit" aria-hidden="true">
          {orbitTiles.map((tile, index) => (
            <span className={getOrbitTileClassName(tile.className, index)} key={`${tile.className ?? index}-${tile.label}`}>
              {tile.label}
            </span>
          ))}
        </div>
      ) : null}

      <div className="hero-copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id={titleId}>{content.name}</h1>
        <p className="hero-statement">{content.statement}</p>
        <p className="hero-detail">{content.detail}</p>
        {actions.length > 0 ? (
          <div className="hero-actions" aria-label="Primary actions">
            {actions.map((action) => (
              <a
                aria-label={action.ariaLabel}
                className={getActionClassName(action.variant, action.className)}
                href={action.href}
                key={`${action.href}-${action.label}`}
                rel={action.rel}
                target={action.target}
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {workbench ? <ShowcaseWorkbench id={workbench.id ?? defaultWorkbenchId} workbench={workbench} /> : null}
    </section>
  );
}

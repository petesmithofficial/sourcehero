import type { ShowcaseHeroItem } from "../../types.js";

type ActiveShowcasePanelProps = {
  className?: string;
  id: string;
  item: ShowcaseHeroItem;
};

export function ActiveShowcasePanel({ className = "showcase-detail", id, item }: ActiveShowcasePanelProps) {
  const titleId = `${id}-title`;
  const metadata = item.metadata ?? (item.destination?.type ? [item.destination.type] : []);

  return (
    <div aria-labelledby={titleId} aria-live="polite" className={className} id={id} role="region">
      <h2 className="showcase-detail-title" id={titleId}>
        {item.name}
      </h2>
      {metadata.length > 0 ? (
        <div className="showcase-detail-meta" aria-label={`${item.name} metadata`}>
          {metadata.map((metadataItem) => (
            <span key={metadataItem}>{metadataItem}</span>
          ))}
        </div>
      ) : null}
      {item.details && item.details.length > 0 ? (
        <dl className="showcase-detail-evidence">
          {item.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <span className="showcase-detail-signal">{item.signal}</span>
      {item.destination ? (
        <a
          aria-label={item.destination.ariaLabel}
          className="showcase-detail-action"
          href={item.destination.href}
          rel={item.destination.rel}
          target={item.destination.target}
        >
          {item.destination.label}
        </a>
      ) : null}
    </div>
  );
}

import type { ShowcaseHeroItem } from "../../types.js";

type ShowcaseItemRowProps = {
  controlsId: string;
  index: number;
  isActive: boolean;
  isPreviewed: boolean;
  item: ShowcaseHeroItem;
  onActivate: () => void;
  setRef: (node: HTMLButtonElement | null) => void;
};

export function ShowcaseItemRow({
  controlsId,
  index,
  isActive,
  isPreviewed,
  item,
  onActivate,
  setRef,
}: ShowcaseItemRowProps) {
  const className = ["workbench-row", isActive ? "is-active" : "", isPreviewed ? "is-previewed" : ""]
    .filter(Boolean)
    .join(" ");
  const summaryId = `${item.slug}-summary`;

  return (
    <button
      aria-controls={controlsId}
      aria-describedby={summaryId}
      aria-pressed={isActive}
      className={className}
      data-showcase-index={index}
      id={`showcase-${item.slug}`}
      onClick={onActivate}
      ref={setRef}
      type="button"
    >
      <span className="workbench-index">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>{item.name}</strong>
        <p>{item.summary}</p>
        <small id={summaryId}>{item.details?.[0]?.value ?? item.summary}</small>
      </div>
      <em>{item.signal}</em>
    </button>
  );
}

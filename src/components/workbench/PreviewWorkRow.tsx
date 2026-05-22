import type { SourceHeroProject } from "../../types";

type PreviewWorkRowProps = {
  controlsId: string;
  index: number;
  isActive: boolean;
  isPreviewed: boolean;
  item: SourceHeroProject;
  onActivate: () => void;
  setRef: (node: HTMLButtonElement | null) => void;
};

export function PreviewWorkRow({
  controlsId,
  index,
  isActive,
  isPreviewed,
  item,
  onActivate,
  setRef,
}: PreviewWorkRowProps) {
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
      data-project-index={index}
      id={`project-${item.slug}`}
      onClick={onActivate}
      ref={setRef}
      type="button"
    >
      <span className="workbench-index">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>{item.name}</strong>
        <p>{item.summary}</p>
        <small id={summaryId}>{item.scope}</small>
      </div>
      <em>{item.signal}</em>
    </button>
  );
}

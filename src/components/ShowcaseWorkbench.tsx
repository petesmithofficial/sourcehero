import { useShowcaseHeroWorkbench } from "../hooks/useShowcaseHeroWorkbench";
import type { ShowcaseHeroWorkbench } from "../types";
import { ActiveShowcasePanel } from "./workbench/ActiveShowcasePanel";
import { MetricStrip } from "./workbench/MetricStrip";
import { ShowcaseItemRow } from "./workbench/ShowcaseItemRow";
import { WindowBar } from "./workbench/WindowBar";

type ShowcaseWorkbenchProps = {
  id?: string;
  workbench: ShowcaseHeroWorkbench;
};

export function ShowcaseWorkbench({ id, workbench }: ShowcaseWorkbenchProps) {
  const selectedItemId = "selected-showcase-item";
  const mobileSelectedItemId = "selected-showcase-item-inline";
  const {
    activeItem,
    artifactRef,
    handleItemListClick,
    handleWorkbenchBlur,
    handleWorkbenchFocus,
    handleWorkbenchKeyDown,
    handleWorkbenchPointerEnter,
    handleWorkbenchPointerLeave,
    handleWorkbenchPointerMove,
    isWorkbenchEngaged,
    isWorkbenchTracking,
    listRef,
    previewedItemName,
    registerRow,
    selectItem,
  } = useShowcaseHeroWorkbench(workbench.items);
  const className = [
    "hero-art",
    isWorkbenchEngaged ? "is-workbench-engaged" : "",
    isWorkbenchTracking ? "is-workbench-tracking" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!activeItem) {
    return (
      <div className="hero-art" id={id} aria-label={workbench.ariaLabel ?? "Showcase index"}>
        <div className="hero-art-stage">
          <div className="artifact-window artifact-window-main">
            <WindowBar title={workbench.title} />
            <div className="workbench-panel">
              <div className="workbench-summary">
                <span>{workbench.eyebrow ?? "showcase index"}</span>
                <strong>{workbench.emptyState ?? workbench.caption}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={className}
      id={id}
      aria-label={workbench.ariaLabel ?? "Showcase index"}
      onBlur={handleWorkbenchBlur}
      onFocus={handleWorkbenchFocus}
      onPointerEnter={handleWorkbenchPointerEnter}
      onPointerLeave={handleWorkbenchPointerLeave}
      onPointerMove={handleWorkbenchPointerMove}
      ref={artifactRef}
    >
      <div className="hero-art-stage">
        <div className="artifact-window artifact-window-main" onKeyDown={handleWorkbenchKeyDown}>
          <WindowBar title={workbench.title} />
          <div className="workbench-panel">
            <div className="workbench-summary">
              <span>{workbench.eyebrow ?? "showcase index"}</span>
              <strong>{workbench.caption}</strong>
            </div>
            <ol
              aria-label={workbench.listLabel ?? "Selectable showcase items"}
              className="workbench-list"
              onClick={handleItemListClick}
              ref={listRef}
            >
              {workbench.items.map((item, index) => (
                <li className="workbench-item" key={item.name}>
                  <ShowcaseItemRow
                    controlsId={`${selectedItemId} ${mobileSelectedItemId}`}
                    index={index}
                    isActive={item.name === activeItem.name}
                    isPreviewed={item.name === previewedItemName && item.name !== activeItem.name}
                    item={item}
                    onActivate={() => selectItem(index)}
                    setRef={registerRow(index)}
                  />
                </li>
              ))}
            </ol>
            <div className="mobile-showcase-panel">
              <div className="mini-heading">{workbench.selectedLabel ?? "selected item"}</div>
              <ActiveShowcasePanel
                className="showcase-detail showcase-detail-inline"
                id={mobileSelectedItemId}
                item={activeItem}
              />
            </div>
          </div>
        </div>

        <div className="artifact-window artifact-window-side">
          <div className="mini-heading">{workbench.selectedLabel ?? "selected item"}</div>
          <ActiveShowcasePanel id={selectedItemId} item={activeItem} />
        </div>

        {workbench.tags && workbench.tags.length > 0 ? <MetricStrip tags={workbench.tags} /> : null}
      </div>
    </div>
  );
}

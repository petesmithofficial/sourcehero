import { useSourceHeroWorkbench } from "../hooks/useSourceHeroWorkbench";
import type { SourceHeroWorkbench } from "../types";
import { ActiveProjectPanel } from "./workbench/ActiveProjectPanel";
import { MetricStrip } from "./workbench/MetricStrip";
import { PreviewWorkRow } from "./workbench/PreviewWorkRow";
import { WindowBar } from "./workbench/WindowBar";

type ProjectWorkbenchProps = {
  id?: string;
  workbench: SourceHeroWorkbench;
};

export function ProjectWorkbench({ id, workbench }: ProjectWorkbenchProps) {
  const selectedProjectId = "selected-project";
  const mobileSelectedProjectId = "selected-project-inline";
  const {
    activeProject,
    artifactRef,
    handleProjectListClick,
    handleWorkbenchBlur,
    handleWorkbenchFocus,
    handleWorkbenchKeyDown,
    handleWorkbenchPointerEnter,
    handleWorkbenchPointerLeave,
    handleWorkbenchPointerMove,
    isWorkbenchEngaged,
    isWorkbenchTracking,
    listRef,
    previewedProjectName,
    registerRow,
    selectProject,
  } = useSourceHeroWorkbench(workbench.projects);
  const className = [
    "hero-art",
    isWorkbenchEngaged ? "is-workbench-engaged" : "",
    isWorkbenchTracking ? "is-workbench-tracking" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!activeProject) {
    return (
      <div className="hero-art" id={id} aria-label={workbench.ariaLabel ?? "Public project index"}>
        <div className="hero-art-stage">
          <div className="artifact-window artifact-window-main">
            <WindowBar title={workbench.title} />
            <div className="workbench-panel">
              <div className="workbench-summary">
                <span>{workbench.eyebrow ?? "project index"}</span>
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
      aria-label={workbench.ariaLabel ?? "Public project index"}
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
              <span>{workbench.eyebrow ?? "project index"}</span>
              <strong>{workbench.caption}</strong>
            </div>
            <ol
              aria-label="Selectable public projects"
              className="workbench-list"
              onClick={handleProjectListClick}
              ref={listRef}
            >
              {workbench.projects.map((item, index) => (
                <li className="workbench-item" key={item.name}>
                  <PreviewWorkRow
                    controlsId={`${selectedProjectId} ${mobileSelectedProjectId}`}
                    index={index}
                    isActive={item.name === activeProject.name}
                    isPreviewed={item.name === previewedProjectName && item.name !== activeProject.name}
                    item={item}
                    onActivate={() => selectProject(index)}
                    setRef={registerRow(index)}
                  />
                </li>
              ))}
            </ol>
            <div className="mobile-project-panel">
              <div className="mini-heading">{workbench.selectedLabel ?? "selected repo"}</div>
              <ActiveProjectPanel
                className="side-project side-project-inline"
                id={mobileSelectedProjectId}
                project={activeProject}
              />
            </div>
          </div>
        </div>

        <div className="artifact-window artifact-window-side">
          <div className="mini-heading">{workbench.selectedLabel ?? "selected repo"}</div>
          <ActiveProjectPanel id={selectedProjectId} project={activeProject} />
        </div>

        {workbench.tags && workbench.tags.length > 0 ? <MetricStrip tags={workbench.tags} /> : null}
      </div>
    </div>
  );
}

import type { SourceHeroProject } from "../../types";

type ActiveProjectPanelProps = {
  className?: string;
  id: string;
  project: SourceHeroProject;
};

export function ActiveProjectPanel({ className = "side-project", id, project }: ActiveProjectPanelProps) {
  const titleId = `${id}-title`;
  const metadata = project.metadata ?? (project.destination?.type ? [project.destination.type] : []);

  return (
    <div aria-labelledby={titleId} aria-live="polite" className={className} id={id} role="region">
      <h2 className="side-project-title" id={titleId}>
        {project.name}
      </h2>
      {metadata.length > 0 ? (
        <div className="side-project-meta" aria-label={`${project.name} project metadata`}>
          {metadata.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      <dl className="side-project-evidence">
        <div>
          <dt>Scope</dt>
          <dd>{project.scope}</dd>
        </div>
        <div>
          <dt>Implementation</dt>
          <dd>{project.implementation}</dd>
        </div>
      </dl>
      <span className="side-project-signal">{project.signal}</span>
      {project.destination ? (
        <a
          aria-label={project.destination.ariaLabel}
          className="side-project-action"
          href={project.destination.href}
          rel={project.destination.rel}
          target={project.destination.target}
        >
          {project.destination.label}
        </a>
      ) : null}
    </div>
  );
}

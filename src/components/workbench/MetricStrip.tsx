type MetricStripProps = {
  tags: readonly string[];
};

export function MetricStrip({ tags }: MetricStripProps) {
  return (
    <div className="metric-strip" aria-hidden="true">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

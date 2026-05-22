type WindowBarProps = {
  title: string;
};

export function WindowBar({ title }: WindowBarProps) {
  return (
    <div className="window-bar">
      <span />
      <span />
      <span />
      <strong>{title}</strong>
    </div>
  );
}

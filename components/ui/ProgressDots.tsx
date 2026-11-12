type Props = {
  total: number;
  current: number;
};

export function ProgressDots({ total, current }: Props) {
  return (
    <div className="progress-dots" role="img" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={"progress-dot" + (i < current ? " is-on" : i === current ? " is-current" : "")}
        />
      ))}
    </div>
  );
}

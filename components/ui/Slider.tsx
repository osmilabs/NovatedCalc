type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  /** Evenly spaced labels under the track, e.g. [min, mid, max]. */
  marks?: string[];
};

export function Slider({ label, value, min, max, step, onChange, marks }: Props) {
  return (
    <>
      <input
        className="slider"
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {marks ? (
        <div className="slider-row" aria-hidden>
          {marks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      ) : null}
    </>
  );
}

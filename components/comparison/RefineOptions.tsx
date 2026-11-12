import type { Frequency } from "@/components/comparison/ProviderCard";
import { STATES } from "@/lib/types";

export const SORTS = [
  { key: "cost", label: "Lowest cost" },
  { key: "fees", label: "Lowest fees" },
  { key: "rate", label: "Lowest rate" },
] as const;
export type SortKey = (typeof SORTS)[number]["key"];

const FREQUENCIES: { key: Frequency; label: string }[] = [
  { key: "month", label: "Per month" },
  { key: "fortnight", label: "Per fortnight" },
];

type Props = {
  frequency: Frequency;
  onFrequency: (frequency: Frequency) => void;
  sortBy: SortKey;
  onSort: (sort: SortKey) => void;
  stateFilter: string;
  onStateFilter: (state: string) => void;
};

function Options<K extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { key: K; label: string }[];
  value: K;
  onChange: (key: K) => void;
}) {
  return (
    <div className="cmp-group">
      <p className="cmp-group-k">{label}</p>
      <div className="cmp-opts" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            className={"cmp-opt" + (value === option.key ? " is-on" : "")}
            aria-pressed={value === option.key}
            onClick={() => onChange(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RefineOptions({ frequency, onFrequency, sortBy, onSort, stateFilter, onStateFilter }: Props) {
  const states = [{ key: "ALL", label: "All" }, ...STATES.map((state) => ({ key: state, label: state }))];

  return (
    <>
      <Options label="Show cost" options={FREQUENCIES} value={frequency} onChange={onFrequency} />
      <Options label="Sort by" options={SORTS} value={sortBy} onChange={onSort} />
      <Options label="Your state" options={states} value={stateFilter} onChange={onStateFilter} />
    </>
  );
}

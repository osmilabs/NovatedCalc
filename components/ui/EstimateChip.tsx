type Props = {
  children?: React.ReactNode;
};

/** Sticky disclaimer. Every page shows one: the numbers here are estimates. */
export function EstimateChip({ children = "Estimate only · not financial advice" }: Props) {
  return (
    <div className="estimate-chip" role="note">
      <span className="pulse" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

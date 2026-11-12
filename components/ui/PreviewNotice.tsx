type Props = {
  /** What the example data is on this page, e.g. "providers shown" or "provider details". */
  subject?: string;
  className?: string;
};

/**
 * Says plainly that the providers are made up while the comparison is a preview.
 * Shown wherever sample providers appear, so nobody mistakes them for real companies.
 */
export function PreviewNotice({ subject = "providers shown", className }: Props) {
  return (
    <aside className={"preview-notice" + (className ? ` ${className}` : "")} aria-label="Preview notice">
      <span className="preview-badge">Illustrative</span>
      <p>
        <b>The {subject} are examples, not real companies.</b> We&apos;re currently onboarding provider partners. Until
        then, names, fees, rates and offers are placeholders and shouldn&apos;t be relied on. Your estimate is calculated
        from the details you enter.
      </p>
    </aside>
  );
}

/** Small inline label for a made-up provider's name. */
export function SampleTag() {
  return (
    <span className="sample-tag" title="Illustrative listing, not a real company">
      Example
    </span>
  );
}

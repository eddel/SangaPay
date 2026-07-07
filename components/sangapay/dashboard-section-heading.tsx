type DashboardSectionHeadingProps = {
  title: string;
  supportingText?: string;
  aside?: string;
  titleId?: string;
};

export function DashboardSectionHeading({
  title,
  supportingText,
  aside,
  titleId,
}: DashboardSectionHeadingProps) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <h2
          id={titleId}
          className="text-sm font-semibold tracking-[0.01em] text-slate-950"
        >
          {title}
        </h2>
        {supportingText ? (
          <p className="mt-1 text-xs text-slate-500">{supportingText}</p>
        ) : null}
      </div>
      {aside ? <span className="text-xs text-slate-500">{aside}</span> : null}
    </div>
  );
}

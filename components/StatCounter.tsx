import type { HTMLAttributes } from "react";

export type IntroStat = {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  padLength?: number;
};

type Props = IntroStat & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export function StatCounter({ value, suffix, label, detail, padLength = 0, className = "" }: Props) {
  return (
    <div className={`intro-stat flex min-w-0 items-center gap-4 py-4 sm:gap-5 ${className}`}>
      <span className="intro-stat-count display shrink-0" aria-label={`${value}${suffix}`}>
        <span data-count-target={value} data-count-pad={padLength}>{String(value).padStart(padLength, "0")}</span>
        <span className="intro-stat-suffix">{suffix}</span>
      </span>
      <span className="intro-stat-label">
        {label}<br />{detail}
      </span>
    </div>
  );
}

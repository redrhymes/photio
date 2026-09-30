"use client";

import { useApproachAnimation } from "@/components/useApproachAnimation";
import { PhotoStack } from "@/components/PhotoStack";
import { StatCounter, type IntroStat } from "@/components/StatCounter";

const defaultStats: IntroStat[] = [
  { value: 8, suffix: "+", label: "Years", detail: "of storytelling", padLength: 2 },
  { value: 500, suffix: "+", label: "Couples", detail: "photographed" },
  { value: 25, suffix: "+", label: "Cities", detail: "across India" },
];

export function ApproachSection({ stats = defaultStats }: { stats?: IntroStat[] }) {
  const sectionRef = useApproachAnimation();

  return (
    <section
      ref={sectionRef}
      id="approach"
      data-theme="light"
      aria-labelledby="approach-heading"
      className="approach-section"
    >
      <span id="home-intro" className="approach-anchor" aria-hidden="true" />

      <div className="approach-label" data-approach-label>
        <span className="approach-label-line" data-approach-label-line />
        <span>01 / &nbsp;THE PHOTIO APPROACH</span>
      </div>

      <div className="approach-content">
        <div className="approach-copy">
          <h2 id="approach-heading" className="approach-heading display" data-approach-heading>
            <span>Some moments</span>
            <span>deserve more than</span>
            <span>a photograph.</span>
            <span className="approach-heading-second">They deserve a <i data-approach-feeling>feeling</i></span>
            <span className="approach-heading-indent">you can return to.</span>
          </h2>
        </div>

        <PhotoStack />
      </div>

      <div className="approach-stats" data-approach-stats>
        <div className="approach-stats-grid">
          {stats.map((stat, index) => (
            <div className="approach-stat-cell" key={`${stat.label}-${stat.detail}`}>
              <StatCounter {...stat} className="approach-stat" />
              {index < stats.length - 1 && <span className="approach-stat-divider" data-approach-divider aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

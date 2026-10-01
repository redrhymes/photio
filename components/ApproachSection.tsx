"use client";

import { useApproachAnimation } from "@/components/useApproachAnimation";
import { PhotoStack } from "@/components/PhotoStack";

const principles = [
  { title: "Understand", detail: "We start by listening to what matters to you." },
  { title: "Plan", detail: "We shape a thoughtful plan around your story." },
  { title: "Create", detail: "We capture with care, curiosity and intention." },
  { title: "Deliver", detail: "We craft the final photographs and films with care." },
];

export function ApproachSection() {
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
        <span>03 / &nbsp;THE PHOTIO APPROACH</span>
      </div>

      <div className="approach-content">
        <div className="approach-copy">
          <h2 id="approach-heading" className="approach-heading display" data-approach-heading>
            <span>Every project</span>
            <span>begins with a</span>
            <span><i data-approach-feeling>story.</i></span>
          </h2>
          <p className="approach-intro" data-approach-note>
            We take the time to understand your people, purpose and point of view, then create images and films that feel true to it.
          </p>
        </div>

        <PhotoStack />
      </div>

      <div className="approach-stats approach-principles">
        <div className="approach-stats-grid">
          {principles.map((principle, index) => (
            <div className="approach-stat-cell" key={principle.title}>
              <div className="approach-principle">
                <span className="approach-principle-index">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.detail}</p>
              </div>
              {index < principles.length - 1 && <span className="approach-stat-divider" data-approach-divider aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

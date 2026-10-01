import type { ExperienceStepData } from "@/lib/experience";

type Props = {
  step: ExperienceStepData;
};

export function ExperienceStep({ step }: Props) {
  return (
    <li className="experience-step" data-experience-step>
      <span className="experience-step-number" data-experience-number>{step.number}</span>
      <span className="experience-step-marker" aria-hidden="true" />
      <div className="experience-step-copy" data-experience-step-copy>
        <h3 data-experience-title>{step.title}</h3>
        <p data-experience-description>{step.description}</p>
      </div>
    </li>
  );
}

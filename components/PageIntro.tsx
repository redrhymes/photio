import type { ReactNode } from "react";

export function PageIntro({ index, title, subtitle, children }: { index: string; title: ReactNode; subtitle: string; children?: ReactNode }) {
  return (
    <section data-theme="dark" className="bg-ink px-6 pb-16 pt-36 text-paper sm:px-12 sm:pb-24 sm:pt-48 lg:px-20">
      <div className="container">
        <p className="eyebrow mb-5 text-white/55">{index} / {subtitle}</p>
        <h1 className="display max-w-6xl text-[clamp(3.7rem,10vw,10rem)] leading-[.82] tracking-[-.04em]" data-split>{title}</h1>
        {children && <div className="mt-8 max-w-xl text-sm leading-7 text-white/75">{children}</div>}
      </div>
    </section>
  );
}

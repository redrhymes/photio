const text = "Pre-Wedding  ·  Cinematic  ·  Candid  ·  Traditional  ·  Music Album  ·  ";

export function Marquee({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`overflow-hidden border-y py-5 ${dark ? "border-white/15 text-paper" : "border-black/15 text-ink"}`} aria-label={text.replaceAll("·", ",")}>
      <div className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((item) => <span key={item} className="display px-3 text-2xl italic sm:text-3xl" aria-hidden={item > 0}>{text}</span>)}
      </div>
    </div>
  );
}

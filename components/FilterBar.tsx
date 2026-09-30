"use client";

const filters = ["All", "Pre-Wedding", "Wedding", "Candid", "Cinematic", "Events", "Corporate"];

export function FilterBar({ selected, onSelect }: { selected: string; onSelect: (filter: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3" role="group" aria-label="Filter portfolio by type">
      {filters.map((filter) => <button key={filter} onClick={() => onSelect(filter)} aria-pressed={selected === filter} className={`min-h-11 shrink-0 rounded-full border px-5 text-[10px] uppercase tracking-[.15em] transition ${selected === filter ? "border-ink bg-ink text-paper" : "border-black/20 hover:border-ink"}`}>{filter}</button>)}
    </div>
  );
}

import { Asterisk } from "lucide-react";

const ITEMS = [
  "Terrain",
  "Structures",
  "Portraits",
  "Shadowplay",
  "24 Frames",
  "Vol. 01",
  "Light & Shadow",
  "MMXXVI",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2/60 py-4">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8 whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-8">
                <span className="font-display text-sm tracking-[0.35em] uppercase text-fog">
                  {item}
                </span>
                <Asterisk size={14} className="text-brass" strokeWidth={1.5} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

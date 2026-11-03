import { motion } from "framer-motion";
import { Aperture } from "lucide-react";
import { CATEGORIES, type Category } from "../data/photos";
import { cn } from "../utils/cn";

export type Filter = "All" | Category;

interface Props {
  active: Filter;
  onChange: (f: Filter) => void;
  counts: Record<Filter, number>;
}

export default function FilterBar({ active, onChange, counts }: Props) {
  const filters: Filter[] = ["All", ...CATEGORIES];

  return (
    <div className="sticky top-0 z-40 border-y border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-6 md:gap-8 md:px-12">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Lumen home"
        >
          <Aperture size={18} className="text-brass" strokeWidth={1.5} />
          <span className="hidden font-display text-sm font-medium tracking-[0.3em] uppercase sm:block">
            Lumen
          </span>
        </a>

        <span className="hidden h-4 w-px bg-line sm:block" />

        <nav
          aria-label="Filter gallery by series"
          className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto"
        >
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => onChange(f)}
                aria-pressed={isActive}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors duration-500",
                  isActive ? "text-ink" : "text-fog hover:text-bone",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.65 }}
                    className="absolute inset-0 rounded-full bg-brass"
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-line" />
                )}
                <span className="relative flex items-baseline gap-1.5">
                  {f}
                  <span
                    className={cn(
                      "text-[9px]",
                      isActive ? "text-ink/70" : "text-brass/80",
                    )}
                  >
                    {String(counts[f]).padStart(2, "0")}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <span className="hidden shrink-0 text-[11px] tracking-[0.3em] uppercase text-fog lg:block">
          {String(counts[active]).padStart(2, "0")} / 24 shown
        </span>
      </div>
    </div>
  );
}

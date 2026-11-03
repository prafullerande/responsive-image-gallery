import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { gridUrl, type Photo } from "../data/photos";

interface Props {
  photos: Photo[];
  onOpen: (index: number) => void;
}

export default function Gallery({ photos, onOpen }: Props) {
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 380, damping: 32, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 380, damping: 32, mass: 0.6 });

  return (
    <div className="mx-auto max-w-[1600px] px-6 pt-16 pb-28 md:px-18">
      {/* section heading */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-5 flex items-center gap-4 text-[11px] tracking-[0.45em] uppercase text-fog">
            <span className="h-px w-12 bg-brass" />
            The collection — 01—24
          </p>
          <h2 className="font-display text-4xl leading-[1.02] font-light md:text-7xl">
            Every frame,
            <br />
            <em className="text-brass">filed by light.</em>
          </h2>
        </div>
        <p className="max-w-[220px] text-right text-[11px] leading-relaxed tracking-[0.18em] uppercase text-fog">
          Hover to isolate a frame — click to enter the lightbox
        </p>
      </div>

      {/* masonry grid */}
      <div
        className="gallery-grid relative columns-1 gap-5 sm:columns-2 xl:columns-3"
        onMouseMove={(e) => {
          mx.set(e.clientX);
          my.set(e.clientY);
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {photos.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: Math.min(i * 0.055, 0.85),
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-5 break-inside-avoid"
          >
            <figure
              className="gcard group relative m-0 overflow-hidden rounded-md border border-line bg-ink-2 transition-[border-color] duration-700 hover:border-brass/40"
              style={{ aspectRatio: `${p.w} / ${p.h}` }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${p.title} in lightbox`}
              onClick={() => onOpen(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(i);
                }
              }}
            >
              <img
                src={gridUrl(p)}
                alt={`${p.title} — ${p.category} photograph by ${p.credit}`}
                loading="lazy"
                decoding="async"
                className="gimg absolute inset-0 h-full w-full object-cover"
              />

              {/* veil */}
              <div className="gveil absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/10" />

              {/* top row */}
              <span className="gfade absolute top-4 left-4 rounded-full border border-bone/20 bg-ink/50 px-3 py-1.5 text-[10px] tracking-[0.3em] uppercase backdrop-blur-sm">
                № {p.num}
              </span>
              <span className="gfade absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 bg-ink/50 text-bone backdrop-blur-sm">
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </span>

              {/* caption */}
              <figcaption className="gcap absolute inset-x-0 bottom-0 p-5">
                <p className="mb-1.5 text-[10px] tracking-[0.35em] uppercase text-brass">
                  {p.category} — {p.location}
                </p>
                <p className="font-display text-2xl leading-tight font-light">
                  {p.title}
                </p>
                <p className="mt-1.5 text-[10px] tracking-[0.25em] uppercase text-fog">
                  Photo — {p.credit} · {p.year}
                </p>
              </figcaption>
            </figure>
          </motion.div>
        ))}

        {/* magnetic cursor badge */}
        <AnimatePresence>
          {hovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: sx, y: sy }}
              className="pointer-events-none fixed top-0 left-0 z-[80] hidden lg:block"
            >
              <div className="flex h-20 w-20 -translate-x-1/2 -translate-y-[130%] items-center justify-center gap-1 rounded-full bg-brass text-[10px] font-medium tracking-[0.25em] uppercase text-ink shadow-[0_10px_40px_rgba(226,163,67,0.35)]">
                <Plus size={13} strokeWidth={2} />
                View
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

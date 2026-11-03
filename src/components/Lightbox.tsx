import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { fullUrl, thumbUrl, type Photo } from "../data/photos";
import { cn } from "../utils/cn";

interface Props {
  photos: Photo[];
  index: number;
  dir: number;
  onClose: () => void;
  onNav: (d: number) => void;
  onSelect: (i: number) => void;
}

const imgVariants = {
  enter: (d: number) => ({
    opacity: 0,
    x: d >= 0 ? 90 : -90,
    scale: 0.97,
    filter: "blur(8px)",
  }),
  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: (d: number) => ({
    opacity: 0,
    x: d >= 0 ? -90 : 90,
    scale: 0.97,
    filter: "blur(8px)",
  }),
};

export default function Lightbox({
  photos,
  index,
  dir,
  onClose,
  onNav,
  onSelect,
}: Props) {
  const photo = photos[index];
  const touchX = useRef<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  /* preload neighbours */
  useEffect(() => {
    [1, -1].forEach((d) => {
      const n = photos[(index + d + photos.length) % photos.length];
      if (n) {
        const img = new Image();
        img.src = fullUrl(n);
      }
    });
  }, [index, photos]);

  /* keep active thumb in view */
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-ink/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} — lightbox view`}
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 56) onNav(delta > 0 ? -1 : 1);
        touchX.current = null;
      }}
    >
      {/* ---- top bar ---- */}
      <div
        className="flex items-center justify-between px-5 py-4 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-bone tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="text-fog"> / {String(photos.length).padStart(2, "0")}</span>
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span className="hidden text-[10px] tracking-[0.35em] uppercase text-brass sm:block">
            {photo.category}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fog transition-all duration-500 hover:rotate-90 hover:border-brass hover:text-brass"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* ---- stage ---- */}
      <div
        className="relative min-h-0 flex-1 px-14 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence custom={dir} initial={false} mode="sync">
          <motion.div
            key={photo.id}
            custom={dir}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center px-4 md:px-10"
          >
            <img
              src={fullUrl(photo)}
              alt={`${photo.title} — ${photo.category} photograph by ${photo.credit}`}
              className="max-h-full max-w-full rounded-md object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* side arrows */}
        <button
          onClick={() => onNav(-1)}
          aria-label="Previous photograph"
          className="group absolute top-1/2 left-0 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/60 text-fog backdrop-blur-sm transition-all duration-500 hover:border-brass hover:text-brass md:left-3 md:h-13 md:w-13"
        >
          <ChevronLeft
            size={20}
            strokeWidth={1.5}
            className="transition-transform duration-500 group-hover:-translate-x-0.5"
          />
        </button>
        <button
          onClick={() => onNav(1)}
          aria-label="Next photograph"
          className="group absolute top-1/2 right-0 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/60 text-fog backdrop-blur-sm transition-all duration-500 hover:border-brass hover:text-brass md:right-3 md:h-13 md:w-13"
        >
          <ChevronRight
            size={20}
            strokeWidth={1.5}
            className="transition-transform duration-500 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* ---- bottom bar ---- */}
      <div
        className="flex items-end justify-between gap-6 px-5 pt-4 pb-5 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <p className="mb-1 text-[10px] tracking-[0.35em] uppercase text-brass">
              № {photo.num} — {photo.location}
            </p>
            <p className="truncate font-display text-2xl font-light md:text-3xl">
              {photo.title}
            </p>
            <p className="mt-1 text-[10px] tracking-[0.25em] uppercase text-fog">
              Photo — {photo.credit} · {photo.year}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* film strip */}
        <div className="no-scrollbar hidden max-w-[42vw] items-center gap-2 overflow-x-auto md:flex">
          {photos.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              onClick={() => onSelect(i)}
              aria-label={`View ${p.title}`}
              className={cn(
                "h-12 w-12 shrink-0 overflow-hidden rounded border transition-all duration-500",
                i === index
                  ? "border-brass opacity-100"
                  : "border-transparent opacity-35 hover:opacity-80",
              )}
            >
              <img
                src={thumbUrl(p)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

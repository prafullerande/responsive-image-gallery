import { ArrowUp, Aperture } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Aperture size={18} className="text-brass" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.4em] uppercase text-fog">
                End of Volume 01
              </span>
            </div>
            <p className="font-display text-4xl leading-[1.05] font-light md:text-6xl">
              Until the next
              <br />
              <em className="text-brass">light</em> finds us.
            </p>
          </div>

          <div className="flex flex-col items-start gap-8 md:items-end">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-3 rounded-full border border-line px-6 py-3 text-xs tracking-[0.3em] uppercase transition-colors duration-500 hover:border-brass hover:text-brass"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp
                size={14}
                className="transition-transform duration-500 group-hover:-translate-y-1"
              />
            </button>
            <p className="max-w-xs text-xs leading-relaxed text-fog md:text-right">
              All photography courtesy of their respective artists via Pexels.
              Layout, motion & curation by LUMEN Studio.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-[11px] tracking-[0.25em] uppercase text-fog md:flex-row md:items-center md:justify-between">
          <span>© MMXXVI Lumen Anthology</span>
          <span className="hidden md:block">Made of silver halide & patience</span>
          <span>24 Frames — 4 Series</span>
        </div>
      </div>

      {/* oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden pb-2"
      >
        <p className="text-outline text-center font-display text-[18vw] leading-[0.8] font-semibold tracking-tight opacity-60">
          LUMEN
        </p>
      </div>
    </footer>
  );
}

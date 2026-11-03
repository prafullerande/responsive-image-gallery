import { motion } from "framer-motion";
import { Aperture, ArrowDown } from "lucide-react";
import { PHOTOS, gridUrl, type Photo } from "../data/photos";

const BASE_DELAY = 1.75;

const heroPicks: Photo[] = [
  PHOTOS[4], // Breath of the Tatras — landscape
  PHOTOS[2], // Chromesthesia — portrait
  PHOTOS[23], // Solar Cadence — portrait
];

function Line({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{
          delay: BASE_DELAY + i * 0.12,
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Frame({
  photo,
  className,
  delay,
  tilt,
  floatClass,
}: {
  photo: Photo;
  className: string;
  delay: number;
  tilt: string;
  floatClass: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${className}`}
    >
      <div
        className={`${floatClass} rounded-lg border border-line bg-ink-2 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]`}
        style={{ ["--tilt" as string]: tilt }}
      >
        <div className="relative overflow-hidden rounded">
          <img
            src={gridUrl(photo)}
            alt={photo.title}
            className="block h-full w-full object-cover"
            loading="eager"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-ink/70 px-2.5 py-1 text-[9px] tracking-[0.25em] uppercase backdrop-blur-sm">
            № {photo.num}
          </span>
        </div>
      </div>
    </motion.figure>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-brass/[0.07] blur-[120px]"
      />
      {/* hairline grid decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-line md:left-12 md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-line md:right-12 md:block"
      />

      {/* top brand bar */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: BASE_DELAY - 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 pt-8 md:px-18"
      >
        <a href="#top" className="flex items-center gap-3">
          <Aperture size={22} className="text-brass" strokeWidth={1.25} />
          <span className="font-display text-lg font-medium tracking-[0.3em] uppercase">
            Lumen
          </span>
        </a>
        <span className="text-[11px] tracking-[0.35em] uppercase text-fog">
          Index — Vol. 01
        </span>
      </motion.header>

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 pt-16 pb-24 md:px-18 lg:grid-cols-12 lg:pt-10 xl:min-h-[calc(100vh-5.5rem)]">
        {/* ---- copy ---- */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: BASE_DELAY, duration: 1 }}
            className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.45em] uppercase text-fog"
          >
            <span className="h-px w-12 bg-brass" />
            A photographic anthology
          </motion.p>

          <h1 className="font-display text-[clamp(3.4rem,9vw,8.75rem)] leading-[0.92] font-light tracking-[-0.02em]">
            <Line i={0}>Light,</Line>
            <Line i={1}>
              <span className="italic text-brass">made</span>
            </Line>
            <Line i={2}>tangible.</Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE_DELAY + 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-md text-sm leading-relaxed text-fog md:text-base"
          >
            Twenty-four frames gathered where light behaves — ridgelines at
            first sun, concrete cut into geometry, faces painted in colour, and
            shadows composing themselves on quiet walls.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE_DELAY + 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href="#gallery"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bone px-8 py-4 text-xs font-medium tracking-[0.3em] uppercase text-ink transition-transform duration-500 hover:scale-[1.03]"
            >
              <span className="absolute inset-0 -translate-x-full bg-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
              <span className="relative">Enter the gallery</span>
            </a>
            <div className="flex items-center gap-5 text-[11px] tracking-[0.25em] uppercase text-fog">
              <span>24 Frames</span>
              <span className="h-3 w-px bg-line" />
              <span>04 Series</span>
              <span className="h-3 w-px bg-line" />
              <span>MMXXVI</span>
            </div>
          </motion.div>
        </div>

        {/* ---- collage (desktop) ---- */}
        <div className="relative hidden h-[640px] lg:col-span-5 lg:block">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
          />
          <Frame
            photo={heroPicks[1]}
            className="top-0 right-4 w-[54%]"
            delay={BASE_DELAY + 0.35}
            tilt="2deg"
            floatClass="animate-float-a"
          />
          <Frame
            photo={heroPicks[0]}
            className="top-[34%] left-0 w-[56%]"
            delay={BASE_DELAY + 0.5}
            tilt="-2.5deg"
            floatClass="animate-float-b"
          />
          <Frame
            photo={heroPicks[2]}
            className="right-0 bottom-0 w-[40%]"
            delay={BASE_DELAY + 0.65}
            tilt="1.5deg"
            floatClass="animate-float-c"
          />
        </div>

        {/* ---- collage (mobile strip) ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: BASE_DELAY + 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-3 lg:hidden"
        >
          {heroPicks.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-md border border-line"
            >
              <img
                src={gridUrl(p)}
                alt={p.title}
                className="h-28 w-full object-cover sm:h-40"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE_DELAY + 1.1, duration: 1 }}
        className="relative z-10 mx-auto hidden max-w-[1600px] items-center gap-3 px-6 pb-10 text-[10px] tracking-[0.4em] uppercase text-fog md:flex md:px-18"
      >
        <ArrowDown size={14} className="animate-bounce text-brass" />
        Scroll to explore
      </motion.div>
    </section>
  );
}

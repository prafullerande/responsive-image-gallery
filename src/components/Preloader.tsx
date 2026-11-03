import { useEffect } from "react";
import { motion } from "framer-motion";
import { Aperture } from "lucide-react";

const LETTERS = ["L", "U", "M", "E", "N"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1750);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onClick={onDone}
      className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center bg-ink"
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <Aperture size={30} strokeWidth={1} className="animate-spin-slow text-brass" />
      </motion.div>

      <div className="flex overflow-hidden">
        {LETTERS.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.2 + i * 0.07,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-6xl font-light tracking-[0.08em] md:text-8xl"
          >
            {l}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 h-px w-40 origin-left bg-line"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-6 text-[10px] tracking-[0.5em] uppercase text-fog"
      >
        Photographic Anthology — Vol. 01
      </motion.p>
    </motion.div>
  );
}

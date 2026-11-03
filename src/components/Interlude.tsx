import { motion } from "framer-motion";

const STATS = [
  { value: "24", label: "Frames in the volume" },
  { value: "04", label: "Curated series" },
  { value: "17", label: "Photographers" },
  { value: "05", label: "Years of light" },
];

export default function Interlude() {
  return (
    <section className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-18 md:py-32">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.45em] uppercase text-fog">
            <span className="h-px w-12 bg-brass" />
            The premise
          </p>
          <p className="font-display text-3xl leading-[1.25] font-light md:text-5xl">
            Four series, one obsession —{" "}
            <em className="text-brass">how light falls</em>. Across terrain and
            concrete, skin and plaster, each frame is a small proof that the
            world still arranges itself beautifully when someone is watching.
          </p>
        </motion.div>

        <div className="lg:col-span-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-baseline justify-between border-b border-line py-5 first:border-t"
            >
              <span className="font-display text-4xl font-light text-brass md:text-5xl">
                {s.value}
              </span>
              <span className="text-[11px] tracking-[0.3em] uppercase text-fog">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

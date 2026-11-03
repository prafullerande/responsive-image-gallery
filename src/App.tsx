import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Interlude from "./components/Interlude";
import FilterBar, { type Filter } from "./components/FilterBar";
import Gallery from "./components/Gallery";
import Lightbox from "./components/Lightbox";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { CATEGORIES, PHOTOS } from "./data/photos";

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [filter, setFilter] = useState<Filter>("All");
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);

  const visible = useMemo(
    () =>
      filter === "All"
        ? PHOTOS
        : PHOTOS.filter((p) => p.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const base = { All: PHOTOS.length } as Record<Filter, number>;
    CATEGORIES.forEach((c) => {
      base[c] = PHOTOS.filter((p) => p.category === c).length;
    });
    return base;
  }, []);

  /* lock scroll while preloader or lightbox is active */
  useEffect(() => {
    document.body.style.overflow =
      showPreloader || lbIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader, lbIndex]);

  const handleFilter = useCallback((f: Filter) => {
    setFilter(f);
    setLbIndex(null);
  }, []);

  const openLightbox = useCallback((i: number) => {
    setDir(0);
    setLbIndex(i);
  }, []);

  const closeLightbox = useCallback(() => setLbIndex(null), []);

  const nav = useCallback(
    (d: number) => {
      setDir(d);
      setLbIndex((cur) =>
        cur === null ? cur : (cur + d + visible.length) % visible.length,
      );
    },
    [visible.length],
  );

  const select = useCallback(
    (i: number) => {
      setDir(lbIndex !== null && i < lbIndex ? -1 : 1);
      setLbIndex(i);
    },
    [lbIndex],
  );

  return (
    <div id="top" className="relative min-h-screen bg-ink text-bone">
      <div className="grain" aria-hidden />

      <AnimatePresence>
        {showPreloader && (
          <Preloader onDone={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <Hero />
      <Marquee />
      <Interlude />

      <FilterBar active={filter} onChange={handleFilter} counts={counts} />

      <section id="gallery" className="scroll-mt-16">
        {/* keyed remount restages the stagger on every filter change */}
        <Gallery key={filter} photos={visible} onOpen={openLightbox} />
      </section>

      <Footer />

      <AnimatePresence>
        {lbIndex !== null && visible[lbIndex] && (
          <Lightbox
            key="lightbox"
            photos={visible}
            index={lbIndex}
            dir={dir}
            onClose={closeLightbox}
            onNav={nav}
            onSelect={select}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CREW } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * WHAT THEY SAIL FOR — every Straw Hat's dream.
 * Rows reveal with a red sweep; hover ignites the row.
 */
export default function Dreams() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.utils.toArray(".dream-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: i % 2 === 0 ? -4 : 4, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="dreams" className="bg-[#070d13]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal border-b-2 border-white/15 pb-8">
          <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
            [ 02 — Dreams ]
          </p>
          <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
            What they sail for<span className="text-[#b3121f]">.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Every flag on that ship is a promise. Ten dreamers, ten horizons —
            one crew stupid enough to chase them all.
          </p>
        </div>

        <div className="mt-4">
          {CREW.map((m, i) => (
            <div
              key={m.id}
              className="dream-row group relative overflow-hidden border-b border-white/10"
            >
              <div className="absolute inset-0 origin-left scale-x-0 bg-[#b3121f] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <div className="relative flex flex-col gap-1 px-2 py-5 transition-colors duration-300 group-hover:text-white sm:flex-row sm:items-baseline sm:gap-8 sm:px-4 sm:py-6">
                <span className="font-mono2 text-xs text-[#b3121f] group-hover:text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 font-display text-xl tracking-wide uppercase sm:w-64 sm:shrink-0 sm:text-2xl">
                  {m.name}
                </h3>
                <p className="font-display text-base leading-snug text-white/70 italic group-hover:text-white sm:text-lg">
                  "{m.dream}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

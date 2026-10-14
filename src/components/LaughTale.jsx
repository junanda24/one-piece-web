import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GLYPHS = [
  {
    no: "I",
    place: "Zou — the Whale Forest",
    holder: "The Minks",
    status: "SECURED",
    note: "Rubbed by the alliance before leaving the living elephant.",
  },
  {
    no: "II",
    place: "Whole Cake Island",
    holder: "Big Mom's treasure room",
    status: "SECURED",
    note: "Brook stole the copy while playing an Emperor a song.",
  },
  {
    no: "III",
    place: "Wano Country",
    holder: "Beneath the Shogun's palace",
    status: "SECURED",
    note: "Oden's legacy, read at last on the road to Laugh Tale.",
  },
  {
    no: "IV",
    place: "Fish-Man Island",
    holder: "Unknown",
    status: "MISSING",
    note: "It was there. Now it isn't. Someone moved first.",
  },
];

/**
 * ROAD TO LAUGH TALE — the four Road Poneglyphs.
 * 3 secured, 1 missing. Stamps slam in with GSAP.
 */
export default function LaughTale() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.utils.toArray(".glyph-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 4) * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });
      gsap.utils.toArray(".glyph-stamp").forEach((stamp) => {
        gsap.fromTo(
          stamp,
          { scale: 1.8, opacity: 0, rotate: -8 },
          {
            scale: 1,
            opacity: 1,
            rotate: -4,
            duration: 0.28,
            ease: "power2.in",
            scrollTrigger: { trigger: stamp, start: "top 82%", once: true },
          }
        );
      });
      const bar = rootRef.current?.querySelector(".glyph-bar-fill");
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 0.75,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: { trigger: bar, start: "top 85%", once: true },
          }
        );
      }
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="laughtale" className="bg-[#070d13]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal border-b-2 border-white/15 pb-8">
          <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
            [ 07 — The final island ]
          </p>
          <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
            Road to Laugh Tale<span className="text-[#b3121f]">.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Four red stones point to the final island. The crew holds three
            copies. The fourth is missing — and someone else is hunting it.
          </p>
        </div>

        {/* progress */}
        <div className="mt-10 flex items-end justify-between gap-6">
          <p className="font-display text-6xl text-[#f3ead2] md:text-8xl">
            3<span className="text-white/30">/4</span>
          </p>
          <div className="mb-3 h-2 flex-1 bg-white/10">
            <div className="glyph-bar-fill h-full origin-left bg-[#b3121f]" />
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GLYPHS.map((g) => (
            <article
              key={g.no}
              className={`glyph-card relative border p-6 ${
                g.status === "SECURED"
                  ? "border-white/20 bg-[#0c141c]"
                  : "border-dashed border-white/25 bg-transparent"
              }`}
            >
              <span
                className={`glyph-stamp absolute top-4 right-4 border-2 px-2 py-1 font-mono2 text-[10px] font-bold tracking-[0.25em] ${
                  g.status === "SECURED"
                    ? "border-[#b3121f] text-[#b3121f]"
                    : "border-white/40 text-white/50"
                }`}
              >
                {g.status}
              </span>
              <p className="font-display text-5xl text-white/15">{g.no}</p>
              <h3 className="mt-4 font-display text-xl tracking-wide text-[#f3ead2] uppercase">
                {g.place}
              </h3>
              <p className="mt-1 font-mono2 text-[11px] tracking-[0.2em] text-[#b3121f] uppercase">
                {g.holder}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {g.note}
              </p>
            </article>
          ))}
        </div>

        <p className="reveal mt-8 text-center font-jp text-sm tracking-[0.3em] text-white/40">
          ひとつなぎの大秘宝 — the One Piece is real.
        </p>
      </div>
    </section>
  );
}

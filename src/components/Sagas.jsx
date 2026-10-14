import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SAGAS } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Sagas() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.utils.toArray(".saga-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 92%", once: true },
          }
        );
      });
      gsap.utils.toArray(".saga-thumb img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: img, start: "top 92%", once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="sagas" className="bg-[#ece0bd] text-[#16100a]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 border-b-2 border-[#16100a] pb-8">
          <div>
            <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
              [ 04 — The journey ]
            </p>
            <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none uppercase">
              Sagas<span className="text-[#b3121f]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#16100a]/70">
            Eleven sagas. Twenty-seven years of serialization. From a barrel in
            the East Blue to the roof of the world.
          </p>
        </div>

        <ol className="mt-4">
          {SAGAS.map((saga) => (
            <li
              key={saga.no}
              className={`saga-row group grid grid-cols-[auto_1fr] items-center gap-x-5 border-b border-[#16100a]/20 py-5 transition-colors md:grid-cols-[180px_80px_1fr_1fr_auto] md:gap-x-8 ${
                saga.current
                  ? "bg-[#b3121f] text-white"
                  : "hover:bg-[#16100a] hover:text-[#ece0bd]"
              } px-2 md:px-4`}
            >
              {/* thumb */}
              <div className="saga-thumb col-span-2 overflow-hidden border-2 border-[#16100a]/60 md:col-span-1">
                <img
                  src={saga.img}
                  alt={`${saga.name} saga`}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <span
                className={`font-display text-4xl md:text-5xl ${
                  saga.current
                    ? "text-white"
                    : "text-[#b3121f] group-hover:text-[#b3121f]"
                }`}
              >
                {saga.no}
              </span>
              <h3 className="font-display text-2xl tracking-wide uppercase md:text-4xl">
                {saga.name}
                {saga.current && (
                  <span className="ml-3 inline-block bg-white px-2 py-1 align-middle font-mono2 text-[10px] font-bold tracking-[0.2em] text-[#b3121f]">
                    NOW SAILING
                  </span>
                )}
              </h3>
              <p
                className={`col-span-2 mt-1 text-sm md:col-span-1 md:mt-0 ${
                  saga.current
                    ? "text-white/85"
                    : "text-[#16100a]/70 group-hover:text-white/70"
                }`}
              >
                {saga.note}
              </p>
              <span
                className={`font-mono2 text-[11px] tracking-[0.2em] ${
                  saga.current
                    ? "text-white/80"
                    : "text-[#16100a]/50 group-hover:text-white/60"
                }`}
              >
                {saga.years}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

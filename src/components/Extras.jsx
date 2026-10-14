import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EXTRAS } from "../data/content.js";
import CrewDialog from "./CrewDialog.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FACTION_COLORS = {
  Emperor: "bg-[#b3121f]",
  Warlord: "bg-[#7d0b14]",
  "Worst Generation": "bg-[#3a2b12]",
  Marines: "bg-[#1c2f4a]",
  Revolutionary: "bg-[#5a1a3a]",
  "Whitebeard Pirates": "bg-[#2b4a3a]",
  "Revolutionary Army": "bg-[#5a1a3a]",
};

function ExtraCard({ c, index, onSelect }) {
  return (
    <article
      onClick={() => onSelect(c)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(c)}
      tabIndex={0}
      role="button"
      aria-label={`${c.name} — open dossier`}
      className="extra-card group cursor-pointer border border-white/15 bg-[#0c141c] transition-colors duration-300 hover:border-[#b3121f]"
    >
      <div className="relative overflow-hidden">
        <img
          src={c.img}
          alt={c.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          className={`absolute top-2 left-2 px-2 py-1 font-mono2 text-[10px] font-bold tracking-[0.2em] text-white uppercase ${
            FACTION_COLORS[c.faction] || "bg-[#16100a]"
          }`}
        >
          {c.faction}
        </span>
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-[#b3121f] py-2 text-center font-mono2 text-[10px] font-bold tracking-[0.3em] text-white uppercase transition-transform duration-300 group-hover:translate-y-0">
          ☠ Open dossier
        </span>
      </div>
      <div className="p-4">
        <p className="font-jp text-xs font-bold text-white/50">{c.jp}</p>
        <h3 className="mt-1 font-display text-lg leading-tight tracking-wide break-words text-[#f3ead2] uppercase">
          {c.name}
        </h3>
        <p className="mt-1 font-mono2 text-[10px] tracking-[0.2em] text-white/50 uppercase">
          "{c.epithet}"
        </p>
        <p className="mt-2 font-mono2 text-sm font-bold text-[#b3121f]">
          {c.bounty === "—" ? "CLASSIFIED" : `฿${c.bounty}`}
        </p>
      </div>
    </article>
  );
}

/**
 * EXTRAS — beyond the Straw Hats: Emperors, Warlords, legends.
 * Click any card for the dossier dialog.
 */
export default function Extras() {
  const rootRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.utils.toArray(".extra-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="extras" className="bg-[#070d13]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 border-b-2 border-white/15 pb-8">
          <div>
            <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
              [ 09 — Extras ]
            </p>
            <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
              Beyond the crew<span className="text-[#b3121f]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Emperors, Warlords, revolutionaries and legends. The sea is bigger
            than one ship — tap any portrait for their dossier.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 md:gap-6">
          {EXTRAS.map((c, i) => (
            <ExtraCard key={c.id} c={c} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>
      {selected && (
        <CrewDialog member={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CREW } from "../data/content.js";
import CrewDialog from "./CrewDialog.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function BountyNumber({ value }) {
  const ref = useRef(null);
  const target = Number(String(value).replace(/,/g, ""));

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = `฿${target.toLocaleString("en-US")}`;
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `฿${Math.round(obj.v).toLocaleString("en-US")}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <p
      ref={ref}
      className="mt-1 font-display text-[clamp(0.65rem,4.2vw,1.5rem)] text-[#b3121f] sm:tracking-wide"
    >
      ฿0
    </p>
  );
}

function Poster({ member, index, onSelect }) {
  return (
    <article
      onClick={() => onSelect(member)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(member)}
      tabIndex={0}
      role="button"
      className="poster-card group paper-grain flex cursor-pointer flex-col bg-[#ece0bd] text-[#16100a] will-change-transform"
      aria-label={`Wanted poster: ${member.name}, bounty ${member.bounty} berries. Open dossier.`}
    >
      {/* header */}
      <div className="border-b-2 border-[#16100a] px-3 pt-4 pb-3 text-center sm:px-4">
        <p className="font-display text-[clamp(1.2rem,7vw,1.875rem)] tracking-wide uppercase sm:text-3xl">Wanted</p>
        <p className="mt-1 font-mono2 text-[10px] tracking-[0.35em] uppercase">
          Dead or alive
        </p>
      </div>

      {/* portrait */}
      <div className="relative m-3 mb-0 overflow-hidden border-2 border-[#16100a] sm:m-4 sm:mb-0">
        <img
          src={member.img}
          alt={member.name}
          loading="lazy"
          className="poster-img aspect-[4/5] w-full object-cover object-top"
        />
        <span className="absolute top-2 left-2 bg-[#16100a] px-2 py-1 font-mono2 text-[10px] font-bold tracking-[0.2em] text-[#ece0bd]">
          No.{String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-[#b3121f] py-2 text-center font-mono2 text-[10px] font-bold tracking-[0.3em] text-white uppercase transition-transform duration-300 group-hover:translate-y-0">
          ☠ Open dossier
        </span>
      </div>

      {/* name */}
      <div className="px-3 pt-3 text-center sm:px-4">
        <h3 className="font-display text-[clamp(0.95rem,4.6vw,1.25rem)] leading-tight tracking-wide break-words uppercase">
          {member.name}
        </h3>
        <p className="mt-1 font-jp text-xs font-bold text-[#16100a]/70">{member.jp}</p>
        <p className="mt-2 font-mono2 text-[10px] leading-relaxed tracking-[0.12em] break-words uppercase text-[#16100a]/60 sm:tracking-[0.2em]">
          "{member.epithet}" · {member.role}
        </p>
      </div>

      {/* bounty */}
      <div className="mt-auto px-3 pt-3 pb-4 text-center sm:px-4">
        <div className="border-t-2 border-[#16100a] pt-3">
          <p className="font-mono2 text-[10px] tracking-[0.35em] uppercase">Bounty</p>
          <BountyNumber value={member.bounty} />
          {member.fruit !== "—" && (
            <p className="mt-2 font-mono2 text-[10px] leading-relaxed tracking-wide text-[#16100a]/60 uppercase">
              ☠ {member.fruit}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Crew() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="crew" className="bg-[#0c141c]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 border-b-2 border-white/15 pb-8">
          <div>
            <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
              [ 01 — The crew ]
            </p>
            <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
              Wanted
              <span className="text-[#b3121f]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Ten pirates. One flag. Issued by the World Government — total bounty{" "}
            <span className="font-mono2 font-bold text-white">฿8,816,001,000</span>.
            Chopper's poster is a crime against justice.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 md:gap-6">
          {CREW.map((m, i) => (
            <Poster key={m.id} member={m} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>
      {selected && (
        <CrewDialog member={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

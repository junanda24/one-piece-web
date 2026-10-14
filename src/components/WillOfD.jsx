import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARRIERS = [
  { name: "Gol D. Roger", epithet: "The Pirate King" },
  { name: "Monkey D. Luffy", epithet: "The man who will surpass him" },
  { name: "Portgas D. Ace", epithet: "The will of fire" },
  { name: "Marshall D. Teach", epithet: "The darkness that dreams" },
  { name: "Trafalgar D. Water Law", epithet: "The Surgeon of Death" },
  { name: "Jaguar D. Saul", epithet: "The giant who laughed" },
  { name: "Monkey D. Dragon", epithet: "The most wanted man alive" },
  { name: "Monkey D. Garp", epithet: "The hero who refused heaven" },
];

/**
 * THE WILL OF D. — the initial the World Government fears.
 * Names decode in with a scramble effect on scroll.
 */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?#";

function scrambleTo(el, final) {
  const start = performance.now();
  const dur = 700;
  function frame(now) {
    const t = Math.min(1, (now - start) / dur);
    const reveal = Math.floor(final.length * t);
    el.textContent = final
      .split("")
      .map((c, i) =>
        c === " " || i < reveal
          ? c
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      )
      .join("");
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export default function WillOfD() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.utils.toArray(".d-name").forEach((el) => {
        const final = el.dataset.name;
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => scrambleTo(el, final),
        });
      });
      gsap.fromTo(
        ".d-giant",
        { opacity: 0.12 },
        {
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="willofd"
      className="relative overflow-hidden bg-black"
    >
      {/* giant background D. */}
      <span
        aria-hidden="true"
        className="d-giant pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[60vw] leading-none text-[#b3121f] select-none md:text-[38vw]"
      >
        D.
      </span>

      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal border-b-2 border-white/15 pb-8">
          <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
            [ 08 — The mystery ]
          </p>
          <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
            The Will of D<span className="text-[#b3121f]">.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            They all carry the same letter. The scholars of Ohara died for
            asking what it means — and the World Government still fears the
            answer.
          </p>
        </div>

        <div className="mt-10 grid gap-px bg-white/15 sm:grid-cols-2">
          {CARRIERS.map((c) => (
            <div
              key={c.name}
              className="group bg-black p-6 transition-colors duration-300 hover:bg-[#b3121f] md:p-8"
            >
              <p
                className="d-name font-display text-2xl tracking-wide text-[#f3ead2] uppercase md:text-3xl"
                data-name={c.name}
              >
                {c.name}
              </p>
              <p className="mt-2 font-mono2 text-[11px] tracking-[0.25em] text-white/45 uppercase group-hover:text-white/80">
                {c.epithet}
              </p>
            </div>
          ))}
        </div>

        <p className="reveal mt-10 text-center font-display text-xl text-white/70 italic sm:text-2xl">
          "Inherited will... the tide of the times... people's dreams —
          these things cannot be stopped."
        </p>
      </div>
    </section>
  );
}

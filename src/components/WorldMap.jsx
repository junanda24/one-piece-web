import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * WORLD MAP — full-HD fan chart of the seas.
 * Drag to pan, scroll/pinch buttons to zoom. GSAP reveal on enter.
 */
export default function WorldMap() {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, s: 1 });
  const drag = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.fromTo(
        ".map-frame",
        { clipPath: "inset(8% 8% 8% 8%)", opacity: 0.4 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".map-frame", start: "top 80%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  const clampPan = (x, y, s) => {
    const el = frameRef.current;
    if (!el) return { x, y };
    const maxX = ((s - 1) * el.clientWidth) / 2;
    const maxY = ((s - 1) * el.clientHeight) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const zoom = (ds) => {
    setT((p) => {
      const s = Math.max(1, Math.min(3.5, p.s + ds));
      const { x, y } = clampPan(p.x, p.y, s);
      return { x, y, s };
    });
  };

  const onDown = (e) => {
    drag.current = { sx: e.clientX, sy: e.clientY, x: t.x, y: t.y };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const d = drag.current;
    const nx = d.x + (e.clientX - d.sx);
    const ny = d.y + (e.clientY - d.sy);
    const { x, y } = clampPan(nx, ny, t.s);
    setT((p) => ({ ...p, x, y }));
  };
  const onUp = () => (drag.current = null);

  const onWheel = (e) => {
    if (Math.abs(e.deltaY) < 2) return;
    zoom(e.deltaY < 0 ? 0.25 : -0.25);
  };

  return (
    <section ref={rootRef} id="worldmap" className="bg-[#070d13]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 border-b-2 border-white/15 pb-8">
          <div>
            <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
              [ 11 — World map ]
            </p>
            <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
              The whole blue<span className="text-[#b3121f]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Four Blues, one Grand Line, a Red Line splitting the world in two.
            Drag to explore — this is the sea Nami dreams of mapping.
          </p>
        </div>

        <div className="mt-10">
          <div
            ref={frameRef}
            className="map-frame relative cursor-grab overflow-hidden border-2 border-white/20 select-none active:cursor-grabbing"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onWheel={onWheel}
            style={{ touchAction: "pan-y" }}
          >
            <img
              src="/images/world-map.jpg"
              alt="One Piece world map — the four Blues, Grand Line and Red Line"
              draggable={false}
              className="w-full will-change-transform"
              style={{
                transform: `translate(${t.x}px, ${t.y}px) scale(${t.s})`,
                transformOrigin: "center",
              }}
            />
            <span className="pointer-events-none absolute top-4 left-4 bg-[#16100a]/85 px-3 py-2 font-mono2 text-[10px] tracking-[0.3em] text-[#ece0bd] uppercase">
              ⟨ Drag to explore ⟩
            </span>
            <div className="absolute right-4 bottom-4 flex gap-2">
              {[
                ["+", () => zoom(0.4), "Zoom in"],
                ["−", () => zoom(-0.4), "Zoom out"],
                ["⟲", () => setT({ x: 0, y: 0, s: 1 }), "Reset"],
              ].map(([label, fn, aria]) => (
                <button
                  key={aria}
                  onClick={fn}
                  aria-label={aria}
                  className="grid h-11 w-11 place-items-center border border-white/30 bg-[#16100a]/85 font-display text-xl text-white transition-colors hover:border-[#b3121f] hover:text-[#b3121f] active:translate-y-px"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center font-mono2 text-[10px] tracking-[0.3em] text-white/40 uppercase">
            Fan chart — East Blue · Red Line · Grand Line · Calm Belt
          </p>
        </div>
      </div>
    </section>
  );
}

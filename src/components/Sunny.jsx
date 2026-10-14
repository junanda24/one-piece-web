import { Ship, Wind, Zap } from "lucide-react";

const SPECS = [
  { icon: Ship, label: "Ship class", value: "Brigantine Sloop" },
  { icon: Wind, label: "Figurehead", value: "Lion — Soldier Dock System" },
  { icon: Zap, label: "Secret weapon", value: "Coup de Burst" },
];

export default function Sunny() {
  return (
    <section id="ship" className="relative overflow-hidden bg-[#0c141c]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal">
          <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
            [ 06 — The ship ]
          </p>
          <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
            Thousand Sunny<span className="text-[#b3121f]">.</span>
          </h2>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-5">
          <div className="reveal sunny-frame relative overflow-hidden lg:col-span-3">
            <img
              src="/images/sunny.jpg"
              alt="The Thousand Sunny sailing"
              loading="lazy"
              className="sunny-img h-full min-h-[320px] w-full scale-[1.25] object-cover will-change-transform"
            />
            <span className="absolute bottom-4 left-4 bg-[#16100a] px-3 py-2 font-mono2 text-[10px] tracking-[0.25em] text-[#ece0bd] uppercase">
              Built by Franky — Water 7
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:col-span-2">
            <p className="reveal text-base leading-relaxed text-white/70">
              Forged from the treasure of Adam wood — the same timber as the
              Oro Jackson. She has carried the crew through a war at the top of
              the world, the bottom of the sea, and the sky itself.{" "}
              <span className="font-bold text-white">
                A ship is only as strong as the nakama aboard her.
              </span>
            </p>
            <ul className="reveal">
              {SPECS.map((spec) => (
                <li
                  key={spec.label}
                  className="flex items-center gap-5 border-t border-white/15 py-5 last:border-b"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/25 text-[#d9a441]">
                    <spec.icon size={20} />
                  </span>
                  <div>
                    <p className="font-mono2 text-[10px] tracking-[0.25em] text-white/50 uppercase">
                      {spec.label}
                    </p>
                    <p className="mt-1 font-display text-lg tracking-wide text-[#f3ead2] uppercase">
                      {spec.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

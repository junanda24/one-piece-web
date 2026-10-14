import { FRUITS } from "../data/content.js";

const TYPE_STYLE = {
  "MYTHICAL ZOAN": "bg-[#b3121f] text-white",
  LOGIA: "bg-[#0c141c] text-white",
  PARAMECIA: "bg-[#d9a441] text-[#16100a]",
};

export default function Fruits() {
  return (
    <section id="fruits" className="bg-[#070d13]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 border-b-2 border-white/15 pb-8">
          <div>
            <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
              [ 05 — Cursed powers ]
            </p>
            <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
              Devil Fruits<span className="text-[#b3121f]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Eat one and the sea rejects you forever. Six of the most feared
            powers to ever surface on the Grand Line.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {FRUITS.map((fruit) => (
            <article
              key={fruit.name}
              className="reveal group flex flex-col bg-[#070d13] transition-colors hover:bg-[#0c141c]"
            >
              {/* fruit portrait */}
              <div className="halftone relative m-5 mb-0 border border-white/15 bg-[#0c141c] p-8">
                <img
                  src={fruit.img}
                  alt={fruit.name}
                  loading="lazy"
                  className="mx-auto aspect-square w-full max-w-[210px] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-110"
                />
                <span
                  className={`absolute top-3 left-3 px-3 py-1.5 font-mono2 text-[10px] font-bold tracking-[0.25em] ${TYPE_STYLE[fruit.type]}`}
                >
                  {fruit.type}
                </span>
                <span className="absolute right-3 bottom-3 font-mono2 text-[10px] tracking-[0.2em] text-white/30 uppercase">
                  No.{String(FRUITS.indexOf(fruit) + 1).padStart(2, "0")}
                </span>
              </div>

              {/* details */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl leading-tight tracking-wide break-words text-[#f3ead2] uppercase">
                  {fruit.name}
                </h3>
                <p className="mt-2 font-mono2 text-[11px] tracking-[0.2em] text-[#b3121f] uppercase">
                  User — {fruit.user}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {fruit.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-8 font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
          * The sea hates you now. No swimming. Ever.
        </p>
      </div>
    </section>
  );
}

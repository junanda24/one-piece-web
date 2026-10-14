import { Marquee } from "./Manifesto.jsx";

export default function Footer() {
  return (
    <footer className="bg-[#16100a] text-[#f3ead2]">
      <Marquee
        className="border-y border-white/15 py-4"
        items={Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="font-display text-xl tracking-wide uppercase text-white/40">
            Set sail <span className="mx-4 text-[#b3121f]">✦</span>
          </span>
        ))}
      />

      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                onClick={() =>
                  document.dispatchEvent(new CustomEvent("whitebeard"))
                }
                title="..."
                className="grid h-10 w-10 cursor-pointer place-items-center overflow-hidden bg-[#b3121f] p-1 transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                <img
                  src="/images/jolly-roger.png"
                  alt="Straw Hat Pirates Jolly Roger"
                  className="h-full w-full object-contain"
                />
              </span>
              <p className="font-display text-2xl tracking-wide uppercase sm:text-3xl">
                Straw Hat Grand Voyage
              </p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
              A fan-made tribute to Eiichiro Oda's One Piece. All characters,
              artwork, and the One Piece itself belong to their respective
              owners. No pirates were harmed.
            </p>
            <p className="mt-2 max-w-md font-mono2 text-[10px] leading-relaxed tracking-[0.2em] text-white/35 uppercase">
              Fan-made project — not affiliated with Eiichiro Oda / Shueisha /
              Toei Animation.
            </p>
          </div>

          <div className="font-mono2 text-[11px] tracking-[0.25em] uppercase">
            <p className="text-white/50">Next stop</p>
            <p className="mt-2 font-display text-4xl tracking-wide text-[#b3121f]">
              Laugh Tale
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
          <span>© 1997–2026 — The age of pirates</span>
          <span className="font-jp tracking-[0.3em]">ひとつなぎの大秘宝</span>
          <span>Built for the nakama</span>
        </div>
      </div>
    </footer>
  );
}

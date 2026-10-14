import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0c141c]">
      {/* backdrop art */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <img
          src="/images/luffy-gear5.jpg"
          alt="Monkey D. Luffy in Gear 5"
          className="h-full w-full scale-110 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,rgba(7,13,19,0.95),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(7,13,19,0.7),transparent)]" />
      </div>

      {/* red sun disc */}
      <div
        aria-hidden="true"
        className="hero-sun animate-drift absolute top-[16%] right-[8%] hidden h-56 w-56 rounded-full bg-[#b3121f] will-change-transform md:block lg:h-72 lg:w-72"
      />

      {/* vertical japanese */}
      <div
        aria-hidden="true"
        className="hero-jp vertical-jp absolute top-1/2 right-6 hidden -translate-y-1/2 font-jp text-sm font-bold tracking-[0.5em] text-white/60 lg:block"
      >
        麦わらの一味 — 海賊王への航海
      </div>

      {/* content */}
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-28 pb-10 will-change-transform md:px-10 md:pb-14">
        <p className="hero-kicker mb-4 flex items-center gap-3 font-mono2 text-[11px] tracking-[0.3em] text-white/70 uppercase">
          <span className="inline-block h-2 w-2 bg-[#b3121f]" />
          A fan tribute — est. 1997
        </p>

        <h1 className="font-display leading-[0.88] tracking-tight text-[#f3ead2] uppercase">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block text-[clamp(2.75rem,13.5vw,13rem)] will-change-transform">
              One Piece
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="hero-line block text-[clamp(1.6rem,5vw,4.2rem)] leading-[1.05] text-[#b3121f] will-change-transform [text-shadow:0_2px_0_rgba(0,0,0,0.6)]">
              Straw Hat Grand Voyage
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-sub max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Twenty-seven years. A thousand chapters. One dream that never sank.
            Board the Thousand Sunny and chase the final island —{" "}
            <span className="font-bold text-white">the One Piece is real.</span>
          </p>

          <div className="hero-cta flex items-center gap-4">
            <a
              href="#crew"
              className="bg-[#f3ead2] px-8 py-4 font-mono2 text-xs font-bold tracking-[0.25em] text-[#16100a] uppercase transition-colors hover:bg-white"
            >
              Meet the crew
            </a>
            <a
              href="#sagas"
              className="border border-white/40 px-8 py-4 font-mono2 text-xs font-bold tracking-[0.25em] text-white uppercase transition-colors hover:border-white hover:bg-white/10"
            >
              The sagas
            </a>
          </div>
        </div>

        {/* bottom meta strip */}
        <div className="hero-meta mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/15 pt-5 font-mono2 text-[10px] tracking-[0.25em] text-white/50 uppercase">
          <span>East Blue → Laugh Tale</span>
          <span className="hidden sm:inline">Bounty total: ฿8,816,001,000</span>
          <a href="#manifesto" aria-label="Scroll down" className="flex items-center gap-2 text-white/70 hover:text-white">
            Scroll <ChevronDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

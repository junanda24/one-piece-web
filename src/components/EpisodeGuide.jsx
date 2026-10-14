import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EPISODES } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TABS = [
  { id: "mustWatch", label: "Must watch" },
  { id: "best", label: "Best rated" },
  { id: "worst", label: "Worst" },
  { id: "filler", label: "Filler guide" },
];

const VERDICT_STYLE = {
  watch: "border-[#2b7a3a] text-[#7fd08a]",
  mixed: "border-[#b98a1f] text-[#e8c35a]",
  skip: "border-white/25 text-white/50",
};

/**
 * EPISODE GUIDE — must-watch, best/worst rated (IMDb), filler ranges.
 * Tab switches animate with GSAP; rating bars draw on scroll.
 */
export default function EpisodeGuide() {
  const rootRef = useRef(null);
  const [tab, setTab] = useState("mustWatch");
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const switchTab = (id) => {
    if (id === tab) return;
    setTab(id);
    if (!reduced) {
      requestAnimationFrame(() => {
        gsap.fromTo(
          ".ep-row",
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
        );
      });
    }
  };

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray(".ep-bar-fill").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(bar.dataset.w),
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          }
        );
      });
    },
    { scope: rootRef, dependencies: [tab] }
  );

  return (
    <section ref={rootRef} id="episodes" className="bg-[#0c141c]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal border-b-2 border-white/15 pb-8">
          <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
            [ 10 — Episode guide ]
          </p>
          <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
            Watch smart<span className="text-[#b3121f]">.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            1100+ episodes is a voyage, not a sprint. The essentials, the
            legends, the skips — rated by the fandom (IMDb).
          </p>
        </div>

        {/* tabs */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Episode guide tabs"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => switchTab(t.id)}
              className={`border px-5 py-3 font-mono2 text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-200 ${
                tab === t.id
                  ? "border-[#b3121f] bg-[#b3121f] text-white"
                  : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[420px]">
          {tab === "mustWatch" && (
            <ol className="space-y-px">
              {EPISODES.mustWatch.map((e, i) => (
                <li
                  key={e.ep}
                  className="ep-row group flex flex-col gap-2 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="font-display text-3xl text-[#b3121f] sm:w-16 sm:shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="shrink-0 bg-white/10 px-3 py-1 font-mono2 text-xs font-bold text-white">
                    EP {e.ep}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg tracking-wide text-[#f3ead2] uppercase sm:text-xl">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{e.why}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {tab === "best" && (
            <ol className="space-y-6">
              {EPISODES.best.map((e) => (
                <li key={e.ep} className="ep-row">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg tracking-wide text-[#f3ead2] uppercase sm:text-xl">
                      <span className="mr-3 bg-[#b3121f] px-2 py-1 font-mono2 text-xs font-bold text-white">
                        EP {e.ep}
                      </span>
                      {e.title}
                    </h3>
                    <span className="font-mono2 text-2xl font-bold text-[#e8c35a]">
                      ★ {e.rating}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/10">
                    <div
                      className="ep-bar-fill h-full origin-left bg-[#e8c35a]"
                      data-w={Number(e.rating) / 10}
                    />
                  </div>
                  <p className="mt-2 text-sm text-white/60">{e.note}</p>
                </li>
              ))}
              <p className="pt-2 font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Ratings: IMDb, at time of writing. Review-bombing wars excluded
                where adjusted.
              </p>
            </ol>
          )}

          {tab === "worst" && (
            <ol className="space-y-6">
              {EPISODES.worst.map((e) => (
                <li
                  key={`${e.ep}-${e.title}`}
                  className="ep-row border border-[#b3121f]/40 bg-[#b3121f]/5 p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg tracking-wide text-[#f3ead2] uppercase sm:text-xl">
                      <span className="mr-3 border border-[#b3121f] px-2 py-1 font-mono2 text-xs font-bold text-[#b3121f]">
                        EP {e.ep}
                      </span>
                      {e.title}
                    </h3>
                    <span className="font-mono2 text-2xl font-bold text-[#b3121f]">
                      ★ {e.rating}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/10">
                    <div
                      className="ep-bar-fill h-full origin-left bg-[#b3121f]"
                      data-w={Number(e.rating) / 10 || 0.4}
                    />
                  </div>
                  <p className="mt-2 text-sm text-white/60">{e.note}</p>
                </li>
              ))}
              <p className="pt-2 font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Mostly filler & recaps. Canon episodes rarely sink this low.
              </p>
            </ol>
          )}

          {tab === "filler" && (
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4 border border-white/15 bg-white/[0.03] p-5">
                <p className="font-display text-5xl text-[#f3ead2]">
                  ~9<span className="text-2xl text-white/40">%</span>
                </p>
                <p className="max-w-md text-sm leading-relaxed text-white/60">
                  Only about 94 of 1100+ episodes are pure filler — one of the
                  lowest filler rates in long-running anime. Still, here's
                  every range worth knowing.
                </p>
              </div>
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {EPISODES.filler.map((f) => (
                  <li
                    key={f.range}
                    className="ep-row border border-white/15 bg-[#070d13] p-5 transition-colors duration-300 hover:border-[#b3121f]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono2 text-lg font-bold text-[#f3ead2]">
                        {f.range}
                      </span>
                      <span
                        className={`border px-2 py-1 font-mono2 text-[10px] font-bold tracking-[0.25em] uppercase ${VERDICT_STYLE[f.verdict]}`}
                      >
                        {f.verdict}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg tracking-wide text-white/90 uppercase">
                      {f.arc}
                    </h3>
                    <p className="mt-1 text-sm text-white/55">{f.note}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

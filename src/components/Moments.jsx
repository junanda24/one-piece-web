import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOMENTS = [
  {
    no: "01",
    title: "Thank you, Merry",
    place: "Water 7 — the Viking funeral",
    quote: "I'm sorry I couldn't take you to the end.",
    text: "A ship is not just wood. When the Going Merry spoke at Enies Lobby, every fan cried — and when she burned, we buried family.",
    img: "/images/scenes/merry-funeral.jpg",
  },
  {
    no: "02",
    title: "I want to live!",
    place: "Enies Lobby",
    quote: "Take me out to sea with you!",
    text: "Twenty years of running ended in six words. The crew burned the World Government's flag to answer her.",
    img: "/images/scenes/robin-enies.jpg",
  },
  {
    no: "03",
    title: "Nothing happened",
    place: "Thriller Bark",
    quote: "Nothing... nothing at all happened.",
    text: "Zoro took every drop of Luffy's pain from Kuma — and stood, bloody and smiling. The most loyal act in manga history.",
    img: "/images/scenes/zoro-nothing.jpg",
  },
  {
    no: "04",
    title: "The Drums of Liberation",
    place: "Wano Country — Onigashima",
    quote: "So this is... my peak. Gear 5.",
    text: "A heartbeat the world hadn't heard in 800 years. Rubber became myth, and the Sun God Nika laughed again.",
    img: "/images/scenes/luffy-gear5.jpg",
  },
];

/**
 * LEGENDARY MOMENTS — alternating editorial rows.
 * Images parallax inside their frames (scrub); text reveals on enter.
 */
export default function Moments() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.utils.toArray(".moment-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".moment-frame"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
      gsap.utils.toArray(".moment-text").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="moments" className="bg-[#0c141c]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="reveal border-b-2 border-white/15 pb-8">
          <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
            [ 03 — Moments ]
          </p>
          <h2 className="drift-x mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-[#f3ead2] uppercase">
            Legendary moments<span className="text-[#b3121f]">.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Twenty-eight years of serialization. These are the panels burned
            into every fan's heart.
          </p>
        </div>

        <div className="mt-12 space-y-16 md:space-y-24">
          {MOMENTS.map((m, i) => (
            <article
              key={m.no}
              className={`grid items-center gap-6 md:grid-cols-2 md:gap-12 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="moment-frame relative overflow-hidden border-2 border-white/15">
                <img
                  src={m.img}
                  alt={m.title}
                  loading="lazy"
                  className="moment-img aspect-[16/10] w-full scale-[1.28] object-cover will-change-transform"
                />
                <span className="absolute top-3 left-3 bg-[#b3121f] px-3 py-1 font-display text-2xl text-white">
                  {m.no}
                </span>
              </div>
              <div className="moment-text">
                <p className="font-mono2 text-[11px] tracking-[0.3em] text-[#b3121f] uppercase">
                  {m.place}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#f3ead2] uppercase">
                  {m.title}
                </h3>
                <blockquote className="mt-4 border-l-4 border-[#b3121f] pl-4 font-display text-lg text-white/90 italic sm:text-xl">
                  "{m.quote}"
                </blockquote>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
                  {m.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Site-wide motion system (GSAP + ScrollTrigger).
 * - Hero intro timeline (staggered rise, sun-disc pop)
 * - ScrollTrigger.batch reveals for every `.reveal` element
 * - Parallax: hero backdrop + red sun disc
 * - Section titles drift horizontally with scroll
 * - Marquee speed reacts to scroll velocity
 * All transforms/opacity only. Fully skipped under prefers-reduced-motion,
 * and content stays visible when JS/GSAP can't run (no CSS pre-hiding).
 */
export function useSiteAnimations() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ---------- full motion ---------- */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* --- hero intro --- */
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .fromTo(
            ".hero-kicker",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            0.1
          )
          .fromTo(
            ".hero-line",
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
            0.2
          )
          .fromTo(
            ".hero-sub",
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            0.7
          )
          .fromTo(
            ".hero-cta > *",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
            0.85
          )
          .fromTo(
            ".hero-meta",
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            1.05
          )
          .fromTo(
            ".hero-sun",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.55)" },
            0.35
          )
          .fromTo(
            ".hero-jp",
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 1 },
            0.9
          );

        /* --- generic scroll reveals (batched) --- */
        gsap.set(".reveal", { y: 44, opacity: 0 });
        ScrollTrigger.batch(".reveal", {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              stagger: 0.09,
              overwrite: true,
            }),
        });

        /* --- hero parallax --- */
        gsap.to(".hero-bg", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-sun", {
          yPercent: -46,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-jp", {
          yPercent: 60,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-content", {
          yPercent: -10,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        /* --- sunny ship parallax --- */
        gsap.fromTo(
          ".sunny-img",
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: ".sunny-frame",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        /* --- section titles drift --- */
        gsap.utils.toArray(".drift-x").forEach((el) => {
          gsap.fromTo(
            el,
            { x: 48 },
            {
              x: -48,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });

        /* --- marquees skew with scroll velocity --- */
        const skewSetters = gsap.utils
          .toArray(".marquee-skew")
          .map((el) => gsap.quickSetter(el, "skewX", "deg"));
        const skewProxy = { skew: 0 };
        const skewClamp = gsap.utils.clamp(-7, 7);
        ScrollTrigger.create({
          onUpdate: (self) => {
            const skew = skewClamp(self.getVelocity() / -350);
            if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
              skewProxy.skew = skew;
              gsap.to(skewProxy, {
                skew: 0,
                duration: 0.9,
                ease: "power3",
                overwrite: true,
                onUpdate: () =>
                  skewSetters.forEach((set) => set(skewProxy.skew)),
              });
            }
          },
        });

        /* --- manifesto quote: word-by-word rise --- */
        const quoteWords = gsap.utils.toArray(".quote-word");
        if (quoteWords.length) {
          gsap.fromTo(
            quoteWords,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              ease: "expo.out",
              stagger: 0.07,
              scrollTrigger: {
                trigger: ".quote-block",
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        /* --- poster cards: staggered pop --- */
        gsap.utils.toArray(".poster-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0, rotate: i % 2 === 0 ? -2 : 2 },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

        /* --- saga rows: slide from left --- */
        gsap.utils.toArray(".saga-row").forEach((row) => {
          gsap.fromTo(
            row,
            { x: -36, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "expo.out",
              scrollTrigger: { trigger: row, start: "top 90%", once: true },
            }
          );
        });

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });

      /* ---------- reduced motion: gentle fades only ---------- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal, .hero-line, .hero-kicker, .hero-sub, .hero-cta > *, .hero-meta", {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
      });
    },
    { scope: root }
  );

  return root;
}

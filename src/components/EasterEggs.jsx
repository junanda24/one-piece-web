import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Brook's surprise: Bink's Sake sing-along overlay.
 * Opened via `open-sake` custom event (from Brook's dossier).
 */
export function SakeOverlay() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    document.addEventListener("open-sake", onOpen);
    return () => document.removeEventListener("open-sake", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const root = rootRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (root && !reduced) {
      gsap.fromTo(
        root.querySelector(".sake-panel"),
        { scale: 0.85, opacity: 0, rotate: -2 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.6)" }
      );
      gsap.fromTo(
        root.querySelectorAll(".sake-note"),
        { y: 40, opacity: 0 },
        {
          y: -160,
          opacity: 0,
          duration: 2.4,
          stagger: 0.35,
          repeat: -1,
          ease: "sine.out",
        }
      );
      gsap.fromTo(
        root.querySelectorAll(".sake-line"),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.35, ease: "power3.out" }
      );
    }
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[95] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Bink's Sake sing-along"
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      {["♪", "♫", "♪", "♫", "♪"].map((n, i) => (
        <span
          key={i}
          className="sake-note pointer-events-none absolute bottom-10 text-3xl text-[#b3121f]"
          style={{ left: `${15 + i * 17}%` }}
        >
          {n}
        </span>
      ))}
      <div className="sake-panel paper-grain relative max-w-lg border-2 border-[#b3121f] bg-[#0c141c] p-8 text-center sm:p-10">
        <p className="font-mono2 text-[10px] tracking-[0.35em] text-[#b3121f] uppercase">
          ☠ Brook requests a song
        </p>
        <h3 className="mt-3 font-display text-4xl text-[#f3ead2] uppercase sm:text-5xl">
          Bink's Sake<span className="text-[#b3121f]">.</span>
        </h3>
        <div className="mt-6 space-y-3 font-display text-lg leading-snug text-white/85 italic sm:text-xl">
          <p className="sake-line">"Bink's sake, oh — deliver it to me,</p>
          <p className="sake-line">sail the seas, the pirate's life for me.</p>
          <p className="sake-line text-[#b3121f] not-italic font-bold">
            Yo-hohoho, yo-hohoho!
          </p>
          <p className="sake-line">Bink's sake — I deliver to you."</p>
        </div>
        <p className="mt-6 font-jp text-sm text-white/50">
          届けてみよう — 楽しもう、仲間たち！
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-8 border border-white/30 px-8 py-3 font-mono2 text-xs tracking-[0.25em] text-white/80 uppercase transition-colors hover:border-[#b3121f] hover:text-[#b3121f]"
        >
          Yohohoho — close
        </button>
      </div>
    </div>
  );
}

/**
 * Whitebeard's last words. Triple-click the footer anchor to trigger:
 * fullscreen flash + screen shake.
 */
export function WhitebeardFlash() {
  const [flash, setFlash] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    let clicks = 0;
    let timer = null;
    const onTriple = () => {
      clicks += 1;
      clearTimeout(timer);
      timer = setTimeout(() => (clicks = 0), 600);
      if (clicks >= 3) {
        clicks = 0;
        setFlash(true);
      }
    };
    document.addEventListener("whitebeard", onTriple);
    return () => {
      document.removeEventListener("whitebeard", onTriple);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!flash) return;
    const root = rootRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (root && !reduced) {
      const tl = gsap.timeline({ onComplete: () => setFlash(false) });
      tl.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 0.12, repeat: 3, yoyo: true }
      )
        .to(root, { opacity: 1, duration: 0.2 })
        .fromTo(
          root.querySelector(".wb-text"),
          { scale: 0.9 },
          {
            scale: 1.06,
            duration: 2.2,
            ease: "power1.inOut",
            onStart: () => {
              gsap.fromTo(
                "body",
                { x: 0 },
                {
                  x: 8,
                  duration: 0.06,
                  repeat: 17,
                  yoyo: true,
                  clearProps: "x",
                }
              );
            },
          }
        )
        .to(root, { opacity: 0, duration: 0.8, delay: 0.4 });
    } else {
      const t = setTimeout(() => setFlash(false), 2500);
      return () => clearTimeout(t);
    }
  }, [flash]);

  if (!flash) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[96] flex items-center justify-center bg-[#b3121f] p-6"
      aria-hidden="true"
    >
      <p className="wb-text text-center font-display text-[clamp(2rem,8vw,6rem)] leading-tight text-white uppercase">
        "The One Piece...
        <br />
        the One Piece is reaaal!"
      </p>
    </div>
  );
}

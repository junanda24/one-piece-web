import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Character dossier dialog. Dramatic entrance: backdrop fade + clip wipe
 * + staggered content. Esc / backdrop click to close. Scroll locked.
 */
export default function CrewDialog({ member, onClose }) {
  const rootRef = useRef(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const root = rootRef.current;
    if (root && !reduced) {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        root.querySelector(".dlg-backdrop"),
        { opacity: 0 },
        { opacity: 1, duration: 0.35 }
      )
        .fromTo(
          root.querySelector(".dlg-panel"),
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
          0.1
        )
        .fromTo(
          root.querySelectorAll(".dlg-stagger"),
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          0.45
        )
        .fromTo(
          root.querySelectorAll(".dlg-scene"),
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12 },
          0.7
        );
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, reduced]);

  if (!member) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} dossier`}
    >
      <div
        className="dlg-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="dlg-panel paper-grain relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden border-2 border-[#b3121f] bg-[#0c141c] text-[#f3ead2] sm:max-h-[86dvh]">
        {/* top bar */}
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-3">
          <p className="font-mono2 text-[10px] tracking-[0.35em] text-[#b3121f] uppercase">
            ☠ {member.faction ? "DOSSIER" : "PIRATE DOSSIER"} —{" "}
            {member.role || member.faction}
          </p>
          <button
            onClick={onClose}
            aria-label="Close dossier"
            className="border border-white/25 px-3 py-1.5 font-mono2 text-xs tracking-[0.2em] text-white/80 transition-colors duration-200 hover:border-[#b3121f] hover:text-[#b3121f]"
          >
            ✕ CLOSE
          </button>
        </div>

        <div className="grid overflow-y-auto md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* portrait */}
          <div className="dlg-stagger relative border-b border-white/15 md:border-r md:border-b-0">
            <img
              src={member.imgAlt || member.img}
              alt={member.name}
              className="h-64 w-full object-cover object-top sm:h-80 md:h-full md:min-h-[560px]"
            />
            <span className="absolute top-3 left-3 bg-[#b3121f] px-2 py-1 font-mono2 text-[10px] font-bold tracking-[0.2em] text-white">
              ฿{member.bounty}
            </span>
          </div>

          {/* content */}
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="dlg-stagger font-jp text-sm font-bold text-white/50">
              {member.jp}
            </p>
            <h3 className="dlg-stagger mt-1 font-display text-[clamp(1.8rem,5vw,3rem)] leading-none uppercase">
              {member.name}
            </h3>
            <p className="dlg-stagger mt-2 font-mono2 text-[11px] tracking-[0.25em] text-[#b3121f] uppercase">
              "{member.epithet}"
            </p>

            {/* motto */}
            {member.motto && (
              <blockquote className="dlg-stagger mt-6 border-l-4 border-[#b3121f] pl-4">
                <p className="font-jp text-base font-bold text-white/85">
                  「{member.motto}」
                </p>
                <p className="mt-2 font-display text-xl leading-snug text-[#f3ead2] italic sm:text-2xl">
                  "{member.mottoEn}"
                </p>
              </blockquote>
            )}

            {/* bio */}
            <p className="dlg-stagger mt-6 text-[15px] leading-relaxed text-white/75">
              {member.bio}
            </p>

            {/* dream callout */}
            {member.dream && (
              <div className="dlg-stagger mt-6 bg-[#b3121f] p-5">
                <p className="font-mono2 text-[10px] tracking-[0.35em] text-white/80 uppercase">
                  ☁ His dream
                </p>
                <p className="mt-2 font-display text-lg leading-snug text-white sm:text-xl">
                  {member.dream}
                </p>
              </div>
            )}

            {/* stats */}
            <dl className="dlg-stagger mt-6 grid grid-cols-2 gap-px bg-white/15 text-sm">
              {[
                [member.role ? "ROLE" : "FACTION", member.role || member.faction],
                ["BOUNTY", member.bounty === "—" ? "CLASSIFIED" : `฿${member.bounty}`],
                ...(member.fruit
                  ? [["DEVIL FRUIT", member.fruit]]
                  : []),
                ["EPITHET", `"${member.epithet}"`],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#0c141c] p-4">
                  <dt className="font-mono2 text-[10px] tracking-[0.3em] text-white/45 uppercase">
                    {k}
                  </dt>
                  <dd className="mt-1 font-bold break-words text-[#f3ead2]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            {/* iconic scenes */}
            {member.scenes && member.scenes.length > 0 && (
              <>
                <p className="dlg-stagger mt-8 font-mono2 text-[10px] tracking-[0.35em] text-[#b3121f] uppercase">
                  [ Iconic scenes ]
                </p>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {member.scenes.map((s) => (
                    <figure key={s.img} className="dlg-scene group">
                      <div className="overflow-hidden border border-white/20">
                        <img
                          src={s.img}
                          alt={s.cap}
                          loading="lazy"
                          className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                      <figcaption className="mt-2 font-mono2 text-[11px] leading-relaxed tracking-wide text-white/60 uppercase">
                        {s.cap}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}

            {member.id === "brook" && (
              <button
                onClick={() =>
                  document.dispatchEvent(new CustomEvent("open-sake"))
                }
                className="dlg-stagger mt-8 w-full border-2 border-[#b3121f] py-4 font-display text-lg tracking-wide text-[#f3ead2] uppercase transition-all duration-200 hover:bg-[#b3121f] hover:text-white active:translate-y-px"
              >
                ♪ Yohohoho — sing Bink's Sake
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

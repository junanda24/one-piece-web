import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Crew", href: "#crew" },
  { label: "Sagas", href: "#sagas" },
  { label: "Devil Fruits", href: "#fruits" },
  { label: "Ship", href: "#ship" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0c141c]/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="border-b border-white/10">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10"
        >
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center overflow-hidden bg-[#b3121f] p-1">
              <img
                src="/images/jolly-roger.png"
                alt="Straw Hat Pirates Jolly Roger"
                className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:rotate-[20deg]"
              />
            </span>
            <span className="font-display text-xl tracking-wide text-[#f3ead2]">
              STRAW&nbsp;HAT
              <span className="ml-2 hidden font-mono2 text-[10px] tracking-[0.25em] text-white/50 sm:inline">
                GRAND&nbsp;VOYAGE
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono2 text-[11px] tracking-[0.22em] text-white/70 uppercase transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#crew"
                className="bg-[#b3121f] px-5 py-2.5 font-mono2 text-[11px] tracking-[0.22em] text-white uppercase transition-colors hover:bg-[#7d0b14]"
              >
                Bounties
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-[#f3ead2] md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* mobile panel */}
      <div
        className={`grid overflow-hidden bg-[#0c141c] transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="border-b border-white/10 px-5 py-2">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-white/5 last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl tracking-wide text-[#f3ead2] uppercase"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

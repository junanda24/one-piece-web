export function Marquee({ items, fast = false, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee-skew overflow-hidden whitespace-nowrap will-change-transform ${className}`} aria-hidden="true">
      <div className={`inline-flex ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {row.map((item, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Word({ children, highlight = false }) {
  return (
    <span className="inline-block overflow-hidden pb-1 align-bottom">
      <span
        className={`quote-word inline-block will-change-transform ${
          highlight ? "bg-[#16100a] px-3 text-white" : ""
        }`}
      >
        {children}
      </span>
    </span>
  );
}

export default function Manifesto() {
  return (
    <section id="manifesto" className="bg-[#b3121f] text-white">
      <Marquee
        fast
        className="border-y-4 border-[#16100a] py-3"
        items={Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="font-mono2 text-xs font-bold tracking-[0.3em] uppercase">
            Kaizoku-ou ni ore wa naru <span className="mx-6">✦</span> 海賊王に俺はなる
          </span>
        ))}
      />
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="reveal font-mono2 text-[11px] tracking-[0.3em] uppercase opacity-80">
          [ The vow ]
        </p>
        <blockquote className="quote-block mt-6 max-w-5xl">
          <p className="font-display text-[clamp(2rem,6vw,5rem)] leading-[1.08] uppercase">
            <Word>"I'm</Word> <Word>gonna</Word> <Word>be</Word>{" "}
            <Word highlight>King&nbsp;of</Word>
            <br />
            <Word>the</Word> <Word>Pirates!"</Word>
          </p>
          <footer className="reveal mt-6 font-mono2 text-xs tracking-[0.25em] uppercase opacity-80">
            — Monkey D. Luffy, Chapter 1
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

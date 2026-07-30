import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const headlines = [
  {
    kicker: "BREAKING NEWS",
    title: "The City Wakes To Silence",
    body: "Power grids failed at 4:02 AM. Nobody can explain the twelve minutes that followed.",
  },
  {
    kicker: "CITY DESK",
    title: "A New Hero Emerges",
    body: "Witnesses describe a figure moving between rooftops, faster than the rain.",
  },
  {
    kicker: "SPECIAL REPORT",
    title: "The City Faces Its Greatest Challenge",
    body: "Officials refuse to name the threat. The evacuation maps say enough.",
  },
  {
    kicker: "LATE EDITION",
    title: "Mysterious Events Continue",
    body: "Six districts. Six blackouts. One symbol burned into every wall.",
  },
  {
    kicker: "FINAL EDITION",
    title: "Hope Returns",
    body: "For the first time in months, the morning came back on time.",
  },
];

export function Newspaper() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const paper = ".news-paper";

      gsap.fromTo(
        paper,
        { rotateY: -92, xPercent: -18, opacity: 0 },
        {
          rotateY: 0,
          xPercent: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "top 20%",
            scrub: 1,
          },
        },
      );

      const items = gsap.utils.toArray<HTMLElement>(".news-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 88%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative z-10 mx-auto w-full max-w-6xl px-5 py-32 md:py-48"
      style={{ perspective: "1600px" }}
      aria-label="Breaking news"
    >
      <p className="mb-6 text-center font-body text-xs tracking-[0.6em] text-primary uppercase">
        Scene 03 — The Headlines
      </p>
      <div
        className="news-paper relative origin-left rounded-sm p-6 md:p-12"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.9 0.03 85) 0%, oklch(0.85 0.035 82) 48%, oklch(0.88 0.03 84) 52%, oklch(0.82 0.04 80) 100%)",
          boxShadow: "var(--shadow-cine)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/25"
        />
        <header className="border-y-4 border-ink py-4 text-center text-ink">
          <h2 className="font-news text-4xl leading-none font-black tracking-tight md:text-6xl">
            THE CITY HERALD
          </h2>
          <p className="mt-2 font-body text-[11px] tracking-[0.4em] uppercase">
            Vol. XLII · No. 318 · Price 25¢ · The City Never Sleeps
          </p>
        </header>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {headlines.map((h, i) => (
            <article
              key={h.title}
              className={`news-item text-ink ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <span className="inline-block bg-primary px-2 py-0.5 font-body text-[10px] tracking-[0.35em] text-primary-foreground uppercase">
                {h.kicker}
              </span>
              <h3
                className={`mt-3 font-news font-black tracking-tight ${
                  i === 0 ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                }`}
              >
                {h.title}
              </h3>
              <p className="mt-2 max-w-prose font-body text-base leading-snug text-ink/75">
                {h.body}
              </p>
              <div className="mt-4 h-px w-full bg-ink/20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
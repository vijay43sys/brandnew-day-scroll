import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const events = [
  { time: "04:02 AM", title: "The Blackout", text: "Twelve minutes the city cannot account for." },
  { time: "DAY 3", title: "First Sighting", text: "A figure on the Kessler Bridge, gone by dawn." },
  { time: "DAY 19", title: "The Warning", text: "Every screen in the district shows the same mark." },
  { time: "DAY 44", title: "The Line Breaks", text: "Downtown is evacuated in ninety minutes." },
  { time: "DAY 60", title: "The Final Battle", text: "One rooftop. One choice. One brand new day." },
];

export function Timeline() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: ".tl-list", start: "top 70%", end: "bottom 80%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 ? 70 : -70 },
          {
            opacity: 1,
            x: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 88%", end: "top 55%", scrub: 1 },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 mx-auto max-w-5xl px-6 py-32">
      <p className="font-body text-xs tracking-[0.6em] text-primary uppercase">
        Scene 07 — The Road To The Battle
      </p>
      <h2 className="title-cine mt-4 text-5xl md:text-7xl">Sixty days</h2>

      <div className="tl-list relative mt-16 pl-10 md:pl-0">
        <div className="absolute top-0 bottom-0 left-3 w-px bg-border md:left-1/2" />
        <div
          className="tl-progress absolute top-0 bottom-0 left-3 w-px md:left-1/2"
          style={{ background: "var(--gradient-crimson)" }}
        />
        {events.map((e, i) => (
          <div
            key={e.title}
            className={`tl-item relative mb-16 md:w-1/2 ${
              i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
            }`}
          >
            <span
              className={`absolute top-2 -left-[1.85rem] h-3 w-3 rounded-full bg-primary md:left-auto ${
                i % 2 ? "md:-left-[0.4rem]" : "md:-right-[0.4rem]"
              }`}
              style={{ boxShadow: "0 0 20px var(--crimson-glow)" }}
            />
            <p className="font-body text-xs tracking-[0.45em] text-secondary uppercase">{e.time}</p>
            <h3 className="mt-2 text-3xl uppercase md:text-4xl">{e.title}</h3>
            <p className="mt-2 font-body text-lg text-foreground/70">{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
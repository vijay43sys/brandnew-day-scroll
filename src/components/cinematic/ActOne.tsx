import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useReveal } from "@/lib/useReveal";
import heroImg from "@/assets/hero.jpg";
import villainImg from "@/assets/villain.jpg";

const worldLines = [
  "The city changed the night the sky opened.",
  "Twelve minutes of darkness. No one agrees on what came through.",
  "Now the streets are full of sirens and silence.",
  "And hope is disappearing, block by block.",
];

export function ActOne() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Title reveal
      const title = new SplitType(".cine-title", { types: "chars" });
      gsap.from(title.chars, {
        opacity: 0,
        yPercent: 120,
        rotateX: -80,
        filter: "blur(12px)",
        stagger: 0.05,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.4,
      });
      gsap.from(".cine-tagline", {
        opacity: 0,
        y: 24,
        duration: 1.6,
        delay: 1.6,
        ease: "power2.out",
      });
      gsap.to(".scene-1", {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: ".scene-1", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".world-line").forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      });

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative z-10">
      {/* Scene 1 — Opening */}
      <section className="scene-1 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-xs tracking-[0.7em] text-muted-foreground uppercase">
          A Motion Picture Event
        </p>
        <h1 className="cine-title title-cine text-glow-red mt-6 text-[15vw] leading-[0.82] font-normal md:text-[11vw]">
          Brand New Day
        </h1>
        <p className="cine-tagline mt-8 max-w-xl font-body text-lg tracking-[0.25em] text-foreground/80 uppercase md:text-xl">
          Every ending is the beginning of something greater.
        </p>
        <div className="mt-16 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-body text-[10px] tracking-[0.5em] uppercase">Scroll to begin</span>
          <span className="h-16 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Scene 2 — The World */}
      <section className="mx-auto max-w-4xl px-6 py-[18vh]">
        <p className="mb-16 font-body text-xs tracking-[0.6em] text-secondary uppercase">
          Scene 02 — The World
        </p>
        {worldLines.map((line) => (
          <p
            key={line}
            className="world-line mb-[14vh] font-display text-3xl leading-tight text-balance uppercase md:text-6xl"
          >
            {line}
          </p>
        ))}
      </section>
    </div>
  );
}

/** Scene 4 & 5 — the hero and the threat, still over the film layer. */
export function ActOneTail() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-[16vh] md:grid-cols-2">
        <div className="reveal-block relative">
          <img
            src={heroImg}
            alt="A masked figure watching the city from a rooftop"
            loading="lazy"
            width={1280}
            height={1600}
            className="w-full rounded-sm object-cover"
            style={{ boxShadow: "var(--shadow-cool)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="reveal-block">
          <p className="font-body text-xs tracking-[0.6em] text-secondary uppercase">
            Scene 04 — The Hero
          </p>
          <h2 className="title-cine text-glow-blue mt-5 text-5xl leading-none md:text-7xl">
            Nobody knows
            <br />
            his name
          </h2>
          <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-foreground/75">
            He arrives after the sirens and leaves before the questions. The city has started
            leaving lights on for him — and he has started to believe that means something.
          </p>
          <p className="mt-6 font-body text-lg tracking-[0.2em] text-primary uppercase">
            "I was never supposed to be the one."
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-[16vh] md:grid-cols-2">
        <div className="reveal-block order-2 md:order-1">
          <p className="font-body text-xs tracking-[0.6em] text-primary uppercase">
            Scene 05 — The Threat
          </p>
          <h2 className="title-cine text-glow-red mt-5 text-5xl leading-none md:text-7xl">
            Something
            <br />
            came back
          </h2>
          <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-foreground/75">
            It doesn't announce itself. It doesn't need to. Every district it touches goes quiet in
            the same order — lights, radio, people. What's left behind is only a shape in the smoke.
          </p>
          <p className="mt-6 font-body text-lg tracking-[0.2em] text-secondary uppercase">
            The countdown already started.
          </p>
        </div>
        <div className="reveal-block relative order-1 md:order-2">
          <img
            src={villainImg}
            alt="A shadowed figure emerging from smoke"
            loading="lazy"
            width={1280}
            height={1600}
            className="w-full rounded-sm object-cover"
            style={{ boxShadow: "var(--shadow-cine)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </section>
    </div>
  );
}
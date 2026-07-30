import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import still5 from "@/assets/still-5.jpg";

export function Finale() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".finale-bg",
        { opacity: 0.15, scale: 1.2 },
        {
          opacity: 0.75,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
        },
      );
      gsap.fromTo(
        ".finale-quote",
        { opacity: 0, y: 60, filter: "blur(14px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".finale-quote", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".finale-logo",
        { opacity: 0, letterSpacing: "0.5em", scale: 1.1 },
        {
          opacity: 1,
          letterSpacing: "0.02em",
          scale: 1,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".finale-logo", start: "top 85%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <img
        src={still5}
        alt=""
        aria-hidden
        loading="lazy"
        width={1408}
        height={912}
        className="finale-bg absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background" />

      <div className="relative">
        <p className="font-body text-xs tracking-[0.6em] text-secondary uppercase">
          Scene 11 — The City Lights Return
        </p>
        <p className="finale-quote mx-auto mt-10 max-w-3xl font-display text-3xl leading-tight text-balance uppercase md:text-5xl">
          "The sun didn't come back for the city. The city came back for the sun."
        </p>
        <h2 className="finale-logo title-cine text-glow-blue mt-16 text-[14vw] leading-none md:text-[9vw]">
          Brand New Day
        </h2>
        <p className="mt-6 font-body text-sm tracking-[0.6em] text-foreground/80 uppercase">
          December 18, 2026
        </p>
      </div>
    </section>
  );
}
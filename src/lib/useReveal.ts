import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scoped clip-path reveal for any `.reveal-block` inside the returned ref. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 70, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 82%" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}
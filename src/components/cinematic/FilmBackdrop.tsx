import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import filmAsset from "@/assets/brand-new-day.mp4.asset.json";
import skyline from "@/assets/skyline.jpg";

/**
 * Fixed, full-bleed film layer. The uploaded film stays pinned to the viewport
 * and its playhead is scrubbed by scroll progress across "act one".
 */
export function FilmBackdrop({ scrubTargetId }: { scrubTargetId: string }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = video.current;
    const act = document.getElementById(scrubTargetId);
    if (!el || !act) return;

    const state = { time: 0 };
    let trigger: ScrollTrigger | undefined;

    const setup = () => {
      const duration = el.duration || 18.6;
      trigger = ScrollTrigger.create({
        trigger: act,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          state.time = self.progress * (duration - 0.05);
          if (el.readyState >= 2) el.currentTime = state.time;
        },
      });
      ScrollTrigger.refresh();
    };

    if (el.readyState >= 1) setup();
    else el.addEventListener("loadedmetadata", setup, { once: true });

    const ctx = gsap.context(() => {
      gsap.to(wrap.current, {
        opacity: 0,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: act,
          start: "bottom bottom-=40%",
          end: "bottom top+=20%",
          scrub: true,
        },
      });
    }, wrap);

    return () => {
      trigger?.kill();
      ctx.revert();
    };
  }, [scrubTargetId]);

  return (
    <div ref={wrap} aria-hidden className="fixed inset-0 z-0 overflow-hidden bg-background">
      <img
        src={skyline}
        alt=""
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <video
        ref={video}
        src={filmAsset.url}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-85 mix-blend-screen"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 20%, oklch(0.05 0.01 264 / 0.75) 75%), linear-gradient(180deg, oklch(0.05 0.01 264 / 0.7), oklch(0.05 0.01 264 / 0.35) 40%, oklch(0.05 0.01 264 / 0.85))",
        }}
      />
    </div>
  );
}
import { useRef, useState } from "react";
import { Play, X } from "lucide-react";
import filmAsset from "@/assets/brand-new-day.mp4.asset.json";
import still2 from "@/assets/still-2.jpg";
import { useReveal } from "@/lib/useReveal";

export function Trailer() {
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement | null>(null);

  const magnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${
      (e.clientY - r.top - r.height / 2) * 0.25
    }px)`;
  };

  return (
    <section ref={ref} id="trailer" className="relative z-10 mx-auto max-w-6xl px-6 py-32">
      <p className="font-body text-xs tracking-[0.6em] text-secondary uppercase">
        Scene 08 — Official Trailer
      </p>
      <h2 className="title-cine mt-4 text-5xl md:text-7xl">Watch the first look</h2>

      <div
        className="reveal-block relative mt-12 aspect-video w-full overflow-hidden rounded-xl"
        style={{ boxShadow: "var(--shadow-cool)" }}
      >
        <img
          src={still2}
          alt="Trailer poster frame"
          loading="lazy"
          width={1408}
          height={912}
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 grid place-items-center">
          <button
            ref={btn}
            onMouseMove={magnetic}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translate(0,0)")}
            onClick={() => setOpen(true)}
            aria-label="Play the Brand New Day trailer"
            className="group relative grid h-28 w-28 place-items-center rounded-full transition-transform duration-300 ease-out"
            style={{ background: "var(--gradient-crimson)" }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
            <Play className="relative h-10 w-10 translate-x-0.5 fill-current text-primary-foreground" />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-background to-transparent p-6">
          <span className="font-body text-sm tracking-[0.4em] uppercase">Brand New Day</span>
          <span className="font-body text-sm tracking-[0.4em] text-primary uppercase">
            Teaser · 0:18
          </span>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-4 backdrop-blur-xl"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Trailer player"
        >
          <button
            className="absolute top-6 right-6 rounded-full border border-border p-3 text-foreground/80 hover:text-foreground"
            aria-label="Close trailer"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            src={filmAsset.url}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] w-full max-w-5xl rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
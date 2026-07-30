import { useState } from "react";
import { X } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import still1 from "@/assets/still-1.jpg";
import still2 from "@/assets/still-2.jpg";
import still3 from "@/assets/still-3.jpg";
import still4 from "@/assets/still-4.jpg";
import still5 from "@/assets/still-5.jpg";
import heroImg from "@/assets/hero.jpg";

const stills = [
  { src: still1, alt: "Rain-soaked street after the incident", span: "md:col-span-2" },
  { src: still4, alt: "Subway tunnel bathed in red emergency light", span: "" },
  { src: heroImg, alt: "The masked figure above the city", span: "" },
  { src: still2, alt: "The rift above the intersection", span: "md:col-span-2" },
  { src: still3, alt: "Dawn over the fogged skyline", span: "" },
  { src: still5, alt: "Sunrise returning to the city streets", span: "md:col-span-2" },
];

export function Gallery() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section ref={ref} id="gallery" className="relative z-10 mx-auto max-w-6xl px-6 py-32">
      <p className="font-body text-xs tracking-[0.6em] text-primary uppercase">
        Scene 09 — The Gallery
      </p>
      <h2 className="title-cine mt-4 text-5xl md:text-7xl">Stills from the film</h2>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {stills.map((s, i) => (
          <button
            key={s.alt}
            onClick={() => setActive(i)}
            className={`reveal-block group relative overflow-hidden rounded-lg ${s.span}`}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              width={1408}
              height={912}
              className="h-64 w-full object-cover brightness-[0.75] transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent opacity-80 transition-opacity group-hover:opacity-40" />
            <span className="absolute bottom-4 left-4 text-left font-body text-xs tracking-[0.35em] uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-6 backdrop-blur-xl"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            className="absolute top-6 right-6 rounded-full border border-border p-3"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={stills[active].src}
            alt={stills[active].alt}
            className="max-h-[82vh] w-auto rounded-lg"
            style={{ boxShadow: "var(--shadow-cine)" }}
          />
          <p className="mt-4 font-body text-sm tracking-[0.35em] text-muted-foreground uppercase">
            {stills[active].alt}
          </p>
        </div>
      )}
    </section>
  );
}
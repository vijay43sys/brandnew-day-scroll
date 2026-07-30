import { useReveal } from "@/lib/useReveal";
import char1 from "@/assets/char-1.jpg";
import char2 from "@/assets/char-2.jpg";
import char3 from "@/assets/char-3.jpg";

const cast = [
  {
    img: char1,
    name: "Mara Vance",
    role: "The Witness",
    line: "She filmed the first twelve minutes. Now everyone wants the tape.",
  },
  {
    img: char2,
    name: "Det. Ray Okonjo",
    role: "The Badge",
    line: "Thirty years on this beat. Nothing in the manual covers this.",
  },
  {
    img: char3,
    name: "Dr. Elias Rook",
    role: "The Architect",
    line: "He opened the door. He never wrote down how to close it.",
  },
];

function Card({ item }: { item: (typeof cast)[number] }) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 16;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="reveal-block glass-panel group relative overflow-hidden rounded-xl transition-[transform,box-shadow] duration-300 ease-out hover:[box-shadow:var(--shadow-cine)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: "1px",
          background: "var(--gradient-crimson)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <img
        src={item.img}
        alt={item.name}
        loading="lazy"
        width={912}
        height={1200}
        className="h-[26rem] w-full object-cover grayscale-[0.5] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
        <p className="font-body text-[10px] tracking-[0.5em] text-primary uppercase">{item.role}</p>
        <h3 className="mt-1 text-2xl uppercase">{item.name}</h3>
        <p className="mt-2 max-h-0 overflow-hidden font-body text-base text-foreground/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
          {item.line}
        </p>
      </div>
    </div>
  );
}

export function Characters() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 py-32" id="cast">
      <p className="font-body text-xs tracking-[0.6em] text-secondary uppercase">
        Scene 06 — The Cast
      </p>
      <h2 className="title-cine mt-4 text-5xl md:text-7xl">Who's left standing</h2>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {cast.map((c) => (
          <Card key={c.name} item={c} />
        ))}
      </div>
    </section>
  );
}
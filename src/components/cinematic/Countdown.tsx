import { useEffect, useState } from "react";

export const RELEASE_DATE = new Date("2026-12-18T00:00:00Z");

function diff() {
  const ms = Math.max(0, RELEASE_DATE.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown() {
  const [t, setT] = useState(diff);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ] as const;

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
      <p className="font-body text-xs tracking-[0.6em] text-secondary uppercase">
        Scene 10 — The Countdown
      </p>
      <h2 className="title-cine text-glow-red mt-4 text-5xl md:text-7xl">In theatres in</h2>
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {units.map(([label, value]) => (
          <div key={label} className="glass-panel rounded-xl px-4 py-8">
            <div className="font-display text-5xl tabular-nums md:text-6xl">
              {mounted ? String(value).padStart(2, "0") : "--"}
            </div>
            <div className="mt-2 font-body text-[10px] tracking-[0.5em] text-muted-foreground uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 font-body text-sm tracking-[0.5em] text-muted-foreground uppercase">
        December 18, 2026 · Only in cinemas
      </p>
    </section>
  );
}
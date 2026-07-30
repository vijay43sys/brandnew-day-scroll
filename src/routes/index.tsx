import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { Atmosphere } from "@/components/cinematic/Atmosphere";
import { FilmBackdrop } from "@/components/cinematic/FilmBackdrop";
import { ActOne, ActOneTail } from "@/components/cinematic/ActOne";
import { Newspaper } from "@/components/cinematic/Newspaper";
import { Characters } from "@/components/cinematic/Characters";
import { Timeline } from "@/components/cinematic/Timeline";
import { Trailer } from "@/components/cinematic/Trailer";
import { Gallery } from "@/components/cinematic/Gallery";
import { Countdown } from "@/components/cinematic/Countdown";
import { Finale } from "@/components/cinematic/Finale";

const title = "Brand New Day — Official Interactive Movie Site";
const description =
  "Scroll through the story of Brand New Day: a city changed overnight, a masked hero, and the threat rising in the smoke. In cinemas December 18, 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "video.movie" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <main className="grain vignette relative bg-background text-foreground">
      <Atmosphere />
      <FilmBackdrop scrubTargetId="act-one" />

      <ActOne id="act-one" />
      <Newspaper />
      <ActOneTail />
      <Characters />
      <Timeline />
      <Trailer />
      <Gallery />
      <Countdown />
      <Finale />

      <footer className="relative z-10 border-t border-border px-6 py-14 text-center">
        <p className="font-body text-sm tracking-[0.4em] text-muted-foreground uppercase">
          Designed &amp; Developed by TECHICS
        </p>
        <p className="mt-3 font-body text-xs tracking-[0.3em] text-muted-foreground/70 uppercase">
          © 2026 TECHICS. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}

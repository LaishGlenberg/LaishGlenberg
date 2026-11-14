import { useEffect, useRef } from "react";
import ArrowIcon from "./ArrowIcon.jsx";

const PLACEMENTS = ["left", "right"];

// Distances from the viewport centre, as a fraction of half the viewport: the
// card starts fading at WINDOW and the GIF only plays once within ZONE.
const WINDOW = 0.5;
const ZONE = 0.25;
// Scroll-linked fades are as fast as the flick that caused them, so the demo
// also waits this long in the play zone before it starts playing.
const PLAY_DELAY = 300;

export default function Project({ project, index }) {
  const placement = PLACEMENTS[index % PLACEMENTS.length];
  const [width, height] = project.imageSize ?? [1200, 675];
  const frameRef = useRef(null);
  const stillRef = useRef(null);

  const animated = project.image.endsWith(".gif");
  // A GIF cannot be paused, so its first frame stands in for it and the GitHub
  // card fades off the top as the preview approaches the middle of the screen.
  const still = animated
    ? project.image.replace(/\.gif$/, ".poster.png")
    : project.image;

  useEffect(() => {
    const frame = frameRef.current;
    const img = stillRef.current;
    if (!animated || !frame || !img) return;

    // Preload both layers so the fade and the swap reveal pixels, not download.
    new Image().src = project.image;
    new Image().src = still;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let queued = 0;
    let timer = 0;
    let playing = false;

    const start = () => {
      timer = 0;
      img.src = project.image;
      playing = true;
    };

    const update = () => {
      queued = 0;
      const box = frame.getBoundingClientRect();
      const viewport = window.innerHeight;
      const offset =
        Math.abs(box.top + box.height / 2 - viewport / 2) / (viewport / 2);
      const progress = Math.min(
        1,
        Math.max(0, (WINDOW - offset) / (WINDOW - ZONE)),
      );

      frame.style.setProperty("--play", progress);

      if (progress === 1) {
        // Hold on the first frame, so a fast flick cannot start the demo in the
        // same gesture that brought the preview into view.
        if (!playing && !timer) timer = setTimeout(start, PLAY_DELAY);
      } else if (timer) {
        clearTimeout(timer);
        timer = 0;
      } else if (progress === 0 && playing) {
        // Reset under the card, where the jump back to frame 0 cannot be seen.
        img.src = still;
        playing = false;
      }
    };

    const schedule = () => {
      if (!queued) queued = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(queued);
      clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [animated, project.image, still]);

  return (
    <article className={`project project--${placement}`}>
      <div className="project__head" data-reveal>
        <h3 className="project__name">
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        <span className="project__kind">{project.kind}</span>
      </div>

      <a
        className="project__media"
        data-reveal
        style={{ "--reveal-delay": 80 }}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name} on GitHub`}
      >
        <span className="project__media-frame" ref={frameRef}>
          <img
            ref={stillRef}
            src={still}
            alt={`${project.name} repository preview`}
            // Pin the box to the GIF's ratio so the 16:9 card can't resize it.
            style={animated ? { aspectRatio: `${width} / ${height}` } : undefined}
            width={width}
            height={height}
            loading="lazy"
            className={project.imageFit === "contain" ? "is-contain" : undefined}
          />
          {animated && project.thumb && (
            <img
              className="project__media__card"
              src={project.thumb}
              alt=""
              aria-hidden="true"
              width="1200"
              height="675"
              loading="lazy"
            />
          )}
        </span>
      </a>

      <div
        className="project__copy"
        data-reveal
        style={{ "--reveal-delay": 140 }}
      >
        <div className="project__text">
          <p className="project__description">{project.description}</p>
          <p className="project__note">{project.note}</p>
        </div>
        <div className="project__foot">
          <ul className="project__stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            className="text-link"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

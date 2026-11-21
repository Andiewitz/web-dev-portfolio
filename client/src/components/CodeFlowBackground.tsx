import { useId, useLayoutEffect, useRef } from "react";

const VIEW_W = 1048;
const VIEW_H = 200;

/**
 * The Aceternity "Wispr Flow" curve, compressed vertically so it stays in the
 * lower band of the hero and never crosses the headline, the CTAs or the intro.
 */
const FLOW_PATH =
  "M0.6 40C17.5 61.5 97.9 96.4 284.5 110.5C440.8 121.1 583.8 96.7 500.6 71.2C417.4 45.7 238.2 93.9 499.3 131C551.9 139.4 817.5 158.8 1046.4 159.8";

const CODE_UNIT =
  "const portfolio = await build({ canvas: '#F4EEE3', ink: '#151412', accent: '#1D4ED8', type: 'Fraunces' }); if (!portfolio.ready) return null; export default function Hero() { return <main className='canvas'>{sections.map((section) => <Scene key={section.id} {...section} />)}</main>; } // ship small, measure, iterate. ";

/** Three repeats: enough to cover the loop offset plus the whole path. */
const REPEATS = 3;
const FLOW_TEXT = CODE_UNIT.repeat(REPEATS);
/** How long the line takes to draw itself in from the left. */
const INTRO_MS = 1600;
/** Seconds per repeat once the loop is running. */
const LOOP_SECONDS = 26;

export default function CodeFlowBackground({
  className,
}: {
  className?: string;
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const pathId = `flow-path-${uid}`;
  const clipId = `flow-clip-${uid}`;

  const pathRef = useRef<SVGPathElement>(null);
  const unitRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    const unit = unitRef.current;
    const textPath = textPathRef.current;
    const clipRect = clipRectRef.current;
    if (!path || !unit || !textPath || !clipRect) return;

    const pathLength = path.getTotalLength();
    let unitLength = unit.getComputedTextLength();
    const remeasure = () => {
      const measured = unit.getComputedTextLength();
      if (measured > 0) unitLength = measured;
    };
    if (document.fonts) {
      document.fonts.ready.then(remeasure).catch(() => {});
    }

    // Draw the line in from the left before the loop takes over.
    path.setAttribute("stroke-dasharray", `${pathLength} ${pathLength}`);
    path.setAttribute("stroke-dashoffset", `${pathLength}`);
    clipRect.setAttribute("width", "0");

    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const elapsed = now - started;
      const intro = Math.min(1, elapsed / INTRO_MS);

      path.setAttribute("stroke-dashoffset", (pathLength * (1 - intro)).toFixed(2));
      clipRect.setAttribute("width", (VIEW_W * intro).toFixed(2));

      // One repeat per LOOP_SECONDS, wrapped so the marquee never stops.
      if (unitLength > 0) {
        const speed = unitLength / (LOOP_SECONDS * 1000);
        textPath.setAttribute("startOffset", ((elapsed * speed) % unitLength).toFixed(2));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect ref={clipRectRef} x="0" y="0" width="0" height={VIEW_H} />
          </clipPath>
        </defs>

        <path
          ref={pathRef}
          id={pathId}
          fill="transparent"
          stroke="rgba(21, 20, 18, 0.18)"
          strokeWidth={1}
          d={FLOW_PATH}
        />

        {/* Measured only, never painted: one repeat of the code, for the loop period. */}
        <text
          ref={unitRef}
          className="flow-text"
          xmlSpace="preserve"
          style={{ visibility: "hidden" }}
        >
          {CODE_UNIT}
        </text>

        <g clipPath={`url(#${clipId})`}>
          <text className="flow-text" xmlSpace="preserve">
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0">
              {FLOW_TEXT}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
}

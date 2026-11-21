import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

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

const REPEATS = 3;
const FLOW_TEXT = CODE_UNIT.repeat(REPEATS);
/** Seconds for the code to travel exactly one repeat, so the loop is seamless. */
const FLOW_DURATION = 26;

export default function CodeFlowBackground({
  className,
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();
  const rawId = useId();
  const pathId = `flow-path-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const textRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [period, setPeriod] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const total = textRef.current?.getComputedTextLength() ?? 0;
      if (total > 0) setPeriod(total / REPEATS);
    };
    measure();
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(measure).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const el = textPathRef.current;
    if (!el || reduced) return;
    if (period <= 0) {
      el.setAttribute("startOffset", "0");
      return;
    }

    let frame = 0;
    const started = performance.now();
    const speed = period / (FLOW_DURATION * 1000);

    const tick = (now: number) => {
      const offset = ((now - started) * speed) % period;
      el.setAttribute("startOffset", offset.toFixed(2));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [period, reduced]);

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <path
          id={pathId}
          fill="transparent"
          stroke="rgba(21, 20, 18, 0.18)"
          strokeWidth={1}
          d={FLOW_PATH}
        />

        <text ref={textRef} x="0" xmlSpace="preserve" className="flow-text">
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0">
            {FLOW_TEXT}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

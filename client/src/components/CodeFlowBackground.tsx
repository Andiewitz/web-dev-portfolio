import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

const VIEW_W = 1048;
const VIEW_H = 200;

/**
 * The Aceternity "Wispr Flow" curve, compressed vertically so it stays in the
 * lower band of the hero and never crosses the headline, the CTAs or the intro.
 */
const FLOW_PATH =
  "M0.6 40C17.5 61.5 97.9 96.4 284.5 110.5C440.8 121.1 583.8 96.7 500.6 71.2C417.4 45.7 238.2 93.9 499.3 131C551.9 139.4 817.5 158.8 1046.4 159.8";

const FLOW_TEXT =
  "const portfolio = await build({ canvas: '#F4EEE3', ink: '#151412', accent: '#1D4ED8', type: 'Fraunces' }); if (!portfolio.ready) return null; export default function Hero() { return <main className='canvas'>{sections.map((section) => <Scene key={section.id} {...section} />)}</main>; } // ship small, measure, iterate. ";

export default function CodeFlowBackground({
  className,
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();
  const rawId = useId();
  const pathId = `flow-path-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <motion.path
          id={pathId}
          fill="transparent"
          stroke="rgba(21, 20, 18, 0.14)"
          strokeWidth={1}
          d={FLOW_PATH}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.23, 1, 0.32, 1] }}
        />

        <motion.g
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 1.6, duration: 1.2, ease: "easeOut" }}
        >
          <text x="0" className="flow-text">
            <textPath href={`#${pathId}`}>{FLOW_TEXT.repeat(2)}</textPath>
            {!reduced && (
              <animate
                attributeName="x"
                dur="38s"
                values="-2000;0"
                repeatCount="indefinite"
              />
            )}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

/**
 * VisionFX design reminder: reference-driven editorial placement with original VisionFX content.
 * Begin with a cream two-column argument and a single dark slab; use imagery only in later supporting sections.
 */
import { Fragment, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import CodeFlowBackground from "@/components/CodeFlowBackground";
import kemetImg from "@/assets/Kemet.webp";
import furnwayImg from "@/assets/Furnway.webp";
import forkfastImg from "@/assets/Forkfast.webp";
import hearthLoomImg from "@/assets/Hearth and Loom.webp";
import portraitImg from "@/assets/Torn Paper Halftone Portrait.webp";

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

type Project = {
  title: string;
  titleFont: string;
  description: string;
  outcome: string;
  cta: string;
  /** Left out until the site has a public URL; the card and caption drop the link when it is missing. */
  href?: string;
  date: string;
  category: string;
  buttonLabel: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Kemet",
    titleFont: "'Bricolage Grotesque', system-ui, sans-serif",
    description: "A tour operator selling Egypt trips needed the landscape to carry the page and the booking to stay in reach. Full-bleed photography, clear tour routes, and one Book now button start the enquiry.",
    outcome: "More tour enquiries",
    cta: "View live site",
    date: "2026",
    category: "Travel Website",
    buttonLabel: "View project",
    image: kemetImg,
  },
  {
    title: "Furnway",
    titleFont: "'Geomini', system-ui, sans-serif",
    description: "A product analytics tool needed to explain account risk without a sales call. The page names the problem first, then shows the live workspace, so the product can be judged before signing up.",
    outcome: "More signups from the page",
    cta: "View live site",
    date: "2026",
    category: "SaaS Product Site",
    buttonLabel: "View project",
    image: furnwayImg,
  },
  {
    title: "Forkfast",
    titleFont: "'Bricolage Grotesque', system-ui, sans-serif",
    description: "A burger delivery brand needed appetite to survive the screen. Product photography at full size, ratings beside the hero, and a one-step order button keep the path to checkout short.",
    outcome: "More direct orders",
    cta: "View live site",
    date: "2026",
    category: "Food Ordering",
    buttonLabel: "View project",
    image: forkfastImg,
  },
  {
    title: "Hearth & Loom",
    titleFont: "'Lora', Georgia, serif",
    description: "An interior studio needed a portfolio that felt like its rooms. Large photography, a warm quiet palette, and a short route to the studio make the work easy to trust and to enquire about.",
    outcome: "Stronger project enquiries",
    cta: "View live site",
    date: "2026",
    category: "Studio Website",
    buttonLabel: "View project",
    image: hearthLoomImg,
  },
];

const easeOut = [0.23, 1, 0.32, 1] as const;

const charContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.008, delayChildren: 0.08 },
  },
};

const charItem = {
  hidden: { opacity: 0, y: "0.72em", rotate: 2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.22, ease: easeOut } },
};

const lineContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

const lineItem = {
  hidden: { opacity: 0, y: "0.3em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
};

/** The hero side copy sweeps in from the left as the headline finishes typing. */
const heroSideReveal: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 1.42, staggerChildren: 0.12 } },
};

const heroSideLine: Variants = {
  hidden: { opacity: 0, x: -44 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeOut } },
};

/** Parent that hands the entrance of its children to the variants below. */
const groupStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

const principleIn: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 190, damping: 22, mass: 0.9 } },
};

/** Section action rows land like the hero's: a spring per button, one after another. */
const sectionActionsIn: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.12, staggerChildren: 0.08 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 19, mass: 0.9 },
  },
};

const footerColIn: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

/** The two hero CTAs drop in a beat after the headline finishes typing. */
const actionsIn: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 1.82, staggerChildren: 0.08 } },
};

const buttonIn: Variants = {
  hidden: { opacity: 0, scale: 0.55, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 460, damping: 15, mass: 0.7 },
  },
};

/** Navbar entrance: brand, links and CTA arrive in sequence from the top edge. */
const navStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.34 } },
};

const navLinkIn: Variants = {
  hidden: { opacity: 0, y: -16, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: easeOut },
  },
};

const brandIn: Variants = {
  hidden: { opacity: 0, y: -18, rotate: -6 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.85, ease: easeOut, delay: 0.06 } },
};

const ctaIn: Variants = {
  hidden: { opacity: 0, scale: 0.78, y: -12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 21, mass: 0.8, delay: 0.58 },
  },
};

const mobilePanelIn = {
  initial: { clipPath: "inset(0% 0% 100% 0%)" },
  animate: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.46, ease: easeOut } },
  exit: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.28, ease: easeOut } },
};

const mobileLinkIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easeOut } },
};

function useResponsiveVariant() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

function useNavbarTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    const sections: { id: string; theme: 'dark' | 'light' }[] = [
      { id: 'top', theme: 'dark' },
      { id: 'slab-region', theme: 'light' },
      { id: 'approach', theme: 'dark' },
      { id: 'projects', theme: 'light' },
      { id: 'contact', theme: 'dark' },
      { id: 'footer', theme: 'light' },
    ];
    const probe = 37;
    let frame = 0;
    const update = () => {
      frame = 0;
      let active: 'dark' | 'light' = 'dark';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe) {
          active = section.theme;
        }
      }
      setTheme(active);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return theme;
}

function CharacterText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span className={className} aria-hidden="true" variants={charContainer} initial="hidden" animate="show">
      {Array.from(text).map((character, index) => (
        <motion.span variants={charItem} key={`${character}-${index}`} style={{ display: "inline-block" }}>
          {character}
        </motion.span>
      ))}
    </motion.span>
  );
}

function MotionTitle({ text, as: Tag = "h3" }: { text: string; as?: "h2" | "h3" }) {
  return <Tag aria-label={text}><CharacterText text={text} /></Tag>;
}

/**
 * Section headline that builds character by character when it enters, the same way the
 * hero types. Spaces stay plain text nodes so the headline still wraps normally.
 */
function RevealTitle({ text, id, reducedMotion }: { text: string; id?: string; reducedMotion: boolean }) {
  return (
    <h2 id={id} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        variants={charContainer}
      >
        {text.split(" ").map((word, wordIndex, words) => (
          <Fragment key={`${wordIndex}-${word}`}>
            {/* Nowrap per word: inline-block characters would otherwise break mid-word. */}
            <span className="reveal-title__word">
              {Array.from(word).map((character, characterIndex) => (
                <motion.span className="motion-char" key={`${characterIndex}-${character}`} variants={charItem}>
                  {character}
                </motion.span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </h2>
  );
}

function RevealGroup({
  children,
  className,
  reducedMotion,
  variants,
}: {
  children: ReactNode;
  className?: string;
  reducedMotion: boolean;
  variants: Variants;
}) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function TypeChar({
  char,
  index,
  count,
}: {
  char: string;
  index: number;
  count: MotionValue<number>;
}) {
  const opacity = useTransform(count, [index, index + 0.35], [0, 1]);
  return (
    <motion.span data-type-char style={{ opacity, display: "inline", whiteSpace: "pre" }}>
      {char}
    </motion.span>
  );
}

/** Types a line of text out one character at a time, keeping emphasis runs intact. */
function TypewriterLine({
  segments,
  startDelay,
  charDuration,
  reducedMotion,
}: {
  segments: { text: string; em?: boolean }[];
  startDelay: number;
  charDuration: number;
  reducedMotion: boolean;
}) {
  const total = segments.reduce((n, segment) => n + Array.from(segment.text).length, 0);
  const count = useMotionValue(reducedMotion ? total : 0);
  const lineRef = useRef<HTMLSpanElement>(null);
  // Right edge of every character, so one caret can follow the typing head without
  // living inside the text (that would break copying and text selection).
  const [caretPositions, setCaretPositions] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (reducedMotion) {
      count.set(total);
      return;
    }
    // Driven by hand so the typing always runs at the intended pace.
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const typed = (Math.max(0, now - started) - startDelay * 1000) / (charDuration * 1000);
      const progress = Math.min(1, Math.max(0, typed / total));
      count.set(progress * total);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [charDuration, count, reducedMotion, startDelay, total]);

  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const measure = () => {
      const left = line.getBoundingClientRect().left;
      const edges = Array.from(line.querySelectorAll("[data-type-char]")).map(
        (character) => character.getBoundingClientRect().right - left,
      );
      setCaretPositions([0, ...edges]);
    };
    measure();
    const frame = window.requestAnimationFrame(measure);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    }).catch(() => {});
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const caretX = useTransform(
    count,
    caretPositions.map((_, positionIndex) => positionIndex),
    caretPositions,
  );
  const caretOpacity = useTransform(count, [0, 0.25, total - 0.4, total], [0, 1, 1, 0]);

  let index = 0;
  return (
    <span className="type-line" ref={lineRef}>
      {segments.map((segment, segmentIndex) => {
        const chars = Array.from(segment.text);
        const nodes = chars.map((char, charIndex) => (
          <TypeChar
            key={`${segmentIndex}-${charIndex}`}
            char={char}
            index={index + charIndex}
            count={count}
          />
        ));
        index += chars.length;
        return segment.em ? <em key={segmentIndex}>{nodes}</em> : <span key={segmentIndex}>{nodes}</span>;
      })}
      <motion.span className="type-caret" style={{ x: caretX, opacity: caretOpacity }} aria-hidden="true">
        <span className="type-caret__blink" />
      </motion.span>
    </span>
  );
}

/**
 * Size of the work column. `drag` multiplies the scroll runway without changing the
 * layout, so one card takes ~118svh of page scroll instead of a single screen.
 */
const WORK_DESKTOP = { card: 50, gap: 8, drag: 1.95 };

/**
 * Hero parallax in px over the hero's own scroll range. Only the copy — the headline and
 * the action buttons — travels; the portrait and the code line stay put. `fadeStart` is the
 * progress where the copy begins to leave, before the slab edge reaches it.
 */
const HERO_PARALLAX = { copy: 84, fadeStart: 0.45 };

/** The three beats of working together, shown beside the closing call to action. */
const closingSteps = [
  {
    title: "You send the email",
    body: "What the site is now, and what it should be doing.",
  },
  {
    title: "I reply with a plan",
    body: "Where it loses people, and the first change I'd make.",
  },
  {
    title: "We start on the first fix",
    body: "A short first job, measured by enquiries rather than visits.",
  },
];

/** Blurred, over-scaled copy of a screenshot that fills the stage behind the column. */
function WorkBackdrop({
  project,
  order,
  index,
  reducedMotion,
}: {
  project: Project;
  order: number;
  index: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const distance = useTransform(index, (value) => Math.abs(value - order));
  const opacity = useTransform(distance, [0, 1.15], [1, 0]);
  const drift = useTransform(index, (value) => (value - order) * -40);
  const scale = useTransform(distance, (value) => 1.14 - Math.min(value, 1) * 0.08);

  return (
    <motion.div
      className="work-backdrop"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${project.image})`,
        opacity,
        y: reducedMotion ? undefined : drift,
        scale: reducedMotion ? undefined : scale,
      }}
    />
  );
}

/** One card in the column. It grows as it nears the viewport centre and settles again as it leaves. */
function WorkCard({
  project,
  order,
  index,
  cardHeight,
  reducedMotion,
}: {
  project: Project;
  order: number;
  index: MotionValue<number>;
  cardHeight: number;
  reducedMotion: boolean;
}) {
  const distance = useTransform(index, (value) => Math.abs(value - order));
  const scale = useTransform(distance, (value) => 1.1 - Math.min(value, 1) * 0.4);
  const opacity = useTransform(distance, (value) => 1 - Math.min(value, 1) * 0.5);

  return (
    <motion.a
      className="work-card"
      href={project.href}
      {...(project.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        height: `${cardHeight}svh`,
        scale: reducedMotion ? undefined : scale,
        opacity: reducedMotion ? undefined : opacity,
      }}
    >
      <img src={project.image} alt={`${project.title} — ${project.category}`} loading="lazy" />
      <span className="work-card__label" style={{ fontFamily: project.titleFont }}>
        {project.title}
      </span>
    </motion.a>
  );
}

/**
 * Vertical column of cards inside a sticky stage. Scrolling slides the column past the
 * viewport centre, where the nearest card is expanded; the backdrop crossfades over a
 * full card step so the background turns slowly rather than snapping.
 */
function WorkShowcase({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  // Phones get the plain stacked list: the pinned stage needs a full-screen viewport and
  // leaves the captions fighting the card for room. Choosing here keeps the stage's scroll
  // hooks out of the tree when it is not rendered.
  if (reducedMotion || isMobile) return <WorkStatic />;
  return <WorkStage reducedMotion={reducedMotion} />;
}

function WorkStatic() {
  return (
    <div className="work-static">
      {projects.map((project) => (
        <figure className="work-static__item" key={project.title}>
          <img src={project.image} alt={`${project.title} — ${project.category}`} loading="lazy" />
          <figcaption>
            <span>{project.category} · {project.date}</span>
            <strong style={{ fontFamily: project.titleFont }}>{project.title}</strong>
            {project.href && (
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                {project.cta} <span aria-hidden="true">→</span>
              </a>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function WorkStage({ reducedMotion }: { reducedMotion: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const metrics = WORK_DESKTOP;
  const step = metrics.card + metrics.gap;
  const index = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]);
  const trackY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0svh", `-${(projects.length - 1) * step}svh`],
  );
  const [active, setActive] = useState(0);

  useMotionValueEvent(index, "change", (value) => {
    const next = Math.min(projects.length - 1, Math.max(0, Math.round(value)));
    setActive((current) => (current === next ? current : next));
  });

  const runway = (projects.length - 1) * step * metrics.drag;
  const activeProject = projects[active];

  return (
    <div ref={stageRef} className="work-stage" style={{ height: `calc(${runway}svh + 100svh)` }}>
      <div className="work-sticky">
        {projects.map((project, order) => (
          <WorkBackdrop
            key={project.title}
            project={project}
            order={order}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
        <div className="work-scrim" aria-hidden="true" />
        <motion.div
          className="work-track"
          style={{
            gap: `${metrics.gap}svh`,
            paddingBlock: `calc(50svh - ${metrics.card / 2}svh)`,
            y: trackY,
          }}
        >
          {projects.map((project, order) => (
            <WorkCard
              key={project.title}
              project={project}
              order={order}
              index={index}
              cardHeight={metrics.card}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>
        <div className="work-info">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProject.title}
              className="work-info__inner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.28, ease: easeOut } }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <div className="work-info__title">
                <p className="work-info__eyebrow">
                  {activeProject.category} · {activeProject.date}
                </p>
                <h3 style={{ fontFamily: activeProject.titleFont }}>{activeProject.title}</h3>
              </div>
              <div className="work-info__aside">
                <p className="work-info__outcome">{activeProject.outcome}</p>
                <p className="work-info__desc">{activeProject.description}</p>
                {activeProject.href && (
                  <a className="work-info__cta" href={activeProject.href} target="_blank" rel="noopener noreferrer">
                    {activeProject.cta} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="work-counter" aria-hidden="true">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <span className="work-counter__total">/ {String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const slabRegionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useResponsiveVariant();
  const navTheme = useNavbarTheme();

  // The range covers the whole sticky run: it starts as the slab rises into view and ends
  // only when the stage unpins, so extra region height buys scroll time for every beat.
  const { scrollYProgress } = useScroll({
    target: slabRegionRef,
    offset: ["start end", "end end"],
  });

  // The hero runs from page load to the moment the slab region pins, so every layer
  // starts at its resting value and only moves once the user scrolls.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, -HERO_PARALLAX.copy]);
  // Even ease-out from `fadeStart` to 0: the copy has already left the viewport by then,
  // so the ramp only has to stay continuous rather than drop in one fast step.
  const heroCopyOpacity = useTransform(
    heroProgress,
    [0, HERO_PARALLAX.fadeStart, 0.59, 0.73, 0.86, 1],
    [1, 1, 0.84, 0.5, 0.16, 0],
  );
  const heroParallaxOff = reducedMotion || isMobile;

  // Everything reveals in the first half of the pin and then holds, so the rest of the
  // scroll is settled time with the statement in place rather than a slow build.
  const slabScaleX = useTransform(scrollYProgress, [0, 0.12, 0.26, 1], [0.86, 0.95, 1, 1]);
  const headlineOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.02, 0.1], [48, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.08, 0.17], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.08, 0.17], [24, 0]);
  const slabStill = reducedMotion || isMobile;

  // Each question waits its turn, then branches out from the statement as it fades in.
  const slabFloat = (start: number, x: number, y: number) => ({
    opacity: useTransform(scrollYProgress, [start, start + 0.05], [0, 1]),
    x: useTransform(scrollYProgress, [start, start + 0.11], [0, x]),
    y: useTransform(scrollYProgress, [start, start + 0.11], [0, y]),
  });
  const q1 = slabFloat(0.22, -30, -14);
  const q2 = slabFloat(0.255, 30, -10);
  const q3 = slabFloat(0.29, -38, 8);
  const q4 = slabFloat(0.325, 38, 10);
  const q5 = slabFloat(0.36, -24, 16);
  const q6 = slabFloat(0.395, 24, 18);

  // Sections past the hero drift against the scroll the way the hero copy does, at a
  // quarter of the distance so it reads as depth rather than decoration.
  const { scrollYProgress: approachScroll } = useScroll({
    target: approachRef,
    offset: ["start end", "end start"],
  });
  const approachDrift = useTransform(approachScroll, [0, 1], [30, -30]);
  const { scrollYProgress: closingScroll } = useScroll({
    target: closingRef,
    offset: ["start end", "end start"],
  });
  const closingDrift = useTransform(closingScroll, [0, 1], [26, -26]);

  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header" data-theme={navTheme} data-scrolled={scrolled ? "true" : "false"}>
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="site-header__inner">
          <motion.a
            href="#top"
            className="brand-link"
            aria-label="Andrei home"
            onClick={closeNav}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={brandIn}
            whileHover={reducedMotion ? undefined : { y: -1 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <Wordmark />
          </motion.a>
          <motion.nav
            className="desktop-nav"
            aria-label="Primary navigation"
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={navStagger}
          >
            {navItems.map((item) => (
              <motion.a key={item.href} href={item.href} variants={navLinkIn}>
                <span>{item.label}</span>
              </motion.a>
            ))}
          </motion.nav>
          <motion.a
            href="mailto:hello@visionfx.studio"
            className="header-cta"
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={ctaIn}
            whileHover={reducedMotion ? undefined : { scale: 1.04 }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            Start a conversation
          </motion.a>
          <motion.button
            type="button"
            className="menu-toggle"
            onClick={() => setNavOpen((open) => !open)}
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.4 }}
            whileTap={reducedMotion ? undefined : { scale: 0.9, rotate: -8 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={navOpen ? "close" : "open"}
                initial={reducedMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.22, ease: easeOut }}
                style={{ display: "inline-flex" }}
              >
                {navOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div
              id="mobile-navigation"
              className="mobile-nav mobile-nav--open"
              initial={reducedMotion ? false : mobilePanelIn.initial}
              animate={mobilePanelIn.animate}
              exit={mobilePanelIn.exit}
            >
              <motion.nav
                aria-label="Mobile navigation"
                initial={reducedMotion ? false : "hidden"}
                animate="show"
                variants={{ hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.06 } } }}
              >
                {navItems.map((item) => (
                  <motion.a key={item.href} href={item.href} onClick={closeNav} variants={mobileLinkIn}>
                    {item.label}
                  </motion.a>
                ))}
                <motion.a href="mailto:hello@visionfx.studio" onClick={closeNav} variants={mobileLinkIn}>
                  Start a conversation
                </motion.a>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <section ref={heroRef} id="top" className="hero-section">
          <CodeFlowBackground className="hero-flow" />
          <motion.div
            className="content-frame opening-grid"
            style={heroParallaxOff ? undefined : { y: heroCopyY, opacity: heroCopyOpacity }}
          >
            <div>
              <h1 aria-label="Hello, I'm Andrei. A Web Developer.">
                <span className="hero-line" aria-hidden="true">
                  <TypewriterLine
                    segments={[{ text: "Hello, I'm Andrei." }]}
                    startDelay={0.18}
                    charDuration={0.048}
                    reducedMotion={!!reducedMotion}
                  />
                </span><br />
                <span className="hero-line hero-line--design" aria-hidden="true">
                  <TypewriterLine
                    segments={[{ text: "A " }, { text: "Web Developer.", em: true }]}
                    startDelay={1.15}
                    charDuration={0.055}
                    reducedMotion={!!reducedMotion}
                  />
                </span>
              </h1>
              <motion.div
                className="hero-actions"
                initial={reducedMotion ? false : "hidden"}
                animate="show"
                variants={actionsIn}
              >
                <motion.a
                  className="hero-action hero-action--primary"
                  href="mailto:hello@visionfx.studio"
                  variants={buttonIn}
                >Start a conversation</motion.a>
                <motion.a
                  className="hero-action hero-action--secondary"
                  href="#projects"
                  variants={buttonIn}
                >See projects</motion.a>
              </motion.div>
            </div>
            <motion.div
              className="opening-side"
              initial={reducedMotion ? false : "hidden"}
              animate="show"
              variants={heroSideReveal}
            >
              <motion.p className="opening-statement" variants={heroSideLine}>
                Fast, accessible sites that make a good first impression in seconds, then turn that visit into an enquiry, a booking or a sale.
              </motion.p>
              <motion.p className="opening-proof" variants={heroSideLine}>
                Full-Stack Web Dev · UI Engineering · Open to work
              </motion.p>
            </motion.div>
          </motion.div>
          <figure className="hero-portrait">
            {/* Clipped at the hero's bottom edge: the portrait is fully hidden behind the
                slab below, then slides straight up out of it — no fade. */}
            <motion.div
              className="hero-portrait__reveal"
              initial={reducedMotion ? false : { y: "104%" }}
              animate={{ y: "0%" }}
              transition={
                reducedMotion
                  ? undefined
                  : { type: "spring", stiffness: 92, damping: 19, mass: 1.05, delay: 0.95 }
              }
            >
              <img src={portraitImg} alt="Halftone portrait of Andrei on torn paper" loading="eager" />
            </motion.div>
          </figure>
        </section>

        <section ref={slabRegionRef} id="slab-region" className="hero-slab-scroll-region" aria-label="A website should earn its keep, not just look good">
          <div className="hero-slab-stage">
            <motion.div
              className="hero-slab"
              style={slabStill ? undefined : { scaleX: slabScaleX }}
            >
              <div className="hero-slab__inner">
                <div className="questions-statement">
                  <motion.h2
                    className="questions-headline"
                    style={slabStill ? undefined : { opacity: headlineOpacity, y: headlineY }}
                  >
                    A website should earn its keep. Not just look good.
                  </motion.h2>
                  <motion.p
                    className="questions-sub"
                    style={slabStill ? undefined : { opacity: subOpacity, y: subY }}
                  >
                    Every screen is a salesperson. I design the path from first impression to enquiry, remove the friction that loses customers, and treat speed as a business metric — more qualified leads, fewer abandoned visits, and a site your team can run without calling a developer.
                  </motion.p>
                </div>
              </div>
            </motion.div>
            <motion.span className="float-q float-q--1" style={slabStill ? undefined : q1}>where are visitors dropping off?</motion.span>
            <motion.span className="float-q float-q--2" style={slabStill ? undefined : q2}>does this page turn interest into enquiries?</motion.span>
            <motion.span className="float-q float-q--3" style={slabStill ? undefined : q3}>how fast does it load on a phone?</motion.span>
            <motion.span className="float-q float-q--4" style={slabStill ? undefined : q4}>can customers find what they need in three clicks?</motion.span>
            <motion.span className="float-q float-q--5" style={slabStill ? undefined : q5}>what is a slow site costing you in lost sales?</motion.span>
            <motion.span className="float-q float-q--6" style={slabStill ? undefined : q6}>can your team update it without a developer?</motion.span>
          </div>
        </section>

        <section ref={approachRef} id="approach" className="approach-section">
          <div className="content-frame approach-layout">
            <motion.div
              className="approach-heading"
              style={reducedMotion || isMobile ? undefined : { y: approachDrift }}
            >
              <RevealTitle
                text="Most websites don't have a traffic problem. They have a conversion problem."
                reducedMotion={!!reducedMotion}
              />
              <motion.p
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={heroSideLine}
              >
                I find where visitors hesitate, remove the friction, and build the shortest path to the action that matters — a call, a booking, or a quote request.
              </motion.p>
            </motion.div>
            <RevealGroup className="principle-list" reducedMotion={!!reducedMotion} variants={groupStagger}>
              <motion.div className="principle" variants={principleIn}>
                <h3>Find the leak</h3>
                <p>Where visitors drop off, and what stops them from acting.</p>
              </motion.div>
              <motion.div className="principle" variants={principleIn}>
                <h3>Build the shortest path</h3>
                <p>Clear pages, fast load times, and one obvious next step on every screen.</p>
              </motion.div>
              <motion.div className="principle" variants={principleIn}>
                <h3>Measure what matters</h3>
                <p>Enquiries, bookings, and quote requests — not just visits.</p>
              </motion.div>
            </RevealGroup>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <h2 className="sr-only">Latest work</h2>
          <WorkShowcase reducedMotion={!!reducedMotion} isMobile={!!isMobile} />
        </section>

        <section ref={closingRef} id="contact" className="closing-section" aria-labelledby="closing-title">
          <div className="content-frame closing-layout">
            <motion.div
              className="closing-copy"
              style={reducedMotion || isMobile ? undefined : { y: closingDrift }}
            >
              <RevealTitle
                id="closing-title"
                text="Need more calls, bookings or quote requests?"
                reducedMotion={!!reducedMotion}
              />
              <motion.p
                className="closing-lede"
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={heroSideLine}
              >
                Tell me what you want it to do — get calls, bookings or quote requests — and I'll reply with what I'd change first.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={sectionActionsIn}
              >
                <motion.a
                  className="hero-action hero-action--primary"
                  href="mailto:hello@visionfx.studio?subject=Project%20enquiry"
                  variants={buttonIn}
                >
                  Start a conversation
                </motion.a>
                <motion.a className="hero-action hero-action--secondary" href="#projects" variants={buttonIn}>
                  See projects
                </motion.a>
              </motion.div>
            </motion.div>
            <RevealGroup className="closing-steps" reducedMotion={!!reducedMotion} variants={groupStagger}>
              {closingSteps.map((step, index) => (
                <motion.div key={step.title} className="closing-step" variants={principleIn}>
                  <span className="closing-step__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

      </main>

      <footer id="footer" className="site-footer">
        <div className="content-frame">
          <RevealGroup className="footer-layout" reducedMotion={!!reducedMotion} variants={groupStagger}>
            <motion.div className="footer-col footer-brand" variants={footerColIn}>
              <Wordmark />
              <p className="footer-tagline">
                Web developer building fast, responsive, and accessible digital products. Full-stack TypeScript, React, Next.js, and modern UI engineering.
              </p>
              <a className="footer-email" href="mailto:hello@visionfx.studio">hello@visionfx.studio</a>
            </motion.div>
            <motion.nav className="footer-col" aria-label="Sitemap" variants={footerColIn}>
              <h4 className="footer-heading">Sitemap</h4>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </motion.nav>
            <motion.nav className="footer-col" aria-label="Expertise" variants={footerColIn}>
              <h4 className="footer-heading">Expertise</h4>
              <ul>
                <li>Full-Stack Web Apps</li>
                <li>React, Next.js &amp; TypeScript</li>
                <li>Web Performance &amp; Vitals</li>
                <li>UI Systems &amp; Accessibility</li>
              </ul>
            </motion.nav>
            <motion.nav className="footer-col" aria-label="Social" variants={footerColIn}>
              <h4 className="footer-heading">Elsewhere</h4>
              <ul>
                <li><a href="https://github.com/" rel="noopener noreferrer" target="_blank">GitHub</a></li>
                <li><a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
                <li><a href="https://twitter.com/" rel="noopener noreferrer" target="_blank">Twitter</a></li>
                <li><a href="/rss.xml">RSS</a></li>
              </ul>
            </motion.nav>
          </RevealGroup>
          <div className="footer-base">
            <p>&copy; {new Date().getFullYear()} Andrei. All rights reserved.</p>
            <p className="footer-meta">Built with care · Last updated <time dateTime="2026-08">August 2026</time></p>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">ANDREI</div>
      </footer>
    </div>
  );
}

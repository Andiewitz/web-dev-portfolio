/**
 * VisionFX design reminder: reference-driven editorial placement with original VisionFX content.
 * Begin with a cream two-column argument and a single dark slab; use imagery only in later supporting sections.
 */
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
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
import meshworkImg from "@/assets/Meshwork Studio.png";
import hefestusImg from "@/assets/Festus.png";
import morrowImg from "@/assets/Morrow Architecture.png";
import matchaImg from "@/assets/Matcha.png";
import cafeLibreImg from "@/assets/Cafe Libre.png";
import comfortProPreviewImg from "@/assets/Comfort Pro Preview.png";
import elevateHealthPreviewImg from "@/assets/Elevate Health Preview.png";
import portraitImg from "@/assets/Torn Paper Halftone Portrait.webp";
import { posts as writingPosts, postPath, formatDate } from "@/data/writing";

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
];

const projects = [
  {
    title: "Comfort Pro",
    titleFont: "'Bricolage Grotesque', system-ui, sans-serif",
    description: "A family-owned HVAC company needed urgent repair searches to become booked jobs. Clear service paths, trust signals, and a fast mobile experience make the next step obvious.",
    outcome: "More qualified service calls",
    cta: "View live site",
    href: "https://comfort-pro-nu.vercel.app/",
    date: "2026",
    category: "Service Website",
    buttonLabel: "View project",
    image: comfortProPreviewImg,
  },
  {
    title: "Elevate Health",
    titleFont: "'DM Serif Display', Georgia, serif",
    description: "A chiropractic practice needed patients to understand their options and book with confidence. The site leads with clear care pathways and a simple route to a first visit.",
    outcome: "More first-visit bookings",
    cta: "View live site",
    href: "https://elevate-health-nu.vercel.app/",
    date: "2026",
    category: "Healthcare Website",
    buttonLabel: "View project",
    image: elevateHealthPreviewImg,
  },
  {
    title: "Meshwork Studio",
    titleFont: "'Geomini', system-ui, sans-serif",
    description: "A diagramming platform for systems architects needed to stay smooth under complex diagrams. Real-time sync and a fast canvas make product demos feel instant and credible.",
    outcome: "Smoother product demos",
    cta: "View live site",
    href: "https://meshwork-studiocom.vercel.app/",
    date: "2026",
    category: "Web Application",
    buttonLabel: "View project",
    image: meshworkImg,
  },
  {
    title: "Hefestus",
    titleFont: "'Lora', Georgia, serif",
    description: "A retail platform with a powerful product needed a website that could explain it quickly. The site turns a complex offer into a clear, credible path to a demo.",
    outcome: "Clearer path to demo",
    cta: "View live site",
    href: "https://festus-five.vercel.app/",
    date: "2026",
    category: "Full-Stack SaaS",
    buttonLabel: "View project",
    image: hefestusImg,
  },
  {
    title: "Morrow Bureau",
    titleFont: "'DM Serif Display', Georgia, serif",
    description: "An architecture practice needed a digital archive that matched the quality of its built work. Editorial pacing and strong imagery make the practice memorable.",
    outcome: "Stronger project enquiries",
    cta: "View live site",
    href: "https://kononenko-recreation.vercel.app/",
    date: "2026",
    category: "Digital Archive",
    buttonLabel: "View project",
    image: morrowImg,
  },
  {
    title: "Matcha",
    titleFont: "'DM Serif Display', Georgia, serif",
    description: "A ceremonial matcha store needed to sell a sensory product online. Origin story, ritual, and a frictionless checkout build trust before the first purchase.",
    outcome: "Higher checkout confidence",
    cta: "View live site",
    href: "https://matcha-haven.vercel.app/",
    date: "2025",
    category: "E-Commerce",
    buttonLabel: "View project",
    image: matchaImg,
  },
  {
    title: "Café Libre",
    titleFont: "'Bricolage Grotesque', system-ui, sans-serif",
    description: "An artisanal coffee house needed a web presence that felt as considered as its roast. Ambient visuals and mobile ordering turn interest into a visit.",
    outcome: "More table-side orders",
    cta: "View live site",
    href: "https://cafe-libre.vercel.app/",
    date: "2025",
    category: "Web Experience",
    buttonLabel: "View project",
    image: cafeLibreImg,
  },
];

const writingEntries = writingPosts.slice(0, 5).map(post => ({ title: post.title, topic: post.category, date: formatDate(post.published), href: postPath(post) }));

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

const sectionReveal = {
  hidden: { opacity: 0, y: 64, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

const sectionRevealMobile = {
  hidden: { opacity: 0, y: 18, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: easeOut } },
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
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
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

const rowIn: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.42, ease: easeOut } },
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
      { id: 'writing', theme: 'dark' },
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

function RevealBlock({
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

type Project = (typeof projects)[number];

/**
 * Size of the work column. `drag` multiplies the scroll runway without changing the
 * layout, so one card takes ~118svh of page scroll instead of a single screen.
 */
const WORK_DESKTOP = { card: 50, gap: 8, drag: 1.95 };
const WORK_MOBILE = { card: 26, gap: 9, drag: 1.6 };

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
      href={project.href ?? "#projects"}
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
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const metrics = isMobile ? WORK_MOBILE : WORK_DESKTOP;
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

  if (reducedMotion) {
    return (
      <div className="work-static">
        {projects.map((project) => (
          <figure className="work-static__item" key={project.title}>
            <img src={project.image} alt={`${project.title} — ${project.category}`} loading="lazy" />
            <figcaption>
              <span>{project.category} · {project.date}</span>
              <strong style={{ fontFamily: project.titleFont }}>{project.title}</strong>
              <a href={project.href ?? "#projects"} {...(project.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {project.cta} <span aria-hidden="true">→</span>
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

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
                <a
                  className="work-info__cta"
                  href={activeProject.href ?? "#projects"}
                  {...(activeProject.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {activeProject.cta} <span aria-hidden="true">→</span>
                </a>
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
  const slabRegionRef = useRef<HTMLElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useResponsiveVariant();
  const revealVariants = isMobile ? sectionRevealMobile : sectionReveal;
  const navTheme = useNavbarTheme();

  const { scrollYProgress } = useScroll({
    target: slabRegionRef,
    offset: ["start 75vh", "start -10vh"],
  });

  const slabScaleX = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const innerY = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const innerOpacity = useTransform(scrollYProgress, [0, 1], [0.76, 1]);

  const floatY = (from: number, to: number) =>
    useTransform(scrollYProgress, [0, 1], [from, to]);
  const q1Y = floatY(60, -60);
  const q2Y = floatY(-40, 80);
  const q3Y = floatY(40, -100);
  const q4Y = floatY(-80, 50);
  const q5Y = floatY(80, -40);
  const q6Y = floatY(-30, 100);

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
        <section id="top" className="hero-section">
          <CodeFlowBackground className="hero-flow" />
          <div className="content-frame opening-grid">
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
          </div>
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
              <img src={portraitImg} alt="Halftone portrait of Andrei on torn paper" />
            </motion.div>
          </figure>
        </section>

        <section ref={slabRegionRef} id="slab-region" className="hero-slab-scroll-region" aria-label="A website should earn its keep, not just look good">
          <div className="hero-slab-stage">
            <motion.div
              ref={slabRef}
              className="hero-slab"
              style={reducedMotion || isMobile ? undefined : { scaleX: slabScaleX }}
            >
              <motion.div
                className="hero-slab__inner"
                style={reducedMotion || isMobile ? undefined : { y: innerY, opacity: innerOpacity }}
              >
                <motion.div
                  className="questions-statement"
                  initial={reducedMotion ? false : "hidden"}
                  whileInView={reducedMotion ? undefined : "show"}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  variants={sectionReveal}
                >
                  <h2 className="questions-headline">
                    A website should earn its keep. Not just look good.
                  </h2>
                  <p className="questions-sub">
                    Every screen is a salesperson. I design the path from first impression to enquiry, remove the friction that loses customers, and treat speed as a business metric — more qualified leads, fewer abandoned visits, and a site your team can run without calling a developer.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.span className="float-q float-q--1" style={reducedMotion || isMobile ? undefined : { y: q1Y }}>where are visitors dropping off?</motion.span>
            <motion.span className="float-q float-q--2" style={reducedMotion || isMobile ? undefined : { y: q2Y }}>does this page turn interest into enquiries?</motion.span>
            <motion.span className="float-q float-q--3" style={reducedMotion || isMobile ? undefined : { y: q3Y }}>how fast does it load on a phone?</motion.span>
            <motion.span className="float-q float-q--4" style={reducedMotion || isMobile ? undefined : { y: q4Y }}>can customers find what they need in three clicks?</motion.span>
            <motion.span className="float-q float-q--5" style={reducedMotion || isMobile ? undefined : { y: q5Y }}>what is a slow site costing you in lost sales?</motion.span>
            <motion.span className="float-q float-q--6" style={reducedMotion || isMobile ? undefined : { y: q6Y }}>can your team update it without a developer?</motion.span>
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="content-frame approach-layout">
            <RevealBlock className="approach-heading" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <h2>Most websites don't have a traffic problem. They have a conversion problem.</h2>
              <p>
                I find where visitors hesitate, remove the friction, and build the shortest path to the action that matters — a call, a booking, or a quote request.
              </p>
              <a className="quiet-link" href="#projects">See the work <span aria-hidden="true">→</span></a>
            </RevealBlock>
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

        <section id="writing" className="writing-section">
          <div className="content-frame writing-layout">
            <RevealBlock className="writing-headline" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <h2>
                Notes on modern web engineering — frontend architecture, reactive systems, and Core Web Vitals.
              </h2>
              <a className="writing-cta" href="/writing">
                <span>Read all posts</span>
                <span aria-hidden="true">→</span>
              </a>
            </RevealBlock>
            <RevealGroup className="writing-list" reducedMotion={!!reducedMotion} variants={groupStagger}>
              {writingEntries.map((entry) => (
                <motion.a key={entry.title} className="writing-row" href={entry.href} variants={rowIn}>
                  <span className="writing-row__title">{entry.title}</span>
                  <span className="writing-row__topic">{entry.topic}</span>
                </motion.a>
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
                <li><a href="#writing">Writing</a></li>
                <li><a href="mailto:hello@visionfx.studio">Contact</a></li>
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

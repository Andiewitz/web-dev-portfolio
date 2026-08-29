/**
 * VisionFX design reminder: reference-driven editorial placement with original VisionFX content.
 * Begin with a cream two-column argument and a single dark slab; use imagery only in later supporting sections.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Wordmark from "@/components/Wordmark";

const navItems = [
  { href: "#projects", label: "Projects" },
];

const projects = [
  {
    title: "Project Name",
    type: "Featured work",
    context: "A short description of what this project is and what it achieves.",
    deliverables: "React · Node.js · Postgres",
  },
  {
    title: "Project Name Two",
    type: "Side project",
    context: "A short description of what this project is and why I built it.",
    deliverables: "TypeScript · Next.js · API",
  },
  {
    title: "Project Name Three",
    type: "Open source",
    context: "A short description of a tool or library that others can use.",
    deliverables: "Library · CI · Docs",
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

const sectionReveal = {
  hidden: { opacity: 0, y: 64, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

const sectionRevealMobile = {
  hidden: { opacity: 0, y: 18, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: easeOut } },
};

const heroLineReveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
};

const heroSideReveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut, delay: 0.1 } },
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
      { id: 'projects', theme: 'dark' },
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
  variants: typeof sectionReveal;
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

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
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

  return (
    <div className="site-shell">
      <header className="site-header" data-theme={navTheme}>
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="site-header__inner">
          <a href="#top" className="brand-link" aria-label="Andrei home" onClick={closeNav}>
            <Wordmark />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <a href="mailto:hello@visionfx.studio" className="header-cta">Start a conversation</a>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setNavOpen((open) => !open)}
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
          >
            {navOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div
              id="mobile-navigation"
              className="mobile-nav mobile-nav--open"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: easeOut }}
            >
              <nav aria-label="Mobile navigation">
                {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeNav}>{item.label}</a>)}
                <a href="mailto:hello@visionfx.studio" onClick={closeNav}>Start a conversation</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <section id="top" className="hero-section">
          <div className="content-frame opening-grid">
            <div>
              <h1>
                <motion.span
                  className="hero-line"
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={heroLineReveal}
                  style={{ display: "inline-block" }}
                >Hello, I&apos;m Andrei.</motion.span><br />
                <motion.span
                  className="hero-line hero-line--design"
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={heroLineReveal}
                  transition={{ duration: 0.32, ease: easeOut, delay: 0.045 }}
                  style={{ display: "inline-block" }}
                >A <em>Software Engineer.</em></motion.span>
              </h1>
            </div>
            <motion.div
              className="opening-side"
              initial={reducedMotion ? false : "hidden"}
              animate="show"
              variants={heroSideReveal}
            >
              <p className="opening-statement">
                Whether you need a team member or someone to own it solo — I build things that work.
              </p>
              <p className="opening-proof">Full-stack · Frontend · Open to work</p>
              <a className="opening-cta" href="mailto:hello@visionfx.studio">Start a conversation</a>
            </motion.div>
          </div>
        </section>

        <section ref={slabRegionRef} id="slab-region" className="hero-slab-scroll-region" aria-label="Most of software engineering happens before you open your editor">
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
                    Most of software engineering happens before you open your editor.
                  </h2>
                  <p className="questions-sub">
                    It's the questions — about scale, about tradeoffs, about what you're even building — that determine whether the code is worth writing.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.span className="float-q float-q--1" style={reducedMotion || isMobile ? undefined : { y: q1Y }}>how do we scale this?</motion.span>
            <motion.span className="float-q float-q--2" style={reducedMotion || isMobile ? undefined : { y: q2Y }}>what are we even building?</motion.span>
            <motion.span className="float-q float-q--3" style={reducedMotion || isMobile ? undefined : { y: q3Y }}>where does this break first?</motion.span>
            <motion.span className="float-q float-q--4" style={reducedMotion || isMobile ? undefined : { y: q4Y }}>who maintains it later?</motion.span>
            <motion.span className="float-q float-q--5" style={reducedMotion || isMobile ? undefined : { y: q5Y }}>what's the tradeoff?</motion.span>
            <motion.span className="float-q float-q--6" style={reducedMotion || isMobile ? undefined : { y: q6Y }}>is this even worth shipping?</motion.span>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="content-frame">
            <RevealBlock className="projects-heading" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <div>
                <p className="eyebrow">Projects</p>
                <h2>Selected work, built to hold up.</h2>
              </div>
              <p>A few things I have designed and shipped — from production web apps to tools that make life easier for the people using them.</p>
            </RevealBlock>
            <div className="project-ledger">
              <RevealBlock className="project-lead" reducedMotion={!!reducedMotion} variants={revealVariants}>
                <figure className="project-lead__visual">
                  <motion.img
                    data-motion-image
                    src="/manus-storage/visionfx-paper-architecture-final_544f85b5.jpg"
                    alt="Folded cream paper architecture on a charcoal table with a small orange geometric tab"
                    loading="eager"
                    initial={reducedMotion ? false : { scale: 1.08, y: 42 }}
                    whileInView={reducedMotion ? undefined : { scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 0.6, ease: easeOut }}
                  />
                  <figcaption>Featured / {projects[0].type}</figcaption>
                </figure>
                <div className="project-lead__copy">
                  <p className="project-card__type">{projects[0].type}</p>
                  <MotionTitle text={projects[0].title} />
                  <p className="project-card__context">{projects[0].context}</p>
                  <p className="project-card__deliverables">{projects[0].deliverables}</p>
                </div>
              </RevealBlock>
              <RevealBlock className="project-index" reducedMotion={!!reducedMotion} variants={revealVariants}>
                <article className="project-entry">
                  <div className="project-entry__visual">
                    <img src="/manus-storage/visionfx-fold-detail-final_2d166ab8.jpg" alt="Layered matte paper planes and a dark folded form crossed by a fine orange thread" loading="eager" />
                  </div>
                  <div className="project-entry__copy">
                    <p className="project-card__type">{projects[1].type}</p>
                    <MotionTitle text={projects[1].title} />
                    <p className="project-card__context">{projects[1].context}</p>
                    <p className="project-card__deliverables">{projects[1].deliverables}</p>
                  </div>
                </article>
                <article className="project-entry project-entry--text-only">
                  <div className="project-entry__copy">
                    <p className="project-card__type">{projects[2].type}</p>
                    <MotionTitle text={projects[2].title} />
                    <p className="project-card__context">{projects[2].context}</p>
                    <p className="project-card__deliverables">{projects[2].deliverables}</p>
                  </div>
                </article>
              </RevealBlock>
            </div>
          </div>
        </section>

      </main>

      <footer id="footer" className="site-footer">
        <RevealBlock className="content-frame footer-layout" reducedMotion={!!reducedMotion} variants={revealVariants}>
          <Wordmark inverse />
          <p>Software engineer building clear, dependable things for the web.</p>
          <div className="footer-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="mailto:hello@visionfx.studio">Contact</a>
          </div>
        </RevealBlock>
      </footer>
    </div>
  );
}

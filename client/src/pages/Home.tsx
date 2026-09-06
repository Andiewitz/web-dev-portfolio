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
  { href: "/writing", label: "Writing" },
];

const projects = [
  {
    title: "Meshwork Studio",
    titleFont: "'Geomini', system-ui, sans-serif",
    description: "A high-performance browser diagramming platform built for distributed systems architects. Features real-time state sync, 60fps canvas panning, and fluid SVG rendering that keeps pace with complex system topographies.",
    cta: "Read architecture breakdown",
    date: "2026",
    category: "Web Application",
    buttonLabel: "View project",
  },
  {
    title: "Inkbase",
    titleFont: "'Lora', Georgia, serif",
    description: "A distraction-free web publishing editor built around native DOM contenteditable primitives and typographic rhythm. Features offline-first local storage, zero layout shifts, and seamless markdown exports.",
    cta: "Read engineering notes",
    date: "2026",
    category: "Frontend & PWA",
    buttonLabel: "View project",
  },
  {
    title: "Metsie",
    titleFont: "'Poppins', system-ui, sans-serif",
    description: "A gamified interactive learning platform with real-time WebSocket matchmaking, live leaderboards, and sub-50ms reactive quiz interactions built with Next.js, Node.js, and Redis.",
    cta: "Read technical case study",
    date: "2025",
    category: "Full-Stack Web App",
    buttonLabel: "View project",
  },
];

const writingEntries = [
  { title: "Why your React app feels slow — and where to actually look", topic: "Web Performance", date: "Aug 2026" },
  { title: "Designing web applications that survive their second maintainer", topic: "Architecture", date: "Jul 2026" },
  { title: "Postgres indexes & queries for full-stack developers", topic: "Full-Stack", date: "Jul 2026" },
  { title: "The case for boring infrastructure in modern web deployments", topic: "DevOps & Cloud", date: "Jun 2026" },
  { title: "What a senior web dev code review actually looks for", topic: "UI Engineering", date: "Jun 2026" },
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
                >A <em>Web Developer.</em></motion.span>
              </h1>
            </div>
            <motion.div
              className="opening-side"
              initial={reducedMotion ? false : "hidden"}
              animate="show"
              variants={heroSideReveal}
            >
              <p className="opening-statement">
                I build responsive, high-performance web applications and fluid browser experiences with clean architecture, accessible interfaces, and modern full-stack TypeScript.
              </p>
              <p className="opening-proof">Full-Stack Web Dev · UI Engineering · Open to work</p>
              <a className="opening-cta" href="mailto:hello@visionfx.studio">Start a conversation</a>
            </motion.div>
          </div>
        </section>

        <section ref={slabRegionRef} id="slab-region" className="hero-slab-scroll-region" aria-label="Most of great web development happens before you write a single component">
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
                    Most of great web development happens before you write a single component.
                  </h2>
                  <p className="questions-sub">
                    It's the questions — about latency, interaction models, bundle budgets, and real user journeys — that turn code into an exceptional web experience.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.span className="float-q float-q--1" style={reducedMotion || isMobile ? undefined : { y: q1Y }}>how fast is the first paint?</motion.span>
            <motion.span className="float-q float-q--2" style={reducedMotion || isMobile ? undefined : { y: q2Y }}>does it feel native on mobile?</motion.span>
            <motion.span className="float-q float-q--3" style={reducedMotion || isMobile ? undefined : { y: q3Y }}>where does state get tangled?</motion.span>
            <motion.span className="float-q float-q--4" style={reducedMotion || isMobile ? undefined : { y: q4Y }}>is this accessible to everyone?</motion.span>
            <motion.span className="float-q float-q--5" style={reducedMotion || isMobile ? undefined : { y: q5Y }}>what's the bundle budget?</motion.span>
            <motion.span className="float-q float-q--6" style={reducedMotion || isMobile ? undefined : { y: q6Y }}>does it work on spotty networks?</motion.span>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="content-frame">
            <RevealBlock className="projects-heading" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <p className="eyebrow">Projects</p>
              <h2>Latest work</h2>
            </RevealBlock>
            <div className="project-grid">
              {projects.map((project) => (
                <RevealBlock className="project-card" key={project.title} reducedMotion={!!reducedMotion} variants={revealVariants}>
                  <div className="project-card__body">
                    <h3 className="project-card__title" style={{ fontFamily: project.titleFont }}>{project.title}</h3>
                    <p className="project-card__description">{project.description}</p>
                    <a className="project-card__link" href="#projects">
                      <span>{project.cta}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                  <div className="project-card__meta">
                    <div className="project-card__meta-row">
                      <span className="project-card__meta-key">Date</span>
                      <span className="project-card__meta-value">{project.date}</span>
                    </div>
                    <div className="project-card__meta-row">
                      <span className="project-card__meta-key">Category</span>
                      <span className="project-card__meta-value">{project.category}</span>
                    </div>
                  </div>
                  <a className="project-card__button" href="#projects">
                    <span>{project.buttonLabel}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        <section id="writing" className="writing-section">
          <div className="content-frame writing-layout">
            <RevealBlock className="writing-headline" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <p className="eyebrow">Writing &amp; Discussion</p>
              <h2>
                Notes on modern web engineering — frontend architecture, reactive systems, and Core Web Vitals.
              </h2>
              <a className="writing-cta" href="/writing">
                <span>Read all posts</span>
                <span aria-hidden="true">→</span>
              </a>
            </RevealBlock>
            <RevealBlock className="writing-list" reducedMotion={!!reducedMotion} variants={revealVariants}>
              {writingEntries.map((entry) => (
                <a key={entry.title} className="writing-row" href="/writing">
                  <span className="writing-row__title">{entry.title}</span>
                  <span className="writing-row__topic">{entry.topic}</span>
                </a>
              ))}
            </RevealBlock>
          </div>
        </section>

      </main>

      <footer id="footer" className="site-footer">
        <div className="content-frame">
          <RevealBlock className="footer-layout" reducedMotion={!!reducedMotion} variants={revealVariants}>
            <div className="footer-col footer-brand">
              <Wordmark />
              <p className="footer-tagline">
                Web developer building fast, responsive, and accessible digital products. Full-stack TypeScript, React, Next.js, and modern UI engineering.
              </p>
              <a className="footer-email" href="mailto:hello@visionfx.studio">hello@visionfx.studio</a>
            </div>
            <nav className="footer-col" aria-label="Sitemap">
              <h4 className="footer-heading">Sitemap</h4>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#writing">Writing</a></li>
                <li><a href="mailto:hello@visionfx.studio">Contact</a></li>
              </ul>
            </nav>
            <nav className="footer-col" aria-label="Expertise">
              <h4 className="footer-heading">Expertise</h4>
              <ul>
                <li>Full-Stack Web Apps</li>
                <li>React, Next.js &amp; TypeScript</li>
                <li>Web Performance &amp; Vitals</li>
                <li>UI Systems &amp; Accessibility</li>
              </ul>
            </nav>
            <nav className="footer-col" aria-label="Social">
              <h4 className="footer-heading">Elsewhere</h4>
              <ul>
                <li><a href="https://github.com/" rel="noopener noreferrer" target="_blank">GitHub</a></li>
                <li><a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
                <li><a href="https://twitter.com/" rel="noopener noreferrer" target="_blank">Twitter</a></li>
                <li><a href="/rss.xml">RSS</a></li>
              </ul>
            </nav>
          </RevealBlock>
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

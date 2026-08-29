/**
 * VisionFX design reminder: reference-driven editorial placement with original VisionFX content.
 * Begin with a cream two-column argument and a single dark slab; use imagery only in later supporting sections.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Wordmark from "@/components/Wordmark";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#projects", label: "Projects" },
  { href: "#studio", label: "Studio" },
];

const services = [
  {
    title: "Plan your website",
    text: "We work out what your website needs to say, what pages it needs, and what each page needs to help a visitor do.",
    detail: "Website strategy and content planning",
    proof: "Audience focus · page plan · content priorities",
  },
  {
    title: "Design the experience",
    text: "We create a visual system and responsive page designs that make your offer easy to understand on every screen size.",
    detail: "Website design and responsive page systems",
    proof: "Visual direction · page designs · reusable components",
  },
  {
    title: "Build and launch it",
    text: "We develop the site, test it across devices, and hand it over in a way your team can confidently use and update.",
    detail: "Frontend development, testing, and launch",
    proof: "Responsive build · device testing · handoff support",
  },
];

const principles = [
  {
    title: "Get clear before we design",
    text: "We agree on the audience, the offer, and what the website needs to achieve before designing a page.",
  },
  {
    title: "Keep design and development together",
    text: "The people planning the site stay involved through design and build, so the result remains consistent.",
  },
  {
    title: "Launch with a usable system",
    text: "You receive a responsive site and clear foundations your team can continue to work with.",
  },
];

const projects = [
  {
    title: "Launch a new product or service",
    type: "For a new offer",
    context: "Help people understand what is new, who it is for, and why they should care.",
    deliverables: "Messaging · page design · responsive build",
  },
  {
    title: "Replace a website that no longer fits",
    type: "For a growing business",
    context: "Turn an outdated or confusing site into a clearer introduction to your business.",
    deliverables: "Website plan · design system · development",
  },
  {
    title: "Make a complex offer easier to explain",
    type: "For a complex product",
    context: "Give customers a simpler path through a product, service, or platform with a lot to say.",
    deliverables: "Content structure · reusable pages · team handoff",
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

const heroEyebrowReveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.56, ease: easeOut } },
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
      { id: 'services', theme: 'dark' },
      { id: 'projects', theme: 'light' },
      { id: 'studio', theme: 'dark' },
      { id: 'contact', theme: 'light' },
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
  const slabContentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useResponsiveVariant();
  const revealVariants = isMobile ? sectionRevealMobile : sectionReveal;
  const navTheme = useNavbarTheme();

  const { scrollYProgress } = useScroll({
    target: slabRegionRef,
    offset: ["start 96vh", "start -12vh"],
  });

  const slabScaleX = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const innerY = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const innerOpacity = useTransform(scrollYProgress, [0, 1], [0.76, 1]);

  const slabContentInView = useInView(slabContentRef, { once: true, margin: "0px 0px -15% 0px" });

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
          <a href="#contact" className="header-cta">Start a project</a>
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
                <a href="#contact" onClick={closeNav}>Start a project</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <section id="top" className="hero-section">
          <div className="content-frame opening-grid">
            <div>
              <motion.p
                className="eyebrow opening-eyebrow"
                initial={reducedMotion ? false : "hidden"}
                animate="show"
                variants={heroEyebrowReveal}
              >
                VisionFX — web development studio
              </motion.p>
              <h1>
                <motion.span
                  className="hero-line"
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={heroLineReveal}
                  style={{ display: "inline-block" }}
                >Plan it.</motion.span><br />
                <motion.span
                  className="hero-line hero-line--design"
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={heroLineReveal}
                  transition={{ duration: 0.32, ease: easeOut, delay: 0.045 }}
                  style={{ display: "inline-block" }}
                >Design it.</motion.span><br />
                <motion.span
                  className="hero-line"
                  initial={reducedMotion ? false : "hidden"}
                  animate="show"
                  variants={heroLineReveal}
                  transition={{ duration: 0.32, ease: easeOut, delay: 0.09 }}
                  style={{ display: "inline-block" }}
                >Build it.</motion.span>
              </h1>
            </div>
            <motion.div
              className="opening-side"
              initial={reducedMotion ? false : "hidden"}
              animate="show"
              variants={heroSideReveal}
            >
              <p className="opening-statement">
                VisionFX helps businesses launch a new website, replace an old one, or make a complicated offer easier to understand.
              </p>
              <p className="opening-proof">Website strategy · Design · Frontend development</p>
              <a className="opening-cta" href="#contact">Tell us about your website</a>
            </motion.div>
          </div>
        </section>

        <section ref={slabRegionRef} id="slab-region" className="hero-slab-scroll-region" aria-label="VisionFX statement">
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
                <p className="hero-slab__eyebrow">The whole website, handled together.</p>
                <motion.div
                  ref={slabContentRef}
                  className="hero-slab__content"
                  initial={reducedMotion ? false : "hidden"}
                  animate={slabContentInView || reducedMotion ? "show" : "hidden"}
                  variants={lineContainer}
                >
                  <h2 aria-label="Make the website the easy part.">
                    <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>Make the website</motion.span>{" "}
                    <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>the <em><CharacterText text="easy part." /></em></motion.span>
                  </h2>
                  <p>We turn a clear brief into a useful, responsive website — then stay close through design, development, testing, and launch.</p>
                  <div className="hero-slab__details" aria-label="Project stages">
                    <span>Plan</span><span>Design</span><span>Build</span><span>Launch</span>
                  </div>
                  <a className="hero-slab__cta" href="#services">See what you get</a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="content-frame approach-layout">
            <RevealBlock className="approach-heading" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <p className="eyebrow">How we work</p>
              <h2 aria-label="One partner from website strategy to launch.">
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>One partner from</motion.span>{" "}
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>website strategy to launch.</motion.span>
              </h2>
              <p>You do not have to manage a strategist, a designer, and a developer separately. VisionFX takes the website through each stage as one connected project.</p>
            </RevealBlock>
            <div className="principle-list">
              {principles.map((principle) => (
                <RevealBlock className="principle" key={principle.title} reducedMotion={!!reducedMotion} variants={revealVariants}>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="content-frame services-layout">
            <RevealBlock className="services-intro" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <p className="eyebrow">Services</p>
              <h2 aria-label="Three parts of a website project.">
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>Three parts of a</motion.span>{" "}
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>website project.</motion.span>
              </h2>
              <p>Choose the support you need. Most projects include all three so the website is clear, well-designed, and ready to launch.</p>
            </RevealBlock>
            <div className="service-list">
              {services.map((service) => (
                <RevealBlock className="service" key={service.title} reducedMotion={!!reducedMotion} variants={revealVariants}>
                  <p className="service__detail">{service.detail}</p>
                  <MotionTitle text={service.title} />
                  <p>{service.text}</p>
                  <p className="service__proof">{service.proof}</p>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="content-frame">
            <RevealBlock className="projects-heading" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <div>
                <p className="eyebrow">Projects</p>
                <h2>Types of website projects we take on.</h2>
              </div>
              <p>These are common project types, not made-up case studies. Each one starts with a business goal and ends with a live, responsive website your team can use.</p>
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
                  <figcaption>Visual study / from brief to built form</figcaption>
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

        <section id="studio" className="studio-section">
          <div className="content-frame studio-layout">
            <RevealBlock className="studio-art" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <motion.img
                data-motion-image
                src="/manus-storage/visionfx-worktable-final_9bf25587.jpg"
                alt="A top-down studio worktable with blank paper, pencil, ruler, charcoal card, and orange tab"
                loading="eager"
                initial={reducedMotion ? false : { scale: 1.08, y: 42 }}
                whileInView={reducedMotion ? undefined : { scale: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: easeOut }}
              />
              <figcaption>Connected work / planning, design, build</figcaption>
            </RevealBlock>
            <RevealBlock className="studio-copy" reducedMotion={!!reducedMotion} variants={revealVariants}>
              <p className="eyebrow">Inside the studio</p>
              <h2 aria-label="Work directly with the people building your website.">
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>Work directly with</motion.span>{" "}
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>the people building</motion.span>{" "}
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>your website.</motion.span>
              </h2>
              <p>We plan, design, and develop the site in the same small team. That means fewer handoffs, quicker answers, and a website that works the way it was designed to.</p>
              <p className="production-note">Responsive pages · accessible markup · performance checks · practical handoff</p>
              <a className="quiet-link" href="#contact">Ask about a project</a>
            </RevealBlock>
            <figure className="study-art" aria-hidden="true">
              <img src="/manus-storage/visionfx-graphic-study_6fe48003.jpg" alt="" loading="eager" />
            </figure>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="content-frame contact-layout">
            <p className="eyebrow eyebrow--ember">Start a project</p>
            <RevealBlock reducedMotion={!!reducedMotion} variants={revealVariants}>
              <h2 aria-label="Tell us what needs to change.">
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>Tell us what</motion.span>{" "}
                <motion.span className="motion-line" variants={lineItem} style={{ display: "block" }}>needs to change.</motion.span>
              </h2>
              <p>Send a short overview of your website, your timeline, and what you need it to do. We will reply with whether we are a fit, an initial scope, and a practical next step.</p>
            </RevealBlock>
            <a className="contact-button" href="mailto:hello@visionfx.studio?subject=VisionFX%20website%20project">Email VisionFX</a>
          </div>
        </section>
      </main>

      <footer id="footer" className="site-footer">
        <RevealBlock className="content-frame footer-layout" reducedMotion={!!reducedMotion} variants={revealVariants}>
          <Wordmark inverse />
          <p>Websites planned, designed, and built for businesses ready to grow.</p>
          <div className="footer-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="#contact">Contact</a>
          </div>
        </RevealBlock>
      </footer>
    </div>
  );
}

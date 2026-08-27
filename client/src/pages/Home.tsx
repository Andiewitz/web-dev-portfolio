/**
 * VisionFX design reminder: reference-driven editorial placement with original VisionFX content.
 * Begin with a cream two-column argument and a single dark slab; use imagery only in later supporting sections.
 */
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import VisionMark from "@/components/VisionMark";

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

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const slabRegionRef = useRef<HTMLElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const region = slabRegionRef.current;
    const slab = slabRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!region || !slab) return;

    let frame = 0;
    const updateSlab = () => {
      frame = 0;
      if (window.innerWidth < 768 || reducedMotion.matches) {
        slab.style.clipPath = "";
        return;
      }

      const regionTop = region.getBoundingClientRect().top;
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.15;
      const progress = Math.min(1, Math.max(0, (start - regionTop) / (start - end)));
      const inset = (7 * (1 - progress)).toFixed(3);
      const radius = (22 * (1 - progress)).toFixed(2);
      slab.style.clipPath = `inset(0 ${inset}vw 0 ${inset}vw round ${radius}px)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSlab);
    };

    updateSlab();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="site-header__inner">
          <a href="#top" className="brand-link" aria-label="VisionFX home" onClick={closeNav}>
            <VisionMark />
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
        <div id="mobile-navigation" className={`mobile-nav ${navOpen ? "mobile-nav--open" : ""}`}>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeNav}>{item.label}</a>)}
            <a href="#contact" onClick={closeNav}>Start a project</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero-section">
          <div className="content-frame opening-grid">
            <div>
              <p className="eyebrow opening-eyebrow">VisionFX — web development studio</p>
              <h1>Plan it.<br /><span>Design</span> it.<br />Build it.</h1>
            </div>
            <div className="opening-side">
              <p className="opening-statement">
                VisionFX helps businesses launch a new website, replace an old one, or make a complicated offer easier to understand.
              </p>
              <p className="opening-proof">Website strategy · Design · Frontend development</p>
              <a className="opening-cta" href="#contact">Tell us about your website</a>
            </div>
          </div>
        </section>

        <section ref={slabRegionRef} className="hero-slab-scroll-region" aria-label="VisionFX statement">
          <div className="hero-slab-stage">
            <div ref={slabRef} className="hero-slab">
              <div className="hero-slab__inner">
                <p className="hero-slab__eyebrow">The whole website, handled together.</p>
                <div className="hero-slab__content">
                  <h2>Make the website<br />the <em>easy part.</em></h2>
                  <p>We turn a clear brief into a useful, responsive website — then stay close through design, development, testing, and launch.</p>
                  <div className="hero-slab__details" aria-label="Project stages">
                    <span>Plan</span><span>Design</span><span>Build</span><span>Launch</span>
                  </div>
                  <a className="hero-slab__cta" href="#services">See what you get</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="content-frame approach-layout">
            <div className="approach-heading">
              <p className="eyebrow">How we work</p>
              <h2>One partner from website strategy to launch.</h2>
              <p>You do not have to manage a strategist, a designer, and a developer separately. VisionFX takes the website through each stage as one connected project.</p>
            </div>
            <div className="principle-list">
              {principles.map((principle) => (
                <article className="principle" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="content-frame services-layout">
            <div className="services-intro">
              <p className="eyebrow">Services</p>
              <h2>Three parts of a website project.</h2>
              <p>Choose the support you need. Most projects include all three so the website is clear, well-designed, and ready to launch.</p>
            </div>
            <div className="service-list">
              {services.map((service) => (
                <article className="service" key={service.title}>
                  <p className="service__detail">{service.detail}</p>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <p className="service__proof">{service.proof}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="content-frame">
            <div className="projects-heading">
              <div>
                <p className="eyebrow">Projects</p>
                <h2>Types of website projects we take on.</h2>
              </div>
              <p>These are common project types, not made-up case studies. Each one starts with a business goal and ends with a live, responsive website your team can use.</p>
            </div>
            <div className="project-ledger">
              <article className="project-lead">
                <figure className="project-lead__visual">
                  <img src="/manus-storage/visionfx-project-launch_acb1f6be.jpg" alt="A pale paper form arranged on a tabletop with a small orange accent" loading="lazy" />
                  <figcaption>Visual study / from brief to built form</figcaption>
                </figure>
                <div className="project-lead__copy">
                  <p className="project-card__type">{projects[0].type}</p>
                  <h3>{projects[0].title}</h3>
                  <p className="project-card__context">{projects[0].context}</p>
                  <p className="project-card__deliverables">{projects[0].deliverables}</p>
                </div>
              </article>
              <div className="project-index">
                <article className="project-entry">
                  <div className="project-entry__visual">
                    <img src="/manus-storage/visionfx-project-platform_40fd618e.jpg" alt="A tactile paper study with a dark folded form and a warm orange accent" loading="lazy" />
                  </div>
                  <div className="project-entry__copy">
                    <p className="project-card__type">{projects[1].type}</p>
                    <h3>{projects[1].title}</h3>
                    <p className="project-card__context">{projects[1].context}</p>
                    <p className="project-card__deliverables">{projects[1].deliverables}</p>
                  </div>
                </article>
                <article className="project-entry project-entry--text-only">
                  <div className="project-entry__copy">
                    <p className="project-card__type">{projects[2].type}</p>
                    <h3>{projects[2].title}</h3>
                    <p className="project-card__context">{projects[2].context}</p>
                    <p className="project-card__deliverables">{projects[2].deliverables}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="studio" className="studio-section">
          <div className="content-frame studio-layout">
            <figure className="studio-art">
              <img
                src="/manus-storage/visionfx-studio-objects_54fe8b9b.jpg"
                alt="A quiet studio still life of paper and a dark folded object"
                loading="lazy"
              />
              <figcaption>Connected work / planning, design, build</figcaption>
            </figure>
            <div className="studio-copy">
              <p className="eyebrow">Inside the studio</p>
              <h2>Work directly with the people building your website.</h2>
              <p>We plan, design, and develop the site in the same small team. That means fewer handoffs, quicker answers, and a website that works the way it was designed to.</p>
              <p className="production-note">Responsive pages · accessible markup · performance checks · practical handoff</p>
              <a className="quiet-link" href="#contact">Ask about a project</a>
            </div>
            <figure className="study-art" aria-hidden="true">
              <img src="/manus-storage/visionfx-graphic-study_6fe48003.jpg" alt="" loading="lazy" />
            </figure>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="content-frame contact-layout">
            <p className="eyebrow eyebrow--ember">Start a project</p>
            <div>
              <h2>Tell us what<br />needs to change.</h2>
              <p>Send a short overview of your website, your timeline, and what you need it to do. We will reply with whether we are a fit, an initial scope, and a practical next step.</p>
            </div>
            <a className="contact-button" href="mailto:hello@visionfx.studio?subject=VisionFX%20website%20project">Email VisionFX</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-frame footer-layout">
          <VisionMark inverse />
          <p>Websites planned, designed, and built for businesses ready to grow.</p>
          <div className="footer-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

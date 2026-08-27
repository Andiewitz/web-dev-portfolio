/**
 * VisionFX design reminder: reference-driven editorial placement with original VisionFX content.
 * Begin with a cream two-column argument and a single dark slab; use imagery only in later supporting sections.
 */
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
    title: "Clarify the message",
    text: "We shape the message, hierarchy, and visual language of a homepage around the decision it needs to support.",
    detail: "Positioning, content structure, and launch pages",
    proof: "Decision map · page architecture · responsive content plan",
  },
  {
    title: "Turn it into a system",
    text: "We design responsive interfaces that feel deliberate on the first visit and remain clear when the site begins to grow.",
    detail: "Design direction, responsive UI, and components",
    proof: "Component architecture · responsive templates · interaction states",
  },
  {
    title: "Build it for real",
    text: "We develop accessible, performant frontends with semantic structure, careful interaction states, and a handoff your team can use.",
    detail: "Frontend engineering, QA, and launch support",
    proof: "Semantic markup · performance pass · QA and handoff",
  },
];

const principles = [
  {
    title: "Start with the real question",
    text: "A good website is clear about what needs to change in a visitor’s understanding.",
  },
  {
    title: "Make the structure visible",
    text: "Content, visual design, and the build should tell the same story from every breakpoint.",
  },
  {
    title: "Leave room for the idea",
    text: "We use less ornament so the important parts have space to carry their own weight.",
  },
];

const projects = [
  {
    title: "A launch site with a clear first move",
    type: "New product presence",
    context: "When a new offer needs to make sense before the next meeting.",
    deliverables: "Content architecture · responsive templates · launch QA",
    image: "/manus-storage/visionfx-project-launch_acb1f6be.jpg",
  },
  {
    title: "A platform people can understand faster",
    type: "Digital platform redesign",
    context: "When a complex product needs a more useful route into its value.",
    deliverables: "Information model · component architecture · responsive UI",
    image: "/manus-storage/visionfx-project-platform_40fd618e.jpg",
  },
  {
    title: "A content system built to keep growing",
    type: "Editorial and component system",
    context: "When publishing needs a clearer structure without a new page feeling like a rebuild.",
    deliverables: "Editorial blocks · semantic markup · team handoff",
    image: "/manus-storage/visionfx-project-system_4723ebe2.jpg",
  },
];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const slabRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: slabRef,
    offset: ["start start", "end end"],
  });
  const slabClipPath = useTransform(
    scrollYProgress,
    [0, 0.58],
    ["inset(10vh 7vw 10vh 7vw round 22px)", "inset(0vh 0vw 0vh 0vw round 0px)"],
  );
  const slabContentOpacity = useTransform(scrollYProgress, [0, 0.22, 0.58], [0.72, 0.84, 1]);
  const slabContentY = useTransform(scrollYProgress, [0, 0.58], ["translateY(7vh)", "translateY(0)"]);
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
          <a href="#contact" className="header-cta">Start a conversation</a>
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
            <a href="#contact" onClick={closeNav}>Start a conversation</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero-section">
          <div className="content-frame opening-grid editorial-reveal">
            <h1>Websites that <span>make</span><br />the next <span>move</span><br />clear.</h1>
            <p className="opening-statement">
              A website has to make its case quickly. VisionFX shapes the argument, builds the frontend, and leaves a system your team can carry forward.
            </p>
          </div>
        </section>

        <section ref={slabRef} className="hero-slab-scroll-region" aria-label="VisionFX statement">
          <div className="hero-slab-stage">
            <motion.div className="hero-slab" style={shouldReduceMotion ? undefined : { clipPath: slabClipPath }}>
              <motion.div className="hero-slab__inner" style={shouldReduceMotion ? undefined : { opacity: slabContentOpacity, transform: slabContentY }}>
              <p>Strategy, design, and frontend engineering — in one room.</p>
              <h2>Made for the work<br /><em>after the first click.</em></h2>
              <a className="hero-slab__cta" href="#contact">Start a conversation</a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="content-frame approach-layout">
            <div className="approach-heading">
              <p className="eyebrow">Our approach</p>
              <h2>A website earns trust when the idea and the implementation agree.</h2>
              <p>Message, visual language, responsive behavior, and production detail all need to carry the same argument. That is the difference between a page that looks finished and a website that is ready to work.</p>
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
              <p className="eyebrow">What we make</p>
              <h2>From a clear decision to a durable frontend.</h2>
              <p>We focus on the moments where a more useful digital presence makes the business easier to understand, trust, and choose — then make sure it performs across the actual ways people use it.</p>
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
                <p className="eyebrow">Project directions</p>
                <h2>Built for the moment a better website changes what happens next.</h2>
              </div>
              <p>Representative builds, not a template catalog: each one takes a business decision through structure, responsive components, testing, and a launch-ready handoff.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-card__frame">
                    <div className="project-card__image-wrap">
                      <img src={project.image} alt="" loading="lazy" />
                    </div>
                    <div className="project-card__content">
                      <p className="project-card__type">{project.type}</p>
                      <h3>{project.title}</h3>
                      <p className="project-card__context">{project.context}</p>
                      <p className="project-card__deliverables">{project.deliverables}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="studio" className="studio-section">
          <div className="content-frame studio-layout">
            <figure className="studio-art">
              <div className="image-shell image-shell--studio">
                <img
                  src="/manus-storage/visionfx-studio-objects_54fe8b9b.jpg"
                  alt="An open charcoal portfolio folder with unmarked cream cards and a small orange accent"
                  loading="lazy"
                />
              </div>
            </figure>
            <div className="studio-copy">
              <p className="eyebrow">Inside the studio</p>
              <h2>We work in the overlap between ideas and implementation.</h2>
              <p>That means fewer handoffs, faster decisions, and a more coherent result. We care about how a site reads, how it responds at every breakpoint, and what happens when your team needs to carry it forward.</p>
              <p className="production-note">Responsive systems · semantic markup · performance judgment · launch-ready handoff</p>
              <a className="quiet-link" href="#contact">Talk through a project</a>
            </div>
            <figure className="study-art" aria-hidden="true">
              <img src="/manus-storage/visionfx-graphic-study_6fe48003.jpg" alt="" loading="lazy" />
            </figure>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="content-frame contact-layout">
            <p className="eyebrow eyebrow--ember">Start here</p>
            <div>
              <h2>Bring the brief.<br />We’ll bring the care.</h2>
              <p>Give us the shape of what needs to happen next. We’ll respond with a clear way forward.</p>
            </div>
            <a className="contact-button" href="mailto:hello@visionfx.studio?subject=VisionFX%20project%20inquiry">Start a conversation</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-frame footer-layout">
          <VisionMark inverse />
          <p>Strategy, design, and development for a clearer digital presence.</p>
          <div className="footer-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * VisionFX design reminder: calm, Anthropic-inspired editorial pacing with original VisionFX content.
 * Use open cream space, sparse type, measured charcoal media blocks, and a single orange action band.
 */
import { useState } from "react";
import { Menu, X } from "lucide-react";
import VisionMark from "@/components/VisionMark";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#studio", label: "Studio" },
];

const services = [
  {
    title: "Clarify the message",
    text: "We shape the message, hierarchy, and visual language of a homepage around the decision it needs to support.",
    detail: "Positioning, content structure, and launch pages",
  },
  {
    title: "Turn it into a system",
    text: "We design responsive interfaces that feel deliberate on the first visit and remain clear when the site begins to grow.",
    detail: "Design direction, responsive UI, and components",
  },
  {
    title: "Build it for real",
    text: "We develop accessible, performant frontends with semantic structure, careful interaction states, and a handoff your team can use.",
    detail: "Frontend engineering, QA, and launch support",
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

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
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
          <div className="content-frame hero-grid">
            <div className="hero-copy editorial-reveal">
              <p className="eyebrow">Independent web development studio</p>
              <h1>A digital presence with a <em>point of view.</em></h1>
              <p className="hero-lede">
                VisionFX brings strategy, interface design, and frontend engineering together for teams who need their next website to mean something and work properly everywhere.
              </p>
              <a className="text-cta" href="#contact">Tell us what you’re building</a>
            </div>
            <figure className="hero-art editorial-reveal editorial-reveal--late">
              <div className="image-shell image-shell--hero">
                <img
                  src="/manus-storage/visionfx-editorial-hero_0499b4c7.jpg"
                  alt="Folded ivory paper forms arranged around a charcoal monolith and an orange ceramic accent"
                  fetchPriority="high"
                />
              </div>
              <figcaption>Clarity has a material quality.</figcaption>
            </figure>
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="content-frame approach-layout">
            <div className="approach-heading">
              <p className="eyebrow eyebrow--inverse">Our approach</p>
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

/**
 * VisionFX design reminder: Voltage Editorial — asymmetric parchment composition, technical receipts,
 * Bricolage display type, 0.5px rules, and a single orange conversion point per view.
 */
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import VisionMark from "@/components/VisionMark";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
];

const capabilities = [
  {
    number: "01",
    title: "Positioning into pages",
    text: "We turn the important parts of your offer into an information system people can actually navigate.",
    detail: "IA · content direction · page architecture",
  },
  {
    number: "02",
    title: "Design into interface",
    text: "Distinctive visual systems, responsive layouts, and interactions with just enough physical feedback.",
    detail: "art direction · UX · design systems",
  },
  {
    number: "03",
    title: "Interface into a build",
    text: "Fast, accessible frontends that leave your team with a clear, maintainable foundation.",
    detail: "React · performance · launch support",
  },
];

const workFormats = [
  {
    index: "01",
    title: "The product launch",
    image: "/manus-storage/visionfx-project-orbit_f95459d9.jpg",
    summary: "A focused homepage that gives a new product its clearest first conversation.",
    receipt: ["positioning", "interface", "production"],
    className: "work-card--wide",
  },
  {
    index: "02",
    title: "The commerce reset",
    image: "/manus-storage/visionfx-project-shift_376acf04.jpg",
    summary: "A calmer route from product story to confident buying decisions.",
    receipt: ["journeys", "systems", "speed"],
    className: "",
  },
  {
    index: "03",
    title: "The content system",
    image: "/manus-storage/visionfx-project-loom_b6556dc2.jpg",
    summary: "A publishing foundation that keeps expanding without losing its point of view.",
    receipt: ["structure", "components", "editorial"],
    className: "",
  },
];

const process = [
  {
    number: "01",
    title: "Find the signal",
    text: "We get specific about the decision your site must help someone make.",
  },
  {
    number: "02",
    title: "Build the system",
    text: "We design the language, layouts, and components as one coherent product surface.",
  },
  {
    number: "03",
    title: "Ship with intention",
    text: "We develop, test, and hand over a foundation that is ready to keep working.",
  },
];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => setNavOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="site-header__inner">
          <a href="#top" className="brand-link" aria-label="VisionFX home" onClick={closeNav}>
            <VisionMark />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
            ))}
          </nav>

          <a
            href="#contact"
            className="header-cta"
            aria-label="Start a project with VisionFX"
          >
            Start a project <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </a>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setNavOpen((open) => !open)}
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
          >
            {navOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>

        <div id="mobile-navigation" className={`mobile-nav ${navOpen ? "mobile-nav--open" : ""}`}>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeNav}>{item.label}</a>
            ))}
            <a href="#contact" onClick={closeNav}>Start a project <ArrowUpRight aria-hidden="true" size={16} /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero-section section-light">
          <div className="hero-grid content-frame">
            <div className="hero-copy motion-reveal">
              <p className="eyebrow">Independent web development studio</p>
              <h1>Websites that carry <em>the weight</em> of your next move.</h1>
              <p className="hero-lede">
                VisionFX turns a sharp point of view into a working digital presence — strategy,
                interface, and production in one considered build.
              </p>
              <div className="hero-actions">
                <a className="btn btn--primary" href="#contact">
                  Start a project <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
                </a>
                <a className="text-link" href="#work">
                  See the work formats <ArrowDownRight aria-hidden="true" size={16} strokeWidth={1.8} />
                </a>
              </div>
            </div>

            <div className="hero-visual motion-reveal motion-reveal--delayed">
              <div className="hero-visual__frame">
                <img
                  src="/manus-storage/visionfx-hero_7e619a03.jpg"
                  alt="Abstract paper and charcoal development objects with an orange directional slash"
                  className="hero-visual__image"
                  fetchPriority="high"
                />
                <div className="build-receipt" aria-label="VisionFX build receipt">
                  <div className="build-receipt__head">
                    <span>BUILD RECEIPT</span>
                    <span className="status-dot">READY</span>
                  </div>
                  <div className="build-receipt__body">
                    <p><span>scope</span><b>Direction / design / code</b></p>
                    <p><span>signal</span><b>Specific before spectacular</b></p>
                    <p><span>status</span><b>Ready to make a mark</b></p>
                  </div>
                </div>
              </div>
              <p className="hero-caption">Made for the moment people decide whether you matter.</p>
            </div>
          </div>
          <div className="hero-rail content-frame" aria-label="VisionFX operating principles">
            <p><span>01</span> No template theatre.</p>
            <p><span>02</span> Design and development in the same room.</p>
            <p><span>03</span> A system your team can build on.</p>
          </div>
        </section>

        <section id="capabilities" className="capabilities-section section-dark">
          <div className="content-frame">
            <div className="section-heading section-heading--dark">
              <p className="eyebrow eyebrow--dark">Capabilities</p>
              <h2>One team from the first sentence to the last breakpoint.</h2>
              <p>Good sites are not a cosmetic layer. They are an operating surface for your best thinking.</p>
            </div>
            <div className="capability-list">
              {capabilities.map((capability) => (
                <article className="capability" key={capability.number}>
                  <p className="capability__number">{capability.number}</p>
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.text}</p>
                  </div>
                  <p className="capability__detail">{capability.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-light">
          <div className="content-frame">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Selected work formats</p>
                <h2>Different briefs. One clean line from intent to interface.</h2>
              </div>
              <p>Every engagement is shaped around a useful business moment, not a preset package.</p>
            </div>

            <div className="work-grid">
              {workFormats.map((work) => (
                <article className={`work-card ${work.className}`} key={work.index}>
                  <div className="work-card__outer">
                    <div className="work-card__inner">
                      <div className="work-card__meta">
                        <span>{work.index}</span>
                        <span>VisionFX / Format</span>
                      </div>
                      <img src={work.image} alt="" className="work-card__image" loading="lazy" />
                      <div className="work-card__content">
                        <h3>{work.title}</h3>
                        <p>{work.summary}</p>
                        <div className="receipt-tags" aria-label={`${work.title} focus areas`}>
                          {work.receipt.map((item) => <span key={item}>{item}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="process-section section-linen">
          <div className="content-frame process-grid">
            <div className="process-intro">
              <p className="eyebrow">How we work</p>
              <h2>A process with enough structure to move fast.</h2>
              <p>Clear decisions early create more room for the right details later.</p>
            </div>
            <div className="process-list">
              {process.map((step) => (
                <article className="process-step" key={step.number}>
                  <p>{step.number}</p>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="content-frame contact-grid">
            <p className="eyebrow eyebrow--ember">A good place to start</p>
            <div>
              <h2>Bring the brief.<br />We’ll bring the build.</h2>
              <p>Tell us what needs to happen next. We’ll come back with a clear way forward.</p>
            </div>
            <a className="btn btn--light" href="mailto:hello@visionfx.studio?subject=VisionFX%20project%20inquiry">
              Start the conversation <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-frame footer-grid">
          <VisionMark inverse />
          <p>Direction, interface, and code for teams making their next move.</p>
          <div className="footer-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="#contact">Contact</a>
          </div>
          <p className="footer-meta">© {new Date().getFullYear()} VisionFX. Built to keep moving.</p>
        </div>
      </footer>
    </div>
  );
}

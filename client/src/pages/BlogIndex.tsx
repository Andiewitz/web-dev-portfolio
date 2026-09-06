import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Wordmark from "@/components/Wordmark";

export const posts = [
  {
    slug: "why-react-feels-slow",
    category: "Web Performance",
    title: "Why your React app feels slow — and where to actually look",
    date: "Aug 12, 2026",
    excerpt:
      "The instinct is to reach for React.memo and useMemo. That's almost never the fix. The real issue is usually upstream — unstable references, context misuse, or unvirtualized lists.",
    readTime: "8 min read",
    palette: ["#6B9FBF", "#A8C5D8", "#2C4A6E", "#8BA8C4", "#D4E5F0", "#4A7A9B"],
  },
  {
    slug: "designing-systems-second-maintainer",
    category: "Architecture",
    title: "Designing web applications that survive their second maintainer",
    date: "Jul 29, 2026",
    excerpt:
      "Clean component boundaries, machine-checkable contracts, and state patterns that communicate intent without needing an archaeologist.",
    readTime: "6 min read",
    palette: ["#C4956B", "#8B6E47", "#DDB896", "#6B4F35", "#E8D4B8", "#A07B56"],
  },
  {
    slug: "postgres-indexes",
    category: "Full-Stack",
    title: "Postgres indexes & queries for full-stack developers",
    date: "Jul 14, 2026",
    excerpt:
      "Foreign key indexes, partial indexes, expression indexes, and covering indexes with INCLUDE. When each one earns its write overhead in a web app.",
    readTime: "10 min read",
    palette: ["#7A9E7E", "#4A7A56", "#B8D4BA", "#2E5E38", "#9EC4A2", "#5C8C64"],
  },
  {
    slug: "boring-infrastructure",
    category: "DevOps & Cloud",
    title: "The case for boring infrastructure in modern web deployments",
    date: "Jun 22, 2026",
    excerpt:
      "Novel edge runtimes fail in novel ways. Solid, well-documented web infrastructure fails in predictable ways with battle-tested solutions.",
    readTime: "5 min read",
    palette: ["#9B7BB8", "#6B4F8C", "#C4A8D8", "#4A2E6B", "#D8C4E8", "#7B5A9E"],
  },
  {
    slug: "senior-frontend-review",
    category: "UI Engineering",
    title: "What a senior web dev code review actually looks for",
    date: "Jun 8, 2026",
    excerpt:
      "Component contracts, keyboard accessibility, bundle size impact, and layout stability. The checklist I run through on every web PR.",
    readTime: "7 min read",
    palette: ["#BF9B6B", "#8C6B4A", "#D8BC96", "#6B4F2E", "#E8D4B8", "#A07855"],
  },
];

const allCategories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

const easeOut = [0.23, 1, 0.32, 1] as const;

function MosaicThumb({ palette }: { palette: string[] }) {
  // 3×4 grid of blocks with varied sizes using the post palette
  const blocks = [
    { col: "1 / 2", row: "1 / 3", color: palette[0] },
    { col: "2 / 4", row: "1 / 2", color: palette[1] },
    { col: "2 / 3", row: "2 / 3", color: palette[2] },
    { col: "3 / 4", row: "2 / 4", color: palette[3] },
    { col: "1 / 3", row: "3 / 4", color: palette[4] },
    { col: "1 / 2", row: "4 / 5", color: palette[5] },
    { col: "2 / 3", row: "3 / 5", color: palette[0] },
    { col: "3 / 4", row: "4 / 5", color: palette[1] },
  ];
  return (
    <div className="blog-card__mosaic">
      {blocks.map((b, i) => (
        <div
          key={i}
          style={{
            gridColumn: b.col,
            gridRow: b.row,
            backgroundColor: b.color,
          }}
        />
      ))}
    </div>
  );
}

export default function BlogIndex() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="site-shell">
      <header className="site-header" data-theme="dark">
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="site-header__inner">
          <Link href="/" className="brand-link" aria-label="Andrei home">
            <Wordmark />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/#projects">Projects</Link>
            <Link href="/writing">Writing</Link>
          </nav>
          <a href="mailto:hello@visionfx.studio" className="header-cta">Start a conversation</a>
        </div>
      </header>

      <main id="main" className="blog-index-main">
        <div className="blog-index-hero">
          <div className="content-frame">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              Writing &amp; Discussion
            </motion.p>
            <motion.h1
              className="blog-index-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, ease: easeOut, delay: 0.06 }}
            >
              Notes on modern web development &amp; engineering
            </motion.h1>
            <motion.p
              className="blog-index-sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: easeOut, delay: 0.12 }}
            >
              Frontend architecture, performance, reactive state, and full-stack craft.
            </motion.p>
          </div>
        </div>

        <div className="content-frame">
          {/* Category filter */}
          <motion.div
            className="blog-filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn${active === cat ? " blog-filter-btn--active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Post grid */}
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                className="blog-card"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: easeOut, delay: i * 0.06 }}
              >
                <Link href={`/writing/${post.slug}`} className="blog-card__link">
                  <MosaicThumb palette={post.palette} />
                  <div className="blog-card__body">
                    <p className="blog-card__category">{post.category}</p>
                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <div className="blog-card__footer">
                      <span className="blog-card__date">{post.date}</span>
                      <span className="blog-card__read">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <footer id="footer" className="site-footer">
        <div className="content-frame">
          <div className="footer-base" style={{ borderTop: "0.5px solid #3D372B", paddingTop: 28 }}>
            <p>© {new Date().getFullYear()} Andrei. All rights reserved.</p>
            <p className="footer-meta">Built with care · Last updated <time dateTime="2026-08">August 2026</time></p>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">ANDREI</div>
      </footer>
    </div>
  );
}

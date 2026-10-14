import React from "react";
import { formatDate, postPath, posts, type Post } from "../data/writing";

export const categories = ["All", ...Array.from(new Set(posts.map(post => post.category)))];

function WritingHeader() {
  return <header className="site-header writing-header" data-theme="dark"><a className="skip-link" href="#main">Skip to content</a><div className="site-header__inner">
    <a href="/" className="brand-link" aria-label="Andrei home"><span className="wordmark"><span className="wordmark__text">ANDRE</span><span className="wordmark__i">I</span></span></a>
    <nav className="desktop-nav" aria-label="Primary navigation"><a href="/#projects">Projects</a><a href="/writing" aria-current="page">Writing</a></nav><a href="mailto:hello@visionfx.studio" className="header-cta">Start a conversation</a>
  </div></header>;
}

function WritingFooter() {
  return <footer className="site-footer"><div className="content-frame"><div className="footer-base" style={{ borderTop: "0.5px solid #3D372B", paddingTop: 28 }}><p>© 2026 Andrei. All rights reserved.</p><p className="footer-meta"><a href="/rss.xml">RSS feed</a> · Updated <time dateTime="2026-10-14">October 14, 2026</time></p></div></div><div className="footer-wordmark" aria-hidden="true">ANDREI</div></footer>;
}

function Mosaic({ palette, hero = false }: { palette: string[]; hero?: boolean }) {
  return <div className={hero ? "blog-post__mosaic" : "blog-card__mosaic"} aria-hidden="true">{Array.from({ length: hero ? 30 : 15 }, (_, index) => <div key={index} style={{ backgroundColor: palette[(index * 7 + Math.floor(index / 3)) % palette.length] }} />)}</div>;
}

export function WritingCard({ post }: { post: Post }) {
  return <article className="blog-card"><a href={postPath(post)} className="blog-card__link"><Mosaic palette={post.palette} /><div className="blog-card__body"><p className="blog-card__category">{post.category}</p><h2 className="blog-card__title">{post.title}</h2><p className="blog-card__excerpt">{post.excerpt}</p><div className="blog-card__footer"><time className="blog-card__date" dateTime={post.published}>{formatDate(post.published)}</time><span className="blog-card__read">{post.readTime}</span></div></div></a></article>;
}

export function WritingIndexPage({ active = "All", onCategoryChange }: { active?: string; onCategoryChange?: (category: string) => void }) {
  const filtered = active === "All" ? posts : posts.filter(post => post.category === active);
  return <div className="site-shell"><WritingHeader /><main id="main" className="blog-index-main"><div className="blog-index-hero"><div className="content-frame"><p className="eyebrow">Writing &amp; development notes</p><h1 className="blog-index-title">Useful notes for building better websites.</h1><p className="blog-index-sub">Practical guides to React, TypeScript, accessibility, and deployment—plus a closer look at the projects behind this portfolio.</p></div></div><div className="content-frame"><div className="blog-filters" role="group" aria-label="Filter articles by topic">{categories.map(category => <button key={category} type="button" aria-pressed={active === category} className={`blog-filter-btn${active === category ? " blog-filter-btn--active" : ""}`} onClick={() => onCategoryChange?.(category)}>{category}</button>)}</div><p className="writing-result-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p><div className="blog-grid">{filtered.map(post => <WritingCard key={post.slug} post={post} />)}</div></div></main><WritingFooter /></div>;
}

export function WritingArticlePage({ post }: { post: Post }) {
  const related = [...posts.filter(item => item.slug !== post.slug && item.category === post.category), ...posts.filter(item => item.slug !== post.slug && item.category !== post.category)].slice(0, 2);
  return <div className="site-shell"><WritingHeader /><main id="main" className="blog-post-main"><div className="content-frame"><a href="/writing" className="blog-post__back">← All writing</a></div><article>
    <header className="blog-post__header"><div className="blog-post__header-inner"><p className="eyebrow">{post.category}</p><h1 className="blog-post__title">{post.title}</h1><p className="blog-post__date">By Andrei · <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readTime}</p>{post.updated !== post.published && <p className="blog-post__date writing-updated">Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></p>}<p className="writing-deck">{post.excerpt}</p></div></header>
    <div className="blog-post__mosaic-wrap"><Mosaic palette={post.palette} hero /></div><div className="blog-post__body">
      {post.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{post.project && <p><a href={post.project.href} target="_blank" rel="noopener noreferrer">Explore the {post.project.name} live project ↗</a></p>}
      <aside className="writing-takeaways" aria-labelledby="takeaways"><h2 id="takeaways">What to take away</h2><ul>{post.takeaways.map(item => <li key={item}>{item}</li>)}</ul></aside>
      <nav className="writing-toc" aria-label="On this page"><p>On this page</p><ol>{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol></nav>
      {post.sections.map(section => <section key={section.id} aria-labelledby={section.id}><h2 id={section.id}>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{section.code && <figure className="writing-code"><figcaption>{section.code.language.toUpperCase()} · illustrative example</figcaption><pre tabIndex={0} aria-label={`${section.code.language} example for ${section.heading}`}><code>{section.code.text}</code></pre></figure>}</section>)}
      <section className="writing-sources" aria-labelledby="sources"><h2 id="sources">Sources &amp; further reading</h2><p>Primary documentation and project references. Technical details can vary by version; check the documentation for the tools you deploy.</p><ul>{post.sources.map(source => <li key={source.href}><a href={source.href}>{source.title}</a></li>)}</ul></section>
    </div></article><section className="writing-related content-frame" aria-labelledby="related-title"><h2 id="related-title">Keep reading</h2><div className="blog-grid">{related.map(item => <WritingCard key={item.slug} post={item} />)}</div><a href="/writing" className="blog-post__back">← Back to Writing</a></section></main><WritingFooter /></div>;
}

import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { posts } from "./BlogIndex";

const easeOut = [0.23, 1, 0.32, 1] as const;

function MosaicHero({ palette }: { palette: string[] }) {
  const blocks = [
    { col: "1 / 2", row: "1 / 3", color: palette[0] },
    { col: "2 / 4", row: "1 / 2", color: palette[3] },
    { col: "4 / 6", row: "1 / 3", color: palette[1] },
    { col: "6 / 7", row: "1 / 2", color: palette[4] },
    { col: "2 / 3", row: "2 / 4", color: palette[2] },
    { col: "3 / 4", row: "2 / 3", color: palette[5] },
    { col: "3 / 5", row: "3 / 5", color: palette[0] },
    { col: "6 / 7", row: "2 / 4", color: palette[3] },
    { col: "1 / 2", row: "3 / 5", color: palette[4] },
    { col: "5 / 6", row: "3 / 4", color: palette[2] },
    { col: "5 / 7", row: "4 / 6", color: palette[1] },
    { col: "1 / 3", row: "5 / 6", color: palette[5] },
    { col: "3 / 5", row: "5 / 6", color: palette[3] },
    { col: "4 / 5", row: "3 / 4", color: palette[0] },
    { col: "2 / 3", row: "4 / 6", color: palette[2] },
  ];
  return (
    <div className="blog-post__mosaic">
      {blocks.map((b, i) => (
        <div key={i} style={{ gridColumn: b.col, gridRow: b.row, backgroundColor: b.color }} />
      ))}
    </div>
  );
}

const postContent: Record<string, React.ReactNode> = {
  "why-react-feels-slow": (
    <>
      <p>
        When a React app starts feeling sluggish, the instinct is to reach for{" "}
        <code>React.memo</code>, <code>useMemo</code>, and <code>useCallback</code>. I've done it,
        and I've watched dozens of engineers do it. It almost never fixes the actual problem —
        and sometimes it makes things measurably worse by adding overhead for cache invalidation
        that fires on every render anyway.
      </p>
      <p>
        The real issue is usually upstream: something is creating new object or function
        references on every render, causing child components to see "new" props and re-render
        unnecessarily. Memoization on the child treats the symptom. Stabilizing the parent's
        output treats the cause.
      </p>

      <h2>Read the profiler before you write any code</h2>
      <p>
        Open React DevTools, switch to the Profiler tab, and record five seconds of the
        interaction that feels slow. Sort the flame graph by "Render duration" descending.
        The component at the top of that list is your starting point — not the one you
        hypothesized about in the shower.
      </p>
      <p>
        Look specifically for components with high render counts relative to how much
        the UI is actually changing. A component that renders 200 times during a single
        user action, when the visible output only changes twice, is a signal that something
        upstream is recreating a reference on every event tick.
      </p>

      <h2>The three most common culprits</h2>
      <p>
        <strong>Inline object and array literals in JSX.</strong> Every render creates a new
        reference. <code>{"<Chart config={{ color: 'blue' }} />"}</code> passes a new{" "}
        <code>config</code> object every time the parent renders, regardless of whether the
        value changed. Move the definition outside the component or into a <code>useMemo</code>{" "}
        with a genuine dependency.
      </p>
      <p>
        <strong>Context with high-frequency values.</strong>{" "}
        <code>React.createContext</code> is a dependency injection tool, not a state manager.
        When you put mouse position, scroll depth, or form field state into a context, every
        subscriber re-renders on every change. For high-frequency state, keep it local or use an
        external store — Zustand and Jotai both expose atom-level subscriptions so components
        only re-render when their specific slice changes.
      </p>
      <p>
        <strong>Large unvirtualized lists.</strong> A 400-item list in development on an M3
        MacBook renders in milliseconds. On a mid-range Android device with a throttled CPU,
        it blocks the main thread long enough to miss frames. <code>@tanstack/react-virtual</code>{" "}
        renders only the rows in the viewport and a configurable overscan buffer. The integration
        is about 30 lines of code and the performance difference is not subtle.
      </p>

      <h2>Concurrent features are for user-perceived latency, not raw throughput</h2>
      <p>
        React 18's <code>useTransition</code> and <code>useDeferredValue</code> don't make
        rendering faster — they make your app feel faster by keeping the UI responsive during
        expensive updates. If a user types in a search box that triggers a filtered list
        re-render, wrapping the state update in <code>startTransition</code> lets React
        prioritize keeping the input responsive over completing the list update immediately.
      </p>
      <p>
        The mental model: urgent updates (user input, button presses) get priority. Non-urgent
        updates (derived UI, heavy re-renders) yield. The browser stays responsive and the
        perceived latency drops even if the total render time is unchanged.
      </p>
      <p>
        Profile first. Fix the upstream reference instability. Then reach for virtualization.
        Concurrent features come last — they're polish on top of a stable foundation, not a
        substitute for one.
      </p>
    </>
  ),

  "designing-systems-second-maintainer": (
    <>
      <p>
        Dan McKinley has a post called "Choose Boring Technology" that gets linked constantly
        in infrastructure discussions, but its core insight applies just as much to code
        architecture: every novel decision you make is a debt the next person has to pay
        to understand your system. The question isn't whether your clever abstraction
        is correct. It's whether the person debugging it at midnight six months from now
        will understand why it exists.
      </p>
      <p>
        I've inherited codebases that were clearly written by smart people — the abstractions
        were elegant, the patterns were consistent, the code worked. But there was no trace
        of the reasoning that produced those choices. Refactoring them was archaeology, not
        engineering.
      </p>

      <h2>Architecture Decision Records are the cheapest documentation you can write</h2>
      <p>
        An ADR is a short markdown file — typically under a page — that records a decision,
        the context that made it necessary, the options considered, and the one chosen.
        The format that works best for me: a <code>docs/decisions/</code> folder, files
        named <code>001-why-we-chose-postgres-over-planetscale.md</code>, committed alongside
        the code they describe.
      </p>
      <p>
        The value isn't the document itself. It's that writing it forces you to articulate
        the tradeoffs clearly enough that a stranger could follow them. If you can't explain
        the decision in a short document, you probably haven't thought it through completely —
        and neither will the person who has to live with it later.
      </p>

      <h2>Make constraints machine-checkable</h2>
      <p>
        Conventions require everyone to have read the same document and to remember it under
        pressure. Constraints make the wrong thing structurally hard to do. TypeScript's type
        system, ESLint rules, Prettier config, folder structure enforced by a custom lint rule —
        these are constraints that survive team turnover because they don't live in anyone's head.
      </p>
      <p>
        A practical example: if your codebase has a convention that API calls always go through
        a service layer rather than directly in components, enforce it with an ESLint rule that
        flags <code>fetch()</code> calls outside the <code>services/</code> directory. The
        convention is now a constraint. New engineers can't accidentally break it because the
        CI pipeline will tell them before the PR is reviewed.
      </p>

      <h2>Name things for the reader, not the author</h2>
      <p>
        The most persistent failure mode I see in growing codebases is naming that made
        sense during initial implementation. <code>handleData</code>,{" "}
        <code>processItem</code>, <code>doUpdate</code> — these names carry the cognitive
        load of the moment they were written, not the information a future reader needs.
      </p>
      <p>
        A useful heuristic: if you can't summarize what a function does in one sentence without
        using the words "handle," "process," or "manage," the name isn't doing its job. Names
        are the most-read documentation in any codebase. They're also the cheapest to improve —
        a rename is a two-second operation that pays dividends every time someone reads that file.
      </p>
      <p>
        Comments should explain intent, not implementation. The implementation is already in the
        code. What a future reader can't reconstruct is why a particular approach was taken over
        the obvious alternative. A comment that says{" "}
        <code>// We use setTimeout here because the CSS animation fires before the DOM update</code>{" "}
        is worth a hundred comments that restate what the next line does.
      </p>
    </>
  ),

  "postgres-indexes": (
    <>
      <p>
        Indexes are where Postgres performance is won or lost. Get them right and queries that
        should take milliseconds take milliseconds. Get them wrong — or skip them — and a
        table that's fast at 10,000 rows becomes slow at 1,000,000 in ways that surprise you
        in production.
      </p>
      <p>
        Here's what years of Postgres work has actually taught me. Not what the documentation
        says each index type does — what I reach for on real tables, and what I've abandoned.
      </p>

      <h2>Always index your foreign keys</h2>
      <p>
        This is the most common missing index I find in codebases I inherit, and it's a
        Postgres-specific trap: unlike MySQL, Postgres does not automatically create an index
        on foreign key columns. You have to do it yourself.
      </p>
      <p>
        If you're joining <code>orders</code> to <code>users</code> on <code>user_id</code>,
        and <code>user_id</code> has no index on the <code>orders</code> table, every join
        is a sequential scan. At small table sizes this is invisible. At hundreds of thousands
        of rows it becomes the query that starts appearing in your slow query log.
      </p>
      <p>
        Run this on any Postgres database you've inherited to find unindexed foreign keys —
        it's a standard query that cross-references <code>pg_constraint</code> and{" "}
        <code>pg_index</code> to find foreign key columns with no corresponding index entry.
        You'll almost always find at least one.
      </p>

      <h2>Partial indexes for filtered queries</h2>
      <p>
        A partial index includes a <code>WHERE</code> clause that restricts which rows are
        indexed. If you frequently query for active users, unprocessed jobs, or records in
        a specific state, a partial index is dramatically smaller and faster than a full
        index on the column.
      </p>
      <p>
        For example, if <code>status = 'pending'</code> represents 2% of a jobs table, a
        partial index on <code>(created_at) WHERE status = 'pending'</code> is 98% smaller
        than a full index on <code>created_at</code>, fits in buffer cache more easily, and
        is faster for the query it's designed to serve. The query planner will use it
        automatically when the <code>WHERE</code> clause matches.
      </p>

      <h2>Expression indexes for computed lookups</h2>
      <p>
        If your application queries <code>WHERE lower(email) = $1</code> for
        case-insensitive lookups, an index on <code>email</code> won't help — the planner
        has to evaluate <code>lower()</code> on every row. An expression index on{" "}
        <code>lower(email)</code> indexes the computed value directly, and the lookup
        becomes an index scan.
      </p>
      <p>
        The same applies to <code>date_trunc('day', created_at)</code> for day-level
        aggregations, <code>jsonb -&gt;&gt; 'key'</code> for JSONB field access, or any
        deterministic function you're filtering or sorting on. If it appears in a{" "}
        <code>WHERE</code> or <code>ORDER BY</code> clause and it's computed rather than
        stored, index the expression.
      </p>

      <h2>Covering indexes and the INCLUDE clause</h2>
      <p>
        A covering index — one that contains all the columns a query needs — lets the planner
        satisfy a query entirely from the index without touching the heap. Postgres 11 added
        the <code>INCLUDE</code> clause to add non-key columns to a B-tree index for exactly
        this purpose.
      </p>
      <p>
        If you have a query like <code>SELECT email, name FROM users WHERE status = 'active'</code>,
        an index on <code>(status) INCLUDE (email, name)</code> turns it into an index-only scan.
        No heap access, no visibility map checks — just the index. On large tables with frequent
        reads of this shape, the throughput difference is significant.
      </p>

      <h2>EXPLAIN ANALYZE is not optional</h2>
      <p>
        Don't guess whether an index is being used. Run{" "}
        <code>EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)</code> on your queries and read the
        output. Look for <code>Seq Scan</code> on large tables, high <code>rows=</code>{" "}
        estimates that diverge from actual row counts (a sign that statistics are stale),
        and buffer hits versus reads (a sign of cache pressure). The planner's cost estimates
        are only as good as the statistics <code>VACUUM ANALYZE</code> maintains.
      </p>
      <p>
        Every index has a write cost. Each insert, update, or delete on a table must update
        every index on it. Over-indexing degrades write throughput and increases table bloat.
        Index the queries you have evidence are slow — not the ones you imagine might be slow.
      </p>
    </>
  ),

  "boring-infrastructure": (
    <>
      <p>
        There's a predictable lifecycle to how engineering teams relate to their
        infrastructure choices. Early on, everything is green field. You pick the database
        that just announced general availability, the orchestration layer with the
        best developer experience demo, the caching tier that's been getting buzz on
        Hacker News. You ship fast.
      </p>
      <p>
        Then production happens. The new database has a subtle replication bug that only
        manifests under write contention. The orchestration layer's API breaks in a point
        release and half your Helm charts stop working. The caching tier's eviction
        behavior under memory pressure isn't documented anywhere accessible. You spend
        a weekend fixing things that should have been solved years ago.
      </p>
      <p>
        This is not a story about incompetence. It's a story about operational maturity —
        and how it accrues in a technology over years of production use in ways that aren't
        visible from the outside.
      </p>

      <h2>What "boring" actually means</h2>
      <p>
        Dan McKinley's original framing is useful: boring technology is technology that
        has accumulated a body of knowledge about how it fails. Postgres doesn't fail
        in novel ways anymore. When it fails, the failure mode is known, there's a Stack
        Overflow answer for it, there's a runbook for it, and half the people on your team
        have seen it before. That's not a limitation — it's a competitive advantage.
      </p>
      <p>
        Novel technology fails in novel ways. When it does, you're the one writing the
        Stack Overflow question, not reading the answer. You're the one reverse-engineering
        the behavior from source code at 2am, not the one with an on-call runbook. The cost
        of novelty is invisible in development and paid entirely in production.
      </p>

      <h2>Optimize for MTTR, not MTBF</h2>
      <p>
        Mean Time Between Failures and Mean Time To Recovery are both real metrics, but they
        have different leverage points. MTBF is partly a function of the technology you choose.
        MTTR is almost entirely a function of your team's familiarity with it.
      </p>
      <p>
        A team that knows Postgres deeply will recover from a replication lag incident in
        20 minutes because they've seen it, they know exactly which metrics to look at,
        and they know which <code>pg_stat_replication</code> query tells them what's happening.
        The same team facing an unfamiliar distributed database for the first time might spend
        four hours doing the same work.
      </p>
      <p>
        Boring technology reduces MTTR because the operational knowledge is already in your team.
        That's worth more than the marginal technical advantage of the novel alternative in
        most cases.
      </p>

      <h2>Where to spend your novelty budget</h2>
      <p>
        The argument for boring infrastructure is not an argument for stagnation. It's an
        argument for spending your engineering experimentation budget where it has the highest
        return. Your users don't care what database you're running. They care whether the
        product solves their problem.
      </p>
      <p>
        Be boring at the infrastructure layer — Postgres, Redis, S3, a managed Kubernetes
        service from your cloud provider. Be adventurous at the product layer — new UI
        patterns, novel features, differentiated user experience. That's where your users
        will notice and where your engineering judgment has a direct impact on outcomes.
      </p>
      <p>
        The managed service question is a subset of this: paying for RDS instead of running
        Postgres yourself is not laziness, it's buying back operational time to spend on
        things that actually differentiate your product. The tradeoff is real and the math
        usually favors managed services at every stage except very large scale.
      </p>
    </>
  ),

  "senior-frontend-review": (
    <>
      <p>
        Most developers early in their careers approach code review as a correctness check.
        Does this function return the right value? Are the edge cases handled? Is there a
        test? These are all necessary questions, but they're not what makes a review useful.
        By the time code reaches review, it should already be correct — that's the author's job.
      </p>
      <p>
        What I actually look for when reviewing frontend code is a different set of questions
        entirely — and most of them are about what happens six months from now, not whether the
        feature works today.
      </p>

      <h2>What does the component's contract communicate?</h2>
      <p>
        A component's props interface is its API. I read it the same way I'd read a function
        signature: does it express intent clearly? Are required props actually required?
        Are optional props optional because they have sensible defaults, or optional because
        the author wasn't sure whether to include them?
      </p>
      <p>
        Prop naming matters more than most developers realise. A prop named <code>data</code>{" "}
        is a missed opportunity — <code>transactions</code> or <code>userProfiles</code> tells
        the next engineer what shape to expect without opening the component. Boolean props
        named with nouns (<code>disabled</code>, <code>loading</code>) are clearer than those
        named with verbs (<code>isLoading</code> is fine, but <code>shouldDisable</code> makes
        me read the implementation to understand what it actually controls).
      </p>

      <h2>How does it fail?</h2>
      <p>
        The happy path is easy to read and usually well-tested. I spend most of my review time
        on failure states. What renders when the API call fails? What does the component show
        while data is loading? What happens if the array is empty? What if a required string
        is unexpectedly <code>null</code>?
      </p>
      <p>
        Empty states and error states are not edge cases — they're the states your users see
        constantly on slow connections, partial failures, and first visits. A component that
        handles only the happy path is half-built. If I don't see an error boundary in a
        subtree that makes network calls, that's a comment.
      </p>

      <h2>What's the bundle impact?</h2>
      <p>
        Frontend engineers often treat bundle size as someone else's problem until a Lighthouse
        audit surfaces it. I look for it in review: a new dependency added to handle a task
        that could be done with a native browser API, a barrel import from a large library
        when only one function is needed, a dynamic import that would be better served as
        a static one given the usage pattern.
      </p>
      <p>
        The specific questions: does this import tree-shake? Is this dependency already in the
        bundle for another reason? Could this be solved with a 10-line utility function instead
        of a 40kb package? These aren't pedantic questions — they're the difference between
        a 200kb and 250kb initial bundle, which is real load time on real devices.
      </p>

      <h2>Is the abstraction earning its complexity?</h2>
      <p>
        I'm much more likely to ask "could we inline this?" than "why isn't this abstracted?"
        Premature abstraction is harder to undo than duplication. Two components that share
        70% of their logic can be refactored when the pattern is clear. An abstraction that
        was created too early tends to grow prop-drilling and escape hatches that make it
        harder to change than the original duplication would have been.
      </p>
      <p>
        The rule of three is a reasonable heuristic: the first time you write something, write
        it inline. The second time, note the duplication. The third time, extract it —
        and by then you understand the actual shape of the abstraction because you've seen
        three concrete examples of it.
      </p>
      <p>
        The best comment I received in a PR review was two words: "what's next?" It asked me
        to think about how the next feature request would interact with what I'd just built.
        I've used it in almost every review since.
      </p>
    </>
  ),
};

export default function BlogPost() {
  const [, params] = useRoute("/writing/:slug");
  const slug = params?.slug ?? "";
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="site-shell">
        <div style={{ padding: "160px 24px", textAlign: "center" }}>
          <p>Post not found.</p>
          <Link href="/writing">← Back to Writing</Link>
        </div>
      </div>
    );
  }

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

      <main id="main" className="blog-post-main">
        <div className="content-frame">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.26, ease: easeOut }}
          >
            <Link href="/writing" className="blog-post__back">
              <ArrowLeft size={14} aria-hidden="true" />
              <span>All posts</span>
            </Link>
          </motion.div>
        </div>

        <div className="blog-post__header">
          <div className="blog-post__header-inner">
            <motion.p
              className="eyebrow"
              style={{ textAlign: "center", marginBottom: 28 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: easeOut }}
            >
              {post.category}
            </motion.p>
            <motion.h1
              className="blog-post__title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: easeOut, delay: 0.06 }}
            >
              {post.title}
            </motion.h1>
            <motion.p
              className="blog-post__date"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28, ease: easeOut, delay: 0.14 }}
            >
              {post.date} · {post.readTime}
            </motion.p>
          </div>
        </div>

        <motion.div
          className="blog-post__mosaic-wrap"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.48, ease: easeOut, delay: 0.18 }}
        >
          <MosaicHero palette={post.palette} />
        </motion.div>

        <motion.article
          className="blog-post__body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.28 }}
        >
          {postContent[post.slug] ?? <p>Content coming soon.</p>}
        </motion.article>

        <div className="blog-post__footer-nav content-frame">
          <Link href="/writing" className="blog-post__back">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to Writing</span>
          </Link>
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

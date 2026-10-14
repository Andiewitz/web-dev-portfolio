# Portfolio writing

Article content and metadata live in `client/src/data/writing.ts`. The five existing article paths are retained, and the Comfort Pro and Elevate Health development case studies are added. Dates from the existing posts are preserved; October 14, 2026 is the actual rewrite date. Reading times are calculated from the article text and illustrative code.

`WritingPages.tsx` renders the same content in the browser and during the build. `scripts/prerender-writing.tsx` creates HTML for `/writing` and every article, plus `sitemap.xml`, `robots.txt`, and an RSS feed. Articles are readable in the initial response without JavaScript. Browser category filtering progressively enhances the index.

The canonical production origin is declared in `client/src/data/seo.ts`: `https://web-dev-portfolio-swart.vercel.app`, matching the repository's GitHub homepage. Update that value and the fallback metadata in `client/index.html` when moving to a custom domain. Vercel rewrites writing routes to their generated HTML, rather than the homepage document. The Express server follows the same behavior.

Run `pnpm check`, `pnpm build`, and `pnpm check:writing` with the pinned pnpm 10 package manager. The last check validates the built pages' initial content, metadata, article schema, anchors, sitemap, RSS, and social image. The social PNG is a raster export of the included code-native `client/public/writing-cover.svg`.

Case studies describe observable source implementation and link to the user's supplied live project URLs. They do not invent lead, revenue, ranking, performance, or treatment results. Technical guides link to primary documentation and label examples as illustrative. Search metadata supports discovery; indexing and ranking are not guaranteed.

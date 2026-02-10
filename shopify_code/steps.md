# Blog Post Page (Elizabeth Ross) – Implementation Notes

This document captures the steps, decisions, and checks followed to complete the blog post page per the Figma and Notion specs. It also lists what to configure in Shopify and how to validate before shipping.

## 1) Discovery and planning
- Reviewed the Figma and Notion requirements for desktop, tablet, and mobile.
- Identified all required sections: Table of Contents, Share, Author card, Related Products, You May Also Like (YMAL).
- Agreed on metafields needed to control content per post (author info, related products, and YMAL tag).

## 2) Files updated (theme)
- templates/article.elizabeth-ross.json
- sections/main-article-elizabeth-ross.liquid
- assets/section-article-elizabeth-ross.css
- assets/article-elizabeth-ross.js

## 3) Metafields (Shopify Admin → Settings → Custom data → Blog posts)
- custom.related_products: Type “List” of Product (used to render Related Products).
- custom.author_avatar: Type “File” (author circular avatar).
- custom.author_bio: Type “Text” (collapsible author bio).
- custom.ymal_tag: Type “Text” (optional; filters YMAL by article tags).

## 4) Liquid section structure
- Read metafields directly via `article.metafields.custom`.
- Related Products: iterate list (`.value` or `.references`) with fallbacks and render custom card UI; show “EXCLUSIVE” badge if product has tag; ratings shown if reviews metafields exist.
- YMAL: pull recent posts from the same blog; filter by `ymal_tag` when provided; 3-up grid on desktop/tablet, mobile slider with card peek.
- Author card: header with avatar + name; collapsible bio with “Learn More / Show Less”.
- TOC: auto-generated from H2/H3 in the article content (IDs assigned if missing).
- Share: visible in left column and under author, with inline SVG icons.

## 5) CSS (section-article-elizabeth-ross.css)
- Global variables for spacing, colors, and typography tokens.
- 3-column grid layout (left/center/right) for desktop; responsive collapse to single column on ≤1024px.
- Related Products: custom Figma card styles; hidden on tablet/mobile per design.
- YMAL desktop/tablet (no slider): `grid-template-columns: repeat(3, 1fr)`.
- YMAL mobile (slider): unset template columns; use `grid-auto-flow: column; grid-auto-columns: 92%` with scroll-snap, and mobile card typography tightening to prevent overflow.
- Mobile font match (scoped): force headings and body fonts inside `.erf-article` to match desktop families (no `:root`/`html`/`body` selectors).

## 6) JavaScript (article-elizabeth-ross.js)
- TOC builder: scan `#erf-article-content` for H2/H3; assign IDs and render links.
- Author bio toggle: clamp to N lines via CSS variable; toggle class and button text.
- YMAL controls: bind prev/next buttons only on mobile; cleanly rebind listeners on resize.

## 7) Theme settings (in schema)
- Hero height, title alignment, TOC toggles, author card lines.
- Related Products: enable/disable, heading, max items.
- YMAL: enable/disable, heading, CTA text, limit.
- Mobile order option: place RP above YMAL (kept hidden on mobile per Figma).
- Bottom back link toggle and text.

## 8) Content setup (for each blog post)
- Set custom.author_avatar (file), custom.author_bio (text).
- Set custom.related_products (list of published products).
- Optionally set custom.ymal_tag (string) to filter YMAL by tag.
- Ensure referenced products are published to appear.

## 9) QA checklist
- Desktop: 
  - YMAL shows 3 cards (no slider).
  - Related Products visible in right column; badges/ratings appear when present.
  - Author avatar + bio toggle works; Share visible in left and under author.
  - TOC renders from H2/H3 anchors.
- Tablet:
  - Same as desktop (YMAL 3-up).
  - Related Products hidden per Figma.
- Mobile:
  - YMAL slider shows one full card with a peek of next/prev; controls work.
  - Related Products hidden (as per design).
  - Fonts match desktop appearance within the article scope (headings/body).
  - Author bio clamps to 2 lines, expands/collapses correctly.

## 10) Notes and housekeeping
- Sample blog posts were added for design verification; please remove and replace with the client’s approved posts.
- If YMAL shows fewer than 3, verify tags and limit; if `ymal_tag` is set, target posts must include the tag.
- If Related Products shows empty, verify metafield values and product publish status.

## 11) Caching / preview
- If changes don’t appear, hard refresh or append a cache-buster to the preview URL (e.g., `?v=blog-erf`).

## 12) Next steps
- Review spacing/typography against Figma on real devices.
- Confirm final copy and imagery.
- Provide any requested micro-adjustments (spacing, line heights, truncation, tag filters).

## Preview link
- [Add preview link here]
Please review and let me know if any modifications are needed; I will update promptly.
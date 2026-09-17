# Visual Refresh — Subagent Task Checklist

> Source plan: `plan.md`
> Scope: **presentation only** — layout, motion, hierarchy, responsive polish. Reuse existing content.
> Active app: Vite/React (`src/main.jsx`, `src/App.jsx`, `src/components/*.jsx`, `src/index.css`).
> Ignore legacy root files: `index-static.html`, `styles.css`, `script.js`.

## How to use this checklist

- Work top-to-bottom. Check off each `[ ]` as `[x]` only after the item is implemented **and** verified.
- Do not start a phase until the previous phase's build check passes.
- If a decision changes the plan, note it inline under the relevant item instead of silently diverging.
- Run `npm run build` at the end of every phase; full validation is in Phase 9.

---

## Phase 0 — Reconnaissance (read before editing)

- [ ] Read `src/App.jsx` and note current main/sidebar composition.
- [ ] Read `src/components/Hero.jsx`, `FeaturedRepos.jsx`, `RepoGrid.jsx`, `RepoCard.jsx`.
- [ ] Read `src/index.css` and note current section boundaries (target: refactor into 11 labeled sections).
- [ ] Read `index.html` to confirm where font `<link>`/preconnect tags must go.
- [ ] Read `src/config.js` and `src/repos-data.json` to confirm the tolerated missing repo; **do not change data**.
- [ ] Confirm `public/assets/images/` contains only `profile-placeholder.JPG` and `repos/repo-placeholder.JPG`.
- [ ] Confirm the Vite base path in `vite.config.js` / Pages workflow stays untouched.

---

## Phase 1 — Page hierarchy (`src/App.jsx`)

- [ ] Replace main/sidebar composition with a single vertical flow: **Hero → Featured repositories → All repositories**.
- [ ] Keep all sections inside the shared max-width container (~`1180px`).
- [ ] Add a reusable `section-heading` row so headings + visual rules align consistently.
- [ ] Featured section = wide **two-column grid** on desktop (not one long stack).
- [ ] All-repositories section = full-width responsive grid: **3 / 2 / 1** columns (wide / tablet / small phone).
- [ ] Remove sticky-sidebar behavior entirely (no leftover `position: sticky` sidebar wrapper).
- [ ] Preserve existing section titles and intro copy verbatim — no new explanatory copy.
- [ ] Wire semantic `aria-labelledby` from each `<section>` to its heading `id` where convenient.

**Phase 1 build check:** `npm run build` passes.

---

## Phase 2 — Hero (`src/components/Hero.jsx` + hero CSS)

- [ ] Convert hero from small boxed card to an open, spacious banner with a large rounded surface and soft inner highlight.
- [ ] Add an absolutely positioned aurora glow **clipped within** the hero surface.
- [ ] Desktop: image left, text/actions right.
- [ ] Avatar sized ~**112–124px** so the name is the dominant element.
- [ ] Add a decorative accent/orbit element around/behind the avatar via CSS; mark decorative DOM `aria-hidden="true"`.
- [ ] Replace the external LinkedIn `<img>` (Iconify) with a small **inline SVG** matching button color/hover.
- [ ] Add a matching **inline GitHub icon** to the GitHub action for balance.
- [ ] Style GitHub as bright primary action; LinkedIn as quiet translucent/outlined secondary.
- [ ] Preserve exact current text and URLs.
- [ ] Action hit targets ≥ **44px** tall.
- [ ] Keyboard focus rings clearly visible on both actions.

**Phase 2 build check:** `npm run build` passes.

---

## Phase 3 — Featured cards (`src/components/FeaturedRepos.jsx` + CSS)

- [ ] Keep fields: name, language, description, README preview, repo link, star count — **no new fields/prose**.
- [ ] Add subtle top accent line or corner glow, deterministically varied by card index (CSS custom property/class).
- [ ] Consistent card structure + minimum height so the two-column grid aligns.
- [ ] README area becomes a styled "code/document preview" panel: small header treatment, softer inset surface, custom thin scrollbar, fixed/max height ~**190–220px**.
- [ ] Add top/bottom **fade masks** so clipped/scrollable README content feels intentional.
- [ ] Do not delete or rewrite README content.
- [ ] Sanitize Markdown overflow: constrain images to panel, make tables horizontally scrollable, wrap long links/code where safe, keep `<pre>` code horizontally scrollable.
- [ ] Pin card footer to the bottom.
- [ ] External-link arrow gets a small translate animation on hover/focus.
- [ ] Pass map index into styling (e.g. `style={{ "--card-index": index }}`) for subtle staggered entrance; layout must not depend on repo data.
- [ ] Heading levels: `h2` for section heading, `h3` for card names.

**Phase 3 build check:** `npm run build` passes.

---

## Phase 4 — Repository tiles (`src/components/RepoCard.jsx`, `RepoGrid.jsx` + CSS)

- [ ] Preserve support for a real screenshot at the existing `repos/` path if one is later added.
- [ ] On image error: **stop** swapping to `repo-placeholder.JPG`.
- [ ] On image error: switch preview to a CSS-generated abstract cover (layered gradients + fine grid + small inline repo/code glyph).
- [ ] Derive **4–6 deterministic** accent variants from repo name or map index — **no `Math.random()`** at render time.
- [ ] Compact/scan-friendly card; clamp descriptions to ~3 lines with `line-clamp`; keep full text in DOM/title if useful.
- [ ] Whole tile feels interactive with valid semantics: stretch existing repo anchor over the card OR wrap only permitted content — **no nested interactive elements**.
- [ ] Add compact external-arrow glyph; animate a few px on hover.
- [ ] `RepoGrid` passes index/custom property for stagger timing and fallback-cover variants.
- [ ] Equal-height rows; pin link to card bottom.

**Phase 4 build check:** `npm run build` passes.

---

## Phase 5 — Stylesheet refactor (`src/index.css`)

- [ ] Refactor into clearly labeled sections, in this order:
  - [ ] 1. Font import and design tokens
  - [ ] 2. Reset/base styles
  - [ ] 3. Ambient page background
  - [ ] 4. Shared container/section headings
  - [ ] 5. Hero
  - [ ] 6. Buttons and focus styles
  - [ ] 7. Featured grid/cards/Markdown viewport
  - [ ] 8. Repository grid/cards/generated fallback covers
  - [ ] 9. Motion
  - [ ] 10. Responsive rules
  - [ ] 11. Reduced-motion and accessibility overrides

### Tokens & base

- [ ] Define tokens (adjust during QA if needed):
  - [ ] Background `#08090d`
  - [ ] Elevated background `#0e1017`
  - [ ] Card surface `rgba(18, 20, 29, 0.82)`
  - [ ] Strong text `#f4f5f8`
  - [ ] Muted text `#969baa`
  - [ ] Accent `#8b7cff`
  - [ ] Secondary accent `#55d6e8`
  - [ ] Hairline border `rgba(255, 255, 255, 0.08)`
  - [ ] Container width ~`1180px`
  - [ ] Radius scale `10px / 16px / 24px`
- [ ] `color-scheme: dark`, smooth font rendering, tasteful selection color, consistent custom scrollbars.
- [ ] `min-height: 100%` + `overflow-x: clip` used safely; do **not** hide legitimate horizontal overflow inside code/table previews.
- [ ] Use `clamp()` for hero title, section spacing, responsive padding.

### Fonts

- [ ] Load **Manrope** (display/body) + **IBM Plex Mono** (mono accent) via `<link>` + preconnects in `index.html`.
- [ ] Provide robust system fallbacks.
- [ ] Mono used only for small labels/language badges — not body copy.

### Ambient background

- [ ] Ambient glow built with fixed/pseudo elements using `pointer-events: none` and low opacity.
- [ ] Must not lower text contrast.

### Interaction & motion

- [ ] `:focus-visible` states for **every** link/control — never hover-only.
- [ ] Transitions defined narrowly (`transform`, `border-color`, `background-color`, `box-shadow`, `opacity`); **no `transition: all`**.
- [ ] Single short easing curve; durations ~**160–300ms**.
- [ ] One-time `fade-up` entrance for hero and cards; translation < ~**12px**.
- [ ] `@media (prefers-reduced-motion: reduce)`: disable entrance animations, transforms, and smooth scrolling/transitions.
- [ ] Readable contrast for muted text and badges against all surfaces.

**Phase 5 build check:** `npm run build` passes.

---

## Phase 6 — Responsive behavior

Tune at **1440px, 1024px, 768px, 430px, 320px**.

- [ ] Above ~1000px: featured = 2 cols, repositories = 3 cols.
- [ ] Tablet widths: both grids = 2 cols where space permits; hero spacing tightens.
- [ ] Below ~680px: hero single-column, preferably left-aligned (not a generic centered profile card); buttons may wrap or go full-width on very narrow screens.
- [ ] Below ~520px: both grids = 1 col; card padding + section gaps reduce slightly.
- [ ] Long repo names, URLs, Markdown code blocks, and tables never cause page-level horizontal scrolling.
- [ ] Avatar stays visually balanced; does not consume most of the first viewport on mobile.

**Phase 6 build check:** `npm run build` passes.

---

## Phase 7 — Scope guard (must remain true)

Confirm **none** of the following were added/changed:

- [ ] No About / Experience / Skills / Contact / footer copy / testimonials / stats / search / filtering / theme switching / navigation sections.
- [ ] Existing descriptions and README content not rewritten.
- [ ] `scripts/fetch-repos.js`, `src/repos-data.json`, `src/config.js`, `.github/workflows/deploy.yml`, Vite base path untouched.
- [ ] No UI framework, animation package, icon package, or component library added.
- [ ] No stock photography or fabricated project screenshots.
- [ ] `dist/` not hand-edited (build regenerates it).
- [ ] Legacy root static files not edited.

---

## Phase 8 — Documentation (`README.md`)

- [ ] Briefly state the active site is the React/Vite app.
- [ ] Identify `src/index.css` as the visual theme source.
- [ ] Clarify root static files are legacy (or note removal in a separate cleanup).
- [ ] Do **not** add portfolio content to the README.

---

## Phase 9 — Validation

### Build & run

- [ ] `npm run build` — no warnings or errors.
- [ ] `npm run dev` — site loads, no runtime console errors.

### Behavior

- [ ] GitHub Pages asset paths still resolve under `/LaishGlenberg/`.
- [ ] Hero links and every repo link keep correct URL + open behavior.
- [ ] Real repo screenshots render when present; missing screenshots show generated fallback with **no repeated error loops**.
- [ ] No horizontal overflow at **320px**.
- [ ] Featured README panels contain wide tables/code instead of expanding the page.
- [ ] Keyboard tab order is logical; focus rings clearly visible.
- [ ] Reduced-motion mode removes entrance and hover movement.
- [ ] Hover effects do not cause neighboring content to reflow.

### Evidence

- [ ] Capture before/after screenshots at desktop and mobile widths.
- [ ] Record the viewport widths used for responsive checks: `1440 / 1024 / 768 / 430 / 320`.

---

## Definition of done

- [ ] Page reads as one coherent, polished dark midnight/aurora gallery.
- [ ] Distinctive but restrained hero.
- [ ] Featured work clearly separated; full-width repository grid easy to scan.
- [ ] Graceful generated fallbacks replace repeated placeholder art.
- [ ] Smooth, purposeful micro-interactions.
- [ ] Strong mobile behavior.
- [ ] No substantive new portfolio content added.

---

## Notes / divergences

_Record any deviation from `plan.md`, blockers, or follow-ups here._

- (reserved)

# Spec — White Portfolio Redesign

**Status:** proposed, awaiting approval
**Date:** 2026-10-21
**Scope:** full visual rebuild of the site. Stack, data and links stay.

## 1. Goal

Make the site look like the work of a designer, not a generated portfolio.

Success is judged in this order:

1. It looks finished with motion switched off.
2. It reads as one direction, not a kit of components.
3. Motion is noticeable, smooth and never in the way.
4. Placeholder content is obviously swappable, and swapping it does not break the layout.

**Definition of done:** the skill gate (`lint.mjs`, `inspect.mjs` at 1440 / 768 / 390) has no
unexplained FAILs, every screenshot has been looked at, and the last critique round scores >= 7.5
overall. Real content and real media are explicitly out of scope for this pass.

## 2. Non-goals

- Real copy, real screenshots, real video. Placeholders now, media swap later.
- Per-project routes. One page, project spreads with anchor links.
- Dark mode, CMS, backend, contact form, analytics.
- New UI dependencies. React + Vite only; `marked` is removed.
- Migrating the data pipeline. `repos-data.json` and `fetch-repos.js` stay as they are.

## 3. Direction

**Working name: "Gallery wall".** A white room, black type, work hung on it. The only ornament is
motion. Type does the design work: one enormous line per screen, one small text size, nothing in
between. Pictures are the only colour on the page.

References are the discipline of Figma's site and Swiss editorial portfolios, not their branding.
No accent colour, no gradients, no borders, no shadows, no icons, no pills, no numbered labels, no
monospace outside literal code.

The skill's `draw.mjs` is run once with `--keep palette` (white/black is fixed by the brief) to deal
the type system and section compositions. The layout below is the baseline; the deal may improve it,
and every redraw gets a stated reason.

## 4. Design system

### Type — one family

**Instrument Sans** (Google Fonts, variable). Neutral grotesque with more character than Inter and
better display behaviour than Manrope. Fallback stack: `"Helvetica Neue", Arial, sans-serif`.
Weights 400 and 500 only.

| Role | Size | Leading | Tracking |
| --- | --- | --- | --- |
| Display (h1) | `clamp(3.25rem, 9vw, 8.5rem)` | 0.92 | -0.045em |
| Section title (h2) | `clamp(2rem, 4.5vw, 4rem)` | 0.98 | -0.03em |
| Project title (h3) | `clamp(1.6rem, 3vw, 2.75rem)` | 1.0 | -0.02em |
| Body | 17px / 16px mobile | 1.6 | 0 |
| Small (meta, captions) | 14px | 1.45 | 0 |

Five sizes total. Statements are `<p>` at <= 32px. Numbers use `font-variant-numeric: tabular-nums`.
Measure capped at 62ch. Left-aligned everywhere; nothing centred.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#ffffff` | page ground |
| `--ink` | `#0b0b0c` | text, buttons, footer ground |
| `--muted` | `#707070` | secondary text only (5.6:1) |
| `--wash` | `#f3f3f1` | hover bands, one quiet field |

No accent. Links are ink with a real hover/focus state. Surfaces are separated by whitespace and tone
steps, never lines or shadows. Corners are square.

### Frame and grid

- Max content width 1280px; outer margins `clamp(20px, 4vw, 56px)`, equal on both sides.
- 12-column concept, 24px gutter, text blocks share three left edges on the whole page.
- Section gap 160–220px desktop, 72–96px mobile.
- Media may bleed to one margin edge, never arbitrarily.
- Section rhythm: hero (full height) / work (5 spreads) / about / index / footer.

## 5. Page architecture

1. **Skip link** (visually hidden until focused).
2. **Nav** — wordmark left, `Work / About / Contact` right. Plain, static, no bar, no blur, one
   underline-on-hover treatment. No button.
3. **Hero** — min-height `100svh`, asymmetric 12-col:
   - `h1` "Laish Glenberg" at display size, cols 1–8.
   - Supporting sentence at 20px, cols 1–5: what he does, plainly. This also satisfies the
     "name-only title" check.
   - Portrait, 3:4, cols 9–12, offset down.
   - Actions: `See the work` (solid ink, square) + `GitHub` (text link with arrow).
   - One small fact line: `Tempe, AZ · M.S. Computer Science, ASU`.
4. **Selected work** — heading + five `<article>` spreads, each with a heading, one-line description,
   meta (stack/year), real link and 16:10 media. Five distinct compositions, no two neighbours alike:
   1. title full-width, media full-width below;
   2. media 60% left, title + copy right;
   3. title left, copy right, media offset right below;
   4. media small and offset, title large and low;
   5. full-bleed media, caption row beneath.
   Projects and their real one-liners come from `README.md` (exa-cli, pi-command-cli,
   firebase-emulator-mcp, find-open-seats-python, termai) so no copy is invented.
5. **About** — 2-column: heading left; a 28–32px paragraph right plus three fact rows
   (Focus / Currently / Elsewhere). One section, no cards.
6. **All repositories** — heading, plain-text language filter row, then the 23 repos as a list:
   row = name (500) + description (muted, hidden when missing) + language + stars. Hover paints the
   row `--wash` and moves the arrow. Mobile stacks name over meta. No card grid.
   The filter is the page's one live thing: real data, keyboard accessible, works without motion.
7. **Footer** — black field, name repeated at display size, email, GitHub, LinkedIn, back to top.

## 6. Motion

Tokens: `--ease-out: cubic-bezier(.16,1,.3,1)`, durations 180ms (feedback), 420ms (entrance),
900ms (media).

- **Reveal** hook using `IntersectionObserver` (threshold 0.15, once). Default state is visible; an
  inline script adds `html.js` so hidden state only exists when JS runs. No content is ever trapped.
- **Entrances:** heading, then body +80ms, then media +140ms, then meta +200ms; 20px rise, opacity.
- **Signature move:** each project's media wipes in with `clip-path` bottom-up over 900ms while the
  image counter-scales 1.08 → 1. Used once per project, nowhere else.
- **Hero load:** name lines rise 28px in 700ms, staggered 80ms; paragraph +120ms; portrait clip-reveal
  + slight scale 1.05 → 1 over 900ms; actions +200ms.
- **Feedback:** buttons invert on hover/active; links get a 1px underline (interaction only); project
  media scales 1.03 over 600ms on hover; repo rows shift background and arrow.
- **Repo rows:** stagger 20ms, capped at 240ms total.
- **Reduced motion:** opacity only, no clip/scale/travel; parallax and hover transforms off.
- **Performance:** transform/opacity/clip-path only; no layout-affecting animation; no parallax
  library; scroll work in `requestAnimationFrame` if any is added.

## 7. Placeholder strategy

- Copy: real repo names and real one-liners from `README.md` where they exist; no lorem ipsum.
  Missing descriptions are omitted rather than replaced with "No description provided."
- Images are chosen up front and sourced deterministically. **No web search and no per-image
  analysis.** Five project media slots use GitHub's social-preview image for the five selected
  repos:

  ```
  https://opengraph.githubassets.com/1/LaishGlenberg/<repo>
  ```

  Download once with 1.5s spacing and two retries (one probe returned 429), save to
  `public/assets/images/work/<repo>.png`, crop to 16:10 and compress with `ffmpeg`. These are real
  previews of the actual repos, not invented screenshots.
- If a repo still 429s after retries, fall back to five fixed photo IDs from
  `.agents/skills/design-taste-frontend/library/photos.json` (no search, no browsing) with the same
  16:10 treatment. Source is noted in the report.
- Portrait: the existing `public/assets/images/profile-placeholder.JPG`, cropped 3:4.
- No `assets.mjs` search step and no `credits.json` for this pass. `ffmpeg` is used only for batch
  crop/compress, not for effects.
- Every media frame is 16:10 with `object-fit: cover` and explicit dimensions, so real screenshots
  drop in later without a layout change.

## 8. Accessibility and performance

- One `h1`, every section titled, logical heading order, landmarks, alt text on every image.
- Visible focus ring (2px ink, 2px offset) on every interactive element; skip link.
- Contrast: ink 19:1, muted 5.6:1; no text below 13px.
- Keyboard: nav, project links, filters, footer all reachable; filter buttons are real `<button>`s.
- Budgets: no new JS dependencies; fonts preloaded with `display=swap`; images lazy below the fold
  with width/height; Lighthouse performance >= 90 on desktop; no CLS from reveals.

## 9. Implementation

### Remove

- `src/components/FeaturedRepos.jsx`, `RepoGrid.jsx`, `RepoCard.jsx`
- README rendering and the `marked` dependency
- the entire current `src/index.css` (rewritten, not patched)
- `public/assets/images/repos/` placeholder if unused
- stale `FEATURED_REPOS` entry (`deepseek-v4-for-copilot` is not in the data)
- obsolete `plan.md` and `checklist.md` (replaced by this spec) — pending approval
- legacy root files `index-static.html`, `styles.css`, `script.js` — pending approval

### Add / change

```
src/
  App.jsx                  page composition only
  config.js                site links + SELECTED_WORK
  components/Nav.jsx
  components/Hero.jsx
  components/SelectedWork.jsx
  components/Project.jsx
  components/About.jsx
  components/RepoIndex.jsx
  components/Footer.jsx
  components/Reveal.jsx    (or lib/useReveal.js)
  styles/tokens.css        colour, type, spacing, motion tokens
  styles/base.css          reset, typography, focus, utilities
  styles/layout.css        nav, hero, sections, footer
  styles/motion.css        reveal states + reduced motion
  index.css                imports the four
public/assets/images/work/ 5 GitHub preview images
.taste-skill/              add to .gitignore
```

Keep `src/repos-data.json`, `scripts/fetch-repos.js`, `vite.config.js`, GitHub Pages config.

## 10. Commits and validation

Each checkpoint is a local commit. A commit is only made after its validation passes; if validation
fails, fix it inside the same checkpoint or revert. **Never push or open a PR without asking.**

**Gate run before every commit:**

```bash
npm run build
node .agents/skills/design-taste-frontend/scripts/lint.mjs index.html src
node .agents/skills/design-taste-frontend/scripts/inspect.mjs \
  http://localhost:5199/LaishGlenberg/ --out .taste-skill/after-<commit>
git status --short
```

Pass = build succeeds, `0 FAIL` in the lint and inspect reports (or a FAIL explicitly recorded as an
approved limitation in this spec), only intended files staged, and every screenshot listed by the
inspector opened and looked at.

| # | Commit | Scope | Checkpoint-specific validation |
| --- | --- | --- | --- |
| C0 | `chore: add redesign spec and notes on local tooling` | `SPEC.md`, `.gitignore`, `README.md` tooling note, `skills-lock.json` | `git check-ignore .agents .taste-skill` passes; build still passes; no site source file changed |
| C1 | `chore: remove obsolete plans and legacy static files` | delete `plan.md`, `checklist.md`, `index-static.html`, `styles.css`, `script.js` | build passes; no references remain (`rg "index-static\|styles\.css\|script\.js"`); screenshots identical to before |
| C2 | `feat: add design tokens, nav and hero` | tokens/base/layout CSS, `Nav.jsx`, `Hero.jsx`; old sections still mounted | 0 FAIL; single `h1`; h1 >= 8vw at 1440; nav tab order; hero fold reviewed at 390/768/1440; content visible with JS disabled |
| C3 | `feat: replace featured cards with selected work` | `SelectedWork.jsx`, `Project.jsx`, `config.js`, 5 media images; delete `FeaturedRepos.jsx`, drop `marked` | 5 compositions visibly different; 5 images load, none broken; links correct; mobile stacking; `rg marked src package.json` empty |
| C4 | `feat: add about, repository index and footer` | `About.jsx`, `RepoIndex.jsx`, `Footer.jsx`; delete `RepoGrid.jsx`, `RepoCard.jsx` | all 23 repos render; filter works with keyboard and without motion; missing descriptions omitted; one `h1`; every section titled; full-page screenshots at 3 widths; 0 FAIL |
| C5 | `feat: add reveal and motion layer` | reveal hook, `motion.css`, hero sequence, signature wipe, hover/focus states | inspector motion count >= 16; reduced-motion screenshots show all content; 4x CPU throttle scroll clean; no layout shift; nothing hidden without JS; 0 FAIL |
| C6 | `fix: critique round 1` | top three findings from the screenshots | before/after screenshots; report score written down; 0 FAIL |
| C7 | `fix: critique round 2` (only if needed) | next three findings | same as C6; stop after three rounds |
| C8 | `docs: document the redesign` | `README.md` site section, final report | build passes; documented commands actually run; placeholder list and sources current |

**Validation notes**

- Viewports are always 1440, 768 and 390, plus one reduced-motion pass and one JS-disabled pass.
- Run the look pass by opening the saved JPEGs, not by reading the report alone.
- If a rule is deliberately broken, add it to this spec and pass `--allow` explicitly; do not hide it.
- `src/repos-data.json` is stale (missing exa-cli and the other new repos). That is a content task for
  later; do not refetch it in this pass, and do not add invented rows to the index.

## 11. Build order

1. Run `draw.mjs` with `--keep palette`; record the dealt type/composition and any redraws.
2. Write copy deck + token sheet (short, in the report).
3. Delete old components; scaffold the static page shell and tokens.
4. Hero static at 1440 / 768 / 390; then each section static. Motion off.
5. Download and process the 5 GitHub preview images; set 16:10 frames.
6. Add reveal hook, signature wipe, hover/focus states, reduced-motion fallbacks.
7. Gate + screenshot critique, three rounds maximum; fix top three each round.
8. Update README site section; report direction, decisions, placeholders and image sources.

## 12. Risks

- **White minimal reads empty.** Countered by display-scale type, six sections, and a dense repo
  index. Empty is the failure mode to watch in screenshots.
- **Placeholder media looks wrong next to real work later.** Countered by fixed ratio, no overlays,
  no colour grading, object-fit cover.
- **Motion jank.** Countered by transform/opacity only, IntersectionObserver (not scroll listeners),
  and a 4x CPU throttle check.
- **The skill's content caps.** Placeholder copy and placeholder media deliberately cap the rubric; we
  record that as a known, approved limitation rather than arguing with the meter.

## 13. Defaults (override any of these)

- One page, no router. Black footer. Repo list keeps language + stars.
- Selected five: exa-cli, pi-command-cli, firebase-emulator-mcp, find-open-seats-python, termai.
- Images: GitHub previews only, no search, no image-by-image review.
- One local commit per checkpoint above; push only on request.
- Remove the obsolete plan/checklist and legacy root files.
- Work on branch `lg/feat/white-portfolio-redesign`.

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

**Dealt: "Type and nothing else"** (seed 1583341935, personal-portfolio, quiet). A white field, black
type, no hero image. The first screen is words and space; pictures arrive later, large and few, as
relief. The one loud moment is the masked headline.

The deal: hero "Stacked name, two inks"; type Cabinet Grotesk; palette kept (white/black); sections
work "Loose scatter with pauses" → about "Two columns, highlighted words" → list "Two-ended rows" →
contact "The email as display type"; motion "Masked headline"; atmosphere photography from the
Architecture set.

**Redraw:** `section:work` was dealt as a quiet 560px ledger with 300px hover previews. Five visual
projects cannot carry their previews or the brief's one-project-per-block claim at that size, so it
was redrawn to `work-loose-scatter`: one project per block at its own width and side, with pauses.
Sizes are mapped to this page's five type steps and the mixed 4:5 ratio becomes landscape, because
every source image is landscape. No other slot was redrawn.

**Adaptations, recorded:** the dealt hero has no image and leaves the bottom-left empty; the brief
asks for a portrait, so it sits small in that corner and closes the void. The dealt contact is an
email set as display type; there is no public email, so the display line carries the name and the
links carry contact. The dealt `list` column is 520px wide; 23 repos use a full-width ledger so the
right half is not empty. The about's 3–4 highlight colours become one `--wash` tone because the
palette is fixed to white and black.

References are the discipline of Figma's site and Swiss editorial portfolios, not their branding.
No accent colour, no gradients, no borders, no shadows, no icons, no pills, no numbered labels, no
monospace outside literal code.

## 4. Design system

### Type — one family

**Cabinet Grotesk** (Fontshare, free), the dealt face: 800 display, 500 emphasis, 400 text.
Fallback stack: `"Helvetica Neue", Arial, sans-serif`. Loaded from Fontshare with `display=swap`.

| Role | Size | Leading | Tracking |
| --- | --- | --- | --- |
| Display (h1) | `clamp(6.5rem, 15vw, 14.4rem)`; 21vw under 680px | 0.82 | -0.04em |
| Section title (h2) | `clamp(2.5rem, 4vw, 3.75rem)` | 0.95 | -0.03em |
| Project title (h3) | `clamp(1.75rem, 3vw, 2.75rem)` | 1.0 | -0.02em |
| Body | 18px | 1.6 | 0 |
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
2. **Nav** — monogram `LG` top-left; `Work / About / All repos` top-right. Plain, static, no bar,
   no blur, one underline-on-hover treatment. No button.
3. **Hero** — min-height `100svh`, no image above the fold:
   - `h1` on two authored lines, `Laish` / `Glenberg`, at display size, line one in `--muted`, line
     two in full ink, flush left on the margin and starting 14% down.
   - Supporting sentence, 17px, max 30ch, bottom-right on columns 9–12: what he does, plainly.
   - `See the work` (solid ink button, square, 44px+) under the sentence; `GitHub` as a text link.
   - Portrait, 3:4, small (about 20% width), bottom-left in the corner the blueprint leaves empty.
4. **Selected work** — heading, then five `<article>` blocks from `work-loose-scatter`: each image
   at its own width and side, project name above at the h3 step, one-line description and meta below,
   a real repository link. Placements cycle left half, right third (raised), inset centre; 120–160px
   between blocks. Media is 16:9. Projects and one-liners come from `README.md` (exa-cli,
   pi-command-cli, firebase-emulator-mcp, find-open-seats-python, termai). No cards, no numbers.
5. **About** — heading; 90–120 words at the lead size (22–32px) in two columns, ink with `--wash`
   highlights on place, discipline and tools; final sentence highlighted and linked to GitHub.
6. **All repositories** — heading, plain-text language filter row, then a full-width ledger for all
   23 repos: name at columns 1–4, description 5–9, language at 10, stars at 11–12, fixed starts and
   no drawn lines. Hover paints the row `--wash`. Mobile stacks name over meta and description.
   The filter is the page's one live thing: real data, keyboard accessible, works without motion.
7. **Footer** — black field, a short closing sentence top-left, the name repeated at display size,
   `Tempe, Arizona` bottom-left, `GitHub / LinkedIn / Back to top` bottom-right. No email.

## 6. Motion

Tokens: `--ease-out: cubic-bezier(.16,1,.3,1)`, durations 180ms (feedback), 420ms (entrance),
900ms (media).

- **Reveal** hook using `IntersectionObserver` (threshold 0.15, once). Default state is visible; an
  inline script adds `html.js` so hidden state only exists when JS runs. No content is ever trapped.
- **Entrances:** heading, then body +80ms, then media +140ms, then meta +200ms; 20px rise, opacity.
- **Signature move (dealt): masked headline.** Each authored line of the `h1` rises from behind its
  own baseline: 900ms, `--ease-out`, second line +110ms, 150ms after load. Supporting sentence,
  actions and portrait fade up afterwards; nothing else performs on load.
- **Moving picture:** the portrait settles from scale 1.06 to 1 over 2.4s while the page loads.
- **Project media:** enters at scale 1.04 → 1 over 900ms with opacity; hover scales the image 1.02.
- **Feedback:** buttons invert on hover/active; links get a 1px underline (interaction only); repo
  rows shift background and arrow.
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
  `public/assets/images/work/<repo>.png`, crop to 16:9 (1200×675, about 3% off each side) and
  compress with `ffmpeg`. These are real previews of the actual repos, not invented screenshots.
- If a repo still 429s after retries, fall back to five fixed photo IDs from
  `.agents/skills/design-taste-frontend/library/photos.json` (no search, no browsing) with the same
  16:9 treatment. Source is noted in the report.
- Portrait: the existing `public/assets/images/profile-placeholder.JPG`, cropped 3:4.
- No `assets.mjs` search step and no `credits.json` for this pass. `ffmpeg` is used only for batch
  crop/compress, not for effects.
- Every media frame is 16:9 with `object-fit: cover` and explicit dimensions, so real screenshots
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
| C1 | `chore: remove obsolete plans, legacy files and tracked build output` | delete `plan.md`, `checklist.md`, `index-static.html`, `styles.css`, `script.js`; untrack `dist/` and ignore it (the deploy workflow rebuilds it) | build passes; no references remain (`rg "index-static\|styles\.css\|script\.js"`); `git status` clean after a build; site still renders |
| C2 | `feat: add design tokens, nav and hero` | tokens/base/layout CSS, `Nav.jsx`, `Hero.jsx`; old sections unmounted | lint 0 FAIL; single `h1`; h1 >= 8vw at 1440; nav tab order; hero fold reviewed at 390/768/1440; content visible with JS disabled. Inspect is run and may still show `few-pictures` (portrait only) and `still-page` (motion lands in C5) — those are the accepted FAILs at this checkpoint |
| C3 | `feat: add selected work spreads` | `SelectedWork.jsx`, `Project.jsx`, `config.js`, 5 media images; delete `FeaturedRepos.jsx`, drop `marked` | lint 0 FAIL; 5 images load, none broken; placements at different widths/sides; links correct; mobile stacking; `rg marked src package.json` empty. Inspect: no FAIL other than documented `no-footage` WARN |
| C4 | `feat: add about, repository index and footer` | `About.jsx`, `RepoIndex.jsx`, `Footer.jsx`; delete `RepoGrid.jsx`, `RepoCard.jsx` | all 23 repos render; filter works with keyboard and without motion; missing descriptions omitted; one `h1`; every section titled; full-page screenshots at 3 widths; 0 FAIL except `still-page` (C5) |
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
5. Download and process the 5 GitHub preview images; set 16:9 frames.
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

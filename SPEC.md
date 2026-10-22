# Spec — White Portfolio Redesign

**Status:** done — critique round 1 passed at 7.6, report written, ready for the owner's review
**Date:** 2026-10-21
**Scope:** full visual rebuild of the site. Stack, data and links stay.

---

# HANDOFF — read this first

**Branch:** `lg/feat/white-portfolio-redesign` (not pushed, no PR)
**HEAD:** the `docs: sync the redesign handoff` commit (C8); C6 is `7ba8c65 fix: critique round 1`
**Working tree:** clean (`git status --short` empty; `prev-chat.md` is the owner's export, untracked)
**Gate:** `lint.mjs` 0 FAIL / 0 WARN; `inspect.mjs` **0 FAIL, 2 WARN** at 1440, 768, 390.
**Critique:** round 1 scored **7.6**; no second round needed (stop line 7.5).
**Screenshots:** `.taste-skill/final/` (last run, all opened). Round-1 fix state: `.taste-skill/c6c/`.
Before shots: `.taste-skill/before/`.

## Where it is

C0–C8 are done and committed. The page is built, responsive, animated, critiqued and documented. The
final report is in the owner's session/PR description. `README.md` is the owner's and was **not
touched** (they wrote it and asked that it be left alone).

| # | Commit | Done |
| --- | --- | --- |
| C0 | `0205fd1` | spec, `.gitignore`, tooling note, `skills-lock.json` |
| C1 | `024c7f6` | removed old plans, legacy static files, tracked `dist/` |
| C2 | `d2d78d3` | tokens/base/layout/motion CSS, Nav, Hero (static) |
| C3 | `49b8d0a` | SelectedWork + Project, 5 media images, `marked` removed |
| C4 | `da3c3aa` | About, RepoIndex (filter), Footer; card components removed |
| C5 | `264178f` | reveal hook, masked headline, portrait settle, hover states, noscript |
| C6 | `7ba8c65` | tablet hero scale, hero support left-aligned, repo row grid, tablet ledger stack, footer bookend, no-JS tokens |
| C8 | `docs: sync the redesign handoff` | this handoff, deletion of the unused repo placeholder |

## Resume in one command block

```bash
cd /home/lg/projects/LaishGlenberg
git checkout lg/feat/white-portfolio-redesign
(nohup npx vite --port 5199 --strictPort >/tmp/lg-vite.log 2>&1 &)
# page: http://localhost:5199/LaishGlenberg/  (base path matters)
node .agents/skills/design-taste-frontend/scripts/inspect.mjs \
  http://localhost:5199/LaishGlenberg/ --out .taste-skill/final
```

The skill lives in `.agents/skills/design-taste-frontend/` on this machine. It is gitignored; a
fresh clone must reinstall it from `Leonxlnx/taste-skill` (see the README note).

## Next steps, in order

1. Owner review. The report in the session/PR description carries the direction, scores,
   placeholder inventory and the two defended WARNs.
2. Ask before any push or PR. The branch has never been pushed.

## Current gate output (do not regress)

- `lint.mjs index.html src` → 0 FAIL, 0 WARN.
- `inspect.mjs` → 0 FAIL, 2 WARN:
  - `statement-length` — the About paragraph is 7 lines at 30.2px. **Defence:** it is a biography,
    not a slogan; the dealt blueprint sets it at 22–32px in two columns. If a later session wants
    zero WARNs, split it into three shorter paragraphs (do not shrink the composition).
  - `no-footage` — no video. **Defence:** all media is placeholder stills and the owner said media
    comes later. Do not add stock footage.
- Motion: 54 desktop / 55 tablet / 56 mobile elements moved, 0 `still-page`.
- Reduced motion re-checked after C6 (manual): 0 hidden reveals, no clip/opacity traps at 1440.
- 4× CPU check (manual, done at C5): CLS `0.0002`; all 24 `[data-reveal]` elements fired after
  scrolling to the bottom at 390 after C6. A temporary script was used; it is not in the repo.

## Critique round 1 (C6)

```
ROUND 1
Seen in one second: the name, set enormous, in two greys.
Idea (one sentence): a developer's work shown as a type poster — no interface, the page is the
  frame and the projects hang in it.
Live thing: the language filter on the repository index.
Layout words by section: hero=poster / work=scatter / about=split / repos=ledger / footer=field.
Scores: design 8 · usability 8 · creativity 7 · content 6 → overall 7.6.
Caps applied: none. Six real pictures, one moving layer, a real hero button, no FAIL. Content is 6
  rather than 5 because the media are real repo previews and the copy is real repo copy, not lorem
  or grey boxes; the placeholder trade-off is recorded, not argued away.
Top three problems (fixed in `fix: critique round 1`):
1. Tablet hero (tablet-fold.jpg) left a ~350px hole between the name and the portrait row. The
   15vw display only filled 62% of the sheet. The two-line name is now sized to its longest line
   (22vw, 92% of the frame at 768) so the hero reads as one poster.
2. Hero support (desktop-fold.jpg, tablet-fold.jpg) was right-aligned, against the page's
   left-aligned system, and broke into ragged one-word lines. It is now left-aligned on the
   columns 9–12 edge (shared with the raised work column), actions with it.
3. Repo rows (mobile-page-01.jpg, tablet-page-01.jpg) let long names push language, stars and the
   arrow onto stray lines, and at 768 the 12-col ledger squeezed descriptions into four-line
   columns. Below 900px the row is now a fixed grid: name + meta on line one, description below at
   max 62ch. The footer bookend was resized to match the new tablet hero.

Also fixed in the same commit: the JS-disabled pass rendered as Times on an 8px margin, because
 every stylesheet is imported through JS. The `<noscript>` block now carries its own tokens.
```

Not fixed, by decision: the GitHub preview cards duplicate the h3 and read as embeds; the portrait
is a selfie; the About paragraph triggers `statement-length`; there is no footage. All four are the
owners' placeholder/media call, not layout faults.

## Design decisions (do not re-litigate without asking)

- **Direction:** "Type and nothing else", seed 1583341935; hero "Stacked name, two inks"; motion
  "Masked headline". The sheet is `.taste-skill/direction.json`; reprint with
  `node .agents/skills/design-taste-frontend/scripts/draw.mjs --show`.
- **Type:** Cabinet Grotesk (Fontshare), 800/500/400. Five visible steps: 216 / 58 / 43 / 18 / 14px
  at 1440 (plus the 30px About lead). The display step is 22vw between 681–900px because at that
  width 15vw only filled 62% of the sheet; below 680px it is 19vw. Do not add faces or sizes
  casually.
- **Colour:** `--paper #ffffff`, `--ink #0b0b0c`, `--muted #707070` (meta only), `--ink-muted` on
  black, `--wash #efefed`. No accent, no gradients, no borders, no shadows, square corners.
- **Hero:** two authored lines, line 1 muted, line 2 ink; portrait bottom-left; sentence + actions
  bottom-right, left-aligned on the column-9 edge. The hero is a type poster; the portrait closes
  the bottom-left void.
- **Work:** `work-loose-scatter` redraw — five projects at alternating width/side (left 7 cols,
  right 5 cols raised with a negative margin, inset 9 cols), 16:9 media on a wash mat, h3 above,
  one-line description below, link in the head. This replaced the dealt 560px ledger, which could
  not carry the previews (recorded in §3).
- **About:** two columns, 30px lead, wash `mark` highlights, final sentence is a black-highlighted
  GitHub link.
- **Repos:** full-width 12-col ledger, all 23 repos, filter `All / TypeScript / JavaScript / Python /
  Other`, name 18/500, description 18 ink, language + stars 14 muted, arrow on the right. Below
  900px the row stacks: name + meta on line one, description full width below. The filter is the
  page's live thing.
- **Footer:** black field, name repeated at `--step-display` on two lines (bookend), note top-left,
  location + GitHub / LinkedIn / Back to top bottom. No email — the owner has no public one. On
  tablet the name uses the same 22vw as the hero.
- **Motion:** masked headline is the signature; portrait scale 1.06→1 over 2.4s; support/actions
  fade at 450ms; sections reveal once via IntersectionObserver (`rootMargin: -5%`, threshold 0.1);
  project head/media/desc at 0/80/140ms; repo rows stagger 20ms capped at index 12. The `-5%`
  rootMargin replaced `-12%` because the footer row never fired at max scroll on a phone.
- **No-JS:** `<noscript>` fallback in `index.html` with the name, sentence, GitHub and LinkedIn,
  carrying its own inline type/colour tokens. The page CSS is imported by JS, so none of it loads
  without JS; before C6 the fallback rendered as Times on an 8px margin. Verified at 1440 and 390
  (no overflow).

## Placeholders (must be swapped before launch)

- Five project images: `public/assets/images/work/{exa-cli,pi-command-cli,firebase-emulator-mcp,
  find-open-seats-python,termai}.png`, 1200×675. They are GitHub social-preview cards downloaded
  from `https://opengraph.githubassets.com/1/LaishGlenberg/<repo>`, cropped 2:1→16:9 with ffmpeg.
  They are real previews of the repos, but they duplicate the h3 and description; replace with
  real screenshots at the same 16:9 ratio and nothing else changes.
- Portrait: `public/assets/images/profile-placeholder.JPG`, styled as a 3:4 crop. The owner will
  replace it.
- Copy: selected-work one-liners and the About text are extrapolated from `README.md`; the owner
  will rewrite it. The repo index uses `src/repos-data.json`, which is stale (missing exa-cli,
  pi-command-cli and others) — that is a later content task, not this pass.
- `public/assets/images/repos/repo-placeholder.JPG` was unused and has been deleted (C8).
- No `assets.mjs` search, no `credits.json`, no video. Do not add stock imagery.

## Known soft spots (recorded, not fixed)

- The GitHub cards duplicate the visible title/description and read like embeds rather than work.
  This is the placeholder trade-off; do not redesign around it.
- The portrait is an informal selfie against a formal type system. Placeholder.
- The About block is long at 30px; the inspector warns. Defended as a biography in two columns.
- The repo ledger is 23 rows and makes the page ~8.3 screens; judged as dense but not a dump.
- At 768 the hero keeps ~250px of white between the name and the bottom row; after the scale fix it
  reads as the poster's rest rather than a hole.

## Idea sentence (draft for the report)

> On this page, the command line — where these tools live — becomes a page with no interface at
> all: the first screen is pure type, and the work hangs below it like framed prints.

Live thing: the language filter on the repository index (real data, keyboard accessible, works
without motion).

## Do not

- Do not push or open a PR without the owner's permission.
- Do not commit `dist/`, `.taste-skill/` or `.agents/` (all ignored).
- Do not refetch `repos-data.json` or invent repo descriptions in this pass.
- Do not add gradients, shadows, borders, monospace, pills, icon cards, numbering, or a sixth
  colour. The linter will catch most of it.
- Do not add `data-reveal` to elements that mount after `useReveal` has run; the filter rows inherit
  `is-in` from their parent list. If new dynamic blocks appear, re-observe them.
- Do not claim the final report is done without opening every screenshot from the last run.

---

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
| Display (h1) | `clamp(6.5rem, 15vw, 14.4rem)`; 22vw at 681–900px; 19vw under 680px | 0.82 | -0.04em |
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
   - Supporting sentence, 18px, max 28ch, bottom-right on columns 9–12, left-aligned on that
     column's edge: what he does, plainly.
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
   no drawn lines. Hover paints the row `--wash`. Below 900px the row stacks name + meta on line one
   and the description below.
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
| C5 | `feat: add reveal and motion layer` | reveal hook, `motion.css`, hero sequence, signature masked headline, hover/focus states, noscript fallback | inspector motion count 53 (>= 16); reduced-motion pass with no `reduced-hidden`; 4× CPU check: CLS 0.0002, all 24 reveals fire after scrolling to the bottom; no-JS noscript fallback; 0 FAIL |
| C6 | `fix: critique round 1` | top three findings from the screenshots | **done** — 0 FAIL, 2 WARN, 7.6 |
| C7 | `fix: critique round 2` (only if needed) | next three findings | not run: round 1 reached 7.5 |
| C8 | `docs: sync the redesign handoff` (the report lives in the chat/PR) | handoff, remove the unused repo placeholder. **Do not edit `README.md`** | **done** — build passes; placeholder list current |

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

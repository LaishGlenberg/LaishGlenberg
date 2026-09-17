# Visual Refresh Implementation Plan

## Goal

Restyle the existing GitHub Pages portfolio into a sleek, modern, smooth **midnight/aurora project gallery**. This pass is strictly about presentation, layout, motion, hierarchy, and responsive polish. Reuse the current name, introduction, links, repository descriptions, README data, and repository list; do not add biography, marketing copy, testimonials, contact sections, or other new content.

## Current-state notes

- The deployed site is the Vite/React app rooted at `src/main.jsx`; `.github/workflows/deploy.yml` builds `dist/` with Vite.
- The active UI is in `src/App.jsx` and `src/components/*.jsx`, and the active stylesheet is `src/index.css`.
- Root `index-static.html`, `styles.css`, and `script.js` are a legacy static implementation and are not part of the Vite app. Do not spend the visual-refresh effort on them.
- The current two-column layout puts large featured cards in the main column and the entire repository grid in a narrow, sticky 340px sidebar. This makes the repository cards feel cramped and visually secondary.
- The featured README previews are dense internal scroll boxes. They dominate each card and make scanning difficult.
- Only generic placeholder images exist under `public/assets/images/`; consequently, repeating a large 16:9 placeholder on every repository card adds visual weight without differentiation.
- `src/config.js` currently names one repository that is absent from `src/repos-data.json`; the component already tolerates this. Do not alter repository selection/data as part of this styling pass.

## Visual direction

Use a restrained dark interface rather than a corporate portfolio template:

- Near-black navy background, subtly warmer elevated surfaces, and indigo/violet/cyan aurora accents.
- Large, confident type with tight heading tracking and generous whitespace.
- Soft borders and layered shadows, not heavy outlines or excessive glassmorphism.
- A faint ambient background treatment (two blurred radial gradients plus a very subtle grid/noise-like CSS pattern) that stays behind the content.
- Rounded geometry with a consistent radius scale; reserve the largest radius for the hero and featured work.
- Small, purposeful movement: gentle entrance, hover lift, arrow movement, and button feedback. Nothing continuously bouncing or distracting.
- Use the accent gradient sparingly on the avatar ring, primary action, tiny card accents, and focus states.

Suggested tokens (adjust during visual QA if necessary):

- Background: `#08090d`
- Elevated background: `#0e1017`
- Card surface: `rgba(18, 20, 29, 0.82)`
- Strong text: `#f4f5f8`
- Muted text: `#969baa`
- Accent: `#8b7cff`
- Secondary accent: `#55d6e8`
- Hairline border: `rgba(255, 255, 255, 0.08)`
- Container width: approximately `1180px`
- Radius scale: `10px / 16px / 24px`

## Implementation plan

### 1. Rebuild the page hierarchy in `src/App.jsx`

Replace the current main/sidebar composition with a clear vertical flow using the same content:

1. Hero
2. Featured repositories section
3. All repositories section

Implementation details:

- Keep both sections inside the shared max-width container.
- Give each section a reusable `section-heading` row so headings and their visual rules align consistently.
- Render featured repositories in a wide two-column grid on desktop rather than one long stack.
- Render all repositories in a full-width responsive grid: 3 columns on wide screens, 2 on tablets, and 1 on small phones.
- Remove sticky-sidebar behavior entirely.
- Keep the existing section title and intro copy; do not write new explanatory copy.
- Add semantic `aria-labelledby` connections between each section and its heading where convenient.

### 2. Refine the hero in `src/components/Hero.jsx`

Keep its current information, but change its visual composition:

- Make the hero an open, spacious banner rather than a small boxed profile card. Use a large rounded surface with a soft inner highlight and an absolutely positioned aurora glow clipped within it.
- Keep the image on the left and text/actions on the right at desktop sizes. Use approximately a 112–124px avatar so the name, not the photo, is the strongest element.
- Add a purely decorative accent/orbit element around or behind the avatar with CSS; mark decorative DOM as `aria-hidden="true"`.
- Replace the externally loaded LinkedIn raster/SVG `<img>` with a small inline SVG so its color and hover state match the button and the site does not rely on Iconify at runtime.
- Add a matching inline GitHub icon to the GitHub action for balance; this is iconography, not added content.
- Style GitHub as the bright primary action and LinkedIn as a quiet translucent/outlined secondary action.
- Preserve the exact current text and URLs.
- Ensure action hit targets are at least 44px tall and keyboard focus rings are visible.

### 3. Make featured cards visual showcases in `src/components/FeaturedRepos.jsx`

The card should communicate hierarchy without exposing a giant wall of README text:

- Keep repository name, language, description, README preview, repository link, and star count; do not add fields or prose.
- Add a subtle top accent line or corner glow, deterministically varied by card index using a CSS custom property/class.
- Keep a consistent card structure and minimum height so the two-column grid aligns cleanly.
- Turn the README area into a deliberately styled “code/document preview” panel with a small header treatment, softer inset surface, custom thin scrollbar, and a fixed/max preview height around 190–220px.
- Add top/bottom fade masks to the README viewport so clipped/scrollable content feels intentional. Do not delete or rewrite README content.
- Sanitize visual overflow from README Markdown: constrain images to the panel, make tables horizontally scrollable, wrap long links/code where safe, and keep preformatted code horizontally scrollable.
- Keep the card footer pinned to the bottom. Give the external-link arrow a small translate animation on hover/focus.
- Pass the map index into styling (for example `style={{ "--card-index": index }}`) for a subtle staggered entrance; do not derive layout from repository data.
- Use an `h2` section heading and `h3` card names (adjust current heading levels accordingly).

### 4. Redesign repository tiles in `src/components/RepoCard.jsx` and `RepoGrid.jsx`

Avoid showing the same generic photo placeholder 23 times.

- Preserve support for a real repository screenshot if one is later added at the existing path.
- On image error, stop swapping to the generic `repo-placeholder.JPG`. Instead, switch the preview into a CSS-generated abstract cover using layered gradients, a fine grid, and a small inline repository/code glyph. This creates visual variety without requiring new content or assets.
- Derive one of 4–6 deterministic accent variants from the repository name or map index; never use random values at render time, which would cause visual changes between renders.
- Keep the card compact and scan-friendly. Limit descriptions to approximately three lines with `line-clamp`, while retaining the full text in the DOM/title if useful for accessibility.
- Make the whole tile feel interactive, but retain valid semantics: either stretch the existing repository anchor over the card or wrap only permitted content in the anchor. Do not nest interactive elements.
- Add a compact external-arrow glyph and animate it a few pixels on hover.
- Let `RepoGrid` pass an index/custom property for stagger timing and fallback-cover variants.
- Use equal-height rows and pin the link to the card bottom.

### 5. Replace and organize `src/index.css`

The file is currently under 400 lines but will likely grow. Refactor it into clearly labeled sections and keep it maintainable:

1. Font import and design tokens
2. Reset/base styles
3. Ambient page background
4. Shared container/section headings
5. Hero
6. Buttons and focus styles
7. Featured grid/cards/Markdown viewport
8. Repository grid/cards/generated fallback covers
9. Motion
10. Responsive rules
11. Reduced-motion and accessibility overrides

Specific styling requirements:

- Load a modern display/body family such as **Manrope** and a mono accent family such as **IBM Plex Mono** through `<link>` tags in `index.html` (with preconnects), then provide robust system fallbacks. Use mono only for small labels/language badges, not body copy.
- Set `color-scheme: dark`, smooth font rendering, a tasteful text-selection color, and consistent custom scrollbars.
- Use `min-height: 100%` and `overflow-x: clip` safely; do not hide legitimate horizontal overflow inside code/table previews.
- Create the ambient page glow with fixed/pseudo elements using `pointer-events: none` and low opacity. It must not lower text contrast.
- Use `clamp()` for hero title, section spacing, and responsive padding.
- Add `:focus-visible` states for every link/control. Do not rely on hover alone.
- Define transitions narrowly (`transform`, `border-color`, `background-color`, `box-shadow`, `opacity`); avoid `transition: all`.
- Use a single short easing curve and consistent durations around 160–300ms.
- Add a one-time `fade-up` entrance to the hero and cards. Keep translation under about 12px to avoid a showy effect.
- In `@media (prefers-reduced-motion: reduce)`, disable entrance animations, transforms, and smooth scrolling/transitions.
- Ensure readable contrast for muted text and badges against all surfaces.

### 6. Responsive behavior

Test and tune at minimum at 1440px, 1024px, 768px, 430px, and 320px:

- Above ~1000px: featured and repository grids can use two and three columns respectively.
- Around tablet widths: both grids should use two columns where space permits; hero spacing should tighten.
- Below ~680px: hero becomes a single-column layout, preferably left-aligned rather than forcing everything into a generic centered profile card. Buttons may wrap or become full-width on very narrow screens.
- Below ~520px: both grids become one column; card padding and section gaps reduce slightly.
- Long repository names, URLs, Markdown code blocks, and tables must never force page-level horizontal scrolling.
- Keep the avatar visually balanced without allowing it to consume most of the first viewport on mobile.

### 7. Keep scope visual

Do **not** do any of the following in this pass:

- Add About, Experience, Skills, Contact, footer copy, testimonials, stats summaries, search, filtering, theme switching, or navigation sections.
- Rewrite existing descriptions or README content.
- Change the repository-fetch script, repository data, featured configuration, deployment workflow, or Vite base path.
- Add a UI framework, animation package, icon package, or component library. CSS and small inline SVGs are sufficient.
- Add stock photography or fabricated project screenshots.
- Edit generated `dist/`; the build command will regenerate it.
- Update the legacy root static implementation unless the project owner explicitly decides to keep it in sync.

## Documentation update

After implementation, update `README.md` briefly to state that the active site is the React/Vite app, identify `src/index.css` as the visual theme source, and clarify that the root static files are legacy (or remove them in a separate cleanup). Do not add portfolio content to the README as part of this task.

## Validation checklist

Run and verify:

```bash
npm run build
npm run dev
```

Then check:

- No build warnings/errors and no runtime console errors.
- GitHub Pages asset paths still work under `/LaishGlenberg/`.
- Hero links and every repository link retain the correct URL and open behavior.
- Real repo screenshots render when present; missing screenshots show the generated fallback without repeated error loops.
- Layout has no horizontal overflow at 320px.
- Featured README panels contain wide tables/code instead of expanding the page.
- Keyboard tab order is logical, and focus rings are clearly visible.
- Reduced-motion mode removes entrance and hover movement.
- Hover effects do not cause neighboring content to reflow.
- Capture before/after screenshots at desktop and mobile widths for visual comparison.

## Definition of done

The page should feel like one coherent, polished dark gallery: a distinctive but restrained hero, clearly separated featured work, an easy-to-scan full-width repository grid, graceful fallbacks in place of repeated placeholder art, smooth micro-interactions, and strong mobile behavior—all without adding substantive new portfolio content.

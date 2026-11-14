You will be severely punished and reprimanded for editing this projects README.md

You may only write notes to this AGENTS.md file or new .md entries

## Demo GIFs (selected work previews)

`SELECTED_WORK` previews are recorded terminal GIFs, compressed losslessly and
only animated while centred on screen. Pipeline for adding one:

1. **Record** — script the commands with `cmd-replay` (its own repo,
   `~/projects/cmd-replay`). This repo's demo scripts live in `scripts/demos/`;
   raw captures go in `demos/`, which is gitignored. Size the terminal once
   (~814x496) so every capture matches.
2. **Compress** — `gifsicle -O3 --careful in.gif -o out.gif`. It only merges
   identical frames and rewrites diffs, so text stays crisp while files drop
   ~85% (2.8 MB -> 338 KB). Never use `--lossy` or `--colors N` here, they soften
   terminal text. gifsicle is not on `PATH`: `npm i gifsicle` in a temp dir, run
   `node node_modules/gifsicle/lib/install.js` (npm blocks the postinstall), then
   use `node_modules/gifsicle/vendor/gifsicle.exe`.
3. **Verify** — per-frame hashes must match after collapsing duplicates:

   ```bash
   for f in in.gif out.gif; do
     ffmpeg -v error -i "$f" -f framemd5 - | awk '!/^#/{print $NF}' | uniq > "$f.md5"
   done
   diff in.gif.md5 out.gif.md5   # empty output = pixel-identical
   ```

4. **Frames** — `ffmpeg -i out.gif -vframes 1 out.poster.png` (frame 0, 3-25 KB)
   is the base layer; the GitHub card sits on top as `thumb` and fades off as the
   preview nears the middle of the screen, revealing frame 0. The fade is 1:1 with
   scroll; the GIF starts playing only after holding inside the centre band for
   `PLAY_DELAY` ms (`WINDOW`/`ZONE`/`PLAY_DELAY` in `Project.jsx`). Poster paths
   derive from the GIF path (`.gif` -> `.poster.png`), so there is no config field
   for them.
5. **Register** in `src/config.js`. The still frame shows until the preview is
   centred, then the GIF plays (preloaded, swapped back to the still when it
   leaves the middle of the viewport):

   ```js
   image: asset("assets/gifs/<repo>.gif"),
   thumb: asset("assets/images/work/<repo>.png"), // card layered over frame 0
   imageFit: "contain",   // natural ratio, nothing cropped
   imageSize: [814, 498], // reference width/height, reserves the box
   ```

Projects without a recording just point `image` at the 1200x675 card at
`assets/images/work/<repo>.png` and need neither `thumb`, `imageFit` nor
`imageSize`.

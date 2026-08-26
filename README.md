# Qaiser Farooq — Portfolio

Personal portfolio for Qaiser Farooq, AI Engineer. Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000. A local server is recommended — project videos load more reliably over `http://` than `file://`.

## Structure

```
index.html     page markup and section shells
styles.css     design tokens, layout, motion
data.js        ALL CONTENT — projects, research, experience, education, skills
app.js         rendering, scroll reveal, video, nav state, parallax
assets/        photo and project videos
backup/        the previous version of the site, kept for reference
```

## Editing content

Everything you'd normally want to change lives in **`data.js`**. Nothing else needs touching.

**Add a project:**

```js
{
  num: "07",
  dates: "2026",
  title: "My New Project",
  video: "assets/my-video.mp4",   // optional
  repo: "https://github.com/...", // optional
  tags: ["Tag One", "Tag Two", "Tag Three"]
}
```

Drop the video in `assets/`. Cards with no `video` show the gradient background instead. Tags wrap now, so a fourth tag is safe — but three still reads best.

**Other editable arrays in `data.js`:** `stats`, `research`, `proficiency`, `experience`, `skills`, `education`, `ticker`.

Bio text, headings and the contact form live directly in `index.html`.

## Design tokens

Defined at the top of `styles.css`. Change one variable to reskin the whole site.

| Variable | Value | Use |
|---|---|---|
| `--ink-900` | `#120A0F` | Page background — a warm near-black |
| `--ink-850` | `#170D13` | Research section |
| `--ink-700` | `#2B1A23` | Project card gradient top |
| `--paper` | `#F7F4F2` | Light sections |
| `--gold` | `#F2B441` | Signature accent — CTA, numbers, ticker |
| `--rose` | `#D14D70` | Secondary accent, used sparingly |

Depth comes from the `--shadow-*` tokens rather than solid borders. Each one carries a `0 0 0 1px` layer, so the hairline is drawn as part of the elevation instead of fighting it.

Type is three families with distinct jobs: **DM Sans** for UI and body, **Instrument Serif** italic for the two display accents (the hero role line, the degree fields), **JetBrains Mono** for technical metadata — dates, numbers, tags, labels.

## Motion

The motion layer follows a fixed set of rules; if you edit it, keep to them.

| Rule | Where it lives |
|---|---|
| Strong custom easing, never `ease-in` | `--ease-out: cubic-bezier(.23,1,.32,1)` |
| UI transitions under 300ms | `--t-press: 140ms`, `--t-hover: 200ms` |
| Reveals slightly longer, they are explanatory | `--t-enter: 420ms` |
| Animate only `transform` and `opacity` | proficiency bars use `scaleX`, not `width` |
| Stagger 30–80ms, computed from DOM order | `flushReveals()` in `app.js` |
| Hover motion gated to real pointers | `@media (hover: hover) and (pointer: fine)` |
| Every pressable surface has `:active` feedback | `transform: scale(.97)` |
| `prefers-reduced-motion` drops movement, keeps opacity | bottom of `styles.css` + `reduced()` in `app.js` |

Position-driven behaviour uses `IntersectionObserver`. There is exactly one scroll listener — the hero parallax — and it is rAF-throttled and writes to two elements, with no layout reads inside the loop. It is desktop-only (>1080px): below that the hero stacks and grows taller, so a fade keyed to scroll depth would wash the copy out while it is still being read.

Videos play only while on screen and pause when they scroll out.

If JavaScript fails, nothing disappears: the reveal styles are scoped to `html.js`, which is only set by an inline script, and a 2.5s timer force-shows everything as a second safety net.

## Deploy to GitHub Pages

```bash
git init && git add . && git commit -m "Portfolio"
```

```bash
git remote add origin https://github.com/Qaiserfarooq285/<repo>.git && git push -u origin main
```

Then in the repo: **Settings → Pages → Source: main / root**. Live in a minute at `https://qaiserfarooq285.github.io/<repo>/`.

## Notes

- The contact form uses `mailto:` — it opens the visitor's email client. For a proper inbox submission, swap in [Formspree](https://formspree.io) or [Resend](https://resend.com).
- The videos have no poster images. Adding one per project (`poster="assets/x.jpg"`) would remove the brief dark frame before the first video frame decodes.
- `backup/` holds the previous design. Delete it once you're happy.

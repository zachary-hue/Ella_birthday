# Ella's Birthday

A one-page birthday site for Ella — a scroll-driven, heavily animated photo
page built with React + Vite.

## Running locally

```
npm install
npm run dev
```

Then open http://localhost:5173.

## Editing the words

All of the copy lives in [`src/content.js`](src/content.js) — the hero, the
timeline entries and their captions, the closing note. Nothing in that file is
load-bearing for the animations, so any of it can be rewritten freely.

## The photos

The originals are not in the repo. `scripts/process-photos.mjs` converts them
to web-sized WebP and writes `src/photos.js`, which is generated — edit the
script, not the manifest.

```
node scripts/process-photos.mjs [sourceDir]   # defaults to ~/Downloads
```

Each photo becomes a 1600px-long-edge WebP plus a tiny blurred placeholder
that the page fades in from. To swap the photo set, drop new files in and
update the `ORIGINALS` list at the top of the script.

`src/content.js` refers to photos by the ids the script assigns (`p01`,
`p02`, …): five of them are pinned to timeline entries, the rest are listed
in `galleryPhotos`.

## Layout

| Path | What it is |
| --- | --- |
| `src/components/Hero.jsx` | Full-screen opener: gradient mesh, floating balloons, per-letter title, counting age |
| `src/components/WishButton.jsx` | CSS cake whose candles blow out and fire confetti |
| `src/components/Timeline.jsx` | Scroll-driven spine with alternating photo cards |
| `src/components/Gallery.jsx` | Masonry grid; click for a lightbox |
| `src/components/Lightbox.jsx` | Full-screen viewer with keyboard and swipe navigation |
| `src/components/Closing.jsx` | The sappy part |
| `src/confetti.js` | The three confetti effects |

Animation is [`motion`](https://motion.dev) for anything spring- or
scroll-driven, plain CSS for ambient loops. Everything respects
`prefers-reduced-motion`.

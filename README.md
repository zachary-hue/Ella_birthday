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
captions, the sticky notes, and the letter, which is just an array of
paragraphs. The `tilt` values are degrees — nothing is meant to sit perfectly
straight. Nothing in that file is load-bearing for the animations, so any of it
can be rewritten freely.

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
`p02`, …): one is the hero polaroid, five are pinned to `moments`, and the
rest are listed in `galleryPhotos` with their captions.

## Layout

It is built to read like a scrapbook: warm paper, handwriting (Caveat) for
anything in Zachary's voice, photos taped down crooked, and hand-drawn doodles
that draw themselves as they scroll into view. There are no section headings —
the page just runs top to bottom like pages someone made by hand.

| Path | What it is |
| --- | --- |
| `src/components/Hero.jsx` | The opener: paper confetti, hand-lettered name, circled age |
| `src/components/WishButton.jsx` | CSS cake whose candles blow out and fire confetti |
| `src/components/Moments.jsx` | Five photos down a thread that draws itself on scroll |
| `src/components/Gallery.jsx` | Taped photo wall; click any for the lightbox |
| `src/components/Lightbox.jsx` | Full-screen viewer with keyboard and swipe navigation |
| `src/components/Notes.jsx` | Sticky notes, one per thing worth saying about her |
| `src/components/Letter.jsx` | The letter, on ruled paper, revealed a paragraph at a time |
| `src/components/TapedPhoto.jsx` | Polaroid frame, tape and handwritten caption |
| `src/components/Doodle.jsx` | The hand-drawn marks (arrows, underlines, hearts) |
| `src/confetti.js` | The three confetti effects |

Animation is [`motion`](https://motion.dev) for anything spring- or
scroll-driven, plain CSS for ambient loops. Everything respects
`prefers-reduced-motion`.

Two things worth knowing before editing the styles: the letter's ruled lines
only stay under the text because every vertical measurement on that page is a
multiple of 32px, and doodles used as underlines need `stretch` so their height
does not scale with the width of the word above them.
